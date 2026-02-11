
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' });

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ error: 'User not found' });

    const progress = await prisma.progress.findMany({
        where: { userId: user.id },
    });

    return NextResponse.json({
        user: { id: user.id, email: user.email },
        count: progress.length,
        progress
    });
}
