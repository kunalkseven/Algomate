'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Icons as simple SVG components
const CodeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);

const ChartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const BrainIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const TrophyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const FireIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.953 2.641a.5.5 0 00-.906 0c-1.845 4.027-5.047 6.107-5.047 10.359a6 6 0 1012 0c0-4.252-3.202-6.332-5.047-10.359zM12 18a4 4 0 01-4-4c0-2.5 1.5-4 3-6 1.5 2 3 3.5 3 6a4 4 0 01-4 4z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const stats = [
    { label: 'DSA Problems', value: '150+', icon: CodeIcon },
    { label: 'Active Users', value: '10K+', icon: UsersIcon },
    { label: 'Topics Covered', value: '20+', icon: ChartIcon },
    { label: 'Daily Revisions', value: '50K+', icon: BrainIcon },
];

const features = [
    {
        icon: CodeIcon,
        title: 'Curated DSA Problems',
        description: 'Practice 150+ handpicked problems organized by topics like Arrays, Trees, Graphs, DP, and more.',
        color: 'from-cyan-500 to-blue-500',
    },
    {
        icon: GitHubIcon,
        title: 'GitHub Integration',
        description: 'Submit your solved problems directly to GitHub. Build your coding portfolio automatically.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: BrainIcon,
        title: 'Spaced Repetition',
        description: 'Never forget what you learned. Our SM-2 algorithm schedules optimal revision times.',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        icon: UsersIcon,
        title: 'Friends & Competition',
        description: 'Add friends, compare progress, and compete on leaderboards to stay motivated.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: ChartIcon,
        title: 'Progress Analytics',
        description: 'Track your growth with detailed statistics, streaks, and topic-wise breakdown.',
        color: 'from-yellow-500 to-orange-500',
    },
    {
        icon: TrophyIcon,
        title: 'Achievements & Badges',
        description: 'Earn badges for milestones like solving 100 problems or maintaining a 30-day streak.',
        color: 'from-pink-500 to-rose-500',
    },
];

const topics = [
    { name: 'Arrays', count: 35, color: 'bg-blue-500' },
    { name: 'Trees', count: 25, color: 'bg-green-500' },
    { name: 'Dynamic Programming', count: 30, color: 'bg-purple-500' },
    { name: 'Graphs', count: 20, color: 'bg-orange-500' },
    { name: 'Strings', count: 20, color: 'bg-cyan-500' },
    { name: 'Linked Lists', count: 15, color: 'bg-pink-500' },
];

export default function LandingPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-dark-950 overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-purple-900/20" />
                <div className="absolute inset-0 dot-pattern opacity-30" />
                {isClient && (
                    <div
                        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-300"
                        style={{
                            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4), rgba(168, 85, 247, 0.2))',
                            left: mousePosition.x - 192,
                            top: mousePosition.y - 192,
                        }}
                    />
                )}
                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                                <CodeIcon />
                            </div>
                            <span className="text-xl font-bold gradient-text">AlgoMate</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/practice" className="text-dark-300 hover:text-white transition-colors">Practice</Link>
                            <Link href="/revision" className="text-dark-300 hover:text-white transition-colors">Revision</Link>
                            <Link href="/leaderboard" className="text-dark-300 hover:text-white transition-colors">Leaderboard</Link>
                            <Link href="/friends" className="text-dark-300 hover:text-white transition-colors">Friends</Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg font-medium hover:from-primary-400 hover:to-purple-400 transition-all hover:scale-105 hover:shadow-glow"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/50 border border-dark-700 mb-8 animate-slide-up">
                        <span className="flex items-center gap-1 text-orange-400">
                            <FireIcon />
                            <span className="text-sm font-medium">New</span>
                        </span>
                        <span className="text-dark-300 text-sm">Spaced repetition for DSA mastery</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <span className="text-white">Master DSA with</span>
                        <br />
                        <span className="gradient-text">Smart Practice</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Practice curated DSA problems, submit to GitHub, and never forget with spaced repetition.
                        Compete with friends and track your progress.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link
                            href="/dashboard"
                            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl font-semibold text-lg hover:from-primary-400 hover:to-purple-400 transition-all hover:scale-105 hover:shadow-glow-lg"
                        >
                            Start Practicing Free
                            <ArrowRightIcon />
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-8 py-4 bg-dark-800 border border-dark-700 rounded-xl font-semibold text-lg hover:bg-dark-700 hover:border-dark-600 transition-all"
                        >
                            <GitHubIcon />
                            Continue with GitHub
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="glass rounded-xl p-6 text-center card-hover"
                                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                            >
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center text-primary-400">
                                        <stat.icon />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                <div className="text-dark-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Everything you need to <span className="gradient-text">ace DSA</span>
                        </h2>
                        <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                            From practice to revision to competition, AlgoMate has all the tools to help you master Data Structures and Algorithms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="glass rounded-2xl p-6 card-hover group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-dark-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Topics Section */}
            <section className="relative py-24 bg-dark-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">
                                Comprehensive <span className="gradient-text">topic coverage</span>
                            </h2>
                            <p className="text-dark-400 text-lg mb-8">
                                From basic arrays to advanced graph algorithms, we cover all the topics you need for technical interviews at top companies.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {topics.map((topic) => (
                                    <div key={topic.name} className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/50 border border-dark-700">
                                        <div className={`w-3 h-3 rounded-full ${topic.color}`} />
                                        <span className="text-sm font-medium">{topic.name}</span>
                                        <span className="text-xs text-dark-500 ml-auto">{topic.count} problems</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/practice"
                                className="inline-flex items-center gap-2 mt-8 text-primary-400 hover:text-primary-300 font-medium"
                            >
                                View all topics
                                <ArrowRightIcon />
                            </Link>
                        </div>

                        {/* Interactive card preview */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                            <div className="relative glass rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="badge-medium px-3 py-1 rounded-full text-sm font-medium">Medium</span>
                                    <div className="flex items-center gap-2 text-dark-400">
                                        <span className="text-sm">Arrays</span>
                                        <span>•</span>
                                        <span className="text-sm">Two Pointers</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Two Sum</h3>
                                <p className="text-dark-400 text-sm mb-4">
                                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1 text-emerald-400">
                                        <CheckIcon />
                                        <span>49.2% Acceptance</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-dark-400">
                                        <span>👍 45K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="glass rounded-3xl p-12 gradient-border">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                            <TrophyIcon />
                        </div>
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to become a <span className="gradient-text">DSA master</span>?
                        </h2>
                        <p className="text-dark-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of developers who are improving their problem-solving skills every day. Start your journey today.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl font-semibold text-lg hover:from-primary-400 hover:to-purple-400 transition-all hover:scale-105 hover:shadow-glow-lg"
                        >
                            Start Free Today
                            <ArrowRightIcon />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-dark-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                                <CodeIcon />
                            </div>
                            <span className="font-bold">AlgoMate</span>
                        </div>
                        <div className="flex items-center gap-6 text-dark-400 text-sm">
                            <Link href="/practice" className="hover:text-white transition-colors">Practice</Link>
                            <Link href="/revision" className="hover:text-white transition-colors">Revision</Link>
                            <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
                            <Link href="/friends" className="hover:text-white transition-colors">Friends</Link>
                        </div>
                        <div className="text-dark-500 text-sm">
                            © 2026 AlgoMate. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
