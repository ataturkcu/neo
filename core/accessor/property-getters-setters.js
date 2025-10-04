/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Object.defineProperty with Getters/Setters
 * Comprehensive testing of accessor descriptors, property enumeration,
 * inheritance of accessors, and Object.defineProperty functionality
 */

// Test 1-10: Basic Object.defineProperty with Get/Set
(function() {
    var obj = {};

    // Test basic getter definition
    Object.defineProperty(obj, "basicGetter", {
        get: function() {
            return "getter result";
        },
        enumerable: true,
        configurable: true
    });

    if (obj.basicGetter !== "getter result") throw new Error("Basic getter failed");

    // Test basic setter definition
    var storedValue = null;
    Object.defineProperty(obj, "basicSetter", {
        set: function(value) {
            storedValue = value;
        },
        enumerable: true,
        configurable: true
    });

    obj.basicSetter = "test value";
    if (storedValue !== "test value") throw new Error("Basic setter failed");

    // Test getter and setter together
    var internalValue = "initial";
    Object.defineProperty(obj, "getterSetter", {
        get: function() {
            return internalValue;
        },
        set: function(value) {
            internalValue = value.toUpperCase();
        },
        enumerable: true,
        configurable: true
    });

    if (obj.getterSetter !== "initial") throw new Error("Combined getter failed");
    obj.getterSetter = "hello";
    if (obj.getterSetter !== "HELLO") throw new Error("Combined setter failed");

    // Test getter with computed values
    var computedCounter = 0;
    Object.defineProperty(obj, "computedGetter", {
        get: function() {
            return "computed_" + (++computedCounter);
        },
        enumerable: true,
        configurable: true
    });

    var computed1 = obj.computedGetter;
    var computed2 = obj.computedGetter;
    if (computed1 === computed2) throw new Error("Computed getter should return different values");

    // Test setter with validation
    var validatedValue = 0;
    Object.defineProperty(obj, "validatedSetter", {
        get: function() {
            return validatedValue;
        },
        set: function(value) {
            if (typeof value !== "number" || value < 0) {
                throw new Error("Value must be a positive number");
            }
            validatedValue = value;
        },
        enumerable: true,
        configurable: true
    });

    obj.validatedSetter = 42;
    if (obj.validatedSetter !== 42) throw new Error("Validated setter failed");

    try {
        obj.validatedSetter = -1;
        var errorThrown = false;
    } catch (e) {
        var errorThrown = true;
    }
    if (!errorThrown) throw new Error("Setter validation should throw error");

    // Test getter accessing this context
    obj.contextData = "context value";
    Object.defineProperty(obj, "contextGetter", {
        get: function() {
            return "Accessed: " + this.contextData;
        },
        enumerable: true,
        configurable: true
    });

    if (obj.contextGetter !== "Accessed: context value") throw new Error("Context getter failed");
})();

// Test 11-20: Accessor Descriptors and Property Attributes
(function() {
    var obj = {};

    // Test enumerable: false
    Object.defineProperty(obj, "nonEnumerable", {
        get: function() { return "hidden"; },
        enumerable: false,
        configurable: true
    });

    if (obj.nonEnumerable !== "hidden") throw new Error("Non-enumerable getter access failed");
    if (Object.keys(obj).includes("nonEnumerable")) throw new Error("Non-enumerable property should not appear in keys");

    // Test configurable: false
    Object.defineProperty(obj, "nonConfigurable", {
        get: function() { return "locked"; },
        enumerable: true,
        configurable: false
    });

    if (obj.nonConfigurable !== "locked") throw new Error("Non-configurable getter access failed");

    try {
        Object.defineProperty(obj, "nonConfigurable", {
            get: function() { return "changed"; }
        });
        var configError = false;
    } catch (e) {
        var configError = true;
    }
    if (!configError) throw new Error("Non-configurable property should not be redefinable");

    // Test writable attribute (should be undefined for accessors)
    var descriptor = Object.getOwnPropertyDescriptor(obj, "nonEnumerable");
    if (descriptor.writable !== undefined) throw new Error("Accessor should not have writable attribute");
    if (typeof descriptor.get !== "function") throw new Error("Accessor should have get function");

    // Test property descriptor retrieval
    var fullDescriptor = Object.getOwnPropertyDescriptor(obj, "nonConfigurable");
    if (fullDescriptor.enumerable !== true) throw new Error("Descriptor enumerable retrieval failed");
    if (fullDescriptor.configurable !== false) throw new Error("Descriptor configurable retrieval failed");
    if (typeof fullDescriptor.get !== "function") throw new Error("Descriptor get retrieval failed");

    // Test hasOwnProperty with accessors
    if (!obj.hasOwnProperty("nonEnumerable")) throw new Error("hasOwnProperty with accessor failed");
    if (!obj.hasOwnProperty("nonConfigurable")) throw new Error("hasOwnProperty with accessor failed");

    // Test Object.getOwnPropertyNames with accessors
    var propNames = Object.getOwnPropertyNames(obj);
    if (!propNames.includes("nonEnumerable")) throw new Error("getOwnPropertyNames should include non-enumerable");
    if (!propNames.includes("nonConfigurable")) throw new Error("getOwnPropertyNames should include non-configurable");

    // Test for...in enumeration
    obj.enumerable = "visible";
    Object.defineProperty(obj, "enumerableAccessor", {
        get: function() { return "enumerable"; },
        enumerable: true,
        configurable: true
    });

    var enumeratedProps = [];
    for (var prop in obj) {
        enumeratedProps.push(prop);
    }

    if (!enumeratedProps.includes("enumerableAccessor")) throw new Error("Enumerable accessor not in for...in");
    if (enumeratedProps.includes("nonEnumerable")) throw new Error("Non-enumerable accessor should not be in for...in");

    // Test Object.propertyIsEnumerable
    if (!obj.propertyIsEnumerable("enumerableAccessor")) throw new Error("propertyIsEnumerable failed for accessor");
    if (obj.propertyIsEnumerable("nonEnumerable")) throw new Error("propertyIsEnumerable should return false for non-enumerable");
})();

