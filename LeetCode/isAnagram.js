/*
242. 有效的字母异位词
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
提示:
1 <= s.length, t.length <= 5 * 104
s 和 t 仅包含小写字母

https://leetcode.cn/problems/valid-anagram/
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false
    let sMap = new Map()
    let tMap = new Map()
    for (let i = 0; i < s.length; i++) {
        if (sMap.get(s.charAt(i))) {
            sMap.set(s.charAt(i), sMap.get(s.charAt(i)) + 1)
        } else {
            sMap.set(s.charAt(i), 1)
        }
        if (tMap.get(t.charAt(i))) {
            tMap.set(t.charAt(i), tMap.get(t.charAt(i)) + 1)
        } else {
            tMap.set(t.charAt(i), 1)
        }
    }
    if (sMap.size !== tMap.size) return false
    for (const [key, value] of sMap.entries()) {
        if (tMap.get(key) !== value)
            return false
    }
    return true
};

// test
console.log(isAnagram("rat", "car"))
console.log(isAnagram("anagram", "nagaram"))
