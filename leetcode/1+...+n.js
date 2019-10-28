function solutionOne(n) {
  var res = n
  { n && (res += solutionOne(n - 1)) }
  return res
}
function solutionTwo(n) {
  var num = Math.pow(n, 2) + n
  return num >> 1
}
console.log(solutionOne(3))
console.log(solutionTwo(3))