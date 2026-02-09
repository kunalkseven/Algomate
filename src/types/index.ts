// User types
export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
    githubId?: string;
    githubToken?: string;
    createdAt: Date;
    stats: UserStats;
    friends: string[];
    friendRequests: FriendRequest[];
}

export interface UserStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    streak: number;
    longestStreak: number;
    lastPracticeDate: string;
    topicProgress: Record<string, TopicProgress>;
}

export interface TopicProgress {
    total: number;
    solved: number;
    easy: number;
    medium: number;
    hard: number;
}

export interface FriendRequest {
    id: string;
    fromUserId: string;
    fromUsername: string;
    fromAvatar: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
}

// Question types
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Topic =
    | 'Arrays'
    | 'Strings'
    | 'Linked Lists'
    | 'Stacks'
    | 'Queues'
    | 'Trees'
    | 'Binary Search Trees'
    | 'Heaps'
    | 'Graphs'
    | 'Dynamic Programming'
    | 'Greedy'
    | 'Backtracking'
    | 'Bit Manipulation'
    | 'Math'
    | 'Sorting'
    | 'Searching'
    | 'Hashing'
    | 'Two Pointers'
    | 'Sliding Window'
    | 'Recursion';

export interface Question {
    id: string;
    title: string;
    slug: string;
    difficulty: Difficulty;
    topics: Topic[];
    description: string;
    examples: Example[];
    constraints: string[];
    hints: string[];
    starterCode: StarterCode;
    solution?: string;
    companies?: string[];
    acceptance?: number;
    likes?: number;
}

export interface Example {
    input: string;
    output: string;
    explanation?: string;
}

export interface StarterCode {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
}

// Progress & Revision types
export interface QuestionProgress {
    questionId: string;
    status: 'unsolved' | 'attempted' | 'solved';
    solvedAt?: Date;
    attempts: number;
    timeSpent: number; // in seconds
    notes?: string;
    bookmarked: boolean;
    confidence: 1 | 2 | 3 | 4 | 5; // 1 = needs review, 5 = mastered
    nextReviewDate?: Date;
    reviewCount: number;
    githubCommitUrl?: string;
}

export interface RevisionItem {
    questionId: string;
    question: Question;
    progress: QuestionProgress;
    priority: 'high' | 'medium' | 'low';
    dueDate: Date;
}

// Leaderboard types
export interface LeaderboardEntry {
    rank: number;
    user: {
        id: string;
        username: string;
        name: string;
        avatar: string;
    };
    score: number;
    totalSolved: number;
    streak: number;
    isFriend?: boolean;
    isCurrentUser?: boolean;
}

// Activity types
export interface Activity {
    id: string;
    userId: string;
    username: string;
    avatar: string;
    type: 'solved' | 'streak' | 'badge' | 'friend';
    data: {
        questionId?: string;
        questionTitle?: string;
        difficulty?: Difficulty;
        streak?: number;
        badge?: string;
        friendUsername?: string;
    };
    timestamp: Date;
}

// Language types for code editor
export type Language = 'javascript' | 'python' | 'java' | 'cpp';

export const LANGUAGE_LABELS: Record<Language, string> = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
};

export const LANGUAGE_MONACO: Record<Language, string> = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
};
