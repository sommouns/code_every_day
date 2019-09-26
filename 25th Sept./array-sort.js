const arr = [123, 3443, 1231, 23, 11]

// 冒泡排序法
function mySort(arr) {
  for (let i = 0; i < arr.length + 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
}

// 快速排序法
function quickSort(arr) {
  if (arr.length <= 1) return arr

  var index = Math.floor(arr.length / 2)
  var pivot = arr.splice(index, 1)[0]

  var left = []
  var right = []

  console.log('基准为：' + pivot + ' 时')
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
      console.log('左边' + arr[i])
    } else {
      right.push(arr[i])
      console.log('右边' + arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}

function quickSortPro(arr,left,right){
  var i=left;
  var j=right;
  var temp;
  while(i<j) {
      for (; i < j && arr[j] >= arr[left]; j--);
      for (; i < j && arr[i] <= arr[left]; i++);
      if (i < j) {
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
  }
  temp=arr[left];
  arr[left]=arr[i];
  arr[i]=temp;
  if(i>left){
    quickSortPro(arr,left,i-1);
  }if(right>i){
    quickSortPro(arr,i+1,right);
  }
}
quickSortPro(arr, 0, 4)
console.log(arr)