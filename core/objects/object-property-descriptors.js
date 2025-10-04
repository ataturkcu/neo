/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object Property Descriptors
 */

// Test Object.defineProperty
var obj = {};
Object.defineProperty(obj, "prop", {
    value: 42,
    writable: false,
    enumerable: true,
    configurable: true
});

if (obj.prop !== 42) throw new Error("Property value should be 42");

// Test writable: false
try {
    obj.prop = 100;
    if (obj.prop !== 42) throw new Error("Non-writable property should not change in strict mode");
} catch (e) {
    // In strict mode, assignment to non-writable throws
}

// Test Object.getOwnPropertyDescriptor
var descriptor = Object.getOwnPropertyDescriptor(obj, "prop");
if (!descriptor) throw new Error("getOwnPropertyDescriptor should return descriptor");
if (descriptor.value !== 42) throw new Error("Descriptor value should be 42");
if (descriptor.writable !== false) throw new Error("Descriptor writable should be false");
if (descriptor.enumerable !== true) throw new Error("Descriptor enumerable should be true");
if (descriptor.configurable !== true) throw new Error("Descriptor configurable should be true");

// Test non-existent property
var nonExistent = Object.getOwnPropertyDescriptor(obj, "nonExistent");
if (nonExistent !== undefined) throw new Error("Non-existent property descriptor should be undefined");

// Test enumerable: false
Object.defineProperty(obj, "hidden", {
    value: "secret",
    enumerable: false
});

var keys = [];
for (var key in obj) {
    keys.push(key);
}
if (keys.indexOf("hidden") !== -1) throw new Error("Non-enumerable property should not appear in for-in");
if (keys.indexOf("prop") === -1) throw new Error("Enumerable property should appear in for-in");

// Test configurable: false
Object.defineProperty(obj, "permanent", {
    value: "cannot delete",
    configurable: false
});

delete obj.permanent;
if (obj.permanent !== "cannot delete") throw new Error("Non-configurable property should not be deletable");

// Test accessor properties
var accessorObj = {};
var _value = 0;
Object.defineProperty(accessorObj, "accessor", {
    get: function() { return _value; },
    set: function(val) { _value = val * 2; },
    enumerable: true,
    configurable: true
});

accessorObj.accessor = 5;
if (accessorObj.accessor !== 10) throw new Error("Accessor should double the value");

var accessorDesc = Object.getOwnPropertyDescriptor(accessorObj, "accessor");
if (typeof accessorDesc.get !== "function") throw new Error("Accessor descriptor should have get function");
if (typeof accessorDesc.set !== "function") throw new Error("Accessor descriptor should have set function");
if (accessorDesc.value !== undefined) throw new Error("Accessor descriptor should not have value");
if (accessorDesc.writable !== undefined) throw new Error("Accessor descriptor should not have writable");