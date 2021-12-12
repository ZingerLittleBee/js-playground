(() => { 'use strict'

    // Replace the function used when compiling JSX expressions. https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#:~:text=React%20Classic%20Runtime-,pragma,-string%2C%20defaults%20to
    const createElement = (type, props, ...children) => {
        if (props === null) props = {}
        return {type, props, children}
    }

    // 将 VDOM 上的 props 映射到真实 DOM 上
    const setAttribute = (dom, key, value) => {
        // 添加事件
        // onClick -> dom.addEventListener('click', handlers)
        if (typeof value == 'function' && key.startsWith('on')) {
            const eventType = key.slice(2).toLowerCase()
            dom.__handlers = dom.__handlers || {}
            dom.removeEventListener(eventType, dom.__handlers[eventType])
            dom.__handlers[eventType] = value
            dom.addEventListener(eventType, dom.__handlers[eventType])
        } else if (key === 'checked' || key === 'value' || key === 'className') {
            dom[key] = value
        }
        // 合并 style 样式
        else if (key === 'style' && typeof value == 'object') {
            Object.assign(dom.style, value)
        }
        // 调用 ref 回调函数并传入 DOM 元素, https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#:~:text=%E4%B8%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E3%80%82-,%E5%9B%9E%E8%B0%83%20Refs,-React%20%E4%B9%9F%E6%94%AF%E6%8C%81
        else if (key === 'ref' && typeof value == 'function') {
            value(dom)
        }
        // 设置组件的 key
        else if (key === 'key') {
            dom.__key = value
        }
        // 普通 dom 属性
        else if (typeof value !== 'object' && typeof value !== 'function') {
            dom.setAttribute(key, value)
        }
    }

    // 渲染函数, 将 VDOM 转换为 DOM
    const render = (vdom, parent=null) => {
        const mount = parent ? (el => parent.appendChild(el)) : (el => el)
        if (typeof vdom == 'string' || typeof vdom == 'number') {
            // vdom 为 string 或 number 直接渲染节点
            return mount(document.createTextNode(vdom))
        }
        // 无意义值 (boolean || null) 处理
        else if (typeof vdom == 'boolean' || vdom === null) {
            return mount(document.createTextNode(''))
        }
        // typeof vdom.type === 'function' 表明是 React class 组件
        else if (typeof vdom == 'object' && typeof vdom.type === 'function') {
            // 调用 Component.render() 处理 React class 组件
            return Component.render(vdom, parent)
        }
        // typeof vdom.type == 'string' 表明是普通 html 元素
        else if (typeof vdom == 'object' && typeof vdom.type == 'string') {
            const dom = mount(document.createElement(vdom.type))
            // 递归渲染 children
            for (const child of [].concat(...vdom.children)) render(child, dom)
            // 设置属性
            for (const prop in vdom.props) setAttribute(dom, prop, vdom.props[prop])
            return dom
        } else {
            throw new Error(`Invalid VDOM: ${vdom}.`)
        }
    }

    const patch = (dom, vdom, parent=dom.parentNode) => {
        const replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el)
        // 组件 vdom
        if (typeof vdom === 'object' && typeof vdom.type === 'function') {
            return Component.patch(dom, vdom, parent)
        }
        // 文本 dom 和原始类型 vdom, 比较值, 值不同则完全重新渲染
        else if (typeof vdom !== 'object' && dom instanceof Text) {
            return dom.textContent !== vdom ? replace(render(vdom, parent)) : dom
        }
        // 文本 dom 和复杂 vdom, 直接完全重新渲染
        else if (typeof vdom === 'object' && dom instanceof Text) {
            return replace(render(vdom, parent))
        }
        // 标签元素名不同, 直接完全重新渲染
        else if (typeof vdom === 'object' && dom.nodeName !== vdom.type.toUpperCase()) {
            return replace(render(vdom, parent))
        }
        // 标签名相同
        else if (typeof vdom === 'object' && dom.nodeName === vdom.type.toUpperCase()) {
            // pool: { key: child.__key || `__index_${index}` , value: childNode }
            const pool = {}
            // 当前获取焦点的元素
            const active = document.activeElement;
            // 为 node 添加 key
            [].concat(...dom.childNodes).map((child, index) => {
                const key = child.__key || `__index_${index}`
                pool[key] = child
            });
            [].concat(...vdom.children).map((child, index) => {
                const key = child.props && child.props.key || `__index_${index}`
                // 判断 dom 和 vdom 是否存在相同 key 的元素, 存在, 则 patch; 不存在, 则 render
                dom.appendChild(pool[key] ? patch(pool[key], child) : render(child, dom))
                delete pool[key]
            })
            // 此时 pool 存在的组件, 均为不在需要显示的组件
            for (const key in pool) {
                // 如果是 React 的组件, 还调用 componentWillUnmount 钩子函数
                const instance = pool[key].__instance
                if (instance) instance.componentWillUnmount()
                pool[key].remove()
            }
            // 重新设置 attributes
            for (const attr of dom.attributes) dom.removeAttribute(attr.name)
            for (const prop in vdom.props) setAttribute(dom, prop, vdom.props[prop])
            active.focus()
            return dom
        }
    }

    class Component {
        constructor(props) {
            this.props = props || {}
            this.state = null
        }

        // 封装一些基本渲染逻辑, 如触发钩子、附加到 DOM、储存实例
        static render(vdom, parent=null) {
            const props = Object.assign({}, vdom.props, {children: vdom.children})
            // vdom.type 是继承 Component class 的组件
            if (Component.isPrototypeOf(vdom.type)) {
                // 实例化 vdom.type 组件
                const instance = new (vdom.type)(props)
                // 调用 componentWillMount 钩子函数
                instance.componentWillMount()
                // instance.render() 调用子类实例的 render 函数
                // Component 组件不包含 render 逻辑, render 逻辑由继承的子类实现, instance.render() 是真正的渲染函数
                instance.base = render(instance.render(), parent)
                // Component 实例的引用
                instance.base.__instance = instance
                // 设置 key, 用于 patch 时候判断
                instance.base.__key = vdom.props.key
                // 调用 componentWillMount 钩子函数
                instance.componentDidMount()
                return instance.base
            } else {
                return render(vdom.type(props), parent)
            }
        }

        static patch(dom, vdom, parent=dom.parentNode) {
            const props = Object.assign({}, vdom.props, {children: vdom.children})
            // vdom.type 是 Component class 组件
            if (dom.__instance && dom.__instance.constructor === vdom.type) {
                // 调用 componentWillReceiveProps 钩子函数
                dom.__instance.componentWillReceiveProps(props)
                dom.__instance.props = props
                // dom.__instance.render(): 调用使用者的 render 函数
                return patch(dom, dom.__instance.render(), parent)
            }
            // vdom.type 是 Component class, 但是 __instance 不存在, 说明未经初始化 render
            else if (Component.isPrototypeOf(vdom.type)) {
                const ndom = Component.render(vdom, parent)
                return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom)
            }
            // vdom.type 不是 Component class
            else if (!Component.isPrototypeOf(vdom.type)) {
                return patch(dom, vdom.type(props), parent)
            }
        }

        // 设置组件状态
        setState(next) {
            // 判断 this.state 和 next 是否同是对象
            const compat = (a) => typeof this.state === 'object' && typeof a === 'object'
            // 组件需要更新
            if (this.base && this.shouldComponentUpdate(this.props, next)) {
                const prevState = this.state
                this.componentWillUpdate(this.props, next)
                // this.state 和 next 同是对象, 则合并; 不是, 则覆盖
                this.state = compat(next) ? Object.assign({}, this.state, next) : next
                // 更新完状态, 需要重新 patch 组件
                patch(this.base, this.render())
                // 调用 componentDidUpdate 钩子
                this.componentDidUpdate(this.props, prevState)
            }
            // 组件无需更新
            else {
                this.state = compat(next) ? Object.assign({}, this.state, next) : next
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            return nextProps !== this.props || nextState !== this.state
        }

        componentWillReceiveProps(nextProps) {
            return undefined
        }

        componentWillUpdate(nextProps, nextState) {
            return undefined
        }

        componentDidUpdate(prevProps, prevState) {
            return undefined
        }

        componentWillMount() {
            return undefined
        }

        componentDidMount() {
            return undefined
        }

        componentWillUnmount() {
            return undefined
        }
    }

    if (typeof module != 'undefined') module.exports = {createElement, render, Component}
    if (typeof module == 'undefined') window.Tinyact  = {createElement, render, Component}
})()
