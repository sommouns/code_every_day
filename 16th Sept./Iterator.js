// ES6中，默认的Iterator接口部署在数据结构的Symbol.iterator属性，
// 或者说，一个数据结构只要具有Symbol.iterator属性，
// 就可以认为是“可遍历的iterable”,
// Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数，
// 执行这个函数，
// 就会返回一个遍历器，至于属性名Symbol.iterator ，
// 他是一个表达式，返回Symbol对象的iterator属性，
// 这是一个预定义好的，类型为Symbol的特殊值，所以要放在方括号内
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      //value属性表示当前成员的值，done属性是一个布尔值，表示遍历是否结束。
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    }
  };
}
let it = makeIterator('123456');
let step = it.next()
step = it.next()   
step = it.next()  

// es6 设置Iterator，就可以使用for ... of ...
const obj = {
  [Symbol.iterator]: function () {
          return {
                     next: function () {
                         return {
                                value:1,
                                done: true
                                 }
                          }
                }
     }
}

// 主要用途：解决多种数据结构的统一遍历接口问题，最典型的就是HTML的获取的DOMLIST