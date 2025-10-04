/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Bitwise Operators (&, |, ^, ~, <<, >>, >>>)
 */

// Test bitwise AND (&)
var result1 = 5 & 3;
if (result1 !== 1) throw new Error("5 & 3 should equal 1, got " + result1);

var result2 = 12 & 10;
if (result2 !== 8) throw new Error("12 & 10 should equal 8, got " + result2);

var result3 = 7 & 7;
if (result3 !== 7) throw new Error("7 & 7 should equal 7, got " + result3);

var result4 = 0 & 15;
if (result4 !== 0) throw new Error("0 & 15 should equal 0, got " + result4);

// Test bitwise OR (|)
var result5 = 5 | 3;
if (result5 !== 7) throw new Error("5 | 3 should equal 7, got " + result5);

var result6 = 12 | 10;
if (result6 !== 14) throw new Error("12 | 10 should equal 14, got " + result6);

var result7 = 0 | 15;
if (result7 !== 15) throw new Error("0 | 15 should equal 15, got " + result7);

var result8 = 8 | 4 | 2 | 1;
if (result8 !== 15) throw new Error("8 | 4 | 2 | 1 should equal 15, got " + result8);

// Test bitwise XOR (^)
var result9 = 5 ^ 3;
if (result9 !== 6) throw new Error("5 ^ 3 should equal 6, got " + result9);

var result10 = 12 ^ 10;
if (result10 !== 6) throw new Error("12 ^ 10 should equal 6, got " + result10);

var result11 = 7 ^ 7;
if (result11 !== 0) throw new Error("7 ^ 7 should equal 0, got " + result11);

var result12 = 0 ^ 15;
if (result12 !== 15) throw new Error("0 ^ 15 should equal 15, got " + result12);

// Test bitwise NOT (~)
var result13 = ~5;
if (result13 !== -6) throw new Error("~5 should equal -6, got " + result13);

var result14 = ~0;
if (result14 !== -1) throw new Error("~0 should equal -1, got " + result14);

var result15 = ~-1;
if (result15 !== 0) throw new Error("~-1 should equal 0, got " + result15);

var result16 = ~~5;
if (result16 !== 5) throw new Error("~~5 should equal 5, got " + result16);

// Test left shift (<<)
var result17 = 5 << 1;
if (result17 !== 10) throw new Error("5 << 1 should equal 10, got " + result17);

var result18 = 5 << 2;
if (result18 !== 20) throw new Error("5 << 2 should equal 20, got " + result18);

var result19 = 1 << 3;
if (result19 !== 8) throw new Error("1 << 3 should equal 8, got " + result19);

var result20 = 7 << 0;
if (result20 !== 7) throw new Error("7 << 0 should equal 7, got " + result20);

// Test right shift (>>)
var result21 = 10 >> 1;
if (result21 !== 5) throw new Error("10 >> 1 should equal 5, got " + result21);

var result22 = 20 >> 2;
if (result22 !== 5) throw new Error("20 >> 2 should equal 5, got " + result22);

var result23 = 8 >> 3;
if (result23 !== 1) throw new Error("8 >> 3 should equal 1, got " + result23);

var result24 = 7 >> 0;
if (result24 !== 7) throw new Error("7 >> 0 should equal 7, got " + result24);

// Test signed right shift with negative numbers
var result25 = -8 >> 1;
if (result25 !== -4) throw new Error("-8 >> 1 should equal -4, got " + result25);

var result26 = -1 >> 1;
if (result26 !== -1) throw new Error("-1 >> 1 should equal -1 (sign extension), got " + result26);

// Test unsigned right shift (>>>)
var result27 = 8 >>> 1;
if (result27 !== 4) throw new Error("8 >>> 1 should equal 4, got " + result27);

var result28 = -1 >>> 1;
if (result28 !== 2147483647) throw new Error("-1 >>> 1 should equal 2147483647, got " + result28);

var result29 = -8 >>> 1;
if (result29 !== 2147483644) throw new Error("-8 >>> 1 should equal 2147483644, got " + result29);

var result30 = 0 >>> 1;
if (result30 !== 0) throw new Error("0 >>> 1 should equal 0, got " + result30);

// Test with larger numbers
var result31 = 255 & 15;
if (result31 !== 15) throw new Error("255 & 15 should equal 15, got " + result31);

var result32 = 255 | 15;
if (result32 !== 255) throw new Error("255 | 15 should equal 255, got " + result32);

var result33 = 255 ^ 15;
if (result33 !== 240) throw new Error("255 ^ 15 should equal 240, got " + result33);

// Test bitwise operations with floating point numbers (should convert to integers)
var result34 = 5.7 & 3.2;
if (result34 !== 1) throw new Error("5.7 & 3.2 should equal 1 (truncated), got " + result34);

var result35 = 5.9 | 3.1;
if (result35 !== 7) throw new Error("5.9 | 3.1 should equal 7 (truncated), got " + result35);

var result36 = 5.5 << 1;
if (result36 !== 10) throw new Error("5.5 << 1 should equal 10 (truncated), got " + result36);

// Test with string numbers (should convert)
var result37 = "5" & "3";
if (result37 !== 1) throw new Error("'5' & '3' should equal 1, got " + result37);

var result38 = "12" | "10";
if (result38 !== 14) throw new Error("'12' | '10' should equal 14, got " + result38);

var result39 = "5" << "1";
if (result39 !== 10) throw new Error("'5' << '1' should equal 10, got " + result39);

// Test with boolean values (should convert to 0/1)
var result40 = true & true;
if (result40 !== 1) throw new Error("true & true should equal 1, got " + result40);

var result41 = true | false;
if (result41 !== 1) throw new Error("true | false should equal 1, got " + result41);

