/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Prototype Pollution and Security
 */

// Test prototype pollution attempts
var originalLength = Array.prototype.length;
var originalPush = Array.prototype.push;

// Test that modifying Array.prototype affects all arrays
Array.prototype.customMethod = function() { return "custom"; };
var testArray = [1, 2, 3];
if (typeof testArray.customMethod !== "function") throw new Error("Prototype methods should be inherited");
if (testArray.customMethod() !== "custom") throw new Error("Prototype method should work");

// Cleanup
delete Array.prototype.customMethod;

// Test __proto__ pollution
var maliciousArray = [];
maliciousArray.__proto__.polluted = "bad";
var innocentArray = [];
if (innocentArray.polluted !== "bad") throw new Error("__proto__ pollution should affect other arrays");

// Cleanup
delete Array.prototype.polluted;

// Test Object.prototype pollution through array
var arr = [];
try {
    Object.prototype.polluted = "very bad";
    var obj = {};
    if (obj.polluted !== "very bad") throw new Error("Object.prototype pollution should affect objects");
} finally {
    delete Object.prototype.polluted;
}

// Test Array.prototype method overrides
var originalSort = Array.prototype.sort;
Array.prototype.sort = function() {
    this.push("HACKED");
    return originalSort.apply(this, arguments);
};

var testSort = [3, 1, 2];
testSort.sort();
if (testSort[testSort.length - 1] !== "HACKED") throw new Error("Prototype override should work");

// Restore original
Array.prototype.sort = originalSort;

// Test length manipulation through prototype
var lengthTest = [1, 2, 3];
// Cannot redefine Array.prototype.length - it's non-configurable
// This test shows that Array.prototype.length cannot be polluted
try {
    Object.defineProperty(Array.prototype, "length", {
        get: function() { return 999; },
        set: function(val) { this._length = val; },
        configurable: true
    });
    throw new Error("Should not be able to redefine Array.prototype.length");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should throw TypeError when trying to redefine Array.prototype.length");
}

// Test valueOf pollution
Array.prototype.valueOf = function() { return "evil"; };
var valueTest = [1, 2, 3];
if (valueTest + "" !== "evil") throw new Error("valueOf pollution should affect string conversion");

// Restore
delete Array.prototype.valueOf;

// Test toString pollution
Array.prototype.toString = function() { return "EVIL ARRAY"; };
var toStringTest = [1, 2, 3];
if (toStringTest.toString() !== "EVIL ARRAY") throw new Error("toString pollution should work");

// Test that it affects string coercion
if (String(toStringTest) !== "EVIL ARRAY") throw new Error("toString pollution should affect String()");

// Restore
delete Array.prototype.toString;

// Test Symbol.iterator pollution
if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var originalIterator = Array.prototype[Symbol.iterator];
    Array.prototype[Symbol.iterator] = function() {
        return {
            next: function() { return {value: "HACKED", done: false}; }
        };
    };

    var iterTest = [1, 2, 3];
    var iterator = iterTest[Symbol.iterator]();
    if (iterator.next().value !== "HACKED") throw new Error("Iterator pollution should work");

    // Restore
    Array.prototype[Symbol.iterator] = originalIterator;
}

// Test property descriptor pollution
Object.defineProperty(Array.prototype, "dangerous", {
    get: function() { return this.length * 1000; },
    set: function(val) { this.length = 0; }, // Dangerous setter
    enumerable: false,
    configurable: true
});

var descriptorTest = [1, 2, 3, 4, 5];
if (descriptorTest.dangerous !== 5000) throw new Error("Prototype getter should work");

descriptorTest.dangerous = "anything"; // This should clear the array
if (descriptorTest.length !== 0) throw new Error("Prototype setter should work");

// Cleanup
delete Array.prototype.dangerous;

// Test constructor pollution
var constructorTest = [];
constructorTest.constructor = function() { return "FAKE"; };
// Constructor with 'new' returns object, not primitive return value
if (typeof new constructorTest.constructor() !== "object") throw new Error("Constructor pollution should return object with new");

// Test prototype chain manipulation
var protoTest = [];
var fakeProto = {
    maliciousMethod: function() { return "MALICIOUS"; }
};
Object.setPrototypeOf(protoTest, fakeProto);
if (protoTest.maliciousMethod() !== "MALICIOUS") throw new Error("Prototype chain manipulation should work");

// Test hasOwnProperty pollution
Array.prototype.hasOwnProperty = function(prop) {
    return prop === "hacked" ? true : Object.prototype.hasOwnProperty.call(this, prop);
};

var hasOwnTest = [1, 2, 3];
if (!hasOwnTest.hasOwnProperty("hacked")) throw new Error("hasOwnProperty pollution should work");

// Restore
delete Array.prototype.hasOwnProperty;

// Test in operator with polluted prototype
Array.prototype.pollutedProp = "exists";
var inTest = [];
if (!("pollutedProp" in inTest)) throw new Error("'in' operator should find prototype properties");

// Cleanup
delete Array.prototype.pollutedProp;

// Test enumeration pollution
Array.prototype.enumerableProp = "enumerable";
Object.defineProperty(Array.prototype, "nonEnumerableProp", {
    value: "non-enumerable",
    enumerable: false,
    configurable: true
});

var enumTest = [1, 2, 3];
var keys = [];
for (var key in enumTest) {
    keys.push(key);
}

if (keys.indexOf("enumerableProp") === -1) throw new Error("Enumerable prototype properties should appear in for...in");
if (keys.indexOf("nonEnumerableProp") !== -1) throw new Error("Non-enumerable prototype properties should not appear in for...in");

// Cleanup
delete Array.prototype.enumerableProp;
delete Array.prototype.nonEnumerableProp;

// Test JSON.stringify with polluted prototype
Array.prototype.toJSON = function() { return "HIJACKED"; };
var jsonTest = [1, 2, 3];
if (JSON.stringify(jsonTest) !== '"HIJACKED"') throw new Error("toJSON pollution should affect JSON.stringify");

// Cleanup
delete Array.prototype.toJSON;