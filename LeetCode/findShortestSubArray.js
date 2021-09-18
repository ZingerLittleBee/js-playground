// 697. 数组的度

/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
    // key: 数组字符, value: 出现次数
    let map = new Map()
    nums.forEach(n => {
        map.has(n) ? map.set(n, map.get(n) + 1) : map.set(n, 1)
    })
    // 找到数组的度, 可能有多个匹配项
    // [{ 数组字符, 出现次数 }]
    let maxArr = []
    map.forEach(((value, key) => {
        if (maxArr.length === 0) {
            maxArr.push({ key, value })
        } else {
            // 如果当前出现次数大于 maxArr 中出现次数, 则更新 maxArr
            if (value > maxArr[0].value) {
                // 清空数组
                maxArr.length = 0
                maxArr.push({ key, value })
            }
            // 相等就是相同度, 则 push
            if (value === maxArr[0].value) {
                maxArr.push({ key, value })
            }
        }
    }))
    // 找到数组度的元素的长度
    let minLength = []
    maxArr.forEach(m => {
        // 首次出现 index
        let firstIndex = nums.findIndex(n => n === m.key)
        // 最后一次出现 index
        let lastIndex
        for (let i = firstIndex; i < nums.length; i++) {
            if (nums[i] === m.key) {
                lastIndex = i
            }
        }
        // 做差, 获取与原数组度相等的最小长度数组
        minLength.push(lastIndex - firstIndex + 1)
    })
    // 多个度中的最小值
    return Math.min(...minLength)
};

// test
let arr = [1, 2, 2, 3, 1]
console.log(findShortestSubArray(arr))