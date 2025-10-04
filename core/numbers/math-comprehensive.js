/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Math Object Comprehensive
 */

// Test Math object existence and basic properties
if (typeof Math !== "object") throw new Error("Math should be an object");
if (Math === null) throw new Error("Math should not be null");

// Test Math constants
if (typeof Math.E !== "number") throw new Error("Math.E should be a number");
if (Math.E < 2.7 || Math.E > 2.8) throw new Error("Math.E should be approximately 2.718");

if (typeof Math.PI !== "number") throw new Error("Math.PI should be a number");
if (Math.PI < 3.1 || Math.PI > 3.2) throw new Error("Math.PI should be approximately 3.14159");

if (typeof Math.LN2 !== "number") throw new Error("Math.LN2 should be a number");
if (Math.LN2 < 0.6 || Math.LN2 > 0.7) throw new Error("Math.LN2 should be approximately 0.693");

if (typeof Math.LN10 !== "number") throw new Error("Math.LN10 should be a number");
if (Math.LN10 < 2.3 || Math.LN10 > 2.4) throw new Error("Math.LN10 should be approximately 2.303");

if (typeof Math.LOG2E !== "number") throw new Error("Math.LOG2E should be a number");
if (Math.LOG2E < 1.4 || Math.LOG2E > 1.5) throw new Error("Math.LOG2E should be approximately 1.443");

if (typeof Math.LOG10E !== "number") throw new Error("Math.LOG10E should be a number");
if (Math.LOG10E < 0.4 || Math.LOG10E > 0.5) throw new Error("Math.LOG10E should be approximately 0.434");

if (typeof Math.SQRT1_2 !== "number") throw new Error("Math.SQRT1_2 should be a number");
if (Math.SQRT1_2 < 0.7 || Math.SQRT1_2 > 0.8) throw new Error("Math.SQRT1_2 should be approximately 0.707");

if (typeof Math.SQRT2 !== "number") throw new Error("Math.SQRT2 should be a number");
if (Math.SQRT2 < 1.4 || Math.SQRT2 > 1.5) throw new Error("Math.SQRT2 should be approximately 1.414");

// Test Math.abs()
if (typeof Math.abs !== "function") throw new Error("Math.abs should be a function");
if (Math.abs(5) !== 5) throw new Error("Math.abs(5) should be 5");
if (Math.abs(-5) !== 5) throw new Error("Math.abs(-5) should be 5");
if (Math.abs(0) !== 0) throw new Error("Math.abs(0) should be 0");
if (1 / Math.abs(-0) !== Infinity) throw new Error("Math.abs(-0) should be +0");
if (Math.abs(Infinity) !== Infinity) throw new Error("Math.abs(Infinity) should be Infinity");
if (Math.abs(-Infinity) !== Infinity) throw new Error("Math.abs(-Infinity) should be Infinity");
if (!isNaN(Math.abs(NaN))) throw new Error("Math.abs(NaN) should be NaN");

// Test Math.ceil()
if (typeof Math.ceil !== "function") throw new Error("Math.ceil should be a function");
if (Math.ceil(4.1) !== 5) throw new Error("Math.ceil(4.1) should be 5");
if (Math.ceil(4.9) !== 5) throw new Error("Math.ceil(4.9) should be 5");
if (Math.ceil(-4.1) !== -4) throw new Error("Math.ceil(-4.1) should be -4");
if (Math.ceil(-4.9) !== -4) throw new Error("Math.ceil(-4.9) should be -4");
if (Math.ceil(0) !== 0) throw new Error("Math.ceil(0) should be 0");
if (1 / Math.ceil(-0) !== -Infinity) throw new Error("Math.ceil(-0) should be -0");
if (Math.ceil(Infinity) !== Infinity) throw new Error("Math.ceil(Infinity) should be Infinity");
if (!isNaN(Math.ceil(NaN))) throw new Error("Math.ceil(NaN) should be NaN");

// Test Math.floor()
if (typeof Math.floor !== "function") throw new Error("Math.floor should be a function");
if (Math.floor(4.1) !== 4) throw new Error("Math.floor(4.1) should be 4");
if (Math.floor(4.9) !== 4) throw new Error("Math.floor(4.9) should be 4");
if (Math.floor(-4.1) !== -5) throw new Error("Math.floor(-4.1) should be -5");
if (Math.floor(-4.9) !== -5) throw new Error("Math.floor(-4.9) should be -5");
if (Math.floor(0) !== 0) throw new Error("Math.floor(0) should be 0");
if (1 / Math.floor(-0) !== -Infinity) throw new Error("Math.floor(-0) should be -0");
if (Math.floor(Infinity) !== Infinity) throw new Error("Math.floor(Infinity) should be Infinity");
if (!isNaN(Math.floor(NaN))) throw new Error("Math.floor(NaN) should be NaN");

