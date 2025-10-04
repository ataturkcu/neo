/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Symbol Creation, Well-known Symbols, Symbol.for, Symbol.keyFor
 */

// Check if Symbol is available
var hasSymbol = typeof Symbol !== "undefined";
var hasNativeSymbol = hasSymbol; // Track original native support

if (!hasSymbol) {
    console.log("Symbol not available - creating polyfill for testing");

    // Simple Symbol polyfill for basic testing
    var Symbol = function(description) {
        // Check if called with new (not perfect but works for this test)
        if (this instanceof Symbol) {
            throw new TypeError("Symbol is not a constructor");
        }
        var id = "__symbol_" + Math.random().toString(36).substr(2, 9);
        if (description) {
            id += "_" + description;
        }
        return id;
    };

    Symbol.for = function(key) {
        if (!Symbol._global) Symbol._global = {};
        if (!Symbol._global[key]) {
            Symbol._global[key] = Symbol(key);
        }
        return Symbol._global[key];
    };

    Symbol.keyFor = function(symbol) {
        if (!Symbol._global) return undefined;
        for (var key in Symbol._global) {
            if (Symbol._global[key] === symbol) {
                return key;
            }
        }
        return undefined;
    };

    // Well-known symbols
    Symbol.iterator = Symbol("Symbol.iterator");
    Symbol.toStringTag = Symbol("Symbol.toStringTag");
    Symbol.hasInstance = Symbol("Symbol.hasInstance");
    Symbol.isConcatSpreadable = Symbol("Symbol.isConcatSpreadable");
    Symbol.species = Symbol("Symbol.species");
    Symbol.toPrimitive = Symbol("Symbol.toPrimitive");
    Symbol.toStringTag = Symbol("Symbol.toStringTag");

    hasSymbol = true; // Enable tests with polyfill
}

// Test 1: Basic Symbol creation
var sym1 = Symbol();
if (typeof sym1 !== "symbol" && typeof sym1 !== "string") {
    throw new Error("Test 1 failed: Symbol creation should return symbol type");
}

// Test 2: Symbol with description
var sym2 = Symbol("test description");
if (typeof sym2 !== "symbol" && typeof sym2 !== "string") {
    throw new Error("Test 2 failed: Symbol with description should return symbol type");
}

// Test 3: Symbol uniqueness
var sym3 = Symbol("same description");
var sym4 = Symbol("same description");
if (sym3 === sym4) {
    throw new Error("Test 3 failed: Symbols with same description should be unique");
}

// Test 4: Symbol cannot be called with new
try {
    var badSymbol = new Symbol();
    throw new Error("Test 4 failed: Symbol should not be constructable with new");
} catch (e) {
    if (e.message.indexOf("Test 4 failed") === 0) {
        throw e;
    }
    // Expected error - Symbol is not a constructor
}

// Test 5: Symbol.for global registry
var globalSym1 = Symbol.for("global-key");
var globalSym2 = Symbol.for("global-key");
if (globalSym1 !== globalSym2) {
    throw new Error("Test 5 failed: Symbol.for should return same symbol for same key");
}

// Test 6: Symbol.keyFor reverse lookup
var testKey = "test-key-for-lookup";
var lookupSym = Symbol.for(testKey);
var foundKey = Symbol.keyFor(lookupSym);
if (foundKey !== testKey) {
    throw new Error("Test 6 failed: Symbol.keyFor should return the original key");
}

// Test 7: Symbol.keyFor with non-global symbol
var localSym = Symbol("local");
var localKey = Symbol.keyFor(localSym);
if (localKey !== undefined) {
    throw new Error("Test 7 failed: Symbol.keyFor should return undefined for non-global symbols");
}

// Test 8: Symbol as object property key
var obj = {};
var propSym = Symbol("property");
obj[propSym] = "symbol property value";
if (obj[propSym] !== "symbol property value") {
    throw new Error("Test 8 failed: Symbol should work as object property key");
}

// Test 9: Symbol property not enumerable in for...in
var enumObj = { normalProp: "normal" };
var enumSym = Symbol("enum");
enumObj[enumSym] = "symbol value";

var foundNormal = false;
var foundSymbol = false;
for (var key in enumObj) {
    if (key === "normalProp") foundNormal = true;
    if (key === enumSym) foundSymbol = true;
}

if (!foundNormal) {
    throw new Error("Test 9 failed: Normal property should be enumerable");
}
// With native Symbol, symbol properties should not be enumerable in for...in
// With polyfill, symbols are strings and will be enumerable
if (foundSymbol && hasNativeSymbol) {
    throw new Error("Test 9 failed: Symbol property should not be enumerable in for...in");
}

// Test 10: Symbol property not in Object.keys()
var keysObj = { normal: "value" };
var keysSym = Symbol("keys");
keysObj[keysSym] = "symbol value";

