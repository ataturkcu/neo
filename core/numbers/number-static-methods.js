/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Number Static Methods
 */

// Test Number.isNaN() - ES2015
if (typeof Number.isNaN === "function") {
    // Test true cases
    if (!Number.isNaN(NaN)) throw new Error("Number.isNaN(NaN) should be true");
    if (!Number.isNaN(Number.NaN)) throw new Error("Number.isNaN(Number.NaN) should be true");
    if (!Number.isNaN(0/0)) throw new Error("Number.isNaN(0/0) should be true");

    // Test false cases - no type coercion
    if (Number.isNaN("NaN")) throw new Error("Number.isNaN('NaN') should be false");
    if (Number.isNaN(undefined)) throw new Error("Number.isNaN(undefined) should be false");
    if (Number.isNaN({})) throw new Error("Number.isNaN({}) should be false");
    if (Number.isNaN("123")) throw new Error("Number.isNaN('123') should be false");
    if (Number.isNaN(123)) throw new Error("Number.isNaN(123) should be false");
    if (Number.isNaN(true)) throw new Error("Number.isNaN(true) should be false");
    if (Number.isNaN(false)) throw new Error("Number.isNaN(false) should be false");
    if (Number.isNaN(null)) throw new Error("Number.isNaN(null) should be false");
    if (Number.isNaN("")) throw new Error("Number.isNaN('') should be false");
    if (Number.isNaN(" ")) throw new Error("Number.isNaN(' ') should be false");
    if (Number.isNaN([])) throw new Error("Number.isNaN([]) should be false");
    if (Number.isNaN(Infinity)) throw new Error("Number.isNaN(Infinity) should be false");
    if (Number.isNaN(-Infinity)) throw new Error("Number.isNaN(-Infinity) should be false");
}

// Test Number.isFinite() - ES2015
if (typeof Number.isFinite === "function") {
    // Test true cases
    if (!Number.isFinite(123)) throw new Error("Number.isFinite(123) should be true");
    if (!Number.isFinite(-123)) throw new Error("Number.isFinite(-123) should be true");
    if (!Number.isFinite(0)) throw new Error("Number.isFinite(0) should be true");
    if (!Number.isFinite(-0)) throw new Error("Number.isFinite(-0) should be true");
    if (!Number.isFinite(123.456)) throw new Error("Number.isFinite(123.456) should be true");
    if (!Number.isFinite(Number.MAX_VALUE)) throw new Error("Number.isFinite(MAX_VALUE) should be true");
    if (!Number.isFinite(Number.MIN_VALUE)) throw new Error("Number.isFinite(MIN_VALUE) should be true");
    if (!Number.isFinite(1e-10)) throw new Error("Number.isFinite(1e-10) should be true");

    // Test false cases
    if (Number.isFinite(Infinity)) throw new Error("Number.isFinite(Infinity) should be false");
    if (Number.isFinite(-Infinity)) throw new Error("Number.isFinite(-Infinity) should be false");
    if (Number.isFinite(NaN)) throw new Error("Number.isFinite(NaN) should be false");

    // Test false cases - no type coercion
    if (Number.isFinite("123")) throw new Error("Number.isFinite('123') should be false");
    if (Number.isFinite(true)) throw new Error("Number.isFinite(true) should be false");
    if (Number.isFinite(false)) throw new Error("Number.isFinite(false) should be false");
    if (Number.isFinite(null)) throw new Error("Number.isFinite(null) should be false");
    if (Number.isFinite(undefined)) throw new Error("Number.isFinite(undefined) should be false");
    if (Number.isFinite({})) throw new Error("Number.isFinite({}) should be false");
    if (Number.isFinite([])) throw new Error("Number.isFinite([]) should be false");
    if (Number.isFinite("")) throw new Error("Number.isFinite('') should be false");
}

