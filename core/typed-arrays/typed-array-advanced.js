/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: TypedArray Advanced Features
 */

// Test buffer sharing between different TypedArray types
var sharedBuffer = new ArrayBuffer(16);
var int8View = new Int8Array(sharedBuffer);
var uint16View = new Uint16Array(sharedBuffer);
var int32View = new Int32Array(sharedBuffer);

// Fill int8 view with known pattern
for (var i = 0; i < int8View.length; i++) {
    int8View[i] = i + 1;
}

// Check that uint16 view sees the same data
if (uint16View[0] !== 0x0201) throw new Error("Buffer sharing: uint16 should see int8 data (little-endian expected)");
if (uint16View[1] !== 0x0403) throw new Error("Buffer sharing: uint16 should see int8 data");

// Modify through int32 view
int32View[0] = 0x08070605;

// Check changes visible in int8 view
if (int8View[0] !== 5) throw new Error("Buffer sharing: modifications should be visible across views");
if (int8View[1] !== 6) throw new Error("Buffer sharing: modifications should be visible across views");
if (int8View[2] !== 7) throw new Error("Buffer sharing: modifications should be visible across views");
if (int8View[3] !== 8) throw new Error("Buffer sharing: modifications should be visible across views");

// Test buffer sharing with overlapping views
var overlapBuffer = new ArrayBuffer(20);
var fullView = new Uint8Array(overlapBuffer);
var firstHalf = new Uint16Array(overlapBuffer, 0, 4);
var secondHalf = new Uint32Array(overlapBuffer, 8, 2);
var middleView = new Int8Array(overlapBuffer, 4, 8);

// Set data through different views
firstHalf[0] = 0x1234;
secondHalf[0] = 0x56789ABC;

// Verify overlapping access
if (fullView[0] !== 0x34 || fullView[1] !== 0x12) throw new Error("Overlapping views should share buffer data");
if (fullView[8] !== 0xBC || fullView[9] !== 0x9A) throw new Error("Overlapping views should share buffer data");

// Test byte offset calculations
var offsetBuffer = new ArrayBuffer(32);
var baseView = new Uint8Array(offsetBuffer);

// Fill with sequential pattern
for (var i = 0; i < baseView.length; i++) {
    baseView[i] = i;
}

// Create views with different offsets
var offset4View = new Uint16Array(offsetBuffer, 4, 6);
var offset8View = new Uint32Array(offsetBuffer, 8, 4);
var offset12View = new Float32Array(offsetBuffer, 12, 3);

if (offset4View.byteOffset !== 4) throw new Error("ByteOffset should be 4");
if (offset8View.byteOffset !== 8) throw new Error("ByteOffset should be 8");
if (offset12View.byteOffset !== 12) throw new Error("ByteOffset should be 12");

// Verify data at offsets
if (offset4View[0] !== 0x0504) throw new Error("Offset view should read correct data (little-endian)");
if (offset8View[0] !== 0x0B0A0908) throw new Error("Offset view should read correct data");

// Test element size calculations and alignment
var alignmentBuffer = new ArrayBuffer(64);

var int8Aligned = new Int8Array(alignmentBuffer, 0, 64);
if (int8Aligned.BYTES_PER_ELEMENT !== 1) throw new Error("Int8Array BYTES_PER_ELEMENT should be 1");
if (int8Aligned.length !== 64) throw new Error("Int8Array length should be 64");

var int16Aligned = new Int16Array(alignmentBuffer, 0, 32);
if (int16Aligned.BYTES_PER_ELEMENT !== 2) throw new Error("Int16Array BYTES_PER_ELEMENT should be 2");
if (int16Aligned.length !== 32) throw new Error("Int16Array length should be 32");

var int32Aligned = new Int32Array(alignmentBuffer, 0, 16);
if (int32Aligned.BYTES_PER_ELEMENT !== 4) throw new Error("Int32Array BYTES_PER_ELEMENT should be 4");
if (int32Aligned.length !== 16) throw new Error("Int32Array length should be 16");

