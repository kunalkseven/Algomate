'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Mock all questions data for search
const allQuestions = [
    // DSA Questions
    { id: 'two-sum', title: 'Two Sum', type: 'dsa', difficulty: 'Easy', topics: ['Arrays', 'Hashing'], href: '/practice/two-sum' },
    { id: 'valid-parentheses', title: 'Valid Parentheses', type: 'dsa', difficulty: 'Easy', topics: ['Stack', 'Strings'], href: '/practice/valid-parentheses' },
    { id: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', type: 'dsa', difficulty: 'Easy', topics: ['Linked Lists'], href: '/practice/merge-two-sorted-lists' },
    { id: 'best-time-to-buy-sell-stock', title: 'Best Time to Buy and Sell Stock', type: 'dsa', difficulty: 'Easy', topics: ['Arrays', 'Dynamic Programming'], href: '/practice/best-time-to-buy-sell-stock' },
    { id: 'binary-search', title: 'Binary Search', type: 'dsa', difficulty: 'Easy', topics: ['Arrays', 'Binary Search'], href: '/practice/binary-search' },
    { id: 'maximum-subarray', title: 'Maximum Subarray', type: 'dsa', difficulty: 'Medium', topics: ['Arrays', 'Dynamic Programming'], href: '/practice/maximum-subarray' },
    { id: 'container-with-most-water', title: 'Container With Most Water', type: 'dsa', difficulty: 'Medium', topics: ['Arrays', 'Two Pointers'], href: '/practice/container-with-most-water' },
    { id: 'longest-substring-without-repeating', title: 'Longest Substring Without Repeating Characters', type: 'dsa', difficulty: 'Medium', topics: ['Strings', 'Sliding Window'], href: '/practice/longest-substring-without-repeating' },
    { id: 'lru-cache', title: 'LRU Cache', type: 'dsa', difficulty: 'Medium', topics: ['Design', 'Hashing'], href: '/practice/lru-cache' },
    { id: 'binary-tree-level-order', title: 'Binary Tree Level Order Traversal', type: 'dsa', difficulty: 'Medium', topics: ['Trees', 'BFS'], href: '/practice/binary-tree-level-order' },
    { id: 'course-schedule', title: 'Course Schedule', type: 'dsa', difficulty: 'Medium', topics: ['Graphs', 'Topological Sort'], href: '/practice/course-schedule' },
    { id: 'word-break', title: 'Word Break', type: 'dsa', difficulty: 'Medium', topics: ['Dynamic Programming', 'Strings'], href: '/practice/word-break' },
    { id: 'house-robber', title: 'House Robber', type: 'dsa', difficulty: 'Medium', topics: ['Dynamic Programming'], href: '/practice/house-robber' },
    { id: 'coin-change', title: 'Coin Change', type: 'dsa', difficulty: 'Medium', topics: ['Dynamic Programming'], href: '/practice/coin-change' },
    { id: 'merge-k-sorted-lists', title: 'Merge K Sorted Lists', type: 'dsa', difficulty: 'Hard', topics: ['Linked Lists', 'Heap'], href: '/practice/merge-k-sorted-lists' },
    { id: 'trapping-rain-water', title: 'Trapping Rain Water', type: 'dsa', difficulty: 'Hard', topics: ['Arrays', 'Two Pointers'], href: '/practice/trapping-rain-water' },
    { id: 'serialize-deserialize-binary-tree', title: 'Serialize and Deserialize Binary Tree', type: 'dsa', difficulty: 'Hard', topics: ['Trees', 'Design'], href: '/practice/serialize-deserialize-binary-tree' },
    { id: 'word-ladder', title: 'Word Ladder', type: 'dsa', difficulty: 'Hard', topics: ['Graphs', 'BFS'], href: '/practice/word-ladder' },
    { id: 'alien-dictionary', title: 'Alien Dictionary', type: 'dsa', difficulty: 'Hard', topics: ['Graphs', 'Topological Sort'], href: '/practice/alien-dictionary' },
    // Navigation Pages
    { id: 'dashboard', title: 'Dashboard', type: 'page', href: '/dashboard' },
    { id: 'practice', title: 'Practice', type: 'page', href: '/practice' },
    { id: 'my-questions', title: 'My Questions', type: 'page', href: '/my-questions' },
    { id: 'revision', title: 'Revision', type: 'page', href: '/revision' },
    { id: 'leaderboard', title: 'Leaderboard', type: 'page', href: '/leaderboard' },
    { id: 'friends', title: 'Friends', type: 'page', href: '/friends' },
    { id: 'profile', title: 'Profile', type: 'page', href: '/profile' },
    { id: 'settings', title: 'Settings', type: 'page', href: '/settings' },
];

// Icons
const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CodeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const PageIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof allQuestions>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchTerms = query.toLowerCase().split(' ');
        const filtered = allQuestions.filter((item) => {
            const searchableText = [
                item.title.toLowerCase(),
                item.type,
                ...(item.topics || []).map(t => t.toLowerCase()),
                item.difficulty?.toLowerCase() || '',
            ].join(' ');

            return searchTerms.every(term => searchableText.includes(term));
        });

        setResults(filtered.slice(0, 10));
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' && results[selectedIndex]) {
                router.push(results[selectedIndex].href);
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, router, onClose]);

    if (!isOpen) return null;

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'Easy': return 'text-emerald-400';
            case 'Medium': return 'text-yellow-400';
            case 'Hard': return 'text-red-400';
            default: return 'text-dark-400';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl mx-4 bg-dark-900 rounded-xl border border-dark-700 shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-800">
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search questions, topics, or pages..."
                        className="flex-1 bg-transparent outline-none text-lg placeholder-dark-500"
                    />
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-dark-500 bg-dark-800 rounded border border-dark-700">
                        ESC
                    </kbd>
                    <button onClick={onClose} className="p-1 hover:bg-dark-800 rounded">
                        <XIcon />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                    {query && results.length === 0 && (
                        <div className="p-8 text-center text-dark-500">
                            No results found for "{query}"
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="py-2">
                            {results.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 hover:bg-dark-800 ${index === selectedIndex ? 'bg-dark-800' : ''
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
                                        {item.type === 'dsa' ? <CodeIcon /> : <PageIcon />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{item.title}</div>
                                        {item.type === 'dsa' && (
                                            <div className="text-sm text-dark-500">
                                                <span className={getDifficultyColor(item.difficulty)}>
                                                    {item.difficulty}
                                                </span>
                                                {item.topics && (
                                                    <span className="ml-2">
                                                        {item.topics.join(', ')}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {item.type === 'page' && (
                                            <div className="text-sm text-dark-500">Navigate to page</div>
                                        )}
                                    </div>
                                    <span className="text-xs text-dark-500">↵</span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!query && (
                        <div className="p-4">
                            <div className="text-sm text-dark-500 mb-3">Quick Links</div>
                            <div className="grid grid-cols-2 gap-2">
                                {allQuestions.filter(q => q.type === 'page').map((page) => (
                                    <Link
                                        key={page.id}
                                        href={page.href}
                                        onClick={onClose}
                                        className="flex items-center gap-2 px-3 py-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
                                    >
                                        <PageIcon />
                                        <span className="text-sm">{page.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-dark-800 text-xs text-dark-500">
                    <div className="flex items-center gap-4">
                        <span><kbd className="px-1.5 py-0.5 bg-dark-800 rounded">↑</kbd><kbd className="px-1.5 py-0.5 bg-dark-800 rounded ml-1">↓</kbd> to navigate</span>
                        <span><kbd className="px-1.5 py-0.5 bg-dark-800 rounded">↵</kbd> to select</span>
                    </div>
                    <span>Search powered by AlgoMate</span>
                </div>
            </div>
        </div>
    );
}
