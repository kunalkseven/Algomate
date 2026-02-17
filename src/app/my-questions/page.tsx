'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCustomQuestions } from '@/hooks/useApi';
import Sidebar from '@/components/Sidebar';

// Icons
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

const LinkIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const CodeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export default function MyQuestionsPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const [groups, setGroups] = useState<any[]>([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        difficulty: 'Medium',
        topics: '',
        description: '',
        link: '',
        notes: '',
        examples: '',
        constraints: '',
        companies: '',
        solved: false
    });

    const { data: questions, loading, error, createQuestion, updateQuestion, deleteQuestion } = useCustomQuestions(activeGroup);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await fetch('/api/groups');
            const data = await res.json();
            if (data.groups) {
                setGroups(data.groups);
            }
        } catch (err) {
            console.error('Failed to fetch groups:', err);
        }
    };

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: groupName, description: groupDescription })
            });
            const data = await res.json();
            if (data.group) {
                setGroups([data.group, ...groups]);
                setIsGroupModalOpen(false);
                setGroupName('');
                setGroupDescription('');
            }
        } catch (err) {
            console.error('Failed to create group:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            difficulty: 'Medium',
            topics: '',
            description: '',
            link: '',
            notes: '',
            examples: '',
            constraints: '',
            companies: '',
            solved: false
        });
        setEditingQuestion(null);
    };

    const handleOpenModal = (question?: any) => {
        if (question) {
            setEditingQuestion(question);
            setFormData({
                title: question.title,
                difficulty: question.difficulty,
                topics: Array.isArray(question.topics) ? question.topics.join(', ') : question.topics || '',
                description: question.description,
                link: question.link || '',
                notes: question.notes || '',
                examples: question.examples || '',
                constraints: Array.isArray(question.constraints) ? question.constraints.join('\n') : '',
                companies: Array.isArray(question.companies) ? question.companies.join(', ') : '',
                solved: question.solved || false
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean),
                constraints: formData.constraints.split('\n').map(c => c.trim()).filter(Boolean),
                companies: formData.companies.split(',').map(c => c.trim()).filter(Boolean),
                groupId: activeGroup
            };

            if (editingQuestion) {
                await updateQuestion(editingQuestion.id, payload);
            } else {
                await createQuestion(payload);
            }
            setIsModalOpen(false);
            resetForm();
        } catch (err) {
            console.error('Failed to save question:', err);
            // Ideally show toast error here
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await deleteQuestion(id);
            } catch (err) {
                console.error('Failed to delete question:', err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
            <div className="flex">
                <Sidebar activeItem="my questions" />
                <main className="flex-1 p-8 ml-64">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                    {activeGroup ? groups.find(g => g.id === activeGroup)?.name : 'My Questions'}
                                </h1>
                                <p className="text-gray-400 mt-2">
                                    {activeGroup
                                        ? 'Shared questions in this group'
                                        : 'Manage your personal collection of practice problems'}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex bg-[#161616] rounded-lg p-1 border border-white/10">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                                        title="List View"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                                        title="Grid View"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleOpenModal()}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                                >
                                    <PlusIcon />
                                    Add Question
                                </button>
                            </div>
                        </div>

                        {/* Groups Navigation */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <button
                                onClick={() => setActiveGroup(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${!activeGroup
                                    ? 'bg-white text-black'
                                    : 'bg-[#161616] text-gray-400 border border-white/10 hover:border-white/30'
                                    }`}
                            >
                                All My Questions
                            </button>
                            {groups.map(group => (
                                <button
                                    key={group.id}
                                    onClick={() => setActiveGroup(group.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeGroup === group.id
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-[#161616] text-gray-400 border border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {group.name}
                                </button>
                            ))}
                            <button
                                onClick={() => setIsGroupModalOpen(true)}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-[#161616] text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition-colors whitespace-nowrap flex items-center gap-2"
                            >
                                <PlusIcon /> New Group
                            </button>
                        </div>

                        {/* Content */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                                Error: {error}
                            </div>
                        ) : !questions || questions.length === 0 ? (
                            <div className="text-center py-20 bg-[#111] rounded-xl border border-white/5">
                                <p className="text-gray-400 text-lg">No custom questions yet.</p>
                                <p className="text-gray-500 mt-2">Create your first question to get started!</p>
                            </div>
                        ) : (
                            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                                {questions.map((q: any) => (
                                    <div key={q.id}
                                        onClick={() => router.push(`/practice/${q.id}?source=my-questions`)}
                                        className={`bg-[#111] border border-white/5 p-6 rounded-xl hover:border-purple-500/30 transition-all group cursor-pointer ${viewMode === 'list' ? 'flex justify-between items-center' : ''}`}
                                    >
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-xl font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                                                    {q.title}
                                                </h3>
                                                <span className={`px-2 py-0.5 text-xs rounded-full border ${q.difficulty === 'Easy' ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                                                    q.difficulty === 'Medium' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
                                                        'border-red-500/30 bg-red-500/10 text-red-400'
                                                    }`}>
                                                    {q.difficulty}
                                                </span>
                                                {q.solved && (
                                                    <span className="px-2 py-0.5 text-xs rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                                                        Solved
                                                    </span>
                                                )}
                                                {q.group && (
                                                    <span className="px-2 py-0.5 text-xs rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                        {q.group.name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2 flex-wrap">
                                                {q.topics.map((t: string) => (
                                                    <span key={t} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            {viewMode === 'grid' && q.link && (
                                                <a
                                                    href={q.link}
                                                    onClick={(e) => e.stopPropagation()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-sm text-blue-400 hover:underline mt-2"
                                                >
                                                    <LinkIcon />
                                                    Problem Link
                                                </a>
                                            )}
                                        </div>
                                        <div className={`flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${viewMode === 'grid' ? 'absolute top-4 right-4 bg-[#111] p-1 rounded-lg border border-white/10' : 'ml-4'}`}>
                                            {viewMode === 'list' && q.link && (
                                                <a
                                                    href={q.link}
                                                    onClick={(e) => e.stopPropagation()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors mr-2"
                                                    title="Link"
                                                >
                                                    <LinkIcon />
                                                </a>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenModal(q);
                                                }}
                                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                title="Edit"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(q.id);
                                                }}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#161616] rounded-2xl w-full max-w-2xl border border-white/10 shadow-2xl max-h-[90vh] flex flex-col">
                        <div className="p-8 pb-4 border-b border-white/10 shrink-0">
                            <h2 className="text-2xl font-bold text-white">
                                {editingQuestion ? 'Edit Question' : 'Add New Question'}
                            </h2>
                        </div>
                        <div className="p-8 pt-6 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500"
                                            placeholder="Two Sum"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Difficulty</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500"
                                        >
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Topics (comma separated)</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.topics}
                                        onChange={e => setFormData({ ...formData, topics: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500"
                                        placeholder="Arrays, Hash Table"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Problem Link (Optional)</label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500"
                                        placeholder="https://leetcode.com/problems/..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full h-32 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500 resize-none"
                                        placeholder="Problem description..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Notes (Optional)</label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full h-20 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500 resize-none"
                                        placeholder="Your thoughts, approach, or solution..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Examples (Optional)</label>
                                    <textarea
                                        value={formData.examples}
                                        onChange={e => setFormData({ ...formData, examples: e.target.value })}
                                        className="w-full h-32 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                                        placeholder="Input: nums = [2,7,11,15], target = 9&#10;Output: [0,1]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Constraints (One per line, Optional)</label>
                                    <textarea
                                        value={formData.constraints}
                                        onChange={e => setFormData({ ...formData, constraints: e.target.value })}
                                        className="w-full h-32 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                                        placeholder="2 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Companies (Comma separated, Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.companies}
                                        onChange={e => setFormData({ ...formData, companies: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:border-purple-500"
                                        placeholder="Google, Facebook, Amazon"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="solved"
                                        checked={formData.solved}
                                        onChange={e => setFormData({ ...formData, solved: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                                    />
                                    <label htmlFor="solved" className="text-sm font-medium text-gray-400 select-none cursor-pointer">
                                        Mark as Solved
                                    </label>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
                                    >
                                        {editingQuestion ? 'Update Question' : 'Create Question'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
