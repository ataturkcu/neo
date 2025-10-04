/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Unicode String Handling
 * Tests Unicode normalization, surrogate pairs, emoji, RTL text, and edge cases
 */

// Basic Unicode character tests
var unicode1 = "Hello, 世界!";
if (unicode1.length !== 10) throw new Error("Unicode string length should be 10 characters");
if (unicode1.charAt(7) !== "世") throw new Error("charAt should work with Unicode characters");
if (unicode1.charCodeAt(7) !== 19990) throw new Error("charCodeAt should return correct Unicode code point for 世");

// Test Unicode normalization (ES2015)
if (typeof "test".normalize === 'function') {
    // Combining characters test
    var cafe1 = "café";  // é as single character
    var cafe2 = "cafe\u0301";  // e + combining acute accent

    if (cafe1 === cafe2) {
        // Some engines may not distinguish these without normalization
    } else {
        var norm1 = cafe1.normalize("NFC");
        var norm2 = cafe2.normalize("NFC");
        if (norm1 !== norm2) throw new Error("Unicode normalization NFC should make equivalent strings equal");
    }

    // Test different normalization forms
    var accented = "é";
    if (typeof accented.normalize("NFD") !== "string") throw new Error("normalize NFD should return string");
    if (typeof accented.normalize("NFKC") !== "string") throw new Error("normalize NFKC should return string");
    if (typeof accented.normalize("NFKD") !== "string") throw new Error("normalize NFKD should return string");
}

// Surrogate pair tests (characters requiring two UTF-16 code units)
var surrogatePair = "𝓗𝓮𝓵𝓵𝓸"; // Mathematical script letters
if (surrogatePair.length !== 10) throw new Error("String with surrogate pairs should count each pair as 2 length units");

// Test codePointAt with surrogate pairs
if (typeof surrogatePair.codePointAt === 'function') {
    var codePoint = surrogatePair.codePointAt(0);
    if (codePoint < 65536) throw new Error("codePointAt should return full code point for surrogate pair");

    // Test that codePointAt handles surrogate pairs correctly
    var nextCodePoint = surrogatePair.codePointAt(2);
    if (nextCodePoint === codePoint) throw new Error("Different characters should have different code points");
}

// Emoji tests
var simpleEmoji = "😀😂🥰";
if (simpleEmoji.length !== 6) throw new Error("Simple emoji string should have length 6 (2 per emoji)");

// Complex emoji with modifiers
var complexEmoji = "👨‍👩‍👧‍👦"; // Family emoji (man, woman, girl, boy with ZWJ)
if (complexEmoji.length <= 6) throw new Error("Complex emoji should have significant length due to ZWJ sequences");

// Skin tone modifier tests
var handEmoji = "👋🏽"; // Waving hand with medium skin tone
if (handEmoji.length !== 4) throw new Error("Emoji with skin tone modifier should have length 4");

// Test emoji in string methods
var emojiString = "Hello 😀 World 🌍!";
if (emojiString.indexOf("😀") === -1) throw new Error("indexOf should find emoji in string");
if (emojiString.indexOf("🌍") === -1) throw new Error("indexOf should find earth emoji");

var emojiSplit = emojiString.split(" ");
if (emojiSplit.length !== 4) throw new Error("split should handle emoji correctly");
if (emojiSplit[1] !== "😀") throw new Error("split should preserve emoji as separate element");

// Test emoji with replace
var emojiReplace = "I love ☕ coffee".replace("☕", "🍵");
if (emojiReplace !== "I love 🍵 coffee") throw new Error("replace should work with emoji");

// Right-to-left (RTL) text tests
var arabic = "مرحبا بالعالم"; // "Hello World" in Arabic
var hebrew = "שלום עולם"; // "Hello World" in Hebrew

if (arabic.length !== 13) throw new Error("Arabic string should have correct length");
if (hebrew.length !== 9) throw new Error("Hebrew string should have correct length");

// Test RTL with charAt
if (arabic.charAt(0) !== "م") throw new Error("charAt should work with Arabic characters");
if (hebrew.charAt(0) !== "ש") throw new Error("charAt should work with Hebrew characters");

// Mixed RTL and LTR text
var mixed = "Hello " + arabic + " World";
if (mixed.indexOf(arabic) === -1) throw new Error("indexOf should find RTL text in mixed string");

// Test substring with RTL text
var arabicSub = arabic.substring(0, 5);
if (arabicSub.length !== 5) throw new Error("substring should work correctly with RTL text");

// Asian character tests (Chinese, Japanese, Korean)
var chinese = "你好世界";
var japanese = "こんにちは世界";
var korean = "안녕하세요 세계";

if (chinese.length !== 4) throw new Error("Chinese string should have length 4");
if (japanese.length !== 7) throw new Error("Japanese string should have length 7");
if (korean.length !== 8) throw new Error("Korean string should have length 8");

// Test case conversion with non-Latin scripts
var turkishI = "İstanbul";
var turkishLower = turkishI.toLowerCase();
// Note: Proper Turkish locale would convert İ to i, but we test basic behavior
if (typeof turkishLower !== "string") throw new Error("toLowerCase should work with Turkish characters");

var russianUpper = "привет".toUpperCase();
if (typeof russianUpper !== "string") throw new Error("toUpperCase should work with Cyrillic characters");

// Zero-width characters
var zeroWidth = "ab\u200Bcd"; // Zero-width space
if (zeroWidth.length !== 5) throw new Error("String with zero-width space should include it in length");
if (zeroWidth.charAt(2) !== "\u200B") throw new Error("charAt should find zero-width space");

