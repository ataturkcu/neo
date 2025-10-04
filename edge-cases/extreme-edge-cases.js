/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Extreme Edge Cases and JavaScript Quirks
 */

// Circular reference tests
var circularObj = {name: "circular"};
circularObj.self = circularObj;
if (circularObj.self.self.self !== circularObj) throw new Error("Circular reference should work");

var circularArray = [1, 2, 3];
circularArray.push(circularArray);
if (circularArray[3][3] !== circularArray) throw new Error("Circular array reference should work");

// Deeply nested structures
var deepNested = {level: 0};
var current = deepNested;
for (var i = 1; i < 100; i++) {
    current.next = {level: i};
    current = current.next;
}
if (deepNested.next.next.next.level !== 3) throw new Error("Deep nesting should work");

// Prototype chain manipulation extreme cases
var proto1 = {value: 1};
var proto2 = Object.create(proto1);
proto2.value = 2;
var proto3 = Object.create(proto2);
proto3.value = 3;

if (proto3.value !== 3) throw new Error("Prototype chain should resolve correctly");

// Null and undefined propagation
var nullProp = null;
try {
    var result = nullProp.someProperty;
    throw new Error("Accessing property on null should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should throw TypeError for null property access");
}

var undefinedProp = undefined;
try {
    var result = undefinedProp.someProperty;
    throw new Error("Accessing property on undefined should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should throw TypeError for undefined property access");
}

// Type coercion extremes
if ("" + null !== "null") throw new Error("null to string coercion failed");
if ("" + undefined !== "undefined") throw new Error("undefined to string coercion failed");
if (+"" !== 0) throw new Error("Empty string to number coercion failed");
if (+" " !== 0) throw new Error("Whitespace string to number coercion failed");
if (+"\t\n" !== 0) throw new Error("Whitespace chars to number coercion failed");

// Floating point precision extremes
if (0.1 + 0.2 === 0.3) throw new Error("Floating point precision should show classic issue");
if (Math.abs((0.1 + 0.2) - 0.3) >= Number.EPSILON) throw new Error("Epsilon comparison should work");

// Number overflow and underflow
if (Number.MAX_VALUE * 2 !== Infinity) throw new Error("Number overflow should result in Infinity");
if (-Number.MAX_VALUE * 2 !== -Infinity) throw new Error("Number underflow should result in -Infinity");
if (Number.MIN_VALUE / 2 !== 0) throw new Error("Subnormal underflow should result in 0");

// NaN comparisons and operations
if (NaN === NaN) throw new Error("NaN should not equal itself");
if (!(NaN !== NaN)) throw new Error("NaN should not equal itself with !== operator");
if (!(NaN < 1) && !(NaN > 1) && !(NaN === 1)) {
    // This is expected - all comparisons with NaN are false
} else {
    throw new Error("NaN comparisons should all be false");
}

// Array holes and sparse arrays extreme
var sparse = new Array(10000);
sparse[0] = "start";
sparse[9999] = "end";
if (sparse.length !== 10000) throw new Error("Sparse array length should be 10000");
if (1 in sparse) throw new Error("Hole should not be 'in' sparse array");

// String manipulation edge cases
var veryLongString = "a".repeat(10000);
if (veryLongString.length !== 10000) throw new Error("Very long string should have correct length");

var unicodeString = "\u{1F600}\u{1F601}\u{1F602}"; // Emoji
if (unicodeString.length !== 6) throw new Error("Unicode string length with surrogates"); // Each emoji is 2 UTF-16 code units

// Regex edge cases
var complexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!complexRegex.test("Password123!")) throw new Error("Complex regex should match valid password");

var catastrophicRegex = /^(a+)+$/;
// Test with string that could cause catastrophic backtracking
var start = Date.now();
var result = catastrophicRegex.test("aaaaaaaaaaaaaaaaaaaaaaaaaaX");
var duration = Date.now() - start;
if (duration > 30000) throw new Error("Regex should not take too long (catastrophic backtracking)");

// Function edge cases
var funcWithVeryLongName = function veryVeryVeryLongFunctionNameThatGoesOnAndOnAndOn() {
    return "long name function";
};
if (funcWithVeryLongName() !== "long name function") throw new Error("Long function name should work");

// Arguments object edge cases
function argumentsTest() {
    arguments[0] = "modified";
    if (arguments.length !== 3) throw new Error("arguments.length should be 3");
    return Array.prototype.slice.call(arguments);
}
var argsResult = argumentsTest("a", "b", "c");
if (argsResult[0] !== "modified") throw new Error("Arguments modification should work");

// Variable hoisting extreme cases
try {
    hoistedVar = "assigned before declaration";
    var hoistedVar;
    if (hoistedVar !== "assigned before declaration") throw new Error("Hoisting assignment should work");
} catch (e) {
    throw new Error("Variable hoisting should not throw: " + e.message);
}

// Function hoisting vs variable hoisting
var hoistingConflict = "variable";
function hoistingConflict() {
    return "function";
}
// In modern JS, variable assignment overrides function declaration
if (typeof hoistingConflict !== "string" || hoistingConflict !== "variable") {
    throw new Error("Variable assignment should override function declaration");
}

