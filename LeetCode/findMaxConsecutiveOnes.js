/*
485. 最大连续 1 的个数
给定一个二进制数组， 计算其中最大连续 1 的个数。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let str = nums.join('')
    let strArr = str.match(/1+/g)
    if (!strArr) return 0
    let maxLength = 0
    strArr.forEach(s => {
        if (s.length > maxLength) maxLength = s.length
    })
    return maxLength
};

var findMaxConsecutiveOnes2 = function(nums) {
    let maxLength = [0]
    nums.forEach(n => {
        if (n !== 0) {
            maxLength[maxLength.length - 1] += 1
        } else {
            maxLength.push(0)
        }
    })
   return Math.max(...maxLength)
};

console.log(findMaxConsecutiveOnes2([0,1,1,1,1,0,1,1,0,1]))