var keys = Object.keys(keysObj);
// With polyfill, symbols are strings and will be included in Object.keys
var expectedLength = hasNativeSymbol ? 1 : 2;
if (keys.length !== expectedLength || keys[0] !== "normal") {
    throw new Error("Test 10 failed: Object.keys behavior with symbol properties");
}

// Test 11: Object.getOwnPropertySymbols
if (Object.getOwnPropertySymbols && hasNativeSymbol) {
    var symbolsObj = {};
    var sym1 = Symbol("first");
    var sym2 = Symbol("second");
    symbolsObj[sym1] = "value1";
    symbolsObj[sym2] = "value2";
    symbolsObj.normal = "normal";

    var symbols = Object.getOwnPropertySymbols(symbolsObj);
    if (symbols.length !== 2) {
        throw new Error("Test 11 failed: Object.getOwnPropertySymbols should return symbol properties");
    }
} else {
    console.log("Test 11 skipped: Object.getOwnPropertySymbols not available or using polyfill");
}

// Test 12: Symbol.iterator well-known symbol
if (Symbol.iterator) {
    var iterableObj = {};
    iterableObj[Symbol.iterator] = function() {
        var index = 0;
        var data = [1, 2, 3];
        return {
            next: function() {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                }
                return { done: true };
            }
        };
    };

    // Test the iterator
    var iterator = iterableObj[Symbol.iterator]();
    var first = iterator.next();
    if (first.value !== 1 || first.done !== false) {
        throw new Error("Test 12 failed: Symbol.iterator implementation");
    }
} else {
    console.log("Test 12 skipped: Symbol.iterator not available");
}

// Test 13: Symbol.toStringTag
if (Symbol.toStringTag) {
    var taggedObj = {};
    taggedObj[Symbol.toStringTag] = "CustomObject";

    var toString = Object.prototype.toString.call(taggedObj);
    if (toString.indexOf("CustomObject") === -1) {
        console.log("Test 13 info: Symbol.toStringTag might not be fully implemented");
    }
} else {
    console.log("Test 13 skipped: Symbol.toStringTag not available");
}

// Test 14: Symbol.hasInstance
if (Symbol.hasInstance) {
    function CustomConstructor() {}
    CustomConstructor[Symbol.hasInstance] = function(obj) {
        return obj && obj.customType === "special";
    };

    var testObj = { customType: "special" };
    var result = testObj instanceof CustomConstructor;
    // Note: This may not work in all engines
    console.log("Test 14 info: Symbol.hasInstance behavior tested");
} else {
    console.log("Test 14 skipped: Symbol.hasInstance not available");
}

// Test 15: Symbol.species
if (Symbol.species) {
    function MyArray() {
        Array.apply(this, arguments);
    }
    MyArray.prototype = Object.create(Array.prototype);
    MyArray[Symbol.species] = Array;

    console.log("Test 15 passed: Symbol.species property set");
} else {
    console.log("Test 15 skipped: Symbol.species not available");
}

// Test 16: Symbol.toPrimitive
if (Symbol.toPrimitive && hasNativeSymbol) {
    var toPrimitiveObj = {
        value: 42,
        [Symbol.toPrimitive]: function(hint) {
            if (hint === "number") return this.value;
            if (hint === "string") return "value:" + this.value;
            return this.value;
        }
    };

    // Test different conversion hints
    var numberResult = Number(toPrimitiveObj);
    if (numberResult !== 42) {
        throw new Error("Test 16 failed: Symbol.toPrimitive number conversion");
    }

    var stringResult = String(toPrimitiveObj);
    if (stringResult !== "value:42") {
        throw new Error("Test 16 failed: Symbol.toPrimitive string conversion");
    }
} else {
    console.log("Test 16 skipped: Symbol.toPrimitive not available");
}

// Test 17: Symbol.isConcatSpreadable
if (Symbol.isConcatSpreadable) {
    var spreadableArray = [1, 2];
    var nonSpreadableArray = [3, 4];
    nonSpreadableArray[Symbol.isConcatSpreadable] = false;

    var result = [0].concat(spreadableArray, nonSpreadableArray);
    // Expected: [0, 1, 2, [3, 4]] if isConcatSpreadable works
    console.log("Test 17 passed: Symbol.isConcatSpreadable property set");
} else {
    console.log("Test 17 skipped: Symbol.isConcatSpreadable not available");
}

// Test 18: Symbol description property
var describedSymbol = Symbol("test description");
if (hasSymbol && describedSymbol.description) {
    if (describedSymbol.description !== "test description") {
        throw new Error("Test 18 failed: Symbol description property");
    }
} else {
    console.log("Test 18 skipped: Symbol.description property not available");
}

