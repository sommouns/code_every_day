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

---
CommonJS 用于 node 端，是同步加载的

AMD 依赖于 requirejs,是异步加载的，是提前加载，立即加载

CMD 依赖于 seajs ,是异步加载，延后加载，就近加载，用时加载

ES6是ES2015的简称，一般通过export来暴露模块，import来导入模块

前三者都是民间定义的，最后ES6模块规范，是国际标准组织定义的。

---

## 主要实现原理
### CommonJS
Node内部提供了一个 Mudule构建函数。所有模块都是Module的实例。
require 的源码在 Node 的 lib/module.js 文件。

```javascript
function Module(id, parent){
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = []
}
module.exports = Module;
var module = new Module(filename, parent)
```
上面的代码中，Node 定义了一个构造函数 Module,所有的模块都是 Module 的实例。可以看到，当前模块 (module.js)也是Moudle的一个实例。
+ module.id 模块的识别符，通常是带有绝对路径的模块文件名。
+ module.filename 模块的文件名，带有绝对路径
+ module.loaded 返回一个布尔值，表示模块是否已经完成加载。
+ module.parent 返回一个对象，表示调用该模块的模块。
+ module.children 返回一个数组，表示该模块要用到的其他模块。
+ module.exports 表示模块对外输出的值

```javascript
//a.js
console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename);
console.log('module.loaded: ', module.loaded);
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths);
```
```javascript
$ node a.js

module.id:  .
module.exports:  {}
module.parent:  null
module.filename:  /home/ruanyf/tmp/a.js
module.loaded:  false
module.children:  []
module.paths:  [ '/Users/danlan/workspace/node-stu/ree/node_modules',
  '/Users/danlan/workspace/node-stu/node_modules',
  '/Users/danlan/workspace/node_modules',
  '/Users/danlan/node_modules',
  '/Users/node_modules',
  '/node_modules' ]
```
可以看到，如果没有父模块，直接调用当前模块， parent 属性就是null ,id 属性就是一个点。filename属性是模块的绝对路径，path 属性是一个数组，包含了模块可能的位置。另外，输出这些内容时，模块还没有全部加载，所以 loaded 属性为 false。

新建一个b.js
```javascript
var a = require('./a.js')
```
```javascript
module.id:  /Users/danlan/workspace/node-stu/ree/a.js
module.exports:  {}
module.parent:  Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/danlan/workspace/node-stu/ree/b.js',
  loaded: false,
  children:
   [ Module {
       id: '/Users/danlan/workspace/node-stu/ree/a.js',
       exports: {},
       parent: [Circular],
       filename: '/Users/danlan/workspace/node-stu/ree/a.js',
       loaded: false,
       children: [],
       paths: [Array] } ],
  paths:
   [ '/Users/danlan/workspace/node-stu/ree/node_modules',
     '/Users/danlan/workspace/node-stu/node_modules',
     '/Users/danlan/workspace/node_modules',
     '/Users/danlan/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
module.filename:  /Users/danlan/workspace/node-stu/ree/a.js
module.loaded:  false
module.children:  []
module.paths:  [ '/Users/danlan/workspace/node-stu/ree/node_modules',
  '/Users/danlan/workspace/node-stu/node_modules',
  '/Users/danlan/workspace/node_modules',
  '/Users/danlan/node_modules',
  '/Users/node_modules',
  '/node_modules' ]
```
#### 模块的require方法
```javascript
Module.prototype.require = function(path){
  return Module._load(path, this)  
}
```
```javascript
Module._load = function(request, parent, isMain) {

  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;
  }
  
  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }

  // 第三步：生成模块实例，存入缓存
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  // 第四步：加载模块
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
```
+ 检查 Module._cache，是否在缓存中有指定的模块，如果模块已经在缓存中，就从缓存取出。
+ 如果没有判断是否为内置模块，如果是内置模块就返回内置模块。
+ 如果缓存之中没有就会创建一个新的Moudle实例，将它保存到缓存中。
+ 加载模块
+ 如果加载/解析过程报错，就从缓存删除该模块
+ 返回该模块的 module.exports

