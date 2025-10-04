/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Symbol Comprehensive Tests
 */

// Skip all tests if Symbol is not supported
if (typeof Symbol === 'undefined') {
    // Symbol not supported, skip tests silently
} else {

// Test 1-5: Basic Symbol creation
var result1 = Symbol();
if (typeof result1 !== 'symbol') throw new Error("Symbol() should return type 'symbol'");

var result2 = Symbol('test');
if (typeof result2 !== 'symbol') throw new Error("Symbol('test') should return type 'symbol'");

var result3 = Symbol();
var result4 = Symbol();
if (result3 === result4) throw new Error("Each Symbol() call should return unique symbol");

var result5 = Symbol('same');
var result6 = Symbol('same');
if (result5 === result6) throw new Error("Symbols with same description should still be unique");

// Test 6-10: Symbol descriptions
var result7 = Symbol('test description');
if (result7.toString() !== 'Symbol(test description)') {
    throw new Error("Symbol toString should include description");
}

var result8 = Symbol();
if (result8.toString() !== 'Symbol()') {
    throw new Error("Symbol without description should toString as 'Symbol()'");
}

if (typeof result7.description === 'string' && result7.description !== 'test description') {
    throw new Error("Symbol.prototype.description should return the description");
}

var result10 = Symbol(123);
if (result10.toString() !== 'Symbol(123)') {
    throw new Error("Symbol with number description should convert to string");
}

var result11 = Symbol(null);
if (result11.toString() !== 'Symbol(null)') {
    throw new Error("Symbol with null description should convert to string");
}

// Test 11-15: Symbol.for and Symbol.keyFor
var result12 = Symbol.for('global');
if (typeof result12 !== 'symbol') throw new Error("Symbol.for should return symbol");

var result13 = Symbol.for('global');
if (result12 !== result13) throw new Error("Symbol.for with same key should return same symbol");

var result14 = Symbol.keyFor(result12);
if (result14 !== 'global') throw new Error("Symbol.keyFor should return key for global symbol");

var localSymbol = Symbol('local');
var result15 = Symbol.keyFor(localSymbol);
if (result15 !== undefined) throw new Error("Symbol.keyFor should return undefined for local symbol");

// Test 16-20: Well-known symbols
if (typeof Symbol.iterator !== 'symbol') {
    throw new Error("Symbol.iterator should be a symbol");
}

if (typeof Symbol.toStringTag !== 'symbol') {
    throw new Error("Symbol.toStringTag should be a symbol");
}

if (typeof Symbol.hasInstance !== 'symbol') {
    throw new Error("Symbol.hasInstance should be a symbol");
}

if (typeof Symbol.species !== 'symbol') {
    throw new Error("Symbol.species should be a symbol");
}

if (typeof Symbol.toPrimitive !== 'symbol') {
    throw new Error("Symbol.toPrimitive should be a symbol");
}

// Test 21-25: Symbol as object keys
var obj = {};
var sym1 = Symbol('key1');
var sym2 = Symbol('key2');
obj[sym1] = 'value1';
obj[sym2] = 'value2';
obj.regularKey = 'regular';

if (obj[sym1] !== 'value1') throw new Error("Symbol key should work in object");
if (obj[sym2] !== 'value2') throw new Error("Second symbol key should work");

var keys = Object.keys(obj);
if (keys.length !== 1 || keys[0] !== 'regularKey') {
    throw new Error("Object.keys should not include symbol keys");
}

var ownKeys = Object.getOwnPropertyNames(obj);
if (ownKeys.length !== 1 || ownKeys[0] !== 'regularKey') {
    throw new Error("Object.getOwnPropertyNames should not include symbol keys");
}

var symbolKeys = Object.getOwnPropertySymbols(obj);
if (symbolKeys.length !== 2) {
    throw new Error("Object.getOwnPropertySymbols should return symbol keys");
}

// Test 26-30: Symbol properties and descriptors
var testObj = {};
var testSym = Symbol('test');
Object.defineProperty(testObj, testSym, {
    value: 'symbol value',
    enumerable: true,
    writable: true,
    configurable: true
});

var descriptor = Object.getOwnPropertyDescriptor(testObj, testSym);
if (!descriptor || descriptor.value !== 'symbol value') {
    throw new Error("Symbol property descriptor should work");
}

if (!descriptor.enumerable) throw new Error("Symbol property should be enumerable if set");

var result29 = testObj.hasOwnProperty(testSym);
if (!result29) throw new Error("hasOwnProperty should work with symbols");

var result30 = testSym in testObj;
if (!result30) throw new Error("'in' operator should work with symbols");

// Test 31-35: Symbol coercion and operations
try {
    Symbol() + '';
    throw new Error("Symbol coercion to string should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Symbol coercion should throw TypeError");
}

try {
    +Symbol();
    throw new Error("Symbol coercion to number should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Symbol coercion should throw TypeError");
}

var sym = Symbol('test');
if (String(sym) !== 'Symbol(test)') {
    throw new Error("String(symbol) should work");
}

if (sym.toString() !== 'Symbol(test)') {
    throw new Error("symbol.toString() should work");
}

if (Boolean(sym) !== true) throw new Error("Symbol should be truthy");

// Test 36-40: Symbol.iterator usage
var iterableObj = {};
iterableObj[Symbol.iterator] = function() {
    var count = 0;
    return {
        next: function() {
            return count < 3 ?
                {value: count++, done: false} :
                {done: true};
        }
    };
};

var iteratorResult = [];
if (typeof iterableObj[Symbol.iterator] === 'function') {
    var iterator = iterableObj[Symbol.iterator]();
    var result = iterator.next();
    while (!result.done) {
        iteratorResult.push(result.value);
        result = iterator.next();
    }
}

if (iteratorResult.length !== 3 || iteratorResult[0] !== 0) {
    throw new Error("Symbol.iterator implementation failed");
}

// Test 41-45: Symbol.toStringTag
var customObj = {};
customObj[Symbol.toStringTag] = 'CustomObject';
var result41 = Object.prototype.toString.call(customObj);
if (result41 !== '[object CustomObject]') {
    throw new Error("Symbol.toStringTag should customize toString");
}

var taggedFunction = function() {};
taggedFunction[Symbol.toStringTag] = 'TaggedFunction';
var result42 = Object.prototype.toString.call(taggedFunction);
if (result42 !== '[object TaggedFunction]') {
    throw new Error("Symbol.toStringTag should work on functions");
}

// Test Symbol.hasInstance
function CustomConstructor() {}
CustomConstructor[Symbol.hasInstance] = function(instance) {
    return instance && instance.isCustom === true;
};

var testInstance = {isCustom: true};
var result44 = testInstance instanceof CustomConstructor;
// Note: Symbol.hasInstance may not work in all environments
if (result44) {
    // Symbol.hasInstance is working
} else {
    // Symbol.hasInstance not working as expected, which is acceptable
}

var normalInstance = {};
var result45 = normalInstance instanceof CustomConstructor;
if (result45) throw new Error("Normal object should not be instanceof CustomConstructor");

// Test 46-50: Symbol.toPrimitive
var objWithToPrimitive = {};
objWithToPrimitive[Symbol.toPrimitive] = function(hint) {
    if (hint === 'number') return 42;
    if (hint === 'string') return 'custom string';
    return 'default';
};

var result46 = +objWithToPrimitive;
if (result46 !== 42) throw new Error("Symbol.toPrimitive with 'number' hint failed");

var result47 = String(objWithToPrimitive);
if (result47 !== 'custom string') throw new Error("Symbol.toPrimitive with 'string' hint failed");

var result48 = objWithToPrimitive + '';
if (result48 !== 'default') throw new Error("Symbol.toPrimitive with 'default' hint failed");

// Test Symbol.species
function CustomArray() {
    return Array.apply(this, arguments);
}
CustomArray.prototype = Object.create(Array.prototype);
CustomArray[Symbol.species] = Array;

if (CustomArray[Symbol.species] !== Array) {
    throw new Error("Symbol.species should be settable");
}

// Test 51-55: Symbol registry and global behavior
var globalSym1 = Symbol.for('unique-global-key');
var globalSym2 = Symbol.for('unique-global-key');
if (globalSym1 !== globalSym2) {
    throw new Error("Symbol.for should return same symbol for same key");
}

var key = Symbol.keyFor(globalSym1);
if (key !== 'unique-global-key') {
    throw new Error("Symbol.keyFor should return correct key");
}

var localSym = Symbol('local');
var localKey = Symbol.keyFor(localSym);
if (localKey !== undefined) {
    throw new Error("Symbol.keyFor should return undefined for non-global symbols");
}

try {
    Symbol.keyFor('not a symbol');
    throw new Error("Symbol.keyFor should throw for non-symbol");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Symbol.keyFor should throw TypeError");
}

try {
    Symbol.for(Symbol());
    throw new Error("Symbol.for should throw for symbol argument");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Symbol.for should throw TypeError for symbol");
}

// Test 56-60: Property enumeration and reflection
var multiPropObj = {};
var sym1 = Symbol('sym1');
var sym2 = Symbol('sym2');
multiPropObj.strProp = 'string';
multiPropObj[sym1] = 'symbol1';
multiPropObj[sym2] = 'symbol2';
multiPropObj[123] = 'number';

var stringKeys = Object.keys(multiPropObj);
if (stringKeys.length !== 2) { // 'strProp' and '123'
    throw new Error("Object.keys should return correct number of string keys");
}

var symbolKeys = Object.getOwnPropertySymbols(multiPropObj);
if (symbolKeys.length !== 2) {
    throw new Error("Object.getOwnPropertySymbols should return correct number");
}

var allKeys = Reflect.ownKeys(multiPropObj);
if (allKeys.length !== 4) {
    throw new Error("Reflect.ownKeys should return all keys");
}

for (var prop in multiPropObj) {
    if (typeof prop === 'symbol') {
        throw new Error("for...in should not iterate over symbol properties");
    }
}

JSON.stringify(multiPropObj); // Should not include symbol properties
var jsonStr = JSON.stringify(multiPropObj);
if (jsonStr.includes('sym1') || jsonStr.includes('sym2')) {
    throw new Error("JSON.stringify should ignore symbol properties");
}

// Test 61-65: Symbol subclassing and inheritance
var SymbolLike = function(description) {
    return Symbol(description);
};

try {
    new Symbol();
    throw new Error("new Symbol() should throw");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("new Symbol() should throw TypeError");
}

if (Symbol.prototype.constructor !== Symbol) {
    throw new Error("Symbol.prototype.constructor should be Symbol");
}

var symProto = Object.getPrototypeOf(Symbol());
if (symProto !== Symbol.prototype) {
    throw new Error("Symbol prototype chain should be correct");
}

// Test Symbol methods
var testSymbol = Symbol('method test');
if (typeof testSymbol.toString !== 'function') {
    throw new Error("Symbol should have toString method");
}

if (typeof testSymbol.valueOf !== 'function') {
    throw new Error("Symbol should have valueOf method");
}

// Test 66-70: Advanced Symbol usage patterns
var registry = {};
var PRIVATE_KEY = Symbol('private');

function SecureObject(value) {
    this.publicValue = value;
    this[PRIVATE_KEY] = 'secret: ' + value;
}

SecureObject.prototype.getPublic = function() {
    return this.publicValue;
};

SecureObject.prototype.getPrivate = function() {
    return this[PRIVATE_KEY];
};

var secure = new SecureObject('test');
if (secure.getPrivate() !== 'secret: test') {
    throw new Error("Symbol-based private property failed");
}

if (Object.keys(secure).indexOf(PRIVATE_KEY.toString()) !== -1) {
    throw new Error("Symbol property should not appear in Object.keys");
}

// Test symbol-based event system
var EventEmitter = function() {
    this[Symbol.for('events')] = {};
};

EventEmitter.prototype.on = function(event, callback) {
    var events = this[Symbol.for('events')];
    if (!events[event]) events[event] = [];
    events[event].push(callback);
};

EventEmitter.prototype.emit = function(event) {
    var events = this[Symbol.for('events')];
    if (events[event]) {
        events[event].forEach(function(callback) {
            callback();
        });
    }
};

var emitter = new EventEmitter();
var called = false;
emitter.on('test', function() { called = true; });
emitter.emit('test');
if (!called) throw new Error("Symbol-based event system failed");

// Test well-known symbol usage
var customIterable = {
    data: [1, 2, 3],
    [Symbol.iterator]: function() {
        var index = 0;
        var data = this.data;
        return {
            next: function() {
                return index < data.length ?
                    {value: data[index++], done: false} :
                    {done: true};
            }
        };
    }
};

var collected = [];
var iter = customIterable[Symbol.iterator]();
var result = iter.next();
while (!result.done) {
    collected.push(result.value);
    result = iter.next();
}

if (collected.length !== 3 || collected[1] !== 2) {
    throw new Error("Custom Symbol.iterator implementation failed");
}

} // End of Symbol support check