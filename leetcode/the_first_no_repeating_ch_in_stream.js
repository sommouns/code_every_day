var map = {}
var index = 0
function insert(val) {
  if (map[val] && map[val] >= 0) {
    map[val] = -1
  }
  if (!map[val]) {
    map[val] = index
  }
  index++
}

function noRepeating() {
  var min = 100000
  var char = ''
  for (let key in map) {
    if (map[key] !== -1 && map[key] < min) {
      min = map[key]
      char = key
    }
  }
  return char ? char : false
}
var array = ['a', 'b', 's', 'd', 'a']
for (let i = 0; i < array.length; i++) {
  insert(array[i])
}

console.log(noRepeating())