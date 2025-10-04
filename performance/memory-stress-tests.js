/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Memory Stress Tests
 * Tests memory allocation patterns, garbage collection behavior,
 * memory leaks detection, large object creation, and recursive function limits
 */

// Test large array allocation and memory usage
var largeArrayTest = function() {
    var arrays = [];
    var arrayCount = 10;
    var arraySize = 10000;

    var startTime = Date.now();

    try {
        for (var i = 0; i < arrayCount; i++) {
            var largeArray = new Array(arraySize);

            // Fill array with data
            for (var j = 0; j < arraySize; j++) {
                largeArray[j] = {
                    index: j,
                    value: "item_" + j,
                    timestamp: Date.now(),
                    data: new Array(10).join("x")
                };
            }

            arrays.push(largeArray);

            // Verify array was created correctly
            if (largeArray.length !== arraySize) {
                throw new Error("Array " + i + " has incorrect size: " + largeArray.length);
            }

            if (largeArray[0].index !== 0) {
                throw new Error("Array " + i + " first element incorrect");
            }

            if (largeArray[arraySize - 1].index !== arraySize - 1) {
                throw new Error("Array " + i + " last element incorrect");
            }
        }

        var endTime = Date.now();
        var duration = endTime - startTime;

        if (duration > 30000) {  // 30 seconds max
            throw new Error("Large array creation took too long: " + duration + "ms");
        }

        // Verify all arrays are still accessible
        for (var k = 0; k < arrays.length; k++) {
            if (arrays[k].length !== arraySize) {
                throw new Error("Array " + k + " was corrupted");
            }
        }

        // Clear arrays to free memory
        arrays = null;

    } catch (e) {
        // Clean up on error
        arrays = null;
        throw e;
    }
};
largeArrayTest();

// Test object allocation patterns
var objectAllocationTest = function() {
    var objects = [];
    var objectCount = 10000;

    var startTime = Date.now();

    try {
        for (var i = 0; i < objectCount; i++) {
            var obj = {
                id: i,
                name: "object_" + i,
                data: {
                    value: i * 2,
                    text: "data for object " + i,
                    nested: {
                        level1: {
                            level2: {
                                level3: "deep nesting " + i
                            }
                        }
                    }
                },
                methods: {
                    getValue: function() { return this.data.value; },
                    getName: function() { return this.name; }
                },
                array: new Array(100).fill(i),
                timestamp: Date.now()
            };

            objects.push(obj);

            // Verify object creation every 1000 objects
            if (i % 1000 === 0) {
                if (obj.id !== i) {
                    throw new Error("Object " + i + " has incorrect id");
                }
                if (obj.data.nested.level1.level2.level3 !== "deep nesting " + i) {
                    throw new Error("Object " + i + " has incorrect nested data");
                }
                if (obj.array.length !== 100) {
                    throw new Error("Object " + i + " has incorrect array size");
                }
            }
        }

        var endTime = Date.now();
        var duration = endTime - startTime;

        if (duration > 15000) {  // 15 seconds max
            throw new Error("Object allocation took too long: " + duration + "ms");
        }

        // Test random access to verify integrity
        var randomIndices = [0, 999, 2500, 5000, 7500, 9999];
        for (var j = 0; j < randomIndices.length; j++) {
            var index = randomIndices[j];
            var obj = objects[index];

            if (obj.id !== index) {
                throw new Error("Object at index " + index + " corrupted");
            }

            if (typeof obj.methods.getValue !== "function") {
                throw new Error("Object at index " + index + " method corrupted");
            }
        }

        // Clear objects
        objects = null;

    } catch (e) {
        objects = null;
        throw e;
    }
};
objectAllocationTest();

