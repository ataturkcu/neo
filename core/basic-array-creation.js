/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Array Creation
 */

// Test basic array creation
var arr1 = [];
if (arr1.length !== 0) throw new Error("Empty array should have length 0");

var arr2 = [1, 2, 3];
if (arr2.length !== 3) throw new Error("Array [1,2,3] should have length 3");
if (arr2[0] !== 1) throw new Error("First element should be 1");
if (arr2[2] !== 3) throw new Error("Third element should be 3");

// Test Array constructor
var arr3 = new Array(5);
if (arr3.length !== 5) throw new Error("new Array(5) should have length 5");

var arr4 = new Array(1, 2, 3);
if (arr4.length !== 3) throw new Error("new Array(1,2,3) should have length 3");
if (arr4[1] !== 2) throw new Error("Second element should be 2");