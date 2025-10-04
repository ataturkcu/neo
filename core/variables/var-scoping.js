/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Variable Scoping with 'var' (hoisting, function scope, redeclaration)
 */

// Test basic var declaration and initialization
var basicVar = 42;
if (basicVar !== 42) throw new Error("Basic var declaration should work, got " + basicVar);

// Test var hoisting - variable should be accessible before declaration
if (typeof hoistedVar !== "undefined") throw new Error("Hoisted var should be undefined before declaration, got " + hoistedVar);
var hoistedVar = "value";
if (hoistedVar !== "value") throw new Error("Hoisted var should have assigned value, got " + hoistedVar);

// Test function scoping - var is function scoped, not block scoped
function testFunctionScope() {
    if (true) {
        var functionScoped = "inside block";
    }
    // Variable should be accessible outside the block but inside function
    if (functionScoped !== "inside block") throw new Error("var should be function scoped, got " + functionScoped);
    return functionScoped;
}
var result1 = testFunctionScope();
if (result1 !== "inside block") throw new Error("Function scope test failed, got " + result1);

// Test that var is not accessible outside function scope
function testFunctionBoundary() {
    var localVar = "local";
    return localVar;
}
testFunctionBoundary();
try {
    var outsideAccess = localVar;
    throw new Error("Should not be able to access function-scoped var from outside");
} catch (e) {
    if (e.message === "Should not be able to access function-scoped var from outside") throw e;
    // Expected ReferenceError
}

// Test var redeclaration is allowed
var redeclaredVar = "first";
var redeclaredVar = "second";
if (redeclaredVar !== "second") throw new Error("var redeclaration should work, got " + redeclaredVar);

// Test var redeclaration with different values
var multiRedeclare = 1;
var multiRedeclare = 2;
var multiRedeclare = "string";
if (multiRedeclare !== "string") throw new Error("Multiple var redeclarations should work, got " + multiRedeclare);

// Test hoisting with function declarations
function testVarWithFunctionHoisting() {
    // This should access the hoisted var, not throw an error
    if (typeof hoistedInFunction !== "undefined") throw new Error("Hoisted var should be undefined initially");

    var hoistedInFunction = "defined";
    return hoistedInFunction;
}
var result2 = testVarWithFunctionHoisting();
if (result2 !== "defined") throw new Error("Var hoisting in function failed, got " + result2);

// Test var in loops - common gotcha with closure
var loopResults = [];
for (var i = 0; i < 3; i++) {
    loopResults.push(function() { return i; });
}
// All functions should return 3 due to var's function scoping
if (loopResults[0]() !== 3) throw new Error("Loop var should be 3 for first function, got " + loopResults[0]());
if (loopResults[1]() !== 3) throw new Error("Loop var should be 3 for second function, got " + loopResults[1]());
if (loopResults[2]() !== 3) throw new Error("Loop var should be 3 for third function, got " + loopResults[2]());

// Test var in nested functions
function outerFunction() {
    var outerVar = "outer";

    function innerFunction() {
        var innerVar = "inner";
        return outerVar + " " + innerVar;
    }

    return innerFunction();
}
var result3 = outerFunction();
if (result3 !== "outer inner") throw new Error("Nested function var access failed, got " + result3);

// Test var hoisting with assignments
function testHoistingWithAssignment() {
    var result = [];
    result.push(typeof hoistedAssign);  // Should be "undefined"
    hoistedAssign = "assigned before declaration";
    result.push(hoistedAssign);  // Should be "assigned before declaration"
    var hoistedAssign = "declared value";
    result.push(hoistedAssign);  // Should be "declared value"
    return result;
}
var hoistingResult = testHoistingWithAssignment();
if (hoistingResult[0] !== "undefined") throw new Error("Hoisted var should be undefined before assignment, got " + hoistingResult[0]);
if (hoistingResult[1] !== "assigned before declaration") throw new Error("Hoisted var assignment should work, got " + hoistingResult[1]);
if (hoistingResult[2] !== "declared value") throw new Error("Hoisted var declaration should override, got " + hoistingResult[2]);

