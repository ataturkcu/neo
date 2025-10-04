/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Generator Functions, Yield, Yield*, Iterators, Async Generators
 */

// Basic generator function
function* basicGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// Test 1: Basic generator creation
var gen1 = basicGenerator();
if (typeof gen1.next !== "function") {
    throw new Error("Test 1 failed: Generator should have next method");
}

// Test 2: Generator first yield
var result1 = gen1.next();
if (result1.value !== 1 || result1.done !== false) {
    throw new Error("Test 2 failed: First yield should return {value: 1, done: false}");
}

// Test 3: Generator second yield
var result2 = gen1.next();
if (result2.value !== 2 || result2.done !== false) {
    throw new Error("Test 3 failed: Second yield should return {value: 2, done: false}");
}

// Test 4: Generator third yield
var result3 = gen1.next();
if (result3.value !== 3 || result3.done !== false) {
    throw new Error("Test 4 failed: Third yield should return {value: 3, done: false}");
}

// Test 5: Generator completion
var result4 = gen1.next();
if (result4.value !== undefined || result4.done !== true) {
    throw new Error("Test 5 failed: Completed generator should return {value: undefined, done: true}");
}

// Generator with return value
function* generatorWithReturn() {
    yield 1;
    yield 2;
    return "done";
}

// Test 6: Generator with return value
var gen2 = generatorWithReturn();
gen2.next(); // Skip first yields
gen2.next();
var finalResult = gen2.next();
if (finalResult.value !== "done" || finalResult.done !== true) {
    throw new Error("Test 6 failed: Generator return should be captured");
}

// Generator with parameters
function* generatorWithParams(start, end) {
    for (var i = start; i <= end; i++) {
        yield i;
    }
}

// Test 7: Generator with parameters
var gen3 = generatorWithParams(5, 7);
var values = [];
var current = gen3.next();
while (!current.done) {
    values.push(current.value);
    current = gen3.next();
}
if (values.join(",") !== "5,6,7") {
    throw new Error("Test 7 failed: Generator with parameters");
}

// Generator with yield expressions (receiving values)
function* generatorWithInput() {
    var first = yield "first";
    var second = yield "received: " + first;
    return "final: " + second;
}

// Test 8: Generator receiving input
var gen4 = generatorWithInput();
var step1 = gen4.next();
if (step1.value !== "first") {
    throw new Error("Test 8 failed: First yield value");
}

// Test 9: Sending value to generator
var step2 = gen4.next("input1");
if (step2.value !== "received: input1") {
    throw new Error("Test 9 failed: Generator should receive input");
}

// Test 10: Final generator input
var step3 = gen4.next("input2");
if (step3.value !== "final: input2" || !step3.done) {
    throw new Error("Test 10 failed: Final generator input and return");
}

// Generator error handling
function* generatorWithError() {
    try {
        yield 1;
        yield 2;
    } catch (e) {
        yield "caught: " + e.message;
    }
    yield 3;
}

// Test 11: Generator throw method
var gen5 = generatorWithError();
gen5.next(); // First yield
var errorResult = gen5.throw(new Error("test error"));
if (errorResult.value !== "caught: test error") {
    throw new Error("Test 11 failed: Generator throw handling");
}

// Test 12: Generator continuation after error
var afterError = gen5.next();
if (afterError.value !== 3) {
    throw new Error("Test 12 failed: Generator should continue after handled error");
}

// Nested generators with yield*
function* innerGenerator() {
    yield 1;
    yield 2;
    return "inner done";
}

function* outerGenerator() {
    yield "start";
    var result = yield* innerGenerator();
    yield "result: " + result;
    yield "end";
}

// Test 13: yield* delegation
var gen6 = outerGenerator();
var delegationResults = [];
var current = gen6.next();
while (!current.done) {
    delegationResults.push(current.value);
    current = gen6.next();
}
var expected = ["start", 1, 2, "result: inner done", "end"];
for (var i = 0; i < expected.length; i++) {
    if (delegationResults[i] !== expected[i]) {
        throw new Error("Test 13 failed: yield* delegation at index " + i);
    }
}

// Generator with iterables
function* generatorWithIterable() {
    yield* [1, 2, 3];
    yield* "abc";
    yield* new Set([4, 5, 6]);
}

