/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Object Creation
 */

// Test object literal creation
var obj1 = {};
if (typeof obj1 !== "object") throw new Error("Empty object should be of type object");

var obj2 = {name: "test", value: 42};
if (obj2.name !== "test") throw new Error("Property name should be 'test'");
if (obj2.value !== 42) throw new Error("Property value should be 42");

// Test Object constructor
var obj3 = new Object();
if (typeof obj3 !== "object") throw new Error("new Object() should be of type object");

// Test property access
obj3.prop = "hello";
if (obj3.prop !== "hello") throw new Error("Property assignment failed");
if (obj3["prop"] !== "hello") throw new Error("Bracket notation access failed");

// Test property deletion
delete obj3.prop;
if (obj3.prop !== undefined) throw new Error("Property deletion failed");