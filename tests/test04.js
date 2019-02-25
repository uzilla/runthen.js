var { Runthen } = require("../runthen.js");

function sleep(ms) {
  return new Runthen(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, ms);
  });
}

var sl = sleep(1000)

sl.then(function() {
  //throw new Error;
  return 1;
})
.catch(function (err) {
  if (err) {
    console.log("Caught the error.");
  }
})
.then(function (data) {
  console.log("The data: " + data);
})
.done();

setTimeout(function () {
  console.log("Before: " + JSON.stringify(sl));
}, 500);

// After
setTimeout(function () {
  console.log("After: " + JSON.stringify(sl));
}, 1500);

console.log("Begin...");
