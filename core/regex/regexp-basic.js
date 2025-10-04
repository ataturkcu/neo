/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: RegExp Basic Functionality
 */

// Test RegExp constructor
if (typeof RegExp !== "function") throw new Error("RegExp should be a constructor function");

// Test literal syntax
var literal = /hello/;
if (!(literal instanceof RegExp)) throw new Error("Literal regex should be instanceof RegExp");
if (literal.source !== "hello") throw new Error("Literal regex source should be 'hello'");

// Test constructor syntax
var constructed = new RegExp("world");
if (!(constructed instanceof RegExp)) throw new Error("Constructed regex should be instanceof RegExp");
if (constructed.source !== "world") throw new Error("Constructed regex source should be 'world'");

// Test constructor with flags
var withFlags = new RegExp("test", "gi");
if (withFlags.global !== true) throw new Error("Global flag should be true");
if (withFlags.ignoreCase !== true) throw new Error("IgnoreCase flag should be true");
if (withFlags.multiline !== false) throw new Error("Multiline flag should be false");

// Test flag properties
var flags = /pattern/gim;
if (!flags.global) throw new Error("Global flag should be true");
if (!flags.ignoreCase) throw new Error("IgnoreCase flag should be true");
if (!flags.multiline) throw new Error("Multiline flag should be true");

// Test basic matching with test()
var testRegex = /hello/;
if (!testRegex.test("hello world")) throw new Error("test() should match 'hello' in 'hello world'");
if (testRegex.test("goodbye world")) throw new Error("test() should not match 'hello' in 'goodbye world'");

// Test case sensitivity
var caseSensitive = /Hello/;
var caseInsensitive = /Hello/i;
if (caseSensitive.test("hello")) throw new Error("Case sensitive should not match different case");
if (!caseInsensitive.test("hello")) throw new Error("Case insensitive should match different case");

// Test exec() method
var execRegex = /(\w+)\s+(\w+)/;
var execResult = execRegex.exec("hello world");
if (!execResult) throw new Error("exec() should return result array");
if (execResult[0] !== "hello world") throw new Error("exec() result[0] should be full match");
if (execResult[1] !== "hello") throw new Error("exec() result[1] should be first group");
if (execResult[2] !== "world") throw new Error("exec() result[2] should be second group");
if (execResult.index !== 0) throw new Error("exec() result.index should be 0");

// Test exec() with no match
var noMatch = /xyz/.exec("hello world");
if (noMatch !== null) throw new Error("exec() should return null for no match");

// Test lastIndex property with global flag
var globalRegex = /o/g;
if (globalRegex.lastIndex !== 0) throw new Error("Initial lastIndex should be 0");

var match1 = globalRegex.exec("hello world");
if (match1[0] !== "o") throw new Error("First match should be 'o'");
if (globalRegex.lastIndex !== 5) throw new Error("lastIndex should be 5 after first match");

var match2 = globalRegex.exec("hello world");
if (match2[0] !== "o") throw new Error("Second match should be 'o'");
if (globalRegex.lastIndex !== 8) throw new Error("lastIndex should be 8 after second match");

var match3 = globalRegex.exec("hello world");
if (match3 !== null) throw new Error("Third exec should return null");
if (globalRegex.lastIndex !== 0) throw new Error("lastIndex should reset to 0 after no match");

// Test string methods with regex
var str = "The quick brown fox";

// String.prototype.match
var matchResult = str.match(/quick/);
if (!matchResult) throw new Error("match() should find 'quick'");
if (matchResult[0] !== "quick") throw new Error("match() should return 'quick'");

// String.prototype.search
var searchResult = str.search(/brown/);
if (searchResult !== 10) throw new Error("search() should return index 10");

var noSearchResult = str.search(/purple/);
if (noSearchResult !== -1) throw new Error("search() should return -1 for no match");

// String.prototype.replace
var replaceResult = str.replace(/fox/, "dog");
if (replaceResult !== "The quick brown dog") throw new Error("replace() should change 'fox' to 'dog'");

