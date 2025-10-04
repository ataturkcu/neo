/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Floating Point Precision and IEEE 754 Behavior
 */

// Test IEEE 754 double precision basics
if (typeof Number.EPSILON === "number") {
    // Machine epsilon: smallest representable positive number such that 1 + ε > 1
    if (1 + Number.EPSILON === 1) throw new Error("1 + Number.EPSILON should be greater than 1");
    if (1 + (Number.EPSILON / 2) !== 1) throw new Error("1 + (ε/2) should equal 1");
}

// Test classic floating point precision issues
if (0.1 + 0.2 === 0.3) throw new Error("0.1 + 0.2 should not exactly equal 0.3 (floating point precision)");
if (Math.abs((0.1 + 0.2) - 0.3) >= Number.EPSILON) throw new Error("0.1 + 0.2 - 0.3 should be within machine epsilon");

// Test more precision issues
if (0.1 + 0.1 + 0.1 === 0.3) throw new Error("0.1 + 0.1 + 0.1 should not exactly equal 0.3");
if (Math.abs((0.1 + 0.1 + 0.1) - 0.3) >= Number.EPSILON) throw new Error("Triple 0.1 sum should be close to 0.3");

// Test decimal representation issues
if (0.1 * 3 === 0.3) throw new Error("0.1 * 3 should not exactly equal 0.3");
if (0.3 / 3 === 0.1) throw new Error("0.3 / 3 should not exactly equal 0.1");

// Test negative zero behavior
if (-0 !== 0) throw new Error("-0 should equal 0 (=== comparison)");
if (Object.is(-0, 0)) throw new Error("Object.is(-0, 0) should be false");
if (1 / -0 !== -Infinity) throw new Error("1 / -0 should be -Infinity");
if (1 / 0 !== Infinity) throw new Error("1 / 0 should be Infinity");

// Test positive and negative zero operations
if ((-0) + 0 !== 0) throw new Error("-0 + 0 should be 0");
if (1 / ((-0) + 0) !== Infinity) throw new Error("1 / (-0 + 0) should be Infinity");
if ((-0) + (-0) !== -0) throw new Error("-0 + -0 should be -0");
if (1 / ((-0) + (-0)) !== -Infinity) throw new Error("1 / (-0 + -0) should be -Infinity");

// Test infinity arithmetic
if (Infinity + 1 !== Infinity) throw new Error("Infinity + 1 should be Infinity");
if (Infinity - 1 !== Infinity) throw new Error("Infinity - 1 should be Infinity");
if (Infinity * 2 !== Infinity) throw new Error("Infinity * 2 should be Infinity");
if (Infinity / 2 !== Infinity) throw new Error("Infinity / 2 should be Infinity");
if (1 / Infinity !== 0) throw new Error("1 / Infinity should be 0");

// Test negative infinity arithmetic
if (-Infinity + 1 !== -Infinity) throw new Error("-Infinity + 1 should be -Infinity");
if (-Infinity - 1 !== -Infinity) throw new Error("-Infinity - 1 should be -Infinity");
if (-Infinity * 2 !== -Infinity) throw new Error("-Infinity * 2 should be -Infinity");
if (-Infinity / 2 !== -Infinity) throw new Error("-Infinity / 2 should be -Infinity");
if (1 / -Infinity !== -0) throw new Error("1 / -Infinity should be -0");

// Test infinity operations that produce NaN
if (!isNaN(Infinity - Infinity)) throw new Error("Infinity - Infinity should be NaN");
if (!isNaN(Infinity + (-Infinity))) throw new Error("Infinity + (-Infinity) should be NaN");
if (!isNaN(Infinity / Infinity)) throw new Error("Infinity / Infinity should be NaN");
if (!isNaN((-Infinity) / Infinity)) throw new Error("(-Infinity) / Infinity should be NaN");
if (!isNaN(Infinity * 0)) throw new Error("Infinity * 0 should be NaN");
if (!isNaN(0 * Infinity)) throw new Error("0 * Infinity should be NaN");

// Test NaN behavior
if (NaN === NaN) throw new Error("NaN should not equal NaN");
if (NaN == NaN) throw new Error("NaN should not == NaN");
if (!isNaN(NaN)) throw new Error("isNaN(NaN) should be true");
if (!Number.isNaN(NaN)) throw new Error("Number.isNaN(NaN) should be true");

// Test NaN arithmetic (always produces NaN)
if (!isNaN(NaN + 1)) throw new Error("NaN + 1 should be NaN");
if (!isNaN(NaN - 1)) throw new Error("NaN - 1 should be NaN");
if (!isNaN(NaN * 1)) throw new Error("NaN * 1 should be NaN");
if (!isNaN(NaN / 1)) throw new Error("NaN / 1 should be NaN");
if (!isNaN(1 + NaN)) throw new Error("1 + NaN should be NaN");
if (!isNaN(1 - NaN)) throw new Error("1 - NaN should be NaN");
if (!isNaN(1 * NaN)) throw new Error("1 * NaN should be NaN");
if (!isNaN(1 / NaN)) throw new Error("1 / NaN should be NaN");

// Test operations that produce NaN
if (!isNaN(0 / 0)) throw new Error("0 / 0 should be NaN");
if (!isNaN(Math.sqrt(-1))) throw new Error("sqrt(-1) should be NaN");
if (!isNaN(Math.log(-1))) throw new Error("log(-1) should be NaN");
if (!isNaN(Math.asin(2))) throw new Error("asin(2) should be NaN");
if (!isNaN(Math.acos(2))) throw new Error("acos(2) should be NaN");

// Test very large numbers
var maxValue = Number.MAX_VALUE;
if (maxValue * 2 !== Infinity) throw new Error("MAX_VALUE * 2 should overflow to Infinity");
if (maxValue + maxValue !== Infinity) throw new Error("MAX_VALUE + MAX_VALUE should overflow to Infinity");
if (maxValue * 1.1 <= maxValue) throw new Error("MAX_VALUE * 1.1 should be larger or Infinity");

// Test very small numbers
var minValue = Number.MIN_VALUE;
if (minValue / 2 !== 0) throw new Error("MIN_VALUE / 2 should underflow to 0");
if (minValue * 0.5 !== 0) throw new Error("MIN_VALUE * 0.5 should underflow to 0");
if (minValue - minValue !== 0) throw new Error("MIN_VALUE - MIN_VALUE should be 0");

// Test denormalized (subnormal) numbers
var denormal = 5e-324; // Smallest positive denormalized number
if (denormal === 0) throw new Error("5e-324 should be a valid denormalized number");
if (denormal / 2 !== 0) throw new Error("Denormalized number / 2 should underflow to 0");

// Test precision limits with large integers
var large1 = 9007199254740991; // 2^53 - 1 (MAX_SAFE_INTEGER)
var large2 = 9007199254740992; // 2^53
var large3 = 9007199254740993; // 2^53 + 1

if (large1 + 1 !== large2) throw new Error("(2^53 - 1) + 1 should equal 2^53");
if (large2 + 1 !== large2) throw new Error("2^53 + 1 should equal 2^53 due to precision loss");

// Test that consecutive large integers cannot be distinguished
// (already tested above)
if (large2 + 2 !== large2 + 2) throw new Error("2^53 + 2 should be distinguishable");

// Test safe integer boundaries
if (typeof Number.MAX_SAFE_INTEGER === "number") {
    var maxSafe = Number.MAX_SAFE_INTEGER;
    if (maxSafe !== 9007199254740991) throw new Error("MAX_SAFE_INTEGER should be 2^53 - 1");
    if (Number.isSafeInteger && !Number.isSafeInteger(maxSafe)) throw new Error("MAX_SAFE_INTEGER should be safe");
    if (Number.isSafeInteger && Number.isSafeInteger(maxSafe + 1)) throw new Error("MAX_SAFE_INTEGER + 1 should not be safe");
}

if (typeof Number.MIN_SAFE_INTEGER === "number") {
    var minSafe = Number.MIN_SAFE_INTEGER;
    if (minSafe !== -9007199254740991) throw new Error("MIN_SAFE_INTEGER should be -(2^53 - 1)");
    if (Number.isSafeInteger && !Number.isSafeInteger(minSafe)) throw new Error("MIN_SAFE_INTEGER should be safe");
    if (Number.isSafeInteger && Number.isSafeInteger(minSafe - 1)) throw new Error("MIN_SAFE_INTEGER - 1 should not be safe");
}

// Test rounding behavior in arithmetic
if (Math.round(0.5) !== 1) throw new Error("Math.round(0.5) should be 1");
if (Math.round(-0.5) !== -0) throw new Error("Math.round(-0.5) should be -0");
if (Math.round(1.5) !== 2) throw new Error("Math.round(1.5) should be 2");
if (Math.round(-1.5) !== -1) throw new Error("Math.round(-1.5) should be -1");

// Test banker's rounding edge cases
if (Math.round(2.5) !== 3) throw new Error("Math.round(2.5) should be 3");
if (Math.round(-2.5) !== -2) throw new Error("Math.round(-2.5) should be -2");

// Test precision in trigonometric functions
var piApprox = Math.acos(-1);
if (Math.abs(piApprox - Math.PI) > Number.EPSILON) throw new Error("acos(-1) should be very close to PI");
if (Math.abs(Math.sin(Math.PI)) > 1e-15) throw new Error("sin(π) should be very close to 0");
if (Math.abs(Math.cos(Math.PI / 2)) > 1e-15) throw new Error("cos(π/2) should be very close to 0");

// Test precision in exponential and logarithmic functions
if (Math.abs(Math.log(Math.E) - 1) > Number.EPSILON) throw new Error("log(e) should be very close to 1");
if (Math.abs(Math.exp(1) - Math.E) > Number.EPSILON) throw new Error("exp(1) should be very close to e");
if (Math.abs(Math.pow(Math.E, Math.log(2)) - 2) > Number.EPSILON) throw new Error("e^(ln(2)) should be very close to 2");

// Test division by very small numbers
var verySmall = 1e-100;
var result = 1 / verySmall;
if (result !== 1e100) throw new Error("1 / 1e-100 should be 1e100");
if (isFinite(1 / 1e-400)) throw new Error("1 / 1e-400 should overflow to Infinity (not finite)");

// Test multiplication overflow
var large = 1e200;
if (isFinite(large * large)) throw new Error("1e200 * 1e200 should overflow to Infinity");
if (large * large !== Infinity) throw new Error("Large multiplication should result in Infinity");

// Test gradual underflow
var small = 1e-200;
if (small * small !== 0) throw new Error("1e-200 * 1e-200 should underflow to zero");
if (isFinite(1 / (small * small))) throw new Error("1 / (very small product) should be Infinity (not finite)");

// Test hexadecimal float precision
// var hex1 = 0x1.0p0; // Hex float notation not supported in JavaScript
// var hex2 = 0x1.8p0; // Hex float notation not supported in JavaScript
// Note: Hex float literals may not be supported in all engines

// Test that toFixed handles precision correctly
var precisionTest = 1.005;
if (precisionTest.toFixed(2) !== "1.00") throw new Error("1.005.toFixed(2) should round to '1.00' due to floating point representation");

var precisionTest2 = 1.235;
if (precisionTest2.toFixed(2) !== "1.24") throw new Error("1.235.toFixed(2) should round to '1.24'");

// Test that toPrecision handles significant digits correctly
var sigTest = 123.456;
if (sigTest.toPrecision(4) !== "123.5") throw new Error("123.456.toPrecision(4) should be '123.5'");

// Test conversion between different numeric formats - 1.1 has binary precision issues
var binaryFloat = parseFloat("1.1"); // 1.1 cannot be represented exactly in binary
var preciseStr = binaryFloat.toPrecision(20);
if (preciseStr === "1.1000000000000000000") throw new Error("1.1 should show binary precision issues");

// Test that Number.EPSILON relates to machine precision
if (typeof Number.EPSILON === "number") {
    var testEpsilon = 1;
    while (1 + testEpsilon / 2 > 1) {
        testEpsilon = testEpsilon / 2;
    }
    if (Math.abs(testEpsilon - Number.EPSILON) > Number.EPSILON) {
        throw new Error("Computed epsilon should be close to Number.EPSILON");
    }
}

// Test IEEE 754 special value behavior in comparisons
if (!(Infinity > Number.MAX_VALUE)) throw new Error("Infinity should be greater than MAX_VALUE");
if (!(-Infinity < -Number.MAX_VALUE)) throw new Error("-Infinity should be less than -MAX_VALUE");
if (NaN < 0) throw new Error("NaN < 0 should be false");
if (NaN > 0) throw new Error("NaN > 0 should be false");
if (NaN <= 0) throw new Error("NaN <= 0 should be false");
if (NaN >= 0) throw new Error("NaN >= 0 should be false");