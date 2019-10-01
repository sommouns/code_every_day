
function demo() {
  this.a = 1
  this.say = function() {
    console.log(this.a)
  }
  this.hello = () => {
    console.log(this.a)
  }
}
var bb = {
  a: 3,
  say: function () {
    console.log(this.a)
  },
  hello: () => {
    console.log(this)
    console.log(bb)
    console.log(this.a)
  }
}
function cal() {
  console.log(this)
}
const dd = new demo()
// dd.say()
// dd.hello()
// cal()
// bb.say()
this.a = 4
bb.hello()
setTimeout(function () {
  this.a = 6
  bb.hello()
  // dd.say()
}, 1000);
bb.hello()