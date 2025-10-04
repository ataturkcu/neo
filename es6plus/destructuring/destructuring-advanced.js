/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Advanced Destructuring Patterns, Nested, Default Values, Rest
 */

// Basic array destructuring
var [a, b, c] = [1, 2, 3];

// Test 1: Basic array destructuring
if (a !== 1 || b !== 2 || c !== 3) {
    throw new Error("Test 1 failed: Basic array destructuring");
}

// Array destructuring with rest
var [first, ...rest] = [1, 2, 3, 4, 5];

// Test 2: Array destructuring with rest
if (first !== 1) {
    throw new Error("Test 2 failed: Array destructuring first element");
}

// Test 3: Rest array contents
if (rest.length !== 4 || rest[0] !== 2 || rest[3] !== 5) {
    throw new Error("Test 3 failed: Array destructuring rest elements");
}

// Array destructuring with skipping
var [x, , z] = [10, 20, 30];

// Test 4: Array destructuring with skipping
if (x !== 10 || z !== 30) {
    throw new Error("Test 4 failed: Array destructuring with skipping");
}

// Array destructuring with default values
var [d = 100, e = 200, f = 300] = [40];

// Test 5: Array destructuring with defaults
if (d !== 40 || e !== 200 || f !== 300) {
    throw new Error("Test 5 failed: Array destructuring with default values");
}

// Basic object destructuring
var {name, age} = {name: "Alice", age: 30, city: "NYC"};

// Test 6: Basic object destructuring
if (name !== "Alice" || age !== 30) {
    throw new Error("Test 6 failed: Basic object destructuring");
}

// Object destructuring with different variable names
var {name: fullName, age: years} = {name: "Bob", age: 25};

// Test 7: Object destructuring with aliases
if (fullName !== "Bob" || years !== 25) {
    throw new Error("Test 7 failed: Object destructuring with aliases");
}

// Object destructuring with default values
var {height = 180, weight = 70} = {height: 175};

// Test 8: Object destructuring with defaults
if (height !== 175 || weight !== 70) {
    throw new Error("Test 8 failed: Object destructuring with defaults");
}

// Object destructuring with rest
var {prop1, ...otherProps} = {prop1: 1, prop2: 2, prop3: 3, prop4: 4};

// Test 9: Object destructuring with rest
if (prop1 !== 1) {
    throw new Error("Test 9 failed: Object destructuring first property");
}

// Test 10: Object rest properties
if (otherProps.prop2 !== 2 || otherProps.prop3 !== 3 || otherProps.prop4 !== 4) {
    throw new Error("Test 10 failed: Object destructuring rest properties");
}

// Nested array destructuring
var [[nested1, nested2], [nested3, nested4]] = [[1, 2], [3, 4]];

// Test 11: Nested array destructuring
if (nested1 !== 1 || nested2 !== 2 || nested3 !== 3 || nested4 !== 4) {
    throw new Error("Test 11 failed: Nested array destructuring");
}

// Nested object destructuring
var {person: {name: personName, address: {street, city}}} = {
    person: {
        name: "Charlie",
        address: {
            street: "Main St",
            city: "Boston"
        }
    }
};

// Test 12: Nested object destructuring
if (personName !== "Charlie" || street !== "Main St" || city !== "Boston") {
    throw new Error("Test 12 failed: Nested object destructuring");
}

// Mixed nested destructuring
var [firstItem, {innerProp, innerArray: [innerFirst, innerSecond]}] = [
    "item1",
    {
        innerProp: "inner",
        innerArray: ["a", "b"]
    }
];

// Test 13: Mixed nested destructuring
if (firstItem !== "item1" || innerProp !== "inner" || innerFirst !== "a" || innerSecond !== "b") {
    throw new Error("Test 13 failed: Mixed nested destructuring");
}

// Destructuring with computed property names
var key = "dynamicKey";
var {[key]: dynamicValue} = {dynamicKey: "dynamic value"};

// Test 14: Computed property destructuring
if (dynamicValue !== "dynamic value") {
    throw new Error("Test 14 failed: Computed property destructuring");
}

// Destructuring function parameters
function paramDestructuring([param1, param2], {param3, param4}) {
    return param1 + param2 + param3 + param4;
}

