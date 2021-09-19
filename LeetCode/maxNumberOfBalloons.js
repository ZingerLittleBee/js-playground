/*
1189. “气球” 的最大数量
给你一个字符串 text，你需要使用 text 中的字母来拼凑尽可能多的单词 "balloon"（气球）。
字符串 text 中的每个字母最多只能被使用一次。请你返回最多可以拼凑出多少个单词 "balloon"。
 */

/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    let map = new Map()
    let target = 'balloon'
    for (let i = 0; i < text.length; i++) {
        let currChar = text.charAt(i)
        if (target.includes(currChar)) {
            map.has(currChar) ? map.set(currChar, map.get(currChar) + 1) : map.set(currChar, 1)
        }
    }
    if (map.size !== 5) {
        return 0
    }
    let maxWord = []
    map.forEach(((value, key) => {
        if (key === 'l' || key === 'o') {
            maxWord.push(Math.floor(value / 2))
        } else {
            maxWord.push(value)
        }
    }))
    return Math.min(...maxWord)
};

// test
console.log(maxNumberOfBalloons("krhizmmgmcrecekgyljqkldocicziihtgpqwbticmvuyznragqoyrukzopfmjhjjxemsxmrsxuqmnkrzhgvtgdgtykhcglurvppvcwhrhrjoislonvvglhdciilduvuiebmffaagxerjeewmtcwmhmtwlxtvlbocczlrppmpjbpnifqtlninyzjtmazxdbzwxthpvrfulvrspycqcghuopjirzoeuqhetnbrcdakilzmklxwudxxhwilasbjjhhfgghogqoofsufysmcqeilaivtmfziumjloewbkjvaahsaaggteppqyuoylgpbdwqubaalfwcqrjeycjbbpifjbpigjdnnswocusuprydgrtxuaojeriigwumlovafxnpibjopjfqzrwemoinmptxddgcszmfprdrichjeqcvikynzigleaajcysusqasqadjemgnyvmzmbcfrttrzonwafrnedglhpudovigwvpimttiketopkvqw"))