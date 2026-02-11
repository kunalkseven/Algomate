import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { questions } from '@/data/questions';

// GET /api/questions - List all questions (default + custom) with filters
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

        // Get query parameters
        const { searchParams } = new URL(request.url);
        const difficulty = searchParams.get('difficulty');
        const topic = searchParams.get('topic');
        const status = searchParams.get('status');

        // Get custom questions (only if user exists)
        const customQuestions = user ? await prisma.customQuestion.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        }) : [];

        // Combine default questions with custom questions
        let allQuestions = [
            ...questions.map(q => ({ ...q, isCustom: false })),
            ...customQuestions.map(q => ({
                id: q.id,
                title: q.title,
                difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
                topics: q.topics,
                description: q.description,
                link: q.link,
                slug: q.id,
                isCustom: true,
            })),
        ];

        // Apply filters
        if (difficulty && difficulty !== 'All') {
            allQuestions = allQuestions.filter(q => q.difficulty === difficulty);
        }
        if (topic && topic !== 'All') {
            allQuestions = allQuestions.filter(q => q.topics.includes(topic as any));
        }

        // If status filter is applied, get progress and filter
        if (status && status !== 'All' && user) {
            const progress = await prisma.progress.findMany({
                where: { userId: user.id },
            });

            const progressMap = new Map(progress.map(p => [p.questionId, p.status]));

            allQuestions = allQuestions.filter(q => {
                const questionStatus = progressMap.get(q.id) || 'unsolved';
                return questionStatus === status.toLowerCase();
            });
        }

        return NextResponse.json({ questions: allQuestions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/questions - Create custom question
export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const { title, difficulty, topics, description, link, notes } = body;

        if (!title || !difficulty || !topics || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: title, difficulty, topics, description' },
                { status: 400 }
            );
        }

        const question = await prisma.customQuestion.create({
            data: {
                userId: user.id,
                title,
                difficulty,
                topics: Array.isArray(topics) ? topics : [topics],
                description,
                link: link || null,
                notes: notes || null,
            },
        });

        return NextResponse.json({ question }, { status: 201 });
    } catch (error) {
        console.error('Error creating question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
