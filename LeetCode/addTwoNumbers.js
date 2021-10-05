/*
445. 两数相加 II
给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
你可以假设除了数字 0 之外，这两个数字都不会以零开头。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers1 = function(l1, l2) {
    // 定义栈结构
    class Stack {
        arr = []
        // 出栈
        get() {
            return this.arr.pop()
        }
        // 入栈
        add(...args) {
            this.arr.push(...args)
        }
        // 判断栈是否为空
        isEmpty() {
            return this.arr.length === 0
        }
    }
    // 将 l1, l2 入栈
    const addStack = (l, stack) => {
        if (l == null) return
        stack.add(l)
        if (l.next) {
            addStack(l.next, stack)
        }
    }
    let stack1 = new Stack()
    addStack(l1, stack1)
    let stack2 = new Stack()
    addStack(l2, stack2)

    let newListNode = null
    // 进位
    let further = 0
    while((stack1 && !stack1.isEmpty()) || (stack2 && !stack2.isEmpty()) || further !== 0) {
        let val = (stack1 ? !stack1.isEmpty() ? stack1.get().val : 0 : 0) + (stack2 ? !stack2.isEmpty() ? stack2.get().val : 0 : 0) + further
        further = 0
        if (val - 10 >= 0) {
            val = val - 10
            further = 1
        }
        let node = new ListNode(val)
        node.next = newListNode
        newListNode = node
    }
    return newListNode
};

var addTwoNumbers2 = function(l1, l2) {
    const stack1 = [];
    const stack2 = [];
    while (l1 || l2) {
        if (l1) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        if (l2) {
            stack2.push(l2.val);
            l2 = l2.next;
        }
    }
    let carry = 0;
    let ansList = null;
    while (stack1.length || stack2.length || carry !== 0) {
        const s1 = stack1.length ? stack1.pop() : 0;
        const s2 = stack2.length ? stack2.pop() : 0;
        let val = s1 + s2 + carry;
        carry = parseInt(val / 10);
        val = val % 10;
        const curNode = new ListNode(val);
        curNode.next = ansList;
        ansList = curNode;
    }
    return ansList;
};

// test
function ListNode(val, next) {
   this.val = (val===undefined ? 0 : val)
   this.next = (next===undefined ? null : next)
}

addTwoNumbers1(
    new ListNode(7, new ListNode(2, new ListNode(4, new ListNode(3, null)))),
    new ListNode(7, new ListNode(2, new ListNode(4, new ListNode(3, null))))
)