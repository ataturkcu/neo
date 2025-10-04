/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Comparison Operators (==, ===, !=, !==, <, >, <=, >=)
 */

// Test strict equality (===)
var result1 = 5 === 5;
if (result1 !== true) throw new Error("5 === 5 should be true, got " + result1);

var result2 = 5 === "5";
if (result2 !== false) throw new Error("5 === '5' should be false, got " + result2);

var result3 = null === null;
if (result3 !== true) throw new Error("null === null should be true, got " + result3);

var result4 = undefined === undefined;
if (result4 !== true) throw new Error("undefined === undefined should be true, got " + result4);

var result5 = null === undefined;
if (result5 !== false) throw new Error("null === undefined should be false, got " + result5);

// Test loose equality (==) with type coercion
var result6 = 5 == 5;
if (result6 !== true) throw new Error("5 == 5 should be true, got " + result6);

var result7 = 5 == "5";
if (result7 !== true) throw new Error("5 == '5' should be true (type coercion), got " + result7);

var result8 = true == 1;
if (result8 !== true) throw new Error("true == 1 should be true, got " + result8);

var result9 = false == 0;
if (result9 !== true) throw new Error("false == 0 should be true, got " + result9);

var result10 = null == undefined;
if (result10 !== true) throw new Error("null == undefined should be true, got " + result10);

// Test loose equality edge cases
var result11 = "" == 0;
if (result11 !== true) throw new Error("'' == 0 should be true, got " + result11);

var result12 = [] == 0;
if (result12 !== true) throw new Error("[] == 0 should be true, got " + result12);

var result13 = [1] == 1;
if (result13 !== true) throw new Error("[1] == 1 should be true, got " + result13);

var result14 = [1, 2] == "1,2";
if (result14 !== true) throw new Error("[1, 2] == '1,2' should be true, got " + result14);

// Test strict inequality (!==)
var result15 = 5 !== "5";
if (result15 !== true) throw new Error("5 !== '5' should be true, got " + result15);

var result16 = 5 !== 5;
if (result16 !== false) throw new Error("5 !== 5 should be false, got " + result16);

var result17 = null !== undefined;
if (result17 !== true) throw new Error("null !== undefined should be true, got " + result17);

// Test loose inequality (!=)
var result18 = 5 != "6";
if (result18 !== true) throw new Error("5 != '6' should be true, got " + result18);

var result19 = 5 != "5";
if (result19 !== false) throw new Error("5 != '5' should be false (type coercion), got " + result19);

var result20 = true != 1;
if (result20 !== false) throw new Error("true != 1 should be false, got " + result20);

// Test less than (<)
var result21 = 5 < 10;
if (result21 !== true) throw new Error("5 < 10 should be true, got " + result21);

var result22 = 10 < 5;
if (result22 !== false) throw new Error("10 < 5 should be false, got " + result22);

var result23 = 5 < 5;
if (result23 !== false) throw new Error("5 < 5 should be false, got " + result23);

// Test less than with string comparison
var result24 = "apple" < "banana";
if (result24 !== true) throw new Error("'apple' < 'banana' should be true, got " + result24);

var result25 = "10" < "2";
if (result25 !== true) throw new Error("'10' < '2' should be true (string comparison), got " + result25);

var result26 = "10" < 2;
if (result26 !== false) throw new Error("'10' < 2 should be false (numeric comparison), got " + result26);

// Test greater than (>)
var result27 = 10 > 5;
if (result27 !== true) throw new Error("10 > 5 should be true, got " + result27);

var result28 = 5 > 10;
if (result28 !== false) throw new Error("5 > 10 should be false, got " + result28);

var result29 = 5 > 5;
if (result29 !== false) throw new Error("5 > 5 should be false, got " + result29);

// Test less than or equal (<=)
var result30 = 5 <= 10;
if (result30 !== true) throw new Error("5 <= 10 should be true, got " + result30);

var result31 = 10 <= 5;
if (result31 !== false) throw new Error("10 <= 5 should be false, got " + result31);

var result32 = 5 <= 5;
if (result32 !== true) throw new Error("5 <= 5 should be true, got " + result32);

// Test greater than or equal (>=)
var result33 = 10 >= 5;
if (result33 !== true) throw new Error("10 >= 5 should be true, got " + result33);

var result34 = 5 >= 10;
if (result34 !== false) throw new Error("5 >= 10 should be false, got " + result34);

var result35 = 5 >= 5;
if (result35 !== true) throw new Error("5 >= 5 should be true, got " + result35);

// Test comparisons with NaN
var result36 = NaN == NaN;
if (result36 !== false) throw new Error("NaN == NaN should be false, got " + result36);

var result37 = NaN === NaN;
if (result37 !== false) throw new Error("NaN === NaN should be false, got " + result37);

var result38 = NaN < 5;
if (result38 !== false) throw new Error("NaN < 5 should be false, got " + result38);

var result39 = 5 < NaN;
if (result39 !== false) throw new Error("5 < NaN should be false, got " + result39);

// Test comparisons with Infinity
var result40 = Infinity > 1000000;
if (result40 !== true) throw new Error("Infinity > 1000000 should be true, got " + result40);

var result41 = -Infinity < -1000000;
if (result41 !== true) throw new Error("-Infinity < -1000000 should be true, got " + result41);