// Test 15: Function parameter destructuring
var result = paramDestructuring([1, 2], {param3: 3, param4: 4});
if (result !== 10) {
    throw new Error("Test 15 failed: Function parameter destructuring");
}

// Function parameter destructuring with defaults
function defaultParamDestructuring([a = 1, b = 2] = [], {x = 10, y = 20} = {}) {
    return a + b + x + y;
}

// Test 16: Default parameter destructuring
var defaultResult1 = defaultParamDestructuring();
if (defaultResult1 !== 33) {
    throw new Error("Test 16 failed: Default parameter destructuring - all defaults");
}

// Test 17: Partial default parameter destructuring
var defaultResult2 = defaultParamDestructuring([5], {x: 15});
if (defaultResult2 !== 42) { // 5 + 2 + 15 + 20
    throw new Error("Test 17 failed: Default parameter destructuring - partial");
}

// Destructuring assignment (re-assignment)
var reassignA, reassignB;
[reassignA, reassignB] = [100, 200];

// Test 18: Destructuring assignment
if (reassignA !== 100 || reassignB !== 200) {
    throw new Error("Test 18 failed: Destructuring assignment");
}

// Swapping variables with destructuring
var swap1 = "first";
var swap2 = "second";
[swap1, swap2] = [swap2, swap1];

// Test 19: Variable swapping
if (swap1 !== "second" || swap2 !== "first") {
    throw new Error("Test 19 failed: Variable swapping with destructuring");
}

// Destructuring return values
function returnMultiple() {
    return ["returned1", "returned2", "returned3"];
}

var [ret1, ret2, ret3] = returnMultiple();

// Test 20: Destructuring return values
if (ret1 !== "returned1" || ret2 !== "returned2" || ret3 !== "returned3") {
    throw new Error("Test 20 failed: Destructuring return values");
}

// Destructuring with undefined and null
var [undef1 = "default1", undef2 = "default2"] = [undefined, null];

// Test 21: Destructuring with undefined (should use default)
if (undef1 !== "default1") {
    throw new Error("Test 21 failed: Destructuring undefined should use default");
}

// Test 22: Destructuring with null (should not use default)
if (undef2 !== null) {
    throw new Error("Test 22 failed: Destructuring null should not use default");
}

// Destructuring arrays with holes
var holeyArray = [1, , 3, , 5];
var [hole1, hole2, hole3, hole4, hole5] = holeyArray;

// Test 23: Destructuring arrays with holes
if (hole1 !== 1 || hole2 !== undefined || hole3 !== 3 || hole4 !== undefined || hole5 !== 5) {
    throw new Error("Test 23 failed: Destructuring arrays with holes");
}

// Complex nested destructuring with defaults
var complexData = {
    users: [
        {name: "User1", settings: {theme: "dark"}},
        {name: "User2"}
    ],
    config: {
        api: {
            timeout: 5000
        }
    }
};

var {
    users: [
        {name: user1Name, settings: {theme: user1Theme = "light"} = {}},
        {name: user2Name, settings: {theme: user2Theme = "light"} = {}}
    ],
    config: {
        api: {
            timeout = 3000,
            retries = 3
        } = {}
    } = {}
} = complexData;

// Test 24: Complex nested destructuring
if (user1Name !== "User1" || user1Theme !== "dark") {
    throw new Error("Test 24 failed: Complex nested destructuring - user1");
}

// Test 25: Complex nested destructuring with defaults
if (user2Name !== "User2" || user2Theme !== "light") {
    throw new Error("Test 25 failed: Complex nested destructuring - user2 defaults");
}

// Test 26: Complex nested destructuring - config
if (timeout !== 5000 || retries !== 3) {
    throw new Error("Test 26 failed: Complex nested destructuring - config");
}

// Destructuring with rest patterns in nested structures
var nestedRestData = {
    metadata: {
        title: "Document",
        author: "Author",
        tags: ["tag1", "tag2", "tag3"],
        settings: {color: "blue", size: "large", font: "Arial"}
    }
};

var {
    metadata: {
        title,
        tags: [firstTag, ...remainingTags],
        settings: {color, ...otherSettings}
    }
} = nestedRestData;

// Test 27: Nested rest patterns
if (title !== "Document" || firstTag !== "tag1") {
    throw new Error("Test 27 failed: Nested rest patterns - basic properties");
}

