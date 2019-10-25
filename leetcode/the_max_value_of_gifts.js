function getMaxValue(arr) {
  if (!arr) return false
  var rows = arr.length
  var cols = arr.length
  var temp = new Array(cols)
  temp.fill(0)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      var up = i > 0 ? temp[j] : 0
      var left = j > 0 ? temp[j - 1] : 0
      temp[j] = Math.max(up, left) + arr[i][j]
    }
  }
  console.log(temp[cols - 1])
}

getMaxValue([
  [1, 10, 3, 8],
  [12, 2, 9, 6],
  [5, 7, 4, 11],
  [3, 7, 16, 5]
])