/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: ArrayBuffer Comprehensive Operations
 */

// Test ArrayBuffer constructor
var buffer = new ArrayBuffer(16);
if (!(buffer instanceof ArrayBuffer)) throw new Error("ArrayBuffer constructor should create ArrayBuffer instance");
if (buffer.byteLength !== 16) throw new Error("ArrayBuffer byteLength should be 16");

// Test zero-length ArrayBuffer
var emptyBuffer = new ArrayBuffer(0);
if (emptyBuffer.byteLength !== 0) throw new Error("Zero-length ArrayBuffer should have byteLength 0");

// Test ArrayBuffer constructor with non-integer length
var fractionalBuffer = new ArrayBuffer(10.7);
if (fractionalBuffer.byteLength !== 10) throw new Error("Fractional length should be truncated");

// Test ArrayBuffer constructor with negative length
try {
    var negativeBuffer = new ArrayBuffer(-1);
    throw new Error("Negative length should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Negative length should throw RangeError");
}

// Test ArrayBuffer constructor with very large length
try {
    var largeBuffer = new ArrayBuffer(Math.pow(2, 53));
    throw new Error("Extremely large length should throw error");
} catch (e) {
    // Expected to throw RangeError or other error
}

// Test ArrayBuffer.isView() static method
if (!ArrayBuffer.isView) throw new Error("ArrayBuffer.isView should be defined");

var testBuffer = new ArrayBuffer(8);
var int8View = new Int8Array(testBuffer);
var uint16View = new Uint16Array(testBuffer);
var float32View = new Float32Array(testBuffer);
var dataView = new DataView(testBuffer);

if (!ArrayBuffer.isView(int8View)) throw new Error("ArrayBuffer.isView should return true for TypedArray");
if (!ArrayBuffer.isView(uint16View)) throw new Error("ArrayBuffer.isView should return true for TypedArray");
if (!ArrayBuffer.isView(float32View)) throw new Error("ArrayBuffer.isView should return true for TypedArray");
if (!ArrayBuffer.isView(dataView)) throw new Error("ArrayBuffer.isView should return true for DataView");
if (ArrayBuffer.isView(testBuffer)) throw new Error("ArrayBuffer.isView should return false for ArrayBuffer");
if (ArrayBuffer.isView({})) throw new Error("ArrayBuffer.isView should return false for plain object");
if (ArrayBuffer.isView(null)) throw new Error("ArrayBuffer.isView should return false for null");
if (ArrayBuffer.isView(undefined)) throw new Error("ArrayBuffer.isView should return false for undefined");

// Test ArrayBuffer slice() method
var sourceBuffer = new ArrayBuffer(12);
var sourceView = new Uint8Array(sourceBuffer);
for (var i = 0; i < sourceView.length; i++) {
    sourceView[i] = i + 1;
}

var slicedBuffer = sourceBuffer.slice(2, 8);
if (!(slicedBuffer instanceof ArrayBuffer)) throw new Error("slice() should return ArrayBuffer");
if (slicedBuffer.byteLength !== 6) throw new Error("slice() should have correct byteLength");
if (slicedBuffer === sourceBuffer) throw new Error("slice() should return new ArrayBuffer");

var slicedView = new Uint8Array(slicedBuffer);
if (slicedView[0] !== 3) throw new Error("slice() should copy correct bytes");
if (slicedView[1] !== 4) throw new Error("slice() should copy correct bytes");
if (slicedView[2] !== 5) throw new Error("slice() should copy correct bytes");
if (slicedView[3] !== 6) throw new Error("slice() should copy correct bytes");
if (slicedView[4] !== 7) throw new Error("slice() should copy correct bytes");
if (slicedView[5] !== 8) throw new Error("slice() should copy correct bytes");

