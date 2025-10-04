/*
 * Neo JavaScript Engine For Loops Comprehensive Tests
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

// Test basic for loop
function testBasicForLoop() {
    // Basic for loop with number
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        sum += i;
    }
    assert(sum === 10, "Basic for loop should sum 0+1+2+3+4 = 10");

    // For loop with different increment
    let result = 0;
    for (let i = 2; i <= 10; i += 2) {
        result += i;
    }
    assert(result === 30, "For loop with increment 2 should sum 2+4+6+8+10 = 30");

    // For loop with decrement
    let countdown = [];
    for (let i = 5; i > 0; i--) {
        countdown.push(i);
    }
    assert(countdown.length === 5, "Countdown should have 5 elements");
    assert(countdown[0] === 5 && countdown[4] === 1, "Countdown should be [5,4,3,2,1]");

    // Empty for loop
    let iterations = 0;
    for (let i = 10; i < 5; i++) {
        iterations++;
    }
    assert(iterations === 0, "Empty for loop should not execute");

    console.log("✓ Basic for loop tests passed");
}

// Test for loop variable declarations
function testForLoopVariables() {
    // var declaration
    var varResults = [];
    for (var i = 0; i < 3; i++) {
        varResults.push(i);
    }
    assert(i === 3, "var declaration should leak outside loop");
    assert(varResults.length === 3, "var loop should execute correctly");

    // let declaration
    let letResults = [];
    for (let j = 0; j < 3; j++) {
        letResults.push(j);
    }
    try {
        let shouldThrow = j; // This should throw ReferenceError
        assert(false, "let variable should not be accessible outside loop");
    } catch (e) {
        assert(e instanceof ReferenceError, "Should throw ReferenceError for let variable");
    }

    // const declaration in for loop (should throw)
    assertThrows(() => {
        for (const k = 0; k < 3; k++) {
            // This should throw because const cannot be reassigned
        }
    }, "const in for loop should throw");

    // Multiple variable declarations
    let multiResults = [];
    for (let x = 0, y = 10; x < 5; x++, y--) {
        multiResults.push(x + y);
    }
    assert(multiResults.length === 5, "Multiple variable for loop should work");
    assert(multiResults[0] === 10, "First iteration: 0 + 10 = 10");
    assert(multiResults[4] === 10, "Last iteration: 4 + 6 = 10");

    console.log("✓ For loop variable tests passed");
}

// Test for loop with different conditions
function testForLoopConditions() {
    // Complex condition
    let complexResults = [];
    for (let i = 0; i * i < 25; i++) {
        complexResults.push(i);
    }
    assert(complexResults.length === 5, "Complex condition should work"); // 0,1,2,3,4 (5*5 = 25)

    // Boolean condition
    let flag = true;
    let boolResults = [];
    for (let i = 0; flag && i < 10; i++) {
        boolResults.push(i);
        if (i === 3) flag = false;
    }
    assert(boolResults.length === 4, "Boolean condition should work"); // 0,1,2,3

    // Function call in condition
    function getLimit() {
        return 3;
    }
    let funcResults = [];
    for (let i = 0; i < getLimit(); i++) {
        funcResults.push(i);
    }
    assert(funcResults.length === 3, "Function call in condition should work");

    // No condition (infinite loop with break)
    let noCondResults = [];
    for (let i = 0; ; i++) {
        if (i >= 3) break;
        noCondResults.push(i);
    }
    assert(noCondResults.length === 3, "No condition with break should work");

    console.log("✓ For loop condition tests passed");
}

// Test for loop with break and continue
function testForLoopBreakContinue() {
    // Basic break
    let breakResults = [];
    for (let i = 0; i < 10; i++) {
        if (i === 5) break;
        breakResults.push(i);
    }
    assert(breakResults.length === 5, "Break should stop loop at 5");
    assert(breakResults[4] === 4, "Last element should be 4");

    // Basic continue
    let continueResults = [];
    for (let i = 0; i < 5; i++) {
        if (i === 2) continue;
        continueResults.push(i);
    }
    assert(continueResults.length === 4, "Continue should skip one iteration");
    assert(!continueResults.includes(2), "Continue should skip value 2");

    // Multiple continues
    let multiContinueResults = [];
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) continue; // Skip even numbers
        multiContinueResults.push(i);
    }
    assert(multiContinueResults.length === 5, "Should skip even numbers");
    assert(multiContinueResults.every(n => n % 2 === 1), "All results should be odd");

    // Nested loops with break
    let nestedBreakResults = [];
    outer: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) break outer;
            nestedBreakResults.push([i, j]);
        }
    }
    assert(nestedBreakResults.length === 4, "Labeled break should exit outer loop");

    // Nested loops with continue
    let nestedContinueResults = [];
    outer2: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (j === 1) continue outer2;
            nestedContinueResults.push([i, j]);
        }
    }
    assert(nestedContinueResults.length === 3, "Labeled continue should continue outer loop");

    console.log("✓ For loop break/continue tests passed");
}

// Test for-in loop
function testForInLoop() {
    // Basic object iteration
    let obj = { a: 1, b: 2, c: 3 };
    let keys = [];
    let values = [];
    for (let key in obj) {
        keys.push(key);
        values.push(obj[key]);
    }
    assert(keys.length === 3, "Should iterate over all object properties");
    assert(keys.includes('a') && keys.includes('b') && keys.includes('c'), "Should include all keys");

    // Array iteration (gets indices)
    let arr = ['x', 'y', 'z'];
    let indices = [];
    for (let index in arr) {
        indices.push(index);
    }
    assert(indices.length === 3, "Should iterate over array indices");
    assert(indices.includes('0') && indices.includes('1') && indices.includes('2'), "Indices should be strings");

    // Prototype properties
    function Parent() {}
    Parent.prototype.inherited = 'value';
    function Child() {
        this.own = 'ownValue';
    }
    Child.prototype = new Parent();

    let child = new Child();
    let allProps = [];
    let ownProps = [];

    for (let prop in child) {
        allProps.push(prop);
        if (child.hasOwnProperty(prop)) {
            ownProps.push(prop);
        }
    }

    assert(allProps.includes('inherited'), "Should include inherited properties");
    assert(allProps.includes('own'), "Should include own properties");
    assert(ownProps.length === 1 && ownProps[0] === 'own', "hasOwnProperty should filter inherited");

    // Empty object
    let emptyObj = {};
    let emptyKeys = [];
    for (let key in emptyObj) {
        emptyKeys.push(key);
    }
    assert(emptyKeys.length === 0, "Empty object should have no keys");

    console.log("✓ For-in loop tests passed");
}

// Test for-of loop
function testForOfLoop() {
    // Array iteration
    let arr = [10, 20, 30];
    let values = [];
    for (let value of arr) {
        values.push(value);
    }
    assert(values.length === 3, "Should iterate over array values");
    assert(values[0] === 10 && values[1] === 20 && values[2] === 30, "Should get actual values");

    // String iteration
    let str = "hello";
    let chars = [];
    for (let char of str) {
        chars.push(char);
    }
    assert(chars.length === 5, "Should iterate over string characters");
    assert(chars.join('') === "hello", "Should get all characters");

    // Set iteration
    let set = new Set([1, 2, 3]);
    let setValues = [];
    for (let value of set) {
        setValues.push(value);
    }
    assert(setValues.length === 3, "Should iterate over Set values");

    // Map iteration (gets [key, value] pairs)
    let map = new Map([['a', 1], ['b', 2]]);
    let mapEntries = [];
    for (let entry of map) {
        mapEntries.push(entry);
    }
    assert(mapEntries.length === 2, "Should iterate over Map entries");
    assert(Array.isArray(mapEntries[0]), "Map entries should be arrays");

    // Non-iterable object (should throw)
    let plainObj = { a: 1, b: 2 };
    assertThrows(() => {
        for (let value of plainObj) {
            // This should throw TypeError
        }
    }, "Plain object should not be iterable with for-of");

    // Empty iterable
    let emptyArr = [];
    let emptyValues = [];
    for (let value of emptyArr) {
        emptyValues.push(value);
    }
    assert(emptyValues.length === 0, "Empty array should iterate zero times");

    console.log("✓ For-of loop tests passed");
}

// Test nested for loops
function testNestedForLoops() {
    // Basic nested loops
    let matrix = [];
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = i * 3 + j;
        }
    }
    assert(matrix.length === 3, "Should create 3x3 matrix");
    assert(matrix[0][0] === 0 && matrix[2][2] === 8, "Matrix values should be correct");

    // Mixed loop types
    let mixedResults = [];
    let obj = { a: [1, 2], b: [3, 4] };
    for (let key in obj) {
        for (let value of obj[key]) {
            mixedResults.push([key, value]);
        }
    }
    assert(mixedResults.length === 4, "Mixed nested loops should work");

    // Triple nested
    let tripleSum = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
                tripleSum += i + j + k;
            }
        }
    }
    assert(tripleSum === 12, "Triple nested loop should sum correctly"); // 8 iterations of (0+0+0) to (1+1+1)

    console.log("✓ Nested for loop tests passed");
}

// Test for loop edge cases
function testForLoopEdgeCases() {
    // Loop with no body
    let counter = 0;
    for (let i = 0; i < 5; i++, counter++);
    assert(counter === 5, "Loop with no body should execute increment");

    // Loop with complex expressions
    let complexSum = 0;
    for (let i = 1, j = 1; i <= 5; i++, j *= 2) {
        complexSum += i * j;
    }
    assert(complexSum === 129, "Complex expression loop should work"); // 1*1 + 2*2 + 3*4 + 4*8 + 5*16 = 1+4+12+32+80 = 129

    // Loop with function calls in all parts
    function getStart() { return 0; }
    function checkEnd(x) { return x < 3; }
    function increment(x) { return x + 1; }

    let funcResults = [];
    for (let i = getStart(); checkEnd(i); i = increment(i)) {
        funcResults.push(i);
    }
    assert(funcResults.length === 3, "Function calls in for loop should work");

    // Loop with try-catch-finally
    let tryCatchResults = [];
    for (let i = 0; i < 5; i++) {
        try {
            if (i === 3) throw new Error("test");
            tryCatchResults.push(i);
        } catch (e) {
            tryCatchResults.push('error');
        } finally {
            tryCatchResults.push('finally');
        }
    }
    assert(tryCatchResults.length === 10, "Try-catch-finally in loop should work");

    // Loop with return in function
    function loopWithReturn() {
        for (let i = 0; i < 10; i++) {
            if (i === 3) return i;
        }
        return -1;
    }
    assert(loopWithReturn() === 3, "Return in for loop should work");

    console.log("✓ For loop edge cases tests passed");
}

// Test for-in loop edge cases
function testForInEdgeCases() {
    // Array with gaps
    let sparseArray = [];
    sparseArray[0] = 'a';
    sparseArray[2] = 'c';
    sparseArray[5] = 'f';

    let sparseKeys = [];
    for (let key in sparseArray) {
        sparseKeys.push(key);
    }
    assert(sparseKeys.length === 3, "Sparse array should only iterate existing indices");
    assert(!sparseKeys.includes('1'), "Missing indices should not be included");

    // Object with non-enumerable properties
    let objWithNonEnum = {};
    Object.defineProperty(objWithNonEnum, 'enumerable', { value: 1, enumerable: true });
    Object.defineProperty(objWithNonEnum, 'nonEnumerable', { value: 2, enumerable: false });

    let enumKeys = [];
    for (let key in objWithNonEnum) {
        enumKeys.push(key);
    }
    assert(enumKeys.length === 1 && enumKeys[0] === 'enumerable', "Should only iterate enumerable properties");

    // Modifying object during iteration
    let modifyObj = { a: 1, b: 2, c: 3 };
    let modifyKeys = [];
    for (let key in modifyObj) {
        modifyKeys.push(key);
        if (key === 'a') {
            delete modifyObj.b;
            modifyObj.d = 4;
        }
    }
    // Behavior is implementation-dependent, but should not crash
    assert(modifyKeys.length >= 2, "Modified object iteration should not crash");

    console.log("✓ For-in edge cases tests passed");
}

// Test for-of loop edge cases
function testForOfEdgeCases() {
    // Array-like object (should not work with for-of unless it has Symbol.iterator)
    let arrayLike = { 0: 'a', 1: 'b', length: 2 };
    assertThrows(() => {
        for (let value of arrayLike) {
            // Should throw
        }
    }, "Array-like object without iterator should throw");

    // Custom iterable object
    let customIterable = {
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    };

    let customValues = [];
    for (let value of customIterable) {
        customValues.push(value);
    }
    assert(customValues.length === 3, "Custom iterable should work");

    // Iterator that throws
    let throwingIterable = {
        *[Symbol.iterator]() {
            yield 1;
            throw new Error("Iterator error");
        }
    };

    assertThrows(() => {
        for (let value of throwingIterable) {
            // Should complete first iteration then throw
        }
    }, "Iterator that throws should propagate error");

    // Infinite iterator with break
    let infiniteIterable = {
        *[Symbol.iterator]() {
            let i = 0;
            while (true) {
                yield i++;
            }
        }
    };

    let infiniteValues = [];
    for (let value of infiniteIterable) {
        infiniteValues.push(value);
        if (value >= 2) break;
    }
    assert(infiniteValues.length === 3, "Infinite iterator with break should work");

    console.log("✓ For-of edge cases tests passed");
}

// Run all tests
function runAllTests() {
    console.log("Running For Loops comprehensive tests...\n");

    testBasicForLoop();
    testForLoopVariables();
    testForLoopConditions();
    testForLoopBreakContinue();
    testForInLoop();
    testForOfLoop();
    testNestedForLoops();
    testForLoopEdgeCases();
    testForInEdgeCases();
    testForOfEdgeCases();

    console.log("\n✅ All For Loops comprehensive tests passed!");
}

// Execute tests
runAllTests();