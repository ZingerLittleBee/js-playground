/**
 * 链表合并
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */

class ListNode<T = any> {
    constructor(public value: T, public next?: ListNode<T>) {}
}

const linklistMerge = (l1: ListNode | undefined, l2: ListNode | undefined) => {
    let head = new ListNode(null)
    let curr = head
    while (l1 && l2) {
        if (l1.value > l2.value) {
            curr.next = l2
            l2 = l2.next
        }
        else {
            curr.next = l1
            l1 = l1.next
        }
        curr = curr.next
    }
    curr.next = l1 === null ? l2 : l1
    return head.next
}

let l1 = new ListNode(1, new ListNode(2, new ListNode(4)))
let l2 = new ListNode(1, new ListNode(3, new ListNode(4)))
let node = linklistMerge(l1, l2)

while (node) {
    console.log(node)
    node = node.next
}