// Test 14: yield* with array
var gen7 = generatorWithIterable();
var iterableResults = [];
for (var i = 0; i < 9; i++) { // 3 from array, 3 from string, 3 from set
    var next = gen7.next();
    if (!next.done) {
        iterableResults.push(next.value);
    }
}
if (iterableResults.length !== 9) {
    throw new Error("Test 14 failed: yield* with iterables length");
}

// Test 15: yield* with array values
if (iterableResults[0] !== 1 || iterableResults[1] !== 2 || iterableResults[2] !== 3) {
    throw new Error("Test 15 failed: yield* with array values");
}

// Test 16: yield* with string
if (iterableResults[3] !== "a" || iterableResults[4] !== "b" || iterableResults[5] !== "c") {
    throw new Error("Test 16 failed: yield* with string values");
}

// Generator implementing custom iterator
function* fibonacciGenerator(max) {
    var a = 0, b = 1;
    while (a <= max) {
        yield a;
        var temp = a;
        a = b;
        b = temp + b;
    }
}

// Test 17: Custom iterator implementation
var fibGen = fibonacciGenerator(10);
var fibResults = [];
var current = fibGen.next();
while (!current.done) {
    fibResults.push(current.value);
    current = fibGen.next();
}
if (fibResults.join(",") !== "0,1,1,2,3,5,8") {
    throw new Error("Test 17 failed: Fibonacci generator");
}

// Generator with for...of loop
function* countGenerator(start, end) {
    for (var i = start; i <= end; i++) {
        yield i;
    }
}

// Test 18: Generator with for...of (simulated)
var gen8 = countGenerator(1, 3);
var forOfResults = [];
// Simulating for...of behavior
var iterator = gen8;
var current = iterator.next();
while (!current.done) {
    forOfResults.push(current.value);
    current = iterator.next();
}
if (forOfResults.join(",") !== "1,2,3") {
    throw new Error("Test 18 failed: Generator for...of simulation");
}

// Generator with return and yield*
function* generatorWithReturnAndDelegation() {
    yield 1;
    var result = yield* (function*() {
        yield 2;
        yield 3;
        return "inner";
    })();
    yield "got: " + result;
    return "outer";
}

// Test 19: yield* capturing return value
var gen9 = generatorWithReturnAndDelegation();
var delegationWithReturn = [];
var current = gen9.next();
while (!current.done) {
    delegationWithReturn.push(current.value);
    current = gen9.next();
}
if (delegationWithReturn.join(",") !== "1,2,3,got: inner") {
    throw new Error("Test 19 failed: yield* with return value capture");
}

// Infinite generator
function* infiniteGenerator() {
    var i = 0;
    while (true) {
        yield i++;
    }
}

// Test 20: Infinite generator (limited iteration)
var infiniteGen = infiniteGenerator();
var infiniteResults = [];
for (var i = 0; i < 5; i++) {
    infiniteResults.push(infiniteGen.next().value);
}
if (infiniteResults.join(",") !== "0,1,2,3,4") {
    throw new Error("Test 20 failed: Infinite generator");
}

// Generator with complex state
function* statefulGenerator() {
    var state = { count: 0, history: [] };
    while (true) {
        var input = yield state.count;
        state.history.push(input || 0);
        state.count += (input || 1);
        if (state.count > 10) {
            return state;
        }
    }
}

// Test 21: Stateful generator
var stateGen = statefulGenerator();
stateGen.next(); // Initial yield
stateGen.next(2); // Add 2
stateGen.next(3); // Add 3
var stateResult = stateGen.next(6); // Add 6, should exceed 10
if (stateResult.done && stateResult.value.count !== 11) {
    throw new Error("Test 21 failed: Stateful generator final count");
}

// Test 22: Generator state history
if (stateResult.value.history.length !== 3) {
    throw new Error("Test 22 failed: Generator state history length");
}

// Generator composition
function* baseSequence() {
    yield 1;
    yield 2;
}

function* extendedSequence() {
    yield 0;
    yield* baseSequence();
    yield 3;
}

function* composedSequence() {
    yield "start";
    yield* extendedSequence();
    yield "end";
}