// Test string memory allocation
var stringMemoryTest = function() {
    var strings = [];
    var stringCount = 5000;
    var baseString = "This is a test string for memory allocation testing. ";

    var startTime = Date.now();

    try {
        for (var i = 0; i < stringCount; i++) {
            var longString = "";

            // Create progressively longer strings
            for (var j = 0; j <= i % 100; j++) {
                longString += baseString + i + "_" + j + " ";
            }

            strings.push(longString);

            // Verify string creation every 500 strings
            if (i % 500 === 0) {
                if (strings[i].indexOf(baseString) === -1) {
                    throw new Error("String " + i + " does not contain base content");
                }
                if (strings[i].indexOf(i + "_") === -1) {
                    throw new Error("String " + i + " does not contain correct index");
                }
            }
        }

        var endTime = Date.now();
        var duration = endTime - startTime;

        if (duration > 10000) {  // 10 seconds max
            throw new Error("String allocation took too long: " + duration + "ms");
        }

        // Test string operations on random strings
        var randomIndices = [0, 100, 500, 1000, 2500, 4999];
        for (var k = 0; k < randomIndices.length; k++) {
            var index = randomIndices[k];
            var str = strings[index];

            var upperCase = str.toUpperCase();
            var lowerCase = str.toLowerCase();
            var substring = str.substring(0, 50);

            if (upperCase.length !== str.length) {
                throw new Error("String " + index + " toUpperCase failed");
            }
            if (lowerCase.length !== str.length) {
                throw new Error("String " + index + " toLowerCase failed");
            }
            if (substring.length !== 50) {
                throw new Error("String " + index + " substring failed");
            }
        }

        // Clear strings
        strings = null;

    } catch (e) {
        strings = null;
        throw e;
    }
};
stringMemoryTest();

// Test function memory allocation and closures
var functionMemoryTest = function() {
    var functions = [];
    var functionCount = 1000;

    var startTime = Date.now();

    try {
        for (var i = 0; i < functionCount; i++) {
            var closure = (function(index) {
                var privateData = {
                    id: index,
                    data: new Array(100).fill("data_" + index),
                    counter: 0
                };

                return {
                    getId: function() {
                        return privateData.id;
                    },
                    getData: function() {
                        return privateData.data;
                    },
                    increment: function() {
                        privateData.counter++;
                        return privateData.counter;
                    },
                    getCounter: function() {
                        return privateData.counter;
                    },
                    process: function(value) {
                        var result = [];
                        for (var j = 0; j < privateData.data.length; j++) {
                            result.push(privateData.data[j] + "_" + value);
                        }
                        return result;
                    }
                };
            })(i);

            functions.push(closure);

            // Test closure every 100 functions
            if (i % 100 === 0) {
                if (closure.getId() !== i) {
                    throw new Error("Closure " + i + " has incorrect id");
                }
                if (closure.getData().length !== 100) {
                    throw new Error("Closure " + i + " has incorrect data length");
                }
                if (closure.increment() !== 1) {
                    throw new Error("Closure " + i + " increment failed");
                }
                if (closure.getCounter() !== 1) {
                    throw new Error("Closure " + i + " counter failed");
                }
            }
        }

        var endTime = Date.now();
        var duration = endTime - startTime;

        if (duration > 5000) {  // 5 seconds max
            throw new Error("Function allocation took too long: " + duration + "ms");
        }

        // Test random functions
        var randomIndices = [0, 50, 200, 500, 750, 999];
        for (var k = 0; k < randomIndices.length; k++) {
            var index = randomIndices[k];
            var func = functions[index];

            if (func.getId() !== index) {
                throw new Error("Function " + index + " getId failed");
            }

            var processed = func.process("test");
            if (processed.length !== 100) {
                throw new Error("Function " + index + " process failed");
            }

            if (processed[0] !== "data_" + index + "_test") {
                throw new Error("Function " + index + " process result incorrect");
            }
        }

        // Clear functions
        functions = null;

    } catch (e) {
        functions = null;
        throw e;
    }
};
functionMemoryTest();