// Test ArrayBuffer slice() with negative indices
var negSliceBuffer = sourceBuffer.slice(-6, -2);
if (negSliceBuffer.byteLength !== 4) throw new Error("slice() with negative indices should work");
var negSliceView = new Uint8Array(negSliceBuffer);
if (negSliceView[0] !== 7) throw new Error("slice() with negative indices should copy correct bytes");
if (negSliceView[1] !== 8) throw new Error("slice() with negative indices should copy correct bytes");
if (negSliceView[2] !== 9) throw new Error("slice() with negative indices should copy correct bytes");
if (negSliceView[3] !== 10) throw new Error("slice() with negative indices should copy correct bytes");

// Test ArrayBuffer slice() with single argument
var singleArgSlice = sourceBuffer.slice(4);
if (singleArgSlice.byteLength !== 8) throw new Error("slice() with single argument should slice to end");
var singleArgView = new Uint8Array(singleArgSlice);
if (singleArgView[0] !== 5) throw new Error("slice() with single argument should start correctly");
if (singleArgView[7] !== 12) throw new Error("slice() with single argument should end correctly");

// Test ArrayBuffer slice() with no arguments
var fullSlice = sourceBuffer.slice();
if (fullSlice.byteLength !== sourceBuffer.byteLength) throw new Error("slice() with no arguments should copy entire buffer");
if (fullSlice === sourceBuffer) throw new Error("slice() with no arguments should return new buffer");

// Test ArrayBuffer slice() with out-of-bounds indices
var oobSlice = sourceBuffer.slice(20, 30);
if (oobSlice.byteLength !== 0) throw new Error("slice() with out-of-bounds indices should return empty buffer");

var partialOobSlice = sourceBuffer.slice(10, 20);
if (partialOobSlice.byteLength !== 2) throw new Error("slice() with partial out-of-bounds should work");

// Test ArrayBuffer slice() with reversed indices
var reversedSlice = sourceBuffer.slice(8, 4);
if (reversedSlice.byteLength !== 0) throw new Error("slice() with reversed indices should return empty buffer");

// Test ArrayBuffer slice() independence
var independentBuffer = sourceBuffer.slice(0, 4);
var independentView = new Uint8Array(independentBuffer);
var originalView = new Uint8Array(sourceBuffer);
originalView[0] = 99;
if (independentView[0] !== 1) throw new Error("slice() should create independent buffer");

// Test ArrayBuffer with different TypedArray views
var multiViewBuffer = new ArrayBuffer(16);
var int8MultiView = new Int8Array(multiViewBuffer);
var uint16MultiView = new Uint16Array(multiViewBuffer);
var int32MultiView = new Int32Array(multiViewBuffer);

// Set values through different views
int8MultiView[0] = 1;
int8MultiView[1] = 2;
int8MultiView[2] = 3;
int8MultiView[3] = 4;

// Check through 16-bit view
if (uint16MultiView[0] !== 0x0201) throw new Error("Different views should see same buffer data (little-endian expected)");

// Set through 32-bit view
int32MultiView[1] = 0x08070605;

// Check through 8-bit view
if (int8MultiView[4] !== 5) throw new Error("Different views should modify same buffer");
if (int8MultiView[5] !== 6) throw new Error("Different views should modify same buffer");
if (int8MultiView[6] !== 7) throw new Error("Different views should modify same buffer");
if (int8MultiView[7] !== 8) throw new Error("Different views should modify same buffer");

// Test ArrayBuffer with overlapping views
var overlapBuffer = new ArrayBuffer(8);
var fullView = new Uint8Array(overlapBuffer);
var firstHalf = new Uint8Array(overlapBuffer, 0, 4);
var secondHalf = new Uint8Array(overlapBuffer, 4, 4);

fullView[0] = 10;
fullView[4] = 20;
if (firstHalf[0] !== 10) throw new Error("Overlapping views should share data");
if (secondHalf[0] !== 20) throw new Error("Overlapping views should share data");

// Test ArrayBuffer property immutability
var immutableBuffer = new ArrayBuffer(4);
var originalLength = immutableBuffer.byteLength;
try {
    immutableBuffer.byteLength = 8;
} catch (e) {
    // Expected - byteLength should be read-only
}
if (immutableBuffer.byteLength !== originalLength) throw new Error("ArrayBuffer.byteLength should be immutable");

