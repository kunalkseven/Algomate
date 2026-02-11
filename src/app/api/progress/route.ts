import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/progress - Fetch all user progress
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

        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);
        const questionId = searchParams.get('questionId');
        const status = searchParams.get('status');

        // Build where clause
        const where: any = { userId: user.id };
        if (questionId) where.questionId = questionId;
        if (status) where.status = status;

        // Fetch progress
        const progress = await prisma.progress.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
        });

        return NextResponse.json({ progress });
    } catch (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/progress - Update question progress
export async function POST(request: NextRequest) {
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


        const { questionId, status, confidence, timeSpent, code } = await request.json();
        console.log('Progress API Input:', { questionId, status, confidence, timeSpent, hasCode: !!code });

        if (!questionId || !status) {
            console.error('Missing required fields:', { questionId, status });
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }


        // Upsert progress
        const progress = await prisma.progress.upsert({
            where: {
                userId_questionId: {
                    userId: user.id,
                    questionId,
                },
            },
            update: {
                ...(status !== undefined && { status: status.toLowerCase() }),
                ...(confidence !== undefined && { confidence }),
                ...(timeSpent !== undefined && { timeSpent }),
                ...(code !== undefined && { code }),
                updatedAt: new Date(),
                // Update review schedule if solved
                ...(status === 'SOLVED' && {
                    // Simple spaced repetition logic (can be enhanced later)
                    nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day later
                    reviewCount: { increment: 1 },
                }),
            },
            create: {
                userId: user.id,
                questionId,
                status: status ? status.toLowerCase() : 'unsolved',
                attempts: 1,
                timeSpent: timeSpent || 0,
                confidence: confidence || 1,
                code: code || '',
                reviewCount: 0,
                // Set initial review for tomorrow if solved
                ...(status === 'SOLVED' && {
                    nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
                }),
            },
        });

        return NextResponse.json({ progress });
    } catch (error) {
        console.error('Error updating progress:', error);
        // Specifically log Prisma errors if any
        if ((error as any).code) {
            console.error('Prisma Error Code:', (error as any).code);
            console.error('Prisma Error Meta:', (error as any).meta);
        }
        return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
    }
}

