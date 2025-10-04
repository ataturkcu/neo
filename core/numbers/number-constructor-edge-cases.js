/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Number Constructor Edge Cases
 */

// Test Number() without new - primitive conversion
if (Number() !== 0) throw new Error("Number() should return 0");
// Number(undefined) returns NaN, and NaN !== NaN by design
if (!isNaN(Number(undefined))) throw new Error("Number(undefined) should return NaN");
if (Number(null) !== 0) throw new Error("Number(null) should return 0");
if (Number(true) !== 1) throw new Error("Number(true) should return 1");
if (Number(false) !== 0) throw new Error("Number(false) should return 0");

// Test Number constructor with new - object wrapper
var numObj1 = new Number(42);
if (typeof numObj1 !== "object") throw new Error("new Number(42) should return object");
if (numObj1.valueOf() !== 42) throw new Error("new Number(42).valueOf() should be 42");
if (numObj1.toString() !== "42") throw new Error("new Number(42).toString() should be '42'");

var numObj2 = new Number();
if (numObj2.valueOf() !== 0) throw new Error("new Number().valueOf() should be 0");

// Test Number with string inputs
if (Number("123") !== 123) throw new Error("Number('123') should be 123");
if (Number("123.456") !== 123.456) throw new Error("Number('123.456') should be 123.456");
if (Number("-123.456") !== -123.456) throw new Error("Number('-123.456') should be -123.456");
if (Number("+123.456") !== 123.456) throw new Error("Number('+123.456') should be 123.456");
if (Number("0") !== 0) throw new Error("Number('0') should be 0");
if (Number("-0") !== -0) throw new Error("Number('-0') should be -0");
if (1 / Number("-0") !== -Infinity) throw new Error("Number('-0') should preserve negative zero");

// Test Number with whitespace strings
if (Number("  123  ") !== 123) throw new Error("Number('  123  ') should be 123");
if (Number("\t\n123\r\n") !== 123) throw new Error("Number with tab/newline should be 123");
if (Number("") !== 0) throw new Error("Number('') should be 0");
if (Number("   ") !== 0) throw new Error("Number('   ') should be 0");

// Test Number with invalid strings
if (!isNaN(Number("abc"))) throw new Error("Number('abc') should be NaN");
if (!isNaN(Number("123abc"))) throw new Error("Number('123abc') should be NaN");
if (!isNaN(Number("abc123"))) throw new Error("Number('abc123') should be NaN");
if (!isNaN(Number("12.34.56"))) throw new Error("Number('12.34.56') should be NaN");

// Test Number with special string values
if (Number("Infinity") !== Infinity) throw new Error("Number('Infinity') should be Infinity");
if (Number("-Infinity") !== -Infinity) throw new Error("Number('-Infinity') should be -Infinity");
if (Number("+Infinity") !== Infinity) throw new Error("Number('+Infinity') should be Infinity");
if (!isNaN(Number("NaN"))) throw new Error("Number('NaN') should be NaN");

// Test Number with scientific notation
if (Number("1e3") !== 1000) throw new Error("Number('1e3') should be 1000");
if (Number("1E3") !== 1000) throw new Error("Number('1E3') should be 1000");
if (Number("1e-3") !== 0.001) throw new Error("Number('1e-3') should be 0.001");
if (Number("1.23e2") !== 123) throw new Error("Number('1.23e2') should be 123");
if (Number("1.23e-2") !== 0.0123) throw new Error("Number('1.23e-2') should be 0.0123");
if (Number("1e+3") !== 1000) throw new Error("Number('1e+3') should be 1000");

// Test Number with binary literals (ES2015)
if (Number("0b1010") !== 10) throw new Error("Number('0b1010') should be 10");
if (Number("0B1010") !== 10) throw new Error("Number('0B1010') should be 10");
if (Number("0b0") !== 0) throw new Error("Number('0b0') should be 0");
if (Number("0b1") !== 1) throw new Error("Number('0b1') should be 1");

// Test Number with octal literals (ES2015)
if (Number("0o755") !== 493) throw new Error("Number('0o755') should be 493");
if (Number("0O755") !== 493) throw new Error("Number('0O755') should be 493");
if (Number("0o0") !== 0) throw new Error("Number('0o0') should be 0");
if (Number("0o7") !== 7) throw new Error("Number('0o7') should be 7");

