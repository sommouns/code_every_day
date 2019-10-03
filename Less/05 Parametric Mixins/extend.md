# Parametric Mixins

Mixins 同时也可以通过传入参数，来mixin
例如： 
```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

当然也可以像js函数那样，给个默认值

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
#header {
  .border-radius;
}
```

## 多个参数
分割参数可以使用`,`或者`;`，官方推荐使用分号，因为逗号有两种意思，一种是css的分割符，另一种是mixin的参数分割符，多个mixins也可以用用一个名字，并且如果条件允许都会全部匹配
```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div {
  .mixin(#008000);
}
```
编译结果
```less
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```

**为什么没有`color-3`？**

因为当匹配到`@padding`的时候，不存在，所以不会继续下去了

## 命名参数
参数的传递，如果直接通过名字去设置，那就可以不用按照之前那样，按照的一定的顺序去传递了
```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
```
编译后
```css
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

## @argument
`@argument` 类似JS中函数的`argument`，他会收集所有的参数，主要用途就是那些多值传递的css属性，比如`background`，`padding`等等
```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```
结果
```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

## @rest
这个用处不是很大，类似JS中的`...rest`
```less
.mixin(@a; @rest...) {
   // @rest is bound to arguments after @a
   // @arguments is bound to all arguments
}
```

## 模式匹配
```less
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch; #888);
}
```
当然模式匹配，也可以通过参数数量
```less
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: fade(@a; @b);
}
```
如果是一个参数的话，就匹配上面那个，如果两个参数就匹配下面那个
