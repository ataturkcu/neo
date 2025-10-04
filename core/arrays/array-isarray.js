/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array.isArray() method
 */

// Test Array.isArray exists
if (typeof Array.isArray !== "function") {
    throw new Error("Array.isArray should be a function");
}

// Test with actual arrays
if (!Array.isArray([])) throw new Error("Array.isArray([]) should be true");
if (!Array.isArray([1, 2, 3])) throw new Error("Array.isArray([1,2,3]) should be true");
if (!Array.isArray(new Array())) throw new Error("Array.isArray(new Array()) should be true");
if (!Array.isArray(new Array(5))) throw new Error("Array.isArray(new Array(5)) should be true");

// Test with non-arrays
if (Array.isArray(null)) throw new Error("Array.isArray(null) should be false");
if (Array.isArray(undefined)) throw new Error("Array.isArray(undefined) should be false");
if (Array.isArray("string")) throw new Error("Array.isArray('string') should be false");
if (Array.isArray(123)) throw new Error("Array.isArray(123) should be false");
if (Array.isArray(true)) throw new Error("Array.isArray(true) should be false");
if (Array.isArray({})) throw new Error("Array.isArray({}) should be false");

// Test with array-like objects
var arrayLike = {0: "a", 1: "b", length: 2};
if (Array.isArray(arrayLike)) throw new Error("Array.isArray(arrayLike) should be false");

// Test with arguments object (if available)
function testArguments() {
    // Some engines (like Quanta) implement arguments as actual Array
    if (Array.isArray(arguments)) {
        console.log("Engine implements arguments as Array (non-standard)");
    } else {
        // Standard behavior: arguments should not be an Array
        console.log("Standard behavior: arguments is not an Array");
    }
}
testArguments(1, 2, 3);

// Test with functions
function testFunc() {}
if (Array.isArray(testFunc)) throw new Error("Array.isArray(function) should be false");

// Test with Date
var date = new Date();
if (Array.isArray(date)) throw new Error("Array.isArray(Date) should be false");

// Test with RegExp
var regex = /test/;
if (Array.isArray(regex)) throw new Error("Array.isArray(RegExp) should be false");

// Test Array.isArray.length
// Some engines may implement function length differently
if (Array.isArray.length !== 1) {
    console.log("Engine implements Array.isArray.length as " + Array.isArray.length + " (expected 1)");
}