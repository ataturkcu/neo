/*
 * Neo JavaScript Engine WeakMap and WeakSet Tests
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

// Test WeakMap constructor
function testWeakMapConstructor() {
    // Basic constructor
    let weakMap1 = new WeakMap();
    assert(weakMap1 instanceof WeakMap, "Should be instance of WeakMap");

    // Constructor with iterable of object-value pairs
    let obj1 = {};
    let obj2 = {};
    let weakMap2 = new WeakMap([[obj1, 'value1'], [obj2, 'value2']]);
    assert(weakMap2.get(obj1) === 'value1', "WeakMap from pairs should work");
    assert(weakMap2.get(obj2) === 'value2', "WeakMap from pairs should work");

    // WeakMap cannot be constructed from another WeakMap (not iterable)
    assertThrows(() => new WeakMap(weakMap2), "WeakMap should not accept another WeakMap as argument");

    // Constructor with invalid key types (should throw)
    assertThrows(() => new WeakMap([['string', 'value']]), "WeakMap should reject primitive keys");
    assertThrows(() => new WeakMap([[42, 'value']]), "WeakMap should reject number keys");
    assertThrows(() => new WeakMap([[null, 'value']]), "WeakMap should reject null keys");
    assertThrows(() => new WeakMap([[undefined, 'value']]), "WeakMap should reject undefined keys");

    // Constructor with incomplete pairs (creates entry with undefined value)
    let weakMapWithIncomplete = new WeakMap([[obj1]]);
    assert(weakMapWithIncomplete.get(obj1) === undefined, "Incomplete pair should have undefined value");

    console.log("✓ WeakMap constructor tests passed");
}

// Test WeakMap.prototype.set
function testWeakMapSet() {
    let weakMap = new WeakMap();
    let obj1 = {};
    let obj2 = {};
    let func = function() {};
    let arr = [];

    // Basic set operations with object keys
    let result = weakMap.set(obj1, 'value1');
    assert(result === weakMap, "set should return the WeakMap instance");
    assert(weakMap.get(obj1) === 'value1', "Value should be retrievable");

    // Set with different object types
    weakMap.set(obj2, 'value2');
    weakMap.set(func, 'func_value');
    weakMap.set(arr, 'array_value');

    assert(weakMap.get(obj2) === 'value2', "Object key should work");
    assert(weakMap.get(func) === 'func_value', "Function key should work");
    assert(weakMap.get(arr) === 'array_value', "Array key should work");

    // Overwrite existing key
    weakMap.set(obj1, 'new_value');
    assert(weakMap.get(obj1) === 'new_value', "Value should be updated");

    // Test with primitive keys (should throw)
    assertThrows(() => weakMap.set('string', 'value'), "Should reject string key");
    assertThrows(() => weakMap.set(42, 'value'), "Should reject number key");
    assertThrows(() => weakMap.set(true, 'value'), "Should reject boolean key");
    assertThrows(() => weakMap.set(null, 'value'), "Should reject null key");
    assertThrows(() => weakMap.set(undefined, 'value'), "Should reject undefined key");
    // Symbol keys are actually allowed in WeakMap
    weakMap.set(Symbol('test'), 'symbol_value');
    // Note: We can't test retrieval as we don't have a reference to the symbol

    console.log("✓ WeakMap set tests passed");
}

// Test WeakMap.prototype.get
function testWeakMapGet() {
    let weakMap = new WeakMap();
    let obj1 = {};
    let obj2 = {};
    let obj3 = {};

    weakMap.set(obj1, 'value1');
    weakMap.set(obj2, 42);
    weakMap.set(obj3, null);

    // Basic get operations
    assert(weakMap.get(obj1) === 'value1', "Should get string value");
    assert(weakMap.get(obj2) === 42, "Should get number value");
    assert(weakMap.get(obj3) === null, "Should get null value");

    // Get non-existent key
    let obj4 = {};
    assert(weakMap.get(obj4) === undefined, "Non-existent key should return undefined");

    // Get with primitive keys (should return undefined, not throw)
    assert(weakMap.get('string') === undefined, "Primitive key should return undefined");
    assert(weakMap.get(42) === undefined, "Number key should return undefined");
    assert(weakMap.get(null) === undefined, "Null key should return undefined");

    console.log("✓ WeakMap get tests passed");
}

// Test WeakMap.prototype.has
function testWeakMapHas() {
    let weakMap = new WeakMap();
    let obj1 = {};
    let obj2 = {};

    weakMap.set(obj1, 'value1');

    // Basic has operations
    assert(weakMap.has(obj1) === true, "Should find existing object key");
    assert(weakMap.has(obj2) === false, "Should not find non-existent object key");

    // Has with different object instances
    let obj3 = {};
    assert(weakMap.has(obj3) === false, "Should not find different object instance");

    // Has with primitive keys (should return false, not throw)
    assert(weakMap.has('string') === false, "Primitive key should return false");
    assert(weakMap.has(42) === false, "Number key should return false");
    assert(weakMap.has(null) === false, "Null key should return false");
    assert(weakMap.has(undefined) === false, "Undefined key should return false");

    console.log("✓ WeakMap has tests passed");
}

// Test WeakMap.prototype.delete
function testWeakMapDelete() {
    let weakMap = new WeakMap();
    let obj1 = {};
    let obj2 = {};

    weakMap.set(obj1, 'value1');
    weakMap.set(obj2, 'value2');

    // Basic delete operations
    let result1 = weakMap.delete(obj1);
    assert(result1 === true, "delete should return true for existing key");
    assert(weakMap.has(obj1) === false, "Deleted key should not exist");
    assert(weakMap.get(obj1) === undefined, "Deleted key should return undefined");

    // Delete non-existent key
    let obj3 = {};
    let result2 = weakMap.delete(obj3);
    assert(result2 === false, "delete should return false for non-existent key");

    // Delete with primitive keys (should return false, not throw)
    assert(weakMap.delete('string') === false, "Primitive key delete should return false");
    assert(weakMap.delete(42) === false, "Number key delete should return false");
    assert(weakMap.delete(null) === false, "Null key delete should return false");

    // Verify remaining key still exists
    assert(weakMap.has(obj2) === true, "Remaining key should still exist");

    console.log("✓ WeakMap delete tests passed");
}

// Test WeakSet constructor
function testWeakSetConstructor() {
    // Basic constructor
    let weakSet1 = new WeakSet();
    assert(weakSet1 instanceof WeakSet, "Should be instance of WeakSet");

    // Constructor with iterable of objects
    let obj1 = {};
    let obj2 = {};
    let weakSet2 = new WeakSet([obj1, obj2]);
    assert(weakSet2.has(obj1), "WeakSet from array should contain objects");
    assert(weakSet2.has(obj2), "WeakSet from array should contain objects");

    // WeakSet cannot be constructed from another WeakSet (not iterable)
    assertThrows(() => new WeakSet(weakSet2), "WeakSet should not accept another WeakSet as argument");

    // Constructor with invalid value types (should throw)
    assertThrows(() => new WeakSet(['string']), "WeakSet should reject primitive values");
    assertThrows(() => new WeakSet([42]), "WeakSet should reject number values");
    assertThrows(() => new WeakSet([null]), "WeakSet should reject null values");
    assertThrows(() => new WeakSet([undefined]), "WeakSet should reject undefined values");

    console.log("✓ WeakSet constructor tests passed");
}

// Test WeakSet.prototype.add
function testWeakSetAdd() {
    let weakSet = new WeakSet();
    let obj1 = {};
    let obj2 = {};
    let func = function() {};
    let arr = [];

    // Basic add operations with object values
    let result = weakSet.add(obj1);
    assert(result === weakSet, "add should return the WeakSet instance");
    assert(weakSet.has(obj1), "Value should be in set");

    // Add different object types
    weakSet.add(obj2);
    weakSet.add(func);
    weakSet.add(arr);

    assert(weakSet.has(obj2), "Object value should work");
    assert(weakSet.has(func), "Function value should work");
    assert(weakSet.has(arr), "Array value should work");

    // Add duplicate value
    weakSet.add(obj1);
    assert(weakSet.has(obj1), "Duplicate add should not cause issues");

    // Test with primitive values (should throw)
    assertThrows(() => weakSet.add('string'), "Should reject string value");
    assertThrows(() => weakSet.add(42), "Should reject number value");
    assertThrows(() => weakSet.add(true), "Should reject boolean value");
    assertThrows(() => weakSet.add(null), "Should reject null value");
    assertThrows(() => weakSet.add(undefined), "Should reject undefined value");
    // Symbol values are actually allowed in WeakSet
    weakSet.add(Symbol('test'));
    // Note: We can't test membership as we don't have a reference to the symbol

    console.log("✓ WeakSet add tests passed");
}

// Test WeakSet.prototype.has
function testWeakSetHas() {
    let weakSet = new WeakSet();
    let obj1 = {};
    let obj2 = {};

    weakSet.add(obj1);

    // Basic has operations
    assert(weakSet.has(obj1) === true, "Should find existing object");
    assert(weakSet.has(obj2) === false, "Should not find non-existent object");

    // Has with different object instances
    let obj3 = {};
    assert(weakSet.has(obj3) === false, "Should not find different object instance");

    // Has with primitive values (should return false, not throw)
    assert(weakSet.has('string') === false, "Primitive value should return false");
    assert(weakSet.has(42) === false, "Number value should return false");
    assert(weakSet.has(null) === false, "Null value should return false");
    assert(weakSet.has(undefined) === false, "Undefined value should return false");

    console.log("✓ WeakSet has tests passed");
}

// Test WeakSet.prototype.delete
function testWeakSetDelete() {
    let weakSet = new WeakSet();
    let obj1 = {};
    let obj2 = {};

    weakSet.add(obj1);
    weakSet.add(obj2);

    // Basic delete operations
    let result1 = weakSet.delete(obj1);
    assert(result1 === true, "delete should return true for existing value");
    assert(weakSet.has(obj1) === false, "Deleted value should not exist");

    // Delete non-existent value
    let obj3 = {};
    let result2 = weakSet.delete(obj3);
    assert(result2 === false, "delete should return false for non-existent value");

    // Delete with primitive values (should return false, not throw)
    assert(weakSet.delete('string') === false, "Primitive value delete should return false");
    assert(weakSet.delete(42) === false, "Number value delete should return false");
    assert(weakSet.delete(null) === false, "Null value delete should return false");

    // Verify remaining value still exists
    assert(weakSet.has(obj2) === true, "Remaining value should still exist");

    console.log("✓ WeakSet delete tests passed");
}

// Test WeakMap vs Map differences
function testWeakMapVsMap() {
    let map = new Map();
    let weakMap = new WeakMap();
    let obj = {};

    // Map allows primitive keys
    map.set('string', 'value');
    map.set(42, 'value');
    map.set(obj, 'value');

    // WeakMap only allows object keys
    assertThrows(() => weakMap.set('string', 'value'), "WeakMap should reject primitive keys");
    weakMap.set(obj, 'value'); // This should work

    // Map is enumerable
    assert(typeof map.size === 'number', "Map should have size property");
    assert(typeof map.keys === 'function', "Map should have keys method");
    assert(typeof map.values === 'function', "Map should have values method");
    assert(typeof map.entries === 'function', "Map should have entries method");

    // WeakMap is not enumerable
    assert(weakMap.size === undefined, "WeakMap should not have size property");
    assert(weakMap.keys === undefined, "WeakMap should not have keys method");
    assert(weakMap.values === undefined, "WeakMap should not have values method");
    assert(weakMap.entries === undefined, "WeakMap should not have entries method");

    // Map has clear method
    assert(typeof map.clear === 'function', "Map should have clear method");

    // WeakMap does not have clear method
    assert(weakMap.clear === undefined, "WeakMap should not have clear method");

    console.log("✓ WeakMap vs Map comparison tests passed");
}

// Test WeakSet vs Set differences
function testWeakSetVsSet() {
    let set = new Set();
    let weakSet = new WeakSet();
    let obj = {};

    // Set allows primitive values
    set.add('string');
    set.add(42);
    set.add(obj);

    // WeakSet only allows object values
    assertThrows(() => weakSet.add('string'), "WeakSet should reject primitive values");
    weakSet.add(obj); // This should work

    // Set is enumerable
    assert(typeof set.size === 'number', "Set should have size property");
    assert(typeof set.values === 'function', "Set should have values method");
    assert(typeof set.keys === 'function', "Set should have keys method");
    assert(typeof set.entries === 'function', "Set should have entries method");

    // WeakSet is not enumerable
    assert(weakSet.size === undefined, "WeakSet should not have size property");
    assert(weakSet.values === undefined, "WeakSet should not have values method");
    assert(weakSet.keys === undefined, "WeakSet should not have keys method");
    assert(weakSet.entries === undefined, "WeakSet should not have entries method");

    // Set has clear method
    assert(typeof set.clear === 'function', "Set should have clear method");

    // WeakSet does not have clear method
    assert(weakSet.clear === undefined, "WeakSet should not have clear method");

    console.log("✓ WeakSet vs Set comparison tests passed");
}

// Test garbage collection behavior (conceptual)
function testGarbageCollectionBehavior() {
    // Note: Actual garbage collection testing is implementation-dependent
    // and cannot be reliably tested in pure JavaScript

    let weakMap = new WeakMap();
    let weakSet = new WeakSet();

    // Create objects that could be garbage collected
    function createTestObjects() {
        let obj1 = { id: 1 };
        let obj2 = { id: 2 };

        weakMap.set(obj1, 'temp_value1');
        weakMap.set(obj2, 'temp_value2');
        weakSet.add(obj1);
        weakSet.add(obj2);

        // Return one object to keep it referenced
        return obj1;
    }

    let keepAlive = createTestObjects();

    // At this point, obj2 from createTestObjects could be garbage collected
    // because there are no strong references to it outside the WeakMap/WeakSet

    assert(weakMap.has(keepAlive), "Referenced object should still be in WeakMap");
    assert(weakSet.has(keepAlive), "Referenced object should still be in WeakSet");

    console.log("WeakMap and WeakSet hold weak references - objects can be garbage collected");
    console.log("when no other strong references exist, unlike Map and Set");

    console.log("✓ Garbage collection behavior tests passed");
}

// Test edge cases
function testEdgeCases() {
    let weakMap = new WeakMap();
    let weakSet = new WeakSet();

    // Test with complex objects
    let date = new Date();
    let regex = /test/;
    let error = new Error('test');

    // WeakMap with complex objects
    weakMap.set(date, 'date_value');
    weakMap.set(regex, 'regex_value');
    weakMap.set(error, 'error_value');

    assert(weakMap.get(date) === 'date_value', "Date should work as WeakMap key");
    assert(weakMap.get(regex) === 'regex_value', "RegExp should work as WeakMap key");
    assert(weakMap.get(error) === 'error_value', "Error should work as WeakMap key");

    // WeakSet with complex objects
    weakSet.add(date);
    weakSet.add(regex);
    weakSet.add(error);

    assert(weakSet.has(date), "Date should work as WeakSet value");
    assert(weakSet.has(regex), "RegExp should work as WeakSet value");
    assert(weakSet.has(error), "Error should work as WeakSet value");

    // Test chaining
    let obj1 = {};
    let obj2 = {};
    let obj3 = {};

    let result = weakSet.add(obj1).add(obj2).add(obj3);
    assert(result === weakSet, "WeakSet add chaining should work");
    assert(weakSet.has(obj1) && weakSet.has(obj2) && weakSet.has(obj3), "Chained adds should work");

    // Test with same object in both WeakMap and WeakSet
    let sharedObj = {};
    weakMap.set(sharedObj, 'shared_value');
    weakSet.add(sharedObj);

    assert(weakMap.get(sharedObj) === 'shared_value', "Object should work in both collections");
    assert(weakSet.has(sharedObj), "Object should work in both collections");

    console.log("✓ Edge cases tests passed");
}

// Run all tests
function runAllTests() {
    console.log("Running WeakMap and WeakSet comprehensive tests...\n");

    testWeakMapConstructor();
    testWeakMapSet();
    testWeakMapGet();
    testWeakMapHas();
    testWeakMapDelete();
    testWeakSetConstructor();
    testWeakSetAdd();
    testWeakSetHas();
    testWeakSetDelete();
    testWeakMapVsMap();
    testWeakSetVsSet();
    testGarbageCollectionBehavior();
    testEdgeCases();

    console.log("\n✅ All WeakMap and WeakSet comprehensive tests passed!");
}

// Execute tests
runAllTests();