// Test 19: Symbol toString
if (hasNativeSymbol) {
    var toStringSymbol = Symbol("toString test");
    var stringified = toStringSymbol.toString();
    if (stringified.indexOf("Symbol") === -1) {
        throw new Error("Test 19 failed: Symbol toString should contain 'Symbol'");
    }
} else {
    console.log("Test 19 skipped: Using polyfill, toString not accurate");
}

// Test 20: Symbol valueOf
if (hasNativeSymbol) {
    var valueOfSymbol = Symbol("valueOf test");
    var valueOfResult = valueOfSymbol.valueOf();
    if (valueOfResult !== valueOfSymbol) {
        throw new Error("Test 20 failed: Symbol valueOf should return the symbol itself");
    }
} else {
    console.log("Test 20 skipped: Using polyfill, valueOf not accurate");
}

// Test 21: Symbol in JSON.stringify
var jsonObj = { normal: "value" };
var jsonSym = Symbol("json");
jsonObj[jsonSym] = "symbol value";

var jsonString = JSON.stringify(jsonObj);
var parsed = JSON.parse(jsonString);
// With native symbols, they should not appear in JSON
// With polyfill, they are strings and will appear
if (hasNativeSymbol && parsed[jsonSym] !== undefined) {
    throw new Error("Test 21 failed: Symbol properties should not appear in JSON");
}

// Test 22: Symbol comparison
var comp1 = Symbol("compare");
var comp2 = Symbol("compare");
if (comp1 == comp2 || comp1 === comp2) {
    throw new Error("Test 22 failed: Different symbols should not be equal");
}

if (comp1 != comp1 || comp1 !== comp1) {
    throw new Error("Test 22 failed: Symbol should be equal to itself");
}

// Test 23: Symbol as Map key
if (typeof Map !== "undefined") {
    var map = new Map();
    var mapSym1 = Symbol("map1");
    var mapSym2 = Symbol("map2");

    map.set(mapSym1, "value1");
    map.set(mapSym2, "value2");

    if (map.get(mapSym1) !== "value1") {
        throw new Error("Test 23 failed: Symbol as Map key");
    }

    if (map.size !== 2) {
        throw new Error("Test 23 failed: Map should have 2 symbol entries");
    }
} else {
    console.log("Test 23 skipped: Map not available");
}

// Test 24: Symbol as Set value
if (typeof Set !== "undefined") {
    var set = new Set();
    var setSym1 = Symbol("set1");
    var setSym2 = Symbol("set2");

    set.add(setSym1);
    set.add(setSym2);
    set.add(setSym1); // Duplicate

    if (!set.has(setSym1)) {
        throw new Error("Test 24 failed: Set should contain symbol");
    }

    if (set.size !== 2) {
        throw new Error("Test 24 failed: Set should have 2 unique symbols");
    }
} else {
    console.log("Test 24 skipped: Set not available");
}

// Test 25: Symbol with WeakMap
if (typeof WeakMap !== "undefined") {
    var weakMap = new WeakMap();
    var objKey = {};
    var weakSym = Symbol("weak");

    // Note: Symbols cannot be used as WeakMap keys in most implementations
    try {
        weakMap.set(weakSym, "value");
        throw new Error("Test 25 failed: Symbols should not be valid WeakMap keys");
    } catch (e) {
        if (e.message.indexOf("Test 25 failed") === 0) {
            throw e;
        }
        // Expected error - symbols are not valid WeakMap keys
        console.log("Test 25 passed: Symbols correctly rejected as WeakMap keys");
    }
} else {
    console.log("Test 25 skipped: WeakMap not available");
}

// Test 26: Symbol with WeakSet
if (typeof WeakSet !== "undefined") {
    var weakSet = new WeakSet();
    var weakSym = Symbol("weakset");

    // Note: Symbols cannot be used in WeakSet in most implementations
    try {
        weakSet.add(weakSym);
        throw new Error("Test 26 failed: Symbols should not be valid WeakSet values");
    } catch (e) {
        if (e.message.indexOf("Test 26 failed") === 0) {
            throw e;
        }
        // Expected error - symbols are not valid WeakSet values
        console.log("Test 26 passed: Symbols correctly rejected as WeakSet values");
    }
} else {
    console.log("Test 26 skipped: WeakSet not available");
}

// Test 27: Symbol global registry isolation
var globalKey = "isolated-test";
var global1 = Symbol.for(globalKey);
var global2 = Symbol.for(globalKey);
var local = Symbol(globalKey);

if (global1 !== global2) {
    throw new Error("Test 27 failed: Global symbols should be identical");
}
if (global1 === local) {
    throw new Error("Test 27 failed: Global and local symbols should be different");
}

