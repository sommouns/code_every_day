function isBalanced_solution(pRoot) {
  return getDepth(pRoot) !== -1
}

function getDepth(root) {
  if (!root) {
    return 0
  }

  let left = getDepth(root.left)
  if (left === -1) return -1
  let right = getDepth(root.right)
  if (right === -1) return -1

  return Math.abs(left - right) > 1 ? -1 : 1 + Math.max(left, right)
}