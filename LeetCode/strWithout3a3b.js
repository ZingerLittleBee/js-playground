/*
984. 不含 AAA 或 BBB 的字符串
给定两个整数A和B，返回任意字符串 S，要求满足：

- S 的长度为A + B，且正好包含A个 'a'字母与B个 'b'字母；
- 子串'aaa'没有出现在S中；
- 子串'bbb' 没有出现在S中。
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var strWithout3a3b = function(a, b) {
    let res = []
    while (a > 0 || b > 0) {
        if (a > b && a > 1 && b > 0) {
            res.push('aa')
            res.push('b')
            a -= 2
            b -= 1
        } else if (b > a && b > 1 && a > 0) {
            res.push('bb')
            res.push('a')
            b -= 2
            a -= 1
        } else {
            if (a > 0) {
                res.push('a')
                a -= 1
            }
            if (b > 0) {
                res.push('b')
                b -= 1
            }
        }

    }
    return res.join('')
}

console.log(strWithout3a3b(1, 3))