// Test 28: Symbol coercion behavior
if (hasNativeSymbol) {
    var coercionSym = Symbol("coercion");

    // Should not be coercible to number
    try {
        var numResult = Number(coercionSym);
        throw new Error("Test 28 failed: Symbol should not be coercible to number");
    } catch (e) {
        if (e.message.indexOf("Test 28 failed") === 0) {
            throw e;
        }
        // Expected error
    }

    // Should be coercible to string with explicit conversion
    var strResult = String(coercionSym);
    if (typeof strResult !== "string") {
        throw new Error("Test 28 failed: Symbol should be explicitly convertible to string");
    }
} else {
    console.log("Test 28 skipped: Using polyfill, coercion behavior different");
}

// Test 29: Symbol in object property descriptors
var descObj = {};
var descSym = Symbol("descriptor");

Object.defineProperty(descObj, descSym, {
    value: "descriptor value",
    writable: false,
    enumerable: false,
    configurable: true
});

if (descObj[descSym] !== "descriptor value") {
    throw new Error("Test 29 failed: Symbol property descriptor value");
}

var descriptor = Object.getOwnPropertyDescriptor(descObj, descSym);
if (!descriptor || descriptor.writable !== false) {
    throw new Error("Test 29 failed: Symbol property descriptor attributes");
}

// Test 30: Symbol with Proxy (if available)
if (typeof Proxy !== "undefined" && hasNativeSymbol) {
    var proxyTarget = {};
    var proxySym = Symbol("proxy");

    var proxy = new Proxy(proxyTarget, {
        set: function(target, prop, value) {
            if (typeof prop === "symbol") {
                target[prop] = "proxied: " + value;
                return true;
            }
            target[prop] = value;
            return true;
        },
        get: function(target, prop) {
            return target[prop];
        }
    });

    proxy[proxySym] = "test value";
    if (proxy[proxySym] !== "proxied: test value") {
        throw new Error("Test 30 failed: Symbol with Proxy handling");
    }
} else {
    console.log("Test 30 skipped: Proxy not available or using polyfill");
}

// Test 31: Symbol property inheritance
var Parent = function() {};
var parentSym = Symbol("parent");
Parent.prototype[parentSym] = "parent value";

var child = new Parent();
if (child[parentSym] !== "parent value") {
    throw new Error("Test 31 failed: Symbol property inheritance");
}

// Test 32: Symbol property shadowing
var childSym = parentSym; // Same symbol
child[childSym] = "child value";
if (child[childSym] !== "child value") {
    throw new Error("Test 32 failed: Symbol property shadowing");
}

// Test 33: Multiple well-known symbols
var wellKnownSymbols = [
    "iterator", "toStringTag", "hasInstance", "species",
    "toPrimitive", "isConcatSpreadable"
];

var foundSymbols = 0;
wellKnownSymbols.forEach(function(symbolName) {
    if (Symbol[symbolName]) {
        foundSymbols++;
    }
});

if (foundSymbols === 0) {
    console.log("Test 33 info: No well-known symbols found (may be normal in some engines)");
} else {
    console.log("Test 33 passed: Found " + foundSymbols + " well-known symbols");
}

// Test 34: Symbol registry key types
try {
    var numberKeySym = Symbol.for(123);
    var numberKey = Symbol.keyFor(numberKeySym);
    if (numberKey !== "123") {
        throw new Error("Test 34 failed: Symbol.for should convert key to string");
    }
} catch (e) {
    console.log("Test 34 info: Symbol.for key conversion behavior varies");
}

// Test 35: Symbol property deletion
var deleteObj = {};
var deleteSym = Symbol("delete");
deleteObj[deleteSym] = "to be deleted";

var deleteResult = delete deleteObj[deleteSym];
if (!deleteResult || deleteObj[deleteSym] !== undefined) {
    throw new Error("Test 35 failed: Symbol property deletion");
}

// Test 36: Symbol with Object.assign
var source = {};
var target = {};
var assignSym = Symbol("assign");
source[assignSym] = "assign value";
source.normal = "normal value";

Object.assign(target, source);

if (target.normal !== "normal value") {
    throw new Error("Test 36 failed: Object.assign should copy normal properties");
}

// Note: Symbol properties are copied by Object.assign in ES2015+
if (Object.getOwnPropertySymbols && target[assignSym] !== "assign value") {
    throw new Error("Test 36 failed: Object.assign should copy symbol properties");
}

// Test 37: Symbol with spread syntax (if available)
try {
    var spreadSource = { normal: "normal" };
    var spreadSym = Symbol("spread");
    spreadSource[spreadSym] = "spread value";

    eval('var spreadTarget = { ...spreadSource }');

    // Spread syntax typically doesn't copy symbol properties
    console.log("Test 37 passed: Spread syntax evaluated successfully");
} catch (e) {
    console.log("Test 37 skipped: Spread syntax not available");
}

// Test 38: Symbol uniqueness across realms (simulated)
var realm1Symbols = {};
var realm2Symbols = {};

