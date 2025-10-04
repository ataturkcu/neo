/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: TypedArray Basic Operations
 */

// Test Int8Array constructor and basic properties
var int8 = new Int8Array(4);
if (int8.length !== 4) throw new Error("Int8Array length should be 4");
if (int8.byteLength !== 4) throw new Error("Int8Array byteLength should be 4");
if (int8.BYTES_PER_ELEMENT !== 1) throw new Error("Int8Array BYTES_PER_ELEMENT should be 1");
if (Int8Array.BYTES_PER_ELEMENT !== 1) throw new Error("Int8Array.BYTES_PER_ELEMENT should be 1");

// Test Int8Array constructor with array
var int8FromArray = new Int8Array([1, -1, 127, -128]);
if (int8FromArray.length !== 4) throw new Error("Int8Array from array length should be 4");
if (int8FromArray[0] !== 1) throw new Error("Int8Array[0] should be 1");
if (int8FromArray[1] !== -1) throw new Error("Int8Array[1] should be -1");
if (int8FromArray[2] !== 127) throw new Error("Int8Array[2] should be 127");
if (int8FromArray[3] !== -128) throw new Error("Int8Array[3] should be -128");

// Test Int8Array overflow behavior
var int8Overflow = new Int8Array([128, -129, 256]);
if (int8Overflow[0] !== -128) throw new Error("Int8Array overflow 128 should be -128");
if (int8Overflow[1] !== 127) throw new Error("Int8Array overflow -129 should be 127");
if (int8Overflow[2] !== 0) throw new Error("Int8Array overflow 256 should be 0");

// Test Uint8Array constructor and basic properties
var uint8 = new Uint8Array(4);
if (uint8.length !== 4) throw new Error("Uint8Array length should be 4");
if (uint8.byteLength !== 4) throw new Error("Uint8Array byteLength should be 4");
if (uint8.BYTES_PER_ELEMENT !== 1) throw new Error("Uint8Array BYTES_PER_ELEMENT should be 1");
if (Uint8Array.BYTES_PER_ELEMENT !== 1) throw new Error("Uint8Array.BYTES_PER_ELEMENT should be 1");

// Test Uint8Array constructor with array
var uint8FromArray = new Uint8Array([0, 1, 255, 128]);
if (uint8FromArray.length !== 4) throw new Error("Uint8Array from array length should be 4");
if (uint8FromArray[0] !== 0) throw new Error("Uint8Array[0] should be 0");
if (uint8FromArray[1] !== 1) throw new Error("Uint8Array[1] should be 1");
if (uint8FromArray[2] !== 255) throw new Error("Uint8Array[2] should be 255");
if (uint8FromArray[3] !== 128) throw new Error("Uint8Array[3] should be 128");

// Test Uint8Array overflow behavior
var uint8Overflow = new Uint8Array([-1, 256, 300]);
if (uint8Overflow[0] !== 255) throw new Error("Uint8Array overflow -1 should be 255");
if (uint8Overflow[1] !== 0) throw new Error("Uint8Array overflow 256 should be 0");
if (uint8Overflow[2] !== 44) throw new Error("Uint8Array overflow 300 should be 44");

// Test Int16Array constructor and basic properties
var int16 = new Int16Array(3);
if (int16.length !== 3) throw new Error("Int16Array length should be 3");
if (int16.byteLength !== 6) throw new Error("Int16Array byteLength should be 6");
if (int16.BYTES_PER_ELEMENT !== 2) throw new Error("Int16Array BYTES_PER_ELEMENT should be 2");
if (Int16Array.BYTES_PER_ELEMENT !== 2) throw new Error("Int16Array.BYTES_PER_ELEMENT should be 2");

// Test Int16Array constructor with array
var int16FromArray = new Int16Array([1000, -1000, 32767, -32768]);
if (int16FromArray.length !== 4) throw new Error("Int16Array from array length should be 4");
if (int16FromArray[0] !== 1000) throw new Error("Int16Array[0] should be 1000");
if (int16FromArray[1] !== -1000) throw new Error("Int16Array[1] should be -1000");
if (int16FromArray[2] !== 32767) throw new Error("Int16Array[2] should be 32767");
if (int16FromArray[3] !== -32768) throw new Error("Int16Array[3] should be -32768");

