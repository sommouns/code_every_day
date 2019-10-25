function firstNoRepeatingChar(str) {
  var map = {}
  for (let i = 0; i < str.length; i++) {
    map[str[i]] = map[str[i]] ? map[str[i]] + 1 : 1
  }
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]] === 1) return str[i]
  }

  return false
}

console.log(firstNoRepeatingChar('abacddbcfe'))