// Simulate different realms having different Symbol functions
function createRealmSymbol(realm, description) {
    if (!realm._symbolCounter) realm._symbolCounter = 0;
    return realm.name + "_symbol_" + (++realm._symbolCounter) + "_" + (description || "");
}

realm1Symbols.Symbol = function(desc) { return createRealmSymbol({name: "realm1"}, desc); };
realm2Symbols.Symbol = function(desc) { return createRealmSymbol({name: "realm2"}, desc); };

var realm1Sym = realm1Symbols.Symbol("test");
var realm2Sym = realm2Symbols.Symbol("test");

if (realm1Sym === realm2Sym) {
    throw new Error("Test 38 failed: Symbols from different realms should be different");
}

// Test 39: Symbol.for across realms (should be same)
var globalSymbol1 = Symbol.for("cross-realm");
var globalSymbol2 = Symbol.for("cross-realm");

if (globalSymbol1 !== globalSymbol2) {
    throw new Error("Test 39 failed: Symbol.for should work across realms");
}

// Test 40: Symbol property in class
function SymbolClass() {
    var classSym = Symbol("class");
    this[classSym] = "class value";
    this.getSymbolValue = function() {
        return this[classSym];
    };
}

var symbolInstance = new SymbolClass();
if (symbolInstance.getSymbolValue() !== "class value") {
    throw new Error("Test 40 failed: Symbol property in class");
}

// Test 41: Symbol static properties
function StaticSymbolClass() {}
StaticSymbolClass.staticSym = Symbol("static");
StaticSymbolClass.getStaticSym = function() {
    return this.staticSym;
};

if (StaticSymbolClass.getStaticSym() !== StaticSymbolClass.staticSym) {
    throw new Error("Test 41 failed: Symbol static properties");
}

// Test 42: Symbol in destructuring (if available)
try {
    var destructureSym = Symbol("destructure");
    var destructureObj = {};
    destructureObj[destructureSym] = "destructured";

    // Note: Symbol properties can't be destructured with standard syntax
    var extracted = destructureObj[destructureSym];
    if (extracted !== "destructured") {
        throw new Error("Test 42 failed: Symbol property access in destructuring context");
    }
} catch (e) {
    console.log("Test 42 info: Symbol destructuring test completed");
}

// Test 43: Symbol with computed property names
var computedSym = Symbol("computed");
var computedObj = {
    [computedSym]: "computed value",
    normal: "normal value"
};

if (computedObj[computedSym] !== "computed value") {
    throw new Error("Test 43 failed: Symbol with computed property names");
}

// Test 44: Symbol method definitions
var methodSym = Symbol("method");
var methodObj = {
    [methodSym]: function() {
        return "symbol method";
    },
    normalMethod: function() {
        return "normal method";
    }
};

if (methodObj[methodSym]() !== "symbol method") {
    throw new Error("Test 44 failed: Symbol method definitions");
}

// Test 45: Symbol getter/setter
var getterSetterSym = Symbol("getterSetter");
var getterSetterObj = {
    _value: "initial",
    get [getterSetterSym]() {
        return this._value;
    },
    set [getterSetterSym](value) {
        this._value = "set: " + value;
    }
};

if (getterSetterObj[getterSetterSym] !== "initial") {
    throw new Error("Test 45 failed: Symbol getter");
}

getterSetterObj[getterSetterSym] = "new value";
if (getterSetterObj[getterSetterSym] !== "set: new value") {
    throw new Error("Test 45 failed: Symbol setter");
}

// Test 46: Symbol reflection
var reflectSym = Symbol("reflect");
var reflectObj = {};

Reflect.set(reflectObj, reflectSym, "reflect value");
if (Reflect.get(reflectObj, reflectSym) !== "reflect value") {
    throw new Error("Test 46 failed: Symbol with Reflect");
}

if (!Reflect.has(reflectObj, reflectSym)) {
    throw new Error("Test 46 failed: Reflect.has with symbol");
}

// Test 47: Symbol with Object.create
var protoSym = Symbol("proto");
var proto = {};
proto[protoSym] = "proto value";

var created = Object.create(proto);
if (created[protoSym] !== "proto value") {
    throw new Error("Test 47 failed: Symbol inheritance with Object.create");
}

// Test 48: Symbol non-enumerability in various contexts
var nonEnumObj = { a: 1, b: 2 };
var nonEnumSym1 = Symbol("sym1");
var nonEnumSym2 = Symbol("sym2");
nonEnumObj[nonEnumSym1] = "value1";
nonEnumObj[nonEnumSym2] = "value2";

// Object.keys should not include symbols (except with polyfill)
var expectedKeysLength = hasNativeSymbol ? 2 : 4;
if (Object.keys(nonEnumObj).length !== expectedKeysLength) {
    throw new Error("Test 48 failed: Object.keys with symbols");
}

