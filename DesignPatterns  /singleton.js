// 类实现(可以将逻辑直接写到 constructor 中)
class Singleton {
    show() {
        console.log('this is show func')
    }
    static getInstance() {
        // 如果 instance 实例不存在, 则创建 instance
        if (!Singleton.instance) {
            Singleton.instance = new Singleton()
        }
        return Singleton.instance
    }
}

let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2); // true

// 闭包实现
Singleton.getInstance = (function () {
    let instance = null
    return function () {
        if (!instance) {
            instance = new Singleton()
        }
        return instance
    }
}())

let s3 = Singleton.getInstance()
let s4 = Singleton.getInstance()
console.log(s3 === s4) // true