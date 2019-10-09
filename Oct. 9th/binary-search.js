function binary_serarch(arr, key) {
  var min = 0;
  var max = arr.length - 1

  while (min <= max) {
    var mid = Math.floor((max + min) / 2)
    if (arr[mid] === key) return mid

    if (arr[mid] < key) {
      min = mid + 1
    } 

    if (arr[mid] > key) {
      max = mid - 1
    }
  }

  return -1
}
function binary_search_rec(arr, key, min = 0, max = arr.length) {
  if (min > max) return -1

  var mid = Math.floor((max + min) / 2)
  if (arr[mid] === key) return mid
  if (arr[mid] < key) {
    return binary_search_rec(arr, key, mid + 1, max)
  } else {
    return binary_search_rec(arr, key, min, mid - 1)
  }
}
const arr = [213, 321, 123, 523, 1234]
arr.sort(function (a, b) {
  return a - b
})
console.log(binary_search_rec(arr, 1234))