'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

// Icons
const CodeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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

interface LeaderboardUser {
    id: string;
    name: string;
    username: string;
    avatar: string; // Initials or URL
    score: number;
    solved: number;
    streak: number;
    easy: number;
    medium: number;
    hard: number;
    recentSolved: string[];
    lastActive: string;
    isCurrentUser: boolean;
}

interface LeaderboardClientProps {
    users: LeaderboardUser[];
    currentUserId?: string;
    friendIds?: string[];
    userGroups?: { id: string; name: string; memberIds: string[] }[];
}

export default function LeaderboardClient({ users, currentUserId, friendIds = [], userGroups = [] }: LeaderboardClientProps) {
    const [selectedFriend, setSelectedFriend] = useState<LeaderboardUser | null>(null);
    const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week'>('all'); // Visual only for now
    const [filterType, setFilterType] = useState<'global' | 'friends' | 'group'>('global');
    const [selectedGroupId, setSelectedGroupId] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Filter users based on selection
    const filteredUsers = users.filter(user => {
        if (filterType === 'global') return true;
        if (filterType === 'friends') {
            return user.isCurrentUser || friendIds.includes(user.id);
        }
        if (filterType === 'group' && selectedGroupId) {
            const group = userGroups.find(g => g.id === selectedGroupId);
            return group ? group.memberIds.includes(user.id) : false;
        }
        return true;
    });

    // Sort by score descending
    const sortedUsers = [...filteredUsers].sort((a, b) => b.score - a.score);
    const currentUserRank = sortedUsers.findIndex(u => u.isCurrentUser) + 1;
    const currentUser = sortedUsers.find(u => u.isCurrentUser);

    const getRankStyles = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-br from-yellow-500 to-amber-600 token-shadow';
        if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500 token-shadow';
        if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-600 token-shadow';
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
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Leaderboard</h1>
                        <p className="text-dark-400">See where you stand among all Algomate users</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center bg-dark-800 rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => { setFilterType('global'); setSelectedGroupId(''); }}
                            className={`px-4 py-2 rounded-md transition-colors ${filterType === 'global' ? 'bg-primary-500/20 text-primary-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            Global
                        </button>
                        <button
                            onClick={() => { setFilterType('friends'); setSelectedGroupId(''); }}
                            className={`px-4 py-2 rounded-md transition-colors ${filterType === 'friends' ? 'bg-primary-500/20 text-primary-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            Friends
                        </button>
                        {userGroups.length > 0 && (
                            <select
                                value={selectedGroupId}
                                onChange={(e) => {
                                    setFilterType('group');
                                    setSelectedGroupId(e.target.value);
                                }}
                                className={`bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer ${filterType === 'group' ? 'text-primary-400' : 'text-gray-400'}`}
                            >
                                <option value="" disabled className="bg-dark-900">Groups</option>
                                {userGroups.map(g => (
                                    <option key={g.id} value={g.id} className="bg-dark-900">{g.name}</option>
                                ))}
                            </select>
                        )}
                    </div>

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
                {currentUser && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="glass rounded-xl p-5">
                            <div className="text-sm text-dark-400 mb-1">Your Rank</div>
                            <div className="text-4xl font-bold gradient-text">
                                #{currentUserRank}
                            </div>
                            <div className="text-sm text-dark-500">of {users.length} users</div>
                        </div>
                        <div className="glass rounded-xl p-5">
                            <div className="text-sm text-dark-400 mb-1">Total Users</div>
                            <div className="text-4xl font-bold text-purple-400">{users.length}</div>
                            <div className="text-sm text-dark-500">competing</div>
                        </div>
                        <div className="glass rounded-xl p-5">
                            <div className="text-sm text-dark-400 mb-1">Your Score</div>
                            <div className="text-4xl font-bold text-cyan-400">{currentUser.score}</div>
                            <div className="text-sm text-dark-500">total points</div>
                        </div>
                    </div>
                )}

                {/* Podium - Top 3 */}
                <div className="flex justify-center items-end gap-4 mb-8 min-h-[16rem]">
                    {/* 2nd Place */}
                    {sortedUsers[1] && (
                        <div className="text-center cursor-pointer group" onClick={() => setSelectedFriend(sortedUsers[1])}>
                            <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold ${sortedUsers[1].isCurrentUser
                                ? 'bg-gradient-to-br from-primary-500 to-purple-500 ring-2 ring-primary-400'
                                : 'bg-gradient-to-br from-gray-300 to-gray-500'
                                } text-dark-900 shadow-lg group-hover:scale-105 transition-transform`}>
                                {sortedUsers[1].avatar}
                            </div>
                            <div className="glass rounded-xl p-4 w-36 lg:w-40 border-t-2 border-gray-400 hover:border-primary-500/30 transition-colors">
                                <div className="text-sm font-semibold mb-1 truncate">
                                    {sortedUsers[1].name}
                                    {sortedUsers[1].isCurrentUser && <span className="text-primary-400"> (You)</span>}
                                </div>
                                <div className="text-xs text-dark-400 mb-2 truncate">@{sortedUsers[1].username}</div>
                                <div className="text-2xl font-bold text-gray-300">{sortedUsers[1].score}</div>
                                <div className="text-xs text-dark-500">points</div>
                            </div>
                            <div className="text-4xl font-bold text-gray-500/50 mt-2">2</div>
                        </div>
                    )}

                    {/* 1st Place */}
                    {sortedUsers[0] && (
                        <div className="text-center -mb-4 cursor-pointer group" onClick={() => setSelectedFriend(sortedUsers[0])}>
                            <div className="relative">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl animate-bounce">👑</div>
                                <div className={`w-24 h-24 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl font-bold ring-4 ${sortedUsers[0].isCurrentUser
                                    ? 'bg-gradient-to-br from-primary-500 to-purple-500 ring-primary-400/30'
                                    : 'bg-gradient-to-br from-yellow-400 to-amber-500 ring-yellow-400/30'
                                    } text-dark-900 shadow-xl group-hover:scale-105 transition-transform`}>
                                    {sortedUsers[0].avatar}
                                </div>
                            </div>
                            <div className="glass rounded-xl p-5 w-44 lg:w-48 gradient-border border-t-4 border-yellow-500 hover:border-primary-500/30 transition-colors">
                                <div className="text-lg font-semibold mb-1 truncate">
                                    {sortedUsers[0].name}
                                    {sortedUsers[0].isCurrentUser && <span className="text-primary-400"> (You)</span>}
                                </div>
                                <div className="text-sm text-dark-400 mb-2 truncate">@{sortedUsers[0].username}</div>
                                <div className="text-3xl font-bold gradient-text">{sortedUsers[0].score}</div>
                                <div className="text-xs text-dark-500">points</div>
                            </div>
                            <div className="text-5xl font-bold text-yellow-500/50 mt-4">1</div>
                        </div>
                    )}

                    {/* 3rd Place */}
                    {sortedUsers[2] && (
                        <div className="text-center cursor-pointer group" onClick={() => setSelectedFriend(sortedUsers[2])}>
                            <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold ${sortedUsers[2].isCurrentUser
                                ? 'bg-gradient-to-br from-primary-500 to-purple-500 ring-2 ring-primary-400'
                                : 'bg-gradient-to-br from-orange-400 to-orange-600'
                                } text-dark-900 shadow-lg group-hover:scale-105 transition-transform`}>
                                {sortedUsers[2].avatar}
                            </div>
                            <div className="glass rounded-xl p-4 w-36 lg:w-40 border-t-2 border-orange-500 hover:border-primary-500/30 transition-colors">
                                <div className="text-sm font-semibold mb-1 truncate">
                                    {sortedUsers[2].name}
                                    {sortedUsers[2].isCurrentUser && <span className="text-primary-400"> (You)</span>}
                                </div>
                                <div className="text-xs text-dark-400 mb-2 truncate">@{sortedUsers[2].username}</div>
                                <div className="text-2xl font-bold text-orange-400">{sortedUsers[2].score}</div>
                                <div className="text-xs text-dark-500">points</div>
                            </div>
                            <div className="text-4xl font-bold text-orange-600/50 mt-2">3</div>
                        </div>
                    )}
                </div>

                {/* Full Leaderboard Table */}
                <div className="glass rounded-xl overflow-hidden mb-8">
                    <table className="w-full">
                        <thead className="bg-dark-800/50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Rank</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">User</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Score</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Solved</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Streak</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-800">
                            {sortedUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`hover:bg-dark-800/30 cursor-pointer ${user.isCurrentUser ? 'bg-primary-500/10' : ''}`}
                                    onClick={() => setSelectedFriend(user)}
                                >
                                    <td className="px-6 py-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyles(index + 1)}`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.isCurrentUser
                                                ? 'bg-gradient-to-br from-primary-500 to-purple-500'
                                                : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                                                } text-white`}>
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <div className="font-medium flex items-center gap-2">
                                                    {user.name}
                                                    {user.isCurrentUser && (
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
                                            <span className="font-medium text-orange-400">{user.streak} days</span>
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

                {/* Selected User Details */}
                {selectedFriend && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="glass rounded-xl p-6 w-full max-w-lg relative animate-scale-in">
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedFriend(null); }}
                                className="absolute top-4 right-4 p-2 hover:bg-dark-800 rounded-lg text-dark-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${selectedFriend.isCurrentUser
                                    ? 'bg-gradient-to-br from-primary-500 to-purple-500'
                                    : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                                    } text-white`}>
                                    {selectedFriend.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {selectedFriend.name}
                                        {selectedFriend.isCurrentUser && <span className="text-primary-400"> (You)</span>}
                                    </h3>
                                    <p className="text-dark-400">@{selectedFriend.username} • Active {selectedFriend.lastActive}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold gradient-text">{selectedFriend.score}</div>
                                    <div className="text-xs text-dark-400 mt-1">Total Score</div>
                                </div>
                                <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-emerald-400">{selectedFriend.easy}</div>
                                    <div className="text-xs text-dark-400 mt-1">Easy</div>
                                </div>
                                <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-400">{selectedFriend.medium}</div>
                                    <div className="text-xs text-dark-400 mt-1">Medium</div>
                                </div>
                                <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-red-400">{selectedFriend.hard}</div>
                                    <div className="text-xs text-dark-400 mt-1">Hard</div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3 text-dark-200">Recently Solved</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedFriend.recentSolved.length > 0 ? selectedFriend.recentSolved.map((problem) => (
                                        <span key={problem} className="px-3 py-1.5 bg-dark-800 rounded-lg text-sm border border-dark-700">
                                            {problem}
                                        </span>
                                    )) : (
                                        <span className="text-dark-500 text-sm">No recent activity</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