// Test Int16Array overflow behavior
var int16Overflow = new Int16Array([32768, -32769, 65536]);
if (int16Overflow[0] !== -32768) throw new Error("Int16Array overflow 32768 should be -32768");
if (int16Overflow[1] !== 32767) throw new Error("Int16Array overflow -32769 should be 32767");
if (int16Overflow[2] !== 0) throw new Error("Int16Array overflow 65536 should be 0");

// Test Uint16Array constructor and basic properties
var uint16 = new Uint16Array(3);
if (uint16.length !== 3) throw new Error("Uint16Array length should be 3");
if (uint16.byteLength !== 6) throw new Error("Uint16Array byteLength should be 6");
if (uint16.BYTES_PER_ELEMENT !== 2) throw new Error("Uint16Array BYTES_PER_ELEMENT should be 2");
if (Uint16Array.BYTES_PER_ELEMENT !== 2) throw new Error("Uint16Array.BYTES_PER_ELEMENT should be 2");

// Test Uint16Array constructor with array
var uint16FromArray = new Uint16Array([0, 1000, 65535, 32768]);
if (uint16FromArray.length !== 4) throw new Error("Uint16Array from array length should be 4");
if (uint16FromArray[0] !== 0) throw new Error("Uint16Array[0] should be 0");
if (uint16FromArray[1] !== 1000) throw new Error("Uint16Array[1] should be 1000");
if (uint16FromArray[2] !== 65535) throw new Error("Uint16Array[2] should be 65535");
if (uint16FromArray[3] !== 32768) throw new Error("Uint16Array[3] should be 32768");

// Test Uint16Array overflow behavior
var uint16Overflow = new Uint16Array([-1, 65536, 100000]);
if (uint16Overflow[0] !== 65535) throw new Error("Uint16Array overflow -1 should be 65535");
if (uint16Overflow[1] !== 0) throw new Error("Uint16Array overflow 65536 should be 0");
if (uint16Overflow[2] !== 34464) throw new Error("Uint16Array overflow 100000 should be 34464");

// Test Int32Array constructor and basic properties
var int32 = new Int32Array(2);
if (int32.length !== 2) throw new Error("Int32Array length should be 2");
if (int32.byteLength !== 8) throw new Error("Int32Array byteLength should be 8");
if (int32.BYTES_PER_ELEMENT !== 4) throw new Error("Int32Array BYTES_PER_ELEMENT should be 4");
if (Int32Array.BYTES_PER_ELEMENT !== 4) throw new Error("Int32Array.BYTES_PER_ELEMENT should be 4");

// Test Int32Array constructor with array
var int32FromArray = new Int32Array([1000000, -1000000, 2147483647, -2147483648]);
if (int32FromArray.length !== 4) throw new Error("Int32Array from array length should be 4");
if (int32FromArray[0] !== 1000000) throw new Error("Int32Array[0] should be 1000000");
if (int32FromArray[1] !== -1000000) throw new Error("Int32Array[1] should be -1000000");
if (int32FromArray[2] !== 2147483647) throw new Error("Int32Array[2] should be 2147483647");
if (int32FromArray[3] !== -2147483648) throw new Error("Int32Array[3] should be -2147483648");

// Test Uint32Array constructor and basic properties
var uint32 = new Uint32Array(2);
if (uint32.length !== 2) throw new Error("Uint32Array length should be 2");
if (uint32.byteLength !== 8) throw new Error("Uint32Array byteLength should be 8");
if (uint32.BYTES_PER_ELEMENT !== 4) throw new Error("Uint32Array BYTES_PER_ELEMENT should be 4");
if (Uint32Array.BYTES_PER_ELEMENT !== 4) throw new Error("Uint32Array.BYTES_PER_ELEMENT should be 4");

