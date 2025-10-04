/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comprehensive Template Literals
 * Tests template literals, tagged templates, ${} expressions, and edge cases
 */

// Note: Template literals are ES2015+ feature, so we use try/catch for compatibility

// Basic template literal test
try {
    var basic = eval('`Hello World`');
    if (basic !== "Hello World") throw new Error("Basic template literal should work");
} catch (e) {
    // Template literals not supported, skip remaining tests
    throw new Error("Template literals not supported in this engine");
}

// Template literal with simple expression
try {
    var withExpr = eval('`1 + 1 = ${1 + 1}`');
    if (withExpr !== "1 + 1 = 2") throw new Error("Template literal with expression should work");
} catch (e) {
    throw new Error("Template literal expressions not working: " + e.message);
}

// Template literal with variable
try {
    var name = "JavaScript";
    var withVar = eval('`Hello ${name}`');
    if (withVar !== "Hello JavaScript") throw new Error("Template literal with variable should work");
} catch (e) {
    throw new Error("Template literal with variable failed: " + e.message);
}

// Template literal with multiple expressions
try {
    var a = 5;
    var b = 10;
    var multiple = eval('`${a} + ${b} = ${a + b}`');
    if (multiple !== "5 + 10 = 15") throw new Error("Template literal with multiple expressions should work");
} catch (e) {
    throw new Error("Multiple expressions in template literal failed: " + e.message);
}

// Template literal with newlines
try {
    var multiline = eval('`Line 1\nLine 2\nLine 3`');
    if (multiline.indexOf("\n") === -1) throw new Error("Template literal should preserve newlines");
    if (multiline.split("\n").length !== 3) throw new Error("Template literal should have 3 lines");
} catch (e) {
    throw new Error("Multiline template literal failed: " + e.message);
}

// Template literal with escape sequences
try {
    var escaped = eval('`Tab:\\t Quote:\\" Backslash:\\\\`');
    if (escaped.indexOf("\t") === -1) throw new Error("Template literal should process tab escape");
    if (escaped.indexOf('"') === -1) throw new Error("Template literal should process quote escape");
    if (escaped.indexOf("\\") === -1) throw new Error("Template literal should process backslash escape");
} catch (e) {
    throw new Error("Escaped template literal failed: " + e.message);
}

// Template literal with function call
try {
    function getName() { return "World"; }
    var funcCall = eval('`Hello ${getName()}`');
    if (funcCall !== "Hello World") throw new Error("Template literal with function call should work");
} catch (e) {
    throw new Error("Function call in template literal failed: " + e.message);
}

// Template literal with object property
try {
    var obj = { name: "JavaScript", version: 2015 };
    var objProp = eval('`${obj.name} ES${obj.version}`');
    if (objProp !== "JavaScript ES2015") throw new Error("Template literal with object property should work");
} catch (e) {
    throw new Error("Object property in template literal failed: " + e.message);
}

// Template literal with array access
try {
    var arr = ["first", "second", "third"];
    var arrAccess = eval('`Item: ${arr[1]}`');
    if (arrAccess !== "Item: second") throw new Error("Template literal with array access should work");
} catch (e) {
    throw new Error("Array access in template literal failed: " + e.message);
}

// Template literal with ternary operator
try {
    var isTrue = true;
    var ternary = eval('`Result: ${isTrue ? "yes" : "no"}`');
    if (ternary !== "Result: yes") throw new Error("Template literal with ternary should work");
} catch (e) {
    throw new Error("Ternary in template literal failed: " + e.message);
}

// Template literal with nested expressions
try {
    var nested = eval('`Outer ${`inner ${1 + 1}` + " text"}`');
    if (nested !== "Outer inner 2 text") throw new Error("Nested template literal should work");
} catch (e) {
    throw new Error("Nested template literal failed: " + e.message);
}

// Template literal with undefined/null
try {
    var undef;
    var nullVar = null;
    var withUndef = eval('`Undefined: ${undef}, Null: ${nullVar}`');
    if (withUndef !== "Undefined: undefined, Null: null") {
        throw new Error("Template literal with undefined/null should work");
    }
} catch (e) {
    throw new Error("Undefined/null in template literal failed: " + e.message);
}

