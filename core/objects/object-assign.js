/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object.assign (ES2015)
 */

// Test Object.assign basic functionality
if (typeof Object.assign === "function") {
    var target = {a: 1, b: 2};
    var source = {b: 3, c: 4};
    var result = Object.assign(target, source);

    if (result !== target) throw new Error("Object.assign should return target object");
    if (target.a !== 1) throw new Error("Target property 'a' should remain 1");
    if (target.b !== 3) throw new Error("Target property 'b' should be overwritten to 3");
    if (target.c !== 4) throw new Error("Target property 'c' should be copied to 4");

    // Test with multiple sources
    var target2 = {};
    var source1 = {a: 1};
    var source2 = {b: 2};
    var source3 = {a: 3, c: 4}; // 'a' will overwrite source1.a

    Object.assign(target2, source1, source2, source3);
    if (target2.a !== 3) throw new Error("Later source should overwrite earlier");
    if (target2.b !== 2) throw new Error("Property 'b' should be 2");
    if (target2.c !== 4) throw new Error("Property 'c' should be 4");

    // Test with null/undefined sources
    var target3 = {x: 1};
    Object.assign(target3, null, undefined, {y: 2});
    if (target3.x !== 1) throw new Error("null/undefined sources should be ignored");
    if (target3.y !== 2) throw new Error("Valid source after null should work");

    // Test that it only copies enumerable own properties
    var sourceWithNonEnum = {};
    Object.defineProperty(sourceWithNonEnum, "enum", {value: "enumerable", enumerable: true});
    Object.defineProperty(sourceWithNonEnum, "nonEnum", {value: "non-enumerable", enumerable: false});

    var target4 = {};
    Object.assign(target4, sourceWithNonEnum);
    if (target4.enum !== "enumerable") throw new Error("Should copy enumerable properties");
    if (target4.nonEnum === "non-enumerable") throw new Error("Should not copy non-enumerable properties");

    // Test with inherited properties
    var parent = {inherited: "parent"};
    var child = Object.create(parent);
    child.own = "child";

    var target5 = {};
    Object.assign(target5, child);
    if (target5.own !== "child") throw new Error("Should copy own properties");
    if (target5.inherited === "parent") throw new Error("Should not copy inherited properties");

    // Test with symbols (if supported)
    if (typeof Symbol === "function") {
        var sym = Symbol("test");
        var sourceWithSymbol = {};
        sourceWithSymbol[sym] = "symbol value";
        sourceWithSymbol.regular = "regular";

        var target6 = {};
        Object.assign(target6, sourceWithSymbol);
        if (target6.regular !== "regular") throw new Error("Should copy regular properties");
        if (target6[sym] !== "symbol value") throw new Error("Should copy symbol properties");
    }

    // Test with array
    var arraySource = [1, 2, 3];
    var target7 = {};
    Object.assign(target7, arraySource);
    if (target7[0] !== 1) throw new Error("Should copy array indices");
    if (target7[1] !== 2) throw new Error("Should copy array indices");
    if (target7[2] !== 3) throw new Error("Should copy array indices");
    if (target7.length === 3) throw new Error("Should NOT copy array length (length is not enumerable)");

    // Test with string
    var target8 = {};
    Object.assign(target8, "hello");
    if (target8[0] !== "h") throw new Error("Should copy string indices");
    if (target8[4] !== "o") throw new Error("Should copy string indices");
    if (target8.length === 5) throw new Error("Should NOT copy string length (length is not enumerable)");

    // Test error cases
    try {
        Object.assign(null, {});
        throw new Error("Object.assign with null target should throw");
    } catch (e) {
        if (!(e instanceof TypeError)) {
            throw new Error("Object.assign with null should throw TypeError");
        }
    }

    try {
        Object.assign(undefined, {});
        throw new Error("Object.assign with undefined target should throw");
    } catch (e) {
        if (!(e instanceof TypeError)) {
            throw new Error("Object.assign with undefined should throw TypeError");
        }
    }

    // Test that assignment uses [[Set]] (triggers setters)
    var setterCalled = false;
    var targetWithSetter = {};
    Object.defineProperty(targetWithSetter, "prop", {
        set: function(value) {
            setterCalled = true;
            this._prop = value;
        },
        get: function() {
            return this._prop;
        },
        enumerable: true,
        configurable: true
    });

    Object.assign(targetWithSetter, {prop: "test"});
    if (!setterCalled) throw new Error("Object.assign should trigger setters");
    if (targetWithSetter.prop !== "test") throw new Error("Setter should work correctly");
}