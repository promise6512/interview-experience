const promise = Promise.resolve(1);
promise.then((value) => Promise.reject(value)).then(value => console.log(value), err => console.log(err))