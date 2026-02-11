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
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.953 2.641a.5.5 0 00-.906 0c-1.845 4.027-5.047 6.107-5.047 10.359a6 6 0 1012 0c0-4.252-3.202-6.332-5.047-10.359z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

// Friend data with their solved problems and progress

// Friend data with their solved problems and progress
const friendsData = [
    {
        id: '1',
        name: 'Alice Chen',
        username: 'alicechen',
        avatar: 'AC',
        score: 2450,
        solved: 145,
        streak: 45,
        easy: 60,
        medium: 55,
        hard: 30,
        recentSolved: ['Two Sum', 'LRU Cache', 'Merge K Sorted Lists'],
        lastActive: '2 hours ago'
    },
    {
        id: '2',
        name: 'Carol White',
        username: 'carolwhite',
        avatar: 'CW',
        score: 2180,
        solved: 130,
        streak: 28,
        easy: 55,
        medium: 48,
        hard: 27,
        recentSolved: ['Valid Parentheses', 'Binary Tree Level Order'],
        lastActive: '5 hours ago'
    },
    {
        id: '3',
        name: 'Emma Wilson',
        username: 'emmawilson',
        avatar: 'EW',
        score: 1850,
        solved: 110,
        streak: 21,
        easy: 50,
        medium: 40,
        hard: 20,
        recentSolved: ['Reverse Linked List', 'House Robber'],
        lastActive: 'Yesterday'
    },
    {
        id: '4',
        name: 'Henry Zhang',
        username: 'henryzhang',
        avatar: 'HZ',
        score: 1580,
        solved: 94,
        streak: 5,
        easy: 45,
        medium: 35,
        hard: 14,
        recentSolved: ['Climbing Stairs'],
        lastActive: '3 days ago'
    },
];

// Current user data
const currentUser = {
    id: 'current',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'JD',
    score: 2050,
    solved: 122,
    streak: 7,
    easy: 52,
    medium: 45,
    hard: 25,
    recentSolved: ['Two Sum', 'Best Time to Buy and Sell Stock'],
    lastActive: 'Now'
};

