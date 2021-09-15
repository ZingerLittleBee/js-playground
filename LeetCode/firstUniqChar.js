// 剑指 Offer 50. 第一个只出现一次的字符

/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
    let map = new Map()
    // key: char, value: char 出现的次数
    for (let i = 0; i < s.length; i++) {
        let value = map.get(s.charAt(i))
        if (value) {
            map.set(s.charAt(i), ++value)
        } else {
            map.set(s.charAt(i), 1)
        }
    }
    for (let [key, value] of map) {
        if (value === 1) return key
    }
    return ' '
};