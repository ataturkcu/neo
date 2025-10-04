/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive String.prototype Methods
 * Tests ALL String.prototype methods with edge cases
 */

// Test anchor() method (deprecated but should work)
var str = "test";
var anchored = str.anchor("myanchor");
if (anchored !== '<a name="myanchor">test</a>') throw new Error("anchor() should create HTML anchor tag");
if ("".anchor("test") !== '<a name="test"></a>') throw new Error("anchor() on empty string should work");

// Test big() method (deprecated)
if (str.big() !== '<big>test</big>') throw new Error("big() should create HTML big tag");
if ("".big() !== '<big></big>') throw new Error("big() on empty string should work");

// Test blink() method (deprecated)
if (str.blink() !== '<blink>test</blink>') throw new Error("blink() should create HTML blink tag");

// Test bold() method (deprecated)
if (str.bold() !== '<b>test</b>') throw new Error("bold() should create HTML bold tag");

// Test charAt() method comprehensive
var testStr = "Hello, 世界! 😀";
if (testStr.charAt(0) !== "H") throw new Error("charAt(0) should return 'H'");
if (testStr.charAt(7) !== "世") throw new Error("charAt(7) should return Unicode character");
if (testStr.charAt(100) !== "") throw new Error("charAt out of bounds should return empty string");
if (testStr.charAt(-1) !== "") throw new Error("charAt negative index should return empty string");

// Test charCodeAt() method comprehensive
if (testStr.charCodeAt(0) !== 72) throw new Error("charCodeAt(0) should return 72 for 'H'");
if (testStr.charCodeAt(7) !== 19990) throw new Error("charCodeAt(7) should return Unicode code point");
if (isNaN(testStr.charCodeAt(100)) !== true) throw new Error("charCodeAt out of bounds should return NaN");

// Test codePointAt() method (ES2015)
if (typeof testStr.codePointAt === 'function') {
    if (testStr.codePointAt(0) !== 72) throw new Error("codePointAt(0) should return 72");
    if (testStr.codePointAt(7) !== 19990) throw new Error("codePointAt(7) should return Unicode code point");
    if (testStr.codePointAt(100) === undefined) { /* expected */ }
    else throw new Error("codePointAt out of bounds should return undefined");
}

// Test concat() method
var str1 = "Hello";
var str2 = " ";
var str3 = "World";
if (str1.concat(str2, str3) !== "Hello World") throw new Error("concat should join multiple strings");
if (str1.concat() !== "Hello") throw new Error("concat with no args should return original");
if ("".concat("test") !== "test") throw new Error("concat on empty string should work");

// Test endsWith() method (ES2015)
if (typeof testStr.endsWith === 'function') {
    if (!testStr.endsWith("😀")) throw new Error("endsWith should work with emoji");
    if (testStr.endsWith("Hello")) throw new Error("endsWith should return false for beginning");
    if (!testStr.endsWith("Hello", 5)) throw new Error("endsWith with length should work");
    if (!"".endsWith("")) throw new Error("empty string should end with empty string");
}

// Test fixed() method (deprecated)
if (str.fixed() !== '<tt>test</tt>') throw new Error("fixed() should create HTML tt tag");

// Test fontcolor() method (deprecated)
if (str.fontcolor("red") !== '<font color="red">test</font>') throw new Error("fontcolor() should create font tag with color");

// Test fontsize() method (deprecated)
if (str.fontsize(3) !== '<font size="3">test</font>') throw new Error("fontsize() should create font tag with size");

// Test includes() method (ES2015)
if (typeof testStr.includes === 'function') {
    if (!testStr.includes("世界")) throw new Error("includes should find Unicode substring");
    if (testStr.includes("xyz")) throw new Error("includes should return false for non-existent substring");
    if (!testStr.includes("Hello", 0)) throw new Error("includes with position should work");
    if (testStr.includes("Hello", 1)) throw new Error("includes with position beyond match should return false");
}

// Test indexOf() method comprehensive
var indexStr = "hello world hello world";
if (indexStr.indexOf("hello") !== 0) throw new Error("indexOf should return first occurrence");
if (indexStr.indexOf("world") !== 6) throw new Error("indexOf should find correct position");
if (indexStr.indexOf("hello", 1) !== 12) throw new Error("indexOf with fromIndex should work");
if (indexStr.indexOf("xyz") !== -1) throw new Error("indexOf should return -1 for not found");
if (indexStr.indexOf("") !== 0) throw new Error("indexOf empty string should return 0");

// Test italics() method (deprecated)
if (str.italics() !== '<i>test</i>') throw new Error("italics() should create HTML i tag");

