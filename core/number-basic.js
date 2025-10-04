/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Number Constructor and Basic Properties
 */

// Test Number constructor
if (typeof Number !== "function") throw new Error("Number should be a function");

// Test Number() without new
if (Number() !== 0) throw new Error("Number() should return 0");
if (Number("123") !== 123) throw new Error("Number('123') should return 123");
if (Number("123.45") !== 123.45) throw new Error("Number('123.45') should return 123.45");
if (!isNaN(Number("abc"))) throw new Error("Number('abc') should return NaN");
if (Number(true) !== 1) throw new Error("Number(true) should return 1");
if (Number(false) !== 0) throw new Error("Number(false) should return 0");
if (Number(null) !== 0) throw new Error("Number(null) should return 0");
if (!isNaN(Number(undefined))) throw new Error("Number(undefined) should return NaN");

// Test Number with new
var numObj = new Number(42);
if (typeof numObj !== "object") throw new Error("new Number() should return object");
if (numObj.valueOf() !== 42) throw new Error("Number object valueOf should return primitive");
if (numObj.toString() !== "42") throw new Error("Number object toString should work");

// Test Number constants
if (typeof Number.MAX_VALUE !== "number") throw new Error("Number.MAX_VALUE should be number");
if (typeof Number.MIN_VALUE !== "number") throw new Error("Number.MIN_VALUE should be number");
if (!isNaN(Number.NaN)) throw new Error("Number.NaN should be NaN");
if (Number.POSITIVE_INFINITY !== Infinity) throw new Error("Number.POSITIVE_INFINITY should be Infinity");
if (Number.NEGATIVE_INFINITY !== -Infinity) throw new Error("Number.NEGATIVE_INFINITY should be -Infinity");

// Test ES2015 Number constants
if (typeof Number.EPSILON === "number") {
    if (Number.EPSILON <= 0) throw new Error("Number.EPSILON should be positive");
    if (Number.EPSILON >= 1) throw new Error("Number.EPSILON should be very small");
}

if (typeof Number.MAX_SAFE_INTEGER === "number") {
    if (Number.MAX_SAFE_INTEGER !== Math.pow(2, 53) - 1) throw new Error("MAX_SAFE_INTEGER should be 2^53 - 1");
}

if (typeof Number.MIN_SAFE_INTEGER === "number") {
    if (Number.MIN_SAFE_INTEGER !== -(Math.pow(2, 53) - 1)) throw new Error("MIN_SAFE_INTEGER should be -(2^53 - 1)");
}

// Test Number.isNaN (ES2015)
if (typeof Number.isNaN === "function") {
    if (!Number.isNaN(NaN)) throw new Error("Number.isNaN(NaN) should be true");
    if (Number.isNaN("NaN")) throw new Error("Number.isNaN('NaN') should be false - no coercion");
    if (Number.isNaN(undefined)) throw new Error("Number.isNaN(undefined) should be false");
    if (Number.isNaN({})) throw new Error("Number.isNaN({}) should be false");
    if (Number.isNaN("123")) throw new Error("Number.isNaN('123') should be false");
    if (Number.isNaN(123)) throw new Error("Number.isNaN(123) should be false");
}

// Test Number.isFinite (ES2015)
if (typeof Number.isFinite === "function") {
    if (!Number.isFinite(123)) throw new Error("Number.isFinite(123) should be true");
    if (!Number.isFinite(123.45)) throw new Error("Number.isFinite(123.45) should be true");
    if (Number.isFinite(Infinity)) throw new Error("Number.isFinite(Infinity) should be false");
    if (Number.isFinite(-Infinity)) throw new Error("Number.isFinite(-Infinity) should be false");
    if (Number.isFinite(NaN)) throw new Error("Number.isFinite(NaN) should be false");
    if (Number.isFinite("123")) throw new Error("Number.isFinite('123') should be false - no coercion");
}

// Test Number.isInteger (ES2015)
if (typeof Number.isInteger === "function") {
    if (!Number.isInteger(123)) throw new Error("Number.isInteger(123) should be true");
    if (!Number.isInteger(-123)) throw new Error("Number.isInteger(-123) should be true");
    if (!Number.isInteger(0)) throw new Error("Number.isInteger(0) should be true");
    if (Number.isInteger(123.45)) throw new Error("Number.isInteger(123.45) should be false");
    if (Number.isInteger(Infinity)) throw new Error("Number.isInteger(Infinity) should be false");
    if (Number.isInteger(NaN)) throw new Error("Number.isInteger(NaN) should be false");
    if (Number.isInteger("123")) throw new Error("Number.isInteger('123') should be false - no coercion");
}

// Test Number.isSafeInteger (ES2015)
if (typeof Number.isSafeInteger === "function") {
    if (!Number.isSafeInteger(123)) throw new Error("Number.isSafeInteger(123) should be true");
    if (!Number.isSafeInteger(Math.pow(2, 53) - 1)) throw new Error("Number.isSafeInteger(MAX_SAFE) should be true");
    if (Number.isSafeInteger(Math.pow(2, 53))) throw new Error("Number.isSafeInteger(2^53) should be false");
    if (Number.isSafeInteger(123.45)) throw new Error("Number.isSafeInteger(123.45) should be false");
    if (Number.isSafeInteger("123")) throw new Error("Number.isSafeInteger('123') should be false - no coercion");
}

// Test Number.parseFloat (ES2015)
if (typeof Number.parseFloat === "function") {
    if (Number.parseFloat("123.45") !== 123.45) throw new Error("Number.parseFloat should work");
    if (Number.parseFloat("123.45abc") !== 123.45) throw new Error("Number.parseFloat should parse leading number");
    if (!isNaN(Number.parseFloat("abc"))) throw new Error("Number.parseFloat('abc') should return NaN");

    // Should be same as global parseFloat
    if (Number.parseFloat !== parseFloat) throw new Error("Number.parseFloat should be same as global parseFloat");
}

// Test Number.parseInt (ES2015)
if (typeof Number.parseInt === "function") {
    if (Number.parseInt("123") !== 123) throw new Error("Number.parseInt should work");
    if (Number.parseInt("123.45") !== 123) throw new Error("Number.parseInt should truncate");
    if (Number.parseInt("123abc") !== 123) throw new Error("Number.parseInt should parse leading number");
    if (Number.parseInt("ff", 16) !== 255) throw new Error("Number.parseInt should support radix");

    // Should be same as global parseInt
    if (Number.parseInt !== parseInt) throw new Error("Number.parseInt should be same as global parseInt");
}