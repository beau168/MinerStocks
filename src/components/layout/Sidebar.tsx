import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCompanyData } from '../../hooks/useCompanyData';
import { Checkbox } from '../ui/Checkbox';
import { useCompanyFilter } from '../../hooks/useCompanyFilter';
import { useTheme } from '../../hooks/useTheme';

interface SidebarProps {
    className?: string;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onClose }) => {
    const { companies } = useCompanyData();
    const { toggleCompany, isCompanyVisible } = useCompanyFilter();
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className={`w-64 h-full bg-white dark:bg-surface-darker flex flex-col border-r border-gray-200 dark:border-border-dark flex-shrink-0 z-20 transition-all ${className}`}>
            {/* Logo */}
            <div className="flex items-center justify-between px-6 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-lg flex items-center justify-center text-surface-darker font-bold">
                        SA
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal tracking-wide">StockAnalytics</h1>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="md:hidden text-slate-500 dark:text-text-secondary">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 px-4 py-2 flex-1 overflow-y-auto">
                <div>
                    <NavLink
                        to="/"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group mb-1 ${isActive
                                ? 'bg-gray-100 dark:bg-surface-dark text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-primary/20'
                                : 'text-slate-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-slate-400 dark:text-text-secondary group-hover:text-primary'}`}>
                                    dashboard
                                </span>
                                <p className="text-sm font-medium">Dashboard</p>
                            </>
                        )}
                    </NavLink>

                    {/* Companies List (Only visible under Dashboard) */}
                    <div className="flex flex-col gap-1.5 pl-9 pb-2 pt-1">
                        {companies.map(company => (
                            <Checkbox
                                key={company.id}
                                label={company.name}
                                checked={isCompanyVisible(company.id)}
                                onChange={() => toggleCompany(company.id)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <NavLink
                        to="/earnings"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive
                                ? 'bg-gray-100 dark:bg-surface-dark text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-primary/20'
                                : 'text-slate-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-slate-400 dark:text-text-secondary group-hover:text-primary'}`}>
                                    calendar_month
                                </span>
                                <p className="text-sm font-medium">Earnings Calendar</p>
                            </>
                        )}
                    </NavLink>
                </div>
            </nav>

            {/* Footer / Theme Toggle */}
            <div className="p-4 border-t border-gray-200 dark:border-border-dark flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-surface-dark hover:text-slate-900 dark:hover:text-white transition-colors w-full text-left"
                    >
                        <span className="material-symbols-outlined">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                        <p className="text-sm font-medium">
                            {theme === 'dark' ? 'Day Mode' : 'Night Mode'}
                        </p>
                    </button>
                </div>
            </div>
        </aside>
    );
};
