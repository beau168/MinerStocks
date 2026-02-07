import React, { useMemo, useState } from 'react';
import { useCompanyData } from '../../hooks/useCompanyData';
import { useCompanyFilter } from '../../hooks/useCompanyFilter';
import { Card } from '../ui/Card';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';

interface DataGridProps {
    selectedQuarter: string;
}

export const DataGrid: React.FC<DataGridProps> = ({ selectedQuarter }) => {
    const { getQuarterData, getCompanyById } = useCompanyData();
    const { isCompanyVisible } = useCompanyFilter();
    const rawData = getQuarterData(selectedQuarter);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter AND Sort data
    const processedData = useMemo(() => {
        // 1. Filter visible companies
        const filtered = rawData.filter(d => isCompanyVisible(d.companyId));

        // 2. Sort by Market Cap (Descending)
        return filtered.sort((a, b) => b.marketCap - a.marketCap);
    }, [rawData, isCompanyVisible]);

    // Pagination logic
    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const paginatedData = processedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Formatters
    const formatCurrency = (val: number) => {
        if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
        if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
        return `$${val.toLocaleString()}`;
    };

    const formatPercent = (val: number, isChange = false) => {
        const sign = isChange && val > 0 ? '+' : '';
        return `${sign}${val.toFixed(1)}%`;
    };

    const getChangeColor = (val: number) => {
        if (val > 0) return 'text-accent-green';
        if (val < 0) return 'text-accent-red';
        return 'text-text-bright';
    };

    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-surface-darker/50 border-b border-gray-200 dark:border-border-dark relative z-10">
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap w-16 text-center">Rank</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap">Company</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right">Market Cap</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right">Revenue</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right relative z-40">
                                <Tooltip text="Earnings Per Share (EPS)">EPS</Tooltip>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right">Profit Margins</th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right relative z-40">
                                <Tooltip text="Free Cash Flow (FCF)">FCF</Tooltip>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right relative z-40">
                                <Tooltip text="Quarter-Over-Quarter (QoQ)">QoQ</Tooltip>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right relative z-40">
                                <Tooltip text="Year-Over-Year (YoY)">YoY</Tooltip>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap text-right">Debt</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                        {paginatedData.map((row, index) => {
                            const company = getCompanyById(row.companyId);
                            if (!company) return null;
                            const rank = (currentPage - 1) * itemsPerPage + index + 1;

                            return (
                                <tr key={row.companyId} className="group hover:bg-gray-50 dark:hover:bg-surface-darker/30 transition-colors">
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-center">{rank}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                                style={{ backgroundColor: company.color }}
                                            >
                                                {company.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">{company.name}</span>
                                                <span className="text-xs text-slate-500 dark:text-text-secondary">{company.ticker}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.marketCap)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.revenue)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-900 dark:text-white text-right">${row.eps.toFixed(2)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatPercent(row.profitMargins)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.fcf)}</td>
                                    <td className={`py-4 px-6 text-sm text-right ${getChangeColor(row.qoq)}`}>{formatPercent(row.qoq, true)}</td>
                                    <td className={`py-4 px-6 text-sm text-right ${getChangeColor(row.yoy)}`}>{formatPercent(row.yoy, true)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.debt)}</td>
                                </tr>
                            );
                        })}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={10} className="py-8 text-center text-slate-500 dark:text-text-secondary">
                                    No companies selected. Use the sidebar to select companies.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-surface-darker/30">
                <p className="text-sm text-slate-600 dark:text-text-bright">
                    Showing {processedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                    {Math.min(currentPage * itemsPerPage, processedData.length)} of {processedData.length} results
                </p>
                <div className="flex gap-2">
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Card>
    );
};
