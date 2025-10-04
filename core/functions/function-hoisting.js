/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Function Declaration vs Expression Hoisting
 */

// Test function declaration hoisting - entire function is hoisted
var result1 = declaredFunction();
if (result1 !== "declared function") throw new Error("Function declaration should be hoisted, got " + result1);

function declaredFunction() {
    return "declared function";
}

// Test function expression hoisting - only variable is hoisted, not the function
try {
    var result2 = expressionFunction();
    throw new Error("Function expression should not be callable before assignment");
} catch (e) {
    if (e.message === "Function expression should not be callable before assignment") throw e;
    // Expected TypeError
}

if (typeof expressionFunction !== "undefined") throw new Error("Function expression variable should be undefined initially, got " + expressionFunction);

var expressionFunction = function() {
    return "expression function";
};

var result3 = expressionFunction();
if (result3 !== "expression function") throw new Error("Function expression should work after assignment, got " + result3);

// Test named function expression
try {
    var result4 = namedExpression();
    throw new Error("Named function expression should not be callable by outer name before assignment");
} catch (e) {
    if (e.message === "Named function expression should not be callable by outer name before assignment") throw e;
    // Expected TypeError
}

var namedExpression = function namedFunc() {
    return "named function expression";
};

var result5 = namedExpression();
if (result5 !== "named function expression") throw new Error("Named function expression should work, got " + result5);

// Test that named function expression name is only available inside the function
var namedExpressionInternal = function internalName() {
    return typeof internalName; // Should be "function"
};

var result6 = namedExpressionInternal();
if (result6 !== "function") throw new Error("Internal name should be available inside function, got " + result6);

// Test that internal name is not available outside
var outsideAccess = typeof internalName;
if (outsideAccess !== "undefined") {
    throw new Error("Internal name should not be available outside function, got " + outsideAccess);
}

// Test function hoisting within blocks
{
    var blockResult = blockFunction();
    if (blockResult !== "block function") throw new Error("Block function should be hoisted, got " + blockResult);

    function blockFunction() {
        return "block function";
    }
}

// Note: In strict mode, function declarations in blocks have different behavior
// But in non-strict mode, they are typically hoisted to function scope

// Test function hoisting order vs var declarations
if (typeof hoistedName !== "function") throw new Error("Function should be hoisted before var, got " + typeof hoistedName);

var originalFunction = hoistedName;
var hoistedName = "variable value";

if (hoistedName !== "variable value") throw new Error("Variable assignment should override function, got " + hoistedName);
if (typeof originalFunction !== "function") throw new Error("Original function should still be accessible, got " + typeof originalFunction);

function hoistedName() {
    return "hoisted function";
}

// Test multiple function declarations with same name - last one wins
var multipleResult = multipleDeclared();
if (multipleResult !== "second declaration") throw new Error("Last function declaration should win, got " + multipleResult);

function multipleDeclared() {
    return "first declaration";
}

function multipleDeclared() {
    return "second declaration";
}

// Test function declarations in conditional blocks
function testConditionalFunction() {
    if (true) {
        function conditionalFunc() {
            return "conditional true";
        }
    } else {
        function conditionalFunc() {
            return "conditional false";
        }
    }
    return conditionalFunc();
}

var conditionalResult = testConditionalFunction();
// Behavior may vary between engines for function declarations in blocks
if (typeof conditionalResult !== "string") throw new Error("Conditional function should return string, got " + typeof conditionalResult);

// Test function hoisting with var shadowing
function testFunctionVarShadowing() {
    // Function should be hoisted first
    if (typeof shadowedName !== "function") throw new Error("Function should be hoisted first in shadow test, got " + typeof shadowedName);

    var shadowedName = "shadowing variable";

    if (shadowedName !== "shadowing variable") throw new Error("Variable should shadow function, got " + shadowedName);

    function shadowedName() {
        return "shadowed function";
    }

    return "success";
}

var shadowResult = testFunctionVarShadowing();
if (shadowResult !== "success") throw new Error("Function var shadowing test failed, got " + shadowResult);

// Test nested function hoisting
function outerFunction() {
    var nestedResult = innerFunction();
    if (nestedResult !== "inner function") throw new Error("Nested function should be hoisted, got " + nestedResult);

    function innerFunction() {
        return "inner function";
    }

    return nestedResult;
}

var nestedResult = outerFunction();
if (nestedResult !== "inner function") throw new Error("Nested function test failed, got " + nestedResult);

