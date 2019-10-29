function byteAdd(num1, num2) {
  var sum, carry
  do {
    sum = num1 ^ num2
    carry = (num1 & num2) << 1
    num1 = sum
    num2 = carry
  } while (num2 !== 0)
  return num1
}

console.log(byteAdd(5, 17))