// Test 21-30: Multiple Property Definitions
(function() {
    var obj = {};

    // Test Object.defineProperties with multiple accessors
    Object.defineProperties(obj, {
        firstName: {
            get: function() { return this._firstName || ""; },
            set: function(value) { this._firstName = value; },
            enumerable: true,
            configurable: true
        },
        lastName: {
            get: function() { return this._lastName || ""; },
            set: function(value) { this._lastName = value; },
            enumerable: true,
            configurable: true
        },
        fullName: {
            get: function() {
                return (this._firstName || "") + " " + (this._lastName || "");
            },
            set: function(value) {
                var parts = value.split(" ");
                this._firstName = parts[0] || "";
                this._lastName = parts[1] || "";
            },
            enumerable: true,
            configurable: true
        },
        initials: {
            get: function() {
                var first = this._firstName ? this._firstName[0] : "";
                var last = this._lastName ? this._lastName[0] : "";
                return first + last;
            },
            enumerable: false,
            configurable: true
        }
    });

    obj.firstName = "John";
    obj.lastName = "Doe";

    if (obj.firstName !== "John") throw new Error("Multiple property definition - firstName failed");
    if (obj.lastName !== "Doe") throw new Error("Multiple property definition - lastName failed");
    if (obj.fullName !== "John Doe") throw new Error("Multiple property definition - computed fullName failed");
    if (obj.initials !== "JD") throw new Error("Multiple property definition - initials failed");

    obj.fullName = "Jane Smith";
    if (obj.firstName !== "Jane") throw new Error("Multiple property definition - fullName setter firstName failed");
    if (obj.lastName !== "Smith") throw new Error("Multiple property definition - fullName setter lastName failed");
    if (obj.initials !== "JS") throw new Error("Multiple property definition - updated initials failed");

    // Test property enumeration after multiple definitions
    var keys = Object.keys(obj);
    if (!keys.includes("firstName")) throw new Error("firstName should be enumerable");
    if (!keys.includes("lastName")) throw new Error("lastName should be enumerable");
    if (!keys.includes("fullName")) throw new Error("fullName should be enumerable");
    if (keys.includes("initials")) throw new Error("initials should not be enumerable");

    // Test mixed data and accessor properties
    obj.regularProperty = "regular";
    Object.defineProperty(obj, "mixedAccessor", {
        get: function() { return "accessed: " + this.regularProperty; },
        enumerable: true,
        configurable: true
    });

    if (obj.mixedAccessor !== "accessed: regular") throw new Error("Mixed property types failed");

    obj.regularProperty = "changed";
    if (obj.mixedAccessor !== "accessed: changed") throw new Error("Mixed property dependency failed");
})();

