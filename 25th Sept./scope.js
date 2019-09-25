function name(params) {
  const a = 1
  return function demo() {
    console.log(a)
  }
}

var demo = name()
console.log(demo)