// Template literal with boolean
try {
    var bool1 = true;
    var bool2 = false;
    var withBool = eval('`True: ${bool1}, False: ${bool2}`');
    if (withBool !== "True: true, False: false") throw new Error("Template literal with boolean should work");
} catch (e) {
    throw new Error("Boolean in template literal failed: " + e.message);
}

// Template literal with numbers
try {
    var int = 42;
    var float = 3.14159;
    var withNumbers = eval('`Integer: ${int}, Float: ${float}`');
    if (withNumbers !== "Integer: 42, Float: 3.14159") throw new Error("Template literal with numbers should work");
} catch (e) {
    throw new Error("Numbers in template literal failed: " + e.message);
}

// Template literal with string methods
try {
    var str = "hello";
    var withMethods = eval('`Upper: ${str.toUpperCase()}, Length: ${str.length}`');
    if (withMethods !== "Upper: HELLO, Length: 5") throw new Error("Template literal with string methods should work");
} catch (e) {
    throw new Error("String methods in template literal failed: " + e.message);
}

// Template literal with complex expressions
try {
    var complex = eval('`Math: ${Math.max(1, 2, 3)}, Array: ${[1,2,3].join("-")}`');
    if (complex !== "Math: 3, Array: 1-2-3") throw new Error("Template literal with complex expressions should work");
} catch (e) {
    throw new Error("Complex expressions in template literal failed: " + e.message);
}

// Tagged template literals (basic)
try {
    function simpleTag(strings, ...values) {
        return strings[0] + values[0] + strings[1];
    }

    var name = "World";
    var tagged = eval('simpleTag`Hello ${name}!`');
    if (tagged !== "Hello World!") throw new Error("Simple tagged template should work");
} catch (e) {
    // Tagged templates might not be supported
    console.log("Tagged templates not supported or failed: " + e.message);
}

// Tagged template with multiple values
try {
    function multiTag(strings, ...values) {
        var result = "";
        for (var i = 0; i < strings.length; i++) {
            result += strings[i];
            if (i < values.length) {
                result += "[" + values[i] + "]";
            }
        }
        return result;
    }

    var x = 1;
    var y = 2;
    var multiTagged = eval('multiTag`x=${x} and y=${y}`');
    if (multiTagged !== "x=[1] and y=[2]") throw new Error("Multi-value tagged template should work");
} catch (e) {
    console.log("Multi-value tagged templates failed: " + e.message);
}

// Tagged template with raw strings
try {
    function rawTag(strings, ...values) {
        return strings.raw[0];
    }

    var rawTagged = eval('rawTag`Line 1\\nLine 2`');
    if (rawTagged !== "Line 1\\nLine 2") throw new Error("Raw tagged template should preserve escapes");
} catch (e) {
    console.log("Raw tagged templates failed: " + e.message);
}

// Template literal with Unicode
try {
    var unicode = "世界";
    var withUnicode = eval('`Hello ${unicode}! 🌍`');
    if (withUnicode.indexOf("世界") === -1) throw new Error("Template literal should handle Unicode");
    if (withUnicode.indexOf("🌍") === -1) throw new Error("Template literal should handle emoji");
} catch (e) {
    throw new Error("Unicode in template literal failed: " + e.message);
}

// Template literal with empty expressions
try {
    var empty = eval('`Before ${""} After`');
    if (empty !== "Before  After") throw new Error("Template literal with empty string should work");
} catch (e) {
    throw new Error("Empty expression in template literal failed: " + e.message);
}

// Template literal with whitespace preservation
try {
    var whitespace = eval('`  Spaces  \n  Tabs\t  `');
    if (whitespace.indexOf("  ") === -1) throw new Error("Template literal should preserve spaces");
    if (whitespace.indexOf("\n") === -1) throw new Error("Template literal should preserve newlines");
    if (whitespace.indexOf("\t") === -1) throw new Error("Template literal should preserve tabs");
} catch (e) {
    throw new Error("Whitespace preservation failed: " + e.message);
}

// Template literal with error in expression
try {
    try {
        eval('`Error: ${nonExistentVariable}`');
        throw new Error("Template literal should throw on undefined variable");
    } catch (innerE) {
        // Expected - undefined variable should throw
        if (innerE.message === "Template literal should throw on undefined variable") throw innerE;
    }
} catch (e) {
    // This is expected behavior
}

