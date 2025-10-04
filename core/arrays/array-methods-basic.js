/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Array Methods
 */

// Test push and pop
var arr = [1, 2, 3];
var newLength = arr.push(4);
if (newLength !== 4) throw new Error("push should return new length");
if (arr.length !== 4) throw new Error("Array length should be 4");
if (arr[3] !== 4) throw new Error("Last element should be 4");

var popped = arr.pop();
if (popped !== 4) throw new Error("pop should return last element");
if (arr.length !== 3) throw new Error("Array length should be 3 after pop");

// Test shift and unshift
var shifted = arr.shift();
if (shifted !== 1) throw new Error("shift should return first element");
if (arr.length !== 2) throw new Error("Array length should be 2 after shift");
if (arr[0] !== 2) throw new Error("First element should be 2 after shift");

var newLengthUnshift = arr.unshift(0);
if (newLengthUnshift !== 3) throw new Error("unshift should return new length");
if (arr[0] !== 0) throw new Error("First element should be 0 after unshift");

// Test slice
var original = [1, 2, 3, 4, 5];
var sliced = original.slice(1, 3);
if (sliced.length !== 2) throw new Error("slice(1,3) should have length 2");
if (sliced[0] !== 2) throw new Error("slice first element should be 2");
if (sliced[1] !== 3) throw new Error("slice second element should be 3");
if (original.length !== 5) throw new Error("original array should be unchanged");

// Test join
var joinTest = [1, 2, 3];
var joined = joinTest.join(",");
if (joined !== "1,2,3") throw new Error("join should return '1,2,3'");

var joinedCustom = joinTest.join(" - ");
if (joinedCustom !== "1 - 2 - 3") throw new Error("custom join should work");

// Test reverse
var reverseTest = [1, 2, 3];
var reversed = reverseTest.reverse();
if (reversed !== reverseTest) throw new Error("reverse should return same array reference");
if (reverseTest[0] !== 3) throw new Error("First element should be 3 after reverse");
if (reverseTest[2] !== 1) throw new Error("Last element should be 1 after reverse");