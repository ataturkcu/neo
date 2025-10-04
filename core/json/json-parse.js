/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: JSON.parse() Comprehensive Tests
 */

// Test 1-5: Basic valid JSON parsing
var result1 = JSON.parse('null');
if (result1 !== null) throw new Error("JSON.parse('null') should return null");

var result2 = JSON.parse('true');
if (result2 !== true) throw new Error("JSON.parse('true') should return true");

var result3 = JSON.parse('false');
if (result3 !== false) throw new Error("JSON.parse('false') should return false");

var result4 = JSON.parse('42');
if (result4 !== 42) throw new Error("JSON.parse('42') should return 42");

var result5 = JSON.parse('-123.456');
if (result5 !== -123.456) throw new Error("JSON.parse('-123.456') should return -123.456");

// Test 6-10: String parsing
var result6 = JSON.parse('"hello"');
if (result6 !== "hello") throw new Error("JSON.parse('\"hello\"') should return 'hello'");

var result7 = JSON.parse('""');
if (result7 !== "") throw new Error("JSON.parse('\"\"') should return empty string");

var result8 = JSON.parse('"\\n\\t\\r\\\\"');
if (result8 !== "\n\t\r\\") throw new Error("JSON.parse with escape sequences failed");

var result9 = JSON.parse('"\\u0041"');
if (result9 !== "A") throw new Error("JSON.parse with unicode escape should return 'A'");

var result10 = JSON.parse('"Hello\\u0020World"');
if (result10 !== "Hello World") throw new Error("JSON.parse with unicode space failed");

// Test 11-15: Array parsing
var result11 = JSON.parse('[]');
if (result11.length !== 0) throw new Error("JSON.parse('[]') should return empty array");

var result12 = JSON.parse('[1,2,3]');
if (result12.length !== 3 || result12[0] !== 1 || result12[2] !== 3) {
    throw new Error("JSON.parse('[1,2,3]') failed");
}

var result13 = JSON.parse('[null, true, false]');
if (result13[0] !== null || result13[1] !== true || result13[2] !== false) {
    throw new Error("JSON.parse array with mixed primitives failed");
}

var result14 = JSON.parse('["a", "b", "c"]');
if (result14[0] !== "a" || result14[1] !== "b" || result14[2] !== "c") {
    throw new Error("JSON.parse string array failed");
}

var result15 = JSON.parse('[1, [2, 3], 4]');
if (result15[1][0] !== 2 || result15[1][1] !== 3) {
    throw new Error("JSON.parse nested array failed");
}

// Test 16-20: Object parsing
var result16 = JSON.parse('{}');
if (Object.keys(result16).length !== 0) throw new Error("JSON.parse('{}') should return empty object");

var result17 = JSON.parse('{"name": "John", "age": 30}');
if (result17.name !== "John" || result17.age !== 30) {
    throw new Error("JSON.parse simple object failed");
}

var result18 = JSON.parse('{"a": null, "b": true, "c": false}');
if (result18.a !== null || result18.b !== true || result18.c !== false) {
    throw new Error("JSON.parse object with mixed primitives failed");
}

var result19 = JSON.parse('{"nested": {"key": "value"}}');
if (result19.nested.key !== "value") throw new Error("JSON.parse nested object failed");

var result20 = JSON.parse('{"array": [1, 2, 3]}');
if (result20.array[1] !== 2) throw new Error("JSON.parse object with array failed");

// Test 21-25: Number edge cases
var result21 = JSON.parse('0');
if (result21 !== 0) throw new Error("JSON.parse('0') failed");

var result22 = JSON.parse('-0');
if (result22 !== -0) throw new Error("JSON.parse('-0') failed");

var result23 = JSON.parse('1.23e10');
if (result23 !== 1.23e10) throw new Error("JSON.parse scientific notation failed");

var result24 = JSON.parse('-1.23e-10');
if (result24 !== -1.23e-10) throw new Error("JSON.parse negative scientific notation failed");

var result25 = JSON.parse('0.0');
if (result25 !== 0.0) throw new Error("JSON.parse('0.0') failed");

// Test 26-30: Whitespace handling
var result26 = JSON.parse('  true  ');
if (result26 !== true) throw new Error("JSON.parse with leading/trailing whitespace failed");

var result27 = JSON.parse('\n\t\r 42 \n\t\r');
if (result27 !== 42) throw new Error("JSON.parse with various whitespace failed");

