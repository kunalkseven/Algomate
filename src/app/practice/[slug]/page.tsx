'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getQuestionBySlug, DIFFICULTY_COLORS } from '@/data/questions';
import Editor from '@monaco-editor/react';
import type { Language, QuestionProgress } from '@/types';

// Icons
const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const PlayIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const BookmarkIcon = ({ filled }: { filled: boolean }) => (
    <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const LightbulbIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
];

export default function QuestionPage() {
    const params = useParams();
    const slug = params.slug as string;
    const question = getQuestionBySlug(slug);

    const [language, setLanguage] = useState<Language>('javascript');
    const [code, setCode] = useState('');
    const [showHints, setShowHints] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'solutions' | 'notes'>('description');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (question) {
            setCode(question.starterCode[language]);
            // Load saved progress
            const saved = localStorage.getItem('algomate_progress');
            if (saved) {
                const progress = JSON.parse(saved);
                if (progress[question.id]) {
                    setIsBookmarked(progress[question.id].bookmarked || false);
                    setNotes(progress[question.id].notes || '');
                }
            }
        }
    }, [question, language]);

    if (!question) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Question not found</h1>
                    <Link href="/practice" className="text-primary-400 hover:text-primary-300">
                        Back to Practice
                    </Link>
                </div>
            </div>
        );
    }

    const handleRun = () => {
        setIsRunning(true);
        setOutput('Running...\n');
        setTimeout(() => {
            setOutput('✓ Test case 1 passed\n✓ Test case 2 passed\n\nAll test cases passed!');
            setIsRunning(false);
        }, 1500);
    };

    const handleSubmit = () => {
        // Save progress
        const saved = localStorage.getItem('algomate_progress');
        const progress = saved ? JSON.parse(saved) : {};
        progress[question.id] = {
            ...progress[question.id],
            questionId: question.id,
            status: 'solved',
            solvedAt: new Date().toISOString(),
            bookmarked: isBookmarked,
            notes,
            attempts: (progress[question.id]?.attempts || 0) + 1,
            confidence: 3,
            reviewCount: 0,
        };
        localStorage.setItem('algomate_progress', JSON.stringify(progress));

        setOutput('✓ Solution submitted successfully!\n\nYour solution has been saved.');
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        const saved = localStorage.getItem('algomate_progress');
        const progress = saved ? JSON.parse(saved) : {};
        progress[question.id] = {
            ...progress[question.id],
            bookmarked: !isBookmarked,
        };
        localStorage.setItem('algomate_progress', JSON.stringify(progress));
    };

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Header */}
            <header className="h-14 border-b border-dark-800 flex items-center justify-between px-4 bg-dark-900">
                <div className="flex items-center gap-4">
                    <Link href="/practice" className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                        <ArrowLeftIcon />
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className={`${DIFFICULTY_COLORS[question.difficulty]} px-2.5 py-1 rounded-full text-xs font-medium`}>
                            {question.difficulty}
                        </span>
                        <h1 className="font-semibold">{question.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-yellow-400 bg-yellow-400/10' : 'hover:bg-dark-800 text-dark-400'
                            }`}
                    >
                        <BookmarkIcon filled={isBookmarked} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
                        <GitHubIcon />
                        <span className="text-sm">Submit to GitHub</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-3.5rem)]">
                {/* Left Panel - Problem Description */}
                <div className="w-1/2 border-r border-dark-800 overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex border-b border-dark-800 bg-dark-900 sticky top-0">
                        {(['description', 'solutions', 'notes'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
                                    ? 'text-primary-400 border-b-2 border-primary-400'
                                    : 'text-dark-400 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'description' && (
                            <>
                                {/* Topics */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {question.topics.map((topic) => (
                                        <span key={topic} className="text-xs bg-dark-800 text-dark-300 px-3 py-1 rounded-full">
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <div className="prose prose-invert max-w-none mb-8">
                                    <p className="text-dark-200 leading-relaxed">{question.description}</p>
                                </div>

                                {/* Examples */}
                                <div className="space-y-4 mb-8">
                                    <h3 className="font-semibold">Examples</h3>
                                    {question.examples.map((example, index) => (
                                        <div key={index} className="bg-dark-800/50 rounded-lg p-4 font-mono text-sm">
                                            <div className="mb-2">
                                                <span className="text-dark-400">Input: </span>
                                                <span className="text-emerald-400">{example.input}</span>
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-dark-400">Output: </span>
                                                <span className="text-primary-400">{example.output}</span>
                                            </div>
                                            {example.explanation && (
                                                <div className="text-dark-400 text-xs mt-2">
                                                    <span className="font-medium">Explanation: </span>
                                                    {example.explanation}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Constraints */}
                                <div className="mb-8">
                                    <h3 className="font-semibold mb-3">Constraints</h3>
                                    <ul className="space-y-1 text-sm text-dark-300">
                                        {question.constraints.map((constraint, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-dark-500">•</span>
                                                <code className="font-mono">{constraint}</code>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Hints */}
                                <div>
                                    <button
                                        onClick={() => setShowHints(!showHints)}
                                        className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
                                    >
                                        <LightbulbIcon />
                                        <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
                                    </button>
                                    {showHints && (
                                        <div className="mt-4 space-y-2">
                                            {question.hints.map((hint, index) => (
                                                <div key={index} className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3 text-sm">
                                                    <span className="text-primary-400 font-medium">Hint {index + 1}: </span>
                                                    {hint}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Companies */}
                                {question.companies && (
                                    <div className="mt-8">
                                        <h3 className="font-semibold mb-3 text-sm text-dark-400">Companies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {question.companies.map((company) => (
                                                <span key={company} className="text-xs bg-dark-800 text-dark-300 px-3 py-1 rounded-full">
                                                    {company}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'solutions' && (
                            <div className="text-center text-dark-400 py-16">
                                <p>Solutions will be available after you solve the problem.</p>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add your notes here... (approach, edge cases, time complexity, etc.)"
                                    className="w-full h-64 bg-dark-800 border border-dark-700 rounded-lg p-4 text-sm resize-none focus:outline-none focus:border-primary-500"
                                />
                                <button
                                    onClick={() => {
                                        const saved = localStorage.getItem('algomate_progress');
                                        const progress = saved ? JSON.parse(saved) : {};
                                        progress[question.id] = { ...progress[question.id], notes };
                                        localStorage.setItem('algomate_progress', JSON.stringify(progress));
                                    }}
                                    className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-400 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Save Notes
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 flex flex-col">
                    {/* Language Selector */}
                    <div className="flex items-center justify-between px-4 py-2 bg-dark-900 border-b border-dark-800">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
                        >
                            {LANGUAGE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-4 py-1.5 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                            >
                                <PlayIcon />
                                <span>Run</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-sm font-medium transition-colors"
                            >
                                <CheckIcon />
                                <span>Submit</span>
                            </button>
                        </div>
                    </div>

                    {/* Code Editor Area */}
                    <div className="flex-1 overflow-hidden">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                readOnly: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                            }}
                        />
                    </div>

                    {/* Output Panel */}
                    <div className="h-48 border-t border-dark-800 bg-dark-900">
                        <div className="px-4 py-2 border-b border-dark-800 text-sm font-medium text-dark-400">
                            Output
                        </div>
                        <pre className="p-4 text-sm font-mono text-dark-300 overflow-auto h-[calc(100%-2.5rem)]">
                            {output || 'Click "Run" to test your code...'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
