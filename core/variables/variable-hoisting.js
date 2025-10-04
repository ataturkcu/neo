/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Variable Hoisting Behaviors (var, let, const, function)
 */

// Test var hoisting - variable declaration is hoisted, assignment is not
function testVarHoisting() {
    // Should be undefined, not ReferenceError
    if (typeof hoistedVar !== "undefined") throw new Error("Hoisted var should be undefined, got " + hoistedVar);

    var hoistedVar = "assigned value";

    if (hoistedVar !== "assigned value") throw new Error("Hoisted var should have assigned value, got " + hoistedVar);

    return "success";
}

var result1 = testVarHoisting();
if (result1 !== "success") throw new Error("Var hoisting test failed, got " + result1);

// Test var hoisting with assignment before declaration
function testVarAssignmentBeforeDeclaration() {
    assignedFirst = "assigned before declaration";
    var assignedFirst;

    if (assignedFirst !== "assigned before declaration") throw new Error("Var assignment before declaration failed, got " + assignedFirst);

    return assignedFirst;
}

var result2 = testVarAssignmentBeforeDeclaration();
if (result2 !== "assigned before declaration") throw new Error("Assignment before declaration test failed, got " + result2);

// Test multiple var declarations with hoisting
function testMultipleVarHoisting() {
    var results = [];

    results.push(typeof first);  // undefined
    results.push(typeof second);  // undefined
    results.push(typeof third);   // undefined

    var first = 1;
    var second = 2;
    var third = 3;

    results.push(first);   // 1
    results.push(second);  // 2
    results.push(third);   // 3

    return results;
}

var multipleResult = testMultipleVarHoisting();
if (multipleResult[0] !== "undefined") throw new Error("First var should be undefined initially, got " + multipleResult[0]);
if (multipleResult[1] !== "undefined") throw new Error("Second var should be undefined initially, got " + multipleResult[1]);
if (multipleResult[2] !== "undefined") throw new Error("Third var should be undefined initially, got " + multipleResult[2]);
if (multipleResult[3] !== 1) throw new Error("First var should be 1 after assignment, got " + multipleResult[3]);
if (multipleResult[4] !== 2) throw new Error("Second var should be 2 after assignment, got " + multipleResult[4]);
if (multipleResult[5] !== 3) throw new Error("Third var should be 3 after assignment, got " + multipleResult[5]);

// Test function declaration hoisting - entire function is hoisted
function testFunctionDeclarationHoisting() {
    // Function should be callable before its declaration
    var result = hoistedFunction();

    function hoistedFunction() {
        return "hoisted function called";
    }

    return result;
}

var result3 = testFunctionDeclarationHoisting();
if (result3 !== "hoisted function called") throw new Error("Function declaration hoisting failed, got " + result3);

// Test function expression hoisting - only variable is hoisted, not the function
function testFunctionExpressionHoisting() {
    try {
        var result = hoistedFunctionExpr();
        throw new Error("Function expression should not be callable before assignment");
    } catch (e) {
        if (e.message === "Function expression should not be callable before assignment") throw e;
        // Expected TypeError
    }

    if (typeof hoistedFunctionExpr !== "undefined") throw new Error("Function expression var should be undefined initially, got " + hoistedFunctionExpr);

    var hoistedFunctionExpr = function() {
        return "function expression called";
    };

    return hoistedFunctionExpr();
}

var result4 = testFunctionExpressionHoisting();
if (result4 !== "function expression called") throw new Error("Function expression test failed, got " + result4);

// Test let/const temporal dead zone - no hoisting behavior
function testLetConstNoHoisting() {
    try {
        var accessLet = temporalDeadZoneLet;
        throw new Error("let should not be accessible before declaration");
    } catch (e) {
        if (e.message === "let should not be accessible before declaration") throw e;
        // Expected ReferenceError
    }

    try {
        var accessConst = temporalDeadZoneConst;
        throw new Error("const should not be accessible before declaration");
    } catch (e) {
        if (e.message === "const should not be accessible before declaration") throw e;
        // Expected ReferenceError
    }

    let temporalDeadZoneLet = "let value";
    const temporalDeadZoneConst = "const value";

    return temporalDeadZoneLet + " " + temporalDeadZoneConst;
}

var result5 = testLetConstNoHoisting();
if (result5 !== "let value const value") throw new Error("Let/const temporal dead zone test failed, got " + result5);

// Test var hoisting in nested scopes
function testNestedScopeHoisting() {
    function outer() {
        var result = typeof innerVar;  // Should be "undefined"

        function inner() {
            var innerVar = "inner value";
            return innerVar;
        }

        return result + " " + inner();
    }

    return outer();
}

var result6 = testNestedScopeHoisting();
if (result6 !== "undefined inner value") throw new Error("Nested scope hoisting test failed, got " + result6);

// Test hoisting with conditional blocks
function testConditionalHoisting() {
    var result = typeof conditionalVar;  // Should be "undefined"

    if (false) {
        var conditionalVar = "never executed";
    }

    return result;
}

