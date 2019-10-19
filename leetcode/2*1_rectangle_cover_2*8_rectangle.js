function rec(n) {
  var fibOne = 1
  var fibTwo = 2
  if (n <= 2) {
    return n === fibOne ? fibOne : fibTwo
  }
  for (let i = 3; i <= n; i++) {
    var temp = fibTwo
    fibTwo += fibOne
    fibOne = temp
  }
  return fibTwo
}

console.log(rec(8))