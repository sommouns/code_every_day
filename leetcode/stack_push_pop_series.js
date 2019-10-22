function isPopOrder(pushOrder, popOrder) {
  if (!pushOrder || !popOrder) {
    return 'Invalid input'
  }
  var stack = []
  for (let i = 0; i < popOrder.length; i++) {
    if (stack.length && stack[stack.length - 1] === popOrder[i]) {
      stack.pop()
    } else {
      var index = pushOrder.indexOf(popOrder[i])
      if (index !== -1) {
        for (let i = 0; i <= index; i++) {
          stack.push(pushOrder.shift())
        }
        stack.pop()
      } else {
        return false
      }
    }
  }

  return true
}

console.log(isPopOrder([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]))
console.log(isPopOrder([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))