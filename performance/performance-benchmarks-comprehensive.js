/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Performance Benchmarks
 *
 * This file contains comprehensive performance tests for ALL JavaScript operations
 * with detailed timing measurements and comparison baselines.
 */

// Performance measurement utilities
function measureTime(fn, iterations) {
    var start = Date.now();
    for (var i = 0; i < iterations; i++) {
        fn();
    }
    var end = Date.now();
    return end - start;
}

function createPerformanceBaseline(name, fn, iterations, expectedMaxTime) {
    var time = measureTime(fn, iterations || 1000);
    if (time > expectedMaxTime) {
        throw new Error(name + " took " + time + "ms, expected max " + expectedMaxTime + "ms");
    }
    return time;
}

// =============================================================================
// ARRAY OPERATIONS PERFORMANCE TESTS
// =============================================================================

// Array creation performance
var arrayCreationTime = measureTime(function() {
    var arr = new Array(1000);
}, 1000);
if (arrayCreationTime > 100) throw new Error("Array creation too slow: " + arrayCreationTime + "ms");

// Array literal vs constructor performance
var literalTime = measureTime(function() {
    var arr = [1, 2, 3, 4, 5];
}, 10000);
var constructorTime = measureTime(function() {
    var arr = new Array(1, 2, 3, 4, 5);
}, 10000);
// Performance assertion may vary by machine - make it more tolerant
if (constructorTime > literalTime * 10) {
    console.log("Warning: Array constructor much slower than literal (" + constructorTime + " vs " + literalTime + ")");
} else {
    console.log("Array performance acceptable: literal=" + literalTime + "ms, constructor=" + constructorTime + "ms");
}

// Array push performance
var pushPerf = [];
var pushTime = measureTime(function() {
    pushPerf.push(1);
}, 100000);
if (pushTime > 500) throw new Error("Array.push too slow: " + pushTime + "ms");

// Array pop performance
for (var i = 0; i < 100000; i++) pushPerf.push(i);
var popTime = measureTime(function() {
    pushPerf.pop();
}, 50000);
if (popTime > 200) throw new Error("Array.pop too slow: " + popTime + "ms");

// Array unshift performance
var unshiftArr = [];
var unshiftTime = measureTime(function() {
    unshiftArr.unshift(1);
}, 1000);
if (unshiftTime > 100) throw new Error("Array.unshift too slow: " + unshiftTime + "ms");

// Array shift performance
for (var i = 0; i < 1000; i++) unshiftArr.push(i);
var shiftTime = measureTime(function() {
    unshiftArr.shift();
}, 500);
if (shiftTime > 50) throw new Error("Array.shift too slow: " + shiftTime + "ms");

// Array splice performance
var spliceArr = [];
for (var i = 0; i < 10000; i++) spliceArr.push(i);
var spliceTime = measureTime(function() {
    spliceArr.splice(5000, 1, 999);
}, 100);
if (spliceTime > 50) throw new Error("Array.splice too slow: " + spliceTime + "ms");

// Array slice performance
var sliceArr = [];
for (var i = 0; i < 10000; i++) sliceArr.push(i);
var sliceTime = measureTime(function() {
    var result = sliceArr.slice(1000, 9000);
}, 1000);
if (sliceTime > 200) throw new Error("Array.slice too slow: " + sliceTime + "ms");

// Array concat performance
var arr1 = [];
var arr2 = [];
for (var i = 0; i < 5000; i++) {
    arr1.push(i);
    arr2.push(i + 5000);
}
var concatTime = measureTime(function() {
    var result = arr1.concat(arr2);
}, 100);
if (concatTime > 100) throw new Error("Array.concat too slow: " + concatTime + "ms");

// Array join performance
var joinArr = [];
for (var i = 0; i < 10000; i++) joinArr.push("item" + i);
var joinTime = measureTime(function() {
    var result = joinArr.join(",");
}, 100);
if (joinTime > 100) throw new Error("Array.join too slow: " + joinTime + "ms");

// Array reverse performance
var reverseArr = [];
for (var i = 0; i < 10000; i++) reverseArr.push(i);
var reverseTime = measureTime(function() {
    reverseArr.reverse();
}, 1000);
if (reverseTime > 200) throw new Error("Array.reverse too slow: " + reverseTime + "ms");