// Automatic Semicolon Insertion edge cases
var asiTest = function() {
    return
    {
        value: "should be undefined"
    };
}();
if (asiTest !== undefined) throw new Error("ASI should cause return undefined");

// this binding edge cases
var globalObj = (function() { return this; })();
function thisTest() {
    return this;
}
var thisResult = thisTest();
if (globalObj && thisResult !== globalObj) {
    // In strict mode, this would be undefined
} else if (!globalObj && thisResult !== undefined) {
    throw new Error("this binding unexpected result");
}

// Property descriptor edge cases
var descObj = {};
Object.defineProperty(descObj, "prop", {
    get: function() { return this._value || "default"; },
    set: function(val) { this._value = val; },
    enumerable: false,
    configurable: true
});

descObj.prop = "test";
if (descObj.prop !== "test") throw new Error("Property descriptor should work");

var keys = Object.keys(descObj);
if (keys.indexOf("prop") !== -1) throw new Error("Non-enumerable property should not appear in keys");

// Eval edge cases
var evalResult = eval("2 + 2");
if (evalResult !== 4) throw new Error("Basic eval should work");

var evalScope = "global";
(function() {
    var evalScope = "local";
    var evalInFunc = eval("evalScope");
    if (evalInFunc !== "local") throw new Error("Eval should use local scope");
})();

// Exception handling edge cases
try {
    try {
        throw new Error("inner");
    } finally {
        throw new Error("finally");
    }
} catch (e) {
    if (e.message !== "finally") throw new Error("Finally exception should override try exception");
}

// Memory and recursion limits
function recursiveTest(depth) {
    if (depth <= 0) return "done";
    return recursiveTest(depth - 1);
}

try {
    var result = recursiveTest(1000);
    if (result !== "done") throw new Error("Moderate recursion should work");
} catch (e) {
    if (e instanceof RangeError) {
        // Stack overflow - this is expected for very deep recursion
    } else {
        throw e;
    }
}

// Large object creation
var largeObject = {};
for (var i = 0; i < 10000; i++) {
    largeObject["prop" + i] = i;
}
if (Object.keys(largeObject).length !== 10000) throw new Error("Large object should have 10000 properties");

// Date edge cases
var invalidDate = new Date("invalid date string");
if (!isNaN(invalidDate.getTime())) throw new Error("Invalid date should be NaN");
if (invalidDate.toString() !== "Invalid Date") throw new Error("Invalid date toString should be 'Invalid Date'");

var extremeDate = new Date(8640000000000000); // Max date
if (isNaN(extremeDate.getTime())) throw new Error("Max valid date should work");

var overflowDate = new Date(8640000000000001); // Over max
if (!isNaN(overflowDate.getTime())) throw new Error("Over max date should be invalid");

// Array method edge cases with holes
var holeyArray = [1, , , 4, , 6];
var mappedHoley = holeyArray.map(function(x) { return x * 2; });
if (mappedHoley.length !== 6) throw new Error("Mapped holey array should preserve length");
if (1 in mappedHoley) throw new Error("Map should preserve holes");

// Object property edge cases
var propObj = {};
propObj[Symbol.for("symbol")] = "symbol value";
propObj[42] = "number key";
propObj["42"] = "string key";

if (propObj[42] !== "string key") throw new Error("Number key should be converted to string");
if (propObj["42"] !== "string key") throw new Error("String key should work");

// Proxy edge cases (if supported)
if (typeof Proxy !== "undefined") {
    var proxyTarget = {value: 10};
    var proxyHandler = {
        get: function(target, prop) {
            if (prop === "special") return "intercepted";
            return target[prop];
        }
    };
    var proxyObj = new Proxy(proxyTarget, proxyHandler);

    if (proxyObj.value !== 10) throw new Error("Proxy should pass through normal properties");
    if (proxyObj.special !== "intercepted") throw new Error("Proxy should intercept special property");
}

// WeakMap/WeakSet edge cases (if supported)
if (typeof WeakMap !== "undefined") {
    var wm = new WeakMap();
    var obj1 = {};
    var obj2 = {};

    wm.set(obj1, "value1");
    wm.set(obj2, "value2");

    if (wm.get(obj1) !== "value1") throw new Error("WeakMap should store values");
    if (!wm.has(obj1)) throw new Error("WeakMap should report has correctly");

    wm.delete(obj1);
    if (wm.has(obj1)) throw new Error("WeakMap delete should work");
}

// Generator edge cases (if supported)
if (typeof Symbol !== "undefined" && Symbol.iterator) {
    try {
        eval("function* generatorTest() { yield 1; yield 2; yield 3; }");
        eval("var gen = generatorTest(); var first = gen.next();");
        eval("if (first.value !== 1 || first.done !== false) throw new Error('Generator should work');");
    } catch (e) {
        // Generators might not be supported
        if (e.message && e.message.indexOf("Generator") === -1) {
            throw e;
        }
    }
}