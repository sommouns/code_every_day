# Mixins as Functions

在mixin中定义的变量是可以被调用者使用的。这就像函数一样，会return一些值出去。当然又一个例外，如果调用者本身就有一个同名的变量，就不会再去copy了。
```less
.mixin() {
  @width:  100%;
  @height: 200px;
}

.caller {
  .mixin();
  width:  @width;
  height: @height;
}
```
输出
```css
.caller {
  width:  100%;
  height: 200px;
}
```

我们通过这一点，就可以去写一些我们的函数
```less
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // "call" the mixin
  padding: @average;    // use its "return" value
}
```

更加复杂一些的例子
```less
.unlock(@value) { // outer mixin
  .doSomething() { // nested mixin
    declaration: @value;
  }
}

#namespace {
  .unlock(5); // unlock doSomething mixin
  .doSomething(); //nested mixin was copied here and is usable
}
```