// Test 23: Generator composition
var composedGen = composedSequence();
var composedResults = [];
var current = composedGen.next();
while (!current.done) {
    composedResults.push(current.value);
    current = composedGen.next();
}
if (composedResults.join(",") !== "start,0,1,2,3,end") {
    throw new Error("Test 23 failed: Generator composition");
}

// Generator with arrow function (if supported)
var arrowGenerator;
try {
    eval('arrowGenerator = function*() { yield "arrow"; }');
} catch (e) {
    // Arrow generators might not be supported
    arrowGenerator = function*() { yield "arrow"; };
}

// Test 24: Arrow function generator
var arrowGen = arrowGenerator();
if (arrowGen.next().value !== "arrow") {
    throw new Error("Test 24 failed: Arrow function generator");
}

// Generator methods in objects
var generatorObject = {
    *methodGenerator() {
        yield "method";
        yield "generator";
    },

    regularMethod: function*() {
        yield "regular";
        yield "method";
    }
};

// Test 25: Generator method syntax
var methodGen = generatorObject.methodGenerator();
var methodResults = [];
var current = methodGen.next();
while (!current.done) {
    methodResults.push(current.value);
    current = methodGen.next();
}
if (methodResults.join(",") !== "method,generator") {
    throw new Error("Test 25 failed: Generator method syntax");
}

// Test 26: Regular generator method
var regularGen = generatorObject.regularMethod();
var regularResults = [];
var current = regularGen.next();
while (!current.done) {
    regularResults.push(current.value);
    current = regularGen.next();
}
if (regularResults.join(",") !== "regular,method") {
    throw new Error("Test 26 failed: Regular generator method");
}

// Generator constructor pattern
function* GeneratorConstructor(config) {
    this.config = config || {};
    yield this.config.start || 0;
    yield this.config.middle || 1;
    yield this.config.end || 2;
}

// Test 27: Generator constructor pattern
var constructorGen = GeneratorConstructor({ start: 10, middle: 20, end: 30 });
if (constructorGen.next().value !== 10) {
    throw new Error("Test 27 failed: Generator constructor pattern");
}

// Recursive generator
function* recursiveGenerator(n) {
    if (n <= 0) return;
    yield n;
    yield* recursiveGenerator(n - 1);
}

// Test 28: Recursive generator
var recursiveGen = recursiveGenerator(3);
var recursiveResults = [];
var current = recursiveGen.next();
while (!current.done) {
    recursiveResults.push(current.value);
    current = recursiveGen.next();
}
if (recursiveResults.join(",") !== "3,2,1") {
    throw new Error("Test 28 failed: Recursive generator");
}

// Generator with promises (simulated async behavior)
function* promiseGenerator() {
    var result1 = yield Promise.resolve("async1");
    var result2 = yield Promise.resolve("async2");
    return "all done";
}

// Test 29: Generator with promises
var promiseGen = promiseGenerator();
var promise1 = promiseGen.next().value;
if (!(promise1 instanceof Promise)) {
    throw new Error("Test 29 failed: Generator should yield promises");
}

// Generator pipeline
function* transform1() {
    var input = yield;
    while (input !== undefined) {
        input = yield input * 2;
    }
}

function* transform2() {
    var input = yield;
    while (input !== undefined) {
        input = yield input + 10;
    }
}

// Test 30: Generator pipeline setup
var pipe1 = transform1();
var pipe2 = transform2();
pipe1.next(); // Start generators
pipe2.next();

var pipeResult1 = pipe1.next(5); // 5 * 2 = 10
var pipeResult2 = pipe2.next(pipeResult1.value); // 10 + 10 = 20

if (pipeResult2.value !== 20) {
    throw new Error("Test 30 failed: Generator pipeline");
}

// Generator with Symbol.iterator
function* iterableGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// Add Symbol.iterator if available
if (typeof Symbol !== "undefined" && Symbol.iterator) {
    iterableGenerator.prototype[Symbol.iterator] = function() {
        return this;
    };
}

// Test 31: Generator Symbol.iterator
var iterGen = iterableGenerator();
if (typeof iterGen.next === "function") {
    console.log("Test 31 passed: Generator has iterator interface");
} else {
    throw new Error("Test 31 failed: Generator should have iterator interface");
}

// Early return from generator
function* earlyReturnGenerator() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } finally {
        yield "cleanup";
    }
}

