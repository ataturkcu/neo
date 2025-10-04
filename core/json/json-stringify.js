/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: JSON.stringify() Comprehensive Tests
 */

// Test 1-5: Basic primitive stringification
var result1 = JSON.stringify(null);
if (result1 !== "null") throw new Error("JSON.stringify(null) should return 'null'");

var result2 = JSON.stringify(true);
if (result2 !== "true") throw new Error("JSON.stringify(true) should return 'true'");

var result3 = JSON.stringify(false);
if (result3 !== "false") throw new Error("JSON.stringify(false) should return 'false'");

var result4 = JSON.stringify(42);
if (result4 !== "42") throw new Error("JSON.stringify(42) should return '42'");

var result5 = JSON.stringify(-123.456);
if (result5 !== "-123.456") throw new Error("JSON.stringify(-123.456) failed");

// Test 6-10: String stringification
var result6 = JSON.stringify("hello");
if (result6 !== '"hello"') throw new Error("JSON.stringify('hello') should return '\"hello\"'");

var result7 = JSON.stringify("");
if (result7 !== '""') throw new Error("JSON.stringify('') should return '\"\"'");

var result8 = JSON.stringify("hello\nworld");
if (result8 !== '"hello\\nworld"') throw new Error("JSON.stringify with newline failed");

var result9 = JSON.stringify('say "hello"');
if (result9 !== '"say \\"hello\\""') throw new Error("JSON.stringify with quotes failed");

var result10 = JSON.stringify("\t\r\n\\");
if (result10 !== '"\\t\\r\\n\\\\"') throw new Error("JSON.stringify with escape chars failed");

// Test 11-15: Array stringification
var result11 = JSON.stringify([]);
if (result11 !== "[]") throw new Error("JSON.stringify([]) should return '[]'");

var result12 = JSON.stringify([1, 2, 3]);
if (result12 !== "[1,2,3]") throw new Error("JSON.stringify([1,2,3]) failed");

var result13 = JSON.stringify([null, true, false]);
if (result13 !== "[null,true,false]") throw new Error("JSON.stringify mixed array failed");

var result14 = JSON.stringify(["a", "b", "c"]);
if (result14 !== '["a","b","c"]') throw new Error("JSON.stringify string array failed");

var result15 = JSON.stringify([1, [2, 3], 4]);
if (result15 !== "[1,[2,3],4]") throw new Error("JSON.stringify nested array failed");

// Test 16-20: Object stringification
var result16 = JSON.stringify({});
if (result16 !== "{}") throw new Error("JSON.stringify({}) should return '{}'");

var result17 = JSON.stringify({name: "John", age: 30});
if (result17 !== '{"name":"John","age":30}') throw new Error("JSON.stringify simple object failed");

var result18 = JSON.stringify({a: null, b: true, c: false});
if (result18 !== '{"a":null,"b":true,"c":false}') throw new Error("JSON.stringify object with primitives failed");

var result19 = JSON.stringify({nested: {key: "value"}});
if (result19 !== '{"nested":{"key":"value"}}') throw new Error("JSON.stringify nested object failed");

var result20 = JSON.stringify({array: [1, 2, 3]});
if (result20 !== '{"array":[1,2,3]}') throw new Error("JSON.stringify object with array failed");

// Test 21-25: Undefined and function handling
var result21 = JSON.stringify(undefined);
if (result21 !== undefined) throw new Error("JSON.stringify(undefined) should return undefined");

var result22 = JSON.stringify(function() {});
if (result22 !== undefined) throw new Error("JSON.stringify(function) should return undefined");

var result23 = JSON.stringify([1, undefined, 3]);
if (result23 !== "[1,null,3]") throw new Error("JSON.stringify array with undefined should use null");

var result24 = JSON.stringify({a: 1, b: undefined, c: 3});
if (result24 !== '{"a":1,"c":3}') throw new Error("JSON.stringify object should omit undefined properties");

var result25 = JSON.stringify({a: 1, b: function() {}, c: 3});
if (result25 !== '{"a":1,"c":3}') throw new Error("JSON.stringify object should omit function properties");

// Test 26-30: Symbol handling
if (typeof Symbol !== 'undefined') {
    var result26 = JSON.stringify(Symbol('test'));
    if (result26 !== undefined) throw new Error("JSON.stringify(Symbol) should return undefined");

    var result27 = JSON.stringify([1, Symbol('test'), 3]);
    if (result27 !== "[1,null,3]") throw new Error("JSON.stringify array with Symbol should use null");

    var result28 = JSON.stringify({a: 1, b: Symbol('test'), c: 3});
    if (result28 !== '{"a":1,"c":3}') throw new Error("JSON.stringify object should omit Symbol properties");

    var symKey = Symbol('key');
    var obj = {a: 1};
    obj[symKey] = 'value';
    var result29 = JSON.stringify(obj);
    if (result29 !== '{"a":1}') throw new Error("JSON.stringify should ignore Symbol keys");

    var result30 = JSON.stringify({[Symbol.for('test')]: 'value', normal: 'key'});
    if (result30 !== '{"normal":"key"}') throw new Error("JSON.stringify should ignore Symbol.for keys");
}

