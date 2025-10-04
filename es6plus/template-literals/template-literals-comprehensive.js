/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Template Literals, Tagged Templates, and Expression Evaluation
 */

// Test 1-10: Basic template literal syntax
var basic = `Hello, World!`;
if (basic !== 'Hello, World!') throw new Error("Basic template literal should work");

var empty = ``;
if (empty !== '') throw new Error("Empty template literal should work");

var multiline = `Line 1
Line 2
Line 3`;
if (multiline.split('\n').length !== 3) throw new Error("Multiline template literals should preserve newlines");

var withTab = `Tab\there`;
if (withTab.indexOf('\t') === -1) throw new Error("Template literals should handle tab characters");

var withBackslash = `Backslash\\here`;
if (withBackslash !== 'Backslash\\here') throw new Error("Template literals should handle backslashes");

var withQuotes = `Single 'quotes' and double "quotes"`;
if (withQuotes !== `Single 'quotes' and double "quotes"`) throw new Error("Template literals should handle quotes");

var withBacktick = `Backtick \`here\``;
if (withBacktick !== 'Backtick `here`') throw new Error("Template literals should handle escaped backticks");

var unicode = `Unicode \u{1F4A9} here`;
if (unicode.length < 10) throw new Error("Template literals should handle Unicode escapes");

var hex = `Hex \x41 here`;
if (hex.indexOf('A') === -1) throw new Error("Template literals should handle hex escapes");

// Note: Octal escapes are not allowed in template literals (ES6 spec)
// Use Unicode escape instead
var octalEquivalent = `Unicode \u0041 here`;
if (octalEquivalent.indexOf('A') === -1) throw new Error("Template literals should handle Unicode escapes");

// Test 11-20: Expression interpolation
var name = 'World';
var greeting = `Hello, ${name}!`;
if (greeting !== 'Hello, World!') throw new Error("Basic expression interpolation should work");

var x = 5;
var y = 10;
var math = `${x} + ${y} = ${x + y}`;
if (math !== '5 + 10 = 15') throw new Error("Mathematical expressions should work");

var obj = { prop: 'value', method: function() { return 'method-result'; } };
var objAccess = `Property: ${obj.prop}, Method: ${obj.method()}`;
if (objAccess !== 'Property: value, Method: method-result') throw new Error("Object access should work");

var arr = [1, 2, 3];
var arrayAccess = `Array: [${arr.join(', ')}], Length: ${arr.length}`;
if (arrayAccess !== 'Array: [1, 2, 3], Length: 3') throw new Error("Array access should work");

var nested = `Outer ${`inner ${1 + 1}`} end`;
if (nested !== 'Outer inner 2 end') throw new Error("Nested template literals should work");

var conditional = `Result: ${x > y ? 'greater' : 'smaller'}`;
if (conditional !== 'Result: smaller') throw new Error("Conditional expressions should work");

var fnCall = `Function: ${(function(a, b) { return a * b; })(3, 4)}`;
if (fnCall !== 'Function: 12') throw new Error("Function calls should work");

var typeofExpr = `Type: ${typeof x}`;
if (typeofExpr !== 'Type: number') throw new Error("typeof expressions should work");

var thisContext = {
    value: 'context',
    getTemplate: function() {
        return `This: ${this.value}`;
    }
};
if (thisContext.getTemplate() !== 'This: context') throw new Error("this context should work in expressions");

var complexExpr = `Complex: ${x * y + arr.length - obj.prop.length}`;
if (complexExpr !== 'Complex: 48') throw new Error("Complex expressions should work");

// Test 21-30: Tagged template literals
function basicTag(strings, ...values) {
    return strings[0] + values[0] + strings[1];
}

var tagged1 = basicTag`Hello ${name}!`;
if (tagged1 !== 'Hello World!') throw new Error("Basic tagged template should work");

function reverseTag(strings, ...values) {
    var result = '';
    for (var i = values.length - 1; i >= 0; i--) {
        result += values[i] + strings[i];
    }
    result += strings[strings.length - 1];
    return result;
}

var tagged2 = reverseTag`First ${1} Second ${2} Third`;
if (tagged2 !== '2 Second 1First  Third') throw new Error("Reverse tagged template should work");

function countTag(strings, ...values) {
    return `Strings: ${strings.length}, Values: ${values.length}`;
}

var tagged3 = countTag`A ${1} B ${2} C ${3} D`;
if (tagged3 !== 'Strings: 4, Values: 3') throw new Error("Count tagged template should work");

