
'use client';

import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Link from 'next/link';


// Custom Icons if heroicons not available (copying style from practice page for consistency)
const RunIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ClearIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Copy = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

interface LogEntry {
    type: 'log' | 'error' | 'warn' | 'info';
    content: string;
    timestamp: number;
}

export default function PlaygroundPage() {
    const [code, setCode] = useState<string>(`// JavaScript Playground
// Write your code here and click Run to see the output

console.log("Hello, World!");

const sum = (a, b) => a + b;
console.log("Sum of 5 + 3 =", sum(5, 3));

// You can also test errors
// throw new Error("Oops!");
`);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = async () => {
        setIsRunning(true);
        setLogs([]); // Clear previous logs on run? Optional. Let's clear for fresh start.

        // Capture console
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;

        const capturedLogs: LogEntry[] = [];

        const addLog = (type: LogEntry['type'], args: any[]) => {
            const content = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');

            capturedLogs.push({
                type,
                content,
                timestamp: Date.now()
            });
            // Update state immediately for perceived speed? 
            // Better to batch update state at the end or use a functional update if async
        };

        // Override
        console.log = (...args) => { originalLog(...args); addLog('log', args); };
        console.error = (...args) => { originalError(...args); addLog('error', args); };
        console.warn = (...args) => { originalWarn(...args); addLog('warn', args); };
        console.info = (...args) => { originalInfo(...args); addLog('info', args); };

        try {
            // Wait a tick to allow UI to show "Running" state if needed
            await new Promise(resolve => setTimeout(resolve, 50));

            // Execute
            // Using new Function to isolate scope slightly, but it still has access to global window
            // Security Warning: This is client-side execution, same risks as DevTools console.
            const userFunc = new Function(code);
            userFunc();

        } catch (err: any) {
            console.error(err.toString());
        } finally {
            // Restore console
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            console.info = originalInfo;

            setLogs(capturedLogs);
            setIsRunning(false);
        }
    };

    const handleClear = () => {
        setLogs([]);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        // Optional: Show toast
    };

    return (
        <div className="h-screen flex flex-col bg-dark-950 text-white">
            {/* Header */}
            <header className="h-16 border-b border-dark-800 flex items-center justify-between px-6 bg-dark-900">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        Algomate Playground
                    </Link>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isRunning
                            ? 'bg-primary-600/50 cursor-not-allowed text-primary-200'
                            : 'bg-primary-600 hover:bg-primary-500 text-white'
                            }`}
                    >
                        {isRunning ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <RunIcon />
                        )}
                        <span>Run</span>
                    </button>

                    <button
                        onClick={handleClear}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-dark-800 hover:bg-dark-700 text-gray-300 transition-colors"
                        title="Clear Output"
                    >
                        <ClearIcon />
                        <span>Clear</span>
                    </button>

                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
                        title="Copy Code"
                    >
                        <Copy />
                    </button>

                    <Link
                        href="/practice"
                        className="ml-4 text-sm text-gray-400 hover:text-white"
                    >
                        Back to Practice
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Pane */}
                <div className="w-1/2 border-r border-dark-800 flex flex-col">
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}
                        />
                    </div>
                </div>

                {/* Output Pane */}
                <div className="w-1/2 flex flex-col bg-dark-925">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-dark-800 bg-dark-900">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Console Output</span>
                        <span className="text-xs text-gray-600">{logs.length} logs</span>
                    </div>

                    <div className="flex-1 overflow-auto p-4 space-y-2 font-mono text-sm">
                        {logs.length === 0 ? (
                            <div className="text-gray-600 italic text-center mt-10">
                                Run code to see output here...
                            </div>
                        ) : (
                            logs.map((log, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded border-l-2 ${log.type === 'error' ? 'bg-red-900/10 border-red-500 text-red-200' :
                                        log.type === 'warn' ? 'bg-yellow-900/10 border-yellow-500 text-yellow-200' :
                                            'bg-dark-800 border-gray-600 text-gray-300'
                                        }`}
                                >
                                    <pre className="whitespace-pre-wrap break-words">{log.content}</pre>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
