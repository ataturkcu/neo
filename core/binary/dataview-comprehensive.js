/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: DataView Comprehensive Operations
 */

// Test DataView constructor
var buffer = new ArrayBuffer(32);
var dataView = new DataView(buffer);
if (!(dataView instanceof DataView)) throw new Error("DataView constructor should create DataView instance");
if (dataView.buffer !== buffer) throw new Error("DataView should reference correct buffer");
if (dataView.byteLength !== 32) throw new Error("DataView byteLength should be 32");
if (dataView.byteOffset !== 0) throw new Error("DataView byteOffset should be 0");

// Test DataView constructor with offset
var offsetView = new DataView(buffer, 8);
if (offsetView.buffer !== buffer) throw new Error("DataView with offset should reference correct buffer");
if (offsetView.byteLength !== 24) throw new Error("DataView with offset should have correct byteLength");
if (offsetView.byteOffset !== 8) throw new Error("DataView with offset should have correct byteOffset");

// Test DataView constructor with offset and length
var offsetLengthView = new DataView(buffer, 4, 16);
if (offsetLengthView.buffer !== buffer) throw new Error("DataView with offset and length should reference correct buffer");
if (offsetLengthView.byteLength !== 16) throw new Error("DataView with offset and length should have correct byteLength");
if (offsetLengthView.byteOffset !== 4) throw new Error("DataView with offset and length should have correct byteOffset");

// Test DataView constructor error cases
try {
    var invalidOffset = new DataView(buffer, 40);
    throw new Error("Invalid offset should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Invalid offset should throw RangeError");
}

try {
    var invalidLength = new DataView(buffer, 8, 30);
    throw new Error("Invalid length should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Invalid length should throw RangeError");
}

// Test getInt8 and setInt8
var testBuffer = new ArrayBuffer(16);
var testView = new DataView(testBuffer);

testView.setInt8(0, 127);
if (testView.getInt8(0) !== 127) throw new Error("Int8 positive value should be correct");

testView.setInt8(1, -128);
if (testView.getInt8(1) !== -128) throw new Error("Int8 negative value should be correct");

testView.setInt8(2, 0);
if (testView.getInt8(2) !== 0) throw new Error("Int8 zero value should be correct");

// Test Int8 overflow
testView.setInt8(3, 128);
if (testView.getInt8(3) !== -128) throw new Error("Int8 overflow should wrap to -128");

testView.setInt8(4, -129);
if (testView.getInt8(4) !== 127) throw new Error("Int8 underflow should wrap to 127");

// Test getUint8 and setUint8
testView.setUint8(5, 255);
if (testView.getUint8(5) !== 255) throw new Error("Uint8 max value should be correct");

testView.setUint8(6, 0);
if (testView.getUint8(6) !== 0) throw new Error("Uint8 zero value should be correct");

// Test Uint8 overflow
testView.setUint8(7, 256);
if (testView.getUint8(7) !== 0) throw new Error("Uint8 overflow should wrap to 0");

testView.setUint8(8, -1);
if (testView.getUint8(8) !== 255) throw new Error("Uint8 negative should wrap to 255");

// Test getInt16 and setInt16 with little-endian
testView.setInt16(0, 0x1234, true);
if (testView.getInt16(0, true) !== 0x1234) throw new Error("Int16 little-endian should be correct");
if (testView.getUint8(0) !== 0x34) throw new Error("Int16 little-endian byte order should be correct");
if (testView.getUint8(1) !== 0x12) throw new Error("Int16 little-endian byte order should be correct");

// Test getInt16 and setInt16 with big-endian
testView.setInt16(2, 0x1234, false);
if (testView.getInt16(2, false) !== 0x1234) throw new Error("Int16 big-endian should be correct");
if (testView.getUint8(2) !== 0x12) throw new Error("Int16 big-endian byte order should be correct");
if (testView.getUint8(3) !== 0x34) throw new Error("Int16 big-endian byte order should be correct");

// Test Int16 negative values
testView.setInt16(4, -1, true);
if (testView.getInt16(4, true) !== -1) throw new Error("Int16 negative value should be correct");

testView.setInt16(6, 32767, true);
if (testView.getInt16(6, true) !== 32767) throw new Error("Int16 max positive should be correct");

testView.setInt16(8, -32768, true);
if (testView.getInt16(8, true) !== -32768) throw new Error("Int16 max negative should be correct");