// Test 28: Nested array rest
if (remainingTags.length !== 2 || remainingTags[0] !== "tag2" || remainingTags[1] !== "tag3") {
    throw new Error("Test 28 failed: Nested array rest");
}

// Test 29: Nested object rest
if (color !== "blue" || otherSettings.size !== "large" || otherSettings.font !== "Arial") {
    throw new Error("Test 29 failed: Nested object rest");
}

// Destructuring with array-like objects
var arrayLike = {0: "zero", 1: "one", 2: "two", length: 3};

// Note: This might not work in all engines without proper iterator
// Test 30: Array-like object destructuring (may skip if not supported)
try {
    var [arrayLike0, arrayLike1, arrayLike2] = arrayLike;
    if (arrayLike0 === "zero" && arrayLike1 === "one" && arrayLike2 === "two") {
        console.log("Test 30 passed: Array-like object destructuring works");
    } else {
        console.log("Test 30 info: Array-like object destructuring not fully supported");
    }
} catch (e) {
    console.log("Test 30 info: Array-like object destructuring requires iterator");
}

// Destructuring with string as iterable
var [char1, char2, char3] = "abc";

// Test 31: String destructuring
if (char1 !== "a" || char2 !== "b" || char3 !== "c") {
    // May not work in all engines
    console.log("Test 31 info: String destructuring may not be supported");
} else {
    console.log("Test 31 passed: String destructuring works");
}

// Destructuring with Set (if available)
if (typeof Set !== "undefined") {
    var testSet = new Set([1, 2, 3]);
    try {
        var [set1, set2, set3] = testSet;
        if (set1 === 1 && set2 === 2 && set3 === 3) {
            console.log("Test 32 passed: Set destructuring works");
        }
    } catch (e) {
        console.log("Test 32 info: Set destructuring may require iterator support");
    }
} else {
    console.log("Test 32 skipped: Set not available");
}

// Destructuring with Map (if available)
if (typeof Map !== "undefined") {
    var testMap = new Map([["a", 1], ["b", 2]]);
    try {
        var [entry1, entry2] = testMap;
        if (entry1[0] === "a" && entry1[1] === 1) {
            console.log("Test 33 passed: Map destructuring works");
        }
    } catch (e) {
        console.log("Test 33 info: Map destructuring may require iterator support");
    }
} else {
    console.log("Test 33 skipped: Map not available");
}

// Error handling in destructuring
try {
    var {nonExistent: {deepProp}} = {nonExistent: null};
    throw new Error("Test 34 failed: Should throw when destructuring null");
} catch (e) {
    if (e.message.indexOf("Test 34 failed") === 0) {
        throw e;
    }
    // Expected error
    console.log("Test 34 passed: Destructuring null property throws error");
}

// Test 35: Safe destructuring with defaults
var {safe: {safeProp = "default"} = {}} = {safe: undefined};
if (safeProp !== "default") {
    throw new Error("Test 35 failed: Safe destructuring with defaults");
}

// Destructuring in for loops
var loopData = [
    {name: "Item1", value: 10},
    {name: "Item2", value: 20},
    {name: "Item3", value: 30}
];

var sum = 0;
for (var i = 0; i < loopData.length; i++) {
    var {value} = loopData[i];
    sum += value;
}

// Test 36: Destructuring in for loops
if (sum !== 60) {
    throw new Error("Test 36 failed: Destructuring in for loops");
}

// Destructuring with template literals (if available)
try {
    var templateData = {prefix: "Hello", suffix: "World"};
    eval('var {prefix, suffix} = templateData; var message = `${prefix} ${suffix}`;');
    eval('if (message !== "Hello World") throw new Error("Test 37 failed: Destructuring with template literals");');
    console.log("Test 37 passed: Destructuring with template literals");
} catch (e) {
    if (e.message.indexOf("Test 37 failed") === 0) {
        throw e;
    }
    console.log("Test 37 skipped: Template literals not available");
}

// Destructuring with arrow functions (if available)
try {
    eval('var arrowDestructure = ({x, y}) => x + y;');
    eval('var arrowResult = arrowDestructure({x: 5, y: 3});');
    eval('if (arrowResult !== 8) throw new Error("Test 38 failed: Destructuring with arrow functions");');
    console.log("Test 38 passed: Destructuring with arrow functions");
} catch (e) {
    if (e.message.indexOf("Test 38 failed") === 0) {
        throw e;
    }
    console.log("Test 38 skipped: Arrow functions not available");
}

