let a = [1, 2];
console.log(Array.isArray(a))
console.log(a instanceof Array)
console.log(Object.prototype.toString.call(a))
console.log(Array.prototype.isPrototypeOf(a))
//console.log(typeof [])