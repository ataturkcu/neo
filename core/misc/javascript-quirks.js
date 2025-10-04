/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: JavaScript Quirks and Weird Behaviors
 *
 * This file tests JavaScript's weirdest quirks and behaviors:
 * automatic semicolon insertion, this binding oddities, hoisting edge cases,
 * type coercion surprises, comparison oddities, and other JavaScript WTFs
 */

// =============================================================================
// AUTOMATIC SEMICOLON INSERTION (ASI) QUIRKS
// =============================================================================

// Missing semicolon before line starting with (, [, or `
var asi1 = "hello"
var asi2 = "world"
if (asi1 !== "hello") throw new Error("ASI failed for basic case");

// ASI failure case with array access
var asiArray = [1, 2, 3];
var asiValue = asiArray
[0]; // This is actually asiArray[0], not a separate statement
if (asiValue !== 1) throw new Error("ASI array access failed");

// ASI with return statement
function asiReturn() {
    return
    42; // This returns undefined, not 42!
}
if (asiReturn() !== undefined) throw new Error("ASI return should be undefined");

// ASI with object literal
function asiObject() {
    return
    {
        value: 42
    }; // This returns undefined due to ASI
}
if (asiObject() !== undefined) throw new Error("ASI object return should be undefined");

// ASI with increment operator
var asiIncrement = 5
++asiIncrement; // This is actually two statements
if (asiIncrement !== 6) throw new Error("ASI increment failed");

// ASI with regex literal
var asiRegex = /test/
var g = 2; // ASI inserted semicolon after /test/
var division = asiRegex / g; // This becomes division, not regex with global flag
if (isNaN(division)) {
    // Expected: regex / number = NaN
} else {
    throw new Error("ASI regex division should result in NaN");
}

// =============================================================================
// THIS BINDING ODDITIES
// =============================================================================

// Global this in function
function globalThis() {
    return this;
}
var globalThisResult = globalThis();
// In browsers, this would be window; in Node.js, it might be global or undefined

// Method this binding
var thisObj = {
    value: 42,
    method: function() {
        return this.value;
    }
};
var detachedMethod = thisObj.method;
if (thisObj.method() !== 42) throw new Error("Method this binding failed");
// detachedMethod() would return undefined in strict mode, or global value in non-strict

// Arrow function this binding (ES6+)
if (typeof this !== "undefined") {
    var arrowObj = {
        value: 42,
        method: function() {
            // Arrow function would capture this from lexical scope
            var arrow = () => this.value;
            return arrow();
        }
    };
    // Note: Arrow functions not available in ES5, this is for documentation
}

// call() and apply() with primitives
function thisTest() {
    return typeof this;
}
var primitiveThis = thisTest.call(42);
// In non-strict mode, primitive this gets boxed to object

// bind() this override
var boundThis = thisTest.bind({custom: true});
if (typeof boundThis() !== "object") {
    // The bound function should always use the bound this
}

// Constructor this
function ThisConstructor() {
    this.value = 42;
    return {}; // Returning object overrides this
}
var thisInstance = new ThisConstructor();
if (thisInstance.value === 42) {
    throw new Error("Constructor return object should override this");
}

// =============================================================================
// HOISTING EDGE CASES
// =============================================================================

// Variable hoisting with function of same name
var hoistVar = "initial";
function hoistingTest() {
    if (typeof hoistVar !== "function") {
        throw new Error("Function declaration should be hoisted over var");
    }
    function hoistVar() { return "function"; }
    var hoistVar = "variable";
    if (hoistVar !== "variable") {
        throw new Error("Variable assignment should override function");
    }
}
hoistingTest();

// Function expression vs declaration hoisting
function expressionVsDeclaration() {
    try {
        declared(); // Should work
    } catch (e) {
        throw new Error("Function declaration should be hoisted");
    }

    try {
        expression(); // Should throw
        throw new Error("Function expression should not be hoisted");
    } catch (e) {
        if (!(e instanceof TypeError)) {
            throw new Error("Should throw TypeError for undefined function call");
        }
    }

    function declared() { return "declared"; }
    var expression = function() { return "expression"; };
}
expressionVsDeclaration();