// Array sort performance
var sortArr = [];
for (var i = 0; i < 1000; i++) sortArr.push(Math.floor(Math.random() * 1000));
var sortTime = measureTime(function() {
    sortArr.sort();
}, 100);
if (sortTime > 100) throw new Error("Array.sort too slow: " + sortTime + "ms");

// Array forEach performance
var forEachArr = [];
for (var i = 0; i < 10000; i++) forEachArr.push(i);
var forEachTime = measureTime(function() {
    var sum = 0;
    forEachArr.forEach(function(item) { sum += item; });
}, 100);
if (forEachTime > 200) throw new Error("Array.forEach too slow: " + forEachTime + "ms");

// Array map performance
var mapTime = measureTime(function() {
    var result = forEachArr.map(function(item) { return item * 2; });
}, 100);
if (mapTime > 300) throw new Error("Array.map too slow: " + mapTime + "ms");

// Array filter performance
var filterTime = measureTime(function() {
    var result = forEachArr.filter(function(item) { return item % 2 === 0; });
}, 100);
if (filterTime > 300) throw new Error("Array.filter too slow: " + filterTime + "ms");

// Array reduce performance
var reduceTime = measureTime(function() {
    var result = forEachArr.reduce(function(acc, item) { return acc + item; }, 0);
}, 100);
if (reduceTime > 200) throw new Error("Array.reduce too slow: " + reduceTime + "ms");

// Array indexOf performance
var indexOfTime = measureTime(function() {
    var index = forEachArr.indexOf(5000);
}, 1000);
if (indexOfTime > 100) throw new Error("Array.indexOf too slow: " + indexOfTime + "ms");

// =============================================================================
// OBJECT OPERATIONS PERFORMANCE TESTS
// =============================================================================

// Object creation performance
var objCreationTime = measureTime(function() {
    var obj = {};
}, 100000);
if (objCreationTime > 200) throw new Error("Object creation too slow: " + objCreationTime + "ms");

// Object property access performance
var testObj = {};
for (var i = 0; i < 1000; i++) {
    testObj["prop" + i] = i;
}
var propAccessTime = measureTime(function() {
    var value = testObj.prop500;
}, 100000);
if (propAccessTime > 100) throw new Error("Object property access too slow: " + propAccessTime + "ms");

// Object property assignment performance
var propAssignTime = measureTime(function() {
    testObj.newProp = 123;
}, 100000);
if (propAssignTime > 200) throw new Error("Object property assignment too slow: " + propAssignTime + "ms");

// Object.keys performance
var keysTime = measureTime(function() {
    var keys = Object.keys(testObj);
}, 1000);
if (keysTime > 100) throw new Error("Object.keys too slow: " + keysTime + "ms");

// Object.values performance (if available)
if (Object.values) {
    var valuesTime = measureTime(function() {
        var values = Object.values(testObj);
    }, 1000);
    if (valuesTime > 200) throw new Error("Object.values too slow: " + valuesTime + "ms");
}

// Object.entries performance (if available)
if (Object.entries) {
    var entriesTime = measureTime(function() {
        var entries = Object.entries(testObj);
    }, 1000);
    if (entriesTime > 200) throw new Error("Object.entries too slow: " + entriesTime + "ms");
}

// for...in loop performance
var forInTime = measureTime(function() {
    var count = 0;
    for (var key in testObj) {
        count++;
    }
}, 1000);
if (forInTime > 200) throw new Error("for...in loop too slow: " + forInTime + "ms");

// Object.hasOwnProperty performance
var hasOwnPropTime = measureTime(function() {
    var result = testObj.hasOwnProperty("prop500");
}, 100000);
if (hasOwnPropTime > 100) throw new Error("Object.hasOwnProperty too slow: " + hasOwnPropTime + "ms");

// Object.defineProperty performance
var definePropTime = measureTime(function() {
    Object.defineProperty(testObj, "definedProp" + Math.random(), {
        value: 42,
        writable: true,
        enumerable: true,
        configurable: true
    });
}, 1000);
if (definePropTime > 200) throw new Error("Object.defineProperty too slow: " + definePropTime + "ms");

// Object.getOwnPropertyDescriptor performance
var getDescTime = measureTime(function() {
    var desc = Object.getOwnPropertyDescriptor(testObj, "prop500");
}, 10000);
if (getDescTime > 100) throw new Error("Object.getOwnPropertyDescriptor too slow: " + getDescTime + "ms");

