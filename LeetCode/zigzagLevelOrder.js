/*
103. 二叉树的锯齿形层序遍历
给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 
示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]

示例 2：
输入：root = [1]
输出：[[1]]

示例 3：
输入：root = []
输出：[]
 
提示：
树中节点数目在范围 [0, 2000] 内
-100 <= Node.val <= 100
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    if (!root) return []
    const queue = [root]
    const ans = []
    // true: 从左到右, false: 从右到左
    let isOrderLeft = true
    while (queue.length !== 0) {
        const size = queue.length
        // 双端队列
        const sub = []
        for (let i = 0; i < size; i++) {
            // 出队
            const element = queue.shift()
            if (isOrderLeft) {
                sub.push(element.val)
            } else {
                sub.unshift(element.val)
            }
            if (element.left) queue.push(element.left)
            if (element.right) queue.push(element.right)
        }
        isOrderLeft = !isOrderLeft
        ans.push(sub)
    }
    return ans
}
