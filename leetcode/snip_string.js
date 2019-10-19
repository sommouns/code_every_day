function snipStringDP(length) {
  if (length < 2) {
    return 0
  }
  if (length === 2) {
    return 1
  }
  if (length === 3) {
    return 2
  }
  var products = []

  products[0] = 0
  products[1] = 1
  products[2] = 2
  products[3] = 3
  for (let i = 4; i <= length; i++) {
    var max = 0
    for (let j = 0; j <= i / 2; j++) {
      product = products[j] * products[i - j]
      if (max < product) {
        max = product
      }
      products[i] = max
    }
  }

  return products[length]
}
console.log('DP: ' + snipStringDP(8))


function snipStringGreek(length) {
  if (length < 2) {
    return 0
  }
  if (length === 2) {
    return 1
  }
  if (length === 3) {
    return 2
  }

  let threeCount = Math.floor(length / 3)
  if (length - 3 * threeCount === 1) {
    threeCount--
  }
  let lesslength = length - 3 * threeCount
  let twoCount = Math.floor(lesslength / 2)
  return Math.pow(3, threeCount) * Math.pow(2, twoCount)
}
console.log('Greek: ' + snipStringGreek(8))