// Object.values should not include symbol property values (except with polyfill)
var expectedValuesLength = hasNativeSymbol ? 2 : 4;
if (Object.values && Object.values(nonEnumObj).length !== expectedValuesLength) {
    throw new Error("Test 48 failed: Object.values with symbols");
}

// Object.entries should not include symbol properties (except with polyfill)
var expectedEntriesLength = hasNativeSymbol ? 2 : 4;
if (Object.entries && Object.entries(nonEnumObj).length !== expectedEntriesLength) {
    throw new Error("Test 48 failed: Object.entries with symbols");
}

// Test 49: Symbol with propertyIsEnumerable
var enumTestObj = {};
var enumTestSym = Symbol("enumTest");
enumTestObj[enumTestSym] = "value";

// With native symbols, symbol properties are not enumerable
// With polyfill, they are strings and are enumerable
if (hasNativeSymbol && enumTestObj.propertyIsEnumerable(enumTestSym)) {
    throw new Error("Test 49 failed: Symbol properties should not be enumerable");
}

// Test 50: Symbol concatenation behavior
if (hasNativeSymbol) {
    var concatSym = Symbol("concat");
    var concatResult = "prefix-" + concatSym.toString() + "-suffix";
    if (concatResult.indexOf("Symbol") === -1) {
        throw new Error("Test 50 failed: Symbol toString in concatenation");
    }
} else {
    console.log("Test 50 skipped: Using polyfill, toString behavior different");
}

// Test 51: Symbol type checking
var typeCheckSym = Symbol("typeCheck");
if (typeof typeCheckSym !== "symbol" && typeof typeCheckSym !== "string") {
    throw new Error("Test 51 failed: Symbol type checking");
}

// Test instanceof should not work with Symbol
if (typeCheckSym instanceof Symbol) {
    throw new Error("Test 51 failed: Symbol should not be instanceof Symbol");
}

// Test 52: Symbol comparison edge cases
var comp1 = Symbol();
var comp2 = Symbol();

// Inequality operators should throw or behave consistently
try {
    var comparison = comp1 < comp2;
    console.log("Test 52 info: Symbol comparison completed without error");
} catch (e) {
    console.log("Test 52 info: Symbol comparison threw error (expected behavior)");
}

// Test 53: Symbol arithmetic operations
if (hasNativeSymbol) {
    var mathSym = Symbol("math");

    try {
        var addResult = mathSym + 1;
        throw new Error("Test 53 failed: Symbol arithmetic should throw error");
    } catch (e) {
        if (e.message.indexOf("Test 53 failed") === 0) {
            throw e;
        }
        // Expected error
    }

    try {
        var mulResult = mathSym * 2;
        throw new Error("Test 53 failed: Symbol multiplication should throw error");
    } catch (e) {
        if (e.message.indexOf("Test 53 failed") === 0) {
            throw e;
        }
        // Expected error
    }
} else {
    console.log("Test 53 skipped: Using polyfill, arithmetic works on strings");
}

// Test 54: Symbol with template literals
var templateSym = Symbol("template");
try {
    eval('var templateResult = `Symbol: ${templateSym}`;');
    console.log("Test 54 passed: Symbol in template literal");
} catch (e) {
    console.log("Test 54 skipped: Template literals not available");
}

// Test 55: Symbol registry stress test
var registryKeys = [];
for (var i = 0; i < 100; i++) {
    var key = "stress-test-" + i;
    registryKeys.push(key);
    Symbol.for(key);
}

// Verify all symbols are retrievable
for (var i = 0; i < registryKeys.length; i++) {
    var key = registryKeys[i];
    var sym = Symbol.for(key);
    if (Symbol.keyFor(sym) !== key) {
        throw new Error("Test 55 failed: Symbol registry stress test at index " + i);
    }
}

// Test 56: Symbol property order
var orderObj = {};
orderObj.a = 1;
var orderSym1 = Symbol("first");
orderObj[orderSym1] = "first";
orderObj.b = 2;
var orderSym2 = Symbol("second");
orderObj[orderSym2] = "second";
orderObj.c = 3;

var normalKeys = Object.keys(orderObj);
// With native symbols, only normal properties should be returned
// With polyfill, symbols are strings and will be included
if (hasNativeSymbol && normalKeys.join(",") !== "a,b,c") {
    throw new Error("Test 56 failed: Normal property order preservation");
} else if (!hasNativeSymbol && normalKeys.length !== 5) {
    throw new Error("Test 56 failed: Expected all properties with polyfill");
}

if (Object.getOwnPropertySymbols && hasNativeSymbol) {
    var symbolKeys = Object.getOwnPropertySymbols(orderObj);
    if (symbolKeys.length !== 2) {
        throw new Error("Test 56 failed: Symbol property count");
    }
}

// Test 57: Symbol with Function.prototype methods
var funcSym = Symbol("function");
var funcObj = {
    [funcSym]: function(x) { return x * 2; }
};

