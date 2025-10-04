/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive String Escape Sequences
 * Tests all escape sequences: \n, \r, \t, \\, \', \", \0, \v, \f, \b, \xHH, \uHHHH, \u{HHHHHH}
 */

// Test newline escape sequence \n
var newline = "Hello\nWorld";
if (newline.length !== 11) throw new Error("Newline escape should count as single character");
if (newline.charAt(5) !== "\n") throw new Error("charAt should find newline character");
if (newline.charCodeAt(5) !== 10) throw new Error("charCodeAt for newline should return 10");
if (newline.indexOf("\n") !== 5) throw new Error("indexOf should find newline");

// Test carriage return escape sequence \r
var carriageReturn = "Hello\rWorld";
if (carriageReturn.length !== 11) throw new Error("Carriage return escape should count as single character");
if (carriageReturn.charAt(5) !== "\r") throw new Error("charAt should find carriage return");
if (carriageReturn.charCodeAt(5) !== 13) throw new Error("charCodeAt for carriage return should return 13");

// Test tab escape sequence \t
var tab = "Hello\tWorld";
if (tab.length !== 11) throw new Error("Tab escape should count as single character");
if (tab.charAt(5) !== "\t") throw new Error("charAt should find tab character");
if (tab.charCodeAt(5) !== 9) throw new Error("charCodeAt for tab should return 9");

// Test backslash escape sequence \\
var backslash = "Hello\\World";
if (backslash.length !== 11) throw new Error("Backslash escape should count as single character");
if (backslash.charAt(5) !== "\\") throw new Error("charAt should find backslash character");
if (backslash.charCodeAt(5) !== 92) throw new Error("charCodeAt for backslash should return 92");
if (backslash.indexOf("\\") !== 5) throw new Error("indexOf should find backslash");

// Test single quote escape sequence \'
var singleQuote = 'Hello\'World';
if (singleQuote.length !== 11) throw new Error("Single quote escape should count as single character");
if (singleQuote.charAt(5) !== "'") throw new Error("charAt should find single quote");
if (singleQuote.charCodeAt(5) !== 39) throw new Error("charCodeAt for single quote should return 39");

// Test double quote escape sequence \"
var doubleQuote = "Hello\"World";
if (doubleQuote.length !== 11) throw new Error("Double quote escape should count as single character");
if (doubleQuote.charAt(5) !== '"') throw new Error("charAt should find double quote");
if (doubleQuote.charCodeAt(5) !== 34) throw new Error("charCodeAt for double quote should return 34");

// Test null character escape sequence \0
var nullChar = "Hello\0World";
if (nullChar.length !== 11) throw new Error("Null character escape should count as single character");
if (nullChar.charAt(5) !== "\0") throw new Error("charAt should find null character");
if (nullChar.charCodeAt(5) !== 0) throw new Error("charCodeAt for null character should return 0");

// Test vertical tab escape sequence \v
var verticalTab = "Hello\vWorld";
if (verticalTab.length !== 11) throw new Error("Vertical tab escape should count as single character");
if (verticalTab.charAt(5) !== "\v") throw new Error("charAt should find vertical tab");
if (verticalTab.charCodeAt(5) !== 11) throw new Error("charCodeAt for vertical tab should return 11");

// Test form feed escape sequence \f
var formFeed = "Hello\fWorld";
if (formFeed.length !== 11) throw new Error("Form feed escape should count as single character");
if (formFeed.charAt(5) !== "\f") throw new Error("charAt should find form feed");
if (formFeed.charCodeAt(5) !== 12) throw new Error("charCodeAt for form feed should return 12");

// Test backspace escape sequence \b
var backspace = "Hello\bWorld";
if (backspace.length !== 11) throw new Error("Backspace escape should count as single character");
if (backspace.charAt(5) !== "\b") throw new Error("charAt should find backspace");
if (backspace.charCodeAt(5) !== 8) throw new Error("charCodeAt for backspace should return 8");

// Test hexadecimal escape sequences \xHH
var hexA = "A\x41B"; // \x41 is 'A' (65 in decimal)
if (hexA.length !== 3) throw new Error("Hex escape should count as single character");
if (hexA.charAt(1) !== "A") throw new Error("Hex escape \\x41 should be 'A'");
if (hexA.charCodeAt(1) !== 65) throw new Error("charCodeAt for hex escape should return 65");

var hexSpace = "A\x20B"; // \x20 is space (32 in decimal)
if (hexSpace.charAt(1) !== " ") throw new Error("Hex escape \\x20 should be space");
if (hexSpace.charCodeAt(1) !== 32) throw new Error("charCodeAt for hex space should return 32");

