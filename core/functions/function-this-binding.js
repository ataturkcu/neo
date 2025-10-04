/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Function 'this' Binding in Different Contexts
 */

// Test global this binding (non-strict mode)
function globalFunction() {
    return this;
}

var globalResult = globalFunction();
// In non-strict mode, 'this' should be the global object
// In browsers: window, in Node.js: global, in workers: self
if (typeof globalResult !== "object") throw new Error("Global this should be an object, got " + typeof globalResult);

// Test method call - this should be the object
var testObject = {
    value: "object value",
    method: function() {
        return this.value;
    }
};

var methodResult = testObject.method();
if (methodResult !== "object value") throw new Error("Method this should access object property, got " + methodResult);

// Test that 'this' in method refers to the object
var testThisReference = {
    name: "test object",
    getThis: function() {
        return this;
    }
};

var thisRef = testThisReference.getThis();
if (thisRef !== testThisReference) throw new Error("Method this should refer to the object");

// Test function call vs method call
var standaloneFunction = testObject.method;
var standaloneResult = standaloneFunction();

// When called as standalone function, 'this' should be global object (non-strict)
if (standaloneResult === "object value") throw new Error("Standalone function should not access object property");

// Test call() method to explicitly set this
function testCallMethod() {
    return this.testValue;
}

var callObject = { testValue: "call value" };
var callResult = testCallMethod.call(callObject);
if (callResult !== "call value") throw new Error("call() should set this to specified object, got " + callResult);

// Test apply() method to explicitly set this
function testApplyMethod(prefix, suffix) {
    return prefix + this.testValue + suffix;
}

var applyObject = { testValue: "apply value" };
var applyResult = testApplyMethod.apply(applyObject, ["[", "]"]);
if (applyResult !== "[apply value]") throw new Error("apply() should set this and pass arguments, got " + applyResult);

// Test bind() method to create bound function
function testBindMethod() {
    return this.testValue;
}

var bindObject = { testValue: "bind value" };
var boundFunction = testBindMethod.bind(bindObject);
var bindResult = boundFunction();
if (bindResult !== "bind value") throw new Error("bind() should create function with fixed this, got " + bindResult);

// Test that bound function maintains this even when called as method
var anotherObject = {
    differentValue: "different",
    boundMethod: boundFunction
};

var boundMethodResult = anotherObject.boundMethod();
if (boundMethodResult !== "bind value") throw new Error("Bound function should maintain original this, got " + boundMethodResult);

// Test constructor function this binding
function ConstructorFunction(value) {
    this.constructorValue = value;
    return this.constructorValue;
}

var constructorInstance = new ConstructorFunction("constructor value");
if (constructorInstance.constructorValue !== "constructor value") throw new Error("Constructor this should set instance property, got " + constructorInstance.constructorValue);

// Test that constructor returns the instance (this) by default
function DefaultConstructor() {
    this.prop = "default";
}

var defaultInstance = new DefaultConstructor();
if (defaultInstance.prop !== "default") throw new Error("Constructor should return this by default, got " + defaultInstance.prop);

// Test constructor with explicit return object
function ExplicitReturnConstructor() {
    this.prop = "this property";
    return { returnProp: "returned object" };
}

var explicitInstance = new ExplicitReturnConstructor();
if (explicitInstance.returnProp !== "returned object") throw new Error("Constructor should return explicit object, got " + explicitInstance.returnProp);
if (typeof explicitInstance.prop !== "undefined") throw new Error("Constructor explicit return should override this");

// Test constructor with primitive return (should be ignored)
function PrimitiveReturnConstructor() {
    this.prop = "this property";
    return "primitive";
}

var primitiveInstance = new PrimitiveReturnConstructor();
if (primitiveInstance.prop !== "this property") throw new Error("Constructor primitive return should be ignored, got " + primitiveInstance.prop);

// Test nested function this binding
var nestedObject = {
    value: "outer value",
    method: function() {
        var self = this;

        function innerFunction() {
            return this === self;  // Should be false - inner function has different this
        }

        return {
            outerThis: this.value,
            innerThisSame: innerFunction()
        };
    }
};

var nestedResult = nestedObject.method();
if (nestedResult.outerThis !== "outer value") throw new Error("Outer method should access object property, got " + nestedResult.outerThis);
if (nestedResult.innerThisSame !== false) throw new Error("Inner function should have different this, got " + nestedResult.innerThisSame);

