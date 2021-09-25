/*
1672. 最富有客户的资产总量
给你一个 m x n 的整数网格 accounts ，其中 accounts[i][j] 是第 i​​​​​​​​​​​​ 位客户在第 j 家银行托管的资产数量。返回最富有客户所拥有的 资产总量 。

客户的 资产总量 就是他们在各家银行托管的资产数量之和。最富有客户就是 资产总量 最大的客户。
*/

/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
    let maxWealth = []
    accounts.forEach(account => {
        maxWealth.push(account.reduce((acc, cur) => acc += cur))
    })
    return Math.max(...maxWealth)
};