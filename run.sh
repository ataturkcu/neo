#!/bin/bash
# Neo JavaScript Engine Test Runner
# Copyright (c) 2025 Ata Türkçü. All rights reserved.
# Licensed under the BSD-3-Clause License

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load configuration
source neo.config

echo "Neo JavaScript Engine Test Runner"
echo "================================="

# Initialize counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
TOTAL_TIME=0

# Function to run a single test
run_test() {
    local test_file="$1"
    local start_time=$(date +%s.%N)

    if timeout $TEST_TIMEOUT $ENGINE_PATH "$test_file" >/dev/null 2>&1; then
        local end_time=$(date +%s.%N)
        echo -e "${GREEN}PASS${NC}: $(basename "$test_file")"
        ((PASSED_TESTS++))
    else
        local end_time=$(date +%s.%N)
        echo -e "${RED}FAIL${NC}: $(basename "$test_file")"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Run tests from specified directories
IFS=',' read -ra DIRS <<< "$TEST_DIRS"
for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "\n${YELLOW}Running tests in $dir/${NC}"
        # Find all .js files in directory and subdirectories
        while IFS= read -r -d '' test_file; do
            run_test "$test_file"
        done < <(find "$dir" -name "*.js" -type f -print0)
    fi
done

# Summary
echo ""
echo "================================="
echo "Test Summary:"
echo "Total: $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"
echo "Tests completed successfully"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed!${NC}"
    exit 1
fi