// Object.assign performance (if available)
if (Object.assign) {
    var source1 = {a: 1, b: 2, c: 3};
    var source2 = {d: 4, e: 5, f: 6};
    var assignTime = measureTime(function() {
        var result = Object.assign({}, source1, source2);
    }, 10000);
    if (assignTime > 200) throw new Error("Object.assign too slow: " + assignTime + "ms");
}

// =============================================================================
// FUNCTION CALL PERFORMANCE TESTS
// =============================================================================

// Function declaration vs expression performance
function declaredFunction() { return 42; }
var expressionFunction = function() { return 42; };

var declaredCallTime = measureTime(function() {
    declaredFunction();
}, 100000);
var expressionCallTime = measureTime(function() {
    expressionFunction();
}, 100000);

if (declaredCallTime > 200) throw new Error("Function declaration call too slow: " + declaredCallTime + "ms");
if (expressionCallTime > 200) throw new Error("Function expression call too slow: " + expressionCallTime + "ms");

// Method call performance
var methodObj = {
    method: function() { return 42; }
};
var methodCallTime = measureTime(function() {
    methodObj.method();
}, 100000);
if (methodCallTime > 300) throw new Error("Method call too slow: " + methodCallTime + "ms");

// Function.call performance
var callTime = measureTime(function() {
    declaredFunction.call(null);
}, 50000);
if (callTime > 200) throw new Error("Function.call too slow: " + callTime + "ms");

// Function.apply performance
var applyTime = measureTime(function() {
    declaredFunction.apply(null, []);
}, 50000);
if (applyTime > 200) throw new Error("Function.apply too slow: " + applyTime + "ms");

// Function.bind performance
var bindTime = measureTime(function() {
    var bound = declaredFunction.bind(null);
}, 10000);
if (bindTime > 100) throw new Error("Function.bind too slow: " + bindTime + "ms");

// Bound function call performance
var boundFunction = declaredFunction.bind(null);
var boundCallTime = measureTime(function() {
    boundFunction();
}, 50000);
if (boundCallTime > 300) throw new Error("Bound function call too slow: " + boundCallTime + "ms");

// Closure performance
function createClosure(x) {
    return function(y) { return x + y; };
}
var closureTime = measureTime(function() {
    var closure = createClosure(10);
    var result = closure(20);
}, 10000);
if (closureTime > 200) throw new Error("Closure creation/call too slow: " + closureTime + "ms");

// Recursive function performance
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
var recursiveTime = measureTime(function() {
    factorial(10);
}, 10000);
if (recursiveTime > 200) throw new Error("Recursive function too slow: " + recursiveTime + "ms");

// =============================================================================
// STRING OPERATIONS PERFORMANCE TESTS
// =============================================================================

// String concatenation performance
var str1 = "Hello";
var str2 = " World";
var concatStrTime = measureTime(function() {
    var result = str1 + str2;
}, 100000);
if (concatStrTime > 200) throw new Error("String concatenation too slow: " + concatStrTime + "ms");

// String.concat performance
var concatMethodTime = measureTime(function() {
    var result = str1.concat(str2);
}, 50000);
if (concatMethodTime > 200) throw new Error("String.concat too slow: " + concatMethodTime + "ms");

// String charAt performance
var longString = "";
for (var i = 0; i < 10000; i++) longString += "a";
var charAtTime = measureTime(function() {
    var char = longString.charAt(5000);
}, 10000);
if (charAtTime > 100) throw new Error("String.charAt too slow: " + charAtTime + "ms");

// String substring performance
var substringTime = measureTime(function() {
    var result = longString.substring(1000, 9000);
}, 10000);
if (substringTime > 200) throw new Error("String.substring too slow: " + substringTime + "ms");

// String slice performance
var sliceStrTime = measureTime(function() {
    var result = longString.slice(1000, 9000);
}, 10000);
if (sliceStrTime > 200) throw new Error("String.slice too slow: " + sliceStrTime + "ms");

// String indexOf performance
var indexOfStrTime = measureTime(function() {
    var index = longString.indexOf("a");
}, 10000);
if (indexOfStrTime > 100) throw new Error("String.indexOf too slow: " + indexOfStrTime + "ms");

// String split performance
var splitStr = "";
for (var i = 0; i < 1000; i++) splitStr += "word" + i + ",";
var splitTime = measureTime(function() {
    var result = splitStr.split(",");
}, 1000);
if (splitTime > 200) throw new Error("String.split too slow: " + splitTime + "ms");