// Test Math.round()
if (typeof Math.round !== "function") throw new Error("Math.round should be a function");
if (Math.round(4.4) !== 4) throw new Error("Math.round(4.4) should be 4");
if (Math.round(4.5) !== 5) throw new Error("Math.round(4.5) should be 5");
if (Math.round(4.6) !== 5) throw new Error("Math.round(4.6) should be 5");
if (Math.round(-4.4) !== -4) throw new Error("Math.round(-4.4) should be -4");
if (Math.round(-4.5) !== -4) throw new Error("Math.round(-4.5) should be -4");
if (Math.round(-4.6) !== -5) throw new Error("Math.round(-4.6) should be -5");
if (Math.round(0) !== 0) throw new Error("Math.round(0) should be 0");
if (1 / Math.round(-0) !== -Infinity) throw new Error("Math.round(-0) should be -0");

// Test Math.trunc() - ES2015
if (typeof Math.trunc === "function") {
    if (Math.trunc(4.1) !== 4) throw new Error("Math.trunc(4.1) should be 4");
    if (Math.trunc(4.9) !== 4) throw new Error("Math.trunc(4.9) should be 4");
    if (Math.trunc(-4.1) !== -4) throw new Error("Math.trunc(-4.1) should be -4");
    if (Math.trunc(-4.9) !== -4) throw new Error("Math.trunc(-4.9) should be -4");
    if (Math.trunc(0) !== 0) throw new Error("Math.trunc(0) should be 0");
    if (1 / Math.trunc(-0) !== -Infinity) throw new Error("Math.trunc(-0) should be -0");
    if (!isNaN(Math.trunc(NaN))) throw new Error("Math.trunc(NaN) should be NaN");
    if (Math.trunc(Infinity) !== Infinity) throw new Error("Math.trunc(Infinity) should be Infinity");
}

// Test Math.sign() - ES2015
if (typeof Math.sign === "function") {
    if (Math.sign(5) !== 1) throw new Error("Math.sign(5) should be 1");
    if (Math.sign(-5) !== -1) throw new Error("Math.sign(-5) should be -1");
    if (Math.sign(0) !== 0) throw new Error("Math.sign(0) should be 0");
    if (1 / Math.sign(-0) !== -Infinity) throw new Error("Math.sign(-0) should be -0");
    if (!isNaN(Math.sign(NaN))) throw new Error("Math.sign(NaN) should be NaN");
    if (Math.sign(Infinity) !== 1) throw new Error("Math.sign(Infinity) should be 1");
    if (Math.sign(-Infinity) !== -1) throw new Error("Math.sign(-Infinity) should be -1");
}

// Test Math.max()
if (typeof Math.max !== "function") throw new Error("Math.max should be a function");
if (Math.max() !== -Infinity) throw new Error("Math.max() should be -Infinity");
if (Math.max(1) !== 1) throw new Error("Math.max(1) should be 1");
if (Math.max(1, 2, 3) !== 3) throw new Error("Math.max(1, 2, 3) should be 3");
if (Math.max(-1, -2, -3) !== -1) throw new Error("Math.max(-1, -2, -3) should be -1");
if (!isNaN(Math.max(1, NaN, 3))) throw new Error("Math.max(1, NaN, 3) should be NaN");
if (Math.max(1, Infinity, 3) !== Infinity) throw new Error("Math.max with Infinity should be Infinity");

// Test Math.min()
if (typeof Math.min !== "function") throw new Error("Math.min should be a function");
if (Math.min() !== Infinity) throw new Error("Math.min() should be Infinity");
if (Math.min(1) !== 1) throw new Error("Math.min(1) should be 1");
if (Math.min(1, 2, 3) !== 1) throw new Error("Math.min(1, 2, 3) should be 1");
if (Math.min(-1, -2, -3) !== -3) throw new Error("Math.min(-1, -2, -3) should be -3");
if (!isNaN(Math.min(1, NaN, 3))) throw new Error("Math.min(1, NaN, 3) should be NaN");
if (Math.min(1, -Infinity, 3) !== -Infinity) throw new Error("Math.min with -Infinity should be -Infinity");

