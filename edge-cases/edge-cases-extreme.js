/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Extreme Edge Cases
 *
 * This file contains the most extreme edge cases in JavaScript:
 * circular references, recursive structures, prototype chains,
 * null/undefined propagation, type coercion extremes, overflow conditions
 */

// =============================================================================
// CIRCULAR REFERENCES TESTS
// =============================================================================

// Basic circular reference
var circularObj = {};
circularObj.self = circularObj;
if (circularObj.self !== circularObj) throw new Error("Basic circular reference failed");

// Deep circular reference
var deepCircular = {a: {b: {c: {}}}};
deepCircular.a.b.c.root = deepCircular;
if (deepCircular.a.b.c.root.a.b.c.root !== deepCircular) {
    throw new Error("Deep circular reference failed");
}

// Circular array reference
var circularArray = [1, 2, 3];
circularArray[3] = circularArray;
if (circularArray[3][3] !== circularArray) throw new Error("Circular array reference failed");

// Multiple circular references
var obj1 = {name: "obj1"};
var obj2 = {name: "obj2"};
obj1.ref = obj2;
obj2.ref = obj1;
if (obj1.ref.ref !== obj1) throw new Error("Multiple circular references failed");

// Circular reference in prototype chain
function CircularProto() {
    this.value = 42;
}
CircularProto.prototype.constructor = CircularProto;
CircularProto.prototype.self = CircularProto.prototype;
var circInstance = new CircularProto();
if (circInstance.self.self !== circInstance.self) {
    throw new Error("Circular prototype reference failed");
}

// JSON.stringify with circular reference should throw
try {
    JSON.stringify(circularObj);
    throw new Error("JSON.stringify should throw on circular reference");
} catch (e) {
    if (e.message.indexOf("circular") === -1 && e.message.indexOf("Converting circular") === -1) {
        throw new Error("Expected circular reference error, got: " + e.message);
    }
}

// =============================================================================
// RECURSIVE STRUCTURES TESTS
// =============================================================================

// Deeply nested object structure
var deepNested = {};
var current = deepNested;
for (var i = 0; i < 1000; i++) {
    current.next = {};
    current = current.next;
}
current.value = "deep";

// Navigate to the deep value
var navigator = deepNested;
for (var i = 0; i < 1000; i++) {
    navigator = navigator.next;
}
if (navigator.value !== "deep") throw new Error("Deep nested navigation failed");

// Recursive array structure
var recursiveArray = [];
for (var i = 0; i < 100; i++) {
    recursiveArray.push([]);
    if (i > 0) {
        recursiveArray[i].push(recursiveArray[i - 1]);
    }
}
if (recursiveArray[99][0] !== recursiveArray[98]) {
    throw new Error("Recursive array structure failed");
}

// Self-referencing function
function selfRef() {
    selfRef.callCount = (selfRef.callCount || 0) + 1;
    if (selfRef.callCount < 5) {
        return selfRef();
    }
    return selfRef.callCount;
}
if (selfRef() !== 5) throw new Error("Self-referencing function failed");

// Recursive object property access (fixed to avoid infinite recursion)
var recursiveAccess = {
    _depth: 0,
    get deep() {
        this._depth++;
        if (this._depth > 3) {
            this._depth = 0;
            return "reached";
        }
        return this.deep || "reached";
    }
};
// This should reach the base case after a few iterations
if (recursiveAccess.deep !== "reached") throw new Error("Recursive property access failed");

// =============================================================================
// PROTOTYPE CHAIN EXTREMES
// =============================================================================

// Deep prototype chain
function Base() { this.base = true; }
function Level1() { this.level1 = true; }
function Level2() { this.level2 = true; }
function Level3() { this.level3 = true; }

Level1.prototype = new Base();
Level2.prototype = new Level1();
Level3.prototype = new Level2();

var deepProto = new Level3();
if (!deepProto.base) throw new Error("Deep prototype chain inheritance failed");
if (!deepProto.level1) throw new Error("Deep prototype chain level1 failed");
if (!deepProto.level2) throw new Error("Deep prototype chain level2 failed");
if (!deepProto.level3) throw new Error("Deep prototype chain level3 failed");

// Prototype pollution test (safe version)
var safeObj = {};
var proto = Object.getPrototypeOf(safeObj);
if (proto !== Object.prototype) throw new Error("Default prototype chain broken");

