/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Function Declaration
 */

// Test function declaration
function add(a, b) {
    return a + b;
}

if (typeof add !== "function") throw new Error("add should be a function");
if (add(2, 3) !== 5) throw new Error("add(2, 3) should return 5");

// Test function expression
var multiply = function(a, b) {
    return a * b;
};

if (typeof multiply !== "function") throw new Error("multiply should be a function");
if (multiply(3, 4) !== 12) throw new Error("multiply(3, 4) should return 12");

// Test function parameters
function greet(name) {
    return "Hello " + name;
}

if (greet("World") !== "Hello World") throw new Error("greet should concatenate strings");

// Test function without return
function noReturn() {
    var x = 1;
}

if (noReturn() !== undefined) throw new Error("Function without return should return undefined");