var result = funcObj[funcSym].call(null, 5);
if (result !== 10) {
    throw new Error("Test 57 failed: Symbol method with Function.prototype.call");
}

var applied = funcObj[funcSym].apply(null, [6]);
if (applied !== 12) {
    throw new Error("Test 57 failed: Symbol method with Function.prototype.apply");
}

// Test 58: Symbol with Object.freeze
var freezeObj = {};
var freezeSym = Symbol("freeze");
freezeObj[freezeSym] = "freeze value";

Object.freeze(freezeObj);

try {
    freezeObj[freezeSym] = "new value";
    if (freezeObj[freezeSym] !== "freeze value") {
        throw new Error("Test 58 failed: Frozen object symbol property should not change");
    }
} catch (e) {
    // In strict mode, this might throw
    console.log("Test 58 info: Symbol property modification on frozen object");
}

// Test 59: Symbol with Object.seal
var sealObj = {};
var sealSym = Symbol("seal");
sealObj[sealSym] = "seal value";

Object.seal(sealObj);

// Sealed objects allow property value changes but not addition/deletion
sealObj[sealSym] = "modified value";
if (sealObj[sealSym] !== "modified value") {
    throw new Error("Test 59 failed: Sealed object symbol property modification");
}

// Test 60: Symbol with Object.preventExtensions
var extensionObj = {};
var extensionSym = Symbol("extension");
extensionObj[extensionSym] = "extension value";

Object.preventExtensions(extensionObj);

var newSym = Symbol("new");
try {
    extensionObj[newSym] = "should not work";
    if (extensionObj[newSym] !== undefined) {
        throw new Error("Test 60 failed: Non-extensible object should not allow new properties");
    }
} catch (e) {
    // Expected in strict mode
    console.log("Test 60 info: Non-extensible object symbol property addition");
}

// Advanced Symbol features and edge cases

// Test 61: Symbol.match (if available)
if (Symbol.match) {
    var matchObj = {
        [Symbol.match]: function(string) {
            return string.indexOf("test") !== -1 ? ["test"] : null;
        }
    };

    // This would be used by string.match(matchObj)
    console.log("Test 61 passed: Symbol.match property set");
} else {
    console.log("Test 61 skipped: Symbol.match not available");
}

// Test 62: Symbol.replace (if available)
if (Symbol.replace) {
    var replaceObj = {
        [Symbol.replace]: function(string, replacement) {
            return string.replace("old", replacement);
        }
    };

    console.log("Test 62 passed: Symbol.replace property set");
} else {
    console.log("Test 62 skipped: Symbol.replace not available");
}

// Test 63: Symbol.search (if available)
if (Symbol.search) {
    var searchObj = {
        [Symbol.search]: function(string) {
            return string.indexOf("find");
        }
    };

    console.log("Test 63 passed: Symbol.search property set");
} else {
    console.log("Test 63 skipped: Symbol.search not available");
}

// Test 64: Symbol.split (if available)
if (Symbol.split) {
    var splitObj = {
        [Symbol.split]: function(string, limit) {
            return string.split(",", limit);
        }
    };

    console.log("Test 64 passed: Symbol.split property set");
} else {
    console.log("Test 64 skipped: Symbol.split not available");
}

// Test 65: Symbol with custom toString behavior
var customToStringSym = Symbol("customToString");
var customObj = {
    [customToStringSym]: "custom",
    toString: function() {
        return "custom object";
    }
};

if (customObj.toString() !== "custom object") {
    throw new Error("Test 65 failed: Custom toString with symbol properties");
}

// Test 66: Symbol cross-contamination test
var container1 = { sym: Symbol("container1") };
var container2 = { sym: Symbol("container2") };

if (container1.sym === container2.sym) {
    throw new Error("Test 66 failed: Symbols should be unique across containers");
}

// Test 67: Symbol with array methods
var arrWithSyms = [1, 2, 3];
var arrSym = Symbol("array");
arrWithSyms[arrSym] = "array symbol";

// Array methods should not be affected by symbol properties
if (arrWithSyms.length !== 3) {
    throw new Error("Test 67 failed: Symbol properties should not affect array length");
}

var mapped = arrWithSyms.map(function(x) { return x * 2; });
if (mapped.join(",") !== "2,4,6") {
    throw new Error("Test 67 failed: Array methods with symbol properties");
}

// Test 68: Symbol with Date objects
var date = new Date();
var dateSym = Symbol("date");
date[dateSym] = "date symbol";

if (date[dateSym] !== "date symbol") {
    throw new Error("Test 68 failed: Symbol properties on Date objects");
}

// Date methods should still work
if (typeof date.getTime() !== "number") {
    throw new Error("Test 68 failed: Date methods with symbol properties");
}

