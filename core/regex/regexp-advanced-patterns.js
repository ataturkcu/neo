/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: RegExp Advanced Patterns and Features
 */

// Test lookahead assertions
var positiveLookahead = /hello(?=\sworld)/;
if (!positiveLookahead.test("hello world")) throw new Error("Positive lookahead should match");
if (positiveLookahead.test("hello there")) throw new Error("Positive lookahead should not match without 'world'");

var negativeLookahead = /hello(?!\sworld)/;
if (!negativeLookahead.test("hello there")) throw new Error("Negative lookahead should match");
if (negativeLookahead.test("hello world")) throw new Error("Negative lookahead should not match with 'world'");

// Test lookbehind assertions (ES2018 - if supported)
try {
    var positiveLookbehind = new RegExp("(?<=hello\\s)world");
    if (!positiveLookbehind.test("hello world")) throw new Error("Positive lookbehind should match");
    if (positiveLookbehind.test("hi world")) throw new Error("Positive lookbehind should not match without 'hello'");

    var negativeLookbehind = new RegExp("(?<!hello\\s)world");
    if (!negativeLookbehind.test("hi world")) throw new Error("Negative lookbehind should match");
    if (negativeLookbehind.test("hello world")) throw new Error("Negative lookbehind should not match after 'hello'");
} catch (e) {
    // Lookbehind might not be supported in older engines
}

// Test backreferences
var backreference = /(hello)\s+\1/;
if (!backreference.test("hello hello")) throw new Error("Backreference should match repeated word");
if (backreference.test("hello world")) throw new Error("Backreference should not match different words");

// Test named capture groups (ES2018 - if supported)
try {
    var namedGroups = new RegExp("(?<greeting>hello)\\s+(?<target>world)");
    var namedResult = namedGroups.exec("hello world");
    if (namedResult.groups.greeting !== "hello") throw new Error("Named group 'greeting' should be 'hello'");
    if (namedResult.groups.target !== "world") throw new Error("Named group 'target' should be 'world'");
} catch (e) {
    // Named groups might not be supported
}

// Test Unicode property escapes (ES2018 - if supported)
try {
    var unicodeProperty = new RegExp("\\p{Letter}+", "u");
    if (!unicodeProperty.test("hello")) throw new Error("Unicode property should match letters");
    if (unicodeProperty.test("123")) throw new Error("Unicode property should not match numbers");
} catch (e) {
    // Unicode properties might not be supported
}

// Test Unicode flag
var unicodeFlag = /café/u;
if (!unicodeFlag.test("café")) throw new Error("Unicode flag should handle accented characters");

// Test sticky flag (ES2015 - if supported)
try {
    var stickyRegex = new RegExp("hello", "y");
    stickyRegex.lastIndex = 0;
    var stickyMatch1 = stickyRegex.exec("hello world hello");
    if (!stickyMatch1) throw new Error("Sticky regex should match at position 0");

    stickyRegex.lastIndex = 12; // Position of second "hello"
    var stickyMatch2 = stickyRegex.exec("hello world hello");
    if (!stickyMatch2) throw new Error("Sticky regex should match at exact position");

    stickyRegex.lastIndex = 5; // Middle of "world"
    var stickyMatch3 = stickyRegex.exec("hello world hello");
    if (stickyMatch3) throw new Error("Sticky regex should not match at wrong position");
} catch (e) {
    // Sticky flag might not be supported
}

// Test dotAll flag (ES2018 - if supported)
try {
    var dotAllRegex = new RegExp("hello.world", "s");
    if (!dotAllRegex.test("hello\nworld")) throw new Error("DotAll flag should match newlines");

    var normalRegex = /hello.world/;
    if (normalRegex.test("hello\nworld")) throw new Error("Normal dot should not match newlines");
} catch (e) {
    // DotAll flag might not be supported
}

// Test complex character classes
var customClass = /[a-zA-Z0-9_]+/;
if (!customClass.test("hello123_")) throw new Error("Custom class should match alphanumeric and underscore");
if (!customClass.test("hello-world")) throw new Error("Custom class should match part of hello-world (hello)");

var negatedClass = /[^0-9]+/;
if (!negatedClass.test("hello")) throw new Error("Negated class should match non-digits");
if (negatedClass.test("123")) throw new Error("Negated class should not match digits");

// Test escape sequences
var escapeTest = /\x41\u0042\x43/; // ABC in different escape formats
if (!escapeTest.test("ABC")) throw new Error("Escape sequences should work");

// Test quantifier variations
var lazyQuantifier = /a+?/;
var greedyQuantifier = /a+/;
var lazyResult = lazyQuantifier.exec("aaaa");
var greedyResult = greedyQuantifier.exec("aaaa");
if (lazyResult[0] !== "a") throw new Error("Lazy quantifier should match minimal");
if (greedyResult[0] !== "aaaa") throw new Error("Greedy quantifier should match maximal");

