import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { questions as standardQuestions } from '@/data/questions';

// GET /api/progress/stats
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch all progress
        const allProgress = await prisma.progress.findMany({
            where: { userId: user.id },
            select: {
                questionId: true,
                status: true,
                updatedAt: true,
            }
        });

        // Fetch CustomQuestions to know their difficulty/topics
        const customQuestions = await prisma.customQuestion.findMany({
            where: { userId: user.id },
            select: { id: true, difficulty: true, topics: true }
        });
        const customQMap = new Map(customQuestions.map(q => [q.id, q]));
        const standardQMap = new Map(standardQuestions.map((q: any) => [q.id, q]));

        let easy = 0, medium = 0, hard = 0;
        const topicStats: Record<string, { solved: number; total: number }> = {};
        const activityMap: Record<string, number> = {}; // "YYYY-MM-DD" -> count

        // Initialize topic totals from standard questions
        standardQuestions.forEach((q: any) => {
            q.topics.forEach((t: string) => {
                if (!topicStats[t]) topicStats[t] = { solved: 0, total: 0 };
                topicStats[t].total++;
            });
        });

        // Add custom questions to totals
        customQuestions.forEach(q => {
            q.topics.forEach(t => {
                if (!topicStats[t]) topicStats[t] = { solved: 0, total: 0 };
                topicStats[t].total++;
            });
        });

        const solvedProgress = allProgress.filter(p => p.status === 'solved');

        // Process Solved Progress
        solvedProgress.forEach(p => {
            // Activity Heatmap Data
            const dateKey = p.updatedAt.toISOString().split('T')[0];
            activityMap[dateKey] = (activityMap[dateKey] || 0) + 1;

            // Difficulty & Topic Stats
            let q: any = standardQMap.get(p.questionId) || customQMap.get(p.questionId);

            if (q) {
                if (q.difficulty === 'Easy') easy++;
                else if (q.difficulty === 'Medium') medium++;
                else if (q.difficulty === 'Hard') hard++;

                q.topics.forEach((t: string) => {
                    if (topicStats[t]) topicStats[t].solved++;
                });
            }
        });

        // Current Streak Calculation
        const solvedDates = Object.keys(activityMap).sort();
        let currentStreak = 0;

        if (solvedDates.length > 0) {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const lastSolved = solvedDates[solvedDates.length - 1];

            // Streak only active if solved today or yesterday
            if (lastSolved === todayStr || lastSolved === yesterdayStr) {
                currentStreak = 1;
                let currentDate = new Date(lastSolved);

                // Check backwards
                for (let i = solvedDates.length - 2; i >= 0; i--) {
                    const prevDateStr = solvedDates[i];
                    const prevDate = new Date(prevDateStr);

                    // Check difference in days
                    const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        currentStreak++;
                        currentDate = prevDate;
                    } else if (diffDays === 0) {
                        // Same day, continue without incrementing or breaking
                        continue;
                    } else {
                        break;
                    }
                }
            }
        }

        return NextResponse.json({
            totalSolved: easy + medium + hard,
            difficultyProgress: {
                Easy: { solved: easy, total: standardQuestions.filter((q: any) => q.difficulty === 'Easy').length },
                Medium: { solved: medium, total: standardQuestions.filter((q: any) => q.difficulty === 'Medium').length },
                Hard: { solved: hard, total: standardQuestions.filter((q: any) => q.difficulty === 'Hard').length },
            },
            topicProgress: topicStats, // Return full objects { solved, total }
            currentStreak,
            activity: activityMap
        });

    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
