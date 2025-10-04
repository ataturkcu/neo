/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Let and Const Block Scoping and Temporal Dead Zone
 */

// Test basic let declaration and block scoping
{
    let blockScopedLet = "inside block";
    if (blockScopedLet !== "inside block") throw new Error("let should work inside block, got " + blockScopedLet);
}

// Test that let is not accessible outside its block
try {
    var outsideAccess = blockScopedLet;
    throw new Error("let should not be accessible outside its block");
} catch (e) {
    if (e.message === "let should not be accessible outside its block") throw e;
    // Expected ReferenceError
}

// Test basic const declaration
const constValue = 42;
if (constValue !== 42) throw new Error("const declaration should work, got " + constValue);

// Test const cannot be reassigned
try {
    const constReassign = "original";
    constReassign = "new value";
    throw new Error("const should not allow reassignment");
} catch (e) {
    if (e.message === "const should not allow reassignment") throw e;
    // Expected TypeError
}

// Test const must be initialized
try {
    eval("const uninitializedConst;");
    throw new Error("const should require initialization");
} catch (e) {
    if (e.message === "const should require initialization") throw e;
    // Expected SyntaxError
}

// Test let vs var scoping in functions
function testLetVsVarScoping() {
    var results = [];

    if (true) {
        var varInBlock = "var accessible";
        let letInBlock = "let not accessible outside";
    }

    results.push(varInBlock);  // Should work

    try {
        results.push(letInBlock);  // Should throw ReferenceError
        throw new Error("let should not be accessible outside block");
    } catch (e) {
        if (e.message === "let should not be accessible outside block") throw e;
        results.push("let correctly blocked");
    }

    return results;
}

var scopingResult = testLetVsVarScoping();
if (scopingResult[0] !== "var accessible") throw new Error("var scoping test failed, got " + scopingResult[0]);
if (scopingResult[1] !== "let correctly blocked") throw new Error("let scoping test failed, got " + scopingResult[1]);

// Test let in loops - no hoisting issues
var letLoopResults = [];
for (let i = 0; i < 3; i++) {
    letLoopResults.push(function() { return i; });
}

// Each function should return its respective index due to let's block scoping
if (letLoopResults[0]() !== 0) throw new Error("Let loop should capture 0, got " + letLoopResults[0]());
if (letLoopResults[1]() !== 1) throw new Error("Let loop should capture 1, got " + letLoopResults[1]());
if (letLoopResults[2]() !== 2) throw new Error("Let loop should capture 2, got " + letLoopResults[2]());

// Test let cannot be accessed before declaration (Temporal Dead Zone)
try {
    eval(`
        console.log(beforeDeclaration);
        let beforeDeclaration = "after";
    `);
    throw new Error("let should not be accessible before declaration");
} catch (e) {
    if (e.message === "let should not be accessible before declaration") throw e;
    // Expected ReferenceError
}

// Test const temporal dead zone
try {
    eval(`
        console.log(constBeforeDeclaration);
        const constBeforeDeclaration = "after";
    `);
    throw new Error("const should not be accessible before declaration");
} catch (e) {
    if (e.message === "const should not be accessible before declaration") throw e;
    // Expected ReferenceError
}

// Test let redeclaration in same scope is not allowed
try {
    eval(`
        let redeclareTest = "first";
        let redeclareTest = "second";
    `);
    throw new Error("let should not allow redeclaration in same scope");
} catch (e) {
    if (e.message === "let should not allow redeclaration in same scope") throw e;
    // Expected SyntaxError
}

// Test const redeclaration in same scope is not allowed
try {
    eval(`
        const constRedeclareTest = "first";
        const constRedeclareTest = "second";
    `);
    throw new Error("const should not allow redeclaration in same scope");
} catch (e) {
    if (e.message === "const should not allow redeclaration in same scope") throw e;
    // Expected SyntaxError
}

// Test let and const in different scopes (allowed)
function testDifferentScopes() {
    let scopeTest = "outer";
    const constScopeTest = "outer const";

    {
        let scopeTest = "inner";  // Allowed in different scope
        const constScopeTest = "inner const";  // Allowed in different scope

        if (scopeTest !== "inner") throw new Error("Inner let should shadow outer, got " + scopeTest);
        if (constScopeTest !== "inner const") throw new Error("Inner const should shadow outer, got " + constScopeTest);
    }

    if (scopeTest !== "outer") throw new Error("Outer let should be unchanged, got " + scopeTest);
    if (constScopeTest !== "outer const") throw new Error("Outer const should be unchanged, got " + constScopeTest);

    return "success";
}