// Test Math.pow()
if (typeof Math.pow !== "function") throw new Error("Math.pow should be a function");
if (Math.pow(2, 3) !== 8) throw new Error("Math.pow(2, 3) should be 8");
if (Math.pow(4, 0.5) !== 2) throw new Error("Math.pow(4, 0.5) should be 2");
if (Math.pow(2, -1) !== 0.5) throw new Error("Math.pow(2, -1) should be 0.5");
if (Math.pow(-2, 2) !== 4) throw new Error("Math.pow(-2, 2) should be 4");
if (!isNaN(Math.pow(-2, 0.5))) throw new Error("Math.pow(-2, 0.5) should be NaN");
if (Math.pow(2, Infinity) !== Infinity) throw new Error("Math.pow(2, Infinity) should be Infinity");
if (Math.pow(0.5, Infinity) !== 0) throw new Error("Math.pow(0.5, Infinity) should be 0");

// Test Math.sqrt()
if (typeof Math.sqrt !== "function") throw new Error("Math.sqrt should be a function");
if (Math.sqrt(4) !== 2) throw new Error("Math.sqrt(4) should be 2");
if (Math.sqrt(9) !== 3) throw new Error("Math.sqrt(9) should be 3");
if (Math.sqrt(0) !== 0) throw new Error("Math.sqrt(0) should be 0");
if (1 / Math.sqrt(-0) !== -Infinity) throw new Error("Math.sqrt(-0) should be -0");
if (!isNaN(Math.sqrt(-1))) throw new Error("Math.sqrt(-1) should be NaN");
if (Math.sqrt(Infinity) !== Infinity) throw new Error("Math.sqrt(Infinity) should be Infinity");

// Test Math.cbrt() - ES2015
if (typeof Math.cbrt === "function") {
    if (Math.cbrt(8) !== 2) throw new Error("Math.cbrt(8) should be 2");
    if (Math.cbrt(27) !== 3) throw new Error("Math.cbrt(27) should be 3");
    if (Math.cbrt(-8) !== -2) throw new Error("Math.cbrt(-8) should be -2");
    if (Math.cbrt(0) !== 0) throw new Error("Math.cbrt(0) should be 0");
    if (1 / Math.cbrt(-0) !== -Infinity) throw new Error("Math.cbrt(-0) should be -0");
    if (!isNaN(Math.cbrt(NaN))) throw new Error("Math.cbrt(NaN) should be NaN");
}

// Test Math.exp()
if (typeof Math.exp !== "function") throw new Error("Math.exp should be a function");
if (Math.exp(0) !== 1) throw new Error("Math.exp(0) should be 1");
if (Math.exp(1) < 2.7 || Math.exp(1) > 2.8) throw new Error("Math.exp(1) should be approximately e");
if (Math.exp(Infinity) !== Infinity) throw new Error("Math.exp(Infinity) should be Infinity");
if (Math.exp(-Infinity) !== 0) throw new Error("Math.exp(-Infinity) should be 0");
if (!isNaN(Math.exp(NaN))) throw new Error("Math.exp(NaN) should be NaN");

// Test Math.expm1() - ES2015
if (typeof Math.expm1 === "function") {
    if (Math.expm1(0) !== 0) throw new Error("Math.expm1(0) should be 0");
    if (1 / Math.expm1(-0) !== -Infinity) throw new Error("Math.expm1(-0) should be -0");
    if (Math.expm1(Infinity) !== Infinity) throw new Error("Math.expm1(Infinity) should be Infinity");
    if (Math.expm1(-Infinity) !== -1) throw new Error("Math.expm1(-Infinity) should be -1");
    if (!isNaN(Math.expm1(NaN))) throw new Error("Math.expm1(NaN) should be NaN");
}

// Test Math.log()
if (typeof Math.log !== "function") throw new Error("Math.log should be a function");
if (Math.log(1) !== 0) throw new Error("Math.log(1) should be 0");
if (Math.log(Math.E) < 0.9 || Math.log(Math.E) > 1.1) throw new Error("Math.log(e) should be approximately 1");
if (!isNaN(Math.log(-1))) throw new Error("Math.log(-1) should be NaN");
if (Math.log(0) !== -Infinity) throw new Error("Math.log(0) should be -Infinity");
if (Math.log(Infinity) !== Infinity) throw new Error("Math.log(Infinity) should be Infinity");

// Test Math.log10() - ES2015
if (typeof Math.log10 === "function") {
    if (Math.log10(1) !== 0) throw new Error("Math.log10(1) should be 0");
    if (Math.log10(10) !== 1) throw new Error("Math.log10(10) should be 1");
    if (Math.log10(100) !== 2) throw new Error("Math.log10(100) should be 2");
    if (!isNaN(Math.log10(-1))) throw new Error("Math.log10(-1) should be NaN");
    if (Math.log10(0) !== -Infinity) throw new Error("Math.log10(0) should be -Infinity");
}

