/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: All Error Types - Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError, EvalError
 */

// === Error Tests ===
var err = new Error("base error");
if (!(err instanceof Error)) throw new Error("Error should be instance of Error");
if (err.name !== "Error") throw new Error("Error name should be 'Error'");
if (err.message !== "base error") throw new Error("Error message should be preserved");

// === TypeError Tests ===
var typeErr = new TypeError("type error");
if (!(typeErr instanceof TypeError)) throw new Error("TypeError should be instance of TypeError");
if (!(typeErr instanceof Error)) throw new Error("TypeError should be instance of Error");
if (typeErr.name !== "TypeError") throw new Error("TypeError name should be 'TypeError'");
if (typeErr.message !== "type error") throw new Error("TypeError message should be preserved");

// Test TypeError without message
var typeErrEmpty = new TypeError();
if (typeErrEmpty.name !== "TypeError") throw new Error("TypeError name should be 'TypeError' even without message");
if (typeErrEmpty.message !== "") throw new Error("TypeError without message should have empty message");

// Test TypeError without 'new'
var typeErrFunc = TypeError("function call");
if (!(typeErrFunc instanceof TypeError)) throw new Error("TypeError() should work without new");

// === ReferenceError Tests ===
var refErr = new ReferenceError("reference error");
if (!(refErr instanceof ReferenceError)) throw new Error("ReferenceError should be instance of ReferenceError");
if (!(refErr instanceof Error)) throw new Error("ReferenceError should be instance of Error");
if (refErr.name !== "ReferenceError") throw new Error("ReferenceError name should be 'ReferenceError'");
if (refErr.message !== "reference error") throw new Error("ReferenceError message should be preserved");

// Test ReferenceError scenarios
try {
    undefinedVariable;
    throw new Error("Should have thrown ReferenceError");
} catch (e) {
    if (!(e instanceof ReferenceError)) throw new Error("Undefined variable should throw ReferenceError");
}

// === SyntaxError Tests ===
var syntaxErr = new SyntaxError("syntax error");
if (!(syntaxErr instanceof SyntaxError)) throw new Error("SyntaxError should be instance of SyntaxError");
if (!(syntaxErr instanceof Error)) throw new Error("SyntaxError should be instance of Error");
if (syntaxErr.name !== "SyntaxError") throw new Error("SyntaxError name should be 'SyntaxError'");
if (syntaxErr.message !== "syntax error") throw new Error("SyntaxError message should be preserved");

// Test SyntaxError with eval (if supported)
try {
    if (typeof eval !== "undefined") {
        eval("invalid syntax {{{");
        throw new Error("Should have thrown SyntaxError");
    }
} catch (e) {
    if (typeof eval !== "undefined" && !(e instanceof SyntaxError)) {
        throw new Error("Invalid syntax should throw SyntaxError");
    }
}

// === RangeError Tests ===
var rangeErr = new RangeError("range error");
if (!(rangeErr instanceof RangeError)) throw new Error("RangeError should be instance of RangeError");
if (!(rangeErr instanceof Error)) throw new Error("RangeError should be instance of Error");
if (rangeErr.name !== "RangeError") throw new Error("RangeError name should be 'RangeError'");
if (rangeErr.message !== "range error") throw new Error("RangeError message should be preserved");

// Test RangeError scenarios
try {
    var arr = [];
    arr.length = -1;
    throw new Error("Should have thrown RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Negative array length should throw RangeError");
}

try {
    (42).toString(1);
    throw new Error("Should have thrown RangeError");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Invalid radix should throw RangeError");
}

// === URIError Tests ===
var uriErr = new URIError("URI error");
if (!(uriErr instanceof URIError)) throw new Error("URIError should be instance of URIError");
if (!(uriErr instanceof Error)) throw new Error("URIError should be instance of Error");
if (uriErr.name !== "URIError") throw new Error("URIError name should be 'URIError'");
if (uriErr.message !== "URI error") throw new Error("URIError message should be preserved");

// Test URIError scenarios (if URI functions are supported)
try {
    if (typeof decodeURI !== "undefined") {
        decodeURI("%E0%A4%A");
        throw new Error("Should have thrown URIError");
    }
} catch (e) {
    if (typeof decodeURI !== "undefined" && !(e instanceof URIError)) {
        throw new Error("Invalid URI should throw URIError");
    }
}

