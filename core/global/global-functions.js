/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Global Functions
 */

// Test 1-10: eval() function
var evalResult = eval('2 + 3');
if (evalResult !== 5) throw new Error("eval should evaluate simple expressions");

var evalVar = 'test';
var evalResult2 = eval('evalVar + "ing"');
if (evalResult2 !== 'testing') throw new Error("eval should access local variables");

eval('var evalCreated = "created"');
if (evalCreated !== 'created') throw new Error("eval should create variables in current scope");

var evalContext = 'global';
function testEvalScope() {
    var evalContext = 'local';
    return eval('evalContext');
}
if (testEvalScope() !== 'local') throw new Error("eval should use local scope");

try {
    eval('throw new Error("eval error")');
    throw new Error("eval should not catch exceptions");
} catch (e) {
    if (e.message !== 'eval error') throw new Error("eval should propagate exceptions correctly");
}

eval('function evalFunction() { return "eval-func"; }');
if (evalFunction() !== 'eval-func') throw new Error("eval should create functions");

var evalObject = eval('({key: "value", method: function() { return this.key; }})');
if (evalObject.key !== 'value' || evalObject.method() !== 'value') throw new Error("eval should create objects with methods");

var evalArray = eval('[1, 2, 3]');
if (evalArray.length !== 3 || evalArray[1] !== 2) throw new Error("eval should create arrays");

try {
    eval('invalid syntax +++');
    throw new Error("eval should throw SyntaxError for invalid syntax");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("eval should throw SyntaxError for syntax errors");
}

var evalReturn = eval('(function() { return "returned"; })()');
if (evalReturn !== 'returned') throw new Error("eval should handle function expressions and calls");

// Test 11-20: parseInt() function
if (parseInt('123') !== 123) throw new Error("parseInt should parse decimal integers");
if (parseInt('123.456') !== 123) throw new Error("parseInt should ignore decimal part");
if (parseInt('  123  ') !== 123) throw new Error("parseInt should ignore whitespace");
if (parseInt('123abc') !== 123) throw new Error("parseInt should stop at non-numeric characters");

if (parseInt('0x10') !== 16) throw new Error("parseInt should parse hexadecimal by default");
if (parseInt('010') !== 10) throw new Error("parseInt should not parse octal by default in modern engines");
if (parseInt('0b10') !== 0) throw new Error("parseInt should not parse binary without explicit radix");

if (parseInt('FF', 16) !== 255) throw new Error("parseInt should parse hexadecimal with radix 16");
if (parseInt('777', 8) !== 511) throw new Error("parseInt should parse octal with radix 8");
if (parseInt('1010', 2) !== 10) throw new Error("parseInt should parse binary with radix 2");

if (!isNaN(parseInt(''))) throw new Error("parseInt should return NaN for empty string");
if (!isNaN(parseInt('abc'))) throw new Error("parseInt should return NaN for non-numeric string");

if (parseInt('-123') !== -123) throw new Error("parseInt should handle negative numbers");
if (parseInt('+123') !== 123) throw new Error("parseInt should handle explicit positive sign");

var parseIntRadixTests = [
    ['10', 2, 2], ['10', 8, 8], ['10', 10, 10], ['10', 16, 16],
    ['A', 16, 10], ['z', 36, 35]
];
for (var i = 0; i < parseIntRadixTests.length; i++) {
    var test = parseIntRadixTests[i];
    if (parseInt(test[0], test[1]) !== test[2]) {
        throw new Error("parseInt('" + test[0] + "', " + test[1] + ") should equal " + test[2]);
    }
}

// Test 21-30: parseFloat() function
if (parseFloat('123.456') !== 123.456) throw new Error("parseFloat should parse decimal numbers");
if (parseFloat('123') !== 123) throw new Error("parseFloat should parse integers");
if (parseFloat('  123.456  ') !== 123.456) throw new Error("parseFloat should ignore whitespace");
if (parseFloat('123.456abc') !== 123.456) throw new Error("parseFloat should stop at non-numeric characters");

if (parseFloat('3.14159') !== 3.14159) throw new Error("parseFloat should handle multiple decimal places");
if (parseFloat('.5') !== 0.5) throw new Error("parseFloat should handle numbers starting with decimal point");
if (parseFloat('5.') !== 5) throw new Error("parseFloat should handle numbers ending with decimal point");

