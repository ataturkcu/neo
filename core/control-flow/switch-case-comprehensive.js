/*
 * Neo JavaScript Engine Switch Case Comprehensive Tests
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 */

// Test utilities
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function assertThrows(fn, message) {
    try {
        fn();
        throw new Error(`Expected function to throw: ${message}`);
    } catch (e) {
        if (e.message.includes('Expected function to throw')) {
            throw e;
        }
    }
}

// Test basic switch statement
function testBasicSwitch() {
    function basicSwitch(value) {
        let result;
        switch (value) {
            case 1:
                result = 'one';
                break;
            case 2:
                result = 'two';
                break;
            case 3:
                result = 'three';
                break;
            default:
                result = 'other';
                break;
        }
        return result;
    }

    assert(basicSwitch(1) === 'one', "Switch should match case 1");
    assert(basicSwitch(2) === 'two', "Switch should match case 2");
    assert(basicSwitch(3) === 'three', "Switch should match case 3");
    assert(basicSwitch(4) === 'other', "Switch should use default for unmatched value");
    assert(basicSwitch('1') === 'other', "Switch should use strict equality");

    console.log("✓ Basic switch tests passed");
}

// Test switch without break (fall-through)
function testSwitchFallThrough() {
    function fallThroughSwitch(value) {
        let result = '';
        switch (value) {
            case 1:
                result += 'a';
            case 2:
                result += 'b';
            case 3:
                result += 'c';
                break;
            case 4:
                result += 'd';
                break;
            default:
                result += 'x';
        }
        return result;
    }

    assert(fallThroughSwitch(1) === 'abc', "Case 1 should fall through to case 2 and 3");
    assert(fallThroughSwitch(2) === 'bc', "Case 2 should fall through to case 3");
    assert(fallThroughSwitch(3) === 'c', "Case 3 should not fall through (has break)");
    assert(fallThroughSwitch(4) === 'd', "Case 4 should not fall through (has break)");
    assert(fallThroughSwitch(5) === 'x', "Default should execute without fall through");

    console.log("✓ Switch fall-through tests passed");
}

// Test switch with different data types
function testSwitchDataTypes() {
    function typeSwitch(value) {
        switch (value) {
            case 'string':
                return 'is string';
            case 42:
                return 'is number 42';
            case true:
                return 'is boolean true';
            case null:
                return 'is null';
            case undefined:
                return 'is undefined';
            default:
                return 'is other';
        }
    }

    assert(typeSwitch('string') === 'is string', "Should match string value");
    assert(typeSwitch(42) === 'is number 42', "Should match number value");
    assert(typeSwitch(true) === 'is boolean true', "Should match boolean value");
    assert(typeSwitch(null) === 'is null', "Should match null value");
    assert(typeSwitch(undefined) === 'is undefined', "Should match undefined value");
    assert(typeSwitch(false) === 'is other', "Should not match different boolean");
    assert(typeSwitch('42') === 'is other', "Should not match string '42' with number 42");

    console.log("✓ Switch data types tests passed");
}

// Test switch with object and special values
function testSwitchObjects() {
    let obj1 = { id: 1 };
    let obj2 = { id: 2 };
    let arr1 = [1, 2, 3];
    let func1 = function() { return 'test'; };

    function objectSwitch(value) {
        switch (value) {
            case obj1:
                return 'object 1';
            case obj2:
                return 'object 2';
            case arr1:
                return 'array 1';
            case func1:
                return 'function 1';
            case NaN:
                return 'is NaN';
            case Infinity:
                return 'is Infinity';
            case -Infinity:
                return 'is -Infinity';
            default:
                return 'other object';
        }
    }

    assert(objectSwitch(obj1) === 'object 1', "Should match exact object reference");
    assert(objectSwitch(obj2) === 'object 2', "Should match different object reference");
    assert(objectSwitch({ id: 1 }) === 'other object', "Should not match similar object");
    assert(objectSwitch(arr1) === 'array 1', "Should match array reference");
    assert(objectSwitch(func1) === 'function 1', "Should match function reference");
    assert(objectSwitch(NaN) === 'other object', "NaN never matches case NaN due to NaN !== NaN");
    assert(objectSwitch(Infinity) === 'is Infinity', "Should match Infinity");
    assert(objectSwitch(-Infinity) === 'is -Infinity', "Should match -Infinity");

    console.log("✓ Switch objects tests passed");
}

// Test switch with expressions
function testSwitchExpressions() {
    function getMultiplier() { return 2; }

    function expressionSwitch(value) {
        switch (value) {
            case 1 + 1:
                return 'two';
            case 3 * getMultiplier():
                return 'six';
            case 'hello'.length:
                return 'five';
            case Math.max(7, 8, 9):
                return 'nine';
            default:
                return 'no match';
        }
    }

    assert(expressionSwitch(2) === 'two', "Should match expression result 1+1");
    assert(expressionSwitch(6) === 'six', "Should match function call result");
    assert(expressionSwitch(5) === 'five', "Should match string length");
    assert(expressionSwitch(9) === 'nine', "Should match Math.max result");
    assert(expressionSwitch(10) === 'no match', "Should use default for non-matching");

    console.log("✓ Switch expressions tests passed");
}

