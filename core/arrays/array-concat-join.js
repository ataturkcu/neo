/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array concat and join methods
 */

// Test concat basic functionality
var arr1 = [1, 2];
var arr2 = [3, 4];
var concatenated = arr1.concat(arr2);

if (!Array.isArray(concatenated)) throw new Error("concat should return array");
if (concatenated.length !== 4) throw new Error("concat should have 4 elements");
if (concatenated[0] !== 1) throw new Error("concat[0] should be 1");
if (concatenated[1] !== 2) throw new Error("concat[1] should be 2");
if (concatenated[2] !== 3) throw new Error("concat[2] should be 3");
if (concatenated[3] !== 4) throw new Error("concat[3] should be 4");

// Original arrays should be unchanged
if (arr1.length !== 2) throw new Error("Original arr1 should be unchanged");
if (arr2.length !== 2) throw new Error("Original arr2 should be unchanged");

// Test concat with multiple arrays
var multi = [1].concat([2, 3], [4, 5], [6]);
if (multi.length !== 6) throw new Error("Multi concat should have 6 elements");
if (multi[5] !== 6) throw new Error("Multi concat last element should be 6");

// Test concat with non-array arguments
var mixed = [1, 2].concat(3, [4, 5], 6);
if (mixed.length !== 6) throw new Error("Mixed concat should have 6 elements");
if (mixed[2] !== 3) throw new Error("Scalar argument should be added");
if (mixed[5] !== 6) throw new Error("Last scalar should be added");

// Test concat with empty arrays
var withEmpty = [1, 2].concat([], [3, 4], []);
if (withEmpty.length !== 4) throw new Error("Concat with empty arrays should work");

// Test concat flattens only one level
var nested = [1].concat([[2, 3], [4]]);
if (nested.length !== 3) throw new Error("Nested concat should have 3 elements");
if (!Array.isArray(nested[1])) throw new Error("Nested arrays should remain nested");
if (nested[1][0] !== 2) throw new Error("Nested array content should be preserved");

// Test join with default separator
var joinTest = [1, 2, 3, 4];
var joined = joinTest.join();
if (joined !== "1,2,3,4") throw new Error("Default join should use comma separator");

// Test join with custom separator
var customJoin = joinTest.join(" | ");
if (customJoin !== "1 | 2 | 3 | 4") throw new Error("Custom separator should work");

// Test join with empty string separator
var noSep = joinTest.join("");
if (noSep !== "1234") throw new Error("Empty separator should work");

// Test join with mixed types
var mixedTypes = [1, "hello", true, null, undefined];
var mixedJoin = mixedTypes.join("-");
if (mixedJoin !== "1-hello-true--") throw new Error("Mixed types join should convert to strings");

// Test join with sparse array
var sparse = [1, , 3, , 5];
var sparseJoin = sparse.join(",");
if (sparseJoin !== "1,,3,,5") throw new Error("Sparse array join should treat holes as empty strings");

// Test join on empty array
var emptyJoin = [].join(",");
if (emptyJoin !== "") throw new Error("Empty array join should return empty string");

// Test join with single element
var singleJoin = [42].join(",");
if (singleJoin !== "42") throw new Error("Single element join should not include separator");

// Test that original array is unchanged by join
var original = [1, 2, 3];
original.join("-");
if (original.length !== 3) throw new Error("join should not modify original array");
if (original[0] !== 1) throw new Error("join should not modify original array elements");

// Test concat returns new array (not same reference)
var original1 = [1, 2];
var original2 = [3, 4];
var result = original1.concat(original2);

if (result === original1) throw new Error("concat should return new array");
if (result === original2) throw new Error("concat should return new array");

// Test concat with no arguments
var noArgs = [1, 2, 3].concat();
if (!Array.isArray(noArgs)) throw new Error("concat with no args should return array");
if (noArgs.length !== 3) throw new Error("concat with no args should copy array");
if (noArgs === original1) throw new Error("concat with no args should return new array");