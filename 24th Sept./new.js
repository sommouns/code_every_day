var new1 = function (fun) {
  var newObj = Object.create(fun.prototype)
  var returnObj = fun.call(newObj)
  if (typeof returnObj === 'object') {
    return returnObj
  } else {
    return newObj
  }
}

var strObj = new1(String)
console.log(strObj instanceof String)
console.log(strObj.__proto__.constructor === String)