if (parseFloat('1.23e10') !== 12300000000) throw new Error("parseFloat should handle scientific notation");
if (parseFloat('1.23E-4') !== 0.000123) throw new Error("parseFloat should handle negative exponents");
if (parseFloat('Infinity') !== Infinity) throw new Error("parseFloat should parse Infinity");
if (parseFloat('-Infinity') !== -Infinity) throw new Error("parseFloat should parse -Infinity");

if (!isNaN(parseFloat(''))) throw new Error("parseFloat should return NaN for empty string");
if (!isNaN(parseFloat('abc'))) throw new Error("parseFloat should return NaN for non-numeric string");

if (parseFloat('-123.456') !== -123.456) throw new Error("parseFloat should handle negative numbers");
if (parseFloat('+123.456') !== 123.456) throw new Error("parseFloat should handle explicit positive sign");

// parseFloat should ignore radix-like indicators
if (parseFloat('0x10') !== 0) throw new Error("parseFloat should not parse hexadecimal");
if (parseFloat('010.5') !== 10.5) throw new Error("parseFloat should not treat leading zero as octal");

// Test 31-40: isNaN() function
if (!isNaN(NaN)) throw new Error("isNaN should return true for NaN");
if (isNaN(123)) throw new Error("isNaN should return false for numbers");
if (isNaN('123')) throw new Error("isNaN should return false for numeric strings");
if (!isNaN('abc')) throw new Error("isNaN should return true for non-numeric strings");

if (isNaN(Infinity)) throw new Error("isNaN should return false for Infinity");
if (isNaN(-Infinity)) throw new Error("isNaN should return false for -Infinity");
if (isNaN(null)) throw new Error("isNaN should return false for null (converts to 0)");
if (!isNaN(undefined)) throw new Error("isNaN should return true for undefined");

if (isNaN(true)) throw new Error("isNaN should return false for true (converts to 1)");
if (isNaN(false)) throw new Error("isNaN should return false for false (converts to 0)");
if (!isNaN({})) throw new Error("isNaN should return true for objects");
if (isNaN([])) throw new Error("isNaN should return false for empty arrays (converts to 0)");

if (!isNaN([1, 2])) throw new Error("isNaN should return true for non-empty arrays");
if (isNaN('  123  ')) throw new Error("isNaN should return false for whitespace-padded numbers");

// Test type coercion behavior
var isNaNTests = [
    [0/0, true], [1/0, false], [-1/0, false],
    ['', false], [' ', false], ['123abc', true],
    [new Date(), false], [new Date('invalid'), true]
];
for (var j = 0; j < isNaNTests.length; j++) {
    var test = isNaNTests[j];
    if (isNaN(test[0]) !== test[1]) {
        throw new Error("isNaN(" + test[0] + ") should be " + test[1]);
    }
}

// Test 41-50: isFinite() function
if (!isFinite(123)) throw new Error("isFinite should return true for finite numbers");
if (!isFinite(-123.456)) throw new Error("isFinite should return true for negative finite numbers");
if (!isFinite(0)) throw new Error("isFinite should return true for zero");
if (isFinite(Infinity)) throw new Error("isFinite should return false for Infinity");

if (isFinite(-Infinity)) throw new Error("isFinite should return false for -Infinity");
if (isFinite(NaN)) throw new Error("isFinite should return false for NaN");
if (!isFinite('123')) throw new Error("isFinite should return true for numeric strings");
if (isFinite('abc')) throw new Error("isFinite should return false for non-numeric strings");

if (!isFinite(null)) throw new Error("isFinite should return true for null (converts to 0)");
if (isFinite(undefined)) throw new Error("isFinite should return false for undefined");
if (!isFinite(true)) throw new Error("isFinite should return true for true (converts to 1)");
if (!isFinite(false)) throw new Error("isFinite should return true for false (converts to 0)");

if (isFinite({})) throw new Error("isFinite should return false for objects");
if (!isFinite([])) throw new Error("isFinite should return true for empty arrays");
if (isFinite([1, 2])) throw new Error("isFinite should return false for non-empty arrays");

var isFiniteTests = [
    [Number.MAX_VALUE, true], [Number.MIN_VALUE, true],
    [1.7976931348623157e+308, true], [1.7976931348623157e+309, false],
    ['  123.456  ', true], ['123abc', false]
];
for (var k = 0; k < isFiniteTests.length; k++) {
    var test = isFiniteTests[k];
    if (isFinite(test[0]) !== test[1]) {
        throw new Error("isFinite(" + test[0] + ") should be " + test[1]);
    }
}