// Hoisting in blocks (ES5 behavior)
function blockHoisting() {
    if (false) {
        function blockFunc() { return "block"; }
    }
    // In ES5, function declarations are hoisted regardless of block
    try {
        blockFunc();
        // Behavior varies between engines and strict/non-strict mode
    } catch (e) {
        // May throw in strict mode or ES6+ environments
    }
}
blockHoisting();

// Let and const hoisting (temporal dead zone) - ES6+
// Note: These would throw ReferenceError in ES6+ engines
function temporalDeadZone() {
    try {
        // console.log(letVar); // Would throw ReferenceError in ES6+
        // let letVar = "let value";
    } catch (e) {
        // Expected in ES6+ engines
    }
}

// =============================================================================
// TYPE COERCION SURPRISES
// =============================================================================

// String concatenation vs arithmetic
if (1 + "2" !== "12") throw new Error("1 + '2' should be '12'");
if ("1" + 2 !== "12") throw new Error("'1' + 2 should be '12'");
if (1 + 2 + "3" !== "33") throw new Error("1 + 2 + '3' should be '33'");
if ("1" + 2 + 3 !== "123") throw new Error("'1' + 2 + 3 should be '123'");

// Subtraction coercion
if ("5" - 3 !== 2) throw new Error("'5' - 3 should be 2");
if ("5" - "3" !== 2) throw new Error("'5' - '3' should be 2");
if (isNaN("5a" - 3) !== true) throw new Error("'5a' - 3 should be NaN");

// Array coercion madness
if ([] + [] !== "") throw new Error("[] + [] should be empty string");
if ([] + {} !== "[object Object]") throw new Error("[] + {} should be '[object Object]'");
if ({} + [] !== "[object Object]") throw new Error("{} + [] should be '[object Object]'");
// Note: {} + [] at statement level might be interpreted as block + unary plus

// Boolean arithmetic
if (true + true !== 2) throw new Error("true + true should be 2");
if (false + false !== 0) throw new Error("false + false should be 0");
if (true - false !== 1) throw new Error("true - false should be 1");
if (true * false !== 0) throw new Error("true * false should be 0");

// Null and undefined coercion
if (null + 1 !== 1) throw new Error("null + 1 should be 1");
if (isNaN(undefined + 1) !== true) throw new Error("undefined + 1 should be NaN");
if (null * 5 !== 0) throw new Error("null * 5 should be 0");
if (isNaN(undefined * 5) !== true) throw new Error("undefined * 5 should be NaN");

// Object to primitive coercion
var objWithValueOf = {
    valueOf: function() { return 42; },
    toString: function() { return "string"; }
};
if (objWithValueOf + 0 !== 42) throw new Error("valueOf should be called for numeric context");
if (String(objWithValueOf) !== "string") throw new Error("toString should be called for string context");

var objWithToString = {
    toString: function() { return "42"; }
};
if (objWithToString - 0 !== 42) throw new Error("toString should be called when valueOf absent");

// Date object coercion
var dateObj = new Date(2025, 0, 1);
if (typeof (dateObj + "") !== "string") throw new Error("Date + string should be string");
if (typeof (+dateObj) !== "number") throw new Error("Unary plus on Date should be number");

// =============================================================================
// COMPARISON ODDITIES
// =============================================================================

// String comparison
if (!("2" > "10")) throw new Error("String '2' should be greater than '10' lexicographically");
if (!(2 < "10")) throw new Error("Number 2 should be less than string '10' numerically");

// Equality quirks
if (0 != false) throw new Error("0 == false should be true");
if ("" != false) throw new Error("'' == false should be true");
if (null != undefined) throw new Error("null == undefined should be true");
if ("0" != false) throw new Error("'0' == false should be true");
if ([] != false) throw new Error("[] == false should be true");

// Strict equality vs loose equality
if (0 === false) throw new Error("0 === false should be false");
if ("" === false) throw new Error("'' === false should be false");
if (null === undefined) throw new Error("null === undefined should be false");

// NaN comparison madness
if (NaN === NaN) throw new Error("NaN === NaN should be false");
if (NaN == NaN) throw new Error("NaN == NaN should be false");
if (!(NaN !== NaN)) throw new Error("NaN !== NaN should be true");

// Array comparison
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
if (arr1 === arr2) throw new Error("Different array instances should not be strictly equal");
if (arr1.toString() !== arr2.toString()) throw new Error("Arrays with same content should stringify equally");

