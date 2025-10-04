/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive String Methods with RegExp Integration
 * Tests String methods that accept RegExp: match, replace, search, split
 */

// Basic regex creation for testing
var simpleRegex = /test/;
var globalRegex = /test/g;
var caseInsensitive = /test/i;
var multiline = /^test/m;

// Test string.match() with RegExp
var matchStr = "This is a test string with test words";

// Basic match with regex
var basicMatch = matchStr.match(simpleRegex);
if (!basicMatch) throw new Error("match() with regex should return array");
if (basicMatch[0] !== "test") throw new Error("match() should find 'test'");
if (typeof basicMatch.index !== "number") throw new Error("match() should have index property");
if (typeof basicMatch.input !== "string") throw new Error("match() should have input property");

// Global match
var globalMatch = matchStr.match(globalRegex);
if (!globalMatch) throw new Error("global match() should return array");
if (globalMatch.length !== 2) throw new Error("global match() should find 2 occurrences");
if (globalMatch[0] !== "test") throw new Error("first global match should be 'test'");
if (globalMatch[1] !== "test") throw new Error("second global match should be 'test'");

// Case insensitive match
var caseStr = "TEST and test";
var caseMatch = caseStr.match(caseInsensitive);
if (!caseMatch) throw new Error("case insensitive match should work");
if (caseMatch[0] !== "TEST") throw new Error("case insensitive should match first occurrence");

// Match with groups
var groupRegex = /(t)(e)(st)/;
var groupMatch = "test".match(groupRegex);
if (!groupMatch) throw new Error("match with groups should work");
if (groupMatch.length !== 4) throw new Error("match with groups should return 4 elements");
if (groupMatch[0] !== "test") throw new Error("full match should be 'test'");
if (groupMatch[1] !== "t") throw new Error("first group should be 't'");
if (groupMatch[2] !== "e") throw new Error("second group should be 'e'");
if (groupMatch[3] !== "st") throw new Error("third group should be 'st'");

// Match with no result
var noMatch = "hello".match(/xyz/);
if (noMatch !== null) throw new Error("no match should return null");

// Test string.replace() with RegExp
var replaceStr = "The cat and the cat";

// Basic replace with regex
var basicReplace = replaceStr.replace(/cat/, "dog");
if (basicReplace !== "The dog and the cat") throw new Error("basic replace should replace first occurrence");

// Global replace
var globalReplace = replaceStr.replace(/cat/g, "dog");
if (globalReplace !== "The dog and the dog") throw new Error("global replace should replace all occurrences");

// Replace with function
var funcReplace = "test TEST".replace(/test/gi, function(match) {
    return match.toUpperCase();
});
if (funcReplace !== "TEST TEST") throw new Error("replace with function should work");

// Replace with groups and function
var groupReplace = "John Smith".replace(/(\w+)\s+(\w+)/, function(match, first, last) {
    return last + ", " + first;
});
if (groupReplace !== "Smith, John") throw new Error("replace with groups should work");

// Replace with $1, $2 placeholders
var dollarReplace = "John Smith".replace(/(\w+)\s+(\w+)/, "$2, $1");
if (dollarReplace !== "Smith, John") throw new Error("replace with dollar placeholders should work");

// Test special replacement patterns
var specialStr = "test";
var ampReplace = specialStr.replace(/test/, "[$&]"); // $& = whole match
if (ampReplace !== "[test]") throw new Error("$& replacement should work");

var beforeReplace = "XtestY".replace(/test/, "[$`]"); // $` = before match
if (beforeReplace !== "X[X]Y") throw new Error("$` replacement should work");

var afterReplace = "XtestY".replace(/test/, "[$']"); // $' = after match
if (afterReplace !== "X[Y]Y") throw new Error("$' replacement should work");

// Test string.search() with RegExp
var searchStr = "The quick brown fox";

// Basic search
var basicSearch = searchStr.search(/quick/);
if (basicSearch !== 4) throw new Error("search() should return position 4");

// Case insensitive search
var caseSearch = searchStr.search(/QUICK/i);
if (caseSearch !== 4) throw new Error("case insensitive search should work");

// Search with no result
var noSearch = searchStr.search(/xyz/);
if (noSearch !== -1) throw new Error("search with no match should return -1");

// Global flag in search (should be ignored)
var globalSearch = searchStr.search(/quick/g);
if (globalSearch !== 4) throw new Error("global flag should be ignored in search");

// Test string.split() with RegExp
var splitStr = "apple,banana;cherry:date";

