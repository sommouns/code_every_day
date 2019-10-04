# Import Directives

在标准css中 @import需要放在最上面，但在less中爱放哪放哪
```less
.foo {
  background: #900;
}
@import "this-is-valid.less";
```

## 文件后缀
@import 会根据不同的文件后缀，区别对待他们。
+ 如果`.css`后缀，那就原来怎么样，现在还是怎么样
+ 如果是除了css的其他后缀，一律按做.less处理
+ 如果没有后缀就自动加上个`.less`

```less
@import "foo";      // foo.less is imported
@import "foo.less"; // foo.less is imported
@import "foo.php";  // foo.php imported as a less file
@import "foo.css";  // statement left in place, as-is
```
下面来讲解一些选项（Options）来重写这些默认行为

## Import Options
语法：@import (keyword) "filename"
### reference
```less
@import (reference) "foo.less";
```
reference就是做一个参考，一般用来做mixin和extend，不会输出，这样就可以引入一个特定的样式，从一个第三方样式库，比如bootstarp，例如
```less
.navbar:extend(.navbar all) {}
```

### inline
```less
@import (inline) "not-less-compatible.css";
```
inline的作用就是引入css，但是不解析了。为什么要这么做？比如一些css，less是并不兼容的。

### less
用less处理, 不管后缀
```less
@import (less) "foo.css";
```

### css
用css处理，不管后缀
```less
@import (css) "foo.less";
```
输出
```css
@import "foo.less";
```

### once
默认行为，引入只有第一次有效，后面的会被无视

### multiple
与once对应，可以引入多次
```less
// file: foo.less
.a {
  color: green;
}
// file: main.less
@import (multiple) "foo.less";
@import (multiple) "foo.less";
```
输出
```css
.a {
  color: green;
}
.a {
  color: green;
}
```

### optional
当有文件存在的时候才引入。不写的话，如果文件不存在，会报错