'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DIFFICULTY_COLORS } from '@/data/questions';
import type { Question } from '@/types';
import { useRevisions } from '@/hooks/useApi';

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

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const RefreshIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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

const XIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

import Sidebar from '@/components/Sidebar';

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'all';
// ... (keep other code, remove Sidebar definition)

// Extended revision item with solved date
interface SolvedQuestion {
    question: Question;
    solvedDate: Date;
    lastReviewed?: Date;
    reviewCount: number;
    confidence: 1 | 2 | 3;
}

export default function RevisionPage() {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('daily');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch revision questions from API
    const { data: revisionsData, loading, error, submitReview } = useRevisions(100); // Fetch up to 100 questions

    // Extract questions from API response
    const allRevisionQuestions = revisionsData?.questions || [];

    // Mark question as reviewed
    const handleMarkReviewed = async (questionId: string, confidence: number = 3) => {
        try {
            const progressItem = allRevisionQuestions.find((q: any) => q.questionId === questionId);
            if (progressItem) {
                await submitReview(progressItem.id, confidence);
            }
        } catch (error) {
            console.error('Failed to mark question as reviewed:', error);
        }
    };

    //  Filter questions based on time period
    const getFilteredQuestions = () => {
        // For now, return all questions since API should only return due questions
        // Future enhancement: Add time-based filtering if needed
        return allRevisionQuestions;
    };

    const filteredQuestions: SolvedQuestion[] = getFilteredQuestions() as SolvedQuestion[];

    // Calculate stats for each period
    const getStats = () => {
        // Simplify stats - API only returns due questions
        const all = allRevisionQuestions.length;
        const reviewed = allRevisionQuestions.filter((q: any) => q.lastReviewed).length;
        const daily = all; // Simplification
        const weekly = all;
        const monthly = all;

        return { daily, weekly, monthly, all };
    };

    const stats = getStats();

    const getConfidenceColor = (confidence: number) => {
        switch (confidence) {
            case 1: return 'text-red-400';
            case 2: return 'text-yellow-400';
            case 3: return 'text-emerald-400';
            default: return 'text-dark-400';
        }
    };

    const getConfidenceLabel = (confidence: number) => {
        switch (confidence) {
            case 1: return 'Low';
            case 2: return 'Medium';
            case 3: return 'High';
            default: return 'Unknown';
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    return (
        <div className="min-h-screen bg-dark-950">
            <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activeItem="revision" />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <button onClick={() => setMobileMenuOpen(true)} className="p-2 bg-dark-800 rounded-lg">
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
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Revision</h1>
                        <p className="text-dark-400">Review your solved questions to strengthen retention</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
                            <RefreshIcon />
                            <span>Shuffle</span>
                        </button>
                    </div>
                </div>

                {/* Time Period Tabs */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: 'daily', label: 'Daily', count: stats.daily, icon: '📅' },
                        { key: 'weekly', label: 'Weekly', count: stats.weekly, icon: '📆' },
                        { key: 'monthly', label: 'Monthly', count: stats.monthly, icon: '🗓️' },
                        { key: 'all', label: 'All Time', count: stats.all, icon: '∞' },
                    ].map((period) => (
                        <button
                            key={period.key}
                            onClick={() => setTimePeriod(period.key as TimePeriod)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${timePeriod === period.key
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                                }`}
                        >
                            <span>{period.icon}</span>
                            <span>{period.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${timePeriod === period.key
                                ? 'bg-primary-500/30 text-primary-300'
                                : 'bg-dark-700 text-dark-400'
                                }`}>
                                {period.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="glass rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-primary-400 mb-2">{filteredQuestions.length}</div>
                        <div className="text-sm text-dark-400">To Review</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">
                            {filteredQuestions.filter((q) => q.lastReviewed).length}
                        </div>
                        <div className="text-sm text-dark-400">Reviewed</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">
                            {filteredQuestions.filter((q) => q.confidence === 2).length}
                        </div>
                        <div className="text-sm text-dark-400">Medium Confidence</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-red-400 mb-2">
                            {filteredQuestions.filter((q) => q.confidence === 1).length}
                        </div>
                        <div className="text-sm text-dark-400">Needs Practice</div>
                    </div>
                </div>

                {/* Description based on time period */}
                <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3">
                    <CalendarIcon />
                    <span className="text-dark-300">
                        {timePeriod === 'daily' && 'Questions solved today and yesterday - fresh in memory, quick review recommended.'}
                        {timePeriod === 'weekly' && 'Questions solved in the past 7 days - review to reinforce learning before forgetting starts.'}
                        {timePeriod === 'monthly' && 'Questions solved in the past 30 days - spaced repetition review for long-term retention.'}
                        {timePeriod === 'all' && 'All solved questions - comprehensive review of your entire progress.'}
                    </span>
                </div>

                {/* Questions Grid */}
                {filteredQuestions.length === 0 ? (
                    <div className="glass rounded-xl p-12 text-center">
                        <div className="text-5xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">No questions to review</h3>
                        <p className="text-dark-400 mb-4">
                            {timePeriod === 'daily' && "You haven't solved any questions today. Start practicing!"}
                            {timePeriod === 'weekly' && "No questions solved this week. Time to practice more!"}
                            {timePeriod === 'monthly' && "No questions solved this month. Let's get started!"}
                            {timePeriod === 'all' && "You haven't solved any questions yet. Start your DSA journey!"}
                        </p>
                        <Link
                            href="/practice"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-400 rounded-lg font-medium transition-colors"
                        >
                            <CodeIcon />
                            Start Practicing
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredQuestions.map((sq) => (
                            <div key={sq.question.id} className="glass rounded-xl p-5 card-hover">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`${DIFFICULTY_COLORS[sq.question.difficulty]} px-2.5 py-1 rounded-full text-xs font-medium`}>
                                            {sq.question.difficulty}
                                        </span>
                                        <span className={`text-xs ${getConfidenceColor(sq.confidence)}`}>
                                            {getConfidenceLabel(sq.confidence)} Confidence
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-dark-500">
                                        <ClockIcon />
                                        <span>{sq.reviewCount} reviews</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-2">{sq.question.title}</h3>

                                <p className="text-dark-400 text-sm mb-3 line-clamp-2">
                                    {sq.question.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4">
                                    <span>Solved: {formatDate(sq.solvedDate)}</span>
                                    {sq.lastReviewed && (
                                        <span className="text-emerald-400">Last reviewed: {formatDate(sq.lastReviewed)}</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {sq.question.topics.slice(0, 2).map((topic: string) => (
                                        <span key={topic} className="text-xs text-dark-400 bg-dark-800 px-2 py-1 rounded">
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/practice/${sq.question.slug}`}
                                        className="flex-1 py-2 text-center bg-primary-500 hover:bg-primary-400 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Review Now
                                    </Link>
                                    <button
                                        onClick={() => handleMarkReviewed(sq.question.id)}
                                        className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
                                        title="Mark as reviewed"
                                    >
                                        <CheckIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Revision Tips */}
                <div className="mt-8 glass rounded-xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <BrainIcon />
                        Revision Tips
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-dark-800/50 rounded-lg p-4">
                            <div className="text-2xl mb-2">📅</div>
                            <h4 className="font-medium mb-1">Daily Review</h4>
                            <p className="text-sm text-dark-400">Review recently solved problems to reinforce fresh memories.</p>
                        </div>
                        <div className="bg-dark-800/50 rounded-lg p-4">
                            <div className="text-2xl mb-2">📆</div>
                            <h4 className="font-medium mb-1">Weekly Review</h4>
                            <p className="text-sm text-dark-400">Revisit problems from the past week before they fade.</p>
                        </div>
                        <div className="bg-dark-800/50 rounded-lg p-4">
                            <div className="text-2xl mb-2">🗓️</div>
                            <h4 className="font-medium mb-1">Monthly Review</h4>
                            <p className="text-sm text-dark-400">Long-term retention through spaced repetition.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