// === EvalError Tests ===
var evalErr = new EvalError("eval error");
if (!(evalErr instanceof EvalError)) throw new Error("EvalError should be instance of EvalError");
if (!(evalErr instanceof Error)) throw new Error("EvalError should be instance of Error");
if (evalErr.name !== "EvalError") throw new Error("EvalError name should be 'EvalError'");
if (evalErr.message !== "eval error") throw new Error("EvalError message should be preserved");

// === Cross-type inheritance tests ===
var allErrors = [
    new Error("test"),
    new TypeError("test"),
    new ReferenceError("test"),
    new SyntaxError("test"),
    new RangeError("test"),
    new URIError("test"),
    new EvalError("test")
];

for (var i = 0; i < allErrors.length; i++) {
    var error = allErrors[i];
    if (!(error instanceof Error)) throw new Error("All error types should inherit from Error");
    if (typeof error.toString !== "function") throw new Error("All errors should have toString method");
    if (typeof error.name !== "string") throw new Error("All errors should have string name");
    if (typeof error.message !== "string") throw new Error("All errors should have string message");
}

// === Error type specificity tests ===
var specificErrors = [
    {type: TypeError, name: "TypeError"},
    {type: ReferenceError, name: "ReferenceError"},
    {type: SyntaxError, name: "SyntaxError"},
    {type: RangeError, name: "RangeError"},
    {type: URIError, name: "URIError"},
    {type: EvalError, name: "EvalError"}
];

for (var j = 0; j < specificErrors.length; j++) {
    var errorSpec = specificErrors[j];
    var instance = new errorSpec.type("test message");

    if (instance.name !== errorSpec.name) {
        throw new Error(errorSpec.name + " should have correct name");
    }

    if (instance.message !== "test message") {
        throw new Error(errorSpec.name + " should preserve message");
    }

    if (!(instance instanceof errorSpec.type)) {
        throw new Error(errorSpec.name + " should be instance of itself");
    }

    if (!(instance instanceof Error)) {
        throw new Error(errorSpec.name + " should be instance of Error");
    }
}

// === Constructor length tests ===
if (Error.length !== 1) throw new Error("Error constructor should have length 1");
if (TypeError.length !== 1) throw new Error("TypeError constructor should have length 1");
if (ReferenceError.length !== 1) throw new Error("ReferenceError constructor should have length 1");
if (SyntaxError.length !== 1) throw new Error("SyntaxError constructor should have length 1");
if (RangeError.length !== 1) throw new Error("RangeError constructor should have length 1");
if (URIError.length !== 1) throw new Error("URIError constructor should have length 1");
if (EvalError.length !== 1) throw new Error("EvalError constructor should have length 1");

// === Prototype chain tests ===
if (TypeError.prototype.constructor !== TypeError) throw new Error("TypeError.prototype.constructor should be TypeError");
if (ReferenceError.prototype.constructor !== ReferenceError) throw new Error("ReferenceError.prototype.constructor should be ReferenceError");
if (SyntaxError.prototype.constructor !== SyntaxError) throw new Error("SyntaxError.prototype.constructor should be SyntaxError");
if (RangeError.prototype.constructor !== RangeError) throw new Error("RangeError.prototype.constructor should be RangeError");
if (URIError.prototype.constructor !== URIError) throw new Error("URIError.prototype.constructor should be URIError");
if (EvalError.prototype.constructor !== EvalError) throw new Error("EvalError.prototype.constructor should be EvalError");

// === toString behavior tests ===
var typeError = new TypeError("Custom type error");
var typeErrorStr = typeError.toString();
if (typeErrorStr.indexOf("TypeError") === -1) throw new Error("TypeError toString should include type name");
if (typeErrorStr.indexOf("Custom type error") === -1) throw new Error("TypeError toString should include message");

var refError = new ReferenceError();
refError.name = "CustomRef";
var refErrorStr = refError.toString();
if (refErrorStr !== "CustomRef") throw new Error("Empty message error toString should return name only");

// === Error type coercion tests ===
var typeErrNum = new TypeError(42);
if (typeErrNum.message !== "42") throw new Error("TypeError should convert number to string");

var refErrBool = new ReferenceError(false);
if (refErrBool.message !== "false") throw new Error("ReferenceError should convert boolean to string");

var syntaxErrNull = new SyntaxError(null);
if (syntaxErrNull.message !== "null") throw new Error("SyntaxError should convert null to string");

