/*
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
注: 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 */

/**
 * @param {Number[]} nums
 * @param {Number} target
 */
const findSumIndex = (nums, target) => {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        // 判断差值是否在 map 中存在
        if (map.has( target - nums[i])) {
            // 存在, 则条件成立, 返回下标
            return [map.get(target - nums[i]), i]
        }
        // 不存在则将当前值存入 map
        map.set(nums[i], i)
    }
}