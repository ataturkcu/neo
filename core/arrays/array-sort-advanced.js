/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array.prototype.sort Advanced Cases
 */

// Test sort stability (when elements are equal, original order should be preserved)
var stableTest = [
    {key: 1, value: 'a'},
    {key: 2, value: 'b'},
    {key: 1, value: 'c'},
    {key: 2, value: 'd'}
];

stableTest.sort(function(a, b) { return a.key - b.key; });
if (stableTest[0].value !== 'a') throw new Error("Sort should be stable - first item with key 1 should remain first");
if (stableTest[1].value !== 'c') throw new Error("Sort should be stable - second item with key 1 should remain second");

// Test sort with compare function returning non-numbers
var compareResults = [5, 1, 3, 2, 4];
compareResults.sort(function(a, b) {
    if (a < b) return "negative";
    if (a > b) return "positive";
    return "zero";
});
// Non-numeric returns become NaN, sort doesn't work properly
if (compareResults[0] === 1) throw new Error("Sort should NOT work properly with non-numeric compare returns");

// Test sort with compare function that modifies array during sort
var modifyDuringSort = [3, 1, 4, 1, 5];
try {
    modifyDuringSort.sort(function(a, b) {
        modifyDuringSort.push(99); // Modifying array during sort
        return a - b;
    });
    // Behavior is implementation-dependent, but shouldn't crash
} catch (e) {
    // Some engines might throw, which is acceptable
}

// Test sort with very large arrays
var largeArray = [];
for (var i = 1000; i >= 1; i--) {
    largeArray.push(i);
}
largeArray.sort(function(a, b) { return a - b; });
if (largeArray[0] !== 1) throw new Error("Large array sort: first should be 1");
if (largeArray[999] !== 1000) throw new Error("Large array sort: last should be 1000");

// Test sort with duplicate elements
var duplicates = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
duplicates.sort(function(a, b) { return a - b; });
var expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
for (var i = 0; i < duplicates.length; i++) {
    if (duplicates[i] !== expected[i]) {
        throw new Error("Duplicate sort failed at index " + i + ": got " + duplicates[i] + ", expected " + expected[i]);
    }
}

// Test sort with objects using different comparison strategies
var objects = [
    {name: "Alice", age: 30},
    {name: "Bob", age: 25},
    {name: "Charlie", age: 35},
    {name: "David", age: 20}
];

// Sort by age
objects.sort(function(a, b) { return a.age - b.age; });
if (objects[0].name !== "David") throw new Error("Sort by age: youngest should be David");
if (objects[3].name !== "Charlie") throw new Error("Sort by age: oldest should be Charlie");

// Sort by name (lexicographic)
objects.sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});
if (objects[0].name !== "Alice") throw new Error("Sort by name: first should be Alice");
if (objects[3].name !== "David") throw new Error("Sort by name: last should be David");

// Test sort with mixed types
var mixedTypes = [3, "1", 2, "10", 1];
mixedTypes.sort(); // Default lexicographic sort
if (mixedTypes[0] !== "1") throw new Error("Mixed type sort: first should be '1'");
if (mixedTypes[1] !== 1) throw new Error("Mixed type sort: second should be 1");

// Test sort with null, undefined, and sparse arrays
var sparseWithNulls = [3, undefined, 1, null, 2, , 4];
sparseWithNulls.sort();
// undefined and holes should be at the end
var endValues = sparseWithNulls.slice(-3);
var hasUndefined = endValues.indexOf(undefined) !== -1;
if (!hasUndefined) throw new Error("Sort should move undefined to end");

// Test sort behavior with holes
var withHoles = [3, , 1, , 2];
var originalLength = withHoles.length;
withHoles.sort();
if (withHoles.length !== originalLength) throw new Error("Sort should preserve array length");

// Test reverse sort
var reverseTest = [1, 2, 3, 4, 5];
reverseTest.sort(function(a, b) { return b - a; });
if (reverseTest[0] !== 5) throw new Error("Reverse sort: first should be 5");
if (reverseTest[4] !== 1) throw new Error("Reverse sort: last should be 1");

// Test sort with custom objects and toString
var customObjects = [
    {toString: function() { return "z"; }},
    {toString: function() { return "a"; }},
    {toString: function() { return "m"; }}
];
customObjects.sort(); // Should use toString for comparison
if (customObjects[0].toString() !== "a") throw new Error("Custom toString sort: first should be 'a'");
if (customObjects[2].toString() !== "z") throw new Error("Custom toString sort: last should be 'z'");

// Test sort with function that throws
var throwingSort = [3, 1, 2];
try {
    throwingSort.sort(function(a, b) {
        if (a === 2) throw new Error("Comparison error");
        return a - b;
    });
    throw new Error("Sort should propagate comparison function errors");
} catch (e) {
    if (e.message !== "Comparison error") {
        throw new Error("Sort should propagate the exact error from comparison function");
    }
}

// Test sort with NaN in compare function
var nanCompare = [3, 1, 2];
nanCompare.sort(function(a, b) { return NaN; });
// Behavior with NaN is implementation-dependent, but should not crash

// Test sort with Infinity in compare function
var infinityCompare = [3, 1, 2];
infinityCompare.sort(function(a, b) {
    if (a < b) return -Infinity;
    if (a > b) return Infinity;
    return 0;
});
if (infinityCompare[0] !== 1) throw new Error("Sort with Infinity compare should work");

// Test sort performance with pre-sorted array
var preSorted = [];
for (var i = 1; i <= 100; i++) {
    preSorted.push(i);
}
var start = Date.now();
preSorted.sort(function(a, b) { return a - b; });
var sortTime = Date.now() - start;
// Should complete quickly (under 100ms for 100 elements)
if (sortTime > 100) throw new Error("Sort of pre-sorted array should be fast");

// Test sort performance with reverse-sorted array
var reverseSorted = [];
for (var i = 100; i >= 1; i--) {
    reverseSorted.push(i);
}
start = Date.now();
reverseSorted.sort(function(a, b) { return a - b; });
sortTime = Date.now() - start;
if (sortTime > 100) throw new Error("Sort of reverse-sorted array should be reasonably fast");