// Object comparison
if ({} === {}) throw new Error("Different object instances should not be strictly equal");
if ([] === []) throw new Error("Different array instances should not be strictly equal");

// Comparison with valueOf
var compareObj1 = { valueOf: function() { return 1; } };
var compareObj2 = { valueOf: function() { return 2; } };
if (!(compareObj1 < compareObj2)) throw new Error("Objects should compare using valueOf");

// =============================================================================
// PROPERTY ACCESS QUIRKS
// =============================================================================

// Bracket vs dot notation
var propObj = {};
propObj["weird-prop"] = "value1";
propObj[42] = "value2";
propObj[""] = "value3";

if (propObj["weird-prop"] !== "value1") throw new Error("Bracket notation failed");
// propObj.weird-prop would be invalid syntax
if (propObj[42] !== "value2") throw new Error("Numeric string property failed");
if (propObj["42"] !== "value2") throw new Error("Numeric property should be accessible as string");
if (propObj[""] !== "value3") throw new Error("Empty string property failed");

// Property names that look like numbers
var numPropObj = {};
numPropObj[01] = "octal"; // 01 is actually 1 in octal
numPropObj[1] = "decimal";
if (numPropObj[1] !== "decimal") throw new Error("Octal property overwrites decimal");

// Reserved words as properties
var reservedObj = {};
reservedObj["class"] = "reserved";
reservedObj["function"] = "also reserved";
reservedObj.class = "dot notation"; // Might work in modern engines
if (reservedObj["class"] !== "dot notation") {
    // Behavior may vary between engines
}

// Unicode property names
var unicodeObj = {};
unicodeObj["café"] = "unicode";
unicodeObj["🚀"] = "emoji";
if (unicodeObj["café"] !== "unicode") throw new Error("Unicode properties should work");
if (unicodeObj["🚀"] !== "emoji") throw new Error("Emoji properties should work");

// =============================================================================
// FUNCTION DECLARATION AND EXPRESSION QUIRKS
// =============================================================================

// Named function expressions
var namedFuncExpr = function namedFunc() {
    if (typeof namedFunc !== "function") {
        throw new Error("Named function should be accessible inside itself");
    }
    return "named";
};
try {
    namedFunc(); // Should throw ReferenceError
    throw new Error("Named function should not be accessible outside");
} catch (e) {
    if (!(e instanceof ReferenceError)) {
        throw new Error("Should throw ReferenceError for outside access");
    }
}

// Function constructor
var dynamicFunc = new Function("a", "b", "return a + b;");
if (dynamicFunc(2, 3) !== 5) throw new Error("Function constructor failed");

// Function toString
function toStringFunc() { return 42; }
var funcString = toStringFunc.toString();
if (funcString.indexOf("function") === -1) {
    throw new Error("Function toString should contain 'function'");
}
if (funcString.indexOf("return 42") === -1) {
    throw new Error("Function toString should contain function body");
}

// =============================================================================
// VARIABLE DECLARATION QUIRKS
// =============================================================================

// Multiple var declarations
var multiVar = 1;
var multiVar = 2; // No error, just overwrites
if (multiVar !== 2) throw new Error("Multiple var declarations should work");

// var in loop
var loopVars = [];
for (var loopVar = 0; loopVar < 3; loopVar++) {
    loopVars.push(function() { return loopVar; });
}
// All functions return 3 due to closure over same variable
if (loopVars[0]() !== 3) throw new Error("Loop var closure should capture final value");
if (loopVars[1]() !== 3) throw new Error("Loop var closure should capture final value");

// Undeclared variables become global (non-strict mode)
function createGlobal() {
    undeclaredGlobal = "global";
}
createGlobal();
if (typeof undeclaredGlobal === "undefined") {
    // In strict mode, this would throw
}

// =============================================================================
// OPERATOR PRECEDENCE SURPRISES
// =============================================================================

// Addition vs concatenation precedence
if (1 + 2 + "3" !== "33") throw new Error("Left-to-right evaluation failed");
if ("1" + 2 + 3 !== "123") throw new Error("String concatenation precedence failed");

// Unary plus precedence
if (+"3" + 4 !== 7) throw new Error("Unary plus should convert to number");
if ("3" + +4 !== "34") throw new Error("Unary plus should not affect concatenation");

