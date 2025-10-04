/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object.is (ES2015)
 */

// Test Object.is basic functionality
if (typeof Object.is === "function") {
    // Same as === for most cases
    if (!Object.is(1, 1)) throw new Error("Object.is(1, 1) should be true");
    if (!Object.is("hello", "hello")) throw new Error("Object.is with same strings should be true");
    if (!Object.is(true, true)) throw new Error("Object.is with same booleans should be true");
    if (Object.is(1, "1")) throw new Error("Object.is(1, '1') should be false");
    if (Object.is(1, 2)) throw new Error("Object.is(1, 2) should be false");

    var obj = {};
    if (!Object.is(obj, obj)) throw new Error("Object.is with same object reference should be true");
    if (Object.is({}, {})) throw new Error("Object.is with different objects should be false");

    // Differences from === operator

    // +0 and -0
    if (0 === -0) {
        // === treats +0 and -0 as equal, but Object.is treats them as different
        if (Object.is(0, -0)) throw new Error("Object.is(0, -0) should be false");
        if (Object.is(-0, 0)) throw new Error("Object.is(-0, 0) should be false");
    }

    if (!Object.is(0, 0)) throw new Error("Object.is(0, 0) should be true");
    if (!Object.is(-0, -0)) throw new Error("Object.is(-0, -0) should be true");

    // NaN
    if (NaN === NaN) {
        throw new Error("This test assumes NaN !== NaN");
    } else {
        // === treats NaN as not equal to itself, but Object.is treats them as equal
        if (!Object.is(NaN, NaN)) throw new Error("Object.is(NaN, NaN) should be true");
    }

    if (Object.is(NaN, 0)) throw new Error("Object.is(NaN, 0) should be false");
    if (Object.is(NaN, "NaN")) throw new Error("Object.is(NaN, 'NaN') should be false");

    // Test with undefined and null
    if (!Object.is(undefined, undefined)) throw new Error("Object.is(undefined, undefined) should be true");
    if (!Object.is(null, null)) throw new Error("Object.is(null, null) should be true");
    if (Object.is(undefined, null)) throw new Error("Object.is(undefined, null) should be false");

    // Test with functions
    function fn() {}
    if (!Object.is(fn, fn)) throw new Error("Object.is with same function should be true");
    if (Object.is(function(){}, function(){})) throw new Error("Object.is with different functions should be false");

    // Test with arrays
    var arr = [1, 2, 3];
    if (!Object.is(arr, arr)) throw new Error("Object.is with same array should be true");
    if (Object.is([1, 2, 3], [1, 2, 3])) throw new Error("Object.is with different arrays should be false");

    // Test with symbols (if supported)
    if (typeof Symbol === "function") {
        var sym = Symbol("test");
        if (!Object.is(sym, sym)) throw new Error("Object.is with same symbol should be true");
        if (Object.is(Symbol("test"), Symbol("test"))) throw new Error("Object.is with different symbols should be false");
    }

    // Test edge cases with numbers
    if (!Object.is(Infinity, Infinity)) throw new Error("Object.is(Infinity, Infinity) should be true");
    if (!Object.is(-Infinity, -Infinity)) throw new Error("Object.is(-Infinity, -Infinity) should be true");
    if (Object.is(Infinity, -Infinity)) throw new Error("Object.is(Infinity, -Infinity) should be false");
    if (Object.is(Infinity, Number.MAX_VALUE)) throw new Error("Object.is(Infinity, MAX_VALUE) should be false");

    // Test with very small numbers
    var verySmall = Number.MIN_VALUE;
    if (!Object.is(verySmall, verySmall)) throw new Error("Object.is with MIN_VALUE should be true");

    // Test that Object.is is not influenced by valueOf or toString
    var objWithValueOf = {
        valueOf: function() { return 42; },
        toString: function() { return "42"; }
    };

    if (Object.is(objWithValueOf, 42)) throw new Error("Object.is should not call valueOf");
    if (Object.is(objWithValueOf, "42")) throw new Error("Object.is should not call toString");

    // Test with primitive wrappers
    if (Object.is(new Number(42), new Number(42))) throw new Error("Different Number objects should not be equal");
    if (Object.is(new String("hello"), new String("hello"))) throw new Error("Different String objects should not be equal");
    if (Object.is(new Boolean(true), new Boolean(true))) throw new Error("Different Boolean objects should not be equal");

    var numObj = new Number(42);
    if (!Object.is(numObj, numObj)) throw new Error("Same Number object should be equal to itself");
}