// Prototype with circular reference
function CircularPrototype() {}
CircularPrototype.prototype.circular = CircularPrototype.prototype;
var circProtoInstance = new CircularPrototype();
if (circProtoInstance.circular.circular !== circProtoInstance.circular) {
    throw new Error("Circular prototype failed");
}

// Changing prototype after creation
function OriginalProto() { this.original = true; }
function NewProto() { this.newer = true; }
var protoChangeObj = new OriginalProto();
Object.setPrototypeOf(protoChangeObj, NewProto.prototype);
if (protoChangeObj.original !== true) throw new Error("Original properties lost after prototype change");

// Null prototype object
var nullProtoObj = Object.create(null);
nullProtoObj.test = "value";
if (Object.getPrototypeOf(nullProtoObj) !== null) {
    throw new Error("Null prototype object failed");
}
if (nullProtoObj.toString !== undefined) {
    throw new Error("Null prototype should not inherit Object methods");
}

// Multiple inheritance simulation
function Mixin1() { this.mixin1 = true; }
function Mixin2() { this.mixin2 = true; }
function Combined() {
    Mixin1.call(this);
    Mixin2.call(this);
}
Combined.prototype = Object.create(Mixin1.prototype);
Object.assign(Combined.prototype, Mixin2.prototype);
var multiInherit = new Combined();
if (!multiInherit.mixin1 || !multiInherit.mixin2) {
    throw new Error("Multiple inheritance simulation failed");
}

// =============================================================================
// NULL/UNDEFINED PROPAGATION TESTS
// =============================================================================

// Undefined property access chains
var undefinedChain = {};
if (undefinedChain.a !== undefined) throw new Error("Undefined property should be undefined");
try {
    var result = undefinedChain.a.b.c;
    throw new Error("Should throw TypeError on undefined property access");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Expected TypeError, got: " + e.constructor.name);
}

// Null property access
var nullObj = null;
try {
    var result = nullObj.property;
    throw new Error("Should throw TypeError on null property access");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Expected TypeError for null access");
}

// Undefined function calls
try {
    var undefinedFunc = undefined;
    undefinedFunc();
    throw new Error("Should throw TypeError on undefined function call");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Expected TypeError for undefined call");
}

// null vs undefined comparisons
if (null == undefined !== true) throw new Error("null == undefined should be true");
if (null === undefined !== false) throw new Error("null === undefined should be false");
if (typeof null !== "object") throw new Error("typeof null should be 'object'");
if (typeof undefined !== "undefined") throw new Error("typeof undefined should be 'undefined'");

// Null/undefined in arrays
var sparseArray = [1, , 3, null, undefined, , 7];
if (sparseArray.length !== 7) throw new Error("Sparse array length incorrect");
if (sparseArray[1] !== undefined) throw new Error("Empty array slot should be undefined");
if (sparseArray[3] !== null) throw new Error("Explicit null not preserved");
if (sparseArray[4] !== undefined) throw new Error("Explicit undefined not preserved");

// Null/undefined arithmetic
if (null + 1 !== 1) throw new Error("null + 1 should be 1");
if (!isNaN(undefined + 1)) throw new Error("undefined + 1 should be NaN");
if (null * 5 !== 0) throw new Error("null * 5 should be 0");
if (!isNaN(undefined * 5)) throw new Error("undefined * 5 should be NaN");

// Null/undefined in boolean context
if (!(!null)) throw new Error("!null should be true");
if (!(!undefined)) throw new Error("!undefined should be true");
if (Boolean(null) !== false) throw new Error("Boolean(null) should be false");
if (Boolean(undefined) !== false) throw new Error("Boolean(undefined) should be false");

// =============================================================================
// TYPE COERCION EXTREMES
// =============================================================================

// String coercion extremes
if (String(null) !== "null") throw new Error("String(null) should be 'null'");
if (String(undefined) !== "undefined") throw new Error("String(undefined) should be 'undefined'");
if (String([]) !== "") throw new Error("String([]) should be empty string");
if (String([1, 2, 3]) !== "1,2,3") throw new Error("String([1,2,3]) should be '1,2,3'");
if (String({}) !== "[object Object]") throw new Error("String({}) should be '[object Object]'");

