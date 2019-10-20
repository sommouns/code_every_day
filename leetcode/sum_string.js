function sum(a, b) {
  var res = '', temp = 0, aSymbol = '', bSymbol = '', num1, num2, lastSymbol = ''

  if (a < 0) {
    aSymbol = '-'
    a = a.substring(1)
  }
  if (b < 0) {
    bSymbol = '-'
    b = b.substring(1)
  }
  var aArr = a.split('')
  var bArr = b.split('')

  while (aArr.length || bArr.length || temp) {
    // 符号相同
    if (aSymbol === bSymbol) {
      temp += ~~aArr.pop() + ~~bArr.pop()
      res = temp % 10 + res
      temp = temp > 9 ? 1 : 0
      lastSymbol = aSymbol
    } else {
      // 符号不同
      num1 = ~~aArr.pop()
      num2 = ~~bArr.pop()

      // 比较绝对值，大值减小值
      if (+a > +b) {
        temp += num1 - num2
        if (temp < 0) {
          temp += 10
          res = temp % 10 + res
          temp = 0
          temp = -1
        } else {
          res = temp % 10 + res
          temp = 0
        }
        lastSymbol = aSymbol
      } else {
        temp += num2 - num1
        if (temp < 0) {
          temp += 10
          res = temp % 10 + res
          temp = 0
          temp = -1
        } else {
          res = temp % 10 + res
          temp = 0
        }
        lastSymbol = +a < +b ? bSymbol : ''
      }
    }
  }

  res = res.replace(/^0+/, '')
  if (!res) {
    res = '0'
  } else {
    res = lastSymbol + res
  }


  return res
}

console.log(sum('-123', '123'))