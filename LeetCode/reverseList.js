/*
https://leetcode.cn/problems/reverse-linked-list/
206. 反转链表
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
	const arr = []
	while (head) {
		arr.push(head)
		head = head.next
	}
	if (arr.length === 0) return null
	let newHead = arr.pop()
	let newNode = newHead
	while ((newNode.next = arr.pop())) {
		newNode = newNode.next
	}
	newNode.next = null
	return newHead
}

// test
class ListNode {
	constructor(val, next) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
	}
}

let head = new ListNode(
	1,
	new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
)
console.log(head, 5)
console.log(reverseList(head))
