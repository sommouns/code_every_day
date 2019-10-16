/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {

  var length = s.length
  var res = ''

  for (let i = 0; i < s.length; i++) {
    var count = 1
    var broadRes
    var offset = 0
    for (let j = i + 1; j < s.length; j++) {
      if ((j === i + 1) && (s[i] !== s[j])) break
      if (s[i] === s[j]) {
        offset++
      } else {
        break
      }
    }
    if (offset) {
      var str = s[i]
      for (let j = 0; j < offset; j++) {
        str += s[i]
      }
      broadRes = oddBroad(i, count, str, offset)
    } else {
      broadRes = broad(i, count)
    }
    res = (broadRes.length > res.length) ? broadRes : res
  }

  // 中心扩散 一般情况
  function broad(index, count, str = s[index]) {

    if (index - count < 0 || index + count > length - 1) {
      return str
    }
    if (s[index - count] === s[index + count]) {
      return broad(index, count + 1, `${s[index - count]}${str}${s[index + count]}`)
    } else {
      return str
    }
  }

  // bb为中心的情况
  function oddBroad(index, count, str = s[index], offset) {
    if (index - count < 0 || index + count + offset > length - 1) {
      return str
    }
    if (s[index - count] === s[index + count + offset]) {
      return oddBroad(index, count + 1, `${s[index - count]}${str}${s[index + count + offset]}`, offset)
    } else {
      return str
    }
  }
  return res
};

console.log(longestPalindrome("tattarrattat"))