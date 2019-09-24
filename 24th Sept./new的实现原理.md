
# JS中new运算符的实现原理

> 当我们用new运算符new一个构造函数产生一个实例时，比如说： var obj = new Func 时，其背后的步骤是这样的：

 + 创建一个继承自 Func.prototype 的新对象
 + 执行构造函数 Func ，执行的时候，相应的传参会被传入，同时上下文(this)会被指定为第一步创建的新实例；
 + 如果构造函数返回了一个“对象”,那么这个对象会取代步骤1中new出来的实例被返回。如果构造函数没有返回对象,那么new出来的结果为步骤1创建的对象。
 

```javascript
var new1 = **function** (fun) {
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
```