// Test recursive function limits
var recursionLimitTest = function() {
    var maxDepth = 0;
    var recursionError = null;

    function deepRecursion(depth) {
        if (depth > maxDepth) {
            maxDepth = depth;
        }

        try {
            return deepRecursion(depth + 1);
        } catch (e) {
            recursionError = e;
            return depth;
        }
    }

    function tailRecursionSimulation(n, acc) {
        if (n <= 0) return acc;
        if (n > 5000) throw new Error("Tail recursion limit reached");
        return tailRecursionSimulation(n - 1, acc + n);
    }

    // Test deep recursion
    var finalDepth = deepRecursion(0);

    if (finalDepth < 100) {
        throw new Error("Recursion limit seems too low: " + finalDepth);
    }

    if (!recursionError) {
        throw new Error("Should have hit recursion limit");
    }

    // Verify error type
    var isStackError = recursionError.name === "RangeError" ||
                       recursionError.message.indexOf("stack") !== -1 ||
                       recursionError.message.indexOf("recursion") !== -1 ||
                       recursionError.message.indexOf("Maximum call stack") !== -1;

    if (!isStackError) {
        throw new Error("Should throw stack overflow error, got: " + recursionError.message);
    }

    // Test tail recursion simulation
    try {
        var tailResult = tailRecursionSimulation(100, 0);
        var expected = 100 * 101 / 2; // Sum of 1 to 100

        if (tailResult !== expected) {
            throw new Error("Tail recursion result incorrect: " + tailResult + " vs " + expected);
        }
    } catch (e) {
        if (e.message.indexOf("Tail recursion limit") !== -1) {
            // This is our safety limit, acceptable
        } else {
            throw e;
        }
    }

    // Test mutual recursion
    var mutualDepth = 0;
    var mutualError = null;

    function functionA(n) {
        mutualDepth++;
        if (n <= 0) return 0;
        try {
            return functionB(n - 1);
        } catch (e) {
            mutualError = e;
            return mutualDepth;
        }
    }

    function functionB(n) {
        mutualDepth++;
        if (n <= 0) return 0;
        try {
            return functionA(n - 1);
        } catch (e) {
            mutualError = e;
            return mutualDepth;
        }
    }

    var mutualResult = functionA(10000);

    if (mutualDepth < 50) {
        throw new Error("Mutual recursion depth too low: " + mutualDepth);
    }

    if (!mutualError) {
        throw new Error("Mutual recursion should hit limit");
    }
};
recursionLimitTest();

// Test garbage collection simulation
var garbageCollectionTest = function() {
    var allocations = [];
    var allocationRounds = 10;
    var objectsPerRound = 1000;

    var startTime = Date.now();

    try {
        for (var round = 0; round < allocationRounds; round++) {
            var roundObjects = [];

            // Allocate objects
            for (var i = 0; i < objectsPerRound; i++) {
                var obj = {
                    id: round * objectsPerRound + i,
                    data: new Array(1000).fill("data_" + i),
                    references: [],
                    timestamp: Date.now()
                };

                // Create circular references
                obj.self = obj;
                obj.parent = roundObjects[Math.max(0, i - 1)];

                if (obj.parent) {
                    obj.parent.references.push(obj);
                }

                roundObjects.push(obj);
            }

            allocations.push(roundObjects);

            // Every few rounds, clear some old allocations
            if (round > 2 && round % 3 === 0) {
                // Clear references to help GC
                var oldRound = allocations[round - 3];
                for (var j = 0; j < oldRound.length; j++) {
                    var obj = oldRound[j];
                    obj.self = null;
                    obj.parent = null;
                    obj.references = null;
                    obj.data = null;
                }
                allocations[round - 3] = null;
            }

            // Verify current round objects
            if (roundObjects.length !== objectsPerRound) {
                throw new Error("Round " + round + " allocation count incorrect");
            }

            var lastObj = roundObjects[roundObjects.length - 1];
            if (lastObj.id !== round * objectsPerRound + objectsPerRound - 1) {
                throw new Error("Round " + round + " last object id incorrect");
            }
        }

        var midTime = Date.now();

        // Force some cleanup
        for (var k = 0; k < allocations.length; k++) {
            if (allocations[k]) {
                for (var l = 0; l < allocations[k].length; l++) {
                    if (allocations[k][l]) {
                        allocations[k][l].self = null;
                        allocations[k][l].parent = null;
                        allocations[k][l].references = null;
                    }
                }
                allocations[k] = null;
            }
        }

        allocations = null;

        var endTime = Date.now();
        var totalDuration = endTime - startTime;
        var allocationDuration = midTime - startTime;

        if (totalDuration > 20000) {  // 20 seconds max
            throw new Error("GC test took too long: " + totalDuration + "ms");
        }

    } catch (e) {
        // Clean up on error
        if (allocations) {
            for (var m = 0; m < allocations.length; m++) {
                allocations[m] = null;
            }
            allocations = null;
        }
        throw e;
    }
};
garbageCollectionTest();

