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

        const body = await request.json();
        const {
            questionId,
            status,
            attempts,
            timeSpent,
            confidence,
            bookmarked,
        } = body;

        if (!questionId) {
            return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
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
                ...(status !== undefined && { status }),
                ...(attempts !== undefined && { attempts }),
                ...(timeSpent !== undefined && { timeSpent }),
                ...(confidence !== undefined && { confidence }),
                ...(bookmarked !== undefined && { bookmarked }),
                updatedAt: new Date(),
            },
            create: {
                userId: user.id,
                questionId,
                status: status || 'unsolved',
                attempts: attempts || 0,
                timeSpent: timeSpent || 0,
                confidence: confidence || 1,
                bookmarked: bookmarked || false,
            },
        });

        return NextResponse.json({ progress });
    } catch (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
