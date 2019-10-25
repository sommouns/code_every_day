function nthUglyNumber(n) {
  let a2 = a3 = a5 = 0;   // 将要乘以2、3、5的数的索引
  let ugly = [1];
  for (let i = 1; i < n; ++i) {
    ugly.push(Math.min(Math.min(ugly[a2] * 2, ugly[a3] * 3), ugly[a5] * 5));
    if (ugly[i] / ugly[a2] === 2)++a2;
    if (ugly[i] / ugly[a3] === 3)++a3;
    if (ugly[i] / ugly[a5] === 5)++a5;
  }
  return ugly[n - 1];
}

nthUglyNumber(3)
debugger