/*
剑指 Offer 26. 树的子结构
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
B是A的子结构， 即 A中有出现和B相同的结构和节点值。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
    // 约定空树不是任意一个树的子结构
    if (A === null || B === null) {
        return false
    }
    // B初次不为null, 如果B递归到null, 说明B已经递归到底
    const isSame = (A, B) => {
        if (B === null) return true
        if (A === null) return false
        return A.val === B.val && isSame(A.left, B.left) && isSame(A.right, B.right)
    }
    return isSame(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};