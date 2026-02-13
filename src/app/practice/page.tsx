'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { TOPICS, DIFFICULTY_COLORS } from '@/data/questions';
import type { Question, Difficulty, Topic, QuestionProgress } from '@/types';
import { useQuestions, useProgress, useCustomQuestions } from '@/hooks/useApi';

// Icons
const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const FilterIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const BookmarkIcon = ({ filled }: { filled: boolean }) => (
    <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

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

const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

const GridIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const ListIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

import Sidebar from '@/components/Sidebar';

// Icons
// ... (keep other icons if needed, but remove Sidebar definition)

// Question Card Component
function QuestionCard({
    question,
    progress,
    onBookmark,
    viewMode = 'grid'
}: {
    question: Question;
    progress?: QuestionProgress;
    onBookmark: (id: string) => void;
    viewMode?: 'grid' | 'list';
}) {
    const isBookmarked = progress?.bookmarked || false;
    const isSolved = progress?.status === 'solved';
    const isAttempted = progress?.status === 'attempted';

    if (viewMode === 'list') {
        return (
            <Link
                href={`/practice/${question.slug || question.id}`}
                className="block glass rounded-xl p-4 card-hover group mb-3 flex items-center justify-between"
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isSolved ? 'bg-emerald-500/20 text-emerald-400' :
                        isAttempted ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-dark-700 text-dark-400'
                        }`}>
                        {isSolved ? <CheckCircleIcon /> : <span className="text-sm font-mono">{question.id.length > 5 ? '#' : question.id}</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-base font-semibold truncate group-hover:text-primary-400 transition-colors">
                                {question.title}
                            </h3>
                            <span className={`${DIFFICULTY_COLORS[question.difficulty]} px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider`}>
                                {question.difficulty}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-dark-400">
                            <div className="flex gap-2">
                                {question.topics.slice(0, 3).map((topic) => (
                                    <span key={topic} className="bg-dark-800 px-1.5 py-0.5 rounded">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                            {question.acceptance && (
                                <span className="flex items-center gap-1">
                                    <ClockIcon /> {question.acceptance}%
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center pl-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onBookmark(question.id);
                        }}
                        className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-dark-500 hover:text-dark-300'
                            }`}
                    >
                        <BookmarkIcon filled={isBookmarked} />
                    </button>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/practice/${question.slug || question.id}`}
            className="block glass rounded-xl p-5 card-hover group h-full flex flex-col"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSolved ? 'bg-emerald-500/20 text-emerald-400' :
                        isAttempted ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-dark-700 text-dark-400'
                        }`}>
                        {isSolved ? <CheckCircleIcon /> : <span className="text-sm font-mono">{question.id.length > 5 ? '#' : question.id}</span>}
                    </div>
                    <span className={`${DIFFICULTY_COLORS[question.difficulty]} px-2.5 py-1 rounded-full text-xs font-medium`}>
                        {question.difficulty}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onBookmark(question.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-dark-500 hover:text-dark-300'
                        }`}
                >
                    <BookmarkIcon filled={isBookmarked} />
                </button>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                {question.title}
            </h3>

            <p className="text-dark-400 text-sm mb-4 line-clamp-2 flex-grow">
                {question.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                    {question.topics.slice(0, 2).map((topic) => (
                        <span key={topic} className="text-xs text-dark-400 bg-dark-800 px-2 py-1 rounded">
                            {topic}
                        </span>
                    ))}
                    {question.topics.length > 2 && (
                        <span className="text-xs text-dark-500">+{question.topics.length - 2}</span>
                    )}
                </div>
                {question.acceptance && (
                    <div className="flex items-center gap-1 text-xs text-dark-500">
                        <ClockIcon />
                        <span>{question.acceptance}%</span>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default function PracticePage() {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated' && !!session?.user;

    const [activeTab, setActiveTab] = useState<'official' | 'personal' | 'group'>('official');
    const [search, setSearch] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
    const [selectedTopic, setSelectedTopic] = useState<Topic | 'All'>('All');
    const [selectedStatus, setSelectedStatus] = useState<'All' | 'Solved' | 'Attempted' | 'Unsolved'>('All');
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch questions and progress from API
    // Build filters object without undefined values (Only for Official Questions)
    const filters: any = {};
    if (activeTab === 'official') {
        if (selectedDifficulty !== 'All') filters.difficulty = selectedDifficulty;
        if (selectedTopic !== 'All') filters.topic = selectedTopic;
        if (selectedStatus !== 'All') filters.status = selectedStatus.toLowerCase();
        if (search) filters.search = search;
    }

    // Fetch Official Questions
    const { data: officialData, loading: officialLoading, error: officialError } = useQuestions(
        activeTab === 'official' && Object.keys(filters).length > 0 ? filters : undefined
    );

    // Fetch Custom Questions (Personal & Group)
    // We fetch all and filter client-side for now as the API supports separation by groupId but we want to split them bucket-wise
    // Actually, useCustomQuestions with no args returns ALL (personal + group).
    const { data: customQuestionsData, loading: customLoading } = useCustomQuestions(null);

    const { data: progressData, updateProgress } = useProgress({ enabled: isAuthenticated });

    // Handle bookmark (now uses API)
    const handleBookmark = async (id: string) => {
        try {
            const currentProgress = progressData?.progress?.find((p: any) => p.questionId === id);
            // const isBookmarked = currentProgress?.bookmarked || false; // unused

            await updateProgress(id, currentProgress?.status || 'unsolved', currentProgress?.confidence);
        } catch (error) {
            console.error('Failed to bookmark question:', error);
        }
    };

    // Filter Custom Questions
    const allCustomQuestions = customQuestionsData || [];
    const personalQuestions = allCustomQuestions.filter((q: any) => !q.groupId);
    const groupQuestions = allCustomQuestions.filter((q: any) => !!q.groupId);

    // Determine which set of questions to display based on active tab
    let sourceQuestions = [];
    if (activeTab === 'official') {
        sourceQuestions = officialData?.questions || [];
    } else if (activeTab === 'personal') {
        sourceQuestions = personalQuestions;
    } else {
        sourceQuestions = groupQuestions;
    }

    const progressMap = new Map<string, any>(
        (progressData?.progress || []).map((p: any) => [p.questionId, p])
    );

    // Initial Filter (Search/Topic/Diff/Status) applied Client-Side for Custom tabs
    // For Official, it's server-side filtered via hook, BUT standard useQuestions might return all if no filters?
    // Actually useQuestions returns paginated or filtered.
    // If we are in 'official' tab, 'sourceQuestions' is ALREADY filtered by the API (except for search if API doesn't support it fully yet, but code says verify).
    // The original code filtered by search locally. Let's keep that logic for consistency or apply it only to custom.
    // Wait, the original code had:
    // const filteredQuestions = search ? displayQuestions.filter(...) : displayQuestions;
    // And useQuestions accepts 'search'.
    // If useQuestions handles search, we shouldn't filter again?
    // Looking at original code: `// Filter by search locally (API doesn't support search yet)` -> So we MUST filter locally.

    const filteredQuestions = sourceQuestions.filter((q: any) => {
        // Search Filter
        if (search) {
            const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
                q.topics.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
            if (!matchesSearch) return false;
        }

        // For Custom Tabs, we need to apply the other filters locally too since we fetched ALL
        if (activeTab !== 'official') {
            if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
            // Topic check - q.topics is array
            if (selectedTopic !== 'All' && !q.topics.includes(selectedTopic)) return false;

            // Status Check
            if (selectedStatus !== 'All') {
                const p = progressMap.get(q.id);
                const status = p?.status || 'unsolved';
                if (status !== selectedStatus.toLowerCase()) return false;
            }
        }

        return true;
    });

    // Loading state
    if ((activeTab === 'official' && officialLoading) || (activeTab !== 'official' && customLoading)) {
        console.log('PracticePage: Loading questions...');
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-dark-400">Loading problems...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (activeTab === 'official' && officialError) {
        console.error('PracticePage: Error loading questions:', officialError);
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">Failed to load problems</h2>
                    <p className="text-dark-400 mb-4">{officialError}</p>
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

    console.log('PracticePage: Rendering with', sourceQuestions.length, 'questions');

    return (
        <div className="min-h-screen bg-dark-950">
            {isAuthenticated && <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activeItem="practice" />}

            <main className={`${isAuthenticated ? 'lg:ml-64' : ''} p-4 lg:p-8`}>
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    {isAuthenticated && (
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 bg-dark-800 rounded-lg"
                        >
                            <MenuIcon />
                        </button>
                    )}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <div className="w-10" />
                </div>

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
                        <p className="text-dark-400">Choose a problem and start coding. Track your progress and submit to GitHub.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="glass rounded-xl p-4">
                        <div className="text-2xl font-bold text-primary-400">{sourceQuestions.length}</div>
                        <div className="text-sm text-dark-400">Total Problems</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="text-2xl font-bold text-emerald-400">
                            {/* Rough estimate for custom questions since progress only tracks BY ID and we might not have all progress loaded if it's paginated?
                                Actually progress fetched is ALL progress.
                             */}
                            {sourceQuestions.filter((q: any) => progressMap.get(q.id)?.status === 'solved' || (q.solved /* for custom q */)).length}
                        </div>
                        <div className="text-sm text-dark-400">Solved</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="text-2xl font-bold text-yellow-400">
                            {sourceQuestions.filter((q: any) => progressMap.get(q.id)?.status === 'attempted').length}
                        </div>
                        <div className="text-sm text-dark-400">Attempted</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="text-2xl font-bold text-dark-300">
                            {sourceQuestions.length - sourceQuestions.filter((q: any) => progressMap.get(q.id)?.status === 'solved' || (q.solved)).length}
                        </div>
                        <div className="text-sm text-dark-400">Remaining</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search problems by name or topic..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                            <SearchIcon />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="p-1 bg-dark-800 border border-dark-700 rounded-xl flex items-center">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-dark-700 text-white' : 'text-dark-400 hover:text-white'}`}
                                title="Grid View"
                            >
                                <GridIcon />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-dark-700 text-white' : 'text-dark-400 hover:text-white'}`}
                                title="List View"
                            >
                                <ListIcon />
                            </button>
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl transition-colors ${showFilters ? 'border-primary-500 text-primary-400' : 'hover:border-dark-600'
                                }`}
                        >
                            <FilterIcon />
                            <span>Filters</span>
                            <ChevronDownIcon />
                        </button>
                    </div>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="glass rounded-xl p-6 mb-6 animate-slide-down">
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-dark-400 mb-2">Difficulty</label>
                                <div className="flex flex-wrap gap-2">
                                    {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setSelectedDifficulty(d as Difficulty | 'All')}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedDifficulty === d
                                                ? d === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                    d === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                        d === 'Hard' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                            'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                : 'bg-dark-800 text-dark-400 hover:text-white'
                                                }`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-400 mb-2">Status</label>
                                <div className="flex flex-wrap gap-2">
                                    {['All', 'Solved', 'Attempted', 'Unsolved'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedStatus(s as 'All' | 'Solved' | 'Attempted' | 'Unsolved')}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedStatus === s
                                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                : 'bg-dark-800 text-dark-400 hover:text-white'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-400 mb-2">Topic</label>
                                <select
                                    value={selectedTopic}
                                    onChange={(e) => setSelectedTopic(e.target.value as Topic | 'All')}
                                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                                >
                                    <option value="All">All Topics</option>
                                    {TOPICS.map((topic) => (
                                        <option key={topic} value={topic}>{topic}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Questions Grid/List */}
                <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                    {filteredQuestions.map((question: any) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            progress={progressMap.get(question.id) as QuestionProgress | undefined}
                            onBookmark={handleBookmark}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-dark-500 text-lg">No problems found matching your filters.</div>
                        <button
                            onClick={() => {
                                setSearch('');
                                setSelectedDifficulty('All');
                                setSelectedTopic('All');
                                setSelectedStatus('All');
                            }}
                            className="mt-4 text-primary-400 hover:text-primary-300"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