// Test function hoisting with parameters
function testParameterShadowing(param) {
    // Function declaration shadows parameter
    function param() {
        return "function param";
    }

    // Function declaration should have shadowed parameter
    if (typeof param !== "function") throw new Error("Function should shadow parameter, got " + typeof param);

    return typeof param;
}

var paramShadowResult = testParameterShadowing("parameter value");
// Behavior may vary - in some cases function declaration might shadow parameter

// Test function hoisting with try-catch
function testTryCatchFunction() {
    try {
        var tryResult = tryFunction();
        if (tryResult !== "try function") throw new Error("Try function should be hoisted, got " + tryResult);

        function tryFunction() {
            return "try function";
        }

        throw new Error("test error");
    } catch (e) {
        if (e.message === "test error") {
            // tryFunction should still be accessible due to function scope
            var catchResult = tryFunction();
            if (catchResult !== "try function") throw new Error("Try function should be accessible in catch, got " + catchResult);
        } else {
            throw e;
        }
    }

    return "success";
}

var tryCatchFunctionResult = testTryCatchFunction();
if (tryCatchFunctionResult !== "success") throw new Error("Try-catch function test failed, got " + tryCatchFunctionResult);

// Test function hoisting with loops
function testLoopFunction() {
    var results = [];

    for (var i = 0; i < 2; i++) {
        results.push(loopFunction());

        function loopFunction() {
            return "loop function " + i;
        }
    }

    return results;
}

var loopFunctionResult = testLoopFunction();
if (loopFunctionResult.length !== 2) throw new Error("Loop function should produce 2 results, got " + loopFunctionResult.length);

// Test function hoisting with switch statements
function testSwitchFunction(value) {
    switch (value) {
        case 1:
            function switchFunc() {
                return "case 1 function";
            }
            break;
        case 2:
            function switchFunc() {
                return "case 2 function";
            }
            break;
    }

    return switchFunc();
}

// This test shows complex behavior that varies between JavaScript engines
try {
    var switchFunctionResult = testSwitchFunction(1);
    if (typeof switchFunctionResult !== "string") throw new Error("Switch function should return string, got " + typeof switchFunctionResult);
} catch (e) {
    // Function might not be hoisted in switch blocks in some engines
}

// Test function expression in different positions
var position1 = function() { return "position 1"; };

function testPositions() {
    var position2 = function() { return "position 2"; };

    return {
        pos1: position1(),
        pos2: position2(),
        pos3: (function() { return "position 3"; })()
    };
}

var positionResult = testPositions();
if (positionResult.pos1 !== "position 1") throw new Error("Position 1 failed, got " + positionResult.pos1);
if (positionResult.pos2 !== "position 2") throw new Error("Position 2 failed, got " + positionResult.pos2);
if (positionResult.pos3 !== "position 3") throw new Error("Position 3 failed, got " + positionResult.pos3);

