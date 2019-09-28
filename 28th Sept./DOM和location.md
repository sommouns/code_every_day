# Location
> Location 对象包含有关当前 URL 的信息。 Location 对象是 Window 对象的一个部分，可通过 window.location 属性来访问。

#### properties
```
hash // 设置或返回从#开始的URL
host // 设置或返回主机名和当前URL的端口号
hostname
href
pathname
port
search // 设置或返回从?开始的URL(查询部分)
```

#### methods
```javascript
location.reload(true)
```
如果该方法没有规定参数，或者参数是 false，它就会用 HTTP 头 If-Modified-Since 来检测服务器上的文档是否已改变。如果文档已改变，reload() 会再次下载该文档。如果文档未改变，则该方法将从缓存中装载文档。这与用户单击浏览器的刷新按钮的效果是完全一样的。

如果把该方法的参数设置为 true，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。这与用户在单击浏览器的刷新按钮时按住 Shift 健的效果是完全一样。

----

# Document
> 每个载入浏览器的HTML 文档都会成为Document对象。Document 对象使我们可以从脚本中对HTML页面中的所有元素进行访问。Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问

#### properties
```
cookie // 设置或返回当前文档有关的所有cookie
title // 返回当前文档的标题
URL // 返回当前文档的URL
```

#### methods
##### close()方法

close() 方法可关闭一个由document.open 方法打开的输出流，并显示选定的数据。语法：

document.close()

该方法将关闭 open() 方法打开的文档流，并强制地显示出所有缓存的输出内容。

如果使用 write() 方法动态地输出一个文档，必须记住这么做的时候要调用 close() 方法，以确保所有文档内容都能显示。

一旦调用了 close()，就不应该再次调用 write()，因为这会隐式地调用 open() 来擦除当前文档并开始一个新的文档。

##### getElementByID()方法
##### write()方法
