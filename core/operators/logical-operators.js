/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Logical Operators (&&, ||, !) with Short-circuiting and Truthy/Falsy
 */

// Test logical AND (&&) basic cases
var result1 = true && true;
if (result1 !== true) throw new Error("true && true should be true, got " + result1);

var result2 = true && false;
if (result2 !== false) throw new Error("true && false should be false, got " + result2);

var result3 = false && true;
if (result3 !== false) throw new Error("false && true should be false, got " + result3);

var result4 = false && false;
if (result4 !== false) throw new Error("false && false should be false, got " + result4);

// Test logical OR (||) basic cases
var result5 = true || true;
if (result5 !== true) throw new Error("true || true should be true, got " + result5);

var result6 = true || false;
if (result6 !== true) throw new Error("true || false should be true, got " + result6);

var result7 = false || true;
if (result7 !== true) throw new Error("false || true should be true, got " + result7);

var result8 = false || false;
if (result8 !== false) throw new Error("false || false should be false, got " + result8);

// Test logical NOT (!) basic cases
var result9 = !true;
if (result9 !== false) throw new Error("!true should be false, got " + result9);

var result10 = !false;
if (result10 !== true) throw new Error("!false should be true, got " + result10);

var result11 = !!true;
if (result11 !== true) throw new Error("!!true should be true, got " + result11);

var result12 = !!false;
if (result12 !== false) throw new Error("!!false should be false, got " + result12);

// Test && returns the last evaluated value (not just boolean)
var result13 = 5 && 3;
if (result13 !== 3) throw new Error("5 && 3 should return 3, got " + result13);

var result14 = 0 && 3;
if (result14 !== 0) throw new Error("0 && 3 should return 0, got " + result14);

var result15 = null && "hello";
if (result15 !== null) throw new Error("null && 'hello' should return null, got " + result15);

var result16 = "hello" && "world";
if (result16 !== "world") throw new Error("'hello' && 'world' should return 'world', got " + result16);

// Test || returns the first truthy value
var result17 = 5 || 3;
if (result17 !== 5) throw new Error("5 || 3 should return 5, got " + result17);

var result18 = 0 || 3;
if (result18 !== 3) throw new Error("0 || 3 should return 3, got " + result18);

var result19 = null || "hello";
if (result19 !== "hello") throw new Error("null || 'hello' should return 'hello', got " + result19);

var result20 = "" || "default";
if (result20 !== "default") throw new Error("'' || 'default' should return 'default', got " + result20);

// Test truthy values
var result21 = !1;
if (result21 !== false) throw new Error("!1 should be false, got " + result21);

var result22 = !"hello";
if (result22 !== false) throw new Error("!'hello' should be false, got " + result22);

var result23 = ![];
if (result23 !== false) throw new Error("![] should be false, got " + result23);

var result24 = !{};
if (result24 !== false) throw new Error("!{} should be false, got " + result24);

var result25 = !function() {};
if (result25 !== false) throw new Error("!function() {} should be false, got " + result25);

// Test falsy values
var result26 = !0;
if (result26 !== true) throw new Error("!0 should be true, got " + result26);

var result27 = !"";
if (result27 !== true) throw new Error("!'' should be true, got " + result27);

var result28 = !null;
if (result28 !== true) throw new Error("!null should be true, got " + result28);

var result29 = !undefined;
if (result29 !== true) throw new Error("!undefined should be true, got " + result29);

var result30 = !NaN;
if (result30 !== true) throw new Error("!NaN should be true, got " + result30);

var result31 = !false;
if (result31 !== true) throw new Error("!false should be true, got " + result31);

// Test short-circuiting with &&
var sideEffect1 = false;
var result32 = false && (sideEffect1 = true);
if (result32 !== false) throw new Error("Short-circuit && should return false, got " + result32);
if (sideEffect1 !== false) throw new Error("Side effect should not execute in false && expression");

var sideEffect2 = false;
var result33 = true && (sideEffect2 = true);
if (result33 !== true) throw new Error("Non-short-circuit && should return true, got " + result33);
if (sideEffect2 !== true) throw new Error("Side effect should execute in true && expression");

// Test short-circuiting with ||
var sideEffect3 = false;
var result34 = true || (sideEffect3 = true);
if (result34 !== true) throw new Error("Short-circuit || should return true, got " + result34);
if (sideEffect3 !== false) throw new Error("Side effect should not execute in true || expression");

var sideEffect4 = false;
var result35 = false || (sideEffect4 = true);
if (result35 !== true) throw new Error("Non-short-circuit || should return true, got " + result35);
if (sideEffect4 !== true) throw new Error("Side effect should execute in false || expression");

// Test chained logical operators
var result36 = true && true && true;
if (result36 !== true) throw new Error("true && true && true should be true, got " + result36);

var result37 = true && false && true;
if (result37 !== false) throw new Error("true && false && true should be false, got " + result37);

var result38 = false || false || true;
if (result38 !== true) throw new Error("false || false || true should be true, got " + result38);

var result39 = false || false || false;
if (result39 !== false) throw new Error("false || false || false should be false, got " + result39);

