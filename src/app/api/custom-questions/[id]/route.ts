import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/custom-questions/[id]
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
            include: {
                group: {
                    select: { name: true, members: { select: { userId: true } } }
                }
            }
        });

        if (!question) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        // Access control: Owner OR Group Member
        if (question.userId !== user.id) {
            // Cast to any to avoid type inference issues with 'include'
            const isMember = (question as any).group?.members.some((m: any) => m.userId === user.id);
            if (!isMember) {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
        }

        return NextResponse.json(question);
    } catch (error) {
        console.error('Error fetching custom question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
