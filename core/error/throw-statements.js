/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Throw Statements with Various Values, Custom Errors, and Re-throwing
 */

// Test throwing Error objects
try {
    throw new Error("basic error");
    throw new Error("Should not reach here");
} catch (e) {
    if (!(e instanceof Error)) throw new Error("Should throw Error object");
    if (e.message !== "basic error") throw new Error("Error message should be preserved");
}

// Test throwing different error types
var errorTypes = [
    {constructor: Error, message: "Error test"},
    {constructor: TypeError, message: "TypeError test"},
    {constructor: ReferenceError, message: "ReferenceError test"},
    {constructor: SyntaxError, message: "SyntaxError test"},
    {constructor: RangeError, message: "RangeError test"},
    {constructor: URIError, message: "URIError test"},
    {constructor: EvalError, message: "EvalError test"}
];

for (var i = 0; i < errorTypes.length; i++) {
    var errorType = errorTypes[i];
    try {
        throw new errorType.constructor(errorType.message);
    } catch (e) {
        if (!(e instanceof errorType.constructor)) {
            throw new Error("Should throw " + errorType.constructor.name);
        }
        if (e.message !== errorType.message) {
            throw new Error(errorType.constructor.name + " message should be preserved");
        }
    }
}

// Test throwing primitive values
try {
    throw "string exception";
} catch (e) {
    if (e !== "string exception") throw new Error("Should throw string value");
    if (typeof e !== "string") throw new Error("String exception should remain string");
}

try {
    throw 42;
} catch (e) {
    if (e !== 42) throw new Error("Should throw number value");
    if (typeof e !== "number") throw new Error("Number exception should remain number");
}

try {
    throw true;
} catch (e) {
    if (e !== true) throw new Error("Should throw boolean value");
    if (typeof e !== "boolean") throw new Error("Boolean exception should remain boolean");
}

try {
    throw false;
} catch (e) {
    if (e !== false) throw new Error("Should throw false value");
}

// Test throwing null and undefined
try {
    throw null;
} catch (e) {
    if (e !== null) throw new Error("Should throw null value");
}

try {
    throw undefined;
} catch (e) {
    if (e !== undefined) throw new Error("Should throw undefined value");
}

// Test throwing objects
var customObj = {
    name: "CustomException",
    message: "This is a custom object exception",
    code: 500
};

try {
    throw customObj;
} catch (e) {
    if (e !== customObj) throw new Error("Should throw exact object reference");
    if (e.name !== "CustomException") throw new Error("Object properties should be preserved");
    if (e.message !== "This is a custom object exception") throw new Error("Object message should be preserved");
    if (e.code !== 500) throw new Error("Custom object properties should be preserved");
}

// Test throwing arrays
var arrayException = ["error", "array", 123];
try {
    throw arrayException;
} catch (e) {
    if (e !== arrayException) throw new Error("Should throw array reference");
    if (!Array.isArray(e)) throw new Error("Array exception should remain array");
    if (e[0] !== "error" || e[1] !== "array" || e[2] !== 123) {
        throw new Error("Array contents should be preserved");
    }
}

// Test throwing functions
function exceptionFunction() {
    return "I'm a thrown function";
}

try {
    throw exceptionFunction;
} catch (e) {
    if (e !== exceptionFunction) throw new Error("Should throw function reference");
    if (typeof e !== "function") throw new Error("Function exception should remain function");
    if (e() !== "I'm a thrown function") throw new Error("Function should be callable after being thrown");
}

// Test re-throwing exceptions
var rethrowTest = false;
var originalError = new Error("original error");

try {
    try {
        throw originalError;
    } catch (e) {
        rethrowTest = true;
        if (e !== originalError) throw new Error("Should catch original error");
        throw e; // Re-throw
    }
} catch (e) {
    if (e !== originalError) throw new Error("Re-thrown error should be same object");
}

if (!rethrowTest) throw new Error("Re-throw test should execute");

// Test re-throwing with modification
try {
    try {
        throw new Error("modifiable error");
    } catch (e) {
        e.modified = true;
        e.message = "modified message";
        throw e;
    }
} catch (e) {
    if (e.message !== "modified message") throw new Error("Modified error should preserve changes");
    if (!e.modified) throw new Error("Custom properties should be preserved in re-throw");
}

