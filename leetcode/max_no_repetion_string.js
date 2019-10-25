function noRepetion(str) {
  if (!str) return false
  var map = new Map()
  var curLength = 0
  var maxLength = 1
  var inPosition = 0
  let i = 0
  for (; i < str.length; i++) {
    var ch = str[i]
    var beforePosition = map.get(ch)
    if (!beforePosition && beforePosition !== 0) {
      beforePosition = -1
    }
    if (curLength < (i - beforePosition)) {
      map.set(ch, i)
      curLength++
    } else {
      map.set(ch, i)
      if (maxLength < curLength) {
        maxLength = curLength
        inPosition = i - curLength
      }
      curLength = 1
    }
  }
  if (curLength > maxLength) {
    maxLength = curLength
    inPosition = i - curLength
  }
  console.log(str.substr(inPosition, maxLength))
}

noRepetion('arabcacfr')
debugger