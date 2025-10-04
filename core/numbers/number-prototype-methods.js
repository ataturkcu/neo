/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Number Prototype Methods
 */

// Test Number.prototype.toString()
var num1 = 123;
if (num1.toString() !== "123") throw new Error("(123).toString() should be '123'");
if (num1.toString(10) !== "123") throw new Error("(123).toString(10) should be '123'");
if (num1.toString(2) !== "1111011") throw new Error("(123).toString(2) should be '1111011'");
if (num1.toString(16) !== "7b") throw new Error("(123).toString(16) should be '7b'");
if (num1.toString(8) !== "173") throw new Error("(123).toString(8) should be '173'");
if (num1.toString(36) !== "3f") throw new Error("(123).toString(36) should be '3f'");

// Test toString with edge cases
if ((0).toString() !== "0") throw new Error("(0).toString() should be '0'");
if ((-123).toString() !== "-123") throw new Error("(-123).toString() should be '-123'");
if ((123.456).toString() !== "123.456") throw new Error("(123.456).toString() should be '123.456'");

// Test toString with infinity and NaN
if (Infinity.toString() !== "Infinity") throw new Error("Infinity.toString() should be 'Infinity'");
if ((-Infinity).toString() !== "-Infinity") throw new Error("(-Infinity).toString() should be '-Infinity'");
if (NaN.toString() !== "NaN") throw new Error("NaN.toString() should be 'NaN'");

// Test toString with invalid radix
try {
    (123).toString(1);
    throw new Error("toString(1) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toString(1) should throw RangeError, got: " + e.name);
}

try {
    (123).toString(37);
    throw new Error("toString(37) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toString(37) should throw RangeError, got: " + e.name);
}

// Test Number.prototype.valueOf()
var numObj = new Number(42);
if (numObj.valueOf() !== 42) throw new Error("Number object valueOf should return 42");
if ((123).valueOf() !== 123) throw new Error("(123).valueOf() should return 123");
if (Number.prototype.valueOf.call(numObj) !== 42) throw new Error("valueOf.call should work");

// Test valueOf throws TypeError on non-Number this
try {
    Number.prototype.valueOf.call("not a number");
    throw new Error("valueOf.call on string should throw TypeError");
} catch (e) {
    if (e.name !== "TypeError") throw new Error("valueOf.call should throw TypeError, got: " + e.name);
}

// Test Number.prototype.toFixed()
if ((123.456).toFixed() !== "123") throw new Error("(123.456).toFixed() should be '123'");
if ((123.456).toFixed(0) !== "123") throw new Error("(123.456).toFixed(0) should be '123'");
if ((123.456).toFixed(1) !== "123.5") throw new Error("(123.456).toFixed(1) should be '123.5'");
if ((123.456).toFixed(2) !== "123.46") throw new Error("(123.456).toFixed(2) should be '123.46'");
if ((123.456).toFixed(3) !== "123.456") throw new Error("(123.456).toFixed(3) should be '123.456'");
if ((123.456).toFixed(4) !== "123.4560") throw new Error("(123.456).toFixed(4) should be '123.4560'");

// Test toFixed with negative numbers
if ((-123.456).toFixed(2) !== "-123.46") throw new Error("(-123.456).toFixed(2) should be '-123.46'");

// Test toFixed with zero
if ((0).toFixed(2) !== "0.00") throw new Error("(0).toFixed(2) should be '0.00'");
if ((-0).toFixed(2) !== "0.00") throw new Error("(-0).toFixed(2) should be '0.00'");

// Test toFixed with rounding
if ((1.235).toFixed(2) !== "1.24") throw new Error("(1.235).toFixed(2) should be '1.24' (round up)");
if ((1.234).toFixed(2) !== "1.23") throw new Error("(1.234).toFixed(2) should be '1.23' (round down)");

// Test toFixed with infinity and NaN
if (Infinity.toFixed(2) !== "Infinity") throw new Error("Infinity.toFixed(2) should be 'Infinity'");
if ((-Infinity).toFixed(2) !== "-Infinity") throw new Error("(-Infinity).toFixed(2) should be '-Infinity'");
if (NaN.toFixed(2) !== "NaN") throw new Error("NaN.toFixed(2) should be 'NaN'");

// Test toFixed with invalid arguments
try {
    (123).toFixed(-1);
    throw new Error("toFixed(-1) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toFixed(-1) should throw RangeError, got: " + e.name);
}

try {
    (123).toFixed(101);
    throw new Error("toFixed(101) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toFixed(101) should throw RangeError, got: " + e.name);
}

// Test Number.prototype.toExponential()
if ((123.456).toExponential() !== "1.23456e+2") throw new Error("(123.456).toExponential() incorrect");
if ((123.456).toExponential(2) !== "1.23e+2") throw new Error("(123.456).toExponential(2) should be '1.23e+2'");
if ((123.456).toExponential(0) !== "1e+2") throw new Error("(123.456).toExponential(0) should be '1e+2'");
if ((123.456).toExponential(4) !== "1.2346e+2") throw new Error("(123.456).toExponential(4) should be '1.2346e+2'");

// Test toExponential with small numbers
if ((0.000123).toExponential(2) !== "1.23e-4") throw new Error("(0.000123).toExponential(2) should be '1.23e-4'");