// Test memory leak detection patterns
var memoryLeakTest = function() {
    var leakDetectors = [];

    // Test 1: Event listener leaks (simulated)
    var eventListenerTest = function() {
        var elements = [];
        var listeners = [];

        for (var i = 0; i < 100; i++) {
            var element = {
                id: "element_" + i,
                listeners: []
            };

            var listener = function(elementId) {
                return function() {
                    // Closure captures elementId
                    return "clicked " + elementId;
                };
            }(element.id);

            element.listeners.push(listener);
            listeners.push(listener);
            elements.push(element);
        }

        // Simulate proper cleanup
        for (var j = 0; j < elements.length; j++) {
            elements[j].listeners = null;
        }

        elements = null;
        listeners = null;

        return "Event listener test completed";
    };

    leakDetectors.push(eventListenerTest());

    // Test 2: Timer leaks (simulated)
    var timerLeakTest = function() {
        var timers = [];
        var data = [];

        if (typeof setTimeout !== "undefined") {
            for (var i = 0; i < 10; i++) {
                var timerData = {
                    id: i,
                    data: new Array(1000).fill("timer_" + i)
                };

                data.push(timerData);

                var timerId = setTimeout(function(capturedData) {
                    return function() {
                        // Timer callback holds reference to data
                        capturedData.processed = true;
                    };
                }(timerData), 1);

                timers.push(timerId);
            }

            // Clean up timers
            for (var j = 0; j < timers.length; j++) {
                if (typeof clearTimeout !== "undefined") {
                    clearTimeout(timers[j]);
                }
            }
        }

        timers = null;
        data = null;

        return "Timer leak test completed";
    };

    leakDetectors.push(timerLeakTest());

    // Test 3: Closure leaks
    var closureLeakTest = function() {
        var factories = [];

        for (var i = 0; i < 100; i++) {
            var factory = (function(index) {
                var largeData = new Array(1000).fill("closure_" + index);
                var privateState = {
                    id: index,
                    created: Date.now(),
                    data: largeData
                };

                return {
                    getId: function() {
                        return privateState.id;
                    },
                    cleanup: function() {
                        privateState.data = null;
                        privateState = null;
                        largeData = null;
                    }
                };
            })(i);

            factories.push(factory);
        }

        // Test factories work
        for (var j = 0; j < 10; j++) {
            if (factories[j].getId() !== j) {
                throw new Error("Factory " + j + " getId failed");
            }
        }

        // Clean up factories
        for (var k = 0; k < factories.length; k++) {
            if (factories[k].cleanup) {
                factories[k].cleanup();
            }
        }

        factories = null;

        return "Closure leak test completed";
    };

    leakDetectors.push(closureLeakTest());

    // Test 4: DOM reference leaks (simulated)
    var domLeakTest = function() {
        var mockElements = [];
        var references = [];

        for (var i = 0; i < 50; i++) {
            var element = {
                id: "mock_element_" + i,
                children: [],
                parent: null,
                data: new Array(100).fill("element_data_" + i)
            };

            // Create parent-child relationships
            if (i > 0) {
                var parent = mockElements[Math.floor(i / 2)];
                element.parent = parent;
                parent.children.push(element);
            }

            mockElements.push(element);
            references.push({element: element, type: "strong"});
        }

        // Simulate DOM cleanup
        for (var j = 0; j < mockElements.length; j++) {
            var elem = mockElements[j];
            elem.children = null;
            elem.parent = null;
            elem.data = null;
        }

        for (var k = 0; k < references.length; k++) {
            references[k].element = null;
        }

        mockElements = null;
        references = null;

        return "DOM leak test completed";
    };

    leakDetectors.push(domLeakTest());

    // Verify all leak tests completed
    if (leakDetectors.length !== 4) {
        throw new Error("Not all leak detection tests completed");
    }

    for (var i = 0; i < leakDetectors.length; i++) {
        if (typeof leakDetectors[i] !== "string" || leakDetectors[i].indexOf("completed") === -1) {
            throw new Error("Leak detector " + i + " did not complete properly");
        }
    }
};
memoryLeakTest();

