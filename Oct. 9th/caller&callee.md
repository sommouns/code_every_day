# caller

函数fun的caller返回调用fun的函数对象，即fun的执行环境，如果fun的执行环境为window则返回null

```js
function fun(){
    console.log(fun.caller)//这里必须写在fun里面，因为caller只有函数执行过程中才有效
}
fun(); // null
```
```js
function a(){
    fun();
    function fun(){
        console.log(fun.caller)//这里必须写在fun里面，因为caller只有函数执行过程中才有效
    }
}
a(); // a
```
```js
function a(){
    b();
    function b(){
        fun();
        function fun(){
            console.log(fun.caller)//这里必须写在fun里面，因为caller只有函数执行过程中才有效
        }
    }
}
a(); // b
```
---

# callee
这个属性在函数的arguments上面
```js
function a (){
    console.log(arguments.callee)
}
a();
//结果为a函数本身
```

```js
function sum (num){
    if(num <= 1){
        return 1;
    }else{
        return num * (sum(num - 1))
    }
}
console.log(sum(5))
//结果:5*4*3*2*1=120
```

```js
function sum (num){
    if(num <= 1){
        return 1;
    }else{
        return num * (arguments.callee(num - 1))
    }
}
console.log(sum(5))
//结果:5*4*3*2*1=120
```

callee的另一种用途，function.length即是函数的参数的数量
```js
function a(num1,num2,num3){
    console.log(arguments.length);//实参长度为1
    console.log(arguments.callee.length);//行参长度为3
}
a(0); 
```