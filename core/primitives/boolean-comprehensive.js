/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Boolean Comprehensive Tests
 */

// Test 1-5: Boolean constructor basic tests
var result1 = new Boolean(true);
if (typeof result1 !== 'object') throw new Error("new Boolean(true) should return object");
if (result1.valueOf() !== true) throw new Error("new Boolean(true).valueOf() should be true");

var result2 = new Boolean(false);
if (typeof result2 !== 'object') throw new Error("new Boolean(false) should return object");
if (result2.valueOf() !== false) throw new Error("new Boolean(false).valueOf() should be false");

var result3 = Boolean(true);
if (typeof result3 !== 'boolean') throw new Error("Boolean(true) should return primitive boolean");
if (result3 !== true) throw new Error("Boolean(true) should be true");

var result4 = Boolean(false);
if (typeof result4 !== 'boolean') throw new Error("Boolean(false) should return primitive boolean");
if (result4 !== false) throw new Error("Boolean(false) should be false");

var result5 = new Boolean();
if (result5.valueOf() !== false) throw new Error("new Boolean() should default to false");

// Test 6-10: Boolean conversion with truthy values
var result6 = Boolean(1);
if (result6 !== true) throw new Error("Boolean(1) should be true");

var result7 = Boolean(-1);
if (result7 !== true) throw new Error("Boolean(-1) should be true");

var result8 = Boolean("hello");
if (result8 !== true) throw new Error("Boolean('hello') should be true");

var result9 = Boolean({});
if (result9 !== true) throw new Error("Boolean({}) should be true");

var result10 = Boolean([]);
if (result10 !== true) throw new Error("Boolean([]) should be true");

// Test 11-15: Boolean conversion with falsy values
var result11 = Boolean(0);
if (result11 !== false) throw new Error("Boolean(0) should be false");

var result12 = Boolean(-0);
if (result12 !== false) throw new Error("Boolean(-0) should be false");

var result13 = Boolean("");
if (result13 !== false) throw new Error("Boolean('') should be false");

var result14 = Boolean(null);
if (result14 !== false) throw new Error("Boolean(null) should be false");

var result15 = Boolean(undefined);
if (result15 !== false) throw new Error("Boolean(undefined) should be false");

// Test 16-20: Boolean conversion with NaN and Infinity
var result16 = Boolean(NaN);
if (result16 !== false) throw new Error("Boolean(NaN) should be false");

var result17 = Boolean(Infinity);
if (result17 !== true) throw new Error("Boolean(Infinity) should be true");

var result18 = Boolean(-Infinity);
if (result18 !== true) throw new Error("Boolean(-Infinity) should be true");

var result19 = Boolean(0.1);
if (result19 !== true) throw new Error("Boolean(0.1) should be true");

var result20 = Boolean(-0.1);
if (result20 !== true) throw new Error("Boolean(-0.1) should be true");

// Test 21-25: Boolean object vs primitive comparison
var boolObj = new Boolean(true);
var boolPrim = true;
if (boolObj == boolPrim) {
    // This should be true due to type coercion
} else {
    throw new Error("Boolean object should equal primitive with ==");
}

if (boolObj === boolPrim) {
    throw new Error("Boolean object should not equal primitive with ===");
}

var result23 = boolObj.toString();
if (result23 !== "true") throw new Error("Boolean(true).toString() should be 'true'");

var result24 = new Boolean(false).toString();
if (result24 !== "false") throw new Error("Boolean(false).toString() should be 'false'");

var result25 = boolObj + "";
if (result25 !== "true") throw new Error("Boolean object string coercion failed");

// Test 26-30: Boolean prototype methods
if (typeof Boolean.prototype.valueOf !== 'function') {
    throw new Error("Boolean.prototype.valueOf should be a function");
}

if (typeof Boolean.prototype.toString !== 'function') {
    throw new Error("Boolean.prototype.toString should be a function");
}

var result28 = true.toString();
if (result28 !== "true") throw new Error("true.toString() should be 'true'");

var result29 = false.toString();
if (result29 !== "false") throw new Error("false.toString() should be 'false'");

var result30 = true.valueOf();
if (result30 !== true) throw new Error("true.valueOf() should be true");

// Test 31-35: Type coercion in logical operations
var result31 = true && "hello";
if (result31 !== "hello") throw new Error("true && 'hello' should be 'hello'");

var result32 = false && "hello";
if (result32 !== false) throw new Error("false && 'hello' should be false");

var result33 = true || "hello";
if (result33 !== true) throw new Error("true || 'hello' should be true");

var result34 = false || "hello";
if (result34 !== "hello") throw new Error("false || 'hello' should be 'hello'");

var result35 = !true;
if (result35 !== false) throw new Error("!true should be false");

// Test 36-40: Type coercion in arithmetic operations
var result36 = true + 1;
if (result36 !== 2) throw new Error("true + 1 should be 2");

