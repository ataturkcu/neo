/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: String ES2015+ Methods (startsWith, endsWith, includes, repeat, etc.)
 */

var str = "Hello World";

// Test String.prototype.startsWith (ES2015)
if (typeof String.prototype.startsWith === "function") {
    if (!str.startsWith("Hello")) throw new Error("startsWith should find 'Hello' at start");
    if (str.startsWith("World")) throw new Error("startsWith should not find 'World' at start");
    if (!str.startsWith("World", 6)) throw new Error("startsWith with position should work");
    if (str.startsWith("Hello", 1)) throw new Error("startsWith with position should respect offset");
    if (!"".startsWith("")) throw new Error("Empty string should start with empty string");
}

// Test String.prototype.endsWith (ES2015)
if (typeof String.prototype.endsWith === "function") {
    if (!str.endsWith("World")) throw new Error("endsWith should find 'World' at end");
    if (str.endsWith("Hello")) throw new Error("endsWith should not find 'Hello' at end");
    if (!str.endsWith("Hello", 5)) throw new Error("endsWith with length should work");
    if (str.endsWith("World", 5)) throw new Error("endsWith with length should respect limit");
    if (!"".endsWith("")) throw new Error("Empty string should end with empty string");
}

// Test String.prototype.includes (ES2015)
if (typeof String.prototype.includes === "function") {
    if (!str.includes("World")) throw new Error("includes should find 'World'");
    if (!str.includes("Hello")) throw new Error("includes should find 'Hello'");
    if (str.includes("xyz")) throw new Error("includes should not find 'xyz'");
    if (!str.includes("World", 6)) throw new Error("includes with position should work");
    if (str.includes("Hello", 1)) throw new Error("includes with position should respect offset");
    if (!"test".includes("")) throw new Error("Any string should include empty string");
}

// Test String.prototype.repeat (ES2015)
if (typeof String.prototype.repeat === "function") {
    if ("abc".repeat(3) !== "abcabcabc") throw new Error("repeat(3) should work");
    if ("test".repeat(0) !== "") throw new Error("repeat(0) should return empty string");
    if ("x".repeat(1) !== "x") throw new Error("repeat(1) should return original");

    try {
        "test".repeat(-1);
        throw new Error("repeat(-1) should throw RangeError");
    } catch (e) {
        if (!(e instanceof RangeError)) throw new Error("repeat(-1) should throw RangeError");
    }

    try {
        "test".repeat(Infinity);
        throw new Error("repeat(Infinity) should throw RangeError");
    } catch (e) {
        if (!(e instanceof RangeError)) throw new Error("repeat(Infinity) should throw RangeError");
    }
}

// Test String.prototype.padStart (ES2017)
if (typeof String.prototype.padStart === "function") {
    if ("abc".padStart(5) !== "  abc") throw new Error("padStart should pad with spaces by default");
    if ("abc".padStart(5, "x") !== "xxabc") throw new Error("padStart with custom pad should work");
    if ("abc".padStart(3) !== "abc") throw new Error("padStart with same length should return original");
    if ("abc".padStart(2) !== "abc") throw new Error("padStart with shorter length should return original");
    if ("abc".padStart(10, "123") !== "1231231abc") throw new Error("padStart should repeat pad string");
}

// Test String.prototype.padEnd (ES2017)
if (typeof String.prototype.padEnd === "function") {
    if ("abc".padEnd(5) !== "abc  ") throw new Error("padEnd should pad with spaces by default");
    if ("abc".padEnd(5, "x") !== "abcxx") throw new Error("padEnd with custom pad should work");
    if ("abc".padEnd(3) !== "abc") throw new Error("padEnd with same length should return original");
    if ("abc".padEnd(2) !== "abc") throw new Error("padEnd with shorter length should return original");
    if ("abc".padEnd(10, "123") !== "abc1231231") throw new Error("padEnd should repeat pad string");
}

// Test String.prototype.trim variations (ES2019)
var whitespaceStr = "  \t\n  hello world  \t\n  ";

if (typeof String.prototype.trimStart === "function" || typeof String.prototype.trimLeft === "function") {
    var trimStart = String.prototype.trimStart || String.prototype.trimLeft;
    var trimmed = trimStart.call(whitespaceStr);
    if (!trimmed.startsWith("hello")) throw new Error("trimStart should remove leading whitespace");
    if (!trimmed.endsWith("  \t\n  ")) throw new Error("trimStart should preserve trailing whitespace");
}

if (typeof String.prototype.trimEnd === "function" || typeof String.prototype.trimRight === "function") {
    var trimEnd = String.prototype.trimEnd || String.prototype.trimRight;
    var trimmed = trimEnd.call(whitespaceStr);
    if (!trimmed.endsWith("hello world")) throw new Error("trimEnd should remove trailing whitespace");
    if (!trimmed.startsWith("  \t\n  ")) throw new Error("trimEnd should preserve leading whitespace");
}

// Test String.fromCharCode
if (String.fromCharCode(65) !== "A") throw new Error("String.fromCharCode(65) should be 'A'");
if (String.fromCharCode(65, 66, 67) !== "ABC") throw new Error("String.fromCharCode with multiple args should work");

// Test String.fromCodePoint (ES2015)
if (typeof String.fromCodePoint === "function") {
    if (String.fromCodePoint(65) !== "A") throw new Error("String.fromCodePoint(65) should be 'A'");
    if (String.fromCodePoint(0x1F600) !== "😀") throw new Error("String.fromCodePoint should handle Unicode");

    try {
        String.fromCodePoint(-1);
        throw new Error("String.fromCodePoint(-1) should throw RangeError");
    } catch (e) {
        if (!(e instanceof RangeError)) throw new Error("String.fromCodePoint(-1) should throw RangeError");
    }
}

// Test String.raw (ES2015)
if (typeof String.raw === "function") {
    var template = {raw: ["a", "b", "c"]};
    if (String.raw(template, 1, 2) !== "a1b2c") throw new Error("String.raw should work with template object");
}

// Test codePointAt (ES2015)
if (typeof String.prototype.codePointAt === "function") {
    if ("ABC".codePointAt(0) !== 65) throw new Error("codePointAt should return code point");
    if ("ABC".codePointAt(1) !== 66) throw new Error("codePointAt should work with index");
    if ("😀".codePointAt(0) !== 0x1F600) throw new Error("codePointAt should handle Unicode");
}

// Test normalize (ES2015)
if (typeof String.prototype.normalize === "function") {
    var str1 = "\u00E9"; // é (single character)
    var str2 = "e\u0301"; // e + combining acute accent

    // These should be different initially
    if (str1 === str2) throw new Error("Composed and decomposed should be different");

    // But normalize to the same thing
    if (str1.normalize("NFC") !== str2.normalize("NFC")) throw new Error("normalize should make equivalent strings equal");
}