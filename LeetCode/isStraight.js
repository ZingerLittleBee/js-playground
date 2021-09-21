/*
剑指 Offer 61. 扑克牌中的顺子
从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    let set = new Set()
    let max = 0
    let min = 14
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) continue
        if (set.has(nums[i])) return false
        set.add(nums[i])
        max = Math.max(max, nums[i])
        min = Math.min(min, nums[i])
    }
    return max - min < 5
};

console.log(isStraight([0,0,2,2,5]))