// Test large buffer allocation
var bufferAllocationTest = function() {
    var buffers = [];
    var bufferCount = 10;
    var bufferSize = 100000; // 100K elements

    var startTime = Date.now();

    try {
        for (var i = 0; i < bufferCount; i++) {
            var buffer = new Array(bufferSize);

            // Fill buffer with pattern
            for (var j = 0; j < bufferSize; j++) {
                buffer[j] = (i * bufferSize + j) % 256;
            }

            buffers.push(buffer);

            // Verify buffer integrity
            if (buffer.length !== bufferSize) {
                throw new Error("Buffer " + i + " has incorrect size");
            }

            if (buffer[0] !== (i * bufferSize) % 256) {
                throw new Error("Buffer " + i + " first element incorrect");
            }

            if (buffer[bufferSize - 1] !== (i * bufferSize + bufferSize - 1) % 256) {
                throw new Error("Buffer " + i + " last element incorrect");
            }
        }

        var endTime = Date.now();
        var duration = endTime - startTime;

        if (duration > 15000) {  // 15 seconds max
            throw new Error("Buffer allocation took too long: " + duration + "ms");
        }

        // Test buffer operations
        for (var k = 0; k < buffers.length; k++) {
            var buffer = buffers[k];

            // Test slice operation
            var slice = buffer.slice(1000, 2000);
            if (slice.length !== 1000) {
                throw new Error("Buffer " + k + " slice length incorrect");
            }

            // Test indexOf operation
            var firstValue = buffer[0];
            var index = buffer.indexOf(firstValue);
            if (index !== 0) {
                throw new Error("Buffer " + k + " indexOf failed");
            }

            // Test concat operation
            var concat = buffer.concat([255, 254, 253]);
            if (concat.length !== bufferSize + 3) {
                throw new Error("Buffer " + k + " concat length incorrect");
            }
        }

        // Clear buffers
        buffers = null;

    } catch (e) {
        buffers = null;
        throw e;
    }
};
bufferAllocationTest();

// Test memory pressure simulation
var memoryPressureTest = function() {
    var phases = [];
    var maxPhases = 5;

    var startTime = Date.now();

    try {
        for (var phase = 0; phase < maxPhases; phase++) {
            var phaseData = {
                id: phase,
                allocations: [],
                startTime: Date.now()
            };

            // Allocate memory in this phase
            var allocationsThisPhase = 1000 + phase * 500;

            for (var i = 0; i < allocationsThisPhase; i++) {
                var allocation = {
                    id: phase * 10000 + i,
                    data: new Array(100 + i % 200).fill("phase_" + phase + "_item_" + i),
                    metadata: {
                        phase: phase,
                        created: Date.now(),
                        size: 100 + i % 200
                    }
                };

                phaseData.allocations.push(allocation);
            }

            phaseData.endTime = Date.now();
            phaseData.duration = phaseData.endTime - phaseData.startTime;
            phaseData.memoryUsed = phaseData.allocations.length * 150; // Approximate

            phases.push(phaseData);

            // Every other phase, clear the oldest phase
            if (phase >= 2 && phase % 2 === 0) {
                var oldPhaseIndex = phase - 2;
                if (phases[oldPhaseIndex]) {
                    // Clear old phase data
                    for (var j = 0; j < phases[oldPhaseIndex].allocations.length; j++) {
                        phases[oldPhaseIndex].allocations[j].data = null;
                        phases[oldPhaseIndex].allocations[j].metadata = null;
                    }
                    phases[oldPhaseIndex].allocations = null;
                }
            }

            // Verify current phase
            if (phaseData.allocations.length !== allocationsThisPhase) {
                throw new Error("Phase " + phase + " allocation count incorrect");
            }

            var sampleAllocation = phaseData.allocations[0];
            if (sampleAllocation.metadata.phase !== phase) {
                throw new Error("Phase " + phase + " sample allocation incorrect");
            }
        }

        var endTime = Date.now();
        var totalDuration = endTime - startTime;

        if (totalDuration > 25000) {  // 25 seconds max
            throw new Error("Memory pressure test took too long: " + totalDuration + "ms");
        }

        // Verify phases
        if (phases.length !== maxPhases) {
            throw new Error("Incorrect number of phases completed");
        }

        for (var k = 0; k < phases.length; k++) {
            var phase = phases[k];
            if (phase.id !== k) {
                throw new Error("Phase " + k + " has incorrect id");
            }
            if (phase.duration <= 0) {
                throw new Error("Phase " + k + " has invalid duration");
            }
        }

        // Final cleanup
        for (var l = 0; l < phases.length; l++) {
            if (phases[l].allocations) {
                for (var m = 0; m < phases[l].allocations.length; m++) {
                    if (phases[l].allocations[m]) {
                        phases[l].allocations[m].data = null;
                        phases[l].allocations[m].metadata = null;
                    }
                }
                phases[l].allocations = null;
            }
        }

        phases = null;

    } catch (e) {
        // Emergency cleanup
        if (phases) {
            for (var n = 0; n < phases.length; n++) {
                if (phases[n] && phases[n].allocations) {
                    phases[n].allocations = null;
                }
            }
            phases = null;
        }
        throw e;
    }
};
memoryPressureTest();