var result28 = JSON.parse('{ "key" : "value" }');
if (result28.key !== "value") throw new Error("JSON.parse object with whitespace failed");

var result29 = JSON.parse('[ 1 , 2 , 3 ]');
if (result29[1] !== 2) throw new Error("JSON.parse array with whitespace failed");

var result30 = JSON.parse('{\n  "name": "test",\n  "value": 123\n}');
if (result30.name !== "test" || result30.value !== 123) {
    throw new Error("JSON.parse multiline object failed");
}

// Test 31-35: Reviver function basic tests
var result31 = JSON.parse('{"a": 1, "b": 2}', function(key, value) {
    return key === "a" ? value * 2 : value;
});
if (result31.a !== 2 || result31.b !== 2) throw new Error("JSON.parse with reviver failed");

var result32 = JSON.parse('[1, 2, 3]', function(key, value) {
    return typeof value === 'number' ? value + 1 : value;
});
if (result32[0] !== 2 || result32[1] !== 3 || result32[2] !== 4) {
    throw new Error("JSON.parse array with reviver failed");
}

var result33 = JSON.parse('"hello"', function(key, value) {
    return value.toUpperCase();
});
if (result33 !== "HELLO") throw new Error("JSON.parse string with reviver failed");

var result34 = JSON.parse('true', function(key, value) {
    return !value;
});
if (result34 !== false) throw new Error("JSON.parse boolean with reviver failed");

var result35 = JSON.parse('null', function(key, value) {
    return value === null ? "null value" : value;
});
if (result35 !== "null value") throw new Error("JSON.parse null with reviver failed");

// Test 36-40: Complex reviver function tests
var result36 = JSON.parse('{"date": "2023-01-01"}', function(key, value) {
    if (key === "date") return new Date(value);
    return value;
});
if (!(result36.date instanceof Date)) throw new Error("JSON.parse date reviver failed");

var result37 = JSON.parse('[1, 2, 3, 4, 5]', function(key, value) {
    return Array.isArray(value) ? value.filter(x => x % 2 === 0) : value;
});
if (result37.length !== 2 || result37[0] !== 2 || result37[1] !== 4) {
    throw new Error("JSON.parse array filter reviver failed");
}

var result38 = JSON.parse('{"a": {"b": {"c": 123}}}', function(key, value) {
    if (key === "c") return value * 2;
    return value;
});
if (result38.a.b.c !== 246) throw new Error("JSON.parse nested reviver failed");

var counter = 0;
JSON.parse('{"x": 1, "y": 2}', function(key, value) {
    counter++;
    return value;
});
if (counter !== 3) throw new Error("JSON.parse reviver call count failed"); // Called for x, y, and root

var result40 = JSON.parse('{"remove": "me", "keep": "this"}', function(key, value) {
    if (key === "remove") return undefined;
    return value;
});
if ("remove" in result40) throw new Error("JSON.parse reviver undefined removal failed");

// Test 41-45: Invalid JSON error cases
try {
    JSON.parse('');
    throw new Error("JSON.parse empty string should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse empty string should throw SyntaxError");
}

try {
    JSON.parse('undefined');
    throw new Error("JSON.parse 'undefined' should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse 'undefined' should throw SyntaxError");
}

try {
    JSON.parse('function() {}');
    throw new Error("JSON.parse function should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse function should throw SyntaxError");
}

try {
    JSON.parse('{key: "value"}');
    throw new Error("JSON.parse unquoted key should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse unquoted key should throw SyntaxError");
}

try {
    JSON.parse("{'key': 'value'}");
    throw new Error("JSON.parse single quotes should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse single quotes should throw SyntaxError");
}

// Test 46-50: More invalid JSON cases
try {
    JSON.parse('[1, 2, 3,]');
    throw new Error("JSON.parse trailing comma should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse trailing comma should throw SyntaxError");
}

try {
    JSON.parse('{"a": 1, "b": 2,}');
    throw new Error("JSON.parse trailing comma in object should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse trailing comma in object should throw SyntaxError");
}

try {
    JSON.parse('[1 2 3]');
    throw new Error("JSON.parse missing commas should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse missing commas should throw SyntaxError");
}

try {
    JSON.parse('{"a" 1}');
    throw new Error("JSON.parse missing colon should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse missing colon should throw SyntaxError");
}