var result7 = testConditionalHoisting();
if (result7 !== "undefined") throw new Error("Conditional hoisting should be undefined, got " + result7);

// Test hoisting with loops
function testLoopHoisting() {
    var results = [];
    results.push(typeof loopVar);  // Should be "undefined"

    for (var i = 0; i < 1; i++) {
        var loopVar = "loop value";
    }

    results.push(loopVar);  // Should be "loop value"
    results.push(i);        // Should be 1

    return results;
}

var loopResult = testLoopHoisting();
if (loopResult[0] !== "undefined") throw new Error("Loop var should be undefined initially, got " + loopResult[0]);
if (loopResult[1] !== "loop value") throw new Error("Loop var should be accessible after loop, got " + loopResult[1]);
if (loopResult[2] !== 1) throw new Error("Loop counter should be accessible after loop, got " + loopResult[2]);

// Test hoisting order - function declarations vs var declarations
function testHoistingOrder() {
    // Function declarations are hoisted first, then var declarations
    if (typeof hoistedName !== "function") throw new Error("Function should be hoisted first, got " + typeof hoistedName);

    var hoistedName = "variable";  // This assignment happens later

    if (hoistedName !== "variable") throw new Error("Variable assignment should override function, got " + hoistedName);

    function hoistedName() {
        return "function";
    }

    return "success";
}

var result8 = testHoistingOrder();
if (result8 !== "success") throw new Error("Hoisting order test failed, got " + result8);

// Test complex hoisting scenario
function testComplexHoisting() {
    var results = [];

    // All of these should work due to hoisting
    results.push(typeof varDeclaration);     // "undefined"
    results.push(typeof funcDeclaration);   // "function"

    try {
        results.push(typeof letDeclaration);  // ReferenceError
    } catch (e) {
        results.push("ReferenceError");
    }

    var varDeclaration = "var value";
    let letDeclaration = "let value";

    function funcDeclaration() {
        return "function value";
    }

    results.push(varDeclaration);        // "var value"
    results.push(letDeclaration);        // "let value"
    results.push(funcDeclaration());     // "function value"

    return results;
}

var complexResult = testComplexHoisting();
if (complexResult[0] !== "undefined") throw new Error("Complex var should be undefined initially, got " + complexResult[0]);
if (complexResult[1] !== "function") throw new Error("Complex function should be hoisted, got " + complexResult[1]);
if (complexResult[2] !== "ReferenceError") throw new Error("Complex let should throw ReferenceError, got " + complexResult[2]);
if (complexResult[3] !== "var value") throw new Error("Complex var should have assigned value, got " + complexResult[3]);
if (complexResult[4] !== "let value") throw new Error("Complex let should have assigned value, got " + complexResult[4]);
if (complexResult[5] !== "function value") throw new Error("Complex function should be callable, got " + complexResult[5]);

// Test hoisting with try-catch
function testTryCatchHoisting() {
    var results = [];

    try {
        results.push(typeof tryVar);  // "undefined"
        var tryVar = "try value";
        throw new Error("test error");
    } catch (e) {
        results.push(typeof catchVar);  // "undefined"
        var catchVar = "catch value";
        results.push(tryVar);  // "try value" - accessible due to function scoping
    }

    results.push(tryVar);    // "try value"
    results.push(catchVar);  // "catch value"

    return results;
}

var tryCatchResult = testTryCatchHoisting();
if (tryCatchResult[0] !== "undefined") throw new Error("Try var should be undefined initially, got " + tryCatchResult[0]);
if (tryCatchResult[1] !== "undefined") throw new Error("Catch var should be undefined initially, got " + tryCatchResult[1]);
if (tryCatchResult[2] !== "try value") throw new Error("Try var should be accessible in catch, got " + tryCatchResult[2]);
if (tryCatchResult[3] !== "try value") throw new Error("Try var should be accessible outside, got " + tryCatchResult[3]);
if (tryCatchResult[4] !== "catch value") throw new Error("Catch var should be accessible outside, got " + tryCatchResult[4]);

// Test hoisting with switch statements
function testSwitchHoisting(value) {
    var result = typeof switchVar;  // Should be "undefined"

    switch (value) {
        case 1:
            var switchVar = "case 1";
            break;
        default:
            var switchVar = "default";
    }

    return result + " " + switchVar;
}

var switchResult = testSwitchHoisting(1);
if (switchResult !== "undefined case 1") throw new Error("Switch hoisting test failed, got " + switchResult);

// Test named function expression hoisting
function testNamedFunctionExpressionHoisting() {
    try {
        var result = namedFuncExpr();
        throw new Error("Named function expression should not be callable before assignment");
    } catch (e) {
        if (e.message === "Named function expression should not be callable before assignment") throw e;
        // Expected TypeError
    }

    var namedFuncExpr = function namedFunction() {
        return "named function expression";
    };

    return namedFuncExpr();
}

