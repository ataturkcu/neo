/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Performance Benchmarks for All JavaScript Operations
 */

// Performance test utility
function measureTime(operation, iterations, description) {
    var start = Date.now();
    var result;
    for (var i = 0; i < iterations; i++) {
        result = operation();
    }
    var duration = Date.now() - start;
    if (duration > 5000) throw new Error(description + " took too long: " + duration + "ms");
    return {duration: duration, result: result};
}

// Array operation performance tests
var arrayPerf = measureTime(function() {
    var arr = [];
    for (var i = 0; i < 1000; i++) {
        arr.push(i);
    }
    return arr.length;
}, 100, "Array push operations");

if (arrayPerf.result !== 1000) throw new Error("Array push performance test failed");

var arrayMap = measureTime(function() {
    var arr = [];
    for (var i = 0; i < 1000; i++) arr.push(i);
    return arr.map(function(x) { return x * 2; }).length;
}, 50, "Array map operations");

if (arrayMap.result !== 1000) throw new Error("Array map performance test failed");

var arrayFilter = measureTime(function() {
    var arr = [];
    for (var i = 0; i < 1000; i++) arr.push(i);
    return arr.filter(function(x) { return x % 2 === 0; }).length;
}, 50, "Array filter operations");

if (arrayFilter.result !== 500) throw new Error("Array filter performance test failed");

var arrayReduce = measureTime(function() {
    var arr = [];
    for (var i = 0; i < 1000; i++) arr.push(i);
    return arr.reduce(function(sum, x) { return sum + x; }, 0);
}, 50, "Array reduce operations");

if (arrayReduce.result !== 499500) throw new Error("Array reduce performance test failed");

// Object operation performance tests
var objectCreation = measureTime(function() {
    var objects = [];
    for (var i = 0; i < 1000; i++) {
        objects.push({
            id: i,
            name: "object" + i,
            value: Math.random(),
            timestamp: Date.now()
        });
    }
    return objects.length;
}, 100, "Object creation");

if (objectCreation.result !== 1000) throw new Error("Object creation performance test failed");

var objectAccess = measureTime(function() {
    var obj = {};
    for (var i = 0; i < 1000; i++) {
        obj["prop" + i] = i;
    }
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum += obj["prop" + i];
    }
    return sum;
}, 100, "Object property access");

if (objectAccess.result !== 499500) throw new Error("Object access performance test failed");

var objectKeys = measureTime(function() {
    var obj = {};
    for (var i = 0; i < 100; i++) {
        obj["prop" + i] = i;
    }
    return Object.keys(obj).length;
}, 1000, "Object.keys operations");

if (objectKeys.result !== 100) throw new Error("Object.keys performance test failed");

// Function call performance tests
function testFunction(a, b, c) {
    return a + b + c;
}

var functionCalls = measureTime(function() {
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum += testFunction(i, i + 1, i + 2);
    }
    return sum;
}, 100, "Function calls");

if (functionCalls.result !== 1501500) throw new Error("Function call performance test failed, expected 1501500, got " + functionCalls.result);

var methodCalls = measureTime(function() {
    var obj = {
        method: function(x) { return x * 2; },
        sum: 0
    };
    for (var i = 0; i < 1000; i++) {
        obj.sum += obj.method(i);
    }
    return obj.sum;
}, 100, "Method calls");

if (methodCalls.result !== 999000) throw new Error("Method call performance test failed");

// String operation performance tests
var stringConcat = measureTime(function() {
    var str = "";
    for (var i = 0; i < 1000; i++) {
        str += "test" + i;
    }
    return str.length;
}, 10, "String concatenation");

if (stringConcat.result < 4000) throw new Error("String concatenation performance test failed");

var stringReplace = measureTime(function() {
    var str = "hello world ".repeat(100);
    return str.replace(/world/g, "JavaScript").length;
}, 1000, "String replace operations");

if (stringReplace.result < 1000) throw new Error("String replace performance test failed");

var stringSlice = measureTime(function() {
    var str = "abcdefghijklmnopqrstuvwxyz".repeat(100);
    var result = "";
    for (var i = 0; i < 100; i++) {
        result += str.slice(i, i + 10);
    }
    return result.length;
}, 100, "String slice operations");

if (stringSlice.result !== 1000) throw new Error("String slice performance test failed");

// Number calculation performance tests
var mathOperations = measureTime(function() {
    var sum = 0;
    for (var i = 0; i < 10000; i++) {
        sum += Math.sin(i) + Math.cos(i) + Math.sqrt(i);
    }
    return Math.floor(sum);
}, 10, "Math operations");

if (isNaN(mathOperations.result)) throw new Error("Math operations performance test failed");

var floatingPoint = measureTime(function() {
    var sum = 0;
    for (var i = 0; i < 10000; i++) {
        sum += (i * 3.14159) / (i + 1);
    }
    return Math.floor(sum);
}, 50, "Floating point operations");

if (isNaN(floatingPoint.result)) throw new Error("Floating point performance test failed");

// Loop performance tests
var forLoop = measureTime(function() {
    var sum = 0;
    for (var i = 0; i < 10000; i++) {
        sum += i;
    }
    return sum;
}, 100, "For loop performance");

