# Reflect

为什么要用Reflect
+ 更加有用的返回值：Reflect有一些方法和ES5中Object方法一样样的， 比如： `Reflect.getOwnPropertyDescriptor`和`Reflect.defineProperty`,  不过, `Object.defineProperty(obj, name, desc)`执行成功会返回obj， 以及其它原因导致的错误， Reflect.defineProperty只会返回`false`或者`true`来表示对象的属性是否设置上了， 如下代码可以重构：
```javascript
try {
  Object.defineProperty(obj, name, desc);
  // property defined successfully
} catch (e) {
  // possible failure (and might accidentally catch the wrong exception)
}
```
```javascript
if (Reflect.defineProperty(obj, name, desc)) {
  // success
} else {
  // failure
}
```
其余的方法， 比如Relect.set ， Reflect.deleteProperty, Reflect.preventExtensions, Reflect.setPrototypeOf， 都可以进行重构；
  + 函数操作: 如果要判断一个obj有定义或者继承了属性name， 在ES5中这样判断：`name in obj` ； 或者删除一个属性 ：`delete obj[name]`,  虽然这些很好用， 很简短， 很明确， 但是要使用的时候也要封装成一个类；有了Reflect， 它帮你封装好了， `Reflect.has(obj, name)`,  `Reflect.deleteProperty(obj, name)`;
+ 更加可靠的函数式执行方式,在ES中， 要执行一个函数f，并给它传一组参数args， 还要绑定this的话， 要这么写：
```javascript
f.apply(obj, args)
```
但是f的apply可能被重新定义成用户自己的apply了，所以还是这样写比较靠谱：
```javascript
Function.prototype.apply.call(f, obj, args)
```
上面这段代码太长了， 而且不好懂， 有了Reflect， 我们可以更短更简洁明了：
```javascript
Refelct.apply(f, obj, args)
```
+ 可变参数形式的构造函数
```javascript
var obj = Reflect.construct(F, args)
```
+ 控制访问器或者读取器的this
```javascript
var obj = {
    set foo(value) { return this.bar(); },
    bar: function() {
        alert(1);
    }
};
var wrapper = {
    bar : function() {
        console.log("wrapper");
    }
}
Reflect.set(obj, "foo", "value", wrapper);
```
+ 避免直接访问 `__proto__` ： ES5提供了 `Object.getPrototypeOf(obj)`，去访问对象的原型， ES6提供也提供了`Reflect.getPrototypeOf(obj)` 和  `Reflect.setPrototypeOf(obj, newProto)`， 这个是新的方法去访问和设置对象的原型