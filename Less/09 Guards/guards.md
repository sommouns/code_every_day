# Mixin Guards

mixin可以像其他编程语言那样，使用判断，比如这样
```less
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}
```
运行
```less
.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }
```
输出
```css
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

## 操作符
`>`,`>=`,`=`,`=<`,`<`，true是**唯一**的真值，下面是等价的
```less
.truth (@a) when (@a) { ... }
.truth (@a) when (@a = true) { ... }

.class {
  .truth(40); // Will not match any of the above definitions.
}
```
当然还能比较arguments
```less
@media: mobile;

.mixin (@a) when (@media = mobile) { ... }
.mixin (@a) when (@media = desktop) { ... }

.max (@a; @b) when (@a > @b) { width: @a }
.max (@a; @b) when (@a < @b) { width: @b }
```

## 守卫逻辑运算符
`and` 与
```less
.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }
```
`,` 或
```less
.mixin (@a) when (@a > 10), (@a < -10) { ... }
```
`not` 非
```less
.mixin (@b) when not (@b > 0) { ... }
```

## 类型检测
如果你想根据传入参数的类型匹配mixin，可以使用is开头的函数

#### 基础类型检测
+ iscolor
+ isnumber
+ isstring
+ iskeyword
+ isurl

#### 单位检测
+ ispixel
+ ispercentage
+ isem
+ isunit

## 条件判断
default类似我们js中if else中的else
```less
.mixin (@a) when (@a > 0) { ...  }
.mixin (@a) when (default()) { ... } // matches only if first mixin does not, i.e. when @a <= 0
```

---

# Css Guard

在v1.5.0之后
可以这样写
```less
button when (@my-option = true) {
  color: white;
}
```

如果要绑定多个guards
```less
& when (@my-option = true) {
  button {
    color: white;
  }
  a {
    color: blue;
  }
}
```

最后强调一个单位不同问题，计算的话，他不管单位的，全当数字来计算，然后就是返回的单位以第一个参数为准