if (forLoop.result !== 49995000) throw new Error("For loop performance test failed");

var whileLoop = measureTime(function() {
    var sum = 0;
    var i = 0;
    while (i < 10000) {
        sum += i;
        i++;
    }
    return sum;
}, 100, "While loop performance");

if (whileLoop.result !== 49995000) throw new Error("While loop performance test failed");

// Memory allocation performance
var arrayAllocation = measureTime(function() {
    var arrays = [];
    for (var i = 0; i < 100; i++) {
        arrays.push(new Array(1000).fill(i));
    }
    return arrays.length;
}, 10, "Array allocation");

if (arrayAllocation.result !== 100) throw new Error("Array allocation performance test failed");

var objectAllocation = measureTime(function() {
    var objects = [];
    for (var i = 0; i < 1000; i++) {
        objects.push(new Object());
    }
    return objects.length;
}, 100, "Object allocation");

if (objectAllocation.result !== 1000) throw new Error("Object allocation performance test failed");

// RegExp performance tests
var regexpTest = measureTime(function() {
    var text = "hello world test string ".repeat(100);
    var pattern = /test/g;
    var matches = 0;
    var match;
    while ((match = pattern.exec(text)) !== null) {
        matches++;
    }
    return matches;
}, 100, "RegExp execution");

if (regexpTest.result === 0) throw new Error("RegExp performance test failed");

// JSON performance tests
var jsonStringify = measureTime(function() {
    var obj = {
        array: new Array(100).fill(0).map(function(_, i) { return {id: i, value: "item" + i}; }),
        metadata: {timestamp: Date.now(), version: "1.0"}
    };
    return JSON.stringify(obj).length;
}, 100, "JSON stringify");

if (jsonStringify.result < 1000) throw new Error("JSON stringify performance test failed");

var jsonParse = measureTime(function() {
    var jsonStr = '{"array":[' + new Array(100).fill(0).map(function(_, i) {
        return '{"id":' + i + ',"value":"item' + i + '"}';
    }).join(',') + '],"metadata":{"timestamp":1234567890,"version":"1.0"}}';
    return JSON.parse(jsonStr).array.length;
}, 100, "JSON parse");

if (jsonParse.result !== 100) throw new Error("JSON parse performance test failed");

// Type conversion performance
var typeConversion = measureTime(function() {
    var results = [];
    for (var i = 0; i < 1000; i++) {
        results.push(
            String(i),
            Number("" + i),
            Boolean(i),
            parseInt("" + i),
            parseFloat("" + i + ".5")
        );
    }
    return results.length;
}, 100, "Type conversion operations");

if (typeConversion.result !== 5000) throw new Error("Type conversion performance test failed");

// Closure performance
var closureTest = measureTime(function() {
    var closures = [];
    for (var i = 0; i < 1000; i++) {
        closures.push((function(x) {
            return function() { return x * 2; };
        })(i));
    }
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum += closures[i]();
    }
    return sum;
}, 10, "Closure creation and execution");

if (closureTest.result !== 999000) throw new Error("Closure performance test failed");

// Property access patterns
var propertyAccess = measureTime(function() {
    var obj = {a: {b: {c: {d: {e: 42}}}}};
    var sum = 0;
    for (var i = 0; i < 10000; i++) {
        sum += obj.a.b.c.d.e;
    }
    return sum;
}, 100, "Deep property access");

if (propertyAccess.result !== 420000) throw new Error("Property access performance test failed");

// Function binding performance
var bindTest = measureTime(function() {
    function testFunc(a, b) { return a + b; }
    var boundFunctions = [];
    for (var i = 0; i < 1000; i++) {
        boundFunctions.push(testFunc.bind(null, i));
    }
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum += boundFunctions[i](i);
    }
    return sum;
}, 10, "Function binding");

if (bindTest.result !== 999000) throw new Error("Function binding performance test failed");

// Event simulation performance
var eventSimulation = measureTime(function() {
    var listeners = [];
    var events = 0;

    function addEventListener(callback) {
        listeners.push(callback);
    }

    function fireEvent(data) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](data);
        }
    }

    for (var i = 0; i < 100; i++) {
        addEventListener(function(data) { events += data; });
    }

    for (var i = 0; i < 100; i++) {
        fireEvent(1);
    }

    return events;
}, 10, "Event simulation");

if (eventSimulation.result !== 10000) throw new Error("Event simulation performance test failed");

// Performance comparison baseline
var baselineOps = measureTime(function() {
    var x = 0;
    for (var i = 0; i < 100000; i++) {
        x = i;
    }
    return x;
}, 100, "Baseline operations");

if (baselineOps.result !== 99999) throw new Error("Baseline performance test failed");

// Memory pressure test
var memoryPressure = measureTime(function() {
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            array: new Array(1000).fill(i),
            object: {id: i, data: "x".repeat(1000)},
            func: function() { return i; }
        });
    }
    return data.length;
}, 5, "Memory pressure test");

if (memoryPressure.result !== 100) throw new Error("Memory pressure test failed");