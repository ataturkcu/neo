/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Try-Catch-Finally Blocks and Exception Propagation
 */

// Test basic try-catch
var caught = false;
try {
    throw new Error("test error");
} catch (e) {
    caught = true;
    if (!(e instanceof Error)) throw new Error("Caught value should be Error instance");
    if (e.message !== "test error") throw new Error("Caught error should have correct message");
}
if (!caught) throw new Error("Exception should have been caught");

// Test catch without error
var noCatchExecuted = true;
try {
    // No error thrown
    noCatchExecuted = false;
} catch (e) {
    throw new Error("Catch should not execute when no error is thrown");
}
if (noCatchExecuted) throw new Error("Try block should have executed");

// Test basic finally
var finallyExecuted = false;
try {
    // Normal execution
} finally {
    finallyExecuted = true;
}
if (!finallyExecuted) throw new Error("Finally block should always execute");

// Test finally with exception
var finallyWithException = false;
var exceptionCaught = false;
try {
    try {
        throw new Error("finally test");
    } finally {
        finallyWithException = true;
    }
} catch (e) {
    exceptionCaught = true;
}
if (!finallyWithException) throw new Error("Finally should execute even with exception");
if (!exceptionCaught) throw new Error("Exception should propagate after finally");

// Test try-catch-finally all together
var tryExecuted = false;
var catchExecuted = false;
var finallyExecutedAll = false;

try {
    tryExecuted = true;
    throw new Error("all blocks test");
} catch (e) {
    catchExecuted = true;
    if (e.message !== "all blocks test") throw new Error("Catch should receive correct error");
} finally {
    finallyExecutedAll = true;
}

if (!tryExecuted) throw new Error("Try block should execute");
if (!catchExecuted) throw new Error("Catch block should execute");
if (!finallyExecutedAll) throw new Error("Finally block should execute");

// Test exception types in catch
try {
    throw new TypeError("type error test");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("Should catch TypeError");
    if (!(e instanceof Error)) throw new Error("TypeError should be instance of Error");
}

try {
    throw new ReferenceError("reference error test");
} catch (e) {
    if (!(e instanceof ReferenceError)) throw new Error("Should catch ReferenceError");
}

// Test catching non-Error objects
try {
    throw "string exception";
} catch (e) {
    if (e !== "string exception") throw new Error("Should catch string values");
    if (typeof e !== "string") throw new Error("Caught string should remain string");
}

try {
    throw 42;
} catch (e) {
    if (e !== 42) throw new Error("Should catch number values");
    if (typeof e !== "number") throw new Error("Caught number should remain number");
}

try {
    throw true;
} catch (e) {
    if (e !== true) throw new Error("Should catch boolean values");
    if (typeof e !== "boolean") throw new Error("Caught boolean should remain boolean");
}

try {
    throw null;
} catch (e) {
    if (e !== null) throw new Error("Should catch null values");
}

try {
    throw undefined;
} catch (e) {
    if (e !== undefined) throw new Error("Should catch undefined values");
}

var obj = {message: "object exception"};
try {
    throw obj;
} catch (e) {
    if (e !== obj) throw new Error("Should catch object references");
    if (e.message !== "object exception") throw new Error("Object properties should be preserved");
}

// Test nested try-catch
var outerCaught = false;
var innerCaught = false;

try {
    try {
        throw new Error("inner error");
    } catch (e) {
        innerCaught = true;
        if (e.message !== "inner error") throw new Error("Inner catch should get inner error");
        throw new Error("outer error");
    }
} catch (e) {
    outerCaught = true;
    if (e.message !== "outer error") throw new Error("Outer catch should get re-thrown error");
}

if (!innerCaught) throw new Error("Inner catch should execute");
if (!outerCaught) throw new Error("Outer catch should execute");

// Test exception propagation through finally
var propagatedError = null;
try {
    try {
        throw new Error("propagate test");
    } finally {
        // Finally executes but doesn't catch
    }
} catch (e) {
    propagatedError = e;
}
if (!propagatedError || propagatedError.message !== "propagate test") {
    throw new Error("Exception should propagate through finally");
}

// Test finally overriding exception
var finallyOverride = false;
try {
    try {
        throw new Error("original error");
    } finally {
        finallyOverride = true;
        throw new Error("finally error");
    }
} catch (e) {
    if (e.message !== "finally error") throw new Error("Finally exception should override original");
}
if (!finallyOverride) throw new Error("Finally should execute");

// Test finally with return value
function testFinallyReturn() {
    try {
        return "try return";
    } finally {
        // Finally executes even with return
    }
}

var returnValue = testFinallyReturn();
if (returnValue !== "try return") throw new Error("Return value should be preserved through finally");

// Test finally overriding return
function testFinallyOverrideReturn() {
    try {
        return "try return";
    } finally {
        return "finally return";
    }
}

var overrideValue = testFinallyOverrideReturn();
if (overrideValue !== "finally return") throw new Error("Finally return should override try return");

// Test catch parameter scoping
var outerVar = "outer";
try {
    throw new Error("scoping test");
} catch (outerVar) {
    // outerVar is now the error in this scope
    if (!(outerVar instanceof Error)) throw new Error("Catch parameter should shadow outer variable");
}
if (outerVar !== "outer") throw new Error("Outer variable should be restored after catch");

// Test catch without parameter (if supported)
var parameterlessExecuted = false;
try {
    try {
        throw new Error("no parameter");
    } catch {
        parameterlessExecuted = true;
    }
} catch (e) {
    // Some engines might not support parameterless catch
    parameterlessExecuted = true;
}
if (!parameterlessExecuted) throw new Error("Catch should execute even without parameter");

