/*
50. Pow(x, n)
实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，x^n ）。
https://leetcode.cn/problems/powx-n/
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) {
        return 1
    }
    if (n === 1) {
        return x
    }
    if (n < 0) {
        return 1 / myPow(x, -n)
    }
    if (n % 2 === 0) {
        const temp = myPow(x, n / 2)
        return temp * temp
    }
    const temp2 = myPow(x, Math.floor(n / 2))
    return x * temp2 * temp2
};

// test
console.log(myPow(2.00000, 10))
console.log(myPow(2.10000, 3))
console.log(myPow( 2.00000, -2))
console.log(myPow( 0.00001, 2147483647))