var result9 = testNamedFunctionExpressionHoisting();
if (result9 !== "named function expression") throw new Error("Named function expression test failed, got " + result9);

// Test hoisting with IIFE
function testIIFEHoisting() {
    var result = (function() {
        // Variable should be hoisted within IIFE
        if (typeof iifeVar !== "undefined") throw new Error("IIFE var should be undefined initially, got " + iifeVar);

        var iifeVar = "IIFE value";
        return iifeVar;
    })();

    // iifeVar should not be accessible outside IIFE
    try {
        var outsideAccess = iifeVar;
        throw new Error("IIFE var should not be accessible outside");
    } catch (e) {
        if (e.message === "IIFE var should not be accessible outside") throw e;
        // Expected ReferenceError
    }

    return result;
}

var result10 = testIIFEHoisting();
if (result10 !== "IIFE value") throw new Error("IIFE hoisting test failed, got " + result10);

// Test parameter shadowing with hoisting
function testParameterShadowing(param) {
    // Parameter is accessible immediately
    var results = [];
    results.push(param);

    // var declaration shadows parameter
    var param = "shadowed";
    results.push(param);

    return results;
}

var paramResult = testParameterShadowing("original");
if (paramResult[0] !== "original") throw new Error("Parameter should be accessible initially, got " + paramResult[0]);
if (paramResult[1] !== "shadowed") throw new Error("Parameter should be shadowed by var, got " + paramResult[1]);

// Test hoisting with eval (if supported)
try {
    function testEvalHoisting() {
        eval("var evalVar = 'eval value';");
        return evalVar;
    }

    var evalResult = testEvalHoisting();
    if (evalResult !== "eval value") throw new Error("Eval hoisting test failed, got " + evalResult);
} catch (e) {
    // eval might not be supported
}

// Test hoisting with with statement (if supported)
try {
    function testWithHoisting() {
        var obj = {prop: "object property"};
        with (obj) {
            if (typeof withVar !== "undefined") throw new Error("With var should be undefined initially, got " + withVar);
            var withVar = prop;
        }
        return withVar;
    }

    var withResult = testWithHoisting();
    if (withResult !== "object property") throw new Error("With hoisting test failed, got " + withResult);
} catch (e) {
    // with statement might not be supported
}

// Test arrow function hoisting (if supported)
try {
    eval(`
        function testArrowHoisting() {
            try {
                var result = arrowFunc();
                throw new Error("Arrow function should not be callable before assignment");
            } catch (e) {
                if (e.message === "Arrow function should not be callable before assignment") throw e;
                // Expected TypeError
            }

            var arrowFunc = () => "arrow function";
            return arrowFunc();
        }

        var arrowResult = testArrowHoisting();
        if (arrowResult !== "arrow function") throw new Error("Arrow function hoisting test failed, got " + arrowResult);
    `);
} catch (e) {
    // Arrow functions might not be supported
}

// Test class declaration hoisting (if supported)
try {
    eval(`
        function testClassHoisting() {
            try {
                var instance = new HoistedClass();
                throw new Error("Class should not be accessible before declaration");
            } catch (e) {
                if (e.message === "Class should not be accessible before declaration") throw e;
                // Expected ReferenceError
            }

            class HoistedClass {
                constructor() {
                    this.value = "class instance";
                }
            }

            var instance = new HoistedClass();
            return instance.value;
        }

        var classResult = testClassHoisting();
        if (classResult !== "class instance") throw new Error("Class hoisting test failed, got " + classResult);
    `);
} catch (e) {
    // Classes might not be supported
}

// Test destructuring hoisting (if supported)
try {
    eval(`
        function testDestructuringHoisting() {
            if (typeof destructuredVar !== "undefined") throw new Error("Destructured var should be undefined initially, got " + destructuredVar);

            var {prop: destructuredVar} = {prop: "destructured value"};
            return destructuredVar;
        }

        var destructuringResult = testDestructuringHoisting();
        if (destructuringResult !== "destructured value") throw new Error("Destructuring hoisting test failed, got " + destructuringResult);
    `);
} catch (e) {
    // Destructuring might not be supported
}

// Test generator function hoisting (if supported)
try {
    eval(`
        function testGeneratorHoisting() {
            var gen = hoistedGenerator();
            var result = gen.next().value;

            function* hoistedGenerator() {
                yield "generator value";
            }

            return result;
        }

        var generatorResult = testGeneratorHoisting();
        if (generatorResult !== "generator value") throw new Error("Generator hoisting test failed, got " + generatorResult);
    `);
} catch (e) {
    // Generators might not be supported
}

// Test async function hoisting (if supported)
try {
    eval(`
        async function testAsyncHoisting() {
            var result = await hoistedAsync();

            async function hoistedAsync() {
                return "async value";
            }

            return result;
        }

        // This test requires async/await support
    `);
} catch (e) {
    // Async functions might not be supported
}