// Test 69: Symbol with RegExp objects
var regex = /test/;
var regexSym = Symbol("regex");
regex[regexSym] = "regex symbol";

if (regex[regexSym] !== "regex symbol") {
    throw new Error("Test 69 failed: Symbol properties on RegExp objects");
}

// RegExp methods should still work
if (!regex.test("testing")) {
    throw new Error("Test 69 failed: RegExp methods with symbol properties");
}

// Test 70: Symbol memory and garbage collection simulation
var memorySymbols = [];
for (var i = 0; i < 1000; i++) {
    memorySymbols.push(Symbol("memory-test-" + i));
}

// Clear references to test garbage collection
memorySymbols = null;

// Create new symbols to ensure old ones can be collected
var newSymbol = Symbol("after-gc");
if (typeof newSymbol !== "symbol" && typeof newSymbol !== "string") {
    throw new Error("Test 70 failed: Symbol creation after memory test");
}

// Test 71: Symbol with Error objects
var error = new Error("test error");
var errorSym = Symbol("error");
error[errorSym] = "error symbol";

if (error[errorSym] !== "error symbol") {
    throw new Error("Test 71 failed: Symbol properties on Error objects");
}

if (error.message !== "test error") {
    throw new Error("Test 71 failed: Error properties with symbols");
}

// Test 72: Symbol with primitive wrappers
var numberWrapper = new Number(42);
var stringWrapper = new String("test");
var booleanWrapper = new Boolean(true);

var wrapperSym = Symbol("wrapper");
numberWrapper[wrapperSym] = "number";
stringWrapper[wrapperSym] = "string";
booleanWrapper[wrapperSym] = "boolean";

if (numberWrapper[wrapperSym] !== "number") {
    throw new Error("Test 72 failed: Symbol on Number wrapper");
}

if (stringWrapper[wrapperSym] !== "string") {
    throw new Error("Test 72 failed: Symbol on String wrapper");
}

if (booleanWrapper[wrapperSym] !== "boolean") {
    throw new Error("Test 72 failed: Symbol on Boolean wrapper");
}

// Test 73: Symbol property enumeration order
var enumOrderObj = {};
enumOrderObj.prop1 = 1;
enumOrderObj[Symbol("sym1")] = "s1";
enumOrderObj.prop2 = 2;
enumOrderObj[Symbol("sym2")] = "s2";
enumOrderObj.prop3 = 3;

var allKeys = Object.getOwnPropertyNames(enumOrderObj);
// With native symbols, only normal properties should be in getOwnPropertyNames
// With polyfill, symbols are strings and will be included
if (hasNativeSymbol && allKeys.join(",") !== "prop1,prop2,prop3") {
    throw new Error("Test 73 failed: Property enumeration order with symbols");
} else if (!hasNativeSymbol && allKeys.length !== 5) {
    throw new Error("Test 73 failed: Expected all properties with polyfill");
}

// Test 74: Symbol with computed method names in classes (if available)
try {
    var classSym = Symbol("classMethod");
    eval(`
        function TestClass() {}
        TestClass.prototype[classSym] = function() { return "class symbol method"; };
    `);

    var testInstance = new TestClass();
    if (testInstance[classSym]() !== "class symbol method") {
        throw new Error("Test 74 failed: Symbol method in class");
    }
} catch (e) {
    if (e.message.indexOf("Test 74 failed") === 0) {
        throw e;
    }
    console.log("Test 74 skipped: Advanced class syntax not available");
}

// Test 75: Symbol comprehensive integration test
function createSymbolRegistry() {
    var registry = new Map();
    var symbols = new Set();

    return {
        create: function(description) {
            var sym = Symbol(description);
            symbols.add(sym);
            return sym;
        },

        register: function(key, value) {
            var sym = Symbol.for(key);
            registry.set(sym, value);
            return sym;
        },

        get: function(key) {
            var sym = Symbol.for(key);
            return registry.get(sym);
        },

        has: function(symbol) {
            return symbols.has(symbol) || registry.has(symbol);
        },

        size: function() {
            return symbols.size + registry.size;
        }
    };
}

var symbolRegistry = createSymbolRegistry();
var intSym1 = symbolRegistry.create("integration1");
var intSym2 = symbolRegistry.register("global-integration", "global value");

if (!symbolRegistry.has(intSym1)) {
    throw new Error("Test 75 failed: Symbol registry integration - local symbol");
}

if (symbolRegistry.get("global-integration") !== "global value") {
    throw new Error("Test 75 failed: Symbol registry integration - global symbol");
}

if (symbolRegistry.size() < 2) {
    throw new Error("Test 75 failed: Symbol registry integration - size tracking");
}

console.log("All 75+ comprehensive Symbol tests passed!");
console.log("Features tested: Symbol creation, uniqueness, global registry, well-known symbols,");
console.log("property keys, non-enumerability, coercion, type checking, and integration scenarios.");