// Test 31-40: Inheritance of Accessors
(function() {
    // Test prototype chain with accessors
    var parent = {};
    Object.defineProperty(parent, "inheritedGetter", {
        get: function() { return "parent value"; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(parent, "inheritedSetGet", {
        get: function() { return this._inherited || "default"; },
        set: function(value) { this._inherited = "parent: " + value; },
        enumerable: true,
        configurable: true
    });

    var child = Object.create(parent);

    if (child.inheritedGetter !== "parent value") throw new Error("Inherited getter failed");

    child.inheritedSetGet = "test";
    if (child.inheritedSetGet !== "parent: test") throw new Error("Inherited setter failed");
    if (child._inherited !== "parent: test") throw new Error("Inherited setter property failed");

    // Test overriding inherited accessors
    Object.defineProperty(child, "inheritedGetter", {
        get: function() { return "child override"; },
        enumerable: true,
        configurable: true
    });

    if (child.inheritedGetter !== "child override") throw new Error("Accessor override failed");
    if (parent.inheritedGetter !== "parent value") throw new Error("Parent accessor should not be affected");

    // Test accessing parent accessor via prototype
    var parentValue = Object.getPrototypeOf(child).inheritedGetter;
    if (parentValue !== "parent value") throw new Error("Direct prototype accessor access failed");

    // Test hasOwnProperty vs inherited properties
    if (child.hasOwnProperty("inheritedSetGet")) throw new Error("Inherited accessor should not be own property");
    if (!child.hasOwnProperty("inheritedGetter")) throw new Error("Overridden accessor should be own property");

    // Test property enumeration with inheritance
    parent.parentEnum = "parent";
    child.childEnum = "child";

    Object.defineProperty(parent, "parentAccessor", {
        get: function() { return "parent accessor"; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(child, "childAccessor", {
        get: function() { return "child accessor"; },
        enumerable: true,
        configurable: true
    });

    var childKeys = Object.keys(child);
    if (!childKeys.includes("childEnum")) throw new Error("Child enum property missing");
    if (!childKeys.includes("childAccessor")) throw new Error("Child accessor property missing");
    if (childKeys.includes("parentEnum")) throw new Error("Parent enum property should not be in child keys");

    var allKeys = [];
    for (var key in child) {
        allKeys.push(key);
    }
    if (!allKeys.includes("parentEnum")) throw new Error("Parent enum property should be in for...in");
    if (!allKeys.includes("parentAccessor")) throw new Error("Parent accessor should be in for...in");

    // Test constructor inheritance with accessors
    function ParentConstructor() {
        this.constructorProp = "parent constructor";
    }

    Object.defineProperty(ParentConstructor.prototype, "prototypeAccessor", {
        get: function() { return "prototype: " + this.constructorProp; },
        set: function(value) { this.constructorProp = value; },
        enumerable: true,
        configurable: true
    });

    function ChildConstructor() {
        ParentConstructor.call(this);
        this.childProp = "child";
    }

    ChildConstructor.prototype = Object.create(ParentConstructor.prototype);
    ChildConstructor.prototype.constructor = ChildConstructor;

    var instance = new ChildConstructor();
    if (instance.prototypeAccessor !== "prototype: parent constructor") throw new Error("Constructor prototype accessor failed");

    instance.prototypeAccessor = "changed";
    if (instance.constructorProp !== "changed") throw new Error("Constructor prototype accessor setter failed");
})();

// Test 41-50: Complex Accessor Patterns
(function() {
    // Test chained accessors
    var obj = {
        _data: { level1: { level2: { value: "deep" } } }
    };

    Object.defineProperty(obj, "deepValue", {
        get: function() {
            return this._data && this._data.level1 && this._data.level1.level2
                ? this._data.level1.level2.value
                : undefined;
        },
        set: function(value) {
            if (!this._data) this._data = {};
            if (!this._data.level1) this._data.level1 = {};
            if (!this._data.level1.level2) this._data.level1.level2 = {};
            this._data.level1.level2.value = value;
        },
        enumerable: true,
        configurable: true
    });

    if (obj.deepValue !== "deep") throw new Error("Deep accessor get failed");

    obj.deepValue = "modified";
    if (obj._data.level1.level2.value !== "modified") throw new Error("Deep accessor set failed");

    // Test accessor with side effects
    var accessCount = 0;
    var sideEffectLog = [];

    Object.defineProperty(obj, "sideEffectProperty", {
        get: function() {
            accessCount++;
            sideEffectLog.push("GET: " + accessCount);
            return "accessed " + accessCount + " times";
        },
        set: function(value) {
            sideEffectLog.push("SET: " + value);
            this._setterValue = value;
        },
        enumerable: true,
        configurable: true
    });

    var value1 = obj.sideEffectProperty;
    var value2 = obj.sideEffectProperty;
    obj.sideEffectProperty = "test";

    if (accessCount !== 2) throw new Error("Side effect counter failed");
    if (sideEffectLog.length !== 3) throw new Error("Side effect log failed");
    if (sideEffectLog[2] !== "SET: test") throw new Error("Side effect set log failed");

    // Test accessor with caching
    var cachedComputeCount = 0;
    var cachedValue = null;
    var cacheValid = false;

    Object.defineProperty(obj, "cachedProperty", {
        get: function() {
            if (!cacheValid) {
                cachedComputeCount++;
                cachedValue = "computed " + cachedComputeCount;
                cacheValid = true;
            }
            return cachedValue;
        },
        set: function(value) {
            cachedValue = value;
            cacheValid = true;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(obj, "invalidateCache", {
        set: function(value) {
            cacheValid = false;
        },
        enumerable: false,
        configurable: true
    });

    var cached1 = obj.cachedProperty;
    var cached2 = obj.cachedProperty;
    if (cachedComputeCount !== 1) throw new Error("Cache should prevent recomputation");
    if (cached1 !== cached2) throw new Error("Cached values should be identical");

    obj.invalidateCache = true;
    var cached3 = obj.cachedProperty;
    if (cachedComputeCount !== 2) throw new Error("Cache invalidation failed");

    // Test accessor with type conversion
    Object.defineProperty(obj, "numberProperty", {
        get: function() { return this._numberValue || 0; },
        set: function(value) {
            var num = Number(value);
            if (isNaN(num)) {
                throw new Error("Value must be convertible to number");
            }
            this._numberValue = num;
        },
        enumerable: true,
        configurable: true
    });

    obj.numberProperty = "42";
    if (obj.numberProperty !== 42) throw new Error("Type conversion in setter failed");

    obj.numberProperty = "3.14";
    if (obj.numberProperty !== 3.14) throw new Error("Float conversion in setter failed");

    try {
        obj.numberProperty = "not a number";
        var conversionError = false;
    } catch (e) {
        var conversionError = true;
    }
    if (!conversionError) throw new Error("Invalid conversion should throw error");
})();

// Test 51-60: Getter/Setter Error Handling
(function() {
    var obj = {};

    // Test getter throwing error
    Object.defineProperty(obj, "errorGetter", {
        get: function() {
            throw new Error("Getter error");
        },
        enumerable: true,
        configurable: true
    });

    try {
        var value = obj.errorGetter;
        var getterError = false;
    } catch (e) {
        var getterError = true;
        if (e.message !== "Getter error") throw new Error("Wrong getter error message");
    }
    if (!getterError) throw new Error("Getter error should be thrown");

    // Test setter throwing error
    Object.defineProperty(obj, "errorSetter", {
        set: function(value) {
            throw new Error("Setter error: " + value);
        },
        enumerable: true,
        configurable: true
    });

    try {
        obj.errorSetter = "test";
        var setterError = false;
    } catch (e) {
        var setterError = true;
        if (!e.message.includes("Setter error: test")) throw new Error("Wrong setter error message");
    }
    if (!setterError) throw new Error("Setter error should be thrown");

    // Test error recovery in accessor
    var errorCount = 0;
    Object.defineProperty(obj, "recoveryProperty", {
        get: function() {
            errorCount++;
            if (errorCount < 3) {
                throw new Error("Temporary error");
            }
            return "success after " + errorCount + " attempts";
        },
        enumerable: true,
        configurable: true
    });

    var attempts = 0;
    var result = null;
    while (attempts < 5 && result === null) {
        try {
            result = obj.recoveryProperty;
        } catch (e) {
            attempts++;
        }
    }

    if (result !== "success after 3 attempts") throw new Error("Error recovery failed");

    // Test error in accessor affecting property definition
    try {
        Object.defineProperty(obj, "invalidAccessor", {
            get: "not a function",
            enumerable: true,
            configurable: true
        });
        var defError = false;
    } catch (e) {
        var defError = true;
    }
    if (!defError) throw new Error("Invalid getter type should throw error");

    // Test recursive accessor calls
    var recursionDepth = 0;
    Object.defineProperty(obj, "recursiveProperty", {
        get: function() {
            recursionDepth++;
            if (recursionDepth > 10) {
                recursionDepth = 0;
                throw new Error("Maximum recursion depth exceeded");
            }
            return this.recursiveProperty; // This would cause infinite recursion
        },
        enumerable: true,
        configurable: true
    });

    try {
        var recursiveValue = obj.recursiveProperty;
        var recursionError = false;
    } catch (e) {
        var recursionError = true;
    }
    if (!recursionError) throw new Error("Recursive accessor should throw error");

    // Test accessor with conditional errors
    var conditionMet = false;
    Object.defineProperty(obj, "conditionalError", {
        get: function() {
            if (!conditionMet) {
                throw new Error("Condition not met");
            }
            return "condition satisfied";
        },
        set: function(value) {
            conditionMet = (value === "enable");
        },
        enumerable: true,
        configurable: true
    });

    try {
        var condValue = obj.conditionalError;
        var condError1 = false;
    } catch (e) {
        var condError1 = true;
    }
    if (!condError1) throw new Error("Conditional error should be thrown initially");

    obj.conditionalError = "enable";
    if (obj.conditionalError !== "condition satisfied") throw new Error("Conditional error resolution failed");
})();

// Test 61-70: Performance and Memory Considerations
(function() {
    // Test accessor performance vs direct property
    var directObj = { value: 0 };
    var accessorObj = {};

    Object.defineProperty(accessorObj, "value", {
        get: function() { return this._value || 0; },
        set: function(value) { this._value = value; },
        enumerable: true,
        configurable: true
    });

    // Performance test (basic validation)
    var iterations = 1000;
    var directStart = Date.now();
    for (var i = 0; i < iterations; i++) {
        directObj.value = i;
        var temp = directObj.value;
    }
    var directTime = Date.now() - directStart;

    var accessorStart = Date.now();
    for (var i = 0; i < iterations; i++) {
        accessorObj.value = i;
        var temp = accessorObj.value;
    }
    var accessorTime = Date.now() - accessorStart;

    // Accessors should work (performance difference is expected)
    if (directObj.value !== iterations - 1) throw new Error("Direct property performance test failed");
    if (accessorObj.value !== iterations - 1) throw new Error("Accessor performance test failed");

    // Test memory usage with many accessors
    var manyAccessors = {};
    for (var i = 0; i < 100; i++) {
        (function(index) {
            Object.defineProperty(manyAccessors, "prop" + index, {
                get: function() { return "value" + index; },
                set: function(value) { this["_prop" + index] = value; },
                enumerable: true,
                configurable: true
            });
        })(i);
    }

    // Test that all accessors work
    if (manyAccessors.prop0 !== "value0") throw new Error("Multiple accessor 0 failed");
    if (manyAccessors.prop50 !== "value50") throw new Error("Multiple accessor 50 failed");
    if (manyAccessors.prop99 !== "value99") throw new Error("Multiple accessor 99 failed");

    manyAccessors.prop25 = "custom25";
    if (manyAccessors._prop25 !== "custom25") throw new Error("Multiple accessor setter failed");

    // Test accessor closure memory
    function createAccessorObject(initialValue) {
        var obj = {};
        var privateValue = initialValue;

        Object.defineProperty(obj, "value", {
            get: function() { return privateValue; },
            set: function(value) { privateValue = value; },
            enumerable: true,
            configurable: true
        });

        return obj;
    }

    var accessor1 = createAccessorObject("first");
    var accessor2 = createAccessorObject("second");

    if (accessor1.value !== "first") throw new Error("Closure accessor 1 failed");
    if (accessor2.value !== "second") throw new Error("Closure accessor 2 failed");

    accessor1.value = "modified1";
    accessor2.value = "modified2";

    if (accessor1.value !== "modified1") throw new Error("Closure accessor 1 modification failed");
    if (accessor2.value !== "modified2") throw new Error("Closure accessor 2 modification failed");
    if (accessor1.value === accessor2.value) throw new Error("Closure accessors should be independent");

    // Test weak reference simulation (cleanup verification)
    var weakRefTest = {};
    var cleanupCalled = false;

    Object.defineProperty(weakRefTest, "weakProperty", {
        get: function() {
            return "weak value";
        },
        set: function(value) {
            if (value === null) {
                cleanupCalled = true;
            }
        },
        enumerable: true,
        configurable: true
    });

    if (weakRefTest.weakProperty !== "weak value") throw new Error("Weak reference property failed");
    weakRefTest.weakProperty = null;
    if (!cleanupCalled) throw new Error("Cleanup simulation failed");
})();

// Test 71-80: Advanced Descriptor Manipulation
(function() {
    var obj = {};

    // Test descriptor modification
    Object.defineProperty(obj, "modifiableProperty", {
        get: function() { return "original"; },
        enumerable: true,
        configurable: true
    });

    if (obj.modifiableProperty !== "original") throw new Error("Original descriptor failed");

    // Modify descriptor
    Object.defineProperty(obj, "modifiableProperty", {
        get: function() { return "modified"; }
    });

    if (obj.modifiableProperty !== "modified") throw new Error("Descriptor modification failed");

    // Test partial descriptor updates
    Object.defineProperty(obj, "partialUpdate", {
        get: function() { return this._partial || "default"; },
        set: function(value) { this._partial = value; },
        enumerable: false,
        configurable: true
    });

    obj.partialUpdate = "test";
    if (obj.partialUpdate !== "test") throw new Error("Partial update setup failed");

    // Update only enumerable
    Object.defineProperty(obj, "partialUpdate", {
        enumerable: true
    });

    var descriptor = Object.getOwnPropertyDescriptor(obj, "partialUpdate");
    if (!descriptor.enumerable) throw new Error("Partial enumerable update failed");
    if (typeof descriptor.get !== "function") throw new Error("Partial update should preserve getter");

    // Test descriptor validation
    try {
        Object.defineProperty(obj, "invalidDescriptor", {
            get: function() { return "getter"; },
            value: "data",
            enumerable: true,
            configurable: true
        });
        var descriptorError = false;
    } catch (e) {
        var descriptorError = true;
    }
    if (!descriptorError) throw new Error("Invalid descriptor should throw error");

    // Test descriptor inheritance prevention
    var parent = {};
    Object.defineProperty(parent, "parentAccessor", {
        get: function() { return "parent"; },
        enumerable: true,
        configurable: true
    });

    var child = Object.create(parent);
    Object.defineProperty(child, "parentAccessor", {
        get: function() { return "child override"; },
        enumerable: true,
        configurable: true
    });

    if (child.parentAccessor !== "child override") throw new Error("Descriptor override failed");
    if (parent.parentAccessor !== "parent") throw new Error("Parent descriptor should be unchanged");

    // Test descriptor with Symbol properties
    var symbolKey = Symbol("symbolAccessor");
    Object.defineProperty(obj, symbolKey, {
        get: function() { return "symbol value"; },
        enumerable: true,
        configurable: true
    });

    if (obj[symbolKey] !== "symbol value") throw new Error("Symbol accessor failed");

    var symbolDescriptor = Object.getOwnPropertyDescriptor(obj, symbolKey);
    if (typeof symbolDescriptor.get !== "function") throw new Error("Symbol descriptor retrieval failed");

    // Test getOwnPropertySymbols with accessors
    var symbols = Object.getOwnPropertySymbols(obj);
    if (!symbols.includes(symbolKey)) throw new Error("Symbol accessor not in getOwnPropertySymbols");

    // Test non-configurable descriptor restrictions
    Object.defineProperty(obj, "lockedProperty", {
        get: function() { return "locked"; },
        enumerable: true,
        configurable: false
    });

    try {
        Object.defineProperty(obj, "lockedProperty", {
            enumerable: false
        });
        var lockError = false;
    } catch (e) {
        var lockError = true;
    }
    if (!lockError) throw new Error("Non-configurable property should not allow enumerable change");

    // Test delete with non-configurable accessor
    try {
        delete obj.lockedProperty;
        var deleteError = false;
    } catch (e) {
        var deleteError = true;
    }
    // Note: In non-strict mode, delete might not throw but should return false
    if (obj.hasOwnProperty("lockedProperty") === false) {
        throw new Error("Non-configurable property should not be deletable");
    }
})();

// Test 81-90: Cross-Browser Compatibility Patterns
(function() {
    // Test feature detection for accessor support
    function supportsAccessors() {
        try {
            var obj = {};
            Object.defineProperty(obj, "test", {
                get: function() { return true; }
            });
            return obj.test === true;
        } catch (e) {
            return false;
        }
    }

    if (!supportsAccessors()) throw new Error("Accessor support detection failed");

    // Test fallback for older environments (simulation)
    function defineAccessor(obj, prop, getter, setter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        } else {
            // Fallback for very old browsers
            if (getter) obj["get" + prop] = getter;
            if (setter) obj["set" + prop] = setter;
        }
    }

    var compatObj = {};
    defineAccessor(compatObj, "Value",
        function() { return this._value || "default"; },
        function(val) { this._value = val; }
    );

    if (Object.defineProperty) {
        compatObj.Value = "test";
        if (compatObj.Value !== "test") throw new Error("Modern accessor fallback failed");
    }

    // Test __defineGetter__ and __defineSetter__ compatibility
    var legacyObj = {};
    if (legacyObj.__defineGetter__) {
        legacyObj.__defineGetter__("legacyProp", function() {
            return "legacy getter";
        });
        legacyObj.__defineSetter__("legacyProp", function(value) {
            this._legacyValue = value;
        });

        if (legacyObj.legacyProp !== "legacy getter") throw new Error("Legacy getter failed");
        legacyObj.legacyProp = "test";
        if (legacyObj._legacyValue !== "test") throw new Error("Legacy setter failed");
    }

    // Test property existence checking across environments
    function hasAccessor(obj, prop) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        return descriptor && (descriptor.get || descriptor.set);
    }

    if (!hasAccessor(compatObj, "Value")) throw new Error("Accessor detection failed");

    // Test enumeration compatibility
    function enumerateAccessors(obj) {
        var accessors = [];
        for (var prop in obj) {
            if (hasAccessor(obj, prop)) {
                accessors.push(prop);
            }
        }
        return accessors;
    }

    var enumTestObj = {};
    Object.defineProperty(enumTestObj, "accessor1", {
        get: function() { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(enumTestObj, "accessor2", {
        get: function() { return 2; },
        enumerable: false,
        configurable: true
    });

    var accessors = enumerateAccessors(enumTestObj);
    if (!accessors.includes("accessor1")) throw new Error("Enumerable accessor detection failed");
    if (accessors.includes("accessor2")) throw new Error("Non-enumerable accessor should not be detected");

    // Test JSON serialization with accessors
    var jsonObj = {};
    Object.defineProperty(jsonObj, "computed", {
        get: function() { return this.base * 2; },
        enumerable: true,
        configurable: true
    });
    jsonObj.base = 5;

    var serialized = JSON.stringify(jsonObj);
    var parsed = JSON.parse(serialized);

    if (parsed.base !== 5) throw new Error("JSON serialization of base property failed");
    if (parsed.computed !== 10) throw new Error("JSON serialization should include computed value");

    // Test property copying with accessors
    function copyProperties(source, target) {
        Object.getOwnPropertyNames(source).forEach(function(prop) {
            var descriptor = Object.getOwnPropertyDescriptor(source, prop);
            Object.defineProperty(target, prop, descriptor);
        });
    }

    var sourceObj = {};
    Object.defineProperty(sourceObj, "accessorToCopy", {
        get: function() { return "copied value"; },
        set: function(value) { this._copied = value; },
        enumerable: true,
        configurable: true
    });

    var targetObj = {};
    copyProperties(sourceObj, targetObj);

    if (targetObj.accessorToCopy !== "copied value") throw new Error("Accessor copying failed");
    targetObj.accessorToCopy = "test";
    if (targetObj._copied !== "test") throw new Error("Copied accessor setter failed");
})();

// Test 91-100: Real-world Use Cases
(function() {
    // Test model/view binding pattern
    function createModel(initialData) {
        var model = {};
        var observers = [];
        var data = Object.assign({}, initialData);

        function notify(property, newValue, oldValue) {
            observers.forEach(function(observer) {
                if (typeof observer === "function") {
                    observer(property, newValue, oldValue);
                }
            });
        }

        Object.keys(data).forEach(function(key) {
            Object.defineProperty(model, key, {
                get: function() {
                    return data[key];
                },
                set: function(value) {
                    var oldValue = data[key];
                    data[key] = value;
                    notify(key, value, oldValue);
                },
                enumerable: true,
                configurable: true
            });
        });

        model.observe = function(observer) {
            observers.push(observer);
        };

        model.getData = function() {
            return Object.assign({}, data);
        };

        return model;
    }

    var notifications = [];
    var userModel = createModel({ name: "John", age: 30 });
    userModel.observe(function(prop, newVal, oldVal) {
        notifications.push({ property: prop, newValue: newVal, oldValue: oldVal });
    });

    if (userModel.name !== "John") throw new Error("Model initial value failed");
    if (userModel.age !== 30) throw new Error("Model initial age failed");

    userModel.name = "Jane";
    userModel.age = 25;

    if (notifications.length !== 2) throw new Error("Model notifications failed");
    if (notifications[0].property !== "name") throw new Error("Model notification property failed");
    if (notifications[0].newValue !== "Jane") throw new Error("Model notification new value failed");
    if (notifications[0].oldValue !== "John") throw new Error("Model notification old value failed");

    // Test lazy loading pattern
    function createLazyLoader(loaderFn) {
        var obj = {};
        var loaded = false;
        var value = null;

        Object.defineProperty(obj, "value", {
            get: function() {
                if (!loaded) {
                    value = loaderFn();
                    loaded = true;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "isLoaded", {
            get: function() { return loaded; },
            enumerable: false,
            configurable: true
        });

        return obj;
    }

    var loadCallCount = 0;
    var lazyLoader = createLazyLoader(function() {
        loadCallCount++;
        return "expensive computation result " + loadCallCount;
    });

    if (lazyLoader.isLoaded) throw new Error("Lazy loader should not be loaded initially");

    var result1 = lazyLoader.value;
    if (!lazyLoader.isLoaded) throw new Error("Lazy loader should be loaded after access");
    if (loadCallCount !== 1) throw new Error("Lazy loader function should be called once");

    var result2 = lazyLoader.value;
    if (loadCallCount !== 1) throw new Error("Lazy loader should not reload");
    if (result1 !== result2) throw new Error("Lazy loader should return same value");

    // Test validation and sanitization pattern
    function createValidatedObject(schema) {
        var obj = {};
        var data = {};

        Object.keys(schema).forEach(function(key) {
            var config = schema[key];

            Object.defineProperty(obj, key, {
                get: function() {
                    return data[key];
                },
                set: function(value) {
                    // Type validation
                    if (config.type && typeof value !== config.type) {
                        throw new Error(key + " must be of type " + config.type);
                    }

                    // Range validation
                    if (config.min !== undefined && value < config.min) {
                        throw new Error(key + " must be >= " + config.min);
                    }
                    if (config.max !== undefined && value > config.max) {
                        throw new Error(key + " must be <= " + config.max);
                    }

                    // Custom validation
                    if (config.validate && !config.validate(value)) {
                        throw new Error(key + " failed custom validation");
                    }

                    // Sanitization
                    var sanitized = config.sanitize ? config.sanitize(value) : value;
                    data[key] = sanitized;
                },
                enumerable: true,
                configurable: true
            });

            // Set default value
            if (config.default !== undefined) {
                obj[key] = config.default;
            }
        });

        return obj;
    }

    var userSchema = {
        username: {
            type: "string",
            sanitize: function(value) { return value.toLowerCase().trim(); },
            validate: function(value) { return value.length >= 3; }
        },
        age: {
            type: "number",
            min: 0,
            max: 150,
            default: 0
        },
        email: {
            type: "string",
            validate: function(value) { return value.includes("@"); },
            sanitize: function(value) { return value.toLowerCase(); }
        }
    };

    var validatedUser = createValidatedObject(userSchema);

    if (validatedUser.age !== 0) throw new Error("Default value setting failed");

    validatedUser.username = "  JohnDoe  ";
    if (validatedUser.username !== "johndoe") throw new Error("Username sanitization failed");

    validatedUser.age = 25;
    if (validatedUser.age !== 25) throw new Error("Valid age setting failed");

    try {
        validatedUser.age = -5;
        var ageValidationError = false;
    } catch (e) {
        var ageValidationError = true;
    }
    if (!ageValidationError) throw new Error("Age range validation should fail");

    validatedUser.email = "JOHN@EXAMPLE.COM";
    if (validatedUser.email !== "john@example.com") throw new Error("Email sanitization failed");

    try {
        validatedUser.email = "invalid-email";
        var emailValidationError = false;
    } catch (e) {
        var emailValidationError = true;
    }
    if (!emailValidationError) throw new Error("Email validation should fail");

    // Test computed properties pattern
    function createCalculator() {
        var calc = {};
        var values = { a: 0, b: 0 };

        Object.defineProperty(calc, "a", {
            get: function() { return values.a; },
            set: function(value) { values.a = Number(value) || 0; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(calc, "b", {
            get: function() { return values.b; },
            set: function(value) { values.b = Number(value) || 0; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(calc, "sum", {
            get: function() { return values.a + values.b; },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(calc, "product", {
            get: function() { return values.a * values.b; },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(calc, "average", {
            get: function() { return (values.a + values.b) / 2; },
            enumerable: true,
            configurable: false
        });

        return calc;
    }

    var calculator = createCalculator();
    calculator.a = 10;
    calculator.b = 5;

    if (calculator.sum !== 15) throw new Error("Computed sum failed");
    if (calculator.product !== 50) throw new Error("Computed product failed");
    if (calculator.average !== 7.5) throw new Error("Computed average failed");

    calculator.a = 20;
    if (calculator.sum !== 25) throw new Error("Computed sum update failed");
    if (calculator.product !== 100) throw new Error("Computed product update failed");
    if (calculator.average !== 12.5) throw new Error("Computed average update failed");
})();