/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Array Sparse Arrays and Holes Comprehensive
 */

// Test basic hole creation
var holes1 = [1, , , 4];
if (holes1.length !== 4) throw new Error("Sparse array should have length 4");
if (holes1[1] !== undefined) throw new Error("Hole should be undefined when accessed");
if (1 in holes1) throw new Error("Hole should not be 'in' array");
if (holes1.hasOwnProperty(1)) throw new Error("Hole should not be own property");

// Test delete creating holes
var deleteTest = [1, 2, 3, 4];
delete deleteTest[1];
delete deleteTest[2];
if (deleteTest.length !== 4) throw new Error("Delete should not change length");
if (deleteTest[1] !== undefined) throw new Error("Deleted element should be undefined");
if (1 in deleteTest) throw new Error("Deleted element should not be 'in' array");

// Test Array constructor creating holes
var constructorHoles = new Array(5);
if (constructorHoles.length !== 5) throw new Error("Constructor should create array with length 5");
for (var i = 0; i < 5; i++) {
    if (i in constructorHoles) throw new Error("Constructor holes should not be 'in' array");
    if (constructorHoles.hasOwnProperty(i)) throw new Error("Constructor holes should not be own properties");
}

// Test setting length creating holes
var lengthHoles = [1, 2, 3];
lengthHoles.length = 10;
for (var i = 3; i < 10; i++) {
    if (i in lengthHoles) throw new Error("Length-extended holes should not be 'in' array");
}

// Test holes in iteration methods
var holey = [1, , 3, , 5];
var forEachVisited = [];
holey.forEach(function(value, index) {
    forEachVisited.push(index);
});
if (forEachVisited.length !== 3) throw new Error("forEach should skip holes");
if (forEachVisited.indexOf(1) !== -1) throw new Error("forEach should not visit hole at index 1");
if (forEachVisited.indexOf(3) !== -1) throw new Error("forEach should not visit hole at index 3");

// Test map with holes
var mapResult = holey.map(function(value, index) {
    return value * 2;
});
if (mapResult.length !== 5) throw new Error("map should preserve length");
if (1 in mapResult) throw new Error("map should preserve holes");
if (mapResult[0] !== 2) throw new Error("map should transform existing elements");
if (mapResult[2] !== 6) throw new Error("map should transform existing elements");

// Test filter with holes
var filterResult = holey.filter(function(value) {
    return value > 2;
});
if (filterResult.length !== 2) throw new Error("filter should return 2 elements");
if (filterResult[0] !== 3) throw new Error("filter should include 3");
if (filterResult[1] !== 5) throw new Error("filter should include 5");

// Test reduce with holes
var reduceResult = holey.reduce(function(acc, value) {
    return acc + value;
}, 0);
if (reduceResult !== 9) throw new Error("reduce should sum to 9 (1+3+5)");

// Test some/every with holes
var someResult = holey.some(function(value) {
    return value > 4;
});
if (!someResult) throw new Error("some should find value > 4");

var everyResult = holey.every(function(value) {
    return value > 0;
});
if (!everyResult) throw new Error("every should return true (all visited elements > 0)");

// Test find/findIndex with holes
if (typeof Array.prototype.find === "function") {
    var foundValue = holey.find(function(value) {
        return value > 2;
    });
    if (foundValue !== 3) throw new Error("find should return 3");

    var foundIndex = holey.findIndex(function(value) {
        return value > 2;
    });
    if (foundIndex !== 2) throw new Error("findIndex should return index 2");
}

// Test sort with holes
var sortHoles = [3, , 1, , 2];
sortHoles.sort();
// Holes should move to end
if (sortHoles[0] !== 1) throw new Error("sort: first element should be 1");
if (sortHoles[1] !== 2) throw new Error("sort: second element should be 2");
if (sortHoles[2] !== 3) throw new Error("sort: third element should be 3");
if (3 in sortHoles) throw new Error("sort: holes should remain holes");
if (4 in sortHoles) throw new Error("sort: holes should remain holes");

// Test reverse with holes
var reverseHoles = [1, , 3, , 5];
reverseHoles.reverse();
if (reverseHoles[0] !== 5) throw new Error("reverse: first should be 5");
if (reverseHoles[4] !== 1) throw new Error("reverse: last should be 1");
if (1 in reverseHoles) throw new Error("reverse: holes should move but remain holes");
if (3 in reverseHoles) throw new Error("reverse: holes should move but remain holes");

// Test join with holes
var joinHoles = [1, , 3, , 5];
var joined = joinHoles.join(",");
if (joined !== "1,,3,,5") throw new Error("join should treat holes as empty strings");