try {
    JSON.parse('"unterminated string');
    throw new Error("JSON.parse unterminated string should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse unterminated string should throw SyntaxError");
}

// Test 51-55: Edge cases with numbers
try {
    JSON.parse('01');
    throw new Error("JSON.parse leading zero should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse leading zero should throw SyntaxError");
}

try {
    JSON.parse('1.');
    throw new Error("JSON.parse trailing decimal should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse trailing decimal should throw SyntaxError");
}

try {
    JSON.parse('.5');
    throw new Error("JSON.parse leading decimal should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse leading decimal should throw SyntaxError");
}

try {
    JSON.parse('1e');
    throw new Error("JSON.parse incomplete exponent should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse incomplete exponent should throw SyntaxError");
}

try {
    JSON.parse('NaN');
    throw new Error("JSON.parse NaN should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse NaN should throw SyntaxError");
}

// Test 56-60: Unicode and escape sequence edge cases
var result56 = JSON.parse('"\\u0000"');
if (result56 !== "\u0000") throw new Error("JSON.parse null character failed");

var result57 = JSON.parse('"\\u005C"');
if (result57 !== "\\") throw new Error("JSON.parse unicode backslash failed");

var result58 = JSON.parse('"\\u002F"');
if (result58 !== "/") throw new Error("JSON.parse unicode forward slash failed");

try {
    JSON.parse('"\\u"');
    throw new Error("JSON.parse incomplete unicode should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse incomplete unicode should throw SyntaxError");
}

try {
    JSON.parse('"\\uGHIJ"');
    throw new Error("JSON.parse invalid unicode should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse invalid unicode should throw SyntaxError");
}

// Test 61-65: Complex nested structures
var complexJson = '{"users":[{"id":1,"name":"John","active":true},{"id":2,"name":"Jane","active":false}],"meta":{"total":2,"version":"1.0"}}';
var result61 = JSON.parse(complexJson);
if (result61.users[0].name !== "John" || result61.meta.total !== 2) {
    throw new Error("JSON.parse complex nested structure failed");
}

var deepNested = '{"a":{"b":{"c":{"d":{"e":{"f":"deep"}}}}}}';
var result62 = JSON.parse(deepNested);
if (result62.a.b.c.d.e.f !== "deep") throw new Error("JSON.parse deep nesting failed");

var mixedArray = '[1,"two",true,null,{"five":5},[6,7]]';
var result63 = JSON.parse(mixedArray);
if (result63[4].five !== 5 || result63[5][1] !== 7) {
    throw new Error("JSON.parse mixed array failed");
}

var result64 = JSON.parse('{"empty_string":"","zero":0,"false":false,"null":null}');
if (result64.empty_string !== "" || result64.zero !== 0 || result64.false !== false || result64.null !== null) {
    throw new Error("JSON.parse falsy values failed");
}

var result65 = JSON.parse('[[], {}, "", 0, false, null]');
if (result65[0].length !== 0 || Object.keys(result65[1]).length !== 0 || result65[2] !== "") {
    throw new Error("JSON.parse mixed falsy array failed");
}

// Test 66-70: Final edge cases and parameter validation
try {
    JSON.parse();
    throw new Error("JSON.parse with no arguments should throw");
} catch (e) {
    if (!(e instanceof SyntaxError)) throw new Error("JSON.parse with no arguments should throw SyntaxError");
}

var result67 = JSON.parse('123', null);
if (result67 !== 123) throw new Error("JSON.parse with null reviver failed");

var result68 = JSON.parse('123', undefined);
if (result68 !== 123) throw new Error("JSON.parse with undefined reviver failed");

// JSON.parse with non-function reviver ignores the reviver
var result69 = JSON.parse('123', 'not a function');
if (result69 !== 123) throw new Error("JSON.parse with non-function reviver should ignore reviver");

// Test reviver function 'this' context and arguments
var reviverCallCount = 0;
var result70 = JSON.parse('{"test": 42}', function(key, value) {
    reviverCallCount++;
    if (arguments.length < 2) throw new Error("Reviver should receive at least 2 arguments");
    if (typeof key !== 'string') throw new Error("First argument should be string");
    return value;
});
if (result70.test !== 42) throw new Error("JSON.parse reviver arguments test failed");
if (reviverCallCount < 2) throw new Error("Reviver should be called multiple times");