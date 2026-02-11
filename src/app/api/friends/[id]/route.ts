import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/friends/[id] - Accept or reject friend request
export async function PATCH(
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

        const body = await request.json();
        const { action } = body; // 'accept' or 'reject'

        if (!action || !['accept', 'reject'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be "accept" or "reject"' },
                { status: 400 }
            );
        }

        const friendship = await prisma.friendship.findUnique({
            where: { id: params.id },
        });

        if (!friendship) {
            return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
        }

        // Ensure the user is the receiver of the request
        if (friendship.receiverId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (friendship.status !== 'pending') {
            return NextResponse.json({ error: 'Request already processed' }, { status: 400 });
        }

        const updatedFriendship = await prisma.friendship.update({
            where: { id: params.id },
            data: { status: action === 'accept' ? 'accepted' : 'rejected' },
            include: {
                requester: {
                    select: { id: true, name: true, username: true, email: true, image: true },
                },
            },
        });

        return NextResponse.json({ friendship: updatedFriendship });
    } catch (error) {
        console.error('Error updating friend request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/friends/[id] - Remove friend or cancel request
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

        const friendship = await prisma.friendship.findUnique({
            where: { id: params.id },
        });

        if (!friendship) {
            return NextResponse.json({ error: 'Friendship not found' }, { status: 404 });
        }

        // Ensure user is part of the friendship
        if (friendship.requesterId !== user.id && friendship.receiverId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.friendship.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Friendship removed successfully' });
    } catch (error) {
        console.error('Error removing friendship:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
