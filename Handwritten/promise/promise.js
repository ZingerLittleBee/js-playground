function MyPromise(executor) {
    // 2.1 Promise 的状态必须处于以下三种状态之一：pending，fulfilled 或者 rejected
    this.state = 'pending'
    // 2.2.6.1 如果 promise 处于 fulfilled 状态，所有相对应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行
    this.onFulfilledCallback = []
    // 2.2.6.2 如果 Promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行
    this.onRejectedCallback = []

    const resolve = (value) => {
        setTimeout(() => {
            /*
            2.1.1 当 Promise 处于 pending 状态时
                2.1.1.1 可以转换到 fulfilled 或 rejected 状态
            2.1.2 当 Promise 处于 fulfilled 状态时
                2.1.2.1 不可过度到任何其他状态
                2.1.2.2 必须有一个不能改变的值
             */
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.data = value
                // 2.2.6.1 如果 promise 处于 fulfilled 状态，所有相对应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行
                for (let i = 0; i < this.onFulfilledCallback.length; i++) {
                    this.onFulfilledCallback[i](value)
                }
            }
        })
    }

    const reject = (reason) => {
        setTimeout(() => {
            /*
            2.1.1 当 Promise 处于 pending 状态时
                2.1.1.1 可以转换到 fulfilled 或 rejected 状态
            2.1.2 当 Promise 处于 fulfilled 状态时
                2.1.2.1 不可过度到任何其他状态
                2.1.2.2 必须有一个不能改变的值
             */
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.data = reason
                // 2.2.6.1 如果 promise 处于 fulfilled 状态，所有相对应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行
                for (let i = 0; i < this.onRejectedCallback.length; i++) {
                    this.onRejectedCallback[i](reason)
                }
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (reason) {
        reject(reason)
    }
}

/*
2.2 then 方法
一个 promise 必须提供一个 then 方法来访问其当前值或最终值或 rejected 的原因
一个 promise 的 then 方法接收两个参数
promise.then(onFulfilled, onReject)
 */
MyPromise.prototype.then = (onFulfilled, onRejected) => {
    let promise2
    // 2.2.7 then 必须返回一个 promise
    return (promise2 = new MyPromise((resolve, reject) => {
        /*
        2.2.2 如果 onFulfilled 是一个函数
            2.2.2.1 它必须在 promise 的状态为 fulfilled 后调用，并将 promise 的值作为它的第一个参数
            2.2.2.2 它一定不能在 promise 的状态变为 fulfilled 前调用
            2.2.2.3 它最多只能被调用一次
         */
        if (this.state === 'fulfilled') {
            // 2.2.4 onFulfilled 或 onRejected 在执行上下文堆栈仅包含平台代码之前不得调用
            // 3.1 这可以通过"宏任务"机制(例如 setTimeout 或 setImmediate)或"微任务"机制(例如 MutationObserver 或 process.nextTick)来实现
            setTimeout(() => {
                /*
                2.2.1 onFulfilled 和 onRejected 都是可选参数
                    2.2.1.1 如果 onFulfilled 不是一个函数，它必须被忽略
                 */
                if (typeof onFulfilled === 'function') {
                    try {
                        // 2.2.2.1 它必须在 promise 的状态为 fulfilled 后被调用，并将 promise 的值作为它的第一个参数
                        // 2.2.5 onFulfilled 和 onRejected 必须作为函数调用
                        const x = onFulfilled(this.data)
                        // 2.2.7.1 如果 onFulfilled 或 onrejected 返回一个值 x，则运行 Promise 处理程序 [[Resolve]](promise2, x)
                        promiseResolutionProcedure(promise2, x, resolve, reject)
                    } catch (e) {
                        // 2.2.7.2 如果 onFulfilled 或 onRejected 抛出了一个异常，promise2 必须用 e 作为 reason 来变为 rejected 状态
                        reject(e)
                    }
                } else {
                    // 2.2.7.3 如果 onFulfilled 不是一个函数且 promise1 为 fulfilled 状态，promise2 必须用和 promise1 一样的值来变为 fulfilled 状态
                    resolve(this.data)
                }
            });
        }
        /*
        2.2.3 如果 onRejected 是一个函数
            2.2.3.1 它必须在 promise 的状态变为 rejected 后被调用，并将 promise 的 reason 作为它的第一个参数
            2.2.3.2 它一定不能在 promise 的状态变为 rejected 前被调用
            2.2.3.3 它最多只能被调用一次
         */
        else if (this.state === 'rejected') {
            // 2.2.4 onFulfilled 或 onRejected 在执行上下文堆栈仅包含平台代码之前不得调用
            // 3.1 这可以通过"宏任务"机制(例如 setTimeout 或 setImmediate)或"微任务"机制(例如 MutationObserver 或 process.nextTick)来实现
            setTimeout(() => {
                /*
                2.2.1 onFulfilled 和 onRejected 都是可选参数
                    2.2.1.1 如果 onFulfilled 不是一个函数，它必须被忽略
                 */
                if (typeof onRejected === 'function') {
                    try {
                        // 2.2.3.1 它必须在 promise 的状态为 rejected 后被调用，并将 promise d  reason 作为它的第一个参数
                        // 2.2.5 onFulfilled 和 onRejected 必须作为函数调用
                        const x = onRejected(this.data)
                        // 2.2.7.1 如果 onFulfilled 或 onRejected 返回了一个值 x，则运行 Promise 处理程序 [[Resolve]](promise2, x)
                        promiseResolutionPromise(promise2, x, resolve, reject)
                    } catch (e) {
                        // 2.2.7.2 如果 onFulfilled 或 onRejected 抛出了一个异常，promise2 必须用 e 作为 reason 来变为 rejected 状态
                        reject(e)
                    }
                }
                // 2.2.7.4 如果 onRejected 不是一个函数且 promise1 为 rejected 状态，promise2 必须用和 promise1 一样的 reason 来变为 rejected 状态
                else {
                    reject(this.data)
                }
            })
        } else if (this.state === 'pending') {
            /*
            2.2.6 then 可能会被同一个 promise 多次调用
                2.2.6.1 如果 promise 处于fulfilled 状态，所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行
             */
            this.onFulfilledCallback.push((promise1Value) => {
                if (typeof onFulfilled === 'function') {
                    try {
                        // 2.2.2.1 它必须在 promise 的状态变为 fulfilled 后被调用，并将 promise 的值作为它的第一个参数
                        // 2.2.5 onFulfilled 和 onRejected 必须作为函数调用
                        const x = onFulfilled(this.data)
                        // 2.2.7.1 如果 onFulfilled 或 onRejected 返回了一个值 x，则运行 Promise 处理程序 [[Resolve]](promise2, x)
                        primiseResolutionProcedure(promise2, x, resolve, reject)
                    } catch (e) {
                        // 2.2.7.2 如果 onFulfilled 和 onRejected 抛出了一个异常，promise2 必须用 e 作为 reason 来变为 rejected 状态
                        reject(e)
                    }
                }
                // 2.2.7.3 如果 onFulfilled 不是一个函数且 promise1 为 fulfilled 状态，promise2 必须用和 promise1 一样的值来变为 fulfilled 状态
                else {
                    resolve(promise1Value)
                }
            })
            // 2.2.6.2 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行
            this.onRejectedCallback.push((promise1Reason) => {
                if (typeof onRejected === 'function') {
                    try {
                        // 2.2.3.1 它必须在 promise 的状态变为 rejected 后被调用，并将 promise 的 reason 作为它的第一个参数
                        // 2.2.5 onFulfilled 和 onRejected 必须作为函数调用
                        const x = onRejected(this.data)
                        promiseResolutionProcedure(promise2, x, resolve, reject)
                    } catch (e) {
                        // 2.2.7.2 如果 onFulfilled 和 onRejected 抛出了一个异常，promise2 必须用 e 作为 reason 来变为 rejected 状态
                        reject(e)
                    }
                }
                // 2.2.7.4 如果 onRejected 不是一个函数且 promise1 为 rejected 状态，promise2 必须用和 promise1 一样的 reason 来变为 rejected 状态
                else {
                    reject(promise1Reason)
                }
            })
        }
    }))
}

// 2.3 Promise 处理程序
// Promise 处理程序是一个将 promise 和 value 作为输入的抽象操作，我们将其表示为 [[Resolve]](promise, x)

const promiseResolutionProcedure = (promise2, x, resolve, reject) => {}