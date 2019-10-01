// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

var fs = require('fs');
var path = require('path')
var co = require('co')

function spwan(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF()
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }

      Promise.resolve(next.value).then(function (v) {
        step(function () {
          return gen.next()
        })
      }, function (e) {
        step(function () { return gen.throw(e); });
      })
    }
    step(function () {
      return gen.next(undefined)
    })
  })
}
function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) reject(err)
      console.log(data.toString())
      resolve(data)
    })
  })
}
function gen(args) {
  return spwan(function* () {
    var r1 = yield readFile(path.resolve(__dirname, 'aa.txt'))
    var r2 = yield readFile(path.resolve(__dirname, 'bb.txt'))
  })
}
gen()
