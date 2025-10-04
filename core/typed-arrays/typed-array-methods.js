/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: TypedArray Prototype Methods
 */

// Test set() method - basic functionality
var target = new Int8Array(8);
var source = new Int8Array([1, 2, 3, 4]);
target.set(source);
if (target[0] !== 1) throw new Error("set() should copy first element");
if (target[1] !== 2) throw new Error("set() should copy second element");
if (target[2] !== 3) throw new Error("set() should copy third element");
if (target[3] !== 4) throw new Error("set() should copy fourth element");
if (target[4] !== 0) throw new Error("set() should not modify beyond source");

// Test set() method with offset
var targetOffset = new Int16Array(8);
var sourceOffset = new Int16Array([10, 20, 30]);
targetOffset.set(sourceOffset, 2);
if (targetOffset[0] !== 0) throw new Error("set() with offset should not modify before offset");
if (targetOffset[1] !== 0) throw new Error("set() with offset should not modify before offset");
if (targetOffset[2] !== 10) throw new Error("set() with offset should copy at correct position");
if (targetOffset[3] !== 20) throw new Error("set() with offset should copy at correct position");
if (targetOffset[4] !== 30) throw new Error("set() with offset should copy at correct position");
if (targetOffset[5] !== 0) throw new Error("set() with offset should not modify beyond source");

// Test set() method with regular array
var targetArray = new Uint8Array(6);
targetArray.set([100, 200, 50], 1);
if (targetArray[0] !== 0) throw new Error("set() with array should not modify before offset");
if (targetArray[1] !== 100) throw new Error("set() with array should copy at correct position");
if (targetArray[2] !== 200) throw new Error("set() with array should copy at correct position");
if (targetArray[3] !== 50) throw new Error("set() with array should copy at correct position");
if (targetArray[4] !== 0) throw new Error("set() with array should not modify beyond source");

// Test set() method type conversion
var floatTarget = new Float32Array(4);
var intSource = new Int8Array([1, -2, 3, -4]);
floatTarget.set(intSource);
if (floatTarget[0] !== 1.0) throw new Error("set() should convert int to float");
if (floatTarget[1] !== -2.0) throw new Error("set() should convert int to float");
if (floatTarget[2] !== 3.0) throw new Error("set() should convert int to float");
if (floatTarget[3] !== -4.0) throw new Error("set() should convert int to float");

// Test subarray() method
var original = new Int16Array([1, 2, 3, 4, 5, 6, 7, 8]);
var sub = original.subarray(2, 6);
if (sub.length !== 4) throw new Error("subarray() should have correct length");
if (sub[0] !== 3) throw new Error("subarray() should start at correct element");
if (sub[1] !== 4) throw new Error("subarray() should contain correct elements");
if (sub[2] !== 5) throw new Error("subarray() should contain correct elements");
if (sub[3] !== 6) throw new Error("subarray() should contain correct elements");

// Test subarray() shares buffer
original[3] = 99;
if (sub[1] !== 99) throw new Error("subarray() should share buffer with original");

// Test subarray() with negative indices
var subNeg = original.subarray(-4, -1);
if (subNeg.length !== 3) throw new Error("subarray() with negative indices should work");
if (subNeg[0] !== 5) throw new Error("subarray() with negative indices should start correctly");
if (subNeg[1] !== 6) throw new Error("subarray() with negative indices should contain correct elements");
if (subNeg[2] !== 7) throw new Error("subarray() with negative indices should contain correct elements");

// Test subarray() with single argument
var subSingle = original.subarray(3);
if (subSingle.length !== 5) throw new Error("subarray() with single argument should go to end");
if (subSingle[0] !== 99) throw new Error("subarray() with single argument should start correctly");

// Test slice() method
var sliceOriginal = new Uint8Array([10, 20, 30, 40, 50, 60]);
var sliced = sliceOriginal.slice(1, 4);
if (sliced.length !== 3) throw new Error("slice() should have correct length");
if (sliced[0] !== 20) throw new Error("slice() should contain correct elements");
if (sliced[1] !== 30) throw new Error("slice() should contain correct elements");
if (sliced[2] !== 40) throw new Error("slice() should contain correct elements");

// Test slice() doesn't share buffer
sliceOriginal[1] = 99;
if (sliced[0] !== 20) throw new Error("slice() should not share buffer with original");

// Test slice() with negative indices
var sliceNeg = sliceOriginal.slice(-3, -1);
if (sliceNeg.length !== 2) throw new Error("slice() with negative indices should work");
if (sliceNeg[0] !== 40) throw new Error("slice() with negative indices should contain correct elements");
if (sliceNeg[1] !== 50) throw new Error("slice() with negative indices should contain correct elements");