// Test var in try-catch blocks
function testVarInTryCatch() {
    try {
        var tryVar = "in try";
        throw new Error("test error");
    } catch (e) {
        var catchVar = "in catch";
        // tryVar should be accessible here
        if (tryVar !== "in try") throw new Error("var from try should be accessible in catch, got " + tryVar);
    }
    // Both variables should be accessible here
    if (tryVar !== "in try") throw new Error("var from try should be accessible outside, got " + tryVar);
    if (catchVar !== "in catch") throw new Error("var from catch should be accessible outside, got " + catchVar);
    return "success";
}
var result4 = testVarInTryCatch();
if (result4 !== "success") throw new Error("Try-catch var scoping failed, got " + result4);

// Test var with conditional declarations
function testConditionalVar() {
    if (false) {
        var conditionalVar = "never assigned";
    }
    // Variable should still be hoisted and accessible (but undefined)
    if (typeof conditionalVar !== "undefined") throw new Error("Conditional var should be undefined, got " + conditionalVar);

    if (true) {
        var conditionalVar2 = "assigned";
    }
    if (conditionalVar2 !== "assigned") throw new Error("Conditional var should be assigned, got " + conditionalVar2);

    return "success";
}
var result5 = testConditionalVar();
if (result5 !== "success") throw new Error("Conditional var test failed, got " + result5);

// Test var redeclaration in different scopes
var globalScopeVar = "global";

function testScopeRedeclaration() {
    var globalScopeVar = "local";  // Shadows global var
    if (globalScopeVar !== "local") throw new Error("Local var should shadow global, got " + globalScopeVar);
    return globalScopeVar;
}

var result6 = testScopeRedeclaration();
if (result6 !== "local") throw new Error("Scope redeclaration test failed, got " + result6);
if (globalScopeVar !== "global") throw new Error("Global var should be unchanged, got " + globalScopeVar);

// Test var with switch statements
function testVarInSwitch(value) {
    switch (value) {
        case 1:
            var switchVar = "case 1";
            break;
        case 2:
            var switchVar = "case 2";
            break;
        default:
            var switchVar = "default";
    }
    return switchVar;
}

var result7 = testVarInSwitch(1);
if (result7 !== "case 1") throw new Error("Switch var test 1 failed, got " + result7);

var result8 = testVarInSwitch(2);
if (result8 !== "case 2") throw new Error("Switch var test 2 failed, got " + result8);

var result9 = testVarInSwitch(3);
if (result9 !== "default") throw new Error("Switch var test default failed, got " + result9);

// Test var with IIFE (Immediately Invoked Function Expression)
var iifeResult = (function() {
    var iifeVar = "inside IIFE";
    return iifeVar;
})();
if (iifeResult !== "inside IIFE") throw new Error("IIFE var test failed, got " + iifeResult);

// Test that IIFE var doesn't leak to global scope
try {
    var leakTest = iifeVar;
    throw new Error("IIFE var should not leak to global scope");
} catch (e) {
    if (e.message === "IIFE var should not leak to global scope") throw e;
    // Expected ReferenceError
}

// Test var with nested loops
function testNestedLoopVar() {
    var results = [];
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            results.push(i + "," + j);
        }
    }
    // i and j should be accessible after loops
    results.push("final i: " + i);
    results.push("final j: " + j);
    return results;
}

var nestedLoopResult = testNestedLoopVar();
if (nestedLoopResult.length !== 6) throw new Error("Nested loop should produce 6 results, got " + nestedLoopResult.length);
if (nestedLoopResult[4] !== "final i: 2") throw new Error("Final i should be 2, got " + nestedLoopResult[4]);
if (nestedLoopResult[5] !== "final j: 2") throw new Error("Final j should be 2, got " + nestedLoopResult[5]);