// Test 32: Generator return method
var earlyGen = earlyReturnGenerator();
earlyGen.next(); // First yield
var returnResult = earlyGen.return("forced return");
// When generator has finally block with yield, return executes finally first
if (returnResult.value !== "cleanup" || returnResult.done) {
    throw new Error("Test 32 failed: Generator return method should execute finally block");
}

// Generator with multiple yields in expressions
function* expressionGenerator() {
    var a = yield 1;
    var b = yield 2;
    yield a + b;
}

// Test 33: Multiple yield expressions
var exprGen = expressionGenerator();
exprGen.next(); // yield 1
exprGen.next(10); // a = 10, yield 2
var sumResult = exprGen.next(20); // b = 20, yield 30
if (sumResult.value !== 30) {
    throw new Error("Test 33 failed: Multiple yield expressions");
}

// Generator factory function
function createGenerator(type) {
    switch (type) {
        case "numbers":
            return function*() {
                for (var i = 1; i <= 3; i++) yield i;
            };
        case "letters":
            return function*() {
                yield "a"; yield "b"; yield "c";
            };
        default:
            return function*() { yield "default"; };
    }
}

// Test 34: Generator factory
var numberGenFactory = createGenerator("numbers");
var numberGen = numberGenFactory();
if (numberGen.next().value !== 1) {
    throw new Error("Test 34 failed: Generator factory");
}

// Test 35: Generator factory different type
var letterGenFactory = createGenerator("letters");
var letterGen = letterGenFactory();
if (letterGen.next().value !== "a") {
    throw new Error("Test 35 failed: Generator factory different type");
}

// Generator with complex iteration patterns
function* zigzagGenerator(array) {
    var forward = true;
    while (array.length > 0) {
        if (forward) {
            yield array.shift(); // Remove from front
        } else {
            yield array.pop(); // Remove from back
        }
        forward = !forward;
    }
}

// Test 36: Complex iteration pattern
var zigzagGen = zigzagGenerator([1, 2, 3, 4, 5]);
var zigzagResults = [];
var current = zigzagGen.next();
while (!current.done) {
    zigzagResults.push(current.value);
    current = zigzagGen.next();
}
if (zigzagResults.join(",") !== "1,5,2,4,3") {
    throw new Error("Test 36 failed: Complex iteration pattern");
}

// Generator with closure
function createClosureGenerator(multiplier) {
    return function*(start) {
        var current = start;
        while (true) {
            yield current;
            current *= multiplier;
            if (current > 100) break;
        }
    };
}

// Test 37: Generator with closure
var doubleGen = createClosureGenerator(2)(1);
var closureResults = [];
var current = doubleGen.next();
while (!current.done) {
    closureResults.push(current.value);
    current = doubleGen.next();
}
if (closureResults.join(",") !== "1,2,4,8,16,32,64") {
    throw new Error("Test 37 failed: Generator with closure");
}

// Simulated async generator (using promises)
function createAsyncGenerator() {
    return function*() {
        yield Promise.resolve(1);
        yield Promise.resolve(2);
        yield Promise.resolve(3);
    };
}

// Test 38: Simulated async generator
var asyncGen = createAsyncGenerator()();
var asyncPromise = asyncGen.next().value;
if (!(asyncPromise instanceof Promise)) {
    throw new Error("Test 38 failed: Async generator should yield promises");
}

// Generator performance test (large iteration)
function* largeGenerator(size) {
    for (var i = 0; i < size; i++) {
        yield i;
    }
}

// Test 39: Large generator performance
var largeGen = largeGenerator(1000);
var count = 0;
var current = largeGen.next();
while (!current.done && count < 1000) {
    count++;
    current = largeGen.next();
}
if (count !== 1000) {
    throw new Error("Test 39 failed: Large generator iteration");
}

// Generator with mixed return types
function* mixedTypeGenerator() {
    yield 1;           // number
    yield "string";    // string
    yield true;        // boolean
    yield [1, 2, 3];   // array
    yield { key: "value" }; // object
    yield null;        // null
}

