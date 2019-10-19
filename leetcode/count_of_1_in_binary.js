
// 负数会死循环
function number1OfBinary(num) {
  var count = 0
  while (num) {
    if (num & 1) count++
    num = num >> 1
  }
  return count
}

console.log(number1OfBinary(1))

// 常规解法
function number1OfBinary2(num) {
  var count = 0
  var flag = 1
  while (flag) {
    if (num & flag) count++
    flag = flag << 1
  }
  return count
}

console.log(number1OfBinary2(9))


