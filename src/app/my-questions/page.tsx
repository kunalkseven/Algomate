'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Question, Difficulty, Topic } from '@/types';
import { TOPICS } from '@/data/questions';

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

const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ShareIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
);

const FolderIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const UploadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const FileIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

// Custom Question type (user-created)
interface CustomQuestion {
    id: string;
    title: string;
    difficulty: Difficulty;
    topics: Topic[];
    description: string;
    link?: string; // Link to LeetCode/other platform
    notes?: string;
    createdAt: string;
    solved: boolean;
}

interface QuestionList {
    id: string;
    name: string;
    description: string;
    questionIds: string[];
    sharedWith: string[]; // usernames
    createdAt: string;
    isPublic: boolean;
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const navItems = [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        { icon: CodeIcon, label: 'Practice', href: '/practice' },
        { icon: FolderIcon, label: 'My Questions', href: '/my-questions', active: true },
        { icon: BrainIcon, label: 'Revision', href: '/revision' },
        { icon: TrophyIcon, label: 'Leaderboard', href: '/leaderboard' },
        { icon: UsersIcon, label: 'Friends', href: '/friends' },
        { icon: UserIcon, label: 'Profile', href: '/profile' },
        { icon: SettingsIcon, label: 'Settings', href: '/settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
            )}

