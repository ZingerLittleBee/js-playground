/*
1347. 制造字母异位词的最小步骤数
给你两个长度相等的字符串 s 和 t。每一个步骤中，你可以选择将 t 中的 任一字符 替换为 另一个字符。
返回使 t 成为 s 的字母异位词的最小步骤数。
字母异位词 指字母相同，但排列不同（也可能相同）的字符串。

提示：
1 <= s.length <= 50000
s.length == t.length
s 和 t 只包含小写英文字母
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function(s, t) {
    // a 的 ascii 是 97
    const BASE = 97
    let count1 = new Array(26).fill(0)
    let count2 = new Array(26).fill(0)
    // 遍历 s 字符出现的次数
    for (let i = 0; i < s.length; i++) {
        count1[s.charCodeAt(i) - BASE] += 1
    }
    // 遍历 t 字符出现的次数
    for (let j = 0; j < t.length; j++) {
        count2[t.charCodeAt(j) - BASE] += 1
    }
    let sum = 0
    // s 中字符出现的次数大于 t 则需要替换, 替换次数就是差值
    for (let k = 0; k < 26; k++) {
        sum += count1[k] - count2[k] > 0 ? count1[k] - count2[k] : 0
    }
    return sum
};

// 优化, 减少一次遍历
var minSteps2 = function(s, t) {
    // a 的 ascii 是 97
    const BASE = 97
    let count = new Array(26).fill(0)
    // 遍历字符, 计算出现的次数差值
    // s.length === t.length
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - BASE] += 1
        count[t.charCodeAt(i) - BASE] -= 1
    }
    let sum = 0
    // s 中字符出现的次数大于 t 则需要替换, 替换次数就是差值
    for (let j = 0; j < 26; j++) {
        sum += count[j] > 0 ? count[j] : 0
    }
    return sum
};

console.log('minSteps2', minSteps2('leetcode', 'practice'))