// Test throwing in different contexts
function throwingFunction() {
    throw new Error("function error");
}

try {
    throwingFunction();
} catch (e) {
    if (e.message !== "function error") throw new Error("Function throw should work");
}

// Test throwing in object methods
var throwingObject = {
    method: function() {
        throw new Error("method error");
    },

    nestedMethod: function() {
        this.method();
    }
};

try {
    throwingObject.nestedMethod();
} catch (e) {
    if (e.message !== "method error") throw new Error("Object method throw should work");
}

// Test custom error constructors
function CustomError(message, code) {
    Error.call(this, message);
    this.name = "CustomError";
    this.message = message || "";
    this.code = code;
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

try {
    throw new CustomError("custom error message", 404);
} catch (e) {
    if (!(e instanceof CustomError)) throw new Error("Should throw CustomError instance");
    if (!(e instanceof Error)) throw new Error("CustomError should inherit from Error");
    if (e.message !== "custom error message") throw new Error("Custom error message should be preserved");
    if (e.code !== 404) throw new Error("Custom error properties should be preserved");
    if (e.name !== "CustomError") throw new Error("Custom error name should be preserved");
}

// Test custom error with additional methods
function ExtendedError(message) {
    Error.call(this, message);
    this.name = "ExtendedError";
    this.message = message || "";
}
ExtendedError.prototype = Object.create(Error.prototype);
ExtendedError.prototype.constructor = ExtendedError;
ExtendedError.prototype.getDetails = function() {
    return "Extended: " + this.message;
};

try {
    throw new ExtendedError("extended error");
} catch (e) {
    if (!(e instanceof ExtendedError)) throw new Error("Should throw ExtendedError instance");
    if (typeof e.getDetails !== "function") throw new Error("Extended methods should be available");
    if (e.getDetails() !== "Extended: extended error") throw new Error("Extended methods should work");
}

// Test throwing with Symbol values (if supported)
try {
    if (typeof Symbol !== "undefined") {
        var symbolValue = Symbol("exception symbol");
        try {
            throw symbolValue;
        } catch (e) {
            if (e !== symbolValue) throw new Error("Should throw Symbol value");
            if (typeof e !== "symbol") throw new Error("Symbol exception should remain symbol");
        }
    }
} catch (e) {
    // Symbol might not be supported
}

// Test throwing in nested functions
function outerThrow() {
    function innerThrow() {
        function deepThrow() {
            throw new Error("deep error");
        }
        deepThrow();
    }
    innerThrow();
}

try {
    outerThrow();
} catch (e) {
    if (e.message !== "deep error") throw new Error("Nested function throw should work");
}

// Test throwing in callbacks
function executeCallback(callback) {
    callback();
}

try {
    executeCallback(function() {
        throw new Error("callback error");
    });
} catch (e) {
    if (e.message !== "callback error") throw new Error("Callback throw should work");
}

// Test throwing in setTimeout (synchronous test)
var timeoutThrown = false;
try {
    (function() {
        throw new Error("immediate error");
    })();
} catch (e) {
    timeoutThrown = true;
    if (e.message !== "immediate error") throw new Error("Immediate function throw should work");
}
if (!timeoutThrown) throw new Error("Immediate function should have thrown");

// Test throwing with closures
function createThrower(message) {
    return function() {
        throw new Error(message);
    };
}

var thrower = createThrower("closure error");
try {
    thrower();
} catch (e) {
    if (e.message !== "closure error") throw new Error("Closure throw should work");
}

// Test throwing with try-catch in different scopes
var scopeTest = false;
function testScope() {
    try {
        throw new Error("scope error");
    } catch (e) {
        scopeTest = true;
        return e.message;
    }
}

var scopeResult = testScope();
if (!scopeTest) throw new Error("Scope test should execute");
if (scopeResult !== "scope error") throw new Error("Scope error should be handled correctly");

// Test throwing with complex object hierarchies
function BaseError(message) {
    Error.call(this, message);
    this.name = "BaseError";
}
BaseError.prototype = Object.create(Error.prototype);

function SpecificError(message, details) {
    BaseError.call(this, message);
    this.name = "SpecificError";
    this.details = details;
}
SpecificError.prototype = Object.create(BaseError.prototype);

try {
    throw new SpecificError("specific error", {level: "critical"});
} catch (e) {
    if (!(e instanceof SpecificError)) throw new Error("Should throw SpecificError");
    if (!(e instanceof BaseError)) throw new Error("Should inherit from BaseError");
    if (!(e instanceof Error)) throw new Error("Should inherit from Error");
    if (e.details.level !== "critical") throw new Error("Complex properties should be preserved");
}

// Test throwing with getter/setter properties
var dynamicError = new Error("dynamic error");
Object.defineProperty(dynamicError, "dynamicProp", {
    get: function() { return "dynamic value"; },
    set: function(val) { this._dynamicVal = val; }
});

try {
    throw dynamicError;
} catch (e) {
    if (e.dynamicProp !== "dynamic value") throw new Error("Getter properties should work in thrown errors");
    e.dynamicProp = "modified";
    if (e._dynamicVal !== "modified") throw new Error("Setter properties should work in thrown errors");
}

// Test throwing in constructor functions
function ThrowingConstructor() {
    throw new Error("constructor error");
}

try {
    new ThrowingConstructor();
} catch (e) {
    if (e.message !== "constructor error") throw new Error("Constructor throw should work");
}

// Test throwing with non-enumerable properties
var nonEnumError = new Error("non-enum error");
Object.defineProperty(nonEnumError, "hiddenProp", {
    value: "hidden",
    enumerable: false
});

try {
    throw nonEnumError;
} catch (e) {
    if (e.hiddenProp !== "hidden") throw new Error("Non-enumerable properties should be preserved");
    var keys = Object.keys(e);
    if (keys.indexOf("hiddenProp") !== -1) throw new Error("Hidden property should not be enumerable");
}

// Test throwing with circular references
var circularError = new Error("circular error");
circularError.self = circularError;

try {
    throw circularError;
} catch (e) {
    if (e.self !== e) throw new Error("Circular references should be preserved");
}

// Test throwing with prototype modifications
function ModifiableError(message) {
    Error.call(this, message);
    this.name = "ModifiableError";
    this.message = message || "";
}
ModifiableError.prototype = Object.create(Error.prototype);
ModifiableError.prototype.customMethod = function() {
    return "custom: " + this.message;
};

var modError = new ModifiableError("mod error");

// Modify prototype after creation
ModifiableError.prototype.addedMethod = function() {
    return "added method";
};

try {
    throw modError;
} catch (e) {
    if (typeof e.customMethod !== "function") throw new Error("Original prototype methods should be available");
    if (typeof e.addedMethod !== "function") throw new Error("Added prototype methods should be available");
    if (e.customMethod() !== "custom: mod error") throw new Error("Prototype methods should work correctly");
    if (e.addedMethod() !== "added method") throw new Error("Added methods should work correctly");
}

// Test throwing with valueOf and toString modifications
var toStringError = new Error("toString test");
toStringError.toString = function() {
    return "Custom toString: " + this.message;
};
toStringError.valueOf = function() {
    return "Custom valueOf";
};

try {
    throw toStringError;
} catch (e) {
    if (e.toString() !== "Custom toString: toString test") {
        throw new Error("Custom toString should work in thrown errors");
    }
    if (e.valueOf() !== "Custom valueOf") {
        throw new Error("Custom valueOf should work in thrown errors");
    }
}

// Test exception propagation through multiple function calls
function level3() {
    throw new Error("level 3 error");
}

function level2() {
    level3();
}

function level1() {
    level2();
}

try {
    level1();
} catch (e) {
    if (e.message !== "level 3 error") throw new Error("Exception should propagate through call stack");
}

// Test throwing with bind
function boundThrower(message) {
    throw new Error(message);
}

var boundFn = boundThrower.bind(null, "bound error");

try {
    boundFn();
} catch (e) {
    if (e.message !== "bound error") throw new Error("Bound function throw should work");
}

// Test throwing with apply and call
function applyThrower(prefix, message) {
    throw new Error(prefix + ": " + message);
}

try {
    applyThrower.apply(null, ["Apply", "test"]);
} catch (e) {
    if (e.message !== "Apply: test") throw new Error("Apply throw should work");
}

try {
    applyThrower.call(null, "Call", "test");
} catch (e) {
    if (e.message !== "Call: test") throw new Error("Call throw should work");
}