function solutionOne(n) {
  var res = n
  var flag = (n > 0) && ((res += solutionOne(n - 1)) >= 0)
  return res
}
function solutionTwo(n) {
  var num = Math.pow(n, 2) + n
  return num >> 1
}
console.log(solutionOne(3))
console.log(solutionTwo(3))