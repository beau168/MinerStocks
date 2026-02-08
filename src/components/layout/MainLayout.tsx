import React, { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen w-full">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:flex" />

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <Sidebar onClose={() => setIsMobileMenuOpen(false)} className="shadow-2xl" />
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-light dark:bg-background-dark relative">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-dark bg-white dark:bg-surface-darker flex-shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-lg flex items-center justify-center text-surface-darker font-bold">
                            SA
                        </div>
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal tracking-wide">Stock Analytics</h1>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-20 scroll-smooth">
                    <div className="max-w-none flex flex-col gap-6 md:gap-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