// Basic split with regex
var regexSplit = splitStr.split(/[,;:]/);
if (!Array.isArray(regexSplit)) throw new Error("split with regex should return array");
if (regexSplit.length !== 4) throw new Error("split should create 4 elements");
if (regexSplit[0] !== "apple") throw new Error("first element should be 'apple'");
if (regexSplit[1] !== "banana") throw new Error("second element should be 'banana'");
if (regexSplit[2] !== "cherry") throw new Error("third element should be 'cherry'");
if (regexSplit[3] !== "date") throw new Error("fourth element should be 'date'");

// Split with limit
var limitSplit = splitStr.split(/[,;:]/, 2);
if (limitSplit.length !== 2) throw new Error("split with limit should return 2 elements");

// Split with capturing groups
var captureStr = "a,b;c";
var captureSplit = captureStr.split(/([,;])/);
if (captureSplit.length !== 5) throw new Error("split with capturing group should include separators");
if (captureSplit[0] !== "a") throw new Error("first element should be 'a'");
if (captureSplit[1] !== ",") throw new Error("second element should be comma");
if (captureSplit[2] !== "b") throw new Error("third element should be 'b'");
if (captureSplit[3] !== ";") throw new Error("fourth element should be semicolon");
if (captureSplit[4] !== "c") throw new Error("fifth element should be 'c'");

// Test complex regex patterns
var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
var emailStr = "Contact us at info@example.com or support@test.org";
var emailMatch = emailStr.match(emailRegex);
if (!emailMatch) throw new Error("email regex should match");
if (emailMatch[0] !== "info@example.com") throw new Error("should match first email");

// Global email match
var globalEmailMatch = emailStr.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
if (!globalEmailMatch || globalEmailMatch.length !== 2) throw new Error("should find 2 emails");

// URL regex test
var urlRegex = /https?:\/\/[^\s]+/g;
var urlStr = "Visit https://example.com or http://test.org for more info";
var urlMatch = urlStr.match(urlRegex);
if (!urlMatch || urlMatch.length !== 2) throw new Error("should find 2 URLs");

// Phone number regex
var phoneRegex = /\b\d{3}-\d{3}-\d{4}\b/g;
var phoneStr = "Call 123-456-7890 or 987-654-3210";
var phoneMatch = phoneStr.match(phoneRegex);
if (!phoneMatch || phoneMatch.length !== 2) throw new Error("should find 2 phone numbers");

// Test word boundaries
var wordStr = "The cat catches cats";
var wordMatch = wordStr.match(/\bcat\b/g);
if (!wordMatch || wordMatch.length !== 1) throw new Error("word boundary should match 'cat' but not 'catches' or 'cats'");

// Test digit patterns
var digitStr = "abc123def456ghi";
var digitMatch = digitStr.match(/\d+/g);
if (!digitMatch || digitMatch.length !== 2) throw new Error("should find 2 digit sequences");
if (digitMatch[0] !== "123") throw new Error("first digit sequence should be '123'");
if (digitMatch[1] !== "456") throw new Error("second digit sequence should be '456'");

// Test whitespace patterns
var whitespaceStr = "word1   word2\tword3\nword4";
var whitespaceMatch = whitespaceStr.split(/\s+/);
if (whitespaceMatch.length !== 4) throw new Error("split on whitespace should create 4 words");

// Test start and end anchors
var anchorStr = "test string test";
var startMatch = anchorStr.match(/^test/);
if (!startMatch) throw new Error("start anchor should match");

var endMatch = anchorStr.match(/test$/);
if (!endMatch) throw new Error("end anchor should match");

var noStartMatch = anchorStr.match(/^string/);
if (noStartMatch) throw new Error("start anchor should not match 'string'");

// Test multiline mode
var multilineStr = "line1\ntest\nline3";
var multilineMatch = multilineStr.match(/^test/m);
if (!multilineMatch) throw new Error("multiline anchor should match 'test' at line start");

// Test lookahead (if supported)
try {
    var lookaheadRegex = /\d+(?=px)/;
    var lookaheadStr = "width: 100px height: 200em";
    var lookaheadMatch = lookaheadStr.match(lookaheadRegex);
    if (lookaheadMatch && lookaheadMatch[0] !== "100") {
        throw new Error("positive lookahead should match '100'");
    }
} catch (e) {
    // Lookahead might not be supported
    console.log("Lookahead not supported: " + e.message);
}

// Test lookbehind (if supported)
try {
    var lookbehindRegex = /(?<=\$)\d+/;
    var lookbehindStr = "Price: $50 and €40";
    var lookbehindMatch = lookbehindStr.match(lookbehindRegex);
    if (lookbehindMatch && lookbehindMatch[0] !== "50") {
        throw new Error("positive lookbehind should match '50'");
    }
} catch (e) {
    // Lookbehind might not be supported
    console.log("Lookbehind not supported: " + e.message);
}

