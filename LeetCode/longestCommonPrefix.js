/*
14. 最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

提示：
1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 仅由小写英文字母组成
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    // 公共前缀
    let prefix = ''
    // 使用 strs[0] 作为起点, 因为是公共的前缀, 用哪个作起点都不影响
    for (let i = 0; i < strs[0].length; i++) {
        // 下一个要比较的前缀
        let prefixTemp = prefix + strs[0].charAt(i)
        // 遍历 strs 剩下的 string, 判断是否以 prefixTemp 开头
        for (let j = 1; j < strs.length; j++) {
            // 不是以 prefixTemp 开头, 则直接返回去掉最后一个元素的 prefixTemp
            if (!strs[j].startsWith(prefixTemp)) {
                return prefixTemp.slice(0, -1)
            }
        }
        // 都说明是符合公共前缀, 但不一定是最长, 要等 strs[0] 循环结束才能出结果
        prefix = prefixTemp
    }
    return prefix
};

console.log(longestCommonPrefix(["flower","flow","flight"]))