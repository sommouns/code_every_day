# Mixins

先来看一个例子，知道什么是Mixin
```less
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
```
在混入中，括号是可选的，即`a()`和`a`是等价的

## 不输出Mixin的class
要想不输出，用来混入的类，可以加一个`()`
```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}
```
编译后
```css
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

## 在Mixin中使用选择器

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
```
编译后
```css
button:hover {
  border: 1px solid red;
}
```

## 命名空间

```less
#outer {
  .inner {
    color: red;
  }
}

.c {
  #outer > .inner;
}
```
代码中的`>`是可选的哦
```less
// 这些都是等价的
#outer > .inner;
#outer > .inner();
#outer .inner;
#outer .inner();
#outer.inner;
#outer.inner();
```

我们可以利用这一点，把mixin类放到一个id下面，从而不会与的别的样式产生冲突

```less
#my-library {
  .my-mixin() {
    color: black;
  }
}
// which can be used like this
.class {
  #my-library > .my-mixin();
}
```

## 命名守卫（原谅我的翻译）
```less
#namespace when (@mode=huge) {
  .mixin() { /* */ }
}

#namespace {
  .mixin() when (@mode=huge) { /* */ }
}
```
对于`default`，只要其中有一个为`false`，就没有办法使用
```less
#sp_1 when (default()) {
  #sp_2 when (default()) {
    .mixin() when not(default()) { /* */ }
  }
}
```

## 关键字 `!important`
 `!important`标记的mixin都会继承这个 `!important`
```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
```
输出
```css
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```


