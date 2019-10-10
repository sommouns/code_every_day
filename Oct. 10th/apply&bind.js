function myApply(obj, args) {
  let newObj = Object.assign({}, obj)
  newObj[this.name] = this
  newObj[this.name](...args)
}
Function.prototype.myApply = myApply

function getName(args) {
  console.log(this.name, args)
}
let obj = {
  name: 123
}
getName.myApply(obj, [123, 456])

function myBind(obj, ...args) {
  const self = this
  return function (...args2) {
    let args3 = args.concat(args2)
    self.apply(obj, args3)
  }
}
Function.prototype.myBind = myBind

getName.myBind(obj)([123,123])

