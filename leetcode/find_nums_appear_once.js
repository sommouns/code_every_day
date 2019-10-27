function orElse(arr) {
  var sum = -1
  for (let index = 1; index < arr.length; index++) {
    if (sum === -1) {
      sum = arr[index - 1] ^ arr[index]
    } else {
      sum = arr[index] ^ sum
    }
  }
  return sum
}

function firstBinary1(num) {
  if (num === 0) return 0
  var n = 1
  while (true) {
    if (num & n === n) {
      return n
    }
    n = n >> 1
  }
}

function group(arr, num, a = [], b = []) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] & num === num) {
      a.push(arr[i])
    } else {
      b.push(arr[i])
    }
  }
}

function findNums(arr) {
  var sum = orElse(arr)
  var n = firstBinary1(sum)
  var a = [], b = []
  group(arr, n, a, b)
  return [orElse(a), orElse(b)]
}
console.log(findNums([1, 1, 2, 3, 2, 4]))