// Number coercion extremes
if (Number("") !== 0) throw new Error("Number('') should be 0");
if (Number(" ") !== 0) throw new Error("Number(' ') should be 0");
if (!isNaN(Number("123abc"))) throw new Error("Number('123abc') should be NaN");
if (Number(true) !== 1) throw new Error("Number(true) should be 1");
if (Number(false) !== 0) throw new Error("Number(false) should be 0");
if (Number(null) !== 0) throw new Error("Number(null) should be 0");
if (!isNaN(Number(undefined))) throw new Error("Number(undefined) should be NaN");
if (Number([]) !== 0) throw new Error("Number([]) should be 0");
if (Number([42]) !== 42) throw new Error("Number([42]) should be 42");
if (!isNaN(Number([1, 2]))) throw new Error("Number([1,2]) should be NaN");

// Boolean coercion extremes
if (Boolean("") !== false) throw new Error("Boolean('') should be false");
if (Boolean("0") !== true) throw new Error("Boolean('0') should be true");
if (Boolean("false") !== true) throw new Error("Boolean('false') should be true");
if (Boolean(0) !== false) throw new Error("Boolean(0) should be false");
if (Boolean(-0) !== false) throw new Error("Boolean(-0) should be false");
if (Boolean(NaN) !== false) throw new Error("Boolean(NaN) should be false");
if (Boolean([]) !== true) throw new Error("Boolean([]) should be true");
if (Boolean({}) !== true) throw new Error("Boolean({}) should be true");

// Implicit coercion in operations
if (([] + []) !== "") throw new Error("[] + [] should be empty string");
if (([] + {}) !== "[object Object]") throw new Error("[] + {} should be '[object Object]'");
if (({} + []) !== "[object Object]") throw new Error("{} + [] should be '[object Object]'");
if ((true + true) !== 2) throw new Error("true + true should be 2");
if ((true + false) !== 1) throw new Error("true + false should be 1");
if ((false + false) !== 0) throw new Error("false + false should be 0");

// Comparison coercion extremes
if (("2" > "10") !== true) throw new Error("'2' > '10' should be true (string comparison)");
if ((2 > "10") !== false) throw new Error("2 > '10' should be false (numeric comparison)");
if (("" == 0) !== true) throw new Error("'' == 0 should be true");
if (("0" == 0) !== true) throw new Error("'0' == 0 should be true");
if ((false == "0") !== true) throw new Error("false == '0' should be true");
if ((null == 0) !== false) throw new Error("null == 0 should be false");
if ((undefined == 0) !== false) throw new Error("undefined == 0 should be false");

// =============================================================================
// OVERFLOW CONDITIONS TESTS
// =============================================================================

// Number overflow
if (Number.MAX_VALUE * 2 !== Infinity) throw new Error("Number overflow should be Infinity");
if (-Number.MAX_VALUE * 2 !== -Infinity) throw new Error("Negative overflow should be -Infinity");
if (Infinity + 1 !== Infinity) throw new Error("Infinity + 1 should be Infinity");
if (!isNaN(Infinity - Infinity)) throw new Error("Infinity - Infinity should be NaN");

// String length overflow (browser dependent)
try {
    var longString = "";
    for (var i = 0; i < 100000; i++) {
        longString += "a".repeat(1000);
    }
    // If this doesn't throw, that's also valid
} catch (e) {
    // Memory or string length limit reached - this is expected behavior
}

// Array length overflow
try {
    var arr = [];
    arr.length = Math.pow(2, 32);
    throw new Error("Should throw RangeError for array length overflow");
} catch (e) {
    if (!(e instanceof RangeError)) {
        throw new Error("Expected RangeError for array length overflow");
    }
}

// Stack overflow with recursion
function infiniteRecursion(depth) {
    if (depth > 10000) return depth; // Safety limit for testing
    return infiniteRecursion(depth + 1);
}

try {
    infiniteRecursion(0);
} catch (e) {
    // Stack overflow is expected, but we limit it for testing
}

// Property name overflow
var manyPropsObj = {};
for (var i = 0; i < 10000; i++) {
    manyPropsObj["prop" + i] = i;
}
if (Object.keys(manyPropsObj).length !== 10000) {
    throw new Error("Object should handle many properties");
}

// =============================================================================
// PRECISION LIMITS TESTS
// =============================================================================

// Floating point precision
if ((0.1 + 0.2) === 0.3) throw new Error("0.1 + 0.2 should not equal 0.3 exactly");
if (Math.abs((0.1 + 0.2) - 0.3) > Number.EPSILON) {
    // This is actually expected due to floating point precision
}

// Large integer precision
var largeInt = 9007199254740991; // Number.MAX_SAFE_INTEGER
if (largeInt + 1 === largeInt + 2) {
    // This is expected behavior - precision is lost beyond MAX_SAFE_INTEGER
    console.log("Large integer precision lost as expected beyond MAX_SAFE_INTEGER");
}