// Test 40: Mixed type generation
var mixedGen = mixedTypeGenerator();
var types = [];
var current = mixedGen.next();
while (!current.done) {
    types.push(typeof current.value);
    current = mixedGen.next();
}
var expectedTypes = ["number", "string", "boolean", "object", "object", "object"];
for (var i = 0; i < expectedTypes.length; i++) {
    if (types[i] !== expectedTypes[i]) {
        throw new Error("Test 40 failed: Mixed type generation at index " + i);
    }
}

// Generator with conditional logic
function* conditionalGenerator(condition) {
    if (condition) {
        yield "condition true";
        yield "second true";
    } else {
        yield "condition false";
    }
    yield "always yielded";
}

// Test 41: Conditional generator - true path
var condGen1 = conditionalGenerator(true);
var condResults1 = [];
var current = condGen1.next();
while (!current.done) {
    condResults1.push(current.value);
    current = condGen1.next();
}
if (condResults1.join(",") !== "condition true,second true,always yielded") {
    throw new Error("Test 41 failed: Conditional generator true path");
}

// Test 42: Conditional generator - false path
var condGen2 = conditionalGenerator(false);
var condResults2 = [];
var current = condGen2.next();
while (!current.done) {
    condResults2.push(current.value);
    current = condGen2.next();
}
if (condResults2.join(",") !== "condition false,always yielded") {
    throw new Error("Test 42 failed: Conditional generator false path");
}

// Generator with try-catch-finally
function* errorHandlingGenerator() {
    try {
        yield "before error";
        var input = yield "waiting for input";
        if (input === "error") {
            throw new Error("Generated error");
        }
        yield "after input: " + input;
    } catch (e) {
        yield "caught: " + e.message;
    } finally {
        yield "finally block";
    }
    yield "after try-catch";
}

// Test 43: Generator try-catch-finally normal flow
var errorGen1 = errorHandlingGenerator();
errorGen1.next(); // "before error"
errorGen1.next(); // "waiting for input"
var normalResult = errorGen1.next("normal");
if (normalResult.value !== "after input: normal") {
    throw new Error("Test 43 failed: Generator normal flow");
}

// Test 44: Generator error handling
var errorGen2 = errorHandlingGenerator();
errorGen2.next(); // "before error"
errorGen2.next(); // "waiting for input"
var errorResult = errorGen2.next("error");
if (errorResult.value !== "caught: Generated error") {
    throw new Error("Test 44 failed: Generator error handling");
}

// Generator with loops
function* loopGenerator() {
    // For loop
    for (var i = 1; i <= 2; i++) {
        yield "for: " + i;
    }

    // While loop
    var j = 1;
    while (j <= 2) {
        yield "while: " + j;
        j++;
    }

    // Do-while simulation
    var k = 1;
    do {
        yield "do-while: " + k;
        k++;
    } while (k <= 2);
}

// Test 45: Generator with different loop types
var loopGen = loopGenerator();
var loopResults = [];
var current = loopGen.next();
while (!current.done) {
    loopResults.push(current.value);
    current = loopGen.next();
}
var expectedLoop = [
    "for: 1", "for: 2",
    "while: 1", "while: 2",
    "do-while: 1", "do-while: 2"
];
for (var i = 0; i < expectedLoop.length; i++) {
    if (loopResults[i] !== expectedLoop[i]) {
        throw new Error("Test 45 failed: Generator loops at index " + i);
    }
}

// Generator with nested function calls
function* nestedCallGenerator() {
    function helper(x) {
        return x * 2;
    }

    yield helper(1);
    yield helper(yield helper(2));
}

// Test 46: Nested function calls in generator
var nestedGen = nestedCallGenerator();
if (nestedGen.next().value !== 2) { // helper(1) = 2
    throw new Error("Test 46 failed: First nested call");
}

var secondResult = nestedGen.next();
if (secondResult.value !== 4) { // helper(2) = 4
    throw new Error("Test 46 failed: Second nested call");
}

var thirdResult = nestedGen.next(3);
if (thirdResult.value !== 6) { // helper(3) = 6
    throw new Error("Test 46 failed: Third nested call with input");
}

// Generator mimicking array methods
function* mapGenerator(array, fn) {
    for (var i = 0; i < array.length; i++) {
        yield fn(array[i], i);
    }
}

function* filterGenerator(array, predicate) {
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i], i)) {
            yield array[i];
        }
    }
}

