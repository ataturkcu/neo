/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Advanced Getter/Setter Patterns
 * Comprehensive testing of lazy loading, validation, computed properties,
 * this binding, proxies, advanced accessor patterns, and performance optimizations
 */

// Test 1-10: Lazy Loading and Deferred Initialization
(function() {
    // Test basic lazy loading pattern
    function createLazyObject() {
        var obj = {};
        var computedCache = null;
        var computed = false;

        Object.defineProperty(obj, "expensiveProperty", {
            get: function() {
                if (!computed) {
                    computedCache = this.performExpensiveComputation();
                    computed = true;
                }
                return computedCache;
            },
            enumerable: true,
            configurable: true
        });

        obj.performExpensiveComputation = function() {
            var result = 0;
            for (var i = 0; i < 1000; i++) {
                result += Math.sqrt(i);
            }
            return "computed: " + result.toFixed(2);
        };

        obj.isComputed = function() {
            return computed;
        };

        obj.invalidateCache = function() {
            computed = false;
            computedCache = null;
        };

        return obj;
    }

    var lazy = createLazyObject();
    if (lazy.isComputed()) throw new Error("Lazy property should not be computed initially");

    var value1 = lazy.expensiveProperty;
    if (!lazy.isComputed()) throw new Error("Lazy property should be computed after first access");
    if (!value1.startsWith("computed:")) throw new Error("Lazy computation failed");

    var value2 = lazy.expensiveProperty;
    if (value1 !== value2) throw new Error("Lazy property should return cached value");

    lazy.invalidateCache();
    if (lazy.isComputed()) throw new Error("Cache invalidation failed");

    var value3 = lazy.expensiveProperty;
    if (!lazy.isComputed()) throw new Error("Property should recompute after invalidation");

    // Test lazy loading with dependencies
    function createDependentLazyObject() {
        var obj = {};
        var dependencies = { a: 1, b: 2 };
        var cache = {};
        var computed = {};

        function invalidateDependents(prop) {
            Object.keys(computed).forEach(function(key) {
                if (computed[key]) {
                    computed[key] = false;
                    delete cache[key];
                }
            });
        }

        Object.defineProperty(obj, "a", {
            get: function() { return dependencies.a; },
            set: function(value) {
                dependencies.a = value;
                invalidateDependents("a");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "b", {
            get: function() { return dependencies.b; },
            set: function(value) {
                dependencies.b = value;
                invalidateDependents("b");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "sum", {
            get: function() {
                if (!computed.sum) {
                    cache.sum = dependencies.a + dependencies.b;
                    computed.sum = true;
                }
                return cache.sum;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "product", {
            get: function() {
                if (!computed.product) {
                    cache.product = dependencies.a * dependencies.b;
                    computed.product = true;
                }
                return cache.product;
            },
            enumerable: true,
            configurable: true
        });

        obj.getCacheState = function() {
            return Object.assign({}, computed);
        };

        return obj;
    }

    var dependent = createDependentLazyObject();
    if (dependent.sum !== 3) throw new Error("Dependent lazy sum failed");
    if (dependent.product !== 2) throw new Error("Dependent lazy product failed");

    var cacheState = dependent.getCacheState();
    if (!cacheState.sum || !cacheState.product) throw new Error("Dependent cache state failed");

    dependent.a = 5;
    var newCacheState = dependent.getCacheState();
    if (newCacheState.sum || newCacheState.product) throw new Error("Dependency invalidation failed");

    if (dependent.sum !== 7) throw new Error("Dependent recomputation failed");

    // Test async lazy loading simulation
    function createAsyncLazyObject() {
        var obj = {};
        var promiseCache = null;
        var loading = false;

        Object.defineProperty(obj, "asyncData", {
            get: function() {
                if (promiseCache) return promiseCache;
                if (loading) return promiseCache || Promise.resolve("loading...");

                loading = true;
                promiseCache = new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve("async data loaded");
                        loading = false;
                    }, 10);
                });

                return promiseCache;
            },
            enumerable: true,
            configurable: true
        });

        return obj;
    }

    var asyncLazy = createAsyncLazyObject();
    var asyncPromise = asyncLazy.asyncData;
    if (!(asyncPromise instanceof Promise)) throw new Error("Async lazy should return Promise");

    asyncPromise.then(function(result) {
        if (result !== "async data loaded") throw new Error("Async lazy resolution failed");

        var cachedPromise = asyncLazy.asyncData;
        if (cachedPromise !== asyncPromise) throw new Error("Async lazy should cache Promise");
    });
})();

// Test 11-20: Advanced Validation Patterns
(function() {
    // Test multi-stage validation
    function createValidatedObject() {
        var obj = {};
        var data = {};
        var validators = {};
        var sanitizers = {};

        obj.addValidator = function(prop, validator) {
            if (!validators[prop]) validators[prop] = [];
            validators[prop].push(validator);
        };

        obj.addSanitizer = function(prop, sanitizer) {
            if (!sanitizers[prop]) sanitizers[prop] = [];
            sanitizers[prop].push(sanitizer);
        };

        obj.defineValidatedProperty = function(prop, initialValue) {
            data[prop] = initialValue;

            Object.defineProperty(this, prop, {
                get: function() {
                    return data[prop];
                },
                set: function(value) {
                    var processedValue = value;

                    // Apply sanitizers
                    if (sanitizers[prop]) {
                        sanitizers[prop].forEach(function(sanitizer) {
                            processedValue = sanitizer(processedValue);
                        });
                    }

                    // Apply validators
                    if (validators[prop]) {
                        validators[prop].forEach(function(validator) {
                            if (!validator(processedValue)) {
                                throw new Error("Validation failed for " + prop + ": " + processedValue);
                            }
                        });
                    }

                    data[prop] = processedValue;
                },
                enumerable: true,
                configurable: true
            });
        };

        return obj;
    }

    var validated = createValidatedObject();

    // Add validators
    validated.addValidator("email", function(value) {
        return typeof value === "string" && value.includes("@");
    });
    validated.addValidator("email", function(value) {
        return value.length >= 5;
    });

    // Add sanitizers
    validated.addSanitizer("email", function(value) {
        return value.toLowerCase();
    });
    validated.addSanitizer("email", function(value) {
        return value.trim();
    });

    validated.defineValidatedProperty("email", "");

    validated.email = "  TEST@EXAMPLE.COM  ";
    if (validated.email !== "test@example.com") throw new Error("Multi-stage sanitization failed");

    try {
        validated.email = "invalid";
        var validationError = false;
    } catch (e) {
        var validationError = true;
    }
    if (!validationError) throw new Error("Multi-stage validation should fail");

    // Test conditional validation
    function createConditionalValidator() {
        var obj = {};
        var data = { mode: "strict" };

        Object.defineProperty(obj, "mode", {
            get: function() { return data.mode; },
            set: function(value) { data.mode = value; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "value", {
            get: function() { return data.value; },
            set: function(value) {
                if (data.mode === "strict") {
                    if (typeof value !== "number" || value < 0) {
                        throw new Error("Strict mode requires positive number");
                    }
                } else if (data.mode === "lenient") {
                    value = Math.abs(Number(value)) || 0;
                }
                data.value = value;
            },
            enumerable: true,
            configurable: true
        });

        return obj;
    }

    var conditional = createConditionalValidator();

    conditional.value = 42;
    if (conditional.value !== 42) throw new Error("Conditional validation - valid value failed");

    try {
        conditional.value = -5;
        var strictError = false;
    } catch (e) {
        var strictError = true;
    }
    if (!strictError) throw new Error("Strict mode validation should fail");

    conditional.mode = "lenient";
    conditional.value = -5;
    if (conditional.value !== 5) throw new Error("Lenient mode conversion failed");

    conditional.value = "abc";
    if (conditional.value !== 0) throw new Error("Lenient mode fallback failed");

    // Test cross-property validation
    function createCrossPropertyValidator() {
        var obj = {};
        var data = {};

        ["startDate", "endDate"].forEach(function(prop) {
            Object.defineProperty(obj, prop, {
                get: function() { return data[prop]; },
                set: function(value) {
                    var date = new Date(value);
                    if (isNaN(date.getTime())) {
                        throw new Error("Invalid date: " + value);
                    }

                    var tempData = Object.assign({}, data);
                    tempData[prop] = date;

                    // Cross-property validation
                    if (tempData.startDate && tempData.endDate) {
                        if (tempData.startDate >= tempData.endDate) {
                            throw new Error("Start date must be before end date");
                        }
                    }

                    data[prop] = date;
                },
                enumerable: true,
                configurable: true
            });
        });

        return obj;
    }

    var crossProp = createCrossPropertyValidator();
    crossProp.startDate = "2025-01-01";
    crossProp.endDate = "2025-12-31";

    if (crossProp.startDate.getFullYear() !== 2025) throw new Error("Cross-property start date failed");
    if (crossProp.endDate.getFullYear() !== 2025) throw new Error("Cross-property end date failed");

    try {
        crossProp.endDate = "2024-01-01";
        var crossError = false;
    } catch (e) {
        var crossError = true;
    }
    if (!crossError) throw new Error("Cross-property validation should fail");
})();

// Test 21-30: Computed Properties and Dependencies
(function() {
    // Test reactive computed properties
    function createReactiveObject() {
        var obj = {};
        var data = {};
        var computed = {};
        var computedCache = {};
        var dependencies = {};

        function invalidateComputed(changedProp) {
            Object.keys(dependencies).forEach(function(computedProp) {
                if (dependencies[computedProp].includes(changedProp)) {
                    delete computedCache[computedProp];
                    // Also invalidate computed properties that depend on this computed property
                    invalidateComputed(computedProp);
                }
            });
        }

        obj.defineProperty = function(prop, initialValue) {
            data[prop] = initialValue;

            Object.defineProperty(this, prop, {
                get: function() { return data[prop]; },
                set: function(value) {
                    var oldValue = data[prop];
                    data[prop] = value;
                    if (oldValue !== value) {
                        invalidateComputed(prop);
                    }
                },
                enumerable: true,
                configurable: true
            });
        };

        obj.defineComputed = function(prop, computeFn, deps) {
            computed[prop] = computeFn;
            dependencies[prop] = deps || [];

            Object.defineProperty(this, prop, {
                get: function() {
                    if (!(prop in computedCache)) {
                        computedCache[prop] = computeFn.call(this);
                    }
                    return computedCache[prop];
                },
                enumerable: true,
                configurable: true
            });
        };

        return obj;
    }

    var reactive = createReactiveObject();

    reactive.defineProperty("firstName", "John");
    reactive.defineProperty("lastName", "Doe");
    reactive.defineProperty("age", 30);

    reactive.defineComputed("fullName", function() {
        return this.firstName + " " + this.lastName;
    }, ["firstName", "lastName"]);

    reactive.defineComputed("displayName", function() {
        return this.fullName + " (" + this.age + ")";
    }, ["fullName", "age"]);

    if (reactive.fullName !== "John Doe") throw new Error("Computed fullName failed");
    if (reactive.displayName !== "John Doe (30)") throw new Error("Computed displayName failed");

    reactive.firstName = "Jane";
    if (reactive.fullName !== "Jane Doe") throw new Error("Computed property reactivity failed");
    if (reactive.displayName !== "Jane Doe (30)") throw new Error("Nested computed reactivity failed");

    reactive.age = 25;
    if (reactive.displayName !== "Jane Doe (25)") throw new Error("Age reactivity failed");

    // Test computed properties with complex dependencies
    function createMathReactiveObject() {
        var obj = {};
        var values = {};
        var cache = {};

        ["a", "b", "c"].forEach(function(prop) {
            Object.defineProperty(obj, prop, {
                get: function() { return values[prop] || 0; },
                set: function(value) {
                    values[prop] = Number(value) || 0;
                    // Invalidate all computed properties
                    cache = {};
                },
                enumerable: true,
                configurable: true
            });
        });

        Object.defineProperty(obj, "sum", {
            get: function() {
                if (!("sum" in cache)) {
                    cache.sum = values.a + values.b + values.c;
                }
                return cache.sum;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "average", {
            get: function() {
                if (!("average" in cache)) {
                    cache.average = this.sum / 3;
                }
                return cache.average;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "variance", {
            get: function() {
                if (!("variance" in cache)) {
                    var avg = this.average;
                    var sumSquareDiff = Math.pow(values.a - avg, 2) +
                                       Math.pow(values.b - avg, 2) +
                                       Math.pow(values.c - avg, 2);
                    cache.variance = sumSquareDiff / 3;
                }
                return cache.variance;
            },
            enumerable: true,
            configurable: true
        });

        return obj;
    }

    var mathReactive = createMathReactiveObject();
    mathReactive.a = 10;
    mathReactive.b = 20;
    mathReactive.c = 30;

    if (mathReactive.sum !== 60) throw new Error("Math reactive sum failed");
    if (mathReactive.average !== 20) throw new Error("Math reactive average failed");
    if (Math.abs(mathReactive.variance - 66.67) > 0.1) throw new Error("Math reactive variance failed");

    mathReactive.a = 15;
    if (mathReactive.sum !== 65) throw new Error("Math reactive sum update failed");
    if (Math.abs(mathReactive.average - 21.67) > 0.01) throw new Error("Math reactive average update failed");

    // Test circular dependency detection
    function createCircularDetector() {
        var obj = {};
        var computing = new Set();

        function createComputedProp(name, computeFn) {
            Object.defineProperty(obj, name, {
                get: function() {
                    if (computing.has(name)) {
                        throw new Error("Circular dependency detected: " + name);
                    }
                    computing.add(name);
                    try {
                        var result = computeFn.call(this);
                        return result;
                    } finally {
                        computing.delete(name);
                    }
                },
                enumerable: true,
                configurable: true
            });
        }

        obj.value = 5;
        createComputedProp("doubled", function() { return this.value * 2; });
        createComputedProp("circular", function() { return this.circular + 1; });

        return obj;
    }

    var circular = createCircularDetector();
    if (circular.doubled !== 10) throw new Error("Non-circular computed property failed");

    try {
        var circularValue = circular.circular;
        var circularError = false;
    } catch (e) {
        var circularError = true;
    }
    if (!circularError) throw new Error("Circular dependency should be detected");
})();

// Test 31-40: This Binding and Context Management
(function() {
    // Test this binding in accessors
    function createContextObject() {
        var obj = {};
        var privateData = "private";

        Object.defineProperty(obj, "contextProperty", {
            get: function() {
                return "Context: " + this.name + ", Private: " + privateData;
            },
            set: function(value) {
                this.name = value;
                privateData = "updated: " + value;
            },
            enumerable: true,
            configurable: true
        });

        obj.name = "default";
        return obj;
    }

    var context = createContextObject();
    if (!context.contextProperty.includes("Context: default")) throw new Error("This binding in getter failed");

    context.contextProperty = "newName";
    if (context.name !== "newName") throw new Error("This binding in setter failed");
    if (!context.contextProperty.includes("updated: newName")) throw new Error("Closure update failed");

    // Test binding preservation with call/apply
    var otherContext = { name: "other" };
    var boundGetter = Object.getOwnPropertyDescriptor(context, "contextProperty").get;

    var result = boundGetter.call(otherContext);
    if (!result.includes("Context: other")) throw new Error("Call binding failed");

    // Test arrow function behavior simulation
    function createArrowSimulator() {
        var self = this;
        var obj = {};

        Object.defineProperty(obj, "arrowLike", {
            get: function() {
                // Simulate arrow function binding to outer context
                return "Outer context: " + (self ? self.name || "global" : "global");
            },
            enumerable: true,
            configurable: true
        });

        obj.normalFunction = function() {
            return "Normal context: " + this.name;
        };

        return obj;
    }

    var arrowSim = createArrowSimulator.call({ name: "outer" });
    if (!arrowSim.arrowLike.includes("Outer context: outer")) throw new Error("Arrow simulation failed");

    arrowSim.name = "instance";
    if (!arrowSim.normalFunction().includes("Normal context: instance")) throw new Error("Normal function context failed");

    // Test dynamic this binding with proxies
    function createDynamicContext() {
        var obj = {};
        var contexts = {};

        Object.defineProperty(obj, "dynamicProperty", {
            get: function() {
                var contextKey = this._contextKey || "default";
                return contexts[contextKey] || "No context for " + contextKey;
            },
            set: function(value) {
                var contextKey = this._contextKey || "default";
                contexts[contextKey] = value;
            },
            enumerable: true,
            configurable: true
        });

        obj.setContext = function(key) {
            this._contextKey = key;
            return this;
        };

        obj.getContexts = function() {
            return Object.assign({}, contexts);
        };

        return obj;
    }

    var dynamic = createDynamicContext();
    dynamic.dynamicProperty = "default value";

    dynamic.setContext("context1");
    dynamic.dynamicProperty = "context1 value";

    dynamic.setContext("context2");
    dynamic.dynamicProperty = "context2 value";

    dynamic.setContext("context1");
    if (dynamic.dynamicProperty !== "context1 value") throw new Error("Dynamic context switching failed");

    dynamic.setContext("context2");
    if (dynamic.dynamicProperty !== "context2 value") throw new Error("Dynamic context preservation failed");

    var allContexts = dynamic.getContexts();
    if (Object.keys(allContexts).length !== 3) throw new Error("Context storage failed");

    // Test method binding in accessors
    function createMethodBinder() {
        var obj = {};
        var methods = {};

        Object.defineProperty(obj, "boundMethod", {
            get: function() {
                var self = this;
                if (!methods.boundMethod) {
                    methods.boundMethod = function() {
                        return "Bound to: " + self.identifier;
                    };
                }
                return methods.boundMethod;
            },
            enumerable: true,
            configurable: true
        });

        obj.identifier = "original";
        return obj;
    }

    var binder = createMethodBinder();
    var method = binder.boundMethod;

    binder.identifier = "changed";
    if (method() !== "Bound to: changed") throw new Error("Method binding failed");

    var otherObj = { identifier: "other" };
    if (method.call(otherObj) !== "Bound to: changed") throw new Error("Method should maintain original binding");
})();

// Test 41-50: Performance Optimization Patterns
(function() {
    // Test memoization with TTL (Time To Live)
    function createMemoizedAccessor(computeFn, ttl) {
        var cache = null;
        var timestamp = 0;
        ttl = ttl || 1000; // Default 1 second

        return {
            get: function() {
                var now = Date.now();
                if (!cache || (now - timestamp) > ttl) {
                    cache = computeFn.call(this);
                    timestamp = now;
                }
                return cache;
            },
            invalidate: function() {
                cache = null;
                timestamp = 0;
            }
        };
    }

    var obj = {};
    var computeCount = 0;
    var memoized = createMemoizedAccessor(function() {
        computeCount++;
        return "computed " + computeCount + " at " + Date.now();
    }, 100);

    Object.defineProperty(obj, "memoizedProperty", {
        get: memoized.get,
        enumerable: true,
        configurable: true
    });

    var value1 = obj.memoizedProperty;
    var value2 = obj.memoizedProperty;

    if (computeCount !== 1) throw new Error("Memoization should prevent recomputation");
    if (value1 !== value2) throw new Error("Memoized values should be identical");

    // Simulate TTL expiration by manually advancing time
    memoized.invalidate();
    var value3 = obj.memoizedProperty;
    if (computeCount !== 2) throw new Error("TTL expiration should trigger recomputation");

    memoized.invalidate();
    var value4 = obj.memoizedProperty;
    if (computeCount !== 3) throw new Error("Manual invalidation should work");

    // Test batch updates
    function createBatchUpdater() {
        var obj = {};
        var data = {};
        var pendingUpdates = {};
        var updateScheduled = false;

        function scheduleUpdate() {
            if (!updateScheduled) {
                updateScheduled = true;
                setTimeout(function() {
                    Object.assign(data, pendingUpdates);
                    pendingUpdates = {};
                    updateScheduled = false;
                }, 0);
            }
        }

        function createBatchProperty(prop) {
            Object.defineProperty(obj, prop, {
                get: function() {
                    return data[prop];
                },
                set: function(value) {
                    pendingUpdates[prop] = value;
                    scheduleUpdate();
                },
                enumerable: true,
                configurable: true
            });
        }

        obj.createProperty = createBatchProperty;
        obj.getPendingUpdates = function() {
            return Object.assign({}, pendingUpdates);
        };

        obj.flush = function() {
            Object.assign(data, pendingUpdates);
            pendingUpdates = {};
            updateScheduled = false;
        };

        return obj;
    }

    var batcher = createBatchUpdater();
    batcher.createProperty("a");
    batcher.createProperty("b");
    batcher.createProperty("c");

    batcher.a = 1;
    batcher.b = 2;
    batcher.c = 3;

    var pending = batcher.getPendingUpdates();
    if (Object.keys(pending).length !== 3) throw new Error("Batch updates not pending");

    if (batcher.a !== undefined) throw new Error("Batched value should not be immediately available");

    batcher.flush();
    if (batcher.a !== 1 || batcher.b !== 2 || batcher.c !== 3) throw new Error("Batch flush failed");

    // Test copy-on-write optimization
    function createCopyOnWrite() {
        var obj = {};
        var sharedData = { value: "shared", count: 0 };
        var privateData = null;

        function ensurePrivateCopy() {
            if (!privateData) {
                privateData = Object.assign({}, sharedData);
            }
            return privateData;
        }

        Object.defineProperty(obj, "value", {
            get: function() {
                return (privateData || sharedData).value;
            },
            set: function(value) {
                ensurePrivateCopy().value = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "count", {
            get: function() {
                return (privateData || sharedData).count;
            },
            set: function(value) {
                ensurePrivateCopy().count = value;
            },
            enumerable: true,
            configurable: true
        });

        obj.isShared = function() {
            return privateData === null;
        };

        obj.getSharedData = function() {
            return sharedData;
        };

        return obj;
    }

    var cow1 = createCopyOnWrite();
    var cow2 = createCopyOnWrite();

    if (!cow1.isShared() || !cow2.isShared()) throw new Error("Initial state should be shared");
    if (cow1.value !== "shared") throw new Error("Shared value access failed");

    cow1.value = "modified";
    if (cow1.isShared()) throw new Error("Modification should trigger private copy");
    if (!cow2.isShared()) throw new Error("Other instance should remain shared");
    if (cow2.value !== "shared") throw new Error("Shared data should be unchanged");

    // Test weak reference simulation for memory optimization
    function createWeakCache() {
        var cache = new Map();
        var obj = {};

        Object.defineProperty(obj, "get", {
            value: function(key) {
                return cache.get(key);
            },
            configurable: true
        });

        Object.defineProperty(obj, "set", {
            value: function(key, value) {
                cache.set(key, value);
                // Simulate weak reference cleanup
                if (cache.size > 10) {
                    var keys = Array.from(cache.keys());
                    var oldestKey = keys[0];
                    cache.delete(oldestKey);
                }
            },
            configurable: true
        });

        Object.defineProperty(obj, "size", {
            get: function() { return cache.size; },
            configurable: true
        });

        return obj;
    }

    var weakCache = createWeakCache();
    for (var i = 0; i < 15; i++) {
        weakCache.set("key" + i, "value" + i);
    }

    if (weakCache.size > 10) throw new Error("Weak cache should limit size");
    if (weakCache.get("key0") !== undefined) throw new Error("Oldest entries should be removed");
    if (weakCache.get("key14") !== "value14") throw new Error("Recent entries should be preserved");
})();

// Test 51-60: Proxy-based Advanced Patterns
(function() {
    // Test virtual properties with Proxy
    function createVirtualProperties() {
        var data = {};
        var virtualGetters = {};
        var virtualSetters = {};

        return new Proxy(data, {
            get: function(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                if (prop in virtualGetters) {
                    return virtualGetters[prop].call(target);
                }
                // Generate virtual property based on pattern
                if (typeof prop === "string" && prop.startsWith("virtual_")) {
                    return "Virtual property: " + prop;
                }
                return undefined;
            },
            set: function(target, prop, value) {
                if (prop in virtualSetters) {
                    return virtualSetters[prop].call(target, value);
                }
                target[prop] = value;
                return true;
            },
            has: function(target, prop) {
                return prop in target || prop in virtualGetters ||
                       (typeof prop === "string" && prop.startsWith("virtual_"));
            },
            ownKeys: function(target) {
                var keys = Object.keys(target);
                keys.push(...Object.keys(virtualGetters));
                return keys;
            },
            defineProperty: function(target, prop, descriptor) {
                if (descriptor.get) {
                    virtualGetters[prop] = descriptor.get;
                }
                if (descriptor.set) {
                    virtualSetters[prop] = descriptor.set;
                }
                return true;
            }
        });
    }

    var virtual = createVirtualProperties();
    virtual.realProperty = "real";

    if (virtual.realProperty !== "real") throw new Error("Real property access failed");
    if (virtual.virtual_test !== "Virtual property: virtual_test") throw new Error("Virtual property generation failed");

    Object.defineProperty(virtual, "computed", {
        get: function() { return "Computed: " + this.realProperty; },
        set: function(value) { this.realProperty = value.replace("Computed: ", ""); }
    });

    if (virtual.computed !== "Computed: real") throw new Error("Proxy computed property failed");
    virtual.computed = "Computed: modified";
    if (virtual.realProperty !== "modified") throw new Error("Proxy computed setter failed");

    // Test observable object with Proxy
    function createObservable(target) {
        var observers = [];

        function notify(prop, value, oldValue, operation) {
            observers.forEach(function(observer) {
                observer({ property: prop, value: value, oldValue: oldValue, operation: operation });
            });
        }

        var proxy = new Proxy(target, {
            get: function(obj, prop) {
                if (prop === "observe") {
                    return function(observer) {
                        observers.push(observer);
                    };
                }
                if (prop === "unobserve") {
                    return function(observer) {
                        var index = observers.indexOf(observer);
                        if (index > -1) observers.splice(index, 1);
                    };
                }
                return obj[prop];
            },
            set: function(obj, prop, value) {
                var oldValue = obj[prop];
                obj[prop] = value;
                if (oldValue !== value) {
                    notify(prop, value, oldValue, "set");
                }
                return true;
            },
            deleteProperty: function(obj, prop) {
                var oldValue = obj[prop];
                delete obj[prop];
                notify(prop, undefined, oldValue, "delete");
                return true;
            }
        });

        return proxy;
    }

    var observable = createObservable({ name: "test", age: 25 });
    var notifications = [];

    observable.observe(function(change) {
        notifications.push(change);
    });

    observable.name = "changed";
    observable.age = 30;
    delete observable.age;

    if (notifications.length !== 3) throw new Error("Observable notifications failed");
    if (notifications[0].property !== "name") throw new Error("Observable property change failed");
    if (notifications[0].value !== "changed") throw new Error("Observable new value failed");
    if (notifications[0].oldValue !== "test") throw new Error("Observable old value failed");
    if (notifications[2].operation !== "delete") throw new Error("Observable delete operation failed");

    // Test deep proxy for nested objects
    function createDeepProxy(target) {
        function makeProxy(obj, path) {
            if (obj === null || typeof obj !== "object") return obj;

            return new Proxy(obj, {
                get: function(target, prop) {
                    var value = target[prop];
                    if (value && typeof value === "object") {
                        return makeProxy(value, path + "." + prop);
                    }
                    return value;
                },
                set: function(target, prop, value) {
                    console.log("Deep set: " + path + "." + prop + " = " + value);
                    target[prop] = value;
                    return true;
                }
            });
        }

        return makeProxy(target, "root");
    }

    var deepObj = createDeepProxy({
        level1: {
            level2: {
                value: "deep"
            }
        }
    });

    if (deepObj.level1.level2.value !== "deep") throw new Error("Deep proxy read failed");
    deepObj.level1.level2.value = "modified";
    if (deepObj.level1.level2.value !== "modified") throw new Error("Deep proxy write failed");

    // Test method interception with Proxy
    function createMethodInterceptor(target) {
        var methodCalls = [];

        return new Proxy(target, {
            get: function(obj, prop) {
                var value = obj[prop];
                if (typeof value === "function") {
                    return function(...args) {
                        methodCalls.push({ method: prop, args: args, timestamp: Date.now() });
                        return value.apply(obj, args);
                    };
                }
                if (prop === "getMethodCalls") {
                    return function() { return methodCalls.slice(); };
                }
                return value;
            }
        });
    }

    var intercepted = createMethodInterceptor({
        add: function(a, b) { return a + b; },
        multiply: function(a, b) { return a * b; },
        value: 42
    });

    var result1 = intercepted.add(2, 3);
    var result2 = intercepted.multiply(4, 5);

    if (result1 !== 5) throw new Error("Intercepted method result failed");
    if (result2 !== 20) throw new Error("Intercepted method result failed");

    var calls = intercepted.getMethodCalls();
    if (calls.length !== 2) throw new Error("Method interception logging failed");
    if (calls[0].method !== "add") throw new Error("Method name logging failed");
    if (calls[0].args[0] !== 2 || calls[0].args[1] !== 3) throw new Error("Method args logging failed");
})();

// Test 61-70: Advanced Error Handling and Recovery
(function() {
    // Test error boundary pattern for accessors
    function createErrorBoundary() {
        var obj = {};
        var errorHandlers = {};
        var fallbackValues = {};

        function withErrorBoundary(prop, accessor, fallback, errorHandler) {
            var originalGet = accessor.get;
            var originalSet = accessor.set;

            if (fallback !== undefined) fallbackValues[prop] = fallback;
            if (errorHandler) errorHandlers[prop] = errorHandler;

            Object.defineProperty(obj, prop, {
                get: function() {
                    try {
                        return originalGet ? originalGet.call(this) : undefined;
                    } catch (error) {
                        if (errorHandlers[prop]) {
                            errorHandlers[prop](error, "get");
                        }
                        return fallbackValues[prop];
                    }
                },
                set: originalSet ? function(value) {
                    try {
                        return originalSet.call(this, value);
                    } catch (error) {
                        if (errorHandlers[prop]) {
                            errorHandlers[prop](error, "set");
                        }
                        // Don't set value on error
                    }
                } : undefined,
                enumerable: true,
                configurable: true
            });
        }

        obj.defineProtectedProperty = withErrorBoundary;
        return obj;
    }

    var boundary = createErrorBoundary();
    var errors = [];

    boundary.defineProtectedProperty("riskyProperty", {
        get: function() {
            if (this.shouldThrow) {
                throw new Error("Getter error");
            }
            return this._value;
        },
        set: function(value) {
            if (value === "error") {
                throw new Error("Setter error");
            }
            this._value = value;
        }
    }, "fallback", function(error, operation) {
        errors.push({ error: error.message, operation: operation });
    });

    boundary._value = "normal";
    if (boundary.riskyProperty !== "normal") throw new Error("Normal operation failed");

    boundary.shouldThrow = true;
    if (boundary.riskyProperty !== "fallback") throw new Error("Error fallback failed");

    boundary.riskyProperty = "error";
    if (errors.length === 0) throw new Error("Error handler not called");
    if (errors[0].operation !== "get") throw new Error("Error operation tracking failed");

    // Test retry mechanism for accessors
    function createRetryAccessor(maxRetries, delayMs) {
        var attempts = 0;
        var obj = {};

        Object.defineProperty(obj, "unreliableProperty", {
            get: function() {
                attempts++;
                if (attempts < maxRetries) {
                    throw new Error("Temporary failure " + attempts);
                }
                return "success after " + attempts + " attempts";
            },
            enumerable: true,
            configurable: true
        });

        obj.getAttempts = function() { return attempts; };
        obj.reset = function() { attempts = 0; };

        return obj;
    }

    function withRetry(obj, prop, maxRetries, delay) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        var originalGet = descriptor.get;

        Object.defineProperty(obj, prop, {
            get: function() {
                var retries = 0;
                while (retries < maxRetries) {
                    try {
                        return originalGet.call(this);
                    } catch (error) {
                        retries++;
                        if (retries >= maxRetries) {
                            throw error;
                        }
                        // In real implementation, would have actual delay
                    }
                }
            },
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable
        });
    }

    var retryObj = createRetryAccessor(3, 100);
    withRetry(retryObj, "unreliableProperty", 5, 50);

    var result = retryObj.unreliableProperty;
    if (!result.includes("success after 3 attempts")) throw new Error("Retry mechanism failed");

    // Test circuit breaker pattern
    function createCircuitBreaker(threshold, timeout) {
        var failures = 0;
        var lastFailure = 0;
        var state = "closed"; // closed, open, half-open

        function isCircuitOpen() {
            return state === "open" && (Date.now() - lastFailure) < timeout;
        }

        function recordSuccess() {
            failures = 0;
            state = "closed";
        }

        function recordFailure() {
            failures++;
            lastFailure = Date.now();
            if (failures >= threshold) {
                state = "open";
            }
        }

        return {
            call: function(fn) {
                if (isCircuitOpen()) {
                    throw new Error("Circuit breaker is open");
                }

                try {
                    var result = fn();
                    recordSuccess();
                    return result;
                } catch (error) {
                    recordFailure();
                    throw error;
                }
            },
            getState: function() { return state; },
            getFailures: function() { return failures; }
        };
    }

    var circuitBreaker = createCircuitBreaker(2, 1000);
    var obj = {};

    Object.defineProperty(obj, "protectedProperty", {
        get: function() {
            return circuitBreaker.call(function() {
                if (obj.shouldFail) {
                    throw new Error("Service failure");
                }
                return "service response";
            });
        },
        enumerable: true,
        configurable: true
    });

    if (obj.protectedProperty !== "service response") throw new Error("Circuit breaker normal operation failed");

    obj.shouldFail = true;
    try {
        obj.protectedProperty;
        var circuitError1 = false;
    } catch (e) {
        var circuitError1 = true;
    }
    try {
        obj.protectedProperty; // Second failure to trigger circuit
        var circuitError2 = false;
    } catch (e) {
        var circuitError2 = true;
    }

    if (circuitBreaker.getState() !== "open") throw new Error("Circuit breaker should be open");

    try {
        obj.protectedProperty; // Should fail due to open circuit
        var openCircuitError = false;
    } catch (e) {
        var openCircuitError = e.message.includes("Circuit breaker is open");
    }
    if (!openCircuitError) throw new Error("Open circuit should prevent calls");
})();

// Test 71-80: Memory Management and Resource Cleanup
(function() {
    // Test automatic cleanup with WeakMap
    function createAutoCleanup() {
        var resources = new WeakMap();
        var cleanupCallbacks = new WeakMap();

        function createManagedObject() {
            var obj = {};
            var resource = {
                data: new Array(1000).fill("data"),
                timestamp: Date.now()
            };

            resources.set(obj, resource);

            Object.defineProperty(obj, "data", {
                get: function() {
                    var res = resources.get(this);
                    return res ? res.data : null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(obj, "cleanup", {
                value: function() {
                    var res = resources.get(this);
                    if (res) {
                        res.data = null;
                        resources.delete(this);
                        var callback = cleanupCallbacks.get(this);
                        if (callback) callback();
                    }
                },
                configurable: true
            });

            obj.onCleanup = function(callback) {
                cleanupCallbacks.set(this, callback);
            };

            return obj;
        }

        return { createManagedObject: createManagedObject };
    }

    var autoCleanup = createAutoCleanup();
    var managed = autoCleanup.createManagedObject();
    var cleanupCalled = false;

    managed.onCleanup(function() {
        cleanupCalled = true;
    });

    if (!managed.data || managed.data.length !== 1000) throw new Error("Managed resource access failed");

    managed.cleanup();
    if (!cleanupCalled) throw new Error("Cleanup callback not called");
    if (managed.data !== null) throw new Error("Resource not cleaned up");

    // Test reference counting pattern
    function createRefCounted() {
        var refCounts = new WeakMap();
        var resources = new WeakMap();

        function createRefCountedResource() {
            var obj = {};
            refCounts.set(obj, 1);
            resources.set(obj, { data: "resource data", alive: true });

            Object.defineProperty(obj, "data", {
                get: function() {
                    var res = resources.get(this);
                    return res && res.alive ? res.data : null;
                },
                enumerable: true,
                configurable: true
            });

            obj.addRef = function() {
                var count = refCounts.get(this) || 0;
                refCounts.set(this, count + 1);
                return this;
            };

            obj.release = function() {
                var count = refCounts.get(this) || 0;
                count--;
                if (count <= 0) {
                    var res = resources.get(this);
                    if (res) res.alive = false;
                    refCounts.delete(this);
                    return true; // Resource destroyed
                } else {
                    refCounts.set(this, count);
                    return false; // Still alive
                }
            };

            obj.getRefCount = function() {
                return refCounts.get(this) || 0;
            };

            return obj;
        }

        return { create: createRefCountedResource };
    }

    var refFactory = createRefCounted();
    var refCounted = refFactory.create();

    if (refCounted.getRefCount() !== 1) throw new Error("Initial ref count failed");
    if (refCounted.data !== "resource data") throw new Error("Ref counted data access failed");

    var ref2 = refCounted.addRef();
    if (refCounted.getRefCount() !== 2) throw new Error("Add ref failed");

    var destroyed1 = refCounted.release();
    if (destroyed1) throw new Error("Resource should not be destroyed yet");
    if (refCounted.getRefCount() !== 1) throw new Error("Release ref count failed");

    var destroyed2 = refCounted.release();
    if (!destroyed2) throw new Error("Resource should be destroyed");
    if (refCounted.data !== null) throw new Error("Destroyed resource should not be accessible");

    // Test pooling pattern with accessors
    function createObjectPool(factory, reset, maxSize) {
        var pool = [];
        var active = new Set();

        function acquire() {
            var obj;
            if (pool.length > 0) {
                obj = pool.pop();
            } else {
                obj = factory();
                setupPooledObject(obj);
            }
            active.add(obj);
            return obj;
        }

        function release(obj) {
            if (active.has(obj)) {
                active.delete(obj);
                reset(obj);
                if (pool.length < maxSize) {
                    pool.push(obj);
                }
                return true;
            }
            return false;
        }

        function setupPooledObject(obj) {
            Object.defineProperty(obj, "isPooled", {
                get: function() { return !active.has(this); },
                enumerable: false,
                configurable: true
            });

            Object.defineProperty(obj, "release", {
                value: function() { return release(this); },
                configurable: true
            });
        }

        return {
            acquire: acquire,
            release: release,
            getPoolSize: function() { return pool.length; },
            getActiveCount: function() { return active.size; }
        };
    }

    var pool = createObjectPool(
        function() { return { data: null, processed: false }; },
        function(obj) { obj.data = null; obj.processed = false; },
        5
    );

    var pooled1 = pool.acquire();
    var pooled2 = pool.acquire();

    if (pooled1.isPooled || pooled2.isPooled) throw new Error("Active objects should not be pooled");
    if (pool.getActiveCount() !== 2) throw new Error("Active count tracking failed");

    pooled1.data = "test";
    pooled1.release();

    if (!pooled1.isPooled) throw new Error("Released object should be pooled");
    if (pooled1.data !== null) throw new Error("Released object should be reset");
    if (pool.getPoolSize() !== 1) throw new Error("Pool size tracking failed");

    var pooled3 = pool.acquire();
    if (pooled3 !== pooled1) throw new Error("Pool should reuse objects");
})();

// Test 81-90: Advanced Serialization and Persistence
(function() {
    // Test custom serialization with accessors
    function createSerializableObject() {
        var obj = {};
        var data = {};
        var metadata = { version: 1, created: Date.now() };

        Object.defineProperty(obj, "toJSON", {
            value: function() {
                return {
                    data: data,
                    metadata: metadata,
                    computed: this.computedValue
                };
            },
            configurable: true
        });

        Object.defineProperty(obj, "fromJSON", {
            value: function(json) {
                data = json.data || {};
                metadata = json.metadata || { version: 1, created: Date.now() };
                return this;
            },
            configurable: true
        });

        Object.defineProperty(obj, "computedValue", {
            get: function() {
                return Object.keys(data).length + " properties";
            },
            enumerable: true,
            configurable: true
        });

        // Create property accessors
        function createProperty(prop) {
            Object.defineProperty(obj, prop, {
                get: function() { return data[prop]; },
                set: function(value) { data[prop] = value; },
                enumerable: true,
                configurable: true
            });
        }

        obj.defineProperty = createProperty;
        return obj;
    }

    var serializable = createSerializableObject();
    serializable.defineProperty("name");
    serializable.defineProperty("age");

    serializable.name = "John";
    serializable.age = 30;

    var json = JSON.stringify(serializable);
    var parsed = JSON.parse(json);

    if (!parsed.data.name || parsed.data.name !== "John") throw new Error("Serialization of data failed");
    if (!parsed.metadata.version) throw new Error("Serialization of metadata failed");
    if (parsed.computed !== "2 properties") throw new Error("Serialization of computed value failed");

    var restored = createSerializableObject();
    restored.defineProperty("name");
    restored.defineProperty("age");
    restored.fromJSON(parsed);

    if (restored.name !== "John") throw new Error("Deserialization failed");
    if (restored.age !== 30) throw new Error("Deserialization failed");

    // Test versioned serialization
    function createVersionedObject() {
        var obj = {};
        var currentVersion = 2;
        var migrations = {
            1: function(data) {
                // Migrate from version 1 to 2
                if (data.fullName) {
                    var parts = data.fullName.split(" ");
                    data.firstName = parts[0] || "";
                    data.lastName = parts[1] || "";
                    delete data.fullName;
                }
                return data;
            }
        };

        Object.defineProperty(obj, "serialize", {
            value: function() {
                return {
                    version: currentVersion,
                    data: this.getData()
                };
            },
            configurable: true
        });

        Object.defineProperty(obj, "deserialize", {
            value: function(serialized) {
                var data = serialized.data;
                var version = serialized.version || 1;

                // Apply migrations
                for (var v = version; v < currentVersion; v++) {
                    if (migrations[v]) {
                        data = migrations[v](data);
                    }
                }

                this.setData(data);
                return this;
            },
            configurable: true
        });

        obj.getData = function() {
            return { firstName: this.firstName, lastName: this.lastName };
        };

        obj.setData = function(data) {
            this.firstName = data.firstName;
            this.lastName = data.lastName;
        };

        return obj;
    }

    var versioned = createVersionedObject();

    // Simulate old version data
    var oldData = { version: 1, data: { fullName: "Jane Doe" } };
    versioned.deserialize(oldData);

    if (versioned.firstName !== "Jane") throw new Error("Version migration firstName failed");
    if (versioned.lastName !== "Doe") throw new Error("Version migration lastName failed");

    var newSerialized = versioned.serialize();
    if (newSerialized.version !== 2) throw new Error("Version upgrade failed");

    // Test lazy deserialization
    function createLazyDeserializer() {
        var obj = {};
        var serializedData = null;
        var deserializedProps = new Set();

        Object.defineProperty(obj, "loadFromSerialized", {
            value: function(data) {
                serializedData = data;
                deserializedProps.clear();
                return this;
            },
            configurable: true
        });

        function createLazyProperty(prop) {
            Object.defineProperty(obj, prop, {
                get: function() {
                    if (!deserializedProps.has(prop) && serializedData) {
                        this["_" + prop] = serializedData[prop];
                        deserializedProps.add(prop);
                    }
                    return this["_" + prop];
                },
                set: function(value) {
                    this["_" + prop] = value;
                    deserializedProps.add(prop);
                },
                enumerable: true,
                configurable: true
            });
        }

        obj.defineLazyProperty = createLazyProperty;
        obj.getDeserializedProps = function() {
            return Array.from(deserializedProps);
        };

        return obj;
    }

    var lazy = createLazyDeserializer();
    lazy.defineLazyProperty("expensive");
    lazy.defineLazyProperty("large");
    lazy.defineLazyProperty("computed");

    lazy.loadFromSerialized({
        expensive: "expensive data",
        large: new Array(1000).fill("large"),
        computed: "computed result"
    });

    if (lazy.getDeserializedProps().length !== 0) throw new Error("No properties should be deserialized initially");

    var expensiveValue = lazy.expensive;
    if (lazy.getDeserializedProps().length !== 1) throw new Error("Only accessed property should be deserialized");
    if (!lazy.getDeserializedProps().includes("expensive")) throw new Error("Expensive property should be deserialized");

    lazy.large = "modified";
    if (!lazy.getDeserializedProps().includes("large")) throw new Error("Modified property should be marked as deserialized");
})();

// Test 91-100: Real-world Integration Patterns
(function() {
    // Test MVC pattern with accessors
    function createMVCPattern() {
        // Model
        function Model() {
            var data = {};
            var observers = [];

            this.get = function(key) { return data[key]; };
            this.set = function(key, value) {
                var oldValue = data[key];
                data[key] = value;
                this.notify(key, value, oldValue);
            };

            this.observe = function(observer) {
                observers.push(observer);
            };

            this.notify = function(key, value, oldValue) {
                observers.forEach(function(observer) {
                    observer(key, value, oldValue);
                });
            };
        }

        // View
        function View(model) {
            var self = this;
            var element = { textContent: "", value: "" };

            model.observe(function(key, value) {
                self.render();
            });

            this.render = function() {
                element.textContent = "Name: " + model.get("name") + ", Age: " + model.get("age");
            };

            this.getElement = function() { return element; };
        }

        // Controller
        function Controller(model, view) {
            Object.defineProperty(this, "name", {
                get: function() { return model.get("name"); },
                set: function(value) { model.set("name", value); },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(this, "age", {
                get: function() { return model.get("age"); },
                set: function(value) { model.set("age", value); },
                enumerable: true,
                configurable: true
            });

            this.getView = function() { return view; };
        }

        var model = new Model();
        var view = new View(model);
        var controller = new Controller(model, view);

        return { model: model, view: view, controller: controller };
    }

    var mvc = createMVCPattern();
    mvc.controller.name = "Alice";
    mvc.controller.age = 28;

    var element = mvc.view.getElement();
    if (!element.textContent.includes("Name: Alice")) throw new Error("MVC view update failed");
    if (!element.textContent.includes("Age: 28")) throw new Error("MVC age update failed");

    // Test data binding pattern
    function createDataBinding() {
        var bindings = new Map();

        function bind(obj, prop, element, elementProp) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            var currentValue = obj[prop];

            Object.defineProperty(obj, prop, {
                get: function() {
                    return currentValue;
                },
                set: function(value) {
                    currentValue = value;
                    // Update bound elements
                    var boundElements = bindings.get(obj + "." + prop) || [];
                    boundElements.forEach(function(binding) {
                        binding.element[binding.elementProp] = value;
                    });
                },
                enumerable: descriptor ? descriptor.enumerable : true,
                configurable: true
            });

            // Store binding
            var key = obj + "." + prop;
            if (!bindings.has(key)) bindings.set(key, []);
            bindings.get(key).push({ element: element, elementProp: elementProp });

            // Initial sync
            element[elementProp] = currentValue;
        }

        return { bind: bind };
    }

    var dataBinder = createDataBinding();
    var user = { name: "Bob", email: "bob@example.com" };
    var nameInput = { value: "" };
    var emailInput = { value: "" };

    dataBinder.bind(user, "name", nameInput, "value");
    dataBinder.bind(user, "email", emailInput, "value");

    if (nameInput.value !== "Bob") throw new Error("Initial data binding failed");
    if (emailInput.value !== "bob@example.com") throw new Error("Initial email binding failed");

    user.name = "Robert";
    if (nameInput.value !== "Robert") throw new Error("Data binding update failed");

    user.email = "robert@example.com";
    if (emailInput.value !== "robert@example.com") throw new Error("Email binding update failed");

    // Test state machine with accessors
    function createStateMachine(states, transitions) {
        var machine = {};
        var currentState = null;
        var stateData = {};

        Object.defineProperty(machine, "state", {
            get: function() { return currentState; },
            set: function(newState) {
                if (!states.includes(newState)) {
                    throw new Error("Invalid state: " + newState);
                }

                var transition = currentState + "->" + newState;
                if (currentState && !transitions.includes(transition)) {
                    throw new Error("Invalid transition: " + transition);
                }

                var oldState = currentState;
                currentState = newState;

                // Execute state hooks
                if (machine["onExit" + oldState]) {
                    machine["onExit" + oldState]();
                }
                if (machine["onEnter" + newState]) {
                    machine["onEnter" + newState]();
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(machine, "data", {
            get: function() { return stateData; },
            set: function(data) { stateData = Object.assign({}, data); },
            enumerable: true,
            configurable: true
        });

        machine.canTransitionTo = function(state) {
            var transition = currentState + "->" + state;
            return transitions.includes(transition);
        };

        return machine;
    }

    var fsm = createStateMachine(
        ["idle", "loading", "loaded", "error"],
        ["idle->loading", "loading->loaded", "loading->error", "loaded->idle", "error->idle"]
    );

    var stateChanges = [];
    fsm.onEnterloading = function() { stateChanges.push("enter loading"); };
    fsm.onExitloading = function() { stateChanges.push("exit loading"); };
    fsm.onEnterloaded = function() { stateChanges.push("enter loaded"); };

    fsm.state = "idle";
    if (fsm.state !== "idle") throw new Error("State machine initialization failed");

    fsm.state = "loading";
    if (stateChanges[0] !== "enter loading") throw new Error("State machine enter hook failed");

    fsm.state = "loaded";
    if (stateChanges[1] !== "exit loading") throw new Error("State machine exit hook failed");
    if (stateChanges[2] !== "enter loaded") throw new Error("State machine loaded hook failed");

    try {
        fsm.state = "loading"; // Invalid transition from loaded to loading
        var transitionError = false;
    } catch (e) {
        var transitionError = true;
    }
    if (!transitionError) throw new Error("Invalid transition should be rejected");

    if (!fsm.canTransitionTo("idle")) throw new Error("Valid transition check failed");
    if (fsm.canTransitionTo("error")) throw new Error("Invalid transition check failed");

    // Test plugin system with accessors
    function createPluginSystem() {
        var system = {};
        var plugins = new Map();
        var hooks = new Map();

        Object.defineProperty(system, "plugins", {
            get: function() { return Array.from(plugins.keys()); },
            enumerable: true,
            configurable: true
        });

        system.register = function(name, plugin) {
            if (plugins.has(name)) {
                throw new Error("Plugin already registered: " + name);
            }

            plugins.set(name, plugin);

            // Setup plugin accessors
            Object.defineProperty(system, name, {
                get: function() { return plugins.get(name); },
                enumerable: true,
                configurable: true
            });

            // Initialize plugin
            if (plugin.init) plugin.init(system);

            return this;
        };

        system.unregister = function(name) {
            var plugin = plugins.get(name);
            if (plugin && plugin.destroy) {
                plugin.destroy();
            }
            plugins.delete(name);
            delete system[name];
        };

        system.hook = function(name, callback) {
            if (!hooks.has(name)) hooks.set(name, []);
            hooks.get(name).push(callback);
        };

        system.trigger = function(name, ...args) {
            var callbacks = hooks.get(name) || [];
            return callbacks.map(function(callback) {
                return callback.apply(system, args);
            });
        };

        return system;
    }

    var pluginSys = createPluginSystem();
    var initCalls = [];

    pluginSys.register("logger", {
        init: function(system) {
            initCalls.push("logger");
            system.hook("log", function(message) {
                return "LOG: " + message;
            });
        },
        log: function(message) {
            return this.system.trigger("log", message);
        }
    });

    pluginSys.register("validator", {
        init: function(system) {
            initCalls.push("validator");
        },
        validate: function(data) {
            return data && typeof data === "object";
        }
    });

    if (pluginSys.plugins.length !== 2) throw new Error("Plugin registration count failed");
    if (!pluginSys.plugins.includes("logger")) throw new Error("Plugin list should include logger");
    if (initCalls.length !== 2) throw new Error("Plugin initialization failed");

    if (typeof pluginSys.logger !== "object") throw new Error("Plugin accessor failed");
    if (!pluginSys.validator.validate({})) throw new Error("Plugin method call failed");

    var logResults = pluginSys.trigger("log", "test message");
    if (logResults[0] !== "LOG: test message") throw new Error("Plugin hook system failed");

    pluginSys.unregister("logger");
    if (pluginSys.plugins.length !== 1) throw new Error("Plugin unregistration failed");
    if (pluginSys.logger !== undefined) throw new Error("Plugin accessor should be removed");
})();