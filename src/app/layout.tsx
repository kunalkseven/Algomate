import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
    title: "AlgoMate - DSA Practice & Revision Platform",
    description: "Master Data Structures and Algorithms with spaced repetition, GitHub integration, and social features. Practice, revise, and compete with friends.",
    keywords: ["DSA", "Data Structures", "Algorithms", "LeetCode", "Coding Practice", "Interview Prep"],
    authors: [{ name: "AlgoMate" }],
    openGraph: {
        title: "AlgoMate - DSA Practice & Revision Platform",
        description: "Master Data Structures and Algorithms with spaced repetition, GitHub integration, and social features.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <SessionProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                        {children}
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