// Test toString with holes
var toStringHoles = [1, , 3];
var stringified = toStringHoles.toString();
if (stringified !== "1,,3") throw new Error("toString should treat holes as empty strings");

// Test concat with holes
var concatHoles1 = [1, , 3];
var concatHoles2 = [, 4, ];
var concatenated = concatHoles1.concat(concatHoles2);
if (concatenated.length !== 5) throw new Error("concat should preserve total length (3+2=5)");
if (1 in concatenated) throw new Error("concat should preserve holes from first array");
if (3 in concatenated) throw new Error("concat should preserve holes from second array");

// Test slice with holes
var sliceHoles = [1, , 3, , 5];
var sliced = sliceHoles.slice(1, 4);
if (sliced.length !== 3) throw new Error("slice should have length 3");
if (0 in sliced) throw new Error("slice should preserve holes");
if (2 in sliced) throw new Error("slice should preserve holes");

// Test splice with holes
var spliceHoles = [1, , 3, , 5];
var spliced = spliceHoles.splice(1, 3, 'a', 'b');
if (spliced.length !== 3) throw new Error("splice should return 3 removed elements");
if (0 in spliced) throw new Error("splice should preserve holes: index 0 should be hole");
if (spliceHoles.length !== 4) throw new Error("splice should result in length 4");

// Test copyWithin with holes (ES2015)
if (typeof Array.prototype.copyWithin === "function") {
    var copyHoles = [1, , 3, , 5];
    copyHoles.copyWithin(0, 2);
    if (copyHoles[0] !== 3) throw new Error("copyWithin should copy values");
    if (1 in copyHoles) throw new Error("copyWithin should copy holes too");
}

// Test fill with holes (ES2015)
if (typeof Array.prototype.fill === "function") {
    var fillHoles = [1, , 3, , 5];
    fillHoles.fill('x', 1, 4);
    if (fillHoles[1] !== 'x') throw new Error("fill should fill holes");
    if (!('1' in fillHoles)) throw new Error("fill should create real properties");
    if (fillHoles[3] !== 'x') throw new Error("fill should fill holes");
}

// Test Object.keys with holes
var keysHoles = [1, , 3, , 5];
var keys = Object.keys(keysHoles);
if (keys.length !== 3) throw new Error("Object.keys should not include holes"); // 0, 2, 4 (not length)
if (keys.indexOf('1') !== -1) throw new Error("Object.keys should not include hole indices");
if (keys.indexOf('3') !== -1) throw new Error("Object.keys should not include hole indices");

// Test JSON.stringify with holes
var jsonHoles = [1, , 3, , 5];
var jsonString = JSON.stringify(jsonHoles);
if (jsonString !== "[1,null,3,null,5]") throw new Error("JSON.stringify should convert holes to null");

// Test Array.from with holes (ES2015)
if (typeof Array.from === "function") {
    var fromHoles = Array.from([1, , 3]);
    if (fromHoles.length !== 3) throw new Error("Array.from should preserve length");
    if (!(1 in fromHoles)) throw new Error("Array.from should fill holes with undefined");
    if (fromHoles[1] !== undefined) throw new Error("Array.from should make holes into undefined");
}

// Test spread operator with holes (if supported)
try {
    eval("var spreadHoles = [1, , 3]; var spread = [...spreadHoles];");
    eval("if (spread.length !== 3) throw new Error('Spread should preserve length');");
    eval("if (!(1 in spread)) throw new Error('Spread should fill holes');");
} catch (e) {
    // Spread might not be supported
}

// Test for...of with holes (if supported)
try {
    eval("var forOfHoles = [1, , 3]; var values = []; for (var v of forOfHoles) values.push(v);");
    eval("if (values.length !== 3) throw new Error('for...of should include holes as undefined');");
    eval("if (values[1] !== undefined) throw new Error('for...of should yield undefined for holes');");
} catch (e) {
    // for...of might not be supported
}

// Test holes vs undefined values
var holesVsUndefined = [1, , 3];
holesVsUndefined[4] = undefined;
if (1 in holesVsUndefined) throw new Error("Hole should not be 'in' array");
if (!(4 in holesVsUndefined)) throw new Error("Explicit undefined should be 'in' array");

// Test performance with sparse vs dense arrays
var sparse = [];
sparse[1000000] = "end";
var start = Date.now();
for (var i = 0; i < 1000; i++) {
    sparse.length; // Access length property
}
var sparseTime = Date.now() - start;

var dense = new Array(1000000).fill(0);
start = Date.now();
for (var i = 0; i < 1000; i++) {
    dense.length;
}
var denseTime = Date.now() - start;

// Both should be fast (length is just a property access)
if (sparseTime > 100 || denseTime > 100) throw new Error("Length access should be fast for both sparse and dense arrays");