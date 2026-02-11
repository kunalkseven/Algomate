
/**
 * Utility to execute user code against test cases
 */

export interface TestCaseResult {
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error?: string;
}

export function executeCode(
    userCode: string,
    functionName: string,
    examples: { input: string; output: string }[]
): TestCaseResult[] {
    const results: TestCaseResult[] = [];

    // Basic safety check (very limited, client-side only)
    if (userCode.includes('process') || userCode.includes('require') || userCode.includes('eval(')) {
        return [{
            passed: false,
            input: 'Security Check',
            expectedOutput: 'Safe Code',
            actualOutput: 'Unsafe Code detected',
            error: 'Usage of process, require, or eval is not allowed.'
        }];
    }

    try {
        // Wrap user code to return the function
        // This assumes the user defines the function with the expected name
        const wrappedCode = `
            ${userCode}
            return ${functionName};
        `;

        // Create the function from the string
        // verify if the syntax is valid
        const userFunction = new Function(wrappedCode)();

        examples.forEach((example, index) => {
            try {
                const args = parseInput(example.input);
                const expected = parseOutput(example.output);

                // Deep copy args to avoid mutation side effects between runs if we fail to re-parse
                // But parseInput creates new objects every time called.

                const result = userFunction(...args);

                const passed = isEqual(result, expected);

                results.push({
                    passed,
                    input: example.input,
                    expectedOutput: example.output,
                    actualOutput: JSON.stringify(result),
                });
            } catch (err) {
                results.push({
                    passed: false,
                    input: example.input,
                    expectedOutput: example.output,
                    actualOutput: 'Error during execution',
                    error: err instanceof Error ? err.message : String(err),
                });
            }
        });

    } catch (err) {
        return [{
            passed: false,
            input: 'Compilation',
            expectedOutput: 'Valid Code',
            actualOutput: 'Syntax Error',
            error: err instanceof Error ? err.message : String(err),
        }];
    }

    return results;
}

// Helper to parse "nums = [2,7], target = 9" into [[2,7], 9]
function parseInput(inputStr: string): any[] {
    // This is a heuristic parser.
    // It assumes inputs are separated by ", " and are in format "name = value"
    // Limitations: string inputs containing ", " might break this simple split.
    // But for LeetCode style inputs usually it's okay.

    // Better approach: regex to find "var ="
    const args: any[] = [];

    // Split by comma that is NOT inside brackets (arrays)
    // This simple regex won't handle nested structures perfectly but works for standard cases
    // A safer way for "vars" is to just eval the whole string as variable declarations and return them?
    // No, scope issues.

    // Let's try to extract values after "="
    const parts = inputStr.split(/,\s*(?=[a-zA-Z_]\w*\s*=)/);

    parts.forEach(part => {
        const match = part.match(/.*?=\s*(.*)/);
        if (match && match[1]) {
            // Use Function to safely parse the value (JSON.parse is too strict for JS objects/arrays with single quotes)
            // e.g. using ' instead of "
            try {
                const val = new Function(`return ${match[1]}`)();
                args.push(val);
            } catch (e) {
                console.error("Failed to parse argument:", match[1]);
                args.push(null);
            }
        }
    });

    return args;
}

function parseOutput(outputStr: string): any {
    try {
        return new Function(`return ${outputStr}`)();
    } catch (e) {
        return outputStr; // Fallback to string
    }
}

// Deep equality check
function isEqual(a: any, b: any): boolean {
    if (a === b) return true;

    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
        return false;
    }

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        // For array problems, order might or might not matter. 
        // For Two Sum, indices order matters.
        // For "return any order", we'd need problem helper.
        // Assuming strict equality for now.
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) return false;
        }
        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false;
    }

    return true;
}
