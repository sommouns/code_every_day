# Mixins as Functions

之前讲了那么多种mixins了，现在要说的是变量用来存储ruleset也可以做mixin

```less
// declare detached ruleset
@detached-ruleset: { background: red; };

// use detached ruleset
.top {
    @detached-ruleset(); 
}
```
编译后
```css
.top {
  background: red;
}
```
这边有一点要注意，当变量用来存储ruleset后，mixin时括号是必不可少的，不然无效。

另一个就是，他可以return mixins但是不能return 变量
```less
// detached ruleset with a mixin
@detached-ruleset: { 
    .mixin() {
        color:blue;
    }
};
// call detached ruleset
.caller {
    @detached-ruleset(); 
    .mixin();
}
```
输出
```css
.caller {
  color: blue;
}
```

## 作用域
一个分离的ruleset（即上文说的用变量存储的ruleset），他可以使用调用者的作用域里的变量和mixin。当然，如果重名的话，在分离的ruleset（**Declaration scope**）中申明的变量享有更高的优先级。

Declaration scope 就是分离的ruleset中定义的。

```less
@detached-ruleset: {
  caller-variable: @caller-variable; // variable is undefined here
  .caller-mixin(); // mixin is undefined here
};

selector {
  // use detached ruleset
  @detached-ruleset(); 

  // define variable and mixin needed inside the detached ruleset
  @caller-variable: value;
  .caller-mixin() {
    variable: declaration;
  }
}
```
输出
```css
selector {
  caller-variable: value;
  variable: declaration;
}
```
在定义处申明的mixin和变量的优先级高于调用者中的
```less
@variable: global;
@detached-ruleset: {
  // will use global variable, because it is accessible
  // from detached-ruleset definition
  variable: @variable; 
};

selector {
  @detached-ruleset();
  @variable: value; // variable defined in caller - will be ignored
}
```
输出
```css
selector {
  variable: global;
}
```
#### 引用（reference）不会改变分离的ruleset的scope

```less
@detached-1: { scope-detached: @one @two; };
.one {
  @one: visible;
  .two {
    @detached-2: @detached-1; // copying/renaming ruleset 
    @two: visible; // ruleset can not see this variable
  }
}

.use-place {
  .one > .two(); 
  @detached-2();
}
```

#### 调用（unlock）会改变分离的ruleset的scope
```less
#space {
  .importer-1() {
    @detached: { scope-detached: @variable; }; // define detached ruleset
  }
}

.importer-2() {
  @variable: value; // unlocked detached ruleset CAN see this variable
  #space > .importer-1(); // unlock/import detached ruleset
}

.use-place {
  .importer-2(); // unlock/import detached ruleset second time
   @detached();
}
```
输出
```css
.use-place {
  scope-detached: value;
}
```