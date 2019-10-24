function minNum(arr) {
  if (!arr.length) return false
  var strArr = arr.map(v => '' + v)
  strArr.sort(function (a, b) {
    return b - a
  })
  return strArr.join('')
}
console.log(minNum([3, 32, 321]))