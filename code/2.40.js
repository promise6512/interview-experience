let obj = { a: 1, b: 2 };
obj.__proto__ = {
  c: 3,
  d: 4,
};

console.log('d' in obj)
console.log(obj.hasOwnProperty('d'))