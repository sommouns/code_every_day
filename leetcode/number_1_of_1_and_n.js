function NumberOf1Between1AndN_Solution(n) {
  // write code here
  var count = 0;
  var i = 1;
  var pre = 0, back = 0, cur = 0;
  while (n >= i) {
    pre = parseInt(n / (i * 10));
    back = n - parseInt(n / i) * i;
    cur = parseInt(n / i) % 10;
    if (cur == 0) {
      count += pre * i;
    } else if (cur == 1) {
      count += pre * i + back + 1;
    } else {
      count += (pre + 1) * i
    }
    i *= 10;
  }
  return count;
}
console.log(NumberOf1Between1AndN_Solution(12))