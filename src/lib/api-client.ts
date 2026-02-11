/**
 * Centralized API client for making HTTP requests to backend API routes.
 * Provides type-safe methods with error handling and loading states.
 */

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: Record<string, string>;
}

class ApiClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = 'GET', body, headers = {} } = options;

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const error = await response.json().catch(() => ({ error: 'Request failed' }));
                throw new ApiError(response.status, error.error || error.message || 'Request failed');
            }

            return response.json();
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Network error');
        }
    }

    // Progress API
    async getProgress(params?: {
        page?: number;
        limit?: number;
        status?: string;
        difficulty?: string;
        topic?: string;
    }) {
        const queryParams = new URLSearchParams(params as any).toString();
        return this.request(`/api/progress?${queryParams}`);
    }

    async updateProgress(data: {
        questionId: string;
        status: 'SOLVED' | 'ATTEMPTED' | 'UNSOLVED';
        confidence?: number;
        timeSpent?: number;
        code?: string;
    }) {
        return this.request('/api/progress', {
            method: 'POST',
            body: data,
        });
    }

    async getStats() {
        return this.request('/api/progress/stats');
    }

    // Questions API
    async getQuestions(params?: {
        topic?: string;
        difficulty?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
        custom?: boolean;
    }) {
        const queryParams = new URLSearchParams(params as any).toString();
        return this.request(`/api/questions?${queryParams}`);
    }

    async getQuestion(id: string) {
        return this.request(`/api/questions/${id}`);
    }

    async getCustomQuestions() {
        return this.request('/api/custom-questions');
    }

    async createCustomQuestion(data: {
        title: string;
        difficulty: string;
        topics: string[];
        description: string;
        link?: string;
        notes?: string;
    }) {
        return this.request('/api/custom-questions', {
            method: 'POST',
            body: data,
        });
    }

    async updateCustomQuestion(id: string, data: Partial<{
        title: string;
        difficulty: string;
        topics: string[];
        description: string;
        link?: string;
        notes?: string;
        solved?: boolean;
    }>) {
        return this.request(`/api/custom-questions/${id}`, {
            method: 'PUT',
            body: data,
        });
    }

    async deleteCustomQuestion(id: string) {
        return this.request(`/api/custom-questions/${id}`, {
            method: 'DELETE',
        });
    }

    // Friends API
    async getFriends() {
        return this.request('/api/friends');
    }

    async sendFriendRequest(receiverId: string) {
        return this.request('/api/friends/request', {
            method: 'POST',
            body: { receiverId },
        });
    }

    async handleFriendRequest(friendshipId: string, action: 'accept' | 'reject') {
        return this.request(`/api/friends/${friendshipId}`, {
            method: 'PATCH',
            body: { action },
        });
    }

    async removeFriend(friendshipId: string) {
        return this.request(`/api/friends/${friendshipId}`, {
            method: 'DELETE',
        });
    }

    // Revision/Spaced Repetition API
    async getDueQuestions(limit = 10) {
        return this.request(`/api/revision?limit=${limit}`);
    }

    async submitReview(progressId: string, confidence: number) {
        return this.request('/api/revision', {
            method: 'POST',
            body: { progressId, confidence },
        });
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type { RequestOptions };
