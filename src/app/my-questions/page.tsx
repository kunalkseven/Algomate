'use client';

import Link from 'next/link';
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

export default function MyQuestionsPage() {
    const { data: questions, loading, error, createQuestion, updateQuestion, deleteQuestion } = useCustomQuestions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        difficulty: 'Medium',
        topics: '',
        description: '',
        link: '',
        notes: '',
        solved: false
    });

    const resetForm = () => {
        setFormData({
            title: '',
            difficulty: 'Medium',
            topics: '',
            description: '',
            link: '',
            notes: '',
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
                topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean)
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
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                    My Questions
                                </h1>
                                <p className="text-gray-400 mt-2">Manage your personal collection of practice problems</p>
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                            >
                                <PlusIcon />
                                Add Question
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
                            <div className="grid gap-4">
                                {questions.map((q: any) => (
                                    <div key={q.id} className="bg-[#111] border border-white/5 p-6 rounded-xl hover:border-purple-500/30 transition-all group">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
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
                                                </div>
                                                <div className="flex gap-2">
                                                    {q.topics.map((t: string) => (
                                                        <span key={t} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                {q.link && (
                                                    <a href={q.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:underline">
                                                        <LinkIcon />
                                                        Problem Link
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(q)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                    title="Edit"
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(q.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
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
                    <div className="bg-[#161616] rounded-2xl w-full max-w-2xl border border-white/10 p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-white">
                            {editingQuestion ? 'Edit Question' : 'Add New Question'}
                        </h2>
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
            )}
        </div>
    );
}