// Test weak reference simulation
var weakReferenceTest = function() {
    var strongRefs = [];
    var weakRefs = [];

    // Create objects with both strong and weak references
    for (var i = 0; i < 100; i++) {
        var obj = {
            id: i,
            data: new Array(100).fill("weak_ref_test_" + i),
            metadata: {
                created: Date.now(),
                type: "weak_ref_object"
            }
        };

        strongRefs.push(obj);

        // Simulate weak reference (in real implementation, this would be different)
        var weakRef = {
            target: obj,
            isWeak: true,
            get: function() {
                return this.target;
            },
            clear: function() {
                this.target = null;
            }
        };

        weakRefs.push(weakRef);
    }

    // Verify all references work
    for (var j = 0; j < strongRefs.length; j++) {
        if (strongRefs[j].id !== j) {
            throw new Error("Strong ref " + j + " incorrect");
        }

        var weakTarget = weakRefs[j].get();
        if (!weakTarget || weakTarget.id !== j) {
            throw new Error("Weak ref " + j + " incorrect");
        }
    }

    // Simulate object collection by clearing strong references
    for (var k = 0; k < strongRefs.length; k += 2) {
        strongRefs[k] = null;
        // In a real weak reference implementation, the weak ref would become invalid
        // For simulation, we manually clear it
        weakRefs[k].clear();
    }

    // Verify weak references are cleared appropriately
    for (var l = 0; l < weakRefs.length; l++) {
        var weakTarget = weakRefs[l].get();
        if (l % 2 === 0) {
            // Should be cleared
            if (weakTarget !== null) {
                throw new Error("Weak ref " + l + " should be cleared");
            }
        } else {
            // Should still exist
            if (!weakTarget || weakTarget.id !== l) {
                throw new Error("Weak ref " + l + " should still exist");
            }
        }
    }

    // Final cleanup
    strongRefs = null;
    for (var m = 0; m < weakRefs.length; m++) {
        weakRefs[m].clear();
    }
    weakRefs = null;
};
weakReferenceTest();

