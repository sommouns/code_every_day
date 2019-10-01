// 先序遍历：中，左，右
const TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
    },
    right: {
      val: 7
    }
  }
};

// 递归方式的先序遍历方法
var preOrderRecur = function (root) {

  var list = [];
  var preOrder = function (root) {
    if (root === undefined) {
      return root;
    }
    preOrder(root.left);
    preOrder(root.right);
    list.push(root.val)
  }
  preOrder(root);
  return list;
};

// 非递归方式的先序遍历方法
var preOrder = function (TreeNode) {
  var list = [];
  let stack = [TreeNode];
  while (stack.length !== 0) {
    const cur = stack.pop();
    const right = cur.right;
    const left = cur.left;
    list.push(cur.val);

    if (right) {
      stack.push(right);
    }
    if (left) {
      stack.push(left);
    }
  }
  return list;
}
var midOrder = function (TreeNode) {
  var list = [];
  let stack = [TreeNode];
  let cur = TreeNode
  while (stack.length !== 0 || !cur) {
    const right = cur.right;
    const left = cur.left;
    if (left && !left.flag) {
      cur = left
      stack.push(left)
      left.flag = true
    } else {
      let temp = stack.pop()
      cur = temp
      list.push(temp.val)
      if (cur.right) {
        stack.push(cur.right);
        cur = cur.right
      }
    }
  }
  return list;
}

var afterOrder = function (TreeNode) {
  var list = [];
  let stack = [TreeNode];
  let cur = TreeNode
  while (stack.length !== 0 || !cur) {
    const right = cur.right;
    const left = cur.left;
    if (left && !left.flag) {
      cur = left
      stack.push(left)
      left.flag = true
    } else {
      cur = stack.length ? stack[stack.length - 1] : undefined
      if (cur.right && !cur.right.flag) {
        stack.push(cur.right);
        cur = cur.right
        cur.flag = true
      } else {
        let temp = stack.pop()
        list.push(temp.val)
      }
      
    }
  }
  return list;
}

var list = preOrderRecur(TreeNode);
console.log('递归前序遍历', list);

var listUnRecur = afterOrder(TreeNode);
console.log('非递归前序遍历', listUnRecur);