export default function LeaderboardPage() {
    const [selectedFriend, setSelectedFriend] = useState<typeof friendsData[0] | null>(null);
    const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week'>('all');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Combine friends and current user, sort by score
    const allUsers = [...friendsData, currentUser].sort((a, b) => b.score - a.score);

    const getRankStyles = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-br from-yellow-500 to-amber-600';
        if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500';
        if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-600';
        return 'bg-dark-700';
    };

    return (
        <div className="min-h-screen bg-dark-950">
            <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activeItem="leaderboard" />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <button onClick={() => setMobileMenuOpen(true)} className="p-2 bg-dark-800 rounded-lg">
                        <MenuIcon />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center"><CodeIcon /></div>
                        <span className="font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <div className="w-10" />
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Friend Leaderboard</h1>
                        <p className="text-dark-400">Compare your progress with friends and track their solved problems</p>
                    </div>
                </div>

                {/* Time Range Filter */}
                <div className="flex justify-end mb-6">
                    <div className="flex gap-2">
                        {['all', 'month', 'week'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range as 'all' | 'month' | 'week')}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${timeRange === range
                                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                    : 'text-dark-400 hover:text-white bg-dark-800'
                                    }`}
                            >
                                {range === 'all' ? 'All Time' : range === 'month' ? 'This Month' : 'This Week'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="glass rounded-xl p-5">
                        <div className="text-sm text-dark-400 mb-1">Your Rank</div>
                        <div className="text-4xl font-bold gradient-text">
                            #{allUsers.findIndex(u => u.username === 'johndoe') + 1}
                        </div>
                        <div className="text-sm text-dark-500">of {allUsers.length} friends</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                        <div className="text-sm text-dark-400 mb-1">Total Friends</div>
                        <div className="text-4xl font-bold text-purple-400">{friendsData.length}</div>
                        <div className="text-sm text-dark-500">competing with you</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                        <div className="text-sm text-dark-400 mb-1">Your Score</div>
                        <div className="text-4xl font-bold text-cyan-400">{currentUser.score}</div>
                        <div className="text-sm text-dark-500">total points</div>
                    </div>
                </div>

                {/* Podium - Top 3 Friends */}
                <div className="flex justify-center items-end gap-4 mb-8">
                    {/* 2nd Place */}
                    {allUsers[1] && (
                        <div className="text-center cursor-pointer" onClick={() => setSelectedFriend(allUsers[1])}>
                            <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold ${allUsers[1].username === 'johndoe'
                                ? 'bg-gradient-to-br from-primary-500 to-purple-500 ring-2 ring-primary-400'
                                : 'bg-gradient-to-br from-gray-300 to-gray-500'
                                } text-dark-900`}>
                                {allUsers[1].avatar}
                            </div>
                            <div className="glass rounded-xl p-4 w-40 hover:border-primary-500/30 transition-colors">
                                <div className="text-sm font-semibold mb-1">
                                    {allUsers[1].name}
                                    {allUsers[1].username === 'johndoe' && <span className="text-primary-400"> (You)</span>}
                                </div>
                                <div className="text-xs text-dark-400 mb-2">@{allUsers[1].username}</div>
                                <div className="text-2xl font-bold text-gray-300">{allUsers[1].score}</div>
                                <div className="text-xs text-dark-500">points</div>
                            </div>
                            <div className="text-4xl font-bold text-gray-400 mt-2">2</div>
                        </div>
                    )}

                    {/* 1st Place */}
                    {allUsers[0] && (
                        <div className="text-center -mb-4 cursor-pointer" onClick={() => setSelectedFriend(allUsers[0])}>
                            <div className={`w-24 h-24 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl font-bold ring-4 ${allUsers[0].username === 'johndoe'
                                ? 'bg-gradient-to-br from-primary-500 to-purple-500 ring-primary-400/30'
                                : 'bg-gradient-to-br from-yellow-400 to-amber-500 ring-yellow-400/30'
                                } text-dark-900`}>
                                {allUsers[0].avatar}
                            </div>
                            <div className="glass rounded-xl p-5 w-48 gradient-border hover:border-primary-500/30 transition-colors">
                                <div className="text-lg font-semibold mb-1">
                                    {allUsers[0].name}
                                    {allUsers[0].username === 'johndoe' && <span className="text-primary-400"> (You)</span>}
                                </div>
                                <div className="text-sm text-dark-400 mb-2">@{allUsers[0].username}</div>
                                <div className="text-3xl font-bold gradient-text">{allUsers[0].score}</div>
                                <div className="text-xs text-dark-500">points</div>
                            </div>
                            <div className="text-5xl font-bold text-yellow-400 mt-2">👑</div>
                        </div>
                    )}

                    {/* 3rd Place */}
                    {allUsers[2] && (
                        <div className="text-center cursor-pointer" onClick={() => setSelectedFriend(allUsers[2])}>
                            <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold ${allUsers[2].username === 'johndoe'
                                ? 'bg-gradient-to-br from-primary-500 to-purple-500 ring-2 ring-primary-400'
                                : 'bg-gradient-to-br from-orange-400 to-orange-600'
                                } text-dark-900`}>
                                {allUsers[2].avatar}
                            </div>
                            <div className="glass rounded-xl p-4 w-40 hover:border-primary-500/30 transition-colors">
                                <div className="text-sm font-semibold mb-1">
                                    {allUsers[2].name}
                                    {allUsers[2].username === 'johndoe' && <span className="text-primary-400"> (You)</span>}
                                </div>
                                <div className="text-xs text-dark-400 mb-2">@{allUsers[2].username}</div>
                                <div className="text-2xl font-bold text-orange-400">{allUsers[2].score}</div>
                                <div className="text-xs text-dark-500">points</div>
                            </div>
                            <div className="text-4xl font-bold text-orange-400 mt-2">3</div>
                        </div>
                    )}
                </div>

                {/* Full Leaderboard Table */}
                <div className="glass rounded-xl overflow-hidden mb-8">
                    <table className="w-full">
                        <thead className="bg-dark-800/50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Rank</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Friend</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Score</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Solved</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Streak</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-800">
                            {allUsers.map((user, index) => (
                                <tr
                                    key={user.username}
                                    className={`hover:bg-dark-800/30 cursor-pointer ${user.username === 'johndoe' ? 'bg-primary-500/5' : ''}`}
                                    onClick={() => setSelectedFriend(user)}
                                >
                                    <td className="px-6 py-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyles(index + 1)}`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.username === 'johndoe'
                                                ? 'bg-gradient-to-br from-primary-500 to-purple-500'
                                                : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                                                }`}>
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <div className="font-medium flex items-center gap-2">
                                                    {user.name}
                                                    {user.username === 'johndoe' && (
                                                        <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">You</span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-dark-500">@{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-lg">{user.score}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <CheckCircleIcon />
                                            <span className="text-dark-300">{user.solved}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-orange-400"><FireIcon /></span>
                                            <span className="font-medium text-orange-400">{user.streak}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
                                            <EyeIcon />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Selected Friend Details */}
                {selectedFriend && (
                    <div className="glass rounded-xl p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${selectedFriend.username === 'johndoe'
                                    ? 'bg-gradient-to-br from-primary-500 to-purple-500'
                                    : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                                    }`}>
                                    {selectedFriend.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {selectedFriend.name}
                                        {selectedFriend.username === 'johndoe' && <span className="text-primary-400"> (You)</span>}
                                    </h3>
                                    <p className="text-dark-400">@{selectedFriend.username} • Active {selectedFriend.lastActive}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedFriend(null)}
                                className="p-2 hover:bg-dark-800 rounded-lg text-dark-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold gradient-text">{selectedFriend.score}</div>
                                <div className="text-sm text-dark-400">Total Score</div>
                            </div>
                            <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-emerald-400">{selectedFriend.easy}</div>
                                <div className="text-sm text-dark-400">Easy Solved</div>
                            </div>
                            <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-yellow-400">{selectedFriend.medium}</div>
                                <div className="text-sm text-dark-400">Medium Solved</div>
                            </div>
                            <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-red-400">{selectedFriend.hard}</div>
                                <div className="text-sm text-dark-400">Hard Solved</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Recently Solved</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedFriend.recentSolved.map((problem) => (
                                    <span key={problem} className="px-3 py-1.5 bg-dark-800 rounded-lg text-sm">
                                        {problem}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
