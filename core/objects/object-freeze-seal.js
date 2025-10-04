/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object.freeze, Object.seal, Object.preventExtensions
 */

// Test Object.freeze
var obj = {a: 1, b: 2};
var frozen = Object.freeze(obj);
if (frozen !== obj) throw new Error("Object.freeze should return the same object");

// Test that frozen object cannot be modified
obj.a = 100;
if (obj.a !== 1) throw new Error("Frozen object properties should not be modifiable");

obj.c = 3;
if (obj.c === 3) throw new Error("Frozen object should not accept new properties");

delete obj.b;
if (obj.b !== 2) throw new Error("Frozen object properties should not be deletable");

// Test Object.isFrozen
if (!Object.isFrozen(obj)) throw new Error("Object should be frozen");

var unfrozen = {x: 1};
if (Object.isFrozen(unfrozen)) throw new Error("Unfrozen object should not be frozen");

// Test Object.seal
var sealObj = {a: 1, b: 2};
Object.seal(sealObj);

// Sealed object properties can be modified but not added/deleted
sealObj.a = 100;
if (sealObj.a !== 100) throw new Error("Sealed object properties should be modifiable");

sealObj.c = 3;
if (sealObj.c === 3) throw new Error("Sealed object should not accept new properties");

delete sealObj.b;
if (sealObj.b !== 2) throw new Error("Sealed object properties should not be deletable");

// Test Object.isSealed
if (!Object.isSealed(sealObj)) throw new Error("Object should be sealed");
if (Object.isSealed(unfrozen)) throw new Error("Unsealed object should not be sealed");

// Test Object.preventExtensions
var extObj = {a: 1};
Object.preventExtensions(extObj);

// Properties can be modified and deleted, but not added
extObj.a = 100;
if (extObj.a !== 100) throw new Error("Non-extensible object properties should be modifiable");

delete extObj.a;
if (extObj.a === 100) throw new Error("Non-extensible object properties should be deletable");

extObj.b = 2;
if (extObj.b === 2) throw new Error("Non-extensible object should not accept new properties");

// Test Object.isExtensible
if (Object.isExtensible(extObj)) throw new Error("Object should not be extensible");

var extensible = {};
if (!Object.isExtensible(extensible)) throw new Error("Regular object should be extensible");

// Test relationship between freeze, seal, and preventExtensions
var testObj = {};
if (Object.isSealed(testObj)) throw new Error("Regular object should not be sealed");
if (Object.isFrozen(testObj)) throw new Error("Regular object should not be frozen");

Object.preventExtensions(testObj);
if (Object.isExtensible(testObj)) throw new Error("Object should not be extensible after preventExtensions");

// Test that frozen objects are also sealed and non-extensible
var freezeTest = {a: 1};
Object.freeze(freezeTest);
if (!Object.isSealed(freezeTest)) throw new Error("Frozen object should be sealed");
if (Object.isExtensible(freezeTest)) throw new Error("Frozen object should not be extensible");

// Test that sealed objects are non-extensible
var sealTest = {a: 1};
Object.seal(sealTest);
if (Object.isExtensible(sealTest)) throw new Error("Sealed object should not be extensible");