var result42 = Infinity === Infinity;
if (result42 !== true) throw new Error("Infinity === Infinity should be true, got " + result42);

// Test type coercion in comparisons
var result43 = "5" > 3;
if (result43 !== true) throw new Error("'5' > 3 should be true (numeric conversion), got " + result43);

var result44 = true < 2;
if (result44 !== true) throw new Error("true < 2 should be true (true becomes 1), got " + result44);

var result45 = false > -1;
if (result45 !== true) throw new Error("false > -1 should be true (false becomes 0), got " + result45);

// Test object comparison (reference equality)
var obj1 = {};
var obj2 = {};
var obj3 = obj1;

var result46 = obj1 === obj2;
if (result46 !== false) throw new Error("obj1 === obj2 should be false (different objects), got " + result46);

var result47 = obj1 === obj3;
if (result47 !== true) throw new Error("obj1 === obj3 should be true (same reference), got " + result47);

// Test array comparison
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
var arr3 = arr1;

var result48 = arr1 === arr2;
if (result48 !== false) throw new Error("arr1 === arr2 should be false (different arrays), got " + result48);

var result49 = arr1 === arr3;
if (result49 !== true) throw new Error("arr1 === arr3 should be true (same reference), got " + result49);

// Test function comparison
function func1() {}
function func2() {}
var func3 = func1;

var result50 = func1 === func2;
if (result50 !== false) throw new Error("func1 === func2 should be false (different functions), got " + result50);

var result51 = func1 === func3;
if (result51 !== true) throw new Error("func1 === func3 should be true (same reference), got " + result51);

// Test comparison with objects that have valueOf
var objWithValueOf = {
    valueOf: function() { return 10; }
};

var result52 = objWithValueOf > 5;
if (result52 !== true) throw new Error("Object with valueOf > 5 should be true, got " + result52);

var result53 = objWithValueOf == 10;
if (result53 !== true) throw new Error("Object with valueOf == 10 should be true, got " + result53);

// Test comparison with objects that have toString
var objWithToString = {
    toString: function() { return "5"; }
};

var result54 = objWithToString == "5";
if (result54 !== true) throw new Error("Object with toString == '5' should be true, got " + result54);

var result55 = objWithToString > 3;
if (result55 !== true) throw new Error("Object with toString > 3 should be true, got " + result55);

// Test edge case: comparison of special values
var result56 = 0 === -0;
if (result56 !== true) throw new Error("0 === -0 should be true, got " + result56);

var result57 = 1/0 === 1/-0;
if (result57 !== false) throw new Error("1/0 === 1/-0 should be false (Infinity vs -Infinity), got " + result57);

// Test string comparison edge cases
var result58 = "10" > "9";
if (result58 !== false) throw new Error("'10' > '9' should be false (lexicographic), got " + result58);

var result59 = "a" > "Z";
if (result59 !== true) throw new Error("'a' > 'Z' should be true (ASCII values), got " + result59);

// Test empty string comparisons
var result60 = "" == 0;
if (result60 !== true) throw new Error("'' == 0 should be true, got " + result60);

var result61 = "" === 0;
if (result61 !== false) throw new Error("'' === 0 should be false, got " + result61);

var result62 = "" < "a";
if (result62 !== true) throw new Error("'' < 'a' should be true, got " + result62);

// Test null and undefined comparisons
var result63 = null == 0;
if (result63 !== false) throw new Error("null == 0 should be false, got " + result63);

var result64 = undefined == 0;
if (result64 !== false) throw new Error("undefined == 0 should be false, got " + result64);

var result65 = null < 1;
if (result65 !== true) throw new Error("null < 1 should be true (null becomes 0), got " + result65);

var result66 = undefined < 1;
if (result66 !== false) throw new Error("undefined < 1 should be false (undefined becomes NaN), got " + result66);

// Test complex type coercion scenarios
var result67 = [1,2] == "1,2";
if (result67 !== true) throw new Error("[1,2] == '1,2' should be true, got " + result67);

var result68 = ({}) == "[object Object]";
if (result68 !== true) throw new Error("{} == '[object Object]' should be true, got " + result68);

// Test primitive wrapper comparisons
var str1 = new String("hello");
var str2 = new String("hello");
var str3 = "hello";

var result69 = str1 === str2;
if (result69 !== false) throw new Error("new String() objects should not be strictly equal, got " + result69);

var result70 = str1 == str3;
if (result70 !== true) throw new Error("String object == primitive should be true, got " + result70);

var result71 = str1 === str3;
if (result71 !== false) throw new Error("String object === primitive should be false, got " + result71);

// Test Boolean wrapper comparisons
var bool1 = new Boolean(true);
var bool2 = true;

var result72 = bool1 == bool2;
if (result72 !== true) throw new Error("Boolean object == primitive should be true, got " + result72);

var result73 = bool1 === bool2;
if (result73 !== false) throw new Error("Boolean object === primitive should be false, got " + result73);

// Test Number wrapper comparisons
var num1 = new Number(42);
var num2 = 42;

var result74 = num1 == num2;
if (result74 !== true) throw new Error("Number object == primitive should be true, got " + result74);

var result75 = num1 === num2;
if (result75 !== false) throw new Error("Number object === primitive should be false, got " + result75);