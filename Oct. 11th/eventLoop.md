# 浏览器和Node中的EventLoop

#### Event loop 
>为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。

#### 事件
> 事件就是由于某种外在或内在的信息状态发生的变化，从而导致出现了对应的反应。比如说用户点击了一个按钮，就是一个事件；HTML页面完成加载，也是一个事件。一个事件中会包含多个任务。

## 浏览器上的实现
在JS中，任务被分为宏任务和微任务
+ 宏任务
  + script（同步代码本身）
  + setTimeout
  + setInterval
  + setImmediate（Node特有）
  + I/O
  + UI rendering
+ 微任务
  + process.nextTick（Node特有）
  + Promises
  + Object.observe（已废弃）
  + MutationObserver

![avatar](https://segmentfault.com/img/bV6itK?w=810&h=414)

---

## Node上的实现

Node.js上的event loop分为6个阶段：
+ timers 执行setTimeout()和setInterval()中**到期**的callback
+ I/O callbacks 上一轮循环中有少数的I/O callback会被延迟到这一轮执行
+ idle，prepare 队列的移动，仅内部
+ poll 最为重要的阶段，执行I/O callback，在适当的条件下会阻塞
+ check 执行setImmediate的callback
+ close callbacks 执行close事件的callback，例如socket.on('close', func)

不同于浏览器的是，在每个阶段完成后就会去执行，microTask而不是非要在MacroTask之后
![avater](https://segmentfault.com/img/bV6iwC?w=655&h=503)

```js
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)



浏览器输出：
time1
promise1
time2
promise2

Node输出：
time1
time2
promise1
promise2
```

在这个例子中，Node的逻辑如下：

最初timer1和timer2就在timers阶段中。开始时首先进入timers阶段，执行timer1的回调函数，打印timer1，并将promise1.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；
至此，timer阶段执行结束，event loop进入下一个阶段之前，执行microtask队列的所有任务，依次打印promise1、promise2。

而浏览器则因为两个setTimeout作为两个MacroTask, 所以先输出timer1, promise1，再输出timer2，promise2。

```js
setImmediate(() => {
  console.log('timer1')

  Promise.resolve().then(function () {
    console.log('promise1')
  })
})

setTimeout(() => {
  console.log('timer2')

  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)
Node输出：
timer1               timer2
promise1    或者     promise2
timer2               timer1
promise2             promise1
```

按理说`setTimeout(fn,0)`应该比`setImmediate(fn)`快，应该只有第二种结果，为什么会出现两种结果呢？
这是因为Node 做不到0毫秒，最少也需要1毫秒。实际执行的时候，进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行setImmediate的回调函数。

另外，如果已经过了Timer阶段，那么setImmediate会比setTimeout更快，例如：
```js
const fs = require('fs');

fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
```