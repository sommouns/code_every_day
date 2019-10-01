# ajax请求过程

#### Step 1 创建Ajax核心对象XMLHttpRequest
```javascript
var xmlhttp;
if(window.XMLHttpRequest){ 
//IE7+,Chrome,Firefox,Safari,Opera执行此代码 xmlhttp=new XMLHttpRequest;
}else{
   //IE5,IE6执行该代码
   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```

#### Step 2 向服务器发送请求
```javascript
xmlhttp.open(method,url,async);
xmlhttp.send();
```
> 注意一：open 的参数要牢记，很多面试官爱问这样的细节
> **method**：请求的类型；GET 或 POST
> **url**：文件在服务器上的位置，相对位置或绝对位置
> **async**：true（异步）或 false（同步）
> **为什么使用 Async=true** ？
> 我们的实例在 open() 的第三个参数中使用了 "true"。
该参数规定请求是否异步处理。
True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
onreadystatechange 事件使代码复杂化了。但是这是在没有得到服务器响应的情况下，防止代码停止的最安全的方法。
通过把该参数设置为 "false"，可以省去额外的 onreadystatechange 代码。如果在请求失败时是否执行其余的代码无关紧要，那么可以使用这个参数

> 注意二：post请求不同于get请求
send(string)方法post请求时才使用字符串参数，否则不用带参数。

> 注意三：post请求一定要设置请求头的格式内容
```javascript
  xmlhttp.open("POST","ajax_test.html",true);
  xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
  xmlhttp.send("fname=Herry&lname=Ford");
 ```

  
#### Step 3 服务器响应处理(responseText, responseXML)

+ 同步处理
```javascript
xmlhttp.open("GET","http://www.runoob.com/try/ajax/demo_get.php",false);
xmlhttp.send();
document.getElementById("mydiv").innerHTML=xmlhttp.responseText;
```

+ 异步处理
```javascript
 xmlhttp.onreadystatechange=function () {//接收到服务端响应时触发
      if(xmlhttp.readyState==4&&xmlhttp.status==200){
            document.getElementById("mydiv").innerHTML=xmlhttp.responseText;
       }
 }
```

#### 一共有5种状态
+ 0 请求未初始化
+ 1 服务器连接已建立
+ 2 请求已接收
+ 3 请求处理中
+ 4 请求已完成，且响应已就绪


#### xmlhttp.status
200: "OK"

304：该资源在上次请求之后没有任何修改（这通常用于浏览器的缓存机制，使用GET请求时尤其需要注意）。

403   （禁止） 服务器拒绝请求。

404   （未找到） 服务器找不到请求的网页。

408  （请求超时） 服务器等候请求时发生超时。

500   （服务器内部错误）  服务器遇到错误，无法完成请求