// Test Math.log2() - ES2015
if (typeof Math.log2 === "function") {
    if (Math.log2(1) !== 0) throw new Error("Math.log2(1) should be 0");
    if (Math.log2(2) !== 1) throw new Error("Math.log2(2) should be 1");
    if (Math.log2(8) !== 3) throw new Error("Math.log2(8) should be 3");
    if (!isNaN(Math.log2(-1))) throw new Error("Math.log2(-1) should be NaN");
    if (Math.log2(0) !== -Infinity) throw new Error("Math.log2(0) should be -Infinity");
}

// Test Math.log1p() - ES2015
if (typeof Math.log1p === "function") {
    if (Math.log1p(0) !== 0) throw new Error("Math.log1p(0) should be 0");
    if (1 / Math.log1p(-0) !== -Infinity) throw new Error("Math.log1p(-0) should be -0");
    if (Math.log1p(-1) !== -Infinity) throw new Error("Math.log1p(-1) should be -Infinity");
    if (!isNaN(Math.log1p(-2))) throw new Error("Math.log1p(-2) should be NaN");
    if (Math.log1p(Infinity) !== Infinity) throw new Error("Math.log1p(Infinity) should be Infinity");
}

// Test Math.sin()
if (typeof Math.sin !== "function") throw new Error("Math.sin should be a function");
if (Math.sin(0) !== 0) throw new Error("Math.sin(0) should be 0");
if (1 / Math.sin(-0) !== -Infinity) throw new Error("Math.sin(-0) should be -0");
if (Math.abs(Math.sin(Math.PI / 2) - 1) > 0.0001) throw new Error("Math.sin(π/2) should be approximately 1");
if (Math.abs(Math.sin(Math.PI)) > 0.0001) throw new Error("Math.sin(π) should be approximately 0");
if (!isNaN(Math.sin(Infinity))) throw new Error("Math.sin(Infinity) should be NaN");

// Test Math.cos()
if (typeof Math.cos !== "function") throw new Error("Math.cos should be a function");
if (Math.cos(0) !== 1) throw new Error("Math.cos(0) should be 1");
if (Math.abs(Math.cos(Math.PI / 2)) > 0.0001) throw new Error("Math.cos(π/2) should be approximately 0");
if (Math.abs(Math.cos(Math.PI) + 1) > 0.0001) throw new Error("Math.cos(π) should be approximately -1");
if (!isNaN(Math.cos(Infinity))) throw new Error("Math.cos(Infinity) should be NaN");

// Test Math.tan()
if (typeof Math.tan !== "function") throw new Error("Math.tan should be a function");
if (Math.tan(0) !== 0) throw new Error("Math.tan(0) should be 0");
if (1 / Math.tan(-0) !== -Infinity) throw new Error("Math.tan(-0) should be -0");
if (Math.abs(Math.tan(Math.PI / 4) - 1) > 0.0001) throw new Error("Math.tan(π/4) should be approximately 1");
if (!isNaN(Math.tan(Infinity))) throw new Error("Math.tan(Infinity) should be NaN");

// Test Math.asin()
if (typeof Math.asin !== "function") throw new Error("Math.asin should be a function");
if (Math.asin(0) !== 0) throw new Error("Math.asin(0) should be 0");
if (1 / Math.asin(-0) !== -Infinity) throw new Error("Math.asin(-0) should be -0");
if (Math.abs(Math.asin(1) - Math.PI / 2) > 0.0001) throw new Error("Math.asin(1) should be approximately π/2");
if (!isNaN(Math.asin(2))) throw new Error("Math.asin(2) should be NaN");

// Test Math.acos()
if (typeof Math.acos !== "function") throw new Error("Math.acos should be a function");
if (Math.abs(Math.acos(1)) > 0.0001) throw new Error("Math.acos(1) should be approximately 0");
if (Math.abs(Math.acos(0) - Math.PI / 2) > 0.0001) throw new Error("Math.acos(0) should be approximately π/2");
if (Math.abs(Math.acos(-1) - Math.PI) > 0.0001) throw new Error("Math.acos(-1) should be approximately π");
if (!isNaN(Math.acos(2))) throw new Error("Math.acos(2) should be NaN");

// Test Math.atan()
if (typeof Math.atan !== "function") throw new Error("Math.atan should be a function");
if (Math.atan(0) !== 0) throw new Error("Math.atan(0) should be 0");
if (1 / Math.atan(-0) !== -Infinity) throw new Error("Math.atan(-0) should be -0");
if (Math.abs(Math.atan(1) - Math.PI / 4) > 0.0001) throw new Error("Math.atan(1) should be approximately π/4");
if (Math.abs(Math.atan(Infinity) - Math.PI / 2) > 0.0001) throw new Error("Math.atan(Infinity) should be π/2");

