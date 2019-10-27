function findNum(arr) {
  if (!arr.length) return false

  var n = 1
  var res = 0
  var count = []
  for (let i = 0; i < arr.length; i++) {
    var index = 0
    var num = arr[i]
    while (num !== 0) {
      if (num & 1 === 1) {
        if (!count[index] && count[index] !== 0) {
          count[index] = 1
        } else {
          count[index]++
        }
      }
      index++
      num = num >> 1
    }
  }
  for (let i = 0; i < count.length; i++) {
    if (count[i] % 3) {
      res += 1 << i
    }
  }

  return res
}
console.log(findNum([1, 1, 1, 6, 3, 3, 3]))