// Test toExponential with negative numbers
if ((-123.456).toExponential(2) !== "-1.23e+2") throw new Error("(-123.456).toExponential(2) should be '-1.23e+2'");

// Test toExponential with zero
if ((0).toExponential(2) !== "0.00e+0") throw new Error("(0).toExponential(2) should be '0.00e+0'");

// Test toExponential with infinity and NaN
if (Infinity.toExponential() !== "Infinity") throw new Error("Infinity.toExponential() should be 'Infinity'");
if ((-Infinity).toExponential() !== "-Infinity") throw new Error("(-Infinity).toExponential() should be '-Infinity'");
if (NaN.toExponential() !== "NaN") throw new Error("NaN.toExponential() should be 'NaN'");

// Test toExponential with invalid arguments
try {
    (123).toExponential(-1);
    throw new Error("toExponential(-1) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toExponential(-1) should throw RangeError, got: " + e.name);
}

try {
    (123).toExponential(101);
    throw new Error("toExponential(101) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toExponential(101) should throw RangeError, got: " + e.name);
}

// Test Number.prototype.toPrecision()
if ((123.456).toPrecision(3) !== "123") throw new Error("(123.456).toPrecision(3) should be '123'");
if ((123.456).toPrecision(4) !== "123.5") throw new Error("(123.456).toPrecision(4) should be '123.5'");
if ((123.456).toPrecision(5) !== "123.46") throw new Error("(123.456).toPrecision(5) should be '123.46'");
if ((123.456).toPrecision(6) !== "123.456") throw new Error("(123.456).toPrecision(6) should be '123.456'");

// Test toPrecision with small numbers requiring exponential notation
if ((0.000123).toPrecision(3) !== "0.000123") throw new Error("(0.000123).toPrecision(3) should be '0.000123'");
if ((0.000123).toPrecision(6) !== "0.000123000") throw new Error("(0.000123).toPrecision(6) incorrect");

// Test toPrecision with large numbers
if ((123456).toPrecision(3) !== "1.23e+5") throw new Error("(123456).toPrecision(3) should be '1.23e+5'");

// Test toPrecision with negative numbers
if ((-123.456).toPrecision(3) !== "-123") throw new Error("(-123.456).toPrecision(3) should be '-123'");

// Test toPrecision with zero
if ((0).toPrecision(3) !== "0.00") throw new Error("(0).toPrecision(3) should be '0.00'");

// Test toPrecision with infinity and NaN
if (Infinity.toPrecision(3) !== "Infinity") throw new Error("Infinity.toPrecision(3) should be 'Infinity'");
if ((-Infinity).toPrecision(3) !== "-Infinity") throw new Error("(-Infinity).toPrecision(3) should be '-Infinity'");
if (NaN.toPrecision(3) !== "NaN") throw new Error("NaN.toPrecision(3) should be 'NaN'");

// Test toPrecision without argument
if ((123.456).toPrecision() !== "123.456") throw new Error("(123.456).toPrecision() should be '123.456'");

// Test toPrecision with invalid arguments
try {
    (123).toPrecision(0);
    throw new Error("toPrecision(0) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toPrecision(0) should throw RangeError, got: " + e.name);
}

try {
    (123).toPrecision(101);
    throw new Error("toPrecision(101) should throw RangeError");
} catch (e) {
    if (e.name !== "RangeError") throw new Error("toPrecision(101) should throw RangeError, got: " + e.name);
}

// Test Number.prototype.toLocaleString() basic functionality
var localeStr = (123456.789).toLocaleString();
if (typeof localeStr !== "string") throw new Error("toLocaleString should return string");
if (localeStr.length === 0) throw new Error("toLocaleString should not return empty string");

// Test toLocaleString with different number types
if (typeof (0).toLocaleString() !== "string") throw new Error("(0).toLocaleString should return string");
if (typeof (-123).toLocaleString() !== "string") throw new Error("(-123).toLocaleString should return string");
if (typeof Infinity.toLocaleString() !== "string") throw new Error("Infinity.toLocaleString should return string");
if (typeof NaN.toLocaleString() !== "string") throw new Error("NaN.toLocaleString should return string");

// Test method inheritance from Number.prototype
var numWrapper = new Number(42);
if (typeof numWrapper.toString !== "function") throw new Error("Number object should inherit toString");
if (typeof numWrapper.valueOf !== "function") throw new Error("Number object should inherit valueOf");
if (typeof numWrapper.toFixed !== "function") throw new Error("Number object should inherit toFixed");
if (typeof numWrapper.toExponential !== "function") throw new Error("Number object should inherit toExponential");
if (typeof numWrapper.toPrecision !== "function") throw new Error("Number object should inherit toPrecision");
if (typeof numWrapper.toLocaleString !== "function") throw new Error("Number object should inherit toLocaleString");

// Test method calls on primitive numbers
if (typeof (42).toString !== "function") throw new Error("Primitive number should have toString method");
if (typeof (42).valueOf !== "function") throw new Error("Primitive number should have valueOf method");
if (typeof (42).toFixed !== "function") throw new Error("Primitive number should have toFixed method");
if (typeof (42).toExponential !== "function") throw new Error("Primitive number should have toExponential method");
if (typeof (42).toPrecision !== "function") throw new Error("Primitive number should have toPrecision method");
if (typeof (42).toLocaleString !== "function") throw new Error("Primitive number should have toLocaleString method");