import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/groups/[id]/members - Get members of a group
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: groupId } = params;

        // Verify membership
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const membership = await prisma.groupMember.findUnique({
            where: {
                groupId_userId: {
                    groupId,
                    userId: user.id
                }
            }
        });

        if (!membership) {
            return NextResponse.json({ error: 'Not a member of this group' }, { status: 403 });
        }

        const members = await prisma.groupMember.findMany({
            where: { groupId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                        email: true
                    }
                }
            },
            orderBy: { joinedAt: 'asc' } // Oldest members first
        });

        const formattedMembers = members.map(m => ({
            id: m.user.id,
            name: m.user.name,
            username: m.user.username,
            email: m.user.email,
            image: m.user.image,
            role: m.role,
            joinedAt: m.joinedAt
        }));

        return NextResponse.json({ members: formattedMembers });

    } catch (error) {
        console.error('Error fetching group members:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/groups/[id]/members - Add a member to the group
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: groupId } = params;
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // Check if requester is admin/owner
        const requesterMembership = await prisma.groupMember.findUnique({
            where: { groupId_userId: { groupId, userId: user.id } }
        });

        if (!requesterMembership || !['owner', 'admin'].includes(requesterMembership.role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        const body = await request.json();
        const { email } = body; // Add by email for now

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const targetUser = await prisma.user.findUnique({ where: { email } });
        if (!targetUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if already a member
        const existingMember = await prisma.groupMember.findUnique({
            where: { groupId_userId: { groupId, userId: targetUser.id } }
        });

        if (existingMember) {
            return NextResponse.json({ error: 'User is already a member' }, { status: 400 });
        }

        const newMember = await prisma.groupMember.create({
            data: {
                groupId,
                userId: targetUser.id,
                role: 'member'
            },
            include: {
                user: {
                    select: { id: true, name: true, username: true, image: true, email: true }
                }
            }
        });

        return NextResponse.json({
            member: {
                id: newMember.user.id,
                name: newMember.user.name,
                username: newMember.user.username,
                email: newMember.user.email,
                image: newMember.user.image,
                role: newMember.role,
                joinedAt: newMember.joinedAt
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Error adding group member:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
