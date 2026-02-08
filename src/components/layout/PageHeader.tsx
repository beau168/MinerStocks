import React, { type ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: ReactNode; // For dropdowns/controls
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-slate-500 dark:text-text-secondary text-base">
                        {subtitle}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </header>
    );
};
