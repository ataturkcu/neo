/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Math Object Basic Methods
 */

// Test Math object exists and is not a function
if (typeof Math !== "object") throw new Error("Math should be an object");
if (typeof Math === "function") throw new Error("Math should not be a function");

// Test Math constants
if (typeof Math.PI !== "number") throw new Error("Math.PI should be a number");
if (Math.PI < 3.14 || Math.PI > 3.15) throw new Error("Math.PI should be approximately 3.14159");

if (typeof Math.E !== "number") throw new Error("Math.E should be a number");
if (Math.E < 2.7 || Math.E > 2.8) throw new Error("Math.E should be approximately 2.718");

if (typeof Math.LN2 !== "number") throw new Error("Math.LN2 should be a number");
if (typeof Math.LN10 !== "number") throw new Error("Math.LN10 should be a number");
if (typeof Math.LOG2E !== "number") throw new Error("Math.LOG2E should be a number");
if (typeof Math.LOG10E !== "number") throw new Error("Math.LOG10E should be a number");
if (typeof Math.SQRT1_2 !== "number") throw new Error("Math.SQRT1_2 should be a number");
if (typeof Math.SQRT2 !== "number") throw new Error("Math.SQRT2 should be a number");

// Test Math.abs
if (Math.abs(5) !== 5) throw new Error("Math.abs(5) should be 5");
if (Math.abs(-5) !== 5) throw new Error("Math.abs(-5) should be 5");
if (Math.abs(0) !== 0) throw new Error("Math.abs(0) should be 0");
if (Math.abs(-0) !== 0) throw new Error("Math.abs(-0) should be 0");
if (!isNaN(Math.abs(NaN))) throw new Error("Math.abs(NaN) should be NaN");
if (Math.abs(Infinity) !== Infinity) throw new Error("Math.abs(Infinity) should be Infinity");
if (Math.abs(-Infinity) !== Infinity) throw new Error("Math.abs(-Infinity) should be Infinity");

// Test Math.ceil
if (Math.ceil(4.1) !== 5) throw new Error("Math.ceil(4.1) should be 5");
if (Math.ceil(4.9) !== 5) throw new Error("Math.ceil(4.9) should be 5");
if (Math.ceil(-4.1) !== -4) throw new Error("Math.ceil(-4.1) should be -4");
if (Math.ceil(-4.9) !== -4) throw new Error("Math.ceil(-4.9) should be -4");
if (Math.ceil(5) !== 5) throw new Error("Math.ceil(5) should be 5");

// Test Math.floor
if (Math.floor(4.1) !== 4) throw new Error("Math.floor(4.1) should be 4");
if (Math.floor(4.9) !== 4) throw new Error("Math.floor(4.9) should be 4");
if (Math.floor(-4.1) !== -5) throw new Error("Math.floor(-4.1) should be -5");
if (Math.floor(-4.9) !== -5) throw new Error("Math.floor(-4.9) should be -5");
if (Math.floor(5) !== 5) throw new Error("Math.floor(5) should be 5");

// Test Math.round
if (Math.round(4.1) !== 4) throw new Error("Math.round(4.1) should be 4");
if (Math.round(4.5) !== 5) throw new Error("Math.round(4.5) should be 5");
if (Math.round(4.9) !== 5) throw new Error("Math.round(4.9) should be 5");
if (Math.round(-4.1) !== -4) throw new Error("Math.round(-4.1) should be -4");
if (Math.round(-4.5) !== -4) throw new Error("Math.round(-4.5) should be -4 (ties go to even)");
if (Math.round(-4.9) !== -5) throw new Error("Math.round(-4.9) should be -5");

// Test Math.max
if (Math.max(1, 2, 3) !== 3) throw new Error("Math.max(1,2,3) should be 3");
if (Math.max(-1, -2, -3) !== -1) throw new Error("Math.max(-1,-2,-3) should be -1");
if (Math.max() !== -Infinity) throw new Error("Math.max() with no args should be -Infinity");
if (!isNaN(Math.max(1, NaN, 3))) throw new Error("Math.max with NaN should return NaN");

// Test Math.min
if (Math.min(1, 2, 3) !== 1) throw new Error("Math.min(1,2,3) should be 1");
if (Math.min(-1, -2, -3) !== -3) throw new Error("Math.min(-1,-2,-3) should be -3");
if (Math.min() !== Infinity) throw new Error("Math.min() with no args should be Infinity");
if (!isNaN(Math.min(1, NaN, 3))) throw new Error("Math.min with NaN should return NaN");

// Test Math.pow
if (Math.pow(2, 3) !== 8) throw new Error("Math.pow(2,3) should be 8");
if (Math.pow(4, 0.5) !== 2) throw new Error("Math.pow(4,0.5) should be 2");
if (Math.pow(2, -1) !== 0.5) throw new Error("Math.pow(2,-1) should be 0.5");
if (Math.pow(-2, 2) !== 4) throw new Error("Math.pow(-2,2) should be 4");

// Test Math.sqrt
if (Math.sqrt(4) !== 2) throw new Error("Math.sqrt(4) should be 2");
if (Math.sqrt(9) !== 3) throw new Error("Math.sqrt(9) should be 3");
if (Math.sqrt(0) !== 0) throw new Error("Math.sqrt(0) should be 0");
if (!isNaN(Math.sqrt(-1))) throw new Error("Math.sqrt(-1) should be NaN");

// Test Math.random
var random1 = Math.random();
var random2 = Math.random();
if (typeof random1 !== "number") throw new Error("Math.random should return number");
if (random1 < 0 || random1 >= 1) throw new Error("Math.random should be in [0, 1)");
if (random1 === random2) {
    // Very unlikely but possible - let's try once more
    var random3 = Math.random();
    if (random1 === random3) throw new Error("Math.random should return different values");
}

// Test trigonometric functions
if (Math.sin(0) !== 0) throw new Error("Math.sin(0) should be 0");
if (Math.cos(0) !== 1) throw new Error("Math.cos(0) should be 1");
if (Math.tan(0) !== 0) throw new Error("Math.tan(0) should be 0");

// Test Math.sin(PI/2) ≈ 1 (allowing for floating point precision)
var sinPiHalf = Math.sin(Math.PI / 2);
if (Math.abs(sinPiHalf - 1) > 0.0001) throw new Error("Math.sin(PI/2) should be approximately 1");

// Test logarithmic functions
if (Math.log(Math.E) < 0.999 || Math.log(Math.E) > 1.001) throw new Error("Math.log(E) should be approximately 1");
if (Math.exp(0) !== 1) throw new Error("Math.exp(0) should be 1");
if (Math.exp(1) < 2.7 || Math.exp(1) > 2.8) throw new Error("Math.exp(1) should be approximately E");

// Test ES2015 Math methods (if available)
if (typeof Math.trunc === "function") {
    if (Math.trunc(4.9) !== 4) throw new Error("Math.trunc(4.9) should be 4");
    if (Math.trunc(-4.9) !== -4) throw new Error("Math.trunc(-4.9) should be -4");
}

if (typeof Math.sign === "function") {
    if (Math.sign(5) !== 1) throw new Error("Math.sign(5) should be 1");
    if (Math.sign(-5) !== -1) throw new Error("Math.sign(-5) should be -1");
    if (Math.sign(0) !== 0) throw new Error("Math.sign(0) should be 0");
    if (!isNaN(Math.sign(NaN))) throw new Error("Math.sign(NaN) should be NaN");
}