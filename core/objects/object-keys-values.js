/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object.keys, Object.values, Object.entries
 */

// Test Object.keys
var obj = {a: 1, b: 2, c: 3};
var keys = Object.keys(obj);
if (!Array.isArray(keys)) throw new Error("Object.keys should return an array");
if (keys.length !== 3) throw new Error("Object.keys should return 3 keys");
if (keys.indexOf("a") === -1) throw new Error("Object.keys should include 'a'");
if (keys.indexOf("b") === -1) throw new Error("Object.keys should include 'b'");
if (keys.indexOf("c") === -1) throw new Error("Object.keys should include 'c'");

// Test Object.keys with non-enumerable properties
var objWithNonEnum = {};
Object.defineProperty(objWithNonEnum, "enum", {value: 1, enumerable: true});
Object.defineProperty(objWithNonEnum, "nonEnum", {value: 2, enumerable: false});

var keysEnum = Object.keys(objWithNonEnum);
if (keysEnum.length !== 1) throw new Error("Object.keys should only return enumerable properties");
if (keysEnum[0] !== "enum") throw new Error("Object.keys should return enumerable property");

// Test Object.keys with inherited properties
var parent = {inherited: "value"};
var child = Object.create(parent);
child.own = "own value";

var childKeys = Object.keys(child);
if (childKeys.length !== 1) throw new Error("Object.keys should only return own properties");
if (childKeys[0] !== "own") throw new Error("Object.keys should return own property only");

// Test Object.values (ES2017)
if (typeof Object.values === "function") {
    var values = Object.values(obj);
    if (!Array.isArray(values)) throw new Error("Object.values should return an array");
    if (values.length !== 3) throw new Error("Object.values should return 3 values");
    if (values.indexOf(1) === -1) throw new Error("Object.values should include 1");
    if (values.indexOf(2) === -1) throw new Error("Object.values should include 2");
    if (values.indexOf(3) === -1) throw new Error("Object.values should include 3");
}

// Test Object.entries (ES2017)
if (typeof Object.entries === "function") {
    var entries = Object.entries(obj);
    if (!Array.isArray(entries)) throw new Error("Object.entries should return an array");
    if (entries.length !== 3) throw new Error("Object.entries should return 3 entries");

    var foundA = false, foundB = false, foundC = false;
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (!Array.isArray(entry)) throw new Error("Each entry should be an array");
        if (entry.length !== 2) throw new Error("Each entry should have length 2");

        if (entry[0] === "a" && entry[1] === 1) foundA = true;
        if (entry[0] === "b" && entry[1] === 2) foundB = true;
        if (entry[0] === "c" && entry[1] === 3) foundC = true;
    }

    if (!foundA) throw new Error("Object.entries should include ['a', 1]");
    if (!foundB) throw new Error("Object.entries should include ['b', 2]");
    if (!foundC) throw new Error("Object.entries should include ['c', 3]");
}

// Test with empty object
var empty = {};
var emptyKeys = Object.keys(empty);
if (emptyKeys.length !== 0) throw new Error("Object.keys of empty object should return empty array");

// Test with array
var arr = [1, 2, 3];
var arrKeys = Object.keys(arr);
if (arrKeys.length !== 3) throw new Error("Object.keys of array should return indices");
if (arrKeys[0] !== "0") throw new Error("Array keys should be strings");
if (arrKeys[1] !== "1") throw new Error("Array keys should be strings");
if (arrKeys[2] !== "2") throw new Error("Array keys should be strings");