var float64Aligned = new Float64Array(alignmentBuffer, 0, 8);
if (float64Aligned.BYTES_PER_ELEMENT !== 8) throw new Error("Float64Array BYTES_PER_ELEMENT should be 8");
if (float64Aligned.length !== 8) throw new Error("Float64Array length should be 8");

// Test memory alignment requirements
var alignTestBuffer = new ArrayBuffer(32);

// These should work (aligned)
var aligned16 = new Uint16Array(alignTestBuffer, 0);
var aligned32 = new Uint32Array(alignTestBuffer, 0);
var aligned64 = new Float64Array(alignTestBuffer, 0);

// Test alignment errors
try {
    var misaligned16 = new Uint16Array(alignTestBuffer, 1);
    throw new Error("Misaligned Uint16Array should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Misaligned access should throw RangeError");
}

try {
    var misaligned32 = new Uint32Array(alignTestBuffer, 2);
    throw new Error("Misaligned Uint32Array should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Misaligned access should throw RangeError");
}

try {
    var misaligned64 = new Float64Array(alignTestBuffer, 4);
    throw new Error("Misaligned Float64Array should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Misaligned access should throw RangeError");
}

// Test complex buffer operations with multiple views
var complexBuffer = new ArrayBuffer(1024);
var headerView = new Uint32Array(complexBuffer, 0, 4); // 16 bytes header
var dataView = new Float32Array(complexBuffer, 16, 252); // 1008 bytes data
var footerView = new Uint8Array(complexBuffer, 1024 - 8, 8); // 8 bytes footer

// Set header information
headerView[0] = 0x12345678; // Magic number
headerView[1] = dataView.length; // Data length
headerView[2] = 0; // Flags
headerView[3] = 0xDEADBEEF; // Checksum

// Fill data section
for (var i = 0; i < dataView.length; i++) {
    dataView[i] = Math.sin(i * 0.1);
}

// Set footer
for (var i = 0; i < footerView.length; i++) {
    footerView[i] = 0xFF - i;
}

// Verify complex structure integrity
if (headerView[0] !== 0x12345678) throw new Error("Complex buffer header should be preserved");
if (headerView[1] !== 252) throw new Error("Complex buffer header should contain correct data length");
if (Math.abs(dataView[10] - Math.sin(1.0)) > 0.001) throw new Error("Complex buffer data should be preserved");
if (footerView[0] !== 0xFF) throw new Error("Complex buffer footer should be preserved");

// Test buffer sharing across different endianness
var endianBuffer = new ArrayBuffer(8);
var littleView = new DataView(endianBuffer);
var bigView = new DataView(endianBuffer);
var uint32View = new Uint32Array(endianBuffer);

littleView.setUint32(0, 0x12345678, true); // Little-endian
var bigEndianResult = bigView.getUint32(0, false); // Big-endian
var nativeResult = uint32View[0]; // Platform native

if (littleView.getUint32(0, true) !== 0x12345678) throw new Error("Little-endian write should be preserved");
if (bigEndianResult !== 0x78563412) throw new Error("Big-endian read should swap bytes");

// Test memory layout with mixed types
var layoutBuffer = new ArrayBuffer(40);
var layoutStruct = {
    magic: new Uint32Array(layoutBuffer, 0, 1),
    version: new Uint16Array(layoutBuffer, 4, 1),
    flags: new Uint8Array(layoutBuffer, 6, 2),
    timestamp: new Float64Array(layoutBuffer, 8, 1),
    data: new Int32Array(layoutBuffer, 16, 6)
};

// Set values through struct interface
layoutStruct.magic[0] = 0xCAFEBABE;
layoutStruct.version[0] = 1;
layoutStruct.flags[0] = 0x01;
layoutStruct.flags[1] = 0x02;
layoutStruct.timestamp[0] = Date.now();
for (var i = 0; i < layoutStruct.data.length; i++) {
    layoutStruct.data[i] = i * 100;
}