// Test Number with hexadecimal literals
if (Number("0xFF") !== 255) throw new Error("Number('0xFF') should be 255");
if (Number("0xff") !== 255) throw new Error("Number('0xff') should be 255");
if (Number("0xabc") !== 2748) throw new Error("Number('0xabc') should be 2748");
if (Number("0xABC") !== 2748) throw new Error("Number('0xABC') should be 2748");
if (Number("0x0") !== 0) throw new Error("Number('0x0') should be 0");

// Test Number with Number constants
if (Number(Number.MAX_VALUE) !== Number.MAX_VALUE) throw new Error("Number(MAX_VALUE) should preserve value");
if (Number(Number.MIN_VALUE) !== Number.MIN_VALUE) throw new Error("Number(MIN_VALUE) should preserve value");
if (!isNaN(Number(Number.NaN))) throw new Error("Number(Number.NaN) should be NaN");
if (Number(Number.POSITIVE_INFINITY) !== Infinity) throw new Error("Number(POSITIVE_INFINITY) should be Infinity");
if (Number(Number.NEGATIVE_INFINITY) !== -Infinity) throw new Error("Number(NEGATIVE_INFINITY) should be -Infinity");

// Test Number with infinity values
if (Number(Infinity) !== Infinity) throw new Error("Number(Infinity) should be Infinity");
if (Number(-Infinity) !== -Infinity) throw new Error("Number(-Infinity) should be -Infinity");
if (1 / Number(Infinity) !== 0) throw new Error("Number(Infinity) division should be 0");
if (1 / Number(-Infinity) !== -0) throw new Error("Number(-Infinity) division should be -0");

// Test Number with very large numbers
if (isFinite(Number("1.8e308"))) throw new Error("Number('1.8e308') should overflow to Infinity");
if (Number("1.8e309") !== Infinity) throw new Error("Number('1.8e309') should be Infinity");
if (Number("-1.8e309") !== -Infinity) throw new Error("Number('-1.8e309') should be -Infinity");

// Test Number with very small numbers
if (Number("5e-324") !== 5e-324) throw new Error("Number('5e-324') should preserve minimum value");
if (Number("1e-325") !== 0) throw new Error("Number('1e-325') should underflow to 0");

// Test Number with object inputs
var objWithValueOf = { valueOf: function() { return 42; } };
if (Number(objWithValueOf) !== 42) throw new Error("Number should call valueOf method");

var objWithToString = { toString: function() { return "123"; } };
if (Number(objWithToString) !== 123) throw new Error("Number should call toString if no valueOf");

var objWithBoth = {
    valueOf: function() { return 42; },
    toString: function() { return "123"; }
};
if (Number(objWithBoth) !== 42) throw new Error("Number should prefer valueOf over toString");

// Test Number with array inputs
if (Number([]) !== 0) throw new Error("Number([]) should be 0");
if (Number([42]) !== 42) throw new Error("Number([42]) should be 42");
if (!isNaN(Number([1, 2]))) throw new Error("Number([1, 2]) should be NaN");

// Test Number with Date objects
var date = new Date(1000);
if (Number(date) !== 1000) throw new Error("Number(Date) should return timestamp");

// Test Number with Symbol (should throw TypeError in ES2015+)
if (typeof Symbol !== "undefined") {
    try {
        Number(Symbol("test"));
        throw new Error("Number(Symbol) should throw TypeError");
    } catch (e) {
        if (e.name !== "TypeError") {
            throw new Error("Number(Symbol) should throw TypeError, got: " + e.name);
        }
    }
}

// Test Number constructor length property
if (Number.length !== 1) throw new Error("Number.length should be 1");

// Test Number prototype
if (typeof Number.prototype !== "object") throw new Error("Number.prototype should be object");
if (Number.prototype.valueOf() !== 0) throw new Error("Number.prototype.valueOf() should be 0");

// Test Number with BigInt (should throw TypeError in newer engines)
if (typeof BigInt !== "undefined") {
    // Number(BigInt) actually works and converts to number
    var bigintResult = Number(BigInt(123));
    if (bigintResult !== 123) {
        throw new Error("Number(BigInt(123)) should equal 123");
    }
}