const quickSort = (arr) => {
  if (arr.length < 1) return arr;
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};
console.log(quickSort([1, 3, 4, 2, 7, 5, 5]));

const quickSort2 = (arr, l = 0, r = arr.length - 1) => {
  if (l >= r) return;
  let i = l;
  let j = r;
  let privot = arr[i];
  while (i < j) {
    while (i < j && arr[j] >= privot) j--;
    if (i < j) {
      arr[i] = arr[j];
      i++;
    }
    while (i < j && arr[i] < privot) i++;
    if (i < j) {
      arr[j] = arr[i];
      j--;
    }
  }
  arr[i] = privot;
 // console.log(arr)
  quickSort2(arr, l, i - 1);
  quickSort2(arr, i + 1, r);
};
let a = [1, 3, 4, 2, 7, 5, 5, 7, 1];
quickSort2(a);
console.log(a);
