/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Error Constructor and Methods
 */

// Test Error constructor without arguments
var err1 = new Error();
if (!(err1 instanceof Error)) throw new Error("Error constructor should create Error instance");
if (err1.name !== "Error") throw new Error("Default Error name should be 'Error'");
if (err1.message !== "") throw new Error("Default Error message should be empty string");

// Test Error constructor with message
var err2 = new Error("Test message");
if (!(err2 instanceof Error)) throw new Error("Error with message should create Error instance");
if (err2.name !== "Error") throw new Error("Error name should be 'Error'");
if (err2.message !== "Test message") throw new Error("Error message should be preserved");

// Test Error constructor without 'new'
var err3 = Error("Without new");
if (!(err3 instanceof Error)) throw new Error("Error() without new should create Error instance");
if (err3.message !== "Without new") throw new Error("Error message should work without new");

// Test Error.prototype.name property
var err4 = new Error();
if (err4.name !== "Error") throw new Error("Error.prototype.name should be 'Error'");
err4.name = "CustomError";
if (err4.name !== "CustomError") throw new Error("Error name should be writable");

// Test Error.prototype.message property
var err5 = new Error("Initial message");
if (err5.message !== "Initial message") throw new Error("Error message should be accessible");
err5.message = "Modified message";
if (err5.message !== "Modified message") throw new Error("Error message should be writable");

// Test Error.prototype.toString() method
var err6 = new Error("Test error");
var str = err6.toString();
if (typeof str !== "string") throw new Error("Error.toString() should return string");
if (str.indexOf("Error") === -1) throw new Error("Error.toString() should contain error name");
if (str.indexOf("Test error") === -1) throw new Error("Error.toString() should contain error message");

// Test toString with custom name
var err7 = new Error("Custom message");
err7.name = "CustomError";
var customStr = err7.toString();
if (customStr.indexOf("CustomError") === -1) throw new Error("toString should use custom name");
if (customStr.indexOf("Custom message") === -1) throw new Error("toString should include message");

// Test toString with empty message
var err8 = new Error();
err8.name = "EmptyError";
var emptyStr = err8.toString();
if (emptyStr !== "EmptyError") throw new Error("toString with empty message should return name only");

// Test toString with empty name
var err9 = new Error("Only message");
err9.name = "";
var nameEmpty = err9.toString();
if (nameEmpty !== "Only message") throw new Error("toString with empty name should return message only");

// Test toString with both empty
var err10 = new Error();
err10.name = "";
err10.message = "";
var bothEmpty = err10.toString();
if (bothEmpty !== "") throw new Error("toString with both empty should return empty string");

// Test Error constructor with null/undefined
var errNull = new Error(null);
if (errNull.message !== "null") throw new Error("Error with null should convert to string");

var errUndef = new Error(undefined);
if (errUndef.message !== "") throw new Error("Error with undefined should result in empty message");

// Test Error constructor with non-string values
var errNum = new Error(42);
if (errNum.message !== "42") throw new Error("Error with number should convert to string");

var errBool = new Error(true);
if (errBool.message !== "true") throw new Error("Error with boolean should convert to string");

var errObj = new Error({toString: function() { return "object message"; }});
if (errObj.message !== "object message") throw new Error("Error with object should call toString");

// Test Error constructor with Symbol (if supported)
try {
    if (typeof Symbol !== "undefined") {
        var sym = Symbol("test");
        var errSym = new Error(sym);
        if (errSym.message !== "Symbol(test)") throw new Error("Error with Symbol should convert to string");
    }
} catch (e) {
    // Symbols might not be supported, ignore
}

// Test Error.prototype properties
if (!Error.prototype.hasOwnProperty("name")) throw new Error("Error.prototype should have name property");
if (!Error.prototype.hasOwnProperty("message")) throw new Error("Error.prototype should have message property");
if (!Error.prototype.hasOwnProperty("toString")) throw new Error("Error.prototype should have toString method");

// Test Error.prototype.constructor
if (Error.prototype.constructor !== Error) throw new Error("Error.prototype.constructor should be Error");

// Test Error inheritance
var err11 = new Error();
if (!(err11 instanceof Error)) throw new Error("Error should be instance of Error");
if (!(err11 instanceof Object)) throw new Error("Error should be instance of Object");

// Test Error properties are enumerable/configurable
var err12 = new Error("test");
var nameDesc = Object.getOwnPropertyDescriptor(err12, "name");
var messageDesc = Object.getOwnPropertyDescriptor(err12, "message");

if (nameDesc && !nameDesc.writable) throw new Error("Error name should be writable");
if (messageDesc && !messageDesc.writable) throw new Error("Error message should be writable");

