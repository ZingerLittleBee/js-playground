/*
15. 三数之和
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

提示：
0 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) {
        return []
    }
    nums.sort((a, b) => a - b)
    const res = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break
        if (i > 0 && nums[i] === nums[i - 1]) continue
        let pre = i + 1
        let tail = nums.length - 1
        while (pre < tail) {
            let sum = nums[i] + nums[pre] + nums[tail]
            if (sum === 0) {
                res.push([nums[i], nums[pre], nums[tail]]);
                while (pre - 1 > i && pre < tail && nums[pre] === nums[pre + 1]) {
                    pre++
                }
                while (pre < tail && nums[tail] === nums[tail - 1]) {
                    tail--
                }
                tail--
                pre++
            } else {
                if (sum > 0) {
                    tail--
                } else {
                    pre++
                }
            }
        }
    }
    return res
};

// test
console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([0, 0, 0, 0]))
console.log(threeSum([-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]))
console.log(threeSum([-2,0,0,2,2]))