// Test getUint16 and setUint16
testView.setUint16(10, 65535, true);
if (testView.getUint16(10, true) !== 65535) throw new Error("Uint16 max value should be correct");

testView.setUint16(12, 0, true);
if (testView.getUint16(12, true) !== 0) throw new Error("Uint16 zero value should be correct");

// Test Uint16 overflow
testView.setUint16(14, 65536, true);
if (testView.getUint16(14, true) !== 0) throw new Error("Uint16 overflow should wrap to 0");

// Test getInt32 and setInt32
var int32Buffer = new ArrayBuffer(32);
var int32View = new DataView(int32Buffer);

int32View.setInt32(0, 0x12345678, true);
if (int32View.getInt32(0, true) !== 0x12345678) throw new Error("Int32 little-endian should be correct");

int32View.setInt32(4, 0x12345678, false);
if (int32View.getInt32(4, false) !== 0x12345678) throw new Error("Int32 big-endian should be correct");

// Test Int32 extreme values
int32View.setInt32(8, 2147483647, true);
if (int32View.getInt32(8, true) !== 2147483647) throw new Error("Int32 max positive should be correct");

int32View.setInt32(12, -2147483648, true);
if (int32View.getInt32(12, true) !== -2147483648) throw new Error("Int32 max negative should be correct");

// Test getUint32 and setUint32
int32View.setUint32(16, 4294967295, true);
if (int32View.getUint32(16, true) !== 4294967295) throw new Error("Uint32 max value should be correct");

int32View.setUint32(20, 0, true);
if (int32View.getUint32(20, true) !== 0) throw new Error("Uint32 zero value should be correct");

// Test Uint32 with large values
int32View.setUint32(24, 0x80000000, true);
if (int32View.getUint32(24, true) !== 0x80000000) throw new Error("Uint32 large value should be correct");

// Test getFloat32 and setFloat32
var floatBuffer = new ArrayBuffer(32);
var floatView = new DataView(floatBuffer);

floatView.setFloat32(0, 1.5, true);
if (Math.abs(floatView.getFloat32(0, true) - 1.5) > 0.001) throw new Error("Float32 positive value should be correct");

floatView.setFloat32(4, -2.5, true);
if (Math.abs(floatView.getFloat32(4, true) - (-2.5)) > 0.001) throw new Error("Float32 negative value should be correct");

floatView.setFloat32(8, 0.0, true);
if (floatView.getFloat32(8, true) !== 0.0) throw new Error("Float32 zero value should be correct");

// Test Float32 special values
floatView.setFloat32(12, Infinity, true);
if (floatView.getFloat32(12, true) !== Infinity) throw new Error("Float32 Infinity should be correct");

floatView.setFloat32(16, -Infinity, true);
if (floatView.getFloat32(16, true) !== -Infinity) throw new Error("Float32 -Infinity should be correct");

floatView.setFloat32(20, NaN, true);
if (!isNaN(floatView.getFloat32(20, true))) throw new Error("Float32 NaN should be correct");

// Test Float32 endianness
floatView.setFloat32(24, Math.PI, false);
var piBig = floatView.getFloat32(24, false);
var piLittle = floatView.getFloat32(24, true);
if (Math.abs(piBig - Math.PI) > 0.001) throw new Error("Float32 big-endian should preserve value");
if (piBig === piLittle) throw new Error("Float32 endianness should matter");

// Test getFloat64 and setFloat64
var doubleBuffer = new ArrayBuffer(64);
var doubleView = new DataView(doubleBuffer);

doubleView.setFloat64(0, 1.23456789, true);
if (Math.abs(doubleView.getFloat64(0, true) - 1.23456789) > 0.0000001) throw new Error("Float64 positive value should be correct");

doubleView.setFloat64(8, -9.87654321, true);
if (Math.abs(doubleView.getFloat64(8, true) - (-9.87654321)) > 0.0000001) throw new Error("Float64 negative value should be correct");

doubleView.setFloat64(16, 0.0, true);
if (doubleView.getFloat64(16, true) !== 0.0) throw new Error("Float64 zero value should be correct");

// Test Float64 special values
doubleView.setFloat64(24, Infinity, true);
if (doubleView.getFloat64(24, true) !== Infinity) throw new Error("Float64 Infinity should be correct");

doubleView.setFloat64(32, -Infinity, true);
if (doubleView.getFloat64(32, true) !== -Infinity) throw new Error("Float64 -Infinity should be correct");