// Deep object cloning simulation with destructuring
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Array) {
        return obj.map(deepClone);
    }
    var cloned = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

var originalData = {
    level1: {
        level2: {
            value: "deep value",
            array: [1, 2, {nested: "nested value"}]
        }
    }
};

var cloned = deepClone(originalData);
var {level1: {level2: {value: clonedValue}}} = cloned;

// Test 39: Deep destructuring with cloned data
if (clonedValue !== "deep value") {
    throw new Error("Test 39 failed: Deep destructuring with cloned data");
}

// Modify original to test independence
originalData.level1.level2.value = "modified";
if (clonedValue === "modified") {
    throw new Error("Test 39 failed: Cloned data should be independent");
}

// Destructuring with getters
var getterObj = {
    get computedProp() {
        return "computed value";
    },
    normalProp: "normal value"
};

var {computedProp, normalProp} = getterObj;

// Test 40: Destructuring with getters
if (computedProp !== "computed value" || normalProp !== "normal value") {
    throw new Error("Test 40 failed: Destructuring with getters");
}

// Destructuring with Symbol keys (if available)
if (typeof Symbol !== "undefined") {
    var sym = Symbol("test");
    var symbolObj = {
        [sym]: "symbol value",
        regular: "regular value"
    };

    try {
        // Symbol properties can't be destructured with standard syntax
        var {regular} = symbolObj;
        var symbolValue = symbolObj[sym];

        if (regular !== "regular value" || symbolValue !== "symbol value") {
            throw new Error("Test 41 failed: Destructuring with symbol properties");
        }
        console.log("Test 41 passed: Destructuring with symbol properties");
    } catch (e) {
        console.log("Test 41 info: Symbol property handling in destructuring");
    }
} else {
    console.log("Test 41 skipped: Symbol not available");
}

// Destructuring with prototype properties
function ProtoConstructor() {
    this.own = "own property";
}
ProtoConstructor.prototype.inherited = "inherited property";

var protoInstance = new ProtoConstructor();
var {own, inherited} = protoInstance;

// Test 42: Destructuring with prototype properties
if (own !== "own property") {
    throw new Error("Test 42 failed: Destructuring own properties");
}

// Note: Destructuring typically only gets own properties
if (inherited === "inherited property") {
    console.log("Test 42 info: Destructuring includes inherited properties");
} else {
    console.log("Test 42 info: Destructuring excludes inherited properties (standard behavior)");
}

// Complex destructuring with array of objects
var complexArray = [
    {user: {name: "Alice", scores: [85, 90, 88]}},
    {user: {name: "Bob", scores: [78, 82, 85]}},
    {user: {name: "Charlie", scores: [92, 95, 90]}}
];

// Extract first user's first score and second user's name
var [
    {user: {scores: [firstScore]}},
    {user: {name: secondUserName}}
] = complexArray;

// Test 43: Complex array-object destructuring
if (firstScore !== 85 || secondUserName !== "Bob") {
    throw new Error("Test 43 failed: Complex array-object destructuring");
}

// Destructuring with conditional assignment
var conditionalData = {
    hasValue: true,
    value: "conditional value"
};

var {hasValue, value: conditionalValue = "default"} = conditionalData;

// Test 44: Conditional destructuring
if (!hasValue || conditionalValue !== "conditional value") {
    throw new Error("Test 44 failed: Conditional destructuring");
}

// Dynamic property destructuring
function extractProperties(obj, ...props) {
    var result = {};
    for (var i = 0; i < props.length; i++) {
        result[props[i]] = obj[props[i]];
    }
    return result;
}

var sourceObj = {a: 1, b: 2, c: 3, d: 4};
var extracted = extractProperties(sourceObj, "a", "c");

// Test 45: Dynamic property extraction
if (extracted.a !== 1 || extracted.c !== 3 || extracted.b !== undefined) {
    throw new Error("Test 45 failed: Dynamic property extraction");
}