// Test slice() with no arguments
var sliceAll = sliceOriginal.slice();
if (sliceAll.length !== sliceOriginal.length) throw new Error("slice() with no args should copy entire array");
if (sliceAll[0] !== sliceOriginal[0]) throw new Error("slice() with no args should copy all elements");

// Test copyWithin() method
var copyArray = new Int32Array([1, 2, 3, 4, 5, 6, 7, 8]);
copyArray.copyWithin(0, 3, 6);
if (copyArray[0] !== 4) throw new Error("copyWithin() should copy correctly");
if (copyArray[1] !== 5) throw new Error("copyWithin() should copy correctly");
if (copyArray[2] !== 6) throw new Error("copyWithin() should copy correctly");
if (copyArray[3] !== 4) throw new Error("copyWithin() should not modify source region");
if (copyArray[4] !== 5) throw new Error("copyWithin() should not modify source region");
if (copyArray[5] !== 6) throw new Error("copyWithin() should not modify source region");

// Test copyWithin() with overlap
var overlapArray = new Uint16Array([1, 2, 3, 4, 5]);
overlapArray.copyWithin(1, 0, 3);
if (overlapArray[0] !== 1) throw new Error("copyWithin() with overlap should work");
if (overlapArray[1] !== 1) throw new Error("copyWithin() with overlap should work");
if (overlapArray[2] !== 2) throw new Error("copyWithin() with overlap should work");
if (overlapArray[3] !== 3) throw new Error("copyWithin() with overlap should work");
if (overlapArray[4] !== 5) throw new Error("copyWithin() with overlap should work");

// Test copyWithin() with negative indices
var negCopyArray = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0]);
negCopyArray.copyWithin(-2, -4, -1);
if (negCopyArray[0] !== 1.0) throw new Error("copyWithin() with negative indices should work");
if (negCopyArray[1] !== 2.0) throw new Error("copyWithin() with negative indices should work");
if (negCopyArray[2] !== 3.0) throw new Error("copyWithin() with negative indices should work");
if (negCopyArray[3] !== 2.0) throw new Error("copyWithin() with negative indices should work");
if (negCopyArray[4] !== 3.0) throw new Error("copyWithin() with negative indices should work");

// Test fill() method
var fillArray = new Int8Array(5);
fillArray.fill(42);
for (var i = 0; i < fillArray.length; i++) {
    if (fillArray[i] !== 42) throw new Error("fill() should fill all elements");
}

// Test fill() with start and end
var fillRangeArray = new Uint32Array(8);
fillRangeArray.fill(100, 2, 5);
if (fillRangeArray[0] !== 0) throw new Error("fill() with range should not modify before start");
if (fillRangeArray[1] !== 0) throw new Error("fill() with range should not modify before start");
if (fillRangeArray[2] !== 100) throw new Error("fill() with range should fill in range");
if (fillRangeArray[3] !== 100) throw new Error("fill() with range should fill in range");
if (fillRangeArray[4] !== 100) throw new Error("fill() with range should fill in range");
if (fillRangeArray[5] !== 0) throw new Error("fill() with range should not modify after end");
if (fillRangeArray[6] !== 0) throw new Error("fill() with range should not modify after end");
if (fillRangeArray[7] !== 0) throw new Error("fill() with range should not modify after end");

// Test fill() with negative indices
var fillNegArray = new Float64Array(6);
fillNegArray.fill(3.14, -4, -1);
if (fillNegArray[0] !== 0) throw new Error("fill() with negative indices should not modify before start");
if (fillNegArray[1] !== 0) throw new Error("fill() with negative indices should not modify before start");
if (fillNegArray[2] !== 3.14) throw new Error("fill() with negative indices should fill in range");
if (fillNegArray[3] !== 3.14) throw new Error("fill() with negative indices should fill in range");
if (fillNegArray[4] !== 3.14) throw new Error("fill() with negative indices should fill in range");
if (fillNegArray[5] !== 0) throw new Error("fill() with negative indices should not modify after end");

// Test reverse() method
var reverseArray = new Int16Array([1, 2, 3, 4, 5]);
var reversed = reverseArray.reverse();
if (reversed !== reverseArray) throw new Error("reverse() should return the same array");
if (reverseArray[0] !== 5) throw new Error("reverse() should reverse elements");
if (reverseArray[1] !== 4) throw new Error("reverse() should reverse elements");
if (reverseArray[2] !== 3) throw new Error("reverse() should reverse elements");
if (reverseArray[3] !== 2) throw new Error("reverse() should reverse elements");
if (reverseArray[4] !== 1) throw new Error("reverse() should reverse elements");

// Test reverse() with even length
var evenReverse = new Uint8Array([10, 20, 30, 40]);
evenReverse.reverse();
if (evenReverse[0] !== 40) throw new Error("reverse() with even length should work");
if (evenReverse[1] !== 30) throw new Error("reverse() with even length should work");
if (evenReverse[2] !== 20) throw new Error("reverse() with even length should work");
if (evenReverse[3] !== 10) throw new Error("reverse() with even length should work");

