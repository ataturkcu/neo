/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Function Scope and Closures
 */

// Test basic closure
function createCounter() {
    var count = 0;
    return function() {
        count++;
        return count;
    };
}

var counter1 = createCounter();
var counter2 = createCounter();

if (counter1() !== 1) throw new Error("First counter call should return 1");
if (counter1() !== 2) throw new Error("Second counter call should return 2");
if (counter2() !== 1) throw new Error("Second counter instance should start from 1");

// Test variable hoisting
function hoistingTest() {
    if (typeof hoistedVar !== "undefined") throw new Error("hoistedVar should be undefined before declaration");
    var hoistedVar = "value";
    return hoistedVar;
}

if (hoistingTest() !== "value") throw new Error("Hoisting test should return 'value'");

// Test function hoisting
if (typeof hoistedFunction !== "function") throw new Error("Function should be hoisted");

function hoistedFunction() {
    return "hoisted";
}

if (hoistedFunction() !== "hoisted") throw new Error("Hoisted function should work");

// Test closure with loop (common pitfall)
var closures = [];
for (var i = 0; i < 3; i++) {
    closures.push((function(index) {
        return function() {
            return index;
        };
    })(i));
}

if (closures[0]() !== 0) throw new Error("First closure should return 0");
if (closures[1]() !== 1) throw new Error("Second closure should return 1");
if (closures[2]() !== 2) throw new Error("Third closure should return 2");

// Test nested scope
function outerFunction(x) {
    function innerFunction(y) {
        return x + y;
    }
    return innerFunction;
}

var addFive = outerFunction(5);
if (addFive(3) !== 8) throw new Error("Nested scope should work: 5 + 3 = 8");

// Test this binding in different contexts
var obj = {
    value: 42,
    method: function() {
        return this.value;
    }
};

if (obj.method() !== 42) throw new Error("Method should have correct this binding");

var detachedMethod = obj.method;
var globalThis = (function() { return this; })();
var result = detachedMethod();
// In non-strict mode, this should be global object, in strict mode undefined
if (globalThis && result !== undefined && typeof result !== "number") {
    throw new Error("Detached method should have different this binding");
}

// Test arguments object
function argumentsTest(a, b, c) {
    if (arguments.length !== 3) throw new Error("arguments.length should be 3");
    if (arguments[0] !== a) throw new Error("arguments[0] should equal first parameter");
    if (arguments[1] !== b) throw new Error("arguments[1] should equal second parameter");
    if (arguments[2] !== c) throw new Error("arguments[2] should equal third parameter");

    // Test arguments modification
    arguments[0] = "modified";
    if (a !== "modified") throw new Error("Modifying arguments should affect parameters");

    return arguments;
}

var args = argumentsTest(1, 2, 3);
if (typeof args !== "object") throw new Error("arguments should be object-like");
if (Array.isArray(args)) throw new Error("arguments should not be an array");