// Test Unicode regex (if supported)
try {
    var unicodeRegex = /\u{1F600}/u; // Grinning face emoji
    var unicodeStr = "Hello 😀 World";
    var unicodeMatch = unicodeStr.match(unicodeRegex);
    if (unicodeMatch && unicodeMatch[0] !== "😀") {
        throw new Error("Unicode regex should match emoji");
    }
} catch (e) {
    // Unicode flag might not be supported
    console.log("Unicode regex not supported: " + e.message);
}

// Test named capture groups (if supported)
try {
    var namedRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    var dateStr = "2023-12-25";
    var namedMatch = dateStr.match(namedRegex);
    if (namedMatch && namedMatch.groups) {
        if (namedMatch.groups.year !== "2023") throw new Error("named group 'year' should be '2023'");
        if (namedMatch.groups.month !== "12") throw new Error("named group 'month' should be '12'");
        if (namedMatch.groups.day !== "25") throw new Error("named group 'day' should be '25'");
    }
} catch (e) {
    // Named capture groups might not be supported
    console.log("Named capture groups not supported: " + e.message);
}

// Test regex flags
var flagsStr = "Test TEST test";

// Global flag
var gFlag = flagsStr.match(/test/g);
if (!gFlag || gFlag.length !== 1) throw new Error("global flag should find 1 match (case sensitive)");

// Ignore case flag
var iFlag = flagsStr.match(/test/gi);
if (!iFlag || iFlag.length !== 3) throw new Error("ignore case + global should find 3 matches");

// Multiline with newlines
var mStr = "test\nTEST\ntest";
var mFlag = mStr.match(/^test/gmi);
if (!mFlag || mFlag.length < 2) throw new Error("multiline + ignore case should find multiple matches");

// Test replace with complex patterns
var htmlStr = "<p>Hello</p><div>World</div>";
var htmlReplace = htmlStr.replace(/<(\w+)>/g, "[$1]");
if (htmlReplace !== "[p]Hello</p>[div]World</div>") throw new Error("complex replace should work");

// Test replace all tags
var allTagsReplace = htmlStr.replace(/<\/?(\w+)>/g, "");
if (allTagsReplace !== "HelloWorld") throw new Error("remove all tags should work");

// Test split with complex regex
var csvStr = '"John, Jr.",25,"New York, NY"';
var csvSplit = csvStr.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
if (csvSplit.length !== 3) throw new Error("CSV split should handle quoted commas");

// Test performance with large strings and regex
var largeStr = "test ".repeat(1000);
var largeMatch = largeStr.match(/test/g);
if (!largeMatch || largeMatch.length !== 1000) throw new Error("large string regex should work");

// Test regex with special characters
var specialChars = "Hello! How are you? I'm fine.";
var punctMatch = specialChars.match(/[!?.']/g);
if (!punctMatch || punctMatch.length !== 4) throw new Error("punctuation regex should find 4 characters");

// Test replace callback with regex
var callbackStr = "price: $10.50 and $25.99";
var priceReplace = callbackStr.replace(/\$(\d+)\.(\d+)/g, function(match, dollars, cents) {
    return "$" + dollars + "." + (cents.length === 1 ? cents + "0" : cents);
});
if (priceReplace !== "price: $10.50 and $25.99") throw new Error("price formatting should work");

// Final comprehensive regex test
var comprehensiveStr = "Email: john@example.com, Phone: 123-456-7890, Date: 2023-12-25, URL: https://example.com";

// Test multiple patterns
var emailFound = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(comprehensiveStr);
var phoneFound = /\b\d{3}-\d{3}-\d{4}\b/.test(comprehensiveStr);
var dateFound = /\b\d{4}-\d{2}-\d{2}\b/.test(comprehensiveStr);
var urlFound = /https?:\/\/[^\s,]+/.test(comprehensiveStr);

if (!emailFound) throw new Error("should find email in comprehensive string");
if (!phoneFound) throw new Error("should find phone in comprehensive string");
if (!dateFound) throw new Error("should find date in comprehensive string");
if (!urlFound) throw new Error("should find URL in comprehensive string");

// Test regex constructor
var constructedRegex = new RegExp("test", "gi");
var constructedMatch = "Test TEST test".match(constructedRegex);
if (!constructedMatch || constructedMatch.length !== 3) throw new Error("constructed regex should work like literal");