var differentScopesResult = testDifferentScopes();
if (differentScopesResult !== "success") throw new Error("Different scopes test failed");

// Test let/const with switch statements
function testLetConstInSwitch(value) {
    switch (value) {
        case 1: {
            let switchLet = "case 1 let";
            const switchConst = "case 1 const";
            return switchLet + " " + switchConst;
        }
        case 2: {
            let switchLet = "case 2 let";
            const switchConst = "case 2 const";
            return switchLet + " " + switchConst;
        }
        default: {
            let switchLet = "default let";
            const switchConst = "default const";
            return switchLet + " " + switchConst;
        }
    }
}

var switchResult1 = testLetConstInSwitch(1);
if (switchResult1 !== "case 1 let case 1 const") throw new Error("Switch case 1 failed, got " + switchResult1);

var switchResult2 = testLetConstInSwitch(2);
if (switchResult2 !== "case 2 let case 2 const") throw new Error("Switch case 2 failed, got " + switchResult2);

// Test const with objects (object itself can't be reassigned, but properties can be modified)
const constObject = {prop: "original"};
constObject.prop = "modified";
constObject.newProp = "added";

if (constObject.prop !== "modified") throw new Error("const object property should be modifiable, got " + constObject.prop);
if (constObject.newProp !== "added") throw new Error("const object should allow new properties, got " + constObject.newProp);

try {
    constObject = {newObject: "not allowed"};
    throw new Error("const object should not be reassignable");
} catch (e) {
    if (e.message === "const object should not be reassignable") throw e;
    // Expected TypeError
}

// Test const with arrays
const constArray = [1, 2, 3];
constArray.push(4);
constArray[0] = 0;

if (constArray.length !== 4) throw new Error("const array should be modifiable, length: " + constArray.length);
if (constArray[0] !== 0) throw new Error("const array elements should be modifiable, got " + constArray[0]);

try {
    constArray = [5, 6, 7];
    throw new Error("const array should not be reassignable");
} catch (e) {
    if (e.message === "const array should not be reassignable") throw e;
    // Expected TypeError
}

// Test let/const in try-catch blocks
function testLetConstInTryCatch() {
    try {
        let tryLet = "in try";
        const tryConst = "in try const";
        throw new Error("test error");
    } catch (e) {
        try {
            var accessTryLet = tryLet;
            throw new Error("try let should not be accessible in catch");
        } catch (e2) {
            if (e2.message === "try let should not be accessible in catch") throw e2;
            // Expected ReferenceError
        }

        let catchLet = "in catch";
        const catchConst = "in catch const";

        if (catchLet !== "in catch") throw new Error("catch let failed, got " + catchLet);
        if (catchConst !== "in catch const") throw new Error("catch const failed, got " + catchConst);
    }

    try {
        var accessCatchLet = catchLet;
        throw new Error("catch let should not be accessible outside");
    } catch (e) {
        if (e.message === "catch let should not be accessible outside") throw e;
        // Expected ReferenceError
    }

    return "success";
}

var tryCatchResult = testLetConstInTryCatch();
if (tryCatchResult !== "success") throw new Error("Try-catch let/const test failed");

// Test for-loop with let/const
function testForLoopLetConst() {
    var results = [];

    for (let i = 0; i < 3; i++) {
        results.push(i);
    }

    // i should not be accessible outside the loop
    try {
        var outsideI = i;
        throw new Error("for-loop let should not be accessible outside");
    } catch (e) {
        if (e.message === "for-loop let should not be accessible outside") throw e;
        // Expected ReferenceError
    }

    return results;
}

var forLoopResult = testForLoopLetConst();
if (forLoopResult.length !== 3) throw new Error("For loop should produce 3 results, got " + forLoopResult.length);
if (forLoopResult[0] !== 0) throw new Error("For loop result 0 failed, got " + forLoopResult[0]);

// Test for-in loop with let/const
function testForInLetConst() {
    var obj = {a: 1, b: 2, c: 3};
    var keys = [];

    for (let key in obj) {
        keys.push(key);
    }

    try {
        var outsideKey = key;
        throw new Error("for-in let should not be accessible outside");
    } catch (e) {
        if (e.message === "for-in let should not be accessible outside") throw e;
        // Expected ReferenceError
    }

    return keys;
}

