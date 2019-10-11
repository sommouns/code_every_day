
process.on('beforeExit', (code) => {
  console.log('进程 beforeExit 事件的代码: ', code);
});

process.on('exit', (code) => {
  console.log('进程 exit 事件的代码: ', code);
});

process.on('disconnect', (code) => {
  console.log('进程 disconnect 事件的代码: ', code);
});




console.log('开始');
setTimeout(() => {
  console.log('settime out')
}, 0);
process.nextTick(() => {
  console.log('下一个时间点的回调');
});
console.log('调度');

function definitelyAsync(arg, cb) {
  if (arg) {
    process.nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
console.log('此消息最新显示');
