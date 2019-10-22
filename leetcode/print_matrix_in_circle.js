function printMatrixClockWisely(matrix, rows, cols) {

  if (!matrix || cols < 0 || rows < 0) {
    return 'invalid input'
  }

  var start = 0

  while (rows > start * 2 && cols > start * 2) {
    printMatrixInCircle(matrix, rows, cols, start)
    start++
  }
}

function printMatrixInCircle(matrix, rows, cols, start) {

  var endX = cols - 1 - start
  var endY = rows - 1 - start

  for (let i = start; i <= endX; i++) {
    var num = matrix[start][i]
    console.log(num)
  }
  if (start < endY) {
    for (let i = start + 1; i <= endY; i++) {
      var num = matrix[i][endX]
      console.log(num)
    }
  }

  if (start < endX && start < endY) {
    for (let i = endX - 1; i >= start; i--) {
      var num = matrix[endY][i]
      console.log(num)
    }
  }

  if (start + 1 < endY) {
    for (let i = endY - 1; i > start; i--) {
      var num = matrix[i][start]
      console.log(num)
    }
  }
}
var arr = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9]
]
printMatrixClockWisely(arr, 5, 5)