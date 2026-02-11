import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateSM2, confidenceToQuality } from '@/lib/spaced-repetition/sm2';

// GET /api/revision - Get questions due for review
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');

        const now = new Date();

        // Get questions that:
        // 1. Have been solved
        // 2. Are due for review (nextReview is null or <= now)
        const dueQuestions = await prisma.progress.findMany({
            where: {
                userId: user.id,
                status: 'solved',
                OR: [
                    { nextReview: null },
                    { nextReview: { lte: now } },
                ],
            },
            orderBy: [
                { nextReview: 'asc' }, // Prioritize overdue questions
                { lastReviewed: 'asc' }, // Then by oldest reviewed
            ],
            take: limit,
        });

        return NextResponse.json({
            questions: dueQuestions,
            totalDue: dueQuestions.length,
        });
    } catch (error) {
        console.error('Error fetching revision questions:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/revision - Update review progress
export async function POST(request: NextRequest) {
    try {
        // TODO: Re-enable auth after frontend integration testing
        // const session = await getServerSession(authOptions);

        // if (!session?.user?.email) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // const user = await prisma.user.findUnique({
        //     where: { email: session.user.email },
        // });

        // if (!user) {
        //     return NextResponse.json({ error: 'User not found' }, { status: 404 });
        // }

        // For testing, use first user
        const user = await prisma.user.findFirst();

        if (!user) {
            return NextResponse.json({ error: 'No users in database' }, { status: 404 });
        }

        const body = await request.json();
        const { questionId, confidence } = body;

        if (!questionId || confidence === undefined) {
            return NextResponse.json(
                { error: 'questionId and confidence are required' },
                { status: 400 }
            );
        }

        if (confidence < 1 || confidence > 5) {
            return NextResponse.json(
                { error: 'confidence must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Get existing progress
        const existingProgress = await prisma.progress.findUnique({
            where: {
                userId_questionId: {
                    userId: user.id,
                    questionId,
                },
            },
        });

        if (!existingProgress) {
            return NextResponse.json({ error: 'Progress not found' }, { status: 404 });
        }

        // Calculate next review using SM-2
        const quality = confidenceToQuality(confidence);
        const sm2Result = calculateSM2({
            quality,
            previousInterval: existingProgress.interval,
            previousEaseFactor: existingProgress.easeFactor,
            reviewCount: existingProgress.reviewCount,
        });

        // Update progress
        const updatedProgress = await prisma.progress.update({
            where: {
                userId_questionId: {
                    userId: user.id,
                    questionId,
                },
            },
            data: {
                confidence,
                easeFactor: sm2Result.easeFactor,
                interval: sm2Result.interval,
                reviewCount: sm2Result.reviewCount,
                nextReview: sm2Result.nextReview,
                lastReviewed: new Date(),
            },
        });

        return NextResponse.json({
            progress: updatedProgress,
            sm2: {
                nextReviewIn: `${sm2Result.interval} days`,
                nextReviewDate: sm2Result.nextReview,
            },
        });
    } catch (error) {
        console.error('Error updating revision progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
