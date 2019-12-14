/**
 * @flie 电话号码排序
 */

function sortPhone(number) {
  let mapArr = [1, 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stuv', 'wxyz']
  let arr = number.split('').map(i => {
    return mapArr[i]
  })

  let comb = arr => {
    let tmp = []
    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 0; j < arr[1].length; j++) {
        tmp.push([arr[0][i] + '' + arr[1][j]])
      }
    }
    arr.splice(0, 2, tmp)
    if (arr.length > 1) {
      comb(arr)
    }
    console.log(1)
    return arr[0]
  }

  return comb(arr)
}

console.log(sortPhone('234').length)
