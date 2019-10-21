function isNumeric(str) {
  if (!str) return 'Invalid Input'

  var numCount = 0;
  var dotCount = 0;
  var eCount = 0;
  var symCount = 0;
  var length = str.length;
  if (length == 0) {
    return false;
  }

  if (str[length - 1] == "E" || str[length - 1] == "e") {
    return false;
  }

  for (let i = 0; i < length; i++) {
    if (str[i] === '+' || str[i] === '-') {
      if ((symCount === 0 || symCount === 1) && numCount === 0) {
        if (str[i - 1] && str[i - 1] === '.') return false
        symCount++
      } else {
        return false
      }
    } else if (!isNaN(str[i])) {
      numCount++
    } else if (str[i] === '.') {
      if (dotCount !== 0 || eCount !== 0) {
        return false
      }
      dotCount++
      numCount = 0
    } else if (str[i] == "E" || str[i] == "e") {
      if (eCount === 0) {
        eCount++
        numCount = 0
      } else {
        return false
      }
    }
  }

  return true
}

console.log(isNumeric('123.123'))