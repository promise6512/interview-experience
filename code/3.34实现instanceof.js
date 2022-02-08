function _instanceof(left, right){
  if (left === undefined || left === null) return false;
  if (typeof left !== 'object') return false;
  let proto = left.__proto__;
  let prototype = right.prototype;
  if (proto === null) return false;
  if (proto === prototype) return true;
  return _instanceof(proto, right)
}
/* console.log({} instanceof Object)
let s = new String("abc");
console.log(typeof s) */
console.log(_instanceof(new Set(), Set))