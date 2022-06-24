/*
20. 有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

提示：
1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成


https://leetcode.cn/problems/valid-parentheses/description/
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	let stack = []
	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) === '(' || s.charAt(i) === '{' || s.charAt(i) === '[') {
			stack.push(s.charAt(i))
			continue
		}
		if (s.charAt(i) === ')') {
			if (stack.pop() !== '(') return false
		}
		if (s.charAt(i) === ']') {
			if (stack.pop() !== '[') return false
		}
		if (s.charAt(i) === '}') {
			if (stack.pop() !== '{') return false
		}
	}
	return stack.length === 0
}

// test
console.log(isValid('('))