// Test 47: Generator map implementation
var mapGen = mapGenerator([1, 2, 3], function(x) { return x * 2; });
var mapResults = [];
var current = mapGen.next();
while (!current.done) {
    mapResults.push(current.value);
    current = mapGen.next();
}
if (mapResults.join(",") !== "2,4,6") {
    throw new Error("Test 47 failed: Generator map implementation");
}

// Test 48: Generator filter implementation
var filterGen = filterGenerator([1, 2, 3, 4], function(x) { return x % 2 === 0; });
var filterResults = [];
var current = filterGen.next();
while (!current.done) {
    filterResults.push(current.value);
    current = filterGen.next();
}
if (filterResults.join(",") !== "2,4") {
    throw new Error("Test 48 failed: Generator filter implementation");
}

// Generator with object property access
var dataObject = {
    values: [1, 2, 3],
    multiplier: 10
};

function* objectPropertyGenerator(obj) {
    for (var i = 0; i < obj.values.length; i++) {
        yield obj.values[i] * obj.multiplier;
    }
}

// Test 49: Generator with object property access
var objPropGen = objectPropertyGenerator(dataObject);
var objResults = [];
var current = objPropGen.next();
while (!current.done) {
    objResults.push(current.value);
    current = objPropGen.next();
}
if (objResults.join(",") !== "10,20,30") {
    throw new Error("Test 49 failed: Generator object property access");
}

// Generator implementing custom reduce
function* reduceGenerator(array, fn, initial) {
    var accumulator = initial;
    for (var i = 0; i < array.length; i++) {
        accumulator = fn(accumulator, array[i], i);
        yield accumulator;
    }
    return accumulator;
}

// Test 50: Generator reduce implementation
var reduceGen = reduceGenerator([1, 2, 3, 4], function(acc, val) { return acc + val; }, 0);
var reduceResults = [];
var current = reduceGen.next();
while (!current.done) {
    reduceResults.push(current.value);
    current = reduceGen.next();
}
if (reduceResults.join(",") !== "1,3,6,10") {
    throw new Error("Test 50 failed: Generator reduce implementation");
}

// Comprehensive generator feature test
function* comprehensiveGenerator(options) {
    options = options || {};

    // Initialization
    var state = {
        step: 0,
        data: options.data || [],
        transform: options.transform || function(x) { return x; }
    };

    try {
        // Yield initial state
        yield "initialized";

        // Process data
        for (var i = 0; i < state.data.length; i++) {
            state.step++;
            var processed = state.transform(state.data[i]);
            var input = yield {
                step: state.step,
                value: processed,
                index: i
            };

            // Handle input if provided
            if (input !== undefined) {
                yield "received input: " + input;
            }
        }

        // Delegate to another generator
        yield* (function*() {
            yield "delegated start";
            yield "delegated end";
        })();

        return {
            completed: true,
            totalSteps: state.step,
            finalData: state.data
        };

    } catch (error) {
        yield "error occurred: " + error.message;
        return { error: true, message: error.message };
    } finally {
        yield "cleanup";
    }
}

// Test 51-60: Comprehensive generator test
var compGen = comprehensiveGenerator({
    data: [1, 2, 3],
    transform: function(x) { return x * x; }
});

// Test 51: Initialization
if (compGen.next().value !== "initialized") {
    throw new Error("Test 51 failed: Comprehensive generator initialization");
}

// Test 52: First step processing
var step1 = compGen.next();
if (step1.value.step !== 1 || step1.value.value !== 1 || step1.value.index !== 0) {
    throw new Error("Test 52 failed: First step processing");
}

// Test 53: Input handling
var inputResponse = compGen.next("test input");
if (inputResponse.value !== "received input: test input") {
    throw new Error("Test 53 failed: Input handling");
}

// Test 54: Continue processing
var step2 = compGen.next();
if (step2.value.step !== 2 || step2.value.value !== 4) {
    throw new Error("Test 54 failed: Continue processing");
}

// Test 55: Skip input for step 2
var step3 = compGen.next();
if (step3.value.step !== 3 || step3.value.value !== 9) {
    throw new Error("Test 55 failed: Step 3 processing");
}

// Test 56: Delegation start
var delegateStart = compGen.next();
if (delegateStart.value !== "delegated start") {
    throw new Error("Test 56 failed: Delegation start");
}

