function movingCount(threshold, rows, cols) {
  if (threshold < 0 || rows < 0 || cols < 0) {
    return 0
  }

  let visited = []

  for (let i = 0; i < rows; i++) {
    visited.push([])
    for (let j = 0; j < cols; j++) {
      visited[i][j] = false
    }
  }
  let count = movingCountCore(threshold, rows, cols, 0, 0, visited)

  return count
}

function movingCountCore(threshold, rows, cols, row, col, visited) {
  let count = 0
  if (check(threshold, rows, cols, row, col, visited)) {
    visited[row][col] = true
    count = 1
      + movingCountCore(threshold, rows, cols, row, col + 1, visited)
      + movingCountCore(threshold, rows, cols, row + 1, col, visited)
  }

  return count
}

function check(threshold, rows, cols, row, col, visited) {
  try {
    if (row >= 0 && row < rows && col >= 0 && col < cols &&
      getDigitSum(row, col) <= threshold && !visited[row][col]) {
      return true
    }
  } catch (e) {
    console.log(e)
  }

  return false
}

function getDigitSum(row, col) {
  let sum = 0
  let str = row + '' + col
  for (let i = 0; i < str.length; i++) {
    sum += str.charAt(i) / 1
  }
  return sum
}

console.log(movingCount(5, 10, 10))