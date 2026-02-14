'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStats, useProgress } from '@/hooks/useApi';
import { questions } from '@/data/questions';

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
function ActivityHeatmap({ data }: { data?: Record<string, number> }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Wed', 'Fri'];

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365);

    // Adjust start date to previous Sunday to align grid
    const dayOfWeek = startDate.getDay(); // 0 is Sunday
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const activityGrid: { date: string; count: number }[][] = [];

    let currentDate = new Date(startDate);
    const endDate = new Date();

    // Generate 53 columns (weeks) to cover full year including partial start/end weeks
    for (let week = 0; week < 53; week++) {
        const weekData: { date: string; count: number }[] = [];
        for (let day = 0; day < 7; day++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            // If date is in future relative to "today" (not strictly needed if we stop at today, but grid is fixed size)
            if (currentDate > endDate && currentDate.toDateString() !== endDate.toDateString()) {
                weekData.push({ date: dateStr, count: -1 }); // Future placeholder
            } else {
                weekData.push({ date: dateStr, count: data?.[dateStr] || 0 });
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        activityGrid.push(weekData);
    }

    const getColor = (count: number) => {
        if (count === -1) return 'bg-transparent'; // Future dates
        if (count === 0) return 'bg-dark-800';
        if (count === 1) return 'bg-emerald-900';
        if (count === 2) return 'bg-emerald-700';
        if (count === 3) return 'bg-emerald-500';
        return 'bg-emerald-400';
    };

    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-max">
                {/* Days labels */}
                <div className="flex flex-col gap-1 pr-2 pt-[16px]">
                    {[1, 3, 5].map((dayIndex) => (
                        <div key={dayIndex} className="h-3 text-[10px] text-dark-500 flex items-center h-[12px]"> {/* h-3 is 12px */}
                            {days[(dayIndex - 1) / 2]}
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex flex-col">
                    {/* Grid cells */}
                    <div className="flex gap-1">
                        {activityGrid.map((week, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-1">
                                {week.map((day, dayIdx) => (
                                    <div
                                        key={day.date}
                                        className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                                        title={`${day.count === -1 ? 0 : day.count} problems solved on ${day.date}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* Months labels */}
                    <div className="flex mt-2 relative h-4 w-full">
                        {months.map((month, idx) => (
                            <span key={idx} className="text-[10px] text-dark-500 absolute" style={{ left: `${(idx / 12) * 100}%` }}>
                                {month}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-2 text-xs text-dark-500">
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
    const { data: session } = useSession();

    // Fetch Stats
    const { data: stats, loading: statsLoading } = useStats();
    // Fetch Recent Progress
    const { data: recentProgressData, loading: progressLoading } = useProgress({ limit: 20 });

    // Process Recent Activity for Feed
    const groupedActivity: any[] = [];
    if (recentProgressData?.progress) {
        const groups: Record<string, string[]> = {};
        recentProgressData.progress.forEach((p: any) => {
            const date = new Date(p.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            if (!groups[date]) groups[date] = [];

            const q = questions.find(q => q.id === p.questionId);
            const title = q ? q.title : (p.questionId || 'Unknown Problem');

            // Avoid duplicates
            if (!groups[date].includes(title)) {
                groups[date].push(title);
            }
        });
        Object.keys(groups).forEach(date => {
            groupedActivity.push({ date, problems: groups[date], count: groups[date].length });
        });
    }

    const getUserInitials = () => {
        if (!session?.user?.name) return 'U';
        const names = session.user.name.split(' ');
        if (names.length >= 2) {
            return names[0][0] + names[1][0];
        }
        return session.user.name[0];
    };

    const userStats = {
        totalSolved: stats?.totalSolved || 0,
        easy: stats?.difficultyProgress?.Easy?.solved || 0,
        medium: stats?.difficultyProgress?.Medium?.solved || 0,
        hard: stats?.difficultyProgress?.Hard?.solved || 0,
        streak: stats?.currentStreak || 0,
        maxStreak: 0, // Not tracked yet
        rank: 0, // Not tracked yet
        score: (stats?.totalSolved || 0) * 10,
        joinDate: 'January 2024',
        totalSubmissions: 0, // Not tracked yet
        acceptanceRate: 100, // Placeholder
    };

    // Badges (Static for now)
    const badges: Badge[] = [
        { id: '1', name: 'First Steps', description: 'Solve your first problem', icon: '🎯', earned: userStats.totalSolved > 0, earnedDate: '2024-01-15', rarity: 'common' },
        { id: '2', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned: userStats.streak >= 7, earnedDate: '2024-01-22', rarity: 'common' },
        { id: '3', name: 'Problem Solver', description: 'Solve 25 problems', icon: '💡', earned: userStats.totalSolved >= 25, earnedDate: '2024-02-01', rarity: 'rare' },
        { id: '4', name: 'Hard Mode', description: 'Solve 10 hard problems', icon: '⚡', earned: userStats.hard >= 10, earnedDate: '2024-02-10', rarity: 'epic' },
        { id: '5', name: 'Century Club', description: 'Solve 100 problems', icon: '💯', earned: userStats.totalSolved >= 100, rarity: 'epic' },
        { id: '6', name: 'Streak Master', description: 'Maintain a 30-day streak', icon: '🏆', earned: userStats.streak >= 30, rarity: 'legendary' },
        { id: '7', name: 'Algorithm Expert', description: 'Master all algorithm types', icon: '🧠', earned: false, rarity: 'legendary' },
        { id: '8', name: 'Social Butterfly', description: 'Add 10 friends', icon: '🦋', earned: false, rarity: 'rare' },
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

    // Calculate Topic Progress
    const topicProgress = stats?.topicProgress ? Object.entries(stats.topicProgress).map(([topic, data]: [string, any]) => ({
        topic,
        solved: data.solved,
        total: data.total
    })).sort((a: any, b: any) => b.solved - a.solved).slice(0, 8) : [];


    if (statsLoading || progressLoading) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

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
                                {getUserInitials()}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-dark-800 rounded-full flex items-center justify-center border border-dark-600 hover:bg-dark-700 transition-colors">
                                <EditIcon />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-bold">{session?.user?.name || 'User'}</h1>
                                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                                    Pro Member
                                </span>
                            </div>
                            <p className="text-dark-400 mb-4">@{session?.user?.username || session?.user?.email?.split('@')[0] || 'user'} • Joined {userStats.joinDate}</p>
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
                                    <span>Rank <strong className="text-white">#{userStats.rank || '-'}</strong></span>
                                </div>
                                <div className="flex items-center gap-2 text-dark-400">
                                    <CalendarIcon />
                                    <span><strong className="text-white">{userStats.totalSubmissions || '-'}</strong> submissions</span>
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
                        <div className="text-4xl font-bold text-orange-400 mb-1">{userStats.maxStreak || '-'}</div>
                        <div className="text-sm text-dark-400">Max Streak</div>
                    </div>
                    <div className="glass rounded-xl p-5 text-center">
                        <div className="text-4xl font-bold text-cyan-400 mb-1">{userStats.totalSolved > 0 ? '100%' : '-'}</div>
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
                            <ActivityHeatmap data={stats?.activity} />
                        </div>

                        {/* Recent Activity */}
                        <div className="glass rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                {groupedActivity.length > 0 ? groupedActivity.map((activity, idx) => (
                                    <div key={idx} className="border-b border-dark-800 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-dark-500">{activity.date}</span>
                                            <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">
                                                +{activity.count}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            {activity.problems.map((problem: string, pidx: number) => (
                                                <div key={pidx} className="text-sm text-dark-300 truncate">
                                                    ✓ {problem}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-dark-400 text-sm">No recent activity found.</p>
                                )}
                            </div>
                        </div>

                        {/* Topic Progress */}
                        <div className="lg:col-span-3 glass rounded-xl p-4 lg:p-6">
                            <h3 className="text-lg font-semibold mb-4">Topic Progress</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {topicProgress.map((item: any) => (
                                    <div key={item.topic} className="bg-dark-800/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">{item.topic}</span>
                                            <span className="text-xs text-dark-400">{item.solved}/{item.total}</span>
                                        </div>
                                        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all"
                                                style={{ width: `${item.total > 0 ? (item.solved / item.total) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {topicProgress.length === 0 && <p className="text-dark-400 col-span-4">No topic data available yet.</p>}
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
                        <ActivityHeatmap data={stats?.activity} />

                        <div className="mt-8">
                            <h4 className="font-medium mb-4">Submission History</h4>
                            <div className="space-y-3">
                                {groupedActivity.length > 0 ? groupedActivity.map((activity, idx) => (
                                    <div key={idx} className="border-b border-dark-800 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-dark-500">{activity.date}</span>
                                            <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">
                                                +{activity.count}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            {activity.problems.map((problem: string, pidx: number) => (
                                                <div key={pidx} className="text-sm text-dark-300 truncate">
                                                    ✓ {problem}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-dark-400 text-sm">No recent activity found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