function joinTag(strings, ...values) {
    return strings.reduce(function(result, string, i) {
        return result + string + (values[i] || '');
    }, '');
}

var tagged4 = joinTag`Join ${1} and ${2} together`;
if (tagged4 !== 'Join 1 and 2 together') throw new Error("Join tagged template should work");

function uppercaseTag(strings, ...values) {
    return strings.map(function(str, i) {
        var value = values[i];
        if (typeof value === 'string') {
            value = value.toUpperCase();
        }
        return str + (value || '');
    }).join('');
}

var tagged5 = uppercaseTag`Convert ${'hello'} to uppercase`;
if (tagged5 !== 'Convert HELLO to uppercase') throw new Error("Uppercase tagged template should work");

function conditionalTag(strings, ...values) {
    return strings.map(function(str, i) {
        var value = values[i];
        if (value === undefined || value === null) {
            value = '[empty]';
        }
        return str + (value || '');
    }).join('');
}

var tagged6 = conditionalTag`Value: ${null} and ${undefined}`;
if (tagged6 !== 'Value: [empty] and [empty][empty]') throw new Error("Conditional tagged template should work");

function htmlTag(strings, ...values) {
    return strings.map(function(str, i) {
        var value = values[i];
        if (typeof value === 'string') {
            value = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return str + (value || '');
    }).join('');
}

var tagged7 = htmlTag`HTML: ${'<script>alert("xss")</script>'}`;
if (tagged7.indexOf('&lt;script&gt;') === -1) throw new Error("HTML escape tagged template should work");

function debugTag(strings, ...values) {
    return {
        strings: strings,
        values: values,
        raw: strings.raw
    };
}

var tagged8 = debugTag`Debug ${42} test`;
if (tagged8.strings.length !== 2 || tagged8.values[0] !== 42) throw new Error("Debug tagged template should work");

// Test 31-40: String.raw functionality
var rawBasic = String.raw`Raw \n string`;
if (rawBasic !== 'Raw \\n string') throw new Error("String.raw should preserve escape sequences");

var rawPath = String.raw`C:\Users\Name\Documents`;
if (rawPath !== 'C:\\Users\\Name\\Documents') throw new Error("String.raw should handle backslashes");

var rawWithInterpolation = String.raw`Path: ${name}\folder`;
if (rawWithInterpolation !== 'Path: World\\folder') throw new Error("String.raw should work with interpolation");

var rawMultiline = String.raw`Line 1\nLine 2
Actual newline`;
if (rawMultiline.split('\n').length !== 2) throw new Error("String.raw should preserve actual newlines but escape \\n");

var rawUnicode = String.raw`Unicode \u{1F600}`;
if (rawUnicode.indexOf('\\u{1F600}') === -1) throw new Error("String.raw should preserve Unicode escapes");

var rawTab = String.raw`Tab \t here`;
if (rawTab !== 'Tab \\t here') throw new Error("String.raw should preserve tab escapes");

var rawHex = String.raw`Hex \x41 here`;
if (rawHex !== 'Hex \\x41 here') throw new Error("String.raw should preserve hex escapes");

var rawBacktick = String.raw`Backtick \` here`;
if (rawBacktick !== 'Backtick \\` here') throw new Error("String.raw should handle escaped backticks");

// Custom raw tag function
function customRaw(strings, ...values) {
    return strings.raw.map(function(str, i) {
        return str + (values[i] || '');
    }).join('');
}

var customRawResult = customRaw`Custom \n raw ${1+1} test`;
if (customRawResult !== 'Custom \\n raw 2 test') throw new Error("Custom raw tag should work");

var rawEmpty = String.raw``;
if (rawEmpty !== '') throw new Error("String.raw should handle empty templates");

// Test 41-50: Advanced expression evaluation
var counter = 0;
function increment() {
    return ++counter;
}

var sideEffect = `Count: ${increment()}, Count: ${increment()}`;
if (sideEffect !== 'Count: 1, Count: 2') throw new Error("Side effects should work in expressions");

var asyncValue = 'async';
var promiseExpr = `Promise: ${Promise.resolve(asyncValue)}`;
if (promiseExpr.indexOf('[object Promise]') === -1) throw new Error("Promise objects should be stringified");

var errorExpr;
try {
    errorExpr = `Error: ${(function() { throw new Error('test'); })()}`;
    throw new Error("Should throw error from expression");
} catch (e) {
    if (e.message !== 'test') throw new Error("Errors in expressions should propagate");
}

var regexExpr = `Regex: ${/test/.test('testing')}`;
if (regexExpr !== 'Regex: true') throw new Error("Regex expressions should work");

var dateExpr = `Date: ${new Date(2025, 0, 1).getFullYear()}`;
if (dateExpr !== 'Date: 2025') throw new Error("Date expressions should work");

var arrayMethod = `Mapped: [${[1,2,3].map(function(x) { return x * 2; }).join(',')}]`;
if (arrayMethod !== 'Mapped: [2,4,6]') throw new Error("Array method chaining should work");

var stringMethod = `Uppercase: ${'hello'.toUpperCase()}`;
if (stringMethod !== 'Uppercase: HELLO') throw new Error("String method calls should work");

var mathExpr = `Math: ${Math.sqrt(16)} and ${Math.max(1, 2, 3)}`;
if (mathExpr !== 'Math: 4 and 3') throw new Error("Math object methods should work");

var jsonExpr = `JSON: ${JSON.stringify({key: 'value'})}`;
if (jsonExpr !== 'JSON: {"key":"value"}') throw new Error("JSON.stringify should work");

var evaluation = `Eval: ${eval('2 + 3')}`;
if (evaluation !== 'Eval: 5') throw new Error("eval should work in expressions");

// Test 51-60: Complex nested scenarios
var deepNested = `Level 1 ${`Level 2 ${`Level 3 ${42}`}`}`;
if (deepNested !== 'Level 1 Level 2 Level 3 42') throw new Error("Deep nesting should work");

function taggedNested(strings, ...values) {
    return `Tagged[${values.join(',')}]`;
}

var nestedTagged = taggedNested`Outer ${`Inner ${1} ${2}`} End`;
if (nestedTagged !== 'Tagged[Inner 1 2]') throw new Error("Tagged templates with nested templates should work");

var conditionalNesting = `${true ? `True branch ${1}` : `False branch ${2}`}`;
if (conditionalNesting !== 'True branch 1') throw new Error("Conditional nesting should work");

var loopResult = '';
for (var i = 0; i < 3; i++) {
    loopResult += `${i}`;
}
if (loopResult !== '012') throw new Error("Template literals in loops should work");

var switchTemplate = function(value) {
    switch (value) {
        case 1: return `One: ${value}`;
        case 2: return `Two: ${value}`;
        default: return `Other: ${value}`;
    }
};
if (switchTemplate(2) !== 'Two: 2') throw new Error("Template literals in switch should work");

var tryTemplate;
try {
    tryTemplate = `Try: ${1/0}`;
} catch (e) {
    tryTemplate = `Catch: ${e.message}`;
}
if (tryTemplate !== 'Try: Infinity') throw new Error("Template literals in try-catch should work");

var closureTemplate = (function(x) {
    return function(y) {
        return `Closure: ${x + y}`;
    };
})(10);
if (closureTemplate(5) !== 'Closure: 15') throw new Error("Template literals in closures should work");

var recursiveTag = function(strings, ...values) {
    if (values.length === 0) return strings[0];
    return recursiveTag`Recursive ${values.length - 1}`;
};
// Note: This would cause infinite recursion, so we'll test differently
var recursiveTest = `Recursive: ${3}`;
if (recursiveTest !== 'Recursive: 3') throw new Error("Recursive-like patterns should work");

var arrowTemplate = ((x) => `Arrow: ${x}`)(42);
if (arrowTemplate !== 'Arrow: 42') throw new Error("Template literals with arrow functions should work");

var destructureTemplate = (function() {
    var [a, b] = [1, 2];
    return `Destructured: ${a}, ${b}`;
})();
if (destructureTemplate !== 'Destructured: 1, 2') throw new Error("Template literals with destructuring should work");

// Test 61-70: Edge cases and error handling
var nullExpr = `Null: ${null}`;
if (nullExpr !== 'Null: null') throw new Error("null should be converted to string");

var undefinedExpr = `Undefined: ${undefined}`;
if (undefinedExpr !== 'Undefined: undefined') throw new Error("undefined should be converted to string");

var booleanExpr = `Boolean: ${true} and ${false}`;
if (booleanExpr !== 'Boolean: true and false') throw new Error("Booleans should be converted to strings");

var symbolExpr = `Symbol: ${Symbol('test').toString()}`;
if (symbolExpr.indexOf('Symbol(test)') === -1) throw new Error("Symbols should be convertible to strings");

var functionExpr = `Function: ${function() { return 'test'; }}`;
if (functionExpr.indexOf('function') === -1) throw new Error("Functions should be converted to strings");

var bigNumbers = `Big: ${Number.MAX_SAFE_INTEGER} and ${Number.MIN_SAFE_INTEGER}`;
if (typeof bigNumbers !== 'string') throw new Error("Large numbers should be handled");

var infinityExpr = `Infinity: ${Infinity} and ${-Infinity}`;
if (infinityExpr !== 'Infinity: Infinity and -Infinity') throw new Error("Infinity values should work");

var nanExpr = `NaN: ${NaN}`;
if (nanExpr !== 'NaN: NaN') throw new Error("NaN should be converted to string");

// Test template literal as object key
var templateKey = `key_${1}`;
var objWithTemplateKey = { [templateKey]: 'value' };
if (objWithTemplateKey.key_1 !== 'value') throw new Error("Template literals as object keys should work");

// Test template literal in array
var templateArray = [`item_${1}`, `item_${2}`];
if (templateArray[0] !== 'item_1' || templateArray[1] !== 'item_2') throw new Error("Template literals in arrays should work");

// Test 71-80: Performance and consistency
var largeTemplate = `Large template with many ${'expressions'} and ${42} values and ${'more'} content`;
if (typeof largeTemplate !== 'string') throw new Error("Large templates should work");

// Test template literals vs string concatenation consistency
var concat = 'Hello, ' + name + '!';
var template = `Hello, ${name}!`;
if (concat !== template) throw new Error("Template literals should be equivalent to concatenation");

// Test whitespace preservation
var whitespaceTemplate = `   Leading   ${1}   trailing   `;
if (whitespaceTemplate !== '   Leading   1   trailing   ') throw new Error("Whitespace should be preserved");

// Test special characters
var specialChars = `Special: \r\n\t\v\f\b\0`;
if (typeof specialChars !== 'string') throw new Error("Special characters should be handled");

// Test very long strings
var longString = 'x'.repeat(1000);
var longTemplate = `Long: ${longString}`;
if (longTemplate.length !== 1006) throw new Error("Long strings should be handled");

// Test numeric precision
var precisionTest = `Precision: ${0.1 + 0.2}`;
if (typeof precisionTest !== 'string') throw new Error("Floating point precision should be handled");

// Test object toString behavior
var customToString = {
    toString: function() { return 'custom'; }
};
var toStringTest = `Object: ${customToString}`;
if (toStringTest !== 'Object: custom') throw new Error("Custom toString should be called");

var customValueOf = {
    valueOf: function() { return 42; },
    toString: function() { return 'string'; }
};
var valueOfTest = `Value: ${customValueOf}`;
if (valueOfTest !== 'Value: string') throw new Error("toString should be preferred over valueOf");

// Test array toString
var arrayToString = `Array: ${[1, 2, 3]}`;
if (arrayToString !== 'Array: 1,2,3') throw new Error("Array toString should work");

// Test Date toString
var dateToString = `Date: ${new Date(2025, 0, 1)}`;
if (typeof dateToString !== 'string') throw new Error("Date toString should work");

// Test 81-90: Tagged template advanced features
function sqlTag(strings, ...values) {
    return {
        sql: strings.reduce(function(result, string, i) {
            return result + string + (values[i] !== undefined ? '?' : '');
        }, ''),
        values: values
    };
}

var sqlQuery = sqlTag`SELECT * FROM users WHERE id = ${123} AND name = ${'John'}`;
if (sqlQuery.sql !== 'SELECT * FROM users WHERE id = ? AND name = ?') throw new Error("SQL tag should work");
if (sqlQuery.values.length !== 2) throw new Error("SQL tag should capture values");

function multilineTag(strings, ...values) {
    return strings.map(function(str, i) {
        return str.replace(/\n\s+/g, '\n') + (values[i] || '');
    }).join('');
}

var multilineResult = multilineTag`
    Multi
    line
    ${1}
    template
`;
if (typeof multilineResult !== 'string') throw new Error("Multiline tag should work");

function cacheTag(strings, ...values) {
    cacheTag.cache = cacheTag.cache || new Map();
    var key = strings.join('{}');
    if (cacheTag.cache.has(key)) {
        return cacheTag.cache.get(key) + values.join('');
    }
    var result = strings.join('CACHED');
    cacheTag.cache.set(key, result);
    return result + values.join('');
}

var cached1 = cacheTag`Cache ${1} test`;
var cached2 = cacheTag`Cache ${2} test`;
if (typeof cached1 !== 'string' || typeof cached2 !== 'string') throw new Error("Cache tag should work");

function validationTag(strings, ...values) {
    values.forEach(function(value, i) {
        if (typeof value !== 'number') {
            throw new Error('Value at index ' + i + ' must be a number');
        }
    });
    return strings.reduce(function(result, string, i) {
        return result + string + (values[i] || '');
    }, '');
}

var validResult = validationTag`Valid ${1} and ${2}`;
if (validResult !== 'Valid 1 and 2') throw new Error("Validation tag should work with valid input");

try {
    validationTag`Invalid ${'string'} value`;
    throw new Error("Validation tag should throw for invalid input");
} catch (e) {
    if (e.message.indexOf('must be a number') === -1) throw new Error("Validation tag should throw proper error");
}

function asyncTag(strings, ...values) {
    return Promise.resolve(strings.reduce(function(result, string, i) {
        return result + string + (values[i] || '');
    }, ''));
}

// Note: We can't easily test async in this synchronous test suite
var asyncResult = asyncTag`Async ${42} test`;
if (!(asyncResult instanceof Promise)) throw new Error("Async tag should return Promise");

function localizationTag(strings, ...values) {
    var translations = {
        'Hello': 'Hola',
        'World': 'Mundo'
    };
    return strings.map(function(str, i) {
        var translatedStr = str.replace(/\b(Hello|World)\b/g, function(match) {
            return translations[match] || match;
        });
        return translatedStr + (values[i] || '');
    }).join('');
}

var localized = localizationTag`Hello, ${name}!`;
if (localized !== 'Hola, World!') throw new Error("Localization tag should work");

// Test 91-100: Final edge cases and comprehensive validation
// Test template literals with computed property names
var computedProp = `prop_${Date.now()}`;
var objWithComputed = { [computedProp]: 'computed' };
if (typeof objWithComputed[computedProp] !== 'string') throw new Error("Computed properties with templates should work");

// Test template literals in function defaults
function defaultTemplate(x = `default_${1}`) {
    return x;
}
if (defaultTemplate() !== 'default_1') throw new Error("Template literals in defaults should work");

// Test template literals with spread operator
var spreadArray = [...`abc`];
if (spreadArray.length !== 3 || spreadArray[0] !== 'a') throw new Error("Template literals with spread should work");

// Test template literals in destructuring
var [first, ...rest] = `Hello`;
if (first !== 'H' || rest.join('') !== 'ello') throw new Error("Template literals in destructuring should work");

// Test template literals with for...of
var chars = '';
for (var char of `test`) {
    chars += char;
}
if (chars !== 'test') throw new Error("Template literals with for...of should work");

// Test template literals equality
var template1 = `test ${1}`;
var template2 = `test ${1}`;
if (template1 !== template2) throw new Error("Equivalent template literals should be equal");

// Test template literals with instanceof
var templateString = `test`;
if (!(templateString instanceof String) === true) {
    // Template literals create primitive strings, not String objects
    if (typeof templateString !== 'string') throw new Error("Template literals should create strings");
}

// Test template literals length property
var lengthTest = `12345`;
if (lengthTest.length !== 5) throw new Error("Template literal length should work");

// Test template literals with string methods
var upperTest = `hello`.toUpperCase();
if (upperTest !== 'HELLO') throw new Error("String methods on template literals should work");

// Final comprehensive test
var comprehensive = `
Comprehensive test:
- Variables: ${name}
- Math: ${2 + 3}
- Objects: ${obj.prop}
- Arrays: ${arr[0]}
- Functions: ${(() => 'arrow')()}
- Conditional: ${true ? 'yes' : 'no'}
- Typeof: ${typeof 42}
- String method: ${'TEST'.toLowerCase()}
- Complex: ${Math.sqrt(arr.length * obj.prop.length)}
`;

if (typeof comprehensive !== 'string' || comprehensive.length < 100) {
    throw new Error("Comprehensive template literal test should work");
}

// Validate that all template literal features are functional
if (typeof String.raw !== 'function') throw new Error("String.raw should be available");

// Test that raw strings property exists
var rawStrings = (function(strings) { return strings.raw; })`test`;
if (!Array.isArray(rawStrings)) throw new Error("Template strings should have raw property");

// Final validation: template literals should be interoperable with regular strings
var mixed = 'Regular' + ` template ${1}` + 'concatenation';
if (mixed !== 'Regular template 1concatenation') throw new Error("Template literals should be interoperable with strings");