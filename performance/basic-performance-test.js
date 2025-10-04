/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Performance Characteristics
 */

// Test array creation performance
var start = Date.now();
var largeArray = [];
for (var i = 0; i < 10000; i++) {
    largeArray.push(i);
}
var arrayTime = Date.now() - start;

if (largeArray.length !== 10000) throw new Error("Array should have 10000 elements");

// Test object creation performance
start = Date.now();
var objects = [];
for (var i = 0; i < 1000; i++) {
    objects.push({
        id: i,
        name: "object" + i,
        value: Math.random()
    });
}
var objectTime = Date.now() - start;

if (objects.length !== 1000) throw new Error("Should create 1000 objects");

// Test string operations performance
start = Date.now();
var str = "";
for (var i = 0; i < 1000; i++) {
    str += "test" + i;
}
var stringTime = Date.now() - start;

if (str.length === 0) throw new Error("String should not be empty");

// Test function call performance
function simpleFunction(x) {
    return x * 2;
}

start = Date.now();
var result = 0;
for (var i = 0; i < 10000; i++) {
    result += simpleFunction(i);
}
var functionTime = Date.now() - start;

if (result === 0) throw new Error("Function calls should produce result");

// Basic performance test passes if all operations complete without error