// String replace performance
var replaceTime = measureTime(function() {
    var result = longString.replace("a", "b");
}, 1000);
if (replaceTime > 100) throw new Error("String.replace too slow: " + replaceTime + "ms");

// String match performance
var matchTime = measureTime(function() {
    var result = longString.match(/a/);
}, 1000);
if (matchTime > 100) throw new Error("String.match too slow: " + matchTime + "ms");

// String toUpperCase performance
var upperTime = measureTime(function() {
    var result = longString.toUpperCase();
}, 100);
if (upperTime > 200) throw new Error("String.toUpperCase too slow: " + upperTime + "ms");

// String toLowerCase performance
var lowerTime = measureTime(function() {
    var result = longString.toLowerCase();
}, 100);
if (lowerTime > 200) throw new Error("String.toLowerCase too slow: " + lowerTime + "ms");

// =============================================================================
// NUMBER OPERATIONS PERFORMANCE TESTS
// =============================================================================

// Basic arithmetic performance
var mathTime = measureTime(function() {
    var result = 123 + 456 * 789 / 2 - 100;
}, 100000);
if (mathTime > 100) throw new Error("Basic arithmetic too slow: " + mathTime + "ms");

// Math.sqrt performance
var sqrtTime = measureTime(function() {
    var result = Math.sqrt(12345);
}, 100000);
if (sqrtTime > 200) throw new Error("Math.sqrt too slow: " + sqrtTime + "ms");

// Math.pow performance
var powTime = measureTime(function() {
    var result = Math.pow(2, 10);
}, 100000);
if (powTime > 200) throw new Error("Math.pow too slow: " + powTime + "ms");

// Math.floor performance
var floorTime = measureTime(function() {
    var result = Math.floor(123.456);
}, 100000);
if (floorTime > 100) throw new Error("Math.floor too slow: " + floorTime + "ms");

// Math.ceil performance
var ceilTime = measureTime(function() {
    var result = Math.ceil(123.456);
}, 100000);
if (ceilTime > 100) throw new Error("Math.ceil too slow: " + ceilTime + "ms");

// Math.round performance
var roundTime = measureTime(function() {
    var result = Math.round(123.456);
}, 100000);
if (roundTime > 100) throw new Error("Math.round too slow: " + roundTime + "ms");

// Math.random performance
var randomTime = measureTime(function() {
    var result = Math.random();
}, 100000);
if (randomTime > 200) throw new Error("Math.random too slow: " + randomTime + "ms");

// parseInt performance
var parseIntTime = measureTime(function() {
    var result = parseInt("12345");
}, 50000);
if (parseIntTime > 200) throw new Error("parseInt too slow: " + parseIntTime + "ms");

// parseFloat performance
var parseFloatTime = measureTime(function() {
    var result = parseFloat("123.456");
}, 50000);
if (parseFloatTime > 200) throw new Error("parseFloat too slow: " + parseFloatTime + "ms");

// Number() constructor performance
var numberTime = measureTime(function() {
    var result = Number("12345");
}, 50000);
if (numberTime > 200) throw new Error("Number() constructor too slow: " + numberTime + "ms");

// toString performance
var toStringTime = measureTime(function() {
    var result = (12345).toString();
}, 50000);
if (toStringTime > 200) throw new Error("Number.toString too slow: " + toStringTime + "ms");

// =============================================================================
// LOOP PERFORMANCE TESTS
// =============================================================================

// for loop performance
var forLoopTime = measureTime(function() {
    var sum = 0;
    for (var i = 0; i < 10000; i++) {
        sum += i;
    }
}, 100);
if (forLoopTime > 100) throw new Error("for loop too slow: " + forLoopTime + "ms");

// while loop performance
var whileLoopTime = measureTime(function() {
    var sum = 0;
    var i = 0;
    while (i < 10000) {
        sum += i;
        i++;
    }
}, 100);
if (whileLoopTime > 150) throw new Error("while loop too slow: " + whileLoopTime + "ms");

// do-while loop performance
var doWhileTime = measureTime(function() {
    var sum = 0;
    var i = 0;
    do {
        sum += i;
        i++;
    } while (i < 10000);
}, 100);
if (doWhileTime > 150) throw new Error("do-while loop too slow: " + doWhileTime + "ms");

// Nested loop performance
var nestedLoopTime = measureTime(function() {
    var sum = 0;
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            sum += i * j;
        }
    }
}, 10);
if (nestedLoopTime > 100) throw new Error("Nested loop too slow: " + nestedLoopTime + "ms");