// Test 31-35: Replacer function tests
var result31 = JSON.stringify({a: 1, b: 2}, function(key, value) {
    return key === "a" ? value * 2 : value;
});
if (result31 !== '{"a":2,"b":2}') throw new Error("JSON.stringify with replacer failed");

var result32 = JSON.stringify([1, 2, 3], function(key, value) {
    return typeof value === 'number' ? value + 1 : value;
});
if (result32 !== "[2,3,4]") throw new Error("JSON.stringify array with replacer failed");

var result33 = JSON.stringify("hello", function(key, value) {
    return value.toUpperCase();
});
if (result33 !== '"HELLO"') throw new Error("JSON.stringify string with replacer failed");

var result34 = JSON.stringify({a: 1, b: 2}, function(key, value) {
    if (key === "b") return undefined;
    return value;
});
if (result34 !== '{"a":1}') throw new Error("JSON.stringify replacer undefined removal failed");

var result35 = JSON.stringify({a: 1, b: 2, c: 3}, function(key, value) {
    return key === "" ? value : (typeof value === 'number' && value > 1 ? value : undefined);
});
if (result35 !== '{"b":2,"c":3}') throw new Error("JSON.stringify replacer filtering failed");

// Test 36-40: Replacer array tests
var result36 = JSON.stringify({a: 1, b: 2, c: 3}, ['a', 'c']);
if (result36 !== '{"a":1,"c":3}') throw new Error("JSON.stringify with replacer array failed");

var result37 = JSON.stringify({name: "John", age: 30, city: "NYC"}, ['name']);
if (result37 !== '{"name":"John"}') throw new Error("JSON.stringify replacer array single property failed");

var result38 = JSON.stringify({a: {b: 1, c: 2}, d: 3}, ['a', 'b']);
if (result38 !== '{"a":{"b":1}}') throw new Error("JSON.stringify replacer array nested failed");

var result39 = JSON.stringify([{a: 1, b: 2}, {a: 3, b: 4}], ['a']);
if (result39 !== '[{"a":1},{"a":3}]') throw new Error("JSON.stringify replacer array with array failed");

var result40 = JSON.stringify({a: 1, b: 2}, []);
if (result40 !== '{}') throw new Error("JSON.stringify with empty replacer array should return '{}'");

// Test 41-45: Space parameter tests
var result41 = JSON.stringify({a: 1, b: 2}, null, 2);
var expected41 = '{\n  "a": 1,\n  "b": 2\n}';
if (result41 !== expected41) throw new Error("JSON.stringify with space=2 failed");

var result42 = JSON.stringify([1, 2, 3], null, 4);
var expected42 = '[\n    1,\n    2,\n    3\n]';
if (result42 !== expected42) throw new Error("JSON.stringify array with space=4 failed");

var result43 = JSON.stringify({a: {b: 1}}, null, '\t');
var expected43 = '{\n\t"a": {\n\t\t"b": 1\n\t}\n}';
if (result43 !== expected43) throw new Error("JSON.stringify with tab space failed");

var result44 = JSON.stringify({a: 1}, null, 'xx');
var expected44 = '{\nxx"a": 1\n}';
if (result44 !== expected44) throw new Error("JSON.stringify with string space failed");

var result45 = JSON.stringify({a: 1}, null, 15);
var expected45 = '{\n          "a": 1\n}';
if (result45 !== expected45) throw new Error("JSON.stringify with large space (clamped to 10) failed");

// Test 46-50: toJSON method tests
var objWithToJSON = {
    value: 42,
    toJSON: function() {
        return {custom: this.value * 2};
    }
};
var result46 = JSON.stringify(objWithToJSON);
if (result46 !== '{"custom":84}') throw new Error("JSON.stringify with toJSON method failed");

var arrayWithToJSON = [1, {
    toJSON: function() {
        return "custom";
    }
}, 3];
var result47 = JSON.stringify(arrayWithToJSON);
if (result47 !== '[1,"custom",3]') throw new Error("JSON.stringify array with toJSON failed");

var dateObj = new Date('2023-01-01T00:00:00.000Z');
var result48 = JSON.stringify(dateObj);
if (result48 !== '"2023-01-01T00:00:00.000Z"') throw new Error("JSON.stringify Date with toJSON failed");

var nestedToJSON = {
    outer: {
        toJSON: function() {
            return {inner: "value"};
        }
    }
};
var result49 = JSON.stringify(nestedToJSON);
if (result49 !== '{"outer":{"inner":"value"}}') throw new Error("JSON.stringify nested toJSON failed");

var toJSONReturnsUndefined = {
    toJSON: function() {
        return undefined;
    }
};
var result50 = JSON.stringify([toJSONReturnsUndefined]);
if (result50 !== '[null]') throw new Error("JSON.stringify toJSON returning undefined should become null in array");