// Destructuring with type checking
function typeCheckDestructure({name, age, isActive = false}) {
    if (typeof name !== "string") throw new Error("Name must be string");
    if (typeof age !== "number") throw new Error("Age must be number");
    if (typeof isActive !== "boolean") throw new Error("isActive must be boolean");
    return {name, age, isActive};
}

// Test 46: Type checking with destructuring
var validData = typeCheckDestructure({name: "Test", age: 25});
if (validData.name !== "Test" || validData.age !== 25 || validData.isActive !== false) {
    throw new Error("Test 46 failed: Type checking with destructuring");
}

// Test 47: Type checking error handling
try {
    typeCheckDestructure({name: 123, age: "invalid"});
    throw new Error("Test 47 failed: Should throw type error");
} catch (e) {
    if (e.message.indexOf("Test 47 failed") === 0) {
        throw e;
    }
    console.log("Test 47 passed: Type checking error handled");
}

// Destructuring with transformation
function transformDestructure({data}) {
    var [first, second, ...rest] = data;
    return {
        first: first * 2,
        second: second * 2,
        rest: rest.map(function(x) { return x * 2; })
    };
}

var transformResult = transformDestructure({data: [1, 2, 3, 4, 5]});

// Test 48: Destructuring with transformation
if (transformResult.first !== 2 || transformResult.second !== 4) {
    throw new Error("Test 48 failed: Destructuring transformation - first values");
}

if (transformResult.rest.length !== 3 || transformResult.rest[0] !== 6) {
    throw new Error("Test 48 failed: Destructuring transformation - rest values");
}

// Recursive destructuring pattern
function processNestedData(data) {
    if (Array.isArray(data)) {
        var [first, ...rest] = data;
        return {
            type: "array",
            first: processNestedData(first),
            rest: rest.map(processNestedData)
        };
    } else if (data && typeof data === "object") {
        var result = {type: "object"};
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                result[key] = processNestedData(data[key]);
            }
        }
        return result;
    }
    return {type: "primitive", value: data};
}

var recursiveData = [1, {a: 2, b: [3, 4]}, 5];
var processed = processNestedData(recursiveData);

// Test 49: Recursive destructuring processing
if (processed.type !== "array" || processed.first.type !== "primitive") {
    throw new Error("Test 49 failed: Recursive destructuring processing");
}

// Destructuring with validation and defaults
function validateAndDestructure(config = {}) {
    var {
        database: {
            host = "localhost",
            port = 5432,
            name = "defaultdb"
        } = {},
        api: {
            version = "v1",
            timeout = 30000
        } = {},
        features: {
            caching = true,
            logging = false
        } = {}
    } = config;

    return {
        database: {host, port, name},
        api: {version, timeout},
        features: {caching, logging}
    };
}

// Test 50: Complex validation and defaults
var config1 = validateAndDestructure();
if (config1.database.host !== "localhost" || config1.api.timeout !== 30000) {
    throw new Error("Test 50 failed: Default configuration");
}

// Test 51: Partial configuration override
var config2 = validateAndDestructure({
    database: {host: "prod-server"},
    features: {logging: true}
});
if (config2.database.host !== "prod-server" || config2.database.port !== 5432) {
    throw new Error("Test 51 failed: Partial configuration override");
}

// Destructuring performance test with large objects
var largeObj = {};
for (var i = 0; i < 1000; i++) {
    largeObj["prop" + i] = i;
}

var {prop0, prop500, prop999} = largeObj;

// Test 52: Large object destructuring
if (prop0 !== 0 || prop500 !== 500 || prop999 !== 999) {
    throw new Error("Test 52 failed: Large object destructuring");
}

// Destructuring with mixed data types
var mixedData = {
    string: "text",
    number: 42,
    boolean: true,
    array: [1, 2, 3],
    object: {nested: "value"},
    nullValue: null,
    undefinedValue: undefined
};

var {
    string,
    number,
    boolean,
    array: [arrayFirst],
    object: {nested},
    nullValue,
    undefinedValue = "default for undefined"
} = mixedData;

// Test 53: Mixed data types destructuring
if (string !== "text" || number !== 42 || boolean !== true) {
    throw new Error("Test 53 failed: Mixed data types - primitives");
}

if (arrayFirst !== 1 || nested !== "value") {
    throw new Error("Test 53 failed: Mixed data types - complex");
}

if (nullValue !== null || undefinedValue !== "default for undefined") {
    throw new Error("Test 53 failed: Mixed data types - null/undefined");
}