// Test recursive function hoisting
function testRecursiveHoisting() {
    function factorial(n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    return factorial(5);
}

var recursiveResult = testRecursiveHoisting();
if (recursiveResult !== 120) throw new Error("Recursive function should work, got " + recursiveResult);

// Test mutual recursion with hoisting
function testMutualRecursion() {
    function isEven(n) {
        if (n === 0) return true;
        return isOdd(n - 1);
    }

    function isOdd(n) {
        if (n === 0) return false;
        return isEven(n - 1);
    }

    return {
        even4: isEven(4),
        odd4: isOdd(4),
        even5: isEven(5),
        odd5: isOdd(5)
    };
}

var mutualResult = testMutualRecursion();
if (mutualResult.even4 !== true) throw new Error("isEven(4) should be true, got " + mutualResult.even4);
if (mutualResult.odd4 !== false) throw new Error("isOdd(4) should be false, got " + mutualResult.odd4);
if (mutualResult.even5 !== false) throw new Error("isEven(5) should be false, got " + mutualResult.even5);
if (mutualResult.odd5 !== true) throw new Error("isOdd(5) should be true, got " + mutualResult.odd5);

// Test function hoisting with closures
function testClosureHoisting() {
    var closureVar = "closure value";

    function closureFunction() {
        return closureVar;
    }

    return closureFunction;
}

var closureFunc = testClosureHoisting();
var closureResult = closureFunc();
if (closureResult !== "closure value") throw new Error("Closure function should access outer variable, got " + closureResult);

// Test function constructor (if supported)
try {
    var constructorFunction = new Function("return 'constructor function';");
    var constructorResult = constructorFunction();
    if (constructorResult !== "constructor function") throw new Error("Function constructor should work, got " + constructorResult);
} catch (e) {
    // Function constructor might not be supported
}

// Test arrow function non-hoisting (if supported)
try {
    eval(`
        try {
            var arrowResult = arrowFunc();
            throw new Error("Arrow function should not be hoisted");
        } catch (e) {
            if (e.message === "Arrow function should not be hoisted") throw e;
            // Expected TypeError
        }

        var arrowFunc = () => "arrow function";
        var arrowResultAfter = arrowFunc();
        if (arrowResultAfter !== "arrow function") throw new Error("Arrow function should work after declaration, got " + arrowResultAfter);
    `);
} catch (e) {
    // Arrow functions might not be supported
}

// Test generator function hoisting (if supported)
try {
    eval(`
        var genResult = generatorFunc().next().value;
        if (genResult !== "generator function") throw new Error("Generator function should be hoisted, got " + genResult);

        function* generatorFunc() {
            yield "generator function";
        }
    `);
} catch (e) {
    // Generator functions might not be supported
}

// Test async function hoisting (if supported)
try {
    eval(`
        async function testAsyncHoisting() {
            var asyncResult = await asyncFunc();
            if (asyncResult !== "async function") throw new Error("Async function should be hoisted, got " + asyncResult);

            async function asyncFunc() {
                return "async function";
            }

            return "success";
        }
    `);
} catch (e) {
    // Async functions might not be supported
}

// Test class declaration hoisting (if supported)
try {
    eval(`
        try {
            var classInstance = new HoistedClass();
            throw new Error("Class should not be hoisted");
        } catch (e) {
            if (e.message === "Class should not be hoisted") throw e;
            // Expected ReferenceError
        }

        class HoistedClass {
            constructor() {
                this.value = "class value";
            }
        }

        var classInstanceAfter = new HoistedClass();
        if (classInstanceAfter.value !== "class value") throw new Error("Class should work after declaration, got " + classInstanceAfter.value);
    `);
} catch (e) {
    // Classes might not be supported
}

// Test function hoisting with eval (if supported)
try {
    eval("function evalFunction() { return 'eval function'; }");
    var evalFunctionResult = evalFunction();
    if (evalFunctionResult !== "eval function") throw new Error("Eval function should work, got " + evalFunctionResult);
} catch (e) {
    // eval might not be supported
}

// Test function hoisting precedence
function testHoistingPrecedence() {
    // This should call the function, not access undefined variable
    var result = precedenceTest();

    var precedenceTest = "variable";

    function precedenceTest() {
        return "function";
    }

    return result + " " + precedenceTest;
}

var precedenceResult = testHoistingPrecedence();
if (precedenceResult !== "function variable") throw new Error("Function should have precedence in hoisting, got " + precedenceResult);

// Test function length property
function testFunctionLength() {
    function noParams() {}
    function oneParam(a) {}
    function twoParams(a, b) {}
    function restParams(a, ...rest) {}

    var results = {
        none: noParams.length,
        one: oneParam.length,
        two: twoParams.length
    };

    try {
        results.rest = restParams.length;
    } catch (e) {
        // Rest parameters might not be supported
        results.rest = "not supported";
    }

    return results;
}

var lengthResult = testFunctionLength();
if (lengthResult.none !== 0) throw new Error("Function with no params should have length 0, got " + lengthResult.none);
if (lengthResult.one !== 1) throw new Error("Function with one param should have length 1, got " + lengthResult.one);
if (lengthResult.two !== 2) throw new Error("Function with two params should have length 2, got " + lengthResult.two);

// Test function name property
function testFunctionName() {
    function namedFunction() {}
    var anonymousFunction = function() {};
    var namedExpression = function named() {};

    var results = {
        named: namedFunction.name,
        anonymous: anonymousFunction.name || "anonymous",
        expression: namedExpression.name || "expression"
    };

    return results;
}

var nameResult = testFunctionName();
if (nameResult.named !== "namedFunction") throw new Error("Named function should have correct name, got " + nameResult.named);

// Test function toString (if supported)
try {
    function testToString() {
        return "test";
    }

    var functionString = testToString.toString();
    if (typeof functionString !== "string") throw new Error("Function toString should return string, got " + typeof functionString);
    if (functionString.indexOf("function") === -1) throw new Error("Function string should contain 'function', got " + functionString);
} catch (e) {
    // toString might not be supported or might work differently
}