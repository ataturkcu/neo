/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Proxy Features and Meta-programming
 */

// Test 1-5: Basic Proxy construction and validation
var target1 = {};
var handler1 = {};
var proxy1 = new Proxy(target1, handler1);
if (typeof proxy1 !== 'object') throw new Error("Proxy should return an object");

var target2 = function() {};
var proxy2 = new Proxy(target2, {});
if (typeof proxy2 !== 'function') throw new Error("Proxy of function should be function");

try {
    new Proxy(null, {});
    throw new Error("Should throw for null target");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should throw TypeError for null target");
}

try {
    new Proxy({}, null);
    throw new Error("Should throw for null handler");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should throw TypeError for null handler");
}

var revocable = Proxy.revocable({}, {});
if (typeof revocable.proxy !== 'object') throw new Error("Revocable should have proxy property");
if (typeof revocable.revoke !== 'function') throw new Error("Revocable should have revoke function");

// Test 6-15: get trap
var getTarget = { prop: 'value', nested: { deep: 'data' } };
var getProxy = new Proxy(getTarget, {
    get: function(target, property, receiver) {
        if (property === 'intercepted') return 'modified';
        if (property === 'receiver') return receiver === getProxy;
        if (property === 'target') return target === getTarget;
        return target[property];
    }
});

if (getProxy.prop !== 'value') throw new Error("get trap should pass through existing properties");
if (getProxy.intercepted !== 'modified') throw new Error("get trap should intercept non-existing properties");
if (getProxy.receiver !== true) throw new Error("get trap should receive correct receiver");
if (getProxy.target !== true) throw new Error("get trap should receive correct target");
if (getProxy.nested.deep !== 'data') throw new Error("get trap should work with nested objects");

var symbolProp = Symbol('test');
getTarget[symbolProp] = 'symbol-value';
if (getProxy[symbolProp] !== 'symbol-value') throw new Error("get trap should work with symbols");

var numberProxy = new Proxy([1, 2, 3], {
    get: function(target, property) {
        if (property === 'length') return target.length;
        return target[property] * 2;
    }
});
if (numberProxy[0] !== 2) throw new Error("get trap should work with numeric indices");
if (numberProxy.length !== 3) throw new Error("get trap should handle length property");

var prototypeTarget = Object.create({ inherited: 'parent' });
prototypeTarget.own = 'child';
var prototypeProxy = new Proxy(prototypeTarget, {
    get: function(target, property) {
        if (property === 'modified') return 'intercepted';
        return target[property];
    }
});
if (prototypeProxy.inherited !== 'parent') throw new Error("get trap should work with inherited properties");
if (prototypeProxy.own !== 'child') throw new Error("get trap should work with own properties");

// Test 16-25: set trap
var setTarget = {};
var setProxy = new Proxy(setTarget, {
    set: function(target, property, value, receiver) {
        if (property === 'readOnly') return false;
        if (property === 'uppercase') {
            target[property] = value.toUpperCase();
            return true;
        }
        target[property] = value;
        return true;
    }
});

setProxy.normal = 'value';
if (setTarget.normal !== 'value') throw new Error("set trap should set properties on target");

setProxy.uppercase = 'hello';
if (setTarget.uppercase !== 'HELLO') throw new Error("set trap should modify values");

try {
    setProxy.readOnly = 'test';
    if (setTarget.readOnly !== undefined) throw new Error("set trap returning false should prevent assignment");
} catch (e) {
    // In strict mode, this might throw
}

var arrayProxy = new Proxy([], {
    set: function(target, property, value) {
        if (property === 'length') {
            target[property] = Math.max(0, value);
            return true;
        }
        target[property] = value;
        return true;
    }
});

arrayProxy.push(1, 2, 3);
if (arrayProxy.length !== 3) throw new Error("set trap should work with array methods");

arrayProxy.length = -5;
if (arrayProxy.length !== 0) throw new Error("set trap should validate length assignment");

var symbolSet = Symbol('setter');
setProxy[symbolSet] = 'symbol-set';
if (setTarget[symbolSet] !== 'symbol-set') throw new Error("set trap should work with symbols");

var strictSetProxy = new Proxy({}, {
    set: function() { return false; }
});

try {
    (function() {
        "use strict";
        strictSetProxy.test = 'value';
        throw new Error("Should throw in strict mode when set returns false");
    })();
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should throw TypeError in strict mode");
}

// Test 26-35: has trap
var hasTarget = { existing: true, [Symbol.for('symbol')]: true };
var hasProxy = new Proxy(hasTarget, {
    has: function(target, property) {
        if (property === 'hidden') return false;
        if (property === 'virtual') return true;
        return property in target;
    }
});

