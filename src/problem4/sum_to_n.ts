/**
 * Problem 4: Three ways to sum to n
 * Provide 3 unique implementations of the following function in TypeScript.
 * - Comment on the complexity or efficiency of each function.
 * - `n` is any integer.
 * - The summation of all integers from 1 up to `n`.
 * - Result will always be less than `Number.MAX_SAFE_INTEGER`.
 */

/**
 * Implementation 1: Using the mathematical formula for the sum of an arithmetic progression.
 * This is the most efficient approach because it computes the sum in constant time without any loops.
 * 
 * Time Complexity: O(1) - The calculation is done in a single step regardless of the size of `n`.
 * Space Complexity: O(1) - Only a fixed amount of memory is used for the variables.
 */
function sum_to_n_a(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Implementation 2: Using a simple iterative loop to add numbers from 1 to `n`.
 * This is a straightforward and easy-to-understand approach, but it takes time proportional to `n`.
 * 
 * Time Complexity: O(n) - The loop runs `n` times, performing an addition in each iteration.
 * Space Complexity: O(1) - Uses a single variable (`sum`) to keep track of the accumulated total.
 */
function sum_to_n_b(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Implementation 3: Using recursion.
 * This approach breaks the problem down into smaller subproblems (sum of `n` + sum of `n-1`, etc.).
 * While elegant, it is the least efficient of the three due to overhead from function calls
 * and the risk of a stack overflow for very large values of `n`.
 * 
 * Time Complexity: O(n) - The function calls itself `n` times.
 * Space Complexity: O(n) - Each function call adds a frame to the call stack. For a large `n`, this will consume significant memory and potentially cause a maximum call stack size exceeded error.
 */
function sum_to_n_c(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}

// Simple automated tests to verify the implementations
function runTests() {
    const testCases = [
        { input: 5, expected: 15 },
        { input: 10, expected: 55 },
        { input: 100, expected: 5050 },
        { input: 1, expected: 1 },
        { input: 0, expected: 0 },
    ];

    let allPassed = true;

    for (const testCase of testCases) {
        const resultA = sum_to_n_a(testCase.input);
        const resultB = sum_to_n_b(testCase.input);
        const resultC = sum_to_n_c(testCase.input);

        if (resultA !== testCase.expected || resultB !== testCase.expected || resultC !== testCase.expected) {
            console.error(`Test failed for input ${testCase.input}. Expected ${testCase.expected}. Got A: ${resultA}, B: ${resultB}, C: ${resultC}`);
            allPassed = false;
        }
    }

    if (allPassed) {
        console.log("All Problem 4 tests passed successfully!");
    } else {
        console.error("Some Problem 4 tests failed.");
    }
}

runTests();