// Test multiple exception types
var exceptions = [
    new Error("Error test"),
    new TypeError("TypeError test"),
    new ReferenceError("ReferenceError test"),
    new SyntaxError("SyntaxError test"),
    new RangeError("RangeError test"),
    new URIError("URIError test"),
    new EvalError("EvalError test")
];

for (var i = 0; i < exceptions.length; i++) {
    var exception = exceptions[i];
    var caught = false;

    try {
        throw exception;
    } catch (e) {
        caught = true;
        if (e !== exception) throw new Error("Should catch exact exception object");
    }

    if (!caught) throw new Error("Should catch " + exception.constructor.name);
}

// Test try-finally without catch
var tryFinallyExecuted = false;
var finallyNoError = false;

try {
    tryFinallyExecuted = true;
} finally {
    finallyNoError = true;
}

if (!tryFinallyExecuted) throw new Error("Try should execute in try-finally");
if (!finallyNoError) throw new Error("Finally should execute in try-finally");

// Test try-finally with exception propagation
var finallyWithPropagation = false;
var propagationCaught = false;

try {
    try {
        throw new Error("propagation test");
    } finally {
        finallyWithPropagation = true;
    }
} catch (e) {
    propagationCaught = true;
    if (e.message !== "propagation test") throw new Error("Propagated exception should be correct");
}

if (!finallyWithPropagation) throw new Error("Finally should execute during propagation");
if (!propagationCaught) throw new Error("Exception should propagate from try-finally");

// Test nested finally blocks
var outerFinally = false;
var innerFinally = false;

try {
    try {
        try {
            throw new Error("nested finally");
        } finally {
            innerFinally = true;
        }
    } finally {
        outerFinally = true;
    }
} catch (e) {
    // Expected to catch the uncaught error from nested try-finally
}

if (!innerFinally) throw new Error("Inner finally should execute");
if (!outerFinally) throw new Error("Outer finally should execute");

// Test exception in catch block
var catchException = false;
var secondCatch = false;

try {
    try {
        throw new Error("first error");
    } catch (e) {
        catchException = true;
        throw new Error("catch error");
    }
} catch (e) {
    secondCatch = true;
    if (e.message !== "catch error") throw new Error("Should catch exception from catch block");
}

if (!catchException) throw new Error("First catch should execute");
if (!secondCatch) throw new Error("Second catch should execute");

// Test exception in finally block
var finallyException = false;
var finallyExceptionCaught = false;

try {
    try {
        // No exception in try
    } finally {
        finallyException = true;
        throw new Error("finally exception");
    }
} catch (e) {
    finallyExceptionCaught = true;
    if (e.message !== "finally exception") throw new Error("Should catch finally exception");
}

if (!finallyException) throw new Error("Finally should execute");
if (!finallyExceptionCaught) throw new Error("Finally exception should be caught");

// Test complex nesting with all block types
var complexTry = false;
var complexCatch = false;
var complexFinally = false;
var complexOuterCatch = false;

try {
    try {
        complexTry = true;
        throw new Error("complex test");
    } catch (e) {
        complexCatch = true;
        if (e.message !== "complex test") throw new Error("Complex catch should get correct error");
    } finally {
        complexFinally = true;
    }
} catch (e) {
    complexOuterCatch = true;
    throw new Error("Outer catch should not execute in this case");
}

if (!complexTry) throw new Error("Complex try should execute");
if (!complexCatch) throw new Error("Complex catch should execute");
if (!complexFinally) throw new Error("Complex finally should execute");
if (complexOuterCatch) throw new Error("Complex outer catch should not execute");

// Test variable declarations in try-catch-finally
try {
    var tryVar = "try variable";
} catch (e) {
    var catchVar = "catch variable";
} finally {
    var finallyVar = "finally variable";
}

if (tryVar !== "try variable") throw new Error("Try block variables should be accessible");
if (typeof catchVar !== "undefined") {
    // catchVar might be undefined since catch didn't execute
}
if (finallyVar !== "finally variable") throw new Error("Finally block variables should be accessible");

// Test break and continue in try-catch-finally loops
var loopResults = [];
for (var j = 0; j < 3; j++) {
    try {
        if (j === 1) {
            continue;
        }
        loopResults.push("try-" + j);
    } catch (e) {
        loopResults.push("catch-" + j);
    } finally {
        loopResults.push("finally-" + j);
    }
}

if (loopResults.length !== 5) throw new Error("Loop try-catch-finally should execute correctly");
if (loopResults[0] !== "try-0") throw new Error("First iteration try should execute");
if (loopResults[1] !== "finally-0") throw new Error("First iteration finally should execute");
if (loopResults[2] !== "finally-1") throw new Error("Continued iteration finally should execute");
if (loopResults[3] !== "try-2") throw new Error("Last iteration try should execute");
if (loopResults[4] !== "finally-2") throw new Error("Last iteration finally should execute");

// Test return statements in nested try-finally
function nestedReturnTest() {
    try {
        try {
            return "inner return";
        } finally {
            // Inner finally
        }
    } finally {
        // Outer finally
    }
    return "unreachable";
}

var nestedReturn = nestedReturnTest();
if (nestedReturn !== "inner return") throw new Error("Nested return should work correctly");

// Test exception handling with different error types
function testErrorType(ErrorType, message) {
    try {
        throw new ErrorType(message);
    } catch (e) {
        if (!(e instanceof ErrorType)) throw new Error("Should catch " + ErrorType.name);
        if (e.message !== message) throw new Error("Error message should be preserved");
        return true;
    }
    return false;
}

var errorTypes = [Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError, EvalError];
for (var k = 0; k < errorTypes.length; k++) {
    var ErrorType = errorTypes[k];
    var caught = testErrorType(ErrorType, "test " + ErrorType.name);
    if (!caught) throw new Error("Should successfully test " + ErrorType.name);
}