// Test Error constructor length
if (Error.length !== 1) throw new Error("Error constructor should have length 1");

// Test creating Error with very long message
var longMessage = "";
for (var i = 0; i < 1000; i++) {
    longMessage += "A";
}
var errLong = new Error(longMessage);
if (errLong.message !== longMessage) throw new Error("Error should handle long messages");

// Test Error with special characters
var specialMsg = "Error with\nnewline\ttab\rand\0null";
var errSpecial = new Error(specialMsg);
if (errSpecial.message !== specialMsg) throw new Error("Error should preserve special characters");

// Test Error message coercion edge cases
var errEmpty = new Error("");
if (errEmpty.message !== "") throw new Error("Error should preserve empty string message");

var errZero = new Error(0);
if (errZero.message !== "0") throw new Error("Error should convert 0 to '0'");

var errNaN = new Error(NaN);
if (errNaN.message !== "NaN") throw new Error("Error should convert NaN to 'NaN'");

var errInfinity = new Error(Infinity);
if (errInfinity.message !== "Infinity") throw new Error("Error should convert Infinity to 'Infinity'");

// Test Error prototype modification
var originalToString = Error.prototype.toString;
Error.prototype.toString = function() {
    return "Modified: " + this.name + ": " + this.message;
};

var errModified = new Error("test");
if (errModified.toString().indexOf("Modified:") === -1) throw new Error("Modified toString should work");

// Restore original toString
Error.prototype.toString = originalToString;

// Test Error with circular reference in toString
var errCircular = new Error();
errCircular.name = errCircular;
try {
    var circularStr = errCircular.toString();
    // Should not throw, behavior may vary
} catch (e) {
    // Circular reference might throw, that's acceptable
}

// Test Error property assignment edge cases
var errProps = new Error();
errProps.name = null;
if (errProps.name !== null) throw new Error("Error name should accept null");

errProps.message = null;
if (errProps.message !== null) throw new Error("Error message should accept null");

// Test Error with non-enumerable properties
var errNonEnum = new Error("test");
Object.defineProperty(errNonEnum, "customProp", {
    value: "custom",
    enumerable: false
});

var keys = Object.keys(errNonEnum);
if (keys.indexOf("customProp") !== -1) throw new Error("Non-enumerable property should not appear in keys");

// Test Error prototype chain
var errProto = new Error();
if (Object.getPrototypeOf(errProto) !== Error.prototype) throw new Error("Error prototype chain incorrect");
if (Object.getPrototypeOf(Error.prototype) !== Object.prototype) throw new Error("Error.prototype chain incorrect");

// Test Error valueOf method (inherited from Object)
var errValue = new Error("test");
if (errValue.valueOf() !== errValue) throw new Error("Error valueOf should return self");

// Test Error with getter/setter message
var errGetter = new Error();
var getterValue = "getter message";
Object.defineProperty(errGetter, "message", {
    get: function() { return getterValue; },
    set: function(val) { getterValue = val; }
});

if (errGetter.message !== "getter message") throw new Error("Error getter message should work");
errGetter.message = "new getter";
if (errGetter.message !== "new getter") throw new Error("Error setter message should work");

// Test Error subclassing (basic)
function CustomError(message) {
    Error.call(this, message);
    this.name = "CustomError";
    this.message = message || "";
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

var customErr = new CustomError("custom message");
if (!(customErr instanceof CustomError)) throw new Error("Custom error should be instance of CustomError");
if (!(customErr instanceof Error)) throw new Error("Custom error should be instance of Error");
if (customErr.name !== "CustomError") throw new Error("Custom error should have correct name");
if (customErr.message !== "custom message") throw new Error("Custom error should have correct message");

// Test Error descriptors on prototype
var protoNameDesc = Object.getOwnPropertyDescriptor(Error.prototype, "name");
var protoMessageDesc = Object.getOwnPropertyDescriptor(Error.prototype, "message");
var protoToStringDesc = Object.getOwnPropertyDescriptor(Error.prototype, "toString");

if (!protoToStringDesc || typeof protoToStringDesc.value !== "function") {
    throw new Error("Error.prototype.toString should be a function");
}

// Test Error constructor called as function vs constructor
var funcErr = Error("function call");
var consErr = new Error("constructor call");

if (typeof funcErr !== "object" || funcErr === null) throw new Error("Error() should return object");
if (typeof consErr !== "object" || consErr === null) throw new Error("new Error() should return object");
if (funcErr.constructor !== Error) throw new Error("Function call Error should have Error constructor");
if (consErr.constructor !== Error) throw new Error("Constructor call Error should have Error constructor");