// Test lastIndexOf() method comprehensive
if (indexStr.lastIndexOf("hello") !== 12) throw new Error("lastIndexOf should return last occurrence");
if (indexStr.lastIndexOf("world") !== 18) throw new Error("lastIndexOf should find last world");
if (indexStr.lastIndexOf("hello", 10) !== 0) throw new Error("lastIndexOf with fromIndex should work");
if (indexStr.lastIndexOf("xyz") !== -1) throw new Error("lastIndexOf should return -1 for not found");

// Test link() method (deprecated)
if (str.link("http://example.com") !== '<a href="http://example.com">test</a>') throw new Error("link() should create HTML link");

// Test localeCompare() method
var locale1 = "apple";
var locale2 = "banana";
var locale3 = "apple";
if (locale1.localeCompare(locale2) >= 0) throw new Error("localeCompare should return negative for apple < banana");
if (locale1.localeCompare(locale3) !== 0) throw new Error("localeCompare should return 0 for equal strings");
if (locale2.localeCompare(locale1) <= 0) throw new Error("localeCompare should return positive for banana > apple");

// Test match() method with string
var matchStr = "The rain in Spain stays mainly in the plain";
var matches = matchStr.match("ain");
if (!matches || matches[0] !== "ain") throw new Error("match with string should return array");
if (matches.index !== 5) throw new Error("match should have correct index");

// Test normalize() method (ES2015)
if (typeof "test".normalize === 'function') {
    var accented = "café";
    var normalized = accented.normalize("NFD");
    if (typeof normalized !== "string") throw new Error("normalize should return string");
}

// Test padEnd() method (ES2017)
if (typeof "test".padEnd === 'function') {
    if ("test".padEnd(8) !== "test    ") throw new Error("padEnd should pad with spaces by default");
    if ("test".padEnd(8, "*") !== "test****") throw new Error("padEnd should pad with custom character");
    if ("test".padEnd(2) !== "test") throw new Error("padEnd should not truncate if target length is smaller");
}

// Test padStart() method (ES2017)
if (typeof "test".padStart === 'function') {
    if ("test".padStart(8) !== "    test") throw new Error("padStart should pad with spaces by default");
    if ("test".padStart(8, "*") !== "****test") throw new Error("padStart should pad with custom character");
    if ("test".padStart(2) !== "test") throw new Error("padStart should not truncate if target length is smaller");
}

// Test repeat() method (ES2015)
if (typeof "test".repeat === 'function') {
    if ("test".repeat(3) !== "testtesttest") throw new Error("repeat should repeat string");
    if ("test".repeat(0) !== "") throw new Error("repeat(0) should return empty string");
    if ("test".repeat(1) !== "test") throw new Error("repeat(1) should return original string");
}

// Test replace() method comprehensive
var replaceStr = "hello world hello world";
if (replaceStr.replace("hello", "hi") !== "hi world hello world") throw new Error("replace should replace first occurrence only");
if (replaceStr.replace("xyz", "abc") !== replaceStr) throw new Error("replace with non-existent should return original");

// Test search() method
var searchStr = "The quick brown fox";
if (searchStr.search("quick") !== 4) throw new Error("search should return position of match");
if (searchStr.search("xyz") !== -1) throw new Error("search should return -1 for no match");

// Test slice() method comprehensive
var sliceStr = "Hello World";
if (sliceStr.slice(0, 5) !== "Hello") throw new Error("slice(0,5) should return 'Hello'");
if (sliceStr.slice(6) !== "World") throw new Error("slice(6) should return 'World'");
if (sliceStr.slice(-5) !== "World") throw new Error("slice with negative start should work");
if (sliceStr.slice(-5, -1) !== "Worl") throw new Error("slice with negative end should work");
if (sliceStr.slice(5, 0) !== "") throw new Error("slice with start > end should return empty string");

// Test small() method (deprecated)
if (str.small() !== '<small>test</small>') throw new Error("small() should create HTML small tag");

// Test split() method comprehensive
var splitStr = "apple,banana,cherry,date";
var fruits = splitStr.split(",");
if (fruits.length !== 4) throw new Error("split should return correct number of elements");
if (fruits[0] !== "apple") throw new Error("split should return correct first element");

var limited = splitStr.split(",", 2);
if (limited.length !== 2) throw new Error("split with limit should work");

var chars = "hello".split("");
if (chars.length !== 5) throw new Error("split('') should return character array");

var noSplit = splitStr.split("xyz");
if (noSplit.length !== 1 || noSplit[0] !== splitStr) throw new Error("split with non-existent delimiter should return original in array");

// Test startsWith() method (ES2015)
if (typeof testStr.startsWith === 'function') {
    if (!testStr.startsWith("Hello")) throw new Error("startsWith should work");
    if (testStr.startsWith("world")) throw new Error("startsWith should return false for non-match");
    if (!testStr.startsWith("世界", 7)) throw new Error("startsWith with position should work");
}

