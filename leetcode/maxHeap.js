class Maxheap {
  constructor(data) {
    this.data = []
    this.init(data)
  }

  init(data = []) {
    for (let key = 0; key < data.length; key++) {
      this.insert(data[key])
    }
  }

  insert(val) {
    var curPosition = this.data.length
    this.data[curPosition] = val
    this.adjust_insert(curPosition)
    return true
  }

  remove() {
    if (!this.data.length) return null
    var max = this.data[0]
    if (this.data.length > 1) {
      this.data[0] = this.data.pop()
    } else {
      this.data.pop()
    }
    this.adjust_remove()
    return max
  }

  adjust_insert(curPosition) {
    var parentIndex = (curPosition - 1) >> 1
    while (curPosition > 0) {
      if (this.data[curPosition] <= this.data[parentIndex]) {
        break
      } else {
        [this.data[curPosition], this.data[parentIndex]] = [this.data[parentIndex], this.data[curPosition]]
        curPosition = parentIndex
        parentIndex = (curPosition - 1) >> 1
      }
    }
  }

  adjust_remove() {
    var leftNodeIndex = 1
    var rightNodeIndex = 2
    var curPosition = this.data[rightNodeIndex]
      && this.data[leftNodeIndex] < this.data[rightNodeIndex]
      ? rightNodeIndex
      : leftNodeIndex
    var parentIndex = (curPosition - 1) >> 1
    while (curPosition < this.data.length) {
      if (this.data[curPosition] <= this.data[parentIndex]) {
        break
      } else {
        [this.data[curPosition], this.data[parentIndex]] = [this.data[parentIndex], this.data[curPosition]]
        leftNodeIndex = (curPosition + 1) * 2 - 1
        rightNodeIndex = (curPosition + 1) * 2
        curPosition = this.data[leftNodeIndex] > this.data[rightNodeIndex] ? leftNodeIndex : rightNodeIndex
        parentIndex = (curPosition - 1) >> 1
      }
    }
  }


  print() {
    console.log(this.data)
  }

  size() {
    return this.data.length
  }
}

// var heap = new Maxheap([1, 2, 3, 4, 5])
// console.log(heap.remove())
// console.log(heap.remove())
// heap.insert(6)
// console.log(heap.remove())
// console.log(heap.remove())
// console.log(heap.remove())
// console.log(heap.remove())
// console.log(heap.remove())

module.exports = Maxheap