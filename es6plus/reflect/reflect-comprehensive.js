/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Reflect API and Meta-programming
 */

// Test 1-5: Reflect.get basic functionality
var target1 = { prop: 'value', nested: { deep: 'data' } };
if (Reflect.get(target1, 'prop') !== 'value') throw new Error("Reflect.get should return property value");
if (Reflect.get(target1, 'missing') !== undefined) throw new Error("Reflect.get should return undefined for missing properties");
if (Reflect.get(target1.nested, 'deep') !== 'data') throw new Error("Reflect.get should work with nested objects");

var symbolProp = Symbol('test');
target1[symbolProp] = 'symbol-value';
if (Reflect.get(target1, symbolProp) !== 'symbol-value') throw new Error("Reflect.get should work with symbol properties");

var receiver = {};
var getterObj = {
    get computed() { return this; }
};
if (Reflect.get(getterObj, 'computed', receiver) !== receiver) throw new Error("Reflect.get should use provided receiver for getters");

// Test 6-10: Reflect.set basic functionality
var target2 = {};
if (!Reflect.set(target2, 'prop', 'value')) throw new Error("Reflect.set should return true on success");
if (target2.prop !== 'value') throw new Error("Reflect.set should set property on target");

if (Reflect.set(target2, symbolProp, 'symbol-set') !== true) throw new Error("Reflect.set should work with symbols");
if (target2[symbolProp] !== 'symbol-set') throw new Error("Reflect.set should set symbol properties");

var setterTarget = {};
var setterObj = {
    set computed(value) { setterTarget.value = value; }
};
if (!Reflect.set(setterObj, 'computed', 'test', setterTarget)) throw new Error("Reflect.set should invoke setters with receiver");
if (setterTarget.value !== 'test') throw new Error("Reflect.set should bind setter to receiver");

var readOnlyTarget = {};
Object.defineProperty(readOnlyTarget, 'readonly', { value: 'immutable', writable: false });
if (Reflect.set(readOnlyTarget, 'readonly', 'changed')) throw new Error("Reflect.set should return false for non-writable properties");

// Test 11-15: Reflect.has functionality
var target3 = { existing: true };
Object.defineProperty(target3, 'nonEnum', { value: true, enumerable: false });
target3[symbolProp] = true;

if (!Reflect.has(target3, 'existing')) throw new Error("Reflect.has should return true for existing properties");
if (Reflect.has(target3, 'missing')) throw new Error("Reflect.has should return false for missing properties");
if (!Reflect.has(target3, 'nonEnum')) throw new Error("Reflect.has should return true for non-enumerable properties");
if (!Reflect.has(target3, symbolProp)) throw new Error("Reflect.has should work with symbol properties");

var prototypeTarget = Object.create({ inherited: true });
prototypeTarget.own = true;
if (!Reflect.has(prototypeTarget, 'inherited')) throw new Error("Reflect.has should work with inherited properties");

// Test 16-20: Reflect.deleteProperty functionality
var target4 = { deletable: true, permanent: true };
Object.defineProperty(target4, 'nonConfigurable', { value: true, configurable: false });

if (!Reflect.deleteProperty(target4, 'deletable')) throw new Error("Reflect.deleteProperty should return true on success");
if ('deletable' in target4) throw new Error("Reflect.deleteProperty should delete the property");

if (Reflect.deleteProperty(target4, 'nonConfigurable')) throw new Error("Reflect.deleteProperty should return false for non-configurable properties");
if (!('nonConfigurable' in target4)) throw new Error("Reflect.deleteProperty should not delete non-configurable properties");

target4[symbolProp] = true;
if (!Reflect.deleteProperty(target4, symbolProp)) throw new Error("Reflect.deleteProperty should work with symbols");
if (symbolProp in target4) throw new Error("Reflect.deleteProperty should delete symbol properties");

// Test 21-25: Reflect.defineProperty functionality
var target5 = {};
var descriptor = { value: 'test', writable: true, enumerable: true, configurable: true };

if (!Reflect.defineProperty(target5, 'prop', descriptor)) throw new Error("Reflect.defineProperty should return true on success");
if (target5.prop !== 'test') throw new Error("Reflect.defineProperty should define the property");

var getterDescriptor = {
    get: function() { return 'getter-value'; },
    enumerable: true,
    configurable: true
};
if (!Reflect.defineProperty(target5, 'getter', getterDescriptor)) throw new Error("Reflect.defineProperty should work with getters");
if (target5.getter !== 'getter-value') throw new Error("Reflect.defineProperty should create working getters");

