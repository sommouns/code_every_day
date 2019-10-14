var childProcess = require('child_process')
var parent = childProcess.fork('./parent.js')
parent.on('message', function (msg) {
  console.log("child process get info: " + msg)
})

parent.send('hello, my parent')