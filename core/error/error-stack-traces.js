/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Error Stack Traces and Stack Property
 */

// Test basic stack property existence
var err1 = new Error("stack test");
var hasStack = "stack" in err1 || err1.stack !== undefined;

// Stack might not be supported in all engines, so we test conditionally
if (hasStack) {
    if (typeof err1.stack !== "string") throw new Error("Error stack should be string when present");
} else {
    // If stack is not supported, we can still test other aspects
}

// Test stack property on different error types
var typeErr = new TypeError("type error stack");
var refErr = new ReferenceError("ref error stack");
var rangeErr = new RangeError("range error stack");

if (hasStack) {
    if (typeof typeErr.stack !== "string") throw new Error("TypeError should have string stack");
    if (typeof refErr.stack !== "string") throw new Error("ReferenceError should have string stack");
    if (typeof rangeErr.stack !== "string") throw new Error("RangeError should have string stack");
}

// Test stack trace includes function names
function testFunction() {
    var err = new Error("test function error");
    return err;
}

var funcErr = testFunction();
if (hasStack && funcErr.stack) {
    // Stack trace should include function information (implementation-dependent)
    if (typeof funcErr.stack !== "string") throw new Error("Function error should have string stack");
    if (funcErr.stack.length === 0) throw new Error("Function error stack should not be empty");
}

// Test nested function stack traces
function outerFunction() {
    function innerFunction() {
        function deepFunction() {
            return new Error("deep error");
        }
        return deepFunction();
    }
    return innerFunction();
}

var nestedErr = outerFunction();
if (hasStack && nestedErr.stack) {
    if (typeof nestedErr.stack !== "string") throw new Error("Nested error should have string stack");
    // The stack should potentially contain multiple function names
}

// Test stack property is writable
var writableErr = new Error("writable test");
if (hasStack) {
    var originalStack = writableErr.stack;
    writableErr.stack = "custom stack trace";
    if (writableErr.stack !== "custom stack trace") throw new Error("Stack property should be writable");

    // Test with null
    writableErr.stack = null;
    if (writableErr.stack !== null) throw new Error("Stack should accept null");

    // Test with non-string
    writableErr.stack = 42;
    if (writableErr.stack !== 42) throw new Error("Stack should accept non-string values");
}

// Test stack trace in thrown errors
function throwingFunction() {
    throw new Error("thrown error");
}

try {
    throwingFunction();
    throw new Error("Should have thrown");
} catch (e) {
    if (hasStack && e.stack) {
        if (typeof e.stack !== "string") throw new Error("Thrown error should have string stack");
        if (e.stack.length === 0) throw new Error("Thrown error stack should not be empty");
    }
}

// Test stack trace with method calls
var testObject = {
    method: function() {
        return new Error("method error");
    },

    nestedMethod: function() {
        return this.method();
    }
};

var methodErr = testObject.nestedMethod();
if (hasStack && methodErr.stack) {
    if (typeof methodErr.stack !== "string") throw new Error("Method error should have string stack");
}

// Test stack property on Error.prototype
if (Error.prototype.hasOwnProperty("stack")) {
    // Some engines define stack on prototype, others on instances
    var protoStackDesc = Object.getOwnPropertyDescriptor(Error.prototype, "stack");
    if (protoStackDesc && typeof protoStackDesc.get !== "function") {
        // If it's not a getter, it should be writable
    }
}

// Test stack capture point
function captureStack() {
    var err = new Error("capture point");
    return err;
}

function callingFunction() {
    return captureStack();
}

var capturedErr = callingFunction();
if (hasStack && capturedErr.stack) {
    // Stack should be captured at Error creation, not at access
    if (typeof capturedErr.stack !== "string") throw new Error("Captured error should have string stack");
}

// Test Error.captureStackTrace if available
if (typeof Error.captureStackTrace === "function") {
    function stackCaptureTest() {
        var err = new Error("capture test");
        Error.captureStackTrace(err, stackCaptureTest);
        return err;
    }

    var captureErr = stackCaptureTest();
    if (captureErr.stack && typeof captureErr.stack !== "string") {
        throw new Error("captureStackTrace should produce string stack");
    }
}

// Test stack property with different error types in try-catch
try {
    var arr = [];
    arr.length = -1; // Should throw RangeError
} catch (e) {
    if (hasStack && e.stack) {
        if (typeof e.stack !== "string") throw new Error("Caught error should have string stack");
    }
}

try {
    undefinedVar.property; // Should throw ReferenceError
} catch (e) {
    if (hasStack && e.stack) {
        if (typeof e.stack !== "string") throw new Error("ReferenceError should have string stack");
    }
}

// Test stack property modification
var modErr = new Error("modifiable stack");
if (hasStack) {
    var origStack = modErr.stack;

    // Test deleting stack property
    delete modErr.stack;
    if (modErr.stack === origStack) throw new Error("Stack property should be deletable");

    // Test re-adding stack property
    modErr.stack = "new stack";
    if (modErr.stack !== "new stack") throw new Error("Stack property should be re-addable");
}

// Test stack with anonymous functions
var anonErr = (function() {
    return new Error("anonymous function error");
})();