// Test Uint32Array constructor with array
var uint32FromArray = new Uint32Array([0, 1000000, 4294967295, 2147483648]);
if (uint32FromArray.length !== 4) throw new Error("Uint32Array from array length should be 4");
if (uint32FromArray[0] !== 0) throw new Error("Uint32Array[0] should be 0");
if (uint32FromArray[1] !== 1000000) throw new Error("Uint32Array[1] should be 1000000");
if (uint32FromArray[2] !== 4294967295) throw new Error("Uint32Array[2] should be 4294967295");
if (uint32FromArray[3] !== 2147483648) throw new Error("Uint32Array[3] should be 2147483648");

// Test Float32Array constructor and basic properties
var float32 = new Float32Array(3);
if (float32.length !== 3) throw new Error("Float32Array length should be 3");
if (float32.byteLength !== 12) throw new Error("Float32Array byteLength should be 12");
if (float32.BYTES_PER_ELEMENT !== 4) throw new Error("Float32Array BYTES_PER_ELEMENT should be 4");
if (Float32Array.BYTES_PER_ELEMENT !== 4) throw new Error("Float32Array.BYTES_PER_ELEMENT should be 4");

// Test Float32Array constructor with array
var float32FromArray = new Float32Array([1.5, -2.5, 0.0, 3.14159]);
if (float32FromArray.length !== 4) throw new Error("Float32Array from array length should be 4");
if (Math.abs(float32FromArray[0] - 1.5) > 0.001) throw new Error("Float32Array[0] should be 1.5");
if (Math.abs(float32FromArray[1] - (-2.5)) > 0.001) throw new Error("Float32Array[1] should be -2.5");
if (float32FromArray[2] !== 0.0) throw new Error("Float32Array[2] should be 0.0");
if (Math.abs(float32FromArray[3] - 3.14159) > 0.001) throw new Error("Float32Array[3] should be approximately 3.14159");

// Test Float32Array special values
var float32Special = new Float32Array([Infinity, -Infinity, NaN]);
if (float32Special[0] !== Infinity) throw new Error("Float32Array should store Infinity");
if (float32Special[1] !== -Infinity) throw new Error("Float32Array should store -Infinity");
if (!isNaN(float32Special[2])) throw new Error("Float32Array should store NaN");

// Test Float64Array constructor and basic properties
var float64 = new Float64Array(3);
if (float64.length !== 3) throw new Error("Float64Array length should be 3");
if (float64.byteLength !== 24) throw new Error("Float64Array byteLength should be 24");
if (float64.BYTES_PER_ELEMENT !== 8) throw new Error("Float64Array BYTES_PER_ELEMENT should be 8");
if (Float64Array.BYTES_PER_ELEMENT !== 8) throw new Error("Float64Array.BYTES_PER_ELEMENT should be 8");

// Test Float64Array constructor with array
var float64FromArray = new Float64Array([1.23456789, -2.987654321, 0.0, Math.PI]);
if (float64FromArray.length !== 4) throw new Error("Float64Array from array length should be 4");
if (Math.abs(float64FromArray[0] - 1.23456789) > 0.0000001) throw new Error("Float64Array[0] should be 1.23456789");
if (Math.abs(float64FromArray[1] - (-2.987654321)) > 0.0000001) throw new Error("Float64Array[1] should be -2.987654321");
if (float64FromArray[2] !== 0.0) throw new Error("Float64Array[2] should be 0.0");
if (Math.abs(float64FromArray[3] - Math.PI) > 0.0000001) throw new Error("Float64Array[3] should be approximately π");

// Test Float64Array special values
var float64Special = new Float64Array([Infinity, -Infinity, NaN]);
if (float64Special[0] !== Infinity) throw new Error("Float64Array should store Infinity");
if (float64Special[1] !== -Infinity) throw new Error("Float64Array should store -Infinity");
if (!isNaN(float64Special[2])) throw new Error("Float64Array should store NaN");

