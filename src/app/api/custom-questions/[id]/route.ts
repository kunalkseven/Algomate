import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/custom-questions/[id] - Update a custom question
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

        const { id } = params;
        const body = await request.json();
        const { title, difficulty, topics, description, link, notes, solved } = body;

        // Verify ownership
        const existingQuestion = await prisma.customQuestion.findUnique({
            where: { id },
        });

        if (!existingQuestion) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        if (existingQuestion.userId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Update question
        const question = await prisma.customQuestion.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(difficulty && { difficulty }),
                ...(topics && { topics: Array.isArray(topics) ? topics : [topics] }),
                ...(description && { description }),
                ...(link !== undefined && { link }),
                ...(notes !== undefined && { notes }),
                ...(solved !== undefined && { solved }),
            },
        });

        return NextResponse.json({ question });
    } catch (error) {
        console.error('Error updating custom question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/custom-questions/[id] - Delete a custom question
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

        const { id } = params;

        // Verify ownership
        const existingQuestion = await prisma.customQuestion.findUnique({
            where: { id },
        });

        if (!existingQuestion) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        if (existingQuestion.userId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Delete question
        await prisma.customQuestion.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting custom question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
