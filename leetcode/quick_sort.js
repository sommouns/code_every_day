function quickSort(arr) {
  if (arr.length <= 1) return arr

  var baseIndex = Math.floor(arr.length / 2)

  var base = arr.splice(baseIndex, 1)[0]

  var left = [], right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= base) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([base], quickSort(right))
}