if (!Reflect.defineProperty(target5, symbolProp, { value: 'symbol-define' })) throw new Error("Reflect.defineProperty should work with symbols");
if (target5[symbolProp] !== 'symbol-define') throw new Error("Reflect.defineProperty should define symbol properties");

var nonExtensible = {};
Object.preventExtensions(nonExtensible);
if (Reflect.defineProperty(nonExtensible, 'newProp', { value: 'test' })) throw new Error("Reflect.defineProperty should return false on non-extensible objects");

// Test 26-30: Reflect.getOwnPropertyDescriptor functionality
var target6 = {};
Object.defineProperty(target6, 'configurable', { value: 'test', configurable: true, enumerable: true, writable: false });
Object.defineProperty(target6, 'accessor', {
    get: function() { return 'accessor'; },
    set: function(v) { this._accessor = v; },
    enumerable: false,
    configurable: true
});

var desc1 = Reflect.getOwnPropertyDescriptor(target6, 'configurable');
if (!desc1 || desc1.value !== 'test' || desc1.writable !== false) throw new Error("Reflect.getOwnPropertyDescriptor should return correct data descriptor");

var desc2 = Reflect.getOwnPropertyDescriptor(target6, 'accessor');
if (!desc2 || typeof desc2.get !== 'function' || desc2.enumerable !== false) throw new Error("Reflect.getOwnPropertyDescriptor should return correct accessor descriptor");

var desc3 = Reflect.getOwnPropertyDescriptor(target6, 'missing');
if (desc3 !== undefined) throw new Error("Reflect.getOwnPropertyDescriptor should return undefined for missing properties");

target6[symbolProp] = 'symbol-desc';
var desc4 = Reflect.getOwnPropertyDescriptor(target6, symbolProp);
if (!desc4 || desc4.value !== 'symbol-desc') throw new Error("Reflect.getOwnPropertyDescriptor should work with symbols");

// Test 31-35: Reflect.ownKeys functionality
var target7 = { a: 1, b: 2 };
Object.defineProperty(target7, 'nonEnum', { value: 3, enumerable: false });
var symbolKey1 = Symbol('key1');
var symbolKey2 = Symbol('key2');
target7[symbolKey1] = 'symbol1';
target7[symbolKey2] = 'symbol2';

var ownKeys = Reflect.ownKeys(target7);
if (ownKeys.indexOf('a') === -1 || ownKeys.indexOf('b') === -1) throw new Error("Reflect.ownKeys should include enumerable string keys");
if (ownKeys.indexOf('nonEnum') === -1) throw new Error("Reflect.ownKeys should include non-enumerable string keys");
if (ownKeys.indexOf(symbolKey1) === -1 || ownKeys.indexOf(symbolKey2) === -1) throw new Error("Reflect.ownKeys should include symbol keys");

var arrayTarget = [1, 2, 3];
var arrayKeys = Reflect.ownKeys(arrayTarget);
if (arrayKeys.indexOf('length') === -1) throw new Error("Reflect.ownKeys should include length for arrays");
if (arrayKeys.indexOf('0') === -1 || arrayKeys.indexOf('1') === -1) throw new Error("Reflect.ownKeys should include array indices");

// Test 36-40: Reflect.getPrototypeOf functionality
var proto = { inherited: true };
var target8 = Object.create(proto);
target8.own = true;

if (Reflect.getPrototypeOf(target8) !== proto) throw new Error("Reflect.getPrototypeOf should return the prototype");
if (Reflect.getPrototypeOf({}) !== Object.prototype) throw new Error("Reflect.getPrototypeOf should return Object.prototype for plain objects");
if (Reflect.getPrototypeOf([]) !== Array.prototype) throw new Error("Reflect.getPrototypeOf should return Array.prototype for arrays");

var nullProto = Object.create(null);
if (Reflect.getPrototypeOf(nullProto) !== null) throw new Error("Reflect.getPrototypeOf should return null for null prototype");

function Constructor() {}
var instance = new Constructor();
if (Reflect.getPrototypeOf(instance) !== Constructor.prototype) throw new Error("Reflect.getPrototypeOf should return constructor prototype");

// Test 41-45: Reflect.setPrototypeOf functionality
var target9 = {};
var newProto = { method: function() { return 'proto-method'; } };

