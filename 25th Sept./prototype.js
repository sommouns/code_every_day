function foo() {
  this.a = 1
}
const bar = () => {
  this.a = 2
}
const f = new foo()

console.log(foo.prototype.constructor)
console.log(bar.prototype)