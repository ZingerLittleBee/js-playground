/*
997. 找到小镇的法官
在一个小镇里，按从 1 到 n 为 n 个人进行编号。传言称，这些人中有一个是小镇上的秘密法官。

如果小镇的法官真的存在，那么：

小镇的法官不相信任何人。
每个人（除了小镇法官外）都信任小镇的法官。
只有一个人同时满足条件 1 和条件 2 。
给定数组  trust，该数组由信任对 trust[i] = [a, b]  组成，表示编号为 a 的人信任编号为 b 的人。
如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的编号。否则，返回 -1。
 */

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(n, trust) {
    let keySet = new Set()
    let value = []
    let count = []
    for (let i = 0; i < trust.length; i++) {
        keySet.add(trust[i][0])
        count[trust[i][1]] ? count[trust[i][1]] += 1 : (count[trust[i][1]] = 1, value.push(trust[i][1]))
    }
    if (keySet.size !== n - 1) return -1
    let maxCount = 0
    for (let i = 0; i < value.length; i++) {
        if (count[value[i]] > maxCount) maxCount = count[value[i]]
    }
    if (maxCount !== n - 1) return -1
    let countIndex = count.findIndex(v => v === maxCount)
    if (keySet.has(countIndex)) return -1
    return countIndex === -1 ? 1 : countIndex
};