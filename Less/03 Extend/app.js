const express = require('express')
const ejs = require('ejs');
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express) // 设置视图引擎后缀，为.html
app.set('view engine', 'html') // 设置视图引擎为html

// 设置静态目录
app.use('/static', express.static(__dirname + '/libs'))
  
app.get('/test', function (req, res, next) {
  res.render('browser')
})

app.listen(3000, function () {
  console.log('success running')
})