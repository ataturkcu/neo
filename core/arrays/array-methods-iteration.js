/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Iteration Methods (forEach, map, filter, reduce, etc.)
 */

// Test forEach
var arr = [1, 2, 3];
var forEachResults = [];
arr.forEach(function(value, index, array) {
    forEachResults.push(value * 2);
    if (array !== arr) throw new Error("forEach should pass the array as third argument");
});

if (forEachResults.length !== 3) throw new Error("forEach should iterate over all elements");
if (forEachResults[0] !== 2) throw new Error("forEach result[0] should be 2");
if (forEachResults[1] !== 4) throw new Error("forEach result[1] should be 4");
if (forEachResults[2] !== 6) throw new Error("forEach result[2] should be 6");

// Test map
var mapped = arr.map(function(value, index) {
    return value + index;
});

if (!Array.isArray(mapped)) throw new Error("map should return an array");
if (mapped.length !== 3) throw new Error("mapped array should have same length");
if (mapped[0] !== 1) throw new Error("map result[0] should be 1 (1+0)");
if (mapped[1] !== 3) throw new Error("map result[1] should be 3 (2+1)");
if (mapped[2] !== 5) throw new Error("map result[2] should be 5 (3+2)");

// Test filter
var filtered = arr.filter(function(value) {
    return value > 1;
});

if (!Array.isArray(filtered)) throw new Error("filter should return an array");
if (filtered.length !== 2) throw new Error("filtered array should have 2 elements");
if (filtered[0] !== 2) throw new Error("filtered[0] should be 2");
if (filtered[1] !== 3) throw new Error("filtered[1] should be 3");

// Test reduce
var sum = arr.reduce(function(acc, value) {
    return acc + value;
}, 0);

if (sum !== 6) throw new Error("reduce sum should be 6");

var sumNoInitial = arr.reduce(function(acc, value) {
    return acc + value;
});

if (sumNoInitial !== 6) throw new Error("reduce without initial should work");

// Test reduceRight
var concatRight = [1, 2, 3].reduceRight(function(acc, value) {
    return acc + value;
}, "");

if (concatRight !== "321") throw new Error("reduceRight should process right-to-left");

// Test every
var allPositive = arr.every(function(value) {
    return value > 0;
});

if (!allPositive) throw new Error("every should return true when all elements match");

var allGreaterThanTwo = arr.every(function(value) {
    return value > 2;
});

if (allGreaterThanTwo) throw new Error("every should return false when not all elements match");

// Test some
var someGreaterThanTwo = arr.some(function(value) {
    return value > 2;
});

if (!someGreaterThanTwo) throw new Error("some should return true when any element matches");

var someGreaterThanFive = arr.some(function(value) {
    return value > 5;
});

if (someGreaterThanFive) throw new Error("some should return false when no elements match");

// Test find
var found = arr.find(function(value) {
    return value > 1;
});

if (found !== 2) throw new Error("find should return first matching element");

var notFound = arr.find(function(value) {
    return value > 5;
});

if (notFound !== undefined) throw new Error("find should return undefined when not found");

// Test findIndex
var foundIndex = arr.findIndex(function(value) {
    return value > 1;
});

if (foundIndex !== 1) throw new Error("findIndex should return index of first match");

var notFoundIndex = arr.findIndex(function(value) {
    return value > 5;
});

if (notFoundIndex !== -1) throw new Error("findIndex should return -1 when not found");

// Test includes (ES2016)
if (typeof Array.prototype.includes === "function") {
    if (!arr.includes(2)) throw new Error("includes should find existing element");
    if (arr.includes(5)) throw new Error("includes should not find non-existing element");
    if (!arr.includes(1, 0)) throw new Error("includes with fromIndex should work");
    if (arr.includes(1, 1)) throw new Error("includes with fromIndex should respect start position");
}