if (!Reflect.setPrototypeOf(target9, newProto)) throw new Error("Reflect.setPrototypeOf should return true on success");
if (target9.method() !== 'proto-method') throw new Error("Reflect.setPrototypeOf should set the prototype");

if (!Reflect.setPrototypeOf(target9, null)) throw new Error("Reflect.setPrototypeOf should allow setting null prototype");
if (Reflect.getPrototypeOf(target9) !== null) throw new Error("Reflect.setPrototypeOf should set null prototype");

var nonExtensible2 = {};
Object.preventExtensions(nonExtensible2);
if (Reflect.setPrototypeOf(nonExtensible2, {})) throw new Error("Reflect.setPrototypeOf should return false for non-extensible objects");

var frozen = Object.freeze({});
if (Reflect.setPrototypeOf(frozen, {})) throw new Error("Reflect.setPrototypeOf should return false for frozen objects");

// Test 46-50: Reflect.isExtensible functionality
var extensible = {};
var nonExtensible3 = {};
Object.preventExtensions(nonExtensible3);
var sealed = Object.seal({});
var frozen2 = Object.freeze({});

if (!Reflect.isExtensible(extensible)) throw new Error("Reflect.isExtensible should return true for extensible objects");
if (Reflect.isExtensible(nonExtensible3)) throw new Error("Reflect.isExtensible should return false for non-extensible objects");
if (Reflect.isExtensible(sealed)) throw new Error("Reflect.isExtensible should return false for sealed objects");
if (Reflect.isExtensible(frozen2)) throw new Error("Reflect.isExtensible should return false for frozen objects");

// Arrays and functions should be extensible by default
if (!Reflect.isExtensible([])) throw new Error("Reflect.isExtensible should return true for arrays");

// Test 51-55: Reflect.preventExtensions functionality
var target10 = { prop: 'value' };
if (!Reflect.preventExtensions(target10)) throw new Error("Reflect.preventExtensions should return true on success");
if (Reflect.isExtensible(target10)) throw new Error("Reflect.preventExtensions should make object non-extensible");

try {
    target10.newProp = 'new';
    if (target10.newProp !== undefined) throw new Error("Non-extensible object should not accept new properties");
} catch (e) {
    // In strict mode, this might throw
}

// Should still be able to modify existing properties
target10.prop = 'modified';
if (target10.prop !== 'modified') throw new Error("Non-extensible object should allow modification of existing properties");

var alreadyNonExtensible = Object.preventExtensions({});
if (!Reflect.preventExtensions(alreadyNonExtensible)) throw new Error("Reflect.preventExtensions should return true for already non-extensible objects");

// Test 56-60: Reflect.apply functionality
function testFunction(a, b, c) {
    return [this, a, b, c];
}

var result1 = Reflect.apply(testFunction, null, [1, 2, 3]);
// In non-strict mode, null this context may be converted to global object
if ((result1[0] !== null && typeof result1[0] !== "object") || result1[1] !== 1 || result1[2] !== 2 || result1[3] !== 3) {
    throw new Error("Reflect.apply should apply function with correct arguments and this");
}

var thisArg = { value: 'context' };
var result2 = Reflect.apply(testFunction, thisArg, ['a']);
if (result2[0] !== thisArg || result2[1] !== 'a') throw new Error("Reflect.apply should use provided this context");

var result3 = Reflect.apply(testFunction, undefined, []);
// In non-strict mode, undefined this context may be converted to global object
if ((result3[0] !== undefined && typeof result3[0] !== "object") || result3.length !== 4) {
    throw new Error("Reflect.apply should work with empty arguments");
}

// Test with built-in functions
var arrayResult = Reflect.apply(Array.prototype.slice, [1, 2, 3, 4], [1, 3]);
if (arrayResult.length !== 2 || arrayResult[0] !== 2 || arrayResult[1] !== 3) throw new Error("Reflect.apply should work with built-in methods");

var mathResult = Reflect.apply(Math.max, null, [1, 5, 3]);
if (mathResult !== 5) throw new Error("Reflect.apply should work with Math methods");

// Test 61-65: Reflect.construct functionality
function Constructor1(value) {
    this.value = value;
    this.constructed = true;
}
Constructor1.prototype.getValue = function() { return this.value; };

