/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: BigInt Comprehensive Tests
 */

// Skip all tests if BigInt is not supported
if (typeof BigInt === 'undefined') {
    // BigInt not supported, skip tests silently
} else {

// Test 1-5: Basic BigInt creation
var result1 = BigInt(123);
if (typeof result1 !== 'bigint') throw new Error("BigInt(123) should return type 'bigint'");

var result2 = BigInt("456");
if (typeof result2 !== 'bigint') throw new Error("BigInt('456') should return type 'bigint'");

var result3 = 789n;
if (typeof result3 !== 'bigint') throw new Error("789n literal should return type 'bigint'");

var result4 = BigInt(0);
if (result4 !== 0n) throw new Error("BigInt(0) should equal 0n");

var result5 = BigInt(-123);
if (result5 !== -123n) throw new Error("BigInt(-123) should equal -123n");

// Test 6-10: BigInt from strings
var result6 = BigInt("999999999999999999999");
if (typeof result6 !== 'bigint') throw new Error("BigInt from large string should work");

var result7 = BigInt("0x1a");
if (result7 !== 26n) throw new Error("BigInt should parse hex strings");

var result8 = BigInt("0b1010");
if (result8 !== 10n) throw new Error("BigInt should parse binary strings");

var result9 = BigInt("0o17");
if (result9 !== 15n) throw new Error("BigInt should parse octal strings");

try {
    BigInt("123.45");
    throw new Error("BigInt should not accept decimal strings");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("BigInt decimal string should throw SyntaxError");
}

// Test 11-15: BigInt arithmetic operations
var a = 100n;
var b = 50n;

var result11 = a + b;
if (result11 !== 150n) throw new Error("BigInt addition failed");

var result12 = a - b;
if (result12 !== 50n) throw new Error("BigInt subtraction failed");

var result13 = a * b;
if (result13 !== 5000n) throw new Error("BigInt multiplication failed");

var result14 = a / b;
if (result14 !== 2n) throw new Error("BigInt division failed");

var result15 = a % b;
if (result15 !== 0n) throw new Error("BigInt modulo failed");

// Test 16-20: BigInt comparison operations
var x = 100n;
var y = 50n;
var z = 100n;

if (!(x > y)) throw new Error("BigInt greater than failed");
if (!(y < x)) throw new Error("BigInt less than failed");
if (!(x >= z)) throw new Error("BigInt greater than or equal failed");
if (!(y <= x)) throw new Error("BigInt less than or equal failed");
if (x !== z) throw new Error("BigInt strict equality failed");

// Test 21-25: BigInt with mixed types (should throw)
try {
    1n + 1;
    throw new Error("BigInt + Number should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("BigInt + Number should throw TypeError");
}

try {
    1n - 1;
    throw new Error("BigInt - Number should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("BigInt - Number should throw TypeError");
}

try {
    1n * 1;
    throw new Error("BigInt * Number should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("BigInt * Number should throw TypeError");
}

try {
    1n / 1;
    throw new Error("BigInt / Number should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("BigInt / Number should throw TypeError");
}

try {
    1n % 1;
    throw new Error("BigInt % Number should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("BigInt % Number should throw TypeError");
}

// Test 26-30: BigInt unary operations
var result26 = -123n;
if (result26 !== -123n) throw new Error("Unary minus on BigInt failed");

// Unary + not allowed on BigInt - would throw TypeError
try {
    eval("+123n");
    throw new Error("Unary + on BigInt should throw");
} catch (e) {
    if (!(e instanceof TypeError || e instanceof SyntaxError)) throw new Error("Unary + should throw TypeError or SyntaxError");
}

var result28 = ~5n;
if (result28 !== -6n) throw new Error("Bitwise NOT on BigInt failed");

var result29 = ++result28;
if (result29 !== -5n) throw new Error("Pre-increment on BigInt failed");

var result30 = result29--;
if (result30 !== -5n || result29 !== -6n) throw new Error("Post-decrement on BigInt failed");

// Test 31-35: BigInt bitwise operations
var result31 = 5n & 3n;
if (result31 !== 1n) throw new Error("BigInt bitwise AND failed");

var result32 = 5n | 3n;
if (result32 !== 7n) throw new Error("BigInt bitwise OR failed");

var result33 = 5n ^ 3n;
if (result33 !== 6n) throw new Error("BigInt bitwise XOR failed");

var result34 = 5n << 2n;
if (result34 !== 20n) throw new Error("BigInt left shift failed");

var result35 = 20n >> 2n;
if (result35 !== 5n) throw new Error("BigInt right shift failed");

// Test 36-40: BigInt constructor edge cases
try {
    BigInt(1.5);
    throw new Error("BigInt should not accept non-integer numbers");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("BigInt non-integer should throw RangeError");
}

try {
    BigInt(Infinity);
    throw new Error("BigInt should not accept Infinity");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("BigInt Infinity should throw RangeError");
}

try {
    BigInt(NaN);
    throw new Error("BigInt should not accept NaN");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("BigInt NaN should throw RangeError");
}

try {
    new BigInt(123);
    throw new Error("new BigInt() should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("new BigInt() should throw TypeError");
}

var result40 = BigInt(123.0);
if (result40 !== 123n) throw new Error("BigInt should accept integer-valued floats");

// Test 41-45: BigInt string conversion
var result41 = String(123n);
if (result41 !== "123") throw new Error("String(BigInt) failed");

var result42 = (456n).toString();
if (result42 !== "456") throw new Error("BigInt.toString() failed");

var result43 = (255n).toString(16);
if (result43 !== "ff") throw new Error("BigInt.toString(16) failed");

var result44 = (10n).toString(2);
if (result44 !== "1010") throw new Error("BigInt.toString(2) failed");

var result45 = (64n).toString(8);
if (result45 !== "100") throw new Error("BigInt.toString(8) failed");

// Test 46-50: BigInt valueOf and type coercion
var result46 = (123n).valueOf();
if (result46 !== 123n) throw new Error("BigInt.valueOf() failed");

var result47 = Boolean(0n);
if (result47 !== false) throw new Error("Boolean(0n) should be false");

var result48 = Boolean(1n);
if (result48 !== true) throw new Error("Boolean(1n) should be true");

// Number(BigInt) actually works and converts to number
var numberFromBigInt = Number(123n);
if (numberFromBigInt !== 123) throw new Error("Number(123n) should equal 123");

var result50 = 123n + "";
if (result50 !== "123") throw new Error("BigInt string coercion failed");

// Test 51-55: BigInt in object context
var obj = {};
obj[123n] = "bigint key";
if (obj["123"] !== "bigint key") throw new Error("BigInt object key should coerce to string");

var arr = [1n, 2n, 3n];
var result52 = arr.join(",");
if (result52 !== "1,2,3") throw new Error("BigInt array join failed");

// JSON.stringify(BigInt) throws TypeError
try {
    JSON.stringify(123n);
    throw new Error("JSON.stringify(BigInt) should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify(BigInt) should throw TypeError");
}

try {
    JSON.stringify({a: 123n});
    throw new Error("JSON.stringify with BigInt property should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify BigInt should throw TypeError");
}

var result55 = Object.prototype.toString.call(123n);
if (result55 !== "[object BigInt]") throw new Error("Object.prototype.toString.call(BigInt) failed");

// Test 56-60: BigInt large number operations
var large1 = BigInt("999999999999999999999999999999");
var large2 = BigInt("111111111111111111111111111111");
var result56 = large1 + large2;
if (typeof result56 !== 'bigint') throw new Error("Large BigInt addition should work");

var result57 = large1 - large2;
if (typeof result57 !== 'bigint') throw new Error("Large BigInt subtraction should work");

var huge = BigInt("123456789012345678901234567890");
var result58 = huge * 2n;
if (typeof result58 !== 'bigint') throw new Error("Large BigInt multiplication should work");

var result59 = huge / 3n;
if (typeof result59 !== 'bigint') throw new Error("Large BigInt division should work");

var result60 = 2n ** 100n;
if (typeof result60 !== 'bigint') throw new Error("BigInt exponentiation should work");

// Test 61-65: BigInt edge cases and special values
var result61 = BigInt("0");
if (result61 !== 0n) throw new Error("BigInt('0') should equal 0n");

var result62 = BigInt("-0");
if (result62 !== 0n) throw new Error("BigInt('-0') should equal 0n");

var result63 = 0n === -0n;
if (!result63) throw new Error("0n should equal -0n");

var result64 = 1n / 1n;
if (result64 !== 1n) throw new Error("BigInt division by same value should be 1n");

try {
    1n / 0n;
    throw new Error("Division by 0n should throw");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Division by 0n should throw RangeError");
}

// Test 66-70: BigInt comparison with coercion
var result66 = 123n == 123;
if (!result66) throw new Error("BigInt should equal number with ==");

var result67 = 123n === 123;
if (result67) throw new Error("BigInt should not equal number with ===");

var result68 = 123n < 124;
if (!result68) throw new Error("BigInt should compare with number using <");

var result69 = 125n > 124;
if (!result69) throw new Error("BigInt should compare with number using >");

// Test property access and methods
if (typeof BigInt.prototype.toString !== 'function') {
    throw new Error("BigInt.prototype.toString should be a function");
}

if (typeof BigInt.prototype.valueOf !== 'function') {
    throw new Error("BigInt.prototype.valueOf should be a function");
}

if (BigInt.length !== 1) {
    throw new Error("BigInt.length should be 1");
}

// Test BigInt literals in different contexts
var switchTest = 42n;
var switchResult = "";
switch (switchTest) {
    case 42n:
        switchResult = "matched";
        break;
    default:
        switchResult = "no match";
}
if (switchResult !== "matched") throw new Error("BigInt in switch statement failed");

// Test BigInt with Math functions should throw
try {
    Math.abs(123n);
    throw new Error("Math functions should not accept BigInt");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Math functions should throw TypeError for BigInt");
}

// Test BigInt asIntN and asUintN if available
if (typeof BigInt.asIntN === 'function') {
    var result = BigInt.asIntN(8, 255n);
    if (result !== -1n) throw new Error("BigInt.asIntN failed");
}

if (typeof BigInt.asUintN === 'function') {
    var result = BigInt.asUintN(8, 257n);
    if (result !== 1n) throw new Error("BigInt.asUintN failed");
}

} // End of BigInt support check