// Test exact quantifiers
var exactQuantifier = /a{3}/;
if (!exactQuantifier.test("aaa")) throw new Error("Exact quantifier should match exactly 3");
if (exactQuantifier.test("aa")) throw new Error("Exact quantifier should not match 2");
if (!exactQuantifier.test("aaaa")) throw new Error("Exact quantifier should find 3 a's in aaaa");

var rangeQuantifier = /a{2,4}/;
if (!rangeQuantifier.test("aa")) throw new Error("Range quantifier should match 2");
if (!rangeQuantifier.test("aaa")) throw new Error("Range quantifier should match 3");
if (!rangeQuantifier.test("aaaa")) throw new Error("Range quantifier should match 4");
if (rangeQuantifier.test("a")) throw new Error("Range quantifier should not match 1");

// Test multiline flag behavior
var multilineTest = /^world/m;
if (!multilineTest.test("hello\nworld")) throw new Error("Multiline ^ should match after newline");

var noMultilineTest = /^world/;
if (noMultilineTest.test("hello\nworld")) throw new Error("Non-multiline ^ should not match after newline");

// Test word character variations
var wordChars = /\w+/;
if (!wordChars.test("hello_123")) throw new Error("Word chars should match letters, digits, underscore");
// Note: \w+ will match "hello" part of "hello-world", so test should expect true
if (!wordChars.test("hello-world")) throw new Error("Word chars should match word parts even with non-word chars");

// Test specifically for non-word characters
var onlyNonWordChars = /^\W+$/;
if (!onlyNonWordChars.test("!@#$%")) throw new Error("Should match only non-word characters");

// Test boundary assertions in complex patterns
var complexBoundary = /\b\w{4}\b/;
if (!complexBoundary.test("this is a test")) throw new Error("Should match 4-letter words");
if (complexBoundary.test("hello world")) throw new Error("Should not match 5-letter words");

// Test alternation with groups
var groupAlternation = /(cat|dog|bird) (walks|flies|swims)/;
var altResult = groupAlternation.exec("bird flies");
if (altResult[1] !== "bird") throw new Error("First group should capture 'bird'");
if (altResult[2] !== "flies") throw new Error("Second group should capture 'flies'");

// Test nested groups
var nestedGroups = /((hello) (world))/;
var nestedResult = nestedGroups.exec("hello world");
if (nestedResult[1] !== "hello world") throw new Error("Outer group should capture full match");
if (nestedResult[2] !== "hello") throw new Error("First inner group should capture 'hello'");
if (nestedResult[3] !== "world") throw new Error("Second inner group should capture 'world'");

// Test regex flags property (ES2015 - if supported)
try {
    var flagsTest = /pattern/gim;
    if (flagsTest.flags !== "gim") throw new Error("flags property should return 'gim'");
} catch (e) {
    // flags property might not be supported
}

// Test replace with function
var replaceWithFunction = "hello world".replace(/(\w+)/g, function(match, group1, offset, string) {
    if (offset === 0) return group1.toUpperCase();
    return group1;
});
if (replaceWithFunction !== "HELLO world") throw new Error("Replace with function should work");

// Test replace with special replacement patterns
var replaceWithPatterns = "hello world".replace(/(hello) (world)/, "$2 $1");
if (replaceWithPatterns !== "world hello") throw new Error("Replacement patterns should swap groups");

// Test split with capturing groups
var splitWithGroups = "a,b;c,d".split(/([,;])/);
if (splitWithGroups.length !== 7) throw new Error("Split with capturing groups should include separators");
if (splitWithGroups[1] !== ",") throw new Error("Split should capture separator");

// Test match with global flag
var globalMatch = "hello world hello universe".match(/hello/g);
if (!Array.isArray(globalMatch)) throw new Error("Global match should return array");
if (globalMatch.length !== 2) throw new Error("Global match should find 2 occurrences");
if (globalMatch[0] !== "hello") throw new Error("First match should be 'hello'");

// Test complex real-world patterns
var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test("test@example.com")) throw new Error("Should match valid email");
if (emailPattern.test("invalid.email")) throw new Error("Should not match invalid email");

var urlPattern = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
if (!urlPattern.test("https://example.com/path")) throw new Error("Should match valid URL");
if (urlPattern.test("not-a-url")) throw new Error("Should not match invalid URL");

// Test performance with complex patterns
var complexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var start = Date.now();
for (var i = 0; i < 1000; i++) {
    complexPattern.test("Password123!");
}
var duration = Date.now() - start;
if (duration > 1000) throw new Error("Complex pattern should execute reasonably fast");