/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Promise Basic Functionality (ES2015)
 */

// Test Promise constructor exists
if (typeof Promise !== "function") throw new Error("Promise should be a constructor function");

// Test Promise constructor requires executor
try {
    new Promise();
    throw new Error("Promise constructor without executor should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Promise without executor should throw TypeError");
}

// Test Promise constructor with executor
var promise = new Promise(function(resolve, reject) {
    resolve(42);
});

if (typeof promise !== "object") throw new Error("Promise constructor should return object");
if (typeof promise.then !== "function") throw new Error("Promise should have then method");
if (typeof promise.catch !== "function") throw new Error("Promise should have catch method");

// Test Promise.resolve
var resolvedPromise = Promise.resolve(42);
if (typeof resolvedPromise.then !== "function") throw new Error("Promise.resolve should return promise");

// Test Promise.reject
var rejectedPromise = Promise.reject("error");
if (typeof rejectedPromise.catch !== "function") throw new Error("Promise.reject should return promise");
// Catch the rejection to prevent unhandled rejection
rejectedPromise.catch(function() { /* handled */ });

// Test basic promise chain (synchronous for testing)
var chainTest = false;
Promise.resolve(10)
    .then(function(value) {
        if (value !== 10) throw new Error("First then should receive resolved value");
        return value * 2;
    })
    .then(function(value) {
        if (value !== 20) throw new Error("Second then should receive transformed value");
        chainTest = true;
    });

// Give a moment for synchronous promise resolution
setTimeout(function() {
    if (!chainTest) throw new Error("Promise chain should execute");
}, 0);

// Test Promise.all with resolved promises
if (typeof Promise.all === "function") {
    var allTest = false;
    Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
        .then(function(values) {
            if (!Array.isArray(values)) throw new Error("Promise.all should resolve to array");
            if (values.length !== 3) throw new Error("Promise.all array should have 3 elements");
            if (values[0] !== 1 || values[1] !== 2 || values[2] !== 3) {
                throw new Error("Promise.all should preserve order");
            }
            allTest = true;
        });

    setTimeout(function() {
        if (!allTest) throw new Error("Promise.all should resolve");
    }, 0);
}

// Test Promise.race
if (typeof Promise.race === "function") {
    var raceTest = false;
    Promise.race([Promise.resolve("first"), Promise.resolve("second")])
        .then(function(value) {
            if (value !== "first") throw new Error("Promise.race should resolve to first");
            raceTest = true;
        });

    setTimeout(function() {
        if (!raceTest) throw new Error("Promise.race should resolve");
    }, 0);
}

// Test Promise state immutability
var stateTest = false;
var testPromise = new Promise(function(resolve, reject) {
    resolve("resolved");
    reject("rejected"); // This should be ignored
    resolve("resolved again"); // This should also be ignored
});

testPromise.then(function(value) {
    if (value !== "resolved") throw new Error("Promise should only resolve once");
    stateTest = true;
});

setTimeout(function() {
    if (!stateTest) throw new Error("Promise state test should complete");
}, 0);

// Test error handling
var errorTest = false;
Promise.reject(new Error("test error"))
    .catch(function(error) {
        if (!(error instanceof Error)) throw new Error("catch should receive error");
        if (error.message !== "test error") throw new Error("catch should receive correct error");
        errorTest = true;
    });

setTimeout(function() {
    if (!errorTest) throw new Error("Promise error handling should work");
}, 0);

// Test finally method (ES2018)
if (typeof Promise.prototype.finally === "function") {
    var finallyTest = false;
    Promise.resolve("value")
        .finally(function() {
            finallyTest = true;
        });

    setTimeout(function() {
        if (!finallyTest) throw new Error("Promise finally should execute");
    }, 0);
}

// Test Promise.allSettled (ES2020)
if (typeof Promise.allSettled === "function") {
    var allSettledTest = false;
    Promise.allSettled([Promise.resolve(1), Promise.reject("error")])
        .then(function(results) {
            if (!Array.isArray(results)) throw new Error("allSettled should return array");
            if (results.length !== 2) throw new Error("allSettled should have 2 results");
            if (results[0].status !== "fulfilled") throw new Error("First should be fulfilled");
            if (results[1].status !== "rejected") throw new Error("Second should be rejected");
            allSettledTest = true;
        });

    setTimeout(function() {
        if (!allSettledTest) throw new Error("Promise.allSettled should work");
    }, 0);
}

// Test that Promise constructor executor is called immediately
var immediateTest = false;
new Promise(function(resolve, reject) {
    immediateTest = true;
    resolve();
});

if (!immediateTest) throw new Error("Promise executor should be called immediately");

// Test Promise.resolve with promise
var existingPromise = Promise.resolve(42);
var wrappedPromise = Promise.resolve(existingPromise);
if (wrappedPromise !== existingPromise) throw new Error("Promise.resolve should return same promise when passed a promise");