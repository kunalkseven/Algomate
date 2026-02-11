'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { questions } from '@/data/questions';
import type { QuestionProgress } from '@/types';
import SearchModal from '@/components/SearchModal';
import { useStats } from '@/hooks/useApi';

// Icons
const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const CodeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const BrainIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const TrophyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);

const FolderIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const FireIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.953 2.641a.5.5 0 00-.906 0c-1.845 4.027-5.047 6.107-5.047 10.359a6 6 0 1012 0c0-4.252-3.202-6.332-5.047-10.359z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

import Sidebar from '@/components/Sidebar';

// Activity Heatmap Component
// ... (keep other components, remove Sidebar definition)

// Activity Heatmap Component
function ActivityHeatmap() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Wed', 'Fri'];

    // Generate sample activity data (52 weeks)
    const generateActivityData = () => {
        const data: number[][] = [];
        for (let week = 0; week < 52; week++) {
            const weekData: number[] = [];
            for (let day = 0; day < 7; day++) {
                weekData.push(Math.random() > 0.5 ? Math.floor(Math.random() * 5) : 0);
            }
            data.push(weekData);
        }
        return data;
    };

    const [activityData] = useState(generateActivityData());

    const getColor = (count: number) => {
        if (count === 0) return 'bg-dark-800';
        if (count === 1) return 'bg-emerald-900';
        if (count === 2) return 'bg-emerald-700';
        if (count === 3) return 'bg-emerald-500';
        return 'bg-emerald-400';
    };

    return (
        <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">Activity</h3>
            <div className="overflow-x-auto">
                <div className="flex gap-1">
                    {/* Days labels */}
                    <div className="flex flex-col gap-1 pr-2">
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                            <div key={day} className="h-3 text-[10px] text-dark-500 flex items-center">
                                {day % 2 === 1 ? days[Math.floor(day / 2)] : ''}
                            </div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="flex gap-1">
                        {activityData.map((week, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-1">
                                {week.map((count, dayIdx) => (
                                    <div
                                        key={dayIdx}
                                        className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                                        title={`${count} problems solved`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Months labels */}
                <div className="flex mt-2 pl-8">
                    {months.map((month, idx) => (
                        <span key={idx} className="text-[10px] text-dark-500" style={{ width: `${100 / 12}%` }}>
                            {month}
                        </span>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-4 text-xs text-dark-500">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-dark-800" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-900" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-700" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const [showSearch, setShowSearch] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch stats from API
    const { data: stats, loading, error } = useStats();

    useEffect(() => {
        // Keyboard shortcut for search (Cmd/Ctrl + K)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Extract stats from API response with fallback values
    const totalSolved = stats?.totalSolved || 0;
    const easySolved = stats?.difficultyProgress?.Easy?.solved || 0;
    const mediumSolved = stats?.difficultyProgress?.Medium?.solved || 0;
    const hardSolved = stats?.difficultyProgress?.Hard?.solved || 0;
    const currentStreak = stats?.currentStreak || 0;

    // Convert topic progress from API format
    const topicsProgress = stats?.topicProgress
        ? Object.entries(stats.topicProgress).map(([name, data]: [string, any]) => ({
            name,
            solved: data.solved || 0,
            total: data.total || 0,
            color: getTopicColor(name)
        }))
        : [];

    // Recent activity (placeholder - would need API endpoint)
    const recentActivity = [
        { date: 'Today', problems: ['Two Sum', 'Valid Parentheses'], count: 2 },
        { date: 'Yesterday', problems: ['Binary Search', 'Merge Two Sorted Lists'], count: 2 },
        { date: '2 days ago', problems: ['Reverse Linked List'], count: 1 },
    ];

    const revisionDue = questions.slice(0, 3);

    function getTopicColor(topic: string): string {
        const colors: Record<string, string> = {
            'Arrays': 'bg-blue-500',
            'Strings': 'bg-green-500',
            'Trees': 'bg-purple-500',
            'DP': 'bg-orange-500',
            'Dynamic Programming': 'bg-orange-500',
            'Graphs': 'bg-pink-500',
            'Linked Lists': 'bg-red-500',
            'Stacks': 'bg-yellow-500',
            'Queues': 'bg-indigo-500',
        };
        return colors[topic] || 'bg-gray-500';
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-dark-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">Failed to load dashboard</h2>
                    <p className="text-dark-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-950">
            <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activeItem="dashboard" />
            <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 bg-dark-800 rounded-lg"
                    >
                        <MenuIcon />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <button
                        onClick={() => setShowSearch(true)}
                        className="p-2 bg-dark-800 rounded-lg"
                    >
                        <SearchIcon />
                    </button>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Welcome back, John! 👋</h1>
                        <p className="text-dark-400">Ready to practice some DSA today?</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search Button - Desktop */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            <SearchIcon />
                            <span className="text-dark-400">Search...</span>
                            <kbd className="px-2 py-0.5 text-xs text-dark-500 bg-dark-700 rounded">⌘K</kbd>
                        </button>
                        <div className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <span className="text-orange-400 streak-fire"><FireIcon /></span>
                            <span className="font-semibold text-orange-400 text-sm lg:text-base">{currentStreak} day streak</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-dark-400 text-sm">Total Solved</span>
                            <CheckCircleIcon />
                        </div>
                        <div className="text-4xl font-bold gradient-text">{totalSolved}</div>
                        <div className="text-sm text-dark-500 mt-1">of {questions.length} problems</div>
                    </div>
                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-dark-400 text-sm">Easy</span>
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <div className="text-4xl font-bold text-emerald-400">{easySolved}</div>
                        <div className="text-sm text-dark-500 mt-1">problems solved</div>
                    </div>
                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-dark-400 text-sm">Medium</span>
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        </div>
                        <div className="text-4xl font-bold text-yellow-400">{mediumSolved}</div>
                        <div className="text-sm text-dark-500 mt-1">problems solved</div>
                    </div>
                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-dark-400 text-sm">Hard</span>
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                        </div>
                        <div className="text-4xl font-bold text-red-400">{hardSolved}</div>
                        <div className="text-sm text-dark-500 mt-1">problems solved</div>
                    </div>
                </div>

                {/* Activity Section Grid */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Activity Heatmap */}
                    <div className="lg:col-span-2">
                        <ActivityHeatmap />
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-xl p-6 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Recent Activity</h3>
                                <Link href="/profile" className="text-sm text-primary-400 hover:text-primary-300">
                                    View Full History
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recentActivity.map((group, groupIdx) => (
                                    <div key={groupIdx} className="border-b border-dark-800 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-dark-500 font-medium uppercase tracking-wider">{group.date}</span>
                                            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                +{group.count}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {group.problems.map((problem, pIdx) => (
                                                <div key={pIdx} className="flex items-center gap-2 text-sm text-dark-300">
                                                    <span className="text-emerald-500/80">
                                                        <CheckCircleIcon />
                                                    </span>
                                                    <span className="hover:text-white cursor-pointer transition-colors">{problem}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Topic Progress */}
                        <div className="glass rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Topic Progress</h3>
                                <Link href="/practice" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                                    View all <ArrowRightIcon />
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {topicsProgress.map((topic) => (
                                    <div key={topic.name} className="bg-dark-800/30 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2 text-sm">
                                            <span className="font-medium text-dark-200">{topic.name}</span>
                                            <span className="text-dark-400">{topic.solved}/{topic.total}</span>
                                        </div>
                                        <div className="progress-bar h-1.5">
                                            <div
                                                className={`progress-bar-fill ${topic.color}`}
                                                style={{ width: `${(topic.solved / topic.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Revision Due */}
                        <div className="glass rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BrainIcon />
                                    Due for Revision
                                </h3>
                                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                                    {revisionDue.length} today
                                </span>
                            </div>
                            <div className="space-y-3">
                                {revisionDue.map((q) => (
                                    <Link
                                        key={q.id}
                                        href={`/practice/${q.slug}`}
                                        className="block p-3 bg-dark-800/50 hover:bg-dark-800 rounded-lg transition-colors border border-dark-700/50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{q.title}</span>
                                            <span className={`text-xs ${q.difficulty === 'Easy' ? 'text-emerald-400' :
                                                q.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                                }`}>
                                                {q.difficulty}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href="/revision"
                                className="block mt-4 text-center text-sm text-primary-400 hover:text-primary-300"
                            >
                                View all revisions →
                            </Link>
                        </div>

                        {/* Quick Actions */}
                        <div className="glass rounded-xl p-6">
                            <h3 className="font-semibold mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/practice"
                                    className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-lg hover:from-primary-500/20 hover:to-purple-500/20 transition-colors"
                                >
                                    <span className="text-sm font-medium">Random Problem</span>
                                    <ArrowRightIcon />
                                </Link>
                                <Link
                                    href="/revision"
                                    className="flex items-center justify-between p-3 bg-dark-800/50 hover:bg-dark-800 rounded-lg transition-colors"
                                >
                                    <span className="text-sm">Start Revision</span>
                                    <ArrowRightIcon />
                                </Link>
                                <Link
                                    href="/friends"
                                    className="flex items-center justify-between p-3 bg-dark-800/50 hover:bg-dark-800 rounded-lg transition-colors"
                                >
                                    <span className="text-sm">Find Friends</span>
                                    <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