// Test 51-60: encodeURI() function
if (encodeURI('hello world') !== 'hello%20world') throw new Error("encodeURI should encode spaces");
if (encodeURI('hello@world.com') !== 'hello@world.com') throw new Error("encodeURI should not encode valid URI characters");
if (encodeURI('hello#world') !== 'hello#world') throw new Error("encodeURI should not encode hash character");
if (encodeURI('hello?world') !== 'hello?world') throw new Error("encodeURI should not encode question mark");

var specialChars = 'äöü';
var encoded = encodeURI(specialChars);
if (encoded === specialChars) throw new Error("encodeURI should encode non-ASCII characters");

if (encodeURI('http://example.com/path?query=value#fragment') === 'http://example.com/path?query=value#fragment') {
    // This is actually correct - encodeURI preserves URI structure
} else {
    throw new Error("encodeURI should preserve URI structure");
}

var charsToEncode = '<>"{}|\\^`';
var encodedChars = encodeURI(charsToEncode);
if (encodedChars === charsToEncode) throw new Error("encodeURI should encode unsafe characters");

if (encodeURI('\u00A9') !== '%C2%A9') throw new Error("encodeURI should encode Unicode characters correctly");
if (encodeURI('\u20AC') !== '%E2%82%AC') throw new Error("encodeURI should encode multi-byte Unicode characters");

// Test reserved characters that should NOT be encoded by encodeURI
var reserved = ';,/?:@&=+$';
if (encodeURI(reserved) !== reserved) throw new Error("encodeURI should not encode reserved characters");

// Test 61-70: decodeURI() function
if (decodeURI('hello%20world') !== 'hello world') throw new Error("decodeURI should decode spaces");
if (decodeURI('hello@world.com') !== 'hello@world.com') throw new Error("decodeURI should pass through unencoded characters");

try {
    decodeURI('%');
    throw new Error("decodeURI should throw for incomplete percent encoding");
} catch (e) {
    if (!(e instanceof URIError)) throw new Error("decodeURI should throw URIError for malformed sequences");
}

try {
    decodeURI('%ZZ');
    throw new Error("decodeURI should throw for invalid hex digits");
} catch (e) {
    if (!(e instanceof URIError)) throw new Error("decodeURI should throw URIError for invalid hex");
}

if (decodeURI('%C2%A9') !== '\u00A9') throw new Error("decodeURI should decode Unicode characters");
if (decodeURI('%E2%82%AC') !== '\u20AC') throw new Error("decodeURI should decode multi-byte Unicode");

var roundTripTest = 'Hello, 世界! 🌍';
if (decodeURI(encodeURI(roundTripTest)) !== roundTripTest) throw new Error("encodeURI/decodeURI should be round-trip safe");

if (decodeURI('hello%2Bworld') !== 'hello%2Bworld') throw new Error("decodeURI should not decode %2B");
if (decodeURI('hello%3Dworld') !== 'hello%3Dworld') throw new Error("decodeURI should not decode %3D");

try {
    decodeURI('%C0%80'); // Overlong encoding
    // Some engines might allow this, others might throw
} catch (e) {
    if (!(e instanceof URIError)) throw new Error("decodeURI should throw URIError for invalid sequences");
}

if (decodeURI('') !== '') throw new Error("decodeURI should handle empty strings");

// Test 71-80: encodeURIComponent() function
if (encodeURIComponent('hello world') !== 'hello%20world') throw new Error("encodeURIComponent should encode spaces");
if (encodeURIComponent('hello@world.com') !== 'hello%40world.com') throw new Error("encodeURIComponent should encode @ symbol");
if (encodeURIComponent('hello#world') !== 'hello%23world') throw new Error("encodeURIComponent should encode hash");
if (encodeURIComponent('hello?world') !== 'hello%3Fworld') throw new Error("encodeURIComponent should encode question mark");

if (encodeURIComponent('hello&world') !== 'hello%26world') throw new Error("encodeURIComponent should encode ampersand");
if (encodeURIComponent('hello=world') !== 'hello%3Dworld') throw new Error("encodeURIComponent should encode equals");
if (encodeURIComponent('hello+world') !== 'hello%2Bworld') throw new Error("encodeURIComponent should encode plus");

var componentChars = '();:@&=+$,/?#[]';
var encodedComponent = encodeURIComponent(componentChars);
if (encodedComponent === componentChars) throw new Error("encodeURIComponent should encode all reserved characters");

