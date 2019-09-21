var fs = require('fs');
var thunkify = require('thunkify');
// var readFile = thunkify(fs.readFile);
var path = require('path')

const thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      fn(...args, callback)
    }
  }
}
// normal
const a = fs.readFile(path.resolve(__dirname, 'aa.txt'), function (err, data) {
  console.log(err, data.toString())
})

// using thunk
const readFile = thunk(fs.readFile)
const res = readFile(path.resolve(__dirname, 'bb.txt'))(function (err, data) {
  console.log(err, data.toString())
})

// generator
var gen = function* (){
  var r1 = yield readFile(path.resolve(__dirname, 'aa.txt'));
  var r2 = yield readFile(path.resolve(__dirname, 'bb.txt'));
};

function run(gen) {
  var g=gen();
  function next(data) {
      var res=g.next(data);
      if(res.done) return res.value;
      res.value(function (err, data) {
          console.log(data.toString())
          next(data);
      });
  }
  next();
}
run(gen)