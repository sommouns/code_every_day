#### 首先要说一下的是 **冒泡和捕获**

+ 冒泡
  事件从最小的到最大的 比如 button -> div -> document
+ 捕获
  事件从最大的到最小的 比如 document -> div -> button

---
## onclick
优点：
+ 简单
+ this指向


缺点：
+ 只能冒泡，不能捕获
+ 只能绑定一个事件

```javascript
//this与event查一不大 推荐使用event对象 这样你总是可以拥有全部的可用信息
dd.onclick = function(event){
    console.log(event.target.innerHTML);//event.target指向的是dd元素，以及他的所有信息
    console.log(this.innerHTML);//this也是指向dd元素，包含他的可用信息
}
```

---
## addEventLister(event, fn, control = false)
优点
+ 可以支持事件处理的捕获阶段，也可以支持时间处理的冒泡阶段，两个阶段都是通过addEventListener最后一个参数设置为false(默认值，表示事件冒泡)或者true(表示事件捕获)来切换 
+ 事件处理 this与onclick一样 
+ 事件处理函数中，event对象总是作为第一个可用参数 
+ 你可以为某个元素绑定多个事件而不会覆盖之前绑定的处理程序 （按照顺序执行） 


缺点
+ IE8以下不支持

兼容写法 
```javascript
attachEvent(event, fn) // ie8以前
```

---
如何移除事件？
```javascript
dom.onclick = null
dom.removeEventListener() // 不能移除匿名函数
```
---
阻止冒泡
```javascript
event.preventDefault() // 阻止默认事件
event.stopPropagation() // 阻止事件冒泡
return false
```