// Test strike() method (deprecated)
if (str.strike() !== '<strike>test</strike>') throw new Error("strike() should create HTML strike tag");

// Test sub() method (deprecated)
if (str.sub() !== '<sub>test</sub>') throw new Error("sub() should create HTML sub tag");

// Test substr() method
var substrStr = "JavaScript";
if (substrStr.substr(0, 4) !== "Java") throw new Error("substr(0,4) should return 'Java'");
if (substrStr.substr(4) !== "Script") throw new Error("substr(4) should return 'Script'");
if (substrStr.substr(-6) !== "Script") throw new Error("substr with negative start should work");
if (substrStr.substr(-6, 4) !== "Scri") throw new Error("substr with negative start and length should work");

// Test substring() method
if (substrStr.substring(0, 4) !== "Java") throw new Error("substring(0,4) should return 'Java'");
if (substrStr.substring(4) !== "Script") throw new Error("substring(4) should return 'Script'");
if (substrStr.substring(4, 0) !== "Java") throw new Error("substring should swap arguments if start > end");
if (substrStr.substring(-1, 4) !== "Java") throw new Error("substring should treat negative as 0");

// Test sup() method (deprecated)
if (str.sup() !== '<sup>test</sup>') throw new Error("sup() should create HTML sup tag");

// Test toLocaleLowerCase() method
var caseStr = "İSTANBUL";
if (typeof caseStr.toLocaleLowerCase() !== "string") throw new Error("toLocaleLowerCase should return string");

// Test toLocaleUpperCase() method
var lowerStr = "istanbul";
if (typeof lowerStr.toLocaleUpperCase() !== "string") throw new Error("toLocaleUpperCase should return string");

// Test toLowerCase() method
var upperStr = "HELLO WORLD";
if (upperStr.toLowerCase() !== "hello world") throw new Error("toLowerCase should convert to lowercase");
if (upperStr !== "HELLO WORLD") throw new Error("Original string should remain unchanged");

// Test toString() method
var stringObj = new String("test");
if (stringObj.toString() !== "test") throw new Error("toString should return primitive string");
if ("test".toString() !== "test") throw new Error("toString on primitive should work");

// Test toUpperCase() method
var lowerCaseStr = "hello world";
if (lowerCaseStr.toUpperCase() !== "HELLO WORLD") throw new Error("toUpperCase should convert to uppercase");
if (lowerCaseStr !== "hello world") throw new Error("Original string should remain unchanged");

// Test trim() method (ES5)
if (typeof "  test  ".trim === 'function') {
    if ("  test  ".trim() !== "test") throw new Error("trim should remove leading and trailing whitespace");
    if ("test".trim() !== "test") throw new Error("trim on string without whitespace should return original");
    if ("   ".trim() !== "") throw new Error("trim on only whitespace should return empty string");
}

// Test trimEnd() / trimRight() method (ES2019)
if (typeof "  test  ".trimEnd === 'function') {
    if ("  test  ".trimEnd() !== "  test") throw new Error("trimEnd should remove trailing whitespace only");
}
if (typeof "  test  ".trimRight === 'function') {
    if ("  test  ".trimRight() !== "  test") throw new Error("trimRight should remove trailing whitespace only");
}

// Test trimStart() / trimLeft() method (ES2019)
if (typeof "  test  ".trimStart === 'function') {
    if ("  test  ".trimStart() !== "test  ") throw new Error("trimStart should remove leading whitespace only");
}
if (typeof "  test  ".trimLeft === 'function') {
    if ("  test  ".trimLeft() !== "test  ") throw new Error("trimLeft should remove leading whitespace only");
}

// Test valueOf() method
var stringObject = new String("hello");
if (stringObject.valueOf() !== "hello") throw new Error("valueOf should return primitive string value");
if ("hello".valueOf() !== "hello") throw new Error("valueOf on primitive should return itself");

// Edge cases and boundary tests
if ("".charAt(0) !== "") throw new Error("charAt on empty string should return empty string");
if ("".length !== 0) throw new Error("Empty string length should be 0");
if ("a".repeat(0) !== "") throw new Error("repeat(0) should return empty string");

// Unicode edge cases in charAt and charCodeAt
var emoji = "👨‍👩‍👧‍👦";
if (emoji.length <= 0) throw new Error("Complex emoji should have positive length");
if (emoji.charAt(0) === "") throw new Error("charAt(0) on emoji should not be empty");

// Test method chaining
var chainResult = "  Hello World  ".trim().toUpperCase().substring(0, 5);
if (chainResult !== "HELLO") throw new Error("Method chaining should work correctly");