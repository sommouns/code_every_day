function minNum(arr) {
  if (!arr.length) return false
  var strArr = arr.map(v => '' + v)
  strArr.sort(Comparator)
  function Comparator(a, b) {
    var s1 = a + "" + b;
    var s2 = b + "" + a;
    for (var i = 0; i < s1.length; i++) {
      return s1 - s2
    }
    return 1;
  }
  return strArr.join('')
}
console.log(minNum([1, 321, 13]))