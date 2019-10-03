# Extend

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```
编译后
```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```

## 语法
```less
.a:extend(.b) {}

// 等价
.a {
  &:extend(.b);
}
```

可以同时扩展几个类

```less
.e:extend(.f) {}
.e:extend(.g) {}

// 等价
.e:extend(.f, .g) {}

// 等价
pre:hover:extend(div pre):extend(.bucket tr)
```

### 附着与selector之后
+ Extend after the selector: `pre:hover:extend(div pre)`.
+ 中间留有空格也是有效的：`pre:hover :extend(div pre)`
+ 可以同时扩展多个：`pre:hover:extend(div pre):extend(.bucket tr)`，等价于 `pre:hover:extend(div pre, .bucket tr)`
+ extend必须置于最后，这样是不允许的：`pre:hover:extend(div pre).nth-child(odd)`

```less
.big-division,
.big-bag:extend(.bag),
.big-bucket:extend(.bucket) {
  // body
}
```

### 附着与rule内部
当在css rule内部时可以使用语法 `&:extend(selector)`
```less
pre:hover,
.some-class {
  &:extend(div pre);
}
```

值得一提的是，extends是基于编译后的compiled的css来计算的，不是根据less。例如：
```less
.bucket {
  tr & { 
    color: blue;
  }
}
// less 阶段没有出现 tr .bucket
.some-class:extend(tr .bucket) {} 
```
输出
```css
tr .bucket,
.some-class {
  color: blue;
}
```

## 精准匹配
extend会去追求形式上的一致，而不会去考虑他们意思是不是一样，比如：
```less
*.class {
  color: blue;
}
.noStar:extend(.class) {} 
```
虽然`*.class`和`.class`意思一样，但是extend不认哦！
而且，extend也不会去管 **'子类'** 有什么
```less
.a.class,
.class.a,
.class > .a {
  color: blue;
}
.test:extend(.class) {} // this will NOT match the any selectors above
```
甚至，伪类的顺序，在extend看来也是不同的
```less
link:hover:visited {
  color: blue;
}
.selector:extend(link:visited:hover) {}
```

## nth 表达式
nth表达式，也完全符合上面那个规则
```less
:nth-child(1n+3) {
  color: blue;
}
.child:extend(:nth-child(n+3)) {}
```
输出
```css
:nth-child(1n+3) {
  color: blue;
}
```
但是有个例外，引号属性
```less
[title=identifier] {
  color: blue;
}
[title='identifier'] {
  color: blue;
}
[title="identifier"] {
  color: blue;
}

.noQuote:extend([title=identifier]) {}
.singleQuote:extend([title='identifier']) {}
.doubleQuote:extend([title="identifier"]) {}
```
输出
```css
[title=identifier],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}

[title='identifier'],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}

[title="identifier"],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}
```

## 关键字 `all`
这个类似于一个类的深拷贝，感受下代码吧
```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {}
```
输出

```css
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```

## 在`@media`中使用`extend`
当extend在@media中，extend只有在同一个媒体查询中有效（同一层级），当然在@media之外是可以继承所有的。
```less
@media screen {
  .selector {  /* ruleset inside nested media - top level extend works */
    color: blue;
  }
  @media (min-width: 1023px) {
    .selector {  /* ruleset inside nested media - top level extend works */
      color: blue;
    }
  }
}

.topLevel:extend(.selector) {} /* top level extend matches everything */
```

---

讲了那么多。extend的来看看主要用途：

最经典的用法，就是避免使用一个基础class
```css
.animal {
  background-color: black;
  color: white;
}
.bear {
  background-color: brown;
}
<a class="animal bear">Bear</a>
```
使用extends后
```less
.animal {
  background-color: black;
  color: white;
}
.bear {
  &:extend(.animal);
  background-color: brown;
}
```

使用extends可以有效的减少css代码的体积，下面比较两段代码
传统写法：
```less
.my-inline-block() {
    display: inline-block;
  font-size: 0;
}
.thing1 {
  .my-inline-block;
}
.thing2 {
  .my-inline-block;
}
```
输出
```css
.thing1 {
  display: inline-block;
  font-size: 0;
}
.thing2 {
  display: inline-block;
  font-size: 0;
}
```
使用extends后
```less
.thing1 {
  display: inline-block;
  font-size: 0;
}
.thing2 {
  display: inline-block;
  font-size: 0;
}
```
输出
```css
.my-inline-block,
.thing1,
.thing2 {
  display: inline-block;
  font-size: 0;
}
```
