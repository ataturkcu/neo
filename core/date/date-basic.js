/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Date Object Basic Functionality
 */

// Test Date constructor exists
if (typeof Date !== "function") throw new Error("Date should be a constructor function");

// Test Date() without new (returns string)
var dateString = Date();
if (typeof dateString !== "string") throw new Error("Date() should return string");

// Test new Date() (current time)
var now = new Date();
if (!(now instanceof Date)) throw new Error("new Date() should return Date instance");
if (isNaN(now.getTime())) throw new Error("new Date() should have valid time");

// Test new Date(milliseconds)
var fromMs = new Date(0);
if (fromMs.getTime() !== 0) throw new Error("new Date(0) should be epoch");
if (fromMs.getUTCFullYear() !== 1970) throw new Error("Epoch should be 1970");
if (fromMs.getUTCMonth() !== 0) throw new Error("Epoch month should be 0 (January)");
if (fromMs.getUTCDate() !== 1) throw new Error("Epoch date should be 1");

// Test new Date(year, month[, day])
var specific = new Date(2023, 0, 15); // January 15, 2023
if (specific.getFullYear() !== 2023) throw new Error("Year should be 2023");
if (specific.getMonth() !== 0) throw new Error("Month should be 0 (January)");
if (specific.getDate() !== 15) throw new Error("Date should be 15");

// Test month is 0-indexed
var monthTest = new Date(2023, 11, 25); // December 25, 2023
if (monthTest.getMonth() !== 11) throw new Error("December should be month 11");

// Test new Date(year, month, day, hour, minute, second, millisecond)
var fullDate = new Date(2023, 5, 15, 14, 30, 45, 123); // June 15, 2023 14:30:45.123
if (fullDate.getFullYear() !== 2023) throw new Error("Full date year should be 2023");
if (fullDate.getMonth() !== 5) throw new Error("Full date month should be 5 (June)");
if (fullDate.getDate() !== 15) throw new Error("Full date day should be 15");
if (fullDate.getHours() !== 14) throw new Error("Full date hour should be 14");
if (fullDate.getMinutes() !== 30) throw new Error("Full date minute should be 30");
if (fullDate.getSeconds() !== 45) throw new Error("Full date second should be 45");
if (fullDate.getMilliseconds() !== 123) throw new Error("Full date millisecond should be 123");

// Test new Date(string)
var fromString = new Date("2023-06-15T12:00:00.000Z");
if (isNaN(fromString.getTime())) throw new Error("Date from ISO string should be valid");
if (fromString.getUTCFullYear() !== 2023) throw new Error("String date year should be 2023");

// Test invalid date string
var invalid = new Date("invalid date string");
if (!isNaN(invalid.getTime())) throw new Error("Invalid date string should create invalid Date");

// Test Date.now()
var nowMs = Date.now();
if (typeof nowMs !== "number") throw new Error("Date.now() should return number");
if (nowMs < 1000000000000) throw new Error("Date.now() should return reasonable timestamp");

// Test Date.parse()
var parsed = Date.parse("2023-06-15T12:00:00.000Z");
if (typeof parsed !== "number") throw new Error("Date.parse() should return number");
if (isNaN(parsed)) throw new Error("Date.parse() with valid string should return valid number");

var invalidParsed = Date.parse("invalid");
if (!isNaN(invalidParsed)) throw new Error("Date.parse() with invalid string should return NaN");

// Test Date.UTC()
var utc = Date.UTC(2023, 5, 15, 12, 0, 0, 0); // June 15, 2023 12:00:00 UTC
if (typeof utc !== "number") throw new Error("Date.UTC() should return number");

var utcDate = new Date(utc);
if (utcDate.getUTCFullYear() !== 2023) throw new Error("UTC date year should be 2023");
if (utcDate.getUTCMonth() !== 5) throw new Error("UTC date month should be 5");

// Test getTime() and setTime()
var timeTest = new Date(2023, 0, 1);
var originalTime = timeTest.getTime();
timeTest.setTime(originalTime + 86400000); // Add one day
if (timeTest.getDate() !== 2) throw new Error("setTime should change date to 2nd");

// Test getter methods
var getterTest = new Date(2023, 5, 15, 14, 30, 45, 123);
if (getterTest.getFullYear() !== 2023) throw new Error("getFullYear should return 2023");
if (getterTest.getMonth() !== 5) throw new Error("getMonth should return 5");
if (getterTest.getDate() !== 15) throw new Error("getDate should return 15");
if (getterTest.getDay() !== 4) throw new Error("getDay should return 4 (Thursday)"); // June 15, 2023 is Thursday
if (getterTest.getHours() !== 14) throw new Error("getHours should return 14");
if (getterTest.getMinutes() !== 30) throw new Error("getMinutes should return 30");
if (getterTest.getSeconds() !== 45) throw new Error("getSeconds should return 45");
if (getterTest.getMilliseconds() !== 123) throw new Error("getMilliseconds should return 123");

