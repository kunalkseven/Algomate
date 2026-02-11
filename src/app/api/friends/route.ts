import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/friends - Get user's friends list
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

        // Get friendships where user is either requester or receiver and status is accepted
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { requesterId: user.id, status: 'accepted' },
                    { receiverId: user.id, status: 'accepted' },
                ],
            },
            include: {
                requester: {
                    select: { id: true, name: true, username: true, email: true, image: true },
                },
                receiver: {
                    select: { id: true, name: true, username: true, email: true, image: true },
                },
            },
        });

        // Get pending friend requests (received)
        const pendingRequests = await prisma.friendship.findMany({
            where: {
                receiverId: user.id,
                status: 'pending',
            },
            include: {
                requester: {
                    select: { id: true, name: true, username: true, email: true, image: true },
                },
            },
        });

        // Get sent friend requests
        const sentRequests = await prisma.friendship.findMany({
            where: {
                requesterId: user.id,
                status: 'pending',
            },
            include: {
                receiver: {
                    select: { id: true, name: true, username: true, email: true, image: true },
                },
            },
        });

        // Format friends list
        const friends = friendships.map(f => {
            const friend = f.requesterId === user.id ? f.receiver : f.requester;
            return {
                friendshipId: f.id,
                ...friend,
                friendsSince: f.createdAt,
            };
        });

        return NextResponse.json({
            friends,
            pendingRequests: pendingRequests.map(r => ({
                requestId: r.id,
                ...r.requester,
                requestedAt: r.createdAt,
            })),
            sentRequests: sentRequests.map(r => ({
                requestId: r.id,
                ...r.receiver,
                requestedAt: r.createdAt,
            })),
        });
    } catch (error) {
        console.error('Error fetching friends:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/friends - Send friend request
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
        const { targetUserId, targetUsername, targetEmail } = body;

        let targetUser;

        // Find target user by ID, username, or email
        if (targetUserId) {
            targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
        } else if (targetUsername) {
            targetUser = await prisma.user.findUnique({ where: { username: targetUsername } });
        } else if (targetEmail) {
            targetUser = await prisma.user.findUnique({ where: { email: targetEmail } });
        } else {
            return NextResponse.json(
                { error: 'Must provide targetUserId, targetUsername, or targetEmail' },
                { status: 400 }
            );
        }

        if (!targetUser) {
            return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
        }

        if (targetUser.id === user.id) {
            return NextResponse.json({ error: 'Cannot send friend request to yourself' }, { status: 400 });
        }

        // Check if friendship already exists
        const existingFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId: user.id, receiverId: targetUser.id },
                    { requesterId: targetUser.id, receiverId: user.id },
                ],
            },
        });

        if (existingFriendship) {
            if (existingFriendship.status === 'accepted') {
                return NextResponse.json({ error: 'Already friends' }, { status: 400 });
            }
            if (existingFriendship.status === 'pending') {
                return NextResponse.json({ error: 'Friend request already sent' }, { status: 400 });
            }
        }

        // Create friend request
        const friendship = await prisma.friendship.create({
            data: {
                requesterId: user.id,
                receiverId: targetUser.id,
                status: 'pending',
            },
            include: {
                receiver: {
                    select: { id: true, name: true, username: true, email: true, image: true },
                },
            },
        });

        return NextResponse.json({ friendship }, { status: 201 });
    } catch (error) {
        console.error('Error sending friend request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
