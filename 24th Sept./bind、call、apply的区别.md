# javascript中apply、call和bind的区别

> 相同之处
> + 都是用来改变函数的this对象的指向的。
> + 第一个参数都是this要指向的对象。
> + 都可以利用后续参数传参。

bind 返回的是一个函数

```javascript
var a = {
  name: 'king',
  say: function () {
    console.log('my name is ' + this.name)
  }
}

var b = {
  name: 'kim',
}

a.say()
a.say.call(b)
a.say.apply(b)
a.say.bind(b)()
```

传参的区别
```javascript
var a = {
  name: 'king',
  say: function (gender, school) {
    console.log('my name is ' + this.name + ' my gender is' + gender + ' my school is ' + school)
  }
}

var b = {
  name: 'kim',
}

a.say()
a.say.call(b, 'boy', 'zjnu')
a.say.apply(b, ['girl' , 'xz'])
a.say.bind(b, 'nan', 'zhanshenxueyuan')()
a.say.bind(b)('nan', 'zhanshenxueyuan')
``` 