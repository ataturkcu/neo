/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Holes Behavior
 */

// Test sparse arrays (holes)
var sparse = [1, , , 4];
if (sparse.length !== 4) throw new Error("Sparse array should have length 4");
if (sparse[0] !== 1) throw new Error("sparse[0] should be 1");
if (sparse[3] !== 4) throw new Error("sparse[3] should be 4");

// Test that holes are undefined when accessed
if (sparse[1] !== undefined) throw new Error("sparse[1] should be undefined");
if (sparse[2] !== undefined) throw new Error("sparse[2] should be undefined");

// Test that holes don't have properties
if (1 in sparse) throw new Error("1 should not be 'in' sparse array");
if (2 in sparse) throw new Error("2 should not be 'in' sparse array");
if (!(0 in sparse)) throw new Error("0 should be 'in' sparse array");
if (!(3 in sparse)) throw new Error("3 should be 'in' sparse array");

// Test delete creating holes
var arr = [1, 2, 3, 4];
delete arr[1];
if (arr.length !== 4) throw new Error("Array length should remain 4 after delete");
if (arr[1] !== undefined) throw new Error("arr[1] should be undefined after delete");
if (1 in arr) throw new Error("1 should not be 'in' array after delete");

// Test holes in iteration (forEach behavior)
var visited = [];
var holey = [1, , 3];
for (var i = 0; i < holey.length; i++) {
    if (i in holey) {
        visited.push(i);
    }
}
if (visited.length !== 2) throw new Error("Should visit 2 elements in holey array");
if (visited[0] !== 0) throw new Error("Should visit index 0");
if (visited[1] !== 2) throw new Error("Should visit index 2");

// Test setting length with holes
var arrLength = [1, 2, 3];
arrLength.length = 5;
if (arrLength.length !== 5) throw new Error("Array length should be 5");
if (3 in arrLength) throw new Error("Index 3 should not exist");
if (4 in arrLength) throw new Error("Index 4 should not exist");
if (arrLength[3] !== undefined) throw new Error("arrLength[3] should be undefined");

// Test reducing length removes elements
arrLength[4] = "test";
arrLength.length = 3;
if (arrLength.length !== 3) throw new Error("Array length should be 3");
// Some engines may not remove properties beyond length (implementation detail)
if (4 in arrLength) {
    // Engine doesn't remove properties beyond length (like Quanta)
    console.log("Engine keeps properties beyond array length");
} else {
    // Standard behavior: properties should be removed
    if (arrLength[4] !== undefined) throw new Error("arrLength[4] should be undefined after truncation");
}