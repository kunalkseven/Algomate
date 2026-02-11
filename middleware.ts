import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/login',
    },
});

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/my-questions/:path*',
        '/revision/:path*',
        '/profile/:path*',
        '/settings/:path*',
        '/leaderboard/:path*',
        '/friends/:path*',
        '/playground/:path*',
    ],
};