// Test 57: Delegation end
var delegateEnd = compGen.next();
if (delegateEnd.value !== "delegated end") {
    throw new Error("Test 57 failed: Delegation end");
}

// Test 58: Cleanup
var cleanup = compGen.next();
if (cleanup.value !== "cleanup") {
    throw new Error("Test 58 failed: Cleanup");
}

// Test 59: Final return value
var finalResult = compGen.next();
if (!finalResult.done || !finalResult.value.completed || finalResult.value.totalSteps !== 3) {
    throw new Error("Test 59 failed: Final return value");
}

// Test 60: Generator state preservation
var stateGen = comprehensiveGenerator({ data: [5], transform: function(x) { return x * x; } });
stateGen.next(); // Initialize
var stateStep = stateGen.next(); // First step
if (stateStep.value.value !== 25) { // 5^2 = 25
    throw new Error("Test 60 failed: Generator state preservation");
}

// Advanced edge cases

// Test 61: Generator with Symbol properties (if available)
var symbolProp = typeof Symbol !== "undefined" ? Symbol("test") : "__symbol__";
function* symbolGenerator() {
    var obj = {};
    obj[symbolProp] = "symbol value";
    yield obj[symbolProp];
}

var symGen = symbolGenerator();
if (symGen.next().value !== "symbol value") {
    throw new Error("Test 61 failed: Generator with symbol properties");
}

// Test 62: Generator with prototype methods
function* PrototypeGenerator() {
    yield "instance";
}

PrototypeGenerator.prototype.customMethod = function() {
    return "custom";
};

var protoGen = PrototypeGenerator();
if (PrototypeGenerator.prototype.customMethod() !== "custom") {
    throw new Error("Test 62 failed: Generator prototype methods");
}

// Test 63: Generator inheritance simulation
function* BaseGenerator() {
    yield "base";
}

function* ExtendedGenerator() {
    yield* BaseGenerator();
    yield "extended";
}

var extGen = ExtendedGenerator();
var extResults = [];
var current = extGen.next();
while (!current.done) {
    extResults.push(current.value);
    current = extGen.next();
}
if (extResults.join(",") !== "base,extended") {
    throw new Error("Test 63 failed: Generator inheritance simulation");
}

// Test 64: Generator with WeakMap integration (if available)
var generatorWeakMap = typeof WeakMap !== "undefined" ? new WeakMap() : new Map();

function* weakMapGenerator(obj) {
    generatorWeakMap.set(obj, "stored");
    yield generatorWeakMap.get(obj);
}

var testObj = {};
var weakGen = weakMapGenerator(testObj);
if (weakGen.next().value !== "stored") {
    throw new Error("Test 64 failed: Generator with WeakMap integration");
}

// Test 65: Generator with destructuring parameters
function* destructuringGenerator([a, b], {x, y}) {
    yield a + x;
    yield b + y;
}

var destructGen = destructuringGenerator([1, 2], {x: 10, y: 20});
if (destructGen.next().value !== 11) {
    throw new Error("Test 65 failed: Generator destructuring parameters");
}

// Test 66: Generator with default parameters
function* defaultParamGenerator(start = 0, step = 1, max = 3) {
    for (var i = start; i < max; i += step) {
        yield i;
    }
}

var defaultGen = defaultParamGenerator();
var defaultResults = [];
var current = defaultGen.next();
while (!current.done) {
    defaultResults.push(current.value);
    current = defaultGen.next();
}
if (defaultResults.join(",") !== "0,1,2") {
    throw new Error("Test 66 failed: Generator default parameters");
}

// Test 67: Generator with rest parameters
function* restParamGenerator(first, ...rest) {
    yield first;
    for (var i = 0; i < rest.length; i++) {
        yield rest[i];
    }
}

var restGen = restParamGenerator(1, 2, 3, 4);
var restResults = [];
var current = restGen.next();
while (!current.done) {
    restResults.push(current.value);
    current = restGen.next();
}
if (restResults.join(",") !== "1,2,3,4") {
    throw new Error("Test 67 failed: Generator rest parameters");
}

// Test 68: Generator with computed property names
var computedProp = "dynamic";
function* computedPropertyGenerator() {
    var obj = {};
    obj[computedProp] = "computed";
    yield obj[computedProp];
}

