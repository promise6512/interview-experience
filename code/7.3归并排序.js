const merge_sort = (arr) => {
  let len = arr.length;
  if (len <= 1) return arr;
  let mid = Math.floor(len / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, len);
  return merge(merge_sort(left), merge_sort(right));
}
const merge = (arr1, arr2) => {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    res.push(arr2[j]);
    j++;
  }
  return res;
}
console.log(merge_sort([1, 3, 4, 2, 7, 5, 5, 7, 1]))