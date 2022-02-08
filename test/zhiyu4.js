function f(a, t) {
  let left = 0;
  let right = a.length - 1;
  while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (a[mid] === t) {
          right = mid;
          break;
      } else if (a[mid] < t) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }
 // console.log(right)
  while (a[right] >= t) right--;
  console.log(right + 1)
  return right + 1;
}

f([1, 3, 6, 6, 8, 12], 0) 
f([1, 3, 6, 6, 8, 12], 1) 
f([1, 3, 6, 6, 8, 12], 2) 
f([1, 3, 6, 6, 8, 12], 3) 
f([1, 3, 6, 6, 8, 12], 4) 
f([1, 3, 6, 6, 8, 12], 6) 
f([1, 3, 6, 6, 8, 12], 7) 
f([1, 3, 6, 6, 8, 12], 8) 
f([1, 3, 6, 6, 8, 12], 9) 
f([1, 3, 6, 6, 8, 12], 12)
f([1, 3, 6, 6, 8, 12], 13)