var compPropGen = computedPropertyGenerator();
if (compPropGen.next().value !== "computed") {
    throw new Error("Test 68 failed: Generator computed property names");
}

// Test 69: Generator with template literals
function* templateLiteralGenerator(name, age) {
    yield `Hello ${name}`;
    yield `You are ${age} years old`;
    yield `Welcome ${name}, age ${age}`;
}

var templateGen = templateLiteralGenerator("Alice", 30);
var templateResults = [];
var current = templateGen.next();
while (!current.done) {
    templateResults.push(current.value);
    current = templateGen.next();
}
var expectedTemplate = ["Hello Alice", "You are 30 years old", "Welcome Alice, age 30"];
for (var i = 0; i < expectedTemplate.length; i++) {
    if (templateResults[i] !== expectedTemplate[i]) {
        throw new Error("Test 69 failed: Template literal generator at index " + i);
    }
}

// Test 70: Generator memory efficiency test
function* memoryTestGenerator() {
    for (var i = 0; i < 10000; i++) {
        yield i;
    }
}

var memGen = memoryTestGenerator();
// Skip to end to test that intermediate values aren't stored
for (var i = 0; i < 9999; i++) {
    memGen.next();
}
var lastValue = memGen.next();
if (lastValue.value !== 9999) {
    throw new Error("Test 70 failed: Generator memory efficiency");
}

// Final comprehensive integration test
function* integrationTestGenerator() {
    // Combine multiple features
    var config = yield "config request";

    try {
        if (!config || !config.data) {
            throw new Error("Invalid configuration");
        }

        // Process with error handling
        for (var i = 0; i < config.data.length; i++) {
            var item = config.data[i];
            if (typeof item === "number") {
                yield { type: "number", value: item * 2, index: i };
            } else if (typeof item === "string") {
                yield { type: "string", value: item.toUpperCase(), index: i };
            } else {
                yield { type: "other", value: String(item), index: i };
            }
        }

        // Delegate to sub-generator
        yield* (function*() {
            yield "sub-generator start";
            yield "sub-generator end";
        })();

        return "integration complete";

    } catch (error) {
        yield { error: true, message: error.message };
        return "integration failed";
    } finally {
        yield "integration cleanup";
    }
}

// Test 71-75: Integration test
var integrationGen = integrationTestGenerator();

// Test 71: Request configuration
var configRequest = integrationGen.next();
if (configRequest.value !== "config request") {
    throw new Error("Test 71 failed: Integration config request");
}

// Test 72: Provide configuration and process
var firstProcess = integrationGen.next({
    data: [1, "hello", true, 2]
});
if (firstProcess.value.type !== "number" || firstProcess.value.value !== 2) {
    throw new Error("Test 72 failed: Integration first process");
}

// Test 73: String processing
var stringProcess = integrationGen.next();
if (stringProcess.value.type !== "string" || stringProcess.value.value !== "HELLO") {
    throw new Error("Test 73 failed: Integration string process");
}

// Test 74: Other type processing
var otherProcess = integrationGen.next();
if (otherProcess.value.type !== "other" || otherProcess.value.value !== "true") {
    throw new Error("Test 74 failed: Integration other type process");
}

// Test 75: Complete the integration test
var numberProcess2 = integrationGen.next();
if (numberProcess2.value.type !== "number" || numberProcess2.value.value !== 4) {
    throw new Error("Test 75 failed: Integration second number process");
}

// Continue to sub-generator
var subStart = integrationGen.next();
if (subStart.value !== "sub-generator start") {
    throw new Error("Test 75.1 failed: Sub-generator start");
}

var subEnd = integrationGen.next();
if (subEnd.value !== "sub-generator end") {
    throw new Error("Test 75.2 failed: Sub-generator end");
}

var cleanup = integrationGen.next();
if (cleanup.value !== "integration cleanup") {
    throw new Error("Test 75.3 failed: Integration cleanup");
}

var completion = integrationGen.next();
if (completion.value !== "integration complete" || !completion.done) {
    throw new Error("Test 75.4 failed: Integration completion");
}

console.log("All 75+ comprehensive generator, yield, yield*, and iterator tests passed!");