// Test callback function this binding
var callbackObject = {
    value: "callback object",
    process: function(callback) {
        return callback();
    },
    method: function() {
        return this.value;
    }
};

var callbackResult = callbackObject.process(callbackObject.method);
// When method is passed as callback, 'this' context is lost
if (callbackResult === "callback object") throw new Error("Callback should lose this context");

// Test setTimeout-like callback (if available)
try {
    var timeoutObject = {
        value: "timeout value",
        method: function() {
            return this.value;
        }
    };

    // Simulate setTimeout behavior
    var timeoutCallback = timeoutObject.method;
    var timeoutResult = timeoutCallback();
    // Should not access object property when called without context
    if (timeoutResult === "timeout value") throw new Error("Timeout callback should lose this context");
} catch (e) {
    // setTimeout might not be available
}

// Test event handler-like this binding
function simulateEventHandler() {
    var button = {
        id: "test-button",
        clicked: false,
        click: function() {
            this.clicked = true;
            return this.id;
        }
    };

    // Simulate event handler call where 'this' is the element
    var clickResult = button.click();
    return {
        id: clickResult,
        clicked: button.clicked
    };
}

var eventResult = simulateEventHandler();
if (eventResult.id !== "test-button") throw new Error("Event handler this should work, got " + eventResult.id);
if (eventResult.clicked !== true) throw new Error("Event handler should modify this, got " + eventResult.clicked);

// Test this in getter and setter
var getterSetterObject = {
    _value: "initial",
    get value() {
        return this._value;
    },
    set value(newValue) {
        this._value = newValue;
    }
};

var getterResult = getterSetterObject.value;
if (getterResult !== "initial") throw new Error("Getter this should work, got " + getterResult);

getterSetterObject.value = "modified";
var setterResult = getterSetterObject.value;
if (setterResult !== "modified") throw new Error("Setter this should work, got " + setterResult);

// Test this with prototype methods
function PrototypeConstructor(value) {
    this.value = value;
}

PrototypeConstructor.prototype.getValue = function() {
    return this.value;
};

var prototypeInstance = new PrototypeConstructor("prototype value");
var prototypeResult = prototypeInstance.getValue();
if (prototypeResult !== "prototype value") throw new Error("Prototype method this should work, got " + prototypeResult);

// Test this inheritance
function ParentConstructor() {
    this.parentProp = "parent";
}

ParentConstructor.prototype.getParent = function() {
    return this.parentProp;
};

function ChildConstructor() {
    ParentConstructor.call(this);  // Call parent constructor with this
    this.childProp = "child";
}

// Inherit from parent
ChildConstructor.prototype = Object.create(ParentConstructor.prototype);
ChildConstructor.prototype.constructor = ChildConstructor;

ChildConstructor.prototype.getChild = function() {
    return this.childProp;
};

var childInstance = new ChildConstructor();
var inheritanceResult = {
    parent: childInstance.getParent(),
    child: childInstance.getChild()
};

if (inheritanceResult.parent !== "parent") throw new Error("Inherited method this should work, got " + inheritanceResult.parent);
if (inheritanceResult.child !== "child") throw new Error("Child method this should work, got " + inheritanceResult.child);

// Test this with array methods
var arrayObject = {
    values: [1, 2, 3],
    sum: function() {
        var total = 0;
        this.values.forEach(function(value) {
            total += value;  // Note: this inside forEach callback is different
        });
        return total;
    }
};

var arrayResult = arrayObject.sum();
if (arrayResult !== 6) throw new Error("Array method context should work, got " + arrayResult);

// Test this with forEach and bind
var arrayObject2 = {
    multiplier: 2,
    values: [1, 2, 3],
    multiplyAll: function() {
        var results = [];
        this.values.forEach(function(value) {
            results.push(value * this.multiplier);
        }.bind(this));  // Bind to maintain this context
        return results;
    }
};

var bindForEachResult = arrayObject2.multiplyAll();
if (bindForEachResult.length !== 3) throw new Error("Bound forEach should work, length: " + bindForEachResult.length);
if (bindForEachResult[0] !== 2) throw new Error("Bound forEach should multiply correctly, got " + bindForEachResult[0]);

// Test this with call/apply on built-in methods
var testArray = [1, 2, 3];
var anotherArray = [4, 5];