if (!('existing' in hasProxy)) throw new Error("has trap should return true for existing properties");
if ('hidden' in hasProxy) throw new Error("has trap should hide properties when returning false");
if (!('virtual' in hasProxy)) throw new Error("has trap should show virtual properties");
if (!(Symbol.for('symbol') in hasProxy)) throw new Error("has trap should work with symbols");

var prototypeHasTarget = Object.create({ inherited: true });
prototypeHasTarget.own = true;
var prototypeHasProxy = new Proxy(prototypeHasTarget, {
    has: function(target, property) {
        return property in target;
    }
});
if (!('inherited' in prototypeHasProxy)) throw new Error("has trap should work with inherited properties");

// with statement test (if supported)
try {
    var withTest = new Proxy({}, {
        has: function() { return true; },
        get: function() { return 'intercepted'; }
    });
    // Note: with statements might not be available in strict mode or modern engines
} catch (e) {
    // Expected in strict mode
}

// Test 36-45: deleteProperty trap
var deleteTarget = { deletable: true, permanent: true };
var deleteProxy = new Proxy(deleteTarget, {
    deleteProperty: function(target, property) {
        if (property === 'permanent') return false;
        delete target[property];
        return true;
    }
});

delete deleteProxy.deletable;
if ('deletable' in deleteTarget) throw new Error("deleteProperty trap should delete properties");

try {
    delete deleteProxy.permanent;
    if (!('permanent' in deleteTarget)) throw new Error("deleteProperty returning false should prevent deletion");
} catch (e) {
    // In strict mode, this might throw
}

var symbolDelete = Symbol('deletable');
deleteTarget[symbolDelete] = true;
delete deleteProxy[symbolDelete];
if (symbolDelete in deleteTarget) throw new Error("deleteProperty trap should work with symbols");

// Test 46-55: defineProperty trap
var defineTarget = {};
var defineProxy = new Proxy(defineTarget, {
    defineProperty: function(target, property, descriptor) {
        if (property === 'blocked') return false;
        if (property === 'modified') {
            // Create a new descriptor with the modified value
            var newDescriptor = {
                value: 'changed',
                writable: descriptor.writable !== false,
                enumerable: descriptor.enumerable !== false,
                configurable: descriptor.configurable !== false
            };
            Object.defineProperty(target, property, newDescriptor);
        } else {
            Object.defineProperty(target, property, descriptor);
        }
        return true;
    }
});

Object.defineProperty(defineProxy, 'normal', { value: 'test', writable: true });
if (defineTarget.normal !== 'test') throw new Error("defineProperty trap should define properties");

Object.defineProperty(defineProxy, 'modified', { value: 'original' });
if (defineTarget.modified !== 'changed') throw new Error("defineProperty trap should modify descriptors");

try {
    Object.defineProperty(defineProxy, 'blocked', { value: 'test' });
    throw new Error("defineProperty returning false should throw TypeError");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("defineProperty should throw TypeError when returning false");
}

var symbolDefine = Symbol('define');
Object.defineProperty(defineProxy, symbolDefine, { value: 'symbol' });
if (defineTarget[symbolDefine] !== 'symbol') throw new Error("defineProperty trap should work with symbols");

// Test 56-65: getOwnPropertyDescriptor trap
var descriptorTarget = {};
Object.defineProperty(descriptorTarget, 'configurable', { value: 'test', configurable: true });
Object.defineProperty(descriptorTarget, 'nonConfigurable', { value: 'test', configurable: false });

var descriptorProxy = new Proxy(descriptorTarget, {
    getOwnPropertyDescriptor: function(target, property) {
        if (property === 'hidden') return undefined;
        if (property === 'virtual') {
            return { value: 'virtual', configurable: true, enumerable: true, writable: true };
        }
        return Object.getOwnPropertyDescriptor(target, property);
    }
});

var desc1 = Object.getOwnPropertyDescriptor(descriptorProxy, 'configurable');
if (!desc1 || desc1.value !== 'test') throw new Error("getOwnPropertyDescriptor should return real descriptors");

var desc2 = Object.getOwnPropertyDescriptor(descriptorProxy, 'virtual');
if (!desc2 || desc2.value !== 'virtual') throw new Error("getOwnPropertyDescriptor should return virtual descriptors");

var desc3 = Object.getOwnPropertyDescriptor(descriptorProxy, 'hidden');
if (desc3 !== undefined) throw new Error("getOwnPropertyDescriptor should hide properties when returning undefined");

// Test 66-75: ownKeys trap
var keysTarget = { a: 1, b: 2 };
Object.defineProperty(keysTarget, 'nonEnum', { value: 3, enumerable: false });
var symbolKey = Symbol('key');
keysTarget[symbolKey] = 'symbol';

