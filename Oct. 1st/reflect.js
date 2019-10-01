{
  var obj = {
    set foo(value) { return this.bar(); },
    bar: function () {
      console.log(1);
    }
  };
  var wrapper = {
    bar: function () {
      console.log("wrapper");
    }
  }
  Reflect.set(obj, "foo", "value", wrapper);
}
{
  let fn = function () {
    this.attr = [0, 1, 2, 3];
  };
  let obj = {};
  Reflect.apply(fn, obj, [])
  console.log(obj);
}
{
  let Fn = function () {

  }
  Fn.prototype.run = function () {
    console.log('runs out')
  }
  var ProxyFn = new Proxy(Fn, {
    construct(target, arguments) {
      console.log('proxy constructor')
      var obj = new target(...arguments)

      Reflect.apply(target.prototype.run, obj, obj, arguments)
      return obj
    }
  })
  new ProxyFn()
}
{
  var Fn = function (args) {
    this.args = [args]
  }
  console.log(new Fn(1), Reflect.construct(Fn, [1]))
  const d = Reflect.construct(Date, [1776, 6, 4])
}
{
  function someConstructor() { }
  var result = Reflect.construct(Array, [], someConstructor);
  Reflect.getPrototypeOf(result); // someConstructor.prototype
  Array.isArray(result); // true
  //or
  var Fn = function () {
    this.attr = [1];
  };
  var Person = function () {
  };
  Person.prototype.run = function () {
  };
  console.log(Reflect.construct(Fn, [], Person));
}
{
  var obj = {};
  if (Reflect.defineProperty(obj, "x", { value: 7 })) {
    console.log("added success");
  } else {
    console.log("添加失败");
  };
}
{
  var obj = {
    "foo": 1,
    get bar() {
      return this.foo;
    }
  };
  var foo = {};
  foo.foo = "heheda";
  console.log(Reflect.get(obj, "bar", foo));
}
{
  obj = new Proxy({}, {
    has(t, k) { return k.startsWith("door"); }
  });
  Reflect.has(obj, "doorbell"); // true
  Reflect.has(obj, "dormitory"); // false
}
{
  Reflect.setPrototypeOf({}, Object.prototype); // 输出true

  // 给该对象数组[[Prototype]] 为null.
  Reflect.setPrototypeOf({}, null); // true
  // 此时的obj.__proto__为undefine

  //把对象冻结以后重新设置[[prototype]]
  Reflect.setPrototypeOf(Object.freeze({}), null); // false

  // 如果原型链循环依赖的话就会返回false.
  var target = {};
  var proto = Object.create(target);
  Reflect.setPrototypeOf(target, proto); // false
}