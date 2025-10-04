/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Destructuring Assignment Basic Functionality (ES2015)
 */

// Test array destructuring
var [a, b, c] = [1, 2, 3];
if (a !== 1) throw new Error("Array destructuring: a should be 1");
if (b !== 2) throw new Error("Array destructuring: b should be 2");
if (c !== 3) throw new Error("Array destructuring: c should be 3");

// Test array destructuring with skipping
var [first, , third] = [10, 20, 30];
if (first !== 10) throw new Error("Array destructuring skip: first should be 10");
if (third !== 30) throw new Error("Array destructuring skip: third should be 30");

// Test array destructuring with rest
var [head, ...tail] = [1, 2, 3, 4, 5];
if (head !== 1) throw new Error("Array destructuring rest: head should be 1");
if (!Array.isArray(tail)) throw new Error("Array destructuring rest: tail should be array");
if (tail.length !== 4) throw new Error("Array destructuring rest: tail should have 4 elements");
if (tail[0] !== 2) throw new Error("Array destructuring rest: tail[0] should be 2");

// Test array destructuring with defaults
var [x = 10, y = 20] = [5];
if (x !== 5) throw new Error("Array destructuring default: x should be 5");
if (y !== 20) throw new Error("Array destructuring default: y should use default 20");

// Test object destructuring
var {name, age} = {name: "John", age: 30, city: "NYC"};
if (name !== "John") throw new Error("Object destructuring: name should be 'John'");
if (age !== 30) throw new Error("Object destructuring: age should be 30");

// Test object destructuring with renaming
var {name: fullName, age: years} = {name: "Jane", age: 25};
if (fullName !== "Jane") throw new Error("Object destructuring rename: fullName should be 'Jane'");
if (years !== 25) throw new Error("Object destructuring rename: years should be 25");

// Test object destructuring with defaults
var {prop1 = "default1", prop2 = "default2"} = {prop1: "value1"};
if (prop1 !== "value1") throw new Error("Object destructuring default: prop1 should be 'value1'");
if (prop2 !== "default2") throw new Error("Object destructuring default: prop2 should use default");

// Test object destructuring with rest
var {a: objA, ...objRest} = {a: 1, b: 2, c: 3, d: 4};
if (objA !== 1) throw new Error("Object destructuring rest: a should be 1");
if (typeof objRest !== "object") throw new Error("Object destructuring rest: rest should be object");
if (objRest.b !== 2) throw new Error("Object destructuring rest: rest.b should be 2");
if (objRest.c !== 3) throw new Error("Object destructuring rest: rest.c should be 3");
if (objRest.d !== 4) throw new Error("Object destructuring rest: rest.d should be 4");
if (objRest.a !== undefined) throw new Error("Object destructuring rest: rest should not have 'a'");

// Test nested destructuring
var {person: {name: personName, details: {age: personAge}}} = {
    person: {
        name: "Alice",
        details: {age: 28}
    }
};
if (personName !== "Alice") throw new Error("Nested destructuring: personName should be 'Alice'");
if (personAge !== 28) throw new Error("Nested destructuring: personAge should be 28");

// Test destructuring in function parameters
function testFunctionDestructuring({x, y}, [a, b]) {
    if (x !== 1) throw new Error("Function param destructuring: x should be 1");
    if (y !== 2) throw new Error("Function param destructuring: y should be 2");
    if (a !== 10) throw new Error("Function param destructuring: a should be 10");
    if (b !== 20) throw new Error("Function param destructuring: b should be 20");
}

testFunctionDestructuring({x: 1, y: 2}, [10, 20]);

// Test destructuring with computed property names
var key = "dynamicKey";
var {[key]: dynamicValue} = {dynamicKey: "dynamic value"};
if (dynamicValue !== "dynamic value") throw new Error("Computed property destructuring should work");

// Test destructuring assignment (not declaration)
var existingA, existingB;
[existingA, existingB] = [100, 200];
if (existingA !== 100) throw new Error("Destructuring assignment: existingA should be 100");
if (existingB !== 200) throw new Error("Destructuring assignment: existingB should be 200");

// Test object destructuring assignment
var existingX, existingY;
({x: existingX, y: existingY} = {x: 500, y: 600});
if (existingX !== 500) throw new Error("Object destructuring assignment: existingX should be 500");
if (existingY !== 600) throw new Error("Object destructuring assignment: existingY should be 600");

// Test swapping variables with destructuring
var swap1 = 1, swap2 = 2;
[swap1, swap2] = [swap2, swap1];
if (swap1 !== 2) throw new Error("Variable swap: swap1 should be 2");
if (swap2 !== 1) throw new Error("Variable swap: swap2 should be 1");

// Test destructuring with mixed defaults and renaming
var {prop: renamedProp = "default"} = {};
if (renamedProp !== "default") throw new Error("Destructuring rename with default should work");

// Test array destructuring from string
var [char1, char2, char3] = "abc";
if (char1 !== "a") throw new Error("String destructuring: char1 should be 'a'");
if (char2 !== "b") throw new Error("String destructuring: char2 should be 'b'");
if (char3 !== "c") throw new Error("String destructuring: char3 should be 'c'");

// Test destructuring with undefined/null handling
var [safe1 = "safe"] = [];
if (safe1 !== "safe") throw new Error("Destructuring should handle empty array");

var {safeProp = "safe"} = {};
if (safeProp !== "safe") throw new Error("Destructuring should handle empty object");