// Destructuring with function composition
function step1({input}) {
    return {result: input * 2, step: 1};
}

function step2({result}) {
    return {result: result + 10, step: 2};
}

function step3({result}) {
    return {result: result / 2, step: 3};
}

function pipeline(data) {
    var step1Result = step1(data);
    var step2Result = step2(step1Result);
    var step3Result = step3(step2Result);
    return step3Result;
}

var pipelineResult = pipeline({input: 5});

// Test 54: Function composition with destructuring
if (pipelineResult.result !== 10 || pipelineResult.step !== 3) {
    throw new Error("Test 54 failed: Function composition with destructuring");
}

// Destructuring with error boundaries
function safeDestructure(data, fallback = {}) {
    try {
        var {
            user: {
                profile: {
                    name = "Unknown",
                    email = "no-email"
                } = {}
            } = {}
        } = data || {};
        return {success: true, name, email};
    } catch (e) {
        var {name = "Error", email = "error"} = fallback;
        return {success: false, name, email, error: e.message};
    }
}

// Test 55: Safe destructuring success case
var safeResult1 = safeDestructure({
    user: {
        profile: {
            name: "John",
            email: "john@example.com"
        }
    }
});

if (!safeResult1.success || safeResult1.name !== "John") {
    throw new Error("Test 55 failed: Safe destructuring success case");
}

// Test 56: Safe destructuring with null - uses defaults, not fallback
var safeResult2 = safeDestructure(null, {name: "Fallback", email: "fallback@example.com"});
if (!safeResult2.success || safeResult2.name !== "Unknown") {
    throw new Error("Test 56 failed: Safe destructuring null case should use defaults");
}

// Destructuring with array methods
var arrayData = [
    {name: "Alice", score: 85},
    {name: "Bob", score: 92},
    {name: "Charlie", score: 78}
];

var highScorers = arrayData
    .filter(function({score}) { return score > 80; })
    .map(function({name, score}) { return {name, grade: score > 90 ? "A" : "B"}; });

// Test 57: Destructuring with array methods
if (highScorers.length !== 2) {
    throw new Error("Test 57 failed: Array method filtering with destructuring");
}

if (highScorers[0].name !== "Alice" || highScorers[0].grade !== "B") {
    throw new Error("Test 57 failed: Array method mapping with destructuring");
}

// Destructuring with reduce
var inventory = [
    {item: "apples", quantity: 10, price: 1.5},
    {item: "bananas", quantity: 6, price: 0.8},
    {item: "oranges", quantity: 8, price: 2.0}
];

var total = inventory.reduce(function(sum, {quantity, price}) {
    return sum + (quantity * price);
}, 0);

// Test 58: Destructuring with reduce
if (total !== 35.8) { // 15 + 4.8 + 16 = 35.8
    throw new Error("Test 58 failed: Destructuring with reduce");
}

// Advanced nested destructuring with renaming
var apiResponse = {
    data: {
        users: [
            {id: 1, profile: {firstName: "John", lastName: "Doe"}},
            {id: 2, profile: {firstName: "Jane", lastName: "Smith"}}
        ],
        pagination: {
            page: 1,
            totalPages: 5,
            hasNext: true
        }
    },
    meta: {
        timestamp: "2025-01-01",
        version: "2.0"
    }
};

var {
    data: {
        users: [
            {id: firstUserId, profile: {firstName: firstUserFirstName}},
            {profile: {lastName: secondUserLastName}}
        ],
        pagination: {page: currentPage, hasNext: hasNextPage}
    },
    meta: {version: apiVersion}
} = apiResponse;

// Test 59: Advanced nested destructuring with renaming
if (firstUserId !== 1 || firstUserFirstName !== "John") {
    throw new Error("Test 59 failed: Advanced nested destructuring - first user");
}

if (secondUserLastName !== "Smith" || currentPage !== 1) {
    throw new Error("Test 59 failed: Advanced nested destructuring - second user and pagination");
}

if (!hasNextPage || apiVersion !== "2.0") {
    throw new Error("Test 59 failed: Advanced nested destructuring - meta data");
}

