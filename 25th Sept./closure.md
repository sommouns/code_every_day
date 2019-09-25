# 闭包

> 什么是闭包？
> ———>是一个函数，一个可以访问其他函数内部数据的函数。

## 基本结构
+ 定义外层函数；
+ 定义内部函数；
+ 内层函数引用外层函数定义的数据；
+ 要将内层函数作为外层函数的返回值； 

```javascript
function outer() {
    var data = {name: "xiaoming”};//外层函数的内部数据会一直缓存在内存中
    function inner() {
        return data;
    }
    return inner;
}
```

### 作用
+ 避免全局污染（比如很多第三方的库，为了防止变量命名冲突）
+ 用来做缓存
```javascript
function createFib() {
    var cache = [, 1, 1];//存储计算结果，计算过的结果得以缓存在内存中以便下次直接使用
    return function(n) {//闭包这个函数的作用是求得地n项的值，闭包函数可拿到缓存中已经计算过结果的那些项的值；
        var res = cache[n];//如果缓存中有这一项，那么直接用
        if (!res) {//若没有这一项的值，就要重新计算
            res = cache[n] = fib(n - 1) + fib(n - 2);//第n项的值为他的前两项值的和，依旧用递归，这里不同的是，计算过的值不用再重新计算，而是直接拿缓存中的结果，另外本次计算完成后，也要将结果存储到cache中以便下次使用，并且将值赋给res变量用来返回；
        }
        return res;
    };
}
var fib = createFib();//需要递归的是fib这个闭包而不是外层函数createFib，因为闭包才是真正的执行求第n项值的功能函数，而外层函数的作用是用内部数据来做缓存；
console.log(fib(50));//大大提高计算效率
```
+ 高阶函数
```javascript
function calSalary(base) {
    var base = base * 10 + 20;//一次计算后作为缓存
    return function(ext) {
        return base + ext;//这里直接拿缓存中的base，省去了很多重复计算
    }
}
var s = calSalary(1000);//拿到闭包
var s1 = s(500);//每次只执行闭包
var s2 = s(1000);
var p = calSalary(2000);//创建另一个闭包，因为共享数据不同
var p1 = p(500);//同样每次只执行闭包
var p2 = p(500);
```

+ 回调函数传参数（bind也可以）