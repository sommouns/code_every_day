
// 快速排序  n^2
var arr = [1, 4, 5, 2, 3, 9, 0, 7, 6];
var temp;

for (var i = 0; i < arr.length; i++) {
  for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
          temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
      }
  }var arr = [1, 4, 5, 2, 3, 9, 0, 7, 6];
  var t;
  
  for (var m = 0; m < arr.length; m++) {
      for (var n = 0; n < arr.length - m; n++) {
          if (arr[n] > arr[n + 1]) {
              t = arr[n + 1];
              arr[n + 1] = arr[n];
              arr[n] = t;
          }
      }
  }
}

// 冒泡排序
var arr = [1, 4, 5, 2, 3, 9, 0, 7, 6];
var t;

for (var m = 0; m < arr.length; m++) {
    for (var n = 0; n < arr.length - m; n++) {
        if (arr[n] > arr[n + 1]) {
            t = arr[n + 1];
            arr[n + 1] = arr[n];
            arr[n] = t;
        }
    }
}