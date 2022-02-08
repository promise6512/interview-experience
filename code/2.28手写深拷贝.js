function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    if (map.has(target)) return map.get(target);
    let cloneTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget);
    for (let key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
let obj = {
  a: 1,
  b: {
    c:2,
    d: [1, 2]
  }
}
obj.c = obj
console.log(clone(obj));