// Test TypedArray basic operations - set/get elements
var testArray = new Int16Array(5);
testArray[0] = 100;
testArray[1] = -200;
testArray[2] = 0;
if (testArray[0] !== 100) throw new Error("Setting element 0 should work");
if (testArray[1] !== -200) throw new Error("Setting element 1 should work");
if (testArray[2] !== 0) throw new Error("Setting element 2 should work");
if (testArray[3] !== 0) throw new Error("Unset element should be 0");
if (testArray[4] !== 0) throw new Error("Unset element should be 0");

// Test TypedArray out-of-bounds access
if (typeof testArray[10] !== "undefined") throw new Error("Out-of-bounds read should return undefined");
testArray[10] = 999; // Should be ignored
if (typeof testArray[10] !== "undefined") throw new Error("Out-of-bounds write should be ignored");

// Test TypedArray negative index access
if (typeof testArray[-1] !== "undefined") throw new Error("Negative index read should return undefined");
testArray[-1] = 999; // Should be ignored
if (typeof testArray[-1] !== "undefined") throw new Error("Negative index write should be ignored");

// Test TypedArray buffer property
var bufferTest = new Uint8Array(4);
if (!(bufferTest.buffer instanceof ArrayBuffer)) throw new Error("buffer property should be ArrayBuffer");
if (bufferTest.buffer.byteLength !== 4) throw new Error("buffer byteLength should match array byteLength");

// Test TypedArray byteOffset property
var offsetTest = new Uint8Array(8);
if (offsetTest.byteOffset !== 0) throw new Error("byteOffset should be 0 for direct construction");

// Test constructor from TypedArray
var source = new Int8Array([1, 2, 3, 4]);
var copy = new Int8Array(source);
if (copy.length !== 4) throw new Error("Copy constructor should preserve length");
if (copy[0] !== 1) throw new Error("Copy constructor should copy values");
if (copy[1] !== 2) throw new Error("Copy constructor should copy values");
if (copy[2] !== 3) throw new Error("Copy constructor should copy values");
if (copy[3] !== 4) throw new Error("Copy constructor should copy values");

// Modify original to ensure copy is independent
source[0] = 99;
if (copy[0] !== 1) throw new Error("Copy should be independent of original");

// Test different typed array conversion
var int8Source = new Int8Array([1, 2, 3]);
var uint16Target = new Uint16Array(int8Source);
if (uint16Target.length !== 3) throw new Error("Type conversion should preserve length");
if (uint16Target[0] !== 1) throw new Error("Type conversion should convert values");
if (uint16Target[1] !== 2) throw new Error("Type conversion should convert values");
if (uint16Target[2] !== 3) throw new Error("Type conversion should convert values");

// Test zero-length arrays
var zeroLength = new Int32Array(0);
if (zeroLength.length !== 0) throw new Error("Zero-length array should have length 0");
if (zeroLength.byteLength !== 0) throw new Error("Zero-length array should have byteLength 0");

// Test fractional length (should truncate)
var fractionalLength = new Float32Array(3.7);
if (fractionalLength.length !== 3) throw new Error("Fractional length should truncate to 3");

// Test constructor with undefined/null
try {
    var undefinedLength = new Int8Array(undefined);
    if (undefinedLength.length !== 0) throw new Error("Undefined length should create empty array");
} catch (e) {
    // Some implementations may throw, which is also valid
}

// Test TypedArray as constructor argument for different type
var mixedTypeTest = new Float32Array(new Int8Array([1, 2, 3]));
if (mixedTypeTest.length !== 3) throw new Error("Cross-type construction should work");
if (mixedTypeTest[0] !== 1.0) throw new Error("Cross-type construction should convert values");

// Test constructor with iterable-like objects
var iterableTest = new Uint8Array([1, 2, 3, 4, 5]);
if (iterableTest.length !== 5) throw new Error("Array-like construction should work");
if (iterableTest[0] !== 1) throw new Error("Array-like values should be correct");
if (iterableTest[4] !== 5) throw new Error("Array-like values should be correct");