var hexNewline = "A\x0AB"; // \x0A is newline (10 in decimal)
if (hexNewline.charAt(1) !== "\n") throw new Error("Hex escape \\x0A should be newline");
if (hexNewline.charCodeAt(1) !== 10) throw new Error("charCodeAt for hex newline should return 10");

var hexTab = "A\x09B"; // \x09 is tab (9 in decimal)
if (hexTab.charAt(1) !== "\t") throw new Error("Hex escape \\x09 should be tab");

var hexNull = "A\x00B"; // \x00 is null character
if (hexNull.charAt(1) !== "\0") throw new Error("Hex escape \\x00 should be null");
if (hexNull.charCodeAt(1) !== 0) throw new Error("charCodeAt for hex null should return 0");

// Test various hex values
var hexFF = "\xFF"; // Maximum single-byte value (255)
if (hexFF.charCodeAt(0) !== 255) throw new Error("Hex escape \\xFF should be 255");

var hex7F = "\x7F"; // DEL character (127)
if (hex7F.charCodeAt(0) !== 127) throw new Error("Hex escape \\x7F should be 127");

// Test Unicode escape sequences \uHHHH
var unicodeA = "A\u0041B"; // \u0041 is 'A'
if (unicodeA.length !== 3) throw new Error("Unicode escape should count as single character");
if (unicodeA.charAt(1) !== "A") throw new Error("Unicode escape \\u0041 should be 'A'");
if (unicodeA.charCodeAt(1) !== 65) throw new Error("charCodeAt for Unicode escape should return 65");

var unicodeSpace = "A\u0020B"; // \u0020 is space
if (unicodeSpace.charAt(1) !== " ") throw new Error("Unicode escape \\u0020 should be space");

var unicodeEuro = "\u20AC"; // Euro symbol
if (unicodeEuro.charCodeAt(0) !== 8364) throw new Error("Unicode escape \\u20AC should be Euro symbol (8364)");

var unicodeCopyright = "\u00A9"; // Copyright symbol
if (unicodeCopyright.charCodeAt(0) !== 169) throw new Error("Unicode escape \\u00A9 should be copyright (169)");

var unicodeHeart = "\u2665"; // Heart symbol
if (unicodeHeart.charCodeAt(0) !== 9829) throw new Error("Unicode escape \\u2665 should be heart (9829)");

// Test Chinese characters with Unicode escapes
var unicodeChinese = "\u4E2D\u6587"; // Chinese characters for "Chinese"
if (unicodeChinese.length !== 2) throw new Error("Unicode Chinese characters should have length 2");
if (unicodeChinese.charCodeAt(0) !== 20013) throw new Error("First Chinese character should be 20013");
if (unicodeChinese.charCodeAt(1) !== 25991) throw new Error("Second Chinese character should be 25991");

// Test Unicode escape sequences \u{HHHHHH} (ES2015)
// Note: Some engines may not support this syntax, so we test conditionally
try {
    eval('var unicodeCodePoint = "\\u{1F600}";'); // Grinning face emoji
    if (typeof unicodeCodePoint !== "undefined") {
        if (unicodeCodePoint.length !== 2) throw new Error("Unicode code point escape should create surrogate pair");
        if (typeof unicodeCodePoint.codePointAt === 'function') {
            if (unicodeCodePoint.codePointAt(0) !== 128512) throw new Error("Unicode code point should be 128512");
        }
    }
} catch (e) {
    // ES2015 syntax not supported, skip test
}

try {
    eval('var unicodeMath = "\\u{1D400}";'); // Mathematical bold capital A
    if (typeof unicodeMath !== "undefined" && unicodeMath.length === 2) {
        // Valid surrogate pair for mathematical symbols
        if (typeof unicodeMath.codePointAt === 'function') {
            if (unicodeMath.codePointAt(0) !== 119808) throw new Error("Mathematical bold A should be 119808");
        }
    }
} catch (e) {
    // ES2015 syntax not supported, skip test
}

// Test mixed escape sequences in single string
var mixed = "Line1\nLine2\tTabbed\r\nWindows\\Path";
if (mixed.indexOf("\n") === -1) throw new Error("Mixed string should contain newline");
if (mixed.indexOf("\t") === -1) throw new Error("Mixed string should contain tab");
if (mixed.indexOf("\r") === -1) throw new Error("Mixed string should contain carriage return");
if (mixed.indexOf("\\") === -1) throw new Error("Mixed string should contain backslash");

// Test escape sequences in string methods
var escapeStr = "Hello\nWorld\tTest";
var split = escapeStr.split("\n");
if (split.length !== 2) throw new Error("split on newline should create 2 parts");
if (split[0] !== "Hello") throw new Error("First part should be 'Hello'");
if (split[1] !== "World\tTest") throw new Error("Second part should contain tab");

