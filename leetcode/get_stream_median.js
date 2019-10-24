const MaxHeap = require('./maxHeap')
const MinHeap = require('./minHeap')


var maxHeap = new MaxHeap()
var minHeap = new MinHeap()
function insert(data) {
  if ((maxHeap.size() + minHeap.size()) & 1) {
    if (maxHeap.data[0] && data < maxHeap.data[0]) {
      var temp = maxHeap.remove()
      minHeap.insert(temp)
      maxHeap.insert(data)
    } else {
      minHeap.insert(data)
    }
  } else {
    if (minHeap.data[0] && data > minHeap.data[0]) {
      var temp = minHeap.remove()
      maxHeap.insert(temp)
      minHeap.insert(data)
    } else {
      maxHeap.insert(data)
    }
  }
}

function getMidian() {
  var size = maxHeap.size() + minHeap.size()
  if (size & 1) {
    return minHeap.data[0]
  } else {
    return (maxHeap.data[0] + minHeap.data[0]) / 2
  }
}
var temp = []

for (let i = 0; i < 10; i++) {
  var random = Math.floor(Math.random() * 10)
  temp.push(random)
  insert(random)

}
console.log(temp.sort())
console.log(getMidian())