下面来说一下`Module._resolveFilename()`:
```javascript
Module._resolveFilename = function(request, parent) {

  // 第一步：如果是内置模块，不含路径返回
  if (NativeModule.exists(request)) {
    return request;
  }

  // 第二步：确定所有可能的路径
  var resolvedModule = Module._resolveLookupPaths(request, parent);
  var id = resolvedModule[0];
  var paths = resolvedModule[1];

  // 第三步：确定哪一个路径为真
  var filename = Module._findPath(request, paths);
  if (!filename) {
    var err = new Error("Cannot find module '" + request + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }
  return filename;
};
```

```javascript
Module._findPath = function (request, paths) {

  // 列出所有可能的后缀名：.js，.json, .node
  var exts = Object.keys(Module._extensions);

  // 如果是绝对路径，就不再搜索
  if (request.charAt(0) === '/') {
    paths = [''];
  }

  // 是否有后缀的目录斜杠
  var trailingSlash = (request.slice(-1) === '/');

  // 第一步：如果当前路径已在缓存中，就直接返回缓存
  var cacheKey = JSON.stringify({ request: request, paths: paths });
  if (Module._pathCache[cacheKey]) {
    return Module._pathCache[cacheKey];
  }

  // 第二步：依次遍历所有路径
  for (var i = 0, PL = paths.length; i < PL; i++) {
    var basePath = path.resolve(paths[i], request);
    var filename;

    if (!trailingSlash) {
      // 第三步：是否存在该模块文件
      filename = tryFile(basePath);

      if (!filename && !trailingSlash) {
        // 第四步：该模块文件加上后缀名，是否存在
        filename = tryExtensions(basePath, exts);
      }
    }

    // 第五步：目录中是否存在 package.json 
    if (!filename) {
      filename = tryPackage(basePath, exts);
    }

    if (!filename) {
      // 第六步：是否存在目录名 + index + 后缀名 
      filename = tryExtensions(path.resolve(basePath, 'index'), exts);
    }

    // 第七步：将找到的文件路径存入返回缓存，然后返回
    if (filename) {
      Module._pathCache[cacheKey] = filename;
      return filename;
    }
  }

  // 第八步：没有找到文件，返回false
  return false;
};
```
```javascript
Module.prototype.load = function (filename) {
  var extension = path.extname(filename) || 'js'
  if (!Module._extensions[extensions]) extension = '.js'
  Module._extensionsextension
  this.loaded = true
}

Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};

Module._extensions['.json'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  try {
    module.exports = JSON.parse(stripBOM(content));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};

Module.prototype._compile = function(content, filename) {
  var self = this;
  var args = [self.exports, require, self, filename, dirname];
  return compiledWrapper.apply(self.exports, args);
};
```

也就是说，模块的加载实质上就是，注入exports、require、module三个全局变量，然后执行模块的源码，然后将模块的 exports 变量的值输出。

引入一张文件查找的逻辑图：
![avatar](https://user-gold-cdn.xitu.io/2018/8/27/1657a04b9dfd5a7d?w=1910&h=1434&f=jpeg&s=340971)
****

# ES6 Module 原理

这里先做一个小记

`defer`和`async`的区别：前者要等到整个页面正常渲染结束，才会执行，后者一旦下载完，渲染引擎就会终端渲染，执行这个脚本以后，再继续渲染，一句话，defer是“渲染完再执行”，async是下载完就执行，另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

module语法与解构语法很容易混淆，例如：
```javascript
import { a } from 'module'

const { a } = require('module')
```
尽管看上去很像，但是不是同一个东西，这是两种完全不一样的语法与作用，ps:两个人撞衫了，穿一样的衣服你不能说这俩人就是同一个人
module 的语法： 上面有写 `import/export { a } / { a, b } / { a as c} `

`export default` 和 `module.exports` 是相似的

+ CommonJs导出的是变量的一份拷贝，ES6 Module导出的是变量的绑定（export default 是特殊的）
+ CommonJs是单个值导出，ES6 Module可以导出多个
+ CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
+ CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined