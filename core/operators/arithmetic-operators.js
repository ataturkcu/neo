/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Arithmetic Operators (+, -, *, /, %, ++, --)
 */

// Test basic addition
var result1 = 5 + 3;
if (result1 !== 8) throw new Error("5 + 3 should equal 8, got " + result1);

var result2 = -5 + 3;
if (result2 !== -2) throw new Error("-5 + 3 should equal -2, got " + result2);

var result3 = 5 + (-3);
if (result3 !== 2) throw new Error("5 + (-3) should equal 2, got " + result3);

// Test string concatenation with +
var result4 = "Hello" + " World";
if (result4 !== "Hello World") throw new Error("String concatenation failed, got " + result4);

var result5 = "5" + 3;
if (result5 !== "53") throw new Error("'5' + 3 should equal '53', got " + result5);

var result6 = 5 + "3";
if (result6 !== "53") throw new Error("5 + '3' should equal '53', got " + result6);

// Test addition with various types
var result7 = true + 1;
if (result7 !== 2) throw new Error("true + 1 should equal 2, got " + result7);

var result8 = false + 1;
if (result8 !== 1) throw new Error("false + 1 should equal 1, got " + result8);

var result9 = null + 1;
if (result9 !== 1) throw new Error("null + 1 should equal 1, got " + result9);

var result10 = undefined + 1;
if (!isNaN(result10)) throw new Error("undefined + 1 should be NaN, got " + result10);

// Test basic subtraction
var result11 = 10 - 3;
if (result11 !== 7) throw new Error("10 - 3 should equal 7, got " + result11);

var result12 = 3 - 10;
if (result12 !== -7) throw new Error("3 - 10 should equal -7, got " + result12);

var result13 = -5 - 3;
if (result13 !== -8) throw new Error("-5 - 3 should equal -8, got " + result13);

// Test subtraction type coercion
var result14 = "10" - 3;
if (result14 !== 7) throw new Error("'10' - 3 should equal 7, got " + result14);

var result15 = 10 - "3";
if (result15 !== 7) throw new Error("10 - '3' should equal 7, got " + result15);

var result16 = true - false;
if (result16 !== 1) throw new Error("true - false should equal 1, got " + result16);

// Test basic multiplication
var result17 = 4 * 5;
if (result17 !== 20) throw new Error("4 * 5 should equal 20, got " + result17);

var result18 = -4 * 5;
if (result18 !== -20) throw new Error("-4 * 5 should equal -20, got " + result18);

var result19 = -4 * -5;
if (result19 !== 20) throw new Error("-4 * -5 should equal 20, got " + result19);

// Test multiplication with zero
var result20 = 5 * 0;
if (result20 !== 0) throw new Error("5 * 0 should equal 0, got " + result20);

var result21 = 0 * 5;
if (result21 !== 0) throw new Error("0 * 5 should equal 0, got " + result21);

// Test multiplication with infinity
var result22 = 5 * Infinity;
if (result22 !== Infinity) throw new Error("5 * Infinity should equal Infinity, got " + result22);

var result23 = 0 * Infinity;
if (!isNaN(result23)) throw new Error("0 * Infinity should be NaN, got " + result23);

// Test basic division
var result24 = 15 / 3;
if (result24 !== 5) throw new Error("15 / 3 should equal 5, got " + result24);

var result25 = 15 / 4;
if (result25 !== 3.75) throw new Error("15 / 4 should equal 3.75, got " + result25);

var result26 = -15 / 3;
if (result26 !== -5) throw new Error("-15 / 3 should equal -5, got " + result26);

// Test division by zero
var result27 = 5 / 0;
if (result27 !== Infinity) throw new Error("5 / 0 should equal Infinity, got " + result27);

var result28 = -5 / 0;
if (result28 !== -Infinity) throw new Error("-5 / 0 should equal -Infinity, got " + result28);

var result29 = 0 / 0;
if (!isNaN(result29)) throw new Error("0 / 0 should be NaN, got " + result29);

// Test modulo operator
var result30 = 10 % 3;
if (result30 !== 1) throw new Error("10 % 3 should equal 1, got " + result30);

var result31 = 15 % 4;
if (result31 !== 3) throw new Error("15 % 4 should equal 3, got " + result31);

var result32 = 8 % 4;
if (result32 !== 0) throw new Error("8 % 4 should equal 0, got " + result32);

// Test modulo with negative numbers
var result33 = -10 % 3;
if (result33 !== -1) throw new Error("-10 % 3 should equal -1, got " + result33);

var result34 = 10 % -3;
if (result34 !== 1) throw new Error("10 % -3 should equal 1, got " + result34);

var result35 = -10 % -3;
if (result35 !== -1) throw new Error("-10 % -3 should equal -1, got " + result35);