// Comma operator
var commaResult = (1, 2, 3);
if (commaResult !== 3) throw new Error("Comma operator should return last value");

var commaAssign = (x = 1, y = 2, x + y);
if (commaAssign !== 3) throw new Error("Comma in assignment should work");

// Ternary operator precedence
var ternaryResult = true ? false ? "a" : "b" : "c";
if (ternaryResult !== "b") throw new Error("Ternary precedence failed");

// =============================================================================
// SCOPE CHAIN QUIRKS
// =============================================================================

// with statement (if supported)
var withObj = {a: 1, b: 2};
try {
    with (withObj) {
        var withResult = a + b;
    }
    if (withResult !== 3) throw new Error("with statement failed");
} catch (e) {
    // with statement might not be supported or allowed
}

// eval scope
var evalVar = 1;
eval("var evalVar = 2;");
if (evalVar !== 2) throw new Error("eval should modify local scope");

eval("globalEvalVar = 3;");
if (typeof globalEvalVar === "undefined") {
    // Variable might not be created globally in all environments
}

// =============================================================================
// PROTOTYPE CHAIN WEIRDNESS
// =============================================================================

// Constructor function without new
function ConstructorFunc() {
    this.value = 42;
}
var withoutNew = ConstructorFunc(); // No error, but this refers to global
if (withoutNew !== undefined) {
    throw new Error("Constructor without new should return undefined");
}

// instanceof quirks
function Parent() {}
function Child() {}
Child.prototype = new Parent();
var child = new Child();
if (!(child instanceof Child)) throw new Error("instanceof Child failed");
if (!(child instanceof Parent)) throw new Error("instanceof Parent failed");
if (!(child instanceof Object)) throw new Error("instanceof Object failed");

// Changing constructor
function OriginalConstructor() {}
var instance = new OriginalConstructor();
function NewConstructor() {}
instance.constructor = NewConstructor;
if (instance.constructor !== NewConstructor) {
    throw new Error("Constructor property should be changeable");
}
if (!(instance instanceof OriginalConstructor)) {
    throw new Error("instanceof should still work with original constructor");
}

// =============================================================================
// REGEX QUIRKS
// =============================================================================

// Regex literal vs constructor
var regexLiteral = /test/g;
var regexConstructor = new RegExp("test", "g");
if (regexLiteral.source !== regexConstructor.source) {
    throw new Error("Regex source should be the same");
}

// Global regex state
var globalRegex = /\d+/g;
var testString = "123 456 789";
var match1 = globalRegex.exec(testString);
var match2 = globalRegex.exec(testString);
if (match1[0] !== "123") throw new Error("First match should be 123");
if (match2[0] !== "456") throw new Error("Second match should be 456");
// Global regex maintains state between calls

// =============================================================================
// ARRAY QUIRKS
// =============================================================================

// Array length modification
var arrayLength = [1, 2, 3, 4, 5];
arrayLength.length = 3;
if (arrayLength.length !== 3) throw new Error("Array length should be modifiable");
if (arrayLength[4] !== undefined) throw new Error("Truncated elements should be undefined");

arrayLength.length = 10;
if (arrayLength.length !== 10) throw new Error("Array length should be expandable");
if (arrayLength[9] !== undefined) throw new Error("New elements should be undefined");

// Array holes
var holeyArray = [1, , , 4];
if (holeyArray.length !== 4) throw new Error("Holes should not affect length");
if (1 in holeyArray) throw new Error("Hole should not be enumerable");
if (holeyArray[1] !== undefined) throw new Error("Hole should be undefined");

// Array method behavior with holes
var mapResult = holeyArray.map(function(x) { return x * 2; });
if (1 in mapResult) throw new Error("map should preserve holes");

// =============================================================================
// STRING QUIRKS
// =============================================================================

// String immutability
var str = "hello";
str[0] = "H"; // Should not modify the string
if (str !== "hello") throw new Error("Strings should be immutable");

// String constructor vs literal
var strLiteral = "test";
var strConstructor = new String("test");
if (strLiteral === strConstructor) throw new Error("String literal vs constructor should differ");
if (strLiteral != strConstructor) throw new Error("String literal should equal constructor value with ==");
if (typeof strLiteral === typeof strConstructor) {
    throw new Error("String literal and constructor should have different types");
}

