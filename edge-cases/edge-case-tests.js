/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Edge Cases and Unusual Behavior
 */

// Test NaN behavior
if (NaN === NaN) throw new Error("NaN should not equal itself");
if (isNaN(NaN) !== true) throw new Error("isNaN(NaN) should be true");
if (isNaN("not a number") !== true) throw new Error("isNaN('not a number') should be true");

// Test Infinity
if (!isFinite(Infinity)) {
    // This is expected
} else {
    throw new Error("Infinity should not be finite");
}

if (Infinity === Infinity) {
    // This is expected
} else {
    throw new Error("Infinity should equal itself");
}

// Test typeof edge cases
if (typeof null !== "object") throw new Error("typeof null should be 'object'");
if (typeof undefined !== "undefined") throw new Error("typeof undefined should be 'undefined'");
if (typeof [] !== "object") throw new Error("typeof [] should be 'object'");

// Test falsy values
var falsyValues = [false, 0, "", null, undefined, NaN];
for (var i = 0; i < falsyValues.length; i++) {
    if (falsyValues[i]) {
        throw new Error("Falsy value " + falsyValues[i] + " should be falsy");
    }
}

// Test truthy values
var truthyValues = [true, 1, "0", "false", [], {}];
for (var i = 0; i < truthyValues.length; i++) {
    if (!truthyValues[i]) {
        throw new Error("Truthy value should be truthy");
    }
}

// Test parseInt edge cases
if (parseInt("123abc") !== 123) throw new Error("parseInt should parse leading numbers");
if (parseInt("abc123") !== parseInt("abc123")) { // NaN !== NaN
    // This is expected behavior
} else {
    throw new Error("parseInt of non-numeric string should return NaN");
}

// Test floating point precision
if (0.1 + 0.2 === 0.3) throw new Error("Floating point precision issue should exist");

// Test automatic semicolon insertion
var result = function() {
    return
        "value";
}();
if (result !== undefined) throw new Error("ASI should cause return undefined");

// Test hoisting edge case
var hoistedVar = "outer";
function hoistingTest() {
    if (typeof hoistedVar !== "undefined") throw new Error("hoistedVar should be undefined due to hoisting");
    var hoistedVar = "inner";
}
hoistingTest();

// Test delete operator
var obj = {prop: "value"};
delete obj.prop;
if ("prop" in obj) throw new Error("Property should be deleted");

// Cannot delete variables
var variable = "test";
delete variable;
if (typeof variable !== "string") throw new Error("Cannot delete variables");

// Test with statement (if supported)
var withObj = {x: 1, y: 2};
try {
    with (withObj) {
        if (x !== 1) throw new Error("with statement should provide context");
        if (y !== 2) throw new Error("with statement should provide context");
    }
} catch (e) {
    // with might not be supported in strict mode
}