# Symbol

> 这是一种新的基础数据类型（primitive type）

Symbol是由ES6规范引入的一项新特性，它的功能类似于一种标识唯一性的ID。通常情况下，我们可以通过调用Symbol()函数来创建一个Symbol实例：

```javascript
let s1 = Symbol()
```

或者，你也可以在调用Symbol()函数时传入一个可选的字符串参数，相当于给你创建的Symbol实例一个**描述信息**：

```javascript
let s2 = Symbol('another symbol')
```

***我们需要重点记住的一点是：每个Symbol实例都是唯一的。因此，当你比较两个Symbol实例的时候，将总会返回false：***

### 应用场景1 使用Symbol来作为对象属性名(key)
```javascript
let obj = {
  abc: 123,
  "hello": "world"
}

obj["abc"] // 123
obj["hello"] // 'world'
```
这样的属性，是不可遍历的，也不能通过`Object.key()`去获取，`JSON.stringify()`时，也不能输出。这样做的好处是，让“对内操作”和“对外选择性输出”变得更加优雅。

然而，这样的话，我们就没办法获取以Symbol方式定义的对象属性了么？非也。还是会有一些专门针对Symbol的API，比如：

```javascript
// 使用Object的API
Object.getOwnPropertySymbols(obj) // [Symbol(name)]

// 使用新增的反射API
Reflect.ownKeys(obj) // [Symbol(name), 'age', 'title']
```
---
### 应用场景2 使用Symbol来替代常量
这个在Sequelize中看到过，比如And，Or，Like这些操作符号。
```javascript
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
```
---
### 补充 注册和获取全局Symbol

通常情况下，我们在一个浏览器窗口中（window），使用`Symbol()`函数来定义和Symbol实例就足够了。但是，如果你的应用涉及到多个window（最典型的就是页面中使用了`<iframe>`），并需要这些window中使用的某些Symbol是同一个，那就不能使用`Symbol()`函数了，因为用它在不同window中创建的Symbol实例总是唯一的，而我们需要的是在所有这些window环境下保持一个共享的Symbol。这种情况下，我们就需要使用另一个API来创建或获取Symbol，那就是`Symbol.for()`，它可以注册或获取一个window间全局的Symbol实例：
```javascript
let gs1 = Symbol.for('global_symbol_1')  //注册一个全局Symbol
let gs2 = Symbol.for('global_symbol_1')  //获取全局Symbol

gs1 === gs2  // true
```
这样一个Symbol不光在单个window中是唯一的，在多个相关window间也是唯一的了。

参考文献：https://www.jianshu.com/p/f40a77bbd74e