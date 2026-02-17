import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/questions/[id] - Get single question
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const question = await prisma.customQuestion.findUnique({
            where: { id: params.id },
        });

        if (!question) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        // Ensure user owns the question
        if (question.userId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json({ question });
    } catch (error) {
        console.error('Error fetching question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/questions/[id] - Update custom question
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const question = await prisma.customQuestion.findUnique({
            where: { id: params.id },
        });

        if (!question) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        if (question.userId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { title, difficulty, topics, description, link, notes, solved, examples, constraints, companies } = body;

        const updatedQuestion = await prisma.customQuestion.update({
            where: { id: params.id },
            data: {
                ...(title !== undefined && { title }),
                ...(difficulty !== undefined && { difficulty }),
                ...(topics !== undefined && { topics: Array.isArray(topics) ? topics : [topics] }),
                ...(description !== undefined && { description }),
                ...(link !== undefined && { link }),
                ...(notes !== undefined && { notes }),
                ...(solved !== undefined && { solved }),
                ...(examples !== undefined && { examples }),
                ...(constraints !== undefined && { constraints: Array.isArray(constraints) ? constraints : [constraints] }),
                ...(companies !== undefined && { companies: Array.isArray(companies) ? companies : [companies] }),
            },
        });

        return NextResponse.json({ question: updatedQuestion });
    } catch (error) {
        console.error('Error updating question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/questions/[id] - Delete custom question
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const question = await prisma.customQuestion.findUnique({
            where: { id: params.id },
        });

        if (!question) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        if (question.userId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.customQuestion.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
