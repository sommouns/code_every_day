// method 1: recursion 
// function dice_value(num) {
//   if (!num) return false
//   var arr = []
//   dice_value_rec(num, 0)
//   function dice_value_rec(num, val) {
//     if (num === 0) {
//       return arr[val] = arr[val] ? arr[val] + 1 : 1
//     }
//     for (let index = 1; index <= 6; index++) {
//       const cur = index
//       dice_value_rec(num - 1, val + cur)
//     }
//   }
//   function print_res(start, end) {
//     for (let index = start; index <= end; index++) {
//       console.log(index + ': ' + arr[index])
//     }
//   }
//   print_res(num, num * 6)
// }

// method 2
function dice_value(n) {
  var face = 6
  var pointNum = face * n
  var dp = [new Array(pointNum).fill(0), new Array(pointNum).fill(0)]
  for (let i = 1; i <= face; i++) {
    dp[0][i] = 1
  }

  var flag = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= pointNum; j++) {
      dp[flag][j] = 0
    }

    for (let j = i; j <= pointNum; j++) {
      for (let k = 1; k <= face && k <= j; k++) {
        dp[flag][j] += dp[1 - flag][j - k];
      }
    }
    flag = 1 - flag
  }

  const totalNum = Math.pow(6, n)
  var arr = []
  for (let i = n; i <= pointNum; i++) {
    arr.push(dp[1 - flag][i])
  }
  console.log(dp)
}
dice_value(2)