// Control characters
var controlChars = "Hello\u0000\u0001\u0002World";
if (controlChars.length !== 13) throw new Error("String with control characters should include them in length");

// Byte order mark (BOM)
var bom = "\uFEFFHello";
if (bom.length !== 6) throw new Error("String with BOM should include it in length");
if (bom.charAt(0) !== "\uFEFF") throw new Error("BOM should be at position 0");

// Mathematical symbols
var mathSymbols = "∑∫∞≠≤≥";
if (mathSymbols.length !== 6) throw new Error("Mathematical symbols should have correct length");
if (mathSymbols.indexOf("∞") === -1) throw new Error("indexOf should find infinity symbol");

// Currency symbols
var currencies = "¥€£₹₽₩";
if (currencies.length !== 6) throw new Error("Currency symbols should have correct length");
if (currencies.includes && !currencies.includes("€")) throw new Error("includes should find Euro symbol");

// Miscellaneous symbols
var symbols = "♠♥♦♣★☆";
if (symbols.length !== 6) throw new Error("Card and star symbols should have correct length");

// Test Unicode in split operations
var unicodeSplit = "a🌟b🌟c".split("🌟");
if (unicodeSplit.length !== 3) throw new Error("split should work with emoji delimiter");
if (unicodeSplit[0] !== "a") throw new Error("split result should preserve non-emoji parts");

// Test Unicode in match operations
var unicodeMatch = "测试 test тест".match("тест");
if (!unicodeMatch || unicodeMatch[0] !== "тест") throw new Error("match should work with Cyrillic text");

// Combining diacritical marks
var combining = "e\u0301\u0300\u0302"; // e with acute, grave, and circumflex
if (combining.length !== 4) throw new Error("String with combining marks should include each mark in length");

// Variation selectors
var variation = "♀\uFE0F"; // Female sign with variation selector-16 (emoji style)
if (variation.length !== 2) throw new Error("Character with variation selector should have length 2");

// Ligatures and special forms
var ligature = "ﬁﬂ"; // fi and fl ligatures
if (ligature.length !== 2) throw new Error("Ligature characters should each count as 1");

// Test very long Unicode strings
var longUnicode = "测".repeat(1000);
if (longUnicode.length !== 1000) throw new Error("Long Unicode string should have correct length");

// Test Unicode with trim operations
if (typeof "\u2000测试\u2000".trim === 'function') {
    var trimmed = "\u2000测试\u2000".trim(); // En quad spaces
    if (trimmed !== "测试") throw new Error("trim should remove Unicode whitespace");
}

// Test Unicode normalization edge cases
if (typeof "test".normalize === 'function') {
    // Test with empty string
    if ("".normalize() !== "") throw new Error("normalize on empty string should return empty string");

    // Test with ASCII-only string
    if ("hello".normalize("NFC") !== "hello") throw new Error("normalize on ASCII should return unchanged");

    // Test invalid normalization form handling
    try {
        "test".normalize("INVALID");
        throw new Error("normalize should throw on invalid form");
    } catch (e) {
        // Expected - invalid normalization form should throw
        if (e.message === "normalize should throw on invalid form") throw e;
    }
}

// Test locale-sensitive operations
var germanSz = "Straße";
if (typeof germanSz.toLocaleLowerCase === 'function') {
    var lowerGerman = germanSz.toLocaleLowerCase();
    if (typeof lowerGerman !== "string") throw new Error("toLocaleLowerCase should work with German characters");
}

// Test Unicode in regular expressions (basic test)
var unicodeRegex = /世界/;
if (!unicodeRegex.test("Hello 世界")) throw new Error("Unicode regex should match Unicode characters");

// Test padStart/padEnd with Unicode
if (typeof "测".padStart === 'function') {
    var padded = "测".padStart(5, "试");
    if (padded.length !== 5) throw new Error("padStart with Unicode should work correctly");
}

// Test repeat with Unicode
if (typeof "🌟".repeat === 'function') {
    var repeated = "🌟".repeat(3);
    if (repeated.length !== 6) throw new Error("repeat with emoji should work correctly");
}

// Test startsWith/endsWith with Unicode
if (typeof "世界测试".startsWith === 'function') {
    if (!"世界测试".startsWith("世界")) throw new Error("startsWith should work with Unicode");
    if (!"世界测试".endsWith("测试")) throw new Error("endsWith should work with Unicode");
}

// Test Unicode boundary conditions
var boundary = "\uD800"; // High surrogate without low surrogate (invalid)
if (boundary.length !== 1) throw new Error("Lone high surrogate should have length 1");

// Test with maximum Unicode code point
var maxUnicode = "\uDBFF\uDFFF"; // Maximum valid surrogate pair
if (maxUnicode.length !== 2) throw new Error("Maximum Unicode surrogate pair should have length 2");

// Test Unicode property escapes (if supported)
var unicodeProps = "A1α一";
if (unicodeProps.length !== 4) throw new Error("Mixed script string should have correct length");

// Final comprehensive test - mix everything
var comprehensive = "Hello 🌍! مرحبا 世界 测试 🎉 café résumé naïve";
if (comprehensive.indexOf("🌍") === -1) throw new Error("Comprehensive string should contain emoji");
if (comprehensive.indexOf("مرحبا") === -1) throw new Error("Comprehensive string should contain Arabic");
if (comprehensive.indexOf("世界") === -1) throw new Error("Comprehensive string should contain Chinese");
if (comprehensive.indexOf("café") === -1) throw new Error("Comprehensive string should contain accented characters");

var comprehensiveUpper = comprehensive.toUpperCase();
if (typeof comprehensiveUpper !== "string") throw new Error("toUpperCase should work on comprehensive Unicode string");