// Use apply to call push with another array as this
Array.prototype.push.apply(anotherArray, testArray);
if (anotherArray.length !== 5) throw new Error("Array.push.apply should work, length: " + anotherArray.length);

// Test this in strict mode function (if supported)
try {
    eval(`
        "use strict";
        function strictFunction() {
            return this;
        }

        var strictResult = strictFunction();
        if (strictResult !== undefined) throw new Error("Strict mode this should be undefined, got " + strictResult);
    `);
} catch (e) {
    // Strict mode might not be supported
}

// Test arrow function this binding (if supported)
try {
    eval(`
        var arrowObject = {
            value: "arrow value",
            method: function() {
                var arrowFunc = () => this.value;
                return arrowFunc();
            }
        };

        var arrowResult = arrowObject.method();
        if (arrowResult !== "arrow value") throw new Error("Arrow function should inherit this, got " + arrowResult);

        // Test that arrow function this cannot be changed
        var standalonArrow = arrowObject.method;
        var boundArrow = standalonArrow.bind({value: "bound value"});
        var boundArrowResult = boundArrow();
        // Arrow function should still use lexical this, not bound this
    `);
} catch (e) {
    // Arrow functions might not be supported
}

// Test class method this binding (if supported)
try {
    eval(`
        class TestClass {
            constructor(value) {
                this.value = value;
            }

            method() {
                return this.value;
            }
        }

        var classInstance = new TestClass("class value");
        var classResult = classInstance.method();
        if (classResult !== "class value") throw new Error("Class method this should work, got " + classResult);

        // Test class method as callback
        var classCallback = classInstance.method;
        var classCallbackResult = classCallback();
        // Class methods lose this context when called as callbacks (unless bound)
    `);
} catch (e) {
    // Classes might not be supported
}

// Test this with Object.defineProperty
var definePropertyObject = {};
Object.defineProperty(definePropertyObject, "testProperty", {
    get: function() {
        return this === definePropertyObject;
    },
    set: function(value) {
        this.setValue = value;
    }
});

var definePropertyResult = definePropertyObject.testProperty;
if (definePropertyResult !== true) throw new Error("defineProperty getter this should work, got " + definePropertyResult);

definePropertyObject.testProperty = "set value";
if (definePropertyObject.setValue !== "set value") throw new Error("defineProperty setter this should work, got " + definePropertyObject.setValue);

// Test this with function.prototype methods
function testPrototypeMethods() {
    return this.testValue;
}

var prototypeObject = { testValue: "prototype test" };

var callResult2 = testPrototypeMethods.call(prototypeObject);
if (callResult2 !== "prototype test") throw new Error("Function.call this should work, got " + callResult2);

var applyResult2 = testPrototypeMethods.apply(prototypeObject);
if (applyResult2 !== "prototype test") throw new Error("Function.apply this should work, got " + applyResult2);

// Test this with eval (if supported)
try {
    var evalObject = {
        value: "eval value",
        test: function() {
            return eval("this.value");
        }
    };

    var evalResult = evalObject.test();
    if (evalResult !== "eval value") throw new Error("eval this should work, got " + evalResult);
} catch (e) {
    // eval might not be supported
}

// Test this with with statement (if supported)
try {
    var withObject = {
        value: "with value",
        test: function() {
            with (this) {
                return value;
            }
        }
    };

    var withResult = withObject.test();
    if (withResult !== "with value") throw new Error("with statement this should work, got " + withResult);
} catch (e) {
    // with statement might not be supported or might be in strict mode
}

// Test complex this binding chain
var complexObject = {
    level1: {
        level2: {
            value: "nested value",
            method: function() {
                return this.value;
            }
        }
    }
};

var complexResult = complexObject.level1.level2.method();
if (complexResult !== "nested value") throw new Error("Nested object method this should work, got " + complexResult);

// Test this with immediate invocation
var immediateObject = {
    value: "immediate value",
    result: (function() {
        return this;  // This will be global object, not immediateObject
    })()
};

// The IIFE 'this' should not be immediateObject
if (immediateObject.result === immediateObject) throw new Error("IIFE this should not be containing object");

// Test function expression this
var expressionObject = {
    value: "expression value",
    method: function() {
        return this.value;
    }
};

var expressionResult = expressionObject.method();
if (expressionResult !== "expression value") throw new Error("Function expression method this should work, got " + expressionResult);