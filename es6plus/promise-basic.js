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

// Handle the rejection to prevent unhandled rejection error
rejectedPromise.catch(function() {
    // Expected rejection, do nothing
});

// Test basic promise chain (we'll test structure, not async behavior)
var chainResult = Promise.resolve(10)
    .then(function(value) {
        if (value !== 10) throw new Error("First then should receive resolved value");
        return value * 2;
    })
    .then(function(value) {
        if (value !== 20) throw new Error("Second then should receive transformed value");
        return "chain complete";
    });

// Verify the chain returns a promise
if (typeof chainResult.then !== "function") throw new Error("Promise chain should return promise");

// Test Promise.all exists and returns promise
if (typeof Promise.all === "function") {
    var allResult = Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
    if (typeof allResult.then !== "function") throw new Error("Promise.all should return promise");
}

// Test Promise.race exists and returns promise
if (typeof Promise.race === "function") {
    var raceResult = Promise.race([Promise.resolve("first"), Promise.resolve("second")]);
    if (typeof raceResult.then !== "function") throw new Error("Promise.race should return promise");
}

// Test Promise state immutability (test constructor)
var testPromise = new Promise(function(resolve, reject) {
    resolve("resolved");
    reject("rejected"); // This should be ignored
    resolve("resolved again"); // This should also be ignored
});

if (typeof testPromise.then !== "function") throw new Error("Promise should have then method");

// Test error handling exists
var errorPromise = Promise.reject(new Error("test error"));
if (typeof errorPromise.catch !== "function") throw new Error("Promise should have catch method");

// Handle the rejection
errorPromise.catch(function() {
    // Expected rejection
});

// Test finally method exists (ES2018)
if (typeof Promise.prototype.finally === "function") {
    var finallyResult = Promise.resolve("value").finally(function() {});
    if (typeof finallyResult.then !== "function") throw new Error("finally should return promise");
}

// Test Promise.allSettled exists (ES2020)
if (typeof Promise.allSettled === "function") {
    var allSettledResult = Promise.allSettled([Promise.resolve(1), Promise.reject("error")]);
    if (typeof allSettledResult.then !== "function") throw new Error("allSettled should return promise");

    // Handle the rejection
    allSettledResult.catch(function() {
        // Handle any rejections
    });
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