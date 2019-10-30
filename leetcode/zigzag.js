/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows <= 0) return
  var curRow = 0
  var maxRows = numRows
  var arr = []
  var flag = 'up'
  for (let i = 0; i < maxRows; i++) {
    arr.push([])
  }

  for (let i = 0; i < s.length; i++) {
    if (curRow >= maxRows) {
      if (flag === 'up') {
        curRow = curRow - 2
        if (curRow <= 0) {
          curRow = 0
          maxRows = numRows
          flag = 'up'
        } else {
          maxRows--
        }
      } else {
        curRow = 0
        flag = 'down'
        maxRows = numRows
      }
    }
    arr[curRow].push(s[i])
    curRow++
  }
  var row = 0
  var res = ''
  for (let i = 0; i < arr.length; i++) {
    res += arr[i].join('')
  }

  return res
};

var str = convert("LEETCODEISHIRING", 0)
console.log(str)