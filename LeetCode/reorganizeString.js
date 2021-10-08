/*
767. 重构字符串
给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
若可行，输出任意可行的结果。若不可行，返回空字符串。

注意:
S 只包含小写字母并且长度在[1, 500]区间内。
 */

/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function(s) {
    let map = new Map
    // 处理 map 中的数据, 如果 value === 1, 即需要删除该字段; 大于 1, 则 value - 1, 返回 key
    let handler = (key, value) => (value === 1 ? map.delete(key) : map.set(key, value - 1), key)
    let res = ''
    // 统计每个字符出现的次数
    for (let char of s) map.set(char, map.has(char) ? map.get(char) + 1 : 1)
    while(map.size) {
        // map 按照 value 排序
        let a = Array.from(map.entries()).sort((a, b) => b[1] - a[1])
        // 判断 res 中最后一个字符是否等于 a 中的第一个字符, 相等则说明无解
        if (res.slice(-1) === a[0][0]) {
            res = ''
            break
        }
        // a[0][0] 是 map 中 value 最大的 key, a[1][0] 是 map 中 value 第二大的 key
        res += handler(a[0][0], a[0][1]) + (a[1] ? handler(a[1][0], a[1][1]) : '')
    }
    return res
};

console.log(reorganizeString('aab'))