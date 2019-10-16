/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// var findMedianSortedArrays = function(nums1, nums2) {
//   var newArr = nums1.concat(nums2).sort((a ,b) => a - b)

//   if (newArr.length % 2 === 1) {
//     return newArr[Math.floor(newArr.length/2)]
//   } else {
//     return (newArr[newArr.length/2] + newArr[newArr.length/2 - 1]) /2
//   }
// };

// var findMedianSortedArrays = function (nums1, nums2) {
//   if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];

//   const length1 = nums1.length;
//   const length2 = nums2.length
//   let min = 0;
//   let max = length1;
//   let half = Math.floor((length1 + length2 + 1) / 2);
//   while (max >= min) {
//     const i = Math.floor((max + min) / 2);
//     const j = half - i;
//     if (i > min && nums1[i - 1] > nums2[j]) {
//       max = i - 1;
//     } else if (i < max && nums1[i] < nums2[j - 1]) {
//       min = i + 1;
//     } else {
//       let left, right;
//       if (i === 0) left = nums2[j - 1];
//       else if (j === 0) left = nums1[i - 1];
//       else left = Math.max(nums1[i - 1], nums2[j - 1]);

//       if (i === length1) right = nums2[j];
//       else if (j === length2) right = nums1[i];
//       else right = Math.min(nums1[i], nums2[j]);

//       return (length1 + length2) % 2 ? left : (left + right) / 2;
//     }
//   }
//   return 0;
// };

// 最快方案
var findMedianSortedArrays = function (nums1, nums2) {
  let mergeArr = [],
    result,
    i = 0,
    j = 0;
  // 合并有序数组，也可以直接合并，然后用sort排序，但效率没有这样高
  while (i < nums1.length || j < nums2.length) {
    // 当一个数组已经遍历完了，说明另一个数组剩下的一定是大的值，直接往后拼接就行
    // 0要排除，要不然会出现内存泄露
    if (!nums1[i] && nums1[i] != 0) {
      mergeArr.push(nums2[j])
      j++
    } else if (!nums2[j] && nums2[j] != 0) {
      mergeArr.push(nums1[i])
      i++
    } else {
      if (nums1[i] > nums2[j]) {
        mergeArr.push(nums2[j])
        j++
      } else {
        mergeArr.push(nums1[i])
        i++
      }
    }
  }
  // 求中位数，没什么好说的了
  let halfArr = mergeArr.length / 2
  if (mergeArr.length % 2 == 0) {
    result = (mergeArr[halfArr] + mergeArr[halfArr - 1]) / 2
  } else {
    result = mergeArr[Math.floor(halfArr)]
  }
  return result
}

console.log(findMedianSortedArrays([1, 3], [2]))