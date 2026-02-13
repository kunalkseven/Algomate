import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/groups - Get groups user is a member of
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

        const groupMemberships = await prisma.groupMember.findMany({
            where: { userId: user.id },
            include: {
                group: {
                    include: {
                        _count: {
                            select: { members: true, questions: true }
                        }
                    }
                }
            },
            orderBy: { joinedAt: 'desc' }
        });

        const groups = groupMemberships.map(gm => ({
            id: gm.group.id,
            name: gm.group.name,
            description: gm.group.description,
            role: gm.role,
            memberCount: gm.group._count.members,
            questionCount: gm.group._count.questions,
            createdAt: gm.group.createdAt
        }));

        return NextResponse.json({ groups });
    } catch (error) {
        console.error('Error fetching groups:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/groups - Create a new group
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
        const { name, description } = body;

        if (!name) {
            return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
        }

        // Transaction to create group and add owner as member
        const result = await prisma.$transaction(async (tx) => {
            const group = await tx.group.create({
                data: {
                    name,
                    description,
                    ownerId: user.id,
                },
            });

            await tx.groupMember.create({
                data: {
                    groupId: group.id,
                    userId: user.id,
                    role: 'owner',
                },
            });

            return group;
        });

        return NextResponse.json({ group: result }, { status: 201 });
    } catch (error) {
        console.error('Error creating group:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
