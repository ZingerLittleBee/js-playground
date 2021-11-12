/*
给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

提示：
1 <= nums.length <= 3 * 104
-231 <= nums[i] <= 231 - 1
nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次
进阶：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    return nums.filter(n => nums.indexOf(n) === nums.lastIndexOf(n))[0]
};

var singleNumber2 = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let head = 0
        let tail = nums.length - 1
        while (head !== i || tail !== i) {
            if ((nums[i] === nums[head] && i !== head) || (nums[i] === nums[tail] && i !== tail)) {
                break
            }
            head < i && head++
            tail > i && tail--
        }
        if (head === tail) {
            return nums[i]
        }
    }
};

var singleNumber3 = function(nums) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1)
    }
    for (const [index, value] of map.entries()) {
        if (value === 1) return index
    }
}

console.log(singleNumber3([0,1,0,1,0,1,100]))