function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}
function convert(root) {
  if (!root) {
    return null
  }
  if (!root.left && !root.right) return root

  var left = convert(root.left)
  var temp = left

  while (temp && temp.right) {
    temp = temp.right
  }

  // 组成双向链表
  if (temp) {
    temp.right = root
    root.left = temp
  }

  var right = convert(root.right)

  if (right) {
    right.left = root
    root.right = right
  }

  return left ? left : root
}

var root = new TreeNode(10)
root.left = new TreeNode(6)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(8)
root.right = new TreeNode(14)
root.right.left = new TreeNode(12)
root.right.right = new TreeNode(16)

var resc = convert(root)
debugger