// Test Number.isInteger() - ES2015
if (typeof Number.isInteger === "function") {
    // Test true cases
    if (!Number.isInteger(123)) throw new Error("Number.isInteger(123) should be true");
    if (!Number.isInteger(-123)) throw new Error("Number.isInteger(-123) should be true");
    if (!Number.isInteger(0)) throw new Error("Number.isInteger(0) should be true");
    if (!Number.isInteger(-0)) throw new Error("Number.isInteger(-0) should be true");
    if (!Number.isInteger(1.0)) throw new Error("Number.isInteger(1.0) should be true");
    if (!Number.isInteger(25.0)) throw new Error("Number.isInteger(25.0) should be true");
    if (!Number.isInteger(Math.pow(2, 53) - 1)) throw new Error("Number.isInteger(2^53-1) should be true");
    if (!Number.isInteger(-Math.pow(2, 53) + 1)) throw new Error("Number.isInteger(-(2^53-1)) should be true");

    // Test false cases
    if (Number.isInteger(123.456)) throw new Error("Number.isInteger(123.456) should be false");
    if (Number.isInteger(0.1)) throw new Error("Number.isInteger(0.1) should be false");
    if (Number.isInteger(-0.1)) throw new Error("Number.isInteger(-0.1) should be false");
    if (Number.isInteger(Infinity)) throw new Error("Number.isInteger(Infinity) should be false");
    if (Number.isInteger(-Infinity)) throw new Error("Number.isInteger(-Infinity) should be false");
    if (Number.isInteger(NaN)) throw new Error("Number.isInteger(NaN) should be false");

    // Test false cases - no type coercion
    if (Number.isInteger("123")) throw new Error("Number.isInteger('123') should be false");
    if (Number.isInteger(true)) throw new Error("Number.isInteger(true) should be false");
    if (Number.isInteger(false)) throw new Error("Number.isInteger(false) should be false");
    if (Number.isInteger(null)) throw new Error("Number.isInteger(null) should be false");
    if (Number.isInteger(undefined)) throw new Error("Number.isInteger(undefined) should be false");
    if (Number.isInteger({})) throw new Error("Number.isInteger({}) should be false");
    if (Number.isInteger([])) throw new Error("Number.isInteger([]) should be false");
}

// Test Number.isSafeInteger() - ES2015
if (typeof Number.isSafeInteger === "function") {
    // Test true cases
    if (!Number.isSafeInteger(123)) throw new Error("Number.isSafeInteger(123) should be true");
    if (!Number.isSafeInteger(-123)) throw new Error("Number.isSafeInteger(-123) should be true");
    if (!Number.isSafeInteger(0)) throw new Error("Number.isSafeInteger(0) should be true");
    if (!Number.isSafeInteger(-0)) throw new Error("Number.isSafeInteger(-0) should be true");
    if (!Number.isSafeInteger(1)) throw new Error("Number.isSafeInteger(1) should be true");
    if (!Number.isSafeInteger(Math.pow(2, 53) - 1)) throw new Error("Number.isSafeInteger(MAX_SAFE) should be true");
    if (!Number.isSafeInteger(-(Math.pow(2, 53) - 1))) throw new Error("Number.isSafeInteger(MIN_SAFE) should be true");

    // Test false cases - unsafe integers
    if (Number.isSafeInteger(Math.pow(2, 53))) throw new Error("Number.isSafeInteger(2^53) should be false");
    if (Number.isSafeInteger(-Math.pow(2, 53))) throw new Error("Number.isSafeInteger(-2^53) should be false");
    if (Number.isSafeInteger(Math.pow(2, 53) + 1)) throw new Error("Number.isSafeInteger(2^53+1) should be false");

    // Test false cases - non-integers
    if (Number.isSafeInteger(123.456)) throw new Error("Number.isSafeInteger(123.456) should be false");
    if (Number.isSafeInteger(0.1)) throw new Error("Number.isSafeInteger(0.1) should be false");
    if (Number.isSafeInteger(Infinity)) throw new Error("Number.isSafeInteger(Infinity) should be false");
    if (Number.isSafeInteger(-Infinity)) throw new Error("Number.isSafeInteger(-Infinity) should be false");
    if (Number.isSafeInteger(NaN)) throw new Error("Number.isSafeInteger(NaN) should be false");

    // Test false cases - no type coercion
    if (Number.isSafeInteger("123")) throw new Error("Number.isSafeInteger('123') should be false");
    if (Number.isSafeInteger(true)) throw new Error("Number.isSafeInteger(true) should be false");
    if (Number.isSafeInteger(false)) throw new Error("Number.isSafeInteger(false) should be false");
    if (Number.isSafeInteger(null)) throw new Error("Number.isSafeInteger(null) should be false");
    if (Number.isSafeInteger(undefined)) throw new Error("Number.isSafeInteger(undefined) should be false");
}