var instance1 = Reflect.construct(Constructor1, ['test']);
if (!(instance1 instanceof Constructor1)) throw new Error("Reflect.construct should create proper instance");
if (instance1.value !== 'test') throw new Error("Reflect.construct should pass arguments to constructor");
if (!instance1.constructed) throw new Error("Reflect.construct should execute constructor body");
if (instance1.getValue() !== 'test') throw new Error("Reflect.construct should set up prototype chain");

// Test with newTarget parameter
function Constructor2() {
    this.type = 'constructor2';
}
Constructor2.prototype.getType = function() { return this.type; };

function Constructor3() {
    this.type = 'constructor3';
}
Constructor3.prototype = Object.create(Constructor2.prototype);

var instance2 = Reflect.construct(Constructor2, [], Constructor3);
if (!(instance2 instanceof Constructor3)) throw new Error("Reflect.construct with newTarget should use newTarget prototype");
if (instance2.type !== 'constructor2') throw new Error("Reflect.construct with newTarget should execute target constructor");

// Test 66-70: Comparison with direct operations
var compareTarget = { existing: 'value' };
var compareProp = 'existing';

// get vs direct access
if (Reflect.get(compareTarget, compareProp) !== compareTarget[compareProp]) throw new Error("Reflect.get should be equivalent to bracket notation");

// set vs direct assignment
Reflect.set(compareTarget, 'newProp', 'newValue');
compareTarget['directProp'] = 'directValue';
if (compareTarget.newProp !== 'newValue' || compareTarget.directProp !== 'directValue') throw new Error("Reflect.set should be equivalent to direct assignment");

// has vs in operator
if (Reflect.has(compareTarget, 'newProp') !== ('newProp' in compareTarget)) throw new Error("Reflect.has should be equivalent to in operator");

// deleteProperty vs delete operator
var deleteTest1 = { prop: true };
var deleteTest2 = { prop: true };
var reflectResult = Reflect.deleteProperty(deleteTest1, 'prop');
var deleteResult = delete deleteTest2.prop;
if (reflectResult !== deleteResult) throw new Error("Reflect.deleteProperty should be equivalent to delete operator");

// Test 71-75: Error handling and edge cases
try {
    Reflect.get(null, 'prop');
    throw new Error("Reflect.get should throw for null target");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Reflect.get should throw TypeError for null target");
}

try {
    Reflect.set(null, 'prop', 'value');
    throw new Error("Reflect.set should throw for null target");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Reflect.set should throw TypeError for null target");
}

try {
    Reflect.apply('not-a-function', null, []);
    throw new Error("Reflect.apply should throw for non-callable target");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Reflect.apply should throw TypeError for non-callable target");
}

try {
    Reflect.construct('not-a-constructor', []);
    throw new Error("Reflect.construct should throw for non-constructor target");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Reflect.construct should throw TypeError for non-constructor target");
}

// Test with invalid property keys
try {
    var invalidKey = {};
    Reflect.get({}, invalidKey); // Should work, will be converted to string
} catch (e) {
    throw new Error("Reflect.get should handle object property keys");
}

// Test 76-80: Advanced meta-programming scenarios
var metaTarget = {
    data: {},
    get: function(prop) { return this.data[prop]; },
    set: function(prop, value) { this.data[prop] = value; },
    has: function(prop) { return prop in this.data; }
};

// Using Reflect to implement proxy-like behavior manually
function createManualProxy(target) {
    return {
        get: function(prop) { return Reflect.apply(target.get, target, [prop]); },
        set: function(prop, value) { return Reflect.apply(target.set, target, [prop, value]); },
        has: function(prop) { return Reflect.apply(target.has, target, [prop]); }
    };
}

var manualProxy = createManualProxy(metaTarget);
manualProxy.set('test', 'value');
if (manualProxy.get('test') !== 'value') throw new Error("Manual proxy using Reflect should work");
if (!manualProxy.has('test')) throw new Error("Manual proxy has check should work");

// Test 81-85: Reflect with Proxy integration
var reflectTarget = { prop: 'original' };
var reflectProxy = new Proxy(reflectTarget, {
    get: function(target, property, receiver) {
        if (property === 'reflected') {
            return Reflect.get(target, 'prop', receiver);
        }
        return Reflect.get(target, property, receiver);
    },
    set: function(target, property, value, receiver) {
        if (property === 'double') {
            return Reflect.set(target, property, value * 2, receiver);
        }
        return Reflect.set(target, property, value, receiver);
    }
});

if (reflectProxy.reflected !== 'original') throw new Error("Proxy should work with Reflect.get");

