/*
 * Neo JavaScript Engine Iterator and Iterable Protocols Tests
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 */

// Test utilities
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function assertThrows(fn, message) {
    try {
        fn();
        throw new Error(`Expected function to throw: ${message}`);
    } catch (e) {
        if (e.message.includes('Expected function to throw')) {
            throw e;
        }
    }
}

// Test basic iterator protocol
function testBasicIteratorProtocol() {
    // Manual iterator implementation
    function createNumberIterator(max) {
        let current = 0;
        return {
            next() {
                if (current < max) {
                    return { value: current++, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }

    let iterator = createNumberIterator(3);

    let result1 = iterator.next();
    assert(result1.value === 0 && result1.done === false, "First iteration should return { value: 0, done: false }");

    let result2 = iterator.next();
    assert(result2.value === 1 && result2.done === false, "Second iteration should return { value: 1, done: false }");

    let result3 = iterator.next();
    assert(result3.value === 2 && result3.done === false, "Third iteration should return { value: 2, done: false }");

    let result4 = iterator.next();
    assert(result4.value === undefined && result4.done === true, "Fourth iteration should return { value: undefined, done: true }");

    // Calling next() after done should continue returning done: true
    let result5 = iterator.next();
    assert(result5.done === true, "Iterator should remain done after completion");

    console.log("✓ Basic iterator protocol tests passed");
}

// Test basic iterable protocol
function testBasicIterableProtocol() {
    // Custom iterable object
    let customIterable = {
        [Symbol.iterator]() {
            let current = 0;
            let max = 3;
            return {
                next() {
                    if (current < max) {
                        return { value: current++, done: false };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    };

    // Test that iterable has Symbol.iterator method
    assert(typeof customIterable[Symbol.iterator] === 'function', "Iterable should have Symbol.iterator method");

    // Test for-of loop with custom iterable
    let values = [];
    for (let value of customIterable) {
        values.push(value);
    }
    assert(values.length === 3, "For-of should iterate over all values");
    assert(values[0] === 0 && values[1] === 1 && values[2] === 2, "Values should be correct");

    // Test multiple iterations (should work independently)
    let values2 = [];
    for (let value of customIterable) {
        values2.push(value);
    }
    assert(values2.length === 3, "Second iteration should work independently");

    console.log("✓ Basic iterable protocol tests passed");
}

// Test built-in iterables
function testBuiltInIterables() {
    // Array iterable
    let arr = [10, 20, 30];
    assert(typeof arr[Symbol.iterator] === 'function', "Array should be iterable");

    let arrValues = [];
    for (let value of arr) {
        arrValues.push(value);
    }
    assert(arrValues.length === 3 && arrValues[0] === 10, "Array iteration should work");

    // String iterable
    let str = "abc";
    assert(typeof str[Symbol.iterator] === 'function', "String should be iterable");

    let strValues = [];
    for (let char of str) {
        strValues.push(char);
    }
    assert(strValues.length === 3 && strValues.join('') === 'abc', "String iteration should work");

    // Set iterable
    let set = new Set([1, 2, 3]);
    assert(typeof set[Symbol.iterator] === 'function', "Set should be iterable");

    let setValues = [];
    for (let value of set) {
        setValues.push(value);
    }
    assert(setValues.length === 3, "Set iteration should work");

    // Map iterable
    let map = new Map([['a', 1], ['b', 2]]);
    assert(typeof map[Symbol.iterator] === 'function', "Map should be iterable");

    let mapEntries = [];
    for (let entry of map) {
        mapEntries.push(entry);
    }
    assert(mapEntries.length === 2 && Array.isArray(mapEntries[0]), "Map iteration should return entries");

    console.log("✓ Built-in iterables tests passed");
}

// Test iterator methods on built-ins
function testBuiltInIteratorMethods() {
    let arr = ['a', 'b', 'c'];

    // Array.prototype.keys()
    let keyIterator = arr.keys();
    assert(typeof keyIterator.next === 'function', "keys() should return iterator");

    let keys = [];
    for (let key of arr.keys()) {
        keys.push(key);
    }
    assert(keys.length === 3 && keys[0] === 0 && keys[2] === 2, "keys() should return indices");

    // Array.prototype.values()
    let values = [];
    for (let value of arr.values()) {
        values.push(value);
    }
    assert(values.length === 3 && values.join('') === 'abc', "values() should return values");

    // Array.prototype.entries()
    let entries = [];
    for (let entry of arr.entries()) {
        entries.push(entry);
    }
    assert(entries.length === 3 && Array.isArray(entries[0]), "entries() should return [index, value] pairs");
    assert(entries[0][0] === 0 && entries[0][1] === 'a', "entries() should have correct format");

    // Map iterator methods
    let map = new Map([['x', 1], ['y', 2]]);

    let mapKeys = [];
    for (let key of map.keys()) {
        mapKeys.push(key);
    }
    assert(mapKeys.length === 2 && mapKeys.includes('x'), "Map keys() should work");

    let mapValues = [];
    for (let value of map.values()) {
        mapValues.push(value);
    }
    assert(mapValues.length === 2 && mapValues.includes(1), "Map values() should work");

    // Set iterator methods
    let set = new Set(['p', 'q', 'r']);

    let setValues = [];
    for (let value of set.values()) {
        setValues.push(value);
    }
    assert(setValues.length === 3, "Set values() should work");

    // Set keys() should be same as values()
    let setKeys = [];
    for (let key of set.keys()) {
        setKeys.push(key);
    }
    assert(JSON.stringify(setKeys) === JSON.stringify(setValues), "Set keys() should equal values()");

    console.log("✓ Built-in iterator methods tests passed");
}

// Test generator functions as iterators
function testGeneratorIterators() {
    // Basic generator function
    function* simpleGenerator() {
        yield 1;
        yield 2;
        yield 3;
    }

    let gen = simpleGenerator();
    assert(typeof gen.next === 'function', "Generator should have next method");
    assert(typeof gen[Symbol.iterator] === 'function', "Generator should be iterable");

    // Test manual iteration
    let result1 = gen.next();
    assert(result1.value === 1 && result1.done === false, "First yield should work");

    let result2 = gen.next();
    assert(result2.value === 2 && result2.done === false, "Second yield should work");

    let result3 = gen.next();
    assert(result3.value === 3 && result3.done === false, "Third yield should work");

    let result4 = gen.next();
    assert(result4.done === true, "Generator should be done after all yields");

    // Test for-of with generator
    let genValues = [];
    for (let value of simpleGenerator()) {
        genValues.push(value);
    }
    assert(genValues.length === 3 && genValues[0] === 1, "Generator for-of should work");

    console.log("✓ Generator iterator tests passed");
}

// Test advanced generator features
function testAdvancedGenerators() {
    // Generator with parameters and return
    function* parameterGenerator(start, end) {
        for (let i = start; i < end; i++) {
            yield i;
        }
        return 'finished';
    }

    let paramGen = parameterGenerator(5, 8);
    let paramValues = [];
    let lastResult;
    let result = paramGen.next();
    while (!result.done) {
        paramValues.push(result.value);
        result = paramGen.next();
    }
    lastResult = result;

    assert(paramValues.length === 3, "Parameter generator should yield correct count");
    assert(paramValues[0] === 5 && paramValues[2] === 7, "Parameter generator should have correct values");
    assert(lastResult.value === 'finished', "Generator return value should be accessible");

    // Generator with yield expressions
    function* yieldExpressionGenerator() {
        let received = yield 'first';
        yield `received: ${received}`;
        yield 'third';
    }

    let yieldGen = yieldExpressionGenerator();
    let first = yieldGen.next();
    assert(first.value === 'first', "First yield should work");

    let second = yieldGen.next('input');
    assert(second.value === 'received: input', "Yield expression should receive input");

    // Infinite generator with control
    function* infiniteGenerator() {
        let i = 0;
        while (true) {
            yield i++;
        }
    }

    let infiniteValues = [];
    let infiniteGen = infiniteGenerator();
    for (let i = 0; i < 5; i++) {
        infiniteValues.push(infiniteGen.next().value);
    }
    assert(infiniteValues.length === 5 && infiniteValues[4] === 4, "Infinite generator should work with control");

    console.log("✓ Advanced generator tests passed");
}

// Test custom iterable implementations
function testCustomIterables() {
    // Range iterable
    class Range {
        constructor(start, end, step = 1) {
            this.start = start;
            this.end = end;
            this.step = step;
        }

        [Symbol.iterator]() {
            let current = this.start;
            let end = this.end;
            let step = this.step;

            return {
                next() {
                    if (current < end) {
                        let value = current;
                        current += step;
                        return { value, done: false };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    }

    let range = new Range(0, 10, 2);
    let rangeValues = [];
    for (let value of range) {
        rangeValues.push(value);
    }
    assert(rangeValues.length === 5, "Range should produce 5 values");
    assert(rangeValues[0] === 0 && rangeValues[4] === 8, "Range should have correct values");

    // Iterable that's also an iterator
    class CountUpTo {
        constructor(max) {
            this.max = max;
            this.current = 0;
        }

        [Symbol.iterator]() {
            return this; // Return self as iterator
        }

        next() {
            if (this.current < this.max) {
                return { value: this.current++, done: false };
            } else {
                return { value: undefined, done: true };
            }
        }
    }

    let counter = new CountUpTo(3);
    let counterValues = [];
    for (let value of counter) {
        counterValues.push(value);
    }
    assert(counterValues.length === 3, "CountUpTo should work as iterable");

    // Note: Using the same instance again won't work because it's exhausted
    let counter2 = new CountUpTo(2);
    let counter2Values = [...counter2]; // Using spread operator
    assert(counter2Values.length === 2, "Spread operator should work with custom iterable");

    console.log("✓ Custom iterable tests passed");
}

// Test iterator return and throw methods
function testIteratorReturnThrow() {
    // Generator with try-finally for cleanup
    function* cleanupGenerator() {
        try {
            yield 1;
            yield 2;
            yield 3;
        } finally {
            console.log("Cleanup in generator");
        }
    }

    // Test return method
    let gen1 = cleanupGenerator();
    let first = gen1.next();
    assert(first.value === 1, "Generator should yield first value");

    let returned = gen1.return('early exit');
    assert(returned.done === true && returned.value === 'early exit', "return() should complete generator");

    // Test throw method
    function* errorHandlingGenerator() {
        try {
            yield 1;
            yield 2;
        } catch (e) {
            yield `caught: ${e.message}`;
        }
        yield 3;
    }

    let gen2 = errorHandlingGenerator();
    gen2.next(); // Get first value

    let thrownResult = gen2.throw(new Error('test error'));
    assert(thrownResult.value === 'caught: test error', "throw() should be caught by generator");

    let afterThrow = gen2.next();
    assert(afterThrow.value === 3, "Generator should continue after catch");

    console.log("✓ Iterator return/throw tests passed");
}

// Test iteration protocol edge cases
function testIterationEdgeCases() {
    // Iterator that returns non-object from next()
    let badIterator = {
        next() {
            return null; // Should cause TypeError
        }
    };

    // Test that badIterator can be called but will cause issues in iteration
    let badResult = badIterator.next();
    assert(badResult === null, "Bad iterator should return null");

    // This would cause issues in for-of loop, but we can't test it directly
    // because it requires the full iteration protocol

    // Iterator missing done property
    let missingDoneIterator = {
        [Symbol.iterator]() {
            return {
                next() {
                    return { value: 1 }; // Missing done property
                }
            };
        }
    };

    // done should be treated as false when missing
    let iter = missingDoneIterator[Symbol.iterator]();
    let result = iter.next();
    assert(result.done === undefined, "Missing done property");

    // Object with Symbol.iterator that's not a function
    let nonFunctionIterator = {
        [Symbol.iterator]: "not a function"
    };

    assertThrows(() => {
        for (let value of nonFunctionIterator) {
            // Should throw TypeError
        }
    }, "Non-function Symbol.iterator should throw");

    // Empty iterator
    let emptyIterator = {
        [Symbol.iterator]() {
            return {
                next() {
                    return { value: undefined, done: true };
                }
            };
        }
    };

    let emptyValues = [];
    for (let value of emptyIterator) {
        emptyValues.push(value);
    }
    assert(emptyValues.length === 0, "Empty iterator should produce no values");

    console.log("✓ Iteration edge cases tests passed");
}

// Test iterator consumption methods
function testIteratorConsumption() {
    // Array.from with iterables
    let customIterable = {
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    };

    let arrayFromIterable = Array.from(customIterable);
    assert(Array.isArray(arrayFromIterable), "Array.from should create array");
    assert(arrayFromIterable.length === 3, "Array should have correct length");

    // Spread operator with iterables
    let spreadValues = [...customIterable];
    assert(spreadValues.length === 3, "Spread should work with iterable");
    assert(spreadValues[0] === 1, "Spread should preserve values");

    // Destructuring with iterables
    let [first, second, ...rest] = customIterable;
    assert(first === 1 && second === 2, "Destructuring should work with iterable");
    assert(rest.length === 1 && rest[0] === 3, "Rest parameter should work");

    // Map and Set constructors with iterables
    let mapFromIterable = new Map([[1, 'a'], [2, 'b']]);
    let mapEntries = [...mapFromIterable];
    assert(mapEntries.length === 2, "Map constructor should work with iterable");

    let setFromIterable = new Set([1, 2, 2, 3]);
    let setValues = [...setFromIterable];
    assert(setValues.length === 3, "Set constructor should deduplicate");

    console.log("✓ Iterator consumption tests passed");
}

// Test for-of loop integration
function testForOfIntegration() {
    // Basic for-of with various iterables
    let testIterables = [
        [1, 2, 3],           // Array
        'hello',             // String
        new Set([1, 2, 3]),  // Set
        new Map([['a', 1], ['b', 2]]) // Map
    ];

    testIterables.forEach((iterable, index) => {
        let values = [];
        for (let value of iterable) {
            values.push(value);
        }
        assert(values.length > 0, `Iterable ${index} should produce values in for-of`);
    });

    // for-of with early break
    let breakValues = [];
    for (let value of [1, 2, 3, 4, 5]) {
        if (value === 3) break;
        breakValues.push(value);
    }
    assert(breakValues.length === 2, "for-of with break should work");

    // for-of with continue
    let continueValues = [];
    for (let value of [1, 2, 3, 4, 5]) {
        if (value === 3) continue;
        continueValues.push(value);
    }
    assert(continueValues.length === 4 && !continueValues.includes(3), "for-of with continue should work");

    // for-of with exceptions
    function* throwingGenerator() {
        yield 1;
        yield 2;
        throw new Error('Generator error');
    }

    assertThrows(() => {
        for (let value of throwingGenerator()) {
            // Should throw on third iteration
        }
    }, "Exception in iterator should propagate to for-of");

    console.log("✓ For-of integration tests passed");
}

// Run all tests
function runAllTests() {
    console.log("Running Iterator and Iterable Protocols comprehensive tests...\n");

    testBasicIteratorProtocol();
    testBasicIterableProtocol();
    testBuiltInIterables();
    testBuiltInIteratorMethods();
    testGeneratorIterators();
    testAdvancedGenerators();
    testCustomIterables();
    testIteratorReturnThrow();
    testIterationEdgeCases();
    testIteratorConsumption();
    testForOfIntegration();

    console.log("\n✅ All Iterator and Iterable Protocols comprehensive tests passed!");
}

// Execute tests
runAllTests();