// Test sort() method with default comparison
var sortArray = new Int32Array([5, 2, 8, 1, 9, 3]);
var sorted = sortArray.sort();
if (sorted !== sortArray) throw new Error("sort() should return the same array");
if (sortArray[0] !== 1) throw new Error("sort() should sort elements");
if (sortArray[1] !== 2) throw new Error("sort() should sort elements");
if (sortArray[2] !== 3) throw new Error("sort() should sort elements");
if (sortArray[3] !== 5) throw new Error("sort() should sort elements");
if (sortArray[4] !== 8) throw new Error("sort() should sort elements");
if (sortArray[5] !== 9) throw new Error("sort() should sort elements");

// Test sort() with custom comparison function
var customSortArray = new Float32Array([1.5, 3.2, 2.1, 4.8, 0.9]);
customSortArray.sort(function(a, b) { return b - a; }); // Descending order
if (Math.abs(customSortArray[0] - 4.8) > 0.001) throw new Error("sort() with custom comparison should work");
if (Math.abs(customSortArray[1] - 3.2) > 0.001) throw new Error("sort() with custom comparison should work");
if (Math.abs(customSortArray[2] - 2.1) > 0.001) throw new Error("sort() with custom comparison should work");
if (Math.abs(customSortArray[3] - 1.5) > 0.001) throw new Error("sort() with custom comparison should work");
if (Math.abs(customSortArray[4] - 0.9) > 0.001) throw new Error("sort() with custom comparison should work");

// Test indexOf() method
var indexArray = new Uint16Array([10, 20, 30, 20, 40]);
if (indexArray.indexOf(20) !== 1) throw new Error("indexOf() should find first occurrence");
if (indexArray.indexOf(30) !== 2) throw new Error("indexOf() should find element");
if (indexArray.indexOf(50) !== -1) throw new Error("indexOf() should return -1 for not found");
if (indexArray.indexOf(20, 2) !== 3) throw new Error("indexOf() with start index should work");

// Test lastIndexOf() method
if (indexArray.lastIndexOf(20) !== 3) throw new Error("lastIndexOf() should find last occurrence");
if (indexArray.lastIndexOf(30) !== 2) throw new Error("lastIndexOf() should find element");
if (indexArray.lastIndexOf(50) !== -1) throw new Error("lastIndexOf() should return -1 for not found");
if (indexArray.lastIndexOf(20, 2) !== 1) throw new Error("lastIndexOf() with start index should work");

// Test includes() method
var includesArray = new Int8Array([1, 2, 3, 4, 5]);
if (!includesArray.includes(3)) throw new Error("includes() should find existing element");
if (includesArray.includes(6)) throw new Error("includes() should not find non-existing element");
if (!includesArray.includes(4, 2)) throw new Error("includes() with start index should work");
if (includesArray.includes(2, 2)) throw new Error("includes() with start index should not find earlier elements");

// Test find() method
var findArray = new Float64Array([1.1, 2.2, 3.3, 4.4, 5.5]);
var found = findArray.find(function(value) { return value > 3.0; });
if (found !== 3.3) throw new Error("find() should return first matching element");

var notFound = findArray.find(function(value) { return value > 6.0; });
if (notFound !== undefined) throw new Error("find() should return undefined when not found");

// Test findIndex() method
var findIndexArray = new Uint32Array([100, 200, 300, 400, 500]);
var foundIndex = findIndexArray.findIndex(function(value) { return value > 250; });
if (foundIndex !== 2) throw new Error("findIndex() should return index of first matching element");

var notFoundIndex = findIndexArray.findIndex(function(value) { return value > 600; });
if (notFoundIndex !== -1) throw new Error("findIndex() should return -1 when not found");

// Test every() method
var everyArray = new Int16Array([2, 4, 6, 8, 10]);
var allEven = everyArray.every(function(value) { return value % 2 === 0; });
if (!allEven) throw new Error("every() should return true when all elements match");

var notAllEven = everyArray.every(function(value) { return value > 5; });
if (notAllEven) throw new Error("every() should return false when not all elements match");

// Test some() method
var someArray = new Uint8Array([1, 3, 5, 7, 8]);
var hasEven = someArray.some(function(value) { return value % 2 === 0; });
if (!hasEven) throw new Error("some() should return true when some elements match");

var allOdd = someArray.some(function(value) { return value > 10; });
if (allOdd) throw new Error("some() should return false when no elements match");

// Test forEach() method
var forEachArray = new Float32Array([1.0, 2.0, 3.0]);
var sum = 0;
var callCount = 0;
forEachArray.forEach(function(value, index, array) {
    sum += value;
    callCount++;
    if (array !== forEachArray) throw new Error("forEach() should pass correct array argument");
});
if (Math.abs(sum - 6.0) > 0.001) throw new Error("forEach() should call function for each element");
if (callCount !== 3) throw new Error("forEach() should call function correct number of times");