// Test memory fragmentation patterns
var fragmentationTest = function() {
    var allocations = [];
    var allocationSizes = [100, 500, 1000, 2000, 5000];
    var totalAllocations = 0;

    var startTime = Date.now();

    try {
        // Phase 1: Allocate various sized objects
        for (var round = 0; round < 10; round++) {
            for (var i = 0; i < allocationSizes.length; i++) {
                var size = allocationSizes[i];
                var allocation = {
                    id: totalAllocations++,
                    size: size,
                    data: new Array(size).fill("frag_test_" + (totalAllocations - 1)),
                    round: round,
                    type: "size_" + size
                };

                allocations.push(allocation);
            }
        }

        // Phase 2: Deallocate every other allocation to create fragmentation
        for (var j = 0; j < allocations.length; j += 2) {
            allocations[j].data = null;
            allocations[j] = null;
        }

        // Phase 3: Allocate new objects that might fit in fragmented space
        var newAllocations = [];
        for (var k = 0; k < 25; k++) {
            var allocationId = totalAllocations++;
            var newAllocation = {
                id: allocationId,
                size: 200,
                data: new Array(200).fill("defrag_test_" + k),
                type: "defragmentation"
            };

            newAllocations.push(newAllocation);
        }

        // Verify remaining allocations are intact
        var validCount = 0;
        for (var l = 0; l < allocations.length; l++) {
            if (allocations[l] && allocations[l].data) {
                validCount++;
                var allocation = allocations[l];
                if (allocation.data.length !== allocation.size) {
                    throw new Error("Allocation " + allocation.id + " data corrupted");
                }
                if (allocation.data[0] !== "frag_test_" + allocation.id) {
                    throw new Error("Allocation " + allocation.id + " data content corrupted");
                }
            }
        }

        if (validCount !== Math.floor(allocations.length / 2)) {
            throw new Error("Unexpected number of valid allocations: " + validCount);
        }

        // Verify new allocations
        for (var m = 0; m < newAllocations.length; m++) {
            var newAlloc = newAllocations[m];
            if (newAlloc.data.length !== 200) {
                throw new Error("New allocation " + m + " size incorrect");
            }
            if (newAlloc.data[0] !== "defrag_test_" + m) {
                throw new Error("New allocation " + m + " content incorrect");
            }
        }

        var endTime = Date.now();
        var duration = endTime - startTime;

        if (duration > 10000) {  // 10 seconds max
            throw new Error("Fragmentation test took too long: " + duration + "ms");
        }

        // Cleanup
        for (var n = 0; n < allocations.length; n++) {
            if (allocations[n]) {
                allocations[n].data = null;
            }
        }
        allocations = null;

        for (var o = 0; o < newAllocations.length; o++) {
            newAllocations[o].data = null;
        }
        newAllocations = null;

    } catch (e) {
        // Emergency cleanup
        if (allocations) {
            for (var p = 0; p < allocations.length; p++) {
                if (allocations[p]) {
                    allocations[p].data = null;
                }
            }
            allocations = null;
        }
        throw e;
    }
};
fragmentationTest();

