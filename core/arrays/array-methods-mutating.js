/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Mutating Methods (splice, sort, fill, copyWithin)
 */

// Test splice - removal
var arr1 = [1, 2, 3, 4, 5];
var removed = arr1.splice(1, 2);

if (!Array.isArray(removed)) throw new Error("splice should return array of removed elements");
if (removed.length !== 2) throw new Error("splice should remove 2 elements");
if (removed[0] !== 2) throw new Error("removed[0] should be 2");
if (removed[1] !== 3) throw new Error("removed[1] should be 3");
if (arr1.length !== 3) throw new Error("array should have 3 elements after splice");
if (arr1[0] !== 1) throw new Error("arr1[0] should be 1");
if (arr1[1] !== 4) throw new Error("arr1[1] should be 4");
if (arr1[2] !== 5) throw new Error("arr1[2] should be 5");

// Test splice - insertion
var arr2 = [1, 2, 5];
var inserted = arr2.splice(2, 0, 3, 4);

if (inserted.length !== 0) throw new Error("splice with no removal should return empty array");
if (arr2.length !== 5) throw new Error("array should have 5 elements after insertion");
if (arr2[2] !== 3) throw new Error("arr2[2] should be 3");
if (arr2[3] !== 4) throw new Error("arr2[3] should be 4");
if (arr2[4] !== 5) throw new Error("arr2[4] should be 5");

// Test splice - replacement
var arr3 = [1, 2, 3, 4];
var replaced = arr3.splice(1, 2, "a", "b", "c");

if (replaced.length !== 2) throw new Error("splice should return replaced elements");
if (arr3.length !== 5) throw new Error("array should have 5 elements after replacement");
if (arr3[1] !== "a") throw new Error("arr3[1] should be 'a'");
if (arr3[2] !== "b") throw new Error("arr3[2] should be 'b'");
if (arr3[3] !== "c") throw new Error("arr3[3] should be 'c'");

// Test sort - numbers
var numbers = [3, 1, 4, 1, 5, 9, 2, 6];
var sorted = numbers.sort();

if (sorted !== numbers) throw new Error("sort should return the same array reference");
// Default sort is lexicographic
if (numbers[0] !== 1) throw new Error("Lexicographic sort: first element should be 1");

// Test sort with compare function
var numericSort = [10, 5, 40, 25, 1000, 1].sort(function(a, b) {
    return a - b;
});

if (numericSort[0] !== 1) throw new Error("Numeric sort: first should be 1");
if (numericSort[5] !== 1000) throw new Error("Numeric sort: last should be 1000");

// Test reverse
var original = [1, 2, 3];
var reversed = original.reverse();

if (reversed !== original) throw new Error("reverse should return same array reference");
if (original[0] !== 3) throw new Error("After reverse: first should be 3");
if (original[2] !== 1) throw new Error("After reverse: last should be 1");

// Test fill (ES2015)
if (typeof Array.prototype.fill === "function") {
    var fillArr = [1, 2, 3, 4, 5];
    var filled = fillArr.fill("x", 1, 4);

    if (filled !== fillArr) throw new Error("fill should return same array reference");
    if (fillArr[0] !== 1) throw new Error("fill should not affect index 0");
    if (fillArr[1] !== "x") throw new Error("fill should affect index 1");
    if (fillArr[2] !== "x") throw new Error("fill should affect index 2");
    if (fillArr[3] !== "x") throw new Error("fill should affect index 3");
    if (fillArr[4] !== 5) throw new Error("fill should not affect index 4");
}

// Test copyWithin (ES2015)
if (typeof Array.prototype.copyWithin === "function") {
    var copyArr = [1, 2, 3, 4, 5];
    var copied = copyArr.copyWithin(0, 3);

    if (copied !== copyArr) throw new Error("copyWithin should return same array reference");
    if (copyArr[0] !== 4) throw new Error("copyWithin: index 0 should be 4");
    if (copyArr[1] !== 5) throw new Error("copyWithin: index 1 should be 5");
    if (copyArr.length !== 5) throw new Error("copyWithin should not change length");

    var copyArr2 = [1, 2, 3, 4, 5];
    copyArr2.copyWithin(2, 0, 2);
    if (copyArr2[2] !== 1) throw new Error("copyWithin with end: index 2 should be 1");
    if (copyArr2[3] !== 2) throw new Error("copyWithin with end: index 3 should be 2");
}