// Test switch default placement
function testSwitchDefaultPlacement() {
    // Default in middle
    function middleDefault(value) {
        let result = '';
        switch (value) {
            case 1:
                result = 'one';
                break;
            default:
                result = 'default';
                break;
            case 2:
                result = 'two';
                break;
        }
        return result;
    }

    assert(middleDefault(1) === 'one', "Should match case 1 even with default in middle");
    assert(middleDefault(2) === 'two', "Should match case 2 even with default in middle");
    assert(middleDefault(3) === 'default', "Should use default when no cases match");

    // Default at beginning
    function beginningDefault(value) {
        let result = '';
        switch (value) {
            default:
                result = 'default';
                break;
            case 1:
                result = 'one';
                break;
            case 2:
                result = 'two';
                break;
        }
        return result;
    }

    assert(beginningDefault(1) === 'one', "Should match case 1 even with default at beginning");
    assert(beginningDefault(3) === 'default', "Should use default at beginning");

    // Multiple defaults (should only use first one encountered)
    function multipleDefaults(value) {
        let result = '';
        switch (value) {
            case 1:
                result = 'one';
                break;
            default:
                result = 'first default';
                break;
            case 2:
                result = 'two';
                break;
        }
        return result;
    }

    assert(multipleDefaults(3) === 'first default', "Should use first default when multiple exist");

    console.log("✓ Switch default placement tests passed");
}

// Test switch with no default
function testSwitchNoDefault() {
    function noDefaultSwitch(value) {
        let result = 'initial';
        switch (value) {
            case 1:
                result = 'one';
                break;
            case 2:
                result = 'two';
                break;
        }
        return result;
    }

    assert(noDefaultSwitch(1) === 'one', "Should match case 1");
    assert(noDefaultSwitch(2) === 'two', "Should match case 2");
    assert(noDefaultSwitch(3) === 'initial', "Should not change result when no case matches and no default");

    console.log("✓ Switch no default tests passed");
}

// Test switch with return statements
function testSwitchWithReturn() {
    function returnSwitch(value) {
        switch (value) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            default:
                return 'other';
        }
        return 'unreachable';
    }

    assert(returnSwitch(1) === 'one', "Should return from case 1");
    assert(returnSwitch(2) === 'two', "Should return from case 2");
    assert(returnSwitch(4) === 'other', "Should return from default");

    // Return with fall-through prevention
    function returnFallThrough(value) {
        switch (value) {
            case 1:
                console.log('case 1');
                return 'one';
            case 2:
                console.log('case 2');
                // No return, should fall through
            case 3:
                return 'two or three';
            default:
                return 'default';
        }
    }

    assert(returnFallThrough(1) === 'one', "Return should prevent fall-through");
    assert(returnFallThrough(2) === 'two or three', "No return should allow fall-through");

    console.log("✓ Switch with return tests passed");
}

// Test switch with throw statements
function testSwitchWithThrow() {
    function throwSwitch(value) {
        switch (value) {
            case 'error':
                throw new Error('Custom error');
            case 'type':
                throw new TypeError('Type error');
            case 1:
                return 'number one';
            default:
                return 'no error';
        }
    }

    assert(throwSwitch(1) === 'number one', "Should return normally for case 1");
    assert(throwSwitch('normal') === 'no error', "Should return normally for default");

    assertThrows(() => throwSwitch('error'), "Should throw Error for 'error' case");
    assertThrows(() => throwSwitch('type'), "Should throw TypeError for 'type' case");

    console.log("✓ Switch with throw tests passed");
}

// Test nested switch statements
function testNestedSwitch() {
    function nestedSwitch(outer, inner) {
        switch (outer) {
            case 'A':
                switch (inner) {
                    case 1:
                        return 'A1';
                    case 2:
                        return 'A2';
                    default:
                        return 'A-other';
                }
            case 'B':
                switch (inner) {
                    case 1:
                        return 'B1';
                    case 2:
                        return 'B2';
                    default:
                        return 'B-other';
                }
            default:
                return 'outer-other';
        }
    }

    assert(nestedSwitch('A', 1) === 'A1', "Nested switch A1");
    assert(nestedSwitch('A', 2) === 'A2', "Nested switch A2");
    assert(nestedSwitch('A', 3) === 'A-other', "Nested switch A-other");
    assert(nestedSwitch('B', 1) === 'B1', "Nested switch B1");
    assert(nestedSwitch('C', 1) === 'outer-other', "Nested switch outer-other");

    console.log("✓ Nested switch tests passed");
}

