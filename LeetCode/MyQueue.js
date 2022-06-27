/*
232. 用栈实现队列
https://leetcode.cn/problems/implement-queue-using-stacks/
请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false
说明：

你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

 */

var MyQueue = function() {
    this.inStack = []
    this.outStack = []
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.inStack.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (!this.outStack.length) {
        let temp
        while(temp = this.inStack.pop()) {
            this.outStack.push(temp)
        }
    }
    return this.outStack.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    const head = this.pop()
    if (head) this.outStack.push(head)
    return head
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.inStack.length && !this.outStack.length
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// test
var obj = new MyQueue()
obj.push(1)
obj.push(2)
var param_2 = obj.pop()
console.log('param_2', param_2)
var param_3 = obj.peek()
console.log('param_3', param_3)
var param_4 = obj.empty()
console.log('param_4', param_4)
