/*
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
> 注意: 给定 n 是一个正整数。
*/

// 递归
const recursive = (n) => {
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    return recursive(n - 1) + recursive(n - 2)
}

// 记忆化搜索
const f = []
const memorize = (n) => {
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    // 判断 f(n) 是否存在, 如不存在, 则计算; 如存在, 则直接返回
    return f[n] ? f[n] : recursive(n - 1) + recursive(n - 2)
}

// 动态规划
const dp = (n) => {
    // 初始化状态数组
    let f = [1, 2]
    // 更新每一层楼梯对应的结果
    for (let i = 2; i < n; i++) {
        f[i] = f[i - 1] + f[i - 2]
    }
    // 返回结果
    return f[n - 1]
}