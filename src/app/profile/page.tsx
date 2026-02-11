'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

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
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

// Badge type
interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedDate?: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

import Sidebar from '@/components/Sidebar';

// Activity Heatmap Component

// Activity Heatmap Component
function ActivityHeatmap() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Wed', 'Fri'];

    // Generate sample activity data
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

    const activityData = generateActivityData();

    const getColor = (count: number) => {
        if (count === 0) return 'bg-dark-800';
        if (count === 1) return 'bg-emerald-900';
        if (count === 2) return 'bg-emerald-700';
        if (count === 3) return 'bg-emerald-500';
        return 'bg-emerald-400';
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-1">
                {/* Days labels */}
                <div className="flex flex-col gap-1 pr-2">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                        <div key={day} className="h-3 text-xs text-dark-500 flex items-center">
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
                    <span key={idx} className="text-xs text-dark-500" style={{ width: `${100 / 12}%` }}>
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
    );
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'activity'>('overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mock user stats
    const userStats = {
        totalSolved: 87,
        easy: 35,
        medium: 38,
        hard: 14,
        streak: 12,
        maxStreak: 28,
        rank: 156,
        score: 2450,
        joinDate: 'January 2024',
        totalSubmissions: 243,
        acceptanceRate: 72,
    };

    // Mock badges
    const badges: Badge[] = [
        { id: '1', name: 'First Steps', description: 'Solve your first problem', icon: '🎯', earned: true, earnedDate: '2024-01-15', rarity: 'common' },
        { id: '2', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned: true, earnedDate: '2024-01-22', rarity: 'common' },
        { id: '3', name: 'Problem Solver', description: 'Solve 25 problems', icon: '💡', earned: true, earnedDate: '2024-02-01', rarity: 'rare' },
        { id: '4', name: 'Hard Mode', description: 'Solve 10 hard problems', icon: '⚡', earned: true, earnedDate: '2024-02-10', rarity: 'epic' },
        { id: '5', name: 'Century Club', description: 'Solve 100 problems', icon: '💯', earned: false, rarity: 'epic' },
        { id: '6', name: 'Streak Master', description: 'Maintain a 30-day streak', icon: '🏆', earned: false, rarity: 'legendary' },
        { id: '7', name: 'Algorithm Expert', description: 'Master all algorithm types', icon: '🧠', earned: false, rarity: 'legendary' },
        { id: '8', name: 'Social Butterfly', description: 'Add 10 friends', icon: '🦋', earned: true, earnedDate: '2024-01-28', rarity: 'rare' },
    ];

    // Mock recent activity
    const recentActivity = [
        { date: 'Today', problems: ['Two Sum', 'Valid Parentheses'], count: 2 },
        { date: 'Yesterday', problems: ['Binary Search', 'Merge Two Sorted Lists', 'Maximum Subarray'], count: 3 },
        { date: '2 days ago', problems: ['Reverse Linked List'], count: 1 },
        { date: '3 days ago', problems: ['Tree Traversal', 'Level Order Traversal'], count: 2 },
        { date: '4 days ago', problems: ['Coin Change', 'Longest Common Subsequence'], count: 2 },
    ];

    const getRarityColor = (rarity: Badge['rarity']) => {
        switch (rarity) {
            case 'common': return 'from-gray-500 to-gray-600';
            case 'rare': return 'from-blue-500 to-cyan-500';
            case 'epic': return 'from-purple-500 to-pink-500';
            case 'legendary': return 'from-yellow-500 to-orange-500';
        }
    };

    const getRarityBorder = (rarity: Badge['rarity']) => {
        switch (rarity) {
            case 'common': return 'border-gray-600';
            case 'rare': return 'border-blue-500';
            case 'epic': return 'border-purple-500';
            case 'legendary': return 'border-yellow-500';
        }
    };

    return (
        <div className="min-h-screen bg-dark-950">
            <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activeItem="profile" />

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
                    <div className="w-10" /> {/* Spacer for alignment */}
                </div>

                {/* Profile Header */}
                <div className="glass rounded-2xl p-4 lg:p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
                                JD
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-dark-800 rounded-full flex items-center justify-center border border-dark-600 hover:bg-dark-700 transition-colors">
                                <EditIcon />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-bold">John Doe</h1>
                                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                                    Pro Member
                                </span>
                            </div>
                            <p className="text-dark-400 mb-4">@johndoe • Joined {userStats.joinDate}</p>
                            <p className="text-dark-300 mb-4 max-w-2xl">
                                Passionate about algorithms and competitive programming. On a journey to master DSA! 🚀
                            </p>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-dark-400">
                                    <FireIcon />
                                    <span><strong className="text-white">{userStats.streak}</strong> day streak</span>
                                </div>
                                <div className="flex items-center gap-2 text-dark-400">
                                    <TrophyIcon />
                                    <span>Rank <strong className="text-white">#{userStats.rank}</strong></span>
                                </div>
                                <div className="flex items-center gap-2 text-dark-400">
                                    <CalendarIcon />
                                    <span><strong className="text-white">{userStats.totalSubmissions}</strong> submissions</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/settings"
                            className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            <SettingsIcon />
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="glass rounded-xl p-5 text-center">
                        <div className="text-4xl font-bold gradient-text mb-1">{userStats.totalSolved}</div>
                        <div className="text-sm text-dark-400">Problems Solved</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                        <div className="flex justify-between mb-2">
                            <span className="text-dark-400">Easy</span>
                            <span className="text-emerald-400 font-semibold">{userStats.easy}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-dark-400">Medium</span>
                            <span className="text-yellow-400 font-semibold">{userStats.medium}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-dark-400">Hard</span>
                            <span className="text-red-400 font-semibold">{userStats.hard}</span>
                        </div>
                    </div>
                    <div className="glass rounded-xl p-5 text-center">
                        <div className="text-4xl font-bold text-orange-400 mb-1">{userStats.maxStreak}</div>
                        <div className="text-sm text-dark-400">Max Streak</div>
                    </div>
                    <div className="glass rounded-xl p-5 text-center">
                        <div className="text-4xl font-bold text-cyan-400 mb-1">{userStats.acceptanceRate}%</div>
                        <div className="text-sm text-dark-400">Acceptance Rate</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {(['overview', 'badges', 'activity'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-lg font-medium transition-colors capitalize ${activeTab === tab
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'text-dark-400 hover:text-white hover:bg-dark-800'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Activity Heatmap */}
                        <div className="lg:col-span-2 glass rounded-xl p-4 lg:p-6">
                            <h3 className="text-lg font-semibold mb-4">Activity</h3>
                            <ActivityHeatmap />
                        </div>

                        {/* Recent Activity */}
                        <div className="glass rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivity.map((activity, idx) => (
                                    <div key={idx} className="border-b border-dark-800 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-dark-500">{activity.date}</span>
                                            <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">
                                                +{activity.count}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            {activity.problems.map((problem, pidx) => (
                                                <div key={pidx} className="text-sm text-dark-300 truncate">
                                                    ✓ {problem}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Topic Progress */}
                        <div className="lg:col-span-3 glass rounded-xl p-4 lg:p-6">
                            <h3 className="text-lg font-semibold mb-4">Topic Progress</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { topic: 'Arrays', solved: 18, total: 25 },
                                    { topic: 'Strings', solved: 12, total: 20 },
                                    { topic: 'Linked Lists', solved: 8, total: 15 },
                                    { topic: 'Trees', solved: 14, total: 20 },
                                    { topic: 'Graphs', solved: 10, total: 18 },
                                    { topic: 'Dynamic Programming', solved: 15, total: 25 },
                                    { topic: 'Sorting', solved: 6, total: 10 },
                                    { topic: 'Hashing', solved: 4, total: 8 },
                                ].map((item) => (
                                    <div key={item.topic} className="bg-dark-800/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">{item.topic}</span>
                                            <span className="text-xs text-dark-400">{item.solved}/{item.total}</span>
                                        </div>
                                        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all"
                                                style={{ width: `${(item.solved / item.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Badges Tab */}
                {activeTab === 'badges' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-dark-400">
                                Earned <strong className="text-white">{badges.filter(b => b.earned).length}</strong> of {badges.length} badges
                            </p>
                            <div className="flex gap-2 text-sm">
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-500" /> Common</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> Rare</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500" /> Epic</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500" /> Legendary</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className={`glass rounded-xl p-6 text-center relative overflow-hidden transition-all ${badge.earned
                                        ? `border-2 ${getRarityBorder(badge.rarity)}`
                                        : 'opacity-50 grayscale'
                                        }`}
                                >
                                    {badge.earned && (
                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityColor(badge.rarity)}`} />
                                    )}
                                    <div className="text-5xl mb-4">{badge.icon}</div>
                                    <h4 className="font-semibold mb-1">{badge.name}</h4>
                                    <p className="text-sm text-dark-400 mb-2">{badge.description}</p>
                                    {badge.earned && badge.earnedDate && (
                                        <span className="text-xs text-dark-500">
                                            Earned {new Date(badge.earnedDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    {!badge.earned && (
                                        <span className="text-xs text-dark-500">Not yet earned</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="glass rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-6">Full Activity History</h3>
                        <ActivityHeatmap />

                        <div className="mt-8">
                            <h4 className="font-medium mb-4">Submission History</h4>
                            <div className="space-y-3">
                                {recentActivity.flatMap((activity) =>
                                    activity.problems.map((problem, idx) => (
                                        <div key={`${activity.date}-${idx}`} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-emerald-400">✓</span>
                                                <span className="font-medium">{problem}</span>
                                            </div>
                                            <span className="text-sm text-dark-500">{activity.date}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
