/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Date Advanced Operations and Edge Cases
 */

// Test Date with extreme values
var extremeMax = new Date(8640000000000000); // Maximum valid date
var extremeMin = new Date(-8640000000000000); // Minimum valid date
var extremeOver = new Date(8640000000000001); // Over maximum

if (isNaN(extremeMax.getTime())) throw new Error("Maximum valid date should be valid");
if (isNaN(extremeMin.getTime())) throw new Error("Minimum valid date should be valid");
if (!isNaN(extremeOver.getTime())) throw new Error("Over maximum date should be invalid");

// Test date arithmetic edge cases
var baseDate = new Date(2023, 11, 31, 23, 59, 59, 999); // Dec 31, 2023 23:59:59.999

// Add 1 millisecond - should roll to next year
var nextMs = new Date(baseDate.getTime() + 1);
if (nextMs.getFullYear() !== 2024) throw new Error("Adding 1ms should roll to 2024");
if (nextMs.getMonth() !== 0) throw new Error("Should be January");
if (nextMs.getDate() !== 1) throw new Error("Should be 1st day");
if (nextMs.getHours() !== 0) throw new Error("Should be 00 hours");

// Test leap year calculations comprehensive
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

var leapYears = [2000, 2004, 2008, 2012, 2016, 2020, 2024];
var nonLeapYears = [1900, 1999, 2001, 2002, 2003, 2100, 2200, 2300];

for (var i = 0; i < leapYears.length; i++) {
    var feb29 = new Date(leapYears[i], 1, 29);
    if (feb29.getMonth() !== 1 || feb29.getDate() !== 29) {
        throw new Error("Feb 29 should be valid in leap year " + leapYears[i]);
    }
}

for (var i = 0; i < nonLeapYears.length; i++) {
    var feb29 = new Date(nonLeapYears[i], 1, 29);
    if (feb29.getMonth() === 1 && feb29.getDate() === 29) {
        throw new Error("Feb 29 should not be valid in non-leap year " + nonLeapYears[i]);
    }
}

// Test month overflow/underflow
var monthOverflow = new Date(2023, 13, 1); // Month 13 should become next year January
if (monthOverflow.getFullYear() !== 2024) throw new Error("Month overflow should go to next year");
if (monthOverflow.getMonth() !== 1) throw new Error("Month 13 should become February (month 1)");

var monthUnderflow = new Date(2023, -1, 1); // Month -1 should become previous year December
if (monthUnderflow.getFullYear() !== 2022) throw new Error("Month underflow should go to previous year");
if (monthUnderflow.getMonth() !== 11) throw new Error("Month -1 should become December (month 11)");

// Test day overflow/underflow
var dayOverflow = new Date(2023, 1, 35); // Feb 35 should overflow
if (dayOverflow.getMonth() !== 2) throw new Error("Day overflow should go to next month");

var dayUnderflow = new Date(2023, 1, 0); // Feb 0 should become Jan 31
if (dayUnderflow.getMonth() !== 0) throw new Error("Day underflow should go to previous month");
if (dayUnderflow.getDate() !== 31) throw new Error("Feb 0 should become Jan 31");

// Test time component overflow
var hourOverflow = new Date(2023, 0, 1, 25, 0, 0); // 25 hours
if (hourOverflow.getDate() !== 2) throw new Error("Hour overflow should go to next day");
if (hourOverflow.getHours() !== 1) throw new Error("25 hours should become 1 hour");

var minuteOverflow = new Date(2023, 0, 1, 0, 65, 0); // 65 minutes
if (minuteOverflow.getHours() !== 1) throw new Error("Minute overflow should go to next hour");
if (minuteOverflow.getMinutes() !== 5) throw new Error("65 minutes should become 5 minutes");

var secondOverflow = new Date(2023, 0, 1, 0, 0, 65); // 65 seconds
if (secondOverflow.getMinutes() !== 1) throw new Error("Second overflow should go to next minute");
if (secondOverflow.getSeconds() !== 5) throw new Error("65 seconds should become 5 seconds");

// Test timezone offset consistency
var now = new Date();
var offset1 = now.getTimezoneOffset();
var sameTime = new Date(now.getTime());
var offset2 = sameTime.getTimezoneOffset();
if (offset1 !== offset2) throw new Error("Timezone offset should be consistent for same time");

// Test DST boundary (approximate test - actual boundaries vary by locale)
var summer = new Date(2023, 6, 1); // July 1
var winter = new Date(2023, 0, 1); // January 1
var summerOffset = summer.getTimezoneOffset();
var winterOffset = winter.getTimezoneOffset();
// In Northern Hemisphere, summer offset should be less (more positive timezone)
// But this varies globally, so we just check they're numbers
if (typeof summerOffset !== "number") throw new Error("Summer timezone offset should be number");
if (typeof winterOffset !== "number") throw new Error("Winter timezone offset should be number");

// Test date string parsing edge cases
var parseable = [
    "2023-01-01",
    "2023-01-01T00:00:00.000Z",
    "2023-01-01T12:30:45",
    "Jan 1, 2023",
    "January 1, 2023",
    "1/1/2023",
    "2023/01/01"
];

