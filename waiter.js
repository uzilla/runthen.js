/*
 * Copyright 2018 urain39
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (global) {
  var ST_PENDING = 0,
      ST_RESOLVED = 1,
      ST_REJECTED = 2;

  function Waiter(executor) {
    var self = this;
    self._state = ST_PENDING;
    self._executor = executor;
    self._resolveList = [];
    self._onCatch = null;
  }

  Waiter.prototype.then = function (resolve) {
    var self = this;
    self._resolveList.push(resolve);
    return self;
  };

  Waiter.prototype.catch = function (onCatch) {
    var self = this;
    self._onCatch = onCatch;
    return self;
  };

  Waiter.prototype.destroy = function () {
    var self = this;
    self._resolveList.length = 0;
    self._onCatch = null;
  };

  Waiter.prototype.run   =
  Waiter.prototype.done  =
  Waiter.prototype.start = function () {
    var self = this,
        context = null,
        resolve = null,
        onCatch = null;
    if (self._state !== ST_PENDING) {
      return; // State has been changed, so just ignore it.
    }
    // The executor's callback
    resolve = function (value) {
      context = value;
      // Handle Promise-like then-chains.
      while (self._resolveList.length > 0) {
        // Get the next resolve callback.
        resolve = self._resolveList.shift();
        // Then call it one by one with context.
        try {
          context = resolve(context);
        } catch (e) {
          onCatch = self._onCatch;
          if (typeof onCatch === "function") {
            onCatch(e);
          }
          // Mark state is rejected.
          self._state = ST_REJECTED;
          break;
        }
      }
      // Whatever, destroy it first.
      self.destroy();
      if (self._state !== ST_PENDING) {
        return; // State changed.
      }
      // Mark state is resolved.
      self._state = ST_RESOLVED;
    };
    // Call the executor directly(main-thread).
    self._executor(resolve);
  };

  // Syntactic Sugar?
  Waiter.resolve = function (value) {
    return new Waiter(function (resolve) {
      resolve(value);
    });
  };

  global.Waiter = Waiter;
  if (typeof exports === "object") {
    exports.Waiter = Waiter;
  }
})(this);
