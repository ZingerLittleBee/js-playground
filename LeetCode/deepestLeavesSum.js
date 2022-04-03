/*
1302. 层数最深叶子节点的和
给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。

示例 1：
输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
输出：15

示例 2：
输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
输出：19
 
提示：
树中节点数目在范围 [1, 104] 之间。
1 <= Node.val <= 100
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
    const queue = [root]
    const res = []
    while (queue.length !== 0) {
        const sub = []
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const element = queue.shift()
            sub.push(element.val)
            if (element.right) queue.push(element.right)
            if (element.left) queue.push(element.left)
        }
        res.push(sub)
    }
    const ansArr = res[res.length - 1]
    let sum = 0
    for (let i = 0; i < ansArr.length; i++) {
        sum += ansArr[i]
    }
    return sum
}