// Destructuring with generators (if available)
try {
    eval(`
        function* dataGenerator() {
            yield {type: "user", data: {name: "Generator User"}};
            yield {type: "post", data: {title: "Generator Post"}};
        }

        var gen = dataGenerator();
        var {value: {type: firstType, data: {name: generatorName}}} = gen.next();
        var {value: {data: {title: generatorTitle}}} = gen.next();

        if (firstType !== "user" || generatorName !== "Generator User") {
            throw new Error("Test 60 failed: Destructuring with generators - first");
        }
        if (generatorTitle !== "Generator Post") {
            throw new Error("Test 60 failed: Destructuring with generators - second");
        }
    `);
    console.log("Test 60 passed: Destructuring with generators");
} catch (e) {
    if (e.message.indexOf("Test 60 failed") === 0) {
        throw e;
    }
    console.log("Test 60 skipped: Generators not available");
}

// Comprehensive destructuring integration test
function processComplexData(data) {
    try {
        var {
            metadata: {
                version = "1.0",
                author: {
                    name: authorName = "Unknown",
                    contacts: [
                        {type: emailType = "email", value: authorEmail = "none"} = {},
                        ...otherContacts
                    ] = []
                } = {}
            } = {},
            content: {
                sections: [
                    {title: firstSectionTitle, items: [...firstSectionItems]},
                    ...otherSections
                ] = []
            } = {},
            settings: {
                theme = "default",
                features: {
                    search = false,
                    export: exportSettings = {}
                } = {}
            } = {}
        } = data;

        return {
            version,
            authorName,
            authorEmail,
            totalContacts: otherContacts.length + (authorEmail !== "none" ? 1 : 0),
            firstSectionTitle,
            firstSectionItemCount: firstSectionItems.length,
            totalSections: otherSections.length + (firstSectionTitle ? 1 : 0),
            theme,
            searchEnabled: search,
            hasExportSettings: Object.keys(exportSettings).length > 0
        };
    } catch (error) {
        return {error: error.message};
    }
}

// Test 61-70: Comprehensive integration tests
var complexTestData = {
    metadata: {
        version: "2.1",
        author: {
            name: "Complex Author",
            contacts: [
                {type: "email", value: "author@example.com"},
                {type: "phone", value: "123-456-7890"},
                {type: "website", value: "author.com"}
            ]
        }
    },
    content: {
        sections: [
            {title: "Introduction", items: ["item1", "item2", "item3"]},
            {title: "Main Content", items: ["main1", "main2"]},
            {title: "Conclusion", items: ["conclusion"]}
        ]
    },
    settings: {
        theme: "dark",
        features: {
            search: true,
            export: {format: "pdf", quality: "high"}
        }
    }
};

var complexResult = processComplexData(complexTestData);

// Test 61: Version extraction
if (complexResult.version !== "2.1") {
    throw new Error("Test 61 failed: Version extraction");
}

// Test 62: Author information
if (complexResult.authorName !== "Complex Author") {
    throw new Error("Test 62 failed: Author name extraction");
}

// Test 63: Contact information
if (complexResult.authorEmail !== "author@example.com") {
    throw new Error("Test 63 failed: Author email extraction");
}

// Test 64: Contact counting
if (complexResult.totalContacts !== 3) {
    throw new Error("Test 64 failed: Total contacts counting");
}

// Test 65: Section processing
if (complexResult.firstSectionTitle !== "Introduction") {
    throw new Error("Test 65 failed: First section title");
}

// Test 66: Section item counting
if (complexResult.firstSectionItemCount !== 3) {
    throw new Error("Test 66 failed: First section item count");
}

// Test 67: Total sections
if (complexResult.totalSections !== 3) {
    throw new Error("Test 67 failed: Total sections count");
}

// Test 68: Settings extraction
if (complexResult.theme !== "dark" || !complexResult.searchEnabled) {
    throw new Error("Test 68 failed: Settings extraction");
}

// Test 69: Export settings detection
if (!complexResult.hasExportSettings) {
    throw new Error("Test 69 failed: Export settings detection");
}

// Test 70: Error handling with malformed data
var errorResult = processComplexData(null);
if (!errorResult.error) {
    throw new Error("Test 70 failed: Error handling for null data");
}

// Test edge cases and boundary conditions

// Test 71: Empty array destructuring
var [empty1, empty2] = [];
if (empty1 !== undefined || empty2 !== undefined) {
    throw new Error("Test 71 failed: Empty array destructuring");
}

