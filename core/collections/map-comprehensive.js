/*
 * Neo JavaScript Engine Map Comprehensive Tests
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

// Test Map constructor
function testMapConstructor() {
    // Basic constructor
    let map1 = new Map();
    assert(map1.size === 0, "Empty Map should have size 0");
    assert(map1 instanceof Map, "Should be instance of Map");

    // Constructor with iterable
    let map2 = new Map([['a', 1], ['b', 2], ['c', 3]]);
    assert(map2.size === 3, "Map from array should have size 3");
    assert(map2.get('a') === 1, "Map should contain correct values");
    assert(map2.get('b') === 2, "Map should contain correct values");
    assert(map2.get('c') === 3, "Map should contain correct values");

    // Constructor with another Map
    let map3 = new Map(map2);
    assert(map3.size === 3, "Map from another Map should have size 3");
    assert(map3.get('a') === 1, "Map should copy values correctly");

    // Constructor with Set (should fail)
    let set = new Set(['a', 'b']);
    assertThrows(() => new Map(set), "Map constructor should reject non-pair iterables");

    // Constructor with incomplete pairs (creates entry with undefined value)
    let mapWithIncomplete = new Map([['a'], ['b', 2]]);
    assert(mapWithIncomplete.size === 2, "Map should create entries for incomplete pairs");
    assert(mapWithIncomplete.get('a') === undefined, "Incomplete pair should have undefined value");
    assert(mapWithIncomplete.get('b') === 2, "Map should process valid pairs");

    console.log("✓ Map constructor tests passed");
}

// Test Map.prototype.set
function testMapSet() {
    let map = new Map();

    // Basic set operations
    let result = map.set('key1', 'value1');
    assert(result === map, "set should return the Map instance");
    assert(map.size === 1, "Size should be 1 after first set");
    assert(map.get('key1') === 'value1', "Value should be retrievable");

    // Overwrite existing key
    map.set('key1', 'newValue');
    assert(map.size === 1, "Size should remain 1 when overwriting");
    assert(map.get('key1') === 'newValue', "Value should be updated");

    // Set with different key types
    map.set(1, 'number key');
    map.set(true, 'boolean key');
    map.set(null, 'null key');
    map.set(undefined, 'undefined key');
    assert(map.size === 5, "Should handle multiple key types");

    // Set with object keys
    let obj1 = {};
    let obj2 = {};
    map.set(obj1, 'first object');
    map.set(obj2, 'second object');
    assert(map.get(obj1) === 'first object', "Object keys should work");
    assert(map.get(obj2) === 'second object', "Different objects should be different keys");

    // Set with NaN key
    map.set(NaN, 'NaN value');
    assert(map.get(NaN) === 'NaN value', "NaN should work as key");

    // Set with -0 and +0 (should be same key)
    map.set(-0, 'zero value');
    map.set(+0, 'positive zero');
    assert(map.get(0) === 'positive zero', "-0 and +0 should be same key");

    console.log("✓ Map set tests passed");
}

// Test Map.prototype.get
function testMapGet() {
    let map = new Map([
        ['string', 'str_value'],
        [42, 'num_value'],
        [true, 'bool_value'],
        [null, 'null_value'],
        [undefined, 'undef_value']
    ]);

    // Basic get operations
    assert(map.get('string') === 'str_value', "Should get string key");
    assert(map.get(42) === 'num_value', "Should get number key");
    assert(map.get(true) === 'bool_value', "Should get boolean key");
    assert(map.get(null) === 'null_value', "Should get null key");
    assert(map.get(undefined) === 'undef_value', "Should get undefined key");

    // Get non-existent key
    assert(map.get('nonexistent') === undefined, "Non-existent key should return undefined");
    assert(map.get(0) === undefined, "Wrong number should return undefined");
    assert(map.get(false) === undefined, "Wrong boolean should return undefined");

    // Get with object keys
    let obj = {};
    map.set(obj, 'object_value');
    assert(map.get(obj) === 'object_value', "Should get with object key");
    assert(map.get({}) === undefined, "Different object should return undefined");

    // Get with NaN
    map.set(NaN, 'nan_value');
    assert(map.get(NaN) === 'nan_value', "Should get with NaN key");

    console.log("✓ Map get tests passed");
}

// Test Map.prototype.has
function testMapHas() {
    let map = new Map([
        ['string', 'value'],
        [42, 'value'],
        [true, 'value'],
        [null, 'value'],
        [undefined, 'value']
    ]);

    // Basic has operations
    assert(map.has('string') === true, "Should find string key");
    assert(map.has(42) === true, "Should find number key");
    assert(map.has(true) === true, "Should find boolean key");
    assert(map.has(null) === true, "Should find null key");
    assert(map.has(undefined) === true, "Should find undefined key");

    // Has with non-existent keys
    assert(map.has('nonexistent') === false, "Should not find non-existent key");
    assert(map.has(0) === false, "Should not find wrong number");
    assert(map.has(false) === false, "Should not find wrong boolean");

    // Has with object keys
    let obj = {};
    map.set(obj, 'value');
    assert(map.has(obj) === true, "Should find object key");
    assert(map.has({}) === false, "Should not find different object");

    // Has with NaN
    map.set(NaN, 'value');
    assert(map.has(NaN) === true, "Should find NaN key");

    // Has with -0 and +0
    map.set(-0, 'value');
    assert(map.has(+0) === true, "Should treat -0 and +0 as same key");

    console.log("✓ Map has tests passed");
}

// Test Map.prototype.delete
function testMapDelete() {
    let map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3']
    ]);

    // Basic delete operations
    let result1 = map.delete('key1');
    assert(result1 === true, "delete should return true for existing key");
    assert(map.size === 2, "Size should decrease after delete");
    assert(map.has('key1') === false, "Deleted key should not exist");

    // Delete non-existent key
    let result2 = map.delete('nonexistent');
    assert(result2 === false, "delete should return false for non-existent key");
    assert(map.size === 2, "Size should not change when deleting non-existent key");

    // Delete with different key types
    map.set(42, 'number');
    map.set(true, 'boolean');
    let obj = {};
    map.set(obj, 'object');

    assert(map.delete(42) === true, "Should delete number key");
    assert(map.delete(true) === true, "Should delete boolean key");
    assert(map.delete(obj) === true, "Should delete object key");

    // Delete with NaN
    map.set(NaN, 'nan_value');
    assert(map.delete(NaN) === true, "Should delete NaN key");

    // Delete all remaining keys
    map.delete('key2');
    map.delete('key3');
    assert(map.size === 0, "Map should be empty after deleting all keys");

    console.log("✓ Map delete tests passed");
}

// Test Map.prototype.clear
function testMapClear() {
    let map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3']
    ]);

    assert(map.size === 3, "Map should start with 3 entries");

    let result = map.clear();
    assert(result === undefined, "clear should return undefined");
    assert(map.size === 0, "Map should be empty after clear");
    assert(map.has('key1') === false, "Keys should not exist after clear");
    assert(map.get('key1') === undefined, "Values should not be retrievable after clear");

    // Clear empty map
    map.clear();
    assert(map.size === 0, "Clearing empty map should work");

    console.log("✓ Map clear tests passed");
}

// Test Map iteration methods
function testMapIteration() {
    let map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3']
    ]);

    // Test keys()
    let keyIterator = map.keys();
    assert(typeof keyIterator.next === 'function', "keys() should return iterator");
    let keyResults = [];
    for (let key of map.keys()) {
        keyResults.push(key);
    }
    assert(keyResults.length === 3, "Should iterate over all keys");
    assert(keyResults.includes('key1'), "Should include key1");
    assert(keyResults.includes('key2'), "Should include key2");
    assert(keyResults.includes('key3'), "Should include key3");

    // Test values()
    let valueResults = [];
    for (let value of map.values()) {
        valueResults.push(value);
    }
    assert(valueResults.length === 3, "Should iterate over all values");
    assert(valueResults.includes('value1'), "Should include value1");
    assert(valueResults.includes('value2'), "Should include value2");
    assert(valueResults.includes('value3'), "Should include value3");

    // Test entries()
    let entryResults = [];
    for (let entry of map.entries()) {
        entryResults.push(entry);
    }
    assert(entryResults.length === 3, "Should iterate over all entries");
    assert(Array.isArray(entryResults[0]), "Entry should be array");
    assert(entryResults[0].length === 2, "Entry should have 2 elements");

    // Test forEach
    let forEachResults = [];
    map.forEach((value, key, mapRef) => {
        forEachResults.push([key, value]);
        assert(mapRef === map, "forEach should pass map reference");
    });
    assert(forEachResults.length === 3, "forEach should visit all entries");

    // Test Symbol.iterator
    let iteratorResults = [];
    for (let [key, value] of map) {
        iteratorResults.push([key, value]);
    }
    assert(iteratorResults.length === 3, "Symbol.iterator should work");

    console.log("✓ Map iteration tests passed");
}

// Test Map size property
function testMapSize() {
    let map = new Map();
    assert(map.size === 0, "Empty map should have size 0");

    map.set('key1', 'value1');
    assert(map.size === 1, "Size should be 1 after adding one item");

    map.set('key2', 'value2');
    map.set('key3', 'value3');
    assert(map.size === 3, "Size should be 3 after adding three items");

    map.set('key1', 'newvalue');
    assert(map.size === 3, "Size should not change when updating existing key");

    map.delete('key2');
    assert(map.size === 2, "Size should decrease after delete");

    map.clear();
    assert(map.size === 0, "Size should be 0 after clear");

    console.log("✓ Map size tests passed");
}

// Test Map vs WeakMap comparison
function testMapVsWeakMap() {
    // Map allows any key type
    let map = new Map();
    map.set('string', 1);
    map.set(42, 2);
    map.set(true, 3);
    map.set(null, 4);
    map.set(undefined, 5);
    assert(map.size === 5, "Map should accept primitive keys");

    // Map is enumerable
    let keys = Array.from(map.keys());
    assert(keys.length === 5, "Map keys should be enumerable");

    // Map size is accessible
    assert(typeof map.size === 'number', "Map size should be accessible");

    // WeakMap only allows object keys (conceptual test)
    // Note: Actual WeakMap testing would require garbage collection simulation
    console.log("Map allows primitive keys, is enumerable, and has accessible size");
    console.log("WeakMap would only allow object keys, not be enumerable, and have no size property");

    console.log("✓ Map vs WeakMap comparison tests passed");
}

// Test Map edge cases
function testMapEdgeCases() {
    let map = new Map();

    // Test with complex objects as keys
    let date = new Date();
    let regex = /test/;
    let func = function() {};
    let arr = [1, 2, 3];

    map.set(date, 'date_value');
    map.set(regex, 'regex_value');
    map.set(func, 'func_value');
    map.set(arr, 'array_value');

    assert(map.get(date) === 'date_value', "Date object should work as key");
    assert(map.get(regex) === 'regex_value', "RegExp object should work as key");
    assert(map.get(func) === 'func_value', "Function should work as key");
    assert(map.get(arr) === 'array_value', "Array should work as key");

    // Test chaining
    let result = map.set('chain1', 1).set('chain2', 2).set('chain3', 3);
    assert(result === map, "set chaining should work");
    assert(map.get('chain1') === 1, "Chained operations should work");
    assert(map.get('chain2') === 2, "Chained operations should work");
    assert(map.get('chain3') === 3, "Chained operations should work");

    // Test very large numbers
    map.set(Number.MAX_SAFE_INTEGER, 'max_safe');
    map.set(Number.MIN_SAFE_INTEGER, 'min_safe');
    map.set(Infinity, 'infinity');
    map.set(-Infinity, 'neg_infinity');

    assert(map.get(Number.MAX_SAFE_INTEGER) === 'max_safe', "MAX_SAFE_INTEGER should work as key");
    assert(map.get(Number.MIN_SAFE_INTEGER) === 'min_safe', "MIN_SAFE_INTEGER should work as key");
    assert(map.get(Infinity) === 'infinity', "Infinity should work as key");
    assert(map.get(-Infinity) === 'neg_infinity', "-Infinity should work as key");

    console.log("✓ Map edge cases tests passed");
}

// Run all tests
function runAllTests() {
    console.log("Running Map comprehensive tests...\n");

    testMapConstructor();
    testMapSet();
    testMapGet();
    testMapHas();
    testMapDelete();
    testMapClear();
    testMapIteration();
    testMapSize();
    testMapVsWeakMap();
    testMapEdgeCases();

    console.log("\n✅ All Map comprehensive tests passed!");
}

// Execute tests
runAllTests();