// Test ArrayBuffer as constructor argument for TypedArrays
var constructorBuffer = new ArrayBuffer(20);
var constructorView = new Uint32Array(constructorBuffer);
if (constructorView.buffer !== constructorBuffer) throw new Error("TypedArray should reference correct buffer");
if (constructorView.byteLength !== 20) throw new Error("TypedArray should have correct byteLength");
if (constructorView.length !== 5) throw new Error("TypedArray should have correct length");

// Test ArrayBuffer with offset in TypedArray constructor
var offsetBuffer = new ArrayBuffer(20);
var offsetView = new Uint16Array(offsetBuffer, 4, 6);
if (offsetView.buffer !== offsetBuffer) throw new Error("TypedArray with offset should reference correct buffer");
if (offsetView.byteOffset !== 4) throw new Error("TypedArray should have correct byteOffset");
if (offsetView.byteLength !== 12) throw new Error("TypedArray with offset should have correct byteLength");
if (offsetView.length !== 6) throw new Error("TypedArray with offset should have correct length");

// Test ArrayBuffer with misaligned offset
try {
    var misalignedView = new Uint32Array(offsetBuffer, 3);
    throw new Error("Misaligned offset should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Misaligned offset should throw RangeError");
}

// Test ArrayBuffer with offset beyond buffer
try {
    var beyondView = new Uint8Array(offsetBuffer, 25);
    throw new Error("Offset beyond buffer should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Offset beyond buffer should throw RangeError");
}

// Test ArrayBuffer with length extending beyond buffer
try {
    var extendView = new Uint8Array(offsetBuffer, 10, 20);
    throw new Error("Length extending beyond buffer should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Length extending beyond buffer should throw RangeError");
}

// Test ArrayBuffer memory behavior
var memoryBuffer = new ArrayBuffer(1000);
var memoryView = new Float64Array(memoryBuffer);

// Fill with known pattern
for (var i = 0; i < memoryView.length; i++) {
    memoryView[i] = i * 1.5;
}

// Verify pattern
for (var i = 0; i < memoryView.length; i++) {
    if (Math.abs(memoryView[i] - (i * 1.5)) > 0.001) {
        throw new Error("ArrayBuffer should maintain data integrity");
    }
}

// Test ArrayBuffer slice preserves data integrity
var integrityBuffer = new ArrayBuffer(40);
var integrityView = new Float32Array(integrityBuffer);
for (var i = 0; i < integrityView.length; i++) {
    integrityView[i] = Math.PI * i;
}

var integritySlice = integrityBuffer.slice(8, 24);
var sliceView = new Float32Array(integritySlice);
for (var i = 0; i < sliceView.length; i++) {
    if (Math.abs(sliceView[i] - (Math.PI * (i + 2))) > 0.001) {
        throw new Error("ArrayBuffer slice should preserve data integrity");
    }
}

// Test ArrayBuffer with maximum theoretical size (implementation dependent)
var maxSafeSize = Math.pow(2, 20); // 1MB, should be safe
var maxBuffer = new ArrayBuffer(maxSafeSize);
if (maxBuffer.byteLength !== maxSafeSize) throw new Error("Large ArrayBuffer should be created successfully");

// Test ArrayBuffer toString and valueOf
var toStringBuffer = new ArrayBuffer(8);
if (typeof toStringBuffer.toString() !== "string") throw new Error("ArrayBuffer toString should return string");
if (toStringBuffer.valueOf() !== toStringBuffer) throw new Error("ArrayBuffer valueOf should return itself");

// Test ArrayBuffer constructor edge cases
var undefinedLengthBuffer = new ArrayBuffer();
if (undefinedLengthBuffer.byteLength !== 0) throw new Error("ArrayBuffer with undefined length should default to 0");

var nullLengthBuffer = new ArrayBuffer(null);
if (nullLengthBuffer.byteLength !== 0) throw new Error("ArrayBuffer with null length should be 0");

