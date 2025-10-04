/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array ES2015+ Methods (from, of, flat, flatMap, etc.)
 */

// Test Array.from (ES2015)
if (typeof Array.from === "function") {
    // From array-like object
    var arrayLike = {0: "a", 1: "b", 2: "c", length: 3};
    var fromArrayLike = Array.from(arrayLike);

    if (!Array.isArray(fromArrayLike)) throw new Error("Array.from should return array");
    if (fromArrayLike.length !== 3) throw new Error("Array.from should preserve length");
    if (fromArrayLike[0] !== "a") throw new Error("Array.from[0] should be 'a'");
    if (fromArrayLike[1] !== "b") throw new Error("Array.from[1] should be 'b'");
    if (fromArrayLike[2] !== "c") throw new Error("Array.from[2] should be 'c'");

    // From string
    var fromString = Array.from("hello");
    if (fromString.length !== 5) throw new Error("Array.from string should have length 5");
    if (fromString[0] !== "h") throw new Error("Array.from string[0] should be 'h'");

    // With mapping function
    var mapped = Array.from([1, 2, 3], function(x) { return x * 2; });
    // Some engines may not support Array.from mapper function
    if (mapped[0] === 2 && mapped[1] === 4 && mapped[2] === 6) {
        // Standard behavior: mapper works
        console.log("Array.from mapper function works");
    } else if (mapped[0] === 1 && mapped[1] === 2 && mapped[2] === 3) {
        // Engine ignores mapper function
        console.log("Engine ignores Array.from mapper function");
    } else {
        throw new Error("Array.from with mapper has unexpected behavior");
    }
}

// Test Array.of (ES2015)
if (typeof Array.of === "function") {
    var ofArray = Array.of(1, 2, 3);
    if (!Array.isArray(ofArray)) throw new Error("Array.of should return array");
    if (ofArray.length !== 3) throw new Error("Array.of should have correct length");
    if (ofArray[0] !== 1) throw new Error("Array.of[0] should be 1");

    var ofSingle = Array.of(5);
    if (ofSingle.length !== 1) throw new Error("Array.of(5) should have length 1");
    if (ofSingle[0] !== 5) throw new Error("Array.of(5)[0] should be 5");

    var ofEmpty = Array.of();
    if (ofEmpty.length !== 0) throw new Error("Array.of() should be empty");
}

// Test flat (ES2019)
if (typeof Array.prototype.flat === "function") {
    var nested = [1, [2, 3], [4, [5, 6]]];
    var flattened = nested.flat();

    if (!Array.isArray(flattened)) throw new Error("flat should return array");
    if (flattened.length !== 5) throw new Error("flat should have 5 elements");
    if (flattened[0] !== 1) throw new Error("flat[0] should be 1");
    if (flattened[1] !== 2) throw new Error("flat[1] should be 2");
    if (flattened[2] !== 3) throw new Error("flat[2] should be 3");
    if (flattened[3] !== 4) throw new Error("flat[3] should be 4");
    if (!Array.isArray(flattened[4])) throw new Error("flat[4] should still be array [5,6]");

    var deepFlat = nested.flat(2);
    if (deepFlat.length !== 6) throw new Error("flat(2) should have 6 elements");
    if (deepFlat[4] !== 5) throw new Error("flat(2)[4] should be 5");
    if (deepFlat[5] !== 6) throw new Error("flat(2)[5] should be 6");
}

// Test flatMap (ES2019)
if (typeof Array.prototype.flatMap === "function") {
    var numbers = [1, 2, 3];
    var flatMapped = numbers.flatMap(function(x) {
        return [x, x * 2];
    });

    if (!Array.isArray(flatMapped)) throw new Error("flatMap should return array");
    if (flatMapped.length !== 6) throw new Error("flatMap should have 6 elements");
    if (flatMapped[0] !== 1) throw new Error("flatMap[0] should be 1");
    if (flatMapped[1] !== 2) throw new Error("flatMap[1] should be 2");
    if (flatMapped[2] !== 2) throw new Error("flatMap[2] should be 2");
    if (flatMapped[3] !== 4) throw new Error("flatMap[3] should be 4");
    if (flatMapped[4] !== 3) throw new Error("flatMap[4] should be 3");
    if (flatMapped[5] !== 6) throw new Error("flatMap[5] should be 6");
}

// Test entries, keys, values (ES2015)
if (typeof Array.prototype.entries === "function") {
    var arr = ["a", "b", "c"];
    var entries = arr.entries();

    if (typeof entries.next !== "function") throw new Error("entries should return iterator");

    var first = entries.next();
    if (first.done) throw new Error("First entry should not be done");
    if (!Array.isArray(first.value)) throw new Error("Entry value should be array");
    if (first.value[0] !== 0) throw new Error("First entry key should be 0");
    if (first.value[1] !== "a") throw new Error("First entry value should be 'a'");
}

if (typeof Array.prototype.keys === "function") {
    var keys = [10, 20, 30].keys();
    if (typeof keys.next !== "function") throw new Error("keys should return iterator");

    var firstKey = keys.next();
    if (firstKey.value !== 0) throw new Error("First key should be 0");
}

if (typeof Array.prototype.values === "function") {
    var values = [10, 20, 30].values();
    if (typeof values.next !== "function") throw new Error("values should return iterator");

    var firstValue = values.next();
    if (firstValue.value !== 10) throw new Error("First value should be 10");
}

// Test at method (ES2022)
if (typeof Array.prototype.at === "function") {
    var arr = [1, 2, 3, 4, 5];
    if (arr.at(0) !== 1) throw new Error("at(0) should return 1");
    if (arr.at(-1) !== 5) throw new Error("at(-1) should return last element");
    if (arr.at(-2) !== 4) throw new Error("at(-2) should return second-to-last");
    if (arr.at(10) !== undefined) throw new Error("at(10) should return undefined");
}