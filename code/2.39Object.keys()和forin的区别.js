let obj2 = { a: 1, b: 2 };
obj2.__proto__ = {
  c: 3,
  d:4
};
for (let key in obj2) {
  console.log(key);
}
console.log(Object.keys(obj2));
