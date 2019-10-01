# commonJs,AMD,CMD, ES6 的Module

## CommonJS
CommonJS就是一个JavaScript模块化的规范，是用在服务器端的node的模块规范，前端的webpack也是对CommonJS原生支持的。
+ 模块输出的是一个值的拷贝， 模块是运行时加载，同步加载
+ CommonJS 模块的顶层this指向当前模块

```javascript
require : 加载所要依赖的其他模块
module.exports 或者exports :对外暴露的接口
A.js
//写法一
module.exports = {
  a:1,
  b:2
}
/写法二
module.exports.a=1;
module.exports.b = 2;

//写法三
exports.a=1;
exports.b = 2

// 三种写法结果是一样，对外暴露的接口的结果是一致的

B.js 

console.log(require('./B.js'));//{a:1,b:2}
```
注意：
+ exports 与module.exports 的区别：exports 是对 module.exports 的引用，不能直接给exports 赋值，直接赋值无效，结果是一个空对象,module.exports 可以直接赋值
+ 一个文件不能写多个module.exports ，如果写多个，对外暴露的接口是最后一个module.exports
+ 模块如果没有指定使用module.exports 或者exports 对外暴露接口时，在其他文件就引用该模块，得到的是一个空对象{}


---
## AMD
AMD 即 Asynchronous  Module  Definition，中文名是“异步模块定义”的意思。它是一个在浏览器端模块化开发的规范，AMD 是 RequireJS 在推广过程中对模块定义的规范化产出，所以AMD规范的实现，就是的require.js了

特点：异步加载，不阻塞页面的加载，能并行加载多个模块，但是不能按需加载，必须提前加载所需依赖


---
## CMD
CMD规范是阿里的玉伯提出来的，实现js库为sea.js。 它和requirejs非常类似，即一个js文件就是一个模块，但是CMD的加载方式更加优秀，是通过按需加载的方式，而不是必须在模块开始就加载所有的依赖。

玉伯说过能够亲眼看到seajs死掉也是一种幸福(说明了什么，你懂的)


---
## ES6 Module
ES6 在语言标准的层面上，实现了模块功能，而且非常简单，ES6到来,完全可以取代 CommonJS 和 AMD规范，成为浏览器和服务器通用的模块解决方案。由vue,Angular  React这些mvvm 模式的框架发展，让前端的编程变得模块化，组件化。
特点：
1. ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。
2.  自动采用严格模式"use strict"。须遵循严格模式的要求
3. ES6 模块的设计思想是尽量的静态化，编译时加载”或者静态加载，编译时输出接口
4. ES6 模块export、import命令可以出现在模块的任何位置，但是必须处于模块顶层。如果处于块级作用域内，就会报错
5. ES6 模块输出的是值的引用

模块功能主要由两个命令构成：`export` 和 `import`。
+ export：用于规定模块的对外接口，
+ import：用于输入其他模块提供的功能。

浏览器加载规则：
1. 浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性。浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器
```javascript
<script type="module" src="./foo.js"></script>
```
2. ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
```javascript
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```