function foo() {
  this.name = '123'
}
var a = new foo()

console.log(a)

var b = Object.create(a)

console.log(b.__proto__)

// 区别在于，new会调用一遍构造函数，Object.crate只是加一个proto指向，一般用于继承