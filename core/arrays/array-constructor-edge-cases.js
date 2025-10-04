/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Constructor Edge Cases
 */

// Test Array() with no arguments
var arr1 = new Array();
if (arr1.length !== 0) throw new Error("new Array() should have length 0");

// Test Array with single numeric argument (creates holes)
var arr2 = new Array(3);
if (arr2.length !== 3) throw new Error("new Array(3) should have length 3");
if (0 in arr2) throw new Error("new Array(3) should not have property '0'");
if (1 in arr2) throw new Error("new Array(3) should not have property '1'");
if (2 in arr2) throw new Error("new Array(3) should not have property '2'");

// Test Array with multiple arguments
var arr3 = new Array(1, 2, 3);
if (arr3.length !== 3) throw new Error("new Array(1,2,3) should have length 3");
if (arr3[0] !== 1) throw new Error("arr3[0] should be 1");
if (arr3[1] !== 2) throw new Error("arr3[1] should be 2");
if (arr3[2] !== 3) throw new Error("arr3[2] should be 3");

// Test Array with single non-numeric argument
var arr4 = new Array("hello");
if (arr4.length !== 1) throw new Error("new Array('hello') should have length 1");
if (arr4[0] !== "hello") throw new Error("arr4[0] should be 'hello'");

// Test Array with negative number (should throw)
try {
    var arr5 = new Array(-1);
    throw new Error("new Array(-1) should throw RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) {
        throw new Error("new Array(-1) should throw RangeError, got: " + e.constructor.name);
    }
}

// Test Array with non-integer number (should throw)
try {
    var arr6 = new Array(3.14);
    throw new Error("new Array(3.14) should throw RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) {
        throw new Error("new Array(3.14) should throw RangeError, got: " + e.constructor.name);
    }
}

// Test Array without new
var arr7 = Array(1, 2, 3);
if (arr7.length !== 3) throw new Error("Array(1,2,3) should work without new");
if (arr7[0] !== 1) throw new Error("Array(1,2,3)[0] should be 1");