for (var i = 0; i < parseable.length; i++) {
    var parsed = new Date(parseable[i]);
    if (isNaN(parsed.getTime())) {
        throw new Error("Should be able to parse: " + parseable[i]);
    }
}

var unparseable = [
    "not a date",
    "",
    "2023-13-01", // Invalid month
    "2023-01-32", // Invalid day
    "2023-01-01T25:00:00" // Invalid hour
];

for (var i = 0; i < unparseable.length; i++) {
    var parsed = new Date(unparseable[i]);
    if (!isNaN(parsed.getTime())) {
        throw new Error("Should not be able to parse: " + unparseable[i]);
    }
}

// Test Date.prototype.toJSON
var jsonDate = new Date(2023, 5, 15, 12, 30, 45, 123);
var jsonString = jsonDate.toJSON();
if (typeof jsonString !== "string") throw new Error("toJSON should return string");
if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(jsonString)) {
    throw new Error("toJSON should return ISO format");
}

// Test invalid Date toJSON
var invalidDate = new Date("invalid");
var invalidJSON = invalidDate.toJSON();
if (invalidJSON !== null) throw new Error("Invalid date toJSON should return null");

// Test Date with JSON.stringify
var objWithDate = {date: new Date(2023, 0, 1)};
var stringified = JSON.stringify(objWithDate);
if (stringified.indexOf('"date":"') === -1 || stringified.indexOf('T') === -1 || stringified.indexOf('Z') === -1) {
    throw new Error("JSON.stringify should serialize Date to ISO string");
}

// Test date comparison edge cases
var date1 = new Date(2023, 0, 1);
var date2 = new Date(2023, 0, 1);
var date3 = new Date(2023, 0, 2);

// Same time, different objects
if (date1 === date2) throw new Error("Different Date objects should not be ===");
if (!(date1 <= date2)) throw new Error("Same dates should be <=");
if (!(date1 >= date2)) throw new Error("Same dates should be >=");
if (date1 < date2) throw new Error("Same dates should not be <");
if (date1 > date2) throw new Error("Same dates should not be >");

// Different times
if (!(date1 < date3)) throw new Error("Earlier date should be <");
if (date1 >= date3) throw new Error("Earlier date should not be >=");

// Test NaN date comparisons - all should be false
var nanDate = new Date("invalid");
if (nanDate < date1) throw new Error("NaN date < should be false");
if (nanDate > date1) throw new Error("NaN date > should be false");
if (nanDate <= date1) throw new Error("NaN date <= should be false");
if (nanDate >= date1) throw new Error("NaN date >= should be false");

// Test date subtraction
var later = new Date(2023, 0, 2, 0, 0, 0, 0);
var earlier = new Date(2023, 0, 1, 0, 0, 0, 0);
var diff = later - earlier;
if (diff !== 86400000) throw new Error("Date subtraction should give millisecond difference");

// Test year 2-digit handling
var twoDigitYear = new Date(50, 0, 1); // Year 50 should be interpreted as 1950
if (twoDigitYear.getFullYear() !== 1950) throw new Error("2-digit year 50 should be 1950");

var recentTwoDigit = new Date(25, 0, 1); // Year 25 should be interpreted as 1925 (0-99 -> 1900-1999)
if (recentTwoDigit.getFullYear() !== 1925) throw new Error("2-digit year 25 should be 1925");

// Test millisecond precision
var preciseDate = new Date(2023, 0, 1, 12, 30, 45, 123);
if (preciseDate.getMilliseconds() !== 123) throw new Error("Should preserve millisecond precision");

var microPrecision = new Date(1609459200123.456); // With fractional milliseconds
// JavaScript Date only has millisecond precision, should truncate
if (microPrecision.getMilliseconds() !== 123) throw new Error("Should truncate to millisecond precision");

// Test Date constructor type coercion
var stringNum = new Date("1609459200000"); // String number (invalid date string)
if (!isNaN(stringNum.getTime())) throw new Error("String number should result in invalid date");
var num = new Date(1609459200000); // Number timestamp
if (isNaN(num.getTime())) throw new Error("Number timestamp should be valid");

var boolDate = new Date(true); // Boolean true = 1
if (boolDate.getTime() !== 1) throw new Error("Boolean true should become 1");

var arrayDate = new Date([2023, 0, 1]); // Array should be converted to string then parsed
// Array conversion behavior is implementation-dependent

// Test performance with many date operations
var start = Date.now();
for (var i = 0; i < 1000; i++) {
    var testDate = new Date(2023, 0, 1);
    testDate.setDate(i % 31 + 1);
    testDate.getTime();
}
var duration = Date.now() - start;
if (duration > 1000) throw new Error("Date operations should be reasonably fast");

// Test Date.prototype.getYear (deprecated but still supported)
if (typeof Date.prototype.getYear === "function") {
    var yearTest = new Date(2023, 0, 1);
    var year = yearTest.getYear();
    if (year !== 123) throw new Error("getYear should return year - 1900"); // 2023 - 1900 = 123
}

// Test setYear (deprecated)
if (typeof Date.prototype.setYear === "function") {
    var setYearTest = new Date();
    setYearTest.setYear(123); // Should set year to 123 (setYear just sets the full year for values >= 100)
    if (setYearTest.getFullYear() !== 123) throw new Error("setYear(123) should set year to 123");
}