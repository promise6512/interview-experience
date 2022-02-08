function unique(iterable, selector) {
  let res = [];
  let map = new Map();
  for (let i of iterable) {
    let key = selector(i);
    if (map.has(key)) {
      res.splice(map.get(key), 1);
    }
    res.push(i);
    map.set(key, res.length - 1);
  }
  return res;
}
const users = [
  { name: "aaa", age: 12 },
  { name: "bbb", age: 13 },
  { name: "aaa", age: 14 },
];

console.log(unique(users, (u) => u.name));
