var { Runthen } = require("../runthen.js");

function sleep(ms) {
  return new Runthen(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, ms);
  });
}

sleep(1000)
.then(function() {
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
console.log("Begin...");