var result42 = false ^ true;
if (result42 !== 1) throw new Error("false ^ true should equal 1, got " + result42);

var result43 = true << 2;
if (result43 !== 4) throw new Error("true << 2 should equal 4, got " + result43);

// Test with null and undefined (should convert to 0)
var result44 = null & 15;
if (result44 !== 0) throw new Error("null & 15 should equal 0, got " + result44);

var result45 = undefined | 0;
if (result45 !== 0) throw new Error("undefined | 0 should equal 0, got " + result45);

var result46 = null << 2;
if (result46 !== 0) throw new Error("null << 2 should equal 0, got " + result46);

// Test with NaN (should convert to 0)
var result47 = NaN & 15;
if (result47 !== 0) throw new Error("NaN & 15 should equal 0, got " + result47);

var result48 = NaN | 7;
if (result48 !== 7) throw new Error("NaN | 7 should equal 7, got " + result48);

// Test complex expressions
var result49 = (5 & 3) | (2 << 1);
if (result49 !== 5) throw new Error("(5 & 3) | (2 << 1) should equal 5, got " + result49);

var result50 = ~(5 & 3);
if (result50 !== -2) throw new Error("~(5 & 3) should equal -2, got " + result50);

// Test precedence (bitwise has higher precedence than logical)
var result51 = 1 | 2 & 4;
if (result51 !== 1) throw new Error("1 | 2 & 4 should equal 1 (& first), got " + result51);

var result52 = (1 | 2) & 4;
if (result52 !== 0) throw new Error("(1 | 2) & 4 should equal 0, got " + result52);

// Test shift amounts greater than 31 (should be masked)
var result53 = 5 << 32;
if (result53 !== 5) throw new Error("5 << 32 should equal 5 (32 % 32 = 0), got " + result53);

var result54 = 5 << 33;
if (result54 !== 10) throw new Error("5 << 33 should equal 10 (33 % 32 = 1), got " + result54);

var result55 = 16 >> 36;
if (result55 !== 1) throw new Error("16 >> 36 should equal 1 (36 % 32 = 4), got " + result55);

// Test negative shift amounts
var result56 = 8 << -1;
if (result56 !== 0) throw new Error("8 << -1 should equal 0 (masked to << 31), got " + result56);

// Test maximum 32-bit values
var result57 = 0x7FFFFFFF & 0x80000000;
if (result57 !== 0) throw new Error("0x7FFFFFFF & 0x80000000 should equal 0, got " + result57);

var result58 = 0x7FFFFFFF | 0x80000000;
if (result58 !== -1) throw new Error("0x7FFFFFFF | 0x80000000 should equal -1, got " + result58);

// Test XOR swap pattern
var a = 5, b = 3;
a = a ^ b;
b = a ^ b;
a = a ^ b;
if (a !== 3 || b !== 5) throw new Error("XOR swap should work, a=" + a + ", b=" + b);

// Test bit manipulation patterns
var result59 = 8 | (1 << 2);  // Set bit 2
if (result59 !== 12) throw new Error("Setting bit 2 of 8 should give 12, got " + result59);

var result60 = 15 & ~(1 << 2);  // Clear bit 2
if (result60 !== 11) throw new Error("Clearing bit 2 of 15 should give 11, got " + result60);

var result61 = 8 ^ (1 << 3);  // Toggle bit 3
if (result61 !== 0) throw new Error("Toggling bit 3 of 8 should give 0, got " + result61);

// Test checking if bit is set
var value = 12;  // Binary: 1100
var result62 = (value & (1 << 2)) !== 0;  // Check bit 2
if (result62 !== true) throw new Error("Bit 2 of 12 should be set, got " + result62);

var result63 = (value & (1 << 0)) !== 0;  // Check bit 0
if (result63 !== false) throw new Error("Bit 0 of 12 should not be set, got " + result63);

// Test power of 2 detection
var result64 = (8 & (8 - 1)) === 0 && 8 !== 0;
if (result64 !== true) throw new Error("8 should be detected as power of 2, got " + result64);

var result65 = (12 & (12 - 1)) === 0 && 12 !== 0;
if (result65 !== false) throw new Error("12 should not be detected as power of 2, got " + result65);

// Test counting set bits (Brian Kernighan's algorithm)
function countSetBits(n) {
    var count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
}

var result66 = countSetBits(7);  // Binary: 111
if (result66 !== 3) throw new Error("7 should have 3 set bits, got " + result66);

var result67 = countSetBits(8);  // Binary: 1000
if (result67 !== 1) throw new Error("8 should have 1 set bit, got " + result67);

// Test with arrays (should convert to string then number)
var result68 = [5] & [3];
if (result68 !== 1) throw new Error("[5] & [3] should equal 1, got " + result68);

// Test with objects (should convert via valueOf/toString)
var obj1 = { valueOf: function() { return 5; } };
var obj2 = { valueOf: function() { return 3; } };
var result69 = obj1 & obj2;
if (result69 !== 1) throw new Error("Objects with valueOf & should work, got " + result69);

// Test compound assignment operators
var c = 12;
c &= 10;
if (c !== 8) throw new Error("c &= 10 should make c equal 8, got " + c);

var d = 5;
d |= 3;
if (d !== 7) throw new Error("d |= 3 should make d equal 7, got " + d);

var e = 5;
e ^= 3;
if (e !== 6) throw new Error("e ^= 3 should make e equal 6, got " + e);

var f = 8;
f <<= 2;
if (f !== 32) throw new Error("f <<= 2 should make f equal 32, got " + f);

var g = 32;
g >>= 2;
if (g !== 8) throw new Error("g >>= 2 should make g equal 8, got " + g);

var h = -8;
h >>>= 1;
if (h !== 2147483644) throw new Error("h >>>= 1 should make h equal 2147483644, got " + h);