process.on('message', function (msg) {
  console.log("the message is (paretn): " + msg)
  process.send('oh my son')
})