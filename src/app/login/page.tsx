'use client';

import Link from 'next/link';
import { useState } from 'react';

const CodeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo: just redirect to dashboard
        window.location.href = '/dashboard';
    };

    const handleGitHubLogin = () => {
        // Demo: redirect to dashboard
        window.location.href = '/dashboard';
    };

    return (
        <div className="min-h-screen bg-dark-950 flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-purple-600/20 to-pink-600/20" />
                <div className="absolute inset-0 dot-pattern opacity-30" />

                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 flex flex-col justify-center px-12">
                    <Link href="/" className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="text-2xl font-bold gradient-text">AlgoMate</span>
                    </Link>

                    <h1 className="text-4xl font-bold mb-4">
                        Master DSA with{' '}
                        <span className="gradient-text">Smart Practice</span>
                    </h1>
                    <p className="text-dark-300 text-lg mb-8 max-w-md">
                        Join thousands of developers improving their problem-solving skills with spaced repetition and social features.
                    </p>

                    <div className="grid grid-cols-2 gap-4 max-w-md">
                        <div className="glass rounded-xl p-4">
                            <div className="text-2xl font-bold gradient-text">150+</div>
                            <div className="text-sm text-dark-400">DSA Problems</div>
                        </div>
                        <div className="glass rounded-xl p-4">
                            <div className="text-2xl font-bold gradient-text">10K+</div>
                            <div className="text-sm text-dark-400">Active Users</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile back button */}
                    <Link href="/" className="lg:hidden flex items-center gap-2 text-dark-400 hover:text-white mb-8">
                        <ArrowLeftIcon />
                        Back to home
                    </Link>

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="text-xl font-bold gradient-text">AlgoMate</span>
                    </div>

                    <h2 className="text-3xl font-bold mb-2">
                        {isLogin ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p className="text-dark-400 mb-8">
                        {isLogin
                            ? 'Sign in to continue your DSA journey'
                            : 'Start your journey to DSA mastery'}
                    </p>

                    {/* Social Login */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={handleGitHubLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl font-medium transition-colors"
                        >
                            <GitHubIcon />
                            Continue with GitHub
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl font-medium transition-colors">
                            <GoogleIcon />
                            Continue with Google
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-dark-700" />
                        <span className="text-dark-500 text-sm">or</span>
                        <div className="flex-1 h-px bg-dark-700" />
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300">
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400 rounded-xl font-semibold transition-all hover:shadow-glow"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-dark-400 mt-6">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        {' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary-400 hover:text-primary-300 font-medium"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
