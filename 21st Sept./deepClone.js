// method 1 (还要考虑数组类型)

// Object
const obj = {
  a: 123
}
// 1
var deepCopy = function (source) {
  var result = {}
  for (let key in source) {
    result[key] = typeof source[key] === 'object'
      ? deepCopy(source[key])
      : source[key]
  }
  return result
}
// 2
Object.assign({}, obj)
// 3
let obj1 = {...obj}


// Array
const arr = [1, 2, 3]
// 1
const arr1 = arr.concat();
// 2
const arr2 = arr.slice(0);
// 3
let arr1 = [...arr]


// JSON
JSON.parse(JSON.stringify(obj))
