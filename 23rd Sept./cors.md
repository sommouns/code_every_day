# Cors

CORS原理只需要向响应头header中注入Access-Control-Allow-Origin，这样浏览器检测到header中的Access-Control-Allow-Origin，则就可以跨域操作了。

## 简介
CORS，跨域资源共享，需要浏览器和服务器同时支持，基本思想为使用自定义的HTTP头部让浏览器和服务器通信

## 分类
+ 简单请求（HEAD GET POST HTTP头部信息不超出几个字段）
+ 非简单请求
> HEAD请求 : 只请求页面的首部，可以判断一个资源是否存在

### 简单请求
浏览器直接发出CORS请求，在头信息中添加一个Origin字段，用来说明请求来自哪个源，服务器根据这个值，决定是否同意这次请求
+ 如果服务器不许可，则返回的信息中不会包含Access-Control-Allow-Origin字段，这个错误需要onerror捕获，返回的状态码可能为200
+ 如果服务器许可，则服务器返回的响应中会多出Access-Control-字段
+ CORS默认不发送cookie，需要发送cookies，则需要服务器指定Access-Control-Allow-Credentials字段，需要在ajax请求中打开withCredentials属性

### 非简单请求
请求方法是PUT或DELETE，Content-Type字段类型是application/json

会在正式通信前，增加一次OPTIONS查询请求，预检请求

询问服务器，网页所在域名是否在服务器的许可名单中，以及可以使用那些HTTP动词和头信息字段，只有得到肯定答复，浏览器才会发出正式XMLHTTPRequest请求，否则会报错

服务器通过预检请求，以后每次浏览器正常CORS请求，都会和简单请求一样，会有一个Origin字段，服务器的回应也会有yieldAccess-Control-Allow-Origin头信息字段

#### 下面开始具体的代码环节
为了测试方便了，使用express-generator构建了两个项目
前端部分
```javascript
  $(document).ready(function () {
      $.ajax({
        url: 'http://localhost:3001/put',
        async: false,
        method: 'PUT'
      }).then(res => {
        console.log(res)
      })
    })
```
因为复杂请求比较特殊，所以以这个为例
```
Request URL: http://localhost:3001/put
Request Method: OPTIONS
Status Code: 200 OK
Remote Address: [::1]:3001
Referrer Policy: no-referrer-when-downgrade
```
会先发送一个option请求做preflight，这时候前端就要先校验option请求的返回，关键字段 ***Access-Control-Allow-Origin***，我这边是在app.js先拦截了一下请求
```javascript
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  next();
})
```

当然也有一些现成的npm中间件，比如 ***cors*** 
```javascript
router.get('/test', cors(), function (req, res, next) {
  res.status(200)
  res.json(questions)
})
```
当然 ***PUT*** 请求是不能直接这么用的，要么直接直接全局使用，要么就像我之前那样先拦截一下请求，对OPTIONS请求做一下特殊判断，因为没发监听到options请求。