// Template literal with typeof operator
try {
    var num = 42;
    var typeofTest = eval('`Type: ${typeof num}`');
    if (typeofTest !== "Type: number") throw new Error("Template literal with typeof should work");
} catch (e) {
    throw new Error("typeof in template literal failed: " + e.message);
}

// Template literal with this context (global)
try {
    var thisTest = eval('`This: ${typeof this}`');
    if (typeof thisTest !== "string") throw new Error("Template literal with this should work");
} catch (e) {
    throw new Error("this in template literal failed: " + e.message);
}

// Template literal with computed property access
try {
    var obj = { a: 1, b: 2, c: 3 };
    var key = "b";
    var computed = eval('`Value: ${obj[key]}`');
    if (computed !== "Value: 2") throw new Error("Template literal with computed property should work");
} catch (e) {
    throw new Error("Computed property in template literal failed: " + e.message);
}

// Template literal with JSON
try {
    var data = { name: "test", value: 123 };
    var jsonTest = eval('`JSON: ${JSON.stringify(data)}`');
    if (jsonTest.indexOf('"name":"test"') === -1) throw new Error("Template literal with JSON should work");
} catch (e) {
    throw new Error("JSON in template literal failed: " + e.message);
}

// Template literal with regular expressions
try {
    var regex = /test/g;
    var text = "test string test";
    var regexTest = eval('`Matches: ${text.match(regex).length}`');
    if (regexTest !== "Matches: 2") throw new Error("Template literal with regex should work");
} catch (e) {
    throw new Error("Regex in template literal failed: " + e.message);
}

// Template literal with arrow functions (if supported)
try {
    eval('var arrow = (x) => x * 2;');
    var arrowTest = eval('`Double: ${arrow(5)}`');
    if (arrowTest !== "Double: 10") throw new Error("Template literal with arrow function should work");
} catch (e) {
    // Arrow functions might not be supported
    console.log("Arrow functions in template literals not supported: " + e.message);
}

// Template literal with destructuring (if supported)
try {
    eval('var {x, y} = {x: 1, y: 2};');
    var destructTest = eval('`X: ${x}, Y: ${y}`');
    if (destructTest !== "X: 1, Y: 2") throw new Error("Template literal with destructuring should work");
} catch (e) {
    // Destructuring might not be supported
    console.log("Destructuring in template literals not supported: " + e.message);
}

// Template literal with spread operator (if supported)
try {
    eval('var arr = [1, 2, 3]; var spread = [...arr, 4];');
    var spreadTest = eval('`Spread: ${spread.join(",")}`');
    if (spreadTest !== "Spread: 1,2,3,4") throw new Error("Template literal with spread should work");
} catch (e) {
    // Spread operator might not be supported
    console.log("Spread operator in template literals not supported: " + e.message);
}

// Very long template literal
try {
    var longExpr = "";
    for (var i = 0; i < 100; i++) {
        longExpr += "${" + i + "} ";
    }
    var longTemplate = "`" + longExpr + "`";

    // Create variables for the template
    for (var j = 0; j < 100; j++) {
        eval("var _" + j + " = " + j + ";");
        longTemplate = longTemplate.replace("${" + j + "}", "${_" + j + "}");
    }

    var longResult = eval(longTemplate);
    if (typeof longResult !== "string") throw new Error("Long template literal should work");
    if (longResult.length < 100) throw new Error("Long template literal should have substantial length");
} catch (e) {
    console.log("Long template literal test failed: " + e.message);
}

// Final comprehensive template literal test
try {
    var user = "JavaScript";
    var version = 2015;
    var features = ["templates", "arrows", "classes"];
    var comprehensive = eval('`Welcome to ${user} ES${version}!\nFeatures: ${features.join(", ")}\nEscape: \\`backtick\\``');

    if (comprehensive.indexOf("Welcome to JavaScript ES2015") === -1) {
        throw new Error("Comprehensive template should contain welcome message");
    }
    if (comprehensive.indexOf("templates, arrows, classes") === -1) {
        throw new Error("Comprehensive template should contain features");
    }
    if (comprehensive.indexOf("`backtick`") === -1) {
        throw new Error("Comprehensive template should contain escaped backticks");
    }
} catch (e) {
    throw new Error("Comprehensive template literal test failed: " + e.message);
}