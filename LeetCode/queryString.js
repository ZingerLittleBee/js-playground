/*
1016. 子串能表示从 1 到 N 数字的二进制串
给定一个二进制字符串 S（一个仅由若干 '0' 和 '1' 构成的字符串）和一个正整数 N，如果对于从 1 到 N 的每个整数 X，其二进制表示都是 S 的子串，就返回 true，否则返回 false。

提示：
1 <= S.length <= 1000
1 <= N <= 10^9
 */

/**
 * @param {string} s
 * @param {number} n
 * @return {boolean}
 */
var queryString = function(s, n) {
    let current = 1
    while (current !== n + 1) {
        if (!s.includes(current.toString(2))) return false
        current++
    }
    return true
};

console.log(queryString('0110', 4))