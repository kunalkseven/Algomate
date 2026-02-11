'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFriends } from '@/hooks/useApi';

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

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserPlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const FireIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.953 2.641a.5.5 0 00-.906 0c-1.845 4.027-5.047 6.107-5.047 10.359a6 6 0 1012 0c0-4.252-3.202-6.332-5.047-10.359z" />
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

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const navItems = [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        { icon: CodeIcon, label: 'Practice', href: '/practice' },
        { icon: FolderIcon, label: 'My Questions', href: '/my-questions' },
        { icon: BrainIcon, label: 'Revision', href: '/revision' },
        { icon: TrophyIcon, label: 'Leaderboard', href: '/leaderboard' },
        { icon: UsersIcon, label: 'Friends', href: '/friends', active: true },
        { icon: UserIcon, label: 'Profile', href: '/profile' },
        { icon: SettingsIcon, label: 'Settings', href: '/settings' },
    ];

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
            <aside className={`w-64 h-screen fixed left-0 top-0 bg-dark-900 border-r border-dark-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-dark-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center"><CodeIcon /></div>
                        <span className="text-lg font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-dark-800 rounded"><XIcon /></button>
                </div>
                <nav className="flex-1 px-4 py-4">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${item.active ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-dark-400 hover:text-white hover:bg-dark-800'}`}>
                            <item.icon /><span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-dark-800">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-sm font-bold">JD</div>
                        <div className="flex-1"><div className="font-medium text-sm">John Doe</div><div className="text-xs text-dark-500">@johndoe</div></div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// Mock data
const friendsList = [
    { id: '1', name: 'Alice Chen', username: 'alicechen', avatar: 'AC', solved: 145, streak: 45, online: true },
    { id: '2', name: 'Carol White', username: 'carolwhite', avatar: 'CW', solved: 130, streak: 28, online: true },
    { id: '3', name: 'Emma Wilson', username: 'emmawilson', avatar: 'EW', solved: 110, streak: 21, online: false },
    { id: '4', name: 'Henry Zhang', username: 'henryzhang', avatar: 'HZ', solved: 94, streak: 5, online: false },
];

const pendingRequests = [
    { id: '5', name: 'Grace Kim', username: 'gracekim', avatar: 'GK', solved: 98 },
    { id: '6', name: 'Frank Brown', username: 'frankbrown', avatar: 'FB', solved: 102 },
];

const suggestions = [
    { id: '7', name: 'Bob Kumar', username: 'bobkumar', avatar: 'BK', solved: 138, mutualFriends: 3 },
    { id: '8', name: 'David Lee', username: 'davidlee', avatar: 'DL', solved: 118, mutualFriends: 2 },
    { id: '9', name: 'Ivy Taylor', username: 'ivytaylor', avatar: 'IT', solved: 90, mutualFriends: 1 },
];

export default function FriendsPage() {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'discover'>('friends');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch friends data from API
    const { data: friendsData, loading, error, handleRequest } = useFriends();

    const friends = friendsData?.friends || [];
    const pendingRequests = friendsData?.pendingRequests || [];
    const sentRequests = friendsData?.sentRequests || [];

    const handleAcceptRequest = async (requestId: string) => {
        try {
            await handleRequest(requestId, 'accept');
        } catch (error) {
            console.error('Failed to accept friend request:', error);
        }
    };

    const handleRejectRequest = async (requestId: string) => {
        try {
            await handleRequest(requestId, 'reject');
        } catch (error) {
            console.error('Failed to reject friend request:', error);
        }
    };

    const filteredFriends = friends.filter((f: any) =>
        f.name?.toLowerCase().includes(search.toLowerCase()) ||
        f.username?.toLowerCase().includes(search.toLowerCase())
    );

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-dark-400">Loading friends...</p>
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
                    <h2 className="text-xl font-bold mb-2">Failed to load friends</h2>
                    <p className="text-dark-400 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-950">
            <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 bg-dark-800 rounded-lg text-white"
                    >
                        <MenuIcon />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <div className="w-10" />
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Friends</h1>
                        <p className="text-dark-400">Connect with other developers and track progress together</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-dark-400">{friends.length} friends</span>
                        {pendingRequests.length > 0 && (
                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                                {pendingRequests.length} pending
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {(['friends', 'requests', 'discover'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${activeTab === tab
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'bg-dark-800 text-dark-400 hover:text-white'
                                }`}
                        >
                            {tab}
                            {tab === 'requests' && pendingRequests.length > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {pendingRequests.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search friends by name or username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                        <SearchIcon />
                    </div>
                </div>

                {/* Friends List Tab */}
                {activeTab === 'friends' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredFriends.map((friend) => (
                            <div key={friend.id} className="glass rounded-xl p-5 card-hover">
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-lg font-bold">
                                            {friend.avatar}
                                        </div>
                                        {friend.online && (
                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-dark-900" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{friend.name}</h3>
                                        <p className="text-sm text-dark-400">@{friend.username}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm">
                                            <span className="text-dark-400">{friend.solved} solved</span>
                                            <div className="flex items-center gap-1 text-orange-400">
                                                <FireIcon />
                                                <span>{friend.streak}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Link
                                        href={`/profile/${friend.username}`}
                                        className="flex-1 py-2 text-center bg-dark-700 hover:bg-dark-600 rounded-lg text-sm transition-colors"
                                    >
                                        View Profile
                                    </Link>
                                    <button className="flex-1 py-2 text-center bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg text-sm transition-colors">
                                        Challenge
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredFriends.length === 0 && (
                            <div className="col-span-full text-center py-16 text-dark-400">
                                No friends found. Try a different search term.
                            </div>
                        )}
                    </div>
                )}

                {/* Requests Tab */}
                {activeTab === 'requests' && (
                    <div className="space-y-4">
                        {requests.length === 0 ? (
                            <div className="glass rounded-xl p-12 text-center">
                                <div className="text-5xl mb-4">👋</div>
                                <h3 className="text-xl font-semibold mb-2">No pending requests</h3>
                                <p className="text-dark-400">You&apos;re all caught up!</p>
                            </div>
                        ) : (
                            requests.map((request) => (
                                <div key={request.id} className="glass rounded-xl p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center font-bold">
                                            {request.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{request.name}</h3>
                                            <p className="text-sm text-dark-400">@{request.username} • {request.solved} problems solved</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAcceptRequest(request.id)}
                                            className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
                                        >
                                            <CheckIcon />
                                        </button>
                                        <button
                                            onClick={() => handleRejectRequest(request.id)}
                                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                        >
                                            <XIcon />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Discover Tab */}
                {activeTab === 'discover' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Suggested Friends</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestions.map((user) => (
                                <div key={user.id} className="glass rounded-xl p-5 card-hover">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-lg font-bold">
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{user.name}</h3>
                                            <p className="text-sm text-dark-400">@{user.username}</p>
                                            <p className="text-xs text-dark-500 mt-1">
                                                {user.mutualFriends} mutual friends • {user.solved} solved
                                            </p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 rounded-lg text-sm font-medium transition-colors">
                                        <UserPlusIcon />
                                        Add Friend
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
