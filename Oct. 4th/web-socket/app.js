const express = require('express')
const ejs = require('ejs');
const path = require('path')
const ws = require('ws')
const app = express()

// web socket
let socketServer = ws.Server

let wss = new socketServer({ port: 8090 })

wss.on('connection', function connection(ws) {
  wss.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.send('message');
  });
  wss.send('welcome');
});

app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express) // 设置视图引擎后缀，为.html
app.set('view engine', 'html') // 设置视图引擎为html

// 设置静态目录
app.use('/static', express.static(__dirname + '/libs'))
  
app.get('/test', function (req, res, next) {
  res.render('browser')
})
app.get('/test2', function (req, res, next) {
  res.render('browser2')
})
app.listen(3000, function () {
  console.log('success running')
})