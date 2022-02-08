//4 5 2 3 h 7 6 1
function arr() {
  setTimeout(function () {
    console.log("1");
  }, 0);
  async function async1() {
    console.log("4");
    await async2();
    console.log(await Promise.resolve(7));
    console.log("6");
  }
  async function async2() {
    //  console.log(await Promise.resolve(7))
    console.log("5");
  }
  async1();
  new Promise(function (resolve, reject) {
    console.log("2");
    resolve();
  }).then(function (e2) {
    console.log("h");
  });
  console.log("3");
}
arr();



/* async function async1() {
  console.log("async1 start"); //2
  await async2();
  console.log("async1 end"); //6
}
async function async2() {
  console.log("async2"); //3
}
console.log("script start"); // 1
setTimeout(() => {
  console.log("setTimeout"); // 8
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise 1"); // 4
  resolve(1);
}).then(() => {
  console.log("promise 2"); // 7
});
console.log("script end"); // 5 */
