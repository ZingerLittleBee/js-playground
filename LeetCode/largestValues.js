/*
剑指 Offer II 044. 二叉树每层的最大值
给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
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
 * @return {number[]}
 */
var largestValues = function(root) {
    if (!root) return []
    // 先处理根节点
    res.push(root.val)
    // 每层最大值数组
    let res = []
    const maxVal = (...tn) => {
        if (tn.length === 0) return
        // 当前层的最大值
        let maxTemp = -Infinity
        // 用于存在下一层需要判断的节点
        let next = []
        for (let i = 0; i < tn.length; i++) {
            if (tn[i] === null) continue
            if (tn[i].val > maxTemp) {
                maxTemp = tn[i].val
            }
            if (tn[i].left) next.push(tn[i].left)
            if (tn[i].right) next.push(tn[i].right)
        }
        if (maxTemp > -Infinity) res.push(maxTemp)
        maxVal(...next)
    }
    maxVal(root.left, root.right)
    return res
};

// test
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let rootTree = new TreeNode(
    1,
    new TreeNode(3, new TreeNode(5, null, null), new TreeNode(3, null, null)),
    new TreeNode(2, new TreeNode(null, null, null), new TreeNode(9, null, null))
)

console.log('largestValues', largestValues(rootTree))