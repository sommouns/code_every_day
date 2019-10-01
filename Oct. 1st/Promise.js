const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {  // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
      return reject(new TypeError('循环引用'));
  }

  let called = false; // 避免多次调用
  // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
  if (x instanceof Promise) { // 获得它的终值 继续resolve
      if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
          x.then(y => {
              resolvePromise(promise2, y, resolve, reject);
          }, reason => {
              reject(reason);
          });
      } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
          x.then(resolve, reject);
      }
      // 如果 x 为对象或者函数
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
      try { // 是否是thenable对象（具有then方法的对象/函数）
          let then = x.then;
          if (typeof then === 'function') {
              then.call(x, y => {
                  if(called) return;
                  called = true;
                  resolvePromise(promise2, y, resolve, reject);
              }, reason => {
                  if(called) return;
                  called = true;
                  reject(reason);
              })
          } else { // 说明是一个普通对象/函数
              resolve(x);
          }
      } catch(e) {
          if(called) return;
          called = true;
          reject(e);
      }
  } else {
      resolve(x);
  }
}
class Promsie {
  constructor() {
    this.initState()
  }

  initSate() {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }

  resolve(value) {
    if (value instanceof Promsie) {
      return value.then(this.resolve, this.reject)
    }
    const that = this
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED
        that.value = value
        that.onFulfilledCallbacks.forEach(cb => cb(that.value))
      }
    }, 0);
  }

  reject(reason) {
    const that = this
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED
        that.reason = reason
        that.onRejectedCallbacks.forEach(cb => cb(that.value))
      }
    }, 0);
  }

  then(onFulfilled, onRejected) {
    let newPromise
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }

    if (this.status === FULFILLED) {
      return newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
          }
        });
      })
    }

    if (that.status === REJECTED) { // 失败态
      return newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(that.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }

    if (that.status === PENDING) { // 等待态
      // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
      return newPromise = new Promise((resolve, reject) => {
        that.onFulfilledCallbacks.push((value) => {
          try {
            let x = onFulfilled(value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        that.onRejectedCallbacks.push((reason) => {
          try {
            let x = onRejected(reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }
}
const a = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
}).then(v => {
  console.log(v)
})