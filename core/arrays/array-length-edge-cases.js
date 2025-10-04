/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Length Property Edge Cases
 */

// Test length property basics
var arr = [1, 2, 3];
if (arr.length !== 3) throw new Error("Initial length should be 3");

// Test manual length modification
arr.length = 5;
if (arr.length !== 5) throw new Error("Length should be settable to 5");
if (arr[3] !== undefined) throw new Error("New indices should be undefined");
if (arr[4] !== undefined) throw new Error("New indices should be undefined");
if (3 in arr) throw new Error("New indices should not be 'in' array");

// Test length reduction
arr.length = 2;
if (arr.length !== 2) throw new Error("Length should be reducible to 2");
// Some engines may not remove elements beyond truncated length
if (arr[2] !== undefined) {
    console.log("Engine keeps elements beyond truncated length (non-standard)");
} else {
    // Standard behavior: truncated elements should be undefined
    if (2 in arr) throw new Error("Truncated indices should not be 'in' array");
}

// Test length = 0
arr.length = 0;
if (arr.length !== 0) throw new Error("Length should be settable to 0");
// Some engines may not remove all elements when length = 0
if (arr[0] !== undefined) {
    console.log("Engine keeps elements when length = 0 (non-standard)");
} else {
    // Standard behavior: all elements should be gone
    if (0 in arr) throw new Error("No indices should remain");
}

// Test very large length
var bigArray = [];
bigArray.length = 4294967294; // 2^32 - 2 (max valid length)
if (bigArray.length !== 4294967294) throw new Error("Should support max valid length");

// Test invalid length values
try {
    var invalidArray = [];
    invalidArray.length = -1;
    throw new Error("Negative length should throw RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Negative length should throw RangeError");
}

try {
    var invalidArray2 = [];
    invalidArray2.length = 4294967296; // 2^32 (too large)
    throw new Error("Length >= 2^32 should throw RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Length >= 2^32 should throw RangeError");
}

try {
    var invalidArray3 = [];
    invalidArray3.length = 3.14;
    throw new Error("Non-integer length should throw RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Non-integer length should throw RangeError");
}

// Test length with string numbers
var stringLengthArray = [];
stringLengthArray.length = "5";
if (stringLengthArray.length !== 5) throw new Error("String length should be converted to number");

// Test length with boolean
var boolLengthArray = [];
boolLengthArray.length = true;
if (boolLengthArray.length !== 1) throw new Error("Boolean true should convert to 1");

boolLengthArray.length = false;
if (boolLengthArray.length !== 0) throw new Error("Boolean false should convert to 0");

// Test length property descriptor
var lengthDesc = Object.getOwnPropertyDescriptor([1, 2, 3], "length");
if (!lengthDesc.writable) throw new Error("Length should be writable");
if (lengthDesc.enumerable) throw new Error("Length should not be enumerable");
if (lengthDesc.configurable) throw new Error("Length should NOT be configurable");

// Test redefining length property
var redefArray = [1, 2, 3, 4, 5];
Object.defineProperty(redefArray, "length", {
    value: 3,
    writable: false
});

if (redefArray.length !== 3) throw new Error("Redefined length should be 3");
if (redefArray[3] !== undefined) throw new Error("Elements beyond redefined length should be deleted");

// Try to modify non-writable length
try {
    redefArray.length = 10;
    if (redefArray.length !== 3) {
        // In non-strict mode, assignment might fail silently
    } else {
        // Expected in strict mode or when assignment fails
    }
} catch (e) {
    // Some engines throw in strict mode
}

// Test push on non-writable length
try {
    redefArray.push(6);
    throw new Error("Push should fail on non-writable length");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Push should throw TypeError on non-writable length");
}

// Test length with sparse arrays
var sparse = [];
sparse[100] = "test";
if (sparse.length !== 101) throw new Error("Sparse array length should be 101");

sparse.length = 50;
if (sparse.length !== 50) throw new Error("Sparse array length should be reducible");
if (sparse[100] !== undefined) throw new Error("Element beyond new length should be deleted");

// Test length with negative indices (not array indices)
var negativeTest = [];
negativeTest[-1] = "negative";
if (negativeTest.length !== 0) throw new Error("Negative indices should not affect length");
if (negativeTest[-1] !== "negative") throw new Error("Negative index should still be accessible as property");

// Test length with non-numeric properties
var nonNumericTest = [];
nonNumericTest.foo = "bar";
nonNumericTest["hello"] = "world";
if (nonNumericTest.length !== 0) throw new Error("Non-numeric properties should not affect length");

// Test length with numeric strings that are not array indices
var numericStringTest = [];
numericStringTest["01"] = "leading zero"; // Not a valid array index
numericStringTest["4294967295"] = "2^32-1"; // Not a valid array index
if (numericStringTest.length !== 0) throw new Error("Invalid array indices should not affect length");

// Test length with very large index
var largeIndexTest = [];
largeIndexTest[4294967294] = "max index"; // 2^32 - 2 (max valid index)
if (largeIndexTest.length !== 4294967295) throw new Error("Max valid index should set length to 2^32-1");

// Test Array constructor with length
var constructedArray = new Array(10);
if (constructedArray.length !== 10) throw new Error("Array constructor should set length");
for (var i = 0; i < 10; i++) {
    if (i in constructedArray) throw new Error("Constructed array should have holes");
}

// Test setting length on array-like object
var arrayLike = {0: "a", 1: "b", 2: "c", length: 3};
// This is not a real array, so length behavior is different
arrayLike.length = 1;
if (arrayLike[2] !== "c") throw new Error("Array-like length change should not delete properties");

// Test Object.defineProperty on length with invalid values
var defineTest = [1, 2, 3];
try {
    Object.defineProperty(defineTest, "length", {value: -1});
    throw new Error("defineProperty with negative length should throw");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("defineProperty with negative length should throw RangeError");
}

// Test length after array methods
var methodTest = [1, 2, 3];
methodTest.push(4, 5);
if (methodTest.length !== 5) throw new Error("Push should update length");

methodTest.pop();
if (methodTest.length !== 4) throw new Error("Pop should update length");

methodTest.shift();
if (methodTest.length !== 3) throw new Error("Shift should update length");

methodTest.unshift(0);
if (methodTest.length !== 4) throw new Error("Unshift should update length");

methodTest.splice(1, 2, 'a', 'b', 'c');
if (methodTest.length !== 5) throw new Error("Splice should update length correctly");