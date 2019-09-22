let arr1 = Array.from(new Array(100000), (x, index)=>{
  return index
})
console.log(arr1)
let arr2 = Array.from(new Array(50000), (x, index)=>{
  return index+index
})

let start = new Date().getTime()
console.log('开始数组去重')

// function distinct(a, b) {
//   let arr = a.concat(b);
//   return arr.filter((item, index)=> {
//       return arr.indexOf(item) === index
//   })
// }

// function distinct(a, b) {
//   let arr = a.concat(b)
//   let result = []
//   for (let i of arr) {
//       !result.includes(i) && result.push(i)
//   }
//   return result
// }

// function distinct(a, b) {
//   return Array.from(new Set([...a, ...b]))
// }

function distinct(a, b) {
  let arr = a.concat(b)
  let result = []
  let obj = {}

  for (let i of arr) {
      if (!obj[i]) {
          result.push(i)
          obj[i] = 1
      }
  }

  return result
}
console.log('去重后的长度', distinct(arr1, arr2).length)

let end = new Date().getTime()
console.log('耗时', end - start)
// const a = [1, 2, 3] 
// const b = Array.from(a)
// a.shift()
// console.log(b)
// console.log(a)