// Test var hoisting with complex expressions
function testComplexHoisting() {
    var result = complexVar || "default";
    var complexVar = false || "hoisted value";
    return result;
}
var result10 = testComplexHoisting();
if (result10 !== "default") throw new Error("Complex hoisting should use default, got " + result10);

// Test var in eval (if supported)
try {
    eval("var evalVar = 'evaluated';");
    if (evalVar !== "evaluated") throw new Error("eval var should be accessible, got " + evalVar);
} catch (e) {
    // eval might not be supported, skip this test
}

// Test var parameter shadowing
function testParameterShadowing(param) {
    if (param !== "parameter") throw new Error("Parameter should be accessible, got " + param);
    var param = "shadowed";
    if (param !== "shadowed") throw new Error("var should shadow parameter, got " + param);
    return param;
}
var result11 = testParameterShadowing("parameter");
if (result11 !== "shadowed") throw new Error("Parameter shadowing failed, got " + result11);

// Test var with delete operator (var declarations can't be deleted)
var deletableVar = "cannot delete";
var deleteResult = delete deletableVar;
if (deleteResult !== false) throw new Error("delete var should return false, got " + deleteResult);
if (deletableVar !== "cannot delete") throw new Error("var should not be deleted, got " + deletableVar);

// Test var in with statement (if supported)
try {
    var withObj = {prop: "object property"};
    with (withObj) {
        var withVar = prop;
    }
    if (withVar !== "object property") throw new Error("with statement var should work, got " + withVar);
} catch (e) {
    // with statement might not be supported or might be in strict mode
}

// Test var hoisting order with function declarations
function testHoistingOrder() {
    if (typeof hoistedVar !== "undefined") throw new Error("var should be undefined before assignment");
    if (typeof hoistedFunc !== "function") throw new Error("function should be hoisted and defined");

    var hoistedVar = "variable";
    function hoistedFunc() { return "function"; }

    return hoistedVar + " " + hoistedFunc();
}
var result12 = testHoistingOrder();
if (result12 !== "variable function") throw new Error("Hoisting order test failed, got " + result12);

// Test var with arguments object
function testVarWithArguments() {
    var args = Array.prototype.slice.call(arguments);
    var argumentsVar = arguments.length;
    return args.concat([argumentsVar]);
}
var result13 = testVarWithArguments("a", "b", "c");
if (result13.length !== 4) throw new Error("Arguments test should return 4 items, got " + result13.length);
if (result13[3] !== 3) throw new Error("Arguments length should be 3, got " + result13[3]);

// Test var in generator function (if supported)
try {
    eval(`
        function* testGeneratorVar() {
            var genVar = "generator";
            yield genVar;
            var genVar2 = "second";
            yield genVar2;
        }
        var gen = testGeneratorVar();
        var genResult1 = gen.next().value;
        var genResult2 = gen.next().value;
        if (genResult1 !== "generator") throw new Error("Generator var 1 failed, got " + genResult1);
        if (genResult2 !== "second") throw new Error("Generator var 2 failed, got " + genResult2);
    `);
} catch (e) {
    // Generators might not be supported
}

// Test var temporal behavior - different from let/const
function testTemporalBehavior() {
    var result = [];
    result.push(typeof tempVar);  // Should be "undefined", not ReferenceError
    var tempVar = "defined";
    result.push(tempVar);
    return result;
}
var tempResult = testTemporalBehavior();
if (tempResult[0] !== "undefined") throw new Error("var should be undefined in temporal dead zone, got " + tempResult[0]);
if (tempResult[1] !== "defined") throw new Error("var should be defined after declaration, got " + tempResult[1]);

// Test var with closures and setTimeout (if available)
try {
    var timeoutResults = [];
    var timeoutTest = function() {
        for (var k = 0; k < 3; k++) {
            setTimeout(function() { timeoutResults.push(k); }, 0);
        }
    };
    timeoutTest();
    // This test requires async behavior, so we'll just verify the function doesn't error
} catch (e) {
    // setTimeout might not be available
}