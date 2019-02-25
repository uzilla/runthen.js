Waiter.js
============
Promise-like Library

## Usage ##

```js
function fetchData(url) {
  return new Waiter(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.onload = function() {
      resolve(this.responseText);
    };
  });
}

fetchData("https://httpbin.org/get")
.then(function (data) {
  // Do something here.
})
.done();
```

**NOTE**: The Waiter instance must have a `.done` method to apply it,  
because each `.then` method just registers a callback but not really run it.  

```js
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
```

## Waiter.prototype.catch

A Waiter instance can only have one `.catch`, which  
will run when the Waiter-chains broken by an error.  

By the way, you can also break a Waiter-chains via  
just use a `throw new Error`. Its easy right?  

**NOTE**: Even you doesn't catch the error, the Waiter-system  
will also catch it and not throw it up. So a good way to debug  
you should manually write a `.catch` callback to handle the error.  

## Waiter.resolve

Same as `Promise.resolve`, which will returns a new instance of Waiter,
the instance has been resolved, it can simply to registers new callbacks.  
