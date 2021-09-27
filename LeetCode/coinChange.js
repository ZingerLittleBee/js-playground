/*
剑指 Offer II 103. 最少的硬币数目
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

你可以认为每种硬币的数量是无限的。
*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    // 保存每个 amount 的最小硬币个数
    const f = []
    // 已知条件
    f[0] = 0
    // 遍历 [1, amount] 之间总额
    for (let i = 1; i <= amount; i++) {
        f[i] = Infinity
        // 遍历硬币数值, 找出可以用的面值
        for (let j = 0; j < coins.length; j++) {
            // 当总额大于当前硬币面值, 才有可能是最小值
            if (i - coins[j] >= 0) {
                f[i] = Math.min(f[i], f[i - coins[j]] + 1)
            }
        }
    }

    if (f[amount] === Infinity) {
        return -1
    }
    return f[amount]
};