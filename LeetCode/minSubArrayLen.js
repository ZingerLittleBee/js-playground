/*
给定一个含有 n 个正整数的数组和一个正整数 target 。
找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 
示例 1：
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。

示例 2：
输入：target = 4, nums = [1,4,4]
输出：1

示例 3：
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
 
提示：
1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 105
进阶：
如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
*/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let head = 0
    let tail = 0
    const length = nums.length
    const pre = [nums[0]]
    for (let i = 1; i < length; i++) {
        pre[i] = pre[i - 1] + nums[i]
    }
    for (let i = 0; i < length; i++) {
        head = 0
        tail = i
        while (tail < length) {
            if (head === tail) {
                if (nums[head] >= target) return 1
            } else {
                const headValue = head - 1 < 0 ? 0 : pre[head - 1]
                if (pre[tail] - headValue >= target) return tail - head + 1
            }
            head++
            tail++
        }
    }
    return 0
}

console.log('minSubArrayLen', minSubArrayLen(15, [1, 2, 3, 4, 5]))