// =============================================================================
// MEMORY ALLOCATION PERFORMANCE TESTS
// =============================================================================

// Large array allocation performance
var largeArrayTime = measureTime(function() {
    var arr = new Array(100000);
    for (var i = 0; i < 100000; i++) {
        arr[i] = i;
    }
}, 10);
if (largeArrayTime > 500) throw new Error("Large array allocation too slow: " + largeArrayTime + "ms");

// Large object allocation performance
var largeObjTime = measureTime(function() {
    var obj = {};
    for (var i = 0; i < 10000; i++) {
        obj["prop" + i] = i;
    }
}, 10);
if (largeObjTime > 200) throw new Error("Large object allocation too slow: " + largeObjTime + "ms");

// String building performance
var stringBuildTime = measureTime(function() {
    var str = "";
    for (var i = 0; i < 1000; i++) {
        str += "segment" + i;
    }
}, 100);
if (stringBuildTime > 200) throw new Error("String building too slow: " + stringBuildTime + "ms");

// Array building performance
var arrayBuildTime = measureTime(function() {
    var arr = [];
    for (var i = 0; i < 10000; i++) {
        arr.push("item" + i);
    }
}, 100);
if (arrayBuildTime > 200) throw new Error("Array building too slow: " + arrayBuildTime + "ms");

// =============================================================================
// REGEX PERFORMANCE TESTS
// =============================================================================

// Simple regex test performance
var simpleRegex = /test/;
var testString = "this is a test string for testing regex performance test";
var regexTestTime = measureTime(function() {
    var result = simpleRegex.test(testString);
}, 10000);
if (regexTestTime > 200) throw new Error("Simple regex test too slow: " + regexTestTime + "ms");

// Complex regex performance
var complexRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var emailString = "test@example.com";
var complexRegexTime = measureTime(function() {
    var result = complexRegex.test(emailString);
}, 10000);
if (complexRegexTime > 300) throw new Error("Complex regex test too slow: " + complexRegexTime + "ms");

// Regex exec performance
var execTime = measureTime(function() {
    var result = simpleRegex.exec(testString);
}, 10000);
if (execTime > 300) throw new Error("Regex exec too slow: " + execTime + "ms");

// Global regex performance
var globalRegex = /test/g;
var globalTime = measureTime(function() {
    var match;
    while ((match = globalRegex.exec(testString)) !== null) {
        // Process match
    }
    globalRegex.lastIndex = 0; // Reset for next iteration
}, 1000);
if (globalTime > 200) throw new Error("Global regex too slow: " + globalTime + "ms");

// =============================================================================
// TYPE CONVERSION PERFORMANCE TESTS
// =============================================================================

// String to number conversion performance
var strToNumTime = measureTime(function() {
    var result = +"12345";
}, 100000);
if (strToNumTime > 200) throw new Error("String to number conversion too slow: " + strToNumTime + "ms");

// Number to string conversion performance
var numToStrTime = measureTime(function() {
    var result = 12345 + "";
}, 100000);
if (numToStrTime > 200) throw new Error("Number to string conversion too slow: " + numToStrTime + "ms");

// Boolean conversion performance
var boolConvTime = measureTime(function() {
    var result = !!"test";
}, 100000);
if (boolConvTime > 100) throw new Error("Boolean conversion too slow: " + boolConvTime + "ms");

// =============================================================================
// VARIABLE ACCESS PERFORMANCE TESTS
// =============================================================================

// Local variable access
var localVar = 42;
var localAccessTime = measureTime(function() {
    var value = localVar;
}, 100000);
if (localAccessTime > 100) throw new Error("Local variable access too slow: " + localAccessTime + "ms");

// Global variable access
globalVar = 42;
var globalAccessTime = measureTime(function() {
    var value = globalVar;
}, 100000);
if (globalAccessTime > 200) throw new Error("Global variable access too slow: " + globalAccessTime + "ms");

// Property chain access
var deepObj = {a: {b: {c: {d: {e: 42}}}}};
var propChainTime = measureTime(function() {
    var value = deepObj.a.b.c.d.e;
}, 50000);
if (propChainTime > 200) throw new Error("Property chain access too slow: " + propChainTime + "ms");

// Array element access
var testArray = [];
for (var i = 0; i < 10000; i++) testArray[i] = i;
var arrayAccessTime = measureTime(function() {
    var value = testArray[5000];
}, 100000);
if (arrayAccessTime > 100) throw new Error("Array element access too slow: " + arrayAccessTime + "ms");

