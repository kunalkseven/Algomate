import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/custom-questions - Get all custom questions for the user
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
        const groupId = searchParams.get('groupId');

        let whereClause: any = { userId: user.id };

        if (groupId) {
            // Check if user is member of group
            const membership = await prisma.groupMember.findUnique({
                where: { groupId_userId: { groupId, userId: user.id } }
            });

            if (!membership) {
                return NextResponse.json({ error: 'Not a member of this group' }, { status: 403 });
            }
            whereClause = { groupId };
        } else {
            // Fetch personal questions AND questions from groups user is in
            const groupMemberships = await prisma.groupMember.findMany({
                where: { userId: user.id },
                select: { groupId: true }
            });
            const groupIds = groupMemberships.map(gm => gm.groupId);

            whereClause = {
                OR: [
                    { userId: user.id },
                    { groupId: { in: groupIds } }
                ]
            };
        }

        const questions = await prisma.customQuestion.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: {
                group: {
                    select: { name: true }
                }
            }
        });

        return NextResponse.json({ questions });
    } catch (error) {
        console.error('Error fetching custom questions:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/custom-questions - Create a new custom question
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

        // Validation
        if (!title || !difficulty || !topics || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: title, difficulty, topics, description' },
                { status: 400 }
            );
        }

        if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
            return NextResponse.json(
                { error: 'Invalid difficulty. Must be Easy, Medium, or Hard' },
                { status: 400 }
            );
        }

        // Create question
        const question = await prisma.customQuestion.create({
            data: {
                userId: user.id,
                groupId: body.groupId || null, // Optional group ID
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
        console.error('Error creating custom question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