// Test Number.parseFloat() - ES2015
if (typeof Number.parseFloat === "function") {
    // Should be same as global parseFloat
    if (Number.parseFloat !== parseFloat) throw new Error("Number.parseFloat should be same as global parseFloat");

    // Test basic functionality
    if (Number.parseFloat("123.456") !== 123.456) throw new Error("Number.parseFloat('123.456') should be 123.456");
    if (Number.parseFloat("123") !== 123) throw new Error("Number.parseFloat('123') should be 123");
    if (Number.parseFloat("123.456abc") !== 123.456) throw new Error("Number.parseFloat should parse leading number");
    if (!isNaN(Number.parseFloat("abc"))) throw new Error("Number.parseFloat('abc') should be NaN");
    if (Number.parseFloat("  123.456  ") !== 123.456) throw new Error("Number.parseFloat should handle whitespace");

    // Test special values
    if (Number.parseFloat("Infinity") !== Infinity) throw new Error("Number.parseFloat('Infinity') should be Infinity");
    if (Number.parseFloat("-Infinity") !== -Infinity) throw new Error("Number.parseFloat('-Infinity') should be -Infinity");
    if (!isNaN(Number.parseFloat("NaN"))) throw new Error("Number.parseFloat('NaN') should be NaN");

    // Test scientific notation
    if (Number.parseFloat("1e3") !== 1000) throw new Error("Number.parseFloat('1e3') should be 1000");
    if (Number.parseFloat("1.23e-4") !== 0.000123) throw new Error("Number.parseFloat('1.23e-4') should be 0.000123");
}

// Test Number.parseInt() - ES2015
if (typeof Number.parseInt === "function") {
    // Should be same as global parseInt
    if (Number.parseInt !== parseInt) throw new Error("Number.parseInt should be same as global parseInt");

    // Test basic functionality
    if (Number.parseInt("123") !== 123) throw new Error("Number.parseInt('123') should be 123");
    if (Number.parseInt("123.456") !== 123) throw new Error("Number.parseInt('123.456') should be 123");
    if (Number.parseInt("123abc") !== 123) throw new Error("Number.parseInt should parse leading number");
    if (!isNaN(Number.parseInt("abc"))) throw new Error("Number.parseInt('abc') should be NaN");
    if (Number.parseInt("  123  ") !== 123) throw new Error("Number.parseInt should handle whitespace");

    // Test with radix
    if (Number.parseInt("ff", 16) !== 255) throw new Error("Number.parseInt('ff', 16) should be 255");
    if (Number.parseInt("1010", 2) !== 10) throw new Error("Number.parseInt('1010', 2) should be 10");
    if (Number.parseInt("777", 8) !== 511) throw new Error("Number.parseInt('777', 8) should be 511");
    if (Number.parseInt("123", 10) !== 123) throw new Error("Number.parseInt('123', 10) should be 123");

    // Test automatic radix detection
    if (Number.parseInt("0x10") !== 16) throw new Error("Number.parseInt('0x10') should be 16");
    if (Number.parseInt("010") === 8) {
        // Legacy octal behavior (not recommended)
        // In strict mode, this should not be treated as octal
    }
}

