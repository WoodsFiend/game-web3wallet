// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"KA2S":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"o7RX":[function(require,module,exports) {
(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
      Buffer = window.Buffer;
    } else {
      Buffer = require('buffer').Buffer;
    }
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
      this.negative = 1;
    }

    if (start < number.length) {
      if (base === 16) {
        this._parseHex(number, start, endian);
      } else {
        this._parseBase(number, base, start);
        if (endian === 'le') {
          this._initArray(this.toArray(), base, endian);
        }
      }
    }
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex4Bits (string, index) {
    var c = string.charCodeAt(index);
    // 'A' - 'F'
    if (c >= 65 && c <= 70) {
      return c - 55;
    // 'a' - 'f'
    } else if (c >= 97 && c <= 102) {
      return c - 87;
    // '0' - '9'
    } else {
      return (c - 48) & 0xf;
    }
  }

  function parseHexByte (string, lowerBound, index) {
    var r = parseHex4Bits(string, index);
    if (index - 1 >= lowerBound) {
      r |= parseHex4Bits(string, index - 1) << 4;
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start, endian) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    // 24-bits chunks
    var off = 0;
    var j = 0;

    var w;
    if (endian === 'be') {
      for (i = number.length - 1; i >= start; i -= 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;
        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    } else {
      var parseLength = number.length - start;
      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;
        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    }

    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    this.strip();
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is BN v4 instance
        r.strip();
      } else {
        // r is BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(typeof module === 'undefined' || module, this);

},{}],"vr1Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "logger/5.5.0";
exports.version = version;
},{}],"kMNH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = exports.ErrorCode = void 0;

var _version = require("./_version");

let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = {
  debug: 1,
  "default": 2,
  info: 2,
  warning: 3,
  error: 4,
  off: 5
};
let _logLevel = LogLevels["default"];
let _globalLogger = null;

function _checkNormalize() {
  try {
    const missing = []; // Make sure all forms of normalization are supported

    ["NFD", "NFC", "NFKD", "NFKC"].forEach(form => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }

        ;
      } catch (error) {
        missing.push(form);
      }
    });

    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }

    if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
      throw new Error("broken implementation");
    }
  } catch (error) {
    return error.message;
  }

  return null;
}

const _normalizeError = _checkNormalize();

var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel["DEBUG"] = "DEBUG";
  LogLevel["INFO"] = "INFO";
  LogLevel["WARNING"] = "WARNING";
  LogLevel["ERROR"] = "ERROR";
  LogLevel["OFF"] = "OFF";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

var ErrorCode;
exports.ErrorCode = ErrorCode;

(function (ErrorCode) {
  ///////////////////
  // Generic Errors
  // Unknown Error
  ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR"; // Not Implemented

  ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED"; // Unsupported Operation
  //   - operation

  ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION"; // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
  //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)

  ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR"; // Some sort of bad response from the server

  ErrorCode["SERVER_ERROR"] = "SERVER_ERROR"; // Timeout

  ErrorCode["TIMEOUT"] = "TIMEOUT"; ///////////////////
  // Operational  Errors
  // Buffer Overrun

  ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN"; // Numeric Fault
  //   - operation: the operation being executed
  //   - fault: the reason this faulted

  ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT"; ///////////////////
  // Argument Errors
  // Missing new operator to an object
  //  - name: The name of the class

  ErrorCode["MISSING_NEW"] = "MISSING_NEW"; // Invalid argument (e.g. value is incompatible with type) to a function:
  //   - argument: The argument name that was invalid
  //   - value: The value of the argument

  ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT"; // Missing argument to a function:
  //   - count: The number of arguments received
  //   - expectedCount: The number of arguments expected

  ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT"; // Too many arguments
  //   - count: The number of arguments received
  //   - expectedCount: The number of arguments expected

  ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT"; ///////////////////
  // Blockchain Errors
  // Call exception
  //  - transaction: the transaction
  //  - address?: the contract address
  //  - args?: The arguments passed into the function
  //  - method?: The Solidity method signature
  //  - errorSignature?: The EIP848 error signature
  //  - errorArgs?: The EIP848 error parameters
  //  - reason: The reason (only for EIP848 "Error(string)")

  ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION"; // Insufficient funds (< value + gasLimit * gasPrice)
  //   - transaction: the transaction attempted

  ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS"; // Nonce has already been used
  //   - transaction: the transaction attempted

  ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED"; // The replacement fee for the transaction is too low
  //   - transaction: the transaction attempted

  ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED"; // The gas limit could not be estimated
  //   - transaction: the transaction passed to estimateGas

  ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT"; // The transaction was replaced by one with a higher gas price
  //   - reason: "cancelled", "replaced" or "repriced"
  //   - cancelled: true if reason == "cancelled" or reason == "replaced")
  //   - hash: original transaction hash
  //   - replacement: the full TransactionsResponse for the replacement
  //   - receipt: the receipt of the replacement

  ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));

;
const HEX = "0123456789abcdef";

class Logger {
  constructor(version) {
    Object.defineProperty(this, "version", {
      enumerable: true,
      value: version,
      writable: false
    });
  }

  _log(logLevel, args) {
    const level = logLevel.toLowerCase();

    if (LogLevels[level] == null) {
      this.throwArgumentError("invalid log level name", "logLevel", logLevel);
    }

    if (_logLevel > LogLevels[level]) {
      return;
    }

    console.log.apply(console, args);
  }

  debug(...args) {
    this._log(Logger.levels.DEBUG, args);
  }

  info(...args) {
    this._log(Logger.levels.INFO, args);
  }

  warn(...args) {
    this._log(Logger.levels.WARNING, args);
  }

  makeError(message, code, params) {
    // Errors are being censored
    if (_censorErrors) {
      return this.makeError("censored error", code, {});
    }

    if (!code) {
      code = Logger.errors.UNKNOWN_ERROR;
    }

    if (!params) {
      params = {};
    }

    const messageDetails = [];
    Object.keys(params).forEach(key => {
      const value = params[key];

      try {
        if (value instanceof Uint8Array) {
          let hex = "";

          for (let i = 0; i < value.length; i++) {
            hex += HEX[value[i] >> 4];
            hex += HEX[value[i] & 0x0f];
          }

          messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
        } else {
          messageDetails.push(key + "=" + JSON.stringify(value));
        }
      } catch (error) {
        messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
      }
    });
    messageDetails.push(`code=${code}`);
    messageDetails.push(`version=${this.version}`);
    const reason = message;

    if (messageDetails.length) {
      message += " (" + messageDetails.join(", ") + ")";
    } // @TODO: Any??


    const error = new Error(message);
    error.reason = reason;
    error.code = code;
    Object.keys(params).forEach(function (key) {
      error[key] = params[key];
    });
    return error;
  }

  throwError(message, code, params) {
    throw this.makeError(message, code, params);
  }

  throwArgumentError(message, name, value) {
    return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
      argument: name,
      value: value
    });
  }

  assert(condition, message, code, params) {
    if (!!condition) {
      return;
    }

    this.throwError(message, code, params);
  }

  assertArgument(condition, message, name, value) {
    if (!!condition) {
      return;
    }

    this.throwArgumentError(message, name, value);
  }

  checkNormalize(message) {
    if (message == null) {
      message = "platform missing String.prototype.normalize";
    }

    if (_normalizeError) {
      this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "String.prototype.normalize",
        form: _normalizeError
      });
    }
  }

  checkSafeUint53(value, message) {
    if (typeof value !== "number") {
      return;
    }

    if (message == null) {
      message = "value not safe";
    }

    if (value < 0 || value >= 0x1fffffffffffff) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "out-of-safe-range",
        value: value
      });
    }

    if (value % 1) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "non-integer",
        value: value
      });
    }
  }

  checkArgumentCount(count, expectedCount, message) {
    if (message) {
      message = ": " + message;
    } else {
      message = "";
    }

    if (count < expectedCount) {
      this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
        count: count,
        expectedCount: expectedCount
      });
    }

    if (count > expectedCount) {
      this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
        count: count,
        expectedCount: expectedCount
      });
    }
  }

  checkNew(target, kind) {
    if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, {
        name: kind.name
      });
    }
  }

  checkAbstract(target, kind) {
    if (target === kind) {
      this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, {
        name: target.name,
        operation: "new"
      });
    } else if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, {
        name: kind.name
      });
    }
  }

  static globalLogger() {
    if (!_globalLogger) {
      _globalLogger = new Logger(_version.version);
    }

    return _globalLogger;
  }

  static setCensorship(censorship, permanent) {
    if (!censorship && permanent) {
      this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }

    if (_permanentCensorErrors) {
      if (!censorship) {
        return;
      }

      this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }

    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
  }

  static setLogLevel(logLevel) {
    const level = LogLevels[logLevel.toLowerCase()];

    if (level == null) {
      Logger.globalLogger().warn("invalid log level - " + logLevel);
      return;
    }

    _logLevel = level;
  }

  static from(version) {
    return new Logger(version);
  }

}

exports.Logger = Logger;
Logger.errors = ErrorCode;
Logger.levels = LogLevel;
},{"./_version":"vr1Q"}],"UmUA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "bytes/5.5.0";
exports.version = version;
},{}],"aqkS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayify = arrayify;
exports.concat = concat;
exports.hexConcat = hexConcat;
exports.hexDataLength = hexDataLength;
exports.hexDataSlice = hexDataSlice;
exports.hexStripZeros = hexStripZeros;
exports.hexValue = hexValue;
exports.hexZeroPad = hexZeroPad;
exports.hexlify = hexlify;
exports.isBytes = isBytes;
exports.isBytesLike = isBytesLike;
exports.isHexString = isHexString;
exports.joinSignature = joinSignature;
exports.splitSignature = splitSignature;
exports.stripZeros = stripZeros;
exports.zeroPad = zeroPad;

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version); ///////////////////////////////

function isHexable(value) {
  return !!value.toHexString;
}

function addSlice(array) {
  if (array.slice) {
    return array;
  }

  array.slice = function () {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };

  return array;
}

function isBytesLike(value) {
  return isHexString(value) && !(value.length % 2) || isBytes(value);
}

function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}

function isBytes(value) {
  if (value == null) {
    return false;
  }

  if (value.constructor === Uint8Array) {
    return true;
  }

  if (typeof value === "string") {
    return false;
  }

  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    const v = value[i];

    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }

  return true;
}

function arrayify(value, options) {
  if (!options) {
    options = {};
  }

  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid arrayify value");
    const result = [];

    while (value) {
      result.unshift(value & 0xff);
      value = parseInt(String(value / 256));
    }

    if (result.length === 0) {
      result.push(0);
    }

    return addSlice(new Uint8Array(result));
  }

  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }

  if (isHexable(value)) {
    value = value.toHexString();
  }

  if (isHexString(value)) {
    let hex = value.substring(2);

    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0x0" + hex.substring(2);
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }

    const result = [];

    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }

    return addSlice(new Uint8Array(result));
  }

  if (isBytes(value)) {
    return addSlice(new Uint8Array(value));
  }

  return logger.throwArgumentError("invalid arrayify value", "value", value);
}

function concat(items) {
  const objects = items.map(item => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return addSlice(result);
}

function stripZeros(value) {
  let result = arrayify(value);

  if (result.length === 0) {
    return result;
  } // Find the first non-zero entry


  let start = 0;

  while (start < result.length && result[start] === 0) {
    start++;
  } // If we started with zeros, strip them


  if (start) {
    result = result.slice(start);
  }

  return result;
}

function zeroPad(value, length) {
  value = arrayify(value);

  if (value.length > length) {
    logger.throwArgumentError("value out of range", "value", arguments[0]);
  }

  const result = new Uint8Array(length);
  result.set(value, length - value.length);
  return addSlice(result);
}

function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

const HexCharacters = "0123456789abcdef";

function hexlify(value, options) {
  if (!options) {
    options = {};
  }

  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";

    while (value) {
      hex = HexCharacters[value & 0xf] + hex;
      value = Math.floor(value / 16);
    }

    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }

      return "0x" + hex;
    }

    return "0x00";
  }

  if (typeof value === "bigint") {
    value = value.toString(16);

    if (value.length % 2) {
      return "0x0" + value;
    }

    return "0x" + value;
  }

  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }

  if (isHexable(value)) {
    return value.toHexString();
  }

  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }

    return value.toLowerCase();
  }

  if (isBytes(value)) {
    let result = "0x";

    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
    }

    return result;
  }

  return logger.throwArgumentError("invalid hexlify value", "value", value);
}
/*
function unoddify(value: BytesLike | Hexable | number): BytesLike | Hexable | number {
    if (typeof(value) === "string" && value.length % 2 && value.substring(0, 2) === "0x") {
        return "0x0" + value.substring(2);
    }
    return value;
}
*/


function hexDataLength(data) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    return null;
  }

  return (data.length - 2) / 2;
}

function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError("invalid hexData", "value", data);
  }

  offset = 2 + 2 * offset;

  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }

  return "0x" + data.substring(offset);
}

function hexConcat(items) {
  let result = "0x";
  items.forEach(item => {
    result += hexlify(item).substring(2);
  });
  return result;
}

function hexValue(value) {
  const trimmed = hexStripZeros(hexlify(value, {
    hexPad: "left"
  }));

  if (trimmed === "0x") {
    return "0x0";
  }

  return trimmed;
}

function hexStripZeros(value) {
  if (typeof value !== "string") {
    value = hexlify(value);
  }

  if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }

  value = value.substring(2);
  let offset = 0;

  while (offset < value.length && value[offset] === "0") {
    offset++;
  }

  return "0x" + value.substring(offset);
}

function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }

  if (value.length > 2 * length + 2) {
    logger.throwArgumentError("value out of range", "value", arguments[1]);
  }

  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }

  return value;
}

function splitSignature(signature) {
  const result = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0
  };

  if (isBytesLike(signature)) {
    const bytes = arrayify(signature);

    if (bytes.length !== 65) {
      logger.throwArgumentError("invalid signature string; must be 65 bytes", "signature", signature);
    } // Get the r, s and v


    result.r = hexlify(bytes.slice(0, 32));
    result.s = hexlify(bytes.slice(32, 64));
    result.v = bytes[64]; // Allow a recid to be used as the v

    if (result.v < 27) {
      if (result.v === 0 || result.v === 1) {
        result.v += 27;
      } else {
        logger.throwArgumentError("signature invalid v byte", "signature", signature);
      }
    } // Compute recoveryParam from v


    result.recoveryParam = 1 - result.v % 2; // Compute _vs from recoveryParam and s

    if (result.recoveryParam) {
      bytes[32] |= 0x80;
    }

    result._vs = hexlify(bytes.slice(32, 64));
  } else {
    result.r = signature.r;
    result.s = signature.s;
    result.v = signature.v;
    result.recoveryParam = signature.recoveryParam;
    result._vs = signature._vs; // If the _vs is available, use it to populate missing s, v and recoveryParam
    // and verify non-missing s, v and recoveryParam

    if (result._vs != null) {
      const vs = zeroPad(arrayify(result._vs), 32);
      result._vs = hexlify(vs); // Set or check the recid

      const recoveryParam = vs[0] >= 128 ? 1 : 0;

      if (result.recoveryParam == null) {
        result.recoveryParam = recoveryParam;
      } else if (result.recoveryParam !== recoveryParam) {
        logger.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature);
      } // Set or check the s


      vs[0] &= 0x7f;
      const s = hexlify(vs);

      if (result.s == null) {
        result.s = s;
      } else if (result.s !== s) {
        logger.throwArgumentError("signature v mismatch _vs", "signature", signature);
      }
    } // Use recid and v to populate each other


    if (result.recoveryParam == null) {
      if (result.v == null) {
        logger.throwArgumentError("signature missing v and recoveryParam", "signature", signature);
      } else if (result.v === 0 || result.v === 1) {
        result.recoveryParam = result.v;
      } else {
        result.recoveryParam = 1 - result.v % 2;
      }
    } else {
      if (result.v == null) {
        result.v = 27 + result.recoveryParam;
      } else {
        const recId = result.v === 0 || result.v === 1 ? result.v : 1 - result.v % 2;

        if (result.recoveryParam !== recId) {
          logger.throwArgumentError("signature recoveryParam mismatch v", "signature", signature);
        }
      }
    }

    if (result.r == null || !isHexString(result.r)) {
      logger.throwArgumentError("signature missing or invalid r", "signature", signature);
    } else {
      result.r = hexZeroPad(result.r, 32);
    }

    if (result.s == null || !isHexString(result.s)) {
      logger.throwArgumentError("signature missing or invalid s", "signature", signature);
    } else {
      result.s = hexZeroPad(result.s, 32);
    }

    const vs = arrayify(result.s);

    if (vs[0] >= 128) {
      logger.throwArgumentError("signature s out of range", "signature", signature);
    }

    if (result.recoveryParam) {
      vs[0] |= 0x80;
    }

    const _vs = hexlify(vs);

    if (result._vs) {
      if (!isHexString(result._vs)) {
        logger.throwArgumentError("signature invalid _vs", "signature", signature);
      }

      result._vs = hexZeroPad(result._vs, 32);
    } // Set or check the _vs


    if (result._vs == null) {
      result._vs = _vs;
    } else if (result._vs !== _vs) {
      logger.throwArgumentError("signature _vs mismatch v and s", "signature", signature);
    }
  }

  return result;
}

function joinSignature(signature) {
  signature = splitSignature(signature);
  return hexlify(concat([signature.r, signature.s, signature.recoveryParam ? "0x1c" : "0x1b"]));
}
},{"@ethersproject/logger":"kMNH","./_version":"UmUA"}],"rTeW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "bignumber/5.5.0";
exports.version = version;
},{}],"RA51":[function(require,module,exports) {
"use strict";
/**
 *  BigNumber
 *
 *  A wrapper around the BN.js object. We use the BN.js library
 *  because it is used by elliptic, so it is required regardless.
 *
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigNumber = void 0;
exports._base16To36 = _base16To36;
exports._base36To16 = _base36To16;
exports.isBigNumberish = isBigNumberish;

var _bn = _interopRequireDefault(require("bn.js"));

var _bytes = require("@ethersproject/bytes");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BN = _bn.default.BN;
const logger = new _logger.Logger(_version.version);
const _constructorGuard = {};
const MAX_SAFE = 0x1fffffffffffff;

function isBigNumberish(value) {
  return value != null && (BigNumber.isBigNumber(value) || typeof value === "number" && value % 1 === 0 || typeof value === "string" && !!value.match(/^-?[0-9]+$/) || (0, _bytes.isHexString)(value) || typeof value === "bigint" || (0, _bytes.isBytes)(value));
} // Only warn about passing 10 into radix once


let _warnedToStringRadix = false;

class BigNumber {
  constructor(constructorGuard, hex) {
    logger.checkNew(new.target, BigNumber);

    if (constructorGuard !== _constructorGuard) {
      logger.throwError("cannot call constructor directly; use BigNumber.from", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new (BigNumber)"
      });
    }

    this._hex = hex;
    this._isBigNumber = true;
    Object.freeze(this);
  }

  fromTwos(value) {
    return toBigNumber(toBN(this).fromTwos(value));
  }

  toTwos(value) {
    return toBigNumber(toBN(this).toTwos(value));
  }

  abs() {
    if (this._hex[0] === "-") {
      return BigNumber.from(this._hex.substring(1));
    }

    return this;
  }

  add(other) {
    return toBigNumber(toBN(this).add(toBN(other)));
  }

  sub(other) {
    return toBigNumber(toBN(this).sub(toBN(other)));
  }

  div(other) {
    const o = BigNumber.from(other);

    if (o.isZero()) {
      throwFault("division by zero", "div");
    }

    return toBigNumber(toBN(this).div(toBN(other)));
  }

  mul(other) {
    return toBigNumber(toBN(this).mul(toBN(other)));
  }

  mod(other) {
    const value = toBN(other);

    if (value.isNeg()) {
      throwFault("cannot modulo negative values", "mod");
    }

    return toBigNumber(toBN(this).umod(value));
  }

  pow(other) {
    const value = toBN(other);

    if (value.isNeg()) {
      throwFault("cannot raise to negative values", "pow");
    }

    return toBigNumber(toBN(this).pow(value));
  }

  and(other) {
    const value = toBN(other);

    if (this.isNegative() || value.isNeg()) {
      throwFault("cannot 'and' negative values", "and");
    }

    return toBigNumber(toBN(this).and(value));
  }

  or(other) {
    const value = toBN(other);

    if (this.isNegative() || value.isNeg()) {
      throwFault("cannot 'or' negative values", "or");
    }

    return toBigNumber(toBN(this).or(value));
  }

  xor(other) {
    const value = toBN(other);

    if (this.isNegative() || value.isNeg()) {
      throwFault("cannot 'xor' negative values", "xor");
    }

    return toBigNumber(toBN(this).xor(value));
  }

  mask(value) {
    if (this.isNegative() || value < 0) {
      throwFault("cannot mask negative values", "mask");
    }

    return toBigNumber(toBN(this).maskn(value));
  }

  shl(value) {
    if (this.isNegative() || value < 0) {
      throwFault("cannot shift negative values", "shl");
    }

    return toBigNumber(toBN(this).shln(value));
  }

  shr(value) {
    if (this.isNegative() || value < 0) {
      throwFault("cannot shift negative values", "shr");
    }

    return toBigNumber(toBN(this).shrn(value));
  }

  eq(other) {
    return toBN(this).eq(toBN(other));
  }

  lt(other) {
    return toBN(this).lt(toBN(other));
  }

  lte(other) {
    return toBN(this).lte(toBN(other));
  }

  gt(other) {
    return toBN(this).gt(toBN(other));
  }

  gte(other) {
    return toBN(this).gte(toBN(other));
  }

  isNegative() {
    return this._hex[0] === "-";
  }

  isZero() {
    return toBN(this).isZero();
  }

  toNumber() {
    try {
      return toBN(this).toNumber();
    } catch (error) {
      throwFault("overflow", "toNumber", this.toString());
    }

    return null;
  }

  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch (e) {}

    return logger.throwError("this platform does not support BigInt", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }

  toString() {
    // Lots of people expect this, which we do not support, so check (See: #889)
    if (arguments.length > 0) {
      if (arguments[0] === 10) {
        if (!_warnedToStringRadix) {
          _warnedToStringRadix = true;
          logger.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
        }
      } else if (arguments[0] === 16) {
        logger.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", _logger.Logger.errors.UNEXPECTED_ARGUMENT, {});
      } else {
        logger.throwError("BigNumber.toString does not accept parameters", _logger.Logger.errors.UNEXPECTED_ARGUMENT, {});
      }
    }

    return toBN(this).toString(10);
  }

  toHexString() {
    return this._hex;
  }

  toJSON(key) {
    return {
      type: "BigNumber",
      hex: this.toHexString()
    };
  }

  static from(value) {
    if (value instanceof BigNumber) {
      return value;
    }

    if (typeof value === "string") {
      if (value.match(/^-?0x[0-9a-f]+$/i)) {
        return new BigNumber(_constructorGuard, toHex(value));
      }

      if (value.match(/^-?[0-9]+$/)) {
        return new BigNumber(_constructorGuard, toHex(new BN(value)));
      }

      return logger.throwArgumentError("invalid BigNumber string", "value", value);
    }

    if (typeof value === "number") {
      if (value % 1) {
        throwFault("underflow", "BigNumber.from", value);
      }

      if (value >= MAX_SAFE || value <= -MAX_SAFE) {
        throwFault("overflow", "BigNumber.from", value);
      }

      return BigNumber.from(String(value));
    }

    const anyValue = value;

    if (typeof anyValue === "bigint") {
      return BigNumber.from(anyValue.toString());
    }

    if ((0, _bytes.isBytes)(anyValue)) {
      return BigNumber.from((0, _bytes.hexlify)(anyValue));
    }

    if (anyValue) {
      // Hexable interface (takes priority)
      if (anyValue.toHexString) {
        const hex = anyValue.toHexString();

        if (typeof hex === "string") {
          return BigNumber.from(hex);
        }
      } else {
        // For now, handle legacy JSON-ified values (goes away in v6)
        let hex = anyValue._hex; // New-form JSON

        if (hex == null && anyValue.type === "BigNumber") {
          hex = anyValue.hex;
        }

        if (typeof hex === "string") {
          if ((0, _bytes.isHexString)(hex) || hex[0] === "-" && (0, _bytes.isHexString)(hex.substring(1))) {
            return BigNumber.from(hex);
          }
        }
      }
    }

    return logger.throwArgumentError("invalid BigNumber value", "value", value);
  }

  static isBigNumber(value) {
    return !!(value && value._isBigNumber);
  }

} // Normalize the hex string


exports.BigNumber = BigNumber;

function toHex(value) {
  // For BN, call on the hex string
  if (typeof value !== "string") {
    return toHex(value.toString(16));
  } // If negative, prepend the negative sign to the normalized positive value


  if (value[0] === "-") {
    // Strip off the negative sign
    value = value.substring(1); // Cannot have multiple negative signs (e.g. "--0x04")

    if (value[0] === "-") {
      logger.throwArgumentError("invalid hex", "value", value);
    } // Call toHex on the positive component


    value = toHex(value); // Do not allow "-0x00"

    if (value === "0x00") {
      return value;
    } // Negate the value


    return "-" + value;
  } // Add a "0x" prefix if missing


  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  } // Normalize zero


  if (value === "0x") {
    return "0x00";
  } // Make the string even length


  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  } // Trim to smallest even-length string


  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }

  return value;
}

function toBigNumber(value) {
  return BigNumber.from(toHex(value));
}

function toBN(value) {
  const hex = BigNumber.from(value).toHexString();

  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }

  return new BN(hex.substring(2), 16);
}

function throwFault(fault, operation, value) {
  const params = {
    fault: fault,
    operation: operation
  };

  if (value != null) {
    params.value = value;
  }

  return logger.throwError(fault, _logger.Logger.errors.NUMERIC_FAULT, params);
} // value should have no prefix


function _base36To16(value) {
  return new BN(value, 36).toString(16);
} // value should have no prefix


function _base16To36(value) {
  return new BN(value, 16).toString(36);
}
},{"bn.js":"o7RX","@ethersproject/bytes":"aqkS","@ethersproject/logger":"kMNH","./_version":"rTeW"}],"h7bg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedNumber = exports.FixedFormat = void 0;
exports.formatFixed = formatFixed;
exports.parseFixed = parseFixed;

var _bytes = require("@ethersproject/bytes");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _bignumber = require("./bignumber");

const logger = new _logger.Logger(_version.version);
const _constructorGuard = {};

const Zero = _bignumber.BigNumber.from(0);

const NegativeOne = _bignumber.BigNumber.from(-1);

function throwFault(message, fault, operation, value) {
  const params = {
    fault: fault,
    operation: operation
  };

  if (value !== undefined) {
    params.value = value;
  }

  return logger.throwError(message, _logger.Logger.errors.NUMERIC_FAULT, params);
} // Constant to pull zeros from for multipliers


let zeros = "0";

while (zeros.length < 256) {
  zeros += zeros;
} // Returns a string "1" followed by decimal "0"s


function getMultiplier(decimals) {
  if (typeof decimals !== "number") {
    try {
      decimals = _bignumber.BigNumber.from(decimals).toNumber();
    } catch (e) {}
  }

  if (typeof decimals === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
    return "1" + zeros.substring(0, decimals);
  }

  return logger.throwArgumentError("invalid decimal size", "decimals", decimals);
}

function formatFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }

  const multiplier = getMultiplier(decimals); // Make sure wei is a big number (convert as necessary)

  value = _bignumber.BigNumber.from(value);
  const negative = value.lt(Zero);

  if (negative) {
    value = value.mul(NegativeOne);
  }

  let fraction = value.mod(multiplier).toString();

  while (fraction.length < multiplier.length - 1) {
    fraction = "0" + fraction;
  } // Strip training 0


  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const whole = value.div(multiplier).toString();

  if (multiplier.length === 1) {
    value = whole;
  } else {
    value = whole + "." + fraction;
  }

  if (negative) {
    value = "-" + value;
  }

  return value;
}

function parseFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }

  const multiplier = getMultiplier(decimals);

  if (typeof value !== "string" || !value.match(/^-?[0-9.]+$/)) {
    logger.throwArgumentError("invalid decimal value", "value", value);
  } // Is it negative?


  const negative = value.substring(0, 1) === "-";

  if (negative) {
    value = value.substring(1);
  }

  if (value === ".") {
    logger.throwArgumentError("missing value", "value", value);
  } // Split it into a whole and fractional part


  const comps = value.split(".");

  if (comps.length > 2) {
    logger.throwArgumentError("too many decimal points", "value", value);
  }

  let whole = comps[0],
      fraction = comps[1];

  if (!whole) {
    whole = "0";
  }

  if (!fraction) {
    fraction = "0";
  } // Trim trailing zeros


  while (fraction[fraction.length - 1] === "0") {
    fraction = fraction.substring(0, fraction.length - 1);
  } // Check the fraction doesn't exceed our decimals size


  if (fraction.length > multiplier.length - 1) {
    throwFault("fractional component exceeds decimals", "underflow", "parseFixed");
  } // If decimals is 0, we have an empty string for fraction


  if (fraction === "") {
    fraction = "0";
  } // Fully pad the string with zeros to get to wei


  while (fraction.length < multiplier.length - 1) {
    fraction += "0";
  }

  const wholeValue = _bignumber.BigNumber.from(whole);

  const fractionValue = _bignumber.BigNumber.from(fraction);

  let wei = wholeValue.mul(multiplier).add(fractionValue);

  if (negative) {
    wei = wei.mul(NegativeOne);
  }

  return wei;
}

class FixedFormat {
  constructor(constructorGuard, signed, width, decimals) {
    if (constructorGuard !== _constructorGuard) {
      logger.throwError("cannot use FixedFormat constructor; use FixedFormat.from", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new FixedFormat"
      });
    }

    this.signed = signed;
    this.width = width;
    this.decimals = decimals;
    this.name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
    this._multiplier = getMultiplier(decimals);
    Object.freeze(this);
  }

  static from(value) {
    if (value instanceof FixedFormat) {
      return value;
    }

    if (typeof value === "number") {
      value = `fixed128x${value}`;
    }

    let signed = true;
    let width = 128;
    let decimals = 18;

    if (typeof value === "string") {
      if (value === "fixed") {// defaults...
      } else if (value === "ufixed") {
        signed = false;
      } else {
        const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);

        if (!match) {
          logger.throwArgumentError("invalid fixed format", "format", value);
        }

        signed = match[1] !== "u";
        width = parseInt(match[2]);
        decimals = parseInt(match[3]);
      }
    } else if (value) {
      const check = (key, type, defaultValue) => {
        if (value[key] == null) {
          return defaultValue;
        }

        if (typeof value[key] !== type) {
          logger.throwArgumentError("invalid fixed format (" + key + " not " + type + ")", "format." + key, value[key]);
        }

        return value[key];
      };

      signed = check("signed", "boolean", signed);
      width = check("width", "number", width);
      decimals = check("decimals", "number", decimals);
    }

    if (width % 8) {
      logger.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", width);
    }

    if (decimals > 80) {
      logger.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", decimals);
    }

    return new FixedFormat(_constructorGuard, signed, width, decimals);
  }

}

exports.FixedFormat = FixedFormat;

class FixedNumber {
  constructor(constructorGuard, hex, value, format) {
    logger.checkNew(new.target, FixedNumber);

    if (constructorGuard !== _constructorGuard) {
      logger.throwError("cannot use FixedNumber constructor; use FixedNumber.from", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new FixedFormat"
      });
    }

    this.format = format;
    this._hex = hex;
    this._value = value;
    this._isFixedNumber = true;
    Object.freeze(this);
  }

  _checkFormat(other) {
    if (this.format.name !== other.format.name) {
      logger.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", other);
    }
  }

  addUnsafe(other) {
    this._checkFormat(other);

    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.add(b), this.format.decimals, this.format);
  }

  subUnsafe(other) {
    this._checkFormat(other);

    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.sub(b), this.format.decimals, this.format);
  }

  mulUnsafe(other) {
    this._checkFormat(other);

    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.mul(b).div(this.format._multiplier), this.format.decimals, this.format);
  }

  divUnsafe(other) {
    this._checkFormat(other);

    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.mul(this.format._multiplier).div(b), this.format.decimals, this.format);
  }

  floor() {
    const comps = this.toString().split(".");

    if (comps.length === 1) {
      comps.push("0");
    }

    let result = FixedNumber.from(comps[0], this.format);
    const hasFraction = !comps[1].match(/^(0*)$/);

    if (this.isNegative() && hasFraction) {
      result = result.subUnsafe(ONE.toFormat(result.format));
    }

    return result;
  }

  ceiling() {
    const comps = this.toString().split(".");

    if (comps.length === 1) {
      comps.push("0");
    }

    let result = FixedNumber.from(comps[0], this.format);
    const hasFraction = !comps[1].match(/^(0*)$/);

    if (!this.isNegative() && hasFraction) {
      result = result.addUnsafe(ONE.toFormat(result.format));
    }

    return result;
  } // @TODO: Support other rounding algorithms


  round(decimals) {
    if (decimals == null) {
      decimals = 0;
    } // If we are already in range, we're done


    const comps = this.toString().split(".");

    if (comps.length === 1) {
      comps.push("0");
    }

    if (decimals < 0 || decimals > 80 || decimals % 1) {
      logger.throwArgumentError("invalid decimal count", "decimals", decimals);
    }

    if (comps[1].length <= decimals) {
      return this;
    }

    const factor = FixedNumber.from("1" + zeros.substring(0, decimals), this.format);
    const bump = BUMP.toFormat(this.format);
    return this.mulUnsafe(factor).addUnsafe(bump).floor().divUnsafe(factor);
  }

  isZero() {
    return this._value === "0.0" || this._value === "0";
  }

  isNegative() {
    return this._value[0] === "-";
  }

  toString() {
    return this._value;
  }

  toHexString(width) {
    if (width == null) {
      return this._hex;
    }

    if (width % 8) {
      logger.throwArgumentError("invalid byte width", "width", width);
    }

    const hex = _bignumber.BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(width).toHexString();

    return (0, _bytes.hexZeroPad)(hex, width / 8);
  }

  toUnsafeFloat() {
    return parseFloat(this.toString());
  }

  toFormat(format) {
    return FixedNumber.fromString(this._value, format);
  }

  static fromValue(value, decimals, format) {
    // If decimals looks more like a format, and there is no format, shift the parameters
    if (format == null && decimals != null && !(0, _bignumber.isBigNumberish)(decimals)) {
      format = decimals;
      decimals = null;
    }

    if (decimals == null) {
      decimals = 0;
    }

    if (format == null) {
      format = "fixed";
    }

    return FixedNumber.fromString(formatFixed(value, decimals), FixedFormat.from(format));
  }

  static fromString(value, format) {
    if (format == null) {
      format = "fixed";
    }

    const fixedFormat = FixedFormat.from(format);
    const numeric = parseFixed(value, fixedFormat.decimals);

    if (!fixedFormat.signed && numeric.lt(Zero)) {
      throwFault("unsigned value cannot be negative", "overflow", "value", value);
    }

    let hex = null;

    if (fixedFormat.signed) {
      hex = numeric.toTwos(fixedFormat.width).toHexString();
    } else {
      hex = numeric.toHexString();
      hex = (0, _bytes.hexZeroPad)(hex, fixedFormat.width / 8);
    }

    const decimal = formatFixed(numeric, fixedFormat.decimals);
    return new FixedNumber(_constructorGuard, hex, decimal, fixedFormat);
  }

  static fromBytes(value, format) {
    if (format == null) {
      format = "fixed";
    }

    const fixedFormat = FixedFormat.from(format);

    if ((0, _bytes.arrayify)(value).length > fixedFormat.width / 8) {
      throw new Error("overflow");
    }

    let numeric = _bignumber.BigNumber.from(value);

    if (fixedFormat.signed) {
      numeric = numeric.fromTwos(fixedFormat.width);
    }

    const hex = numeric.toTwos((fixedFormat.signed ? 0 : 1) + fixedFormat.width).toHexString();
    const decimal = formatFixed(numeric, fixedFormat.decimals);
    return new FixedNumber(_constructorGuard, hex, decimal, fixedFormat);
  }

  static from(value, format) {
    if (typeof value === "string") {
      return FixedNumber.fromString(value, format);
    }

    if ((0, _bytes.isBytes)(value)) {
      return FixedNumber.fromBytes(value, format);
    }

    try {
      return FixedNumber.fromValue(value, 0, format);
    } catch (error) {
      // Allow NUMERIC_FAULT to bubble up
      if (error.code !== _logger.Logger.errors.INVALID_ARGUMENT) {
        throw error;
      }
    }

    return logger.throwArgumentError("invalid FixedNumber value", "value", value);
  }

  static isFixedNumber(value) {
    return !!(value && value._isFixedNumber);
  }

}

exports.FixedNumber = FixedNumber;
const ONE = FixedNumber.from(1);
const BUMP = FixedNumber.from("0.5");
},{"@ethersproject/bytes":"aqkS","@ethersproject/logger":"kMNH","./_version":"rTeW","./bignumber":"RA51"}],"efJK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BigNumber", {
  enumerable: true,
  get: function () {
    return _bignumber.BigNumber;
  }
});
Object.defineProperty(exports, "FixedFormat", {
  enumerable: true,
  get: function () {
    return _fixednumber.FixedFormat;
  }
});
Object.defineProperty(exports, "FixedNumber", {
  enumerable: true,
  get: function () {
    return _fixednumber.FixedNumber;
  }
});
Object.defineProperty(exports, "_base16To36", {
  enumerable: true,
  get: function () {
    return _bignumber._base16To36;
  }
});
Object.defineProperty(exports, "_base36To16", {
  enumerable: true,
  get: function () {
    return _bignumber._base36To16;
  }
});
Object.defineProperty(exports, "formatFixed", {
  enumerable: true,
  get: function () {
    return _fixednumber.formatFixed;
  }
});
Object.defineProperty(exports, "parseFixed", {
  enumerable: true,
  get: function () {
    return _fixednumber.parseFixed;
  }
});

var _bignumber = require("./bignumber");

var _fixednumber = require("./fixednumber");
},{"./bignumber":"RA51","./fixednumber":"h7bg"}],"qIal":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "properties/5.5.0";
exports.version = version;
},{}],"JuuX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;
exports.checkProperties = checkProperties;
exports.deepCopy = deepCopy;
exports.defineReadOnly = defineReadOnly;
exports.getStatic = getStatic;
exports.resolveProperties = resolveProperties;
exports.shallowCopy = shallowCopy;

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

function defineReadOnly(object, name, value) {
  Object.defineProperty(object, name, {
    enumerable: true,
    value: value,
    writable: false
  });
} // Crawl up the constructor chain to find a static method


function getStatic(ctor, key) {
  for (let i = 0; i < 32; i++) {
    if (ctor[key]) {
      return ctor[key];
    }

    if (!ctor.prototype || typeof ctor.prototype !== "object") {
      break;
    }

    ctor = Object.getPrototypeOf(ctor.prototype).constructor;
  }

  return null;
}

function resolveProperties(object) {
  return __awaiter(this, void 0, void 0, function* () {
    const promises = Object.keys(object).map(key => {
      const value = object[key];
      return Promise.resolve(value).then(v => ({
        key: key,
        value: v
      }));
    });
    const results = yield Promise.all(promises);
    return results.reduce((accum, result) => {
      accum[result.key] = result.value;
      return accum;
    }, {});
  });
}

function checkProperties(object, properties) {
  if (!object || typeof object !== "object") {
    logger.throwArgumentError("invalid object", "object", object);
  }

  Object.keys(object).forEach(key => {
    if (!properties[key]) {
      logger.throwArgumentError("invalid object key - " + key, "transaction:" + key, object);
    }
  });
}

function shallowCopy(object) {
  const result = {};

  for (const key in object) {
    result[key] = object[key];
  }

  return result;
}

const opaque = {
  bigint: true,
  boolean: true,
  "function": true,
  number: true,
  string: true
};

function _isFrozen(object) {
  // Opaque objects are not mutable, so safe to copy by assignment
  if (object === undefined || object === null || opaque[typeof object]) {
    return true;
  }

  if (Array.isArray(object) || typeof object === "object") {
    if (!Object.isFrozen(object)) {
      return false;
    }

    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
      let value = null;

      try {
        value = object[keys[i]];
      } catch (error) {
        // If accessing a value triggers an error, it is a getter
        // designed to do so (e.g. Result) and is therefore "frozen"
        continue;
      }

      if (!_isFrozen(value)) {
        return false;
      }
    }

    return true;
  }

  return logger.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
} // Returns a new copy of object, such that no properties may be replaced.
// New properties may be added only to objects.


function _deepCopy(object) {
  if (_isFrozen(object)) {
    return object;
  } // Arrays are mutable, so we need to create a copy


  if (Array.isArray(object)) {
    return Object.freeze(object.map(item => deepCopy(item)));
  }

  if (typeof object === "object") {
    const result = {};

    for (const key in object) {
      const value = object[key];

      if (value === undefined) {
        continue;
      }

      defineReadOnly(result, key, deepCopy(value));
    }

    return result;
  }

  return logger.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}

function deepCopy(object) {
  return _deepCopy(object);
}

class Description {
  constructor(info) {
    for (const key in info) {
      this[key] = deepCopy(info[key]);
    }
  }

}

exports.Description = Description;
},{"@ethersproject/logger":"kMNH","./_version":"qIal"}],"KSRV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "abi/5.5.0";
exports.version = version;
},{}],"togt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParamType = exports.FunctionFragment = exports.Fragment = exports.FormatTypes = exports.EventFragment = exports.ErrorFragment = exports.ConstructorFragment = void 0;

var _bignumber = require("@ethersproject/bignumber");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);
;
const _constructorGuard = {};
let ModifiersBytes = {
  calldata: true,
  memory: true,
  storage: true
};
let ModifiersNest = {
  calldata: true,
  memory: true
};

function checkModifier(type, name) {
  if (type === "bytes" || type === "string") {
    if (ModifiersBytes[name]) {
      return true;
    }
  } else if (type === "address") {
    if (name === "payable") {
      return true;
    }
  } else if (type.indexOf("[") >= 0 || type === "tuple") {
    if (ModifiersNest[name]) {
      return true;
    }
  }

  if (ModifiersBytes[name] || name === "payable") {
    logger.throwArgumentError("invalid modifier", "name", name);
  }

  return false;
} // @TODO: Make sure that children of an indexed tuple are marked with a null indexed


function parseParamType(param, allowIndexed) {
  let originalParam = param;

  function throwError(i) {
    logger.throwArgumentError(`unexpected character at position ${i}`, "param", param);
  }

  param = param.replace(/\s/g, " ");

  function newNode(parent) {
    let node = {
      type: "",
      name: "",
      parent: parent,
      state: {
        allowType: true
      }
    };

    if (allowIndexed) {
      node.indexed = false;
    }

    return node;
  }

  let parent = {
    type: "",
    name: "",
    state: {
      allowType: true
    }
  };
  let node = parent;

  for (let i = 0; i < param.length; i++) {
    let c = param[i];

    switch (c) {
      case "(":
        if (node.state.allowType && node.type === "") {
          node.type = "tuple";
        } else if (!node.state.allowParams) {
          throwError(i);
        }

        node.state.allowType = false;
        node.type = verifyType(node.type);
        node.components = [newNode(node)];
        node = node.components[0];
        break;

      case ")":
        delete node.state;

        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }

          node.indexed = true;
          node.name = "";
        }

        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }

        node.type = verifyType(node.type);
        let child = node;
        node = node.parent;

        if (!node) {
          throwError(i);
        }

        delete child.parent;
        node.state.allowParams = false;
        node.state.allowName = true;
        node.state.allowArray = true;
        break;

      case ",":
        delete node.state;

        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }

          node.indexed = true;
          node.name = "";
        }

        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }

        node.type = verifyType(node.type);
        let sibling = newNode(node.parent); //{ type: "", name: "", parent: node.parent, state: { allowType: true } };

        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;
      // Hit a space...

      case " ":
        // If reading type, the type is done and may read a param or name
        if (node.state.allowType) {
          if (node.type !== "") {
            node.type = verifyType(node.type);
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        } // If reading name, the name is done


        if (node.state.allowName) {
          if (node.name !== "") {
            if (node.name === "indexed") {
              if (!allowIndexed) {
                throwError(i);
              }

              if (node.indexed) {
                throwError(i);
              }

              node.indexed = true;
              node.name = "";
            } else if (checkModifier(node.type, node.name)) {
              node.name = "";
            } else {
              node.state.allowName = false;
            }
          }
        }

        break;

      case "[":
        if (!node.state.allowArray) {
          throwError(i);
        }

        node.type += c;
        node.state.allowArray = false;
        node.state.allowName = false;
        node.state.readArray = true;
        break;

      case "]":
        if (!node.state.readArray) {
          throwError(i);
        }

        node.type += c;
        node.state.readArray = false;
        node.state.allowArray = true;
        node.state.allowName = true;
        break;

      default:
        if (node.state.allowType) {
          node.type += c;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state.allowName) {
          node.name += c;
          delete node.state.allowArray;
        } else if (node.state.readArray) {
          node.type += c;
        } else {
          throwError(i);
        }

    }
  }

  if (node.parent) {
    logger.throwArgumentError("unexpected eof", "param", param);
  }

  delete parent.state;

  if (node.name === "indexed") {
    if (!allowIndexed) {
      throwError(originalParam.length - 7);
    }

    if (node.indexed) {
      throwError(originalParam.length - 7);
    }

    node.indexed = true;
    node.name = "";
  } else if (checkModifier(node.type, node.name)) {
    node.name = "";
  }

  parent.type = verifyType(parent.type);
  return parent;
}

function populate(object, params) {
  for (let key in params) {
    (0, _properties.defineReadOnly)(object, key, params[key]);
  }
}

const FormatTypes = Object.freeze({
  // Bare formatting, as is needed for computing a sighash of an event or function
  sighash: "sighash",
  // Human-Readable with Minimal spacing and without names (compact human-readable)
  minimal: "minimal",
  // Human-Readable with nice spacing, including all names
  full: "full",
  // JSON-format a la Solidity
  json: "json"
});
exports.FormatTypes = FormatTypes;
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);

class ParamType {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard) {
      logger.throwError("use fromString", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new ParamType()"
      });
    }

    populate(this, params);
    let match = this.type.match(paramTypeArray);

    if (match) {
      populate(this, {
        arrayLength: parseInt(match[2] || "-1"),
        arrayChildren: ParamType.fromObject({
          type: match[1],
          components: this.components
        }),
        baseType: "array"
      });
    } else {
      populate(this, {
        arrayLength: null,
        arrayChildren: null,
        baseType: this.components != null ? "tuple" : this.type
      });
    }

    this._isParamType = true;
    Object.freeze(this);
  } // Format the parameter fragment
  //   - sighash: "(uint256,address)"
  //   - minimal: "tuple(uint256,address) indexed"
  //   - full:    "tuple(uint256 foo, address bar) indexed baz"


  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }

    if (!FormatTypes[format]) {
      logger.throwArgumentError("invalid format type", "format", format);
    }

    if (format === FormatTypes.json) {
      let result = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: this.name || undefined
      };

      if (typeof this.indexed === "boolean") {
        result.indexed = this.indexed;
      }

      if (this.components) {
        result.components = this.components.map(comp => JSON.parse(comp.format(format)));
      }

      return JSON.stringify(result);
    }

    let result = ""; // Array

    if (this.baseType === "array") {
      result += this.arrayChildren.format(format);
      result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
    } else {
      if (this.baseType === "tuple") {
        if (format !== FormatTypes.sighash) {
          result += this.type;
        }

        result += "(" + this.components.map(comp => comp.format(format)).join(format === FormatTypes.full ? ", " : ",") + ")";
      } else {
        result += this.type;
      }
    }

    if (format !== FormatTypes.sighash) {
      if (this.indexed === true) {
        result += " indexed";
      }

      if (format === FormatTypes.full && this.name) {
        result += " " + this.name;
      }
    }

    return result;
  }

  static from(value, allowIndexed) {
    if (typeof value === "string") {
      return ParamType.fromString(value, allowIndexed);
    }

    return ParamType.fromObject(value);
  }

  static fromObject(value) {
    if (ParamType.isParamType(value)) {
      return value;
    }

    return new ParamType(_constructorGuard, {
      name: value.name || null,
      type: verifyType(value.type),
      indexed: value.indexed == null ? null : !!value.indexed,
      components: value.components ? value.components.map(ParamType.fromObject) : null
    });
  }

  static fromString(value, allowIndexed) {
    function ParamTypify(node) {
      return ParamType.fromObject({
        name: node.name,
        type: node.type,
        indexed: node.indexed,
        components: node.components
      });
    }

    return ParamTypify(parseParamType(value, !!allowIndexed));
  }

  static isParamType(value) {
    return !!(value != null && value._isParamType);
  }

}

exports.ParamType = ParamType;
;

function parseParams(value, allowIndex) {
  return splitNesting(value).map(param => ParamType.fromString(param, allowIndex));
}

class Fragment {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard) {
      logger.throwError("use a static from method", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new Fragment()"
      });
    }

    populate(this, params);
    this._isFragment = true;
    Object.freeze(this);
  }

  static from(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }

    if (typeof value === "string") {
      return Fragment.fromString(value);
    }

    return Fragment.fromObject(value);
  }

  static fromObject(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }

    switch (value.type) {
      case "function":
        return FunctionFragment.fromObject(value);

      case "event":
        return EventFragment.fromObject(value);

      case "constructor":
        return ConstructorFragment.fromObject(value);

      case "error":
        return ErrorFragment.fromObject(value);

      case "fallback":
      case "receive":
        // @TODO: Something? Maybe return a FunctionFragment? A custom DefaultFunctionFragment?
        return null;
    }

    return logger.throwArgumentError("invalid fragment object", "value", value);
  }

  static fromString(value) {
    // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
    value = value.replace(/\s/g, " ");
    value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
    value = value.trim();

    if (value.split(" ")[0] === "event") {
      return EventFragment.fromString(value.substring(5).trim());
    } else if (value.split(" ")[0] === "function") {
      return FunctionFragment.fromString(value.substring(8).trim());
    } else if (value.split("(")[0].trim() === "constructor") {
      return ConstructorFragment.fromString(value.trim());
    } else if (value.split(" ")[0] === "error") {
      return ErrorFragment.fromString(value.substring(5).trim());
    }

    return logger.throwArgumentError("unsupported fragment", "value", value);
  }

  static isFragment(value) {
    return !!(value && value._isFragment);
  }

}

exports.Fragment = Fragment;

class EventFragment extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }

    if (!FormatTypes[format]) {
      logger.throwArgumentError("invalid format type", "format", format);
    }

    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map(input => JSON.parse(input.format(format)))
      });
    }

    let result = "";

    if (format !== FormatTypes.sighash) {
      result += "event ";
    }

    result += this.name + "(" + this.inputs.map(input => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";

    if (format !== FormatTypes.sighash) {
      if (this.anonymous) {
        result += "anonymous ";
      }
    }

    return result.trim();
  }

  static from(value) {
    if (typeof value === "string") {
      return EventFragment.fromString(value);
    }

    return EventFragment.fromObject(value);
  }

  static fromObject(value) {
    if (EventFragment.isEventFragment(value)) {
      return value;
    }

    if (value.type !== "event") {
      logger.throwArgumentError("invalid event object", "value", value);
    }

    const params = {
      name: verifyIdentifier(value.name),
      anonymous: value.anonymous,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      type: "event"
    };
    return new EventFragment(_constructorGuard, params);
  }

  static fromString(value) {
    let match = value.match(regexParen);

    if (!match) {
      logger.throwArgumentError("invalid event string", "value", value);
    }

    let anonymous = false;
    match[3].split(" ").forEach(modifier => {
      switch (modifier.trim()) {
        case "anonymous":
          anonymous = true;
          break;

        case "":
          break;

        default:
          logger.warn("unknown modifier: " + modifier);
      }
    });
    return EventFragment.fromObject({
      name: match[1].trim(),
      anonymous: anonymous,
      inputs: parseParams(match[2], true),
      type: "event"
    });
  }

  static isEventFragment(value) {
    return value && value._isFragment && value.type === "event";
  }

}

exports.EventFragment = EventFragment;

function parseGas(value, params) {
  params.gas = null;
  let comps = value.split("@");

  if (comps.length !== 1) {
    if (comps.length > 2) {
      logger.throwArgumentError("invalid human-readable ABI signature", "value", value);
    }

    if (!comps[1].match(/^[0-9]+$/)) {
      logger.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
    }

    params.gas = _bignumber.BigNumber.from(comps[1]);
    return comps[0];
  }

  return value;
}

function parseModifiers(value, params) {
  params.constant = false;
  params.payable = false;
  params.stateMutability = "nonpayable";
  value.split(" ").forEach(modifier => {
    switch (modifier.trim()) {
      case "constant":
        params.constant = true;
        break;

      case "payable":
        params.payable = true;
        params.stateMutability = "payable";
        break;

      case "nonpayable":
        params.payable = false;
        params.stateMutability = "nonpayable";
        break;

      case "pure":
        params.constant = true;
        params.stateMutability = "pure";
        break;

      case "view":
        params.constant = true;
        params.stateMutability = "view";
        break;

      case "external":
      case "public":
      case "":
        break;

      default:
        console.log("unknown modifier: " + modifier);
    }
  });
}

function verifyState(value) {
  let result = {
    constant: false,
    payable: true,
    stateMutability: "payable"
  };

  if (value.stateMutability != null) {
    result.stateMutability = value.stateMutability; // Set (and check things are consistent) the constant property

    result.constant = result.stateMutability === "view" || result.stateMutability === "pure";

    if (value.constant != null) {
      if (!!value.constant !== result.constant) {
        logger.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
      }
    } // Set (and check things are consistent) the payable property


    result.payable = result.stateMutability === "payable";

    if (value.payable != null) {
      if (!!value.payable !== result.payable) {
        logger.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
      }
    }
  } else if (value.payable != null) {
    result.payable = !!value.payable; // If payable we can assume non-constant; otherwise we can't assume

    if (value.constant == null && !result.payable && value.type !== "constructor") {
      logger.throwArgumentError("unable to determine stateMutability", "value", value);
    }

    result.constant = !!value.constant;

    if (result.constant) {
      result.stateMutability = "view";
    } else {
      result.stateMutability = result.payable ? "payable" : "nonpayable";
    }

    if (result.payable && result.constant) {
      logger.throwArgumentError("cannot have constant payable function", "value", value);
    }
  } else if (value.constant != null) {
    result.constant = !!value.constant;
    result.payable = !result.constant;
    result.stateMutability = result.constant ? "view" : "payable";
  } else if (value.type !== "constructor") {
    logger.throwArgumentError("unable to determine stateMutability", "value", value);
  }

  return result;
}

class ConstructorFragment extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }

    if (!FormatTypes[format]) {
      logger.throwArgumentError("invalid format type", "format", format);
    }

    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : undefined,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : undefined,
        inputs: this.inputs.map(input => JSON.parse(input.format(format)))
      });
    }

    if (format === FormatTypes.sighash) {
      logger.throwError("cannot format a constructor for sighash", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "format(sighash)"
      });
    }

    let result = "constructor(" + this.inputs.map(input => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";

    if (this.stateMutability && this.stateMutability !== "nonpayable") {
      result += this.stateMutability + " ";
    }

    return result.trim();
  }

  static from(value) {
    if (typeof value === "string") {
      return ConstructorFragment.fromString(value);
    }

    return ConstructorFragment.fromObject(value);
  }

  static fromObject(value) {
    if (ConstructorFragment.isConstructorFragment(value)) {
      return value;
    }

    if (value.type !== "constructor") {
      logger.throwArgumentError("invalid constructor object", "value", value);
    }

    let state = verifyState(value);

    if (state.constant) {
      logger.throwArgumentError("constructor cannot be constant", "value", value);
    }

    const params = {
      name: null,
      type: value.type,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? _bignumber.BigNumber.from(value.gas) : null
    };
    return new ConstructorFragment(_constructorGuard, params);
  }

  static fromString(value) {
    let params = {
      type: "constructor"
    };
    value = parseGas(value, params);
    let parens = value.match(regexParen);

    if (!parens || parens[1].trim() !== "constructor") {
      logger.throwArgumentError("invalid constructor string", "value", value);
    }

    params.inputs = parseParams(parens[2].trim(), false);
    parseModifiers(parens[3].trim(), params);
    return ConstructorFragment.fromObject(params);
  }

  static isConstructorFragment(value) {
    return value && value._isFragment && value.type === "constructor";
  }

}

exports.ConstructorFragment = ConstructorFragment;

class FunctionFragment extends ConstructorFragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }

    if (!FormatTypes[format]) {
      logger.throwArgumentError("invalid format type", "format", format);
    }

    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : undefined,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : undefined,
        inputs: this.inputs.map(input => JSON.parse(input.format(format))),
        outputs: this.outputs.map(output => JSON.parse(output.format(format)))
      });
    }

    let result = "";

    if (format !== FormatTypes.sighash) {
      result += "function ";
    }

    result += this.name + "(" + this.inputs.map(input => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";

    if (format !== FormatTypes.sighash) {
      if (this.stateMutability) {
        if (this.stateMutability !== "nonpayable") {
          result += this.stateMutability + " ";
        }
      } else if (this.constant) {
        result += "view ";
      }

      if (this.outputs && this.outputs.length) {
        result += "returns (" + this.outputs.map(output => output.format(format)).join(", ") + ") ";
      }

      if (this.gas != null) {
        result += "@" + this.gas.toString() + " ";
      }
    }

    return result.trim();
  }

  static from(value) {
    if (typeof value === "string") {
      return FunctionFragment.fromString(value);
    }

    return FunctionFragment.fromObject(value);
  }

  static fromObject(value) {
    if (FunctionFragment.isFunctionFragment(value)) {
      return value;
    }

    if (value.type !== "function") {
      logger.throwArgumentError("invalid function object", "value", value);
    }

    let state = verifyState(value);
    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      constant: state.constant,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? _bignumber.BigNumber.from(value.gas) : null
    };
    return new FunctionFragment(_constructorGuard, params);
  }

  static fromString(value) {
    let params = {
      type: "function"
    };
    value = parseGas(value, params);
    let comps = value.split(" returns ");

    if (comps.length > 2) {
      logger.throwArgumentError("invalid function string", "value", value);
    }

    let parens = comps[0].match(regexParen);

    if (!parens) {
      logger.throwArgumentError("invalid function signature", "value", value);
    }

    params.name = parens[1].trim();

    if (params.name) {
      verifyIdentifier(params.name);
    }

    params.inputs = parseParams(parens[2], false);
    parseModifiers(parens[3].trim(), params); // We have outputs

    if (comps.length > 1) {
      let returns = comps[1].match(regexParen);

      if (returns[1].trim() != "" || returns[3].trim() != "") {
        logger.throwArgumentError("unexpected tokens", "value", value);
      }

      params.outputs = parseParams(returns[2], false);
    } else {
      params.outputs = [];
    }

    return FunctionFragment.fromObject(params);
  }

  static isFunctionFragment(value) {
    return value && value._isFragment && value.type === "function";
  }

} //export class StructFragment extends Fragment {
//}


exports.FunctionFragment = FunctionFragment;

function checkForbidden(fragment) {
  const sig = fragment.format();

  if (sig === "Error(string)" || sig === "Panic(uint256)") {
    logger.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
  }

  return fragment;
}

class ErrorFragment extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }

    if (!FormatTypes[format]) {
      logger.throwArgumentError("invalid format type", "format", format);
    }

    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map(input => JSON.parse(input.format(format)))
      });
    }

    let result = "";

    if (format !== FormatTypes.sighash) {
      result += "error ";
    }

    result += this.name + "(" + this.inputs.map(input => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    return result.trim();
  }

  static from(value) {
    if (typeof value === "string") {
      return ErrorFragment.fromString(value);
    }

    return ErrorFragment.fromObject(value);
  }

  static fromObject(value) {
    if (ErrorFragment.isErrorFragment(value)) {
      return value;
    }

    if (value.type !== "error") {
      logger.throwArgumentError("invalid error object", "value", value);
    }

    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : []
    };
    return checkForbidden(new ErrorFragment(_constructorGuard, params));
  }

  static fromString(value) {
    let params = {
      type: "error"
    };
    let parens = value.match(regexParen);

    if (!parens) {
      logger.throwArgumentError("invalid error signature", "value", value);
    }

    params.name = parens[1].trim();

    if (params.name) {
      verifyIdentifier(params.name);
    }

    params.inputs = parseParams(parens[2], false);
    return checkForbidden(ErrorFragment.fromObject(params));
  }

  static isErrorFragment(value) {
    return value && value._isFragment && value.type === "error";
  }

}

exports.ErrorFragment = ErrorFragment;

function verifyType(type) {
  // These need to be transformed to their full description
  if (type.match(/^uint($|[^1-9])/)) {
    type = "uint256" + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = "int256" + type.substring(3);
  } // @TODO: more verification


  return type;
} // See: https://github.com/ethereum/solidity/blob/1f8f1a3db93a548d0555e3e14cfc55a10e25b60e/docs/grammar/SolidityLexer.g4#L234


const regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");

function verifyIdentifier(value) {
  if (!value || !value.match(regexIdentifier)) {
    logger.throwArgumentError(`invalid identifier "${value}"`, "value", value);
  }

  return value;
}

const regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");

function splitNesting(value) {
  value = value.trim();
  let result = [];
  let accum = "";
  let depth = 0;

  for (let offset = 0; offset < value.length; offset++) {
    let c = value[offset];

    if (c === "," && depth === 0) {
      result.push(accum);
      accum = "";
    } else {
      accum += c;

      if (c === "(") {
        depth++;
      } else if (c === ")") {
        depth--;

        if (depth === -1) {
          logger.throwArgumentError("unbalanced parenthesis", "value", value);
        }
      }
    }
  }

  if (accum) {
    result.push(accum);
  }

  return result;
}
},{"@ethersproject/bignumber":"efJK","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"KSRV"}],"T2f8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Writer = exports.Reader = exports.Coder = void 0;
exports.checkResultErrors = checkResultErrors;

var _bytes = require("@ethersproject/bytes");

var _bignumber = require("@ethersproject/bignumber");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("../_version");

const logger = new _logger.Logger(_version.version);

function checkResultErrors(result) {
  // Find the first error (if any)
  const errors = [];

  const checkErrors = function (path, object) {
    if (!Array.isArray(object)) {
      return;
    }

    for (let key in object) {
      const childPath = path.slice();
      childPath.push(key);

      try {
        checkErrors(childPath, object[key]);
      } catch (error) {
        errors.push({
          path: childPath,
          error: error
        });
      }
    }
  };

  checkErrors([], result);
  return errors;
}

class Coder {
  constructor(name, type, localName, dynamic) {
    // @TODO: defineReadOnly these
    this.name = name;
    this.type = type;
    this.localName = localName;
    this.dynamic = dynamic;
  }

  _throwError(message, value) {
    logger.throwArgumentError(message, this.localName, value);
  }

}

exports.Coder = Coder;

class Writer {
  constructor(wordSize) {
    (0, _properties.defineReadOnly)(this, "wordSize", wordSize || 32);
    this._data = [];
    this._dataLength = 0;
    this._padding = new Uint8Array(wordSize);
  }

  get data() {
    return (0, _bytes.hexConcat)(this._data);
  }

  get length() {
    return this._dataLength;
  }

  _writeData(data) {
    this._data.push(data);

    this._dataLength += data.length;
    return data.length;
  }

  appendWriter(writer) {
    return this._writeData((0, _bytes.concat)(writer._data));
  } // Arrayish items; padded on the right to wordSize


  writeBytes(value) {
    let bytes = (0, _bytes.arrayify)(value);
    const paddingOffset = bytes.length % this.wordSize;

    if (paddingOffset) {
      bytes = (0, _bytes.concat)([bytes, this._padding.slice(paddingOffset)]);
    }

    return this._writeData(bytes);
  }

  _getValue(value) {
    let bytes = (0, _bytes.arrayify)(_bignumber.BigNumber.from(value));

    if (bytes.length > this.wordSize) {
      logger.throwError("value out-of-bounds", _logger.Logger.errors.BUFFER_OVERRUN, {
        length: this.wordSize,
        offset: bytes.length
      });
    }

    if (bytes.length % this.wordSize) {
      bytes = (0, _bytes.concat)([this._padding.slice(bytes.length % this.wordSize), bytes]);
    }

    return bytes;
  } // BigNumberish items; padded on the left to wordSize


  writeValue(value) {
    return this._writeData(this._getValue(value));
  }

  writeUpdatableValue() {
    const offset = this._data.length;

    this._data.push(this._padding);

    this._dataLength += this.wordSize;
    return value => {
      this._data[offset] = this._getValue(value);
    };
  }

}

exports.Writer = Writer;

class Reader {
  constructor(data, wordSize, coerceFunc, allowLoose) {
    (0, _properties.defineReadOnly)(this, "_data", (0, _bytes.arrayify)(data));
    (0, _properties.defineReadOnly)(this, "wordSize", wordSize || 32);
    (0, _properties.defineReadOnly)(this, "_coerceFunc", coerceFunc);
    (0, _properties.defineReadOnly)(this, "allowLoose", allowLoose);
    this._offset = 0;
  }

  get data() {
    return (0, _bytes.hexlify)(this._data);
  }

  get consumed() {
    return this._offset;
  } // The default Coerce function


  static coerce(name, value) {
    let match = name.match("^u?int([0-9]+)$");

    if (match && parseInt(match[1]) <= 48) {
      value = value.toNumber();
    }

    return value;
  }

  coerce(name, value) {
    if (this._coerceFunc) {
      return this._coerceFunc(name, value);
    }

    return Reader.coerce(name, value);
  }

  _peekBytes(offset, length, loose) {
    let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;

    if (this._offset + alignedLength > this._data.length) {
      if (this.allowLoose && loose && this._offset + length <= this._data.length) {
        alignedLength = length;
      } else {
        logger.throwError("data out-of-bounds", _logger.Logger.errors.BUFFER_OVERRUN, {
          length: this._data.length,
          offset: this._offset + alignedLength
        });
      }
    }

    return this._data.slice(this._offset, this._offset + alignedLength);
  }

  subReader(offset) {
    return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
  }

  readBytes(length, loose) {
    let bytes = this._peekBytes(0, length, !!loose);

    this._offset += bytes.length; // @TODO: Make sure the length..end bytes are all 0?

    return bytes.slice(0, length);
  }

  readValue() {
    return _bignumber.BigNumber.from(this.readBytes(this.wordSize));
  }

}

exports.Reader = Reader;
},{"@ethersproject/bytes":"aqkS","@ethersproject/bignumber":"efJK","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","../_version":"KSRV"}],"XvU4":[function(require,module,exports) {
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var INPUT_ERROR = 'input is invalid type';
  var FINALIZE_ERROR = 'finalize already called';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA3_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
    0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
    2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
    2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
    2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
  var CSHAKE_BYTEPAD = {
    '128': 168,
    '256': 136
  };

  if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createCshakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits, n, s) {
      return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
    };
  };

  var createKmacOutputMethod = function (bits, padding, outputType) {
    return function (key, message, outputBits, s) {
      return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
    };
  };

  var createOutputMethods = function (method, createMethod, bits, padding) {
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createMethod(bits, padding, type);
    }
    return method;
  };

  var createMethod = function (bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');
    method.create = function () {
      return new Keccak(bits, padding, bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    return createOutputMethods(method, createOutputMethod, bits, padding);
  };

  var createShakeMethod = function (bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };
    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };
    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
  };

  var createCshakeMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createCshakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits, n, s) {
      if (!n && !s) {
        return methods['shake' + bits].create(outputBits);
      } else {
        return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
      }
    };
    method.update = function (message, outputBits, n, s) {
      return method.create(outputBits, n, s).update(message);
    };
    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
  };

  var createKmacMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createKmacOutputMethod(bits, padding, 'hex');
    method.create = function (key, outputBits, s) {
      return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
    };
    method.update = function (key, message, outputBits, s) {
      return method.create(key, outputBits, s).update(message);
    };
    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
  };

  var algorithms = [
    { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
    { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
    { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
    { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
    { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
  ];

  var methods = {}, methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits = algorithm.bits;
    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name + '_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
      if (algorithm.name !== 'sha3') {
        var newMethodName = algorithm.name + bits[j];
        methodNames.push(newMethodName);
        methods[newMethodName] = methods[methodName];
      }
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.finalized = false;
    this.block = 0;
    this.start = 0;
    this.blockCount = (1600 - (bits << 1)) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    if (this.finalized) {
      throw new Error(FINALIZE_ERROR);
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }
      notString = true;
    }
    var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
      blockCount = this.blockCount, index = 0, s = this.s, i, code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      this.lastByteIndex = i;
      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];
        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }
        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }
    return this;
  };

  Keccak.prototype.encode = function (x, right) {
    var o = x & 255, n = 1;
    var bytes = [o];
    x = x >> 8;
    o = x & 255;
    while (o > 0) {
      bytes.unshift(o);
      x = x >> 8;
      o = x & 255;
      ++n;
    }
    if (right) {
      bytes.push(n);
    } else {
      bytes.unshift(n);
    }
    this.update(bytes);
    return bytes.length;
  };

  Keccak.prototype.encodeString = function (str) {
    var notString, type = typeof str;
    if (type !== 'string') {
      if (type === 'object') {
        if (str === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
          str = new Uint8Array(str);
        } else if (!Array.isArray(str)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }
      notString = true;
    }
    var bytes = 0, length = str.length;
    if (notString) {
      bytes = length;
    } else {
      for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);
        if (code < 0x80) {
          bytes += 1;
        } else if (code < 0x800) {
          bytes += 2;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes += 3;
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
          bytes += 4;
        }
      }
    }
    bytes += this.encode(bytes * 8);
    this.update(str);
    return bytes;
  };

  Keccak.prototype.bytepad = function (strs, w) {
    var bytes = this.encode(w);
    for (var i = 0; i < strs.length; ++i) {
      bytes += this.encodeString(strs[i]);
    }
    var paddingBytes = w - bytes % w;
    var zeros = [];
    zeros.length = paddingBytes;
    this.update(zeros);
    return this;
  };

  Keccak.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];
    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    blocks[blockCount - 1] |= 0x80000000;
    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }
    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var hex = '', block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
          HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
          HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
          HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
      }
      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }
    if (extraBytes) {
      block = s[i];
      hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
      if (extraBytes > 1) {
        hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
      }
      if (extraBytes > 2) {
        hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
      }
    }
    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;
    if (extraBytes) {
      buffer = new ArrayBuffer((outputBlocks + 1) << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }
    var array = new Uint32Array(buffer);
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }
    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var array = [], offset, block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = (block >> 8) & 0xFF;
        array[offset + 2] = (block >> 16) & 0xFF;
        array[offset + 3] = (block >> 24) & 0xFF;
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      array[offset] = block & 0xFF;
      if (extraBytes > 1) {
        array[offset + 1] = (block >> 8) & 0xFF;
      }
      if (extraBytes > 2) {
        array[offset + 2] = (block >> 16) & 0xFF;
      }
    }
    return array;
  };

  function Kmac(bits, padding, outputBits) {
    Keccak.call(this, bits, padding, outputBits);
  }

  Kmac.prototype = new Keccak();

  Kmac.prototype.finalize = function () {
    this.encode(this.outputBits, true);
    return Keccak.prototype.finalize.call(this);
  };

  var f = function (s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
      b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
      b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
      b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

      h = c8 ^ ((c2 << 1) | (c3 >>> 31));
      l = c9 ^ ((c3 << 1) | (c2 >>> 31));
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ ((c4 << 1) | (c5 >>> 31));
      l = c1 ^ ((c5 << 1) | (c4 >>> 31));
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ ((c6 << 1) | (c7 >>> 31));
      l = c3 ^ ((c7 << 1) | (c6 >>> 31));
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ ((c8 << 1) | (c9 >>> 31));
      l = c5 ^ ((c9 << 1) | (c8 >>> 31));
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ ((c0 << 1) | (c1 >>> 31));
      l = c7 ^ ((c1 << 1) | (c0 >>> 31));
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;

      b0 = s[0];
      b1 = s[1];
      b32 = (s[11] << 4) | (s[10] >>> 28);
      b33 = (s[10] << 4) | (s[11] >>> 28);
      b14 = (s[20] << 3) | (s[21] >>> 29);
      b15 = (s[21] << 3) | (s[20] >>> 29);
      b46 = (s[31] << 9) | (s[30] >>> 23);
      b47 = (s[30] << 9) | (s[31] >>> 23);
      b28 = (s[40] << 18) | (s[41] >>> 14);
      b29 = (s[41] << 18) | (s[40] >>> 14);
      b20 = (s[2] << 1) | (s[3] >>> 31);
      b21 = (s[3] << 1) | (s[2] >>> 31);
      b2 = (s[13] << 12) | (s[12] >>> 20);
      b3 = (s[12] << 12) | (s[13] >>> 20);
      b34 = (s[22] << 10) | (s[23] >>> 22);
      b35 = (s[23] << 10) | (s[22] >>> 22);
      b16 = (s[33] << 13) | (s[32] >>> 19);
      b17 = (s[32] << 13) | (s[33] >>> 19);
      b48 = (s[42] << 2) | (s[43] >>> 30);
      b49 = (s[43] << 2) | (s[42] >>> 30);
      b40 = (s[5] << 30) | (s[4] >>> 2);
      b41 = (s[4] << 30) | (s[5] >>> 2);
      b22 = (s[14] << 6) | (s[15] >>> 26);
      b23 = (s[15] << 6) | (s[14] >>> 26);
      b4 = (s[25] << 11) | (s[24] >>> 21);
      b5 = (s[24] << 11) | (s[25] >>> 21);
      b36 = (s[34] << 15) | (s[35] >>> 17);
      b37 = (s[35] << 15) | (s[34] >>> 17);
      b18 = (s[45] << 29) | (s[44] >>> 3);
      b19 = (s[44] << 29) | (s[45] >>> 3);
      b10 = (s[6] << 28) | (s[7] >>> 4);
      b11 = (s[7] << 28) | (s[6] >>> 4);
      b42 = (s[17] << 23) | (s[16] >>> 9);
      b43 = (s[16] << 23) | (s[17] >>> 9);
      b24 = (s[26] << 25) | (s[27] >>> 7);
      b25 = (s[27] << 25) | (s[26] >>> 7);
      b6 = (s[36] << 21) | (s[37] >>> 11);
      b7 = (s[37] << 21) | (s[36] >>> 11);
      b38 = (s[47] << 24) | (s[46] >>> 8);
      b39 = (s[46] << 24) | (s[47] >>> 8);
      b30 = (s[8] << 27) | (s[9] >>> 5);
      b31 = (s[9] << 27) | (s[8] >>> 5);
      b12 = (s[18] << 20) | (s[19] >>> 12);
      b13 = (s[19] << 20) | (s[18] >>> 12);
      b44 = (s[29] << 7) | (s[28] >>> 25);
      b45 = (s[28] << 7) | (s[29] >>> 25);
      b26 = (s[38] << 8) | (s[39] >>> 24);
      b27 = (s[39] << 8) | (s[38] >>> 24);
      b8 = (s[48] << 14) | (s[49] >>> 18);
      b9 = (s[49] << 14) | (s[48] >>> 18);

      s[0] = b0 ^ (~b2 & b4);
      s[1] = b1 ^ (~b3 & b5);
      s[10] = b10 ^ (~b12 & b14);
      s[11] = b11 ^ (~b13 & b15);
      s[20] = b20 ^ (~b22 & b24);
      s[21] = b21 ^ (~b23 & b25);
      s[30] = b30 ^ (~b32 & b34);
      s[31] = b31 ^ (~b33 & b35);
      s[40] = b40 ^ (~b42 & b44);
      s[41] = b41 ^ (~b43 & b45);
      s[2] = b2 ^ (~b4 & b6);
      s[3] = b3 ^ (~b5 & b7);
      s[12] = b12 ^ (~b14 & b16);
      s[13] = b13 ^ (~b15 & b17);
      s[22] = b22 ^ (~b24 & b26);
      s[23] = b23 ^ (~b25 & b27);
      s[32] = b32 ^ (~b34 & b36);
      s[33] = b33 ^ (~b35 & b37);
      s[42] = b42 ^ (~b44 & b46);
      s[43] = b43 ^ (~b45 & b47);
      s[4] = b4 ^ (~b6 & b8);
      s[5] = b5 ^ (~b7 & b9);
      s[14] = b14 ^ (~b16 & b18);
      s[15] = b15 ^ (~b17 & b19);
      s[24] = b24 ^ (~b26 & b28);
      s[25] = b25 ^ (~b27 & b29);
      s[34] = b34 ^ (~b36 & b38);
      s[35] = b35 ^ (~b37 & b39);
      s[44] = b44 ^ (~b46 & b48);
      s[45] = b45 ^ (~b47 & b49);
      s[6] = b6 ^ (~b8 & b0);
      s[7] = b7 ^ (~b9 & b1);
      s[16] = b16 ^ (~b18 & b10);
      s[17] = b17 ^ (~b19 & b11);
      s[26] = b26 ^ (~b28 & b20);
      s[27] = b27 ^ (~b29 & b21);
      s[36] = b36 ^ (~b38 & b30);
      s[37] = b37 ^ (~b39 & b31);
      s[46] = b46 ^ (~b48 & b40);
      s[47] = b47 ^ (~b49 & b41);
      s[8] = b8 ^ (~b0 & b2);
      s[9] = b9 ^ (~b1 & b3);
      s[18] = b18 ^ (~b10 & b12);
      s[19] = b19 ^ (~b11 & b13);
      s[28] = b28 ^ (~b20 & b22);
      s[29] = b29 ^ (~b21 & b23);
      s[38] = b38 ^ (~b30 & b32);
      s[39] = b39 ^ (~b31 & b33);
      s[48] = b48 ^ (~b40 & b42);
      s[49] = b49 ^ (~b41 & b43);

      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }
    if (AMD) {
      define(function () {
        return methods;
      });
    }
  }
})();

},{}],"g6Gq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keccak256 = keccak256;

var _jsSha = _interopRequireDefault(require("js-sha3"));

var _bytes = require("@ethersproject/bytes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keccak256(data) {
  return '0x' + _jsSha.default.keccak_256((0, _bytes.arrayify)(data));
}
},{"js-sha3":"XvU4","@ethersproject/bytes":"aqkS"}],"vKAI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "rlp/5.5.0";
exports.version = version;
},{}],"oUFp":[function(require,module,exports) {
"use strict"; //See: https://github.com/ethereum/wiki/wiki/RLP

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;
exports.encode = encode;

var _bytes = require("@ethersproject/bytes");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);

function arrayifyInteger(value) {
  const result = [];

  while (value) {
    result.unshift(value & 0xff);
    value >>= 8;
  }

  return result;
}

function unarrayifyInteger(data, offset, length) {
  let result = 0;

  for (let i = 0; i < length; i++) {
    result = result * 256 + data[offset + i];
  }

  return result;
}

function _encode(object) {
  if (Array.isArray(object)) {
    let payload = [];
    object.forEach(function (child) {
      payload = payload.concat(_encode(child));
    });

    if (payload.length <= 55) {
      payload.unshift(0xc0 + payload.length);
      return payload;
    }

    const length = arrayifyInteger(payload.length);
    length.unshift(0xf7 + length.length);
    return length.concat(payload);
  }

  if (!(0, _bytes.isBytesLike)(object)) {
    logger.throwArgumentError("RLP object must be BytesLike", "object", object);
  }

  const data = Array.prototype.slice.call((0, _bytes.arrayify)(object));

  if (data.length === 1 && data[0] <= 0x7f) {
    return data;
  } else if (data.length <= 55) {
    data.unshift(0x80 + data.length);
    return data;
  }

  const length = arrayifyInteger(data.length);
  length.unshift(0xb7 + length.length);
  return length.concat(data);
}

function encode(object) {
  return (0, _bytes.hexlify)(_encode(object));
}

function _decodeChildren(data, offset, childOffset, length) {
  const result = [];

  while (childOffset < offset + 1 + length) {
    const decoded = _decode(data, childOffset);

    result.push(decoded.result);
    childOffset += decoded.consumed;

    if (childOffset > offset + 1 + length) {
      logger.throwError("child data too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }
  }

  return {
    consumed: 1 + length,
    result: result
  };
} // returns { consumed: number, result: Object }


function _decode(data, offset) {
  if (data.length === 0) {
    logger.throwError("data too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
  } // Array with extra length prefix


  if (data[offset] >= 0xf8) {
    const lengthLength = data[offset] - 0xf7;

    if (offset + 1 + lengthLength > data.length) {
      logger.throwError("data short segment too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }

    const length = unarrayifyInteger(data, offset + 1, lengthLength);

    if (offset + 1 + lengthLength + length > data.length) {
      logger.throwError("data long segment too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }

    return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
  } else if (data[offset] >= 0xc0) {
    const length = data[offset] - 0xc0;

    if (offset + 1 + length > data.length) {
      logger.throwError("data array too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }

    return _decodeChildren(data, offset, offset + 1, length);
  } else if (data[offset] >= 0xb8) {
    const lengthLength = data[offset] - 0xb7;

    if (offset + 1 + lengthLength > data.length) {
      logger.throwError("data array too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }

    const length = unarrayifyInteger(data, offset + 1, lengthLength);

    if (offset + 1 + lengthLength + length > data.length) {
      logger.throwError("data array too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }

    const result = (0, _bytes.hexlify)(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
    return {
      consumed: 1 + lengthLength + length,
      result: result
    };
  } else if (data[offset] >= 0x80) {
    const length = data[offset] - 0x80;

    if (offset + 1 + length > data.length) {
      logger.throwError("data too short", _logger.Logger.errors.BUFFER_OVERRUN, {});
    }

    const result = (0, _bytes.hexlify)(data.slice(offset + 1, offset + 1 + length));
    return {
      consumed: 1 + length,
      result: result
    };
  }

  return {
    consumed: 1,
    result: (0, _bytes.hexlify)(data[offset])
  };
}

function decode(data) {
  const bytes = (0, _bytes.arrayify)(data);

  const decoded = _decode(bytes, 0);

  if (decoded.consumed !== bytes.length) {
    logger.throwArgumentError("invalid rlp data", "data", data);
  }

  return decoded.result;
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/logger":"kMNH","./_version":"vKAI"}],"ggg3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "address/5.5.0";
exports.version = version;
},{}],"a1wm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddress = getAddress;
exports.getContractAddress = getContractAddress;
exports.getCreate2Address = getCreate2Address;
exports.getIcapAddress = getIcapAddress;
exports.isAddress = isAddress;

var _bytes = require("@ethersproject/bytes");

var _bignumber = require("@ethersproject/bignumber");

var _keccak = require("@ethersproject/keccak256");

var _rlp = require("@ethersproject/rlp");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);

function getChecksumAddress(address) {
  if (!(0, _bytes.isHexString)(address, 20)) {
    logger.throwArgumentError("invalid address", "address", address);
  }

  address = address.toLowerCase();
  const chars = address.substring(2).split("");
  const expanded = new Uint8Array(40);

  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0);
  }

  const hashed = (0, _bytes.arrayify)((0, _keccak.keccak256)(expanded));

  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }

    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }

  return "0x" + chars.join("");
} // Shims for environments that are missing some required constants and functions


const MAX_SAFE_INTEGER = 0x1fffffffffffff;

function log10(x) {
  if (Math.log10) {
    return Math.log10(x);
  }

  return Math.log(x) / Math.LN10;
} // See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Create lookup table


const ibanLookup = {};

for (let i = 0; i < 10; i++) {
  ibanLookup[String(i)] = String(i);
}

for (let i = 0; i < 26; i++) {
  ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
} // How many decimal digits can we process? (for 64-bit float, this is 15)


const safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));

function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map(c => {
    return ibanLookup[c];
  }).join(""); // Javascript can handle integers safely up to 15 (decimal) digits

  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }

  let checksum = String(98 - parseInt(expanded, 10) % 97);

  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }

  return checksum;
}

;

function getAddress(address) {
  let result = null;

  if (typeof address !== "string") {
    logger.throwArgumentError("invalid address", "address", address);
  }

  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    // Missing the 0x prefix
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address;
    }

    result = getChecksumAddress(address); // It is a checksummed address with a bad checksum

    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger.throwArgumentError("bad address checksum", "address", address);
    } // Maybe ICAP? (we only support direct mode)

  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    // It is an ICAP address with a bad checksum
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger.throwArgumentError("bad icap checksum", "address", address);
    }

    result = (0, _bignumber._base36To16)(address.substring(4));

    while (result.length < 40) {
      result = "0" + result;
    }

    result = getChecksumAddress("0x" + result);
  } else {
    logger.throwArgumentError("invalid address", "address", address);
  }

  return result;
}

function isAddress(address) {
  try {
    getAddress(address);
    return true;
  } catch (error) {}

  return false;
}

function getIcapAddress(address) {
  let base36 = (0, _bignumber._base16To36)(getAddress(address).substring(2)).toUpperCase();

  while (base36.length < 30) {
    base36 = "0" + base36;
  }

  return "XE" + ibanChecksum("XE00" + base36) + base36;
} // http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed


function getContractAddress(transaction) {
  let from = null;

  try {
    from = getAddress(transaction.from);
  } catch (error) {
    logger.throwArgumentError("missing from address", "transaction", transaction);
  }

  const nonce = (0, _bytes.stripZeros)((0, _bytes.arrayify)(_bignumber.BigNumber.from(transaction.nonce).toHexString()));
  return getAddress((0, _bytes.hexDataSlice)((0, _keccak.keccak256)((0, _rlp.encode)([from, nonce])), 12));
}

function getCreate2Address(from, salt, initCodeHash) {
  if ((0, _bytes.hexDataLength)(salt) !== 32) {
    logger.throwArgumentError("salt must be 32 bytes", "salt", salt);
  }

  if ((0, _bytes.hexDataLength)(initCodeHash) !== 32) {
    logger.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
  }

  return getAddress((0, _bytes.hexDataSlice)((0, _keccak.keccak256)((0, _bytes.concat)(["0xff", getAddress(from), salt, initCodeHash])), 12));
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/bignumber":"efJK","@ethersproject/keccak256":"g6Gq","@ethersproject/rlp":"oUFp","@ethersproject/logger":"kMNH","./_version":"ggg3"}],"jTgY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressCoder = void 0;

var _address = require("@ethersproject/address");

var _bytes = require("@ethersproject/bytes");

var _abstractCoder = require("./abstract-coder");

class AddressCoder extends _abstractCoder.Coder {
  constructor(localName) {
    super("address", "address", localName, false);
  }

  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }

  encode(writer, value) {
    try {
      value = (0, _address.getAddress)(value);
    } catch (error) {
      this._throwError(error.message, value);
    }

    return writer.writeValue(value);
  }

  decode(reader) {
    return (0, _address.getAddress)((0, _bytes.hexZeroPad)(reader.readValue().toHexString(), 20));
  }

}

exports.AddressCoder = AddressCoder;
},{"@ethersproject/address":"a1wm","@ethersproject/bytes":"aqkS","./abstract-coder":"T2f8"}],"FLmG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnonymousCoder = void 0;

var _abstractCoder = require("./abstract-coder");

// Clones the functionality of an existing Coder, but without a localName
class AnonymousCoder extends _abstractCoder.Coder {
  constructor(coder) {
    super(coder.name, coder.type, undefined, coder.dynamic);
    this.coder = coder;
  }

  defaultValue() {
    return this.coder.defaultValue();
  }

  encode(writer, value) {
    return this.coder.encode(writer, value);
  }

  decode(reader) {
    return this.coder.decode(reader);
  }

}

exports.AnonymousCoder = AnonymousCoder;
},{"./abstract-coder":"T2f8"}],"qwJ9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayCoder = void 0;
exports.pack = pack;
exports.unpack = unpack;

var _logger = require("@ethersproject/logger");

var _version = require("../_version");

var _abstractCoder = require("./abstract-coder");

var _anonymous = require("./anonymous");

const logger = new _logger.Logger(_version.version);

function pack(writer, coders, values) {
  let arrayValues = null;

  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map(coder => {
      const name = coder.localName;

      if (!name) {
        logger.throwError("cannot encode object for signature with missing names", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder: coder,
          value: values
        });
      }

      if (unique[name]) {
        logger.throwError("cannot encode object for signature with duplicate names", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder: coder,
          value: values
        });
      }

      unique[name] = true;
      return values[name];
    });
  } else {
    logger.throwArgumentError("invalid tuple value", "tuple", values);
  }

  if (coders.length !== arrayValues.length) {
    logger.throwArgumentError("types/value length mismatch", "tuple", values);
  }

  let staticWriter = new _abstractCoder.Writer(writer.wordSize);
  let dynamicWriter = new _abstractCoder.Writer(writer.wordSize);
  let updateFuncs = [];
  coders.forEach((coder, index) => {
    let value = arrayValues[index];

    if (coder.dynamic) {
      // Get current dynamic offset (for the future pointer)
      let dynamicOffset = dynamicWriter.length; // Encode the dynamic value into the dynamicWriter

      coder.encode(dynamicWriter, value); // Prepare to populate the correct offset once we are done

      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push(baseOffset => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  }); // Backfill all the dynamic offsets, now that we know the static length

  updateFuncs.forEach(func => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}

function unpack(reader, coders) {
  let values = []; // A reader anchored to this base

  let baseReader = reader.subReader(0);
  coders.forEach(coder => {
    let value = null;

    if (coder.dynamic) {
      let offset = reader.readValue();
      let offsetReader = baseReader.subReader(offset.toNumber());

      try {
        value = coder.decode(offsetReader);
      } catch (error) {
        // Cannot recover from this
        if (error.code === _logger.Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }

        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error) {
        // Cannot recover from this
        if (error.code === _logger.Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }

        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }

    if (value != undefined) {
      values.push(value);
    }
  }); // We only output named properties for uniquely named coders

  const uniqueNames = coders.reduce((accum, coder) => {
    const name = coder.localName;

    if (name) {
      if (!accum[name]) {
        accum[name] = 0;
      }

      accum[name]++;
    }

    return accum;
  }, {}); // Add any named parameters (i.e. tuples)

  coders.forEach((coder, index) => {
    let name = coder.localName;

    if (!name || uniqueNames[name] !== 1) {
      return;
    }

    if (name === "length") {
      name = "_length";
    }

    if (values[name] != null) {
      return;
    }

    const value = values[index];

    if (value instanceof Error) {
      Object.defineProperty(values, name, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    } else {
      values[name] = value;
    }
  });

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    if (value instanceof Error) {
      Object.defineProperty(values, i, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    }
  }

  return Object.freeze(values);
}

class ArrayCoder extends _abstractCoder.Coder {
  constructor(coder, length, localName) {
    const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
    const dynamic = length === -1 || coder.dynamic;
    super("array", type, localName, dynamic);
    this.coder = coder;
    this.length = length;
  }

  defaultValue() {
    // Verifies the child coder is valid (even if the array is dynamic or 0-length)
    const defaultChild = this.coder.defaultValue();
    const result = [];

    for (let i = 0; i < this.length; i++) {
      result.push(defaultChild);
    }

    return result;
  }

  encode(writer, value) {
    if (!Array.isArray(value)) {
      this._throwError("expected array value", value);
    }

    let count = this.length;

    if (count === -1) {
      count = value.length;
      writer.writeValue(value.length);
    }

    logger.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
    let coders = [];

    for (let i = 0; i < value.length; i++) {
      coders.push(this.coder);
    }

    return pack(writer, coders, value);
  }

  decode(reader) {
    let count = this.length;

    if (count === -1) {
      count = reader.readValue().toNumber(); // Check that there is *roughly* enough data to ensure
      // stray random data is not being read as a length. Each
      // slot requires at least 32 bytes for their value (or 32
      // bytes as a link to the data). This could use a much
      // tighter bound, but we are erroring on the side of safety.

      if (count * 32 > reader._data.length) {
        logger.throwError("insufficient data length", _logger.Logger.errors.BUFFER_OVERRUN, {
          length: reader._data.length,
          count: count
        });
      }
    }

    let coders = [];

    for (let i = 0; i < count; i++) {
      coders.push(new _anonymous.AnonymousCoder(this.coder));
    }

    return reader.coerce(this.name, unpack(reader, coders));
  }

}

exports.ArrayCoder = ArrayCoder;
},{"@ethersproject/logger":"kMNH","../_version":"KSRV","./abstract-coder":"T2f8","./anonymous":"FLmG"}],"yHWj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanCoder = void 0;

var _abstractCoder = require("./abstract-coder");

class BooleanCoder extends _abstractCoder.Coder {
  constructor(localName) {
    super("bool", "bool", localName, false);
  }

  defaultValue() {
    return false;
  }

  encode(writer, value) {
    return writer.writeValue(value ? 1 : 0);
  }

  decode(reader) {
    return reader.coerce(this.type, !reader.readValue().isZero());
  }

}

exports.BooleanCoder = BooleanCoder;
},{"./abstract-coder":"T2f8"}],"qpiR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicBytesCoder = exports.BytesCoder = void 0;

var _bytes = require("@ethersproject/bytes");

var _abstractCoder = require("./abstract-coder");

class DynamicBytesCoder extends _abstractCoder.Coder {
  constructor(type, localName) {
    super(type, type, localName, true);
  }

  defaultValue() {
    return "0x";
  }

  encode(writer, value) {
    value = (0, _bytes.arrayify)(value);
    let length = writer.writeValue(value.length);
    length += writer.writeBytes(value);
    return length;
  }

  decode(reader) {
    return reader.readBytes(reader.readValue().toNumber(), true);
  }

}

exports.DynamicBytesCoder = DynamicBytesCoder;

class BytesCoder extends DynamicBytesCoder {
  constructor(localName) {
    super("bytes", localName);
  }

  decode(reader) {
    return reader.coerce(this.name, (0, _bytes.hexlify)(super.decode(reader)));
  }

}

exports.BytesCoder = BytesCoder;
},{"@ethersproject/bytes":"aqkS","./abstract-coder":"T2f8"}],"MIFf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedBytesCoder = void 0;

var _bytes = require("@ethersproject/bytes");

var _abstractCoder = require("./abstract-coder");

// @TODO: Merge this with bytes
class FixedBytesCoder extends _abstractCoder.Coder {
  constructor(size, localName) {
    let name = "bytes" + String(size);
    super(name, name, localName, false);
    this.size = size;
  }

  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }

  encode(writer, value) {
    let data = (0, _bytes.arrayify)(value);

    if (data.length !== this.size) {
      this._throwError("incorrect data length", value);
    }

    return writer.writeBytes(data);
  }

  decode(reader) {
    return reader.coerce(this.name, (0, _bytes.hexlify)(reader.readBytes(this.size)));
  }

}

exports.FixedBytesCoder = FixedBytesCoder;
},{"@ethersproject/bytes":"aqkS","./abstract-coder":"T2f8"}],"nCCc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NullCoder = void 0;

var _abstractCoder = require("./abstract-coder");

class NullCoder extends _abstractCoder.Coder {
  constructor(localName) {
    super("null", "", localName, false);
  }

  defaultValue() {
    return null;
  }

  encode(writer, value) {
    if (value != null) {
      this._throwError("not null", value);
    }

    return writer.writeBytes([]);
  }

  decode(reader) {
    reader.readBytes(0);
    return reader.coerce(this.name, null);
  }

}

exports.NullCoder = NullCoder;
},{"./abstract-coder":"T2f8"}],"yytb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressZero = void 0;
const AddressZero = "0x0000000000000000000000000000000000000000";
exports.AddressZero = AddressZero;
},{}],"IuDD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zero = exports.WeiPerEther = exports.Two = exports.One = exports.NegativeOne = exports.MinInt256 = exports.MaxUint256 = exports.MaxInt256 = void 0;

var _bignumber = require("@ethersproject/bignumber");

const NegativeOne = /*#__PURE__*/_bignumber.BigNumber.from(-1);

exports.NegativeOne = NegativeOne;

const Zero = /*#__PURE__*/_bignumber.BigNumber.from(0);

exports.Zero = Zero;

const One = /*#__PURE__*/_bignumber.BigNumber.from(1);

exports.One = One;

const Two = /*#__PURE__*/_bignumber.BigNumber.from(2);

exports.Two = Two;

const WeiPerEther = /*#__PURE__*/_bignumber.BigNumber.from("1000000000000000000");

exports.WeiPerEther = WeiPerEther;

const MaxUint256 = /*#__PURE__*/_bignumber.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

exports.MaxUint256 = MaxUint256;

const MinInt256 = /*#__PURE__*/_bignumber.BigNumber.from("-0x8000000000000000000000000000000000000000000000000000000000000000");

exports.MinInt256 = MinInt256;

const MaxInt256 = /*#__PURE__*/_bignumber.BigNumber.from("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

exports.MaxInt256 = MaxInt256;
},{"@ethersproject/bignumber":"efJK"}],"yISm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashZero = void 0;
const HashZero = "0x0000000000000000000000000000000000000000000000000000000000000000";
exports.HashZero = HashZero;
},{}],"BYiH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherSymbol = void 0;
// NFKC (composed)             // (decomposed)
const EtherSymbol = "\u039e"; // "\uD835\uDF63";

exports.EtherSymbol = EtherSymbol;
},{}],"FOhG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddressZero", {
  enumerable: true,
  get: function () {
    return _addresses.AddressZero;
  }
});
Object.defineProperty(exports, "EtherSymbol", {
  enumerable: true,
  get: function () {
    return _strings.EtherSymbol;
  }
});
Object.defineProperty(exports, "HashZero", {
  enumerable: true,
  get: function () {
    return _hashes.HashZero;
  }
});
Object.defineProperty(exports, "MaxInt256", {
  enumerable: true,
  get: function () {
    return _bignumbers.MaxInt256;
  }
});
Object.defineProperty(exports, "MaxUint256", {
  enumerable: true,
  get: function () {
    return _bignumbers.MaxUint256;
  }
});
Object.defineProperty(exports, "MinInt256", {
  enumerable: true,
  get: function () {
    return _bignumbers.MinInt256;
  }
});
Object.defineProperty(exports, "NegativeOne", {
  enumerable: true,
  get: function () {
    return _bignumbers.NegativeOne;
  }
});
Object.defineProperty(exports, "One", {
  enumerable: true,
  get: function () {
    return _bignumbers.One;
  }
});
Object.defineProperty(exports, "Two", {
  enumerable: true,
  get: function () {
    return _bignumbers.Two;
  }
});
Object.defineProperty(exports, "WeiPerEther", {
  enumerable: true,
  get: function () {
    return _bignumbers.WeiPerEther;
  }
});
Object.defineProperty(exports, "Zero", {
  enumerable: true,
  get: function () {
    return _bignumbers.Zero;
  }
});

var _addresses = require("./addresses");

var _bignumbers = require("./bignumbers");

var _hashes = require("./hashes");

var _strings = require("./strings");
},{"./addresses":"yytb","./bignumbers":"IuDD","./hashes":"yISm","./strings":"BYiH"}],"jVEj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberCoder = void 0;

var _bignumber = require("@ethersproject/bignumber");

var _constants = require("@ethersproject/constants");

var _abstractCoder = require("./abstract-coder");

class NumberCoder extends _abstractCoder.Coder {
  constructor(size, signed, localName) {
    const name = (signed ? "int" : "uint") + size * 8;
    super(name, name, localName, false);
    this.size = size;
    this.signed = signed;
  }

  defaultValue() {
    return 0;
  }

  encode(writer, value) {
    let v = _bignumber.BigNumber.from(value); // Check bounds are safe for encoding


    let maxUintValue = _constants.MaxUint256.mask(writer.wordSize * 8);

    if (this.signed) {
      let bounds = maxUintValue.mask(this.size * 8 - 1);

      if (v.gt(bounds) || v.lt(bounds.add(_constants.One).mul(_constants.NegativeOne))) {
        this._throwError("value out-of-bounds", value);
      }
    } else if (v.lt(_constants.Zero) || v.gt(maxUintValue.mask(this.size * 8))) {
      this._throwError("value out-of-bounds", value);
    }

    v = v.toTwos(this.size * 8).mask(this.size * 8);

    if (this.signed) {
      v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
    }

    return writer.writeValue(v);
  }

  decode(reader) {
    let value = reader.readValue().mask(this.size * 8);

    if (this.signed) {
      value = value.fromTwos(this.size * 8);
    }

    return reader.coerce(this.name, value);
  }

}

exports.NumberCoder = NumberCoder;
},{"@ethersproject/bignumber":"efJK","@ethersproject/constants":"FOhG","./abstract-coder":"T2f8"}],"o9hJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "strings/5.5.0";
exports.version = version;
},{}],"pSQg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utf8ErrorReason = exports.Utf8ErrorFuncs = exports.UnicodeNormalizationForm = void 0;
exports._toEscapedUtf8String = _toEscapedUtf8String;
exports._toUtf8String = _toUtf8String;
exports.toUtf8Bytes = toUtf8Bytes;
exports.toUtf8CodePoints = toUtf8CodePoints;
exports.toUtf8String = toUtf8String;

var _bytes = require("@ethersproject/bytes");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version); ///////////////////////////////

var UnicodeNormalizationForm;
exports.UnicodeNormalizationForm = UnicodeNormalizationForm;

(function (UnicodeNormalizationForm) {
  UnicodeNormalizationForm["current"] = "";
  UnicodeNormalizationForm["NFC"] = "NFC";
  UnicodeNormalizationForm["NFD"] = "NFD";
  UnicodeNormalizationForm["NFKC"] = "NFKC";
  UnicodeNormalizationForm["NFKD"] = "NFKD";
})(UnicodeNormalizationForm || (exports.UnicodeNormalizationForm = UnicodeNormalizationForm = {}));

;
var Utf8ErrorReason;
exports.Utf8ErrorReason = Utf8ErrorReason;

(function (Utf8ErrorReason) {
  // A continuation byte was present where there was nothing to continue
  // - offset = the index the codepoint began in
  Utf8ErrorReason["UNEXPECTED_CONTINUE"] = "unexpected continuation byte"; // An invalid (non-continuation) byte to start a UTF-8 codepoint was found
  // - offset = the index the codepoint began in

  Utf8ErrorReason["BAD_PREFIX"] = "bad codepoint prefix"; // The string is too short to process the expected codepoint
  // - offset = the index the codepoint began in

  Utf8ErrorReason["OVERRUN"] = "string overrun"; // A missing continuation byte was expected but not found
  // - offset = the index the continuation byte was expected at

  Utf8ErrorReason["MISSING_CONTINUE"] = "missing continuation byte"; // The computed code point is outside the range for UTF-8
  // - offset       = start of this codepoint
  // - badCodepoint = the computed codepoint; outside the UTF-8 range

  Utf8ErrorReason["OUT_OF_RANGE"] = "out of UTF-8 range"; // UTF-8 strings may not contain UTF-16 surrogate pairs
  // - offset       = start of this codepoint
  // - badCodepoint = the computed codepoint; inside the UTF-16 surrogate range

  Utf8ErrorReason["UTF16_SURROGATE"] = "UTF-16 surrogate"; // The string is an overlong representation
  // - offset       = start of this codepoint
  // - badCodepoint = the computed codepoint; already bounds checked

  Utf8ErrorReason["OVERLONG"] = "overlong representation";
})(Utf8ErrorReason || (exports.Utf8ErrorReason = Utf8ErrorReason = {}));

;

function errorFunc(reason, offset, bytes, output, badCodepoint) {
  return logger.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}

function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
  // If there is an invalid prefix (including stray continuation), skip any additional continuation bytes
  if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
    let i = 0;

    for (let o = offset + 1; o < bytes.length; o++) {
      if (bytes[o] >> 6 !== 0x02) {
        break;
      }

      i++;
    }

    return i;
  } // This byte runs us past the end of the string, so just jump to the end
  // (but the first byte was read already read and therefore skipped)


  if (reason === Utf8ErrorReason.OVERRUN) {
    return bytes.length - offset - 1;
  } // Nothing to skip


  return 0;
}

function replaceFunc(reason, offset, bytes, output, badCodepoint) {
  // Overlong representations are otherwise "valid" code points; just non-deistingtished
  if (reason === Utf8ErrorReason.OVERLONG) {
    output.push(badCodepoint);
    return 0;
  } // Put the replacement character into the output


  output.push(0xfffd); // Otherwise, process as if ignoring errors

  return ignoreFunc(reason, offset, bytes, output, badCodepoint);
} // Common error handing strategies


const Utf8ErrorFuncs = Object.freeze({
  error: errorFunc,
  ignore: ignoreFunc,
  replace: replaceFunc
}); // http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499

exports.Utf8ErrorFuncs = Utf8ErrorFuncs;

function getUtf8CodePoints(bytes, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }

  bytes = (0, _bytes.arrayify)(bytes);
  const result = [];
  let i = 0; // Invalid bytes are ignored

  while (i < bytes.length) {
    const c = bytes[i++]; // 0xxx xxxx

    if (c >> 7 === 0) {
      result.push(c);
      continue;
    } // Multibyte; how many bytes left for this character?


    let extraLength = null;
    let overlongMask = null; // 110x xxxx 10xx xxxx

    if ((c & 0xe0) === 0xc0) {
      extraLength = 1;
      overlongMask = 0x7f; // 1110 xxxx 10xx xxxx 10xx xxxx
    } else if ((c & 0xf0) === 0xe0) {
      extraLength = 2;
      overlongMask = 0x7ff; // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
    } else if ((c & 0xf8) === 0xf0) {
      extraLength = 3;
      overlongMask = 0xffff;
    } else {
      if ((c & 0xc0) === 0x80) {
        i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes, result);
      } else {
        i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes, result);
      }

      continue;
    } // Do we have enough bytes in our data?


    if (i - 1 + extraLength >= bytes.length) {
      i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes, result);
      continue;
    } // Remove the length prefix from the char


    let res = c & (1 << 8 - extraLength - 1) - 1;

    for (let j = 0; j < extraLength; j++) {
      let nextChar = bytes[i]; // Invalid continuation byte

      if ((nextChar & 0xc0) != 0x80) {
        i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes, result);
        res = null;
        break;
      }

      ;
      res = res << 6 | nextChar & 0x3f;
      i++;
    } // See above loop for invalid continuation byte


    if (res === null) {
      continue;
    } // Maximum code point


    if (res > 0x10ffff) {
      i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes, result, res);
      continue;
    } // Reserved for UTF-16 surrogate halves


    if (res >= 0xd800 && res <= 0xdfff) {
      i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes, result, res);
      continue;
    } // Check for overlong sequences (more bytes than needed)


    if (res <= overlongMask) {
      i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes, result, res);
      continue;
    }

    result.push(res);
  }

  return result;
} // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array


function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
  if (form != UnicodeNormalizationForm.current) {
    logger.checkNormalize();
    str = str.normalize(form);
  }

  let result = [];

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);

    if (c < 0x80) {
      result.push(c);
    } else if (c < 0x800) {
      result.push(c >> 6 | 0xc0);
      result.push(c & 0x3f | 0x80);
    } else if ((c & 0xfc00) == 0xd800) {
      i++;
      const c2 = str.charCodeAt(i);

      if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
        throw new Error("invalid utf-8 string");
      } // Surrogate Pair


      const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
      result.push(pair >> 18 | 0xf0);
      result.push(pair >> 12 & 0x3f | 0x80);
      result.push(pair >> 6 & 0x3f | 0x80);
      result.push(pair & 0x3f | 0x80);
    } else {
      result.push(c >> 12 | 0xe0);
      result.push(c >> 6 & 0x3f | 0x80);
      result.push(c & 0x3f | 0x80);
    }
  }

  return (0, _bytes.arrayify)(result);
}

;

function escapeChar(value) {
  const hex = "0000" + value.toString(16);
  return "\\u" + hex.substring(hex.length - 4);
}

function _toEscapedUtf8String(bytes, onError) {
  return '"' + getUtf8CodePoints(bytes, onError).map(codePoint => {
    if (codePoint < 256) {
      switch (codePoint) {
        case 8:
          return "\\b";

        case 9:
          return "\\t";

        case 10:
          return "\\n";

        case 13:
          return "\\r";

        case 34:
          return "\\\"";

        case 92:
          return "\\\\";
      }

      if (codePoint >= 32 && codePoint < 127) {
        return String.fromCharCode(codePoint);
      }
    }

    if (codePoint <= 0xffff) {
      return escapeChar(codePoint);
    }

    codePoint -= 0x10000;
    return escapeChar((codePoint >> 10 & 0x3ff) + 0xd800) + escapeChar((codePoint & 0x3ff) + 0xdc00);
  }).join("") + '"';
}

function _toUtf8String(codePoints) {
  return codePoints.map(codePoint => {
    if (codePoint <= 0xffff) {
      return String.fromCharCode(codePoint);
    }

    codePoint -= 0x10000;
    return String.fromCharCode((codePoint >> 10 & 0x3ff) + 0xd800, (codePoint & 0x3ff) + 0xdc00);
  }).join("");
}

function toUtf8String(bytes, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes, onError));
}

function toUtf8CodePoints(str, form = UnicodeNormalizationForm.current) {
  return getUtf8CodePoints(toUtf8Bytes(str, form));
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/logger":"kMNH","./_version":"o9hJ"}],"BjLV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatBytes32String = formatBytes32String;
exports.parseBytes32String = parseBytes32String;

var _constants = require("@ethersproject/constants");

var _bytes = require("@ethersproject/bytes");

var _utf = require("./utf8");

function formatBytes32String(text) {
  // Get the bytes
  const bytes = (0, _utf.toUtf8Bytes)(text); // Check we have room for null-termination

  if (bytes.length > 31) {
    throw new Error("bytes32 string must be less than 32 bytes");
  } // Zero-pad (implicitly null-terminates)


  return (0, _bytes.hexlify)((0, _bytes.concat)([bytes, _constants.HashZero]).slice(0, 32));
}

function parseBytes32String(bytes) {
  const data = (0, _bytes.arrayify)(bytes); // Must be 32 bytes with a null-termination

  if (data.length !== 32) {
    throw new Error("invalid bytes32 - not 32 bytes long");
  }

  if (data[31] !== 0) {
    throw new Error("invalid bytes32 string - no null terminator");
  } // Find the null termination


  let length = 31;

  while (data[length - 1] === 0) {
    length--;
  } // Determine the string value


  return (0, _utf.toUtf8String)(data.slice(0, length));
}
},{"@ethersproject/constants":"FOhG","@ethersproject/bytes":"aqkS","./utf8":"pSQg"}],"rPEv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._nameprepTableA1 = _nameprepTableA1;
exports._nameprepTableB2 = _nameprepTableB2;
exports._nameprepTableC = _nameprepTableC;
exports.nameprep = nameprep;

var _utf = require("./utf8");

function bytes2(data) {
  if (data.length % 4 !== 0) {
    throw new Error("bad data");
  }

  let result = [];

  for (let i = 0; i < data.length; i += 4) {
    result.push(parseInt(data.substring(i, i + 4), 16));
  }

  return result;
}

function createTable(data, func) {
  if (!func) {
    func = function (value) {
      return [parseInt(value, 16)];
    };
  }

  let lo = 0;
  let result = {};
  data.split(",").forEach(pair => {
    let comps = pair.split(":");
    lo += parseInt(comps[0], 16);
    result[lo] = func(comps[1]);
  });
  return result;
}

function createRangeTable(data) {
  let hi = 0;
  return data.split(",").map(v => {
    let comps = v.split("-");

    if (comps.length === 1) {
      comps[1] = "0";
    } else if (comps[1] === "") {
      comps[1] = "1";
    }

    let lo = hi + parseInt(comps[0], 16);
    hi = parseInt(comps[1], 16);
    return {
      l: lo,
      h: hi
    };
  });
}

function matchMap(value, ranges) {
  let lo = 0;

  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i];
    lo += range.l;

    if (value >= lo && value <= lo + range.h && (value - lo) % (range.d || 1) === 0) {
      if (range.e && range.e.indexOf(value - lo) !== -1) {
        continue;
      }

      return range;
    }
  }

  return null;
}

const Table_A_1_ranges = createRangeTable("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"); // @TODO: Make this relative...

const Table_B_1_flags = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map(v => parseInt(v, 16));
const Table_B_2_ranges = [{
  h: 25,
  s: 32,
  l: 65
}, {
  h: 30,
  s: 32,
  e: [23],
  l: 127
}, {
  h: 54,
  s: 1,
  e: [48],
  l: 64,
  d: 2
}, {
  h: 14,
  s: 1,
  l: 57,
  d: 2
}, {
  h: 44,
  s: 1,
  l: 17,
  d: 2
}, {
  h: 10,
  s: 1,
  e: [2, 6, 8],
  l: 61,
  d: 2
}, {
  h: 16,
  s: 1,
  l: 68,
  d: 2
}, {
  h: 84,
  s: 1,
  e: [18, 24, 66],
  l: 19,
  d: 2
}, {
  h: 26,
  s: 32,
  e: [17],
  l: 435
}, {
  h: 22,
  s: 1,
  l: 71,
  d: 2
}, {
  h: 15,
  s: 80,
  l: 40
}, {
  h: 31,
  s: 32,
  l: 16
}, {
  h: 32,
  s: 1,
  l: 80,
  d: 2
}, {
  h: 52,
  s: 1,
  l: 42,
  d: 2
}, {
  h: 12,
  s: 1,
  l: 55,
  d: 2
}, {
  h: 40,
  s: 1,
  e: [38],
  l: 15,
  d: 2
}, {
  h: 14,
  s: 1,
  l: 48,
  d: 2
}, {
  h: 37,
  s: 48,
  l: 49
}, {
  h: 148,
  s: 1,
  l: 6351,
  d: 2
}, {
  h: 88,
  s: 1,
  l: 160,
  d: 2
}, {
  h: 15,
  s: 16,
  l: 704
}, {
  h: 25,
  s: 26,
  l: 854
}, {
  h: 25,
  s: 32,
  l: 55915
}, {
  h: 37,
  s: 40,
  l: 1247
}, {
  h: 25,
  s: -119711,
  l: 53248
}, {
  h: 25,
  s: -119763,
  l: 52
}, {
  h: 25,
  s: -119815,
  l: 52
}, {
  h: 25,
  s: -119867,
  e: [1, 4, 5, 7, 8, 11, 12, 17],
  l: 52
}, {
  h: 25,
  s: -119919,
  l: 52
}, {
  h: 24,
  s: -119971,
  e: [2, 7, 8, 17],
  l: 52
}, {
  h: 24,
  s: -120023,
  e: [2, 7, 13, 15, 16, 17],
  l: 52
}, {
  h: 25,
  s: -120075,
  l: 52
}, {
  h: 25,
  s: -120127,
  l: 52
}, {
  h: 25,
  s: -120179,
  l: 52
}, {
  h: 25,
  s: -120231,
  l: 52
}, {
  h: 25,
  s: -120283,
  l: 52
}, {
  h: 25,
  s: -120335,
  l: 52
}, {
  h: 24,
  s: -119543,
  e: [17],
  l: 56
}, {
  h: 24,
  s: -119601,
  e: [17],
  l: 58
}, {
  h: 24,
  s: -119659,
  e: [17],
  l: 58
}, {
  h: 24,
  s: -119717,
  e: [17],
  l: 58
}, {
  h: 24,
  s: -119775,
  e: [17],
  l: 58
}];
const Table_B_2_lut_abs = createTable("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3");
const Table_B_2_lut_rel = createTable("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7");
const Table_B_2_complex = createTable("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", bytes2);
const Table_C_ranges = createRangeTable("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");

function flatten(values) {
  return values.reduce((accum, value) => {
    value.forEach(value => {
      accum.push(value);
    });
    return accum;
  }, []);
}

function _nameprepTableA1(codepoint) {
  return !!matchMap(codepoint, Table_A_1_ranges);
}

function _nameprepTableB2(codepoint) {
  let range = matchMap(codepoint, Table_B_2_ranges);

  if (range) {
    return [codepoint + range.s];
  }

  let codes = Table_B_2_lut_abs[codepoint];

  if (codes) {
    return codes;
  }

  let shift = Table_B_2_lut_rel[codepoint];

  if (shift) {
    return [codepoint + shift[0]];
  }

  let complex = Table_B_2_complex[codepoint];

  if (complex) {
    return complex;
  }

  return null;
}

function _nameprepTableC(codepoint) {
  return !!matchMap(codepoint, Table_C_ranges);
}

function nameprep(value) {
  // This allows platforms with incomplete normalize to bypass
  // it for very basic names which the built-in toLowerCase
  // will certainly handle correctly
  if (value.match(/^[a-z0-9-]*$/i) && value.length <= 59) {
    return value.toLowerCase();
  } // Get the code points (keeping the current normalization)


  let codes = (0, _utf.toUtf8CodePoints)(value);
  codes = flatten(codes.map(code => {
    // Substitute Table B.1 (Maps to Nothing)
    if (Table_B_1_flags.indexOf(code) >= 0) {
      return [];
    }

    if (code >= 0xfe00 && code <= 0xfe0f) {
      return [];
    } // Substitute Table B.2 (Case Folding)


    let codesTableB2 = _nameprepTableB2(code);

    if (codesTableB2) {
      return codesTableB2;
    } // No Substitution


    return [code];
  })); // Normalize using form KC

  codes = (0, _utf.toUtf8CodePoints)((0, _utf._toUtf8String)(codes), _utf.UnicodeNormalizationForm.NFKC); // Prohibit Tables C.1.2, C.2.2, C.3, C.4, C.5, C.6, C.7, C.8, C.9

  codes.forEach(code => {
    if (_nameprepTableC(code)) {
      throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
    }
  }); // Prohibit Unassigned Code Points (Table A.1)

  codes.forEach(code => {
    if (_nameprepTableA1(code)) {
      throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
    }
  }); // IDNA extras

  let name = (0, _utf._toUtf8String)(codes); // IDNA: 4.2.3.1

  if (name.substring(0, 1) === "-" || name.substring(2, 4) === "--" || name.substring(name.length - 1) === "-") {
    throw new Error("invalid hyphen");
  } // IDNA: 4.2.4


  if (name.length > 63) {
    throw new Error("too long");
  }

  return name;
}
},{"./utf8":"pSQg"}],"ZW9k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UnicodeNormalizationForm", {
  enumerable: true,
  get: function () {
    return _utf.UnicodeNormalizationForm;
  }
});
Object.defineProperty(exports, "Utf8ErrorFuncs", {
  enumerable: true,
  get: function () {
    return _utf.Utf8ErrorFuncs;
  }
});
Object.defineProperty(exports, "Utf8ErrorReason", {
  enumerable: true,
  get: function () {
    return _utf.Utf8ErrorReason;
  }
});
Object.defineProperty(exports, "_toEscapedUtf8String", {
  enumerable: true,
  get: function () {
    return _utf._toEscapedUtf8String;
  }
});
Object.defineProperty(exports, "formatBytes32String", {
  enumerable: true,
  get: function () {
    return _bytes.formatBytes32String;
  }
});
Object.defineProperty(exports, "nameprep", {
  enumerable: true,
  get: function () {
    return _idna.nameprep;
  }
});
Object.defineProperty(exports, "parseBytes32String", {
  enumerable: true,
  get: function () {
    return _bytes.parseBytes32String;
  }
});
Object.defineProperty(exports, "toUtf8Bytes", {
  enumerable: true,
  get: function () {
    return _utf.toUtf8Bytes;
  }
});
Object.defineProperty(exports, "toUtf8CodePoints", {
  enumerable: true,
  get: function () {
    return _utf.toUtf8CodePoints;
  }
});
Object.defineProperty(exports, "toUtf8String", {
  enumerable: true,
  get: function () {
    return _utf.toUtf8String;
  }
});

var _bytes = require("./bytes32");

var _idna = require("./idna");

var _utf = require("./utf8");
},{"./bytes32":"BjLV","./idna":"rPEv","./utf8":"pSQg"}],"oqXo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringCoder = void 0;

var _strings = require("@ethersproject/strings");

var _bytes = require("./bytes");

class StringCoder extends _bytes.DynamicBytesCoder {
  constructor(localName) {
    super("string", localName);
  }

  defaultValue() {
    return "";
  }

  encode(writer, value) {
    return super.encode(writer, (0, _strings.toUtf8Bytes)(value));
  }

  decode(reader) {
    return (0, _strings.toUtf8String)(super.decode(reader));
  }

}

exports.StringCoder = StringCoder;
},{"@ethersproject/strings":"ZW9k","./bytes":"qpiR"}],"kQt8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TupleCoder = void 0;

var _abstractCoder = require("./abstract-coder");

var _array = require("./array");

class TupleCoder extends _abstractCoder.Coder {
  constructor(coders, localName) {
    let dynamic = false;
    const types = [];
    coders.forEach(coder => {
      if (coder.dynamic) {
        dynamic = true;
      }

      types.push(coder.type);
    });
    const type = "tuple(" + types.join(",") + ")";
    super("tuple", type, localName, dynamic);
    this.coders = coders;
  }

  defaultValue() {
    const values = [];
    this.coders.forEach(coder => {
      values.push(coder.defaultValue());
    }); // We only output named properties for uniquely named coders

    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name = coder.localName;

      if (name) {
        if (!accum[name]) {
          accum[name] = 0;
        }

        accum[name]++;
      }

      return accum;
    }, {}); // Add named values

    this.coders.forEach((coder, index) => {
      let name = coder.localName;

      if (!name || uniqueNames[name] !== 1) {
        return;
      }

      if (name === "length") {
        name = "_length";
      }

      if (values[name] != null) {
        return;
      }

      values[name] = values[index];
    });
    return Object.freeze(values);
  }

  encode(writer, value) {
    return (0, _array.pack)(writer, this.coders, value);
  }

  decode(reader) {
    return reader.coerce(this.name, (0, _array.unpack)(reader, this.coders));
  }

}

exports.TupleCoder = TupleCoder;
},{"./abstract-coder":"T2f8","./array":"qwJ9"}],"F7PL":[function(require,module,exports) {
"use strict"; // See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAbiCoder = exports.AbiCoder = void 0;

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _abstractCoder = require("./coders/abstract-coder");

var _address = require("./coders/address");

var _array = require("./coders/array");

var _boolean = require("./coders/boolean");

var _bytes2 = require("./coders/bytes");

var _fixedBytes = require("./coders/fixed-bytes");

var _null = require("./coders/null");

var _number = require("./coders/number");

var _string = require("./coders/string");

var _tuple = require("./coders/tuple");

var _fragments = require("./fragments");

const logger = new _logger.Logger(_version.version);
const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);

class AbiCoder {
  constructor(coerceFunc) {
    logger.checkNew(new.target, AbiCoder);
    (0, _properties.defineReadOnly)(this, "coerceFunc", coerceFunc || null);
  }

  _getCoder(param) {
    switch (param.baseType) {
      case "address":
        return new _address.AddressCoder(param.name);

      case "bool":
        return new _boolean.BooleanCoder(param.name);

      case "string":
        return new _string.StringCoder(param.name);

      case "bytes":
        return new _bytes2.BytesCoder(param.name);

      case "array":
        return new _array.ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);

      case "tuple":
        return new _tuple.TupleCoder((param.components || []).map(component => {
          return this._getCoder(component);
        }), param.name);

      case "":
        return new _null.NullCoder(param.name);
    } // u?int[0-9]*


    let match = param.type.match(paramTypeNumber);

    if (match) {
      let size = parseInt(match[2] || "256");

      if (size === 0 || size > 256 || size % 8 !== 0) {
        logger.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
      }

      return new _number.NumberCoder(size / 8, match[1] === "int", param.name);
    } // bytes[0-9]+


    match = param.type.match(paramTypeBytes);

    if (match) {
      let size = parseInt(match[1]);

      if (size === 0 || size > 32) {
        logger.throwArgumentError("invalid bytes length", "param", param);
      }

      return new _fixedBytes.FixedBytesCoder(size, param.name);
    }

    return logger.throwArgumentError("invalid type", "type", param.type);
  }

  _getWordSize() {
    return 32;
  }

  _getReader(data, allowLoose) {
    return new _abstractCoder.Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
  }

  _getWriter() {
    return new _abstractCoder.Writer(this._getWordSize());
  }

  getDefaultValue(types) {
    const coders = types.map(type => this._getCoder(_fragments.ParamType.from(type)));
    const coder = new _tuple.TupleCoder(coders, "_");
    return coder.defaultValue();
  }

  encode(types, values) {
    if (types.length !== values.length) {
      logger.throwError("types/values length mismatch", _logger.Logger.errors.INVALID_ARGUMENT, {
        count: {
          types: types.length,
          values: values.length
        },
        value: {
          types: types,
          values: values
        }
      });
    }

    const coders = types.map(type => this._getCoder(_fragments.ParamType.from(type)));
    const coder = new _tuple.TupleCoder(coders, "_");

    const writer = this._getWriter();

    coder.encode(writer, values);
    return writer.data;
  }

  decode(types, data, loose) {
    const coders = types.map(type => this._getCoder(_fragments.ParamType.from(type)));
    const coder = new _tuple.TupleCoder(coders, "_");
    return coder.decode(this._getReader((0, _bytes.arrayify)(data), loose));
  }

}

exports.AbiCoder = AbiCoder;
const defaultAbiCoder = new AbiCoder();
exports.defaultAbiCoder = defaultAbiCoder;
},{"@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"KSRV","./coders/abstract-coder":"T2f8","./coders/address":"jTgY","./coders/array":"qwJ9","./coders/boolean":"yHWj","./coders/bytes":"qpiR","./coders/fixed-bytes":"MIFf","./coders/null":"nCCc","./coders/number":"jVEj","./coders/string":"oqXo","./coders/tuple":"kQt8","./fragments":"togt"}],"phDg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.id = id;

var _keccak = require("@ethersproject/keccak256");

var _strings = require("@ethersproject/strings");

function id(text) {
  return (0, _keccak.keccak256)((0, _strings.toUtf8Bytes)(text));
}
},{"@ethersproject/keccak256":"g6Gq","@ethersproject/strings":"ZW9k"}],"NOgc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "hash/5.5.0";
exports.version = version;
},{}],"lXVe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidName = isValidName;
exports.namehash = namehash;

var _bytes = require("@ethersproject/bytes");

var _strings = require("@ethersproject/strings");

var _keccak = require("@ethersproject/keccak256");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);
const Zeros = new Uint8Array(32);
Zeros.fill(0);
const Partition = new RegExp("^((.*)\\.)?([^.]+)$");

function isValidName(name) {
  try {
    const comps = name.split(".");

    for (let i = 0; i < comps.length; i++) {
      if ((0, _strings.nameprep)(comps[i]).length === 0) {
        throw new Error("empty");
      }
    }

    return true;
  } catch (error) {}

  return false;
}

function namehash(name) {
  /* istanbul ignore if */
  if (typeof name !== "string") {
    logger.throwArgumentError("invalid ENS name; not a string", "name", name);
  }

  let current = name;
  let result = Zeros;

  while (current.length) {
    const partition = current.match(Partition);

    if (partition == null || partition[2] === "") {
      logger.throwArgumentError("invalid ENS address; missing component", "name", name);
    }

    const label = (0, _strings.toUtf8Bytes)((0, _strings.nameprep)(partition[3]));
    result = (0, _keccak.keccak256)((0, _bytes.concat)([result, (0, _keccak.keccak256)(label)]));
    current = partition[2] || "";
  }

  return (0, _bytes.hexlify)(result);
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/strings":"ZW9k","@ethersproject/keccak256":"g6Gq","@ethersproject/logger":"kMNH","./_version":"NOgc"}],"iZVz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashMessage = hashMessage;
exports.messagePrefix = void 0;

var _bytes = require("@ethersproject/bytes");

var _keccak = require("@ethersproject/keccak256");

var _strings = require("@ethersproject/strings");

const messagePrefix = "\x19Ethereum Signed Message:\n";
exports.messagePrefix = messagePrefix;

function hashMessage(message) {
  if (typeof message === "string") {
    message = (0, _strings.toUtf8Bytes)(message);
  }

  return (0, _keccak.keccak256)((0, _bytes.concat)([(0, _strings.toUtf8Bytes)(messagePrefix), (0, _strings.toUtf8Bytes)(String(message.length)), message]));
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/keccak256":"g6Gq","@ethersproject/strings":"ZW9k"}],"fZpo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypedDataEncoder = void 0;

var _address = require("@ethersproject/address");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _keccak = require("@ethersproject/keccak256");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _id = require("./id");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);
const padding = new Uint8Array(32);
padding.fill(0);

const NegativeOne = _bignumber.BigNumber.from(-1);

const Zero = _bignumber.BigNumber.from(0);

const One = _bignumber.BigNumber.from(1);

const MaxUint256 = _bignumber.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

function hexPadRight(value) {
  const bytes = (0, _bytes.arrayify)(value);
  const padOffset = bytes.length % 32;

  if (padOffset) {
    return (0, _bytes.hexConcat)([bytes, padding.slice(padOffset)]);
  }

  return (0, _bytes.hexlify)(bytes);
}

const hexTrue = (0, _bytes.hexZeroPad)(One.toHexString(), 32);
const hexFalse = (0, _bytes.hexZeroPad)(Zero.toHexString(), 32);
const domainFieldTypes = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
};
const domainFieldNames = ["name", "version", "chainId", "verifyingContract", "salt"];

function checkString(key) {
  return function (value) {
    if (typeof value !== "string") {
      logger.throwArgumentError(`invalid domain value for ${JSON.stringify(key)}`, `domain.${key}`, value);
    }

    return value;
  };
}

const domainChecks = {
  name: checkString("name"),
  version: checkString("version"),
  chainId: function (value) {
    try {
      return _bignumber.BigNumber.from(value).toString();
    } catch (error) {}

    return logger.throwArgumentError(`invalid domain value for "chainId"`, "domain.chainId", value);
  },
  verifyingContract: function (value) {
    try {
      return (0, _address.getAddress)(value).toLowerCase();
    } catch (error) {}

    return logger.throwArgumentError(`invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
  },
  salt: function (value) {
    try {
      const bytes = (0, _bytes.arrayify)(value);

      if (bytes.length !== 32) {
        throw new Error("bad length");
      }

      return (0, _bytes.hexlify)(bytes);
    } catch (error) {}

    return logger.throwArgumentError(`invalid domain value "salt"`, "domain.salt", value);
  }
};

function getBaseEncoder(type) {
  // intXX and uintXX
  {
    const match = type.match(/^(u?)int(\d*)$/);

    if (match) {
      const signed = match[1] === "";
      const width = parseInt(match[2] || "256");

      if (width % 8 !== 0 || width > 256 || match[2] && match[2] !== String(width)) {
        logger.throwArgumentError("invalid numeric width", "type", type);
      }

      const boundsUpper = MaxUint256.mask(signed ? width - 1 : width);
      const boundsLower = signed ? boundsUpper.add(One).mul(NegativeOne) : Zero;
      return function (value) {
        const v = _bignumber.BigNumber.from(value);

        if (v.lt(boundsLower) || v.gt(boundsUpper)) {
          logger.throwArgumentError(`value out-of-bounds for ${type}`, "value", value);
        }

        return (0, _bytes.hexZeroPad)(v.toTwos(256).toHexString(), 32);
      };
    }
  } // bytesXX

  {
    const match = type.match(/^bytes(\d+)$/);

    if (match) {
      const width = parseInt(match[1]);

      if (width === 0 || width > 32 || match[1] !== String(width)) {
        logger.throwArgumentError("invalid bytes width", "type", type);
      }

      return function (value) {
        const bytes = (0, _bytes.arrayify)(value);

        if (bytes.length !== width) {
          logger.throwArgumentError(`invalid length for ${type}`, "value", value);
        }

        return hexPadRight(value);
      };
    }
  }

  switch (type) {
    case "address":
      return function (value) {
        return (0, _bytes.hexZeroPad)((0, _address.getAddress)(value), 32);
      };

    case "bool":
      return function (value) {
        return !value ? hexFalse : hexTrue;
      };

    case "bytes":
      return function (value) {
        return (0, _keccak.keccak256)(value);
      };

    case "string":
      return function (value) {
        return (0, _id.id)(value);
      };
  }

  return null;
}

function encodeType(name, fields) {
  return `${name}(${fields.map(({
    name,
    type
  }) => type + " " + name).join(",")})`;
}

class TypedDataEncoder {
  constructor(types) {
    (0, _properties.defineReadOnly)(this, "types", Object.freeze((0, _properties.deepCopy)(types)));
    (0, _properties.defineReadOnly)(this, "_encoderCache", {});
    (0, _properties.defineReadOnly)(this, "_types", {}); // Link struct types to their direct child structs

    const links = {}; // Link structs to structs which contain them as a child

    const parents = {}; // Link all subtypes within a given struct

    const subtypes = {};
    Object.keys(types).forEach(type => {
      links[type] = {};
      parents[type] = [];
      subtypes[type] = {};
    });

    for (const name in types) {
      const uniqueNames = {};
      types[name].forEach(field => {
        // Check each field has a unique name
        if (uniqueNames[field.name]) {
          logger.throwArgumentError(`duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name)}`, "types", types);
        }

        uniqueNames[field.name] = true; // Get the base type (drop any array specifiers)

        const baseType = field.type.match(/^([^\x5b]*)(\x5b|$)/)[1];

        if (baseType === name) {
          logger.throwArgumentError(`circular type reference to ${JSON.stringify(baseType)}`, "types", types);
        } // Is this a base encoding type?


        const encoder = getBaseEncoder(baseType);

        if (encoder) {
          return;
        }

        if (!parents[baseType]) {
          logger.throwArgumentError(`unknown type ${JSON.stringify(baseType)}`, "types", types);
        } // Add linkage


        parents[baseType].push(name);
        links[name][baseType] = true;
      });
    } // Deduce the primary type


    const primaryTypes = Object.keys(parents).filter(n => parents[n].length === 0);

    if (primaryTypes.length === 0) {
      logger.throwArgumentError("missing primary type", "types", types);
    } else if (primaryTypes.length > 1) {
      logger.throwArgumentError(`ambiguous primary types or unused types: ${primaryTypes.map(t => JSON.stringify(t)).join(", ")}`, "types", types);
    }

    (0, _properties.defineReadOnly)(this, "primaryType", primaryTypes[0]); // Check for circular type references

    function checkCircular(type, found) {
      if (found[type]) {
        logger.throwArgumentError(`circular type reference to ${JSON.stringify(type)}`, "types", types);
      }

      found[type] = true;
      Object.keys(links[type]).forEach(child => {
        if (!parents[child]) {
          return;
        } // Recursively check children


        checkCircular(child, found); // Mark all ancestors as having this decendant

        Object.keys(found).forEach(subtype => {
          subtypes[subtype][child] = true;
        });
      });
      delete found[type];
    }

    checkCircular(this.primaryType, {}); // Compute each fully describe type

    for (const name in subtypes) {
      const st = Object.keys(subtypes[name]);
      st.sort();
      this._types[name] = encodeType(name, types[name]) + st.map(t => encodeType(t, types[t])).join("");
    }
  }

  getEncoder(type) {
    let encoder = this._encoderCache[type];

    if (!encoder) {
      encoder = this._encoderCache[type] = this._getEncoder(type);
    }

    return encoder;
  }

  _getEncoder(type) {
    // Basic encoder type (address, bool, uint256, etc)
    {
      const encoder = getBaseEncoder(type);

      if (encoder) {
        return encoder;
      }
    } // Array

    const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);

    if (match) {
      const subtype = match[1];
      const subEncoder = this.getEncoder(subtype);
      const length = parseInt(match[3]);
      return value => {
        if (length >= 0 && value.length !== length) {
          logger.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
        }

        let result = value.map(subEncoder);

        if (this._types[subtype]) {
          result = result.map(_keccak.keccak256);
        }

        return (0, _keccak.keccak256)((0, _bytes.hexConcat)(result));
      };
    } // Struct


    const fields = this.types[type];

    if (fields) {
      const encodedType = (0, _id.id)(this._types[type]);
      return value => {
        const values = fields.map(({
          name,
          type
        }) => {
          const result = this.getEncoder(type)(value[name]);

          if (this._types[type]) {
            return (0, _keccak.keccak256)(result);
          }

          return result;
        });
        values.unshift(encodedType);
        return (0, _bytes.hexConcat)(values);
      };
    }

    return logger.throwArgumentError(`unknown type: ${type}`, "type", type);
  }

  encodeType(name) {
    const result = this._types[name];

    if (!result) {
      logger.throwArgumentError(`unknown type: ${JSON.stringify(name)}`, "name", name);
    }

    return result;
  }

  encodeData(type, value) {
    return this.getEncoder(type)(value);
  }

  hashStruct(name, value) {
    return (0, _keccak.keccak256)(this.encodeData(name, value));
  }

  encode(value) {
    return this.encodeData(this.primaryType, value);
  }

  hash(value) {
    return this.hashStruct(this.primaryType, value);
  }

  _visit(type, value, callback) {
    // Basic encoder type (address, bool, uint256, etc)
    {
      const encoder = getBaseEncoder(type);

      if (encoder) {
        return callback(type, value);
      }
    } // Array

    const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);

    if (match) {
      const subtype = match[1];
      const length = parseInt(match[3]);

      if (length >= 0 && value.length !== length) {
        logger.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
      }

      return value.map(v => this._visit(subtype, v, callback));
    } // Struct


    const fields = this.types[type];

    if (fields) {
      return fields.reduce((accum, {
        name,
        type
      }) => {
        accum[name] = this._visit(type, value[name], callback);
        return accum;
      }, {});
    }

    return logger.throwArgumentError(`unknown type: ${type}`, "type", type);
  }

  visit(value, callback) {
    return this._visit(this.primaryType, value, callback);
  }

  static from(types) {
    return new TypedDataEncoder(types);
  }

  static getPrimaryType(types) {
    return TypedDataEncoder.from(types).primaryType;
  }

  static hashStruct(name, types, value) {
    return TypedDataEncoder.from(types).hashStruct(name, value);
  }

  static hashDomain(domain) {
    const domainFields = [];

    for (const name in domain) {
      const type = domainFieldTypes[name];

      if (!type) {
        logger.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(name)}`, "domain", domain);
      }

      domainFields.push({
        name,
        type
      });
    }

    domainFields.sort((a, b) => {
      return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
    });
    return TypedDataEncoder.hashStruct("EIP712Domain", {
      EIP712Domain: domainFields
    }, domain);
  }

  static encode(domain, types, value) {
    return (0, _bytes.hexConcat)(["0x1901", TypedDataEncoder.hashDomain(domain), TypedDataEncoder.from(types).hash(value)]);
  }

  static hash(domain, types, value) {
    return (0, _keccak.keccak256)(TypedDataEncoder.encode(domain, types, value));
  } // Replaces all address types with ENS names with their looked up address


  static resolveNames(domain, types, value, resolveName) {
    return __awaiter(this, void 0, void 0, function* () {
      // Make a copy to isolate it from the object passed in
      domain = (0, _properties.shallowCopy)(domain); // Look up all ENS names

      const ensCache = {}; // Do we need to look up the domain's verifyingContract?

      if (domain.verifyingContract && !(0, _bytes.isHexString)(domain.verifyingContract, 20)) {
        ensCache[domain.verifyingContract] = "0x";
      } // We are going to use the encoder to visit all the base values


      const encoder = TypedDataEncoder.from(types); // Get a list of all the addresses

      encoder.visit(value, (type, value) => {
        if (type === "address" && !(0, _bytes.isHexString)(value, 20)) {
          ensCache[value] = "0x";
        }

        return value;
      }); // Lookup each name

      for (const name in ensCache) {
        ensCache[name] = yield resolveName(name);
      } // Replace the domain verifyingContract if needed


      if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
        domain.verifyingContract = ensCache[domain.verifyingContract];
      } // Replace all ENS names with their address


      value = encoder.visit(value, (type, value) => {
        if (type === "address" && ensCache[value]) {
          return ensCache[value];
        }

        return value;
      });
      return {
        domain,
        value
      };
    });
  }

  static getPayload(domain, types, value) {
    // Validate the domain fields
    TypedDataEncoder.hashDomain(domain); // Derive the EIP712Domain Struct reference type

    const domainValues = {};
    const domainTypes = [];
    domainFieldNames.forEach(name => {
      const value = domain[name];

      if (value == null) {
        return;
      }

      domainValues[name] = domainChecks[name](value);
      domainTypes.push({
        name,
        type: domainFieldTypes[name]
      });
    });
    const encoder = TypedDataEncoder.from(types);
    const typesWithDomain = (0, _properties.shallowCopy)(types);

    if (typesWithDomain.EIP712Domain) {
      logger.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", types);
    } else {
      typesWithDomain.EIP712Domain = domainTypes;
    } // Validate the data structures and types


    encoder.encode(value);
    return {
      types: typesWithDomain,
      domain: domainValues,
      primaryType: encoder.primaryType,
      message: encoder.visit(value, (type, value) => {
        // bytes
        if (type.match(/^bytes(\d*)/)) {
          return (0, _bytes.hexlify)((0, _bytes.arrayify)(value));
        } // uint or int


        if (type.match(/^u?int/)) {
          return _bignumber.BigNumber.from(value).toString();
        }

        switch (type) {
          case "address":
            return value.toLowerCase();

          case "bool":
            return !!value;

          case "string":
            if (typeof value !== "string") {
              logger.throwArgumentError(`invalid string`, "value", value);
            }

            return value;
        }

        return logger.throwArgumentError("unsupported type", "type", type);
      })
    };
  }

}

exports.TypedDataEncoder = TypedDataEncoder;
},{"@ethersproject/address":"a1wm","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/keccak256":"g6Gq","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"NOgc","./id":"phDg"}],"eHxR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "_TypedDataEncoder", {
  enumerable: true,
  get: function () {
    return _typedData.TypedDataEncoder;
  }
});
Object.defineProperty(exports, "hashMessage", {
  enumerable: true,
  get: function () {
    return _message.hashMessage;
  }
});
Object.defineProperty(exports, "id", {
  enumerable: true,
  get: function () {
    return _id.id;
  }
});
Object.defineProperty(exports, "isValidName", {
  enumerable: true,
  get: function () {
    return _namehash.isValidName;
  }
});
Object.defineProperty(exports, "messagePrefix", {
  enumerable: true,
  get: function () {
    return _message.messagePrefix;
  }
});
Object.defineProperty(exports, "namehash", {
  enumerable: true,
  get: function () {
    return _namehash.namehash;
  }
});

var _id = require("./id");

var _namehash = require("./namehash");

var _message = require("./message");

var _typedData = require("./typed-data");
},{"./id":"phDg","./namehash":"lXVe","./message":"iZVz","./typed-data":"fZpo"}],"OSBN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionDescription = exports.LogDescription = exports.Interface = exports.Indexed = exports.ErrorDescription = void 0;
Object.defineProperty(exports, "checkResultErrors", {
  enumerable: true,
  get: function () {
    return _abstractCoder.checkResultErrors;
  }
});

var _address = require("@ethersproject/address");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _hash = require("@ethersproject/hash");

var _keccak = require("@ethersproject/keccak256");

var _properties = require("@ethersproject/properties");

var _abiCoder = require("./abi-coder");

var _abstractCoder = require("./coders/abstract-coder");

var _fragments = require("./fragments");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);

class LogDescription extends _properties.Description {}

exports.LogDescription = LogDescription;

class TransactionDescription extends _properties.Description {}

exports.TransactionDescription = TransactionDescription;

class ErrorDescription extends _properties.Description {}

exports.ErrorDescription = ErrorDescription;

class Indexed extends _properties.Description {
  static isIndexed(value) {
    return !!(value && value._isIndexed);
  }

}

exports.Indexed = Indexed;
const BuiltinErrors = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: true
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"]
  }
};

function wrapAccessError(property, error) {
  const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
  wrap.error = error;
  return wrap;
}
/*
function checkNames(fragment: Fragment, type: "input" | "output", params: Array<ParamType>): void {
    params.reduce((accum, param) => {
        if (param.name) {
            if (accum[param.name]) {
                logger.throwArgumentError(`duplicate ${ type } parameter ${ JSON.stringify(param.name) } in ${ fragment.format("full") }`, "fragment", fragment);
            }
            accum[param.name] = true;
        }
        return accum;
    }, <{ [ name: string ]: boolean }>{ });
}
*/


class Interface {
  constructor(fragments) {
    logger.checkNew(new.target, Interface);
    let abi = [];

    if (typeof fragments === "string") {
      abi = JSON.parse(fragments);
    } else {
      abi = fragments;
    }

    (0, _properties.defineReadOnly)(this, "fragments", abi.map(fragment => {
      return _fragments.Fragment.from(fragment);
    }).filter(fragment => fragment != null));
    (0, _properties.defineReadOnly)(this, "_abiCoder", (0, _properties.getStatic)(new.target, "getAbiCoder")());
    (0, _properties.defineReadOnly)(this, "functions", {});
    (0, _properties.defineReadOnly)(this, "errors", {});
    (0, _properties.defineReadOnly)(this, "events", {});
    (0, _properties.defineReadOnly)(this, "structs", {}); // Add all fragments by their signature

    this.fragments.forEach(fragment => {
      let bucket = null;

      switch (fragment.type) {
        case "constructor":
          if (this.deploy) {
            logger.warn("duplicate definition - constructor");
            return;
          } //checkNames(fragment, "input", fragment.inputs);


          (0, _properties.defineReadOnly)(this, "deploy", fragment);
          return;

        case "function":
          //checkNames(fragment, "input", fragment.inputs);
          //checkNames(fragment, "output", (<FunctionFragment>fragment).outputs);
          bucket = this.functions;
          break;

        case "event":
          //checkNames(fragment, "input", fragment.inputs);
          bucket = this.events;
          break;

        case "error":
          bucket = this.errors;
          break;

        default:
          return;
      }

      let signature = fragment.format();

      if (bucket[signature]) {
        logger.warn("duplicate definition - " + signature);
        return;
      }

      bucket[signature] = fragment;
    }); // If we do not have a constructor add a default

    if (!this.deploy) {
      (0, _properties.defineReadOnly)(this, "deploy", _fragments.ConstructorFragment.from({
        payable: false,
        type: "constructor"
      }));
    }

    (0, _properties.defineReadOnly)(this, "_isInterface", true);
  }

  format(format) {
    if (!format) {
      format = _fragments.FormatTypes.full;
    }

    if (format === _fragments.FormatTypes.sighash) {
      logger.throwArgumentError("interface does not support formatting sighash", "format", format);
    }

    const abi = this.fragments.map(fragment => fragment.format(format)); // We need to re-bundle the JSON fragments a bit

    if (format === _fragments.FormatTypes.json) {
      return JSON.stringify(abi.map(j => JSON.parse(j)));
    }

    return abi;
  } // Sub-classes can override these to handle other blockchains


  static getAbiCoder() {
    return _abiCoder.defaultAbiCoder;
  }

  static getAddress(address) {
    return (0, _address.getAddress)(address);
  }

  static getSighash(fragment) {
    return (0, _bytes.hexDataSlice)((0, _hash.id)(fragment.format()), 0, 4);
  }

  static getEventTopic(eventFragment) {
    return (0, _hash.id)(eventFragment.format());
  } // Find a function definition by any means necessary (unless it is ambiguous)


  getFunction(nameOrSignatureOrSighash) {
    if ((0, _bytes.isHexString)(nameOrSignatureOrSighash)) {
      for (const name in this.functions) {
        if (nameOrSignatureOrSighash === this.getSighash(name)) {
          return this.functions[name];
        }
      }

      logger.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
    } // It is a bare name, look up the function (will return null if ambiguous)


    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.functions).filter(f => f.split("("
      /* fix:) */
      )[0] === name);

      if (matching.length === 0) {
        logger.throwArgumentError("no matching function", "name", name);
      } else if (matching.length > 1) {
        logger.throwArgumentError("multiple matching functions", "name", name);
      }

      return this.functions[matching[0]];
    } // Normalize the signature and lookup the function


    const result = this.functions[_fragments.FunctionFragment.fromString(nameOrSignatureOrSighash).format()];

    if (!result) {
      logger.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
    }

    return result;
  } // Find an event definition by any means necessary (unless it is ambiguous)


  getEvent(nameOrSignatureOrTopic) {
    if ((0, _bytes.isHexString)(nameOrSignatureOrTopic)) {
      const topichash = nameOrSignatureOrTopic.toLowerCase();

      for (const name in this.events) {
        if (topichash === this.getEventTopic(name)) {
          return this.events[name];
        }
      }

      logger.throwArgumentError("no matching event", "topichash", topichash);
    } // It is a bare name, look up the function (will return null if ambiguous)


    if (nameOrSignatureOrTopic.indexOf("(") === -1) {
      const name = nameOrSignatureOrTopic.trim();
      const matching = Object.keys(this.events).filter(f => f.split("("
      /* fix:) */
      )[0] === name);

      if (matching.length === 0) {
        logger.throwArgumentError("no matching event", "name", name);
      } else if (matching.length > 1) {
        logger.throwArgumentError("multiple matching events", "name", name);
      }

      return this.events[matching[0]];
    } // Normalize the signature and lookup the function


    const result = this.events[_fragments.EventFragment.fromString(nameOrSignatureOrTopic).format()];

    if (!result) {
      logger.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
    }

    return result;
  } // Find a function definition by any means necessary (unless it is ambiguous)


  getError(nameOrSignatureOrSighash) {
    if ((0, _bytes.isHexString)(nameOrSignatureOrSighash)) {
      const getSighash = (0, _properties.getStatic)(this.constructor, "getSighash");

      for (const name in this.errors) {
        const error = this.errors[name];

        if (nameOrSignatureOrSighash === getSighash(error)) {
          return this.errors[name];
        }
      }

      logger.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
    } // It is a bare name, look up the function (will return null if ambiguous)


    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.errors).filter(f => f.split("("
      /* fix:) */
      )[0] === name);

      if (matching.length === 0) {
        logger.throwArgumentError("no matching error", "name", name);
      } else if (matching.length > 1) {
        logger.throwArgumentError("multiple matching errors", "name", name);
      }

      return this.errors[matching[0]];
    } // Normalize the signature and lookup the function


    const result = this.errors[_fragments.FunctionFragment.fromString(nameOrSignatureOrSighash).format()];

    if (!result) {
      logger.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
    }

    return result;
  } // Get the sighash (the bytes4 selector) used by Solidity to identify a function


  getSighash(fragment) {
    if (typeof fragment === "string") {
      try {
        fragment = this.getFunction(fragment);
      } catch (error) {
        try {
          fragment = this.getError(fragment);
        } catch (_) {
          throw error;
        }
      }
    }

    return (0, _properties.getStatic)(this.constructor, "getSighash")(fragment);
  } // Get the topic (the bytes32 hash) used by Solidity to identify an event


  getEventTopic(eventFragment) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }

    return (0, _properties.getStatic)(this.constructor, "getEventTopic")(eventFragment);
  }

  _decodeParams(params, data) {
    return this._abiCoder.decode(params, data);
  }

  _encodeParams(params, values) {
    return this._abiCoder.encode(params, values);
  }

  encodeDeploy(values) {
    return this._encodeParams(this.deploy.inputs, values || []);
  }

  decodeErrorResult(fragment, data) {
    if (typeof fragment === "string") {
      fragment = this.getError(fragment);
    }

    const bytes = (0, _bytes.arrayify)(data);

    if ((0, _bytes.hexlify)(bytes.slice(0, 4)) !== this.getSighash(fragment)) {
      logger.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", (0, _bytes.hexlify)(bytes));
    }

    return this._decodeParams(fragment.inputs, bytes.slice(4));
  }

  encodeErrorResult(fragment, values) {
    if (typeof fragment === "string") {
      fragment = this.getError(fragment);
    }

    return (0, _bytes.hexlify)((0, _bytes.concat)([this.getSighash(fragment), this._encodeParams(fragment.inputs, values || [])]));
  } // Decode the data for a function call (e.g. tx.data)


  decodeFunctionData(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }

    const bytes = (0, _bytes.arrayify)(data);

    if ((0, _bytes.hexlify)(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
      logger.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", (0, _bytes.hexlify)(bytes));
    }

    return this._decodeParams(functionFragment.inputs, bytes.slice(4));
  } // Encode the data for a function call (e.g. tx.data)


  encodeFunctionData(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }

    return (0, _bytes.hexlify)((0, _bytes.concat)([this.getSighash(functionFragment), this._encodeParams(functionFragment.inputs, values || [])]));
  } // Decode the result from a function call (e.g. from eth_call)


  decodeFunctionResult(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }

    let bytes = (0, _bytes.arrayify)(data);
    let reason = null;
    let errorArgs = null;
    let errorName = null;
    let errorSignature = null;

    switch (bytes.length % this._abiCoder._getWordSize()) {
      case 0:
        try {
          return this._abiCoder.decode(functionFragment.outputs, bytes);
        } catch (error) {}

        break;

      case 4:
        {
          const selector = (0, _bytes.hexlify)(bytes.slice(0, 4));
          const builtin = BuiltinErrors[selector];

          if (builtin) {
            errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
            errorName = builtin.name;
            errorSignature = builtin.signature;

            if (builtin.reason) {
              reason = errorArgs[0];
            }
          } else {
            try {
              const error = this.getError(selector);
              errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
              errorName = error.name;
              errorSignature = error.format();
            } catch (error) {
              console.log(error);
            }
          }

          break;
        }
    }

    return logger.throwError("call revert exception", _logger.Logger.errors.CALL_EXCEPTION, {
      method: functionFragment.format(),
      errorArgs,
      errorName,
      errorSignature,
      reason
    });
  } // Encode the result for a function call (e.g. for eth_call)


  encodeFunctionResult(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }

    return (0, _bytes.hexlify)(this._abiCoder.encode(functionFragment.outputs, values || []));
  } // Create the filter for the event with search criteria (e.g. for eth_filterLog)


  encodeFilterTopics(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }

    if (values.length > eventFragment.inputs.length) {
      logger.throwError("too many arguments for " + eventFragment.format(), _logger.Logger.errors.UNEXPECTED_ARGUMENT, {
        argument: "values",
        value: values
      });
    }

    let topics = [];

    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }

    const encodeTopic = (param, value) => {
      if (param.type === "string") {
        return (0, _hash.id)(value);
      } else if (param.type === "bytes") {
        return (0, _keccak.keccak256)((0, _bytes.hexlify)(value));
      } // Check addresses are valid


      if (param.type === "address") {
        this._abiCoder.encode(["address"], [value]);
      }

      return (0, _bytes.hexZeroPad)((0, _bytes.hexlify)(value), 32);
    };

    values.forEach((value, index) => {
      let param = eventFragment.inputs[index];

      if (!param.indexed) {
        if (value != null) {
          logger.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
        }

        return;
      }

      if (value == null) {
        topics.push(null);
      } else if (param.baseType === "array" || param.baseType === "tuple") {
        logger.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
      } else if (Array.isArray(value)) {
        topics.push(value.map(value => encodeTopic(param, value)));
      } else {
        topics.push(encodeTopic(param, value));
      }
    }); // Trim off trailing nulls

    while (topics.length && topics[topics.length - 1] === null) {
      topics.pop();
    }

    return topics;
  }

  encodeEventLog(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }

    const topics = [];
    const dataTypes = [];
    const dataValues = [];

    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }

    if (values.length !== eventFragment.inputs.length) {
      logger.throwArgumentError("event arguments/values mismatch", "values", values);
    }

    eventFragment.inputs.forEach((param, index) => {
      const value = values[index];

      if (param.indexed) {
        if (param.type === "string") {
          topics.push((0, _hash.id)(value));
        } else if (param.type === "bytes") {
          topics.push((0, _keccak.keccak256)(value));
        } else if (param.baseType === "tuple" || param.baseType === "array") {
          // @TODO
          throw new Error("not implemented");
        } else {
          topics.push(this._abiCoder.encode([param.type], [value]));
        }
      } else {
        dataTypes.push(param);
        dataValues.push(value);
      }
    });
    return {
      data: this._abiCoder.encode(dataTypes, dataValues),
      topics: topics
    };
  } // Decode a filter for the event and the search criteria


  decodeEventLog(eventFragment, data, topics) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }

    if (topics != null && !eventFragment.anonymous) {
      let topicHash = this.getEventTopic(eventFragment);

      if (!(0, _bytes.isHexString)(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
        logger.throwError("fragment/topic mismatch", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "topics[0]",
          expected: topicHash,
          value: topics[0]
        });
      }

      topics = topics.slice(1);
    }

    let indexed = [];
    let nonIndexed = [];
    let dynamic = [];
    eventFragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
          indexed.push(_fragments.ParamType.fromObject({
            type: "bytes32",
            name: param.name
          }));
          dynamic.push(true);
        } else {
          indexed.push(param);
          dynamic.push(false);
        }
      } else {
        nonIndexed.push(param);
        dynamic.push(false);
      }
    });
    let resultIndexed = topics != null ? this._abiCoder.decode(indexed, (0, _bytes.concat)(topics)) : null;

    let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);

    let result = [];
    let nonIndexedIndex = 0,
        indexedIndex = 0;
    eventFragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (resultIndexed == null) {
          result[index] = new Indexed({
            _isIndexed: true,
            hash: null
          });
        } else if (dynamic[index]) {
          result[index] = new Indexed({
            _isIndexed: true,
            hash: resultIndexed[indexedIndex++]
          });
        } else {
          try {
            result[index] = resultIndexed[indexedIndex++];
          } catch (error) {
            result[index] = error;
          }
        }
      } else {
        try {
          result[index] = resultNonIndexed[nonIndexedIndex++];
        } catch (error) {
          result[index] = error;
        }
      } // Add the keyword argument if named and safe


      if (param.name && result[param.name] == null) {
        const value = result[index]; // Make error named values throw on access

        if (value instanceof Error) {
          Object.defineProperty(result, param.name, {
            enumerable: true,
            get: () => {
              throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
            }
          });
        } else {
          result[param.name] = value;
        }
      }
    }); // Make all error indexed values throw on access

    for (let i = 0; i < result.length; i++) {
      const value = result[i];

      if (value instanceof Error) {
        Object.defineProperty(result, i, {
          enumerable: true,
          get: () => {
            throw wrapAccessError(`index ${i}`, value);
          }
        });
      }
    }

    return Object.freeze(result);
  } // Given a transaction, find the matching function fragment (if any) and
  // determine all its properties and call parameters


  parseTransaction(tx) {
    let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());

    if (!fragment) {
      return null;
    }

    return new TransactionDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
      functionFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment),
      value: _bignumber.BigNumber.from(tx.value || "0")
    });
  } // @TODO
  //parseCallResult(data: BytesLike): ??
  // Given an event log, find the matching event fragment (if any) and
  // determine all its properties and values


  parseLog(log) {
    let fragment = this.getEvent(log.topics[0]);

    if (!fragment || fragment.anonymous) {
      return null;
    } // @TODO: If anonymous, and the only method, and the input count matches, should we parse?
    //        Probably not, because just because it is the only event in the ABI does
    //        not mean we have the full ABI; maybe just a fragment?


    return new LogDescription({
      eventFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      topic: this.getEventTopic(fragment),
      args: this.decodeEventLog(fragment, log.data, log.topics)
    });
  }

  parseError(data) {
    const hexData = (0, _bytes.hexlify)(data);
    let fragment = this.getError(hexData.substring(0, 10).toLowerCase());

    if (!fragment) {
      return null;
    }

    return new ErrorDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
      errorFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment)
    });
  }
  /*
  static from(value: Array<Fragment | string | JsonAbi> | string | Interface) {
      if (Interface.isInterface(value)) {
          return value;
      }
      if (typeof(value) === "string") {
          return new Interface(JSON.parse(value));
      }
      return new Interface(value);
  }
  */


  static isInterface(value) {
    return !!(value && value._isInterface);
  }

}

exports.Interface = Interface;
},{"@ethersproject/address":"a1wm","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/hash":"eHxR","@ethersproject/keccak256":"g6Gq","@ethersproject/properties":"JuuX","./abi-coder":"F7PL","./coders/abstract-coder":"T2f8","./fragments":"togt","@ethersproject/logger":"kMNH","./_version":"KSRV"}],"FSnr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AbiCoder", {
  enumerable: true,
  get: function () {
    return _abiCoder.AbiCoder;
  }
});
Object.defineProperty(exports, "ConstructorFragment", {
  enumerable: true,
  get: function () {
    return _fragments.ConstructorFragment;
  }
});
Object.defineProperty(exports, "ErrorFragment", {
  enumerable: true,
  get: function () {
    return _fragments.ErrorFragment;
  }
});
Object.defineProperty(exports, "EventFragment", {
  enumerable: true,
  get: function () {
    return _fragments.EventFragment;
  }
});
Object.defineProperty(exports, "FormatTypes", {
  enumerable: true,
  get: function () {
    return _fragments.FormatTypes;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function () {
    return _fragments.Fragment;
  }
});
Object.defineProperty(exports, "FunctionFragment", {
  enumerable: true,
  get: function () {
    return _fragments.FunctionFragment;
  }
});
Object.defineProperty(exports, "Indexed", {
  enumerable: true,
  get: function () {
    return _interface.Indexed;
  }
});
Object.defineProperty(exports, "Interface", {
  enumerable: true,
  get: function () {
    return _interface.Interface;
  }
});
Object.defineProperty(exports, "LogDescription", {
  enumerable: true,
  get: function () {
    return _interface.LogDescription;
  }
});
Object.defineProperty(exports, "ParamType", {
  enumerable: true,
  get: function () {
    return _fragments.ParamType;
  }
});
Object.defineProperty(exports, "TransactionDescription", {
  enumerable: true,
  get: function () {
    return _interface.TransactionDescription;
  }
});
Object.defineProperty(exports, "checkResultErrors", {
  enumerable: true,
  get: function () {
    return _interface.checkResultErrors;
  }
});
Object.defineProperty(exports, "defaultAbiCoder", {
  enumerable: true,
  get: function () {
    return _abiCoder.defaultAbiCoder;
  }
});

var _fragments = require("./fragments");

var _abiCoder = require("./abi-coder");

var _interface = require("./interface");
},{"./fragments":"togt","./abi-coder":"F7PL","./interface":"OSBN"}],"n8Iw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "abstract-provider/5.5.1";
exports.version = version;
},{}],"GKyj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionOrderForkEvent = exports.TransactionForkEvent = exports.Provider = exports.ForkEvent = exports.BlockForkEvent = void 0;

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);
;
; //export type CallTransactionable = {
//    call(transaction: TransactionRequest): Promise<TransactionResponse>;
//};

class ForkEvent extends _properties.Description {
  static isForkEvent(value) {
    return !!(value && value._isForkEvent);
  }

}

exports.ForkEvent = ForkEvent;

class BlockForkEvent extends ForkEvent {
  constructor(blockHash, expiry) {
    if (!(0, _bytes.isHexString)(blockHash, 32)) {
      logger.throwArgumentError("invalid blockHash", "blockHash", blockHash);
    }

    super({
      _isForkEvent: true,
      _isBlockForkEvent: true,
      expiry: expiry || 0,
      blockHash: blockHash
    });
  }

}

exports.BlockForkEvent = BlockForkEvent;

class TransactionForkEvent extends ForkEvent {
  constructor(hash, expiry) {
    if (!(0, _bytes.isHexString)(hash, 32)) {
      logger.throwArgumentError("invalid transaction hash", "hash", hash);
    }

    super({
      _isForkEvent: true,
      _isTransactionForkEvent: true,
      expiry: expiry || 0,
      hash: hash
    });
  }

}

exports.TransactionForkEvent = TransactionForkEvent;

class TransactionOrderForkEvent extends ForkEvent {
  constructor(beforeHash, afterHash, expiry) {
    if (!(0, _bytes.isHexString)(beforeHash, 32)) {
      logger.throwArgumentError("invalid transaction hash", "beforeHash", beforeHash);
    }

    if (!(0, _bytes.isHexString)(afterHash, 32)) {
      logger.throwArgumentError("invalid transaction hash", "afterHash", afterHash);
    }

    super({
      _isForkEvent: true,
      _isTransactionOrderForkEvent: true,
      expiry: expiry || 0,
      beforeHash: beforeHash,
      afterHash: afterHash
    });
  }

} ///////////////////////////////
// Exported Abstracts


exports.TransactionOrderForkEvent = TransactionOrderForkEvent;

class Provider {
  constructor() {
    logger.checkAbstract(new.target, Provider);
    (0, _properties.defineReadOnly)(this, "_isProvider", true);
  }

  getFeeData() {
    return __awaiter(this, void 0, void 0, function* () {
      const {
        block,
        gasPrice
      } = yield (0, _properties.resolveProperties)({
        block: this.getBlock("latest"),
        gasPrice: this.getGasPrice().catch(error => {
          // @TODO: Why is this now failing on Calaveras?
          //console.log(error);
          return null;
        })
      });
      let maxFeePerGas = null,
          maxPriorityFeePerGas = null;

      if (block && block.baseFeePerGas) {
        // We may want to compute this more accurately in the future,
        // using the formula "check if the base fee is correct".
        // See: https://eips.ethereum.org/EIPS/eip-1559
        maxPriorityFeePerGas = _bignumber.BigNumber.from("2500000000");
        maxFeePerGas = block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas);
      }

      return {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasPrice
      };
    });
  } // Alias for "on"


  addListener(eventName, listener) {
    return this.on(eventName, listener);
  } // Alias for "off"


  removeListener(eventName, listener) {
    return this.off(eventName, listener);
  }

  static isProvider(value) {
    return !!(value && value._isProvider);
  }

}

exports.Provider = Provider;
},{"@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"n8Iw"}],"Kg3c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "abstract-signer/5.5.0";
exports.version = version;
},{}],"l8eZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoidSigner = exports.Signer = void 0;

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);
const allowedTransactionKeys = ["accessList", "chainId", "customData", "data", "from", "gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"];
const forwardErrors = [_logger.Logger.errors.INSUFFICIENT_FUNDS, _logger.Logger.errors.NONCE_EXPIRED, _logger.Logger.errors.REPLACEMENT_UNDERPRICED];
;
;

class Signer {
  ///////////////////
  // Sub-classes MUST call super
  constructor() {
    logger.checkAbstract(new.target, Signer);
    (0, _properties.defineReadOnly)(this, "_isSigner", true);
  } ///////////////////
  // Sub-classes MAY override these


  getBalance(blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("getBalance");

      return yield this.provider.getBalance(this.getAddress(), blockTag);
    });
  }

  getTransactionCount(blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("getTransactionCount");

      return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
    });
  } // Populates "from" if unspecified, and estimates the gas for the transaction


  estimateGas(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("estimateGas");

      const tx = yield (0, _properties.resolveProperties)(this.checkTransaction(transaction));
      return yield this.provider.estimateGas(tx);
    });
  } // Populates "from" if unspecified, and calls with the transaction


  call(transaction, blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("call");

      const tx = yield (0, _properties.resolveProperties)(this.checkTransaction(transaction));
      return yield this.provider.call(tx, blockTag);
    });
  } // Populates all fields in a transaction, signs it and sends it to the network


  sendTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("sendTransaction");

      const tx = yield this.populateTransaction(transaction);
      const signedTx = yield this.signTransaction(tx);
      return yield this.provider.sendTransaction(signedTx);
    });
  }

  getChainId() {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("getChainId");

      const network = yield this.provider.getNetwork();
      return network.chainId;
    });
  }

  getGasPrice() {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("getGasPrice");

      return yield this.provider.getGasPrice();
    });
  }

  getFeeData() {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("getFeeData");

      return yield this.provider.getFeeData();
    });
  }

  resolveName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      this._checkProvider("resolveName");

      return yield this.provider.resolveName(name);
    });
  } // Checks a transaction does not contain invalid keys and if
  // no "from" is provided, populates it.
  // - does NOT require a provider
  // - adds "from" is not present
  // - returns a COPY (safe to mutate the result)
  // By default called from: (overriding these prevents it)
  //   - call
  //   - estimateGas
  //   - populateTransaction (and therefor sendTransaction)


  checkTransaction(transaction) {
    for (const key in transaction) {
      if (allowedTransactionKeys.indexOf(key) === -1) {
        logger.throwArgumentError("invalid transaction key: " + key, "transaction", transaction);
      }
    }

    const tx = (0, _properties.shallowCopy)(transaction);

    if (tx.from == null) {
      tx.from = this.getAddress();
    } else {
      // Make sure any provided address matches this signer
      tx.from = Promise.all([Promise.resolve(tx.from), this.getAddress()]).then(result => {
        if (result[0].toLowerCase() !== result[1].toLowerCase()) {
          logger.throwArgumentError("from address mismatch", "transaction", transaction);
        }

        return result[0];
      });
    }

    return tx;
  } // Populates ALL keys for a transaction and checks that "from" matches
  // this Signer. Should be used by sendTransaction but NOT by signTransaction.
  // By default called from: (overriding these prevents it)
  //   - sendTransaction
  //
  // Notes:
  //  - We allow gasPrice for EIP-1559 as long as it matches maxFeePerGas


  populateTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      const tx = yield (0, _properties.resolveProperties)(this.checkTransaction(transaction));

      if (tx.to != null) {
        tx.to = Promise.resolve(tx.to).then(to => __awaiter(this, void 0, void 0, function* () {
          if (to == null) {
            return null;
          }

          const address = yield this.resolveName(to);

          if (address == null) {
            logger.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
          }

          return address;
        })); // Prevent this error from causing an UnhandledPromiseException

        tx.to.catch(error => {});
      } // Do not allow mixing pre-eip-1559 and eip-1559 properties


      const hasEip1559 = tx.maxFeePerGas != null || tx.maxPriorityFeePerGas != null;

      if (tx.gasPrice != null && (tx.type === 2 || hasEip1559)) {
        logger.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", transaction);
      } else if ((tx.type === 0 || tx.type === 1) && hasEip1559) {
        logger.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", transaction);
      }

      if ((tx.type === 2 || tx.type == null) && tx.maxFeePerGas != null && tx.maxPriorityFeePerGas != null) {
        // Fully-formed EIP-1559 transaction (skip getFeeData)
        tx.type = 2;
      } else if (tx.type === 0 || tx.type === 1) {
        // Explicit Legacy or EIP-2930 transaction
        // Populate missing gasPrice
        if (tx.gasPrice == null) {
          tx.gasPrice = this.getGasPrice();
        }
      } else {
        // We need to get fee data to determine things
        const feeData = yield this.getFeeData();

        if (tx.type == null) {
          // We need to auto-detect the intended type of this transaction...
          if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
            // The network supports EIP-1559!
            // Upgrade transaction from null to eip-1559
            tx.type = 2;

            if (tx.gasPrice != null) {
              // Using legacy gasPrice property on an eip-1559 network,
              // so use gasPrice as both fee properties
              const gasPrice = tx.gasPrice;
              delete tx.gasPrice;
              tx.maxFeePerGas = gasPrice;
              tx.maxPriorityFeePerGas = gasPrice;
            } else {
              // Populate missing fee data
              if (tx.maxFeePerGas == null) {
                tx.maxFeePerGas = feeData.maxFeePerGas;
              }

              if (tx.maxPriorityFeePerGas == null) {
                tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
              }
            }
          } else if (feeData.gasPrice != null) {
            // Network doesn't support EIP-1559...
            // ...but they are trying to use EIP-1559 properties
            if (hasEip1559) {
              logger.throwError("network does not support EIP-1559", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "populateTransaction"
              });
            } // Populate missing fee data


            if (tx.gasPrice == null) {
              tx.gasPrice = feeData.gasPrice;
            } // Explicitly set untyped transaction to legacy


            tx.type = 0;
          } else {
            // getFeeData has failed us.
            logger.throwError("failed to get consistent fee data", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "signer.getFeeData"
            });
          }
        } else if (tx.type === 2) {
          // Explicitly using EIP-1559
          // Populate missing fee data
          if (tx.maxFeePerGas == null) {
            tx.maxFeePerGas = feeData.maxFeePerGas;
          }

          if (tx.maxPriorityFeePerGas == null) {
            tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
          }
        }
      }

      if (tx.nonce == null) {
        tx.nonce = this.getTransactionCount("pending");
      }

      if (tx.gasLimit == null) {
        tx.gasLimit = this.estimateGas(tx).catch(error => {
          if (forwardErrors.indexOf(error.code) >= 0) {
            throw error;
          }

          return logger.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", _logger.Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
            error: error,
            tx: tx
          });
        });
      }

      if (tx.chainId == null) {
        tx.chainId = this.getChainId();
      } else {
        tx.chainId = Promise.all([Promise.resolve(tx.chainId), this.getChainId()]).then(results => {
          if (results[1] !== 0 && results[0] !== results[1]) {
            logger.throwArgumentError("chainId address mismatch", "transaction", transaction);
          }

          return results[0];
        });
      }

      return yield (0, _properties.resolveProperties)(tx);
    });
  } ///////////////////
  // Sub-classes SHOULD leave these alone


  _checkProvider(operation) {
    if (!this.provider) {
      logger.throwError("missing provider", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: operation || "_checkProvider"
      });
    }
  }

  static isSigner(value) {
    return !!(value && value._isSigner);
  }

}

exports.Signer = Signer;

class VoidSigner extends Signer {
  constructor(address, provider) {
    logger.checkNew(new.target, VoidSigner);
    super();
    (0, _properties.defineReadOnly)(this, "address", address);
    (0, _properties.defineReadOnly)(this, "provider", provider || null);
  }

  getAddress() {
    return Promise.resolve(this.address);
  }

  _fail(message, operation) {
    return Promise.resolve().then(() => {
      logger.throwError(message, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: operation
      });
    });
  }

  signMessage(message) {
    return this._fail("VoidSigner cannot sign messages", "signMessage");
  }

  signTransaction(transaction) {
    return this._fail("VoidSigner cannot sign transactions", "signTransaction");
  }

  _signTypedData(domain, types, value) {
    return this._fail("VoidSigner cannot sign typed data", "signTypedData");
  }

  connect(provider) {
    return new VoidSigner(this.address, provider);
  }

}

exports.VoidSigner = VoidSigner;
},{"@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"Kg3c"}],"PhA8":[function(require,module,exports) {
module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};

},{}],"oxwV":[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],"qhWa":[function(require,module,exports) {
try {
  var util = require('util');
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = require('./inherits_browser.js');
}

},{"./inherits_browser.js":"oxwV"}],"nkOw":[function(require,module,exports) {
'use strict';

var assert = require('minimalistic-assert');
var inherits = require('inherits');

exports.inherits = inherits;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;

},{"minimalistic-assert":"PhA8","inherits":"qhWa"}],"d5ks":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var assert = require('minimalistic-assert');

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};

},{"./utils":"nkOw","minimalistic-assert":"PhA8"}],"DO8W":[function(require,module,exports) {
'use strict';

var utils = require('../utils');
var rotr32 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;

},{"../utils":"nkOw"}],"CO9T":[function(require,module,exports) {
'use strict';

var utils = require('../utils');
var common = require('../common');
var shaCommon = require('./common');

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_5 = utils.sum32_5;
var ft_1 = shaCommon.ft_1;
var BlockHash = common.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

},{"../utils":"nkOw","../common":"d5ks","./common":"DO8W"}],"S4Of":[function(require,module,exports) {
'use strict';

var utils = require('../utils');
var common = require('../common');
var shaCommon = require('./common');
var assert = require('minimalistic-assert');

var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
module.exports = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

},{"../utils":"nkOw","../common":"d5ks","./common":"DO8W","minimalistic-assert":"PhA8"}],"oEQu":[function(require,module,exports) {
'use strict';

var utils = require('../utils');
var SHA256 = require('./256');

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils.inherits(SHA224, SHA256);
module.exports = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils.split32(this.h.slice(0, 7), 'big');
};


},{"../utils":"nkOw","./256":"S4Of"}],"qupt":[function(require,module,exports) {
'use strict';

var utils = require('../utils');
var common = require('../common');
var assert = require('minimalistic-assert');

var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;

var BlockHash = common.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
module.exports = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

},{"../utils":"nkOw","../common":"d5ks","minimalistic-assert":"PhA8"}],"oSXQ":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

var SHA512 = require('./512');

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils.inherits(SHA384, SHA512);
module.exports = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils.split32(this.h.slice(0, 12), 'big');
};

},{"../utils":"nkOw","./512":"qupt"}],"yBIv":[function(require,module,exports) {
'use strict';

exports.sha1 = require('./sha/1');
exports.sha224 = require('./sha/224');
exports.sha256 = require('./sha/256');
exports.sha384 = require('./sha/384');
exports.sha512 = require('./sha/512');

},{"./sha/1":"CO9T","./sha/224":"oEQu","./sha/256":"S4Of","./sha/384":"oSXQ","./sha/512":"qupt"}],"hfbr":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var common = require('./common');

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils.inherits(RIPEMD160, BlockHash);
exports.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'little');
  else
    return utils.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

},{"./utils":"nkOw","./common":"d5ks"}],"Z8Lw":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var assert = require('minimalistic-assert');

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
module.exports = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};

},{"./utils":"nkOw","minimalistic-assert":"PhA8"}],"U6lo":[function(require,module,exports) {
var hash = exports;

hash.utils = require('./hash/utils');
hash.common = require('./hash/common');
hash.sha = require('./hash/sha');
hash.ripemd = require('./hash/ripemd');
hash.hmac = require('./hash/hmac');

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;

},{"./hash/utils":"nkOw","./hash/common":"d5ks","./hash/sha":"yBIv","./hash/ripemd":"hfbr","./hash/hmac":"Z8Lw"}],"d7sA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EC = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _hash = _interopRequireDefault(require("hash.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function (path, base) {
      return commonjsRequire(path, base === undefined || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfPresent(n) {
  return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed(n) {
  return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var a = Object.defineProperty({}, '__esModule', {
    value: true
  });
  Object.keys(n).forEach(function (k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function () {
        return n[k];
      }
    });
  });
  return a;
}

function commonjsRequire() {
  throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var minimalisticAssert = assert;

function assert(val, msg) {
  if (!val) throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r) throw new Error(msg || 'Assertion failed: ' + l + ' != ' + r);
};

var utils_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  var utils = exports;

  function toArray(msg, enc) {
    if (Array.isArray(msg)) return msg.slice();
    if (!msg) return [];
    var res = [];

    if (typeof msg !== 'string') {
      for (var i = 0; i < msg.length; i++) res[i] = msg[i] | 0;

      return res;
    }

    if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0) msg = '0' + msg;

      for (var i = 0; i < msg.length; i += 2) res.push(parseInt(msg[i] + msg[i + 1], 16));
    } else {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi) res.push(hi, lo);else res.push(lo);
      }
    }

    return res;
  }

  utils.toArray = toArray;

  function zero2(word) {
    if (word.length === 1) return '0' + word;else return word;
  }

  utils.zero2 = zero2;

  function toHex(msg) {
    var res = '';

    for (var i = 0; i < msg.length; i++) res += zero2(msg[i].toString(16));

    return res;
  }

  utils.toHex = toHex;

  utils.encode = function encode(arr, enc) {
    if (enc === 'hex') return toHex(arr);else return arr;
  };
});
var utils_1$1 = createCommonjsModule(function (module, exports) {
  'use strict';

  var utils = exports;
  utils.assert = minimalisticAssert;
  utils.toArray = utils_1.toArray;
  utils.zero2 = utils_1.zero2;
  utils.toHex = utils_1.toHex;
  utils.encode = utils_1.encode; // Represent num in a w-NAF form

  function getNAF(num, w, bits) {
    var naf = new Array(Math.max(num.bitLength(), bits) + 1);
    naf.fill(0);
    var ws = 1 << w + 1;
    var k = num.clone();

    for (var i = 0; i < naf.length; i++) {
      var z;
      var mod = k.andln(ws - 1);

      if (k.isOdd()) {
        if (mod > (ws >> 1) - 1) z = (ws >> 1) - mod;else z = mod;
        k.isubn(z);
      } else {
        z = 0;
      }

      naf[i] = z;
      k.iushrn(1);
    }

    return naf;
  }

  utils.getNAF = getNAF; // Represent k1, k2 in a Joint Sparse Form

  function getJSF(k1, k2) {
    var jsf = [[], []];
    k1 = k1.clone();
    k2 = k2.clone();
    var d1 = 0;
    var d2 = 0;
    var m8;

    while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
      // First phase
      var m14 = k1.andln(3) + d1 & 3;
      var m24 = k2.andln(3) + d2 & 3;
      if (m14 === 3) m14 = -1;
      if (m24 === 3) m24 = -1;
      var u1;

      if ((m14 & 1) === 0) {
        u1 = 0;
      } else {
        m8 = k1.andln(7) + d1 & 7;
        if ((m8 === 3 || m8 === 5) && m24 === 2) u1 = -m14;else u1 = m14;
      }

      jsf[0].push(u1);
      var u2;

      if ((m24 & 1) === 0) {
        u2 = 0;
      } else {
        m8 = k2.andln(7) + d2 & 7;
        if ((m8 === 3 || m8 === 5) && m14 === 2) u2 = -m24;else u2 = m24;
      }

      jsf[1].push(u2); // Second phase

      if (2 * d1 === u1 + 1) d1 = 1 - d1;
      if (2 * d2 === u2 + 1) d2 = 1 - d2;
      k1.iushrn(1);
      k2.iushrn(1);
    }

    return jsf;
  }

  utils.getJSF = getJSF;

  function cachedProperty(obj, name, computer) {
    var key = '_' + name;

    obj.prototype[name] = function cachedProperty() {
      return this[key] !== undefined ? this[key] : this[key] = computer.call(this);
    };
  }

  utils.cachedProperty = cachedProperty;

  function parseBytes(bytes) {
    return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') : bytes;
  }

  utils.parseBytes = parseBytes;

  function intFromLE(bytes) {
    return new _bn.default(bytes, 'hex', 'le');
  }

  utils.intFromLE = intFromLE;
});
'use strict';

var getNAF = utils_1$1.getNAF;
var getJSF = utils_1$1.getJSF;
var assert$1 = utils_1$1.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new _bn.default(conf.p, 16); // Use Montgomery, when there is no fast reduction for the prime

  this.red = conf.prime ? _bn.default.red(conf.prime) : _bn.default.mont(this.p); // Useful for many curves

  this.zero = new _bn.default(0).toRed(this.red);
  this.one = new _bn.default(1).toRed(this.red);
  this.two = new _bn.default(2).toRed(this.red); // Curve configuration, optional

  this.n = conf.n && new _bn.default(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed); // Temporary arrays

  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);
  this._bitLength = this.n ? this.n.bitLength() : 0; // Generalized Greg Maxwell's trick

  var adjustCount = this.n && this.p.div(this.n);

  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}

var base = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert$1(p.precomputed);

  var doubles = p._getDoubles();

  var naf = getNAF(k, 1, this._bitLength);
  var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3; // Translate into more windowed form

  var repr = [];
  var j;
  var nafW;

  for (j = 0; j < naf.length; j += doubles.step) {
    nafW = 0;

    for (var l = j + doubles.step - 1; l >= j; l--) nafW = (nafW << 1) + naf[l];

    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);

  for (var i = I; i > 0; i--) {
    for (j = 0; j < repr.length; j++) {
      nafW = repr[j];
      if (nafW === i) b = b.mixedAdd(doubles.points[j]);else if (nafW === -i) b = b.mixedAdd(doubles.points[j].neg());
    }

    a = a.add(b);
  }

  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4; // Precompute window

  var nafPoints = p._getNAFPoints(w);

  w = nafPoints.wnd;
  var wnd = nafPoints.points; // Get NAF form

  var naf = getNAF(k, w, this._bitLength); // Add `this`*(N+1) for every w-NAF index

  var acc = this.jpoint(null, null, null);

  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var l = 0; i >= 0 && naf[i] === 0; i--) l++;

    if (i >= 0) l++;
    acc = acc.dblp(l);
    if (i < 0) break;
    var z = naf[i];
    assert$1(z !== 0);

    if (p.type === 'affine') {
      // J +- P
      if (z > 0) acc = acc.mixedAdd(wnd[z - 1 >> 1]);else acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
    } else {
      // J +- J
      if (z > 0) acc = acc.add(wnd[z - 1 >> 1]);else acc = acc.add(wnd[-z - 1 >> 1].neg());
    }
  }

  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3; // Fill all arrays

  var max = 0;
  var i;
  var j;
  var p;

  for (i = 0; i < len; i++) {
    p = points[i];

    var nafPoints = p._getNAFPoints(defW);

    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  } // Comb small window NAFs


  for (i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;

    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
      naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [points[a],
    /* 1 */
    null,
    /* 3 */
    null,
    /* 5 */
    points[b]
    /* 7 */
    ]; // Try to avoid Projective points, if possible

    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [-3,
    /* -1 -1 */
    -1,
    /* -1 0 */
    -5,
    /* -1 1 */
    -7,
    /* 0 -1 */
    0,
    /* 0 0 */
    7,
    /* 0 1 */
    5,
    /* 1 -1 */
    1,
    /* 1 0 */
    3
    /* 1 1 */
    ];
    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);

    for (j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;
      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;

  for (i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;

      for (j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0) zero = false;
      }

      if (!zero) break;
      k++;
      i--;
    }

    if (i >= 0) k++;
    acc = acc.dblp(k);
    if (i < 0) break;

    for (j = 0; j < len; j++) {
      var z = tmp[j];
      p;
      if (z === 0) continue;else if (z > 0) p = wnd[j][z - 1 >> 1];else if (z < 0) p = wnd[j][-z - 1 >> 1].neg();
      if (p.type === 'affine') acc = acc.mixedAdd(p);else acc = acc.add(p);
    }
  } // Zeroify references


  for (i = 0; i < len; i++) wnd[i] = null;

  if (jacobianResult) return acc;else return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}

BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function
  /*other*/
eq() {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils_1$1.toArray(bytes, enc);
  var len = this.p.byteLength(); // uncompressed, hybrid-odd, hybrid-even

  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) && bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06) assert$1(bytes[bytes.length - 1] % 2 === 0);else if (bytes[0] === 0x07) assert$1(bytes[bytes.length - 1] % 2 === 1);
    var res = this.point(bytes.slice(1, 1 + len), bytes.slice(1 + len, 1 + 2 * len));
    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) && bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }

  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);
  if (compact) return [this.getY().isEven() ? 0x02 : 0x03].concat(x);
  return [0x04].concat(x, this.getY().toArray('be', len));
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils_1$1.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed) return this;
  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;
  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed) return false;
  var doubles = this.precomputed.doubles;
  if (!doubles) return false;
  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
  var doubles = [this];
  var acc = this;

  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++) acc = acc.dbl();

    doubles.push(acc);
  }

  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
  var res = [this];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();

  for (var i = 1; i < max; i++) res[i] = res[i - 1].add(dbl);

  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;

  for (var i = 0; i < k; i++) r = r.dbl();

  return r;
};

var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;

        var TempCtor = function () {};

        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});
'use strict';

var assert$2 = utils_1$1.assert;

function ShortCurve(conf) {
  base.call(this, 'short', conf);
  this.a = new _bn.default(conf.a, 16).toRed(this.red);
  this.b = new _bn.default(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();
  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0; // If the curve is endomorphic, precalculate beta and lambda

  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}

inherits_browser(ShortCurve, base);
var short_1 = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1) return; // Compute beta and lambda, that lambda * P = (beta * Px; Py)

  var beta;
  var lambda;

  if (conf.beta) {
    beta = new _bn.default(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p); // Choose the smallest beta


    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }

  if (conf.lambda) {
    lambda = new _bn.default(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);

    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  } // Get basis vectors, used for balanced length-two representation


  var basis;

  if (conf.basis) {
    basis = conf.basis.map(function (vec) {
      return {
        a: new _bn.default(vec.a, 16),
        b: new _bn.default(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : _bn.default.mont(num);
  var tinv = new _bn.default(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();
  var s = new _bn.default(3).toRed(red).redNeg().redSqrt().redMul(tinv);
  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [l1, l2];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2)); // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt

  var u = lambda;
  var v = this.n.clone();
  var x1 = new _bn.default(1);
  var y1 = new _bn.default(0);
  var x2 = new _bn.default(0);
  var y2 = new _bn.default(1); // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)

  var a0;
  var b0; // First vector

  var a1;
  var b1; // Second vector

  var a2;
  var b2;
  var prevR;
  var i = 0;
  var r;
  var x;

  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }

    prevR = r;
    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }

  a2 = r.neg();
  b2 = x;
  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());

  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  } // Normalize signs


  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }

  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [{
    a: a1,
    b: b1
  }, {
    a: a2,
    b: b2
  }];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];
  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);
  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b); // Calculate answer

  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return {
    k1: k1,
    k2: k2
  };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new _bn.default(x, 16);
  if (!x.red) x = x.toRed(this.red);
  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0) throw new Error('invalid point'); // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd) y = y.redNeg();
  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf) return true;
  var x = point.x;
  var y = point.y;
  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;

  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);

    var p = points[i];

    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }

    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }

  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult); // Clean-up references to points and coefficients


  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }

  return res;
};

function Point(curve, x, y, isRed) {
  base.BasePoint.call(this, curve, 'affine');

  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new _bn.default(x, 16);
    this.y = new _bn.default(y, 16); // Force redgomery representation when loading from JSON

    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }

    if (!this.x.red) this.x = this.x.toRed(this.curve.red);
    if (!this.y.red) this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}

inherits_browser(Point, base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo) return;
  var pre = this.precomputed;
  if (pre && pre.beta) return pre.beta;
  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);

  if (pre) {
    var curve = this.curve;

    var endoMul = function (p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };

    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }

  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed) return [this.x, this.y];
  return [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string') obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2]) return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [res].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [res].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity()) return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) + ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf) return p; // P + O = P

  if (p.inf) return this; // P + P = 2P

  if (this.eq(p)) return this.dbl(); // P + (-P) = O

  if (this.neg().eq(p)) return this.curve.point(null, null); // P + Q = O

  if (this.x.cmp(p.x) === 0) return this.curve.point(null, null);
  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0) c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf) return this; // 2P = O

  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0) return this.curve.point(null, null);
  var a = this.curve.a;
  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new _bn.default(k, 16);
  if (this.isInfinity()) return this;else if (this._hasDoubles(k)) return this.curve._fixedNafMul(this, k);else if (this.curve.endo) return this.curve._endoWnafMulAdd([this], [k]);else return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [this, p2];
  var coeffs = [k1, k2];
  if (this.curve.endo) return this.curve._endoWnafMulAdd(points, coeffs);else return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [this, p2];
  var coeffs = [k1, k2];
  if (this.curve.endo) return this.curve._endoWnafMulAdd(points, coeffs, true);else return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf) return this;
  var res = this.curve.point(this.x, this.y.redNeg());

  if (_precompute && this.precomputed) {
    var pre = this.precomputed;

    var negate = function (p) {
      return p.neg();
    };

    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }

  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf) return this.curve.jpoint(null, null, null);
  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  base.BasePoint.call(this, curve, 'jacobian');

  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new _bn.default(0);
  } else {
    this.x = new _bn.default(x, 16);
    this.y = new _bn.default(y, 16);
    this.z = new _bn.default(z, 16);
  }

  if (!this.x.red) this.x = this.x.toRed(this.curve.red);
  if (!this.y.red) this.y = this.y.toRed(this.curve.red);
  if (!this.z.red) this.z = this.z.toRed(this.curve.red);
  this.zOne = this.z === this.curve.one;
}

inherits_browser(JPoint, base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity()) return this.curve.point(null, null);
  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);
  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity()) return p; // P + O = P

  if (p.isInfinity()) return this; // 12M + 4S + 7A

  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));
  var h = u1.redSub(u2);
  var r = s1.redSub(s2);

  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0) return this.curve.jpoint(null, null, null);else return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);
  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);
  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity()) return p.toJ(); // P + O = P

  if (p.isInfinity()) return this; // 8M + 3S + 7A

  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);
  var h = u1.redSub(u2);
  var r = s1.redSub(s2);

  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0) return this.curve.jpoint(null, null, null);else return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);
  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);
  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0) return this;
  if (this.isInfinity()) return this;
  if (!pow) return this.dbl();
  var i;

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;

    for (i = 0; i < pow; i++) r = r.dbl();

    return r;
  } // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A


  var a = this.curve.a;
  var tinv = this.curve.tinv;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr(); // Reuse results

  var jyd = jy.redAdd(jy);

  for (i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow) jz4 = jz4.redMul(jyd4);
    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity()) return this;
  if (this.curve.zeroA) return this._zeroDbl();else if (this.curve.threeA) return this._threeDbl();else return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz; // Z = 1

  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A
    // XX = X1^2
    var xx = this.x.redSqr(); // YY = Y1^2

    var yy = this.y.redSqr(); // YYYY = YY^2

    var yyyy = yy.redSqr(); // S = 2 * ((X1 + YY)^2 - XX - YYYY)

    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s); // M = 3 * XX + a; a = 0

    var m = xx.redAdd(xx).redIAdd(xx); // T = M ^ 2 - 2*S

    var t = m.redSqr().redISub(s).redISub(s); // 8 * YYYY

    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8); // X3 = T

    nx = t; // Y3 = M * (S - T) - 8 * YYYY

    ny = m.redMul(s.redISub(t)).redISub(yyyy8); // Z3 = 2*Y1

    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A
    // A = X1^2
    var a = this.x.redSqr(); // B = Y1^2

    var b = this.y.redSqr(); // C = B^2

    var c = b.redSqr(); // D = 2 * ((X1 + B)^2 - A - C)

    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d); // E = 3 * A

    var e = a.redAdd(a).redIAdd(a); // F = E^2

    var f = e.redSqr(); // 8 * C

    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8); // X3 = F - 2 * D

    nx = f.redISub(d).redISub(d); // Y3 = E * (D - X3) - 8 * C

    ny = e.redMul(d.redISub(nx)).redISub(c8); // Z3 = 2 * Y1 * Z1

    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz; // Z = 1

  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A
    // XX = X1^2
    var xx = this.x.redSqr(); // YY = Y1^2

    var yy = this.y.redSqr(); // YYYY = YY^2

    var yyyy = yy.redSqr(); // S = 2 * ((X1 + YY)^2 - XX - YYYY)

    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s); // M = 3 * XX + a

    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a); // T = M^2 - 2 * S

    var t = m.redSqr().redISub(s).redISub(s); // X3 = T

    nx = t; // Y3 = M * (S - T) - 8 * YYYY

    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8); // Z3 = 2 * Y1

    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S
    // delta = Z1^2
    var delta = this.z.redSqr(); // gamma = Y1^2

    var gamma = this.y.redSqr(); // beta = X1 * gamma

    var beta = this.x.redMul(gamma); // alpha = 3 * (X1 - delta) * (X1 + delta)

    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha); // X3 = alpha^2 - 8 * beta

    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8); // Z3 = (Y1 + Z1)^2 - gamma - delta

    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta); // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2

    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a; // 4M + 6S + 10A

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();
  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);
  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);
  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA) return this.dbl().add(this); // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...
  // XX = X1^2

  var xx = this.x.redSqr(); // YY = Y1^2

  var yy = this.y.redSqr(); // ZZ = Z1^2

  var zz = this.z.redSqr(); // YYYY = YY^2

  var yyyy = yy.redSqr(); // M = 3 * XX + a * ZZ2; a = 0

  var m = xx.redAdd(xx).redIAdd(xx); // MM = M^2

  var mm = m.redSqr(); // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM

  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm); // EE = E^2

  var ee = e.redSqr(); // T = 16*YYYY

  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t); // U = (M + E)^2 - MM - EE - T

  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t); // X3 = 4 * (X1 * EE - 4 * YY * U)

  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx); // Y3 = 8 * Y1 * (U * (T - U) - E * EE)

  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny); // Z3 = (Z1 + E)^2 - ZZ - EE

  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new _bn.default(k, kbase);
  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine') return this.eq(p.toJ());
  if (this === p) return true; // x1 * z2^2 == x2 * z1^2

  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0) return false; // y1 * z2^3 == y2 * z1^3

  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0) return true;
  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);

  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0) return false;
    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0) return true;
  }
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity()) return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) + ' y: ' + this.y.toString(16, 2) + ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

var curve_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  var curve = exports;
  curve.base = base;
  curve.short = short_1;
  curve.mont =
  /*RicMoo:ethers:require(./mont)*/
  null;
  curve.edwards =
  /*RicMoo:ethers:require(./edwards)*/
  null;
});
var curves_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  var curves = exports;
  var assert = utils_1$1.assert;

  function PresetCurve(options) {
    if (options.type === 'short') this.curve = new curve_1.short(options);else if (options.type === 'edwards') this.curve = new curve_1.edwards(options);else this.curve = new curve_1.mont(options);
    this.g = this.curve.g;
    this.n = this.curve.n;
    this.hash = options.hash;
    assert(this.g.validate(), 'Invalid curve');
    assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
  }

  curves.PresetCurve = PresetCurve;

  function defineCurve(name, options) {
    Object.defineProperty(curves, name, {
      configurable: true,
      enumerable: true,
      get: function () {
        var curve = new PresetCurve(options);
        Object.defineProperty(curves, name, {
          configurable: true,
          enumerable: true,
          value: curve
        });
        return curve;
      }
    });
  }

  defineCurve('p192', {
    type: 'short',
    prime: 'p192',
    p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
    a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
    b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
    n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
    hash: _hash.default.sha256,
    gRed: false,
    g: ['188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012', '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811']
  });
  defineCurve('p224', {
    type: 'short',
    prime: 'p224',
    p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
    a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
    b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
    n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
    hash: _hash.default.sha256,
    gRed: false,
    g: ['b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21', 'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34']
  });
  defineCurve('p256', {
    type: 'short',
    prime: null,
    p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
    a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
    b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
    n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
    hash: _hash.default.sha256,
    gRed: false,
    g: ['6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296', '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5']
  });
  defineCurve('p384', {
    type: 'short',
    prime: null,
    p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'fffffffe ffffffff 00000000 00000000 ffffffff',
    a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'fffffffe ffffffff 00000000 00000000 fffffffc',
    b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' + '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
    n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' + 'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
    hash: _hash.default.sha384,
    gRed: false,
    g: ['aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' + '5502f25d bf55296c 3a545e38 72760ab7', '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' + '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f']
  });
  defineCurve('p521', {
    type: 'short',
    prime: null,
    p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'ffffffff ffffffff ffffffff ffffffff ffffffff',
    a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'ffffffff ffffffff ffffffff ffffffff fffffffc',
    b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' + '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' + '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
    n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' + 'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' + 'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
    hash: _hash.default.sha512,
    gRed: false,
    g: ['000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' + '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' + 'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66', '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' + '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' + '3fad0761 353c7086 a272c240 88be9476 9fd16650']
  });
  defineCurve('curve25519', {
    type: 'mont',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '76d06',
    b: '1',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    hash: _hash.default.sha256,
    gRed: false,
    g: ['9']
  });
  defineCurve('ed25519', {
    type: 'edwards',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '-1',
    c: '1',
    // -121665 * (121666^(-1)) (mod P)
    d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    hash: _hash.default.sha256,
    gRed: false,
    g: ['216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a', // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658']
  });
  var pre;

  try {
    pre =
    /*RicMoo:ethers:require(./precomputed/secp256k1)*/
    null.crash();
  } catch (e) {
    pre = undefined;
  }

  defineCurve('secp256k1', {
    type: 'short',
    prime: 'k256',
    p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
    a: '0',
    b: '7',
    n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
    h: '1',
    hash: _hash.default.sha256,
    // Precomputed endomorphism
    beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
    lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
    basis: [{
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    }, {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }],
    gRed: false,
    g: ['79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8', pre]
  });
});
'use strict';

function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG)) return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;
  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;
  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;
  var entropy = utils_1.toArray(options.entropy, options.entropyEnc || 'hex');
  var nonce = utils_1.toArray(options.nonce, options.nonceEnc || 'hex');
  var pers = utils_1.toArray(options.pers, options.persEnc || 'hex');
  minimalisticAssert(entropy.length >= this.minEntropy / 8, 'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._init(entropy, nonce, pers);
}

var hmacDrbg = HmacDRBG;

HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);
  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);

  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);

  this._reseed = 1;
  this.reseedInterval = 0x1000000000000; // 2^48
};

HmacDRBG.prototype._hmac = function hmac() {
  return new _hash.default.hmac(this.hash, this.K);
};

HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac().update(this.V).update([0x00]);

  if (seed) kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed) return;
  this.K = this._hmac().update(this.V).update([0x01]).update(seed).digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils_1.toArray(entropy, entropyEnc);
  add = utils_1.toArray(add, addEnc);
  minimalisticAssert(entropy.length >= this.minEntropy / 8, 'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));

  this._reseed = 1;
};

HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this._reseed > this.reseedInterval) throw new Error('Reseed is required'); // Optional encoding

  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  } // Optional additional data


  if (add) {
    add = utils_1.toArray(add, addEnc || 'hex');

    this._update(add);
  }

  var temp = [];

  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);

  this._update(add);

  this._reseed++;
  return utils_1.encode(res, enc);
};

'use strict';

var assert$3 = utils_1$1.assert;

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null; // KeyPair(ec, { priv: ..., pub: ... })

  if (options.priv) this._importPrivate(options.priv, options.privEnc);
  if (options.pub) this._importPublic(options.pub, options.pubEnc);
}

var key = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair) return pub;
  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair) return priv;
  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();
  if (pub.isInfinity()) return {
    result: false,
    reason: 'Invalid public key'
  };
  if (!pub.validate()) return {
    result: false,
    reason: 'Public key is not a point'
  };
  if (!pub.mul(this.ec.curve.n).isInfinity()) return {
    result: false,
    reason: 'Public key * N != O'
  };
  return {
    result: true,
    reason: null
  };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub) this.pub = this.ec.g.mul(this.priv);
  if (!enc) return this.pub;
  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex') return this.priv.toString(16, 2);else return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new _bn.default(key, enc || 16); // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method

  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert$3(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' || this.ec.curve.type === 'edwards') {
      assert$3(key.x && key.y, 'Need both x and y coordinate');
    }

    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }

  this.pub = this.ec.curve.decodePoint(key, enc);
}; // ECDH


KeyPair.prototype.derive = function derive(pub) {
  if (!pub.validate()) {
    assert$3(pub.validate(), 'public point not validated');
  }

  return pub.mul(this.priv).getX();
}; // ECDSA


KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) + ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};

'use strict';

var assert$4 = utils_1$1.assert;

function Signature(options, enc) {
  if (options instanceof Signature) return options;
  if (this._importDER(options, enc)) return;
  assert$4(options.r && options.s, 'Signature without r or s');
  this.r = new _bn.default(options.r, 16);
  this.s = new _bn.default(options.s, 16);
  if (options.recoveryParam === undefined) this.recoveryParam = null;else this.recoveryParam = options.recoveryParam;
}

var signature = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];

  if (!(initial & 0x80)) {
    return initial;
  }

  var octetLen = initial & 0xf; // Indefinite length or overflow

  if (octetLen === 0 || octetLen > 4) {
    return false;
  }

  var val = 0;

  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
    val >>>= 0;
  } // Leading zeroes


  if (val <= 0x7f) {
    return false;
  }

  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;

  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }

  if (i === 0) {
    return buf;
  }

  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils_1$1.toArray(data, enc);
  var p = new Position();

  if (data[p.place++] !== 0x30) {
    return false;
  }

  var len = getLength(data, p);

  if (len === false) {
    return false;
  }

  if (len + p.place !== data.length) {
    return false;
  }

  if (data[p.place++] !== 0x02) {
    return false;
  }

  var rlen = getLength(data, p);

  if (rlen === false) {
    return false;
  }

  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;

  if (data[p.place++] !== 0x02) {
    return false;
  }

  var slen = getLength(data, p);

  if (slen === false) {
    return false;
  }

  if (data.length !== slen + p.place) {
    return false;
  }

  var s = data.slice(p.place, slen + p.place);

  if (r[0] === 0) {
    if (r[1] & 0x80) {
      r = r.slice(1);
    } else {
      // Leading zeroes
      return false;
    }
  }

  if (s[0] === 0) {
    if (s[1] & 0x80) {
      s = s.slice(1);
    } else {
      // Leading zeroes
      return false;
    }
  }

  this.r = new _bn.default(r);
  this.s = new _bn.default(s);
  this.recoveryParam = null;
  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }

  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);

  while (--octets) {
    arr.push(len >>> (octets << 3) & 0xff);
  }

  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray(); // Pad values

  if (r[0] & 0x80) r = [0].concat(r); // Pad values

  if (s[0] & 0x80) s = [0].concat(s);
  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }

  var arr = [0x02];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [0x30];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils_1$1.encode(res, enc);
};

'use strict';

var rand =
/*RicMoo:ethers:require(brorand)*/
function () {
  throw new Error('unsupported');
};

var assert$5 = utils_1$1.assert;

function EC(options) {
  if (!(this instanceof EC)) return new EC(options); // Shortcut `elliptic.ec(curve-name)`

  if (typeof options === 'string') {
    assert$5(Object.prototype.hasOwnProperty.call(curves_1, options), 'Unknown curve ' + options);
    options = curves_1[options];
  } // Shortcut for `elliptic.ec(elliptic.curves.curveName)`


  if (options instanceof curves_1.PresetCurve) options = {
    curve: options
  };
  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g; // Point on curve

  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1); // Hash for function for DRBG

  this.hash = options.hash || options.curve.hash;
}

var ec = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new key(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return key.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return key.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options) options = {}; // Instantiate Hmac_DRBG

  var drbg = new hmacDrbg({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
    entropy: options.entropy || rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
    nonce: this.n.toArray()
  });
  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new _bn.default(2));

  for (;;) {
    var priv = new _bn.default(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0) continue;
    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  }
};

EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0) msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0) return msg.sub(this.n);else return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }

  if (!options) options = {};
  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new _bn.default(msg, 16)); // Zero-extend key to provide enough entropy

  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes); // Zero-extend nonce to have the same byte size as N

  var nonce = msg.toArray('be', bytes); // Instantiate Hmac_DRBG

  var drbg = new hmacDrbg({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8'
  }); // Number of bytes to generate

  var ns1 = this.n.sub(new _bn.default(1));

  for (var iter = 0;; iter++) {
    var k = options.k ? options.k(iter) : new _bn.default(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0) continue;
    var kp = this.g.mul(k);
    if (kp.isInfinity()) continue;
    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0) continue;
    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0) continue;
    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r) !== 0 ? 2 : 0); // Use complement of `s`, if it is > `n / 2`

    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new signature({
      r: r,
      s: s,
      recoveryParam: recoveryParam
    });
  }
};

EC.prototype.verify = function verify(msg, signature$1, key, enc) {
  msg = this._truncateToN(new _bn.default(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature$1 = new signature(signature$1, 'hex'); // Perform primitive values validation

  var r = signature$1.r;
  var s = signature$1.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0) return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return false; // Validate signature

  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);
  var p;

  if (!this.curve._maxwellTrick) {
    p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity()) return false;
    return p.getX().umod(this.n).cmp(r) === 0;
  } // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K


  p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity()) return false; // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`

  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function (msg, signature$1, j, enc) {
  assert$5((3 & j) === j, 'The recovery param is more than two bits');
  signature$1 = new signature(signature$1, enc);
  var n = this.n;
  var e = new _bn.default(msg);
  var r = signature$1.r;
  var s = signature$1.s; // A set LSB signifies that the y-coordinate is odd

  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey) throw new Error('Unable to find sencond key candinate'); // 1.1. Let x = r + jn.

  if (isSecondKey) r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);else r = this.curve.pointFromX(r, isYOdd);
  var rInv = signature$1.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n); // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)

  return this.g.mulAdd(s1, r, s2);
};

EC.prototype.getKeyRecoveryParam = function (e, signature$1, Q, enc) {
  signature$1 = new signature(signature$1, enc);
  if (signature$1.recoveryParam !== null) return signature$1.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;

    try {
      Qprime = this.recoverPubKey(e, signature$1, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q)) return i;
  }

  throw new Error('Unable to find valid recovery factor');
};

var elliptic_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  var elliptic = exports;
  elliptic.version =
  /*RicMoo:ethers*/
  {
    version: "6.5.4"
  }.version;
  elliptic.utils = utils_1$1;

  elliptic.rand =
  /*RicMoo:ethers:require(brorand)*/
  function () {
    throw new Error('unsupported');
  };

  elliptic.curve = curve_1;
  elliptic.curves = curves_1; // Protocols

  elliptic.ec = ec;
  elliptic.eddsa =
  /*RicMoo:ethers:require(./elliptic/eddsa)*/
  null;
});
var EC$1 = elliptic_1.ec;
exports.EC = EC$1;
},{"bn.js":"o7RX","hash.js":"U6lo"}],"ptZO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "signing-key/5.5.0";
exports.version = version;
},{}],"KjI1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SigningKey = void 0;
exports.computePublicKey = computePublicKey;
exports.recoverPublicKey = recoverPublicKey;

var _elliptic = require("./elliptic");

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);
let _curve = null;

function getCurve() {
  if (!_curve) {
    _curve = new _elliptic.EC("secp256k1");
  }

  return _curve;
}

class SigningKey {
  constructor(privateKey) {
    (0, _properties.defineReadOnly)(this, "curve", "secp256k1");
    (0, _properties.defineReadOnly)(this, "privateKey", (0, _bytes.hexlify)(privateKey));
    const keyPair = getCurve().keyFromPrivate((0, _bytes.arrayify)(this.privateKey));
    (0, _properties.defineReadOnly)(this, "publicKey", "0x" + keyPair.getPublic(false, "hex"));
    (0, _properties.defineReadOnly)(this, "compressedPublicKey", "0x" + keyPair.getPublic(true, "hex"));
    (0, _properties.defineReadOnly)(this, "_isSigningKey", true);
  }

  _addPoint(other) {
    const p0 = getCurve().keyFromPublic((0, _bytes.arrayify)(this.publicKey));
    const p1 = getCurve().keyFromPublic((0, _bytes.arrayify)(other));
    return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
  }

  signDigest(digest) {
    const keyPair = getCurve().keyFromPrivate((0, _bytes.arrayify)(this.privateKey));
    const digestBytes = (0, _bytes.arrayify)(digest);

    if (digestBytes.length !== 32) {
      logger.throwArgumentError("bad digest length", "digest", digest);
    }

    const signature = keyPair.sign(digestBytes, {
      canonical: true
    });
    return (0, _bytes.splitSignature)({
      recoveryParam: signature.recoveryParam,
      r: (0, _bytes.hexZeroPad)("0x" + signature.r.toString(16), 32),
      s: (0, _bytes.hexZeroPad)("0x" + signature.s.toString(16), 32)
    });
  }

  computeSharedSecret(otherKey) {
    const keyPair = getCurve().keyFromPrivate((0, _bytes.arrayify)(this.privateKey));
    const otherKeyPair = getCurve().keyFromPublic((0, _bytes.arrayify)(computePublicKey(otherKey)));
    return (0, _bytes.hexZeroPad)("0x" + keyPair.derive(otherKeyPair.getPublic()).toString(16), 32);
  }

  static isSigningKey(value) {
    return !!(value && value._isSigningKey);
  }

}

exports.SigningKey = SigningKey;

function recoverPublicKey(digest, signature) {
  const sig = (0, _bytes.splitSignature)(signature);
  const rs = {
    r: (0, _bytes.arrayify)(sig.r),
    s: (0, _bytes.arrayify)(sig.s)
  };
  return "0x" + getCurve().recoverPubKey((0, _bytes.arrayify)(digest), rs, sig.recoveryParam).encode("hex", false);
}

function computePublicKey(key, compressed) {
  const bytes = (0, _bytes.arrayify)(key);

  if (bytes.length === 32) {
    const signingKey = new SigningKey(bytes);

    if (compressed) {
      return "0x" + getCurve().keyFromPrivate(bytes).getPublic(true, "hex");
    }

    return signingKey.publicKey;
  } else if (bytes.length === 33) {
    if (compressed) {
      return (0, _bytes.hexlify)(bytes);
    }

    return "0x" + getCurve().keyFromPublic(bytes).getPublic(false, "hex");
  } else if (bytes.length === 65) {
    if (!compressed) {
      return (0, _bytes.hexlify)(bytes);
    }

    return "0x" + getCurve().keyFromPublic(bytes).getPublic(true, "hex");
  }

  return logger.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
},{"./elliptic":"d7sA","@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"ptZO"}],"O1ZL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "transactions/5.5.0";
exports.version = version;
},{}],"OW34":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionTypes = void 0;
exports.accessListify = accessListify;
exports.computeAddress = computeAddress;
exports.parse = parse;
exports.recoverAddress = recoverAddress;
exports.serialize = serialize;

var _address = require("@ethersproject/address");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _constants = require("@ethersproject/constants");

var _keccak = require("@ethersproject/keccak256");

var _properties = require("@ethersproject/properties");

var RLP = _interopRequireWildcard(require("@ethersproject/rlp"));

var _signingKey = require("@ethersproject/signing-key");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const logger = new _logger.Logger(_version.version);
var TransactionTypes;
exports.TransactionTypes = TransactionTypes;

(function (TransactionTypes) {
  TransactionTypes[TransactionTypes["legacy"] = 0] = "legacy";
  TransactionTypes[TransactionTypes["eip2930"] = 1] = "eip2930";
  TransactionTypes[TransactionTypes["eip1559"] = 2] = "eip1559";
})(TransactionTypes || (exports.TransactionTypes = TransactionTypes = {}));

; ///////////////////////////////

function handleAddress(value) {
  if (value === "0x") {
    return null;
  }

  return (0, _address.getAddress)(value);
}

function handleNumber(value) {
  if (value === "0x") {
    return _constants.Zero;
  }

  return _bignumber.BigNumber.from(value);
} // Legacy Transaction Fields


const transactionFields = [{
  name: "nonce",
  maxLength: 32,
  numeric: true
}, {
  name: "gasPrice",
  maxLength: 32,
  numeric: true
}, {
  name: "gasLimit",
  maxLength: 32,
  numeric: true
}, {
  name: "to",
  length: 20
}, {
  name: "value",
  maxLength: 32,
  numeric: true
}, {
  name: "data"
}];
const allowedTransactionKeys = {
  chainId: true,
  data: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  type: true,
  value: true
};

function computeAddress(key) {
  const publicKey = (0, _signingKey.computePublicKey)(key);
  return (0, _address.getAddress)((0, _bytes.hexDataSlice)((0, _keccak.keccak256)((0, _bytes.hexDataSlice)(publicKey, 1)), 12));
}

function recoverAddress(digest, signature) {
  return computeAddress((0, _signingKey.recoverPublicKey)((0, _bytes.arrayify)(digest), signature));
}

function formatNumber(value, name) {
  const result = (0, _bytes.stripZeros)(_bignumber.BigNumber.from(value).toHexString());

  if (result.length > 32) {
    logger.throwArgumentError("invalid length for " + name, "transaction:" + name, value);
  }

  return result;
}

function accessSetify(addr, storageKeys) {
  return {
    address: (0, _address.getAddress)(addr),
    storageKeys: (storageKeys || []).map((storageKey, index) => {
      if ((0, _bytes.hexDataLength)(storageKey) !== 32) {
        logger.throwArgumentError("invalid access list storageKey", `accessList[${addr}:${index}]`, storageKey);
      }

      return storageKey.toLowerCase();
    })
  };
}

function accessListify(value) {
  if (Array.isArray(value)) {
    return value.map((set, index) => {
      if (Array.isArray(set)) {
        if (set.length > 2) {
          logger.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${index}]`, set);
        }

        return accessSetify(set[0], set[1]);
      }

      return accessSetify(set.address, set.storageKeys);
    });
  }

  const result = Object.keys(value).map(addr => {
    const storageKeys = value[addr].reduce((accum, storageKey) => {
      accum[storageKey] = true;
      return accum;
    }, {});
    return accessSetify(addr, Object.keys(storageKeys).sort());
  });
  result.sort((a, b) => a.address.localeCompare(b.address));
  return result;
}

function formatAccessList(value) {
  return accessListify(value).map(set => [set.address, set.storageKeys]);
}

function _serializeEip1559(transaction, signature) {
  // If there is an explicit gasPrice, make sure it matches the
  // EIP-1559 fees; otherwise they may not understand what they
  // think they are setting in terms of fee.
  if (transaction.gasPrice != null) {
    const gasPrice = _bignumber.BigNumber.from(transaction.gasPrice);

    const maxFeePerGas = _bignumber.BigNumber.from(transaction.maxFeePerGas || 0);

    if (!gasPrice.eq(maxFeePerGas)) {
      logger.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
        gasPrice,
        maxFeePerGas
      });
    }
  }

  const fields = [formatNumber(transaction.chainId || 0, "chainId"), formatNumber(transaction.nonce || 0, "nonce"), formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"), formatNumber(transaction.gasLimit || 0, "gasLimit"), transaction.to != null ? (0, _address.getAddress)(transaction.to) : "0x", formatNumber(transaction.value || 0, "value"), transaction.data || "0x", formatAccessList(transaction.accessList || [])];

  if (signature) {
    const sig = (0, _bytes.splitSignature)(signature);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push((0, _bytes.stripZeros)(sig.r));
    fields.push((0, _bytes.stripZeros)(sig.s));
  }

  return (0, _bytes.hexConcat)(["0x02", RLP.encode(fields)]);
}

function _serializeEip2930(transaction, signature) {
  const fields = [formatNumber(transaction.chainId || 0, "chainId"), formatNumber(transaction.nonce || 0, "nonce"), formatNumber(transaction.gasPrice || 0, "gasPrice"), formatNumber(transaction.gasLimit || 0, "gasLimit"), transaction.to != null ? (0, _address.getAddress)(transaction.to) : "0x", formatNumber(transaction.value || 0, "value"), transaction.data || "0x", formatAccessList(transaction.accessList || [])];

  if (signature) {
    const sig = (0, _bytes.splitSignature)(signature);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push((0, _bytes.stripZeros)(sig.r));
    fields.push((0, _bytes.stripZeros)(sig.s));
  }

  return (0, _bytes.hexConcat)(["0x01", RLP.encode(fields)]);
} // Legacy Transactions and EIP-155


function _serialize(transaction, signature) {
  (0, _properties.checkProperties)(transaction, allowedTransactionKeys);
  const raw = [];
  transactionFields.forEach(function (fieldInfo) {
    let value = transaction[fieldInfo.name] || [];
    const options = {};

    if (fieldInfo.numeric) {
      options.hexPad = "left";
    }

    value = (0, _bytes.arrayify)((0, _bytes.hexlify)(value, options)); // Fixed-width field

    if (fieldInfo.length && value.length !== fieldInfo.length && value.length > 0) {
      logger.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
    } // Variable-width (with a maximum)


    if (fieldInfo.maxLength) {
      value = (0, _bytes.stripZeros)(value);

      if (value.length > fieldInfo.maxLength) {
        logger.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
      }
    }

    raw.push((0, _bytes.hexlify)(value));
  });
  let chainId = 0;

  if (transaction.chainId != null) {
    // A chainId was provided; if non-zero we'll use EIP-155
    chainId = transaction.chainId;

    if (typeof chainId !== "number") {
      logger.throwArgumentError("invalid transaction.chainId", "transaction", transaction);
    }
  } else if (signature && !(0, _bytes.isBytesLike)(signature) && signature.v > 28) {
    // No chainId provided, but the signature is signing with EIP-155; derive chainId
    chainId = Math.floor((signature.v - 35) / 2);
  } // We have an EIP-155 transaction (chainId was specified and non-zero)


  if (chainId !== 0) {
    raw.push((0, _bytes.hexlify)(chainId)); // @TODO: hexValue?

    raw.push("0x");
    raw.push("0x");
  } // Requesting an unsigned transaction


  if (!signature) {
    return RLP.encode(raw);
  } // The splitSignature will ensure the transaction has a recoveryParam in the
  // case that the signTransaction function only adds a v.


  const sig = (0, _bytes.splitSignature)(signature); // We pushed a chainId and null r, s on for hashing only; remove those

  let v = 27 + sig.recoveryParam;

  if (chainId !== 0) {
    raw.pop();
    raw.pop();
    raw.pop();
    v += chainId * 2 + 8; // If an EIP-155 v (directly or indirectly; maybe _vs) was provided, check it!

    if (sig.v > 28 && sig.v !== v) {
      logger.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature);
    }
  } else if (sig.v !== v) {
    logger.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature);
  }

  raw.push((0, _bytes.hexlify)(v));
  raw.push((0, _bytes.stripZeros)((0, _bytes.arrayify)(sig.r)));
  raw.push((0, _bytes.stripZeros)((0, _bytes.arrayify)(sig.s)));
  return RLP.encode(raw);
}

function serialize(transaction, signature) {
  // Legacy and EIP-155 Transactions
  if (transaction.type == null || transaction.type === 0) {
    if (transaction.accessList != null) {
      logger.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", transaction);
    }

    return _serialize(transaction, signature);
  } // Typed Transactions (EIP-2718)


  switch (transaction.type) {
    case 1:
      return _serializeEip2930(transaction, signature);

    case 2:
      return _serializeEip1559(transaction, signature);

    default:
      break;
  }

  return logger.throwError(`unsupported transaction type: ${transaction.type}`, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "serializeTransaction",
    transactionType: transaction.type
  });
}

function _parseEipSignature(tx, fields, serialize) {
  try {
    const recid = handleNumber(fields[0]).toNumber();

    if (recid !== 0 && recid !== 1) {
      throw new Error("bad recid");
    }

    tx.v = recid;
  } catch (error) {
    logger.throwArgumentError("invalid v for transaction type: 1", "v", fields[0]);
  }

  tx.r = (0, _bytes.hexZeroPad)(fields[1], 32);
  tx.s = (0, _bytes.hexZeroPad)(fields[2], 32);

  try {
    const digest = (0, _keccak.keccak256)(serialize(tx));
    tx.from = recoverAddress(digest, {
      r: tx.r,
      s: tx.s,
      recoveryParam: tx.v
    });
  } catch (error) {
    console.log(error);
  }
}

function _parseEip1559(payload) {
  const transaction = RLP.decode(payload.slice(1));

  if (transaction.length !== 9 && transaction.length !== 12) {
    logger.throwArgumentError("invalid component count for transaction type: 2", "payload", (0, _bytes.hexlify)(payload));
  }

  const maxPriorityFeePerGas = handleNumber(transaction[2]);
  const maxFeePerGas = handleNumber(transaction[3]);
  const tx = {
    type: 2,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    maxPriorityFeePerGas: maxPriorityFeePerGas,
    maxFeePerGas: maxFeePerGas,
    gasPrice: null,
    gasLimit: handleNumber(transaction[4]),
    to: handleAddress(transaction[5]),
    value: handleNumber(transaction[6]),
    data: transaction[7],
    accessList: accessListify(transaction[8])
  }; // Unsigned EIP-1559 Transaction

  if (transaction.length === 9) {
    return tx;
  }

  tx.hash = (0, _keccak.keccak256)(payload);

  _parseEipSignature(tx, transaction.slice(9), _serializeEip1559);

  return tx;
}

function _parseEip2930(payload) {
  const transaction = RLP.decode(payload.slice(1));

  if (transaction.length !== 8 && transaction.length !== 11) {
    logger.throwArgumentError("invalid component count for transaction type: 1", "payload", (0, _bytes.hexlify)(payload));
  }

  const tx = {
    type: 1,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    gasPrice: handleNumber(transaction[2]),
    gasLimit: handleNumber(transaction[3]),
    to: handleAddress(transaction[4]),
    value: handleNumber(transaction[5]),
    data: transaction[6],
    accessList: accessListify(transaction[7])
  }; // Unsigned EIP-2930 Transaction

  if (transaction.length === 8) {
    return tx;
  }

  tx.hash = (0, _keccak.keccak256)(payload);

  _parseEipSignature(tx, transaction.slice(8), _serializeEip2930);

  return tx;
} // Legacy Transactions and EIP-155


function _parse(rawTransaction) {
  const transaction = RLP.decode(rawTransaction);

  if (transaction.length !== 9 && transaction.length !== 6) {
    logger.throwArgumentError("invalid raw transaction", "rawTransaction", rawTransaction);
  }

  const tx = {
    nonce: handleNumber(transaction[0]).toNumber(),
    gasPrice: handleNumber(transaction[1]),
    gasLimit: handleNumber(transaction[2]),
    to: handleAddress(transaction[3]),
    value: handleNumber(transaction[4]),
    data: transaction[5],
    chainId: 0
  }; // Legacy unsigned transaction

  if (transaction.length === 6) {
    return tx;
  }

  try {
    tx.v = _bignumber.BigNumber.from(transaction[6]).toNumber();
  } catch (error) {
    console.log(error);
    return tx;
  }

  tx.r = (0, _bytes.hexZeroPad)(transaction[7], 32);
  tx.s = (0, _bytes.hexZeroPad)(transaction[8], 32);

  if (_bignumber.BigNumber.from(tx.r).isZero() && _bignumber.BigNumber.from(tx.s).isZero()) {
    // EIP-155 unsigned transaction
    tx.chainId = tx.v;
    tx.v = 0;
  } else {
    // Signed Transaction
    tx.chainId = Math.floor((tx.v - 35) / 2);

    if (tx.chainId < 0) {
      tx.chainId = 0;
    }

    let recoveryParam = tx.v - 27;
    const raw = transaction.slice(0, 6);

    if (tx.chainId !== 0) {
      raw.push((0, _bytes.hexlify)(tx.chainId));
      raw.push("0x");
      raw.push("0x");
      recoveryParam -= tx.chainId * 2 + 8;
    }

    const digest = (0, _keccak.keccak256)(RLP.encode(raw));

    try {
      tx.from = recoverAddress(digest, {
        r: (0, _bytes.hexlify)(tx.r),
        s: (0, _bytes.hexlify)(tx.s),
        recoveryParam: recoveryParam
      });
    } catch (error) {
      console.log(error);
    }

    tx.hash = (0, _keccak.keccak256)(rawTransaction);
  }

  tx.type = null;
  return tx;
}

function parse(rawTransaction) {
  const payload = (0, _bytes.arrayify)(rawTransaction); // Legacy and EIP-155 Transactions

  if (payload[0] > 0x7f) {
    return _parse(payload);
  } // Typed Transaction (EIP-2718)


  switch (payload[0]) {
    case 1:
      return _parseEip2930(payload);

    case 2:
      return _parseEip1559(payload);

    default:
      break;
  }

  return logger.throwError(`unsupported transaction type: ${payload[0]}`, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "parseTransaction",
    transactionType: payload[0]
  });
}
},{"@ethersproject/address":"a1wm","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/constants":"FOhG","@ethersproject/keccak256":"g6Gq","@ethersproject/properties":"JuuX","@ethersproject/rlp":"oUFp","@ethersproject/signing-key":"KjI1","@ethersproject/logger":"kMNH","./_version":"O1ZL"}],"fYqP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "contracts/5.5.0";
exports.version = version;
},{}],"PzG9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContractFactory = exports.Contract = exports.BaseContract = void 0;

var _abi = require("@ethersproject/abi");

var _abstractProvider = require("@ethersproject/abstract-provider");

var _abstractSigner = require("@ethersproject/abstract-signer");

var _address = require("@ethersproject/address");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _transactions = require("@ethersproject/transactions");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);
;
; ///////////////////////////////

const allowedTransactionKeys = {
  chainId: true,
  data: true,
  from: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  value: true,
  type: true,
  accessList: true,
  maxFeePerGas: true,
  maxPriorityFeePerGas: true,
  customData: true
};

function resolveName(resolver, nameOrPromise) {
  return __awaiter(this, void 0, void 0, function* () {
    const name = yield nameOrPromise;

    if (typeof name !== "string") {
      logger.throwArgumentError("invalid address or ENS name", "name", name);
    } // If it is already an address, just use it (after adding checksum)


    try {
      return (0, _address.getAddress)(name);
    } catch (error) {}

    if (!resolver) {
      logger.throwError("a provider or signer is needed to resolve ENS names", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "resolveName"
      });
    }

    const address = yield resolver.resolveName(name);

    if (address == null) {
      logger.throwArgumentError("resolver or addr is not configured for ENS name", "name", name);
    }

    return address;
  });
} // Recursively replaces ENS names with promises to resolve the name and resolves all properties


function resolveAddresses(resolver, value, paramType) {
  return __awaiter(this, void 0, void 0, function* () {
    if (Array.isArray(paramType)) {
      return yield Promise.all(paramType.map((paramType, index) => {
        return resolveAddresses(resolver, Array.isArray(value) ? value[index] : value[paramType.name], paramType);
      }));
    }

    if (paramType.type === "address") {
      return yield resolveName(resolver, value);
    }

    if (paramType.type === "tuple") {
      return yield resolveAddresses(resolver, value, paramType.components);
    }

    if (paramType.baseType === "array") {
      if (!Array.isArray(value)) {
        return Promise.reject(logger.makeError("invalid value for array", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "value",
          value
        }));
      }

      return yield Promise.all(value.map(v => resolveAddresses(resolver, v, paramType.arrayChildren)));
    }

    return value;
  });
}

function populateTransaction(contract, fragment, args) {
  return __awaiter(this, void 0, void 0, function* () {
    // If an extra argument is given, it is overrides
    let overrides = {};

    if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
      overrides = (0, _properties.shallowCopy)(args.pop());
    } // Make sure the parameter count matches


    logger.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract"); // Populate "from" override (allow promises)

    if (contract.signer) {
      if (overrides.from) {
        // Contracts with a Signer are from the Signer's frame-of-reference;
        // but we allow overriding "from" if it matches the signer
        overrides.from = (0, _properties.resolveProperties)({
          override: resolveName(contract.signer, overrides.from),
          signer: contract.signer.getAddress()
        }).then(check => __awaiter(this, void 0, void 0, function* () {
          if ((0, _address.getAddress)(check.signer) !== check.override) {
            logger.throwError("Contract with a Signer cannot override from", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "overrides.from"
            });
          }

          return check.override;
        }));
      } else {
        overrides.from = contract.signer.getAddress();
      }
    } else if (overrides.from) {
      overrides.from = resolveName(contract.provider, overrides.from); //} else {
      // Contracts without a signer can override "from", and if
      // unspecified the zero address is used
      //overrides.from = AddressZero;
    } // Wait for all dependencies to be resolved (prefer the signer over the provider)


    const resolved = yield (0, _properties.resolveProperties)({
      args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
      address: contract.resolvedAddress,
      overrides: (0, _properties.resolveProperties)(overrides) || {}
    }); // The ABI coded transaction

    const data = contract.interface.encodeFunctionData(fragment, resolved.args);
    const tx = {
      data: data,
      to: resolved.address
    }; // Resolved Overrides

    const ro = resolved.overrides; // Populate simple overrides

    if (ro.nonce != null) {
      tx.nonce = _bignumber.BigNumber.from(ro.nonce).toNumber();
    }

    if (ro.gasLimit != null) {
      tx.gasLimit = _bignumber.BigNumber.from(ro.gasLimit);
    }

    if (ro.gasPrice != null) {
      tx.gasPrice = _bignumber.BigNumber.from(ro.gasPrice);
    }

    if (ro.maxFeePerGas != null) {
      tx.maxFeePerGas = _bignumber.BigNumber.from(ro.maxFeePerGas);
    }

    if (ro.maxPriorityFeePerGas != null) {
      tx.maxPriorityFeePerGas = _bignumber.BigNumber.from(ro.maxPriorityFeePerGas);
    }

    if (ro.from != null) {
      tx.from = ro.from;
    }

    if (ro.type != null) {
      tx.type = ro.type;
    }

    if (ro.accessList != null) {
      tx.accessList = (0, _transactions.accessListify)(ro.accessList);
    } // If there was no "gasLimit" override, but the ABI specifies a default, use it


    if (tx.gasLimit == null && fragment.gas != null) {
      // Compute the intrinsic gas cost for this transaction
      // @TODO: This is based on the yellow paper as of Petersburg; this is something
      // we may wish to parameterize in v6 as part of the Network object. Since this
      // is always a non-nil to address, we can ignore G_create, but may wish to add
      // similar logic to the ContractFactory.
      let intrinsic = 21000;
      const bytes = (0, _bytes.arrayify)(data);

      for (let i = 0; i < bytes.length; i++) {
        intrinsic += 4;

        if (bytes[i]) {
          intrinsic += 64;
        }
      }

      tx.gasLimit = _bignumber.BigNumber.from(fragment.gas).add(intrinsic);
    } // Populate "value" override


    if (ro.value) {
      const roValue = _bignumber.BigNumber.from(ro.value);

      if (!roValue.isZero() && !fragment.payable) {
        logger.throwError("non-payable method cannot override value", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides.value",
          value: overrides.value
        });
      }

      tx.value = roValue;
    }

    if (ro.customData) {
      tx.customData = (0, _properties.shallowCopy)(ro.customData);
    } // Remove the overrides


    delete overrides.nonce;
    delete overrides.gasLimit;
    delete overrides.gasPrice;
    delete overrides.from;
    delete overrides.value;
    delete overrides.type;
    delete overrides.accessList;
    delete overrides.maxFeePerGas;
    delete overrides.maxPriorityFeePerGas;
    delete overrides.customData; // Make sure there are no stray overrides, which may indicate a
    // typo or using an unsupported key.

    const leftovers = Object.keys(overrides).filter(key => overrides[key] != null);

    if (leftovers.length) {
      logger.throwError(`cannot override ${leftovers.map(l => JSON.stringify(l)).join(",")}`, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "overrides",
        overrides: leftovers
      });
    }

    return tx;
  });
}

function buildPopulate(contract, fragment) {
  return function (...args) {
    return populateTransaction(contract, fragment, args);
  };
}

function buildEstimate(contract, fragment) {
  const signerOrProvider = contract.signer || contract.provider;
  return function (...args) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!signerOrProvider) {
        logger.throwError("estimate require a provider or signer", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "estimateGas"
        });
      }

      const tx = yield populateTransaction(contract, fragment, args);
      return yield signerOrProvider.estimateGas(tx);
    });
  };
}

function addContractWait(contract, tx) {
  const wait = tx.wait.bind(tx);

  tx.wait = confirmations => {
    return wait(confirmations).then(receipt => {
      receipt.events = receipt.logs.map(log => {
        let event = (0, _properties.deepCopy)(log);
        let parsed = null;

        try {
          parsed = contract.interface.parseLog(log);
        } catch (e) {} // Successfully parsed the event log; include it


        if (parsed) {
          event.args = parsed.args;

          event.decode = (data, topics) => {
            return contract.interface.decodeEventLog(parsed.eventFragment, data, topics);
          };

          event.event = parsed.name;
          event.eventSignature = parsed.signature;
        } // Useful operations


        event.removeListener = () => {
          return contract.provider;
        };

        event.getBlock = () => {
          return contract.provider.getBlock(receipt.blockHash);
        };

        event.getTransaction = () => {
          return contract.provider.getTransaction(receipt.transactionHash);
        };

        event.getTransactionReceipt = () => {
          return Promise.resolve(receipt);
        };

        return event;
      });
      return receipt;
    });
  };
}

function buildCall(contract, fragment, collapseSimple) {
  const signerOrProvider = contract.signer || contract.provider;
  return function (...args) {
    return __awaiter(this, void 0, void 0, function* () {
      // Extract the "blockTag" override if present
      let blockTag = undefined;

      if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
        const overrides = (0, _properties.shallowCopy)(args.pop());

        if (overrides.blockTag != null) {
          blockTag = yield overrides.blockTag;
        }

        delete overrides.blockTag;
        args.push(overrides);
      } // If the contract was just deployed, wait until it is mined


      if (contract.deployTransaction != null) {
        yield contract._deployed(blockTag);
      } // Call a node and get the result


      const tx = yield populateTransaction(contract, fragment, args);
      const result = yield signerOrProvider.call(tx, blockTag);

      try {
        let value = contract.interface.decodeFunctionResult(fragment, result);

        if (collapseSimple && fragment.outputs.length === 1) {
          value = value[0];
        }

        return value;
      } catch (error) {
        if (error.code === _logger.Logger.errors.CALL_EXCEPTION) {
          error.address = contract.address;
          error.args = args;
          error.transaction = tx;
        }

        throw error;
      }
    });
  };
}

function buildSend(contract, fragment) {
  return function (...args) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!contract.signer) {
        logger.throwError("sending a transaction requires a signer", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "sendTransaction"
        });
      } // If the contract was just deployed, wait until it is mined


      if (contract.deployTransaction != null) {
        yield contract._deployed();
      }

      const txRequest = yield populateTransaction(contract, fragment, args);
      const tx = yield contract.signer.sendTransaction(txRequest); // Tweak the tx.wait so the receipt has extra properties

      addContractWait(contract, tx);
      return tx;
    });
  };
}

function buildDefault(contract, fragment, collapseSimple) {
  if (fragment.constant) {
    return buildCall(contract, fragment, collapseSimple);
  }

  return buildSend(contract, fragment);
}

function getEventTag(filter) {
  if (filter.address && (filter.topics == null || filter.topics.length === 0)) {
    return "*";
  }

  return (filter.address || "*") + "@" + (filter.topics ? filter.topics.map(topic => {
    if (Array.isArray(topic)) {
      return topic.join("|");
    }

    return topic;
  }).join(":") : "");
}

class RunningEvent {
  constructor(tag, filter) {
    (0, _properties.defineReadOnly)(this, "tag", tag);
    (0, _properties.defineReadOnly)(this, "filter", filter);
    this._listeners = [];
  }

  addListener(listener, once) {
    this._listeners.push({
      listener: listener,
      once: once
    });
  }

  removeListener(listener) {
    let done = false;
    this._listeners = this._listeners.filter(item => {
      if (done || item.listener !== listener) {
        return true;
      }

      done = true;
      return false;
    });
  }

  removeAllListeners() {
    this._listeners = [];
  }

  listeners() {
    return this._listeners.map(i => i.listener);
  }

  listenerCount() {
    return this._listeners.length;
  }

  run(args) {
    const listenerCount = this.listenerCount();
    this._listeners = this._listeners.filter(item => {
      const argsCopy = args.slice(); // Call the callback in the next event loop

      setTimeout(() => {
        item.listener.apply(this, argsCopy);
      }, 0); // Reschedule it if it not "once"

      return !item.once;
    });
    return listenerCount;
  }

  prepareEvent(event) {} // Returns the array that will be applied to an emit


  getEmit(event) {
    return [event];
  }

}

class ErrorRunningEvent extends RunningEvent {
  constructor() {
    super("error", null);
  }

} // @TODO Fragment should inherit Wildcard? and just override getEmit?
//       or have a common abstract super class, with enough constructor
//       options to configure both.
// A Fragment Event will populate all the properties that Wildcard
// will, and additionally dereference the arguments when emitting


class FragmentRunningEvent extends RunningEvent {
  constructor(address, contractInterface, fragment, topics) {
    const filter = {
      address: address
    };
    let topic = contractInterface.getEventTopic(fragment);

    if (topics) {
      if (topic !== topics[0]) {
        logger.throwArgumentError("topic mismatch", "topics", topics);
      }

      filter.topics = topics.slice();
    } else {
      filter.topics = [topic];
    }

    super(getEventTag(filter), filter);
    (0, _properties.defineReadOnly)(this, "address", address);
    (0, _properties.defineReadOnly)(this, "interface", contractInterface);
    (0, _properties.defineReadOnly)(this, "fragment", fragment);
  }

  prepareEvent(event) {
    super.prepareEvent(event);
    event.event = this.fragment.name;
    event.eventSignature = this.fragment.format();

    event.decode = (data, topics) => {
      return this.interface.decodeEventLog(this.fragment, data, topics);
    };

    try {
      event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
    } catch (error) {
      event.args = null;
      event.decodeError = error;
    }
  }

  getEmit(event) {
    const errors = (0, _abi.checkResultErrors)(event.args);

    if (errors.length) {
      throw errors[0].error;
    }

    const args = (event.args || []).slice();
    args.push(event);
    return args;
  }

} // A Wildcard Event will attempt to populate:
//  - event            The name of the event name
//  - eventSignature   The full signature of the event
//  - decode           A function to decode data and topics
//  - args             The decoded data and topics


class WildcardRunningEvent extends RunningEvent {
  constructor(address, contractInterface) {
    super("*", {
      address: address
    });
    (0, _properties.defineReadOnly)(this, "address", address);
    (0, _properties.defineReadOnly)(this, "interface", contractInterface);
  }

  prepareEvent(event) {
    super.prepareEvent(event);

    try {
      const parsed = this.interface.parseLog(event);
      event.event = parsed.name;
      event.eventSignature = parsed.signature;

      event.decode = (data, topics) => {
        return this.interface.decodeEventLog(parsed.eventFragment, data, topics);
      };

      event.args = parsed.args;
    } catch (error) {// No matching event
    }
  }

}

class BaseContract {
  constructor(addressOrName, contractInterface, signerOrProvider) {
    logger.checkNew(new.target, Contract); // @TODO: Maybe still check the addressOrName looks like a valid address or name?
    //address = getAddress(address);

    (0, _properties.defineReadOnly)(this, "interface", (0, _properties.getStatic)(new.target, "getInterface")(contractInterface));

    if (signerOrProvider == null) {
      (0, _properties.defineReadOnly)(this, "provider", null);
      (0, _properties.defineReadOnly)(this, "signer", null);
    } else if (_abstractSigner.Signer.isSigner(signerOrProvider)) {
      (0, _properties.defineReadOnly)(this, "provider", signerOrProvider.provider || null);
      (0, _properties.defineReadOnly)(this, "signer", signerOrProvider);
    } else if (_abstractProvider.Provider.isProvider(signerOrProvider)) {
      (0, _properties.defineReadOnly)(this, "provider", signerOrProvider);
      (0, _properties.defineReadOnly)(this, "signer", null);
    } else {
      logger.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
    }

    (0, _properties.defineReadOnly)(this, "callStatic", {});
    (0, _properties.defineReadOnly)(this, "estimateGas", {});
    (0, _properties.defineReadOnly)(this, "functions", {});
    (0, _properties.defineReadOnly)(this, "populateTransaction", {});
    (0, _properties.defineReadOnly)(this, "filters", {});
    {
      const uniqueFilters = {};
      Object.keys(this.interface.events).forEach(eventSignature => {
        const event = this.interface.events[eventSignature];
        (0, _properties.defineReadOnly)(this.filters, eventSignature, (...args) => {
          return {
            address: this.address,
            topics: this.interface.encodeFilterTopics(event, args)
          };
        });

        if (!uniqueFilters[event.name]) {
          uniqueFilters[event.name] = [];
        }

        uniqueFilters[event.name].push(eventSignature);
      });
      Object.keys(uniqueFilters).forEach(name => {
        const filters = uniqueFilters[name];

        if (filters.length === 1) {
          (0, _properties.defineReadOnly)(this.filters, name, this.filters[filters[0]]);
        } else {
          logger.warn(`Duplicate definition of ${name} (${filters.join(", ")})`);
        }
      });
    }
    (0, _properties.defineReadOnly)(this, "_runningEvents", {});
    (0, _properties.defineReadOnly)(this, "_wrappedEmits", {});

    if (addressOrName == null) {
      logger.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
    }

    (0, _properties.defineReadOnly)(this, "address", addressOrName);

    if (this.provider) {
      (0, _properties.defineReadOnly)(this, "resolvedAddress", resolveName(this.provider, addressOrName));
    } else {
      try {
        (0, _properties.defineReadOnly)(this, "resolvedAddress", Promise.resolve((0, _address.getAddress)(addressOrName)));
      } catch (error) {
        // Without a provider, we cannot use ENS names
        logger.throwError("provider is required to use ENS name as contract address", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new Contract"
        });
      }
    }

    const uniqueNames = {};
    const uniqueSignatures = {};
    Object.keys(this.interface.functions).forEach(signature => {
      const fragment = this.interface.functions[signature]; // Check that the signature is unique; if not the ABI generation has
      // not been cleaned or may be incorrectly generated

      if (uniqueSignatures[signature]) {
        logger.warn(`Duplicate ABI entry for ${JSON.stringify(signature)}`);
        return;
      }

      uniqueSignatures[signature] = true; // Track unique names; we only expose bare named functions if they
      // are ambiguous

      {
        const name = fragment.name;

        if (!uniqueNames[`%${name}`]) {
          uniqueNames[`%${name}`] = [];
        }

        uniqueNames[`%${name}`].push(signature);
      }

      if (this[signature] == null) {
        (0, _properties.defineReadOnly)(this, signature, buildDefault(this, fragment, true));
      } // We do not collapse simple calls on this bucket, which allows
      // frameworks to safely use this without introspection as well as
      // allows decoding error recovery.


      if (this.functions[signature] == null) {
        (0, _properties.defineReadOnly)(this.functions, signature, buildDefault(this, fragment, false));
      }

      if (this.callStatic[signature] == null) {
        (0, _properties.defineReadOnly)(this.callStatic, signature, buildCall(this, fragment, true));
      }

      if (this.populateTransaction[signature] == null) {
        (0, _properties.defineReadOnly)(this.populateTransaction, signature, buildPopulate(this, fragment));
      }

      if (this.estimateGas[signature] == null) {
        (0, _properties.defineReadOnly)(this.estimateGas, signature, buildEstimate(this, fragment));
      }
    });
    Object.keys(uniqueNames).forEach(name => {
      // Ambiguous names to not get attached as bare names
      const signatures = uniqueNames[name];

      if (signatures.length > 1) {
        return;
      } // Strip off the leading "%" used for prototype protection


      name = name.substring(1);
      const signature = signatures[0]; // If overwriting a member property that is null, swallow the error

      try {
        if (this[name] == null) {
          (0, _properties.defineReadOnly)(this, name, this[signature]);
        }
      } catch (e) {}

      if (this.functions[name] == null) {
        (0, _properties.defineReadOnly)(this.functions, name, this.functions[signature]);
      }

      if (this.callStatic[name] == null) {
        (0, _properties.defineReadOnly)(this.callStatic, name, this.callStatic[signature]);
      }

      if (this.populateTransaction[name] == null) {
        (0, _properties.defineReadOnly)(this.populateTransaction, name, this.populateTransaction[signature]);
      }

      if (this.estimateGas[name] == null) {
        (0, _properties.defineReadOnly)(this.estimateGas, name, this.estimateGas[signature]);
      }
    });
  }

  static getContractAddress(transaction) {
    return (0, _address.getContractAddress)(transaction);
  }

  static getInterface(contractInterface) {
    if (_abi.Interface.isInterface(contractInterface)) {
      return contractInterface;
    }

    return new _abi.Interface(contractInterface);
  } // @TODO: Allow timeout?


  deployed() {
    return this._deployed();
  }

  _deployed(blockTag) {
    if (!this._deployedPromise) {
      // If we were just deployed, we know the transaction we should occur in
      if (this.deployTransaction) {
        this._deployedPromise = this.deployTransaction.wait().then(() => {
          return this;
        });
      } else {
        // @TODO: Once we allow a timeout to be passed in, we will wait
        // up to that many blocks for getCode
        // Otherwise, poll for our code to be deployed
        this._deployedPromise = this.provider.getCode(this.address, blockTag).then(code => {
          if (code === "0x") {
            logger.throwError("contract not deployed", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
              contractAddress: this.address,
              operation: "getDeployed"
            });
          }

          return this;
        });
      }
    }

    return this._deployedPromise;
  } // @TODO:
  // estimateFallback(overrides?: TransactionRequest): Promise<BigNumber>
  // @TODO:
  // estimateDeploy(bytecode: string, ...args): Promise<BigNumber>


  fallback(overrides) {
    if (!this.signer) {
      logger.throwError("sending a transactions require a signer", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "sendTransaction(fallback)"
      });
    }

    const tx = (0, _properties.shallowCopy)(overrides || {});
    ["from", "to"].forEach(function (key) {
      if (tx[key] == null) {
        return;
      }

      logger.throwError("cannot override " + key, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: key
      });
    });
    tx.to = this.resolvedAddress;
    return this.deployed().then(() => {
      return this.signer.sendTransaction(tx);
    });
  } // Reconnect to a different signer or provider


  connect(signerOrProvider) {
    if (typeof signerOrProvider === "string") {
      signerOrProvider = new _abstractSigner.VoidSigner(signerOrProvider, this.provider);
    }

    const contract = new this.constructor(this.address, this.interface, signerOrProvider);

    if (this.deployTransaction) {
      (0, _properties.defineReadOnly)(contract, "deployTransaction", this.deployTransaction);
    }

    return contract;
  } // Re-attach to a different on-chain instance of this contract


  attach(addressOrName) {
    return new this.constructor(addressOrName, this.interface, this.signer || this.provider);
  }

  static isIndexed(value) {
    return _abi.Indexed.isIndexed(value);
  }

  _normalizeRunningEvent(runningEvent) {
    // Already have an instance of this event running; we can re-use it
    if (this._runningEvents[runningEvent.tag]) {
      return this._runningEvents[runningEvent.tag];
    }

    return runningEvent;
  }

  _getRunningEvent(eventName) {
    if (typeof eventName === "string") {
      // Listen for "error" events (if your contract has an error event, include
      // the full signature to bypass this special event keyword)
      if (eventName === "error") {
        return this._normalizeRunningEvent(new ErrorRunningEvent());
      } // Listen for any event that is registered


      if (eventName === "event") {
        return this._normalizeRunningEvent(new RunningEvent("event", null));
      } // Listen for any event


      if (eventName === "*") {
        return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
      } // Get the event Fragment (throws if ambiguous/unknown event)


      const fragment = this.interface.getEvent(eventName);
      return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
    } // We have topics to filter by...


    if (eventName.topics && eventName.topics.length > 0) {
      // Is it a known topichash? (throws if no matching topichash)
      try {
        const topic = eventName.topics[0];

        if (typeof topic !== "string") {
          throw new Error("invalid topic"); // @TODO: May happen for anonymous events
        }

        const fragment = this.interface.getEvent(topic);
        return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
      } catch (error) {} // Filter by the unknown topichash


      const filter = {
        address: this.address,
        topics: eventName.topics
      };
      return this._normalizeRunningEvent(new RunningEvent(getEventTag(filter), filter));
    }

    return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
  }

  _checkRunningEvents(runningEvent) {
    if (runningEvent.listenerCount() === 0) {
      delete this._runningEvents[runningEvent.tag]; // If we have a poller for this, remove it

      const emit = this._wrappedEmits[runningEvent.tag];

      if (emit && runningEvent.filter) {
        this.provider.off(runningEvent.filter, emit);
        delete this._wrappedEmits[runningEvent.tag];
      }
    }
  } // Subclasses can override this to gracefully recover
  // from parse errors if they wish


  _wrapEvent(runningEvent, log, listener) {
    const event = (0, _properties.deepCopy)(log);

    event.removeListener = () => {
      if (!listener) {
        return;
      }

      runningEvent.removeListener(listener);

      this._checkRunningEvents(runningEvent);
    };

    event.getBlock = () => {
      return this.provider.getBlock(log.blockHash);
    };

    event.getTransaction = () => {
      return this.provider.getTransaction(log.transactionHash);
    };

    event.getTransactionReceipt = () => {
      return this.provider.getTransactionReceipt(log.transactionHash);
    }; // This may throw if the topics and data mismatch the signature


    runningEvent.prepareEvent(event);
    return event;
  }

  _addEventListener(runningEvent, listener, once) {
    if (!this.provider) {
      logger.throwError("events require a provider or a signer with a provider", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "once"
      });
    }

    runningEvent.addListener(listener, once); // Track this running event and its listeners (may already be there; but no hard in updating)

    this._runningEvents[runningEvent.tag] = runningEvent; // If we are not polling the provider, start polling

    if (!this._wrappedEmits[runningEvent.tag]) {
      const wrappedEmit = log => {
        let event = this._wrapEvent(runningEvent, log, listener); // Try to emit the result for the parameterized event...


        if (event.decodeError == null) {
          try {
            const args = runningEvent.getEmit(event);
            this.emit(runningEvent.filter, ...args);
          } catch (error) {
            event.decodeError = error.error;
          }
        } // Always emit "event" for fragment-base events


        if (runningEvent.filter != null) {
          this.emit("event", event);
        } // Emit "error" if there was an error


        if (event.decodeError != null) {
          this.emit("error", event.decodeError, event);
        }
      };

      this._wrappedEmits[runningEvent.tag] = wrappedEmit; // Special events, like "error" do not have a filter

      if (runningEvent.filter != null) {
        this.provider.on(runningEvent.filter, wrappedEmit);
      }
    }
  }

  queryFilter(event, fromBlockOrBlockhash, toBlock) {
    const runningEvent = this._getRunningEvent(event);

    const filter = (0, _properties.shallowCopy)(runningEvent.filter);

    if (typeof fromBlockOrBlockhash === "string" && (0, _bytes.isHexString)(fromBlockOrBlockhash, 32)) {
      if (toBlock != null) {
        logger.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
      }

      filter.blockHash = fromBlockOrBlockhash;
    } else {
      filter.fromBlock = fromBlockOrBlockhash != null ? fromBlockOrBlockhash : 0;
      filter.toBlock = toBlock != null ? toBlock : "latest";
    }

    return this.provider.getLogs(filter).then(logs => {
      return logs.map(log => this._wrapEvent(runningEvent, log, null));
    });
  }

  on(event, listener) {
    this._addEventListener(this._getRunningEvent(event), listener, false);

    return this;
  }

  once(event, listener) {
    this._addEventListener(this._getRunningEvent(event), listener, true);

    return this;
  }

  emit(eventName, ...args) {
    if (!this.provider) {
      return false;
    }

    const runningEvent = this._getRunningEvent(eventName);

    const result = runningEvent.run(args) > 0; // May have drained all the "once" events; check for living events

    this._checkRunningEvents(runningEvent);

    return result;
  }

  listenerCount(eventName) {
    if (!this.provider) {
      return 0;
    }

    if (eventName == null) {
      return Object.keys(this._runningEvents).reduce((accum, key) => {
        return accum + this._runningEvents[key].listenerCount();
      }, 0);
    }

    return this._getRunningEvent(eventName).listenerCount();
  }

  listeners(eventName) {
    if (!this.provider) {
      return [];
    }

    if (eventName == null) {
      const result = [];

      for (let tag in this._runningEvents) {
        this._runningEvents[tag].listeners().forEach(listener => {
          result.push(listener);
        });
      }

      return result;
    }

    return this._getRunningEvent(eventName).listeners();
  }

  removeAllListeners(eventName) {
    if (!this.provider) {
      return this;
    }

    if (eventName == null) {
      for (const tag in this._runningEvents) {
        const runningEvent = this._runningEvents[tag];
        runningEvent.removeAllListeners();

        this._checkRunningEvents(runningEvent);
      }

      return this;
    } // Delete any listeners


    const runningEvent = this._getRunningEvent(eventName);

    runningEvent.removeAllListeners();

    this._checkRunningEvents(runningEvent);

    return this;
  }

  off(eventName, listener) {
    if (!this.provider) {
      return this;
    }

    const runningEvent = this._getRunningEvent(eventName);

    runningEvent.removeListener(listener);

    this._checkRunningEvents(runningEvent);

    return this;
  }

  removeListener(eventName, listener) {
    return this.off(eventName, listener);
  }

}

exports.BaseContract = BaseContract;

class Contract extends BaseContract {}

exports.Contract = Contract;

class ContractFactory {
  constructor(contractInterface, bytecode, signer) {
    let bytecodeHex = null;

    if (typeof bytecode === "string") {
      bytecodeHex = bytecode;
    } else if ((0, _bytes.isBytes)(bytecode)) {
      bytecodeHex = (0, _bytes.hexlify)(bytecode);
    } else if (bytecode && typeof bytecode.object === "string") {
      // Allow the bytecode object from the Solidity compiler
      bytecodeHex = bytecode.object;
    } else {
      // Crash in the next verification step
      bytecodeHex = "!";
    } // Make sure it is 0x prefixed


    if (bytecodeHex.substring(0, 2) !== "0x") {
      bytecodeHex = "0x" + bytecodeHex;
    } // Make sure the final result is valid bytecode


    if (!(0, _bytes.isHexString)(bytecodeHex) || bytecodeHex.length % 2) {
      logger.throwArgumentError("invalid bytecode", "bytecode", bytecode);
    } // If we have a signer, make sure it is valid


    if (signer && !_abstractSigner.Signer.isSigner(signer)) {
      logger.throwArgumentError("invalid signer", "signer", signer);
    }

    (0, _properties.defineReadOnly)(this, "bytecode", bytecodeHex);
    (0, _properties.defineReadOnly)(this, "interface", (0, _properties.getStatic)(new.target, "getInterface")(contractInterface));
    (0, _properties.defineReadOnly)(this, "signer", signer || null);
  } // @TODO: Future; rename to populateTransaction?


  getDeployTransaction(...args) {
    let tx = {}; // If we have 1 additional argument, we allow transaction overrides

    if (args.length === this.interface.deploy.inputs.length + 1 && typeof args[args.length - 1] === "object") {
      tx = (0, _properties.shallowCopy)(args.pop());

      for (const key in tx) {
        if (!allowedTransactionKeys[key]) {
          throw new Error("unknown transaction override " + key);
        }
      }
    } // Do not allow these to be overridden in a deployment transaction


    ["data", "from", "to"].forEach(key => {
      if (tx[key] == null) {
        return;
      }

      logger.throwError("cannot override " + key, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: key
      });
    });

    if (tx.value) {
      const value = _bignumber.BigNumber.from(tx.value);

      if (!value.isZero() && !this.interface.deploy.payable) {
        logger.throwError("non-payable constructor cannot override value", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides.value",
          value: tx.value
        });
      }
    } // Make sure the call matches the constructor signature


    logger.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor"); // Set the data to the bytecode + the encoded constructor arguments

    tx.data = (0, _bytes.hexlify)((0, _bytes.concat)([this.bytecode, this.interface.encodeDeploy(args)]));
    return tx;
  }

  deploy(...args) {
    return __awaiter(this, void 0, void 0, function* () {
      let overrides = {}; // If 1 extra parameter was passed in, it contains overrides

      if (args.length === this.interface.deploy.inputs.length + 1) {
        overrides = args.pop();
      } // Make sure the call matches the constructor signature


      logger.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor"); // Resolve ENS names and promises in the arguments

      const params = yield resolveAddresses(this.signer, args, this.interface.deploy.inputs);
      params.push(overrides); // Get the deployment transaction (with optional overrides)

      const unsignedTx = this.getDeployTransaction(...params); // Send the deployment transaction

      const tx = yield this.signer.sendTransaction(unsignedTx);
      const address = (0, _properties.getStatic)(this.constructor, "getContractAddress")(tx);
      const contract = (0, _properties.getStatic)(this.constructor, "getContract")(address, this.interface, this.signer); // Add the modified wait that wraps events

      addContractWait(contract, tx);
      (0, _properties.defineReadOnly)(contract, "deployTransaction", tx);
      return contract;
    });
  }

  attach(address) {
    return this.constructor.getContract(address, this.interface, this.signer);
  }

  connect(signer) {
    return new this.constructor(this.interface, this.bytecode, signer);
  }

  static fromSolidity(compilerOutput, signer) {
    if (compilerOutput == null) {
      logger.throwError("missing compiler output", _logger.Logger.errors.MISSING_ARGUMENT, {
        argument: "compilerOutput"
      });
    }

    if (typeof compilerOutput === "string") {
      compilerOutput = JSON.parse(compilerOutput);
    }

    const abi = compilerOutput.abi;
    let bytecode = null;

    if (compilerOutput.bytecode) {
      bytecode = compilerOutput.bytecode;
    } else if (compilerOutput.evm && compilerOutput.evm.bytecode) {
      bytecode = compilerOutput.evm.bytecode;
    }

    return new this(abi, bytecode, signer);
  }

  static getInterface(contractInterface) {
    return Contract.getInterface(contractInterface);
  }

  static getContractAddress(tx) {
    return (0, _address.getContractAddress)(tx);
  }

  static getContract(address, contractInterface, signer) {
    return new Contract(address, contractInterface, signer);
  }

}

exports.ContractFactory = ContractFactory;
},{"@ethersproject/abi":"FSnr","@ethersproject/abstract-provider":"GKyj","@ethersproject/abstract-signer":"l8eZ","@ethersproject/address":"a1wm","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/transactions":"OW34","@ethersproject/logger":"kMNH","./_version":"fYqP"}],"Q7g1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseX = exports.Base58 = exports.Base32 = void 0;

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

/**
 * var basex = require("base-x");
 *
 * This implementation is heavily based on base-x. The main reason to
 * deviate was to prevent the dependency of Buffer.
 *
 * Contributors:
 *
 * base-x encoding
 * Forked from https://github.com/cryptocoinjs/bs58
 * Originally written by Mike Hearn for BitcoinJ
 * Copyright (c) 2011 Google Inc
 * Ported to JavaScript by Stefan Thomas
 * Merged Buffer refactorings from base58-native by Stephen Pair
 * Copyright (c) 2013 BitPay Inc
 *
 * The MIT License (MIT)
 *
 * Copyright base-x contributors (c) 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */
class BaseX {
  constructor(alphabet) {
    (0, _properties.defineReadOnly)(this, "alphabet", alphabet);
    (0, _properties.defineReadOnly)(this, "base", alphabet.length);
    (0, _properties.defineReadOnly)(this, "_alphabetMap", {});
    (0, _properties.defineReadOnly)(this, "_leader", alphabet.charAt(0)); // pre-compute lookup table

    for (let i = 0; i < alphabet.length; i++) {
      this._alphabetMap[alphabet.charAt(i)] = i;
    }
  }

  encode(value) {
    let source = (0, _bytes.arrayify)(value);

    if (source.length === 0) {
      return "";
    }

    let digits = [0];

    for (let i = 0; i < source.length; ++i) {
      let carry = source[i];

      for (let j = 0; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % this.base;
        carry = carry / this.base | 0;
      }

      while (carry > 0) {
        digits.push(carry % this.base);
        carry = carry / this.base | 0;
      }
    }

    let string = ""; // deal with leading zeros

    for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
      string += this._leader;
    } // convert digits to a string


    for (let q = digits.length - 1; q >= 0; --q) {
      string += this.alphabet[digits[q]];
    }

    return string;
  }

  decode(value) {
    if (typeof value !== "string") {
      throw new TypeError("Expected String");
    }

    let bytes = [];

    if (value.length === 0) {
      return new Uint8Array(bytes);
    }

    bytes.push(0);

    for (let i = 0; i < value.length; i++) {
      let byte = this._alphabetMap[value[i]];

      if (byte === undefined) {
        throw new Error("Non-base" + this.base + " character");
      }

      let carry = byte;

      for (let j = 0; j < bytes.length; ++j) {
        carry += bytes[j] * this.base;
        bytes[j] = carry & 0xff;
        carry >>= 8;
      }

      while (carry > 0) {
        bytes.push(carry & 0xff);
        carry >>= 8;
      }
    } // deal with leading zeros


    for (let k = 0; value[k] === this._leader && k < value.length - 1; ++k) {
      bytes.push(0);
    }

    return (0, _bytes.arrayify)(new Uint8Array(bytes.reverse()));
  }

}

exports.BaseX = BaseX;
const Base32 = new BaseX("abcdefghijklmnopqrstuvwxyz234567");
exports.Base32 = Base32;
const Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"); //console.log(Base58.decode("Qmd2V777o5XvJbYMeMb8k2nU5f8d3ciUQ5YpYuWhzv8iDj"))
//console.log(Base58.encode(Base58.decode("Qmd2V777o5XvJbYMeMb8k2nU5f8d3ciUQ5YpYuWhzv8iDj")))

exports.Base58 = Base58;
},{"@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX"}],"i0se":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupportedAlgorithm = void 0;
var SupportedAlgorithm;
exports.SupportedAlgorithm = SupportedAlgorithm;

(function (SupportedAlgorithm) {
  SupportedAlgorithm["sha256"] = "sha256";
  SupportedAlgorithm["sha512"] = "sha512";
})(SupportedAlgorithm || (exports.SupportedAlgorithm = SupportedAlgorithm = {}));

;
},{}],"doqp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "sha2/5.5.0";
exports.version = version;
},{}],"UNZc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeHmac = computeHmac;
exports.ripemd160 = ripemd160;
exports.sha256 = sha256;
exports.sha512 = sha512;

var _hash = _interopRequireDefault(require("hash.js"));

var _bytes = require("@ethersproject/bytes");

var _types = require("./types");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const _ripemd160 = _hash.ripemd160;
const logger = new _logger.Logger(_version.version);

function ripemd160(data) {
  return "0x" + _hash.default.ripemd160().update((0, _bytes.arrayify)(data)).digest("hex");
}

function sha256(data) {
  return "0x" + _hash.default.sha256().update((0, _bytes.arrayify)(data)).digest("hex");
}

function sha512(data) {
  return "0x" + _hash.default.sha512().update((0, _bytes.arrayify)(data)).digest("hex");
}

function computeHmac(algorithm, key, data) {
  if (!_types.SupportedAlgorithm[algorithm]) {
    logger.throwError("unsupported algorithm " + algorithm, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "hmac",
      algorithm: algorithm
    });
  }

  return "0x" + _hash.default.hmac(_hash.default[algorithm], (0, _bytes.arrayify)(key)).update((0, _bytes.arrayify)(data)).digest("hex");
}
},{"hash.js":"U6lo","@ethersproject/bytes":"aqkS","./types":"i0se","@ethersproject/logger":"kMNH","./_version":"doqp"}],"C9Hj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SupportedAlgorithm", {
  enumerable: true,
  get: function () {
    return _types.SupportedAlgorithm;
  }
});
Object.defineProperty(exports, "computeHmac", {
  enumerable: true,
  get: function () {
    return _sha.computeHmac;
  }
});
Object.defineProperty(exports, "ripemd160", {
  enumerable: true,
  get: function () {
    return _sha.ripemd160;
  }
});
Object.defineProperty(exports, "sha256", {
  enumerable: true,
  get: function () {
    return _sha.sha256;
  }
});
Object.defineProperty(exports, "sha512", {
  enumerable: true,
  get: function () {
    return _sha.sha512;
  }
});

var _sha = require("./sha2");

var _types = require("./types");
},{"./sha2":"UNZc","./types":"i0se"}],"LObC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pbkdf2 = pbkdf2;

var _bytes = require("@ethersproject/bytes");

var _sha = require("@ethersproject/sha2");

function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
  password = (0, _bytes.arrayify)(password);
  salt = (0, _bytes.arrayify)(salt);
  let hLen;
  let l = 1;
  const DK = new Uint8Array(keylen);
  const block1 = new Uint8Array(salt.length + 4);
  block1.set(salt); //salt.copy(block1, 0, 0, salt.length)

  let r;
  let T;

  for (let i = 1; i <= l; i++) {
    //block1.writeUInt32BE(i, salt.length)
    block1[salt.length] = i >> 24 & 0xff;
    block1[salt.length + 1] = i >> 16 & 0xff;
    block1[salt.length + 2] = i >> 8 & 0xff;
    block1[salt.length + 3] = i & 0xff; //let U = createHmac(password).update(block1).digest();

    let U = (0, _bytes.arrayify)((0, _sha.computeHmac)(hashAlgorithm, password, block1));

    if (!hLen) {
      hLen = U.length;
      T = new Uint8Array(hLen);
      l = Math.ceil(keylen / hLen);
      r = keylen - (l - 1) * hLen;
    } //U.copy(T, 0, 0, hLen)


    T.set(U);

    for (let j = 1; j < iterations; j++) {
      //U = createHmac(password).update(U).digest();
      U = (0, _bytes.arrayify)((0, _sha.computeHmac)(hashAlgorithm, password, U));

      for (let k = 0; k < hLen; k++) T[k] ^= U[k];
    }

    const destPos = (i - 1) * hLen;
    const len = i === l ? r : hLen; //T.copy(DK, destPos, 0, len)

    DK.set((0, _bytes.arrayify)(T).slice(0, len), destPos);
  }

  return (0, _bytes.hexlify)(DK);
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/sha2":"C9Hj"}],"IYfJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pbkdf2", {
  enumerable: true,
  get: function () {
    return _pbkdf.pbkdf2;
  }
});

var _pbkdf = require("./pbkdf2");
},{"./pbkdf2":"LObC"}],"HNzj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "wordlists/5.5.0";
exports.version = version;
},{}],"kJwc":[function(require,module,exports) {
"use strict"; // This gets overridden by rollup

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.Wordlist = void 0;

var _hash = require("@ethersproject/hash");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const exportWordlist = false;
const logger = new _logger.Logger(_version.version);
exports.logger = logger;

class Wordlist {
  constructor(locale) {
    logger.checkAbstract(new.target, Wordlist);
    (0, _properties.defineReadOnly)(this, "locale", locale);
  } // Subclasses may override this


  split(mnemonic) {
    return mnemonic.toLowerCase().split(/ +/g);
  } // Subclasses may override this


  join(words) {
    return words.join(" ");
  }

  static check(wordlist) {
    const words = [];

    for (let i = 0; i < 2048; i++) {
      const word = wordlist.getWord(i);
      /* istanbul ignore if */

      if (i !== wordlist.getWordIndex(word)) {
        return "0x";
      }

      words.push(word);
    }

    return (0, _hash.id)(words.join("\n") + "\n");
  }

  static register(lang, name) {
    if (!name) {
      name = lang.locale;
    }
    /* istanbul ignore if */


    if (exportWordlist) {
      try {
        const anyGlobal = window;

        if (anyGlobal._ethers && anyGlobal._ethers.wordlists) {
          if (!anyGlobal._ethers.wordlists[name]) {
            (0, _properties.defineReadOnly)(anyGlobal._ethers.wordlists, name, lang);
          }
        }
      } catch (error) {}
    }
  }

}

exports.Wordlist = Wordlist;
},{"@ethersproject/hash":"eHxR","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"HNzj"}],"no67":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.langEn = void 0;

var _wordlist = require("./wordlist");

const words = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo";
let wordlist = null;

function loadWords(lang) {
  if (wordlist != null) {
    return;
  }

  wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" "); // Verify the computed list matches the official list

  /* istanbul ignore if */

  if (_wordlist.Wordlist.check(lang) !== "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60") {
    wordlist = null;
    throw new Error("BIP39 Wordlist for en (English) FAILED");
  }
}

class LangEn extends _wordlist.Wordlist {
  constructor() {
    super("en");
  }

  getWord(index) {
    loadWords(this);
    return wordlist[index];
  }

  getWordIndex(word) {
    loadWords(this);
    return wordlist.indexOf(word);
  }

}

const langEn = new LangEn();
exports.langEn = langEn;

_wordlist.Wordlist.register(langEn);
},{"./wordlist":"kJwc"}],"x4MZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordlists = void 0;

var _langEn = require("./lang-en");

const wordlists = {
  en: _langEn.langEn
};
exports.wordlists = wordlists;
},{"./lang-en":"no67"}],"VsrC":[function(require,module,exports) {
"use strict"; // Wordlists
// See: https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Wordlist", {
  enumerable: true,
  get: function () {
    return _wordlist.Wordlist;
  }
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return _wordlist.logger;
  }
});
Object.defineProperty(exports, "wordlists", {
  enumerable: true,
  get: function () {
    return _wordlists.wordlists;
  }
});

var _wordlist = require("./wordlist");

var _wordlists = require("./wordlists");
},{"./wordlist":"kJwc","./wordlists":"x4MZ"}],"FIaF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "hdnode/5.5.0";
exports.version = version;
},{}],"oCaL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPath = exports.HDNode = void 0;
exports.entropyToMnemonic = entropyToMnemonic;
exports.getAccountPath = getAccountPath;
exports.isValidMnemonic = isValidMnemonic;
exports.mnemonicToEntropy = mnemonicToEntropy;
exports.mnemonicToSeed = mnemonicToSeed;

var _basex = require("@ethersproject/basex");

var _bytes = require("@ethersproject/bytes");

var _bignumber = require("@ethersproject/bignumber");

var _strings = require("@ethersproject/strings");

var _pbkdf = require("@ethersproject/pbkdf2");

var _properties = require("@ethersproject/properties");

var _signingKey = require("@ethersproject/signing-key");

var _sha = require("@ethersproject/sha2");

var _transactions = require("@ethersproject/transactions");

var _wordlists = require("@ethersproject/wordlists");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);

const N = _bignumber.BigNumber.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"); // "Bitcoin seed"


const MasterSecret = (0, _strings.toUtf8Bytes)("Bitcoin seed");
const HardenedBit = 0x80000000; // Returns a byte with the MSB bits set

function getUpperMask(bits) {
  return (1 << bits) - 1 << 8 - bits;
} // Returns a byte with the LSB bits set


function getLowerMask(bits) {
  return (1 << bits) - 1;
}

function bytes32(value) {
  return (0, _bytes.hexZeroPad)((0, _bytes.hexlify)(value), 32);
}

function base58check(data) {
  return _basex.Base58.encode((0, _bytes.concat)([data, (0, _bytes.hexDataSlice)((0, _sha.sha256)((0, _sha.sha256)(data)), 0, 4)]));
}

function getWordlist(wordlist) {
  if (wordlist == null) {
    return _wordlists.wordlists["en"];
  }

  if (typeof wordlist === "string") {
    const words = _wordlists.wordlists[wordlist];

    if (words == null) {
      logger.throwArgumentError("unknown locale", "wordlist", wordlist);
    }

    return words;
  }

  return wordlist;
}

const _constructorGuard = {};
const defaultPath = "m/44'/60'/0'/0/0";
exports.defaultPath = defaultPath;
;

class HDNode {
  /**
   *  This constructor should not be called directly.
   *
   *  Please use:
   *   - fromMnemonic
   *   - fromSeed
   */
  constructor(constructorGuard, privateKey, publicKey, parentFingerprint, chainCode, index, depth, mnemonicOrPath) {
    logger.checkNew(new.target, HDNode);
    /* istanbul ignore if */

    if (constructorGuard !== _constructorGuard) {
      throw new Error("HDNode constructor cannot be called directly");
    }

    if (privateKey) {
      const signingKey = new _signingKey.SigningKey(privateKey);
      (0, _properties.defineReadOnly)(this, "privateKey", signingKey.privateKey);
      (0, _properties.defineReadOnly)(this, "publicKey", signingKey.compressedPublicKey);
    } else {
      (0, _properties.defineReadOnly)(this, "privateKey", null);
      (0, _properties.defineReadOnly)(this, "publicKey", (0, _bytes.hexlify)(publicKey));
    }

    (0, _properties.defineReadOnly)(this, "parentFingerprint", parentFingerprint);
    (0, _properties.defineReadOnly)(this, "fingerprint", (0, _bytes.hexDataSlice)((0, _sha.ripemd160)((0, _sha.sha256)(this.publicKey)), 0, 4));
    (0, _properties.defineReadOnly)(this, "address", (0, _transactions.computeAddress)(this.publicKey));
    (0, _properties.defineReadOnly)(this, "chainCode", chainCode);
    (0, _properties.defineReadOnly)(this, "index", index);
    (0, _properties.defineReadOnly)(this, "depth", depth);

    if (mnemonicOrPath == null) {
      // From a source that does not preserve the path (e.g. extended keys)
      (0, _properties.defineReadOnly)(this, "mnemonic", null);
      (0, _properties.defineReadOnly)(this, "path", null);
    } else if (typeof mnemonicOrPath === "string") {
      // From a source that does not preserve the mnemonic (e.g. neutered)
      (0, _properties.defineReadOnly)(this, "mnemonic", null);
      (0, _properties.defineReadOnly)(this, "path", mnemonicOrPath);
    } else {
      // From a fully qualified source
      (0, _properties.defineReadOnly)(this, "mnemonic", mnemonicOrPath);
      (0, _properties.defineReadOnly)(this, "path", mnemonicOrPath.path);
    }
  }

  get extendedKey() {
    // We only support the mainnet values for now, but if anyone needs
    // testnet values, let me know. I believe current sentiment is that
    // we should always use mainnet, and use BIP-44 to derive the network
    //   - Mainnet: public=0x0488B21E, private=0x0488ADE4
    //   - Testnet: public=0x043587CF, private=0x04358394
    if (this.depth >= 256) {
      throw new Error("Depth too large!");
    }

    return base58check((0, _bytes.concat)([this.privateKey != null ? "0x0488ADE4" : "0x0488B21E", (0, _bytes.hexlify)(this.depth), this.parentFingerprint, (0, _bytes.hexZeroPad)((0, _bytes.hexlify)(this.index), 4), this.chainCode, this.privateKey != null ? (0, _bytes.concat)(["0x00", this.privateKey]) : this.publicKey]));
  }

  neuter() {
    return new HDNode(_constructorGuard, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path);
  }

  _derive(index) {
    if (index > 0xffffffff) {
      throw new Error("invalid index - " + String(index));
    } // Base path


    let path = this.path;

    if (path) {
      path += "/" + (index & ~HardenedBit);
    }

    const data = new Uint8Array(37);

    if (index & HardenedBit) {
      if (!this.privateKey) {
        throw new Error("cannot derive child of neutered node");
      } // Data = 0x00 || ser_256(k_par)


      data.set((0, _bytes.arrayify)(this.privateKey), 1); // Hardened path

      if (path) {
        path += "'";
      }
    } else {
      // Data = ser_p(point(k_par))
      data.set((0, _bytes.arrayify)(this.publicKey));
    } // Data += ser_32(i)


    for (let i = 24; i >= 0; i -= 8) {
      data[33 + (i >> 3)] = index >> 24 - i & 0xff;
    }

    const I = (0, _bytes.arrayify)((0, _sha.computeHmac)(_sha.SupportedAlgorithm.sha512, this.chainCode, data));
    const IL = I.slice(0, 32);
    const IR = I.slice(32); // The private key

    let ki = null; // The public key

    let Ki = null;

    if (this.privateKey) {
      ki = bytes32(_bignumber.BigNumber.from(IL).add(this.privateKey).mod(N));
    } else {
      const ek = new _signingKey.SigningKey((0, _bytes.hexlify)(IL));
      Ki = ek._addPoint(this.publicKey);
    }

    let mnemonicOrPath = path;
    const srcMnemonic = this.mnemonic;

    if (srcMnemonic) {
      mnemonicOrPath = Object.freeze({
        phrase: srcMnemonic.phrase,
        path: path,
        locale: srcMnemonic.locale || "en"
      });
    }

    return new HDNode(_constructorGuard, ki, Ki, this.fingerprint, bytes32(IR), index, this.depth + 1, mnemonicOrPath);
  }

  derivePath(path) {
    const components = path.split("/");

    if (components.length === 0 || components[0] === "m" && this.depth !== 0) {
      throw new Error("invalid path - " + path);
    }

    if (components[0] === "m") {
      components.shift();
    }

    let result = this;

    for (let i = 0; i < components.length; i++) {
      const component = components[i];

      if (component.match(/^[0-9]+'$/)) {
        const index = parseInt(component.substring(0, component.length - 1));

        if (index >= HardenedBit) {
          throw new Error("invalid path index - " + component);
        }

        result = result._derive(HardenedBit + index);
      } else if (component.match(/^[0-9]+$/)) {
        const index = parseInt(component);

        if (index >= HardenedBit) {
          throw new Error("invalid path index - " + component);
        }

        result = result._derive(index);
      } else {
        throw new Error("invalid path component - " + component);
      }
    }

    return result;
  }

  static _fromSeed(seed, mnemonic) {
    const seedArray = (0, _bytes.arrayify)(seed);

    if (seedArray.length < 16 || seedArray.length > 64) {
      throw new Error("invalid seed");
    }

    const I = (0, _bytes.arrayify)((0, _sha.computeHmac)(_sha.SupportedAlgorithm.sha512, MasterSecret, seedArray));
    return new HDNode(_constructorGuard, bytes32(I.slice(0, 32)), null, "0x00000000", bytes32(I.slice(32)), 0, 0, mnemonic);
  }

  static fromMnemonic(mnemonic, password, wordlist) {
    // If a locale name was passed in, find the associated wordlist
    wordlist = getWordlist(wordlist); // Normalize the case and spacing in the mnemonic (throws if the mnemonic is invalid)

    mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist), wordlist);
    return HDNode._fromSeed(mnemonicToSeed(mnemonic, password), {
      phrase: mnemonic,
      path: "m",
      locale: wordlist.locale
    });
  }

  static fromSeed(seed) {
    return HDNode._fromSeed(seed, null);
  }

  static fromExtendedKey(extendedKey) {
    const bytes = _basex.Base58.decode(extendedKey);

    if (bytes.length !== 82 || base58check(bytes.slice(0, 78)) !== extendedKey) {
      logger.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
    }

    const depth = bytes[4];
    const parentFingerprint = (0, _bytes.hexlify)(bytes.slice(5, 9));
    const index = parseInt((0, _bytes.hexlify)(bytes.slice(9, 13)).substring(2), 16);
    const chainCode = (0, _bytes.hexlify)(bytes.slice(13, 45));
    const key = bytes.slice(45, 78);

    switch ((0, _bytes.hexlify)(bytes.slice(0, 4))) {
      // Public Key
      case "0x0488b21e":
      case "0x043587cf":
        return new HDNode(_constructorGuard, null, (0, _bytes.hexlify)(key), parentFingerprint, chainCode, index, depth, null);
      // Private Key

      case "0x0488ade4":
      case "0x04358394 ":
        if (key[0] !== 0) {
          break;
        }

        return new HDNode(_constructorGuard, (0, _bytes.hexlify)(key.slice(1)), null, parentFingerprint, chainCode, index, depth, null);
    }

    return logger.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
  }

}

exports.HDNode = HDNode;

function mnemonicToSeed(mnemonic, password) {
  if (!password) {
    password = "";
  }

  const salt = (0, _strings.toUtf8Bytes)("mnemonic" + password, _strings.UnicodeNormalizationForm.NFKD);
  return (0, _pbkdf.pbkdf2)((0, _strings.toUtf8Bytes)(mnemonic, _strings.UnicodeNormalizationForm.NFKD), salt, 2048, 64, "sha512");
}

function mnemonicToEntropy(mnemonic, wordlist) {
  wordlist = getWordlist(wordlist);
  logger.checkNormalize();
  const words = wordlist.split(mnemonic);

  if (words.length % 3 !== 0) {
    throw new Error("invalid mnemonic");
  }

  const entropy = (0, _bytes.arrayify)(new Uint8Array(Math.ceil(11 * words.length / 8)));
  let offset = 0;

  for (let i = 0; i < words.length; i++) {
    let index = wordlist.getWordIndex(words[i].normalize("NFKD"));

    if (index === -1) {
      throw new Error("invalid mnemonic");
    }

    for (let bit = 0; bit < 11; bit++) {
      if (index & 1 << 10 - bit) {
        entropy[offset >> 3] |= 1 << 7 - offset % 8;
      }

      offset++;
    }
  }

  const entropyBits = 32 * words.length / 3;
  const checksumBits = words.length / 3;
  const checksumMask = getUpperMask(checksumBits);
  const checksum = (0, _bytes.arrayify)((0, _sha.sha256)(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;

  if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
    throw new Error("invalid checksum");
  }

  return (0, _bytes.hexlify)(entropy.slice(0, entropyBits / 8));
}

function entropyToMnemonic(entropy, wordlist) {
  wordlist = getWordlist(wordlist);
  entropy = (0, _bytes.arrayify)(entropy);

  if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
    throw new Error("invalid entropy");
  }

  const indices = [0];
  let remainingBits = 11;

  for (let i = 0; i < entropy.length; i++) {
    // Consume the whole byte (with still more to go)
    if (remainingBits > 8) {
      indices[indices.length - 1] <<= 8;
      indices[indices.length - 1] |= entropy[i];
      remainingBits -= 8; // This byte will complete an 11-bit index
    } else {
      indices[indices.length - 1] <<= remainingBits;
      indices[indices.length - 1] |= entropy[i] >> 8 - remainingBits; // Start the next word

      indices.push(entropy[i] & getLowerMask(8 - remainingBits));
      remainingBits += 3;
    }
  } // Compute the checksum bits


  const checksumBits = entropy.length / 4;
  const checksum = (0, _bytes.arrayify)((0, _sha.sha256)(entropy))[0] & getUpperMask(checksumBits); // Shift the checksum into the word indices

  indices[indices.length - 1] <<= checksumBits;
  indices[indices.length - 1] |= checksum >> 8 - checksumBits;
  return wordlist.join(indices.map(index => wordlist.getWord(index)));
}

function isValidMnemonic(mnemonic, wordlist) {
  try {
    mnemonicToEntropy(mnemonic, wordlist);
    return true;
  } catch (error) {}

  return false;
}

function getAccountPath(index) {
  if (typeof index !== "number" || index < 0 || index >= HardenedBit || index % 1) {
    logger.throwArgumentError("invalid account index", "index", index);
  }

  return `m/44'/60'/${index}'/0/0`;
}
},{"@ethersproject/basex":"Q7g1","@ethersproject/bytes":"aqkS","@ethersproject/bignumber":"efJK","@ethersproject/strings":"ZW9k","@ethersproject/pbkdf2":"IYfJ","@ethersproject/properties":"JuuX","@ethersproject/signing-key":"KjI1","@ethersproject/sha2":"C9Hj","@ethersproject/transactions":"OW34","@ethersproject/wordlists":"VsrC","@ethersproject/logger":"kMNH","./_version":"FIaF"}],"afLU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "random/5.5.0";
exports.version = version;
},{}],"lnvV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomBytes = randomBytes;

var _bytes = require("@ethersproject/bytes");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version); // Debugging line for testing browser lib in node
//const window = { crypto: { getRandomValues: () => { } } };

let anyGlobal = null;

try {
  anyGlobal = window;

  if (anyGlobal == null) {
    throw new Error("try next");
  }
} catch (error) {
  try {
    anyGlobal = global;

    if (anyGlobal == null) {
      throw new Error("try next");
    }
  } catch (error) {
    anyGlobal = {};
  }
}

let crypto = anyGlobal.crypto || anyGlobal.msCrypto;

if (!crypto || !crypto.getRandomValues) {
  logger.warn("WARNING: Missing strong random number source");
  crypto = {
    getRandomValues: function (buffer) {
      return logger.throwError("no secure random source avaialble", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "crypto.getRandomValues"
      });
    }
  };
}

function randomBytes(length) {
  if (length <= 0 || length > 1024 || length % 1 || length != length) {
    logger.throwArgumentError("invalid length", "length", length);
  }

  const result = new Uint8Array(length);
  crypto.getRandomValues(result);
  return (0, _bytes.arrayify)(result);
}

;
},{"@ethersproject/bytes":"aqkS","@ethersproject/logger":"kMNH","./_version":"afLU"}],"PFzQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffled = shuffled;

function shuffled(array) {
  array = array.slice();

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  return array;
}
},{}],"LoH0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "randomBytes", {
  enumerable: true,
  get: function () {
    return _random.randomBytes;
  }
});
Object.defineProperty(exports, "shuffled", {
  enumerable: true,
  get: function () {
    return _shuffle.shuffled;
  }
});

var _random = require("./random");

var _shuffle = require("./shuffle");
},{"./random":"lnvV","./shuffle":"PFzQ"}],"ilr3":[function(require,module,exports) {
"use strict";

(function(root) {

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = value >> 8;
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (typeof exports !== 'undefined') {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(aesjs);

    // Web Browsers
    } else {

        // If there was an existing library at "aesjs" make sure it's still available
        if (root.aesjs) {
            aesjs._aesjs = root.aesjs;
        }

        root.aesjs = aesjs;
    }


})(this);

},{}],"rvOu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "json-wallets/5.5.0";
exports.version = version;
},{}],"hXaP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPassword = getPassword;
exports.looseArrayify = looseArrayify;
exports.searchPath = searchPath;
exports.uuidV4 = uuidV4;
exports.zpad = zpad;

var _bytes = require("@ethersproject/bytes");

var _strings = require("@ethersproject/strings");

function looseArrayify(hexString) {
  if (typeof hexString === 'string' && hexString.substring(0, 2) !== '0x') {
    hexString = '0x' + hexString;
  }

  return (0, _bytes.arrayify)(hexString);
}

function zpad(value, length) {
  value = String(value);

  while (value.length < length) {
    value = '0' + value;
  }

  return value;
}

function getPassword(password) {
  if (typeof password === 'string') {
    return (0, _strings.toUtf8Bytes)(password, _strings.UnicodeNormalizationForm.NFKC);
  }

  return (0, _bytes.arrayify)(password);
}

function searchPath(object, path) {
  let currentChild = object;
  const comps = path.toLowerCase().split('/');

  for (let i = 0; i < comps.length; i++) {
    // Search for a child object with a case-insensitive matching key
    let matchingChild = null;

    for (const key in currentChild) {
      if (key.toLowerCase() === comps[i]) {
        matchingChild = currentChild[key];
        break;
      }
    } // Didn't find one. :'(


    if (matchingChild === null) {
      return null;
    } // Now check this child...


    currentChild = matchingChild;
  }

  return currentChild;
} // See: https://www.ietf.org/rfc/rfc4122.txt (Section 4.4)


function uuidV4(randomBytes) {
  const bytes = (0, _bytes.arrayify)(randomBytes); // Section: 4.1.3:
  // - time_hi_and_version[12:16] = 0b0100

  bytes[6] = bytes[6] & 0x0f | 0x40; // Section 4.4
  // - clock_seq_hi_and_reserved[6] = 0b0
  // - clock_seq_hi_and_reserved[7] = 0b1

  bytes[8] = bytes[8] & 0x3f | 0x80;
  const value = (0, _bytes.hexlify)(bytes);
  return [value.substring(2, 10), value.substring(10, 14), value.substring(14, 18), value.substring(18, 22), value.substring(22, 34)].join("-");
}
},{"@ethersproject/bytes":"aqkS","@ethersproject/strings":"ZW9k"}],"dEnt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrowdsaleAccount = void 0;
exports.decrypt = decrypt;

var _aesJs = _interopRequireDefault(require("aes-js"));

var _address = require("@ethersproject/address");

var _bytes = require("@ethersproject/bytes");

var _keccak = require("@ethersproject/keccak256");

var _pbkdf = require("@ethersproject/pbkdf2");

var _strings = require("@ethersproject/strings");

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _logger.Logger(_version.version);

class CrowdsaleAccount extends _properties.Description {
  isCrowdsaleAccount(value) {
    return !!(value && value._isCrowdsaleAccount);
  }

} // See: https://github.com/ethereum/pyethsaletool


exports.CrowdsaleAccount = CrowdsaleAccount;

function decrypt(json, password) {
  const data = JSON.parse(json);
  password = (0, _utils.getPassword)(password); // Ethereum Address

  const ethaddr = (0, _address.getAddress)((0, _utils.searchPath)(data, "ethaddr")); // Encrypted Seed

  const encseed = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "encseed"));

  if (!encseed || encseed.length % 16 !== 0) {
    logger.throwArgumentError("invalid encseed", "json", json);
  }

  const key = (0, _bytes.arrayify)((0, _pbkdf.pbkdf2)(password, password, 2000, 32, "sha256")).slice(0, 16);
  const iv = encseed.slice(0, 16);
  const encryptedSeed = encseed.slice(16); // Decrypt the seed

  const aesCbc = new _aesJs.default.ModeOfOperation.cbc(key, iv);

  const seed = _aesJs.default.padding.pkcs7.strip((0, _bytes.arrayify)(aesCbc.decrypt(encryptedSeed))); // This wallet format is weird... Convert the binary encoded hex to a string.


  let seedHex = "";

  for (let i = 0; i < seed.length; i++) {
    seedHex += String.fromCharCode(seed[i]);
  }

  const seedHexBytes = (0, _strings.toUtf8Bytes)(seedHex);
  const privateKey = (0, _keccak.keccak256)(seedHexBytes);
  return new CrowdsaleAccount({
    _isCrowdsaleAccount: true,
    address: ethaddr,
    privateKey: privateKey
  });
}
},{"aes-js":"ilr3","@ethersproject/address":"a1wm","@ethersproject/bytes":"aqkS","@ethersproject/keccak256":"g6Gq","@ethersproject/pbkdf2":"IYfJ","@ethersproject/strings":"ZW9k","@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"rvOu","./utils":"hXaP"}],"L5tn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJsonWalletAddress = getJsonWalletAddress;
exports.isCrowdsaleWallet = isCrowdsaleWallet;
exports.isKeystoreWallet = isKeystoreWallet;

var _address = require("@ethersproject/address");

function isCrowdsaleWallet(json) {
  let data = null;

  try {
    data = JSON.parse(json);
  } catch (error) {
    return false;
  }

  return data.encseed && data.ethaddr;
}

function isKeystoreWallet(json) {
  let data = null;

  try {
    data = JSON.parse(json);
  } catch (error) {
    return false;
  }

  if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
    return false;
  } // @TODO: Put more checks to make sure it has kdf, iv and all that good stuff


  return true;
} //export function isJsonWallet(json: string): boolean {
//    return (isSecretStorageWallet(json) || isCrowdsaleWallet(json));
//}


function getJsonWalletAddress(json) {
  if (isCrowdsaleWallet(json)) {
    try {
      return (0, _address.getAddress)(JSON.parse(json).ethaddr);
    } catch (error) {
      return null;
    }
  }

  if (isKeystoreWallet(json)) {
    try {
      return (0, _address.getAddress)(JSON.parse(json).address);
    } catch (error) {
      return null;
    }
  }

  return null;
}
},{"@ethersproject/address":"a1wm"}],"znz8":[function(require,module,exports) {
"use strict";

(function(root) {
    const MAX_VALUE = 0x7fffffff;

    // The SHA256 and PBKDF2 implementation are from scrypt-async-js:
    // See: https://github.com/dchest/scrypt-async-js
    function SHA256(m) {
        const K = new Uint32Array([
           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
           0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
           0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
           0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
           0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
           0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
           0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
           0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
           0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
           0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
       ]);

        let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
        let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
        const w = new Uint32Array(64);

        function blocks(p) {
            let off = 0, len = p.length;
            while (len >= 64) {
                let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i, j, t1, t2;

                for (i = 0; i < 16; i++) {
                    j = off + i*4;
                    w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                    ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
                }

                for (i = 16; i < 64; i++) {
                    u = w[i-2];
                    t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

                    u = w[i-15];
                    t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

                    w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
                }

                for (i = 0; i < 64; i++) {
                    t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
                             ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
                          ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

                    t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
                           ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
                h4 = (h4 + e) | 0;
                h5 = (h5 + f) | 0;
                h6 = (h6 + g) | 0;
                h7 = (h7 + h) | 0;

                off += 64;
                len -= 64;
            }
        }

        blocks(m);

        let i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

        p.push(0x80);
        for (i = bytesLeft + 1; i < numZeros; i++) { p.push(0); }
        p.push((bitLenHi >>> 24) & 0xff);
        p.push((bitLenHi >>> 16) & 0xff);
        p.push((bitLenHi >>> 8)  & 0xff);
        p.push((bitLenHi >>> 0)  & 0xff);
        p.push((bitLenLo >>> 24) & 0xff);
        p.push((bitLenLo >>> 16) & 0xff);
        p.push((bitLenLo >>> 8)  & 0xff);
        p.push((bitLenLo >>> 0)  & 0xff);

        blocks(p);

        return [
            (h0 >>> 24) & 0xff, (h0 >>> 16) & 0xff, (h0 >>> 8) & 0xff, (h0 >>> 0) & 0xff,
            (h1 >>> 24) & 0xff, (h1 >>> 16) & 0xff, (h1 >>> 8) & 0xff, (h1 >>> 0) & 0xff,
            (h2 >>> 24) & 0xff, (h2 >>> 16) & 0xff, (h2 >>> 8) & 0xff, (h2 >>> 0) & 0xff,
            (h3 >>> 24) & 0xff, (h3 >>> 16) & 0xff, (h3 >>> 8) & 0xff, (h3 >>> 0) & 0xff,
            (h4 >>> 24) & 0xff, (h4 >>> 16) & 0xff, (h4 >>> 8) & 0xff, (h4 >>> 0) & 0xff,
            (h5 >>> 24) & 0xff, (h5 >>> 16) & 0xff, (h5 >>> 8) & 0xff, (h5 >>> 0) & 0xff,
            (h6 >>> 24) & 0xff, (h6 >>> 16) & 0xff, (h6 >>> 8) & 0xff, (h6 >>> 0) & 0xff,
            (h7 >>> 24) & 0xff, (h7 >>> 16) & 0xff, (h7 >>> 8) & 0xff, (h7 >>> 0) & 0xff
        ];
    }

    function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        // compress password if it's longer than hash block length
        password = (password.length <= 64) ? password : SHA256(password);

        const innerLen = 64 + salt.length + 4;
        const inner = new Array(innerLen);
        const outerKey = new Array(64);

        let i;
        let dk = [];

        // inner = (password ^ ipad) || salt || counter
        for (i = 0; i < 64; i++) { inner[i] = 0x36; }
        for (i = 0; i < password.length; i++) { inner[i] ^= password[i]; }
        for (i = 0; i < salt.length; i++) { inner[64 + i] = salt[i]; }
        for (i = innerLen - 4; i < innerLen; i++) { inner[i] = 0; }

        // outerKey = password ^ opad
        for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
        for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

        // increments counter inside inner
        function incrementCounter() {
            for (let i = innerLen - 1; i >= innerLen - 4; i--) {
                inner[i]++;
                if (inner[i] <= 0xff) return;
                inner[i] = 0;
            }
        }

        // output blocks = SHA256(outerKey || SHA256(inner)) ...
        while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
        }
        if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }

        return dk;
    }

    // The following is an adaptation of scryptsy
    // See: https://www.npmjs.com/package/scryptsy
    function blockmix_salsa8(BY, Yi, r, x, _X) {
        let i;

        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
        for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2) * 16, BY, (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
        }
    }

    function R(a, b) {
        return (a << b) | (a >>> (32 - b));
    }

    function salsa20_8(B, x) {
        arraycopy(B, 0, x, 0, 16);

        for (let i = 8; i > 0; i -= 2) {
            x[ 4] ^= R(x[ 0] + x[12], 7);
            x[ 8] ^= R(x[ 4] + x[ 0], 9);
            x[12] ^= R(x[ 8] + x[ 4], 13);
            x[ 0] ^= R(x[12] + x[ 8], 18);
            x[ 9] ^= R(x[ 5] + x[ 1], 7);
            x[13] ^= R(x[ 9] + x[ 5], 9);
            x[ 1] ^= R(x[13] + x[ 9], 13);
            x[ 5] ^= R(x[ 1] + x[13], 18);
            x[14] ^= R(x[10] + x[ 6], 7);
            x[ 2] ^= R(x[14] + x[10], 9);
            x[ 6] ^= R(x[ 2] + x[14], 13);
            x[10] ^= R(x[ 6] + x[ 2], 18);
            x[ 3] ^= R(x[15] + x[11], 7);
            x[ 7] ^= R(x[ 3] + x[15], 9);
            x[11] ^= R(x[ 7] + x[ 3], 13);
            x[15] ^= R(x[11] + x[ 7], 18);
            x[ 1] ^= R(x[ 0] + x[ 3], 7);
            x[ 2] ^= R(x[ 1] + x[ 0], 9);
            x[ 3] ^= R(x[ 2] + x[ 1], 13);
            x[ 0] ^= R(x[ 3] + x[ 2], 18);
            x[ 6] ^= R(x[ 5] + x[ 4], 7);
            x[ 7] ^= R(x[ 6] + x[ 5], 9);
            x[ 4] ^= R(x[ 7] + x[ 6], 13);
            x[ 5] ^= R(x[ 4] + x[ 7], 18);
            x[11] ^= R(x[10] + x[ 9], 7);
            x[ 8] ^= R(x[11] + x[10], 9);
            x[ 9] ^= R(x[ 8] + x[11], 13);
            x[10] ^= R(x[ 9] + x[ 8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
        }

        for (let i = 0; i < 16; ++i) {
            B[i] += x[i];
        }
    }

    // naive approach... going back to loop unrolling may yield additional performance
    function blockxor(S, Si, D, len) {
        for (let i = 0; i < len; i++) {
            D[i] ^= S[Si + i]
        }
    }

    function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    }

    function checkBufferish(o) {
        if (!o || typeof(o.length) !== 'number') { return false; }

        for (let i = 0; i < o.length; i++) {
            const v = o[i];
            if (typeof(v) !== 'number' || v % 1 || v < 0 || v >= 256) {
                return false;
            }
        }

        return true;
    }

    function ensureInteger(value, name) {
        if (typeof(value) !== "number" || (value % 1)) { throw new Error('invalid ' + name); }
        return value;
    }

    // N = Cpu cost, r = Memory cost, p = parallelization cost
    // callback(error, progress, key)
    function _scrypt(password, salt, N, r, p, dkLen, callback) {

        N = ensureInteger(N, 'N');
        r = ensureInteger(r, 'r');
        p = ensureInteger(p, 'p');

        dkLen = ensureInteger(dkLen, 'dkLen');

        if (N === 0 || (N & (N - 1)) !== 0) { throw new Error('N must be power of 2'); }

        if (N > MAX_VALUE / 128 / r) { throw new Error('N too large'); }
        if (r > MAX_VALUE / 128 / p) { throw new Error('r too large'); }

        if (!checkBufferish(password)) {
            throw new Error('password must be an array or buffer');
        }
        password = Array.prototype.slice.call(password);

        if (!checkBufferish(salt)) {
            throw new Error('salt must be an array or buffer');
        }
        salt = Array.prototype.slice.call(salt);

        let b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
        const B = new Uint32Array(p * 32 * r)
        for (let i = 0; i < B.length; i++) {
            const j = i * 4;
            B[i] = ((b[j + 3] & 0xff) << 24) |
                   ((b[j + 2] & 0xff) << 16) |
                   ((b[j + 1] & 0xff) << 8) |
                   ((b[j + 0] & 0xff) << 0);
        }

        const XY = new Uint32Array(64 * r);
        const V = new Uint32Array(32 * r * N);

        const Yi = 32 * r;

        // scratch space
        const x = new Uint32Array(16);       // salsa20_8
        const _X = new Uint32Array(16);      // blockmix_salsa8

        const totalOps = p * N * 2;
        let currentOp = 0;
        let lastPercent10 = null;

        // Set this to true to abandon the scrypt on the next step
        let stop = false;

        // State information
        let state = 0;
        let i0 = 0, i1;
        let Bi;

        // How many blockmix_salsa8 can we do per step?
        const limit = callback ? parseInt(1000 / r): 0xffffffff;

        // Trick from scrypt-async; if there is a setImmediate shim in place, use it
        const nextTick = (typeof(setImmediate) !== 'undefined') ? setImmediate : setTimeout;

        // This is really all I changed; making scryptsy a state machine so we occasionally
        // stop and give other evnts on the evnt loop a chance to run. ~RicMoo
        const incrementalSMix = function() {
            if (stop) {
                return callback(new Error('cancelled'), currentOp / totalOps);
            }

            let steps;

            switch (state) {
                case 0:
                    // for (var i = 0; i < p; i++)...
                    Bi = i0 * 32 * r;

                    arraycopy(B, Bi, XY, 0, Yi);                       // ROMix - 1

                    state = 1;                                         // Move to ROMix 2
                    i1 = 0;

                    // Fall through

                case 1:

                    // Run up to 1000 steps of the first inner smix loop
                    steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (let i = 0; i < steps; i++) {                  // ROMix - 2
                        arraycopy(XY, 0, V, (i1 + i) * Yi, Yi)         // ROMix - 3
                        blockmix_salsa8(XY, Yi, r, x, _X);             // ROMix - 4
                    }

                    // for (var i = 0; i < N; i++)
                    i1 += steps;
                    currentOp += steps;

                    if (callback) {
                        // Call the callback with the progress (optionally stopping us)
                        const percent10 = parseInt(1000 * currentOp / totalOps);
                        if (percent10 !== lastPercent10) {
                            stop = callback(null, currentOp / totalOps);
                            if (stop) { break; }
                            lastPercent10 = percent10;
                        }
                    }

                    if (i1 < N) { break; }

                    i1 = 0;                                          // Move to ROMix 6
                    state = 2;

                    // Fall through

                case 2:

                    // Run up to 1000 steps of the second inner smix loop
                    steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (let i = 0; i < steps; i++) {                // ROMix - 6
                        const offset = (2 * r - 1) * 16;             // ROMix - 7
                        const j = XY[offset] & (N - 1);
                        blockxor(V, j * Yi, XY, Yi);                 // ROMix - 8 (inner)
                        blockmix_salsa8(XY, Yi, r, x, _X);           // ROMix - 9 (outer)
                    }

                    // for (var i = 0; i < N; i++)...
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    if (callback) {
                        const percent10 = parseInt(1000 * currentOp / totalOps);
                        if (percent10 !== lastPercent10) {
                            stop = callback(null, currentOp / totalOps);
                            if (stop) { break; }
                            lastPercent10 = percent10;
                        }
                    }

                    if (i1 < N) { break; }

                    arraycopy(XY, 0, B, Bi, Yi);                     // ROMix - 10

                    // for (var i = 0; i < p; i++)...
                    i0++;
                    if (i0 < p) {
                        state = 0;
                        break;
                    }

                    b = [];
                    for (let i = 0; i < B.length; i++) {
                        b.push((B[i] >>  0) & 0xff);
                        b.push((B[i] >>  8) & 0xff);
                        b.push((B[i] >> 16) & 0xff);
                        b.push((B[i] >> 24) & 0xff);
                    }

                    const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);

                    // Send the result to the callback
                    if (callback) { callback(null, 1.0, derivedKey); }

                    // Done; don't break (which would reschedule)
                    return derivedKey;
            }

            // Schedule the next steps
            if (callback) { nextTick(incrementalSMix); }
        }

        // Run the smix state machine until completion
        if (!callback) {
            while (true) {
                const derivedKey = incrementalSMix();
                if (derivedKey != undefined) { return derivedKey; }
            }
        }

        // Bootstrap the async incremental smix
        incrementalSMix();
    }

    const lib = {
        scrypt: function(password, salt, N, r, p, dkLen, progressCallback) {
            return new Promise(function(resolve, reject) {
                let lastProgress = 0;
                if (progressCallback) { progressCallback(0); }
                _scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
                    if (error) {
                        reject(error);
                    } else if (key) {
                        if (progressCallback && lastProgress !== 1) {
                            progressCallback(1);
                        }
                        resolve(new Uint8Array(key));
                    } else if (progressCallback && progress !== lastProgress) {
                        lastProgress = progress;
                        return progressCallback(progress);
                    }
                });
            });
        },
        syncScrypt: function(password, salt, N, r, p, dkLen) {
            return new Uint8Array(_scrypt(password, salt, N, r, p, dkLen));
        }
    };

    // node.js
    if (typeof(exports) !== 'undefined') {
       module.exports = lib;

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(lib);

    // Web Browsers
    } else if (root) {

        // If there was an existing library "scrypt", make sure it is still available
        if (root.scrypt) {
            root._scrypt = root.scrypt;
        }

        root.scrypt = lib;
    }

})(this);

},{}],"DfTj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeystoreAccount = void 0;
exports.decrypt = decrypt;
exports.decryptSync = decryptSync;
exports.encrypt = encrypt;

var _aesJs = _interopRequireDefault(require("aes-js"));

var _scryptJs = _interopRequireDefault(require("scrypt-js"));

var _address = require("@ethersproject/address");

var _bytes = require("@ethersproject/bytes");

var _hdnode = require("@ethersproject/hdnode");

var _keccak = require("@ethersproject/keccak256");

var _pbkdf = require("@ethersproject/pbkdf2");

var _random = require("@ethersproject/random");

var _properties = require("@ethersproject/properties");

var _transactions = require("@ethersproject/transactions");

var _utils = require("./utils");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version); // Exported Types

function hasMnemonic(value) {
  return value != null && value.mnemonic && value.mnemonic.phrase;
}

class KeystoreAccount extends _properties.Description {
  isKeystoreAccount(value) {
    return !!(value && value._isKeystoreAccount);
  }

}

exports.KeystoreAccount = KeystoreAccount;

function _decrypt(data, key, ciphertext) {
  const cipher = (0, _utils.searchPath)(data, "crypto/cipher");

  if (cipher === "aes-128-ctr") {
    const iv = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "crypto/cipherparams/iv"));
    const counter = new _aesJs.default.Counter(iv);
    const aesCtr = new _aesJs.default.ModeOfOperation.ctr(key, counter);
    return (0, _bytes.arrayify)(aesCtr.decrypt(ciphertext));
  }

  return null;
}

function _getAccount(data, key) {
  const ciphertext = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "crypto/ciphertext"));
  const computedMAC = (0, _bytes.hexlify)((0, _keccak.keccak256)((0, _bytes.concat)([key.slice(16, 32), ciphertext]))).substring(2);

  if (computedMAC !== (0, _utils.searchPath)(data, "crypto/mac").toLowerCase()) {
    throw new Error("invalid password");
  }

  const privateKey = _decrypt(data, key.slice(0, 16), ciphertext);

  if (!privateKey) {
    logger.throwError("unsupported cipher", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "decrypt"
    });
  }

  const mnemonicKey = key.slice(32, 64);
  const address = (0, _transactions.computeAddress)(privateKey);

  if (data.address) {
    let check = data.address.toLowerCase();

    if (check.substring(0, 2) !== "0x") {
      check = "0x" + check;
    }

    if ((0, _address.getAddress)(check) !== address) {
      throw new Error("address mismatch");
    }
  }

  const account = {
    _isKeystoreAccount: true,
    address: address,
    privateKey: (0, _bytes.hexlify)(privateKey)
  }; // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase

  if ((0, _utils.searchPath)(data, "x-ethers/version") === "0.1") {
    const mnemonicCiphertext = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "x-ethers/mnemonicCiphertext"));
    const mnemonicIv = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "x-ethers/mnemonicCounter"));
    const mnemonicCounter = new _aesJs.default.Counter(mnemonicIv);
    const mnemonicAesCtr = new _aesJs.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);

    const path = (0, _utils.searchPath)(data, "x-ethers/path") || _hdnode.defaultPath;

    const locale = (0, _utils.searchPath)(data, "x-ethers/locale") || "en";
    const entropy = (0, _bytes.arrayify)(mnemonicAesCtr.decrypt(mnemonicCiphertext));

    try {
      const mnemonic = (0, _hdnode.entropyToMnemonic)(entropy, locale);

      const node = _hdnode.HDNode.fromMnemonic(mnemonic, null, locale).derivePath(path);

      if (node.privateKey != account.privateKey) {
        throw new Error("mnemonic mismatch");
      }

      account.mnemonic = node.mnemonic;
    } catch (error) {
      // If we don't have the locale wordlist installed to
      // read this mnemonic, just bail and don't set the
      // mnemonic
      if (error.code !== _logger.Logger.errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
        throw error;
      }
    }
  }

  return new KeystoreAccount(account);
}

function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
  return (0, _bytes.arrayify)((0, _pbkdf.pbkdf2)(passwordBytes, salt, count, dkLen, prfFunc));
}

function pbkdf2(passwordBytes, salt, count, dkLen, prfFunc) {
  return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
}

function _computeKdfKey(data, password, pbkdf2Func, scryptFunc, progressCallback) {
  const passwordBytes = (0, _utils.getPassword)(password);
  const kdf = (0, _utils.searchPath)(data, "crypto/kdf");

  if (kdf && typeof kdf === "string") {
    const throwError = function (name, value) {
      return logger.throwArgumentError("invalid key-derivation function parameters", name, value);
    };

    if (kdf.toLowerCase() === "scrypt") {
      const salt = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "crypto/kdfparams/salt"));
      const N = parseInt((0, _utils.searchPath)(data, "crypto/kdfparams/n"));
      const r = parseInt((0, _utils.searchPath)(data, "crypto/kdfparams/r"));
      const p = parseInt((0, _utils.searchPath)(data, "crypto/kdfparams/p")); // Check for all required parameters

      if (!N || !r || !p) {
        throwError("kdf", kdf);
      } // Make sure N is a power of 2


      if ((N & N - 1) !== 0) {
        throwError("N", N);
      }

      const dkLen = parseInt((0, _utils.searchPath)(data, "crypto/kdfparams/dklen"));

      if (dkLen !== 32) {
        throwError("dklen", dkLen);
      }

      return scryptFunc(passwordBytes, salt, N, r, p, 64, progressCallback);
    } else if (kdf.toLowerCase() === "pbkdf2") {
      const salt = (0, _utils.looseArrayify)((0, _utils.searchPath)(data, "crypto/kdfparams/salt"));
      let prfFunc = null;
      const prf = (0, _utils.searchPath)(data, "crypto/kdfparams/prf");

      if (prf === "hmac-sha256") {
        prfFunc = "sha256";
      } else if (prf === "hmac-sha512") {
        prfFunc = "sha512";
      } else {
        throwError("prf", prf);
      }

      const count = parseInt((0, _utils.searchPath)(data, "crypto/kdfparams/c"));
      const dkLen = parseInt((0, _utils.searchPath)(data, "crypto/kdfparams/dklen"));

      if (dkLen !== 32) {
        throwError("dklen", dkLen);
      }

      return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
    }
  }

  return logger.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
}

function decryptSync(json, password) {
  const data = JSON.parse(json);

  const key = _computeKdfKey(data, password, pbkdf2Sync, _scryptJs.default.syncScrypt);

  return _getAccount(data, key);
}

function decrypt(json, password, progressCallback) {
  return __awaiter(this, void 0, void 0, function* () {
    const data = JSON.parse(json);
    const key = yield _computeKdfKey(data, password, pbkdf2, _scryptJs.default.scrypt, progressCallback);
    return _getAccount(data, key);
  });
}

function encrypt(account, password, options, progressCallback) {
  try {
    // Check the address matches the private key
    if ((0, _address.getAddress)(account.address) !== (0, _transactions.computeAddress)(account.privateKey)) {
      throw new Error("address/privateKey mismatch");
    } // Check the mnemonic (if any) matches the private key


    if (hasMnemonic(account)) {
      const mnemonic = account.mnemonic;

      const node = _hdnode.HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || _hdnode.defaultPath);

      if (node.privateKey != account.privateKey) {
        throw new Error("mnemonic mismatch");
      }
    }
  } catch (e) {
    return Promise.reject(e);
  } // The options are optional, so adjust the call as needed


  if (typeof options === "function" && !progressCallback) {
    progressCallback = options;
    options = {};
  }

  if (!options) {
    options = {};
  }

  const privateKey = (0, _bytes.arrayify)(account.privateKey);
  const passwordBytes = (0, _utils.getPassword)(password);
  let entropy = null;
  let path = null;
  let locale = null;

  if (hasMnemonic(account)) {
    const srcMnemonic = account.mnemonic;
    entropy = (0, _bytes.arrayify)((0, _hdnode.mnemonicToEntropy)(srcMnemonic.phrase, srcMnemonic.locale || "en"));
    path = srcMnemonic.path || _hdnode.defaultPath;
    locale = srcMnemonic.locale || "en";
  }

  let client = options.client;

  if (!client) {
    client = "ethers.js";
  } // Check/generate the salt


  let salt = null;

  if (options.salt) {
    salt = (0, _bytes.arrayify)(options.salt);
  } else {
    salt = (0, _random.randomBytes)(32);
    ;
  } // Override initialization vector


  let iv = null;

  if (options.iv) {
    iv = (0, _bytes.arrayify)(options.iv);

    if (iv.length !== 16) {
      throw new Error("invalid iv");
    }
  } else {
    iv = (0, _random.randomBytes)(16);
  } // Override the uuid


  let uuidRandom = null;

  if (options.uuid) {
    uuidRandom = (0, _bytes.arrayify)(options.uuid);

    if (uuidRandom.length !== 16) {
      throw new Error("invalid uuid");
    }
  } else {
    uuidRandom = (0, _random.randomBytes)(16);
  } // Override the scrypt password-based key derivation function parameters


  let N = 1 << 17,
      r = 8,
      p = 1;

  if (options.scrypt) {
    if (options.scrypt.N) {
      N = options.scrypt.N;
    }

    if (options.scrypt.r) {
      r = options.scrypt.r;
    }

    if (options.scrypt.p) {
      p = options.scrypt.p;
    }
  } // We take 64 bytes:
  //   - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
  //   - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)


  return _scryptJs.default.scrypt(passwordBytes, salt, N, r, p, 64, progressCallback).then(key => {
    key = (0, _bytes.arrayify)(key); // This will be used to encrypt the wallet (as per Web3 secret storage)

    const derivedKey = key.slice(0, 16);
    const macPrefix = key.slice(16, 32); // This will be used to encrypt the mnemonic phrase (if any)

    const mnemonicKey = key.slice(32, 64); // Encrypt the private key

    const counter = new _aesJs.default.Counter(iv);
    const aesCtr = new _aesJs.default.ModeOfOperation.ctr(derivedKey, counter);
    const ciphertext = (0, _bytes.arrayify)(aesCtr.encrypt(privateKey)); // Compute the message authentication code, used to check the password

    const mac = (0, _keccak.keccak256)((0, _bytes.concat)([macPrefix, ciphertext])); // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition

    const data = {
      address: account.address.substring(2).toLowerCase(),
      id: (0, _utils.uuidV4)(uuidRandom),
      version: 3,
      Crypto: {
        cipher: "aes-128-ctr",
        cipherparams: {
          iv: (0, _bytes.hexlify)(iv).substring(2)
        },
        ciphertext: (0, _bytes.hexlify)(ciphertext).substring(2),
        kdf: "scrypt",
        kdfparams: {
          salt: (0, _bytes.hexlify)(salt).substring(2),
          n: N,
          dklen: 32,
          p: p,
          r: r
        },
        mac: mac.substring(2)
      }
    }; // If we have a mnemonic, encrypt it into the JSON wallet

    if (entropy) {
      const mnemonicIv = (0, _random.randomBytes)(16);
      const mnemonicCounter = new _aesJs.default.Counter(mnemonicIv);
      const mnemonicAesCtr = new _aesJs.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
      const mnemonicCiphertext = (0, _bytes.arrayify)(mnemonicAesCtr.encrypt(entropy));
      const now = new Date();
      const timestamp = now.getUTCFullYear() + "-" + (0, _utils.zpad)(now.getUTCMonth() + 1, 2) + "-" + (0, _utils.zpad)(now.getUTCDate(), 2) + "T" + (0, _utils.zpad)(now.getUTCHours(), 2) + "-" + (0, _utils.zpad)(now.getUTCMinutes(), 2) + "-" + (0, _utils.zpad)(now.getUTCSeconds(), 2) + ".0Z";
      data["x-ethers"] = {
        client: client,
        gethFilename: "UTC--" + timestamp + "--" + data.address,
        mnemonicCounter: (0, _bytes.hexlify)(mnemonicIv).substring(2),
        mnemonicCiphertext: (0, _bytes.hexlify)(mnemonicCiphertext).substring(2),
        path: path,
        locale: locale,
        version: "0.1"
      };
    }

    return JSON.stringify(data);
  });
}
},{"aes-js":"ilr3","scrypt-js":"znz8","@ethersproject/address":"a1wm","@ethersproject/bytes":"aqkS","@ethersproject/hdnode":"oCaL","@ethersproject/keccak256":"g6Gq","@ethersproject/pbkdf2":"IYfJ","@ethersproject/random":"LoH0","@ethersproject/properties":"JuuX","@ethersproject/transactions":"OW34","./utils":"hXaP","@ethersproject/logger":"kMNH","./_version":"rvOu"}],"TeON":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "decryptCrowdsale", {
  enumerable: true,
  get: function () {
    return _crowdsale.decrypt;
  }
});
exports.decryptJsonWallet = decryptJsonWallet;
exports.decryptJsonWalletSync = decryptJsonWalletSync;
Object.defineProperty(exports, "decryptKeystore", {
  enumerable: true,
  get: function () {
    return _keystore.decrypt;
  }
});
Object.defineProperty(exports, "decryptKeystoreSync", {
  enumerable: true,
  get: function () {
    return _keystore.decryptSync;
  }
});
Object.defineProperty(exports, "encryptKeystore", {
  enumerable: true,
  get: function () {
    return _keystore.encrypt;
  }
});
Object.defineProperty(exports, "getJsonWalletAddress", {
  enumerable: true,
  get: function () {
    return _inspect.getJsonWalletAddress;
  }
});
Object.defineProperty(exports, "isCrowdsaleWallet", {
  enumerable: true,
  get: function () {
    return _inspect.isCrowdsaleWallet;
  }
});
Object.defineProperty(exports, "isKeystoreWallet", {
  enumerable: true,
  get: function () {
    return _inspect.isKeystoreWallet;
  }
});

var _crowdsale = require("./crowdsale");

var _inspect = require("./inspect");

var _keystore = require("./keystore");

function decryptJsonWallet(json, password, progressCallback) {
  if ((0, _inspect.isCrowdsaleWallet)(json)) {
    if (progressCallback) {
      progressCallback(0);
    }

    const account = (0, _crowdsale.decrypt)(json, password);

    if (progressCallback) {
      progressCallback(1);
    }

    return Promise.resolve(account);
  }

  if ((0, _inspect.isKeystoreWallet)(json)) {
    return (0, _keystore.decrypt)(json, password, progressCallback);
  }

  return Promise.reject(new Error("invalid JSON wallet"));
}

function decryptJsonWalletSync(json, password) {
  if ((0, _inspect.isCrowdsaleWallet)(json)) {
    return (0, _crowdsale.decrypt)(json, password);
  }

  if ((0, _inspect.isKeystoreWallet)(json)) {
    return (0, _keystore.decryptSync)(json, password);
  }

  throw new Error("invalid JSON wallet");
}
},{"./crowdsale":"dEnt","./inspect":"L5tn","./keystore":"DfTj"}],"yJik":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "wallet/5.5.0";
exports.version = version;
},{}],"TP6f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;
exports.verifyMessage = verifyMessage;
exports.verifyTypedData = verifyTypedData;

var _address = require("@ethersproject/address");

var _abstractProvider = require("@ethersproject/abstract-provider");

var _abstractSigner = require("@ethersproject/abstract-signer");

var _bytes = require("@ethersproject/bytes");

var _hash = require("@ethersproject/hash");

var _hdnode = require("@ethersproject/hdnode");

var _keccak = require("@ethersproject/keccak256");

var _properties = require("@ethersproject/properties");

var _random = require("@ethersproject/random");

var _signingKey = require("@ethersproject/signing-key");

var _jsonWallets = require("@ethersproject/json-wallets");

var _transactions = require("@ethersproject/transactions");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

function isAccount(value) {
  return value != null && (0, _bytes.isHexString)(value.privateKey, 32) && value.address != null;
}

function hasMnemonic(value) {
  const mnemonic = value.mnemonic;
  return mnemonic && mnemonic.phrase;
}

class Wallet extends _abstractSigner.Signer {
  constructor(privateKey, provider) {
    logger.checkNew(new.target, Wallet);
    super();

    if (isAccount(privateKey)) {
      const signingKey = new _signingKey.SigningKey(privateKey.privateKey);
      (0, _properties.defineReadOnly)(this, "_signingKey", () => signingKey);
      (0, _properties.defineReadOnly)(this, "address", (0, _transactions.computeAddress)(this.publicKey));

      if (this.address !== (0, _address.getAddress)(privateKey.address)) {
        logger.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]");
      }

      if (hasMnemonic(privateKey)) {
        const srcMnemonic = privateKey.mnemonic;
        (0, _properties.defineReadOnly)(this, "_mnemonic", () => ({
          phrase: srcMnemonic.phrase,
          path: srcMnemonic.path || _hdnode.defaultPath,
          locale: srcMnemonic.locale || "en"
        }));
        const mnemonic = this.mnemonic;

        const node = _hdnode.HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path);

        if ((0, _transactions.computeAddress)(node.privateKey) !== this.address) {
          logger.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
        }
      } else {
        (0, _properties.defineReadOnly)(this, "_mnemonic", () => null);
      }
    } else {
      if (_signingKey.SigningKey.isSigningKey(privateKey)) {
        /* istanbul ignore if */
        if (privateKey.curve !== "secp256k1") {
          logger.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]");
        }

        (0, _properties.defineReadOnly)(this, "_signingKey", () => privateKey);
      } else {
        // A lot of common tools do not prefix private keys with a 0x (see: #1166)
        if (typeof privateKey === "string") {
          if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
            privateKey = "0x" + privateKey;
          }
        }

        const signingKey = new _signingKey.SigningKey(privateKey);
        (0, _properties.defineReadOnly)(this, "_signingKey", () => signingKey);
      }

      (0, _properties.defineReadOnly)(this, "_mnemonic", () => null);
      (0, _properties.defineReadOnly)(this, "address", (0, _transactions.computeAddress)(this.publicKey));
    }
    /* istanbul ignore if */


    if (provider && !_abstractProvider.Provider.isProvider(provider)) {
      logger.throwArgumentError("invalid provider", "provider", provider);
    }

    (0, _properties.defineReadOnly)(this, "provider", provider || null);
  }

  get mnemonic() {
    return this._mnemonic();
  }

  get privateKey() {
    return this._signingKey().privateKey;
  }

  get publicKey() {
    return this._signingKey().publicKey;
  }

  getAddress() {
    return Promise.resolve(this.address);
  }

  connect(provider) {
    return new Wallet(this, provider);
  }

  signTransaction(transaction) {
    return (0, _properties.resolveProperties)(transaction).then(tx => {
      if (tx.from != null) {
        if ((0, _address.getAddress)(tx.from) !== this.address) {
          logger.throwArgumentError("transaction from address mismatch", "transaction.from", transaction.from);
        }

        delete tx.from;
      }

      const signature = this._signingKey().signDigest((0, _keccak.keccak256)((0, _transactions.serialize)(tx)));

      return (0, _transactions.serialize)(tx, signature);
    });
  }

  signMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
      return (0, _bytes.joinSignature)(this._signingKey().signDigest((0, _hash.hashMessage)(message)));
    });
  }

  _signTypedData(domain, types, value) {
    return __awaiter(this, void 0, void 0, function* () {
      // Populate any ENS names
      const populated = yield _hash._TypedDataEncoder.resolveNames(domain, types, value, name => {
        if (this.provider == null) {
          logger.throwError("cannot resolve ENS names without a provider", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "resolveName",
            value: name
          });
        }

        return this.provider.resolveName(name);
      });
      return (0, _bytes.joinSignature)(this._signingKey().signDigest(_hash._TypedDataEncoder.hash(populated.domain, types, populated.value)));
    });
  }

  encrypt(password, options, progressCallback) {
    if (typeof options === "function" && !progressCallback) {
      progressCallback = options;
      options = {};
    }

    if (progressCallback && typeof progressCallback !== "function") {
      throw new Error("invalid callback");
    }

    if (!options) {
      options = {};
    }

    return (0, _jsonWallets.encryptKeystore)(this, password, options, progressCallback);
  }
  /**
   *  Static methods to create Wallet instances.
   */


  static createRandom(options) {
    let entropy = (0, _random.randomBytes)(16);

    if (!options) {
      options = {};
    }

    if (options.extraEntropy) {
      entropy = (0, _bytes.arrayify)((0, _bytes.hexDataSlice)((0, _keccak.keccak256)((0, _bytes.concat)([entropy, options.extraEntropy])), 0, 16));
    }

    const mnemonic = (0, _hdnode.entropyToMnemonic)(entropy, options.locale);
    return Wallet.fromMnemonic(mnemonic, options.path, options.locale);
  }

  static fromEncryptedJson(json, password, progressCallback) {
    return (0, _jsonWallets.decryptJsonWallet)(json, password, progressCallback).then(account => {
      return new Wallet(account);
    });
  }

  static fromEncryptedJsonSync(json, password) {
    return new Wallet((0, _jsonWallets.decryptJsonWalletSync)(json, password));
  }

  static fromMnemonic(mnemonic, path, wordlist) {
    if (!path) {
      path = _hdnode.defaultPath;
    }

    return new Wallet(_hdnode.HDNode.fromMnemonic(mnemonic, null, wordlist).derivePath(path));
  }

}

exports.Wallet = Wallet;

function verifyMessage(message, signature) {
  return (0, _transactions.recoverAddress)((0, _hash.hashMessage)(message), signature);
}

function verifyTypedData(domain, types, value, signature) {
  return (0, _transactions.recoverAddress)(_hash._TypedDataEncoder.hash(domain, types, value), signature);
}
},{"@ethersproject/address":"a1wm","@ethersproject/abstract-provider":"GKyj","@ethersproject/abstract-signer":"l8eZ","@ethersproject/bytes":"aqkS","@ethersproject/hash":"eHxR","@ethersproject/hdnode":"oCaL","@ethersproject/keccak256":"g6Gq","@ethersproject/properties":"JuuX","@ethersproject/random":"LoH0","@ethersproject/signing-key":"KjI1","@ethersproject/json-wallets":"TeON","@ethersproject/transactions":"OW34","@ethersproject/logger":"kMNH","./_version":"yJik"}],"MhgO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "networks/5.5.0";
exports.version = version;
},{}],"k9P0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetwork = getNetwork;

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);
;

function isRenetworkable(value) {
  return value && typeof value.renetwork === "function";
}

function ethDefaultProvider(network) {
  const func = function (providers, options) {
    if (options == null) {
      options = {};
    }

    const providerList = [];

    if (providers.InfuraProvider) {
      try {
        providerList.push(new providers.InfuraProvider(network, options.infura));
      } catch (error) {}
    }

    if (providers.EtherscanProvider) {
      try {
        providerList.push(new providers.EtherscanProvider(network, options.etherscan));
      } catch (error) {}
    }

    if (providers.AlchemyProvider) {
      try {
        providerList.push(new providers.AlchemyProvider(network, options.alchemy));
      } catch (error) {}
    }

    if (providers.PocketProvider) {
      // These networks are currently faulty on Pocket as their
      // network does not handle the Berlin hardfork, which is
      // live on these ones.
      // @TODO: This goes away once Pocket has upgraded their nodes
      const skip = ["goerli", "ropsten", "rinkeby"];

      try {
        const provider = new providers.PocketProvider(network);

        if (provider.network && skip.indexOf(provider.network.name) === -1) {
          providerList.push(provider);
        }
      } catch (error) {}
    }

    if (providers.CloudflareProvider) {
      try {
        providerList.push(new providers.CloudflareProvider(network));
      } catch (error) {}
    }

    if (providerList.length === 0) {
      return null;
    }

    if (providers.FallbackProvider) {
      let quorum = 1;

      if (options.quorum != null) {
        quorum = options.quorum;
      } else if (network === "homestead") {
        quorum = 2;
      }

      return new providers.FallbackProvider(providerList, quorum);
    }

    return providerList[0];
  };

  func.renetwork = function (network) {
    return ethDefaultProvider(network);
  };

  return func;
}

function etcDefaultProvider(url, network) {
  const func = function (providers, options) {
    if (providers.JsonRpcProvider) {
      return new providers.JsonRpcProvider(url, network);
    }

    return null;
  };

  func.renetwork = function (network) {
    return etcDefaultProvider(url, network);
  };

  return func;
}

const homestead = {
  chainId: 1,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "homestead",
  _defaultProvider: ethDefaultProvider("homestead")
};
const ropsten = {
  chainId: 3,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "ropsten",
  _defaultProvider: ethDefaultProvider("ropsten")
};
const classicMordor = {
  chainId: 63,
  name: "classicMordor",
  _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
};
const networks = {
  unspecified: {
    chainId: 0,
    name: "unspecified"
  },
  homestead: homestead,
  mainnet: homestead,
  morden: {
    chainId: 2,
    name: "morden"
  },
  ropsten: ropsten,
  testnet: ropsten,
  rinkeby: {
    chainId: 4,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "rinkeby",
    _defaultProvider: ethDefaultProvider("rinkeby")
  },
  kovan: {
    chainId: 42,
    name: "kovan",
    _defaultProvider: ethDefaultProvider("kovan")
  },
  goerli: {
    chainId: 5,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "goerli",
    _defaultProvider: ethDefaultProvider("goerli")
  },
  // ETC (See: #351)
  classic: {
    chainId: 61,
    name: "classic",
    _defaultProvider: etcDefaultProvider("https:/\/www.ethercluster.com/etc", "classic")
  },
  classicMorden: {
    chainId: 62,
    name: "classicMorden"
  },
  classicMordor: classicMordor,
  classicTestnet: classicMordor,
  classicKotti: {
    chainId: 6,
    name: "classicKotti",
    _defaultProvider: etcDefaultProvider("https:/\/www.ethercluster.com/kotti", "classicKotti")
  },
  xdai: {
    chainId: 100,
    name: "xdai"
  },
  matic: {
    chainId: 137,
    name: "matic"
  },
  maticmum: {
    chainId: 80001,
    name: "maticmum"
  },
  bnb: {
    chainId: 56,
    name: "bnb"
  },
  bnbt: {
    chainId: 97,
    name: "bnbt"
  }
};
/**
 *  getNetwork
 *
 *  Converts a named common networks or chain ID (network ID) to a Network
 *  and verifies a network is a valid Network..
 */

function getNetwork(network) {
  // No network (null)
  if (network == null) {
    return null;
  }

  if (typeof network === "number") {
    for (const name in networks) {
      const standard = networks[name];

      if (standard.chainId === network) {
        return {
          name: standard.name,
          chainId: standard.chainId,
          ensAddress: standard.ensAddress || null,
          _defaultProvider: standard._defaultProvider || null
        };
      }
    }

    return {
      chainId: network,
      name: "unknown"
    };
  }

  if (typeof network === "string") {
    const standard = networks[network];

    if (standard == null) {
      return null;
    }

    return {
      name: standard.name,
      chainId: standard.chainId,
      ensAddress: standard.ensAddress,
      _defaultProvider: standard._defaultProvider || null
    };
  }

  const standard = networks[network.name]; // Not a standard network; check that it is a valid network in general

  if (!standard) {
    if (typeof network.chainId !== "number") {
      logger.throwArgumentError("invalid network chainId", "network", network);
    }

    return network;
  } // Make sure the chainId matches the expected network chainId (or is 0; disable EIP-155)


  if (network.chainId !== 0 && network.chainId !== standard.chainId) {
    logger.throwArgumentError("network chainId mismatch", "network", network);
  } // @TODO: In the next major version add an attach function to a defaultProvider
  // class and move the _defaultProvider internal to this file (extend Network)


  let defaultProvider = network._defaultProvider || null;

  if (defaultProvider == null && standard._defaultProvider) {
    if (isRenetworkable(standard._defaultProvider)) {
      defaultProvider = standard._defaultProvider.renetwork(network);
    } else {
      defaultProvider = standard._defaultProvider;
    }
  } // Standard Network (allow overriding the ENS address)


  return {
    name: network.name,
    chainId: standard.chainId,
    ensAddress: network.ensAddress || standard.ensAddress || null,
    _defaultProvider: defaultProvider
  };
}
},{"@ethersproject/logger":"kMNH","./_version":"MhgO"}],"BSE9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;
exports.encode = encode;

var _bytes = require("@ethersproject/bytes");

function decode(textData) {
  textData = atob(textData);
  const data = [];

  for (let i = 0; i < textData.length; i++) {
    data.push(textData.charCodeAt(i));
  }

  return (0, _bytes.arrayify)(data);
}

function encode(data) {
  data = (0, _bytes.arrayify)(data);
  let textData = "";

  for (let i = 0; i < data.length; i++) {
    textData += String.fromCharCode(data[i]);
  }

  return btoa(textData);
}
},{"@ethersproject/bytes":"aqkS"}],"ybca":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "decode", {
  enumerable: true,
  get: function () {
    return _base.decode;
  }
});
Object.defineProperty(exports, "encode", {
  enumerable: true,
  get: function () {
    return _base.encode;
  }
});

var _base = require("./base64");
},{"./base64":"BSE9"}],"J8Dr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "web/5.5.0";
exports.version = version;
},{}],"UjFm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrl = getUrl;

var _bytes = require("@ethersproject/bytes");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function getUrl(href, options) {
  return __awaiter(this, void 0, void 0, function* () {
    if (options == null) {
      options = {};
    }

    const request = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || undefined
    };

    if (options.skipFetchSetup !== true) {
      request.mode = "cors"; // no-cors, cors, *same-origin

      request.cache = "no-cache"; // *default, no-cache, reload, force-cache, only-if-cached

      request.credentials = "same-origin"; // include, *same-origin, omit

      request.redirect = "follow"; // manual, *follow, error

      request.referrer = "client"; // no-referrer, *client
    }

    ;
    const response = yield fetch(href, request);
    const body = yield response.arrayBuffer();
    const headers = {};

    if (response.headers.forEach) {
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });
    } else {
      response.headers.keys().forEach(key => {
        headers[key.toLowerCase()] = response.headers.get(key);
      });
    }

    return {
      headers: headers,
      statusCode: response.status,
      statusMessage: response.statusText,
      body: (0, _bytes.arrayify)(new Uint8Array(body))
    };
  });
}
},{"@ethersproject/bytes":"aqkS"}],"egXK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._fetchData = _fetchData;
exports.fetchJson = fetchJson;
exports.poll = poll;

var _base = require("@ethersproject/base64");

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _strings = require("@ethersproject/strings");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _geturl = require("./geturl");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

function staller(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

function bodyify(value, type) {
  if (value == null) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if ((0, _bytes.isBytesLike)(value)) {
    if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
      try {
        return (0, _strings.toUtf8String)(value);
      } catch (error) {}

      ;
    }

    return (0, _bytes.hexlify)(value);
  }

  return value;
} // This API is still a work in progress; the future changes will likely be:
// - ConnectionInfo => FetchDataRequest<T = any>
// - FetchDataRequest.body? = string | Uint8Array | { contentType: string, data: string | Uint8Array }
//   - If string => text/plain, Uint8Array => application/octet-stream (if content-type unspecified)
// - FetchDataRequest.processFunc = (body: Uint8Array, response: FetchDataResponse) => T
// For this reason, it should be considered internal until the API is finalized


function _fetchData(connection, body, processFunc) {
  // How many times to retry in the event of a throttle
  const attemptLimit = typeof connection === "object" && connection.throttleLimit != null ? connection.throttleLimit : 12;
  logger.assertArgument(attemptLimit > 0 && attemptLimit % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
  const throttleCallback = typeof connection === "object" ? connection.throttleCallback : null;
  const throttleSlotInterval = typeof connection === "object" && typeof connection.throttleSlotInterval === "number" ? connection.throttleSlotInterval : 100;
  logger.assertArgument(throttleSlotInterval > 0 && throttleSlotInterval % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
  const headers = {};
  let url = null; // @TODO: Allow ConnectionInfo to override some of these values

  const options = {
    method: "GET"
  };
  let allow304 = false;
  let timeout = 2 * 60 * 1000;

  if (typeof connection === "string") {
    url = connection;
  } else if (typeof connection === "object") {
    if (connection == null || connection.url == null) {
      logger.throwArgumentError("missing URL", "connection.url", connection);
    }

    url = connection.url;

    if (typeof connection.timeout === "number" && connection.timeout > 0) {
      timeout = connection.timeout;
    }

    if (connection.headers) {
      for (const key in connection.headers) {
        headers[key.toLowerCase()] = {
          key: key,
          value: String(connection.headers[key])
        };

        if (["if-none-match", "if-modified-since"].indexOf(key.toLowerCase()) >= 0) {
          allow304 = true;
        }
      }
    }

    options.allowGzip = !!connection.allowGzip;

    if (connection.user != null && connection.password != null) {
      if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
        logger.throwError("basic authentication requires a secure https url", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "url",
          url: url,
          user: connection.user,
          password: "[REDACTED]"
        });
      }

      const authorization = connection.user + ":" + connection.password;
      headers["authorization"] = {
        key: "Authorization",
        value: "Basic " + (0, _base.encode)((0, _strings.toUtf8Bytes)(authorization))
      };
    }
  }

  if (body) {
    options.method = "POST";
    options.body = body;

    if (headers["content-type"] == null) {
      headers["content-type"] = {
        key: "Content-Type",
        value: "application/octet-stream"
      };
    }

    if (headers["content-length"] == null) {
      headers["content-length"] = {
        key: "Content-Length",
        value: String(body.length)
      };
    }
  }

  const flatHeaders = {};
  Object.keys(headers).forEach(key => {
    const header = headers[key];
    flatHeaders[header.key] = header.value;
  });
  options.headers = flatHeaders;

  const runningTimeout = function () {
    let timer = null;
    const promise = new Promise(function (resolve, reject) {
      if (timeout) {
        timer = setTimeout(() => {
          if (timer == null) {
            return;
          }

          timer = null;
          reject(logger.makeError("timeout", _logger.Logger.errors.TIMEOUT, {
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            timeout: timeout,
            url: url
          }));
        }, timeout);
      }
    });

    const cancel = function () {
      if (timer == null) {
        return;
      }

      clearTimeout(timer);
      timer = null;
    };

    return {
      promise,
      cancel
    };
  }();

  const runningFetch = function () {
    return __awaiter(this, void 0, void 0, function* () {
      for (let attempt = 0; attempt < attemptLimit; attempt++) {
        let response = null;

        try {
          response = yield (0, _geturl.getUrl)(url, options); // Exponential back-off throttling

          if (response.statusCode === 429 && attempt < attemptLimit) {
            let tryAgain = true;

            if (throttleCallback) {
              tryAgain = yield throttleCallback(attempt, url);
            }

            if (tryAgain) {
              let stall = 0;
              const retryAfter = response.headers["retry-after"];

              if (typeof retryAfter === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                stall = parseInt(retryAfter) * 1000;
              } else {
                stall = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
              } //console.log("Stalling 429");


              yield staller(stall);
              continue;
            }
          }
        } catch (error) {
          response = error.response;

          if (response == null) {
            runningTimeout.cancel();
            logger.throwError("missing response", _logger.Logger.errors.SERVER_ERROR, {
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              serverError: error,
              url: url
            });
          }
        }

        let body = response.body;

        if (allow304 && response.statusCode === 304) {
          body = null;
        } else if (response.statusCode < 200 || response.statusCode >= 300) {
          runningTimeout.cancel();
          logger.throwError("bad response", _logger.Logger.errors.SERVER_ERROR, {
            status: response.statusCode,
            headers: response.headers,
            body: bodyify(body, response.headers ? response.headers["content-type"] : null),
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            url: url
          });
        }

        if (processFunc) {
          try {
            const result = yield processFunc(body, response);
            runningTimeout.cancel();
            return result;
          } catch (error) {
            // Allow the processFunc to trigger a throttle
            if (error.throttleRetry && attempt < attemptLimit) {
              let tryAgain = true;

              if (throttleCallback) {
                tryAgain = yield throttleCallback(attempt, url);
              }

              if (tryAgain) {
                const timeout = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt))); //console.log("Stalling callback");

                yield staller(timeout);
                continue;
              }
            }

            runningTimeout.cancel();
            logger.throwError("processing response error", _logger.Logger.errors.SERVER_ERROR, {
              body: bodyify(body, response.headers ? response.headers["content-type"] : null),
              error: error,
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              url: url
            });
          }
        }

        runningTimeout.cancel(); // If we had a processFunc, it either returned a T or threw above.
        // The "body" is now a Uint8Array.

        return body;
      }

      return logger.throwError("failed response", _logger.Logger.errors.SERVER_ERROR, {
        requestBody: bodyify(options.body, flatHeaders["content-type"]),
        requestMethod: options.method,
        url: url
      });
    });
  }();

  return Promise.race([runningTimeout.promise, runningFetch]);
}

function fetchJson(connection, json, processFunc) {
  let processJsonFunc = (value, response) => {
    let result = null;

    if (value != null) {
      try {
        result = JSON.parse((0, _strings.toUtf8String)(value));
      } catch (error) {
        logger.throwError("invalid JSON", _logger.Logger.errors.SERVER_ERROR, {
          body: value,
          error: error
        });
      }
    }

    if (processFunc) {
      result = processFunc(result, response);
    }

    return result;
  }; // If we have json to send, we must
  // - add content-type of application/json (unless already overridden)
  // - convert the json to bytes


  let body = null;

  if (json != null) {
    body = (0, _strings.toUtf8Bytes)(json); // Create a connection with the content-type set for JSON

    const updated = typeof connection === "string" ? {
      url: connection
    } : (0, _properties.shallowCopy)(connection);

    if (updated.headers) {
      const hasContentType = Object.keys(updated.headers).filter(k => k.toLowerCase() === "content-type").length !== 0;

      if (!hasContentType) {
        updated.headers = (0, _properties.shallowCopy)(updated.headers);
        updated.headers["content-type"] = "application/json";
      }
    } else {
      updated.headers = {
        "content-type": "application/json"
      };
    }

    connection = updated;
  }

  return _fetchData(connection, body, processJsonFunc);
}

function poll(func, options) {
  if (!options) {
    options = {};
  }

  options = (0, _properties.shallowCopy)(options);

  if (options.floor == null) {
    options.floor = 0;
  }

  if (options.ceiling == null) {
    options.ceiling = 10000;
  }

  if (options.interval == null) {
    options.interval = 250;
  }

  return new Promise(function (resolve, reject) {
    let timer = null;
    let done = false; // Returns true if cancel was successful. Unsuccessful cancel means we're already done.

    const cancel = () => {
      if (done) {
        return false;
      }

      done = true;

      if (timer) {
        clearTimeout(timer);
      }

      return true;
    };

    if (options.timeout) {
      timer = setTimeout(() => {
        if (cancel()) {
          reject(new Error("timeout"));
        }
      }, options.timeout);
    }

    const retryLimit = options.retryLimit;
    let attempt = 0;

    function check() {
      return func().then(function (result) {
        // If we have a result, or are allowed null then we're done
        if (result !== undefined) {
          if (cancel()) {
            resolve(result);
          }
        } else if (options.oncePoll) {
          options.oncePoll.once("poll", check);
        } else if (options.onceBlock) {
          options.onceBlock.once("block", check); // Otherwise, exponential back-off (up to 10s) our next request
        } else if (!done) {
          attempt++;

          if (attempt > retryLimit) {
            if (cancel()) {
              reject(new Error("retry limit reached"));
            }

            return;
          }

          let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));

          if (timeout < options.floor) {
            timeout = options.floor;
          }

          if (timeout > options.ceiling) {
            timeout = options.ceiling;
          }

          setTimeout(check, timeout);
        }

        return null;
      }, function (error) {
        if (cancel()) {
          reject(error);
        }
      });
    }

    check();
  });
}
},{"@ethersproject/base64":"ybca","@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/strings":"ZW9k","@ethersproject/logger":"kMNH","./_version":"J8Dr","./geturl":"UjFm"}],"LibZ":[function(require,module,exports) {
'use strict'
var ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'

// pre-compute lookup table
var ALPHABET_MAP = {}
for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z)

  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
  ALPHABET_MAP[x] = z
}

function polymodStep (pre) {
  var b = pre >> 25
  return ((pre & 0x1FFFFFF) << 5) ^
    (-((b >> 0) & 1) & 0x3b6a57b2) ^
    (-((b >> 1) & 1) & 0x26508e6d) ^
    (-((b >> 2) & 1) & 0x1ea119fa) ^
    (-((b >> 3) & 1) & 0x3d4233dd) ^
    (-((b >> 4) & 1) & 0x2a1462b3)
}

function prefixChk (prefix) {
  var chk = 1
  for (var i = 0; i < prefix.length; ++i) {
    var c = prefix.charCodeAt(i)
    if (c < 33 || c > 126) return 'Invalid prefix (' + prefix + ')'

    chk = polymodStep(chk) ^ (c >> 5)
  }
  chk = polymodStep(chk)

  for (i = 0; i < prefix.length; ++i) {
    var v = prefix.charCodeAt(i)
    chk = polymodStep(chk) ^ (v & 0x1f)
  }
  return chk
}

function encode (prefix, words, LIMIT) {
  LIMIT = LIMIT || 90
  if ((prefix.length + 7 + words.length) > LIMIT) throw new TypeError('Exceeds length limit')

  prefix = prefix.toLowerCase()

  // determine chk mod
  var chk = prefixChk(prefix)
  if (typeof chk === 'string') throw new Error(chk)

  var result = prefix + '1'
  for (var i = 0; i < words.length; ++i) {
    var x = words[i]
    if ((x >> 5) !== 0) throw new Error('Non 5-bit word')

    chk = polymodStep(chk) ^ x
    result += ALPHABET.charAt(x)
  }

  for (i = 0; i < 6; ++i) {
    chk = polymodStep(chk)
  }
  chk ^= 1

  for (i = 0; i < 6; ++i) {
    var v = (chk >> ((5 - i) * 5)) & 0x1f
    result += ALPHABET.charAt(v)
  }

  return result
}

function __decode (str, LIMIT) {
  LIMIT = LIMIT || 90
  if (str.length < 8) return str + ' too short'
  if (str.length > LIMIT) return 'Exceeds length limit'

  // don't allow mixed case
  var lowered = str.toLowerCase()
  var uppered = str.toUpperCase()
  if (str !== lowered && str !== uppered) return 'Mixed-case string ' + str
  str = lowered

  var split = str.lastIndexOf('1')
  if (split === -1) return 'No separator character for ' + str
  if (split === 0) return 'Missing prefix for ' + str

  var prefix = str.slice(0, split)
  var wordChars = str.slice(split + 1)
  if (wordChars.length < 6) return 'Data too short'

  var chk = prefixChk(prefix)
  if (typeof chk === 'string') return chk

  var words = []
  for (var i = 0; i < wordChars.length; ++i) {
    var c = wordChars.charAt(i)
    var v = ALPHABET_MAP[c]
    if (v === undefined) return 'Unknown character ' + c
    chk = polymodStep(chk) ^ v

    // not in the checksum?
    if (i + 6 >= wordChars.length) continue
    words.push(v)
  }

  if (chk !== 1) return 'Invalid checksum for ' + str
  return { prefix: prefix, words: words }
}

function decodeUnsafe () {
  var res = __decode.apply(null, arguments)
  if (typeof res === 'object') return res
}

function decode (str) {
  var res = __decode.apply(null, arguments)
  if (typeof res === 'object') return res

  throw new Error(res)
}

function convert (data, inBits, outBits, pad) {
  var value = 0
  var bits = 0
  var maxV = (1 << outBits) - 1

  var result = []
  for (var i = 0; i < data.length; ++i) {
    value = (value << inBits) | data[i]
    bits += inBits

    while (bits >= outBits) {
      bits -= outBits
      result.push((value >> bits) & maxV)
    }
  }

  if (pad) {
    if (bits > 0) {
      result.push((value << (outBits - bits)) & maxV)
    }
  } else {
    if (bits >= inBits) return 'Excess padding'
    if ((value << (outBits - bits)) & maxV) return 'Non-zero padding'
  }

  return result
}

function toWordsUnsafe (bytes) {
  var res = convert(bytes, 8, 5, true)
  if (Array.isArray(res)) return res
}

function toWords (bytes) {
  var res = convert(bytes, 8, 5, true)
  if (Array.isArray(res)) return res

  throw new Error(res)
}

function fromWordsUnsafe (words) {
  var res = convert(words, 5, 8, false)
  if (Array.isArray(res)) return res
}

function fromWords (words) {
  var res = convert(words, 5, 8, false)
  if (Array.isArray(res)) return res

  throw new Error(res)
}

module.exports = {
  decodeUnsafe: decodeUnsafe,
  decode: decode,
  encode: encode,
  toWordsUnsafe: toWordsUnsafe,
  toWords: toWords,
  fromWordsUnsafe: fromWordsUnsafe,
  fromWords: fromWords
}

},{}],"UhEn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "providers/5.5.0";
exports.version = version;
},{}],"nnuj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Formatter = void 0;
exports.isCommunityResourcable = isCommunityResourcable;
exports.isCommunityResource = isCommunityResource;
exports.showThrottleMessage = showThrottleMessage;

var _address = require("@ethersproject/address");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _constants = require("@ethersproject/constants");

var _properties = require("@ethersproject/properties");

var _transactions = require("@ethersproject/transactions");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);

class Formatter {
  constructor() {
    logger.checkNew(new.target, Formatter);
    this.formats = this.getDefaultFormats();
  }

  getDefaultFormats() {
    const formats = {};
    const address = this.address.bind(this);
    const bigNumber = this.bigNumber.bind(this);
    const blockTag = this.blockTag.bind(this);
    const data = this.data.bind(this);
    const hash = this.hash.bind(this);
    const hex = this.hex.bind(this);
    const number = this.number.bind(this);
    const type = this.type.bind(this);

    const strictData = v => {
      return this.data(v, true);
    };

    formats.transaction = {
      hash: hash,
      type: type,
      accessList: Formatter.allowNull(this.accessList.bind(this), null),
      blockHash: Formatter.allowNull(hash, null),
      blockNumber: Formatter.allowNull(number, null),
      transactionIndex: Formatter.allowNull(number, null),
      confirmations: Formatter.allowNull(number, null),
      from: address,
      // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas)
      // must be set
      gasPrice: Formatter.allowNull(bigNumber),
      maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
      maxFeePerGas: Formatter.allowNull(bigNumber),
      gasLimit: bigNumber,
      to: Formatter.allowNull(address, null),
      value: bigNumber,
      nonce: number,
      data: data,
      r: Formatter.allowNull(this.uint256),
      s: Formatter.allowNull(this.uint256),
      v: Formatter.allowNull(number),
      creates: Formatter.allowNull(address, null),
      raw: Formatter.allowNull(data)
    };
    formats.transactionRequest = {
      from: Formatter.allowNull(address),
      nonce: Formatter.allowNull(number),
      gasLimit: Formatter.allowNull(bigNumber),
      gasPrice: Formatter.allowNull(bigNumber),
      maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
      maxFeePerGas: Formatter.allowNull(bigNumber),
      to: Formatter.allowNull(address),
      value: Formatter.allowNull(bigNumber),
      data: Formatter.allowNull(strictData),
      type: Formatter.allowNull(number),
      accessList: Formatter.allowNull(this.accessList.bind(this), null)
    };
    formats.receiptLog = {
      transactionIndex: number,
      blockNumber: number,
      transactionHash: hash,
      address: address,
      topics: Formatter.arrayOf(hash),
      data: data,
      logIndex: number,
      blockHash: hash
    };
    formats.receipt = {
      to: Formatter.allowNull(this.address, null),
      from: Formatter.allowNull(this.address, null),
      contractAddress: Formatter.allowNull(address, null),
      transactionIndex: number,
      // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
      root: Formatter.allowNull(hex),
      gasUsed: bigNumber,
      logsBloom: Formatter.allowNull(data),
      blockHash: hash,
      transactionHash: hash,
      logs: Formatter.arrayOf(this.receiptLog.bind(this)),
      blockNumber: number,
      confirmations: Formatter.allowNull(number, null),
      cumulativeGasUsed: bigNumber,
      effectiveGasPrice: Formatter.allowNull(bigNumber),
      status: Formatter.allowNull(number),
      type: type
    };
    formats.block = {
      hash: hash,
      parentHash: hash,
      number: number,
      timestamp: number,
      nonce: Formatter.allowNull(hex),
      difficulty: this.difficulty.bind(this),
      gasLimit: bigNumber,
      gasUsed: bigNumber,
      miner: address,
      extraData: data,
      transactions: Formatter.allowNull(Formatter.arrayOf(hash)),
      baseFeePerGas: Formatter.allowNull(bigNumber)
    };
    formats.blockWithTransactions = (0, _properties.shallowCopy)(formats.block);
    formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
    formats.filter = {
      fromBlock: Formatter.allowNull(blockTag, undefined),
      toBlock: Formatter.allowNull(blockTag, undefined),
      blockHash: Formatter.allowNull(hash, undefined),
      address: Formatter.allowNull(address, undefined),
      topics: Formatter.allowNull(this.topics.bind(this), undefined)
    };
    formats.filterLog = {
      blockNumber: Formatter.allowNull(number),
      blockHash: Formatter.allowNull(hash),
      transactionIndex: number,
      removed: Formatter.allowNull(this.boolean.bind(this)),
      address: address,
      data: Formatter.allowFalsish(data, "0x"),
      topics: Formatter.arrayOf(hash),
      transactionHash: hash,
      logIndex: number
    };
    return formats;
  }

  accessList(accessList) {
    return (0, _transactions.accessListify)(accessList || []);
  } // Requires a BigNumberish that is within the IEEE754 safe integer range; returns a number
  // Strict! Used on input.


  number(number) {
    if (number === "0x") {
      return 0;
    }

    return _bignumber.BigNumber.from(number).toNumber();
  }

  type(number) {
    if (number === "0x" || number == null) {
      return 0;
    }

    return _bignumber.BigNumber.from(number).toNumber();
  } // Strict! Used on input.


  bigNumber(value) {
    return _bignumber.BigNumber.from(value);
  } // Requires a boolean, "true" or  "false"; returns a boolean


  boolean(value) {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "string") {
      value = value.toLowerCase();

      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }
    }

    throw new Error("invalid boolean - " + value);
  }

  hex(value, strict) {
    if (typeof value === "string") {
      if (!strict && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
      }

      if ((0, _bytes.isHexString)(value)) {
        return value.toLowerCase();
      }
    }

    return logger.throwArgumentError("invalid hash", "value", value);
  }

  data(value, strict) {
    const result = this.hex(value, strict);

    if (result.length % 2 !== 0) {
      throw new Error("invalid data; odd-length - " + value);
    }

    return result;
  } // Requires an address
  // Strict! Used on input.


  address(value) {
    return (0, _address.getAddress)(value);
  }

  callAddress(value) {
    if (!(0, _bytes.isHexString)(value, 32)) {
      return null;
    }

    const address = (0, _address.getAddress)((0, _bytes.hexDataSlice)(value, 12));
    return address === _constants.AddressZero ? null : address;
  }

  contractAddress(value) {
    return (0, _address.getContractAddress)(value);
  } // Strict! Used on input.


  blockTag(blockTag) {
    if (blockTag == null) {
      return "latest";
    }

    if (blockTag === "earliest") {
      return "0x0";
    }

    if (blockTag === "latest" || blockTag === "pending") {
      return blockTag;
    }

    if (typeof blockTag === "number" || (0, _bytes.isHexString)(blockTag)) {
      return (0, _bytes.hexValue)(blockTag);
    }

    throw new Error("invalid blockTag");
  } // Requires a hash, optionally requires 0x prefix; returns prefixed lowercase hash.


  hash(value, strict) {
    const result = this.hex(value, strict);

    if ((0, _bytes.hexDataLength)(result) !== 32) {
      return logger.throwArgumentError("invalid hash", "value", value);
    }

    return result;
  } // Returns the difficulty as a number, or if too large (i.e. PoA network) null


  difficulty(value) {
    if (value == null) {
      return null;
    }

    const v = _bignumber.BigNumber.from(value);

    try {
      return v.toNumber();
    } catch (error) {}

    return null;
  }

  uint256(value) {
    if (!(0, _bytes.isHexString)(value)) {
      throw new Error("invalid uint256");
    }

    return (0, _bytes.hexZeroPad)(value, 32);
  }

  _block(value, format) {
    if (value.author != null && value.miner == null) {
      value.miner = value.author;
    } // The difficulty may need to come from _difficulty in recursed blocks


    const difficulty = value._difficulty != null ? value._difficulty : value.difficulty;
    const result = Formatter.check(format, value);
    result._difficulty = difficulty == null ? null : _bignumber.BigNumber.from(difficulty);
    return result;
  }

  block(value) {
    return this._block(value, this.formats.block);
  }

  blockWithTransactions(value) {
    return this._block(value, this.formats.blockWithTransactions);
  } // Strict! Used on input.


  transactionRequest(value) {
    return Formatter.check(this.formats.transactionRequest, value);
  }

  transactionResponse(transaction) {
    // Rename gas to gasLimit
    if (transaction.gas != null && transaction.gasLimit == null) {
      transaction.gasLimit = transaction.gas;
    } // Some clients (TestRPC) do strange things like return 0x0 for the
    // 0 address; correct this to be a real address


    if (transaction.to && _bignumber.BigNumber.from(transaction.to).isZero()) {
      transaction.to = "0x0000000000000000000000000000000000000000";
    } // Rename input to data


    if (transaction.input != null && transaction.data == null) {
      transaction.data = transaction.input;
    } // If to and creates are empty, populate the creates from the transaction


    if (transaction.to == null && transaction.creates == null) {
      transaction.creates = this.contractAddress(transaction);
    }

    if ((transaction.type === 1 || transaction.type === 2) && transaction.accessList == null) {
      transaction.accessList = [];
    }

    const result = Formatter.check(this.formats.transaction, transaction);

    if (transaction.chainId != null) {
      let chainId = transaction.chainId;

      if ((0, _bytes.isHexString)(chainId)) {
        chainId = _bignumber.BigNumber.from(chainId).toNumber();
      }

      result.chainId = chainId;
    } else {
      let chainId = transaction.networkId; // geth-etc returns chainId

      if (chainId == null && result.v == null) {
        chainId = transaction.chainId;
      }

      if ((0, _bytes.isHexString)(chainId)) {
        chainId = _bignumber.BigNumber.from(chainId).toNumber();
      }

      if (typeof chainId !== "number" && result.v != null) {
        chainId = (result.v - 35) / 2;

        if (chainId < 0) {
          chainId = 0;
        }

        chainId = parseInt(chainId);
      }

      if (typeof chainId !== "number") {
        chainId = 0;
      }

      result.chainId = chainId;
    } // 0x0000... should actually be null


    if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
      result.blockHash = null;
    }

    return result;
  }

  transaction(value) {
    return (0, _transactions.parse)(value);
  }

  receiptLog(value) {
    return Formatter.check(this.formats.receiptLog, value);
  }

  receipt(value) {
    const result = Formatter.check(this.formats.receipt, value); // RSK incorrectly implemented EIP-658, so we munge things a bit here for it

    if (result.root != null) {
      if (result.root.length <= 4) {
        // Could be 0x00, 0x0, 0x01 or 0x1
        const value = _bignumber.BigNumber.from(result.root).toNumber();

        if (value === 0 || value === 1) {
          // Make sure if both are specified, they match
          if (result.status != null && result.status !== value) {
            logger.throwArgumentError("alt-root-status/status mismatch", "value", {
              root: result.root,
              status: result.status
            });
          }

          result.status = value;
          delete result.root;
        } else {
          logger.throwArgumentError("invalid alt-root-status", "value.root", result.root);
        }
      } else if (result.root.length !== 66) {
        // Must be a valid bytes32
        logger.throwArgumentError("invalid root hash", "value.root", result.root);
      }
    }

    if (result.status != null) {
      result.byzantium = true;
    }

    return result;
  }

  topics(value) {
    if (Array.isArray(value)) {
      return value.map(v => this.topics(v));
    } else if (value != null) {
      return this.hash(value, true);
    }

    return null;
  }

  filter(value) {
    return Formatter.check(this.formats.filter, value);
  }

  filterLog(value) {
    return Formatter.check(this.formats.filterLog, value);
  }

  static check(format, object) {
    const result = {};

    for (const key in format) {
      try {
        const value = format[key](object[key]);

        if (value !== undefined) {
          result[key] = value;
        }
      } catch (error) {
        error.checkKey = key;
        error.checkValue = object[key];
        throw error;
      }
    }

    return result;
  } // if value is null-ish, nullValue is returned


  static allowNull(format, nullValue) {
    return function (value) {
      if (value == null) {
        return nullValue;
      }

      return format(value);
    };
  } // If value is false-ish, replaceValue is returned


  static allowFalsish(format, replaceValue) {
    return function (value) {
      if (!value) {
        return replaceValue;
      }

      return format(value);
    };
  } // Requires an Array satisfying check


  static arrayOf(format) {
    return function (array) {
      if (!Array.isArray(array)) {
        throw new Error("not an array");
      }

      const result = [];
      array.forEach(function (value) {
        result.push(format(value));
      });
      return result;
    };
  }

}

exports.Formatter = Formatter;

function isCommunityResourcable(value) {
  return value && typeof value.isCommunityResource === "function";
}

function isCommunityResource(value) {
  return isCommunityResourcable(value) && value.isCommunityResource();
} // Show the throttle message only once


let throttleMessage = false;

function showThrottleMessage() {
  if (throttleMessage) {
    return;
  }

  throttleMessage = true;
  console.log("========= NOTICE =========");
  console.log("Request-Rate Exceeded  (this message will not be repeated)");
  console.log("");
  console.log("The default API keys for each service are provided as a highly-throttled,");
  console.log("community resource for low-traffic projects and early prototyping.");
  console.log("");
  console.log("While your application will continue to function, we highly recommended");
  console.log("signing up for your own API keys to improve performance, increase your");
  console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
  console.log("");
  console.log("For more details: https:/\/docs.ethers.io/api-keys/");
  console.log("==========================");
}
},{"@ethersproject/address":"a1wm","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/constants":"FOhG","@ethersproject/properties":"JuuX","@ethersproject/transactions":"OW34","@ethersproject/logger":"kMNH","./_version":"UhEn"}],"SPLd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resolver = exports.Event = exports.BaseProvider = void 0;

var _abstractProvider = require("@ethersproject/abstract-provider");

var _basex = require("@ethersproject/basex");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _constants = require("@ethersproject/constants");

var _hash = require("@ethersproject/hash");

var _networks = require("@ethersproject/networks");

var _properties = require("@ethersproject/properties");

var _sha = require("@ethersproject/sha2");

var _strings = require("@ethersproject/strings");

var _web = require("@ethersproject/web");

var _bech = _interopRequireDefault(require("bech32"));

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _formatter = require("./formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

//////////////////////////////
// Event Serializeing
function checkTopic(topic) {
  if (topic == null) {
    return "null";
  }

  if ((0, _bytes.hexDataLength)(topic) !== 32) {
    logger.throwArgumentError("invalid topic", "topic", topic);
  }

  return topic.toLowerCase();
}

function serializeTopics(topics) {
  // Remove trailing null AND-topics; they are redundant
  topics = topics.slice();

  while (topics.length > 0 && topics[topics.length - 1] == null) {
    topics.pop();
  }

  return topics.map(topic => {
    if (Array.isArray(topic)) {
      // Only track unique OR-topics
      const unique = {};
      topic.forEach(topic => {
        unique[checkTopic(topic)] = true;
      }); // The order of OR-topics does not matter

      const sorted = Object.keys(unique);
      sorted.sort();
      return sorted.join("|");
    } else {
      return checkTopic(topic);
    }
  }).join("&");
}

function deserializeTopics(data) {
  if (data === "") {
    return [];
  }

  return data.split(/&/g).map(topic => {
    if (topic === "") {
      return [];
    }

    const comps = topic.split("|").map(topic => {
      return topic === "null" ? null : topic;
    });
    return comps.length === 1 ? comps[0] : comps;
  });
}

function getEventTag(eventName) {
  if (typeof eventName === "string") {
    eventName = eventName.toLowerCase();

    if ((0, _bytes.hexDataLength)(eventName) === 32) {
      return "tx:" + eventName;
    }

    if (eventName.indexOf(":") === -1) {
      return eventName;
    }
  } else if (Array.isArray(eventName)) {
    return "filter:*:" + serializeTopics(eventName);
  } else if (_abstractProvider.ForkEvent.isForkEvent(eventName)) {
    logger.warn("not implemented");
    throw new Error("not implemented");
  } else if (eventName && typeof eventName === "object") {
    return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
  }

  throw new Error("invalid event - " + eventName);
} //////////////////////////////
// Helper Object


function getTime() {
  return new Date().getTime();
}

function stall(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
} //////////////////////////////
// Provider Object

/**
 *  EventType
 *   - "block"
 *   - "poll"
 *   - "didPoll"
 *   - "pending"
 *   - "error"
 *   - "network"
 *   - filter
 *   - topics array
 *   - transaction hash
 */


const PollableEvents = ["block", "network", "pending", "poll"];

class Event {
  constructor(tag, listener, once) {
    (0, _properties.defineReadOnly)(this, "tag", tag);
    (0, _properties.defineReadOnly)(this, "listener", listener);
    (0, _properties.defineReadOnly)(this, "once", once);
  }

  get event() {
    switch (this.type) {
      case "tx":
        return this.hash;

      case "filter":
        return this.filter;
    }

    return this.tag;
  }

  get type() {
    return this.tag.split(":")[0];
  }

  get hash() {
    const comps = this.tag.split(":");

    if (comps[0] !== "tx") {
      return null;
    }

    return comps[1];
  }

  get filter() {
    const comps = this.tag.split(":");

    if (comps[0] !== "filter") {
      return null;
    }

    const address = comps[1];
    const topics = deserializeTopics(comps[2]);
    const filter = {};

    if (topics.length > 0) {
      filter.topics = topics;
    }

    if (address && address !== "*") {
      filter.address = address;
    }

    return filter;
  }

  pollable() {
    return this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0;
  }

}

exports.Event = Event;
; // https://github.com/satoshilabs/slips/blob/master/slip-0044.md

const coinInfos = {
  "0": {
    symbol: "btc",
    p2pkh: 0x00,
    p2sh: 0x05,
    prefix: "bc"
  },
  "2": {
    symbol: "ltc",
    p2pkh: 0x30,
    p2sh: 0x32,
    prefix: "ltc"
  },
  "3": {
    symbol: "doge",
    p2pkh: 0x1e,
    p2sh: 0x16
  },
  "60": {
    symbol: "eth",
    ilk: "eth"
  },
  "61": {
    symbol: "etc",
    ilk: "eth"
  },
  "700": {
    symbol: "xdai",
    ilk: "eth"
  }
};

function bytes32ify(value) {
  return (0, _bytes.hexZeroPad)(_bignumber.BigNumber.from(value).toHexString(), 32);
} // Compute the Base58Check encoded data (checksum is first 4 bytes of sha256d)


function base58Encode(data) {
  return _basex.Base58.encode((0, _bytes.concat)([data, (0, _bytes.hexDataSlice)((0, _sha.sha256)((0, _sha.sha256)(data)), 0, 4)]));
}

const matchers = [new RegExp("^(https):/\/(.*)$", "i"), new RegExp("^(data):(.*)$", "i"), new RegExp("^(ipfs):/\/(.*)$", "i"), new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")];

function _parseString(result) {
  try {
    return (0, _strings.toUtf8String)(_parseBytes(result));
  } catch (error) {}

  return null;
}

function _parseBytes(result) {
  if (result === "0x") {
    return null;
  }

  const offset = _bignumber.BigNumber.from((0, _bytes.hexDataSlice)(result, 0, 32)).toNumber();

  const length = _bignumber.BigNumber.from((0, _bytes.hexDataSlice)(result, offset, offset + 32)).toNumber();

  return (0, _bytes.hexDataSlice)(result, offset + 32, offset + 32 + length);
}

class Resolver {
  // The resolvedAddress is only for creating a ReverseLookup resolver
  constructor(provider, address, name, resolvedAddress) {
    (0, _properties.defineReadOnly)(this, "provider", provider);
    (0, _properties.defineReadOnly)(this, "name", name);
    (0, _properties.defineReadOnly)(this, "address", provider.formatter.address(address));
    (0, _properties.defineReadOnly)(this, "_resolvedAddress", resolvedAddress);
  }

  _fetchBytes(selector, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      // e.g. keccak256("addr(bytes32,uint256)")
      const tx = {
        to: this.address,
        data: (0, _bytes.hexConcat)([selector, (0, _hash.namehash)(this.name), parameters || "0x"])
      };

      try {
        return _parseBytes(yield this.provider.call(tx));
      } catch (error) {
        if (error.code === _logger.Logger.errors.CALL_EXCEPTION) {
          return null;
        }

        return null;
      }
    });
  }

  _getAddress(coinType, hexBytes) {
    const coinInfo = coinInfos[String(coinType)];

    if (coinInfo == null) {
      logger.throwError(`unsupported coin type: ${coinType}`, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: `getAddress(${coinType})`
      });
    }

    if (coinInfo.ilk === "eth") {
      return this.provider.formatter.address(hexBytes);
    }

    const bytes = (0, _bytes.arrayify)(hexBytes); // P2PKH: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

    if (coinInfo.p2pkh != null) {
      const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);

      if (p2pkh) {
        const length = parseInt(p2pkh[1], 16);

        if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
          return base58Encode((0, _bytes.concat)([[coinInfo.p2pkh], "0x" + p2pkh[2]]));
        }
      }
    } // P2SH: OP_HASH160 <scriptHash> OP_EQUAL


    if (coinInfo.p2sh != null) {
      const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);

      if (p2sh) {
        const length = parseInt(p2sh[1], 16);

        if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
          return base58Encode((0, _bytes.concat)([[coinInfo.p2sh], "0x" + p2sh[2]]));
        }
      }
    } // Bech32


    if (coinInfo.prefix != null) {
      const length = bytes[1]; // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#witness-program

      let version = bytes[0];

      if (version === 0x00) {
        if (length !== 20 && length !== 32) {
          version = -1;
        }
      } else {
        version = -1;
      }

      if (version >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
        const words = _bech.default.toWords(bytes.slice(2));

        words.unshift(version);
        return _bech.default.encode(coinInfo.prefix, words);
      }
    }

    return null;
  }

  getAddress(coinType) {
    return __awaiter(this, void 0, void 0, function* () {
      if (coinType == null) {
        coinType = 60;
      } // If Ethereum, use the standard `addr(bytes32)`


      if (coinType === 60) {
        try {
          // keccak256("addr(bytes32)")
          const transaction = {
            to: this.address,
            data: "0x3b3b57de" + (0, _hash.namehash)(this.name).substring(2)
          };
          const hexBytes = yield this.provider.call(transaction); // No address

          if (hexBytes === "0x" || hexBytes === _constants.HashZero) {
            return null;
          }

          return this.provider.formatter.callAddress(hexBytes);
        } catch (error) {
          if (error.code === _logger.Logger.errors.CALL_EXCEPTION) {
            return null;
          }

          throw error;
        }
      } // keccak256("addr(bytes32,uint256")


      const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType)); // No address

      if (hexBytes == null || hexBytes === "0x") {
        return null;
      } // Compute the address


      const address = this._getAddress(coinType, hexBytes);

      if (address == null) {
        logger.throwError(`invalid or unsupported coin data`, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `getAddress(${coinType})`,
          coinType: coinType,
          data: hexBytes
        });
      }

      return address;
    });
  }

  getAvatar() {
    return __awaiter(this, void 0, void 0, function* () {
      const linkage = [];

      try {
        const avatar = yield this.getText("avatar");

        if (avatar == null) {
          return null;
        }

        for (let i = 0; i < matchers.length; i++) {
          const match = avatar.match(matchers[i]);

          if (match == null) {
            continue;
          }

          switch (match[1]) {
            case "https":
              linkage.push({
                type: "url",
                content: avatar
              });
              return {
                linkage,
                url: avatar
              };

            case "data":
              linkage.push({
                type: "data",
                content: avatar
              });
              return {
                linkage,
                url: avatar
              };

            case "ipfs":
              linkage.push({
                type: "ipfs",
                content: avatar
              });
              return {
                linkage,
                url: `https:/\/gateway.ipfs.io/ipfs/${avatar.substring(7)}`
              };

            case "erc721":
            case "erc1155":
              {
                // Depending on the ERC type, use tokenURI(uint256) or url(uint256)
                const selector = match[1] === "erc721" ? "0xc87b56dd" : "0x0e89341c";
                linkage.push({
                  type: match[1],
                  content: avatar
                }); // The owner of this name

                const owner = this._resolvedAddress || (yield this.getAddress());
                const comps = (match[2] || "").split("/");

                if (comps.length !== 2) {
                  return null;
                }

                const addr = yield this.provider.formatter.address(comps[0]);
                const tokenId = (0, _bytes.hexZeroPad)(_bignumber.BigNumber.from(comps[1]).toHexString(), 32); // Check that this account owns the token

                if (match[1] === "erc721") {
                  // ownerOf(uint256 tokenId)
                  const tokenOwner = this.provider.formatter.callAddress(yield this.provider.call({
                    to: addr,
                    data: (0, _bytes.hexConcat)(["0x6352211e", tokenId])
                  }));

                  if (owner !== tokenOwner) {
                    return null;
                  }

                  linkage.push({
                    type: "owner",
                    content: tokenOwner
                  });
                } else if (match[1] === "erc1155") {
                  // balanceOf(address owner, uint256 tokenId)
                  const balance = _bignumber.BigNumber.from(yield this.provider.call({
                    to: addr,
                    data: (0, _bytes.hexConcat)(["0x00fdd58e", (0, _bytes.hexZeroPad)(owner, 32), tokenId])
                  }));

                  if (balance.isZero()) {
                    return null;
                  }

                  linkage.push({
                    type: "balance",
                    content: balance.toString()
                  });
                } // Call the token contract for the metadata URL


                const tx = {
                  to: this.provider.formatter.address(comps[0]),
                  data: (0, _bytes.hexConcat)([selector, tokenId])
                };

                let metadataUrl = _parseString(yield this.provider.call(tx));

                if (metadataUrl == null) {
                  return null;
                }

                linkage.push({
                  type: "metadata-url",
                  content: metadataUrl
                }); // ERC-1155 allows a generic {id} in the URL

                if (match[1] === "erc1155") {
                  metadataUrl = metadataUrl.replace("{id}", tokenId.substring(2));
                } // Get the token metadata


                const metadata = yield (0, _web.fetchJson)(metadataUrl); // Pull the image URL out

                if (!metadata || typeof metadata.image !== "string" || !metadata.image.match(/^https:\/\//i)) {
                  return null;
                }

                linkage.push({
                  type: "metadata",
                  content: JSON.stringify(metadata)
                });
                linkage.push({
                  type: "url",
                  content: metadata.image
                });
                return {
                  linkage,
                  url: metadata.image
                };
              }
          }
        }
      } catch (error) {}

      return null;
    });
  }

  getContentHash() {
    return __awaiter(this, void 0, void 0, function* () {
      // keccak256("contenthash()")
      const hexBytes = yield this._fetchBytes("0xbc1c58d1"); // No contenthash

      if (hexBytes == null || hexBytes === "0x") {
        return null;
      } // IPFS (CID: 1, Type: DAG-PB)


      const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);

      if (ipfs) {
        const length = parseInt(ipfs[3], 16);

        if (ipfs[4].length === length * 2) {
          return "ipfs:/\/" + _basex.Base58.encode("0x" + ipfs[1]);
        }
      } // Swarm (CID: 1, Type: swarm-manifest; hash/length hard-coded to keccak256/32)


      const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);

      if (swarm) {
        if (swarm[1].length === 32 * 2) {
          return "bzz:/\/" + swarm[1];
        }
      }

      return logger.throwError(`invalid or unsupported content hash data`, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "getContentHash()",
        data: hexBytes
      });
    });
  }

  getText(key) {
    return __awaiter(this, void 0, void 0, function* () {
      // The key encoded as parameter to fetchBytes
      let keyBytes = (0, _strings.toUtf8Bytes)(key); // The nodehash consumes the first slot, so the string pointer targets
      // offset 64, with the length at offset 64 and data starting at offset 96

      keyBytes = (0, _bytes.concat)([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]); // Pad to word-size (32 bytes)

      if (keyBytes.length % 32 !== 0) {
        keyBytes = (0, _bytes.concat)([keyBytes, (0, _bytes.hexZeroPad)("0x", 32 - key.length % 32)]);
      }

      const hexBytes = yield this._fetchBytes("0x59d1d43c", (0, _bytes.hexlify)(keyBytes));

      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }

      return (0, _strings.toUtf8String)(hexBytes);
    });
  }

}

exports.Resolver = Resolver;
let defaultFormatter = null;
let nextPollId = 1;

class BaseProvider extends _abstractProvider.Provider {
  /**
   *  ready
   *
   *  A Promise<Network> that resolves only once the provider is ready.
   *
   *  Sub-classes that call the super with a network without a chainId
   *  MUST set this. Standard named networks have a known chainId.
   *
   */
  constructor(network) {
    logger.checkNew(new.target, _abstractProvider.Provider);
    super(); // Events being listened to

    this._events = [];
    this._emitted = {
      block: -2
    };
    this.formatter = new.target.getFormatter(); // If network is any, this Provider allows the underlying
    // network to change dynamically, and we auto-detect the
    // current network

    (0, _properties.defineReadOnly)(this, "anyNetwork", network === "any");

    if (this.anyNetwork) {
      network = this.detectNetwork();
    }

    if (network instanceof Promise) {
      this._networkPromise = network; // Squash any "unhandled promise" errors; that do not need to be handled

      network.catch(error => {}); // Trigger initial network setting (async)

      this._ready().catch(error => {});
    } else {
      const knownNetwork = (0, _properties.getStatic)(new.target, "getNetwork")(network);

      if (knownNetwork) {
        (0, _properties.defineReadOnly)(this, "_network", knownNetwork);
        this.emit("network", knownNetwork, null);
      } else {
        logger.throwArgumentError("invalid network", "network", network);
      }
    }

    this._maxInternalBlockNumber = -1024;
    this._lastBlockNumber = -2;
    this._pollingInterval = 4000;
    this._fastQueryDate = 0;
  }

  _ready() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._network == null) {
        let network = null;

        if (this._networkPromise) {
          try {
            network = yield this._networkPromise;
          } catch (error) {}
        } // Try the Provider's network detection (this MUST throw if it cannot)


        if (network == null) {
          network = yield this.detectNetwork();
        } // This should never happen; every Provider sub-class should have
        // suggested a network by here (or have thrown).


        if (!network) {
          logger.throwError("no network detected", _logger.Logger.errors.UNKNOWN_ERROR, {});
        } // Possible this call stacked so do not call defineReadOnly again


        if (this._network == null) {
          if (this.anyNetwork) {
            this._network = network;
          } else {
            (0, _properties.defineReadOnly)(this, "_network", network);
          }

          this.emit("network", network, null);
        }
      }

      return this._network;
    });
  } // This will always return the most recently established network.
  // For "any", this can change (a "network" event is emitted before
  // any change is reflected); otherwise this cannot change


  get ready() {
    return (0, _web.poll)(() => {
      return this._ready().then(network => {
        return network;
      }, error => {
        // If the network isn't running yet, we will wait
        if (error.code === _logger.Logger.errors.NETWORK_ERROR && error.event === "noNetwork") {
          return undefined;
        }

        throw error;
      });
    });
  } // @TODO: Remove this and just create a singleton formatter


  static getFormatter() {
    if (defaultFormatter == null) {
      defaultFormatter = new _formatter.Formatter();
    }

    return defaultFormatter;
  } // @TODO: Remove this and just use getNetwork


  static getNetwork(network) {
    return (0, _networks.getNetwork)(network == null ? "homestead" : network);
  } // Fetches the blockNumber, but will reuse any result that is less
  // than maxAge old or has been requested since the last request


  _getInternalBlockNumber(maxAge) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this._ready(); // Allowing stale data up to maxAge old

      if (maxAge > 0) {
        // While there are pending internal block requests...
        while (this._internalBlockNumber) {
          // ..."remember" which fetch we started with
          const internalBlockNumber = this._internalBlockNumber;

          try {
            // Check the result is not too stale
            const result = yield internalBlockNumber;

            if (getTime() - result.respTime <= maxAge) {
              return result.blockNumber;
            } // Too old; fetch a new value


            break;
          } catch (error) {
            // The fetch rejected; if we are the first to get the
            // rejection, drop through so we replace it with a new
            // fetch; all others blocked will then get that fetch
            // which won't match the one they "remembered" and loop
            if (this._internalBlockNumber === internalBlockNumber) {
              break;
            }
          }
        }
      }

      const reqTime = getTime();
      const checkInternalBlockNumber = (0, _properties.resolveProperties)({
        blockNumber: this.perform("getBlockNumber", {}),
        networkError: this.getNetwork().then(network => null, error => error)
      }).then(({
        blockNumber,
        networkError
      }) => {
        if (networkError) {
          // Unremember this bad internal block number
          if (this._internalBlockNumber === checkInternalBlockNumber) {
            this._internalBlockNumber = null;
          }

          throw networkError;
        }

        const respTime = getTime();
        blockNumber = _bignumber.BigNumber.from(blockNumber).toNumber();

        if (blockNumber < this._maxInternalBlockNumber) {
          blockNumber = this._maxInternalBlockNumber;
        }

        this._maxInternalBlockNumber = blockNumber;

        this._setFastBlockNumber(blockNumber); // @TODO: Still need this?


        return {
          blockNumber,
          reqTime,
          respTime
        };
      });
      this._internalBlockNumber = checkInternalBlockNumber; // Swallow unhandled exceptions; if needed they are handled else where

      checkInternalBlockNumber.catch(error => {
        // Don't null the dead (rejected) fetch, if it has already been updated
        if (this._internalBlockNumber === checkInternalBlockNumber) {
          this._internalBlockNumber = null;
        }
      });
      return (yield checkInternalBlockNumber).blockNumber;
    });
  }

  poll() {
    return __awaiter(this, void 0, void 0, function* () {
      const pollId = nextPollId++; // Track all running promises, so we can trigger a post-poll once they are complete

      const runners = [];
      let blockNumber = null;

      try {
        blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
      } catch (error) {
        this.emit("error", error);
        return;
      }

      this._setFastBlockNumber(blockNumber); // Emit a poll event after we have the latest (fast) block number


      this.emit("poll", pollId, blockNumber); // If the block has not changed, meh.

      if (blockNumber === this._lastBlockNumber) {
        this.emit("didPoll", pollId);
        return;
      } // First polling cycle, trigger a "block" events


      if (this._emitted.block === -2) {
        this._emitted.block = blockNumber - 1;
      }

      if (Math.abs(this._emitted.block - blockNumber) > 1000) {
        logger.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${blockNumber})`);
        this.emit("error", logger.makeError("network block skew detected", _logger.Logger.errors.NETWORK_ERROR, {
          blockNumber: blockNumber,
          event: "blockSkew",
          previousBlockNumber: this._emitted.block
        }));
        this.emit("block", blockNumber);
      } else {
        // Notify all listener for each block that has passed
        for (let i = this._emitted.block + 1; i <= blockNumber; i++) {
          this.emit("block", i);
        }
      } // The emitted block was updated, check for obsolete events


      if (this._emitted.block !== blockNumber) {
        this._emitted.block = blockNumber;
        Object.keys(this._emitted).forEach(key => {
          // The block event does not expire
          if (key === "block") {
            return;
          } // The block we were at when we emitted this event


          const eventBlockNumber = this._emitted[key]; // We cannot garbage collect pending transactions or blocks here
          // They should be garbage collected by the Provider when setting
          // "pending" events

          if (eventBlockNumber === "pending") {
            return;
          } // Evict any transaction hashes or block hashes over 12 blocks
          // old, since they should not return null anyways


          if (blockNumber - eventBlockNumber > 12) {
            delete this._emitted[key];
          }
        });
      } // First polling cycle


      if (this._lastBlockNumber === -2) {
        this._lastBlockNumber = blockNumber - 1;
      } // Find all transaction hashes we are waiting on


      this._events.forEach(event => {
        switch (event.type) {
          case "tx":
            {
              const hash = event.hash;
              let runner = this.getTransactionReceipt(hash).then(receipt => {
                if (!receipt || receipt.blockNumber == null) {
                  return null;
                }

                this._emitted["t:" + hash] = receipt.blockNumber;
                this.emit(hash, receipt);
                return null;
              }).catch(error => {
                this.emit("error", error);
              });
              runners.push(runner);
              break;
            }

          case "filter":
            {
              const filter = event.filter;
              filter.fromBlock = this._lastBlockNumber + 1;
              filter.toBlock = blockNumber;
              const runner = this.getLogs(filter).then(logs => {
                if (logs.length === 0) {
                  return;
                }

                logs.forEach(log => {
                  this._emitted["b:" + log.blockHash] = log.blockNumber;
                  this._emitted["t:" + log.transactionHash] = log.blockNumber;
                  this.emit(filter, log);
                });
              }).catch(error => {
                this.emit("error", error);
              });
              runners.push(runner);
              break;
            }
        }
      });

      this._lastBlockNumber = blockNumber; // Once all events for this loop have been processed, emit "didPoll"

      Promise.all(runners).then(() => {
        this.emit("didPoll", pollId);
      }).catch(error => {
        this.emit("error", error);
      });
      return;
    });
  } // Deprecated; do not use this


  resetEventsBlock(blockNumber) {
    this._lastBlockNumber = blockNumber - 1;

    if (this.polling) {
      this.poll();
    }
  }

  get network() {
    return this._network;
  } // This method should query the network if the underlying network
  // can change, such as when connected to a JSON-RPC backend


  detectNetwork() {
    return __awaiter(this, void 0, void 0, function* () {
      return logger.throwError("provider does not support network detection", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "provider.detectNetwork"
      });
    });
  }

  getNetwork() {
    return __awaiter(this, void 0, void 0, function* () {
      const network = yield this._ready(); // Make sure we are still connected to the same network; this is
      // only an external call for backends which can have the underlying
      // network change spontaneously

      const currentNetwork = yield this.detectNetwork();

      if (network.chainId !== currentNetwork.chainId) {
        // We are allowing network changes, things can get complex fast;
        // make sure you know what you are doing if you use "any"
        if (this.anyNetwork) {
          this._network = currentNetwork; // Reset all internal block number guards and caches

          this._lastBlockNumber = -2;
          this._fastBlockNumber = null;
          this._fastBlockNumberPromise = null;
          this._fastQueryDate = 0;
          this._emitted.block = -2;
          this._maxInternalBlockNumber = -1024;
          this._internalBlockNumber = null; // The "network" event MUST happen before this method resolves
          // so any events have a chance to unregister, so we stall an
          // additional event loop before returning from /this/ call

          this.emit("network", currentNetwork, network);
          yield stall(0);
          return this._network;
        }

        const error = logger.makeError("underlying network changed", _logger.Logger.errors.NETWORK_ERROR, {
          event: "changed",
          network: network,
          detectedNetwork: currentNetwork
        });
        this.emit("error", error);
        throw error;
      }

      return network;
    });
  }

  get blockNumber() {
    this._getInternalBlockNumber(100 + this.pollingInterval / 2).then(blockNumber => {
      this._setFastBlockNumber(blockNumber);
    }, error => {});

    return this._fastBlockNumber != null ? this._fastBlockNumber : -1;
  }

  get polling() {
    return this._poller != null;
  }

  set polling(value) {
    if (value && !this._poller) {
      this._poller = setInterval(() => {
        this.poll();
      }, this.pollingInterval);

      if (!this._bootstrapPoll) {
        this._bootstrapPoll = setTimeout(() => {
          this.poll(); // We block additional polls until the polling interval
          // is done, to prevent overwhelming the poll function

          this._bootstrapPoll = setTimeout(() => {
            // If polling was disabled, something may require a poke
            // since starting the bootstrap poll and it was disabled
            if (!this._poller) {
              this.poll();
            } // Clear out the bootstrap so we can do another


            this._bootstrapPoll = null;
          }, this.pollingInterval);
        }, 0);
      }
    } else if (!value && this._poller) {
      clearInterval(this._poller);
      this._poller = null;
    }
  }

  get pollingInterval() {
    return this._pollingInterval;
  }

  set pollingInterval(value) {
    if (typeof value !== "number" || value <= 0 || parseInt(String(value)) != value) {
      throw new Error("invalid polling interval");
    }

    this._pollingInterval = value;

    if (this._poller) {
      clearInterval(this._poller);
      this._poller = setInterval(() => {
        this.poll();
      }, this._pollingInterval);
    }
  }

  _getFastBlockNumber() {
    const now = getTime(); // Stale block number, request a newer value

    if (now - this._fastQueryDate > 2 * this._pollingInterval) {
      this._fastQueryDate = now;
      this._fastBlockNumberPromise = this.getBlockNumber().then(blockNumber => {
        if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
          this._fastBlockNumber = blockNumber;
        }

        return this._fastBlockNumber;
      });
    }

    return this._fastBlockNumberPromise;
  }

  _setFastBlockNumber(blockNumber) {
    // Older block, maybe a stale request
    if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
      return;
    } // Update the time we updated the blocknumber


    this._fastQueryDate = getTime(); // Newer block number, use  it

    if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
      this._fastBlockNumber = blockNumber;
      this._fastBlockNumberPromise = Promise.resolve(blockNumber);
    }
  }

  waitForTransaction(transactionHash, confirmations, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._waitForTransaction(transactionHash, confirmations == null ? 1 : confirmations, timeout || 0, null);
    });
  }

  _waitForTransaction(transactionHash, confirmations, timeout, replaceable) {
    return __awaiter(this, void 0, void 0, function* () {
      const receipt = yield this.getTransactionReceipt(transactionHash); // Receipt is already good

      if ((receipt ? receipt.confirmations : 0) >= confirmations) {
        return receipt;
      } // Poll until the receipt is good...


      return new Promise((resolve, reject) => {
        const cancelFuncs = [];
        let done = false;

        const alreadyDone = function () {
          if (done) {
            return true;
          }

          done = true;
          cancelFuncs.forEach(func => {
            func();
          });
          return false;
        };

        const minedHandler = receipt => {
          if (receipt.confirmations < confirmations) {
            return;
          }

          if (alreadyDone()) {
            return;
          }

          resolve(receipt);
        };

        this.on(transactionHash, minedHandler);
        cancelFuncs.push(() => {
          this.removeListener(transactionHash, minedHandler);
        });

        if (replaceable) {
          let lastBlockNumber = replaceable.startBlock;
          let scannedBlock = null;

          const replaceHandler = blockNumber => __awaiter(this, void 0, void 0, function* () {
            if (done) {
              return;
            } // Wait 1 second; this is only used in the case of a fault, so
            // we will trade off a little bit of latency for more consistent
            // results and fewer JSON-RPC calls


            yield stall(1000);
            this.getTransactionCount(replaceable.from).then(nonce => __awaiter(this, void 0, void 0, function* () {
              if (done) {
                return;
              }

              if (nonce <= replaceable.nonce) {
                lastBlockNumber = blockNumber;
              } else {
                // First check if the transaction was mined
                {
                  const mined = yield this.getTransaction(transactionHash);

                  if (mined && mined.blockNumber != null) {
                    return;
                  }
                } // First time scanning. We start a little earlier for some
                // wiggle room here to handle the eventually consistent nature
                // of blockchain (e.g. the getTransactionCount was for a
                // different block)

                if (scannedBlock == null) {
                  scannedBlock = lastBlockNumber - 3;

                  if (scannedBlock < replaceable.startBlock) {
                    scannedBlock = replaceable.startBlock;
                  }
                }

                while (scannedBlock <= blockNumber) {
                  if (done) {
                    return;
                  }

                  const block = yield this.getBlockWithTransactions(scannedBlock);

                  for (let ti = 0; ti < block.transactions.length; ti++) {
                    const tx = block.transactions[ti]; // Successfully mined!

                    if (tx.hash === transactionHash) {
                      return;
                    } // Matches our transaction from and nonce; its a replacement


                    if (tx.from === replaceable.from && tx.nonce === replaceable.nonce) {
                      if (done) {
                        return;
                      } // Get the receipt of the replacement


                      const receipt = yield this.waitForTransaction(tx.hash, confirmations); // Already resolved or rejected (prolly a timeout)

                      if (alreadyDone()) {
                        return;
                      } // The reason we were replaced


                      let reason = "replaced";

                      if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                        reason = "repriced";
                      } else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                        reason = "cancelled";
                      } // Explain why we were replaced


                      reject(logger.makeError("transaction was replaced", _logger.Logger.errors.TRANSACTION_REPLACED, {
                        cancelled: reason === "replaced" || reason === "cancelled",
                        reason,
                        replacement: this._wrapTransaction(tx),
                        hash: transactionHash,
                        receipt
                      }));
                      return;
                    }
                  }

                  scannedBlock++;
                }
              }

              if (done) {
                return;
              }

              this.once("block", replaceHandler);
            }), error => {
              if (done) {
                return;
              }

              this.once("block", replaceHandler);
            });
          });

          if (done) {
            return;
          }

          this.once("block", replaceHandler);
          cancelFuncs.push(() => {
            this.removeListener("block", replaceHandler);
          });
        }

        if (typeof timeout === "number" && timeout > 0) {
          const timer = setTimeout(() => {
            if (alreadyDone()) {
              return;
            }

            reject(logger.makeError("timeout exceeded", _logger.Logger.errors.TIMEOUT, {
              timeout: timeout
            }));
          }, timeout);

          if (timer.unref) {
            timer.unref();
          }

          cancelFuncs.push(() => {
            clearTimeout(timer);
          });
        }
      });
    });
  }

  getBlockNumber() {
    return __awaiter(this, void 0, void 0, function* () {
      return this._getInternalBlockNumber(0);
    });
  }

  getGasPrice() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const result = yield this.perform("getGasPrice", {});

      try {
        return _bignumber.BigNumber.from(result);
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "getGasPrice",
          result,
          error
        });
      }
    });
  }

  getBalance(addressOrName, blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getBalance", params);

      try {
        return _bignumber.BigNumber.from(result);
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "getBalance",
          params,
          result,
          error
        });
      }
    });
  }

  getTransactionCount(addressOrName, blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getTransactionCount", params);

      try {
        return _bignumber.BigNumber.from(result).toNumber();
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "getTransactionCount",
          params,
          result,
          error
        });
      }
    });
  }

  getCode(addressOrName, blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getCode", params);

      try {
        return (0, _bytes.hexlify)(result);
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "getCode",
          params,
          result,
          error
        });
      }
    });
  }

  getStorageAt(addressOrName, position, blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag),
        position: Promise.resolve(position).then(p => (0, _bytes.hexValue)(p))
      });
      const result = yield this.perform("getStorageAt", params);

      try {
        return (0, _bytes.hexlify)(result);
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "getStorageAt",
          params,
          result,
          error
        });
      }
    });
  } // This should be called by any subclass wrapping a TransactionResponse


  _wrapTransaction(tx, hash, startBlock) {
    if (hash != null && (0, _bytes.hexDataLength)(hash) !== 32) {
      throw new Error("invalid response - sendTransaction");
    }

    const result = tx; // Check the hash we expect is the same as the hash the server reported

    if (hash != null && tx.hash !== hash) {
      logger.throwError("Transaction hash mismatch from Provider.sendTransaction.", _logger.Logger.errors.UNKNOWN_ERROR, {
        expectedHash: tx.hash,
        returnedHash: hash
      });
    }

    result.wait = (confirms, timeout) => __awaiter(this, void 0, void 0, function* () {
      if (confirms == null) {
        confirms = 1;
      }

      if (timeout == null) {
        timeout = 0;
      } // Get the details to detect replacement


      let replacement = undefined;

      if (confirms !== 0 && startBlock != null) {
        replacement = {
          data: tx.data,
          from: tx.from,
          nonce: tx.nonce,
          to: tx.to,
          value: tx.value,
          startBlock
        };
      }

      const receipt = yield this._waitForTransaction(tx.hash, confirms, timeout, replacement);

      if (receipt == null && confirms === 0) {
        return null;
      } // No longer pending, allow the polling loop to garbage collect this


      this._emitted["t:" + tx.hash] = receipt.blockNumber;

      if (receipt.status === 0) {
        logger.throwError("transaction failed", _logger.Logger.errors.CALL_EXCEPTION, {
          transactionHash: tx.hash,
          transaction: tx,
          receipt: receipt
        });
      }

      return receipt;
    });

    return result;
  }

  sendTransaction(signedTransaction) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const hexTx = yield Promise.resolve(signedTransaction).then(t => (0, _bytes.hexlify)(t));
      const tx = this.formatter.transaction(signedTransaction);

      if (tx.confirmations == null) {
        tx.confirmations = 0;
      }

      const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);

      try {
        const hash = yield this.perform("sendTransaction", {
          signedTransaction: hexTx
        });
        return this._wrapTransaction(tx, hash, blockNumber);
      } catch (error) {
        error.transaction = tx;
        error.transactionHash = tx.hash;
        throw error;
      }
    });
  }

  _getTransactionRequest(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      const values = yield transaction;
      const tx = {};
      ["from", "to"].forEach(key => {
        if (values[key] == null) {
          return;
        }

        tx[key] = Promise.resolve(values[key]).then(v => v ? this._getAddress(v) : null);
      });
      ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach(key => {
        if (values[key] == null) {
          return;
        }

        tx[key] = Promise.resolve(values[key]).then(v => v ? _bignumber.BigNumber.from(v) : null);
      });
      ["type"].forEach(key => {
        if (values[key] == null) {
          return;
        }

        tx[key] = Promise.resolve(values[key]).then(v => v != null ? v : null);
      });

      if (values.accessList) {
        tx.accessList = this.formatter.accessList(values.accessList);
      }

      ["data"].forEach(key => {
        if (values[key] == null) {
          return;
        }

        tx[key] = Promise.resolve(values[key]).then(v => v ? (0, _bytes.hexlify)(v) : null);
      });
      return this.formatter.transactionRequest(yield (0, _properties.resolveProperties)(tx));
    });
  }

  _getFilter(filter) {
    return __awaiter(this, void 0, void 0, function* () {
      filter = yield filter;
      const result = {};

      if (filter.address != null) {
        result.address = this._getAddress(filter.address);
      }

      ["blockHash", "topics"].forEach(key => {
        if (filter[key] == null) {
          return;
        }

        result[key] = filter[key];
      });
      ["fromBlock", "toBlock"].forEach(key => {
        if (filter[key] == null) {
          return;
        }

        result[key] = this._getBlockTag(filter[key]);
      });
      return this.formatter.filter(yield (0, _properties.resolveProperties)(result));
    });
  }

  call(transaction, blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        transaction: this._getTransactionRequest(transaction),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("call", params);

      try {
        return (0, _bytes.hexlify)(result);
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "call",
          params,
          result,
          error
        });
      }
    });
  }

  estimateGas(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        transaction: this._getTransactionRequest(transaction)
      });
      const result = yield this.perform("estimateGas", params);

      try {
        return _bignumber.BigNumber.from(result);
      } catch (error) {
        return logger.throwError("bad result from backend", _logger.Logger.errors.SERVER_ERROR, {
          method: "estimateGas",
          params,
          result,
          error
        });
      }
    });
  }

  _getAddress(addressOrName) {
    return __awaiter(this, void 0, void 0, function* () {
      addressOrName = yield addressOrName;

      if (typeof addressOrName !== "string") {
        logger.throwArgumentError("invalid address or ENS name", "name", addressOrName);
      }

      const address = yield this.resolveName(addressOrName);

      if (address == null) {
        logger.throwError("ENS name not configured", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `resolveName(${JSON.stringify(addressOrName)})`
        });
      }

      return address;
    });
  }

  _getBlock(blockHashOrBlockTag, includeTransactions) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      blockHashOrBlockTag = yield blockHashOrBlockTag; // If blockTag is a number (not "latest", etc), this is the block number

      let blockNumber = -128;
      const params = {
        includeTransactions: !!includeTransactions
      };

      if ((0, _bytes.isHexString)(blockHashOrBlockTag, 32)) {
        params.blockHash = blockHashOrBlockTag;
      } else {
        try {
          params.blockTag = yield this._getBlockTag(blockHashOrBlockTag);

          if ((0, _bytes.isHexString)(params.blockTag)) {
            blockNumber = parseInt(params.blockTag.substring(2), 16);
          }
        } catch (error) {
          logger.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
        }
      }

      return (0, _web.poll)(() => __awaiter(this, void 0, void 0, function* () {
        const block = yield this.perform("getBlock", params); // Block was not found

        if (block == null) {
          // For blockhashes, if we didn't say it existed, that blockhash may
          // not exist. If we did see it though, perhaps from a log, we know
          // it exists, and this node is just not caught up yet.
          if (params.blockHash != null) {
            if (this._emitted["b:" + params.blockHash] == null) {
              return null;
            }
          } // For block tags, if we are asking for a future block, we return null


          if (params.blockTag != null) {
            if (blockNumber > this._emitted.block) {
              return null;
            }
          } // Retry on the next block


          return undefined;
        } // Add transactions


        if (includeTransactions) {
          let blockNumber = null;

          for (let i = 0; i < block.transactions.length; i++) {
            const tx = block.transactions[i];

            if (tx.blockNumber == null) {
              tx.confirmations = 0;
            } else if (tx.confirmations == null) {
              if (blockNumber == null) {
                blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
              } // Add the confirmations using the fast block number (pessimistic)


              let confirmations = blockNumber - tx.blockNumber + 1;

              if (confirmations <= 0) {
                confirmations = 1;
              }

              tx.confirmations = confirmations;
            }
          }

          const blockWithTxs = this.formatter.blockWithTransactions(block);
          blockWithTxs.transactions = blockWithTxs.transactions.map(tx => this._wrapTransaction(tx));
          return blockWithTxs;
        }

        return this.formatter.block(block);
      }), {
        oncePoll: this
      });
    });
  }

  getBlock(blockHashOrBlockTag) {
    return this._getBlock(blockHashOrBlockTag, false);
  }

  getBlockWithTransactions(blockHashOrBlockTag) {
    return this._getBlock(blockHashOrBlockTag, true);
  }

  getTransaction(transactionHash) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      transactionHash = yield transactionHash;
      const params = {
        transactionHash: this.formatter.hash(transactionHash, true)
      };
      return (0, _web.poll)(() => __awaiter(this, void 0, void 0, function* () {
        const result = yield this.perform("getTransaction", params);

        if (result == null) {
          if (this._emitted["t:" + transactionHash] == null) {
            return null;
          }

          return undefined;
        }

        const tx = this.formatter.transactionResponse(result);

        if (tx.blockNumber == null) {
          tx.confirmations = 0;
        } else if (tx.confirmations == null) {
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval); // Add the confirmations using the fast block number (pessimistic)

          let confirmations = blockNumber - tx.blockNumber + 1;

          if (confirmations <= 0) {
            confirmations = 1;
          }

          tx.confirmations = confirmations;
        }

        return this._wrapTransaction(tx);
      }), {
        oncePoll: this
      });
    });
  }

  getTransactionReceipt(transactionHash) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      transactionHash = yield transactionHash;
      const params = {
        transactionHash: this.formatter.hash(transactionHash, true)
      };
      return (0, _web.poll)(() => __awaiter(this, void 0, void 0, function* () {
        const result = yield this.perform("getTransactionReceipt", params);

        if (result == null) {
          if (this._emitted["t:" + transactionHash] == null) {
            return null;
          }

          return undefined;
        } // "geth-etc" returns receipts before they are ready


        if (result.blockHash == null) {
          return undefined;
        }

        const receipt = this.formatter.receipt(result);

        if (receipt.blockNumber == null) {
          receipt.confirmations = 0;
        } else if (receipt.confirmations == null) {
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval); // Add the confirmations using the fast block number (pessimistic)

          let confirmations = blockNumber - receipt.blockNumber + 1;

          if (confirmations <= 0) {
            confirmations = 1;
          }

          receipt.confirmations = confirmations;
        }

        return receipt;
      }), {
        oncePoll: this
      });
    });
  }

  getLogs(filter) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield (0, _properties.resolveProperties)({
        filter: this._getFilter(filter)
      });
      const logs = yield this.perform("getLogs", params);
      logs.forEach(log => {
        if (log.removed == null) {
          log.removed = false;
        }
      });
      return _formatter.Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
    });
  }

  getEtherPrice() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.getNetwork();
      return this.perform("getEtherPrice", {});
    });
  }

  _getBlockTag(blockTag) {
    return __awaiter(this, void 0, void 0, function* () {
      blockTag = yield blockTag;

      if (typeof blockTag === "number" && blockTag < 0) {
        if (blockTag % 1) {
          logger.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
        }

        let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
        blockNumber += blockTag;

        if (blockNumber < 0) {
          blockNumber = 0;
        }

        return this.formatter.blockTag(blockNumber);
      }

      return this.formatter.blockTag(blockTag);
    });
  }

  getResolver(name) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const address = yield this._getResolver(name);

        if (address == null) {
          return null;
        }

        return new Resolver(this, address, name);
      } catch (error) {
        if (error.code === _logger.Logger.errors.CALL_EXCEPTION) {
          return null;
        }

        return null;
      }
    });
  }

  _getResolver(name) {
    return __awaiter(this, void 0, void 0, function* () {
      // Get the resolver from the blockchain
      const network = yield this.getNetwork(); // No ENS...

      if (!network.ensAddress) {
        logger.throwError("network does not support ENS", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "ENS",
          network: network.name
        });
      } // keccak256("resolver(bytes32)")


      const transaction = {
        to: network.ensAddress,
        data: "0x0178b8bf" + (0, _hash.namehash)(name).substring(2)
      };

      try {
        return this.formatter.callAddress(yield this.call(transaction));
      } catch (error) {
        if (error.code === _logger.Logger.errors.CALL_EXCEPTION) {
          return null;
        }

        throw error;
      }
    });
  }

  resolveName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      name = yield name; // If it is already an address, nothing to resolve

      try {
        return Promise.resolve(this.formatter.address(name));
      } catch (error) {
        // If is is a hexstring, the address is bad (See #694)
        if ((0, _bytes.isHexString)(name)) {
          throw error;
        }
      }

      if (typeof name !== "string") {
        logger.throwArgumentError("invalid ENS name", "name", name);
      } // Get the addr from the resovler


      const resolver = yield this.getResolver(name);

      if (!resolver) {
        return null;
      }

      return yield resolver.getAddress();
    });
  }

  lookupAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
      address = yield address;
      address = this.formatter.address(address);
      const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
      const resolverAddress = yield this._getResolver(reverseName);

      if (!resolverAddress) {
        return null;
      } // keccak("name(bytes32)")


      let bytes = (0, _bytes.arrayify)(yield this.call({
        to: resolverAddress,
        data: "0x691f3431" + (0, _hash.namehash)(reverseName).substring(2)
      })); // Strip off the dynamic string pointer (0x20)

      if (bytes.length < 32 || !_bignumber.BigNumber.from(bytes.slice(0, 32)).eq(32)) {
        return null;
      }

      bytes = bytes.slice(32); // Not a length-prefixed string

      if (bytes.length < 32) {
        return null;
      } // Get the length of the string (from the length-prefix)


      const length = _bignumber.BigNumber.from(bytes.slice(0, 32)).toNumber();

      bytes = bytes.slice(32); // Length longer than available data

      if (length > bytes.length) {
        return null;
      }

      const name = (0, _strings.toUtf8String)(bytes.slice(0, length)); // Make sure the reverse record matches the foward record

      const addr = yield this.resolveName(name);

      if (addr != address) {
        return null;
      }

      return name;
    });
  }

  getAvatar(nameOrAddress) {
    return __awaiter(this, void 0, void 0, function* () {
      let resolver = null;

      if ((0, _bytes.isHexString)(nameOrAddress)) {
        // Address; reverse lookup
        const address = this.formatter.address(nameOrAddress);
        const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
        const resolverAddress = yield this._getResolver(reverseName);

        if (!resolverAddress) {
          return null;
        }

        resolver = new Resolver(this, resolverAddress, "_", address);
      } else {
        // ENS name; forward lookup
        resolver = yield this.getResolver(nameOrAddress);
      }

      const avatar = yield resolver.getAvatar();

      if (avatar == null) {
        return null;
      }

      return avatar.url;
    });
  }

  perform(method, params) {
    return logger.throwError(method + " not implemented", _logger.Logger.errors.NOT_IMPLEMENTED, {
      operation: method
    });
  }

  _startEvent(event) {
    this.polling = this._events.filter(e => e.pollable()).length > 0;
  }

  _stopEvent(event) {
    this.polling = this._events.filter(e => e.pollable()).length > 0;
  }

  _addEventListener(eventName, listener, once) {
    const event = new Event(getEventTag(eventName), listener, once);

    this._events.push(event);

    this._startEvent(event);

    return this;
  }

  on(eventName, listener) {
    return this._addEventListener(eventName, listener, false);
  }

  once(eventName, listener) {
    return this._addEventListener(eventName, listener, true);
  }

  emit(eventName, ...args) {
    let result = false;
    let stopped = [];
    let eventTag = getEventTag(eventName);
    this._events = this._events.filter(event => {
      if (event.tag !== eventTag) {
        return true;
      }

      setTimeout(() => {
        event.listener.apply(this, args);
      }, 0);
      result = true;

      if (event.once) {
        stopped.push(event);
        return false;
      }

      return true;
    });
    stopped.forEach(event => {
      this._stopEvent(event);
    });
    return result;
  }

  listenerCount(eventName) {
    if (!eventName) {
      return this._events.length;
    }

    let eventTag = getEventTag(eventName);
    return this._events.filter(event => {
      return event.tag === eventTag;
    }).length;
  }

  listeners(eventName) {
    if (eventName == null) {
      return this._events.map(event => event.listener);
    }

    let eventTag = getEventTag(eventName);
    return this._events.filter(event => event.tag === eventTag).map(event => event.listener);
  }

  off(eventName, listener) {
    if (listener == null) {
      return this.removeAllListeners(eventName);
    }

    const stopped = [];
    let found = false;
    let eventTag = getEventTag(eventName);
    this._events = this._events.filter(event => {
      if (event.tag !== eventTag || event.listener != listener) {
        return true;
      }

      if (found) {
        return true;
      }

      found = true;
      stopped.push(event);
      return false;
    });
    stopped.forEach(event => {
      this._stopEvent(event);
    });
    return this;
  }

  removeAllListeners(eventName) {
    let stopped = [];

    if (eventName == null) {
      stopped = this._events;
      this._events = [];
    } else {
      const eventTag = getEventTag(eventName);
      this._events = this._events.filter(event => {
        if (event.tag !== eventTag) {
          return true;
        }

        stopped.push(event);
        return false;
      });
    }

    stopped.forEach(event => {
      this._stopEvent(event);
    });
    return this;
  }

}

exports.BaseProvider = BaseProvider;
},{"@ethersproject/abstract-provider":"GKyj","@ethersproject/basex":"Q7g1","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/constants":"FOhG","@ethersproject/hash":"eHxR","@ethersproject/networks":"k9P0","@ethersproject/properties":"JuuX","@ethersproject/sha2":"C9Hj","@ethersproject/strings":"ZW9k","@ethersproject/web":"egXK","bech32":"LibZ","@ethersproject/logger":"kMNH","./_version":"UhEn","./formatter":"nnuj"}],"HkBu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonRpcSigner = exports.JsonRpcProvider = void 0;

var _abstractSigner = require("@ethersproject/abstract-signer");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _hash = require("@ethersproject/hash");

var _properties = require("@ethersproject/properties");

var _strings = require("@ethersproject/strings");

var _transactions = require("@ethersproject/transactions");

var _web = require("@ethersproject/web");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _baseProvider = require("./base-provider");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);
const errorGas = ["call", "estimateGas"];

function checkError(method, error, params) {
  // Undo the "convenience" some nodes are attempting to prevent backwards
  // incompatibility; maybe for v6 consider forwarding reverts as errors
  if (method === "call" && error.code === _logger.Logger.errors.SERVER_ERROR) {
    const e = error.error;

    if (e && e.message.match("reverted") && (0, _bytes.isHexString)(e.data)) {
      return e.data;
    }

    logger.throwError("missing revert data in call exception", _logger.Logger.errors.CALL_EXCEPTION, {
      error,
      data: "0x"
    });
  }

  let message = error.message;

  if (error.code === _logger.Logger.errors.SERVER_ERROR && error.error && typeof error.error.message === "string") {
    message = error.error.message;
  } else if (typeof error.body === "string") {
    message = error.body;
  } else if (typeof error.responseText === "string") {
    message = error.responseText;
  }

  message = (message || "").toLowerCase();
  const transaction = params.transaction || params.signedTransaction; // "insufficient funds for gas * price + value + cost(data)"

  if (message.match(/insufficient funds|base fee exceeds gas limit/)) {
    logger.throwError("insufficient funds for intrinsic transaction cost", _logger.Logger.errors.INSUFFICIENT_FUNDS, {
      error,
      method,
      transaction
    });
  } // "nonce too low"


  if (message.match(/nonce too low/)) {
    logger.throwError("nonce has already been used", _logger.Logger.errors.NONCE_EXPIRED, {
      error,
      method,
      transaction
    });
  } // "replacement transaction underpriced"


  if (message.match(/replacement transaction underpriced/)) {
    logger.throwError("replacement fee too low", _logger.Logger.errors.REPLACEMENT_UNDERPRICED, {
      error,
      method,
      transaction
    });
  } // "replacement transaction underpriced"


  if (message.match(/only replay-protected/)) {
    logger.throwError("legacy pre-eip-155 transactions not supported", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      error,
      method,
      transaction
    });
  }

  if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
    logger.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", _logger.Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error,
      method,
      transaction
    });
  }

  throw error;
}

function timer(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
}

function getResult(payload) {
  if (payload.error) {
    // @TODO: not any
    const error = new Error(payload.error.message);
    error.code = payload.error.code;
    error.data = payload.error.data;
    throw error;
  }

  return payload.result;
}

function getLowerCase(value) {
  if (value) {
    return value.toLowerCase();
  }

  return value;
}

const _constructorGuard = {};

class JsonRpcSigner extends _abstractSigner.Signer {
  constructor(constructorGuard, provider, addressOrIndex) {
    logger.checkNew(new.target, JsonRpcSigner);
    super();

    if (constructorGuard !== _constructorGuard) {
      throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
    }

    (0, _properties.defineReadOnly)(this, "provider", provider);

    if (addressOrIndex == null) {
      addressOrIndex = 0;
    }

    if (typeof addressOrIndex === "string") {
      (0, _properties.defineReadOnly)(this, "_address", this.provider.formatter.address(addressOrIndex));
      (0, _properties.defineReadOnly)(this, "_index", null);
    } else if (typeof addressOrIndex === "number") {
      (0, _properties.defineReadOnly)(this, "_index", addressOrIndex);
      (0, _properties.defineReadOnly)(this, "_address", null);
    } else {
      logger.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
    }
  }

  connect(provider) {
    return logger.throwError("cannot alter JSON-RPC Signer connection", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "connect"
    });
  }

  connectUnchecked() {
    return new UncheckedJsonRpcSigner(_constructorGuard, this.provider, this._address || this._index);
  }

  getAddress() {
    if (this._address) {
      return Promise.resolve(this._address);
    }

    return this.provider.send("eth_accounts", []).then(accounts => {
      if (accounts.length <= this._index) {
        logger.throwError("unknown account #" + this._index, _logger.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "getAddress"
        });
      }

      return this.provider.formatter.address(accounts[this._index]);
    });
  }

  sendUncheckedTransaction(transaction) {
    transaction = (0, _properties.shallowCopy)(transaction);
    const fromAddress = this.getAddress().then(address => {
      if (address) {
        address = address.toLowerCase();
      }

      return address;
    }); // The JSON-RPC for eth_sendTransaction uses 90000 gas; if the user
    // wishes to use this, it is easy to specify explicitly, otherwise
    // we look it up for them.

    if (transaction.gasLimit == null) {
      const estimate = (0, _properties.shallowCopy)(transaction);
      estimate.from = fromAddress;
      transaction.gasLimit = this.provider.estimateGas(estimate);
    }

    if (transaction.to != null) {
      transaction.to = Promise.resolve(transaction.to).then(to => __awaiter(this, void 0, void 0, function* () {
        if (to == null) {
          return null;
        }

        const address = yield this.provider.resolveName(to);

        if (address == null) {
          logger.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
        }

        return address;
      }));
    }

    return (0, _properties.resolveProperties)({
      tx: (0, _properties.resolveProperties)(transaction),
      sender: fromAddress
    }).then(({
      tx,
      sender
    }) => {
      if (tx.from != null) {
        if (tx.from.toLowerCase() !== sender) {
          logger.throwArgumentError("from address mismatch", "transaction", transaction);
        }
      } else {
        tx.from = sender;
      }

      const hexTx = this.provider.constructor.hexlifyTransaction(tx, {
        from: true
      });
      return this.provider.send("eth_sendTransaction", [hexTx]).then(hash => {
        return hash;
      }, error => {
        return checkError("sendTransaction", error, hexTx);
      });
    });
  }

  signTransaction(transaction) {
    return logger.throwError("signing transactions is unsupported", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "signTransaction"
    });
  }

  sendTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      // This cannot be mined any earlier than any recent block
      const blockNumber = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval); // Send the transaction

      const hash = yield this.sendUncheckedTransaction(transaction);

      try {
        // Unfortunately, JSON-RPC only provides and opaque transaction hash
        // for a response, and we need the actual transaction, so we poll
        // for it; it should show up very quickly
        return yield (0, _web.poll)(() => __awaiter(this, void 0, void 0, function* () {
          const tx = yield this.provider.getTransaction(hash);

          if (tx === null) {
            return undefined;
          }

          return this.provider._wrapTransaction(tx, hash, blockNumber);
        }), {
          oncePoll: this.provider
        });
      } catch (error) {
        error.transactionHash = hash;
        throw error;
      }
    });
  }

  signMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = typeof message === "string" ? (0, _strings.toUtf8Bytes)(message) : message;
      const address = yield this.getAddress();
      return yield this.provider.send("personal_sign", [(0, _bytes.hexlify)(data), address.toLowerCase()]);
    });
  }

  _legacySignMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = typeof message === "string" ? (0, _strings.toUtf8Bytes)(message) : message;
      const address = yield this.getAddress(); // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign

      return yield this.provider.send("eth_sign", [address.toLowerCase(), (0, _bytes.hexlify)(data)]);
    });
  }

  _signTypedData(domain, types, value) {
    return __awaiter(this, void 0, void 0, function* () {
      // Populate any ENS names (in-place)
      const populated = yield _hash._TypedDataEncoder.resolveNames(domain, types, value, name => {
        return this.provider.resolveName(name);
      });
      const address = yield this.getAddress();
      return yield this.provider.send("eth_signTypedData_v4", [address.toLowerCase(), JSON.stringify(_hash._TypedDataEncoder.getPayload(populated.domain, types, populated.value))]);
    });
  }

  unlock(password) {
    return __awaiter(this, void 0, void 0, function* () {
      const provider = this.provider;
      const address = yield this.getAddress();
      return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
    });
  }

}

exports.JsonRpcSigner = JsonRpcSigner;

class UncheckedJsonRpcSigner extends JsonRpcSigner {
  sendTransaction(transaction) {
    return this.sendUncheckedTransaction(transaction).then(hash => {
      return {
        hash: hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: confirmations => {
          return this.provider.waitForTransaction(hash, confirmations);
        }
      };
    });
  }

}

const allowedTransactionKeys = {
  chainId: true,
  data: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  value: true,
  type: true,
  accessList: true,
  maxFeePerGas: true,
  maxPriorityFeePerGas: true
};

class JsonRpcProvider extends _baseProvider.BaseProvider {
  constructor(url, network) {
    logger.checkNew(new.target, JsonRpcProvider);
    let networkOrReady = network; // The network is unknown, query the JSON-RPC for it

    if (networkOrReady == null) {
      networkOrReady = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.detectNetwork().then(network => {
            resolve(network);
          }, error => {
            reject(error);
          });
        }, 0);
      });
    }

    super(networkOrReady); // Default URL

    if (!url) {
      url = (0, _properties.getStatic)(this.constructor, "defaultUrl")();
    }

    if (typeof url === "string") {
      (0, _properties.defineReadOnly)(this, "connection", Object.freeze({
        url: url
      }));
    } else {
      (0, _properties.defineReadOnly)(this, "connection", Object.freeze((0, _properties.shallowCopy)(url)));
    }

    this._nextId = 42;
  }

  get _cache() {
    if (this._eventLoopCache == null) {
      this._eventLoopCache = {};
    }

    return this._eventLoopCache;
  }

  static defaultUrl() {
    return "http:/\/localhost:8545";
  }

  detectNetwork() {
    if (!this._cache["detectNetwork"]) {
      this._cache["detectNetwork"] = this._uncachedDetectNetwork(); // Clear this cache at the beginning of the next event loop

      setTimeout(() => {
        this._cache["detectNetwork"] = null;
      }, 0);
    }

    return this._cache["detectNetwork"];
  }

  _uncachedDetectNetwork() {
    return __awaiter(this, void 0, void 0, function* () {
      yield timer(0);
      let chainId = null;

      try {
        chainId = yield this.send("eth_chainId", []);
      } catch (error) {
        try {
          chainId = yield this.send("net_version", []);
        } catch (error) {}
      }

      if (chainId != null) {
        const getNetwork = (0, _properties.getStatic)(this.constructor, "getNetwork");

        try {
          return getNetwork(_bignumber.BigNumber.from(chainId).toNumber());
        } catch (error) {
          return logger.throwError("could not detect network", _logger.Logger.errors.NETWORK_ERROR, {
            chainId: chainId,
            event: "invalidNetwork",
            serverError: error
          });
        }
      }

      return logger.throwError("could not detect network", _logger.Logger.errors.NETWORK_ERROR, {
        event: "noNetwork"
      });
    });
  }

  getSigner(addressOrIndex) {
    return new JsonRpcSigner(_constructorGuard, this, addressOrIndex);
  }

  getUncheckedSigner(addressOrIndex) {
    return this.getSigner(addressOrIndex).connectUnchecked();
  }

  listAccounts() {
    return this.send("eth_accounts", []).then(accounts => {
      return accounts.map(a => this.formatter.address(a));
    });
  }

  send(method, params) {
    const request = {
      method: method,
      params: params,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    this.emit("debug", {
      action: "request",
      request: (0, _properties.deepCopy)(request),
      provider: this
    }); // We can expand this in the future to any call, but for now these
    // are the biggest wins and do not require any serializing parameters.

    const cache = ["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0;

    if (cache && this._cache[method]) {
      return this._cache[method];
    }

    const result = (0, _web.fetchJson)(this.connection, JSON.stringify(request), getResult).then(result => {
      this.emit("debug", {
        action: "response",
        request: request,
        response: result,
        provider: this
      });
      return result;
    }, error => {
      this.emit("debug", {
        action: "response",
        error: error,
        request: request,
        provider: this
      });
      throw error;
    }); // Cache the fetch, but clear it on the next event loop

    if (cache) {
      this._cache[method] = result;
      setTimeout(() => {
        this._cache[method] = null;
      }, 0);
    }

    return result;
  }

  prepareRequest(method, params) {
    switch (method) {
      case "getBlockNumber":
        return ["eth_blockNumber", []];

      case "getGasPrice":
        return ["eth_gasPrice", []];

      case "getBalance":
        return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];

      case "getTransactionCount":
        return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];

      case "getCode":
        return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];

      case "getStorageAt":
        return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];

      case "sendTransaction":
        return ["eth_sendRawTransaction", [params.signedTransaction]];

      case "getBlock":
        if (params.blockTag) {
          return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
        } else if (params.blockHash) {
          return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
        }

        return null;

      case "getTransaction":
        return ["eth_getTransactionByHash", [params.transactionHash]];

      case "getTransactionReceipt":
        return ["eth_getTransactionReceipt", [params.transactionHash]];

      case "call":
        {
          const hexlifyTransaction = (0, _properties.getStatic)(this.constructor, "hexlifyTransaction");
          return ["eth_call", [hexlifyTransaction(params.transaction, {
            from: true
          }), params.blockTag]];
        }

      case "estimateGas":
        {
          const hexlifyTransaction = (0, _properties.getStatic)(this.constructor, "hexlifyTransaction");
          return ["eth_estimateGas", [hexlifyTransaction(params.transaction, {
            from: true
          })]];
        }

      case "getLogs":
        if (params.filter && params.filter.address != null) {
          params.filter.address = getLowerCase(params.filter.address);
        }

        return ["eth_getLogs", [params.filter]];

      default:
        break;
    }

    return null;
  }

  perform(method, params) {
    return __awaiter(this, void 0, void 0, function* () {
      // Legacy networks do not like the type field being passed along (which
      // is fair), so we delete type if it is 0 and a non-EIP-1559 network
      if (method === "call" || method === "estimateGas") {
        const tx = params.transaction;

        if (tx && tx.type != null && _bignumber.BigNumber.from(tx.type).isZero()) {
          // If there are no EIP-1559 properties, it might be non-EIP-a559
          if (tx.maxFeePerGas == null && tx.maxPriorityFeePerGas == null) {
            const feeData = yield this.getFeeData();

            if (feeData.maxFeePerGas == null && feeData.maxPriorityFeePerGas == null) {
              // Network doesn't know about EIP-1559 (and hence type)
              params = (0, _properties.shallowCopy)(params);
              params.transaction = (0, _properties.shallowCopy)(tx);
              delete params.transaction.type;
            }
          }
        }
      }

      const args = this.prepareRequest(method, params);

      if (args == null) {
        logger.throwError(method + " not implemented", _logger.Logger.errors.NOT_IMPLEMENTED, {
          operation: method
        });
      }

      try {
        return yield this.send(args[0], args[1]);
      } catch (error) {
        return checkError(method, error, params);
      }
    });
  }

  _startEvent(event) {
    if (event.tag === "pending") {
      this._startPending();
    }

    super._startEvent(event);
  }

  _startPending() {
    if (this._pendingFilter != null) {
      return;
    }

    const self = this;
    const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
    this._pendingFilter = pendingFilter;
    pendingFilter.then(function (filterId) {
      function poll() {
        self.send("eth_getFilterChanges", [filterId]).then(function (hashes) {
          if (self._pendingFilter != pendingFilter) {
            return null;
          }

          let seq = Promise.resolve();
          hashes.forEach(function (hash) {
            // @TODO: This should be garbage collected at some point... How? When?
            self._emitted["t:" + hash.toLowerCase()] = "pending";
            seq = seq.then(function () {
              return self.getTransaction(hash).then(function (tx) {
                self.emit("pending", tx);
                return null;
              });
            });
          });
          return seq.then(function () {
            return timer(1000);
          });
        }).then(function () {
          if (self._pendingFilter != pendingFilter) {
            self.send("eth_uninstallFilter", [filterId]);
            return;
          }

          setTimeout(function () {
            poll();
          }, 0);
          return null;
        }).catch(error => {});
      }

      poll();
      return filterId;
    }).catch(error => {});
  }

  _stopEvent(event) {
    if (event.tag === "pending" && this.listenerCount("pending") === 0) {
      this._pendingFilter = null;
    }

    super._stopEvent(event);
  } // Convert an ethers.js transaction into a JSON-RPC transaction
  //  - gasLimit => gas
  //  - All values hexlified
  //  - All numeric values zero-striped
  //  - All addresses are lowercased
  // NOTE: This allows a TransactionRequest, but all values should be resolved
  //       before this is called
  // @TODO: This will likely be removed in future versions and prepareRequest
  //        will be the preferred method for this.


  static hexlifyTransaction(transaction, allowExtra) {
    // Check only allowed properties are given
    const allowed = (0, _properties.shallowCopy)(allowedTransactionKeys);

    if (allowExtra) {
      for (const key in allowExtra) {
        if (allowExtra[key]) {
          allowed[key] = true;
        }
      }
    }

    (0, _properties.checkProperties)(transaction, allowed);
    const result = {}; // Some nodes (INFURA ropsten; INFURA mainnet is fine) do not like leading zeros.

    ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function (key) {
      if (transaction[key] == null) {
        return;
      }

      const value = (0, _bytes.hexValue)(transaction[key]);

      if (key === "gasLimit") {
        key = "gas";
      }

      result[key] = value;
    });
    ["from", "to", "data"].forEach(function (key) {
      if (transaction[key] == null) {
        return;
      }

      result[key] = (0, _bytes.hexlify)(transaction[key]);
    });

    if (transaction.accessList) {
      result["accessList"] = (0, _transactions.accessListify)(transaction.accessList);
    }

    return result;
  }

}

exports.JsonRpcProvider = JsonRpcProvider;
},{"@ethersproject/abstract-signer":"l8eZ","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/hash":"eHxR","@ethersproject/properties":"JuuX","@ethersproject/strings":"ZW9k","@ethersproject/transactions":"OW34","@ethersproject/web":"egXK","@ethersproject/logger":"kMNH","./_version":"UhEn","./base-provider":"SPLd"}],"tyH4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocket = void 0;

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

let WS = null;
exports.WebSocket = WS;

try {
  exports.WebSocket = WS = WebSocket;

  if (WS == null) {
    throw new Error("inject please");
  }
} catch (error) {
  const logger = new _logger.Logger(_version.version);

  exports.WebSocket = WS = function () {
    logger.throwError("WebSockets not supported in this environment", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "new WebSocket()"
    });
  };
} //export default WS;
//module.exports = WS;
},{"@ethersproject/logger":"kMNH","./_version":"UhEn"}],"lCOP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketProvider = void 0;

var _bignumber = require("@ethersproject/bignumber");

var _properties = require("@ethersproject/properties");

var _jsonRpcProvider = require("./json-rpc-provider");

var _ws = require("./ws");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);
/**
 *  Notes:
 *
 *  This provider differs a bit from the polling providers. One main
 *  difference is how it handles consistency. The polling providers
 *  will stall responses to ensure a consistent state, while this
 *  WebSocket provider assumes the connected backend will manage this.
 *
 *  For example, if a polling provider emits an event which indicates
 *  the event occurred in blockhash XXX, a call to fetch that block by
 *  its hash XXX, if not present will retry until it is present. This
 *  can occur when querying a pool of nodes that are mildly out of sync
 *  with each other.
 */

let NextId = 1; // For more info about the Real-time Event API see:
//   https://geth.ethereum.org/docs/rpc/pubsub

class WebSocketProvider extends _jsonRpcProvider.JsonRpcProvider {
  constructor(url, network) {
    // This will be added in the future; please open an issue to expedite
    if (network === "any") {
      logger.throwError("WebSocketProvider does not support 'any' network yet", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "network:any"
      });
    }

    super(url, network);
    this._pollingInterval = -1;
    this._wsReady = false;
    (0, _properties.defineReadOnly)(this, "_websocket", new _ws.WebSocket(this.connection.url));
    (0, _properties.defineReadOnly)(this, "_requests", {});
    (0, _properties.defineReadOnly)(this, "_subs", {});
    (0, _properties.defineReadOnly)(this, "_subIds", {});
    (0, _properties.defineReadOnly)(this, "_detectNetwork", super.detectNetwork()); // Stall sending requests until the socket is open...

    this._websocket.onopen = () => {
      this._wsReady = true;
      Object.keys(this._requests).forEach(id => {
        this._websocket.send(this._requests[id].payload);
      });
    };

    this._websocket.onmessage = messageEvent => {
      const data = messageEvent.data;
      const result = JSON.parse(data);

      if (result.id != null) {
        const id = String(result.id);
        const request = this._requests[id];
        delete this._requests[id];

        if (result.result !== undefined) {
          request.callback(null, result.result);
          this.emit("debug", {
            action: "response",
            request: JSON.parse(request.payload),
            response: result.result,
            provider: this
          });
        } else {
          let error = null;

          if (result.error) {
            error = new Error(result.error.message || "unknown error");
            (0, _properties.defineReadOnly)(error, "code", result.error.code || null);
            (0, _properties.defineReadOnly)(error, "response", data);
          } else {
            error = new Error("unknown error");
          }

          request.callback(error, undefined);
          this.emit("debug", {
            action: "response",
            error: error,
            request: JSON.parse(request.payload),
            provider: this
          });
        }
      } else if (result.method === "eth_subscription") {
        // Subscription...
        const sub = this._subs[result.params.subscription];

        if (sub) {
          //this.emit.apply(this,                  );
          sub.processFunc(result.params.result);
        }
      } else {
        console.warn("this should not happen");
      }
    }; // This Provider does not actually poll, but we want to trigger
    // poll events for things that depend on them (like stalling for
    // block and transaction lookups)


    const fauxPoll = setInterval(() => {
      this.emit("poll");
    }, 1000);

    if (fauxPoll.unref) {
      fauxPoll.unref();
    }
  }

  detectNetwork() {
    return this._detectNetwork;
  }

  get pollingInterval() {
    return 0;
  }

  resetEventsBlock(blockNumber) {
    logger.throwError("cannot reset events block on WebSocketProvider", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "resetEventBlock"
    });
  }

  set pollingInterval(value) {
    logger.throwError("cannot set polling interval on WebSocketProvider", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "setPollingInterval"
    });
  }

  poll() {
    return __awaiter(this, void 0, void 0, function* () {
      return null;
    });
  }

  set polling(value) {
    if (!value) {
      return;
    }

    logger.throwError("cannot set polling on WebSocketProvider", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "setPolling"
    });
  }

  send(method, params) {
    const rid = NextId++;
    return new Promise((resolve, reject) => {
      function callback(error, result) {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }

      const payload = JSON.stringify({
        method: method,
        params: params,
        id: rid,
        jsonrpc: "2.0"
      });
      this.emit("debug", {
        action: "request",
        request: JSON.parse(payload),
        provider: this
      });
      this._requests[String(rid)] = {
        callback,
        payload
      };

      if (this._wsReady) {
        this._websocket.send(payload);
      }
    });
  }

  static defaultUrl() {
    return "ws:/\/localhost:8546";
  }

  _subscribe(tag, param, processFunc) {
    return __awaiter(this, void 0, void 0, function* () {
      let subIdPromise = this._subIds[tag];

      if (subIdPromise == null) {
        subIdPromise = Promise.all(param).then(param => {
          return this.send("eth_subscribe", param);
        });
        this._subIds[tag] = subIdPromise;
      }

      const subId = yield subIdPromise;
      this._subs[subId] = {
        tag,
        processFunc
      };
    });
  }

  _startEvent(event) {
    switch (event.type) {
      case "block":
        this._subscribe("block", ["newHeads"], result => {
          const blockNumber = _bignumber.BigNumber.from(result.number).toNumber();

          this._emitted.block = blockNumber;
          this.emit("block", blockNumber);
        });

        break;

      case "pending":
        this._subscribe("pending", ["newPendingTransactions"], result => {
          this.emit("pending", result);
        });

        break;

      case "filter":
        this._subscribe(event.tag, ["logs", this._getFilter(event.filter)], result => {
          if (result.removed == null) {
            result.removed = false;
          }

          this.emit(event.filter, this.formatter.filterLog(result));
        });

        break;

      case "tx":
        {
          const emitReceipt = event => {
            const hash = event.hash;
            this.getTransactionReceipt(hash).then(receipt => {
              if (!receipt) {
                return;
              }

              this.emit(hash, receipt);
            });
          }; // In case it is already mined


          emitReceipt(event); // To keep things simple, we start up a single newHeads subscription
          // to keep an eye out for transactions we are watching for.
          // Starting a subscription for an event (i.e. "tx") that is already
          // running is (basically) a nop.

          this._subscribe("tx", ["newHeads"], result => {
            this._events.filter(e => e.type === "tx").forEach(emitReceipt);
          });

          break;
        }
      // Nothing is needed

      case "debug":
      case "poll":
      case "willPoll":
      case "didPoll":
      case "error":
        break;

      default:
        console.log("unhandled:", event);
        break;
    }
  }

  _stopEvent(event) {
    let tag = event.tag;

    if (event.type === "tx") {
      // There are remaining transaction event listeners
      if (this._events.filter(e => e.type === "tx").length) {
        return;
      }

      tag = "tx";
    } else if (this.listenerCount(event.event)) {
      // There are remaining event listeners
      return;
    }

    const subId = this._subIds[tag];

    if (!subId) {
      return;
    }

    delete this._subIds[tag];
    subId.then(subId => {
      if (!this._subs[subId]) {
        return;
      }

      delete this._subs[subId];
      this.send("eth_unsubscribe", [subId]);
    });
  }

  destroy() {
    return __awaiter(this, void 0, void 0, function* () {
      // Wait until we have connected before trying to disconnect
      if (this._websocket.readyState === _ws.WebSocket.CONNECTING) {
        yield new Promise(resolve => {
          this._websocket.onopen = function () {
            resolve(true);
          };

          this._websocket.onerror = function () {
            resolve(false);
          };
        });
      } // Hangup
      // See: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes


      this._websocket.close(1000);
    });
  }

}

exports.WebSocketProvider = WebSocketProvider;
},{"@ethersproject/bignumber":"efJK","@ethersproject/properties":"JuuX","./json-rpc-provider":"HkBu","./ws":"tyH4","@ethersproject/logger":"kMNH","./_version":"UhEn"}],"JsTC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlJsonRpcProvider = exports.StaticJsonRpcProvider = void 0;

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _jsonRpcProvider = require("./json-rpc-provider");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

// A StaticJsonRpcProvider is useful when you *know* for certain that
// the backend will never change, as it never calls eth_chainId to
// verify its backend. However, if the backend does change, the effects
// are undefined and may include:
// - inconsistent results
// - locking up the UI
// - block skew warnings
// - wrong results
// If the network is not explicit (i.e. auto-detection is expected), the
// node MUST be running and available to respond to requests BEFORE this
// is instantiated.
class StaticJsonRpcProvider extends _jsonRpcProvider.JsonRpcProvider {
  detectNetwork() {
    const _super = Object.create(null, {
      detectNetwork: {
        get: () => super.detectNetwork
      }
    });

    return __awaiter(this, void 0, void 0, function* () {
      let network = this.network;

      if (network == null) {
        network = yield _super.detectNetwork.call(this);

        if (!network) {
          logger.throwError("no network detected", _logger.Logger.errors.UNKNOWN_ERROR, {});
        } // If still not set, set it


        if (this._network == null) {
          // A static network does not support "any"
          (0, _properties.defineReadOnly)(this, "_network", network);
          this.emit("network", network, null);
        }
      }

      return network;
    });
  }

}

exports.StaticJsonRpcProvider = StaticJsonRpcProvider;

class UrlJsonRpcProvider extends StaticJsonRpcProvider {
  constructor(network, apiKey) {
    logger.checkAbstract(new.target, UrlJsonRpcProvider); // Normalize the Network and API Key

    network = (0, _properties.getStatic)(new.target, "getNetwork")(network);
    apiKey = (0, _properties.getStatic)(new.target, "getApiKey")(apiKey);
    const connection = (0, _properties.getStatic)(new.target, "getUrl")(network, apiKey);
    super(connection, network);

    if (typeof apiKey === "string") {
      (0, _properties.defineReadOnly)(this, "apiKey", apiKey);
    } else if (apiKey != null) {
      Object.keys(apiKey).forEach(key => {
        (0, _properties.defineReadOnly)(this, key, apiKey[key]);
      });
    }
  }

  _startPending() {
    logger.warn("WARNING: API provider does not support pending filters");
  }

  isCommunityResource() {
    return false;
  }

  getSigner(address) {
    return logger.throwError("API provider does not support signing", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "getSigner"
    });
  }

  listAccounts() {
    return Promise.resolve([]);
  } // Return a defaultApiKey if null, otherwise validate the API key


  static getApiKey(apiKey) {
    return apiKey;
  } // Returns the url or connection for the given network and API key. The
  // API key will have been sanitized by the getApiKey first, so any validation
  // or transformations can be done there.


  static getUrl(network, apiKey) {
    return logger.throwError("not implemented; sub-classes must override getUrl", _logger.Logger.errors.NOT_IMPLEMENTED, {
      operation: "getUrl"
    });
  }

}

exports.UrlJsonRpcProvider = UrlJsonRpcProvider;
},{"@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"UhEn","./json-rpc-provider":"HkBu"}],"Lc7y":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlchemyWebSocketProvider = exports.AlchemyProvider = void 0;

var _properties = require("@ethersproject/properties");

var _formatter = require("./formatter");

var _websocketProvider = require("./websocket-provider");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _urlJsonRpcProvider = require("./url-json-rpc-provider");

const logger = new _logger.Logger(_version.version);
// This key was provided to ethers.js by Alchemy to be used by the
// default provider, but it is recommended that for your own
// production environments, that you acquire your own API key at:
//   https://dashboard.alchemyapi.io
const defaultApiKey = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";

class AlchemyWebSocketProvider extends _websocketProvider.WebSocketProvider {
  constructor(network, apiKey) {
    const provider = new AlchemyProvider(network, apiKey);
    const url = provider.connection.url.replace(/^http/i, "ws").replace(".alchemyapi.", ".ws.alchemyapi.");
    super(url, provider.network);
    (0, _properties.defineReadOnly)(this, "apiKey", provider.apiKey);
  }

  isCommunityResource() {
    return this.apiKey === defaultApiKey;
  }

}

exports.AlchemyWebSocketProvider = AlchemyWebSocketProvider;

class AlchemyProvider extends _urlJsonRpcProvider.UrlJsonRpcProvider {
  static getWebSocketProvider(network, apiKey) {
    return new AlchemyWebSocketProvider(network, apiKey);
  }

  static getApiKey(apiKey) {
    if (apiKey == null) {
      return defaultApiKey;
    }

    if (apiKey && typeof apiKey !== "string") {
      logger.throwArgumentError("invalid apiKey", "apiKey", apiKey);
    }

    return apiKey;
  }

  static getUrl(network, apiKey) {
    let host = null;

    switch (network.name) {
      case "homestead":
        host = "eth-mainnet.alchemyapi.io/v2/";
        break;

      case "ropsten":
        host = "eth-ropsten.alchemyapi.io/v2/";
        break;

      case "rinkeby":
        host = "eth-rinkeby.alchemyapi.io/v2/";
        break;

      case "goerli":
        host = "eth-goerli.alchemyapi.io/v2/";
        break;

      case "kovan":
        host = "eth-kovan.alchemyapi.io/v2/";
        break;

      case "matic":
        host = "polygon-mainnet.g.alchemy.com/v2/";
        break;

      case "maticmum":
        host = "polygon-mumbai.g.alchemy.com/v2/";
        break;

      default:
        logger.throwArgumentError("unsupported network", "network", arguments[0]);
    }

    return {
      allowGzip: true,
      url: "https:/" + "/" + host + apiKey,
      throttleCallback: (attempt, url) => {
        if (apiKey === defaultApiKey) {
          (0, _formatter.showThrottleMessage)();
        }

        return Promise.resolve(true);
      }
    };
  }

  isCommunityResource() {
    return this.apiKey === defaultApiKey;
  }

}

exports.AlchemyProvider = AlchemyProvider;
},{"@ethersproject/properties":"JuuX","./formatter":"nnuj","./websocket-provider":"lCOP","@ethersproject/logger":"kMNH","./_version":"UhEn","./url-json-rpc-provider":"JsTC"}],"VQyX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudflareProvider = void 0;

var _urlJsonRpcProvider = require("./url-json-rpc-provider");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

class CloudflareProvider extends _urlJsonRpcProvider.UrlJsonRpcProvider {
  static getApiKey(apiKey) {
    if (apiKey != null) {
      logger.throwArgumentError("apiKey not supported for cloudflare", "apiKey", apiKey);
    }

    return null;
  }

  static getUrl(network, apiKey) {
    let host = null;

    switch (network.name) {
      case "homestead":
        host = "https://cloudflare-eth.com/";
        break;

      default:
        logger.throwArgumentError("unsupported network", "network", arguments[0]);
    }

    return host;
  }

  perform(method, params) {
    const _super = Object.create(null, {
      perform: {
        get: () => super.perform
      }
    });

    return __awaiter(this, void 0, void 0, function* () {
      // The Cloudflare provider does not support eth_blockNumber,
      // so we get the latest block and pull it from that
      if (method === "getBlockNumber") {
        const block = yield _super.perform.call(this, "getBlock", {
          blockTag: "latest"
        });
        return block.number;
      }

      return _super.perform.call(this, method, params);
    });
  }

}

exports.CloudflareProvider = CloudflareProvider;
},{"./url-json-rpc-provider":"JsTC","@ethersproject/logger":"kMNH","./_version":"UhEn"}],"U5hR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherscanProvider = void 0;

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _transactions = require("@ethersproject/transactions");

var _web = require("@ethersproject/web");

var _formatter = require("./formatter");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _baseProvider = require("./base-provider");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

// The transaction has already been sanitized by the calls in Provider
function getTransactionPostData(transaction) {
  const result = {};

  for (let key in transaction) {
    if (transaction[key] == null) {
      continue;
    }

    let value = transaction[key];

    if (key === "type" && value === 0) {
      continue;
    } // Quantity-types require no leading zero, unless 0


    if ({
      type: true,
      gasLimit: true,
      gasPrice: true,
      maxFeePerGs: true,
      maxPriorityFeePerGas: true,
      nonce: true,
      value: true
    }[key]) {
      value = (0, _bytes.hexValue)((0, _bytes.hexlify)(value));
    } else if (key === "accessList") {
      value = "[" + (0, _transactions.accessListify)(value).map(set => {
        return `{address:"${set.address}",storageKeys:["${set.storageKeys.join('","')}"]}`;
      }).join(",") + "]";
    } else {
      value = (0, _bytes.hexlify)(value);
    }

    result[key] = value;
  }

  return result;
}

function getResult(result) {
  // getLogs, getHistory have weird success responses
  if (result.status == 0 && (result.message === "No records found" || result.message === "No transactions found")) {
    return result.result;
  }

  if (result.status != 1 || result.message != "OK") {
    const error = new Error("invalid response");
    error.result = JSON.stringify(result);

    if ((result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
      error.throttleRetry = true;
    }

    throw error;
  }

  return result.result;
}

function getJsonResult(result) {
  // This response indicates we are being throttled
  if (result && result.status == 0 && result.message == "NOTOK" && (result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
    const error = new Error("throttled response");
    error.result = JSON.stringify(result);
    error.throttleRetry = true;
    throw error;
  }

  if (result.jsonrpc != "2.0") {
    // @TODO: not any
    const error = new Error("invalid response");
    error.result = JSON.stringify(result);
    throw error;
  }

  if (result.error) {
    // @TODO: not any
    const error = new Error(result.error.message || "unknown error");

    if (result.error.code) {
      error.code = result.error.code;
    }

    if (result.error.data) {
      error.data = result.error.data;
    }

    throw error;
  }

  return result.result;
} // The blockTag was normalized as a string by the Provider pre-perform operations


function checkLogTag(blockTag) {
  if (blockTag === "pending") {
    throw new Error("pending not supported");
  }

  if (blockTag === "latest") {
    return blockTag;
  }

  return parseInt(blockTag.substring(2), 16);
}

const defaultApiKey = "9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";

function checkError(method, error, transaction) {
  // Undo the "convenience" some nodes are attempting to prevent backwards
  // incompatibility; maybe for v6 consider forwarding reverts as errors
  if (method === "call" && error.code === _logger.Logger.errors.SERVER_ERROR) {
    const e = error.error; // Etherscan keeps changing their string

    if (e && (e.message.match(/reverted/i) || e.message.match(/VM execution error/i))) {
      // Etherscan prefixes the data like "Reverted 0x1234"
      let data = e.data;

      if (data) {
        data = "0x" + data.replace(/^.*0x/i, "");
      }

      if ((0, _bytes.isHexString)(data)) {
        return data;
      }

      logger.throwError("missing revert data in call exception", _logger.Logger.errors.CALL_EXCEPTION, {
        error,
        data: "0x"
      });
    }
  } // Get the message from any nested error structure


  let message = error.message;

  if (error.code === _logger.Logger.errors.SERVER_ERROR) {
    if (error.error && typeof error.error.message === "string") {
      message = error.error.message;
    } else if (typeof error.body === "string") {
      message = error.body;
    } else if (typeof error.responseText === "string") {
      message = error.responseText;
    }
  }

  message = (message || "").toLowerCase(); // "Insufficient funds. The account you tried to send transaction from does not have enough funds. Required 21464000000000 and got: 0"

  if (message.match(/insufficient funds/)) {
    logger.throwError("insufficient funds for intrinsic transaction cost", _logger.Logger.errors.INSUFFICIENT_FUNDS, {
      error,
      method,
      transaction
    });
  } // "Transaction with the same hash was already imported."


  if (message.match(/same hash was already imported|transaction nonce is too low|nonce too low/)) {
    logger.throwError("nonce has already been used", _logger.Logger.errors.NONCE_EXPIRED, {
      error,
      method,
      transaction
    });
  } // "Transaction gas price is too low. There is another transaction with same nonce in the queue. Try increasing the gas price or incrementing the nonce."


  if (message.match(/another transaction with same nonce/)) {
    logger.throwError("replacement fee too low", _logger.Logger.errors.REPLACEMENT_UNDERPRICED, {
      error,
      method,
      transaction
    });
  }

  if (message.match(/execution failed due to an exception|execution reverted/)) {
    logger.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", _logger.Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error,
      method,
      transaction
    });
  }

  throw error;
}

class EtherscanProvider extends _baseProvider.BaseProvider {
  constructor(network, apiKey) {
    logger.checkNew(new.target, EtherscanProvider);
    super(network);
    (0, _properties.defineReadOnly)(this, "baseUrl", this.getBaseUrl());
    (0, _properties.defineReadOnly)(this, "apiKey", apiKey || defaultApiKey);
  }

  getBaseUrl() {
    switch (this.network ? this.network.name : "invalid") {
      case "homestead":
        return "https:/\/api.etherscan.io";

      case "ropsten":
        return "https:/\/api-ropsten.etherscan.io";

      case "rinkeby":
        return "https:/\/api-rinkeby.etherscan.io";

      case "kovan":
        return "https:/\/api-kovan.etherscan.io";

      case "goerli":
        return "https:/\/api-goerli.etherscan.io";

      default:
    }

    return logger.throwArgumentError("unsupported network", "network", name);
  }

  getUrl(module, params) {
    const query = Object.keys(params).reduce((accum, key) => {
      const value = params[key];

      if (value != null) {
        accum += `&${key}=${value}`;
      }

      return accum;
    }, "");
    const apiKey = this.apiKey ? `&apikey=${this.apiKey}` : "";
    return `${this.baseUrl}/api?module=${module}${query}${apiKey}`;
  }

  getPostUrl() {
    return `${this.baseUrl}/api`;
  }

  getPostData(module, params) {
    params.module = module;
    params.apikey = this.apiKey;
    return params;
  }

  fetch(module, params, post) {
    return __awaiter(this, void 0, void 0, function* () {
      const url = post ? this.getPostUrl() : this.getUrl(module, params);
      const payload = post ? this.getPostData(module, params) : null;
      const procFunc = module === "proxy" ? getJsonResult : getResult;
      this.emit("debug", {
        action: "request",
        request: url,
        provider: this
      });
      const connection = {
        url: url,
        throttleSlotInterval: 1000,
        throttleCallback: (attempt, url) => {
          if (this.isCommunityResource()) {
            (0, _formatter.showThrottleMessage)();
          }

          return Promise.resolve(true);
        }
      };
      let payloadStr = null;

      if (payload) {
        connection.headers = {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        };
        payloadStr = Object.keys(payload).map(key => {
          return `${key}=${payload[key]}`;
        }).join("&");
      }

      const result = yield (0, _web.fetchJson)(connection, payloadStr, procFunc || getJsonResult);
      this.emit("debug", {
        action: "response",
        request: url,
        response: (0, _properties.deepCopy)(result),
        provider: this
      });
      return result;
    });
  }

  detectNetwork() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.network;
    });
  }

  perform(method, params) {
    const _super = Object.create(null, {
      perform: {
        get: () => super.perform
      }
    });

    return __awaiter(this, void 0, void 0, function* () {
      switch (method) {
        case "getBlockNumber":
          return this.fetch("proxy", {
            action: "eth_blockNumber"
          });

        case "getGasPrice":
          return this.fetch("proxy", {
            action: "eth_gasPrice"
          });

        case "getBalance":
          // Returns base-10 result
          return this.fetch("account", {
            action: "balance",
            address: params.address,
            tag: params.blockTag
          });

        case "getTransactionCount":
          return this.fetch("proxy", {
            action: "eth_getTransactionCount",
            address: params.address,
            tag: params.blockTag
          });

        case "getCode":
          return this.fetch("proxy", {
            action: "eth_getCode",
            address: params.address,
            tag: params.blockTag
          });

        case "getStorageAt":
          return this.fetch("proxy", {
            action: "eth_getStorageAt",
            address: params.address,
            position: params.position,
            tag: params.blockTag
          });

        case "sendTransaction":
          return this.fetch("proxy", {
            action: "eth_sendRawTransaction",
            hex: params.signedTransaction
          }, true).catch(error => {
            return checkError("sendTransaction", error, params.signedTransaction);
          });

        case "getBlock":
          if (params.blockTag) {
            return this.fetch("proxy", {
              action: "eth_getBlockByNumber",
              tag: params.blockTag,
              boolean: params.includeTransactions ? "true" : "false"
            });
          }

          throw new Error("getBlock by blockHash not implemented");

        case "getTransaction":
          return this.fetch("proxy", {
            action: "eth_getTransactionByHash",
            txhash: params.transactionHash
          });

        case "getTransactionReceipt":
          return this.fetch("proxy", {
            action: "eth_getTransactionReceipt",
            txhash: params.transactionHash
          });

        case "call":
          {
            if (params.blockTag !== "latest") {
              throw new Error("EtherscanProvider does not support blockTag for call");
            }

            const postData = getTransactionPostData(params.transaction);
            postData.module = "proxy";
            postData.action = "eth_call";

            try {
              return yield this.fetch("proxy", postData, true);
            } catch (error) {
              return checkError("call", error, params.transaction);
            }
          }

        case "estimateGas":
          {
            const postData = getTransactionPostData(params.transaction);
            postData.module = "proxy";
            postData.action = "eth_estimateGas";

            try {
              return yield this.fetch("proxy", postData, true);
            } catch (error) {
              return checkError("estimateGas", error, params.transaction);
            }
          }

        case "getLogs":
          {
            const args = {
              action: "getLogs"
            };

            if (params.filter.fromBlock) {
              args.fromBlock = checkLogTag(params.filter.fromBlock);
            }

            if (params.filter.toBlock) {
              args.toBlock = checkLogTag(params.filter.toBlock);
            }

            if (params.filter.address) {
              args.address = params.filter.address;
            } // @TODO: We can handle slightly more complicated logs using the logs API


            if (params.filter.topics && params.filter.topics.length > 0) {
              if (params.filter.topics.length > 1) {
                logger.throwError("unsupported topic count", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
                  topics: params.filter.topics
                });
              }

              if (params.filter.topics.length === 1) {
                const topic0 = params.filter.topics[0];

                if (typeof topic0 !== "string" || topic0.length !== 66) {
                  logger.throwError("unsupported topic format", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
                    topic0: topic0
                  });
                }

                args.topic0 = topic0;
              }
            }

            const logs = yield this.fetch("logs", args); // Cache txHash => blockHash

            let blocks = {}; // Add any missing blockHash to the logs

            for (let i = 0; i < logs.length; i++) {
              const log = logs[i];

              if (log.blockHash != null) {
                continue;
              }

              if (blocks[log.blockNumber] == null) {
                const block = yield this.getBlock(log.blockNumber);

                if (block) {
                  blocks[log.blockNumber] = block.hash;
                }
              }

              log.blockHash = blocks[log.blockNumber];
            }

            return logs;
          }

        case "getEtherPrice":
          if (this.network.name !== "homestead") {
            return 0.0;
          }

          return parseFloat((yield this.fetch("stats", {
            action: "ethprice"
          })).ethusd);

        default:
          break;
      }

      return _super.perform.call(this, method, params);
    });
  } // Note: The `page` page parameter only allows pagination within the
  //       10,000 window available without a page and offset parameter
  //       Error: Result window is too large, PageNo x Offset size must
  //              be less than or equal to 10000


  getHistory(addressOrName, startBlock, endBlock) {
    return __awaiter(this, void 0, void 0, function* () {
      const params = {
        action: "txlist",
        address: yield this.resolveName(addressOrName),
        startblock: startBlock == null ? 0 : startBlock,
        endblock: endBlock == null ? 99999999 : endBlock,
        sort: "asc"
      };
      const result = yield this.fetch("account", params);
      return result.map(tx => {
        ["contractAddress", "to"].forEach(function (key) {
          if (tx[key] == "") {
            delete tx[key];
          }
        });

        if (tx.creates == null && tx.contractAddress != null) {
          tx.creates = tx.contractAddress;
        }

        const item = this.formatter.transactionResponse(tx);

        if (tx.timeStamp) {
          item.timestamp = parseInt(tx.timeStamp);
        }

        return item;
      });
    });
  }

  isCommunityResource() {
    return this.apiKey === defaultApiKey;
  }

}

exports.EtherscanProvider = EtherscanProvider;
},{"@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/transactions":"OW34","@ethersproject/web":"egXK","./formatter":"nnuj","@ethersproject/logger":"kMNH","./_version":"UhEn","./base-provider":"SPLd"}],"JHW6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallbackProvider = void 0;

var _abstractProvider = require("@ethersproject/abstract-provider");

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _properties = require("@ethersproject/properties");

var _random = require("@ethersproject/random");

var _web = require("@ethersproject/web");

var _baseProvider = require("./base-provider");

var _formatter = require("./formatter");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const logger = new _logger.Logger(_version.version);

function now() {
  return new Date().getTime();
} // Returns to network as long as all agree, or null if any is null.
// Throws an error if any two networks do not match.


function checkNetworks(networks) {
  let result = null;

  for (let i = 0; i < networks.length; i++) {
    const network = networks[i]; // Null! We do not know our network; bail.

    if (network == null) {
      return null;
    }

    if (result) {
      // Make sure the network matches the previous networks
      if (!(result.name === network.name && result.chainId === network.chainId && (result.ensAddress === network.ensAddress || result.ensAddress == null && network.ensAddress == null))) {
        logger.throwArgumentError("provider mismatch", "networks", networks);
      }
    } else {
      result = network;
    }
  }

  return result;
}

function median(values, maxDelta) {
  values = values.slice().sort();
  const middle = Math.floor(values.length / 2); // Odd length; take the middle

  if (values.length % 2) {
    return values[middle];
  } // Even length; take the average of the two middle


  const a = values[middle - 1],
        b = values[middle];

  if (maxDelta != null && Math.abs(a - b) > maxDelta) {
    return null;
  }

  return (a + b) / 2;
}

function serialize(value) {
  if (value === null) {
    return "null";
  } else if (typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  } else if (typeof value === "string") {
    return value;
  } else if (_bignumber.BigNumber.isBigNumber(value)) {
    return value.toString();
  } else if (Array.isArray(value)) {
    return JSON.stringify(value.map(i => serialize(i)));
  } else if (typeof value === "object") {
    const keys = Object.keys(value);
    keys.sort();
    return "{" + keys.map(key => {
      let v = value[key];

      if (typeof v === "function") {
        v = "[function]";
      } else {
        v = serialize(v);
      }

      return JSON.stringify(key) + ":" + v;
    }).join(",") + "}";
  }

  throw new Error("unknown value type: " + typeof value);
} // Next request ID to use for emitting debug info


let nextRid = 1;
;

function stall(duration) {
  let cancel = null;
  let timer = null;
  let promise = new Promise(resolve => {
    cancel = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      resolve();
    };

    timer = setTimeout(cancel, duration);
  });

  const wait = func => {
    promise = promise.then(func);
    return promise;
  };

  function getPromise() {
    return promise;
  }

  return {
    cancel,
    getPromise,
    wait
  };
}

const ForwardErrors = [_logger.Logger.errors.CALL_EXCEPTION, _logger.Logger.errors.INSUFFICIENT_FUNDS, _logger.Logger.errors.NONCE_EXPIRED, _logger.Logger.errors.REPLACEMENT_UNDERPRICED, _logger.Logger.errors.UNPREDICTABLE_GAS_LIMIT];
const ForwardProperties = ["address", "args", "errorArgs", "errorSignature", "method", "transaction"];
;

function exposeDebugConfig(config, now) {
  const result = {
    weight: config.weight
  };
  Object.defineProperty(result, "provider", {
    get: () => config.provider
  });

  if (config.start) {
    result.start = config.start;
  }

  if (now) {
    result.duration = now - config.start;
  }

  if (config.done) {
    if (config.error) {
      result.error = config.error;
    } else {
      result.result = config.result || null;
    }
  }

  return result;
}

function normalizedTally(normalize, quorum) {
  return function (configs) {
    // Count the votes for each result
    const tally = {};
    configs.forEach(c => {
      const value = normalize(c.result);

      if (!tally[value]) {
        tally[value] = {
          count: 0,
          result: c.result
        };
      }

      tally[value].count++;
    }); // Check for a quorum on any given result

    const keys = Object.keys(tally);

    for (let i = 0; i < keys.length; i++) {
      const check = tally[keys[i]];

      if (check.count >= quorum) {
        return check.result;
      }
    } // No quroum


    return undefined;
  };
}

function getProcessFunc(provider, method, params) {
  let normalize = serialize;

  switch (method) {
    case "getBlockNumber":
      // Return the median value, unless there is (median + 1) is also
      // present, in which case that is probably true and the median
      // is going to be stale soon. In the event of a malicious node,
      // the lie will be true soon enough.
      return function (configs) {
        const values = configs.map(c => c.result); // Get the median block number

        let blockNumber = median(configs.map(c => c.result), 2);

        if (blockNumber == null) {
          return undefined;
        }

        blockNumber = Math.ceil(blockNumber); // If the next block height is present, its prolly safe to use

        if (values.indexOf(blockNumber + 1) >= 0) {
          blockNumber++;
        } // Don't ever roll back the blockNumber


        if (blockNumber >= provider._highestBlockNumber) {
          provider._highestBlockNumber = blockNumber;
        }

        return provider._highestBlockNumber;
      };

    case "getGasPrice":
      // Return the middle (round index up) value, similar to median
      // but do not average even entries and choose the higher.
      // Malicious actors must compromise 50% of the nodes to lie.
      return function (configs) {
        const values = configs.map(c => c.result);
        values.sort();
        return values[Math.floor(values.length / 2)];
      };

    case "getEtherPrice":
      // Returns the median price. Malicious actors must compromise at
      // least 50% of the nodes to lie (in a meaningful way).
      return function (configs) {
        return median(configs.map(c => c.result));
      };
    // No additional normalizing required; serialize is enough

    case "getBalance":
    case "getTransactionCount":
    case "getCode":
    case "getStorageAt":
    case "call":
    case "estimateGas":
    case "getLogs":
      break;
    // We drop the confirmations from transactions as it is approximate

    case "getTransaction":
    case "getTransactionReceipt":
      normalize = function (tx) {
        if (tx == null) {
          return null;
        }

        tx = (0, _properties.shallowCopy)(tx);
        tx.confirmations = -1;
        return serialize(tx);
      };

      break;
    // We drop the confirmations from transactions as it is approximate

    case "getBlock":
      // We drop the confirmations from transactions as it is approximate
      if (params.includeTransactions) {
        normalize = function (block) {
          if (block == null) {
            return null;
          }

          block = (0, _properties.shallowCopy)(block);
          block.transactions = block.transactions.map(tx => {
            tx = (0, _properties.shallowCopy)(tx);
            tx.confirmations = -1;
            return tx;
          });
          return serialize(block);
        };
      } else {
        normalize = function (block) {
          if (block == null) {
            return null;
          }

          return serialize(block);
        };
      }

      break;

    default:
      throw new Error("unknown method: " + method);
  } // Return the result if and only if the expected quorum is
  // satisfied and agreed upon for the final result.


  return normalizedTally(normalize, provider.quorum);
} // If we are doing a blockTag query, we need to make sure the backend is
// caught up to the FallbackProvider, before sending a request to it.


function waitForSync(config, blockNumber) {
  return __awaiter(this, void 0, void 0, function* () {
    const provider = config.provider;

    if (provider.blockNumber != null && provider.blockNumber >= blockNumber || blockNumber === -1) {
      return provider;
    }

    return (0, _web.poll)(() => {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          // We are synced
          if (provider.blockNumber >= blockNumber) {
            return resolve(provider);
          } // We're done; just quit


          if (config.cancelled) {
            return resolve(null);
          } // Try again, next block


          return resolve(undefined);
        }, 0);
      });
    }, {
      oncePoll: provider
    });
  });
}

function getRunner(config, currentBlockNumber, method, params) {
  return __awaiter(this, void 0, void 0, function* () {
    let provider = config.provider;

    switch (method) {
      case "getBlockNumber":
      case "getGasPrice":
        return provider[method]();

      case "getEtherPrice":
        if (provider.getEtherPrice) {
          return provider.getEtherPrice();
        }

        break;

      case "getBalance":
      case "getTransactionCount":
      case "getCode":
        if (params.blockTag && (0, _bytes.isHexString)(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }

        return provider[method](params.address, params.blockTag || "latest");

      case "getStorageAt":
        if (params.blockTag && (0, _bytes.isHexString)(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }

        return provider.getStorageAt(params.address, params.position, params.blockTag || "latest");

      case "getBlock":
        if (params.blockTag && (0, _bytes.isHexString)(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }

        return provider[params.includeTransactions ? "getBlockWithTransactions" : "getBlock"](params.blockTag || params.blockHash);

      case "call":
      case "estimateGas":
        if (params.blockTag && (0, _bytes.isHexString)(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }

        return provider[method](params.transaction);

      case "getTransaction":
      case "getTransactionReceipt":
        return provider[method](params.transactionHash);

      case "getLogs":
        {
          let filter = params.filter;

          if (filter.fromBlock && (0, _bytes.isHexString)(filter.fromBlock) || filter.toBlock && (0, _bytes.isHexString)(filter.toBlock)) {
            provider = yield waitForSync(config, currentBlockNumber);
          }

          return provider.getLogs(filter);
        }
    }

    return logger.throwError("unknown method error", _logger.Logger.errors.UNKNOWN_ERROR, {
      method: method,
      params: params
    });
  });
}

class FallbackProvider extends _baseProvider.BaseProvider {
  constructor(providers, quorum) {
    logger.checkNew(new.target, FallbackProvider);

    if (providers.length === 0) {
      logger.throwArgumentError("missing providers", "providers", providers);
    }

    const providerConfigs = providers.map((configOrProvider, index) => {
      if (_abstractProvider.Provider.isProvider(configOrProvider)) {
        const stallTimeout = (0, _formatter.isCommunityResource)(configOrProvider) ? 2000 : 750;
        const priority = 1;
        return Object.freeze({
          provider: configOrProvider,
          weight: 1,
          stallTimeout,
          priority
        });
      }

      const config = (0, _properties.shallowCopy)(configOrProvider);

      if (config.priority == null) {
        config.priority = 1;
      }

      if (config.stallTimeout == null) {
        config.stallTimeout = (0, _formatter.isCommunityResource)(configOrProvider) ? 2000 : 750;
      }

      if (config.weight == null) {
        config.weight = 1;
      }

      const weight = config.weight;

      if (weight % 1 || weight > 512 || weight < 1) {
        logger.throwArgumentError("invalid weight; must be integer in [1, 512]", `providers[${index}].weight`, weight);
      }

      return Object.freeze(config);
    });
    const total = providerConfigs.reduce((accum, c) => accum + c.weight, 0);

    if (quorum == null) {
      quorum = total / 2;
    } else if (quorum > total) {
      logger.throwArgumentError("quorum will always fail; larger than total weight", "quorum", quorum);
    } // Are all providers' networks are known


    let networkOrReady = checkNetworks(providerConfigs.map(c => c.provider.network)); // Not all networks are known; we must stall

    if (networkOrReady == null) {
      networkOrReady = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.detectNetwork().then(resolve, reject);
        }, 0);
      });
    }

    super(networkOrReady); // Preserve a copy, so we do not get mutated

    (0, _properties.defineReadOnly)(this, "providerConfigs", Object.freeze(providerConfigs));
    (0, _properties.defineReadOnly)(this, "quorum", quorum);
    this._highestBlockNumber = -1;
  }

  detectNetwork() {
    return __awaiter(this, void 0, void 0, function* () {
      const networks = yield Promise.all(this.providerConfigs.map(c => c.provider.getNetwork()));
      return checkNetworks(networks);
    });
  }

  perform(method, params) {
    return __awaiter(this, void 0, void 0, function* () {
      // Sending transactions is special; always broadcast it to all backends
      if (method === "sendTransaction") {
        const results = yield Promise.all(this.providerConfigs.map(c => {
          return c.provider.sendTransaction(params.signedTransaction).then(result => {
            return result.hash;
          }, error => {
            return error;
          });
        })); // Any success is good enough (other errors are likely "already seen" errors

        for (let i = 0; i < results.length; i++) {
          const result = results[i];

          if (typeof result === "string") {
            return result;
          }
        } // They were all an error; pick the first error


        throw results[0];
      } // We need to make sure we are in sync with our backends, so we need
      // to know this before we can make a lot of calls


      if (this._highestBlockNumber === -1 && method !== "getBlockNumber") {
        yield this.getBlockNumber();
      }

      const processFunc = getProcessFunc(this, method, params); // Shuffle the providers and then sort them by their priority; we
      // shallowCopy them since we will store the result in them too

      const configs = (0, _random.shuffled)(this.providerConfigs.map(_properties.shallowCopy));
      configs.sort((a, b) => a.priority - b.priority);
      const currentBlockNumber = this._highestBlockNumber;
      let i = 0;
      let first = true;

      while (true) {
        const t0 = now(); // Compute the inflight weight (exclude anything past)

        let inflightWeight = configs.filter(c => c.runner && t0 - c.start < c.stallTimeout).reduce((accum, c) => accum + c.weight, 0); // Start running enough to meet quorum

        while (inflightWeight < this.quorum && i < configs.length) {
          const config = configs[i++];
          const rid = nextRid++;
          config.start = now();
          config.staller = stall(config.stallTimeout);
          config.staller.wait(() => {
            config.staller = null;
          });
          config.runner = getRunner(config, currentBlockNumber, method, params).then(result => {
            config.done = true;
            config.result = result;

            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid: rid,
                backend: exposeDebugConfig(config, now()),
                request: {
                  method: method,
                  params: (0, _properties.deepCopy)(params)
                },
                provider: this
              });
            }
          }, error => {
            config.done = true;
            config.error = error;

            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid: rid,
                backend: exposeDebugConfig(config, now()),
                request: {
                  method: method,
                  params: (0, _properties.deepCopy)(params)
                },
                provider: this
              });
            }
          });

          if (this.listenerCount("debug")) {
            this.emit("debug", {
              action: "request",
              rid: rid,
              backend: exposeDebugConfig(config, null),
              request: {
                method: method,
                params: (0, _properties.deepCopy)(params)
              },
              provider: this
            });
          }

          inflightWeight += config.weight;
        } // Wait for anything meaningful to finish or stall out


        const waiting = [];
        configs.forEach(c => {
          if (c.done || !c.runner) {
            return;
          }

          waiting.push(c.runner);

          if (c.staller) {
            waiting.push(c.staller.getPromise());
          }
        });

        if (waiting.length) {
          yield Promise.race(waiting);
        } // Check the quorum and process the results; the process function
        // may additionally decide the quorum is not met


        const results = configs.filter(c => c.done && c.error == null);

        if (results.length >= this.quorum) {
          const result = processFunc(results);

          if (result !== undefined) {
            // Shut down any stallers
            configs.forEach(c => {
              if (c.staller) {
                c.staller.cancel();
              }

              c.cancelled = true;
            });
            return result;
          }

          if (!first) {
            yield stall(100).getPromise();
          }

          first = false;
        } // No result, check for errors that should be forwarded


        const errors = configs.reduce((accum, c) => {
          if (!c.done || c.error == null) {
            return accum;
          }

          const code = c.error.code;

          if (ForwardErrors.indexOf(code) >= 0) {
            if (!accum[code]) {
              accum[code] = {
                error: c.error,
                weight: 0
              };
            }

            accum[code].weight += c.weight;
          }

          return accum;
        }, {});
        Object.keys(errors).forEach(errorCode => {
          const tally = errors[errorCode];

          if (tally.weight < this.quorum) {
            return;
          } // Shut down any stallers


          configs.forEach(c => {
            if (c.staller) {
              c.staller.cancel();
            }

            c.cancelled = true;
          });
          const e = tally.error;
          const props = {};
          ForwardProperties.forEach(name => {
            if (e[name] == null) {
              return;
            }

            props[name] = e[name];
          });
          logger.throwError(e.reason || e.message, errorCode, props);
        }); // All configs have run to completion; we will never get more data

        if (configs.filter(c => !c.done).length === 0) {
          break;
        }
      } // Shut down any stallers; shouldn't be any


      configs.forEach(c => {
        if (c.staller) {
          c.staller.cancel();
        }

        c.cancelled = true;
      });
      return logger.throwError("failed to meet quorum", _logger.Logger.errors.SERVER_ERROR, {
        method: method,
        params: params,
        //results: configs.map((c) => c.result),
        //errors: configs.map((c) => c.error),
        results: configs.map(c => exposeDebugConfig(c)),
        provider: this
      });
    });
  }

}

exports.FallbackProvider = FallbackProvider;
},{"@ethersproject/abstract-provider":"GKyj","@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/properties":"JuuX","@ethersproject/random":"LoH0","@ethersproject/web":"egXK","./base-provider":"SPLd","./formatter":"nnuj","@ethersproject/logger":"kMNH","./_version":"UhEn"}],"VRXh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IpcProvider = void 0;
const IpcProvider = null;
exports.IpcProvider = IpcProvider;
},{}],"CNMZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfuraWebSocketProvider = exports.InfuraProvider = void 0;

var _properties = require("@ethersproject/properties");

var _websocketProvider = require("./websocket-provider");

var _formatter = require("./formatter");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _urlJsonRpcProvider = require("./url-json-rpc-provider");

const logger = new _logger.Logger(_version.version);
const defaultProjectId = "84842078b09946638c03157f83405213";

class InfuraWebSocketProvider extends _websocketProvider.WebSocketProvider {
  constructor(network, apiKey) {
    const provider = new InfuraProvider(network, apiKey);
    const connection = provider.connection;

    if (connection.password) {
      logger.throwError("INFURA WebSocket project secrets unsupported", _logger.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "InfuraProvider.getWebSocketProvider()"
      });
    }

    const url = connection.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
    super(url, network);
    (0, _properties.defineReadOnly)(this, "apiKey", provider.projectId);
    (0, _properties.defineReadOnly)(this, "projectId", provider.projectId);
    (0, _properties.defineReadOnly)(this, "projectSecret", provider.projectSecret);
  }

  isCommunityResource() {
    return this.projectId === defaultProjectId;
  }

}

exports.InfuraWebSocketProvider = InfuraWebSocketProvider;

class InfuraProvider extends _urlJsonRpcProvider.UrlJsonRpcProvider {
  static getWebSocketProvider(network, apiKey) {
    return new InfuraWebSocketProvider(network, apiKey);
  }

  static getApiKey(apiKey) {
    const apiKeyObj = {
      apiKey: defaultProjectId,
      projectId: defaultProjectId,
      projectSecret: null
    };

    if (apiKey == null) {
      return apiKeyObj;
    }

    if (typeof apiKey === "string") {
      apiKeyObj.projectId = apiKey;
    } else if (apiKey.projectSecret != null) {
      logger.assertArgument(typeof apiKey.projectId === "string", "projectSecret requires a projectId", "projectId", apiKey.projectId);
      logger.assertArgument(typeof apiKey.projectSecret === "string", "invalid projectSecret", "projectSecret", "[REDACTED]");
      apiKeyObj.projectId = apiKey.projectId;
      apiKeyObj.projectSecret = apiKey.projectSecret;
    } else if (apiKey.projectId) {
      apiKeyObj.projectId = apiKey.projectId;
    }

    apiKeyObj.apiKey = apiKeyObj.projectId;
    return apiKeyObj;
  }

  static getUrl(network, apiKey) {
    let host = null;

    switch (network ? network.name : "unknown") {
      case "homestead":
        host = "mainnet.infura.io";
        break;

      case "ropsten":
        host = "ropsten.infura.io";
        break;

      case "rinkeby":
        host = "rinkeby.infura.io";
        break;

      case "kovan":
        host = "kovan.infura.io";
        break;

      case "goerli":
        host = "goerli.infura.io";
        break;

      case "matic":
        host = "polygon-mainnet.infura.io";
        break;

      case "maticmum":
        host = "polygon-mumbai.infura.io";
        break;

      default:
        logger.throwError("unsupported network", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
    }

    const connection = {
      allowGzip: true,
      url: "https:/" + "/" + host + "/v3/" + apiKey.projectId,
      throttleCallback: (attempt, url) => {
        if (apiKey.projectId === defaultProjectId) {
          (0, _formatter.showThrottleMessage)();
        }

        return Promise.resolve(true);
      }
    };

    if (apiKey.projectSecret != null) {
      connection.user = "";
      connection.password = apiKey.projectSecret;
    }

    return connection;
  }

  isCommunityResource() {
    return this.projectId === defaultProjectId;
  }

}

exports.InfuraProvider = InfuraProvider;
},{"@ethersproject/properties":"JuuX","./websocket-provider":"lCOP","./formatter":"nnuj","@ethersproject/logger":"kMNH","./_version":"UhEn","./url-json-rpc-provider":"JsTC"}],"oqch":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonRpcBatchProvider = void 0;

var _properties = require("@ethersproject/properties");

var _web = require("@ethersproject/web");

var _jsonRpcProvider = require("./json-rpc-provider");

// Experimental
class JsonRpcBatchProvider extends _jsonRpcProvider.JsonRpcProvider {
  send(method, params) {
    const request = {
      method: method,
      params: params,
      id: this._nextId++,
      jsonrpc: "2.0"
    };

    if (this._pendingBatch == null) {
      this._pendingBatch = [];
    }

    const inflightRequest = {
      request,
      resolve: null,
      reject: null
    };
    const promise = new Promise((resolve, reject) => {
      inflightRequest.resolve = resolve;
      inflightRequest.reject = reject;
    });

    this._pendingBatch.push(inflightRequest);

    if (!this._pendingBatchAggregator) {
      // Schedule batch for next event loop + short duration
      this._pendingBatchAggregator = setTimeout(() => {
        // Get teh current batch and clear it, so new requests
        // go into the next batch
        const batch = this._pendingBatch;
        this._pendingBatch = null;
        this._pendingBatchAggregator = null; // Get the request as an array of requests

        const request = batch.map(inflight => inflight.request);
        this.emit("debug", {
          action: "requestBatch",
          request: (0, _properties.deepCopy)(request),
          provider: this
        });
        return (0, _web.fetchJson)(this.connection, JSON.stringify(request)).then(result => {
          this.emit("debug", {
            action: "response",
            request: request,
            response: result,
            provider: this
          }); // For each result, feed it to the correct Promise, depending
          // on whether it was a success or error

          batch.forEach((inflightRequest, index) => {
            const payload = result[index];

            if (payload.error) {
              const error = new Error(payload.error.message);
              error.code = payload.error.code;
              error.data = payload.error.data;
              inflightRequest.reject(error);
            } else {
              inflightRequest.resolve(payload.result);
            }
          });
        }, error => {
          this.emit("debug", {
            action: "response",
            error: error,
            request: request,
            provider: this
          });
          batch.forEach(inflightRequest => {
            inflightRequest.reject(error);
          });
        });
      }, 10);
    }

    return promise;
  }

}

exports.JsonRpcBatchProvider = JsonRpcBatchProvider;
},{"@ethersproject/properties":"JuuX","@ethersproject/web":"egXK","./json-rpc-provider":"HkBu"}],"SEz3":[function(require,module,exports) {
/* istanbul ignore file */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodesmithProvider = void 0;

var _urlJsonRpcProvider = require("./url-json-rpc-provider");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version); // Special API key provided by Nodesmith for ethers.js

const defaultApiKey = "ETHERS_JS_SHARED";

class NodesmithProvider extends _urlJsonRpcProvider.UrlJsonRpcProvider {
  static getApiKey(apiKey) {
    if (apiKey && typeof apiKey !== "string") {
      logger.throwArgumentError("invalid apiKey", "apiKey", apiKey);
    }

    return apiKey || defaultApiKey;
  }

  static getUrl(network, apiKey) {
    logger.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");
    let host = null;

    switch (network.name) {
      case "homestead":
        host = "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc";
        break;

      case "ropsten":
        host = "https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc";
        break;

      case "rinkeby":
        host = "https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc";
        break;

      case "goerli":
        host = "https://ethereum.api.nodesmith.io/v1/goerli/jsonrpc";
        break;

      case "kovan":
        host = "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc";
        break;

      default:
        logger.throwArgumentError("unsupported network", "network", arguments[0]);
    }

    return host + "?apiKey=" + apiKey;
  }

}

exports.NodesmithProvider = NodesmithProvider;
},{"./url-json-rpc-provider":"JsTC","@ethersproject/logger":"kMNH","./_version":"UhEn"}],"K0WX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PocketProvider = void 0;

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _urlJsonRpcProvider = require("./url-json-rpc-provider");

const logger = new _logger.Logger(_version.version);
// These are load-balancer-based application IDs
const defaultApplicationIds = {
  homestead: "6004bcd10040261633ade990",
  ropsten: "6004bd4d0040261633ade991",
  rinkeby: "6004bda20040261633ade994",
  goerli: "6004bd860040261633ade992"
};

class PocketProvider extends _urlJsonRpcProvider.UrlJsonRpcProvider {
  constructor(network, apiKey) {
    // We need a bit of creativity in the constructor because
    // Pocket uses different default API keys based on the network
    if (apiKey == null) {
      const n = (0, _properties.getStatic)(new.target, "getNetwork")(network);

      if (n) {
        const applicationId = defaultApplicationIds[n.name];

        if (applicationId) {
          apiKey = {
            applicationId: applicationId,
            loadBalancer: true
          };
        }
      } // If there was any issue above, we don't know this network


      if (apiKey == null) {
        logger.throwError("unsupported network", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
      }
    }

    super(network, apiKey);
  }

  static getApiKey(apiKey) {
    // Most API Providers allow null to get the default configuration, but
    // Pocket requires the network to decide the default provider, so we
    // rely on hijacking the constructor to add a sensible default for us
    if (apiKey == null) {
      logger.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
    }

    const apiKeyObj = {
      applicationId: null,
      loadBalancer: false,
      applicationSecretKey: null
    }; // Parse applicationId and applicationSecretKey

    if (typeof apiKey === "string") {
      apiKeyObj.applicationId = apiKey;
    } else if (apiKey.applicationSecretKey != null) {
      logger.assertArgument(typeof apiKey.applicationId === "string", "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
      logger.assertArgument(typeof apiKey.applicationSecretKey === "string", "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
      apiKeyObj.applicationId = apiKey.applicationId;
      apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
      apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
    } else if (apiKey.applicationId) {
      logger.assertArgument(typeof apiKey.applicationId === "string", "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
      apiKeyObj.applicationId = apiKey.applicationId;
      apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
    } else {
      logger.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
    }

    return apiKeyObj;
  }

  static getUrl(network, apiKey) {
    let host = null;

    switch (network ? network.name : "unknown") {
      case "homestead":
        host = "eth-mainnet.gateway.pokt.network";
        break;

      case "ropsten":
        host = "eth-ropsten.gateway.pokt.network";
        break;

      case "rinkeby":
        host = "eth-rinkeby.gateway.pokt.network";
        break;

      case "goerli":
        host = "eth-goerli.gateway.pokt.network";
        break;

      default:
        logger.throwError("unsupported network", _logger.Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
    }

    let url = null;

    if (apiKey.loadBalancer) {
      url = `https:/\/${host}/v1/lb/${apiKey.applicationId}`;
    } else {
      url = `https:/\/${host}/v1/${apiKey.applicationId}`;
    }

    const connection = {
      url
    }; // Initialize empty headers

    connection.headers = {}; // Apply application secret key

    if (apiKey.applicationSecretKey != null) {
      connection.user = "";
      connection.password = apiKey.applicationSecretKey;
    }

    return connection;
  }

  isCommunityResource() {
    return this.applicationId === defaultApplicationIds[this.network.name];
  }

}

exports.PocketProvider = PocketProvider;
},{"@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"UhEn","./url-json-rpc-provider":"JsTC"}],"ELRQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3Provider = void 0;

var _properties = require("@ethersproject/properties");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

var _jsonRpcProvider = require("./json-rpc-provider");

const logger = new _logger.Logger(_version.version);
let _nextId = 1;

function buildWeb3LegacyFetcher(provider, sendFunc) {
  const fetcher = "Web3LegacyFetcher";
  return function (method, params) {
    const request = {
      method: method,
      params: params,
      id: _nextId++,
      jsonrpc: "2.0"
    };
    return new Promise((resolve, reject) => {
      this.emit("debug", {
        action: "request",
        fetcher,
        request: (0, _properties.deepCopy)(request),
        provider: this
      });
      sendFunc(request, (error, response) => {
        if (error) {
          this.emit("debug", {
            action: "response",
            fetcher,
            error,
            request,
            provider: this
          });
          return reject(error);
        }

        this.emit("debug", {
          action: "response",
          fetcher,
          request,
          response,
          provider: this
        });

        if (response.error) {
          const error = new Error(response.error.message);
          error.code = response.error.code;
          error.data = response.error.data;
          return reject(error);
        }

        resolve(response.result);
      });
    });
  };
}

function buildEip1193Fetcher(provider) {
  return function (method, params) {
    if (params == null) {
      params = [];
    }

    const request = {
      method,
      params
    };
    this.emit("debug", {
      action: "request",
      fetcher: "Eip1193Fetcher",
      request: (0, _properties.deepCopy)(request),
      provider: this
    });
    return provider.request(request).then(response => {
      this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request,
        response,
        provider: this
      });
      return response;
    }, error => {
      this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request,
        error,
        provider: this
      });
      throw error;
    });
  };
}

class Web3Provider extends _jsonRpcProvider.JsonRpcProvider {
  constructor(provider, network) {
    logger.checkNew(new.target, Web3Provider);

    if (provider == null) {
      logger.throwArgumentError("missing provider", "provider", provider);
    }

    let path = null;
    let jsonRpcFetchFunc = null;
    let subprovider = null;

    if (typeof provider === "function") {
      path = "unknown:";
      jsonRpcFetchFunc = provider;
    } else {
      path = provider.host || provider.path || "";

      if (!path && provider.isMetaMask) {
        path = "metamask";
      }

      subprovider = provider;

      if (provider.request) {
        if (path === "") {
          path = "eip-1193:";
        }

        jsonRpcFetchFunc = buildEip1193Fetcher(provider);
      } else if (provider.sendAsync) {
        jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
      } else if (provider.send) {
        jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
      } else {
        logger.throwArgumentError("unsupported provider", "provider", provider);
      }

      if (!path) {
        path = "unknown:";
      }
    }

    super(path, network);
    (0, _properties.defineReadOnly)(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
    (0, _properties.defineReadOnly)(this, "provider", subprovider);
  }

  send(method, params) {
    return this.jsonRpcFetchFunc(method, params);
  }

}

exports.Web3Provider = Web3Provider;
},{"@ethersproject/properties":"JuuX","@ethersproject/logger":"kMNH","./_version":"UhEn","./json-rpc-provider":"HkBu"}],"JCNj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AlchemyProvider", {
  enumerable: true,
  get: function () {
    return _alchemyProvider.AlchemyProvider;
  }
});
Object.defineProperty(exports, "AlchemyWebSocketProvider", {
  enumerable: true,
  get: function () {
    return _alchemyProvider.AlchemyWebSocketProvider;
  }
});
Object.defineProperty(exports, "BaseProvider", {
  enumerable: true,
  get: function () {
    return _baseProvider.BaseProvider;
  }
});
Object.defineProperty(exports, "CloudflareProvider", {
  enumerable: true,
  get: function () {
    return _cloudflareProvider.CloudflareProvider;
  }
});
Object.defineProperty(exports, "EtherscanProvider", {
  enumerable: true,
  get: function () {
    return _etherscanProvider.EtherscanProvider;
  }
});
Object.defineProperty(exports, "FallbackProvider", {
  enumerable: true,
  get: function () {
    return _fallbackProvider.FallbackProvider;
  }
});
Object.defineProperty(exports, "Formatter", {
  enumerable: true,
  get: function () {
    return _formatter.Formatter;
  }
});
Object.defineProperty(exports, "InfuraProvider", {
  enumerable: true,
  get: function () {
    return _infuraProvider.InfuraProvider;
  }
});
Object.defineProperty(exports, "InfuraWebSocketProvider", {
  enumerable: true,
  get: function () {
    return _infuraProvider.InfuraWebSocketProvider;
  }
});
Object.defineProperty(exports, "IpcProvider", {
  enumerable: true,
  get: function () {
    return _ipcProvider.IpcProvider;
  }
});
Object.defineProperty(exports, "JsonRpcBatchProvider", {
  enumerable: true,
  get: function () {
    return _jsonRpcBatchProvider.JsonRpcBatchProvider;
  }
});
Object.defineProperty(exports, "JsonRpcProvider", {
  enumerable: true,
  get: function () {
    return _jsonRpcProvider.JsonRpcProvider;
  }
});
Object.defineProperty(exports, "JsonRpcSigner", {
  enumerable: true,
  get: function () {
    return _jsonRpcProvider.JsonRpcSigner;
  }
});
Object.defineProperty(exports, "NodesmithProvider", {
  enumerable: true,
  get: function () {
    return _nodesmithProvider.NodesmithProvider;
  }
});
Object.defineProperty(exports, "PocketProvider", {
  enumerable: true,
  get: function () {
    return _pocketProvider.PocketProvider;
  }
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function () {
    return _abstractProvider.Provider;
  }
});
Object.defineProperty(exports, "Resolver", {
  enumerable: true,
  get: function () {
    return _baseProvider.Resolver;
  }
});
Object.defineProperty(exports, "StaticJsonRpcProvider", {
  enumerable: true,
  get: function () {
    return _urlJsonRpcProvider.StaticJsonRpcProvider;
  }
});
Object.defineProperty(exports, "UrlJsonRpcProvider", {
  enumerable: true,
  get: function () {
    return _urlJsonRpcProvider.UrlJsonRpcProvider;
  }
});
Object.defineProperty(exports, "Web3Provider", {
  enumerable: true,
  get: function () {
    return _web3Provider.Web3Provider;
  }
});
Object.defineProperty(exports, "WebSocketProvider", {
  enumerable: true,
  get: function () {
    return _websocketProvider.WebSocketProvider;
  }
});
exports.getDefaultProvider = getDefaultProvider;
Object.defineProperty(exports, "getNetwork", {
  enumerable: true,
  get: function () {
    return _networks.getNetwork;
  }
});
Object.defineProperty(exports, "isCommunityResourcable", {
  enumerable: true,
  get: function () {
    return _formatter.isCommunityResourcable;
  }
});
Object.defineProperty(exports, "isCommunityResource", {
  enumerable: true,
  get: function () {
    return _formatter.isCommunityResource;
  }
});
Object.defineProperty(exports, "showThrottleMessage", {
  enumerable: true,
  get: function () {
    return _formatter.showThrottleMessage;
  }
});

var _abstractProvider = require("@ethersproject/abstract-provider");

var _networks = require("@ethersproject/networks");

var _baseProvider = require("./base-provider");

var _alchemyProvider = require("./alchemy-provider");

var _cloudflareProvider = require("./cloudflare-provider");

var _etherscanProvider = require("./etherscan-provider");

var _fallbackProvider = require("./fallback-provider");

var _ipcProvider = require("./ipc-provider");

var _infuraProvider = require("./infura-provider");

var _jsonRpcProvider = require("./json-rpc-provider");

var _jsonRpcBatchProvider = require("./json-rpc-batch-provider");

var _nodesmithProvider = require("./nodesmith-provider");

var _pocketProvider = require("./pocket-provider");

var _urlJsonRpcProvider = require("./url-json-rpc-provider");

var _web3Provider = require("./web3-provider");

var _websocketProvider = require("./websocket-provider");

var _formatter = require("./formatter");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version); ////////////////////////
// Helper Functions

function getDefaultProvider(network, options) {
  if (network == null) {
    network = "homestead";
  } // If passed a URL, figure out the right type of provider based on the scheme


  if (typeof network === "string") {
    // @TODO: Add support for IpcProvider; maybe if it ends in ".ipc"?
    // Handle http and ws (and their secure variants)
    const match = network.match(/^(ws|http)s?:/i);

    if (match) {
      switch (match[1]) {
        case "http":
          return new _jsonRpcProvider.JsonRpcProvider(network);

        case "ws":
          return new _websocketProvider.WebSocketProvider(network);

        default:
          logger.throwArgumentError("unsupported URL scheme", "network", network);
      }
    }
  }

  const n = (0, _networks.getNetwork)(network);

  if (!n || !n._defaultProvider) {
    logger.throwError("unsupported getDefaultProvider network", _logger.Logger.errors.NETWORK_ERROR, {
      operation: "getDefaultProvider",
      network: network
    });
  }

  return n._defaultProvider({
    FallbackProvider: _fallbackProvider.FallbackProvider,
    AlchemyProvider: _alchemyProvider.AlchemyProvider,
    CloudflareProvider: _cloudflareProvider.CloudflareProvider,
    EtherscanProvider: _etherscanProvider.EtherscanProvider,
    InfuraProvider: _infuraProvider.InfuraProvider,
    JsonRpcProvider: _jsonRpcProvider.JsonRpcProvider,
    NodesmithProvider: _nodesmithProvider.NodesmithProvider,
    PocketProvider: _pocketProvider.PocketProvider,
    Web3Provider: _web3Provider.Web3Provider,
    IpcProvider: _ipcProvider.IpcProvider
  }, options);
} ////////////////////////
// Exports
},{"@ethersproject/abstract-provider":"GKyj","@ethersproject/networks":"k9P0","./base-provider":"SPLd","./alchemy-provider":"Lc7y","./cloudflare-provider":"VQyX","./etherscan-provider":"U5hR","./fallback-provider":"JHW6","./ipc-provider":"VRXh","./infura-provider":"CNMZ","./json-rpc-provider":"HkBu","./json-rpc-batch-provider":"oqch","./nodesmith-provider":"SEz3","./pocket-provider":"K0WX","./url-json-rpc-provider":"JsTC","./web3-provider":"ELRQ","./websocket-provider":"lCOP","./formatter":"nnuj","@ethersproject/logger":"kMNH","./_version":"UhEn"}],"ZaRX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "solidity/5.5.0";
exports.version = version;
},{}],"dtwr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keccak256 = keccak256;
exports.pack = pack;
exports.sha256 = sha256;

var _bignumber = require("@ethersproject/bignumber");

var _bytes = require("@ethersproject/bytes");

var _keccak = require("@ethersproject/keccak256");

var _sha = require("@ethersproject/sha2");

var _strings = require("@ethersproject/strings");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
const Zeros = "0000000000000000000000000000000000000000000000000000000000000000";
const logger = new _logger.Logger(_version.version);

function _pack(type, value, isArray) {
  switch (type) {
    case "address":
      if (isArray) {
        return (0, _bytes.zeroPad)(value, 32);
      }

      return (0, _bytes.arrayify)(value);

    case "string":
      return (0, _strings.toUtf8Bytes)(value);

    case "bytes":
      return (0, _bytes.arrayify)(value);

    case "bool":
      value = value ? "0x01" : "0x00";

      if (isArray) {
        return (0, _bytes.zeroPad)(value, 32);
      }

      return (0, _bytes.arrayify)(value);
  }

  let match = type.match(regexNumber);

  if (match) {
    //let signed = (match[1] === "int")
    let size = parseInt(match[2] || "256");

    if (match[2] && String(size) !== match[2] || size % 8 !== 0 || size === 0 || size > 256) {
      logger.throwArgumentError("invalid number type", "type", type);
    }

    if (isArray) {
      size = 256;
    }

    value = _bignumber.BigNumber.from(value).toTwos(size);
    return (0, _bytes.zeroPad)(value, size / 8);
  }

  match = type.match(regexBytes);

  if (match) {
    const size = parseInt(match[1]);

    if (String(size) !== match[1] || size === 0 || size > 32) {
      logger.throwArgumentError("invalid bytes type", "type", type);
    }

    if ((0, _bytes.arrayify)(value).byteLength !== size) {
      logger.throwArgumentError(`invalid value for ${type}`, "value", value);
    }

    if (isArray) {
      return (0, _bytes.arrayify)((value + Zeros).substring(0, 66));
    }

    return value;
  }

  match = type.match(regexArray);

  if (match && Array.isArray(value)) {
    const baseType = match[1];
    const count = parseInt(match[2] || String(value.length));

    if (count != value.length) {
      logger.throwArgumentError(`invalid array length for ${type}`, "value", value);
    }

    const result = [];
    value.forEach(function (value) {
      result.push(_pack(baseType, value, true));
    });
    return (0, _bytes.concat)(result);
  }

  return logger.throwArgumentError("invalid type", "type", type);
} // @TODO: Array Enum


function pack(types, values) {
  if (types.length != values.length) {
    logger.throwArgumentError("wrong number of values; expected ${ types.length }", "values", values);
  }

  const tight = [];
  types.forEach(function (type, index) {
    tight.push(_pack(type, values[index]));
  });
  return (0, _bytes.hexlify)((0, _bytes.concat)(tight));
}

function keccak256(types, values) {
  return (0, _keccak.keccak256)(pack(types, values));
}

function sha256(types, values) {
  return (0, _sha.sha256)(pack(types, values));
}
},{"@ethersproject/bignumber":"efJK","@ethersproject/bytes":"aqkS","@ethersproject/keccak256":"g6Gq","@ethersproject/sha2":"C9Hj","@ethersproject/strings":"ZW9k","@ethersproject/logger":"kMNH","./_version":"ZaRX"}],"nsHz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "units/5.5.0";
exports.version = version;
},{}],"UGHG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commify = commify;
exports.formatEther = formatEther;
exports.formatUnits = formatUnits;
exports.parseEther = parseEther;
exports.parseUnits = parseUnits;

var _bignumber = require("@ethersproject/bignumber");

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

const logger = new _logger.Logger(_version.version);
const names = ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"]; // Some environments have issues with RegEx that contain back-tracking, so we cannot
// use them.

function commify(value) {
  const comps = String(value).split(".");

  if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || comps[1] && !comps[1].match(/^[0-9]*$/) || value === "." || value === "-.") {
    logger.throwArgumentError("invalid value", "value", value);
  } // Make sure we have at least one whole digit (0 if none)


  let whole = comps[0];
  let negative = "";

  if (whole.substring(0, 1) === "-") {
    negative = "-";
    whole = whole.substring(1);
  } // Make sure we have at least 1 whole digit with no leading zeros


  while (whole.substring(0, 1) === "0") {
    whole = whole.substring(1);
  }

  if (whole === "") {
    whole = "0";
  }

  let suffix = "";

  if (comps.length === 2) {
    suffix = "." + (comps[1] || "0");
  }

  while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
    suffix = suffix.substring(0, suffix.length - 1);
  }

  const formatted = [];

  while (whole.length) {
    if (whole.length <= 3) {
      formatted.unshift(whole);
      break;
    } else {
      const index = whole.length - 3;
      formatted.unshift(whole.substring(index));
      whole = whole.substring(0, index);
    }
  }

  return negative + formatted.join(",") + suffix;
}

function formatUnits(value, unitName) {
  if (typeof unitName === "string") {
    const index = names.indexOf(unitName);

    if (index !== -1) {
      unitName = 3 * index;
    }
  }

  return (0, _bignumber.formatFixed)(value, unitName != null ? unitName : 18);
}

function parseUnits(value, unitName) {
  if (typeof value !== "string") {
    logger.throwArgumentError("value must be a string", "value", value);
  }

  if (typeof unitName === "string") {
    const index = names.indexOf(unitName);

    if (index !== -1) {
      unitName = 3 * index;
    }
  }

  return (0, _bignumber.parseFixed)(value, unitName != null ? unitName : 18);
}

function formatEther(wei) {
  return formatUnits(wei, 18);
}

function parseEther(ether) {
  return parseUnits(ether, 18);
}
},{"@ethersproject/bignumber":"efJK","@ethersproject/logger":"kMNH","./_version":"nsHz"}],"jtvS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AbiCoder", {
  enumerable: true,
  get: function () {
    return _abi.AbiCoder;
  }
});
Object.defineProperty(exports, "ConstructorFragment", {
  enumerable: true,
  get: function () {
    return _abi.ConstructorFragment;
  }
});
Object.defineProperty(exports, "ErrorFragment", {
  enumerable: true,
  get: function () {
    return _abi.ErrorFragment;
  }
});
Object.defineProperty(exports, "EventFragment", {
  enumerable: true,
  get: function () {
    return _abi.EventFragment;
  }
});
Object.defineProperty(exports, "FormatTypes", {
  enumerable: true,
  get: function () {
    return _abi.FormatTypes;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function () {
    return _abi.Fragment;
  }
});
Object.defineProperty(exports, "FunctionFragment", {
  enumerable: true,
  get: function () {
    return _abi.FunctionFragment;
  }
});
Object.defineProperty(exports, "HDNode", {
  enumerable: true,
  get: function () {
    return _hdnode.HDNode;
  }
});
Object.defineProperty(exports, "Indexed", {
  enumerable: true,
  get: function () {
    return _abi.Indexed;
  }
});
Object.defineProperty(exports, "Interface", {
  enumerable: true,
  get: function () {
    return _abi.Interface;
  }
});
Object.defineProperty(exports, "LogDescription", {
  enumerable: true,
  get: function () {
    return _abi.LogDescription;
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _logger.Logger;
  }
});
Object.defineProperty(exports, "ParamType", {
  enumerable: true,
  get: function () {
    return _abi.ParamType;
  }
});
exports.RLP = void 0;
Object.defineProperty(exports, "SigningKey", {
  enumerable: true,
  get: function () {
    return _signingKey.SigningKey;
  }
});
Object.defineProperty(exports, "SupportedAlgorithm", {
  enumerable: true,
  get: function () {
    return _sha.SupportedAlgorithm;
  }
});
Object.defineProperty(exports, "TransactionDescription", {
  enumerable: true,
  get: function () {
    return _abi.TransactionDescription;
  }
});
Object.defineProperty(exports, "TransactionTypes", {
  enumerable: true,
  get: function () {
    return _transactions.TransactionTypes;
  }
});
Object.defineProperty(exports, "UnicodeNormalizationForm", {
  enumerable: true,
  get: function () {
    return _strings.UnicodeNormalizationForm;
  }
});
Object.defineProperty(exports, "Utf8ErrorFuncs", {
  enumerable: true,
  get: function () {
    return _strings.Utf8ErrorFuncs;
  }
});
Object.defineProperty(exports, "Utf8ErrorReason", {
  enumerable: true,
  get: function () {
    return _strings.Utf8ErrorReason;
  }
});
Object.defineProperty(exports, "_TypedDataEncoder", {
  enumerable: true,
  get: function () {
    return _hash._TypedDataEncoder;
  }
});
Object.defineProperty(exports, "_fetchData", {
  enumerable: true,
  get: function () {
    return _web._fetchData;
  }
});
Object.defineProperty(exports, "_toEscapedUtf8String", {
  enumerable: true,
  get: function () {
    return _strings._toEscapedUtf8String;
  }
});
Object.defineProperty(exports, "accessListify", {
  enumerable: true,
  get: function () {
    return _transactions.accessListify;
  }
});
Object.defineProperty(exports, "arrayify", {
  enumerable: true,
  get: function () {
    return _bytes.arrayify;
  }
});
Object.defineProperty(exports, "base58", {
  enumerable: true,
  get: function () {
    return _basex.Base58;
  }
});
exports.base64 = void 0;
Object.defineProperty(exports, "checkProperties", {
  enumerable: true,
  get: function () {
    return _properties.checkProperties;
  }
});
Object.defineProperty(exports, "checkResultErrors", {
  enumerable: true,
  get: function () {
    return _abi.checkResultErrors;
  }
});
Object.defineProperty(exports, "commify", {
  enumerable: true,
  get: function () {
    return _units.commify;
  }
});
Object.defineProperty(exports, "computeAddress", {
  enumerable: true,
  get: function () {
    return _transactions.computeAddress;
  }
});
Object.defineProperty(exports, "computeHmac", {
  enumerable: true,
  get: function () {
    return _sha.computeHmac;
  }
});
Object.defineProperty(exports, "computePublicKey", {
  enumerable: true,
  get: function () {
    return _signingKey.computePublicKey;
  }
});
Object.defineProperty(exports, "concat", {
  enumerable: true,
  get: function () {
    return _bytes.concat;
  }
});
Object.defineProperty(exports, "deepCopy", {
  enumerable: true,
  get: function () {
    return _properties.deepCopy;
  }
});
Object.defineProperty(exports, "defaultAbiCoder", {
  enumerable: true,
  get: function () {
    return _abi.defaultAbiCoder;
  }
});
Object.defineProperty(exports, "defaultPath", {
  enumerable: true,
  get: function () {
    return _hdnode.defaultPath;
  }
});
Object.defineProperty(exports, "defineReadOnly", {
  enumerable: true,
  get: function () {
    return _properties.defineReadOnly;
  }
});
Object.defineProperty(exports, "entropyToMnemonic", {
  enumerable: true,
  get: function () {
    return _hdnode.entropyToMnemonic;
  }
});
Object.defineProperty(exports, "fetchJson", {
  enumerable: true,
  get: function () {
    return _web.fetchJson;
  }
});
Object.defineProperty(exports, "formatBytes32String", {
  enumerable: true,
  get: function () {
    return _strings.formatBytes32String;
  }
});
Object.defineProperty(exports, "formatEther", {
  enumerable: true,
  get: function () {
    return _units.formatEther;
  }
});
Object.defineProperty(exports, "formatUnits", {
  enumerable: true,
  get: function () {
    return _units.formatUnits;
  }
});
Object.defineProperty(exports, "getAccountPath", {
  enumerable: true,
  get: function () {
    return _hdnode.getAccountPath;
  }
});
Object.defineProperty(exports, "getAddress", {
  enumerable: true,
  get: function () {
    return _address.getAddress;
  }
});
Object.defineProperty(exports, "getContractAddress", {
  enumerable: true,
  get: function () {
    return _address.getContractAddress;
  }
});
Object.defineProperty(exports, "getCreate2Address", {
  enumerable: true,
  get: function () {
    return _address.getCreate2Address;
  }
});
Object.defineProperty(exports, "getIcapAddress", {
  enumerable: true,
  get: function () {
    return _address.getIcapAddress;
  }
});
Object.defineProperty(exports, "getJsonWalletAddress", {
  enumerable: true,
  get: function () {
    return _jsonWallets.getJsonWalletAddress;
  }
});
Object.defineProperty(exports, "getStatic", {
  enumerable: true,
  get: function () {
    return _properties.getStatic;
  }
});
Object.defineProperty(exports, "hashMessage", {
  enumerable: true,
  get: function () {
    return _hash.hashMessage;
  }
});
Object.defineProperty(exports, "hexConcat", {
  enumerable: true,
  get: function () {
    return _bytes.hexConcat;
  }
});
Object.defineProperty(exports, "hexDataLength", {
  enumerable: true,
  get: function () {
    return _bytes.hexDataLength;
  }
});
Object.defineProperty(exports, "hexDataSlice", {
  enumerable: true,
  get: function () {
    return _bytes.hexDataSlice;
  }
});
Object.defineProperty(exports, "hexStripZeros", {
  enumerable: true,
  get: function () {
    return _bytes.hexStripZeros;
  }
});
Object.defineProperty(exports, "hexValue", {
  enumerable: true,
  get: function () {
    return _bytes.hexValue;
  }
});
Object.defineProperty(exports, "hexZeroPad", {
  enumerable: true,
  get: function () {
    return _bytes.hexZeroPad;
  }
});
Object.defineProperty(exports, "hexlify", {
  enumerable: true,
  get: function () {
    return _bytes.hexlify;
  }
});
Object.defineProperty(exports, "id", {
  enumerable: true,
  get: function () {
    return _hash.id;
  }
});
Object.defineProperty(exports, "isAddress", {
  enumerable: true,
  get: function () {
    return _address.isAddress;
  }
});
Object.defineProperty(exports, "isBytes", {
  enumerable: true,
  get: function () {
    return _bytes.isBytes;
  }
});
Object.defineProperty(exports, "isBytesLike", {
  enumerable: true,
  get: function () {
    return _bytes.isBytesLike;
  }
});
Object.defineProperty(exports, "isHexString", {
  enumerable: true,
  get: function () {
    return _bytes.isHexString;
  }
});
Object.defineProperty(exports, "isValidMnemonic", {
  enumerable: true,
  get: function () {
    return _hdnode.isValidMnemonic;
  }
});
Object.defineProperty(exports, "isValidName", {
  enumerable: true,
  get: function () {
    return _hash.isValidName;
  }
});
Object.defineProperty(exports, "joinSignature", {
  enumerable: true,
  get: function () {
    return _bytes.joinSignature;
  }
});
Object.defineProperty(exports, "keccak256", {
  enumerable: true,
  get: function () {
    return _keccak.keccak256;
  }
});
Object.defineProperty(exports, "mnemonicToEntropy", {
  enumerable: true,
  get: function () {
    return _hdnode.mnemonicToEntropy;
  }
});
Object.defineProperty(exports, "mnemonicToSeed", {
  enumerable: true,
  get: function () {
    return _hdnode.mnemonicToSeed;
  }
});
Object.defineProperty(exports, "namehash", {
  enumerable: true,
  get: function () {
    return _hash.namehash;
  }
});
Object.defineProperty(exports, "nameprep", {
  enumerable: true,
  get: function () {
    return _strings.nameprep;
  }
});
Object.defineProperty(exports, "parseBytes32String", {
  enumerable: true,
  get: function () {
    return _strings.parseBytes32String;
  }
});
Object.defineProperty(exports, "parseEther", {
  enumerable: true,
  get: function () {
    return _units.parseEther;
  }
});
Object.defineProperty(exports, "parseTransaction", {
  enumerable: true,
  get: function () {
    return _transactions.parse;
  }
});
Object.defineProperty(exports, "parseUnits", {
  enumerable: true,
  get: function () {
    return _units.parseUnits;
  }
});
Object.defineProperty(exports, "poll", {
  enumerable: true,
  get: function () {
    return _web.poll;
  }
});
Object.defineProperty(exports, "randomBytes", {
  enumerable: true,
  get: function () {
    return _random.randomBytes;
  }
});
Object.defineProperty(exports, "recoverAddress", {
  enumerable: true,
  get: function () {
    return _transactions.recoverAddress;
  }
});
Object.defineProperty(exports, "recoverPublicKey", {
  enumerable: true,
  get: function () {
    return _signingKey.recoverPublicKey;
  }
});
Object.defineProperty(exports, "resolveProperties", {
  enumerable: true,
  get: function () {
    return _properties.resolveProperties;
  }
});
Object.defineProperty(exports, "ripemd160", {
  enumerable: true,
  get: function () {
    return _sha.ripemd160;
  }
});
Object.defineProperty(exports, "serializeTransaction", {
  enumerable: true,
  get: function () {
    return _transactions.serialize;
  }
});
Object.defineProperty(exports, "sha256", {
  enumerable: true,
  get: function () {
    return _sha.sha256;
  }
});
Object.defineProperty(exports, "sha512", {
  enumerable: true,
  get: function () {
    return _sha.sha512;
  }
});
Object.defineProperty(exports, "shallowCopy", {
  enumerable: true,
  get: function () {
    return _properties.shallowCopy;
  }
});
Object.defineProperty(exports, "shuffled", {
  enumerable: true,
  get: function () {
    return _random.shuffled;
  }
});
Object.defineProperty(exports, "solidityKeccak256", {
  enumerable: true,
  get: function () {
    return _solidity.keccak256;
  }
});
Object.defineProperty(exports, "solidityPack", {
  enumerable: true,
  get: function () {
    return _solidity.pack;
  }
});
Object.defineProperty(exports, "soliditySha256", {
  enumerable: true,
  get: function () {
    return _solidity.sha256;
  }
});
Object.defineProperty(exports, "splitSignature", {
  enumerable: true,
  get: function () {
    return _bytes.splitSignature;
  }
});
Object.defineProperty(exports, "stripZeros", {
  enumerable: true,
  get: function () {
    return _bytes.stripZeros;
  }
});
Object.defineProperty(exports, "toUtf8Bytes", {
  enumerable: true,
  get: function () {
    return _strings.toUtf8Bytes;
  }
});
Object.defineProperty(exports, "toUtf8CodePoints", {
  enumerable: true,
  get: function () {
    return _strings.toUtf8CodePoints;
  }
});
Object.defineProperty(exports, "toUtf8String", {
  enumerable: true,
  get: function () {
    return _strings.toUtf8String;
  }
});
Object.defineProperty(exports, "verifyMessage", {
  enumerable: true,
  get: function () {
    return _wallet.verifyMessage;
  }
});
Object.defineProperty(exports, "verifyTypedData", {
  enumerable: true,
  get: function () {
    return _wallet.verifyTypedData;
  }
});
Object.defineProperty(exports, "zeroPad", {
  enumerable: true,
  get: function () {
    return _bytes.zeroPad;
  }
});

var _abi = require("@ethersproject/abi");

var _address = require("@ethersproject/address");

var base64 = _interopRequireWildcard(require("@ethersproject/base64"));

exports.base64 = base64;

var _basex = require("@ethersproject/basex");

var _bytes = require("@ethersproject/bytes");

var _hash = require("@ethersproject/hash");

var _hdnode = require("@ethersproject/hdnode");

var _jsonWallets = require("@ethersproject/json-wallets");

var _keccak = require("@ethersproject/keccak256");

var _logger = require("@ethersproject/logger");

var _sha = require("@ethersproject/sha2");

var _solidity = require("@ethersproject/solidity");

var _random = require("@ethersproject/random");

var _properties = require("@ethersproject/properties");

var RLP = _interopRequireWildcard(require("@ethersproject/rlp"));

exports.RLP = RLP;

var _signingKey = require("@ethersproject/signing-key");

var _strings = require("@ethersproject/strings");

var _transactions = require("@ethersproject/transactions");

var _units = require("@ethersproject/units");

var _wallet = require("@ethersproject/wallet");

var _web = require("@ethersproject/web");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"@ethersproject/abi":"FSnr","@ethersproject/address":"a1wm","@ethersproject/base64":"ybca","@ethersproject/basex":"Q7g1","@ethersproject/bytes":"aqkS","@ethersproject/hash":"eHxR","@ethersproject/hdnode":"oCaL","@ethersproject/json-wallets":"TeON","@ethersproject/keccak256":"g6Gq","@ethersproject/logger":"kMNH","@ethersproject/sha2":"C9Hj","@ethersproject/solidity":"dtwr","@ethersproject/random":"LoH0","@ethersproject/properties":"JuuX","@ethersproject/rlp":"oUFp","@ethersproject/signing-key":"KjI1","@ethersproject/strings":"ZW9k","@ethersproject/transactions":"OW34","@ethersproject/units":"UGHG","@ethersproject/wallet":"TP6f","@ethersproject/web":"egXK"}],"yxar":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = "ethers/5.5.1";
exports.version = version;
},{}],"KSWR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseContract", {
  enumerable: true,
  get: function () {
    return _contracts.BaseContract;
  }
});
Object.defineProperty(exports, "BigNumber", {
  enumerable: true,
  get: function () {
    return _bignumber.BigNumber;
  }
});
Object.defineProperty(exports, "Contract", {
  enumerable: true,
  get: function () {
    return _contracts.Contract;
  }
});
Object.defineProperty(exports, "ContractFactory", {
  enumerable: true,
  get: function () {
    return _contracts.ContractFactory;
  }
});
Object.defineProperty(exports, "FixedNumber", {
  enumerable: true,
  get: function () {
    return _bignumber.FixedNumber;
  }
});
Object.defineProperty(exports, "Signer", {
  enumerable: true,
  get: function () {
    return _abstractSigner.Signer;
  }
});
Object.defineProperty(exports, "VoidSigner", {
  enumerable: true,
  get: function () {
    return _abstractSigner.VoidSigner;
  }
});
Object.defineProperty(exports, "Wallet", {
  enumerable: true,
  get: function () {
    return _wallet.Wallet;
  }
});
Object.defineProperty(exports, "Wordlist", {
  enumerable: true,
  get: function () {
    return _wordlists.Wordlist;
  }
});
exports.constants = void 0;
Object.defineProperty(exports, "errors", {
  enumerable: true,
  get: function () {
    return _logger.ErrorCode;
  }
});
Object.defineProperty(exports, "getDefaultProvider", {
  enumerable: true,
  get: function () {
    return providers.getDefaultProvider;
  }
});
exports.utils = exports.providers = exports.logger = void 0;
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.version;
  }
});
Object.defineProperty(exports, "wordlists", {
  enumerable: true,
  get: function () {
    return _wordlists.wordlists;
  }
});

var _contracts = require("@ethersproject/contracts");

var _bignumber = require("@ethersproject/bignumber");

var _abstractSigner = require("@ethersproject/abstract-signer");

var _wallet = require("@ethersproject/wallet");

var constants = _interopRequireWildcard(require("@ethersproject/constants"));

exports.constants = constants;

var providers = _interopRequireWildcard(require("@ethersproject/providers"));

exports.providers = providers;

var _wordlists = require("@ethersproject/wordlists");

var utils = _interopRequireWildcard(require("./utils"));

exports.utils = utils;

var _logger = require("@ethersproject/logger");

var _version = require("./_version");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

////////////////////////
// Compile-Time Constants
// This is generated by "npm run dist"
const logger = new _logger.Logger(_version.version); ////////////////////////
// Exports

exports.logger = logger;
},{"@ethersproject/contracts":"PzG9","@ethersproject/bignumber":"efJK","@ethersproject/abstract-signer":"l8eZ","@ethersproject/wallet":"TP6f","@ethersproject/constants":"FOhG","@ethersproject/providers":"JCNj","@ethersproject/wordlists":"VsrC","./utils":"jtvS","@ethersproject/logger":"kMNH","./_version":"yxar"}],"iS6H":[function(require,module,exports) {
"use strict"; // To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseContract", {
  enumerable: true,
  get: function () {
    return ethers.BaseContract;
  }
});
Object.defineProperty(exports, "BigNumber", {
  enumerable: true,
  get: function () {
    return ethers.BigNumber;
  }
});
Object.defineProperty(exports, "Contract", {
  enumerable: true,
  get: function () {
    return ethers.Contract;
  }
});
Object.defineProperty(exports, "ContractFactory", {
  enumerable: true,
  get: function () {
    return ethers.ContractFactory;
  }
});
Object.defineProperty(exports, "FixedNumber", {
  enumerable: true,
  get: function () {
    return ethers.FixedNumber;
  }
});
Object.defineProperty(exports, "Signer", {
  enumerable: true,
  get: function () {
    return ethers.Signer;
  }
});
Object.defineProperty(exports, "VoidSigner", {
  enumerable: true,
  get: function () {
    return ethers.VoidSigner;
  }
});
Object.defineProperty(exports, "Wallet", {
  enumerable: true,
  get: function () {
    return ethers.Wallet;
  }
});
Object.defineProperty(exports, "Wordlist", {
  enumerable: true,
  get: function () {
    return ethers.Wordlist;
  }
});
Object.defineProperty(exports, "constants", {
  enumerable: true,
  get: function () {
    return ethers.constants;
  }
});
Object.defineProperty(exports, "errors", {
  enumerable: true,
  get: function () {
    return ethers.errors;
  }
});
exports.ethers = void 0;
Object.defineProperty(exports, "getDefaultProvider", {
  enumerable: true,
  get: function () {
    return ethers.getDefaultProvider;
  }
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return ethers.logger;
  }
});
Object.defineProperty(exports, "providers", {
  enumerable: true,
  get: function () {
    return ethers.providers;
  }
});
Object.defineProperty(exports, "utils", {
  enumerable: true,
  get: function () {
    return ethers.utils;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return ethers.version;
  }
});
Object.defineProperty(exports, "wordlists", {
  enumerable: true,
  get: function () {
    return ethers.wordlists;
  }
});

var ethers = _interopRequireWildcard(require("./ethers"));

exports.ethers = ethers;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

try {
  const anyGlobal = window;

  if (anyGlobal._ethers == null) {
    anyGlobal._ethers = ethers;
  }
} catch (error) {}
},{"./ethers":"KSWR"}],"if8b":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes32String = exports.Utf8ErrorFuncs = exports.toUtf8String = exports.toUtf8CodePoints = exports.toUtf8Bytes = exports._toEscapedUtf8String = exports.nameprep = exports.hexDataSlice = exports.hexDataLength = exports.hexZeroPad = exports.hexValue = exports.hexStripZeros = exports.hexConcat = exports.isHexString = exports.hexlify = exports.base64 = exports.base58 = exports.TransactionDescription = exports.LogDescription = exports.Interface = exports.SigningKey = exports.HDNode = exports.defaultPath = exports.isBytesLike = exports.isBytes = exports.zeroPad = exports.stripZeros = exports.concat = exports.arrayify = exports.shallowCopy = exports.resolveProperties = exports.getStatic = exports.defineReadOnly = exports.deepCopy = exports.checkProperties = exports.poll = exports.fetchJson = exports._fetchData = exports.RLP = exports.Logger = exports.checkResultErrors = exports.FormatTypes = exports.ParamType = exports.FunctionFragment = exports.EventFragment = exports.ErrorFragment = exports.ConstructorFragment = exports.Fragment = exports.defaultAbiCoder = exports.AbiCoder = void 0;
exports.Indexed = exports.Utf8ErrorReason = exports.UnicodeNormalizationForm = exports.SupportedAlgorithm = exports.mnemonicToSeed = exports.isValidMnemonic = exports.entropyToMnemonic = exports.mnemonicToEntropy = exports.getAccountPath = exports.verifyTypedData = exports.verifyMessage = exports.recoverPublicKey = exports.computePublicKey = exports.recoverAddress = exports.computeAddress = exports.getJsonWalletAddress = exports.TransactionTypes = exports.serializeTransaction = exports.parseTransaction = exports.accessListify = exports.joinSignature = exports.splitSignature = exports.soliditySha256 = exports.solidityKeccak256 = exports.solidityPack = exports.shuffled = exports.randomBytes = exports.sha512 = exports.sha256 = exports.ripemd160 = exports.keccak256 = exports.computeHmac = exports.commify = exports.parseUnits = exports.formatUnits = exports.parseEther = exports.formatEther = exports.isAddress = exports.getCreate2Address = exports.getContractAddress = exports.getIcapAddress = exports.getAddress = exports._TypedDataEncoder = exports.id = exports.isValidName = exports.namehash = exports.hashMessage = exports.parseBytes32String = void 0;
var abi_1 = require("@ethersproject/abi");
Object.defineProperty(exports, "AbiCoder", { enumerable: true, get: function () { return abi_1.AbiCoder; } });
Object.defineProperty(exports, "checkResultErrors", { enumerable: true, get: function () { return abi_1.checkResultErrors; } });
Object.defineProperty(exports, "ConstructorFragment", { enumerable: true, get: function () { return abi_1.ConstructorFragment; } });
Object.defineProperty(exports, "defaultAbiCoder", { enumerable: true, get: function () { return abi_1.defaultAbiCoder; } });
Object.defineProperty(exports, "ErrorFragment", { enumerable: true, get: function () { return abi_1.ErrorFragment; } });
Object.defineProperty(exports, "EventFragment", { enumerable: true, get: function () { return abi_1.EventFragment; } });
Object.defineProperty(exports, "FormatTypes", { enumerable: true, get: function () { return abi_1.FormatTypes; } });
Object.defineProperty(exports, "Fragment", { enumerable: true, get: function () { return abi_1.Fragment; } });
Object.defineProperty(exports, "FunctionFragment", { enumerable: true, get: function () { return abi_1.FunctionFragment; } });
Object.defineProperty(exports, "Indexed", { enumerable: true, get: function () { return abi_1.Indexed; } });
Object.defineProperty(exports, "Interface", { enumerable: true, get: function () { return abi_1.Interface; } });
Object.defineProperty(exports, "LogDescription", { enumerable: true, get: function () { return abi_1.LogDescription; } });
Object.defineProperty(exports, "ParamType", { enumerable: true, get: function () { return abi_1.ParamType; } });
Object.defineProperty(exports, "TransactionDescription", { enumerable: true, get: function () { return abi_1.TransactionDescription; } });
var address_1 = require("@ethersproject/address");
Object.defineProperty(exports, "getAddress", { enumerable: true, get: function () { return address_1.getAddress; } });
Object.defineProperty(exports, "getCreate2Address", { enumerable: true, get: function () { return address_1.getCreate2Address; } });
Object.defineProperty(exports, "getContractAddress", { enumerable: true, get: function () { return address_1.getContractAddress; } });
Object.defineProperty(exports, "getIcapAddress", { enumerable: true, get: function () { return address_1.getIcapAddress; } });
Object.defineProperty(exports, "isAddress", { enumerable: true, get: function () { return address_1.isAddress; } });
var base64 = __importStar(require("@ethersproject/base64"));
exports.base64 = base64;
var basex_1 = require("@ethersproject/basex");
Object.defineProperty(exports, "base58", { enumerable: true, get: function () { return basex_1.Base58; } });
var bytes_1 = require("@ethersproject/bytes");
Object.defineProperty(exports, "arrayify", { enumerable: true, get: function () { return bytes_1.arrayify; } });
Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return bytes_1.concat; } });
Object.defineProperty(exports, "hexConcat", { enumerable: true, get: function () { return bytes_1.hexConcat; } });
Object.defineProperty(exports, "hexDataSlice", { enumerable: true, get: function () { return bytes_1.hexDataSlice; } });
Object.defineProperty(exports, "hexDataLength", { enumerable: true, get: function () { return bytes_1.hexDataLength; } });
Object.defineProperty(exports, "hexlify", { enumerable: true, get: function () { return bytes_1.hexlify; } });
Object.defineProperty(exports, "hexStripZeros", { enumerable: true, get: function () { return bytes_1.hexStripZeros; } });
Object.defineProperty(exports, "hexValue", { enumerable: true, get: function () { return bytes_1.hexValue; } });
Object.defineProperty(exports, "hexZeroPad", { enumerable: true, get: function () { return bytes_1.hexZeroPad; } });
Object.defineProperty(exports, "isBytes", { enumerable: true, get: function () { return bytes_1.isBytes; } });
Object.defineProperty(exports, "isBytesLike", { enumerable: true, get: function () { return bytes_1.isBytesLike; } });
Object.defineProperty(exports, "isHexString", { enumerable: true, get: function () { return bytes_1.isHexString; } });
Object.defineProperty(exports, "joinSignature", { enumerable: true, get: function () { return bytes_1.joinSignature; } });
Object.defineProperty(exports, "zeroPad", { enumerable: true, get: function () { return bytes_1.zeroPad; } });
Object.defineProperty(exports, "splitSignature", { enumerable: true, get: function () { return bytes_1.splitSignature; } });
Object.defineProperty(exports, "stripZeros", { enumerable: true, get: function () { return bytes_1.stripZeros; } });
var hash_1 = require("@ethersproject/hash");
Object.defineProperty(exports, "_TypedDataEncoder", { enumerable: true, get: function () { return hash_1._TypedDataEncoder; } });
Object.defineProperty(exports, "hashMessage", { enumerable: true, get: function () { return hash_1.hashMessage; } });
Object.defineProperty(exports, "id", { enumerable: true, get: function () { return hash_1.id; } });
Object.defineProperty(exports, "isValidName", { enumerable: true, get: function () { return hash_1.isValidName; } });
Object.defineProperty(exports, "namehash", { enumerable: true, get: function () { return hash_1.namehash; } });
var hdnode_1 = require("@ethersproject/hdnode");
Object.defineProperty(exports, "defaultPath", { enumerable: true, get: function () { return hdnode_1.defaultPath; } });
Object.defineProperty(exports, "entropyToMnemonic", { enumerable: true, get: function () { return hdnode_1.entropyToMnemonic; } });
Object.defineProperty(exports, "getAccountPath", { enumerable: true, get: function () { return hdnode_1.getAccountPath; } });
Object.defineProperty(exports, "HDNode", { enumerable: true, get: function () { return hdnode_1.HDNode; } });
Object.defineProperty(exports, "isValidMnemonic", { enumerable: true, get: function () { return hdnode_1.isValidMnemonic; } });
Object.defineProperty(exports, "mnemonicToEntropy", { enumerable: true, get: function () { return hdnode_1.mnemonicToEntropy; } });
Object.defineProperty(exports, "mnemonicToSeed", { enumerable: true, get: function () { return hdnode_1.mnemonicToSeed; } });
var json_wallets_1 = require("@ethersproject/json-wallets");
Object.defineProperty(exports, "getJsonWalletAddress", { enumerable: true, get: function () { return json_wallets_1.getJsonWalletAddress; } });
var keccak256_1 = require("@ethersproject/keccak256");
Object.defineProperty(exports, "keccak256", { enumerable: true, get: function () { return keccak256_1.keccak256; } });
var logger_1 = require("@ethersproject/logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
var sha2_1 = require("@ethersproject/sha2");
Object.defineProperty(exports, "computeHmac", { enumerable: true, get: function () { return sha2_1.computeHmac; } });
Object.defineProperty(exports, "ripemd160", { enumerable: true, get: function () { return sha2_1.ripemd160; } });
Object.defineProperty(exports, "sha256", { enumerable: true, get: function () { return sha2_1.sha256; } });
Object.defineProperty(exports, "sha512", { enumerable: true, get: function () { return sha2_1.sha512; } });
var solidity_1 = require("@ethersproject/solidity");
Object.defineProperty(exports, "solidityKeccak256", { enumerable: true, get: function () { return solidity_1.keccak256; } });
Object.defineProperty(exports, "solidityPack", { enumerable: true, get: function () { return solidity_1.pack; } });
Object.defineProperty(exports, "soliditySha256", { enumerable: true, get: function () { return solidity_1.sha256; } });
var random_1 = require("@ethersproject/random");
Object.defineProperty(exports, "randomBytes", { enumerable: true, get: function () { return random_1.randomBytes; } });
Object.defineProperty(exports, "shuffled", { enumerable: true, get: function () { return random_1.shuffled; } });
var properties_1 = require("@ethersproject/properties");
Object.defineProperty(exports, "checkProperties", { enumerable: true, get: function () { return properties_1.checkProperties; } });
Object.defineProperty(exports, "deepCopy", { enumerable: true, get: function () { return properties_1.deepCopy; } });
Object.defineProperty(exports, "defineReadOnly", { enumerable: true, get: function () { return properties_1.defineReadOnly; } });
Object.defineProperty(exports, "getStatic", { enumerable: true, get: function () { return properties_1.getStatic; } });
Object.defineProperty(exports, "resolveProperties", { enumerable: true, get: function () { return properties_1.resolveProperties; } });
Object.defineProperty(exports, "shallowCopy", { enumerable: true, get: function () { return properties_1.shallowCopy; } });
var RLP = __importStar(require("@ethersproject/rlp"));
exports.RLP = RLP;
var signing_key_1 = require("@ethersproject/signing-key");
Object.defineProperty(exports, "computePublicKey", { enumerable: true, get: function () { return signing_key_1.computePublicKey; } });
Object.defineProperty(exports, "recoverPublicKey", { enumerable: true, get: function () { return signing_key_1.recoverPublicKey; } });
Object.defineProperty(exports, "SigningKey", { enumerable: true, get: function () { return signing_key_1.SigningKey; } });
var strings_1 = require("@ethersproject/strings");
Object.defineProperty(exports, "formatBytes32String", { enumerable: true, get: function () { return strings_1.formatBytes32String; } });
Object.defineProperty(exports, "nameprep", { enumerable: true, get: function () { return strings_1.nameprep; } });
Object.defineProperty(exports, "parseBytes32String", { enumerable: true, get: function () { return strings_1.parseBytes32String; } });
Object.defineProperty(exports, "_toEscapedUtf8String", { enumerable: true, get: function () { return strings_1._toEscapedUtf8String; } });
Object.defineProperty(exports, "toUtf8Bytes", { enumerable: true, get: function () { return strings_1.toUtf8Bytes; } });
Object.defineProperty(exports, "toUtf8CodePoints", { enumerable: true, get: function () { return strings_1.toUtf8CodePoints; } });
Object.defineProperty(exports, "toUtf8String", { enumerable: true, get: function () { return strings_1.toUtf8String; } });
Object.defineProperty(exports, "Utf8ErrorFuncs", { enumerable: true, get: function () { return strings_1.Utf8ErrorFuncs; } });
var transactions_1 = require("@ethersproject/transactions");
Object.defineProperty(exports, "accessListify", { enumerable: true, get: function () { return transactions_1.accessListify; } });
Object.defineProperty(exports, "computeAddress", { enumerable: true, get: function () { return transactions_1.computeAddress; } });
Object.defineProperty(exports, "parseTransaction", { enumerable: true, get: function () { return transactions_1.parse; } });
Object.defineProperty(exports, "recoverAddress", { enumerable: true, get: function () { return transactions_1.recoverAddress; } });
Object.defineProperty(exports, "serializeTransaction", { enumerable: true, get: function () { return transactions_1.serialize; } });
Object.defineProperty(exports, "TransactionTypes", { enumerable: true, get: function () { return transactions_1.TransactionTypes; } });
var units_1 = require("@ethersproject/units");
Object.defineProperty(exports, "commify", { enumerable: true, get: function () { return units_1.commify; } });
Object.defineProperty(exports, "formatEther", { enumerable: true, get: function () { return units_1.formatEther; } });
Object.defineProperty(exports, "parseEther", { enumerable: true, get: function () { return units_1.parseEther; } });
Object.defineProperty(exports, "formatUnits", { enumerable: true, get: function () { return units_1.formatUnits; } });
Object.defineProperty(exports, "parseUnits", { enumerable: true, get: function () { return units_1.parseUnits; } });
var wallet_1 = require("@ethersproject/wallet");
Object.defineProperty(exports, "verifyMessage", { enumerable: true, get: function () { return wallet_1.verifyMessage; } });
Object.defineProperty(exports, "verifyTypedData", { enumerable: true, get: function () { return wallet_1.verifyTypedData; } });
var web_1 = require("@ethersproject/web");
Object.defineProperty(exports, "_fetchData", { enumerable: true, get: function () { return web_1._fetchData; } });
Object.defineProperty(exports, "fetchJson", { enumerable: true, get: function () { return web_1.fetchJson; } });
Object.defineProperty(exports, "poll", { enumerable: true, get: function () { return web_1.poll; } });
////////////////////////
// Enums
var sha2_2 = require("@ethersproject/sha2");
Object.defineProperty(exports, "SupportedAlgorithm", { enumerable: true, get: function () { return sha2_2.SupportedAlgorithm; } });
var strings_2 = require("@ethersproject/strings");
Object.defineProperty(exports, "UnicodeNormalizationForm", { enumerable: true, get: function () { return strings_2.UnicodeNormalizationForm; } });
Object.defineProperty(exports, "Utf8ErrorReason", { enumerable: true, get: function () { return strings_2.Utf8ErrorReason; } });

},{"@ethersproject/abi":"FSnr","@ethersproject/address":"a1wm","@ethersproject/base64":"ybca","@ethersproject/basex":"Q7g1","@ethersproject/bytes":"aqkS","@ethersproject/hash":"eHxR","@ethersproject/hdnode":"oCaL","@ethersproject/json-wallets":"TeON","@ethersproject/keccak256":"g6Gq","@ethersproject/logger":"kMNH","@ethersproject/sha2":"C9Hj","@ethersproject/solidity":"dtwr","@ethersproject/random":"LoH0","@ethersproject/properties":"JuuX","@ethersproject/rlp":"oUFp","@ethersproject/signing-key":"KjI1","@ethersproject/strings":"ZW9k","@ethersproject/transactions":"OW34","@ethersproject/units":"UGHG","@ethersproject/wallet":"TP6f","@ethersproject/web":"egXK"}],"Focm":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime");
const { EthereumClient, w3mConnectors, w3mProvider } = require("@web3modal/ethereum");
const { Web3Modal } = require("@web3modal/html");
const { configureChains, createConfig, getAccount, getNetwork, signMessage, sendTransaction, switchNetwork } = require("@wagmi/core");
const { arbitrum, mainnet, polygon } = require("@wagmi/core/chains");
const { parseEther } =  require("viem");

const chains = [arbitrum, mainnet, polygon]
const projectId = '8cb9d988c38d5dafd5fbe1f639fd6ff7'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const themeVariables = {
    '--w3m-logo-image-url': "https://framerusercontent.com/images/nOSlsFab9TFsDwcOYOAZ3dBhh8.png"
}
const web3modal = new Web3Modal({ projectId, themeVariables }, ethereumClient);

document.addEventListener("DOMContentLoaded", loadApp());

async function loadApp() {
    const account = getAccount();
    //web3modal.subscribeModal(() => processAction())
    web3modal.subscribeEvents(modalEvent => handleEvents(modalEvent));
    if(account.isConnected){
        processAction();
    }
    else{
        await web3modal.openModal();
        //wait for connection
    }
}

async function handleEvents(modalEvent){
    const CONNECTED = "ACCOUNT_CONNECTED";
    const DISCONNECTED = "ACCOUNT_DISCONNECTED";
    if(modalEvent.name == CONNECTED){
        processAction();
    }
    else if (modalEvent.name == DISCONNECTED){
        const responseText = document.getElementById("response-text");
        responseText.innerHTML = "";
        responseText.className = "";
        const responseButton = document.getElementById("response-button");
        responseButton.className = "";
        responseButton.innerHTML = "Copy";
    }
}

async function processAction() {
  const account = getAccount();
  //Don't process if no account is connected
  if(!account.isConnected || account.isConnecting) return;
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");
  const message = urlParams.get("message");
  const chainId = urlParams.get("chainId") || 1;
  const to = urlParams.get("to");
  const value = urlParams.get("value");
  const data = urlParams.get("data") || "";
  const gasLimit = urlParams.get("gasLimit") || undefined;
  const gasPrice = urlParams.get("gasPrice") || undefined;

  if (action === "sign" && message) {
    return signWagmiMessage(message);
  }

  if (action === "send" && to && value) {
    return sendWagmiTransaction(chainId, to, value, gasLimit, gasPrice, data);
  }

  if(action === "auth" && message) {
    let account = getAccount();
    //get the signing message using the message
    let response = await fetch(message + '/functions/requestMessage?address=' + account.address + '&chain=001',
        {
            method:'POST'
        }
    );
    let jsonData = await response.json();
    console.log(jsonData.result.message);
    return authSignMessage(jsonData.result.message);
  }

  displayResponse("Invalid URL");
}

async function sendWagmiTransaction(chainId, to, value, gasLimit, gasPrice, data) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const network = await getNetwork();

    if (network.chainId !== chainId) {
      await switchNetwork({
          chainId: `0x${parseInt(chainId, 10).toString(16)}`
      });
    }

    const from = getAccount();
    const tx = await sendTransaction({
      account: from,
      to: to,
      value: parseEther(value),
    });
    console.log({
      tx
    });
    displayResponse("Transaction sent.<br><br>Copy to clipboard then continue to App", tx.hash);
  } catch (error) {
    copyToClipboard("error");
    displayResponse("Transaction Denied");
  }
}

async function authSignMessage(message) {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const signature = await signMessage({message:message});
      console.log({
        signature
      });
      const response = {signature, message};
      displayResponse("Signature complete.<br><br>Copy to clipboard then continue to App", JSON.stringify(response));
    } catch (error) {
      copyToClipboard("error");
      displayResponse("Signature Denied");
    }
  }

async function signWagmiMessage(message) {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const signature = await signMessage({message:message});
    console.log({
      signature
    });
    displayResponse("Signature complete.<br><br>Copy to clipboard then continue to App", signature);
  } catch (error) {
    copyToClipboard("error");
    displayResponse("Signature Denied");
  }
}

async function copyToClipboard(response) {
  try {
    // focus from metamask back to browser
    window.focus(); // wait to finish focus

    await new Promise(resolve => setTimeout(resolve, 500)); // copy tx hash to clipboard

    await navigator.clipboard.writeText(response);
    document.getElementById("response-button").innerHTML = "Copied";
  } catch {
    // for metamask mobile android
    const input = document.createElement("input");
    input.type = "text";
    input.value = response;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.style = "visibility: hidden";
    document.getElementById("response-button").innerHTML = "Copied";
  }
}

function displayResponse(text, response) {
  // display error or response
  const responseText = document.getElementById("response-text");
  responseText.innerHTML = text;
  responseText.className = "active";

  if (response) {
    // display button to copy tx.hash or signature
    const responseButton = document.getElementById("response-button");
    responseButton.className = "active";

    responseButton.onclick = () => copyToClipboard(response);
  }
}
},{"regenerator-runtime/runtime":"KA2S","ethers":"iS6H","ethers/lib/utils":"if8b"}]},{},["Focm"], null)
//# sourceMappingURL=/web3wallet/game-web3wallet.52484710.js.map