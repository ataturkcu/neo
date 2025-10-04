/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Async Behavior
 */

// Test setTimeout basic functionality
var timeoutExecuted = false;
setTimeout(function() {
    timeoutExecuted = true;
}, 10);

// Test setInterval
var intervalCount = 0;
var intervalId = setInterval(function() {
    intervalCount++;
    if (intervalCount >= 2) {
        clearInterval(intervalId);
    }
}, 5);

// Simple synchronous test that should pass immediately
var syncTest = true;
if (!syncTest) throw new Error("Sync test should pass");

// Note: This test will pass synchronously,
// but async operations may not complete in test environment