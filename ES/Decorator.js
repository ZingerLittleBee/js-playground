// 类装饰器
function classDecorator(target) {
    target.hasDecorator = true
    return target
}

const { sleep } = require('sleep')

@classDecorator
class Button {
    @funcExecTime
    onClick() {
        console.log('button onclick event')
        sleep(1)
    }

}

// 需使用 babel 编译: babel Decorator.js --out-file babel_decorator.js
console.log('Button 是否被装饰: ', Button.hasDecorator)

/*
属性描述对象
descriptor {
  value: [Function: onClick],
  writable: true,
  enumerable: false,
  configurable: true
}
 */

// 类方法装饰器, 打印方法执行时间
function funcExecTime(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function() {
        console.log(name, '被装饰')
        console.time(`方法: ${name}, 执行时间`)
        originalMethod.apply(this, arguments)
        console.timeEnd(`方法: ${name}, 执行时间`)
    }
    return descriptor
}

const btn = new Button()
btn.onClick()