// Verify through raw bytes
var rawLayout = new Uint8Array(layoutBuffer);
if (rawLayout[0] !== 0xBE || rawLayout[1] !== 0xBA) throw new Error("Memory layout should be preserved");

// Test subarray operations preserving buffer references
var subarrayBuffer = new ArrayBuffer(64);
var originalArray = new Int16Array(subarrayBuffer);
for (var i = 0; i < originalArray.length; i++) {
    originalArray[i] = i * 10;
}

var subarray1 = originalArray.subarray(8, 16);
var subarray2 = originalArray.subarray(16, 24);

if (subarray1.buffer !== subarrayBuffer) throw new Error("Subarray should share original buffer");
if (subarray2.buffer !== subarrayBuffer) throw new Error("Subarray should share original buffer");
if (subarray1.byteOffset !== 16) throw new Error("Subarray should have correct byteOffset");
if (subarray2.byteOffset !== 32) throw new Error("Subarray should have correct byteOffset");

// Modify through subarray
subarray1[0] = 9999;
if (originalArray[8] !== 9999) throw new Error("Subarray modification should affect original");

// Test TypedArray from different ArrayBuffer regions
var regionBuffer = new ArrayBuffer(128);
var region1 = new Uint8Array(regionBuffer, 0, 32);
var region2 = new Uint8Array(regionBuffer, 32, 32);
var region3 = new Uint8Array(regionBuffer, 64, 32);
var region4 = new Uint8Array(regionBuffer, 96, 32);

// Fill each region with different patterns
region1.fill(0xAA);
region2.fill(0xBB);
region3.fill(0xCC);
region4.fill(0xDD);

// Create overlapping typed arrays
var overlap1 = new Uint16Array(regionBuffer, 16, 16); // Spans region1 and region2
var overlap2 = new Uint32Array(regionBuffer, 48, 8);  // Spans region2 and region3

// Check patterns are visible
if ((overlap1[0] & 0xFF) !== 0xAA) throw new Error("Overlapping view should see region1 pattern");
if ((overlap1[15] & 0xFF) !== 0xBB) throw new Error("Overlapping view should see region2 pattern");

// Test byte-level access patterns
var patternBuffer = new ArrayBuffer(16);
var byteAccess = new Uint8Array(patternBuffer);
var wordAccess = new Uint32Array(patternBuffer);

// Set a specific 32-bit pattern
wordAccess[0] = 0x01020304;

// Verify byte-level access (little-endian assumption)
if (byteAccess[0] !== 0x04) throw new Error("Byte access should see LSB first (little-endian)");
if (byteAccess[1] !== 0x03) throw new Error("Byte access should see correct byte order");
if (byteAccess[2] !== 0x02) throw new Error("Byte access should see correct byte order");
if (byteAccess[3] !== 0x01) throw new Error("Byte access should see MSB last (little-endian)");

// Test cross-type data integrity
var integrityBuffer = new ArrayBuffer(64);
var int8Integrity = new Int8Array(integrityBuffer);
var float32Integrity = new Float32Array(integrityBuffer);
var uint16Integrity = new Uint16Array(integrityBuffer);

// Fill with int8 data
for (var i = 0; i < int8Integrity.length; i++) {
    int8Integrity[i] = (i % 256) - 128;
}

// Read same data as float32 (should be very small numbers or denormal)
var floatValue = float32Integrity[0];
if (isNaN(floatValue)) throw new Error("Cross-type access should not produce NaN for valid bit patterns");

// Modify as uint16 and verify int8 changes
uint16Integrity[0] = 0x1234;
if (int8Integrity[0] !== 0x34 || int8Integrity[1] !== 0x12) {
    throw new Error("Cross-type modification should be visible in original view");
}

