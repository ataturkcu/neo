/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Arrow Functions Basic Functionality (ES2015)
 */

// Test basic arrow function syntax
var add = (a, b) => a + b;
if (typeof add !== "function") throw new Error("Arrow function should be a function");
if (add(2, 3) !== 5) throw new Error("Arrow function should work: 2 + 3 = 5");

// Test single parameter (no parentheses)
var square = x => x * x;
if (square(4) !== 16) throw new Error("Single param arrow function should work");

// Test no parameters
var getFortyTwo = () => 42;
if (getFortyTwo() !== 42) throw new Error("No param arrow function should work");

// Test block body
var complexFunction = (x, y) => {
    var result = x + y;
    return result * 2;
};
if (complexFunction(3, 4) !== 14) throw new Error("Block body arrow function should work");

// Test this binding (arrow functions inherit this)
var obj = {
    value: 10,
    getArrowFunction: function() {
        return () => this.value;
    },
    getRegularFunction: function() {
        return function() { return this.value; };
    }
};

var arrowFn = obj.getArrowFunction();
var regularFn = obj.getRegularFunction();

if (arrowFn() !== 10) throw new Error("Arrow function should inherit this from enclosing scope");

// Test that arrow functions cannot be constructed
var arrowConstructor = () => {};
try {
    new arrowConstructor();
    throw new Error("Arrow functions should not be constructible");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("new arrow function should throw TypeError");
}

// Test that arrow functions don't have their own arguments object
function testArgumentsInArrow() {
    var arrowFn = () => arguments; // Should access outer function's arguments
    return arrowFn();
}

var result = testArgumentsInArrow(1, 2, 3);
if (result.length !== 3 || result[0] !== 1) {
    throw new Error("Arrow function should access outer arguments object");
}

// Test that arrow functions don't have their own arguments but can access outer ones
(function() {
    var outerArguments = arguments;
    var arrowInFunction = () => arguments;
    var arrowResult = arrowInFunction();
    if (arrowResult !== outerArguments) {
        throw new Error("Arrow function should access outer function's arguments");
    }
})(1, 2, 3);

// Test arrow function with rest parameters
var sumAll = (...args) => args.reduce((a, b) => a + b, 0);
if (sumAll(1, 2, 3, 4) !== 10) throw new Error("Arrow function with rest parameters should work");

// Test arrow function returning object literal (needs parentheses)
var createObject = (x, y) => ({x: x, y: y});
var obj2 = createObject(1, 2);
if (typeof obj2 !== "object") throw new Error("Arrow function should return object");
if (obj2.x !== 1 || obj2.y !== 2) throw new Error("Returned object should have correct properties");

// Test nested arrow functions
var outerArrow = x => y => x + y;
var innerFn = outerArrow(5);
if (typeof innerFn !== "function") throw new Error("Nested arrow should return function");
if (innerFn(3) !== 8) throw new Error("Nested arrow functions should work");

// Test arrow function with default parameters
var withDefaults = (a = 1, b = 2) => a + b;
if (withDefaults() !== 3) throw new Error("Arrow function with defaults should work");
if (withDefaults(5) !== 7) throw new Error("Arrow function partial defaults should work");
if (withDefaults(5, 10) !== 15) throw new Error("Arrow function override defaults should work");

// Test arrow function in array methods
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(x => x * 2);
if (!Array.isArray(doubled)) throw new Error("map with arrow function should return array");
if (doubled.length !== 5) throw new Error("mapped array should have same length");
if (doubled[0] !== 2) throw new Error("map with arrow function should work");

var evens = numbers.filter(x => x % 2 === 0);
if (evens.length !== 2) throw new Error("filter with arrow function should work");
if (evens[0] !== 2 || evens[1] !== 4) throw new Error("filter should return correct elements");

// Test that arrow functions don't have prototype property
var arrowFn2 = () => {};
if (arrowFn2.prototype !== undefined) throw new Error("Arrow functions should not have prototype property");

// Test arrow function with destructuring
var extractFirst = ([first]) => first;
if (extractFirst([10, 20, 30]) !== 10) throw new Error("Arrow function with destructuring should work");

var extractProp = ({name}) => name;
if (extractProp({name: "test", age: 25}) !== "test") throw new Error("Arrow function with object destructuring should work");