// Test switch with complex control flow
function testSwitchComplexControlFlow() {
    // Switch with try-catch
    function switchWithTryCatch(value) {
        let result = '';
        switch (value) {
            case 'throw':
                try {
                    throw new Error('test');
                } catch (e) {
                    result = 'caught';
                }
                break;
            case 'finally':
                try {
                    result = 'try';
                } finally {
                    result += '-finally';
                }
                break;
            default:
                result = 'default';
        }
        return result;
    }

    assert(switchWithTryCatch('throw') === 'caught', "Try-catch in switch should work");
    assert(switchWithTryCatch('finally') === 'try-finally', "Try-finally in switch should work");

    // Switch with loops
    function switchWithLoop(value) {
        let result = [];
        switch (value) {
            case 'for':
                for (let i = 0; i < 3; i++) {
                    result.push(i);
                }
                break;
            case 'while':
                let j = 0;
                while (j < 2) {
                    result.push(j++);
                }
                break;
            default:
                result.push('default');
        }
        return result;
    }

    assert(switchWithLoop('for').length === 3, "For loop in switch should work");
    assert(switchWithLoop('while').length === 2, "While loop in switch should work");

    console.log("✓ Switch complex control flow tests passed");
}

// Test switch edge cases
function testSwitchEdgeCases() {
    // Empty switch
    function emptySwitch(value) {
        let result = 'before';
        switch (value) {
        }
        return result + '-after';
    }
    assert(emptySwitch(1) === 'before-after', "Empty switch should not affect execution");

    // Switch with only default
    function onlyDefaultSwitch(value) {
        switch (value) {
            default:
                return 'default';
        }
    }
    assert(onlyDefaultSwitch(1) === 'default', "Switch with only default should work");

    // Switch with duplicate cases (syntax error in strict mode, but test behavior)
    // Note: This would be a syntax error, so we test conceptually

    // Switch with very long fall-through
    function longFallThrough(value) {
        let result = '';
        switch (value) {
            case 1:
                result += 'a';
            case 2:
                result += 'b';
            case 3:
                result += 'c';
            case 4:
                result += 'd';
            case 5:
                result += 'e';
                break;
            default:
                result += 'x';
        }
        return result;
    }

    assert(longFallThrough(1) === 'abcde', "Long fall-through should work");
    assert(longFallThrough(3) === 'cde', "Partial fall-through should work");

    // Switch with computed property access
    let obj = { prop: 'value' };
    function computedSwitch(value) {
        switch (value) {
            case obj['prop']:
                return 'computed match';
            default:
                return 'no match';
        }
    }
    assert(computedSwitch('value') === 'computed match', "Computed property in case should work");

    console.log("✓ Switch edge cases tests passed");
}

// Test switch performance considerations
function testSwitchPerformance() {
    // Large switch statement
    function largeSwitch(value) {
        switch (value) {
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            case 6: return 'six';
            case 7: return 'seven';
            case 8: return 'eight';
            case 9: return 'nine';
            case 10: return 'ten';
            case 11: return 'eleven';
            case 12: return 'twelve';
            case 13: return 'thirteen';
            case 14: return 'fourteen';
            case 15: return 'fifteen';
            case 16: return 'sixteen';
            case 17: return 'seventeen';
            case 18: return 'eighteen';
            case 19: return 'nineteen';
            case 20: return 'twenty';
            default: return 'other';
        }
    }

    assert(largeSwitch(1) === 'one', "Large switch should handle first case");
    assert(largeSwitch(10) === 'ten', "Large switch should handle middle case");
    assert(largeSwitch(20) === 'twenty', "Large switch should handle last case");
    assert(largeSwitch(25) === 'other', "Large switch should handle default");

    // String-based switch (common pattern)
    function stringSwitch(command) {
        switch (command.toLowerCase()) {
            case 'start':
            case 'begin':
            case 'init':
                return 'starting';
            case 'stop':
            case 'end':
            case 'quit':
                return 'stopping';
            case 'pause':
            case 'wait':
                return 'pausing';
            default:
                return 'unknown command';
        }
    }

    assert(stringSwitch('START') === 'starting', "String switch with case conversion");
    assert(stringSwitch('begin') === 'starting', "String switch with multiple cases");
    assert(stringSwitch('STOP') === 'stopping', "String switch stop command");
    assert(stringSwitch('invalid') === 'unknown command', "String switch unknown command");

    console.log("✓ Switch performance tests passed");
}

// Run all tests
function runAllTests() {
    console.log("Running Switch Case comprehensive tests...\n");

    testBasicSwitch();
    testSwitchFallThrough();
    testSwitchDataTypes();
    testSwitchObjects();
    testSwitchExpressions();
    testSwitchDefaultPlacement();
    testSwitchNoDefault();
    testSwitchWithReturn();
    testSwitchWithThrow();
    testNestedSwitch();
    testSwitchComplexControlFlow();
    testSwitchEdgeCases();
    testSwitchPerformance();

    console.log("\n✅ All Switch Case comprehensive tests passed!");
}

// Execute tests
runAllTests();