if (hasStack && anonErr.stack) {
    if (typeof anonErr.stack !== "string") throw new Error("Anonymous function error should have string stack");
}

// Test stack with eval (if supported)
try {
    if (typeof eval !== "undefined") {
        var evalErr = eval("new Error('eval error')");
        if (hasStack && evalErr.stack) {
            if (typeof evalErr.stack !== "string") throw new Error("Eval error should have string stack");
        }
    }
} catch (e) {
    // eval might not be supported or might throw
}

// Test stack property descriptor
var descErr = new Error("descriptor test");
if (hasStack && descErr.hasOwnProperty("stack")) {
    var stackDesc = Object.getOwnPropertyDescriptor(descErr, "stack");
    if (stackDesc) {
        // Stack should typically be writable and configurable
        if (stackDesc.writable === false && stackDesc.set === undefined) {
            throw new Error("Stack property should be writable or have setter");
        }
    }
}

// Test stack formatting (basic patterns)
function formatTestOuter() {
    function formatTestInner() {
        return new Error("format test");
    }
    return formatTestInner();
}

var formatErr = formatTestOuter();
if (hasStack && formatErr.stack) {
    var stack = formatErr.stack;
    // Basic sanity checks for stack format
    if (stack.indexOf("Error") === -1 && stack.indexOf("format test") === -1) {
        // Stack should contain either the error type or message
        throw new Error("Stack should contain error information");
    }
}

// Test stack with constructors
function CustomError(message) {
    Error.call(this, message);
    this.name = "CustomError";
}
CustomError.prototype = Object.create(Error.prototype);

var customErr = new CustomError("custom error");
if (hasStack && customErr.stack) {
    if (typeof customErr.stack !== "string") throw new Error("Custom error should have string stack");
}

// Test stack property inheritance
var inheritErr = Object.create(Error.prototype);
Error.call(inheritErr, "inherit test");

if (hasStack && inheritErr.stack) {
    if (typeof inheritErr.stack !== "string") throw new Error("Inherited error should have string stack");
}

// Test stack with arrow functions (if supported)
try {
    var arrowTest = eval("(() => new Error('arrow function error'))()");
    if (hasStack && arrowTest.stack) {
        if (typeof arrowTest.stack !== "string") throw new Error("Arrow function error should have string stack");
    }
} catch (e) {
    // Arrow functions or eval might not be supported
}

// Test stack property with toString
var toStringErr = new Error("toString test");
if (hasStack) {
    var originalToString = toStringErr.toString();

    // Modify stack and check toString is independent
    toStringErr.stack = "modified stack";
    var newToString = toStringErr.toString();

    // toString should not be affected by stack modification
    if (newToString !== originalToString) {
        // This is implementation-dependent behavior
    }
}

// Test Error.stackTraceLimit if available
if (typeof Error.stackTraceLimit !== "undefined") {
    var originalLimit = Error.stackTraceLimit;

    Error.stackTraceLimit = 5;

    function deepCall1() {
        return deepCall2();
    }
    function deepCall2() {
        return deepCall3();
    }
    function deepCall3() {
        return deepCall4();
    }
    function deepCall4() {
        return deepCall5();
    }
    function deepCall5() {
        return new Error("deep stack test");
    }

    var deepErr = deepCall1();
    if (hasStack && deepErr.stack) {
        // Stack should be limited, but this is implementation-dependent
    }

    // Restore original limit
    Error.stackTraceLimit = originalLimit;
}

// Test stack with recursive functions
function recursiveTest(depth) {
    if (depth <= 0) {
        return new Error("recursive error");
    }
    return recursiveTest(depth - 1);
}

var recErr = recursiveTest(3);
if (hasStack && recErr.stack) {
    if (typeof recErr.stack !== "string") throw new Error("Recursive error should have string stack");
}

// Test stack property with getters and setters
var getterErr = new Error("getter test");
if (hasStack) {
    var stackValue = "custom stack";
    Object.defineProperty(getterErr, "stack", {
        get: function() { return stackValue; },
        set: function(val) { stackValue = val; },
        configurable: true
    });

    if (getterErr.stack !== "custom stack") throw new Error("Stack getter should work");

    getterErr.stack = "updated stack";
    if (getterErr.stack !== "updated stack") throw new Error("Stack setter should work");
}

// Test stack with non-Error objects
var nonError = {};
Error.call(nonError, "non-error object");

if (hasStack && nonError.stack) {
    if (typeof nonError.stack !== "string") throw new Error("Non-error object should have string stack");
}

// Test stack preservation across property access
var preserveErr = new Error("preserve test");
if (hasStack) {
    var firstAccess = preserveErr.stack;
    var secondAccess = preserveErr.stack;

    // Multiple accesses should return the same value
    if (typeof firstAccess === "string" && firstAccess !== secondAccess) {
        throw new Error("Stack should be preserved across accesses");
    }
}

// Test stack with bound functions
function boundTest() {
    return new Error("bound function error");
}

var boundFn = boundTest.bind(null);
var boundErr = boundFn();

if (hasStack && boundErr.stack) {
    if (typeof boundErr.stack !== "string") throw new Error("Bound function error should have string stack");
}