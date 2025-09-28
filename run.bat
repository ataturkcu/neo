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
set ENGINE_PATH=node
set TEST_TIMEOUT=30

rem Function to run tests in a directory
for /d %%d in (core es6plus async objects arrays functions strings numbers regex classes modules performance edge-cases) do (
    if exist "%%d" (
        echo.
        echo Running tests in %%d/
        for %%f in ("%%d\*.js") do (
            set /a TOTAL_TESTS+=1
            echo Testing %%~nxf...

            rem Get start time
            for /f "tokens=1-4 delims=:.," %%a in ("%time%") do (
                set /a start_ms=^(^(%%a*60+1%%b %% 100^)*60+1%%c %% 100^)*100+1%%d %% 100
            )

            rem Run the test
            %ENGINE_PATH% "%%f" >nul 2>&1
            if !errorlevel! equ 0 (
                rem Get end time
                for /f "tokens=1-4 delims=:.," %%a in ("%time%") do (
                    set /a end_ms=^(^(%%a*60+1%%b %% 100^)*60+1%%c %% 100^)*100+1%%d %% 100
                )
                set /a duration=!end_ms!-!start_ms!
                echo PASS: %%~nxf, !duration! ms
                set /a PASSED_TESTS+=1
            ) else (
                rem Get end time
                for /f "tokens=1-4 delims=:.," %%a in ("%time%") do (
                    set /a end_ms=^(^(%%a*60+1%%b %% 100^)*60+1%%c %% 100^)*100+1%%d %% 100
                )
                set /a duration=!end_ms!-!start_ms!
                echo FAIL: %%~nxf, !duration! ms
                set /a FAILED_TESTS+=1
            )
        )
    )
)

echo.
echo =================================
echo Test Summary:
echo Total: !TOTAL_TESTS!
echo Passed: !PASSED_TESTS!
echo Failed: !FAILED_TESTS!

if !FAILED_TESTS! equ 0 (
    echo All tests passed!
    exit /b 0
) else (
    echo Some tests failed!
    exit /b 1
)