// Test 51-55: Circular reference handling
var circular1 = {};
circular1.self = circular1;
try {
    JSON.stringify(circular1);
    throw new Error("JSON.stringify should throw for circular reference");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify circular reference should throw TypeError");
}

var circular2 = {a: {}};
circular2.a.parent = circular2;
try {
    JSON.stringify(circular2);
    throw new Error("JSON.stringify should throw for nested circular reference");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify nested circular reference should throw TypeError");
}

var circular3 = [];
circular3[0] = circular3;
try {
    JSON.stringify(circular3);
    throw new Error("JSON.stringify should throw for circular array reference");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify circular array reference should throw TypeError");
}

var a = {}, b = {};
a.b = b;
b.a = a;
try {
    JSON.stringify(a);
    throw new Error("JSON.stringify should throw for mutual circular reference");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify mutual circular reference should throw TypeError");
}

var selfRef = [1, 2];
selfRef.push(selfRef);
try {
    JSON.stringify(selfRef);
    throw new Error("JSON.stringify should throw for self-referencing array");
} catch (e) {
    if (!(e instanceof TypeError)) throw new Error("JSON.stringify self-referencing array should throw TypeError");
}

// Test 56-60: Number edge cases
var result56 = JSON.stringify(Infinity);
if (result56 !== "null") throw new Error("JSON.stringify(Infinity) should return 'null'");

var result57 = JSON.stringify(-Infinity);
if (result57 !== "null") throw new Error("JSON.stringify(-Infinity) should return 'null'");

var result58 = JSON.stringify(NaN);
if (result58 !== "null") throw new Error("JSON.stringify(NaN) should return 'null'");

var result59 = JSON.stringify([Infinity, -Infinity, NaN]);
if (result59 !== "[null,null,null]") throw new Error("JSON.stringify array with special numbers failed");

var result60 = JSON.stringify({a: Infinity, b: -Infinity, c: NaN});
if (result60 !== '{"a":null,"b":null,"c":null}') throw new Error("JSON.stringify object with special numbers failed");

// Test 61-65: Complex nested structures and edge cases
var complex = {
    users: [
        {id: 1, name: "John", active: true},
        {id: 2, name: "Jane", active: false}
    ],
    meta: {total: 2, version: "1.0"},
    config: null
};
var result61 = JSON.stringify(complex);
var expected61 = '{"users":[{"id":1,"name":"John","active":true},{"id":2,"name":"Jane","active":false}],"meta":{"total":2,"version":"1.0"},"config":null}';
if (result61 !== expected61) throw new Error("JSON.stringify complex object failed");

var sparse = [1, , 3, , 5];
var result62 = JSON.stringify(sparse);
if (result62 !== "[1,null,3,null,5]") throw new Error("JSON.stringify sparse array failed");

var result63 = JSON.stringify({
    emptyString: "",
    zero: 0,
    false: false,
    null: null,
    emptyArray: [],
    emptyObject: {}
});
var expected63 = '{"emptyString":"","zero":0,"false":false,"null":null,"emptyArray":[],"emptyObject":{}}';
if (result63 !== expected63) throw new Error("JSON.stringify falsy values failed");

var withNonEnumerable = {};
Object.defineProperty(withNonEnumerable, 'hidden', {
    value: 'secret',
    enumerable: false
});
withNonEnumerable.visible = 'public';
var result64 = JSON.stringify(withNonEnumerable);
if (result64 !== '{"visible":"public"}') throw new Error("JSON.stringify should ignore non-enumerable properties");

var inheritedProps = Object.create({inherited: 'value'});
inheritedProps.own = 'property';
var result65 = JSON.stringify(inheritedProps);
if (result65 !== '{"own":"property"}') throw new Error("JSON.stringify should ignore inherited properties");

// Test 66-70: Final edge cases and error conditions
// JSON.stringify with no arguments returns undefined
var result66 = JSON.stringify();
if (result66 !== undefined) throw new Error("JSON.stringify() should return undefined, got " + result66);

var result67 = JSON.stringify({a: 1}, null);
if (result67 !== '{"a":1}') throw new Error("JSON.stringify with null replacer failed");

var result68 = JSON.stringify({a: 1}, undefined);
if (result68 !== '{"a":1}') throw new Error("JSON.stringify with undefined replacer failed");

// JSON.stringify with invalid replacer ignores the replacer
var result69 = JSON.stringify({a: 1}, 'not a function or array');
if (result69 !== '{"a":1}') throw new Error("JSON.stringify with invalid replacer should ignore it, got " + result69);

// Test replacer function call order and arguments
var callOrder = [];
JSON.stringify({b: 2, a: 1}, function(key, value) {
    callOrder.push(key);
    return value;
});
if (callOrder[0] !== "" || callOrder.length !== 3) {
    throw new Error("JSON.stringify replacer call order failed - should call with root key first");
}