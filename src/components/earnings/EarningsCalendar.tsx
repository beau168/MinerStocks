import React, { useMemo } from 'react';
import { useCompanyData } from '../../hooks/useCompanyData';
import { Card } from '../ui/Card';
import { PageHeader } from '../layout/PageHeader';
import { useSEO } from '../../hooks/useSEO';

export const EarningsCalendar: React.FC = () => {
    useSEO({
        title: 'Earnings Calendar - Stock Analytics',
        description: 'Upcoming earnings reports and dates for mining companies.'
    });
    const { companies, loading, error } = useCompanyData();

    // Filter relevant earnings dates and sort
    const earningsData = useMemo(() => {
        // For demo purposes, we might show all, but typically filter future only
        // Filtering logic: date >= today. But our sample data is future (Oct 2025), so we show all.

        return [...companies]
            .filter(c => c.nextEarningsDate) // Ensure date exists
            .sort((a, b) => {
                return new Date(a.nextEarningsDate).getTime() - new Date(b.nextEarningsDate).getTime();
            });
    }, [companies]);

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDaysUntil = (dateString: string) => {
        const today = new Date();
        const [year, month, day] = dateString.split('-').map(Number);
        const target = new Date(year, month - 1, day);
        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Passed';
        if (diffDays === 0) return 'Today';
        return `in ${diffDays} days`;
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-accent-red">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Earnings Calendar"
                subtitle="Upcoming quarterly earnings reports for tracked companies."
            />

            <Card className="overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-surface-darker/50 border-b border-gray-200 dark:border-border-dark">
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright">Company</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright">Ticker</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright text-right">Next Earnings Date</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright text-right">Countdown</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                        {earningsData.map(company => (
                            <tr key={company.id} className="group hover:bg-gray-50 dark:hover:bg-surface-darker/30 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                                            style={{ backgroundColor: company.color }}
                                        >
                                            {company.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{company.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-500 dark:text-text-secondary">{company.ticker}</td>
                                <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right font-medium">
                                    {formatDate(company.nextEarningsDate)}
                                </td>
                                <td className="py-4 px-6 text-sm text-right">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDaysUntil(company.nextEarningsDate) === 'Passed'
                                        ? 'bg-gray-200 dark:bg-surface-darker text-slate-500 dark:text-text-secondary'
                                        : 'bg-yellow-100 dark:bg-accent-gold/20 text-yellow-700 dark:text-accent-gold'
                                        }`}>
                                        {getDaysUntil(company.nextEarningsDate)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {earningsData.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-slate-500 dark:text-text-secondary">
                                    No upcoming earnings dates found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};
