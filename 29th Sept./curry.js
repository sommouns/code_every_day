// curry 的过程，实质是一个参数收集的过程，并在最里层里面处理
function createCurry(func, args) {

  // func.length 可以获取需要参数的个数
  var arity = func.length
  var args = args || []

  return function () {
    var _args = [].slice.call(arguments)
    _args = _args.concat(args)

    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (_args.length < arity) {
      return createCurry.call(this, func, _args);
    }

    // 参数收集完毕，则执行func
    return func.apply(this, _args);
  }
}

function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = [].slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var adder = function () {
      var _adder = function() {
          [].push.apply(_args, [].slice.call(arguments));
          return _adder;
      };

      // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
      _adder.toString = function () {
          return _args.reduce(function (a, b) {
              return a + b;
          });
      }

      return _adder;
  }
  return adder.apply(null, [].slice.call(arguments));
}

console.log(add(1, 2, 3, 4, 5).toString());  // 15
console.log(add(1, 2, 3, 4)(5).toString());  // 15
console.log(add(1)(2)(3)(4)(5).toString());  // 15

var add = function (a, b) {
  return a + b
}

var mul = function (a, b, c) {
  return a * b
}

var addCurry = createCurry(add)
var res = addCurry(1)(2)
console.log(res)

// 主要用处
// 延迟执行
// 提高适用性
// 固定易变元素