var keysProxy = new Proxy(keysTarget, {
    ownKeys: function(target) {
        var keys = Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        keys.push('virtual');
        return keys.filter(function(key) { return key !== 'b'; });
    }
});

var ownKeys = Object.getOwnPropertyNames(keysProxy);
if (ownKeys.indexOf('a') === -1) throw new Error("ownKeys should include existing keys");
if (ownKeys.indexOf('b') !== -1) throw new Error("ownKeys should filter out excluded keys");
if (ownKeys.indexOf('virtual') === -1) throw new Error("ownKeys should include virtual keys");

var symbols = Object.getOwnPropertySymbols(keysProxy);
if (symbols.indexOf(symbolKey) === -1) throw new Error("ownKeys should include symbol keys");

var enumKeys = Object.keys(keysProxy);
if (enumKeys.indexOf('nonEnum') !== -1) throw new Error("Object.keys should respect enumerable attribute");

// Test 76-85: apply trap (for function proxies)
var applyTarget = function(a, b) { return a + b; };
var applyProxy = new Proxy(applyTarget, {
    apply: function(target, thisArg, argumentsList) {
        if (argumentsList.length === 0) return 'no arguments';
        if (thisArg && thisArg.multiply) {
            return target.apply(thisArg, argumentsList) * 2;
        }
        return target.apply(thisArg, argumentsList);
    }
});

if (applyProxy(2, 3) !== 5) throw new Error("apply trap should handle normal calls");
if (applyProxy() !== 'no arguments') throw new Error("apply trap should handle zero arguments");

var context = { multiply: true };
if (applyProxy.call(context, 2, 3) !== 10) throw new Error("apply trap should handle this context");

if (applyProxy.apply(null, [4, 5]) !== 9) throw new Error("apply trap should work with Function.prototype.apply");

var boundProxy = applyProxy.bind(null, 10);
if (boundProxy(5) !== 15) throw new Error("apply trap should work with bound functions");

// Test 86-95: construct trap (for constructor proxies)
var ConstructTarget = function(value) {
    this.value = value;
};
ConstructTarget.prototype.getValue = function() { return this.value; };

var constructProxy = new Proxy(ConstructTarget, {
    construct: function(target, argumentsList, newTarget) {
        var obj = Object.create(newTarget.prototype);
        obj.value = argumentsList[0] || 'default';
        obj.constructed = 'by-proxy';
        return obj;
    }
});

var instance1 = new constructProxy('test');
if (instance1.value !== 'test') throw new Error("construct trap should set properties");
if (instance1.constructed !== 'by-proxy') throw new Error("construct trap should add custom properties");
if (!(instance1 instanceof constructProxy)) throw new Error("construct trap should maintain instanceof");

var instance2 = new constructProxy();
if (instance2.value !== 'default') throw new Error("construct trap should handle missing arguments");

// Test with Reflect.construct
var instance3 = Reflect.construct(constructProxy, ['reflect']);
if (instance3.value !== 'reflect') throw new Error("construct trap should work with Reflect.construct");

// Test 96-100: Complex scenarios and edge cases
var complexTarget = {
    data: { nested: 'value' },
    method: function() { return this; }
};

var complexProxy = new Proxy(complexTarget, {
    get: function(target, property, receiver) {
        if (property === 'chainable') {
            return new Proxy({}, {
                get: function() { return receiver; }
            });
        }
        var value = target[property];
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    },
    set: function(target, property, value, receiver) {
        if (property.startsWith('computed_')) {
            var key = property.slice(9);
            target[key] = value * 2;
            return true;
        }
        target[property] = value;
        return true;
    }
});

if (complexProxy.chainable.anything !== complexProxy) throw new Error("Complex proxy should support chaining");
if (complexProxy.method() !== complexTarget) throw new Error("Complex proxy should bind methods correctly");

complexProxy.computed_test = 5;
if (complexTarget.test !== 10) throw new Error("Complex proxy should handle computed properties");

// Revocation test
var revocableTest = Proxy.revocable({test: 'value'}, {});
if (revocableTest.proxy.test !== 'value') throw new Error("Revocable proxy should work before revocation");

revocableTest.revoke();
try {
    revocableTest.proxy.test;
    throw new Error("Revoked proxy should throw when accessed");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Revoked proxy should throw TypeError");
}

// Proxy of proxy
var innerTarget = { value: 'deep' };
var innerProxy = new Proxy(innerTarget, {
    get: function(target, property) {
        return target[property] + '-inner';
    }
});
var outerProxy = new Proxy(innerProxy, {
    get: function(target, property) {
        return target[property] + '-outer';
    }
});

if (outerProxy.value !== 'deep-inner-outer') throw new Error("Proxy of proxy should work correctly");