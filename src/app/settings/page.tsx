'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Icons
const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const CodeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const BrainIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const TrophyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);

const FolderIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const SunIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const LockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SaveIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Settings types
interface UserSettings {
    theme: 'dark' | 'light' | 'system';
    notifications: {
        dailyReminder: boolean;
        weeklyReport: boolean;
        friendActivity: boolean;
        streakAlerts: boolean;
    };
    privacy: {
        showProfile: boolean;
        showProgress: boolean;
        showStreak: boolean;
    };
    practice: {
        defaultDifficulty: 'Easy' | 'Medium' | 'Hard' | 'All';
        questionsPerSession: number;
        showHints: boolean;
        autoSubmit: boolean;
    };
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const navItems = [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        { icon: CodeIcon, label: 'Practice', href: '/practice' },
        { icon: FolderIcon, label: 'My Questions', href: '/my-questions' },
        { icon: BrainIcon, label: 'Revision', href: '/revision' },
        { icon: TrophyIcon, label: 'Leaderboard', href: '/leaderboard' },
        { icon: UsersIcon, label: 'Friends', href: '/friends' },
        { icon: UserIcon, label: 'Profile', href: '/profile' },
        { icon: SettingsIcon, label: 'Settings', href: '/settings', active: true },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
            )}

            <aside className={`w-64 h-screen fixed left-0 top-0 bg-dark-900 border-r border-dark-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-dark-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="text-lg font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-dark-800 rounded">
                        <XIcon />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${item.active
                                ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                                : 'text-dark-400 hover:text-white hover:bg-dark-800'
                                }`}
                        >
                            <item.icon />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-dark-800">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                            JD
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-sm">John Doe</div>
                            <div className="text-xs text-dark-500">@johndoe</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// Toggle Switch Component
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-primary-500' : 'bg-dark-700'
                }`}
        >
            <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
            />
        </button>
    );
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettings>({
        theme: 'dark',
        notifications: {
            dailyReminder: true,
            weeklyReport: true,
            friendActivity: true,
            streakAlerts: true,
        },
        privacy: {
            showProfile: true,
            showProgress: true,
            showStreak: true,
        },
        practice: {
            defaultDifficulty: 'All',
            questionsPerSession: 5,
            showHints: true,
            autoSubmit: false,
        },
    });
    const [saved, setSaved] = useState(false);
    const [activeSection, setActiveSection] = useState<'appearance' | 'notifications' | 'privacy' | 'practice' | 'account'>('appearance');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('algomate_settings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            // Sync next-themes if different
            if (parsed.theme && parsed.theme !== theme) {
                setTheme(parsed.theme);
            }
        }
    }, []);

    // Save settings
    const handleSave = () => {
        localStorage.setItem('algomate_settings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Reset data
    const handleResetProgress = () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('algomate_progress');
            localStorage.removeItem('algomate_custom_questions');
            localStorage.removeItem('algomate_question_lists');
            alert('Progress has been reset.');
        }
    };

    const sections = [
        { id: 'appearance', label: 'Appearance', icon: MoonIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'privacy', label: 'Privacy', icon: LockIcon },
        { id: 'practice', label: 'Practice', icon: CodeIcon },
        { id: 'account', label: 'Account', icon: SettingsIcon },
    ];

    return (
        <div className="min-h-screen bg-dark-950">
            <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 bg-dark-800 rounded-lg"
                    >
                        <MenuIcon />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <span className="font-bold gradient-text">AlgoMate</span>
                    </Link>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Settings</h1>
                        <p className="text-dark-400">Customize your AlgoMate experience</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-4 lg:px-6 py-2.5 rounded-lg font-medium transition-all ${saved
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-400 hover:to-purple-400'
                            }`}
                    >
                        <SaveIcon />
                        {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-xl p-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id as typeof activeSection)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeSection === section.id
                                        ? 'bg-primary-500/20 text-primary-400'
                                        : 'text-dark-400 hover:text-white hover:bg-dark-800'
                                        }`}
                                >
                                    <section.icon />
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="lg:col-span-3">
                        {/* Appearance */}
                        {activeSection === 'appearance' && (
                            <div className="glass rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <MoonIcon />
                                    Appearance
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-dark-300 mb-3">Theme</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {(['dark', 'light', 'system'] as const).map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => {
                                                        setSettings({ ...settings, theme: t });
                                                        setTheme(t);
                                                    }}
                                                    className={`p-4 rounded-xl border-2 transition-colors capitalize ${theme === t
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-dark-700 hover:border-dark-500'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 justify-center mb-2">
                                                        {t === 'dark' && <MoonIcon />}
                                                        {t === 'light' && <SunIcon />}
                                                        {t === 'system' && <SettingsIcon />}
                                                    </div>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-dark-800/50 rounded-xl">
                                        <p className="text-sm text-dark-400">
                                            💡 Enjoy full support for light and dark modes! System mode follows your device preferences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeSection === 'notifications' && (
                            <div className="glass rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <BellIcon />
                                    Notifications
                                </h2>

                                <div className="space-y-4">
                                    {[
                                        { key: 'dailyReminder', label: 'Daily Practice Reminder', desc: 'Get reminded to practice every day' },
                                        { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Receive a summary of your weekly progress' },
                                        { key: 'friendActivity', label: 'Friend Activity', desc: 'Get notified when friends solve problems' },
                                        { key: 'streakAlerts', label: 'Streak Alerts', desc: "Get alerted when you're about to lose your streak" },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                                            <div>
                                                <h4 className="font-medium">{item.label}</h4>
                                                <p className="text-sm text-dark-400">{item.desc}</p>
                                            </div>
                                            <Toggle
                                                enabled={settings.notifications[item.key as keyof typeof settings.notifications]}
                                                onChange={(value) => setSettings({
                                                    ...settings,
                                                    notifications: { ...settings.notifications, [item.key]: value }
                                                })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Privacy */}
                        {activeSection === 'privacy' && (
                            <div className="glass rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <LockIcon />
                                    Privacy
                                </h2>

                                <div className="space-y-4">
                                    {[
                                        { key: 'showProfile', label: 'Public Profile', desc: 'Allow others to view your profile' },
                                        { key: 'showProgress', label: 'Share Progress', desc: 'Show your progress to friends' },
                                        { key: 'showStreak', label: 'Display Streak', desc: 'Show your streak on leaderboard' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                                            <div>
                                                <h4 className="font-medium">{item.label}</h4>
                                                <p className="text-sm text-dark-400">{item.desc}</p>
                                            </div>
                                            <Toggle
                                                enabled={settings.privacy[item.key as keyof typeof settings.privacy]}
                                                onChange={(value) => setSettings({
                                                    ...settings,
                                                    privacy: { ...settings.privacy, [item.key]: value }
                                                })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Practice */}
                        {activeSection === 'practice' && (
                            <div className="glass rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <CodeIcon />
                                    Practice Preferences
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-dark-300 mb-3">Default Difficulty</label>
                                        <div className="flex gap-2">
                                            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                                                <button
                                                    key={diff}
                                                    onClick={() => setSettings({
                                                        ...settings,
                                                        practice: { ...settings.practice, defaultDifficulty: diff }
                                                    })}
                                                    className={`px-4 py-2 rounded-lg transition-colors ${settings.practice.defaultDifficulty === diff
                                                        ? diff === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                            diff === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                                diff === 'Hard' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                                    'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                        : 'bg-dark-800 text-dark-400 hover:text-white'
                                                        }`}
                                                >
                                                    {diff}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dark-300 mb-3">
                                            Questions Per Session: {settings.practice.questionsPerSession}
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
                                            value={settings.practice.questionsPerSession}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                practice: { ...settings.practice, questionsPerSession: parseInt(e.target.value) }
                                            })}
                                            className="w-full accent-primary-500"
                                        />
                                        <div className="flex justify-between text-xs text-dark-500 mt-1">
                                            <span>1</span>
                                            <span>20</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                                            <div>
                                                <h4 className="font-medium">Show Hints</h4>
                                                <p className="text-sm text-dark-400">Display hints while solving problems</p>
                                            </div>
                                            <Toggle
                                                enabled={settings.practice.showHints}
                                                onChange={(value) => setSettings({
                                                    ...settings,
                                                    practice: { ...settings.practice, showHints: value }
                                                })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                                            <div>
                                                <h4 className="font-medium">Auto Submit</h4>
                                                <p className="text-sm text-dark-400">Automatically submit when all tests pass</p>
                                            </div>
                                            <Toggle
                                                enabled={settings.practice.autoSubmit}
                                                onChange={(value) => setSettings({
                                                    ...settings,
                                                    practice: { ...settings.practice, autoSubmit: value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Account */}
                        {activeSection === 'account' && (
                            <div className="space-y-6">
                                <div className="glass rounded-xl p-6">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                        <SettingsIcon />
                                        Account Information
                                    </h2>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">John Doe</h3>
                                            <p className="text-dark-400">@johndoe</p>
                                            <p className="text-dark-500 text-sm">john.doe@example.com</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-dark-300 mb-2">Display Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John Doe"
                                                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-dark-300 mb-2">Username</label>
                                            <input
                                                type="text"
                                                defaultValue="johndoe"
                                                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="glass rounded-xl p-6 border border-red-500/20">
                                    <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                                            <div>
                                                <h4 className="font-medium">Reset Progress</h4>
                                                <p className="text-sm text-dark-400">Clear all your progress and custom questions</p>
                                            </div>
                                            <button
                                                onClick={handleResetProgress}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                            >
                                                <TrashIcon />
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