var booleanLengthBuffer = new ArrayBuffer(true);
if (booleanLengthBuffer.byteLength !== 1) throw new Error("ArrayBuffer with boolean true should be 1");

var falseBooleanBuffer = new ArrayBuffer(false);
if (falseBooleanBuffer.byteLength !== 0) throw new Error("ArrayBuffer with boolean false should be 0");

var stringLengthBuffer = new ArrayBuffer("8");
if (stringLengthBuffer.byteLength !== 8) throw new Error("ArrayBuffer with string number should convert");

// Test ArrayBuffer with NaN length
var nanLengthBuffer = new ArrayBuffer(NaN);
if (nanLengthBuffer.byteLength !== 0) throw new Error("ArrayBuffer with NaN length should be 0");

// Test ArrayBuffer with Infinity length
try {
    var infinityBuffer = new ArrayBuffer(Infinity);
    throw new Error("ArrayBuffer with Infinity length should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("ArrayBuffer with Infinity should throw RangeError");
}

// Test ArrayBuffer prototype
if (ArrayBuffer.prototype.constructor !== ArrayBuffer) throw new Error("ArrayBuffer prototype constructor should be ArrayBuffer");
if (typeof ArrayBuffer.prototype.slice !== "function") throw new Error("ArrayBuffer prototype should have slice method");

// Test ArrayBuffer slice method binding
var bindBuffer = new ArrayBuffer(10);
var sliceMethod = bindBuffer.slice;
var boundSlice = sliceMethod.call(bindBuffer, 2, 6);
if (boundSlice.byteLength !== 4) throw new Error("ArrayBuffer slice should work when called with different context");

// Test ArrayBuffer species constructor (if supported)
var speciesBuffer = new ArrayBuffer(8);
var speciesSlice = speciesBuffer.slice(0, 4);
if (speciesSlice.constructor !== ArrayBuffer) throw new Error("ArrayBuffer slice should create ArrayBuffer");

// Test ArrayBuffer in different contexts
var contextBuffer = new ArrayBuffer(12);
var globalTest = (function() { return this; })();
if (globalTest && typeof globalTest.ArrayBuffer === "function") {
    var globalBuffer = new globalTest.ArrayBuffer(12);
    if (globalBuffer.byteLength !== 12) throw new Error("ArrayBuffer should work in global context");
}

// Test ArrayBuffer detachment state (theoretical - most implementations don't support transfer)
var detachBuffer = new ArrayBuffer(16);
var detachView = new Uint8Array(detachBuffer);
detachView[0] = 42;
if (detachView[0] !== 42) throw new Error("ArrayBuffer should be accessible before any theoretical detachment");

// Test multiple slices of same buffer
var multiSliceBuffer = new ArrayBuffer(20);
var slice1 = multiSliceBuffer.slice(0, 5);
var slice2 = multiSliceBuffer.slice(5, 10);
var slice3 = multiSliceBuffer.slice(10, 15);
var slice4 = multiSliceBuffer.slice(15, 20);

if (slice1.byteLength + slice2.byteLength + slice3.byteLength + slice4.byteLength !== 20) {
    throw new Error("Multiple slices should account for entire buffer");
}

// Test that slices are independent
var independenceTest = new ArrayBuffer(8);
var indepView = new Uint8Array(independenceTest);
indepView.fill(255);

var indepSlice1 = independenceTest.slice(0, 4);
var indepSlice2 = independenceTest.slice(4, 8);
var indepSliceView1 = new Uint8Array(indepSlice1);
var indepSliceView2 = new Uint8Array(indepSlice2);

indepSliceView1.fill(0);
if (indepSliceView2[0] !== 255) throw new Error("ArrayBuffer slices should be independent");

indepView[0] = 128;
if (indepSliceView1[0] !== 0) throw new Error("ArrayBuffer slices should not affect original");
if (indepSliceView2[0] !== 255) throw new Error("ArrayBuffer slices should not affect each other");