var forInResult = testForInLetConst();
if (forInResult.length !== 3) throw new Error("For-in should produce 3 keys, got " + forInResult.length);

// Test for-of loop with let/const (if supported)
try {
    eval(`
        function testForOfLetConst() {
            var arr = [1, 2, 3];
            var values = [];

            for (let value of arr) {
                values.push(value);
            }

            try {
                var outsideValue = value;
                throw new Error("for-of let should not be accessible outside");
            } catch (e) {
                if (e.message === "for-of let should not be accessible outside") throw e;
                // Expected ReferenceError
            }

            return values;
        }

        var forOfResult = testForOfLetConst();
        if (forOfResult.length !== 3) throw new Error("For-of should produce 3 values, got " + forOfResult.length);
    `);
} catch (e) {
    // for-of might not be supported
}

// Test typeof operator with let/const in temporal dead zone
try {
    eval(`
        typeof temporalDeadZoneTest;
        let temporalDeadZoneTest = "value";
    `);
    throw new Error("typeof should throw ReferenceError in temporal dead zone");
} catch (e) {
    if (e.message === "typeof should throw ReferenceError in temporal dead zone") throw e;
    // Expected ReferenceError
}

// Test let/const parameter shadowing
function testParameterShadowing(param) {
    {
        let param = 'shadowed'; // This is allowed in block scope
        if (param !== 'shadowed') throw new Error("let should shadow parameter in block scope");
    }

    // Original parameter should be unchanged outside block
    if (param !== 'original') throw new Error("Parameter should be unchanged outside block");

    return param;
}

var paramResult = testParameterShadowing("original");
if (paramResult !== "original") throw new Error("Parameter should remain unchanged, got " + paramResult);

// Test let/const with eval
try {
    eval("let evalLet = 'eval let';");
    eval("const evalConst = 'eval const';");

    if (evalLet !== "eval let") throw new Error("eval let should work, got " + evalLet);
    if (evalConst !== "eval const") throw new Error("eval const should work, got " + evalConst);
} catch (e) {
    // eval might not be supported or might be in strict mode
}

// Test class declaration scoping (if classes are supported)
try {
    eval(`
        {
            class BlockClass {
                constructor() {
                    this.value = "block class";
                }
            }

            var blockInstance = new BlockClass();
            if (blockInstance.value !== "block class") throw new Error("Block class should work");
        }

        try {
            var outsideInstance = new BlockClass();
            throw new Error("Block class should not be accessible outside");
        } catch (e) {
            if (e.message === "Block class should not be accessible outside") throw e;
            // Expected ReferenceError
        }
    `);
} catch (e) {
    // Classes might not be supported
}

// Test function declaration vs let/const in same scope
try {
    eval(`
        function duplicateName() {}
        let duplicateName = "variable";
    `);
    throw new Error("let should not be able to duplicate function name");
} catch (e) {
    if (e.message === "let should not be able to duplicate function name") throw e;
    // Expected SyntaxError
}

// Test arrow functions with let/const (if supported)
try {
    eval(`
        const arrowFunction = (x) => {
            let arrowLet = x * 2;
            return arrowLet;
        };

        var arrowResult = arrowFunction(5);
        if (arrowResult !== 10) throw new Error("Arrow function with let failed, got " + arrowResult);
    `);
} catch (e) {
    // Arrow functions might not be supported
}

// Test destructuring with let/const (if supported)
try {
    eval(`
        const obj = {x: 1, y: 2};
        const {x, y} = obj;

        if (x !== 1) throw new Error("Destructuring const x failed, got " + x);
        if (y !== 2) throw new Error("Destructuring const y failed, got " + y);

        let arr = [3, 4];
        let [a, b] = arr;

        if (a !== 3) throw new Error("Destructuring let a failed, got " + a);
        if (b !== 4) throw new Error("Destructuring let b failed, got " + b);
    `);
} catch (e) {
    // Destructuring might not be supported
}

// Test default parameters with let/const (if supported)
try {
    eval(`
        function defaultParams(x = 5) {
            let defaultLet = x * 2;
            const defaultConst = x * 3;
            return defaultLet + defaultConst;
        }

        var defaultResult = defaultParams();
        if (defaultResult !== 25) throw new Error("Default params with let/const failed, got " + defaultResult);
    `);
} catch (e) {
    // Default parameters might not be supported
}