// Test map() method
var mapArray = new Int32Array([1, 2, 3, 4]);
var mapped = mapArray.map(function(value) { return value * 2; });
if (!(mapped instanceof Int32Array)) throw new Error("map() should return same TypedArray type");
if (mapped.length !== 4) throw new Error("map() should return same length");
if (mapped[0] !== 2) throw new Error("map() should transform elements");
if (mapped[1] !== 4) throw new Error("map() should transform elements");
if (mapped[2] !== 6) throw new Error("map() should transform elements");
if (mapped[3] !== 8) throw new Error("map() should transform elements");

// Test filter() method
var filterArray = new Uint16Array([1, 2, 3, 4, 5, 6, 7, 8]);
var filtered = filterArray.filter(function(value) { return value % 2 === 0; });
if (!(filtered instanceof Uint16Array)) throw new Error("filter() should return same TypedArray type");
if (filtered.length !== 4) throw new Error("filter() should return correct length");
if (filtered[0] !== 2) throw new Error("filter() should contain matching elements");
if (filtered[1] !== 4) throw new Error("filter() should contain matching elements");
if (filtered[2] !== 6) throw new Error("filter() should contain matching elements");
if (filtered[3] !== 8) throw new Error("filter() should contain matching elements");

// Test reduce() method
var reduceArray = new Float64Array([1.0, 2.0, 3.0, 4.0]);
var reduced = reduceArray.reduce(function(acc, value) { return acc + value; }, 0.0);
if (Math.abs(reduced - 10.0) > 0.001) throw new Error("reduce() should accumulate values");

var reducedProduct = reduceArray.reduce(function(acc, value) { return acc * value; });
if (Math.abs(reducedProduct - 24.0) > 0.001) throw new Error("reduce() without initial value should work");

// Test reduceRight() method
var reduceRightArray = new Int8Array([1, 2, 3, 4]);
var rightReduced = reduceRightArray.reduceRight(function(acc, value) { return acc - value; }, 0);
if (rightReduced !== -10) throw new Error("reduceRight() should process from right to left");

// Test join() method
var joinArray = new Uint8Array([1, 2, 3, 4, 5]);
var joined = joinArray.join(",");
if (joined !== "1,2,3,4,5") throw new Error("join() should create comma-separated string");

var joinedCustom = joinArray.join(" - ");
if (joinedCustom !== "1 - 2 - 3 - 4 - 5") throw new Error("join() with custom separator should work");

var joinedDefault = joinArray.join();
if (joinedDefault !== "1,2,3,4,5") throw new Error("join() without separator should use comma");

// Test toString() method
var toStringArray = new Int16Array([10, 20, 30]);
var stringified = toStringArray.toString();
if (stringified !== "10,20,30") throw new Error("toString() should create comma-separated string");

// Test toLocaleString() method
var toLocaleArray = new Float32Array([1.5, 2.5, 3.5]);
var localeString = toLocaleArray.toLocaleString();
if (typeof localeString !== "string") throw new Error("toLocaleString() should return string");

// Test entries() method
var entriesArray = new Uint32Array([100, 200, 300]);
var entriesIterator = entriesArray.entries();
if (typeof entriesIterator.next !== "function") throw new Error("entries() should return iterator");

var entry1 = entriesIterator.next();
if (entry1.done) throw new Error("entries() iterator should not be done initially");
if (entry1.value[0] !== 0) throw new Error("entries() should return correct index");
if (entry1.value[1] !== 100) throw new Error("entries() should return correct value");

var entry2 = entriesIterator.next();
if (entry2.value[0] !== 1) throw new Error("entries() should return correct index");
if (entry2.value[1] !== 200) throw new Error("entries() should return correct value");

// Test keys() method
var keysArray = new Int8Array([10, 20, 30]);
var keysIterator = keysArray.keys();
if (typeof keysIterator.next !== "function") throw new Error("keys() should return iterator");

var key1 = keysIterator.next();
if (key1.value !== 0) throw new Error("keys() should return correct index");

var key2 = keysIterator.next();
if (key2.value !== 1) throw new Error("keys() should return correct index");

// Test values() method
var valuesArray = new Float32Array([1.1, 2.2, 3.3]);
var valuesIterator = valuesArray.values();
if (typeof valuesIterator.next !== "function") throw new Error("values() should return iterator");

var value1 = valuesIterator.next();
if (Math.abs(value1.value - 1.1) > 0.001) throw new Error("values() should return correct value");

var value2 = valuesIterator.next();
if (Math.abs(value2.value - 2.2) > 0.001) throw new Error("values() should return correct value");