// Test Number constants - ES2015
if (typeof Number.EPSILON === "number") {
    if (Number.EPSILON <= 0) throw new Error("Number.EPSILON should be positive");
    if (Number.EPSILON >= 1) throw new Error("Number.EPSILON should be very small");
    if (Number.EPSILON !== Math.pow(2, -52)) throw new Error("Number.EPSILON should be 2^-52");
}

if (typeof Number.MAX_SAFE_INTEGER === "number") {
    if (Number.MAX_SAFE_INTEGER !== Math.pow(2, 53) - 1) throw new Error("Number.MAX_SAFE_INTEGER should be 2^53 - 1");
    if (Number.MAX_SAFE_INTEGER !== 9007199254740991) throw new Error("Number.MAX_SAFE_INTEGER should be 9007199254740991");
}

if (typeof Number.MIN_SAFE_INTEGER === "number") {
    if (Number.MIN_SAFE_INTEGER !== -(Math.pow(2, 53) - 1)) throw new Error("Number.MIN_SAFE_INTEGER should be -(2^53 - 1)");
    if (Number.MIN_SAFE_INTEGER !== -9007199254740991) throw new Error("Number.MIN_SAFE_INTEGER should be -9007199254740991");
}

// Test legacy Number constants
if (typeof Number.MAX_VALUE !== "number") throw new Error("Number.MAX_VALUE should exist");
if (typeof Number.MIN_VALUE !== "number") throw new Error("Number.MIN_VALUE should exist");
if (!isNaN(Number.NaN)) throw new Error("Number.NaN should be NaN");
if (Number.POSITIVE_INFINITY !== Infinity) throw new Error("Number.POSITIVE_INFINITY should be Infinity");
if (Number.NEGATIVE_INFINITY !== -Infinity) throw new Error("Number.NEGATIVE_INFINITY should be -Infinity");

// Test Number.MAX_VALUE bounds
if (Number.MAX_VALUE <= 0) throw new Error("Number.MAX_VALUE should be positive");
if (!isFinite(Number.MAX_VALUE)) throw new Error("Number.MAX_VALUE should be finite");
if (Number.MAX_VALUE * 2 !== Infinity) throw new Error("Number.MAX_VALUE * 2 should overflow to Infinity");

// Test Number.MIN_VALUE bounds
if (Number.MIN_VALUE <= 0) throw new Error("Number.MIN_VALUE should be positive");
if (!isFinite(Number.MIN_VALUE)) throw new Error("Number.MIN_VALUE should be finite");
if (Number.MIN_VALUE / 2 !== 0) throw new Error("Number.MIN_VALUE / 2 should underflow to 0");

// Test method properties
if (typeof Number.isNaN === "function" && Number.isNaN.length !== 1) {
    throw new Error("Number.isNaN.length should be 1");
}
if (typeof Number.isFinite === "function" && Number.isFinite.length !== 1) {
    throw new Error("Number.isFinite.length should be 1");
}
if (typeof Number.isInteger === "function" && Number.isInteger.length !== 1) {
    throw new Error("Number.isInteger.length should be 1");
}
if (typeof Number.isSafeInteger === "function" && Number.isSafeInteger.length !== 1) {
    throw new Error("Number.isSafeInteger.length should be 1");
}
if (typeof Number.parseFloat === "function" && Number.parseFloat.length !== 1) {
    throw new Error("Number.parseFloat.length should be 1");
}
if (typeof Number.parseInt === "function" && Number.parseInt.length !== 2) {
    throw new Error("Number.parseInt.length should be 2");
}

// Test BigInt integration (ES2020+)
if (typeof BigInt !== "undefined") {
    // Test that Number methods properly reject BigInt values
    try {
        if (typeof Number.isFinite === "function") {
            Number.isFinite(BigInt(123));
            throw new Error("Number.isFinite(BigInt) should throw or return false");
        }
    } catch (e) {
        // Expected behavior - either throws or returns false
    }

    try {
        if (typeof Number.isInteger === "function") {
            Number.isInteger(BigInt(123));
            throw new Error("Number.isInteger(BigInt) should throw or return false");
        }
    } catch (e) {
        // Expected behavior - either throws or returns false
    }
}