doubleView.setFloat64(40, NaN, true);
if (!isNaN(doubleView.getFloat64(40, true))) throw new Error("Float64 NaN should be correct");

// Test Float64 precision
doubleView.setFloat64(48, Math.PI, true);
if (Math.abs(doubleView.getFloat64(48, true) - Math.PI) > 0.0000000000001) throw new Error("Float64 should have high precision");

// Test Float64 endianness
doubleView.setFloat64(56, Math.E, false);
var eBig = doubleView.getFloat64(56, false);
var eLittle = doubleView.getFloat64(56, true);
if (Math.abs(eBig - Math.E) > 0.0000000000001) throw new Error("Float64 big-endian should preserve value");
if (eBig === eLittle) throw new Error("Float64 endianness should matter");

// Test DataView bounds checking
var boundsBuffer = new ArrayBuffer(8);
var boundsView = new DataView(boundsBuffer);

try {
    boundsView.getInt8(8);
    throw new Error("Out-of-bounds read should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Out-of-bounds read should throw RangeError");
}

try {
    boundsView.setInt8(8, 0);
    throw new Error("Out-of-bounds write should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Out-of-bounds write should throw RangeError");
}

try {
    boundsView.getInt16(7, true);
    throw new Error("Partial out-of-bounds read should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Partial out-of-bounds read should throw RangeError");
}

try {
    boundsView.setInt32(5, 0, true);
    throw new Error("Partial out-of-bounds write should throw error");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Partial out-of-bounds write should throw RangeError");
}

// Test DataView with offset bounds
var offsetBoundsBuffer = new ArrayBuffer(16);
var offsetBoundsView = new DataView(offsetBoundsBuffer, 8, 4);

offsetBoundsView.setInt32(0, 0x12345678, true);
if (offsetBoundsView.getInt32(0, true) !== 0x12345678) throw new Error("DataView with offset should work within bounds");

try {
    offsetBoundsView.getInt8(4);
    throw new Error("DataView with offset should check bounds");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("DataView with offset bounds check should throw RangeError");
}

// Test default endianness (should be big-endian)
var endiannessBuffer = new ArrayBuffer(4);
var endiannessView = new DataView(endiannessBuffer);

endiannessView.setUint8(0, 0x12);
endiannessView.setUint8(1, 0x34);
endiannessView.setUint8(2, 0x56);
endiannessView.setUint8(3, 0x78);

var defaultEndian = endiannessView.getUint32(0);
var bigEndian = endiannessView.getUint32(0, false);
var littleEndian = endiannessView.getUint32(0, true);

if (defaultEndian !== bigEndian) throw new Error("Default endianness should be big-endian");
if (bigEndian !== 0x12345678) throw new Error("Big-endian should be 0x12345678");
if (littleEndian !== 0x78563412) throw new Error("Little-endian should be 0x78563412");

// Test mixed data types in same buffer
var mixedBuffer = new ArrayBuffer(16);
var mixedView = new DataView(mixedBuffer);

mixedView.setInt8(0, -1);
mixedView.setUint8(1, 255);
mixedView.setInt16(2, -1, true);
mixedView.setUint16(4, 65535, true);
mixedView.setInt32(6, -1, true);
mixedView.setFloat32(10, 1.0, true);

if (mixedView.getInt8(0) !== -1) throw new Error("Mixed buffer Int8 should be correct");
if (mixedView.getUint8(1) !== 255) throw new Error("Mixed buffer Uint8 should be correct");
if (mixedView.getInt16(2, true) !== -1) throw new Error("Mixed buffer Int16 should be correct");
if (mixedView.getUint16(4, true) !== 65535) throw new Error("Mixed buffer Uint16 should be correct");
if (mixedView.getInt32(6, true) !== -1) throw new Error("Mixed buffer Int32 should be correct");
if (Math.abs(mixedView.getFloat32(10, true) - 1.0) > 0.001) throw new Error("Mixed buffer Float32 should be correct");

// Test DataView methods return undefined
var returnBuffer = new ArrayBuffer(8);
var returnView = new DataView(returnBuffer);

var setResult = returnView.setInt8(0, 42);
if (setResult !== undefined) throw new Error("DataView set methods should return undefined");

setResult = returnView.setFloat64(0, 3.14, true);
if (setResult !== undefined) throw new Error("DataView set methods should return undefined");

// Test DataView with ArrayBuffer.isView
if (!ArrayBuffer.isView(returnView)) throw new Error("ArrayBuffer.isView should return true for DataView");

