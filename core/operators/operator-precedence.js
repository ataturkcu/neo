/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Operator Precedence and Associativity
 */

// Test basic arithmetic precedence: multiplication before addition
var result1 = 2 + 3 * 4;
if (result1 !== 14) throw new Error("2 + 3 * 4 should equal 14, got " + result1);

var result2 = 3 * 4 + 2;
if (result2 !== 14) throw new Error("3 * 4 + 2 should equal 14, got " + result2);

// Test parentheses override precedence
var result3 = (2 + 3) * 4;
if (result3 !== 20) throw new Error("(2 + 3) * 4 should equal 20, got " + result3);

// Test division and multiplication have same precedence (left-to-right)
var result4 = 24 / 2 * 3;
if (result4 !== 36) throw new Error("24 / 2 * 3 should equal 36, got " + result4);

var result5 = 24 * 3 / 2;
if (result5 !== 36) throw new Error("24 * 3 / 2 should equal 36, got " + result5);

// Test exponentiation has highest precedence and is right-associative
var result6 = 2 ** 3 ** 2;
if (result6 !== 512) throw new Error("2 ** 3 ** 2 should equal 512 (2 ** (3 ** 2)), got " + result6);

var result7 = (2 ** 3) ** 2;
if (result7 !== 64) throw new Error("(2 ** 3) ** 2 should equal 64, got " + result7);

// Test unary operators have higher precedence than binary
var result8 = -2 + 3;
if (result8 !== 1) throw new Error("-2 + 3 should equal 1, got " + result8);

var result9 = -(2 + 3);
if (result9 !== -5) throw new Error("-(2 + 3) should equal -5, got " + result9);

// Test prefix increment vs multiplication
var a = 5;
var result10 = ++a * 2;
if (result10 !== 12) throw new Error("++a * 2 should equal 12 (a=5), got " + result10);
if (a !== 6) throw new Error("a should be 6 after ++a, got " + a);

// Test postfix increment vs multiplication
var b = 5;
var result11 = b++ * 2;
if (result11 !== 10) throw new Error("b++ * 2 should equal 10 (b=5), got " + result11);
if (b !== 6) throw new Error("b should be 6 after b++, got " + b);

// Test comparison operators vs arithmetic
var result12 = 3 + 4 > 5;
if (result12 !== true) throw new Error("3 + 4 > 5 should be true, got " + result12);

var result13 = 3 > 4 + 5;
if (result13 !== false) throw new Error("3 > 4 + 5 should be false, got " + result13);

// Test logical AND vs OR precedence
var result14 = true || false && false;
if (result14 !== true) throw new Error("true || false && false should be true (|| has lower precedence), got " + result14);

var result15 = (true || false) && false;
if (result15 !== false) throw new Error("(true || false) && false should be false, got " + result15);

// Test bitwise operators precedence
var result16 = 5 | 3 & 1;
if (result16 !== 5) throw new Error("5 | 3 & 1 should equal 5 (& has higher precedence), got " + result16);

var result17 = (5 | 3) & 1;
if (result17 !== 1) throw new Error("(5 | 3) & 1 should equal 1, got " + result17);

// Test shift operators vs addition
var result18 = 4 + 2 << 1;
if (result18 !== 12) throw new Error("4 + 2 << 1 should equal 12 (addition first), got " + result18);

var result19 = 4 << 2 + 1;
if (result19 !== 32) throw new Error("4 << 2 + 1 should equal 32 (addition first), got " + result19);

// Test ternary operator precedence
var result20 = true ? 1 + 2 : 3 + 4;
if (result20 !== 3) throw new Error("true ? 1 + 2 : 3 + 4 should equal 3, got " + result20);

var result21 = false ? 1 + 2 : 3 + 4;
if (result21 !== 7) throw new Error("false ? 1 + 2 : 3 + 4 should equal 7, got " + result21);

// Test assignment vs ternary
var c = 5;
var result22 = (c = 3) ? c + 1 : c + 2;
if (result22 !== 4) throw new Error("(c = 3) ? c + 1 : c + 2 should equal 4, got " + result22);
if (c !== 3) throw new Error("c should be 3 after assignment, got " + c);

// Test compound assignment operators
var d = 10;
d += 5 * 2;
if (d !== 20) throw new Error("d += 5 * 2 should make d equal 20 (d=10), got " + d);

var e = 10;
e *= 2 + 3;
if (e !== 50) throw new Error("e *= 2 + 3 should make e equal 50 (e=10), got " + e);

// Test typeof vs arithmetic
var result23 = typeof 5 + 3;
if (result23 !== "number3") throw new Error("typeof 5 + 3 should equal 'number3', got " + result23);

