import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import LeaderboardClient from './LeaderboardClient';
import { getQuestionById } from '@/data/questions';

export const dynamic = 'force-dynamic'; // Ensure we always fetch fresh data

export default async function LeaderboardPage() {
    const session = await getServerSession(authOptions);
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            progress: {
                where: { status: 'solved' },
                select: {
                    questionId: true,
                    updatedAt: true,
                },
                orderBy: { updatedAt: 'desc' },
            },
            customQuestions: {
                where: { solved: true },
                select: {
                    id: true,
                    title: true,
                    difficulty: true,
                    updatedAt: true,
                }
            }
        }
    });

    const leaderboardData = users.map(user => {
        let score = 0;
        let easy = 0;
        let medium = 0;
        let hard = 0;

        // Process standard questions
        user.progress.forEach(p => {
            const question = getQuestionById(p.questionId);
            if (question) {
                if (question.difficulty === 'Easy') { score += 10; easy++; }
                else if (question.difficulty === 'Medium') { score += 20; medium++; }
                else if (question.difficulty === 'Hard') { score += 30; hard++; }
            }
        });

        // Process custom questions
        user.customQuestions.forEach(q => {
            if (q.difficulty === 'Easy') { score += 10; easy++; }
            else if (q.difficulty === 'Medium') { score += 20; medium++; }
            else if (q.difficulty === 'Hard') { score += 30; hard++; }
        });


        // Combine and get recent solved names
        const allSolved = [
            ...user.progress.map(p => {
                const q = getQuestionById(p.questionId);
                return { title: q?.title || 'Unknown', date: p.updatedAt };
            }),
            ...user.customQuestions.map(q => ({ title: q.title, date: q.updatedAt }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const recentSolved = allSolved.slice(0, 3).map(item => item.title);


        // Calculate Streak / Last Active
        let lastActiveString = 'Never';
        if (allSolved.length > 0) {
            const lastDate = new Date(allSolved[0].date).getTime();
            const diff = Date.now() - lastDate;

            // Convert to readable string
            if (diff < 60 * 60 * 1000) lastActiveString = 'Just now';
            else if (diff < 24 * 60 * 60 * 1000) lastActiveString = 'Today';
            else if (diff < 48 * 60 * 60 * 1000) lastActiveString = 'Yesterday';
            else lastActiveString = `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`;
        }

        // Mock streak for now based on solved count to make it look alive, or 0
        // In a real app, we'd calculate consecutive days from `allSolved`
        const streak = Math.min(Math.floor(user.progress.length / 5), 10);

        return {
            id: user.id,
            name: user.name || 'Anonymous',
            username: user.username || user.email.split('@')[0],
            avatar: (user.name || user.email || '??').substring(0, 2).toUpperCase(),
            score,
            solved: easy + medium + hard,
            streak,
            easy,
            medium,
            hard,
            recentSolved,
            lastActive: lastActiveString,
            isCurrentUser: (session?.user?.email === user.email)
        };
    });

    // Fetch current user's friends and groups if logged in
    let friendIds: string[] = [];
    let userGroups: { id: string; name: string; memberIds: string[] }[] = [];

    if (session?.user?.email) {
        const currentUserData = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                friendsInitiated: {
                    where: { status: 'ACCEPTED' },
                    select: { receiverId: true }
                },
                friendsReceived: {
                    where: { status: 'ACCEPTED' },
                    select: { requesterId: true }
                },
                groups: {
                    include: {
                        group: {
                            include: {
                                members: {
                                    select: { userId: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (currentUserData) {
            friendIds = [
                ...currentUserData.friendsInitiated.map((f: { receiverId: string }) => f.receiverId),
                ...currentUserData.friendsReceived.map((f: { requesterId: string }) => f.requesterId)
            ];

            userGroups = currentUserData.groups.map((ug: any) => ({
                id: ug.group.id,
                name: ug.group.name,
                memberIds: ug.group.members.map((m: any) => m.userId)
            }));
        }
    }

    return (
        <LeaderboardClient
            users={leaderboardData}
            currentUserId={session?.user?.email || undefined}
            friendIds={friendIds}
            userGroups={userGroups}
        />
    );
}
