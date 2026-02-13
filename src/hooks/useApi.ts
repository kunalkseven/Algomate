/**
 * Custom React hooks for API operations with loading and error states.
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook for fetching user statistics
 */
export function useStats(): UseApiState<any> {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const stats = await apiClient.getStats();
            setData(stats);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch statistics');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { data, loading, error, refetch: fetchStats };
}

/**
 * Hook for fetching questions with filters
 */
export function useQuestions(filters?: {
    topic?: string;
    difficulty?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Serialize filters to prevent infinite loops
    const filtersKey = JSON.stringify(filters || {});

    const fetchQuestions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const questions = await apiClient.getQuestions(filters);
            setData(questions);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch questions');
            }
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtersKey]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    return { data, loading, error, refetch: fetchQuestions };
}

/**
 * Hook for fetching user progress
 */
export function useProgress(params?: {
    page?: number;
    limit?: number;
    status?: string;
    difficulty?: string;
    topic?: string;
    enabled?: boolean;
}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Serialize params to prevent infinite loops
    const { enabled = true, ...apiParams } = params || {};
    const paramsKey = JSON.stringify(apiParams);

    const fetchProgress = useCallback(async () => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const progress = await apiClient.getProgress(params);
            setData(progress);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch progress');
            }
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsKey]);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    const updateProgress = async (questionId: string, status: 'SOLVED' | 'ATTEMPTED' | 'UNSOLVED', confidence?: number, code?: string) => {
        try {
            await apiClient.updateProgress({ questionId, status, confidence, code });
            await fetchProgress(); // Refetch after update
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to update progress');
        }
    };

    return { data, loading, error, refetch: fetchProgress, updateProgress };
}

/**
 * Hook for fetching friends
 */
export function useFriends() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFriends = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const friends = await apiClient.getFriends();
            setData(friends);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch friends');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    const sendRequest = async (receiverId: string) => {
        try {
            await apiClient.sendFriendRequest(receiverId);
            await fetchFriends(); // Refetch after sending
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to send friend request');
        }
    };

    const handleRequest = async (friendshipId: string, action: 'accept' | 'reject') => {
        try {
            await apiClient.handleFriendRequest(friendshipId, action);
            await fetchFriends(); // Refetch after handling
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to handle friend request');
        }
    };

    const removeFriend = async (friendshipId: string) => {
        try {
            await apiClient.removeFriend(friendshipId);
            await fetchFriends(); // Refetch after removal
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to remove friend');
        }
    };

    return { data, loading, error, refetch: fetchFriends, sendRequest, handleRequest, removeFriend };
}

/**
 * Hook for fetching due revision questions
 */
export function useRevisions(limit = 10) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRevisions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const revisions = await apiClient.getDueQuestions(limit);
            setData(revisions);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch revisions');
            }
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchRevisions();
    }, [fetchRevisions]);

    const submitReview = async (progressId: string, confidence: number) => {
        try {
            await apiClient.submitReview(progressId, confidence);
            await fetchRevisions(); // Refetch after review
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to submit review');
        }
    };

    return { data, loading, error, refetch: fetchRevisions, submitReview };
}

/**
 * Hook for managing custom questions
 */
export function useCustomQuestions(groupId?: string | null) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomQuestions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.getCustomQuestions(groupId || undefined) as any;
            setData(response.questions);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch custom questions');
            }
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        fetchCustomQuestions();
    }, [fetchCustomQuestions]);

    const createQuestion = async (questionData: any) => {
        try {
            await apiClient.createCustomQuestion(questionData);
            await fetchCustomQuestions(); // Refetch after creation
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to create question');
        }
    };

    const updateQuestion = async (id: string, updates: any) => {
        try {
            await apiClient.updateCustomQuestion(id, updates);
            await fetchCustomQuestions(); // Refetch after update
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to update question');
        }
    };

    const deleteQuestion = async (id: string) => {
        try {
            await apiClient.deleteCustomQuestion(id);
            await fetchCustomQuestions(); // Refetch after deletion
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new Error('Failed to delete question');
        }
    };

    return { data, loading, error, refetch: fetchCustomQuestions, createQuestion, updateQuestion, deleteQuestion };
}