// Test mixed && and || (|| has lower precedence)
var result40 = true && false || true;
if (result40 !== true) throw new Error("true && false || true should be true, got " + result40);

var result41 = false || true && false;
if (result41 !== false) throw new Error("false || true && false should be false, got " + result41);

// Test with numbers
var result42 = 1 && 2 && 3;
if (result42 !== 3) throw new Error("1 && 2 && 3 should return 3, got " + result42);

var result43 = 0 || 1 || 2;
if (result43 !== 1) throw new Error("0 || 1 || 2 should return 1, got " + result43);

var result44 = 5 && 0 && 10;
if (result44 !== 0) throw new Error("5 && 0 && 10 should return 0, got " + result44);

// Test with strings
var result45 = "a" && "b" && "c";
if (result45 !== "c") throw new Error("'a' && 'b' && 'c' should return 'c', got " + result45);

var result46 = "" || "hello" || "world";
if (result46 !== "hello") throw new Error("'' || 'hello' || 'world' should return 'hello', got " + result46);

var result47 = "first" && "" && "last";
if (result47 !== "") throw new Error("'first' && '' && 'last' should return '', got " + result47);

// Test with objects and arrays
var obj = {name: "test"};
var arr = [1, 2, 3];

var result48 = obj && arr;
if (result48 !== arr) throw new Error("obj && arr should return arr, got " + result48);

var result49 = null || obj;
if (result49 !== obj) throw new Error("null || obj should return obj, got " + result49);

var result50 = [] && {};
if (typeof result50 !== "object" || Array.isArray(result50)) throw new Error("[] && {} should return {}, got " + result50);

// Test with functions
function testFn() { return "function result"; }
var result51 = testFn && testFn();
if (result51 !== "function result") throw new Error("testFn && testFn() should call function, got " + result51);

var result52 = null || testFn;
if (result52 !== testFn) throw new Error("null || testFn should return testFn, got " + result52);

// Test complex expressions with parentheses
var result53 = (true || false) && (false || true);
if (result53 !== true) throw new Error("(true || false) && (false || true) should be true, got " + result53);

var result54 = (false && true) || (true && false);
if (result54 !== false) throw new Error("(false && true) || (true && false) should be false, got " + result54);

// Test with undefined and null
var result55 = undefined && "test";
if (result55 !== undefined) throw new Error("undefined && 'test' should return undefined, got " + result55);

var result56 = null || undefined || "default";
if (result56 !== "default") throw new Error("null || undefined || 'default' should return 'default', got " + result56);

// Test NOT operator with various types
var result57 = !42;
if (result57 !== false) throw new Error("!42 should be false, got " + result57);

var result58 = !-42;
if (result58 !== false) throw new Error("!-42 should be false, got " + result58);

var result59 = !(5 > 3);
if (result59 !== false) throw new Error("!(5 > 3) should be false, got " + result59);

var result60 = !(5 < 3);
if (result60 !== true) throw new Error("!(5 < 3) should be true, got " + result60);

// Test complex logical expressions for short-circuiting
var callCount = 0;
function incrementCall() {
    callCount++;
    return true;
}

// This should not call incrementCall because first operand is false
var result61 = false && incrementCall();
if (callCount !== 0) throw new Error("Function should not be called due to short-circuiting");

// This should call incrementCall because first operand is false
callCount = 0;
var result62 = false || incrementCall();
if (callCount !== 1) throw new Error("Function should be called when first operand of || is false");

// This should not call incrementCall because first operand is true
callCount = 0;
var result63 = true || incrementCall();
if (callCount !== 0) throw new Error("Function should not be called due to short-circuiting in ||");

// Test with 0 and empty string specifically
var result64 = 0 && "never reached";
if (result64 !== 0) throw new Error("0 && 'never reached' should return 0, got " + result64);

var result65 = "" || "default value";
if (result65 !== "default value") throw new Error("'' || 'default value' should return 'default value', got " + result65);

// Test logical operators with comparison results
var result66 = (5 > 3) && (2 < 4);
if (result66 !== true) throw new Error("(5 > 3) && (2 < 4) should be true, got " + result66);

var result67 = (5 < 3) || (2 > 4);
if (result67 !== false) throw new Error("(5 < 3) || (2 > 4) should be false, got " + result67);

// Test nested logical operations
var result68 = !!(5 && 3);
if (result68 !== true) throw new Error("!!(5 && 3) should be true, got " + result68);

var result69 = !!(0 || false);
if (result69 !== false) throw new Error("!!(0 || false) should be false, got " + result69);

// Test assignment within logical operations
var a = 0;
var result70 = (a = 5) && (a > 3);
if (result70 !== true) throw new Error("Assignment in logical expression should work, got " + result70);
if (a !== 5) throw new Error("Variable should be assigned, a = " + a);

// Test with NaN specifically
var result71 = NaN && true;
if (result71 === result71) throw new Error("NaN && true should return NaN");

var result72 = NaN || "default";
if (result72 !== "default") throw new Error("NaN || 'default' should return 'default', got " + result72);