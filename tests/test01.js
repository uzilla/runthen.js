var { Waiter } = require("../waiter.js");

function sleep(ms) {
  return new Waiter(function (resolve) {
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