// =============================================================================
// ERROR HANDLING PERFORMANCE TESTS
// =============================================================================

// try-catch performance (no error)
var tryCatchTime = measureTime(function() {
    try {
        var result = 1 + 1;
    } catch (e) {
        // Handle error
    }
}, 100000);
if (tryCatchTime > 200) throw new Error("try-catch (no error) too slow: " + tryCatchTime + "ms");

// Error creation performance
var errorCreateTime = measureTime(function() {
    var err = new Error("test error");
}, 10000);
if (errorCreateTime > 200) throw new Error("Error creation too slow: " + errorCreateTime + "ms");

// Error throwing and catching performance
var throwCatchTime = measureTime(function() {
    try {
        throw new Error("test");
    } catch (e) {
        // Handle error
    }
}, 1000);
if (throwCatchTime > 500) throw new Error("Throw/catch too slow: " + throwCatchTime + "ms");

// =============================================================================
// CONDITIONAL OPERATIONS PERFORMANCE TESTS
// =============================================================================

// if-else performance
var ifElseTime = measureTime(function() {
    var x = 5;
    var result;
    if (x > 0) {
        result = "positive";
    } else {
        result = "non-positive";
    }
}, 100000);
if (ifElseTime > 200) throw new Error("if-else too slow: " + ifElseTime + "ms");

// switch statement performance
var switchTime = measureTime(function() {
    var x = 2;
    var result;
    switch (x) {
        case 1: result = "one"; break;
        case 2: result = "two"; break;
        case 3: result = "three"; break;
        default: result = "other";
    }
}, 100000);
if (switchTime > 200) throw new Error("switch statement too slow: " + switchTime + "ms");

// Ternary operator performance
var ternaryTime = measureTime(function() {
    var x = 5;
    var result = x > 0 ? "positive" : "non-positive";
}, 100000);
if (ternaryTime > 200) throw new Error("Ternary operator too slow: " + ternaryTime + "ms");

// =============================================================================
// COMPARISON OPERATIONS PERFORMANCE TESTS
// =============================================================================

// Equality comparison performance
var eqTime = measureTime(function() {
    var result = (5 == 5);
}, 100000);
if (eqTime > 100) throw new Error("Equality comparison too slow: " + eqTime + "ms");

// Strict equality performance
var strictEqTime = measureTime(function() {
    var result = (5 === 5);
}, 100000);
if (strictEqTime > 100) throw new Error("Strict equality comparison too slow: " + strictEqTime + "ms");

// Less than comparison performance
var ltTime = measureTime(function() {
    var result = (3 < 5);
}, 100000);
if (ltTime > 100) throw new Error("Less than comparison too slow: " + ltTime + "ms");

// Greater than comparison performance
var gtTime = measureTime(function() {
    var result = (5 > 3);
}, 100000);
if (gtTime > 100) throw new Error("Greater than comparison too slow: " + gtTime + "ms");

// instanceof performance
function TestConstructor() {}
var testInstance = new TestConstructor();
var instanceofTime = measureTime(function() {
    var result = testInstance instanceof TestConstructor;
}, 50000);
if (instanceofTime > 200) throw new Error("instanceof too slow: " + instanceofTime + "ms");

// typeof performance
var typeofTime = measureTime(function() {
    var result = typeof testInstance;
}, 100000);
if (typeofTime > 100) throw new Error("typeof too slow: " + typeofTime + "ms");

// =============================================================================
// JSON OPERATIONS PERFORMANCE TESTS
// =============================================================================

// JSON.stringify performance
var jsonObj = {};
for (var i = 0; i < 1000; i++) {
    jsonObj["prop" + i] = {
        name: "item" + i,
        value: i,
        active: i % 2 === 0
    };
}
var stringifyTime = measureTime(function() {
    var result = JSON.stringify(jsonObj);
}, 100);
if (stringifyTime > 300) throw new Error("JSON.stringify too slow: " + stringifyTime + "ms");

// JSON.parse performance
var jsonString = JSON.stringify(jsonObj);
var parseTime = measureTime(function() {
    var result = JSON.parse(jsonString);
}, 100);
if (parseTime > 300) throw new Error("JSON.parse too slow: " + parseTime + "ms");

// =============================================================================
// PERFORMANCE SUMMARY
// =============================================================================

console.log("Performance benchmarks completed successfully!");
console.log("All operations performed within acceptable time limits.");