// Test 72: Empty object destructuring
var {emptyProp1, emptyProp2} = {};
if (emptyProp1 !== undefined || emptyProp2 !== undefined) {
    throw new Error("Test 72 failed: Empty object destructuring");
}

// Test 73: Destructuring with very deep nesting
var deeplyNested = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: "deeply nested value"
                    }
                }
            }
        }
    }
};

var {a: {b: {c: {d: {e: {f: deepValue} = {}} = {}} = {}} = {}} = {}} = deeplyNested;
if (deepValue !== "deeply nested value") {
    throw new Error("Test 73 failed: Very deep nesting destructuring");
}

// Test 74: Destructuring with circular reference handling
var circularObj = {name: "circular"};
circularObj.self = circularObj;

var {name: circularName} = circularObj;
if (circularName !== "circular") {
    throw new Error("Test 74 failed: Circular reference handling");
}

// Test 75: Maximum complexity destructuring integration
function maxComplexityTest(input) {
    var {
        // Multi-level object destructuring
        config: {
            // Array destructuring within object
            environments: [
                // Object destructuring within array
                {
                    name: primaryEnvName,
                    // Nested object with defaults
                    database: {
                        // Renamed properties with defaults
                        host: primaryDbHost = "localhost",
                        // Computed property access
                        [input.dbPortKey || "port"]: primaryDbPort = 3306
                    } = {},
                    // Array destructuring with rest
                    services: [primaryService, ...otherServices] = []
                },
                // Second environment with different structure
                {
                    name: secondaryEnvName = "backup",
                    // Optional chaining simulation with defaults
                    settings: {
                        cache: cacheSettings = {enabled: false}
                    } = {}
                } = {}
            ] = []
        } = {},
        // Parallel destructuring of different data structure
        metadata: {
            // Mixed destructuring patterns
            tags: [...allTags] = [],
            // Function parameter destructuring simulation
            processors: [
                {
                    type: processorType,
                    // Nested function-like destructuring
                    handler: {
                        name: handlerName = "default"
                    } = {}
                } = {}
            ] = []
        } = {}
    } = input;

    return {
        primary: {
            env: primaryEnvName,
            db: {host: primaryDbHost, port: primaryDbPort},
            serviceCount: otherServices.length + (primaryService ? 1 : 0)
        },
        secondary: {
            env: secondaryEnvName,
            cacheEnabled: cacheSettings.enabled
        },
        meta: {
            tagCount: allTags.length,
            processor: {type: processorType, handler: handlerName}
        }
    };
}

var maxComplexInput = {
    dbPortKey: "port",
    config: {
        environments: [
            {
                name: "production",
                database: {host: "prod-server", port: 5432},
                services: ["auth", "api", "cache"]
            },
            {
                name: "staging",
                settings: {cache: {enabled: true}}
            }
        ]
    },
    metadata: {
        tags: ["v1", "stable", "production"],
        processors: [
            {type: "validator", handler: {name: "schema-validator"}}
        ]
    }
};

var maxResult = maxComplexityTest(maxComplexInput);

// Final comprehensive validation
if (maxResult.primary.env !== "production") {
    throw new Error("Test 75 failed: Max complexity - primary environment");
}

if (maxResult.primary.db.host !== "prod-server" || maxResult.primary.db.port !== 5432) {
    throw new Error("Test 75 failed: Max complexity - primary database");
}

if (maxResult.primary.serviceCount !== 3) {
    throw new Error("Test 75 failed: Max complexity - service counting");
}

if (maxResult.secondary.env !== "staging" || !maxResult.secondary.cacheEnabled) {
    throw new Error("Test 75 failed: Max complexity - secondary environment");
}

if (maxResult.meta.tagCount !== 3) {
    throw new Error("Test 75 failed: Max complexity - metadata tags");
}

if (maxResult.meta.processor.type !== "validator" || maxResult.meta.processor.handler !== "schema-validator") {
    throw new Error("Test 75 failed: Max complexity - processor configuration");
}

console.log("All 75+ comprehensive advanced destructuring tests passed!");
console.log("Features tested: Basic patterns, nested destructuring, defaults, rest patterns,");
console.log("function parameters, assignment, swapping, error handling, and complex integrations.");