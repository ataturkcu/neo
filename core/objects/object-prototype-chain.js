/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object Prototype Chain
 */

// Test basic prototype chain
var parent = {parentProp: "parent value"};
var child = Object.create(parent);
child.childProp = "child value";

if (child.childProp !== "child value") throw new Error("Child should have own property");
if (child.parentProp !== "parent value") throw new Error("Child should inherit parent property");

// Test Object.getPrototypeOf
var childProto = Object.getPrototypeOf(child);
if (childProto !== parent) throw new Error("getPrototypeOf should return parent");

// Test hasOwnProperty
if (!child.hasOwnProperty("childProp")) throw new Error("child should have own property 'childProp'");
if (child.hasOwnProperty("parentProp")) throw new Error("child should not have own property 'parentProp'");

// Test property lookup chain
child.parentProp = "overridden";
if (child.parentProp !== "overridden") throw new Error("Child should override parent property");
if (parent.parentProp !== "parent value") throw new Error("Parent property should remain unchanged");

// Test Object.create with null prototype
var noProto = Object.create(null);
noProto.prop = "value";
if (Object.getPrototypeOf(noProto) !== null) throw new Error("Object created with null prototype should have null prototype");
if (typeof noProto.toString === "function") throw new Error("Object with null prototype should not inherit Object.prototype methods");

// Test in operator vs hasOwnProperty
if (!("parentProp" in child)) throw new Error("'in' operator should find inherited properties");
if (!("childProp" in child)) throw new Error("'in' operator should find own properties");

// Test prototype chain modification
var grandparent = {grandparentProp: "grandparent"};
Object.setPrototypeOf(parent, grandparent);
if (child.grandparentProp !== "grandparent") throw new Error("Child should inherit from grandparent through chain");

// Test constructor property
function Constructor() {}
Constructor.prototype.method = function() { return "method result"; };

var instance = new Constructor();
if (instance.constructor !== Constructor) throw new Error("Instance should have constructor property");
if (instance.method() !== "method result") throw new Error("Instance should inherit prototype methods");

// Test prototype property changes affect existing instances
Constructor.prototype.newMethod = function() { return "new method"; };
if (instance.newMethod() !== "new method") throw new Error("Existing instances should see new prototype methods");

// Test Object.prototype as root
var obj = {};
var proto = Object.getPrototypeOf(obj);
if (proto !== Object.prototype) throw new Error("Object literal should have Object.prototype as prototype");
if (Object.getPrototypeOf(Object.prototype) !== null) throw new Error("Object.prototype should have null prototype");