// Test DataView toString and valueOf
var toStringView = new DataView(new ArrayBuffer(4));
if (typeof toStringView.toString() !== "string") throw new Error("DataView toString should return string");
if (toStringView.valueOf() !== toStringView) throw new Error("DataView valueOf should return itself");

// Test DataView constructor with different buffer sizes
var sizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 1024];
for (var i = 0; i < sizes.length; i++) {
    var sizeBuffer = new ArrayBuffer(sizes[i]);
    var sizeView = new DataView(sizeBuffer);
    if (sizeView.byteLength !== sizes[i]) throw new Error("DataView should work with buffer size " + sizes[i]);
}

// Test DataView property immutability
var immutableBuffer = new ArrayBuffer(8);
var immutableView = new DataView(immutableBuffer);
var originalBuffer = immutableView.buffer;
var originalLength = immutableView.byteLength;
var originalOffset = immutableView.byteOffset;

try {
    immutableView.buffer = new ArrayBuffer(16);
} catch (e) {
    // Expected - buffer should be read-only
}

try {
    immutableView.byteLength = 16;
} catch (e) {
    // Expected - byteLength should be read-only
}

try {
    immutableView.byteOffset = 4;
} catch (e) {
    // Expected - byteOffset should be read-only
}

if (immutableView.buffer !== originalBuffer) throw new Error("DataView buffer should be immutable");
if (immutableView.byteLength !== originalLength) throw new Error("DataView byteLength should be immutable");
if (immutableView.byteOffset !== originalOffset) throw new Error("DataView byteOffset should be immutable");

// Test DataView with zero-length buffer
var zeroBuffer = new ArrayBuffer(0);
var zeroView = new DataView(zeroBuffer);
if (zeroView.byteLength !== 0) throw new Error("DataView with zero buffer should have zero length");

try {
    zeroView.getInt8(0);
    throw new Error("DataView with zero buffer should not allow reads");
} catch (e) {
    if (!(e instanceof RangeError)) throw new Error("Zero buffer read should throw RangeError");
}

// Test DataView prototype
if (DataView.prototype.constructor !== DataView) throw new Error("DataView prototype constructor should be DataView");

// Test that DataView methods exist
var methodNames = [
    'getInt8', 'setInt8', 'getUint8', 'setUint8',
    'getInt16', 'setInt16', 'getUint16', 'setUint16',
    'getInt32', 'setInt32', 'getUint32', 'setUint32',
    'getFloat32', 'setFloat32', 'getFloat64', 'setFloat64'
];

var prototypeMethodBuffer = new ArrayBuffer(8);
var prototypeMethodView = new DataView(prototypeMethodBuffer);

for (var i = 0; i < methodNames.length; i++) {
    if (typeof prototypeMethodView[methodNames[i]] !== "function") {
        throw new Error("DataView should have method " + methodNames[i]);
    }
}

// Test DataView method context binding
var bindBuffer = new ArrayBuffer(4);
var bindView = new DataView(bindBuffer);
var setMethod = bindView.setInt32;
var getMethod = bindView.getInt32;

try {
    setMethod.call(bindView, 0, 42, true);
    var value = getMethod.call(bindView, 0, true);
    if (value !== 42) throw new Error("DataView methods should work when bound to different context");
} catch (e) {
    throw new Error("DataView methods should be callable with explicit context");
}

// Test fractional offsets and byte positions
var fracBuffer = new ArrayBuffer(8);
var fracView = new DataView(fracBuffer);

fracView.setInt8(1.7, 100); // Should truncate to offset 1
if (fracView.getInt8(1) !== 100) throw new Error("Fractional offset should be truncated");

// Test negative zero and positive zero for floats
var zeroBuffer = new ArrayBuffer(16);
var zeroView = new DataView(zeroBuffer);

zeroView.setFloat32(0, -0.0, true);
zeroView.setFloat32(4, +0.0, true);
zeroView.setFloat64(8, -0.0, true);

var negZeroFloat32 = zeroView.getFloat32(0, true);
var posZeroFloat32 = zeroView.getFloat32(4, true);
var negZeroFloat64 = zeroView.getFloat64(8, true);

if (1 / negZeroFloat32 !== -Infinity) throw new Error("Float32 negative zero should be preserved");
if (1 / posZeroFloat32 !== Infinity) throw new Error("Float32 positive zero should be preserved");
if (1 / negZeroFloat64 !== -Infinity) throw new Error("Float64 negative zero should be preserved");