// Test replace with global flag
var globalReplace = "hello hello hello".replace(/hello/g, "hi");
if (globalReplace !== "hi hi hi") throw new Error("Global replace should replace all occurrences");

// String.prototype.split
var splitResult = "a,b,c,d".split(/,/);
if (!Array.isArray(splitResult)) throw new Error("split() should return array");
if (splitResult.length !== 4) throw new Error("split() should return 4 elements");
if (splitResult[0] !== "a") throw new Error("split() first element should be 'a'");

// Test special characters and escaping
var specialChars = /\d+\.\d+/; // digits.digits
if (!specialChars.test("3.14")) throw new Error("Should match decimal number");
if (specialChars.test("abc")) throw new Error("Should not match letters");

// Test word boundaries
var wordBoundary = /\bcat\b/;
if (!wordBoundary.test("the cat sat")) throw new Error("Should match whole word 'cat'");
if (wordBoundary.test("category")) throw new Error("Should not match 'cat' in 'category'");

// Test anchors
var startAnchor = /^hello/;
if (!startAnchor.test("hello world")) throw new Error("Should match at start");
if (startAnchor.test("say hello")) throw new Error("Should not match in middle");

var endAnchor = /world$/;
if (!endAnchor.test("hello world")) throw new Error("Should match at end");
if (endAnchor.test("world peace")) throw new Error("Should not match in middle");

// Test character classes
var digits = /\d+/;
if (!digits.test("123")) throw new Error("Should match digits");
if (digits.test("abc")) throw new Error("Should not match letters");

var notDigits = /\D+/;
if (!notDigits.test("abc")) throw new Error("Should match non-digits");
if (notDigits.test("123")) throw new Error("Should not match digits");

var whitespace = /\s+/;
if (!whitespace.test(" \t\n")) throw new Error("Should match whitespace");
if (whitespace.test("abc")) throw new Error("Should not match letters");

// Test quantifiers
var optional = /colou?r/;
if (!optional.test("color")) throw new Error("Should match without optional 'u'");
if (!optional.test("colour")) throw new Error("Should match with optional 'u'");

var oneOrMore = /a+/;
if (!oneOrMore.test("a")) throw new Error("Should match single 'a'");
if (!oneOrMore.test("aaa")) throw new Error("Should match multiple 'a's");
if (oneOrMore.test("b")) throw new Error("Should not match 'b'");

var zeroOrMore = /a*/;
if (!zeroOrMore.test("")) throw new Error("Should match empty string");
if (!zeroOrMore.test("aaa")) throw new Error("Should match multiple 'a's");

// Test groups and capturing
var groups = /(hello) (world)/;
var groupResult = groups.exec("hello world");
if (groupResult[1] !== "hello") throw new Error("First group should be 'hello'");
if (groupResult[2] !== "world") throw new Error("Second group should be 'world'");

// Test non-capturing groups
var nonCapturing = /(?:hello) (world)/;
var nonCaptureResult = nonCapturing.exec("hello world");
if (nonCaptureResult.length !== 2) throw new Error("Non-capturing group should not create capture");
if (nonCaptureResult[1] !== "world") throw new Error("Capturing group should still work");

// Test alternation
var alternation = /cat|dog/;
if (!alternation.test("I have a cat")) throw new Error("Should match 'cat'");
if (!alternation.test("I have a dog")) throw new Error("Should match 'dog'");
if (alternation.test("I have a bird")) throw new Error("Should not match 'bird'");

// Test RegExp.prototype.toString
var toStringTest = /hello/gi;
var stringified = toStringTest.toString();
if (stringified !== "/hello/gi") throw new Error("toString() should return '/hello/gi'");

// Test RegExp source property with special characters
var sourceTest = new RegExp("a\\d+b");
if (sourceTest.source !== "a\\d+b") throw new Error("Source should preserve escaped characters");

// Test invalid regex
try {
    new RegExp("[");
    throw new Error("Invalid regex should throw SyntaxError");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("Invalid regex should throw SyntaxError");
}