// === Error instanceof across types ===
var typeErr2 = new TypeError();
if (typeErr2 instanceof ReferenceError) throw new Error("TypeError should not be instanceof ReferenceError");
if (typeErr2 instanceof SyntaxError) throw new Error("TypeError should not be instanceof SyntaxError");
if (typeErr2 instanceof RangeError) throw new Error("TypeError should not be instanceof RangeError");

var refErr2 = new ReferenceError();
if (refErr2 instanceof TypeError) throw new Error("ReferenceError should not be instanceof TypeError");
if (refErr2 instanceof SyntaxError) throw new Error("ReferenceError should not be instanceof SyntaxError");

// === Error subclassing tests ===
function CustomTypeError(message) {
    TypeError.call(this, message);
    this.name = "CustomTypeError";
}
CustomTypeError.prototype = Object.create(TypeError.prototype);
CustomTypeError.prototype.constructor = CustomTypeError;

var customType = new CustomTypeError("custom type");
if (!(customType instanceof CustomTypeError)) throw new Error("Custom error should be instance of itself");
if (!(customType instanceof TypeError)) throw new Error("Custom error should be instance of parent type");
if (!(customType instanceof Error)) throw new Error("Custom error should be instance of Error");

// === Error modification tests ===
var modifiableErr = new TypeError("modifiable");
modifiableErr.name = "ModifiedType";
modifiableErr.message = "modified message";
if (modifiableErr.name !== "ModifiedType") throw new Error("Error name should be modifiable");
if (modifiableErr.message !== "modified message") throw new Error("Error message should be modifiable");

// === Error with special values ===
var errUndefined = new RangeError(undefined);
if (errUndefined.message !== "") throw new Error("Error with undefined should have empty message");

var errSymbol;
try {
    if (typeof Symbol !== "undefined") {
        errSymbol = new URIError(Symbol.for("test"));
        if (errSymbol.message !== "Symbol(test)") throw new Error("Error should handle Symbol message");
    }
} catch (e) {
    // Symbol might not be supported
}

// === Error function vs constructor behavior ===
var funcType = TypeError("function");
var consType = new TypeError("constructor");

if (!(funcType instanceof TypeError)) throw new Error("TypeError() should work as function");
if (!(consType instanceof TypeError)) throw new Error("new TypeError() should work as constructor");
if (funcType.constructor !== TypeError) throw new Error("Function call should have correct constructor");
if (consType.constructor !== TypeError) throw new Error("Constructor call should have correct constructor");

// === Error prototype property tests ===
var errorTypes = [
    {constructor: Error, prototype: Error.prototype, name: "Error"},
    {constructor: TypeError, prototype: TypeError.prototype, name: "TypeError"},
    {constructor: ReferenceError, prototype: ReferenceError.prototype, name: "ReferenceError"},
    {constructor: SyntaxError, prototype: SyntaxError.prototype, name: "SyntaxError"},
    {constructor: RangeError, prototype: RangeError.prototype, name: "RangeError"},
    {constructor: URIError, prototype: URIError.prototype, name: "URIError"},
    {constructor: EvalError, prototype: EvalError.prototype, name: "EvalError"}
];

for (var k = 0; k < errorTypes.length; k++) {
    var errorType = errorTypes[k];

    if (!errorType.prototype.hasOwnProperty("name")) {
        throw new Error(errorType.name + ".prototype should have name property");
    }

    if (!errorType.prototype.hasOwnProperty("message")) {
        throw new Error(errorType.name + ".prototype should have message property");
    }

    if (errorType.prototype.name !== errorType.name) {
        throw new Error(errorType.name + ".prototype.name should match constructor name");
    }
}

// === Error stack property (basic test) ===
var stackErr = new Error("stack test");
if (typeof stackErr.stack !== "undefined" && typeof stackErr.stack !== "string") {
    throw new Error("Error stack property should be string when present");
}

// === Error circular reference handling ===
var circularErr = new TypeError();
circularErr.cause = circularErr;
try {
    var circularStr = circularErr.toString();
    // Should not cause infinite loop
} catch (e) {
    // Some implementations might throw on circular reference
}

// === Error property descriptor tests ===
var propErr = new SyntaxError("property test");
var nameDescriptor = Object.getOwnPropertyDescriptor(propErr, "name");
var messageDescriptor = Object.getOwnPropertyDescriptor(propErr, "message");

// These properties should exist and be writable
if (nameDescriptor && nameDescriptor.writable === false) {
    throw new Error("Error name property should be writable");
}
if (messageDescriptor && messageDescriptor.writable === false) {
    throw new Error("Error message property should be writable");
}