reflectProxy.double = 5;
if (reflectTarget.double !== 10) throw new Error("Proxy should work with Reflect.set");

var reflectHandler = {
    get: function(target, property) {
        return Reflect.get(target, property);
    },
    set: function(target, property, value) {
        return Reflect.set(target, property, value);
    },
    has: function(target, property) {
        return Reflect.has(target, property);
    },
    deleteProperty: function(target, property) {
        return Reflect.deleteProperty(target, property);
    },
    ownKeys: function(target) {
        return Reflect.ownKeys(target);
    }
};

var transparentProxy = new Proxy({test: 'transparent'}, reflectHandler);
if (transparentProxy.test !== 'transparent') throw new Error("Transparent proxy using Reflect should work");

// Test 86-90: Performance and consistency checks
var perfTarget = {};
for (var i = 0; i < 100; i++) {
    perfTarget['prop' + i] = i;
}

// Consistency between Object methods and Reflect
var objectKeys = Object.keys(perfTarget);
var reflectKeys = Reflect.ownKeys(perfTarget).filter(function(key) {
    var desc = Reflect.getOwnPropertyDescriptor(perfTarget, key);
    return desc && desc.enumerable;
});

if (objectKeys.length !== reflectKeys.length) throw new Error("Object.keys and Reflect methods should be consistent");

// Test property definition consistency
var consistencyTarget = {};
Object.defineProperty(consistencyTarget, 'objDefined', {value: 'object', enumerable: true});
Reflect.defineProperty(consistencyTarget, 'reflectDefined', {value: 'reflect', enumerable: true});

var objDesc = Object.getOwnPropertyDescriptor(consistencyTarget, 'objDefined');
var reflectDesc = Reflect.getOwnPropertyDescriptor(consistencyTarget, 'reflectDefined');

if (objDesc.enumerable !== reflectDesc.enumerable) throw new Error("Object and Reflect property definition should be consistent");

// Test 91-95: Complex inheritance scenarios
function Base() {
    this.baseProperty = 'base';
}
Base.prototype.baseMethod = function() { return 'base-method'; };

function Derived() {
    Reflect.apply(Base, this, []);
    this.derivedProperty = 'derived';
}
Derived.prototype = Object.create(Base.prototype);
Derived.prototype.constructor = Derived;
Derived.prototype.derivedMethod = function() { return 'derived-method'; };

var derivedInstance = Reflect.construct(Derived, []);
if (!Reflect.has(derivedInstance, 'baseProperty')) throw new Error("Reflect.construct should set up inheritance chain");
if (Reflect.get(derivedInstance, 'baseMethod')() !== 'base-method') throw new Error("Reflect should access inherited methods");

var prototypeChain = [];
var current = derivedInstance;
while (current) {
    prototypeChain.push(current);
    current = Reflect.getPrototypeOf(current);
}
if (prototypeChain.length < 3) throw new Error("Reflect.getPrototypeOf should traverse full prototype chain");

// Test 96-100: Edge cases and final validation
var finalTarget = Object.create(null);
finalTarget.prop = 'value';

// Test with null prototype object
if (!Reflect.has(finalTarget, 'prop')) throw new Error("Reflect should work with null-prototype objects");
if (Reflect.get(finalTarget, 'prop') !== 'value') throw new Error("Reflect.get should work with null-prototype objects");

// Test circular reference handling
var circular1 = {};
var circular2 = {};
circular1.ref = circular2;
circular2.ref = circular1;

if (!Reflect.has(circular1, 'ref')) throw new Error("Reflect should handle circular references");
if (Reflect.get(circular1, 'ref') !== circular2) throw new Error("Reflect should handle circular object references");

// Test with very long property names
var longPropName = 'very'.repeat(1000) + 'LongPropertyName';
Reflect.set(finalTarget, longPropName, 'long-value');
if (Reflect.get(finalTarget, longPropName) !== 'long-value') throw new Error("Reflect should handle long property names");

// Final validation: All Reflect methods exist
var reflectMethods = ['apply', 'construct', 'defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor',
                     'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf'];

for (var j = 0; j < reflectMethods.length; j++) {
    if (typeof Reflect[reflectMethods[j]] !== 'function') {
        throw new Error("Reflect." + reflectMethods[j] + " should be a function");
    }
}

if (typeof Reflect !== 'object') throw new Error("Reflect should be an object");
if (Reflect.constructor !== Object) throw new Error("Reflect should be a plain object");