// Test modulo edge cases
var result36 = 5 % 0;
if (!isNaN(result36)) throw new Error("5 % 0 should be NaN, got " + result36);

var result37 = 0 % 5;
if (result37 !== 0) throw new Error("0 % 5 should equal 0, got " + result37);

// Test prefix increment
var a = 5;
var result38 = ++a;
if (result38 !== 6) throw new Error("++a should return 6, got " + result38);
if (a !== 6) throw new Error("a should be 6 after ++a, got " + a);

// Test postfix increment
var b = 5;
var result39 = b++;
if (result39 !== 5) throw new Error("b++ should return 5, got " + result39);
if (b !== 6) throw new Error("b should be 6 after b++, got " + b);

// Test prefix decrement
var c = 5;
var result40 = --c;
if (result40 !== 4) throw new Error("--c should return 4, got " + result40);
if (c !== 4) throw new Error("c should be 4 after --c, got " + c);

// Test postfix decrement
var d = 5;
var result41 = d--;
if (result41 !== 5) throw new Error("d-- should return 5, got " + result41);
if (d !== 4) throw new Error("d should be 4 after d--, got " + d);

// Test increment/decrement with non-numbers
var e = "5";
++e;
if (e !== 6) throw new Error("++e with string '5' should be 6, got " + e);

var f = "hello";
++f;
if (!isNaN(f)) throw new Error("++f with string 'hello' should be NaN, got " + f);

// Test arithmetic with floating point precision
var result42 = 0.1 + 0.2;
if (Math.abs(result42 - 0.3) > 1e-10) throw new Error("0.1 + 0.2 floating point precision issue");

var result43 = 0.3 - 0.1;
if (Math.abs(result43 - 0.2) > 1e-10) throw new Error("0.3 - 0.1 floating point precision issue");

// Test very large numbers
var result44 = Number.MAX_VALUE + 1;
if (result44 !== Number.MAX_VALUE) throw new Error("MAX_VALUE + 1 should equal MAX_VALUE");

var result45 = Number.MAX_VALUE * 2;
if (result45 !== Infinity) throw new Error("MAX_VALUE * 2 should equal Infinity");

// Test very small numbers
var result46 = Number.MIN_VALUE / 2;
if (result46 !== 0) throw new Error("MIN_VALUE / 2 should equal 0");

// Test negative zero
var result47 = -0;
if (result47 !== 0) throw new Error("-0 should equal 0");
if (1 / result47 !== -Infinity) throw new Error("1 / -0 should equal -Infinity");

// Test arithmetic with NaN
var result48 = 5 + NaN;
if (!isNaN(result48)) throw new Error("5 + NaN should be NaN");

var result49 = 5 - NaN;
if (!isNaN(result49)) throw new Error("5 - NaN should be NaN");

var result50 = 5 * NaN;
if (!isNaN(result50)) throw new Error("5 * NaN should be NaN");

var result51 = 5 / NaN;
if (!isNaN(result51)) throw new Error("5 / NaN should be NaN");

// Test arithmetic with objects (valueOf method)
var obj = {
    valueOf: function() { return 10; }
};
var result52 = obj + 5;
if (result52 !== 15) throw new Error("Object with valueOf + number should work, got " + result52);

// Test arithmetic with objects (toString method)
var obj2 = {
    toString: function() { return "5"; }
};
var result53 = obj2 - 3;
if (result53 !== 2) throw new Error("Object with toString - number should work, got " + result53);

// Test compound assignment operators
var g = 10;
g += 5;
if (g !== 15) throw new Error("g += 5 should make g equal 15, got " + g);

var h = 10;
h -= 3;
if (h !== 7) throw new Error("h -= 3 should make h equal 7, got " + h);

var i = 5;
i *= 4;
if (i !== 20) throw new Error("i *= 4 should make i equal 20, got " + i);

var j = 20;
j /= 4;
if (j !== 5) throw new Error("j /= 4 should make j equal 5, got " + j);

var k = 17;
k %= 5;
if (k !== 2) throw new Error("k %= 5 should make k equal 2, got " + k);

// Test unary plus operator
var result54 = +"5";
if (result54 !== 5) throw new Error("+'5' should equal 5, got " + result54);

var result55 = +true;
if (result55 !== 1) throw new Error("+true should equal 1, got " + result55);

var result56 = +null;
if (result56 !== 0) throw new Error("+null should equal 0, got " + result56);

// Test unary minus operator
var result57 = -"5";
if (result57 !== -5) throw new Error("-'5' should equal -5, got " + result57);

var result58 = -true;
if (result58 !== -1) throw new Error("-true should equal -1, got " + result58);

var result59 = -(-5);
if (result59 !== 5) throw new Error("-(-5) should equal 5, got " + result59);