var result37 = false + 1;
if (result37 !== 1) throw new Error("false + 1 should be 1");

var result38 = true * 5;
if (result38 !== 5) throw new Error("true * 5 should be 5");

var result39 = false * 5;
if (result39 !== 0) throw new Error("false * 5 should be 0");

var result40 = +true;
if (result40 !== 1) throw new Error("+true should be 1");

// Test 41-45: Boolean in conditional contexts
if (!true) {
    throw new Error("true should be truthy in if statement");
}

if (false) {
    throw new Error("false should be falsy in if statement");
}

var result43 = true ? "yes" : "no";
if (result43 !== "yes") throw new Error("true ternary should return first value");

var result44 = false ? "yes" : "no";
if (result44 !== "no") throw new Error("false ternary should return second value");

var result45 = Boolean(new Boolean(false));
if (result45 !== true) throw new Error("Boolean(new Boolean(false)) should be true (object is truthy)");

// Test 46-50: Boolean constructor edge cases
try {
    var result46 = Boolean.call(null, true);
    if (result46 !== true) throw new Error("Boolean.call(null, true) should work");
} catch (e) {
    throw new Error("Boolean.call should work with null context");
}

var result47 = Boolean.length;
if (result47 !== 1) throw new Error("Boolean.length should be 1");

if (Boolean.name !== "Boolean") throw new Error("Boolean.name should be 'Boolean'");

var result49 = Boolean.prototype.constructor;
if (result49 !== Boolean) throw new Error("Boolean.prototype.constructor should be Boolean");

var customBoolean = Object.create(Boolean.prototype);
customBoolean.value = true;
if (typeof customBoolean.valueOf !== 'function') {
    throw new Error("Custom Boolean should inherit valueOf");
}

// Test 51-55: String representations and parsing
var result51 = String(true);
if (result51 !== "true") throw new Error("String(true) should be 'true'");

var result52 = String(false);
if (result52 !== "false") throw new Error("String(false) should be 'false'");

var result53 = Boolean("true");
if (result53 !== true) throw new Error("Boolean('true') should be true (non-empty string)");

var result54 = Boolean("false");
if (result54 !== true) throw new Error("Boolean('false') should be true (non-empty string)");

var result55 = JSON.parse(JSON.stringify(true));
if (result55 !== true) throw new Error("JSON round-trip for true failed");

// Test 56-60: Object property and method behavior
var obj = {};
obj[true] = "true key";
obj[false] = "false key";
if (obj["true"] !== "true key") throw new Error("Boolean key coerced to string 'true'");
if (obj["false"] !== "false key") throw new Error("Boolean key coerced to string 'false'");

var booleanWrapper = new Boolean(true);
booleanWrapper.customProp = "custom";
if (booleanWrapper.customProp !== "custom") throw new Error("Boolean object should accept custom properties");

var result59 = Object.prototype.toString.call(true);
if (result59 !== "[object Boolean]") throw new Error("Object.prototype.toString.call(true) failed");

var result60 = Object.prototype.toString.call(new Boolean(false));
if (result60 !== "[object Boolean]") throw new Error("Object.prototype.toString.call(Boolean object) failed");

// Test 61-65: Array and object context behavior
var boolArray = [true, false, new Boolean(true)];
var result61 = boolArray.join(",");
if (result61 !== "true,false,true") throw new Error("Boolean array join failed");

var result62 = [true, false].toString();
if (result62 !== "true,false") throw new Error("Boolean array toString failed");

var mixedObj = {a: true, b: false, c: new Boolean(true)};
if (mixedObj.a !== true || mixedObj.b !== false) throw new Error("Boolean object properties failed");

var result64 = Boolean.prototype.isPrototypeOf(new Boolean(true));
if (!result64) throw new Error("Boolean.prototype should be prototype of Boolean objects");

var result65 = Boolean.prototype.isPrototypeOf(true);
if (result65) throw new Error("Boolean.prototype should not be prototype of primitive booleans");

// Test 66-70: Edge cases and special scenarios
if (typeof Symbol !== 'undefined') {
    var result66 = Boolean(Symbol());
    if (result66 !== true) throw new Error("Boolean(Symbol()) should be true");
}

var result67 = Boolean((typeof document !== 'undefined' ? document : null) || {});
if (result67 !== true) throw new Error("Boolean with fallback object should be true");

try {
    Boolean.prototype.valueOf.call({});
    throw new Error("valueOf should throw on non-Boolean object");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("valueOf should throw TypeError");
}

try {
    Boolean.prototype.toString.call(null);
    throw new Error("toString should throw on null");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("toString should throw TypeError");
}

// Test Boolean in switch statements
var testValue = true;
var switchResult = "";
switch (testValue) {
    case true:
        switchResult = "matched true";
        break;
    case false:
        switchResult = "matched false";
        break;
    default:
        switchResult = "no match";
}
if (switchResult !== "matched true") throw new Error("Boolean in switch statement failed");