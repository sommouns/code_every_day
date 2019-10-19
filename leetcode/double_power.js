function doublePower(base, exponent) {
  if (exponent === 0) return 1
  if (exponent === 1) return base

  var result = power(base, exponent >> 1)
  result *= result

  if (exponent & 0x1) result *= base

  return result
}
function power(base, exponent) {
  var res = base
  for (let i = 1; i < exponent; i++) {
    res *= base
  }
  return res
}

console.log(doublePower(2, 3))