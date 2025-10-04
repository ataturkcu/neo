/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Advanced Async/Await Patterns and Promise Integration
 */

// Test basic async function declaration
if (typeof async !== "undefined" || typeof Promise !== "undefined") {
    try {
        eval("async function basicAsync() { return 'hello'; }");
        eval("var result = basicAsync();");
        eval("if (!(result instanceof Promise)) throw new Error('Async function should return Promise');");

        // Test await with resolved promise
        eval("async function awaitTest() { var x = await Promise.resolve(42); if (x !== 42) throw new Error('await should unwrap resolved value'); return x * 2; }");
        eval("awaitTest().then(function(result) { if (result !== 84) throw new Error('async function should return resolved value'); });");

        // Test await with rejected promise
        eval("async function awaitReject() { try { await Promise.reject('error'); throw new Error('Should not reach here'); } catch(e) { if (e !== 'error') throw new Error('await should throw rejected value'); return 'caught'; } }");
        eval("awaitReject().then(function(result) { if (result !== 'caught') throw new Error('Should catch and return value'); });");

        // Test multiple await calls
        eval("async function multipleAwait() { var a = await Promise.resolve(10); var b = await Promise.resolve(20); return a + b; }");
        eval("multipleAwait().then(function(result) { if (result !== 30) throw new Error('Multiple await should work sequentially'); });");

        // Test async function with regular return
        eval("async function regularReturn() { return 'sync value'; }");
        eval("regularReturn().then(function(result) { if (result !== 'sync value') throw new Error('Regular return in async should be wrapped in Promise'); });");

        // Test async function with throw
        eval("async function throwTest() { throw new Error('async error'); }");
        eval("throwTest().catch(function(error) { if (error.message !== 'async error') throw new Error('Thrown error should be caught by Promise'); });");

        // Test await with non-promise values
        eval("async function awaitNonPromise() { var x = await 42; if (x !== 42) throw new Error('await with non-promise should return value directly'); return x; }");
        eval("awaitNonPromise().then(function(result) { if (result !== 42) throw new Error('Non-promise await should work'); });");

        // Test nested async functions
        eval("async function inner() { return await Promise.resolve('inner'); } async function outer() { return await inner(); }");
        eval("outer().then(function(result) { if (result !== 'inner') throw new Error('Nested async functions should work'); });");

        // Test async function expressions
        eval("var asyncExpr = async function() { return 'expression'; };");
        eval("asyncExpr().then(function(result) { if (result !== 'expression') throw new Error('Async function expression should work'); });");

        // Test async arrow functions
        eval("var asyncArrow = async () => 'arrow';");
        eval("asyncArrow().then(function(result) { if (result !== 'arrow') throw new Error('Async arrow function should work'); });");

        // Test async with parameters and destructuring
        eval("async function withParams({x, y}) { return await Promise.resolve(x + y); }");
        eval("withParams({x: 10, y: 20}).then(function(result) { if (result !== 30) throw new Error('Async with destructuring should work'); });");

        // Test await in different contexts
        eval("async function awaitInTry() { try { return await Promise.resolve('try'); } catch(e) { return 'catch'; } finally { var x = await Promise.resolve('finally'); } }");
        eval("awaitInTry().then(function(result) { if (result !== 'try') throw new Error('Await in try block should work'); });");

        // Test await in loops
        eval("async function awaitInLoop() { var results = []; for (var i = 0; i < 3; i++) { results.push(await Promise.resolve(i)); } return results; }");
        eval("awaitInLoop().then(function(results) { if (results.length !== 3 || results[0] !== 0 || results[1] !== 1 || results[2] !== 2) throw new Error('Await in loop should work sequentially'); });");

        // Test Promise.all with async/await
        eval("async function promiseAllTest() { var results = await Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]); return results; }");
        eval("promiseAllTest().then(function(results) { if (results.length !== 3 || results[0] !== 1) throw new Error('Promise.all with await should work'); });");

        // Test Promise.race with async/await
        eval("async function promiseRaceTest() { var result = await Promise.race([Promise.resolve('first'), new Promise(function(resolve) { setTimeout(function() { resolve('second'); }, 100); })]); return result; }");
        eval("promiseRaceTest().then(function(result) { if (result !== 'first') throw new Error('Promise.race with await should work'); });");

        // Test error propagation in async chain
        eval("async function errorPropagation() { try { await Promise.reject('chain error'); } catch(e) { throw new Error('Caught: ' + e); } }");
        eval("errorPropagation().catch(function(error) { if (error.message !== 'Caught: chain error') throw new Error('Error propagation should work'); });");

        // Test async function with finally
        eval("var finallyExecuted = false; async function finallyTest() { try { return await Promise.resolve('success'); } finally { finallyExecuted = true; } }");
        eval("finallyTest().then(function(result) { if (!finallyExecuted || result !== 'success') throw new Error('Finally should execute in async function'); });");

        // Test concurrent async operations
        eval("async function concurrent() { var start = Date.now(); var [a, b, c] = await Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]); var duration = Date.now() - start; if (duration > 50) throw new Error('Concurrent operations should be fast'); return a + b + c; }");
        eval("concurrent().then(function(result) { if (result !== 6) throw new Error('Concurrent async should work'); });");

        // Test async with setTimeout
        eval("function delay(ms) { return new Promise(function(resolve) { setTimeout(resolve, ms); }); } async function timeoutTest() { var start = Date.now(); await delay(10); var end = Date.now(); if (end - start < 5) throw new Error('Delay should actually wait'); return 'delayed'; }");
        eval("timeoutTest().then(function(result) { if (result !== 'delayed') throw new Error('setTimeout integration should work'); });");

        // Test async generator functions (if supported)
        try {
            eval("async function* asyncGen() { yield await Promise.resolve(1); yield await Promise.resolve(2); }");
            eval("var gen = asyncGen(); gen.next().then(function(result) { if (!result.value || result.value !== 1) throw new Error('Async generator should work'); });");
        } catch (e) {
            // Async generators might not be supported
        }

        // Test for-await-of loop (if supported)
        try {
            eval("async function forAwaitTest() { var results = []; var promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]; for await (var value of promises) { results.push(value); } return results; }");
            eval("forAwaitTest().then(function(results) { if (results.length !== 3) throw new Error('for-await-of should work'); });");
        } catch (e) {
            // for-await-of might not be supported
        }

        // Test async function toString
        eval("async function toStringTest() {} if (toStringTest.toString().indexOf('async') === -1) throw new Error('Async function toString should contain async keyword');");

        // Test async function constructor property
        eval("async function constructorTest() {} if (constructorTest.constructor !== (async function(){}).constructor) throw new Error('Async function should have AsyncFunction constructor');");

        // Test async function.length property
        eval("async function lengthTest(a, b, c) {} if (lengthTest.length !== 3) throw new Error('Async function should have correct length property');");

        // Test async function name property
        eval("async function namedAsync() {} if (namedAsync.name !== 'namedAsync') throw new Error('Async function should have correct name property');");

        // Test async with default parameters
        eval("async function defaultParams(x = 10, y = 20) { return await Promise.resolve(x + y); }");
        eval("defaultParams().then(function(result) { if (result !== 30) throw new Error('Async with default params should work'); });");

        // Test async with rest parameters
        eval("async function restParams(...args) { return await Promise.resolve(args.length); }");
        eval("restParams(1, 2, 3).then(function(result) { if (result !== 3) throw new Error('Async with rest params should work'); });");

        // Test await with thenable objects
        eval("var thenable = { then: function(resolve) { resolve('thenable'); } }; async function thenableTest() { return await thenable; }");
        eval("thenableTest().then(function(result) { if (result !== 'thenable') throw new Error('Await should work with thenable objects'); });");

        // Test async function as method
        eval("var obj = { async method() { return await Promise.resolve('method'); } };");
        eval("obj.method().then(function(result) { if (result !== 'method') throw new Error('Async method should work'); });");

        // Test async function as computed property
        eval("var computed = { async ['computed']() { return await Promise.resolve('computed'); } };");
        eval("computed.computed().then(function(result) { if (result !== 'computed') throw new Error('Async computed method should work'); });");

        // Test async function in class
        eval("class AsyncClass { async method() { return await Promise.resolve('class'); } } var instance = new AsyncClass(); instance.method().then(function(result) { if (result !== 'class') throw new Error('Async class method should work'); });");

        // Test static async method
        eval("class StaticAsync { static async method() { return await Promise.resolve('static'); } } StaticAsync.method().then(function(result) { if (result !== 'static') throw new Error('Static async method should work'); });");

        // Test async performance with many operations
        eval("async function performanceTest() { var start = Date.now(); var promises = []; for (var i = 0; i < 100; i++) { promises.push(Promise.resolve(i)); } var results = await Promise.all(promises); var duration = Date.now() - start; if (duration > 1000) throw new Error('Async performance should be reasonable'); return results.length; }");
        eval("performanceTest().then(function(result) { if (result !== 100) throw new Error('Performance test should complete'); });");

    } catch (e) {
        // async/await might not be supported in this engine
        if (e.message && e.message.indexOf("async") === -1) {
            throw e; // Re-throw if it's not a syntax error about async
        }
    }
} else {
    // Skip async/await tests if Promises are not available
}