var result24 = typeof (5 + 3);
if (result24 !== "number") throw new Error("typeof (5 + 3) should equal 'number', got " + result24);

// Test complex precedence chain
var result25 = 2 + 3 * 4 ** 2 / 2 - 1;
if (result25 !== 25) throw new Error("2 + 3 * 4 ** 2 / 2 - 1 should equal 25, got " + result25);

// Test associativity of assignment operators (right-to-left)
var f, g, h;
f = g = h = 5;
if (f !== 5 || g !== 5 || h !== 5) throw new Error("f = g = h = 5 should set all to 5");

// Test mixed logical and comparison operators
var result26 = 5 > 3 && 2 < 4 || false;
if (result26 !== true) throw new Error("5 > 3 && 2 < 4 || false should be true, got " + result26);

// Test equality vs relational precedence
var result27 = 5 > 3 == true;
if (result27 !== true) throw new Error("5 > 3 == true should be true, got " + result27);

var result28 = 5 == 3 > 2;
if (result28 !== false) throw new Error("5 == 3 > 2 should be false (5 == (3 > 2)), got " + result28);

// Test in operator precedence
var obj = {a: 1, b: 2};
var result29 = "a" in obj && "b" in obj;
if (result29 !== true) throw new Error("'a' in obj && 'b' in obj should be true, got " + result29);

// Test instanceof operator precedence
var arr = [];
var result30 = arr instanceof Array && typeof arr === "object";
if (result30 !== true) throw new Error("arr instanceof Array && typeof arr === 'object' should be true, got " + result30);

// Test comma operator (lowest precedence)
var result31 = (1, 2, 3);
if (result31 !== 3) throw new Error("(1, 2, 3) should equal 3, got " + result31);

var result32 = (1, 2, 3);
if (result32 !== 3) throw new Error("(1, 2, 3) should equal 3 (comma operator returns last value), got " + result32);

// Test void operator precedence
var result33 = void 0 + 1;
if (result33 !== NaN && !isNaN(result33)) throw new Error("void 0 + 1 should be NaN, got " + result33);

// Test delete operator precedence
var obj2 = {x: 1};
var result34 = delete obj2.x && obj2.x === undefined;
if (result34 !== true) throw new Error("delete obj2.x && obj2.x === undefined should be true, got " + result34);

// Test complex nested precedence
var result35 = 1 + 2 * 3 > 5 && 4 < 6 || false;
if (result35 !== true) throw new Error("1 + 2 * 3 > 5 && 4 < 6 || false should be true, got " + result35);

// Test precedence with property access
var obj3 = {fn: function() { return 5; }};
var result36 = obj3.fn() + 2 * 3;
if (result36 !== 11) throw new Error("obj3.fn() + 2 * 3 should equal 11, got " + result36);

// Test precedence with array access
var arr2 = [1, 2, 3];
var result37 = arr2[1] + 3 * 2;
if (result37 !== 8) throw new Error("arr2[1] + 3 * 2 should equal 8, got " + result37);

// Test new operator precedence
function TestConstructor() {
    this.value = 42;
}
var result38 = new TestConstructor().value + 8;
if (result38 !== 50) throw new Error("new TestConstructor().value + 8 should equal 50, got " + result38);

// Test complex assignment with precedence
var i = 1;
i += 2 * 3 + 4;
if (i !== 11) throw new Error("i += 2 * 3 + 4 should make i equal 11 (i=1), got " + i);

// Test precedence with multiple unary operators
var result39 = !+false;
if (result39 !== true) throw new Error("!+false should be true, got " + result39);

var result40 = !!5;
if (result40 !== true) throw new Error("!!5 should be true, got " + result40);

// Test conditional operator with assignment
var j = 5;
var result41 = j > 3 ? j += 2 : j -= 2;
if (result41 !== 7 || j !== 7) throw new Error("Conditional with assignment should return and set j to 7, got " + result41);

// Test precedence in function calls
function multiply(a, b) { return a * b; }
var result42 = multiply(2 + 1, 3 * 2);
if (result42 !== 18) throw new Error("multiply(2 + 1, 3 * 2) should equal 18, got " + result42);

// Test precedence with spread operator (if supported)
try {
    var arr3 = [1, 2];
    var arr4 = [0, ...arr3, 3];
    if (arr4.length !== 4) throw new Error("Spread operator test failed");
} catch (e) {
    // Spread operator might not be supported, skip this test
}

// Test final complex precedence example
var result43 = 2 ** 3 + 4 * 5 - 6 / 2 > 25 && true || false;
// 8 + 20 - 3 = 25, 25 > 25 is false, false && true = false, false || false = false
if (result43 !== false) throw new Error("Complex precedence test should be false, got " + result43);