// Test UTC getter methods
var utcTest = new Date(Date.UTC(2023, 5, 15, 14, 30, 45, 123));
if (utcTest.getUTCFullYear() !== 2023) throw new Error("getUTCFullYear should return 2023");
if (utcTest.getUTCMonth() !== 5) throw new Error("getUTCMonth should return 5");
if (utcTest.getUTCDate() !== 15) throw new Error("getUTCDate should return 15");
if (utcTest.getUTCDay() !== 4) throw new Error("getUTCDay should return 4");
if (utcTest.getUTCHours() !== 14) throw new Error("getUTCHours should return 14");
if (utcTest.getUTCMinutes() !== 30) throw new Error("getUTCMinutes should return 30");
if (utcTest.getUTCSeconds() !== 45) throw new Error("getUTCSeconds should return 45");
if (utcTest.getUTCMilliseconds() !== 123) throw new Error("getUTCMilliseconds should return 123");

// Test setter methods
var setterTest = new Date(2023, 0, 1);
setterTest.setFullYear(2024);
if (setterTest.getFullYear() !== 2024) throw new Error("setFullYear should change year to 2024");

setterTest.setMonth(11);
if (setterTest.getMonth() !== 11) throw new Error("setMonth should change month to 11");

setterTest.setDate(25);
if (setterTest.getDate() !== 25) throw new Error("setDate should change date to 25");

setterTest.setHours(23);
if (setterTest.getHours() !== 23) throw new Error("setHours should change hours to 23");

setterTest.setMinutes(59);
if (setterTest.getMinutes() !== 59) throw new Error("setMinutes should change minutes to 59");

setterTest.setSeconds(58);
if (setterTest.getSeconds() !== 58) throw new Error("setSeconds should change seconds to 58");

setterTest.setMilliseconds(999);
if (setterTest.getMilliseconds() !== 999) throw new Error("setMilliseconds should change milliseconds to 999");

// Test toString methods
var toStringTest = new Date(2023, 5, 15, 14, 30, 45);
var dateString = toStringTest.toString();
if (typeof dateString !== "string") throw new Error("toString should return string");
if (dateString.indexOf("2023") === -1) throw new Error("toString should contain year");

var isoString = toStringTest.toISOString();
if (typeof isoString !== "string") throw new Error("toISOString should return string");
if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(isoString)) throw new Error("toISOString should be in ISO format");

var dateOnlyString = toStringTest.toDateString();
if (typeof dateOnlyString !== "string") throw new Error("toDateString should return string");

var timeOnlyString = toStringTest.toTimeString();
if (typeof timeOnlyString !== "string") throw new Error("toTimeString should return string");

// Test valueOf()
var valueTest = new Date(1000);
if (valueTest.valueOf() !== 1000) throw new Error("valueOf should return milliseconds");
if (+valueTest !== 1000) throw new Error("Date should convert to number");

// Test invalid Date
var invalidDate = new Date("invalid");
if (!isNaN(invalidDate.getTime())) throw new Error("Invalid Date should have NaN time");
if (invalidDate.toString() !== "Invalid Date") throw new Error("Invalid Date toString should be 'Invalid Date'");

// Test leap years
var leapYear = new Date(2020, 1, 29); // February 29, 2020
if (leapYear.getMonth() !== 1) throw new Error("Feb 29 in leap year should be valid");
if (leapYear.getDate() !== 29) throw new Error("Feb 29 in leap year should be valid");

var nonLeapYear = new Date(2021, 1, 29); // February 29, 2021 (invalid)
if (nonLeapYear.getMonth() !== 2) throw new Error("Feb 29 in non-leap year should roll to March");
if (nonLeapYear.getDate() !== 1) throw new Error("Feb 29 in non-leap year should become March 1");

// Test getTimezoneOffset()
var timezoneTest = new Date();
var offset = timezoneTest.getTimezoneOffset();
if (typeof offset !== "number") throw new Error("getTimezoneOffset should return number");
if (offset < -720 || offset > 720) throw new Error("Timezone offset should be reasonable");

// Test date arithmetic
var mathTest = new Date(2023, 0, 1);
var tomorrow = new Date(mathTest.getTime() + 86400000);
if (tomorrow.getDate() !== 2) throw new Error("Date arithmetic should work");

// Test comparison
var date1 = new Date(2023, 0, 1);
var date2 = new Date(2023, 0, 2);
if (!(date1 < date2)) throw new Error("Date comparison should work");
if (date1 >= date2) throw new Error("Date comparison should work");