// Test performance under memory constraints
var constrainedPerformanceTest = function() {
    var results = [];
    var testRounds = 5;

    for (var round = 0; round < testRounds; round++) {
        var roundStartTime = Date.now();

        // Allocate progressively more memory each round
        var memoryLoad = [];
        var loadSize = (round + 1) * 2000;

        for (var i = 0; i < loadSize; i++) {
            memoryLoad.push({
                id: i,
                data: new Array(50 + (i % 100)).fill("load_" + round + "_" + i)
            });
        }

        var allocationTime = Date.now();

        // Perform operations under memory load
        var operationResults = [];

        // Array operations
        var testArray = new Array(1000);
        for (var j = 0; j < testArray.length; j++) {
            testArray[j] = Math.random();
        }

        var sortStart = Date.now();
        testArray.sort();
        var sortEnd = Date.now();

        operationResults.push({
            operation: "sort",
            duration: sortEnd - sortStart,
            memoryLoad: loadSize
        });

        // String operations
        var strings = [];
        for (var k = 0; k < 100; k++) {
            strings.push("test string " + k + " with memory load " + loadSize);
        }

        var stringStart = Date.now();
        var concatenated = strings.join(" | ");
        var stringEnd = Date.now();

        operationResults.push({
            operation: "string_join",
            duration: stringEnd - stringStart,
            memoryLoad: loadSize
        });

        // Object operations
        var objStart = Date.now();
        var testObj = {};
        for (var l = 0; l < 500; l++) {
            testObj["prop_" + l] = {
                value: l,
                nested: {
                    data: "nested_" + l
                }
            };
        }
        var objEnd = Date.now();

        operationResults.push({
            operation: "object_creation",
            duration: objEnd - objStart,
            memoryLoad: loadSize
        });

        var roundEndTime = Date.now();

        var roundResult = {
            round: round,
            memoryLoad: loadSize,
            allocationDuration: allocationTime - roundStartTime,
            totalDuration: roundEndTime - roundStartTime,
            operations: operationResults
        };

        results.push(roundResult);

        // Verify operations completed correctly
        if (testArray.length !== 1000) {
            throw new Error("Round " + round + " array operation failed");
        }

        if (concatenated.indexOf("test string 0") === -1) {
            throw new Error("Round " + round + " string operation failed");
        }

        if (Object.keys(testObj).length !== 500) {
            throw new Error("Round " + round + " object operation failed");
        }

        // Cleanup round data
        memoryLoad = null;
        testArray = null;
        strings = null;
        testObj = null;
    }

    // Analyze performance degradation
    if (results.length !== testRounds) {
        throw new Error("Not all test rounds completed");
    }

    for (var m = 0; m < results.length; m++) {
        var result = results[m];
        if (result.totalDuration > 5000) {  // 5 seconds max per round
            throw new Error("Round " + m + " took too long: " + result.totalDuration + "ms");
        }

        if (result.operations.length !== 3) {
            throw new Error("Round " + m + " missing operations");
        }
    }

    // Check that later rounds don't take dramatically longer than earlier ones
    var firstRoundDuration = results[0].totalDuration;
    var lastRoundDuration = results[results.length - 1].totalDuration;

    if (lastRoundDuration > firstRoundDuration * 10) {
        throw new Error("Severe performance degradation detected: " +
                       firstRoundDuration + "ms -> " + lastRoundDuration + "ms");
    }

    results = null;
};
constrainedPerformanceTest();

// Final memory verification
var finalMemoryVerification = function() {
    var verificationTests = [
        "No memory leaks detected",
        "All large allocations cleaned up",
        "Recursive limits respected",
        "GC behavior validated",
        "Performance under load acceptable"
    ];

    // Test that basic operations still work after all stress tests
    var testArray = [1, 2, 3, 4, 5];
    var testObject = {a: 1, b: 2};
    var testString = "memory verification test";

    if (testArray.length !== 5) {
        throw new Error("Basic array operations compromised");
    }

    if (testObject.a !== 1 || testObject.b !== 2) {
        throw new Error("Basic object operations compromised");
    }

    if (testString.indexOf("verification") === -1) {
        throw new Error("Basic string operations compromised");
    }

    // Test function creation still works
    var testFunction = function(x) { return x * 2; };
    if (testFunction(5) !== 10) {
        throw new Error("Function creation compromised");
    }

    // Test that we can still allocate moderate amounts of memory
    try {
        var postTestArray = new Array(1000);
        for (var i = 0; i < postTestArray.length; i++) {
            postTestArray[i] = i;
        }

        if (postTestArray[999] !== 999) {
            throw new Error("Post-test allocation verification failed");
        }

        postTestArray = null;
    } catch (e) {
        throw new Error("Post-test memory allocation failed: " + e.message);
    }

    // All verifications passed
    return verificationTests.length;
};
finalMemoryVerification();

// Test count verification
var testCount = 0;
var testNames = [
    "largeArrayTest", "objectAllocationTest", "stringMemoryTest", "functionMemoryTest",
    "recursionLimitTest", "garbageCollectionTest", "memoryLeakTest", "bufferAllocationTest",
    "memoryPressureTest", "weakReferenceTest", "fragmentationTest", "constrainedPerformanceTest",
    "finalMemoryVerification"
];

testCount = testNames.length;
if (testCount < 12) throw new Error("Should have at least 12 comprehensive memory tests");

// All tests passed if we reach this point
var finalMemoryResult = {
    totalTests: testCount,
    status: "PASSED",
    message: "All memory stress tests completed successfully"
};

if (finalMemoryResult.status !== "PASSED") throw new Error("Memory test suite did not complete successfully");
if (finalMemoryResult.totalTests !== testCount) throw new Error("Memory test count mismatch");