// Test Math.atan2()
if (typeof Math.atan2 !== "function") throw new Error("Math.atan2 should be a function");
if (Math.atan2(0, 1) !== 0) throw new Error("Math.atan2(0, 1) should be 0");
if (Math.abs(Math.atan2(1, 1) - Math.PI / 4) > 0.0001) throw new Error("Math.atan2(1, 1) should be π/4");
if (Math.abs(Math.atan2(1, 0) - Math.PI / 2) > 0.0001) throw new Error("Math.atan2(1, 0) should be π/2");
if (Math.abs(Math.atan2(0, -1) - Math.PI) > 0.0001) throw new Error("Math.atan2(0, -1) should be π");

// Test Math.random()
if (typeof Math.random !== "function") throw new Error("Math.random should be a function");
var rand1 = Math.random();
var rand2 = Math.random();
if (typeof rand1 !== "number") throw new Error("Math.random() should return number");
if (rand1 < 0 || rand1 >= 1) throw new Error("Math.random() should be in range [0, 1)");
if (rand2 < 0 || rand2 >= 1) throw new Error("Math.random() should be in range [0, 1)");
// Note: We can't reliably test that rand1 !== rand2 due to potential collision

// Test hyperbolic functions - ES2015
if (typeof Math.sinh === "function") {
    if (Math.sinh(0) !== 0) throw new Error("Math.sinh(0) should be 0");
    if (1 / Math.sinh(-0) !== -Infinity) throw new Error("Math.sinh(-0) should be -0");
    if (Math.sinh(Infinity) !== Infinity) throw new Error("Math.sinh(Infinity) should be Infinity");
    if (Math.sinh(-Infinity) !== -Infinity) throw new Error("Math.sinh(-Infinity) should be -Infinity");
}

if (typeof Math.cosh === "function") {
    if (Math.cosh(0) !== 1) throw new Error("Math.cosh(0) should be 1");
    if (Math.cosh(Infinity) !== Infinity) throw new Error("Math.cosh(Infinity) should be Infinity");
    if (Math.cosh(-Infinity) !== Infinity) throw new Error("Math.cosh(-Infinity) should be Infinity");
}

if (typeof Math.tanh === "function") {
    if (Math.tanh(0) !== 0) throw new Error("Math.tanh(0) should be 0");
    if (1 / Math.tanh(-0) !== -Infinity) throw new Error("Math.tanh(-0) should be -0");
    if (Math.tanh(Infinity) !== 1) throw new Error("Math.tanh(Infinity) should be 1");
    if (Math.tanh(-Infinity) !== -1) throw new Error("Math.tanh(-Infinity) should be -1");
}

// Test Math.hypot() - ES2015
if (typeof Math.hypot === "function") {
    if (Math.hypot() !== 0) throw new Error("Math.hypot() should be 0");
    if (Math.hypot(3, 4) !== 5) throw new Error("Math.hypot(3, 4) should be 5");
    if (Math.hypot(1, 1) < 1.4 || Math.hypot(1, 1) > 1.5) throw new Error("Math.hypot(1, 1) should be √2");
    if (!isNaN(Math.hypot(1, NaN))) throw new Error("Math.hypot(1, NaN) should be NaN");
    if (Math.hypot(Infinity, 1) !== Infinity) throw new Error("Math.hypot(Infinity, 1) should be Infinity");
}

// Test additional ES2015 functions
if (typeof Math.clz32 === "function") {
    if (Math.clz32(1) !== 31) throw new Error("Math.clz32(1) should be 31");
    if (Math.clz32(0) !== 32) throw new Error("Math.clz32(0) should be 32");
    if (Math.clz32(-1) !== 0) throw new Error("Math.clz32(-1) should be 0");
}

if (typeof Math.imul === "function") {
    if (Math.imul(2, 4) !== 8) throw new Error("Math.imul(2, 4) should be 8");
    if (Math.imul(-1, 8) !== -8) throw new Error("Math.imul(-1, 8) should be -8");
    if (Math.imul(0xffffffff, 5) !== -5) throw new Error("Math.imul(0xffffffff, 5) should be -5");
}

if (typeof Math.fround === "function") {
    if (Math.fround(1.5) !== 1.5) throw new Error("Math.fround(1.5) should be 1.5");
    if (typeof Math.fround(1.5) !== "number") throw new Error("Math.fround should return number");
    if (!isNaN(Math.fround(NaN))) throw new Error("Math.fround(NaN) should be NaN");
}