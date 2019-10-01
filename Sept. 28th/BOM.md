# BOM

### properties

```javascript
// 浏览器窗口大小
window.outerWidth
window.outerHeight

// 视图大小（不包括边框）
window.innerWidth
window.innerHeight

// 获取浏览器信息
window.navigator

// url
window.location
```

### methods 
```javascript
window.open(URL,name,features,replace)
window.history.forward()
window.history.back()
window.history.go()
```
+ URL：打开一个网址，网址前需加协议名；如果为空，则打开空窗口；
+ name：相当于html的target属性，在哪里打开，可以传入这四个值：_self、 _parent、 _top 或_blank，或者自定义name；
+ features：窗口特性，如果需要打开新窗口or新标签，则会根据第3个参数也就是features里的字符串设置来创建新窗口；特性all属性：http://www.w3school.com.cn/jsref/met_win_open.asp#windowfeatures
+ replace：规定了新载入的url是否覆盖当前url的history，true覆盖，false不覆盖；