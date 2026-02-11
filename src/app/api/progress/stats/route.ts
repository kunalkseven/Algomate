import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/progress/stats - Get user statistics
export async function GET(request: NextRequest) {
    try {
        // TODO: Re-enable auth after frontend integration testing
        // const session = await getServerSession(authOptions);

        // if (!session?.user?.email) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // Get user from database
        // For testing, use first user or return empty stats if no users
        const user = await prisma.user.findFirst();

        if (!user) {
            // Return empty stats if no users exist yet
            return NextResponse.json({
                totalSolved: 0,
                totalAttempted: 0,
                totalUnsolved: 0,
                totalQuestions: 0,
                totalTimeSpent: 0,
                totalAttempts: 0,
                bookmarkedCount: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastActive: null,
                topicProgress: {},
                difficultyProgress: {
                    Easy: { solved: 0, total: 0 },
                    Medium: { solved: 0, total: 0 },
                    Hard: { solved: 0, total: 0 },
                },
                averageTimePerQuestion: 0,
            });
        }

        // Get all progress
        const allProgress = await prisma.progress.findMany({
            where: { userId: user.id },
        });

        // Calculate stats
        const totalSolved = allProgress.filter(p => p.status === 'solved').length;
        const totalAttempted = allProgress.filter(p => p.status === 'attempted').length;
        const totalUnsolved = allProgress.filter(p => p.status === 'unsolved').length;

        // Difficulty breakdown
        const totalQuestions = allProgress.length;
        const totalTimeSpent = allProgress.reduce((sum, p) => sum + p.timeSpent, 0);
        const totalAttempts = allProgress.reduce((sum, p) => sum + p.attempts, 0);
        const bookmarkedCount = allProgress.filter(p => p.bookmarked).length;

        // Calculate streak (consecutive days with activity)
        const sortedDates = allProgress
            .map(p => new Date(p.updatedAt).toDateString())
            .filter((date, index, self) => self.indexOf(date) === index)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        let currentStreak = 0;
        const today = new Date().toDateString();

        if (sortedDates.length > 0 && sortedDates[0] === today) {
            currentStreak = 1;
            for (let i = 1; i < sortedDates.length; i++) {
                const current = new Date(sortedDates[i]);
                const previous = new Date(sortedDates[i - 1]);
                const diffDays = Math.floor((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }

        const stats = {
            totalSolved,
            totalAttempted,
            totalUnsolved,
            totalQuestions,
            totalTimeSpent,
            totalAttempts,
            bookmarkedCount,
            currentStreak,
            averageTimePerQuestion: totalQuestions > 0 ? Math.round(totalTimeSpent / totalQuestions) : 0,
        };

        return NextResponse.json({ stats });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
