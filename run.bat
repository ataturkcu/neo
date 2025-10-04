@echo off
rem Neo JavaScript Engine Test Runner
rem Copyright (c) 2025 Ata Türkçü. All rights reserved.
rem Licensed under the BSD-3-Clause License

setlocal enabledelayedexpansion

echo Neo JavaScript Engine Test Runner
echo =================================

rem Initialize counters
set TOTAL_TESTS=0
set PASSED_TESTS=0
set FAILED_TESTS=0

rem Read configuration (simplified for batch)
set ENGINE_PATH=enter your engine path like this without spaces
set TEST_TIMEOUT=30

rem Function to run tests in all subdirectories
for /r %%f in (*.js) do (
    if not "%%~nf"=="run" if not "%%~nf"=="test-all" if not "%%~nf"=="find-all-tests" if not "%%~nf"=="find-failing-tests" (
        set /a TOTAL_TESTS+=1
        echo Testing %%~nxf...

        rem Run the test
        "%ENGINE_PATH%" "%%f" >nul 2>&1
        if !errorlevel! equ 0 (
            echo ✅ PASS: %%~nxf
            set /a PASSED_TESTS+=1
        ) else (
            echo ❌ FAIL: %%~nxf
            set /a FAILED_TESTS+=1
        )
    )
)

echo.
echo ========================================
echo FINAL RESULTS:
echo Total Tests: !TOTAL_TESTS!
echo Passed: !PASSED_TESTS!
echo Failed: !FAILED_TESTS!

set /a SUCCESS_RATE=!PASSED_TESTS!*100/!TOTAL_TESTS!
echo Success Rate: !SUCCESS_RATE!%%
echo ========================================

if !FAILED_TESTS! equ 0 (
    echo 🏆 ALL TESTS PASSED! QUANTA ENGINE PERFECT!
    exit /b 0
) else (
    echo ❌ Some tests failed!
    exit /b 1
)