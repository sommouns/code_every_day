let count = 0
onconnect = function (e) {
  var port = e.ports[0];
  console.log(e)
  port.onmessage = function(e) {
    var workerResult = 'Result: ' + (count++);
    port.postMessage(workerResult);
  }

}