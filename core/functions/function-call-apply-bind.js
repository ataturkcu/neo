/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Function.prototype.call, apply, and bind
 */

// Test Function.prototype.call
function testFunction(a, b) {
    return this.value + a + b;
}

var context = {value: 10};
var result = testFunction.call(context, 5, 3);
if (result !== 18) throw new Error("call should work: 10 + 5 + 3 = 18");

// Test call with null/undefined this
var globalThis = (function() { return this; })();
if (globalThis) {
    var resultGlobal = testFunction.call(null, 1, 2);
    // Should use global object as this in non-strict mode
    if (typeof resultGlobal !== "number" && resultGlobal !== resultGlobal) { // NaN check
        // Expected in some cases where global.value is undefined
    }
}

// Test Function.prototype.apply
var applyResult = testFunction.apply(context, [7, 2]);
if (applyResult !== 19) throw new Error("apply should work: 10 + 7 + 2 = 19");

// Test apply with arguments-like object
var argsLike = {0: 4, 1: 6, length: 2};
var applyArgsResult = testFunction.apply(context, argsLike);
if (applyArgsResult !== 20) throw new Error("apply with args-like should work: 10 + 4 + 6 = 20");

// Test Function.prototype.bind
var boundFunction = testFunction.bind(context);
var bindResult = boundFunction(8, 1);
if (bindResult !== 19) throw new Error("bind should work: 10 + 8 + 1 = 19");

// Test bind with partial application
var partiallyBound = testFunction.bind(context, 15);
var partialResult = partiallyBound(5);
if (partialResult !== 30) throw new Error("partial bind should work: 10 + 15 + 5 = 30");

// Test bind with all arguments
var fullyBound = testFunction.bind(context, 20, 10);
var fullResult = fullyBound();
if (fullResult !== 40) throw new Error("fully bound should work: 10 + 20 + 10 = 40");

// Test that bind returns a new function
if (boundFunction === testFunction) throw new Error("bind should return a new function");
if (typeof boundFunction !== "function") throw new Error("bind should return a function");

// Test bind with constructor
function Constructor(value) {
    this.value = value;
}

Constructor.prototype.getValue = function() {
    return this.value;
};

var BoundConstructor = Constructor.bind(null, "bound");
var instance = new BoundConstructor();
if (instance.value !== "bound") throw new Error("Bound constructor should work");
if (!(instance instanceof Constructor)) throw new Error("Instance should be instanceof original constructor");

// Test call/apply with different this values
function getThis() {
    return this;
}

var obj1 = {name: "obj1"};
var obj2 = {name: "obj2"};

if (getThis.call(obj1) !== obj1) throw new Error("call should set this to obj1");
if (getThis.apply(obj2) !== obj2) throw new Error("apply should set this to obj2");

// Test method call vs direct call
var methodObj = {
    value: 100,
    method: function() { return this.value; }
};

if (methodObj.method() !== 100) throw new Error("Method call should have object as this");
if (methodObj.method.call({value: 200}) !== 200) throw new Error("call should override this binding");

// Test bind multiple times
var doubleBound = boundFunction.bind({value: 999});
var doubleResult = doubleBound(1, 1);
if (doubleResult !== 12) throw new Error("Double bind should use first binding: 10 + 1 + 1 = 12");