            <aside className={`w-64 h-screen fixed left-0 top-0 bg-dark-900 border-r border-dark-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-dark-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="text-lg font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-dark-800 rounded text-dark-400 hover:text-white">
                        <XIcon />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${item.active
                                ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                                : 'text-dark-400 hover:text-white hover:bg-dark-800'
                                }`}
                        >
                            <item.icon />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-dark-800">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                            JD
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-sm text-white">John Doe</div>
                            <div className="text-xs text-dark-500">@johndoe</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// Add/Edit Question Modal
function QuestionModal({
    question,
    onSave,
    onClose
}: {
    question?: CustomQuestion;
    onSave: (q: CustomQuestion) => void;
    onClose: () => void;
}) {
    const [title, setTitle] = useState(question?.title || '');
    const [difficulty, setDifficulty] = useState<Difficulty>(question?.difficulty || 'Easy');
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>(question?.topics || []);
    const [description, setDescription] = useState(question?.description || '');
    const [link, setLink] = useState(question?.link || '');
    const [notes, setNotes] = useState(question?.notes || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: question?.id || `custom-${Date.now()}`,
            title,
            difficulty,
            topics: selectedTopics,
            description,
            link,
            notes,
            createdAt: question?.createdAt || new Date().toISOString(),
            solved: question?.solved || false,
        });
    };

    const toggleTopic = (topic: Topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-dark-800">
                    <h2 className="text-xl font-bold">{question ? 'Edit Question' : 'Add New Question'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Question Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Two Sum"
                            required
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Difficulty *</label>
                        <div className="flex gap-3">
                            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => setDifficulty(d)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${difficulty === d
                                        ? d === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                            d === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                'bg-red-500/20 text-red-400 border border-red-500/30'
                                        : 'bg-dark-800 text-dark-400 hover:text-white'
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Topics</label>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                            {TOPICS.map((topic) => (
                                <button
                                    key={topic}
                                    type="button"
                                    onClick={() => toggleTopic(topic)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedTopics.includes(topic)
                                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                        : 'bg-dark-800 text-dark-400 hover:text-white'
                                        }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the problem..."
                            rows={3}
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Problem Link</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://leetcode.com/problems/..."
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Personal Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Your approach, hints, or things to remember..."
                            rows={2}
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400 rounded-xl font-medium transition-colors"
                        >
                            {question ? 'Save Changes' : 'Add Question'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Share Modal
function ShareModal({
    list,
    onShare,
    onClose
}: {
    list: QuestionList;
    onShare: (usernames: string[]) => void;
    onClose: () => void;
}) {
    const [username, setUsername] = useState('');
    const [sharedWith, setSharedWith] = useState<string[]>(list.sharedWith);

    const addUser = () => {
        if (username && !sharedWith.includes(username)) {
            setSharedWith([...sharedWith, username]);
            setUsername('');
        }
    };

    const removeUser = (u: string) => {
        setSharedWith(sharedWith.filter(x => x !== u));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-900 rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-dark-800">
                    <h2 className="text-xl font-bold">Share "{list.name}"</h2>
                    <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                        <XIcon />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Add Friend by Username</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="@username"
                                className="flex-1 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUser())}
                            />
                            <button
                                onClick={addUser}
                                className="px-4 py-2 bg-primary-500 hover:bg-primary-400 rounded-lg font-medium transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {sharedWith.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Shared with</label>
                            <div className="flex flex-wrap gap-2">
                                {sharedWith.map((u) => (
                                    <span key={u} className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 rounded-full text-sm">
                                        @{u}
                                        <button onClick={() => removeUser(u)} className="text-dark-500 hover:text-red-400">
                                            <XIcon />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onShare(sharedWith)}
                            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400 rounded-xl font-medium transition-colors"
                        >
                            Save Sharing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Create List Modal
function CreateListModal({
    onSave,
    onClose
}: {
    onSave: (list: QuestionList) => void;
    onClose: () => void;
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: `list-${Date.now()}`,
            name,
            description,
            questionIds: [],
            sharedWith: [],
            createdAt: new Date().toISOString(),
            isPublic: false,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-900 rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-dark-800">
                    <h2 className="text-xl font-bold">Create Question List</h2>
                    <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">List Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Dynamic Programming Essentials"
                            required
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's this list about?"
                            rows={2}
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400 rounded-xl font-medium transition-colors"
                        >
                            Create List
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Import Modal
function ImportModal({
    onImport,
    onClose
}: {
    onImport: (questions: CustomQuestion[]) => void;
    onClose: () => void;
}) {
    const [dragActive, setDragActive] = useState(false);
    const [parsedQuestions, setParsedQuestions] = useState<CustomQuestion[]>([]);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');

    const parseCSV = (content: string) => {
        const lines = content.split('\n').filter(line => line.trim());
        if (lines.length < 2) {
            setError('File must have at least a header row and one data row');
            return [];
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const titleIdx = headers.indexOf('title');
        const diffIdx = headers.indexOf('difficulty');
        const topicsIdx = headers.indexOf('topics');
        const descIdx = headers.indexOf('description');
        const linkIdx = headers.indexOf('link');
        const notesIdx = headers.indexOf('notes');

        if (titleIdx === -1) {
            setError('CSV must have a "title" column');
            return [];
        }

        const questions: CustomQuestion[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const title = values[titleIdx];
            if (!title) continue;

            const difficulty = (values[diffIdx] || 'Medium') as Difficulty;
            const topics = topicsIdx !== -1 && values[topicsIdx]
                ? values[topicsIdx].split(';').map(t => t.trim()) as Topic[]
                : [];
            const description = descIdx !== -1 ? values[descIdx] || '' : '';
            const link = linkIdx !== -1 ? values[linkIdx] || '' : '';
            const notes = notesIdx !== -1 ? values[notesIdx] || '' : '';

            questions.push({
                id: `import-${Date.now()}-${i}`,
                title,
                difficulty: ['Easy', 'Medium', 'Hard'].includes(difficulty) ? difficulty : 'Medium',
                topics,
                description,
                link,
                notes,
                createdAt: new Date().toISOString(),
                solved: false,
            });
        }
        return questions;
    };

    const handleFile = (file: File) => {
        setError('');
        setFileName(file.name);

        if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
            setError('Please upload a CSV or Excel file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            const questions = parseCSV(content);
            setParsedQuestions(questions);
        };
        reader.readAsText(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const downloadTemplate = () => {
        const template = 'title,difficulty,topics,description,link,notes\nTwo Sum,Easy,Arrays;Hashing,Find two numbers that add to target,https://leetcode.com/problems/two-sum,Use hash map for O(n)';
        const blob = new Blob([template], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'questions_template.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-dark-800">
                    <h2 className="text-xl font-bold">Import Questions</h2>
                    <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                        <XIcon />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Download Template */}
                    <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl border border-dark-700">
                        <div>
                            <h4 className="font-medium">Need a template?</h4>
                            <p className="text-sm text-dark-400">Download our CSV template to get started</p>
                        </div>
                        <button
                            onClick={downloadTemplate}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors"
                        >
                            <DownloadIcon />
                            Template
                        </button>
                    </div>

                    {/* Upload Area */}
                    <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-dark-700 hover:border-dark-500'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-dark-400 mb-3">
                            <FileIcon />
                        </div>
                        <p className="text-lg font-medium mb-1">
                            {fileName || 'Drop your file here or click to browse'}
                        </p>
                        <p className="text-sm text-dark-500">Supports CSV and Excel files</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Preview */}
                    {parsedQuestions.length > 0 && (
                        <div>
                            <h4 className="font-medium mb-3">Preview ({parsedQuestions.length} questions found)</h4>
                            <div className="max-h-60 overflow-y-auto space-y-2">
                                {parsedQuestions.slice(0, 5).map((q, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${q.difficulty === 'Easy' ? 'badge-easy' :
                                            q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
                                            }`}>
                                            {q.difficulty}
                                        </span>
                                        <span className="font-medium">{q.title}</span>
                                        <span className="text-sm text-dark-400 ml-auto">
                                            {q.topics.slice(0, 2).join(', ')}
                                        </span>
                                    </div>
                                ))}
                                {parsedQuestions.length > 5 && (
                                    <p className="text-sm text-dark-400 text-center">
                                        ... and {parsedQuestions.length - 5} more
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Format Info */}
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                        <h4 className="font-medium mb-2">CSV Format</h4>
                        <p className="text-sm text-dark-400 mb-2">Required columns: <code className="text-primary-400">title</code></p>
                        <p className="text-sm text-dark-400">Optional columns: <code className="text-dark-300">difficulty, topics, description, link, notes</code></p>
                        <p className="text-sm text-dark-500 mt-2">Tip: Separate multiple topics with semicolons (;)</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                if (parsedQuestions.length > 0) {
                                    onImport(parsedQuestions);
                                }
                            }}
                            disabled={parsedQuestions.length === 0}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${parsedQuestions.length > 0
                                ? 'bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400'
                                : 'bg-dark-700 text-dark-500 cursor-not-allowed'
                                }`}
                        >
                            Import {parsedQuestions.length} Questions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MyQuestionsPage() {
    const [questions, setQuestions] = useState<CustomQuestion[]>([]);
    const [lists, setLists] = useState<QuestionList[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<CustomQuestion | undefined>();
    const [showCreateListModal, setShowCreateListModal] = useState(false);
    const [sharingList, setSharingList] = useState<QuestionList | undefined>();
    const [activeTab, setActiveTab] = useState<'questions' | 'lists' | 'shared' | 'friends'>('questions');
    const [showImportModal, setShowImportModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const savedQuestions = localStorage.getItem('algomate_custom_questions');
        const savedLists = localStorage.getItem('algomate_question_lists');
        if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
        if (savedLists) setLists(JSON.parse(savedLists));
    }, []);

    // Save question
    const handleSaveQuestion = (q: CustomQuestion) => {
        let newQuestions: CustomQuestion[];
        if (editingQuestion) {
            newQuestions = questions.map(existing => existing.id === q.id ? q : existing);
        } else {
            newQuestions = [...questions, q];
        }
        setQuestions(newQuestions);
        localStorage.setItem('algomate_custom_questions', JSON.stringify(newQuestions));
        setShowAddModal(false);
        setEditingQuestion(undefined);
    };

    // Delete question
    const handleDeleteQuestion = (id: string) => {
        if (confirm('Are you sure you want to delete this question?')) {
            const newQuestions = questions.filter(q => q.id !== id);
            setQuestions(newQuestions);
            localStorage.setItem('algomate_custom_questions', JSON.stringify(newQuestions));
        }
    };

    // Toggle solved
    const toggleSolved = (id: string) => {
        const newQuestions = questions.map(q =>
            q.id === id ? { ...q, solved: !q.solved } : q
        );
        setQuestions(newQuestions);
        localStorage.setItem('algomate_custom_questions', JSON.stringify(newQuestions));
    };

    // Create list
    const handleCreateList = (list: QuestionList) => {
        const newLists = [...lists, list];
        setLists(newLists);
        localStorage.setItem('algomate_question_lists', JSON.stringify(newLists));
        setShowCreateListModal(false);
    };

    // Share list
    const handleShareList = (usernames: string[]) => {
        if (sharingList) {
            const newLists = lists.map(l =>
                l.id === sharingList.id ? { ...l, sharedWith: usernames } : l
            );
            setLists(newLists);
            localStorage.setItem('algomate_question_lists', JSON.stringify(newLists));
            setSharingList(undefined);
        }
    };

    // Delete list
    const handleDeleteList = (id: string) => {
        if (confirm('Are you sure you want to delete this list?')) {
            const newLists = lists.filter(l => l.id !== id);
            setLists(newLists);
            localStorage.setItem('algomate_question_lists', JSON.stringify(newLists));
        }
    };

    // Add question to list
    const addToList = (questionId: string, listId: string) => {
        const newLists = lists.map(l => {
            if (l.id === listId && !l.questionIds.includes(questionId)) {
                return { ...l, questionIds: [...l.questionIds, questionId] };
            }
            return l;
        });
        setLists(newLists);
        localStorage.setItem('algomate_question_lists', JSON.stringify(newLists));
    };

    // Import questions from CSV
    const handleImport = (importedQuestions: CustomQuestion[]) => {
        const newQuestions = [...questions, ...importedQuestions];
        setQuestions(newQuestions);
        localStorage.setItem('algomate_custom_questions', JSON.stringify(newQuestions));
        setShowImportModal(false);
    };

    // Mock shared lists from friends
    const sharedWithMe = [
        { id: 'shared-1', name: 'Alice\'s DP Collection', from: 'alicechen', count: 15 },
        { id: 'shared-2', name: 'Graph Algorithms', from: 'carolwhite', count: 8 },
    ];

    // Friends' questions - automatically shared with all friends
    const friendsQuestions: (CustomQuestion & { owner: string; ownerAvatar: string })[] = [
        {
            id: 'friend-q1',
            title: 'Maximum Subarray Sum',
            difficulty: 'Medium',
            topics: ['Arrays', 'Dynamic Programming'],
            description: 'Find the contiguous subarray with the largest sum.',
            link: 'https://leetcode.com/problems/maximum-subarray/',
            notes: 'Use Kadane\'s algorithm for O(n) solution',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            solved: false,
            owner: 'Alice Chen',
            ownerAvatar: 'AC',
        },
        {
            id: 'friend-q2',
            title: 'Binary Tree Level Order Traversal',
            difficulty: 'Medium',
            topics: ['Trees', 'Graphs'],
            description: 'Return the level order traversal of a binary tree.',
            link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
            notes: 'Use queue for BFS approach',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            solved: false,
            owner: 'Alice Chen',
            ownerAvatar: 'AC',
        },
        {
            id: 'friend-q3',
            title: 'Valid Sudoku',
            difficulty: 'Medium',
            topics: ['Arrays', 'Hashing'],
            description: 'Determine if a 9x9 Sudoku board is valid.',
            link: 'https://leetcode.com/problems/valid-sudoku/',
            notes: 'Check rows, columns, and 3x3 boxes separately',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            solved: false,
            owner: 'Carol White',
            ownerAvatar: 'CW',
        },
        {
            id: 'friend-q4',
            title: 'Merge Intervals',
            difficulty: 'Medium',
            topics: ['Arrays', 'Sorting'],
            description: 'Merge all overlapping intervals.',
            link: 'https://leetcode.com/problems/merge-intervals/',
            notes: 'Sort by start time first, then merge',
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            solved: false,
            owner: 'Carol White',
            ownerAvatar: 'CW',
        },
        {
            id: 'friend-q5',
            title: 'Word Break',
            difficulty: 'Hard',
            topics: ['Dynamic Programming', 'Strings'],
            description: 'Check if a string can be segmented into dictionary words.',
            link: 'https://leetcode.com/problems/word-break/',
            notes: 'DP with memoization works well here',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            solved: false,
            owner: 'Emma Wilson',
            ownerAvatar: 'EW',
        },
        {
            id: 'friend-q6',
            title: 'Course Schedule',
            difficulty: 'Medium',
            topics: ['Graphs', 'Dynamic Programming'],
            description: 'Check if you can finish all courses given prerequisites.',
            link: 'https://leetcode.com/problems/course-schedule/',
            notes: 'Detect cycle using DFS or use topological sort',
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            solved: false,
            owner: 'Emma Wilson',
            ownerAvatar: 'EW',
        },
    ];

    const solvedCount = questions.filter(q => q.solved).length;

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
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">My Questions</h1>
                        <p className="text-dark-400">Manage your custom questions and lists</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => {
                                if (questions.length === 0) {
                                    alert('No questions to export');
                                    return;
                                }
                                const headers = 'title,difficulty,topics,description,link,notes,solved';
                                const rows = questions.map(q =>
                                    `"${q.title}","${q.difficulty}","${q.topics.join(';')}","${q.description || ''}","${q.link || ''}","${q.notes || ''}","${q.solved}"`
                                );
                                const csv = [headers, ...rows].join('\n');
                                const blob = new Blob([csv], { type: 'text/csv' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'my_questions.csv';
                                a.click();
                                URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            <DownloadIcon />
                            <span>Export</span>
                        </button>
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            <UploadIcon />
                            <span>Import</span>
                        </button>
                        <button
                            onClick={() => setShowCreateListModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            <FolderIcon />
                            <span>New List</span>
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400 rounded-lg font-medium transition-colors"
                        >
                            <PlusIcon />
                            <span>Add Question</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="glass rounded-xl p-5">
                        <div className="text-3xl font-bold gradient-text">{questions.length}</div>
                        <div className="text-sm text-dark-400">My Questions</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                        <div className="text-3xl font-bold text-emerald-400">{solvedCount}</div>
                        <div className="text-sm text-dark-400">Solved</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                        <div className="text-3xl font-bold text-purple-400">{lists.length}</div>
                        <div className="text-sm text-dark-400">Lists Created</div>
                    </div>
                    <div className="glass rounded-xl p-5">
                        <div className="text-3xl font-bold text-cyan-400">{friendsQuestions.length}</div>
                        <div className="text-sm text-dark-400">Friends' Questions</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {(['questions', 'friends', 'lists', 'shared'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${activeTab === tab
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'bg-dark-800 text-dark-400 hover:text-white'
                                }`}
                        >
                            {tab === 'shared' ? 'Shared Lists' : tab === 'friends' ? "Friends' Questions" : tab}
                            {tab === 'friends' && (
                                <span className="ml-2 px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                                    {friendsQuestions.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Questions Tab */}
                {activeTab === 'questions' && (
                    <>
                        {questions.length === 0 ? (
                            <div className="glass rounded-xl p-12 text-center">
                                <div className="text-5xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
                                <p className="text-dark-400 mb-4">Start by adding questions you want to practice</p>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-400 rounded-lg font-medium transition-colors"
                                >
                                    <PlusIcon />
                                    Add Your First Question
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {questions.map((q) => (
                                    <div key={q.id} className="glass rounded-xl p-5 flex items-center gap-4">
                                        <button
                                            onClick={() => toggleSolved(q.id)}
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${q.solved
                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                : 'border-dark-500 hover:border-dark-400'
                                                }`}
                                        >
                                            {q.solved && '✓'}
                                        </button>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className={`font-semibold ${q.solved ? 'line-through text-dark-500' : ''}`}>
                                                    {q.title}
                                                </h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${q.difficulty === 'Easy' ? 'badge-easy' :
                                                    q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
                                                    }`}>
                                                    {q.difficulty}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-dark-400">
                                                {q.topics.map(t => (
                                                    <span key={t} className="bg-dark-800 px-2 py-0.5 rounded text-xs">{t}</span>
                                                ))}
                                                {q.link && (
                                                    <a href={q.link} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                                                        View Problem →
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {lists.length > 0 && (
                                                <select
                                                    onChange={(e) => e.target.value && addToList(q.id, e.target.value)}
                                                    className="px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-lg text-sm focus:outline-none"
                                                    defaultValue=""
                                                >
                                                    <option value="">Add to list...</option>
                                                    {lists.map(l => (
                                                        <option key={l.id} value={l.id}>{l.name}</option>
                                                    ))}
                                                </select>
                                            )}
                                            <button
                                                onClick={() => { setEditingQuestion(q); setShowAddModal(true); }}
                                                className="p-2 hover:bg-dark-800 rounded-lg text-dark-400 hover:text-white transition-colors"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteQuestion(q.id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-dark-400 hover:text-red-400 transition-colors"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Friends' Questions Tab */}
                {activeTab === 'friends' && (
                    <>
                        {/* Info banner */}
                        <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3 border border-cyan-500/20">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                <UsersIcon />
                            </div>
                            <div>
                                <h4 className="font-medium text-cyan-400">Friends' Questions</h4>
                                <p className="text-sm text-dark-400">Questions added by your friends are automatically shared with you</p>
                            </div>
                        </div>

                        {friendsQuestions.length === 0 ? (
                            <div className="glass rounded-xl p-12 text-center">
                                <div className="text-5xl mb-4">👥</div>
                                <h3 className="text-xl font-semibold mb-2">No friends' questions yet</h3>
                                <p className="text-dark-400 mb-4">When your friends add questions, they'll appear here automatically</p>
                                <Link
                                    href="/friends"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-400 rounded-lg font-medium transition-colors"
                                >
                                    <UsersIcon />
                                    Find Friends
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Group by friend */}
                                {Object.entries(
                                    friendsQuestions.reduce((acc, q) => {
                                        if (!acc[q.owner]) {
                                            acc[q.owner] = { owner: q.owner, avatar: q.ownerAvatar, questions: [] };
                                        }
                                        acc[q.owner].questions.push(q);
                                        return acc;
                                    }, {} as Record<string, { owner: string; avatar: string; questions: typeof friendsQuestions }>)
                                ).map(([owner, data]) => (
                                    <div key={owner} className="glass rounded-xl overflow-hidden">
                                        {/* Friend header */}
                                        <div className="flex items-center gap-3 p-4 bg-dark-800/50 border-b border-dark-700">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                                                {data.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{owner}</h3>
                                                <p className="text-sm text-dark-400">{data.questions.length} questions shared</p>
                                            </div>
                                        </div>

                                        {/* Questions list */}
                                        <div className="divide-y divide-dark-800">
                                            {data.questions.map((q) => (
                                                <div key={q.id} className="p-4 flex items-center gap-4 hover:bg-dark-800/30 transition-colors">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h4 className="font-medium">{q.title}</h4>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full ${q.difficulty === 'Easy' ? 'badge-easy' :
                                                                q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
                                                                }`}>
                                                                {q.difficulty}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-dark-400 mb-2">{q.description}</p>
                                                        <div className="flex items-center gap-2">
                                                            {q.topics.map(t => (
                                                                <span key={t} className="bg-dark-700 px-2 py-0.5 rounded text-xs text-dark-400">{t}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {q.link && (
                                                            <a
                                                                href={q.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-3 py-1.5 bg-primary-500/20 text-primary-400 rounded-lg text-sm hover:bg-primary-500/30 transition-colors"
                                                            >
                                                                Practice →
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Lists Tab */}
                {activeTab === 'lists' && (
                    <>
                        {lists.length === 0 ? (
                            <div className="glass rounded-xl p-12 text-center">
                                <div className="text-5xl mb-4">📁</div>
                                <h3 className="text-xl font-semibold mb-2">No lists yet</h3>
                                <p className="text-dark-400 mb-4">Create lists to organize and share your questions</p>
                                <button
                                    onClick={() => setShowCreateListModal(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-400 rounded-lg font-medium transition-colors"
                                >
                                    <FolderIcon />
                                    Create Your First List
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {lists.map((list) => (
                                    <div key={list.id} className="glass rounded-xl p-5 card-hover">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                <FolderIcon />
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => setSharingList(list)}
                                                    className="p-2 hover:bg-dark-700 rounded-lg text-dark-400 hover:text-primary-400 transition-colors"
                                                    title="Share"
                                                >
                                                    <ShareIcon />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteList(list.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg text-dark-400 hover:text-red-400 transition-colors"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold mb-1">{list.name}</h3>
                                        <p className="text-sm text-dark-400 mb-3">{list.description || 'No description'}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-dark-500">{list.questionIds.length} questions</span>
                                            {list.sharedWith.length > 0 && (
                                                <span className="text-purple-400">Shared with {list.sharedWith.length}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Shared With Me Tab */}
                {activeTab === 'shared' && (
                    <>
                        {sharedWithMe.length === 0 ? (
                            <div className="glass rounded-xl p-12 text-center">
                                <div className="text-5xl mb-4">🤝</div>
                                <h3 className="text-xl font-semibold mb-2">Nothing shared yet</h3>
                                <p className="text-dark-400">When friends share their lists with you, they'll appear here</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sharedWithMe.map((item) => (
                                    <div key={item.id} className="glass rounded-xl p-5 card-hover">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3">
                                            <FolderIcon />
                                        </div>
                                        <h3 className="font-semibold mb-1">{item.name}</h3>
                                        <p className="text-sm text-dark-400 mb-3">Shared by @{item.from}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-dark-500">{item.count} questions</span>
                                            <button className="px-3 py-1.5 bg-primary-500/20 text-primary-400 rounded-lg text-sm hover:bg-primary-500/30 transition-colors">
                                                Practice
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Modals */}
            {showAddModal && (
                <QuestionModal
                    question={editingQuestion}
                    onSave={handleSaveQuestion}
                    onClose={() => { setShowAddModal(false); setEditingQuestion(undefined); }}
                />
            )}

            {showCreateListModal && (
                <CreateListModal
                    onSave={handleCreateList}
                    onClose={() => setShowCreateListModal(false)}
                />
            )}

            {sharingList && (
                <ShareModal
                    list={sharingList}
                    onShare={handleShareList}
                    onClose={() => setSharingList(undefined)}
                />
            )}

            {showImportModal && (
                <ImportModal
                    onImport={handleImport}
                    onClose={() => setShowImportModal(false)}
                />
            )}
        </div>
    );
}
