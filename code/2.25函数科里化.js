function curry(fn) {
  function sub_curry(fn, curArgs) {
    return function() {
      let args = [...arguments];
      if (curArgs === undefined) {
        curArgs = [];
      }
      args = curArgs.concat(args);
      //console.log(args);
      if (args.length < fn.length) {
        return sub_curry(fn, args);
      }
      fn.apply(null, args);
    };
  }
  return sub_curry(fn);
}
function sum(a, b, c) {
  let sum = a + b + c;
  console.log(sum);
}
let fn = curry(sum);
fn(1)(2)(3);

function curry2(fn) {
  let args = [];
  return function () {
    if (arguments.length > 0) {
      args = args.concat([...arguments]);
      return arguments.callee;
    } else {
      fn.apply(null, args);
    }
  };
}

function getArr(){
  console.log([...arguments])
}

let fn2 = curry2(getArr);
fn2(1)(2)()

const curry3 = (fn, ...args) => {
  if (args.length >= fn.length) {
    fn(...args)
  } else {
    return (..._args) => curry3(fn, ...args, ..._args) 
  }
}
const fn3 = curry3(sum);
fn3(1)(2)(3)