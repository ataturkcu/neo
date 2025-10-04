/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic String Methods
 */

// Test string length
var str = "hello";
if (str.length !== 5) throw new Error("String length should be 5");

var empty = "";
if (empty.length !== 0) throw new Error("Empty string length should be 0");

// Test charAt and charCodeAt
if (str.charAt(0) !== "h") throw new Error("charAt(0) should be 'h'");
if (str.charAt(4) !== "o") throw new Error("charAt(4) should be 'o'");
if (str.charAt(10) !== "") throw new Error("charAt out of bounds should return empty string");

if (str.charCodeAt(0) !== 104) throw new Error("charCodeAt(0) should be 104 (h)");
if (str.charCodeAt(1) !== 101) throw new Error("charCodeAt(1) should be 101 (e)");
var outOfBounds = str.charCodeAt(10);
if (!isNaN(outOfBounds) && outOfBounds >= 0) throw new Error("charCodeAt out of bounds should return NaN or negative");

// Test substring and substr
var text = "JavaScript";
if (text.substring(0, 4) !== "Java") throw new Error("substring(0,4) should be 'Java'");
if (text.substring(4) !== "Script") throw new Error("substring(4) should be 'Script'");
if (text.substring(4, 0) !== "Java") throw new Error("substring with swapped arguments should work");

if (text.substr(0, 4) !== "Java") throw new Error("substr(0,4) should be 'Java'");
if (text.substr(4, 6) !== "Script") throw new Error("substr(4,6) should be 'Script'");
if (text.substr(-6) !== "Script") throw new Error("substr with negative start should work");

// Test slice
if (text.slice(0, 4) !== "Java") throw new Error("slice(0,4) should be 'Java'");
if (text.slice(4) !== "Script") throw new Error("slice(4) should be 'Script'");
if (text.slice(-6) !== "Script") throw new Error("slice with negative start should work");
if (text.slice(-6, -2) !== "Scri") throw new Error("slice with negative end should work");

// Test indexOf and lastIndexOf
var searchStr = "hello world hello";
if (searchStr.indexOf("hello") !== 0) throw new Error("indexOf should find first occurrence");
if (searchStr.indexOf("world") !== 6) throw new Error("indexOf should find 'world' at position 6");
if (searchStr.indexOf("xyz") !== -1) throw new Error("indexOf should return -1 for not found");

if (searchStr.lastIndexOf("hello") !== 12) throw new Error("lastIndexOf should find last occurrence");
if (searchStr.lastIndexOf("world") !== 6) throw new Error("lastIndexOf should find 'world' at position 6");

// Test with start position
if (searchStr.indexOf("hello", 5) !== 12) throw new Error("indexOf with start position should work");
if (searchStr.lastIndexOf("hello", 5) !== 0) throw new Error("lastIndexOf with start position should work");

// Test toLowerCase and toUpperCase
var mixedCase = "Hello World";
if (mixedCase.toLowerCase() !== "hello world") throw new Error("toLowerCase should work");
if (mixedCase.toUpperCase() !== "HELLO WORLD") throw new Error("toUpperCase should work");

// Test original string unchanged
if (mixedCase !== "Hello World") throw new Error("Original string should be unchanged");

// Test split
var csv = "apple,banana,cherry";
var fruits = csv.split(",");
if (!Array.isArray(fruits)) throw new Error("split should return array");
if (fruits.length !== 3) throw new Error("split should return 3 elements");
if (fruits[0] !== "apple") throw new Error("First element should be 'apple'");
if (fruits[1] !== "banana") throw new Error("Second element should be 'banana'");
if (fruits[2] !== "cherry") throw new Error("Third element should be 'cherry'");

// Test split with limit
var limited = csv.split(",", 2);
if (limited.length !== 2) throw new Error("split with limit should return 2 elements");

// Test split with empty string
var chars = "abc".split("");
if (chars.length !== 3) throw new Error("split('') should return character array");
if (chars[0] !== "a") throw new Error("First char should be 'a'");

// Test replace
var original = "hello world";
var replaced = original.replace("world", "JavaScript");
if (replaced !== "hello JavaScript") throw new Error("replace should work");
if (original !== "hello world") throw new Error("Original string should be unchanged");

// Test replace only replaces first occurrence
var multiple = "test test test";
var replaceFirst = multiple.replace("test", "exam");
if (replaceFirst !== "exam test test") throw new Error("replace should only replace first occurrence");