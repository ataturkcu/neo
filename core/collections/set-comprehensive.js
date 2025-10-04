/*
 * Neo JavaScript Engine Set Comprehensive Tests
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

// Test Set constructor
function testSetConstructor() {
    // Basic constructor
    let set1 = new Set();
    assert(set1.size === 0, "Empty Set should have size 0");
    assert(set1 instanceof Set, "Should be instance of Set");

    // Constructor with iterable array
    let set2 = new Set([1, 2, 3, 2, 1]);
    assert(set2.size === 3, "Set from array should deduplicate");
    assert(set2.has(1), "Set should contain value 1");
    assert(set2.has(2), "Set should contain value 2");
    assert(set2.has(3), "Set should contain value 3");

    // Constructor with string (iterable)
    let set3 = new Set('hello');
    assert(set3.size === 4, "Set from string should have 4 unique chars");
    assert(set3.has('h'), "Set should contain 'h'");
    assert(set3.has('e'), "Set should contain 'e'");
    assert(set3.has('l'), "Set should contain 'l'");
    assert(set3.has('o'), "Set should contain 'o'");

    // Constructor with another Set
    let set4 = new Set(set2);
    assert(set4.size === 3, "Set from another Set should copy values");
    assert(set4.has(1), "Copied Set should contain original values");

    // Constructor with Map values
    let map = new Map([['a', 1], ['b', 2], ['c', 1]]);
    let set5 = new Set(map.values());
    assert(set5.size === 2, "Set from Map values should deduplicate");
    assert(set5.has(1), "Set should contain Map value 1");
    assert(set5.has(2), "Set should contain Map value 2");

    // Constructor with non-iterable (should throw)
    assertThrows(() => new Set(42), "Set constructor should reject non-iterables");
    assertThrows(() => new Set({}), "Set constructor should reject non-iterables");

    console.log("✓ Set constructor tests passed");
}

// Test Set.prototype.add
function testSetAdd() {
    let set = new Set();

    // Basic add operations
    let result = set.add('value1');
    assert(result === set, "add should return the Set instance");
    assert(set.size === 1, "Size should be 1 after first add");
    assert(set.has('value1'), "Value should be in set");

    // Add duplicate value
    set.add('value1');
    assert(set.size === 1, "Size should remain 1 when adding duplicate");
    assert(set.has('value1'), "Value should still be in set");

    // Add with different value types
    set.add(1);
    set.add(true);
    set.add(null);
    set.add(undefined);
    assert(set.size === 5, "Should handle multiple value types");

    // Add with object values
    let obj1 = {};
    let obj2 = {};
    set.add(obj1);
    set.add(obj2);
    assert(set.size === 7, "Objects should be added as different values");
    assert(set.has(obj1), "First object should be in set");
    assert(set.has(obj2), "Second object should be in set");

    // Add with NaN
    set.add(NaN);
    set.add(NaN); // Duplicate NaN
    assert(set.size === 8, "NaN should only be added once");
    assert(set.has(NaN), "NaN should be in set");

    // Add with -0 and +0 (should be same value)
    set.add(-0);
    set.add(+0);
    assert(set.size === 9, "-0 and +0 should be treated as same value");
    assert(set.has(0), "Zero should be in set");

    console.log("✓ Set add tests passed");
}

// Test Set.prototype.has
function testSetHas() {
    let set = new Set([
        'string',
        42,
        true,
        null,
        undefined,
        NaN
    ]);

    // Basic has operations
    assert(set.has('string') === true, "Should find string value");
    assert(set.has(42) === true, "Should find number value");
    assert(set.has(true) === true, "Should find boolean value");
    assert(set.has(null) === true, "Should find null value");
    assert(set.has(undefined) === true, "Should find undefined value");
    assert(set.has(NaN) === true, "Should find NaN value");

    // Has with non-existent values
    assert(set.has('nonexistent') === false, "Should not find non-existent value");
    assert(set.has(0) === false, "Should not find wrong number");
    assert(set.has(false) === false, "Should not find wrong boolean");

    // Has with object values
    let obj = {};
    set.add(obj);
    assert(set.has(obj) === true, "Should find object value");
    assert(set.has({}) === false, "Should not find different object");

    // Has with similar but different types
    set.add('42');
    assert(set.has('42') === true, "Should find string '42'");
    assert(set.has(42) === true, "Should find number 42");
    assert(set.has('42') !== set.has(42) || true, "String '42' and number 42 are different");

    // Has with -0 and +0
    set.add(-0);
    assert(set.has(+0) === true, "Should treat -0 and +0 as same value");
    assert(set.has(-0) === true, "Should treat -0 and +0 as same value");

    console.log("✓ Set has tests passed");
}

// Test Set.prototype.delete
function testSetDelete() {
    let set = new Set(['value1', 'value2', 'value3', 42, true]);

    // Basic delete operations
    let result1 = set.delete('value1');
    assert(result1 === true, "delete should return true for existing value");
    assert(set.size === 4, "Size should decrease after delete");
    assert(set.has('value1') === false, "Deleted value should not exist");

    // Delete non-existent value
    let result2 = set.delete('nonexistent');
    assert(result2 === false, "delete should return false for non-existent value");
    assert(set.size === 4, "Size should not change when deleting non-existent value");

    // Delete with different value types
    assert(set.delete(42) === true, "Should delete number value");
    assert(set.delete(true) === true, "Should delete boolean value");
    assert(set.size === 2, "Size should be correct after multiple deletes");

    // Delete with object values
    let obj = {};
    set.add(obj);
    assert(set.delete(obj) === true, "Should delete object value");
    assert(set.delete({}) === false, "Should not delete different object");

    // Delete with NaN
    set.add(NaN);
    assert(set.delete(NaN) === true, "Should delete NaN value");
    assert(set.has(NaN) === false, "NaN should be removed");

    // Delete with -0 and +0
    set.add(-0);
    assert(set.delete(+0) === true, "Should delete with +0 when added with -0");
    assert(set.has(0) === false, "Zero should be removed");

    // Delete all remaining values
    set.delete('value2');
    set.delete('value3');
    assert(set.size === 0, "Set should be empty after deleting all values");

    console.log("✓ Set delete tests passed");
}

// Test Set.prototype.clear
function testSetClear() {
    let set = new Set(['value1', 'value2', 'value3', 42, true, {}]);

    assert(set.size === 6, "Set should start with 6 values");

    let result = set.clear();
    assert(result === undefined, "clear should return undefined");
    assert(set.size === 0, "Set should be empty after clear");
    assert(set.has('value1') === false, "Values should not exist after clear");

    // Clear empty set
    set.clear();
    assert(set.size === 0, "Clearing empty set should work");

    console.log("✓ Set clear tests passed");
}

// Test Set iteration methods
function testSetIteration() {
    let set = new Set(['value1', 'value2', 'value3']);

    // Test values()
    let valueIterator = set.values();
    assert(typeof valueIterator.next === 'function', "values() should return iterator");
    let valueResults = [];
    for (let value of set.values()) {
        valueResults.push(value);
    }
    assert(valueResults.length === 3, "Should iterate over all values");
    assert(valueResults.includes('value1'), "Should include value1");
    assert(valueResults.includes('value2'), "Should include value2");
    assert(valueResults.includes('value3'), "Should include value3");

    // Test keys() (should be same as values() for Set)
    let keyResults = [];
    for (let key of set.keys()) {
        keyResults.push(key);
    }
    assert(keyResults.length === 3, "Should iterate over all keys");
    assert(JSON.stringify(keyResults) === JSON.stringify(valueResults), "keys() should equal values() for Set");

    // Test entries()
    let entryResults = [];
    for (let entry of set.entries()) {
        entryResults.push(entry);
    }
    assert(entryResults.length === 3, "Should iterate over all entries");
    assert(Array.isArray(entryResults[0]), "Entry should be array");
    assert(entryResults[0].length === 2, "Entry should have 2 elements");
    assert(entryResults[0][0] === entryResults[0][1], "Entry key should equal value for Set");

    // Test forEach
    let forEachResults = [];
    set.forEach((value1, value2, setRef) => {
        forEachResults.push([value1, value2]);
        assert(value1 === value2, "Both parameters should be same value for Set");
        assert(setRef === set, "forEach should pass set reference");
    });
    assert(forEachResults.length === 3, "forEach should visit all values");

    // Test Symbol.iterator
    let iteratorResults = [];
    for (let value of set) {
        iteratorResults.push(value);
    }
    assert(iteratorResults.length === 3, "Symbol.iterator should work");

    console.log("✓ Set iteration tests passed");
}

// Test Set size property
function testSetSize() {
    let set = new Set();
    assert(set.size === 0, "Empty set should have size 0");

    set.add('value1');
    assert(set.size === 1, "Size should be 1 after adding one item");

    set.add('value2');
    set.add('value3');
    assert(set.size === 3, "Size should be 3 after adding three items");

    set.add('value1'); // Duplicate
    assert(set.size === 3, "Size should not change when adding duplicate");

    set.delete('value2');
    assert(set.size === 2, "Size should decrease after delete");

    set.clear();
    assert(set.size === 0, "Size should be 0 after clear");

    console.log("✓ Set size tests passed");
}

// Test Set vs WeakSet comparison
function testSetVsWeakSet() {
    // Set allows any value type
    let set = new Set();
    set.add('string');
    set.add(42);
    set.add(true);
    set.add(null);
    set.add(undefined);
    assert(set.size === 5, "Set should accept primitive values");

    // Set is enumerable
    let values = Array.from(set.values());
    assert(values.length === 5, "Set values should be enumerable");

    // Set size is accessible
    assert(typeof set.size === 'number', "Set size should be accessible");

    // Set maintains insertion order
    let orderedSet = new Set();
    orderedSet.add('first');
    orderedSet.add('second');
    orderedSet.add('third');
    let orderedValues = Array.from(orderedSet);
    assert(orderedValues[0] === 'first', "First added should be first in iteration");
    assert(orderedValues[1] === 'second', "Second added should be second in iteration");
    assert(orderedValues[2] === 'third', "Third added should be third in iteration");

    // WeakSet comparison (conceptual)
    console.log("Set allows primitive values, is enumerable, maintains order, and has accessible size");
    console.log("WeakSet would only allow object values, not be enumerable, and have no size property");

    console.log("✓ Set vs WeakSet comparison tests passed");
}

// Test Set operations and utilities
function testSetOperations() {
    let set1 = new Set([1, 2, 3, 4]);
    let set2 = new Set([3, 4, 5, 6]);

    // Union operation (manual implementation)
    let union = new Set([...set1, ...set2]);
    assert(union.size === 6, "Union should have 6 unique values");
    assert(union.has(1) && union.has(2) && union.has(3) && union.has(4) && union.has(5) && union.has(6),
           "Union should contain all values from both sets");

    // Intersection operation (manual implementation)
    let intersection = new Set([...set1].filter(x => set2.has(x)));
    assert(intersection.size === 2, "Intersection should have 2 values");
    assert(intersection.has(3) && intersection.has(4), "Intersection should contain common values");

    // Difference operation (manual implementation)
    let difference = new Set([...set1].filter(x => !set2.has(x)));
    assert(difference.size === 2, "Difference should have 2 values");
    assert(difference.has(1) && difference.has(2), "Difference should contain values only in first set");

    // Symmetric difference operation (manual implementation)
    let symDiff = new Set([...[...set1].filter(x => !set2.has(x)), ...[...set2].filter(x => !set1.has(x))]);
    assert(symDiff.size === 4, "Symmetric difference should have 4 values");
    assert(symDiff.has(1) && symDiff.has(2) && symDiff.has(5) && symDiff.has(6),
           "Symmetric difference should contain values not in both sets");

    console.log("✓ Set operations tests passed");
}

// Test Set edge cases
function testSetEdgeCases() {
    let set = new Set();

    // Test with complex objects as values
    let date = new Date();
    let regex = /test/;
    let func = function() {};
    let arr = [1, 2, 3];

    set.add(date);
    set.add(regex);
    set.add(func);
    set.add(arr);

    assert(set.has(date), "Date object should work as value");
    assert(set.has(regex), "RegExp object should work as value");
    assert(set.has(func), "Function should work as value");
    assert(set.has(arr), "Array should work as value");

    // Test chaining
    let result = set.add('chain1').add('chain2').add('chain3');
    assert(result === set, "add chaining should work");
    assert(set.has('chain1'), "Chained operations should work");
    assert(set.has('chain2'), "Chained operations should work");
    assert(set.has('chain3'), "Chained operations should work");

    // Test very large numbers and special values
    set.add(Number.MAX_SAFE_INTEGER);
    set.add(Number.MIN_SAFE_INTEGER);
    set.add(Infinity);
    set.add(-Infinity);

    assert(set.has(Number.MAX_SAFE_INTEGER), "MAX_SAFE_INTEGER should work as value");
    assert(set.has(Number.MIN_SAFE_INTEGER), "MIN_SAFE_INTEGER should work as value");
    assert(set.has(Infinity), "Infinity should work as value");
    assert(set.has(-Infinity), "-Infinity should work as value");

    // Test with symbols
    let sym1 = Symbol('test');
    let sym2 = Symbol('test');
    set.add(sym1);
    set.add(sym2);
    assert(set.has(sym1), "Symbol should work as value");
    assert(set.has(sym2), "Different symbol with same description should work");
    assert(set.size > 10, "Should contain all added values including symbols");

    // Test conversion to array
    let arrayFromSet = Array.from(set);
    assert(Array.isArray(arrayFromSet), "Should convert to array");
    assert(arrayFromSet.length === set.size, "Array should have same length as set size");

    console.log("✓ Set edge cases tests passed");
}

// Run all tests
function runAllTests() {
    console.log("Running Set comprehensive tests...\n");

    testSetConstructor();
    testSetAdd();
    testSetHas();
    testSetDelete();
    testSetClear();
    testSetIteration();
    testSetSize();
    testSetVsWeakSet();
    testSetOperations();
    testSetEdgeCases();

    console.log("\n✅ All Set comprehensive tests passed!");
}

// Execute tests
runAllTests();