/*
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
注: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const mergeOrderedArray = (nums1, m, nums2, n) => {
    // 指向 nums1 有效尾部
    let i = m - 1
    // 指向 nums2 有效尾部
    let j = n - 1
    // 指向 nums1 + nums2 有效尾部
    let k = m + n - 1
    while (i >= 0 && j >= 0) {
        // 取较大值添加到 nums1[k] 处
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            // 移动指针位置
            i--
        } else {
            nums1[k] = nums2[j]
            // 移动指针位置
            j--
        }
        k--
    }
    // 如果 j 先遍历完, 则不需要额外处理, 因为 nums1 本来就是需要返回值
    // 如果 i 先遍历完, 需要将 nums2 继续添加到 nums1 中
    if (j >= 0) {
        nums1[k] = nums2[j]
        j--
        k--
    }
}