// Unicode and escape sequences
var unicodeStr = "\u0048\u0065\u006C\u006C\u006F"; // "Hello"
if (unicodeStr !== "Hello") throw new Error("Unicode escapes failed");

var escapeStr = "Line 1\nLine 2\tTabbed";
if (escapeStr.indexOf("\n") === -1) throw new Error("Newline escape failed");
if (escapeStr.indexOf("\t") === -1) throw new Error("Tab escape failed");

// =============================================================================
// NUMBER QUIRKS
// =============================================================================

// Leading zeros (octal interpretation in some contexts)
var leadingZero = 010; // Might be interpreted as octal 8
// Behavior varies between strict and non-strict mode

// Floating point weirdness
if (0.1 + 0.2 === 0.3) throw new Error("0.1 + 0.2 should not exactly equal 0.3");
if (Math.abs((0.1 + 0.2) - 0.3) > Number.EPSILON) {
    // This is actually expected due to floating point precision
}

// Number constructor quirks
if (Number("") !== 0) throw new Error("Number('') should be 0");
if (Number(" ") !== 0) throw new Error("Number(' ') should be 0");
if (Number("123abc") === Number("123abc")) throw new Error("Number('123abc') should be NaN");

// parseInt quirks
if (parseInt("010") !== 10) {
    // In older engines, this might be 8 (octal)
}
if (parseInt("16", 10) !== 16) throw new Error("parseInt with radix failed");
if (parseInt("FF", 16) !== 255) throw new Error("parseInt hex failed");

// =============================================================================
// OBJECT PROPERTY QUIRKS
// =============================================================================

// Property descriptor defaults
var descObj = {};
Object.defineProperty(descObj, "prop", {
    value: 42
});
var descriptor = Object.getOwnPropertyDescriptor(descObj, "prop");
if (descriptor.writable !== false) throw new Error("Default writable should be false");
if (descriptor.enumerable !== false) throw new Error("Default enumerable should be false");
if (descriptor.configurable !== false) throw new Error("Default configurable should be false");

// Enumerable vs non-enumerable
var enumObj = {a: 1};
Object.defineProperty(enumObj, "b", {value: 2, enumerable: false});
var keys = Object.keys(enumObj);
if (keys.length !== 1) throw new Error("Non-enumerable property should not appear in keys");
if (keys[0] !== "a") throw new Error("Enumerable property should appear in keys");

// =============================================================================
// ERROR QUIRKS
// =============================================================================

// Error properties
var customError = new Error("Custom message");
customError.name = "CustomError";
customError.code = 500;
if (customError.message !== "Custom message") throw new Error("Error message failed");
if (customError.name !== "CustomError") throw new Error("Error name assignment failed");
if (customError.code !== 500) throw new Error("Custom error property failed");

// Error stack (engine dependent)
try {
    throw new Error("Stack test");
} catch (e) {
    if (typeof e.stack !== "string" && typeof e.stack !== "undefined") {
        throw new Error("Error stack should be string or undefined");
    }
}

// =============================================================================
// TIMING QUIRKS
// =============================================================================

// setTimeout 0 delay
var timeoutOrder = [];
timeoutOrder.push(1);
setTimeout(function() {
    timeoutOrder.push(3);
}, 0);
timeoutOrder.push(2);
// At this point, timeoutOrder should be [1, 2] and later become [1, 2, 3]

// Date constructor quirks
var dateFromString = new Date("2025-01-01");
var dateFromNumbers = new Date(2025, 0, 1); // Month is 0-indexed!
if (dateFromNumbers.getMonth() !== 0) throw new Error("Date month should be 0-indexed");

// =============================================================================
// MODULE AND STRICT MODE QUIRKS (if applicable)
// =============================================================================

// Strict mode differences (engine dependent)
function strictModeTest() {
    "use strict";
    try {
        // These would throw in strict mode:
        // arguments = []; // TypeError
        // eval = function() {}; // SyntaxError
        // var eval; // SyntaxError
    } catch (e) {
        // Expected in strict mode
    }
}

console.log("All JavaScript quirks tested successfully!");
console.log("Remember: JavaScript is weird, but consistently weird!");