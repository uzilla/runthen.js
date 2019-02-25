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
  console.log("Hello!");
})
.done();
console.log("Begin...");
