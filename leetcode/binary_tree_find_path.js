function TreeNode(val) {
  this.val = val
  this.leftNode = null
  this.rightNode = null
}

function findPath(pRoot, expectedNum) {
  function findPathCore(pRoot, expectedNum, path, currentSum) {
    if (!pRoot) return

    path.push(pRoot.val)
    currentSum += pRoot.val

    if (currentSum > expectedNum) {
      return
    } else if (currentSum === expectedNum && pRoot.leftNode === null && pRoot.rightNode === null) {
      console.log(path.join(' -> '))
    }

    if (pRoot.leftNode) {
      findPathCore(pRoot.leftNode, expectedNum, path, currentSum)
    }

    if (pRoot.rightNode) {
      findPathCore(pRoot.rightNode, expectedNum, path, currentSum)
    }
    path.pop()
  }
  if (!pRoot) return

  var path = [], currentSum = 0

  findPathCore(pRoot, expectedNum, path, currentSum)
}

var root = new TreeNode(10)
root.leftNode = new TreeNode(5)
root.rightNode = new TreeNode(12)
root.leftNode.leftNode = new TreeNode(4)
root.leftNode.rightNode = new TreeNode(7)

findPath(root, 22)