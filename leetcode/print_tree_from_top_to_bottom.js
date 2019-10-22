function TreeNode(val) {
  this.val = val
  this.leftNode = null
  this.rightNode = null
}

function printTreeFromTopToBottom(root) {
  if (!root) return

  var queue = []
  queue.push(root)

  function printCore() {
    root = queue.shift()
    console.log(root.val)

    if (root.leftNode) {
      queue.push(root.leftNode)
    }
    if (root.rightNode) {
      queue.push(root.rightNode)
    }
  }
  while (queue.length) {
    printCore()
  }
}

function printTreeFromTopToBottomByLines(root) {
  if (!root) return

  var queue = []
  var temp = [] // 用于临时存储当前行的数据
  var nextNum = 0 // 下一层的节点数量
  var toBePrinted = 1
  queue.push(root)
  function printCore() {
    root = queue.shift()
    toBePrinted--
    temp.push(root.val)
    if (root.leftNode) {
      nextNum++
      queue.push(root.leftNode)
    }
    if (root.rightNode) {
      nextNum++
      queue.push(root.rightNode)
    }
    if (toBePrinted === 0) {
      toBePrinted = nextNum
      nextNum = 0
      console.log(temp.join(' '))
      temp = []
    }
  }
  while (queue.length) {
    printCore()
  }
}
var root = new TreeNode(1)
root.leftNode = new TreeNode(2)
root.rightNode = new TreeNode(3)
root.leftNode.leftNode = new TreeNode(4)
root.leftNode.rightNode = new TreeNode(5)
root.rightNode.leftNode = new TreeNode(6)
root.rightNode.rightNode = new TreeNode(8)
root.leftNode.leftNode.leftNode = new TreeNode(7)

// printTreeFromTopToBottom(root)
printTreeFromTopToBottomByLines(root)
console.log('---')

