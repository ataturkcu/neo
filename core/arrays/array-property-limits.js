/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Property Limits (based on TEST262 15.4.5.1-5-1)
 */

// Test property named 4294967295 (2**32-1) - not an array element
var a = [];
a[4294967295] = "not an array element";

if (a[4294967295] !== "not an array element") {
    throw new Error("Property 4294967295 should be 'not an array element'");
}

if (a.length !== 0) {
    throw new Error("Array length should still be 0 when setting non-array element");
}

// Test array length behavior with large indices
var b = [];
b[10] = "test";
if (b.length !== 11) {
    throw new Error("Array length should be 11 when setting index 10");
}

// Test that indices >= 2^32 are treated as regular properties
var c = [];
c[4294967296] = "regular property";
if (c.length !== 0) {
    throw new Error("Array length should be 0 when setting index >= 2^32");
}
if (c[4294967296] !== "regular property") {
    throw new Error("Property 4294967296 should be accessible");
}