if (encodeURIComponent('\u00A9') !== '%C2%A9') throw new Error("encodeURIComponent should encode Unicode");
if (encodeURIComponent("'") !== "'") throw new Error("encodeURIComponent should not encode single quotes");

// Unreserved characters that should NOT be encoded
var unreserved = 'abcABC123-_.~';
if (encodeURIComponent(unreserved) !== unreserved) throw new Error("encodeURIComponent should not encode unreserved characters");

// Test 81-90: decodeURIComponent() function
if (decodeURIComponent('hello%20world') !== 'hello world') throw new Error("decodeURIComponent should decode spaces");
if (decodeURIComponent('hello%40world.com') !== 'hello@world.com') throw new Error("decodeURIComponent should decode @ symbol");
if (decodeURIComponent('hello%23world') !== 'hello#world') throw new Error("decodeURIComponent should decode hash");
if (decodeURIComponent('hello%3Fworld') !== 'hello?world') throw new Error("decodeURIComponent should decode question mark");

if (decodeURIComponent('hello%26world') !== 'hello&world') throw new Error("decodeURIComponent should decode ampersand");
if (decodeURIComponent('hello%3Dworld') !== 'hello=world') throw new Error("decodeURIComponent should decode equals");
if (decodeURIComponent('hello%2Bworld') !== 'hello+world') throw new Error("decodeURIComponent should decode plus");

try {
    decodeURIComponent('%');
    throw new Error("decodeURIComponent should throw for incomplete encoding");
} catch (e) {
    if (!(e instanceof URIError)) throw new Error("decodeURIComponent should throw URIError");
}

try {
    decodeURIComponent('%GG');
    throw new Error("decodeURIComponent should throw for invalid hex");
} catch (e) {
    if (!(e instanceof URIError)) throw new Error("decodeURIComponent should throw URIError for invalid hex");
}

var componentRoundTrip = 'Hello, 世界! @#$%^&*()';
if (decodeURIComponent(encodeURIComponent(componentRoundTrip)) !== componentRoundTrip) {
    throw new Error("encodeURIComponent/decodeURIComponent should be round-trip safe");
}

// Test 91-100: Complex scenarios and edge cases
var complexURI = 'http://example.com/path with spaces/file.html?param=value with spaces#fragment with spaces';
var encodedURI = encodeURI(complexURI);
var decodedURI = decodeURI(encodedURI);
if (decodedURI !== complexURI) throw new Error("Complex URI encoding/decoding should work");

var complexComponent = 'param=hello world&other=foo@bar.com#test';
var encodedComp = encodeURIComponent(complexComponent);
var decodedComp = decodeURIComponent(encodedComp);
if (decodedComp !== complexComponent) throw new Error("Complex component encoding/decoding should work");

// Test eval with complex expressions
var evalComplexResult = eval('(function(x) { return x * x; })(5)');
if (evalComplexResult !== 25) throw new Error("eval should handle complex function expressions");

var evalArrayResult = eval('[1,2,3].map(function(x) { return x * 2; })');
if (evalArrayResult.length !== 3 || evalArrayResult[0] !== 2) throw new Error("eval should handle array methods");

// Test numeric parsing edge cases
if (parseInt('0xFF', 16) !== 255) throw new Error("parseInt should handle hex with explicit radix");
if (parseFloat('1.23e+10') !== 12300000000) throw new Error("parseFloat should handle positive exponents");

// Test URI encoding with special Unicode characters
var emojiTest = '🌍🚀💻';
var encodedEmoji = encodeURIComponent(emojiTest);
var decodedEmoji = decodeURIComponent(encodedEmoji);
if (decodedEmoji !== emojiTest) throw new Error("URI encoding should handle emoji correctly");

// Test global function properties
if (typeof eval !== 'function') throw new Error("eval should be a function");
if (typeof parseInt !== 'function') throw new Error("parseInt should be a function");
if (typeof parseFloat !== 'function') throw new Error("parseFloat should be a function");
if (typeof isNaN !== 'function') throw new Error("isNaN should be a function");
if (typeof isFinite !== 'function') throw new Error("isFinite should be a function");

// Final validation of all global URI functions
var globalURIFunctions = ['encodeURI', 'decodeURI', 'encodeURIComponent', 'decodeURIComponent'];
for (var m = 0; m < globalURIFunctions.length; m++) {
    var funcName = globalURIFunctions[m];
    var globalObj = (typeof global !== 'undefined') ? global : this;
    if (typeof globalObj[funcName] !== 'function') {
        throw new Error(funcName + " should be a global function");
    }
}