// Test buffer detachment simulation (theoretical)
var detachBuffer = new ArrayBuffer(32);
var detachView = new Int32Array(detachBuffer);
detachView[0] = 42;

// ArrayBuffer should remain accessible
if (detachView[0] !== 42) throw new Error("ArrayBuffer should remain accessible");
if (detachView.buffer !== detachBuffer) throw new Error("TypedArray should maintain buffer reference");

// Test complex offset calculations
var calcBuffer = new ArrayBuffer(100);

// Create view that doesn't start at beginning and doesn't end at end
var calcView = new Float64Array(calcBuffer, 16, 8); // offset must be multiple of 8
if (calcView.byteOffset !== 16) throw new Error("Complex offset should be calculated correctly");
if (calcView.byteLength !== 64) throw new Error("Complex byte length should be calculated correctly");
if (calcView.length !== 8) throw new Error("Complex element length should be calculated correctly");

// Verify buffer boundaries
if (calcBuffer.byteLength !== 100) throw new Error("Original buffer length should be unchanged");
if (calcView.byteOffset + calcView.byteLength > calcBuffer.byteLength) {
    throw new Error("View should not exceed buffer boundaries");
}

// Test maximum element access patterns
var maxBuffer1 = new ArrayBuffer(1024);
var maxBuffer2 = new ArrayBuffer(1024);
var maxInt8 = new Int8Array(maxBuffer1);
var maxFloat64 = new Float64Array(maxBuffer2); // Use separate buffers to avoid overlap

// Test maximum valid indices
maxInt8[1023] = 127; // Last valid index
maxFloat64[127] = 3.14159; // Last valid index

if (maxInt8[1023] !== 127) throw new Error("Maximum index access should work");
if (Math.abs(maxFloat64[127] - 3.14159) > 0.0001) throw new Error("Maximum index access should work");

// Test element size relationships
if (maxInt8.length !== maxBuffer1.byteLength / Int8Array.BYTES_PER_ELEMENT) {
    throw new Error("Element count should match buffer size / element size");
}
if (maxFloat64.length !== maxBuffer2.byteLength / Float64Array.BYTES_PER_ELEMENT) {
    throw new Error("Element count should match buffer size / element size");
}

// Test TypedArray construction from other TypedArray with different buffer
var sourceTyped = new Uint16Array([1, 2, 3, 4, 5]);
var targetTyped = new Int32Array(sourceTyped);

if (targetTyped.buffer === sourceTyped.buffer) throw new Error("Different TypedArray construction should create new buffer");
if (targetTyped.length !== sourceTyped.length) throw new Error("Different TypedArray should preserve length");
for (var i = 0; i < targetTyped.length; i++) {
    if (targetTyped[i] !== sourceTyped[i]) throw new Error("Different TypedArray should copy values");
}

// Test buffer sharing edge cases
var edgeBuffer = new ArrayBuffer(1);
var edge8 = new Uint8Array(edgeBuffer);
var edgeView = new DataView(edgeBuffer);

edge8[0] = 255;
if (edgeView.getUint8(0) !== 255) throw new Error("Single byte buffer should share correctly");

edgeView.setUint8(0, 128);
if (edge8[0] !== 128) throw new Error("Single byte buffer should share modifications");

// Test zero-offset, zero-length edge case
var zeroEdgeBuffer = new ArrayBuffer(8);
var zeroEdgeArray = new Uint16Array(zeroEdgeBuffer, 0, 0);
if (zeroEdgeArray.length !== 0) throw new Error("Zero-length TypedArray should have zero length");
if (zeroEdgeArray.byteLength !== 0) throw new Error("Zero-length TypedArray should have zero byteLength");
if (zeroEdgeArray.byteOffset !== 0) throw new Error("Zero-length TypedArray should have zero byteOffset");

// Test that buffer is still referenced correctly
if (zeroEdgeArray.buffer !== zeroEdgeBuffer) throw new Error("Zero-length TypedArray should reference correct buffer");