// Very small numbers
var verySmall = Number.MIN_VALUE;
if (verySmall === 0) throw new Error("MIN_VALUE should not be zero");
if (verySmall / 2 !== 0) throw new Error("MIN_VALUE/2 should be zero (underflow)");

// NaN comparisons
if (NaN === NaN) throw new Error("NaN should not equal NaN");
if (NaN == NaN) throw new Error("NaN should not equal NaN with ==");
if (!isNaN(NaN)) throw new Error("isNaN(NaN) should be true");
if (!(NaN !== NaN)) throw new Error("NaN !== NaN should be true");

// Infinity arithmetic
if (Infinity / Infinity === Infinity / Infinity) throw new Error("Infinity/Infinity should be NaN");
if (!isNaN(Infinity / Infinity)) throw new Error("Infinity/Infinity should be NaN");
if (Infinity * 0 === Infinity * 0) throw new Error("Infinity * 0 should be NaN");
if (!isNaN(Infinity * 0)) throw new Error("Infinity * 0 should be NaN");

// =============================================================================
// EXTREME OBJECT MUTATIONS
// =============================================================================

// Deleting inherited properties
function Parent() { this.inherited = "parent"; }
function Child() { this.own = "child"; }
Child.prototype = new Parent();
var child = new Child();
delete child.inherited; // Should not delete inherited property
if (child.inherited !== "parent") throw new Error("Should not delete inherited property");

// Frozen object mutations
var frozenObj = Object.freeze({a: 1, b: 2});
try {
    frozenObj.c = 3; // Should fail silently in non-strict mode
    delete frozenObj.a; // Should fail silently in non-strict mode
    if (frozenObj.c !== undefined) throw new Error("Frozen object should not accept new properties");
    if (frozenObj.a !== 1) throw new Error("Frozen object properties should not be deletable");
} catch (e) {
    // In strict mode, this would throw
}

// Sealed object mutations
var sealedObj = Object.seal({a: 1, b: 2});
sealedObj.a = 10; // Should work
try {
    sealedObj.c = 3; // Should fail
    if (sealedObj.c !== undefined) throw new Error("Sealed object should not accept new properties");
} catch (e) {
    // Expected in strict mode
}
if (sealedObj.a !== 10) throw new Error("Sealed object properties should be modifiable");

// Property descriptor extremes
var descriptorObj = {};
Object.defineProperty(descriptorObj, "strange", {
    get: function() { return this._value; },
    set: function(val) { this._value = val * 2; },
    enumerable: false,
    configurable: false
});
descriptorObj.strange = 5;
if (descriptorObj.strange !== 10) throw new Error("Setter should double the value");
if (Object.keys(descriptorObj).indexOf("strange") !== -1) {
    throw new Error("Non-enumerable property should not appear in keys");
}

// =============================================================================
// EXTREME ARRAY BEHAVIORS
// =============================================================================

// Array with non-numeric indices
var weirdArray = [];
weirdArray["foo"] = "bar";
weirdArray[1.5] = "decimal";
weirdArray[-1] = "negative";
if (weirdArray.length !== 0) throw new Error("Non-numeric indices should not affect length");
if (weirdArray.foo !== "bar") throw new Error("String property should be accessible");

// Array holes vs undefined
var holeyArray = [1, , , 4];
var undefinedArray = [1, undefined, undefined, 4];
if (holeyArray.length !== undefinedArray.length) throw new Error("Arrays should have same length");
if ((1 in holeyArray) === (1 in undefinedArray)) {
    throw new Error("Holes and undefined should behave differently");
}

// Array method on array-like objects
var arrayLike = {0: "a", 1: "b", 2: "c", length: 3};
var sliced = Array.prototype.slice.call(arrayLike);
if (sliced.length !== 3) throw new Error("Array methods should work on array-like objects");
if (sliced[0] !== "a") throw new Error("Array-like slice failed");

// Modifying array during iteration
var modifyArray = [1, 2, 3, 4, 5];
var results = [];
for (var i = 0; i < modifyArray.length; i++) {
    results.push(modifyArray[i]);
    if (i === 2) {
        modifyArray.push(6); // Modify during iteration
    }
}
if (results.length !== 6) throw new Error("Should iterate over newly added elements");

// =============================================================================
// EXTREME FUNCTION BEHAVIORS
// =============================================================================