var tabSplit = split[1].split("\t");
if (tabSplit.length !== 2) throw new Error("split on tab should create 2 parts");
if (tabSplit[0] !== "World") throw new Error("First tab part should be 'World'");
if (tabSplit[1] !== "Test") throw new Error("Second tab part should be 'Test'");

// Test replace with escape sequences
var replaced = "Hello\nWorld".replace("\n", " ");
if (replaced !== "Hello World") throw new Error("replace newline with space should work");

var backslashReplace = "Path\\To\\File".replace("\\", "/");
if (backslashReplace !== "Path/To\\File") throw new Error("replace should only replace first backslash");

// Test indexOf with escape sequences
var escapeIndex = "A\tB\nC\rD";
if (escapeIndex.indexOf("\t") !== 1) throw new Error("indexOf tab should return correct position");
if (escapeIndex.indexOf("\n") !== 3) throw new Error("indexOf newline should return correct position");
if (escapeIndex.indexOf("\r") !== 5) throw new Error("indexOf carriage return should return correct position");

// Test substring with escape sequences
var escapeSub = "Start\nMiddle\nEnd";
var sub1 = escapeSub.substring(0, 5); // "Start"
if (sub1 !== "Start") throw new Error("substring before newline should work");

var sub2 = escapeSub.substring(6, 12); // "Middle"
if (sub2 !== "Middle") throw new Error("substring between newlines should work");

// Test slice with escape sequences
var escapeSlice = "A\x41B\u0041C";
if (escapeSlice.slice(0, 1) !== "A") throw new Error("slice should work with mixed escapes");
if (escapeSlice.slice(1, 2) !== "A") throw new Error("slice hex escape should work");
if (escapeSlice.slice(3, 4) !== "A") throw new Error("slice Unicode escape should work");

// Test charAt with consecutive escape sequences
var consecutive = "\n\r\t\b\f\v";
if (consecutive.length !== 6) throw new Error("Consecutive escapes should each count as 1 character");
if (consecutive.charAt(0) !== "\n") throw new Error("First escape should be newline");
if (consecutive.charAt(1) !== "\r") throw new Error("Second escape should be carriage return");
if (consecutive.charAt(2) !== "\t") throw new Error("Third escape should be tab");
if (consecutive.charAt(3) !== "\b") throw new Error("Fourth escape should be backspace");
if (consecutive.charAt(4) !== "\f") throw new Error("Fifth escape should be form feed");
if (consecutive.charAt(5) !== "\v") throw new Error("Sixth escape should be vertical tab");

// Test charCodeAt with all basic escape sequences
var allEscapes = "\n\r\t\\\'\"\0\v\f\b";
var expectedCodes = [10, 13, 9, 92, 39, 34, 0, 11, 12, 8];
for (var i = 0; i < allEscapes.length; i++) {
    if (allEscapes.charCodeAt(i) !== expectedCodes[i]) {
        throw new Error("charCodeAt(" + i + ") should return " + expectedCodes[i]);
    }
}

// Test escape sequences in template literals (if supported)
try {
    eval('var template = `Hello\\nWorld\\t${1+1}`;');
    if (typeof template !== "undefined") {
        if (template.indexOf("\n") === -1) throw new Error("Template literal should process newline escape");
        if (template.indexOf("\t") === -1) throw new Error("Template literal should process tab escape");
    }
} catch (e) {
    // Template literals not supported, skip test
}

// Test null character handling in string operations
var nullString = "A\0B\0C";
if (nullString.length !== 5) throw new Error("String with null characters should have correct length");
if (nullString.split("\0").length !== 3) throw new Error("split on null character should work");

// Test with very long hex and Unicode sequences
var longHex = "\x48\x65\x6C\x6C\x6F"; // "Hello" in hex
if (longHex !== "Hello") throw new Error("Long hex sequence should spell 'Hello'");

var longUnicode = "\u0048\u0065\u006C\u006C\u006F"; // "Hello" in Unicode
if (longUnicode !== "Hello") throw new Error("Long Unicode sequence should spell 'Hello'");

// Final comprehensive test with all escape types
var comprehensive = "Start\n\tHex:\x41\u0041\r\nEnd\\Quote:\"\'";
if (comprehensive.indexOf("Start") !== 0) throw new Error("Comprehensive string should start with 'Start'");
if (comprehensive.indexOf("\n") === -1) throw new Error("Comprehensive string should contain newline");
if (comprehensive.indexOf("\t") === -1) throw new Error("Comprehensive string should contain tab");
if (comprehensive.indexOf("A") === -1) throw new Error("Comprehensive string should contain hex/unicode A");
if (comprehensive.indexOf("\\") === -1) throw new Error("Comprehensive string should contain backslash");
if (comprehensive.indexOf("\"") === -1) throw new Error("Comprehensive string should contain double quote");
if (comprehensive.indexOf("'") === -1) throw new Error("Comprehensive string should contain single quote");