/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  // 边缘情况
  if (!num1 || !num2 || num1 === '0' || num2 === '0') return '0'
  num1 = num1.split('').reverse()
  num2 = num2.split('').reverse()
  
  // 存储个位数字
  var temp = []
  function tempPush(index, val) {
      temp[index] = temp[index] || 0
      var value = +temp[index] + val
      var int = Math.floor(value/10)
      temp[index] = value % 10
      if (int) tempPush(index + 1, 1)
  }
  
  
  var total = 0
  for (let i = 0; i < num1.length; i += 1) {
       for (let j = 0; j < num2.length; j += 1) {
          var basePosition = i + j
          var mulRes = num1[i] * num2[j]
          var pro = Math.floor(mulRes/10)
          var val = mulRes % 10
          tempPush(basePosition, val)
          if (pro) tempPush(basePosition + 1, pro)
      }
  }
  return temp.reverse().join('')
};

console.log(multiply('123', '456'))