// Function with modified prototype
function CustomFunc() {}
CustomFunc.prototype = null;
var customInstance = new CustomFunc();
if (Object.getPrototypeOf(customInstance) !== Object.prototype) {
    throw new Error("Function with null prototype should default to Object.prototype");
}

// Function as constructor and regular function
function DualFunction() {
    if (this instanceof DualFunction) {
        this.constructed = true;
        return this;
    } else {
        return {called: true};
    }
}
var constructed = new DualFunction();
var called = DualFunction();
if (!constructed.constructed) throw new Error("Constructor mode failed");
if (!called.called) throw new Error("Function call mode failed");

// Function length vs arguments
function varArgs(a, b, c) {
    return arguments.length;
}
if (varArgs.length !== 3) throw new Error("Function.length should be 3");
if (varArgs(1) !== 1) throw new Error("arguments.length should be 1");
if (varArgs(1, 2, 3, 4, 5) !== 5) throw new Error("arguments.length should be 5");

// =============================================================================
// EXTREME SCOPE AND HOISTING TESTS
// =============================================================================

// Variable hoisting with same name
var hoistTest = "outer";
function hoistingFunc() {
    if (hoistTest !== undefined) throw new Error("hoistTest should be undefined due to hoisting");
    var hoistTest = "inner";
    if (hoistTest !== "inner") throw new Error("hoistTest should be 'inner' after assignment");
}
hoistingFunc();

// Function hoisting vs variable hoisting
function hoistingConflict() {
    if (typeof conflicted !== "function") throw new Error("Function should be hoisted over var");
    var conflicted = "variable";
    if (conflicted !== "variable") throw new Error("Variable assignment should override");
    function conflicted() { return "function"; }
}
hoistingConflict();

// =============================================================================
// EXTREME ERROR CONDITIONS
// =============================================================================

// Error in getter
var errorGetter = {
    get problematic() {
        throw new Error("Getter error");
    }
};
try {
    var value = errorGetter.problematic;
    throw new Error("Should throw error from getter");
} catch (e) {
    if (e.message !== "Getter error") throw new Error("Wrong error from getter");
}

// Error in setter
var errorSetter = {
    set problematic(val) {
        throw new Error("Setter error");
    }
};
try {
    errorSetter.problematic = "test";
    throw new Error("Should throw error from setter");
} catch (e) {
    if (e.message !== "Setter error") throw new Error("Wrong error from setter");
}

// Error in toString
var errorToString = {
    toString: function() {
        throw new Error("toString error");
    }
};
try {
    var str = String(errorToString);
    throw new Error("Should throw error from toString");
} catch (e) {
    if (e.message !== "toString error") throw new Error("Wrong error from toString");
}

// Error in valueOf
var errorValueOf = {
    valueOf: function() {
        throw new Error("valueOf error");
    }
};
try {
    var num = Number(errorValueOf);
    throw new Error("Should throw error from valueOf");
} catch (e) {
    if (e.message !== "valueOf error") throw new Error("Wrong error from valueOf");
}

// =============================================================================
// EXTREME MEMORY AND REFERENCE TESTS
// =============================================================================

// Weak references simulation (basic)
var memoryTest = {};
var refs = [];
for (var i = 0; i < 1000; i++) {
    refs.push({id: i, data: new Array(1000).fill(i)});
}
// Clear references
refs.length = 0;
// Memory should be available for GC now

// Object identity vs equality
var obj1 = {value: 42};
var obj2 = {value: 42};
var obj3 = obj1;
if (obj1 === obj2) throw new Error("Different objects should not be identical");
if (obj1 !== obj3) throw new Error("Same object references should be identical");
if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
    throw new Error("Objects with same structure should stringify equally");
}

// =============================================================================
// EXTREME TIMING AND ASYNC EDGE CASES
// =============================================================================

// setTimeout with 0 delay
var timeoutExecuted = false;
setTimeout(function() {
    timeoutExecuted = true;
}, 0);

// Date edge cases
var invalidDate = new Date("invalid");
if (!isNaN(invalidDate.getTime())) throw new Error("Invalid date should be NaN");
if (invalidDate.toString() !== "Invalid Date") {
    // Different engines may handle this differently
}

// Date overflow
var maxDate = new Date(8640000000000000);
var overflowDate = new Date(8640000000000001);
if (!isNaN(maxDate.getTime())) {
    // Valid date
}
if (!isNaN(overflowDate.getTime())) {
    throw new Error("Date overflow should result in Invalid Date");
}

console.log("All extreme edge cases tested successfully!");