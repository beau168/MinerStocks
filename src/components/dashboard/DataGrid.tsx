import React, { useMemo, useState } from 'react';
import { useCompanyData } from '../../hooks/useCompanyData';
import { useCompanyFilter } from '../../hooks/useCompanyFilter';
import { Card } from '../ui/Card';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';

interface DataGridProps {
    selectedQuarter: string;
    isComparisonMode?: boolean;
}

type SortDirection = 'asc' | 'desc';

const SortableHeader: React.FC<{
    label: React.ReactNode;
    sortKey: string;
    currentSort: { key: string; direction: SortDirection };
    onSort: (key: string) => void;
    className?: string;
    align?: 'left' | 'center' | 'right';
}> = ({ label, sortKey, currentSort, onSort, className = '', align = 'left' }) => {
    const isActive = currentSort.key === sortKey;
    const justifyClass = align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start';
    return (
        <th
            className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap cursor-pointer hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors select-none group/header relative z-40 ${className}`}
            onClick={() => onSort(sortKey)}
        >
            <div className={`flex items-center gap-1 ${justifyClass}`}>
                {label}
                <span className={`material-symbols-outlined text-[16px] leading-none ${isActive ? 'text-primary' : 'text-transparent group-hover/header:text-slate-400 dark:group-hover/header:text-text-secondary'} transition-colors`}>
                    {isActive ? (currentSort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'swap_vert'}
                </span>
            </div>
        </th>
    );
};

export const DataGrid: React.FC<DataGridProps> = ({ selectedQuarter, isComparisonMode = false }) => {
    const { getQuarterData, getCompanyById, getHistoricalDataForCompany } = useCompanyData();
    const { isCompanyVisible, visibleCompanyIds } = useCompanyFilter();

    const isSingleCompanyView = visibleCompanyIds.length === 1 && !isComparisonMode;
    const singleCompanyId = isSingleCompanyView ? visibleCompanyIds[0] : null;

    const rawData = getQuarterData(selectedQuarter);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Sorting state
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection }>({ key: 'marketCap', direction: 'desc' });

    const handleSort = (key: string) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'desc' }; // default direction on new col
        });
        setCurrentPage(1); // reset to page 1 on sort
    };

    // Filter AND Sort data
    const processedData = useMemo(() => {
        if (isSingleCompanyView || isComparisonMode) {
            // HISTORICAL VIEW: Map quarters to rows
            let companyHistoricalData: any[] = [];

            const idsToFetch = isComparisonMode ? visibleCompanyIds : (singleCompanyId ? [singleCompanyId] : []);

            idsToFetch.forEach(id => {
                const historicalData = getHistoricalDataForCompany(id);
                historicalData.forEach((qData: any) => {
                    companyHistoricalData.push({
                        companyId: id,
                        quarter: qData.quarter,
                        marketCap: qData?.marketCap ?? null,
                        revenue: qData?.revenue ?? 0,
                        eps: qData?.eps ?? null,
                        profitMargins: qData?.profitMargins ?? null,
                        fcf: qData?.fcf ?? null,
                        qoq: qData?.qoq ?? null,
                        yoy: qData?.yoy ?? null,
                        debt: qData?.debt ?? null
                    });
                });
            });

            companyHistoricalData = companyHistoricalData.filter((d: any) => d.revenue > 0 || d.marketCap !== null); // rudimentary check for valid data

            // Sort by quarter (simple string desc assumes "Q3 2025" formats logically align)
            companyHistoricalData.sort((a: any, b: any) => {
                // To sort Q4 2024, Q1 2025 properly: split 'Q1' and '2025'
                const parseQ = (q: string) => {
                    const parts = q.split(' ');
                    if (parts.length !== 2) return 0;
                    const year = parseInt(parts[1], 10);
                    const qtr = parseInt(parts[0].replace('Q', ''), 10);
                    return year * 10 + qtr; // 2025 * 10 + 1 = 20251
                };

                let aVal: any = a[sortConfig.key as keyof typeof a];
                let bVal: any = b[sortConfig.key as keyof typeof b];

                if (sortConfig.key === 'quarter') {
                    aVal = parseQ(a.quarter);
                    bVal = parseQ(b.quarter);
                } else if (sortConfig.key === 'name') {
                    aVal = getCompanyById(a.companyId)?.name || '';
                    bVal = getCompanyById(b.companyId)?.name || '';
                } else if (sortConfig.key === 'marketCap') {
                    aVal = a.marketCap ?? getCompanyById(a.companyId)?.marketCap ?? 0;
                    bVal = b.marketCap ?? getCompanyById(b.companyId)?.marketCap ?? 0;
                } else if (sortConfig.key === 'debt') {
                    aVal = a.debt ?? getCompanyById(a.companyId)?.debt ?? 0;
                    bVal = b.debt ?? getCompanyById(b.companyId)?.debt ?? 0;
                }

                // In comparison mode, primary sort is ALWAYS quarter descending (unless sorting specifically by something else)
                // Actually, if we're sorting by a specific column, use that.
                // But let's add a tie-breaker for quarter or let the main sort handle it.
                // If sorting by quarter, it's just normal sort.

                if (aVal === null || aVal === undefined) aVal = -Infinity;
                if (bVal === null || bVal === undefined) bVal = -Infinity;

                if (aVal !== bVal) {
                    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                }

                // Tie-breaker: chronological order
                if (sortConfig.key !== 'quarter') {
                    const aQ = parseQ(a.quarter);
                    const bQ = parseQ(b.quarter);
                    if (aQ !== bQ) return bQ - aQ; // Descending default
                }

                return 0;
            });

            return companyHistoricalData;
        }

        // MULTI COMPANY VIEW (Default)
        // 1. Filter visible companies
        let filtered = rawData.filter((d: any) => isCompanyVisible(d.companyId));

        // 2. Sort data
        filtered.sort((a: any, b: any) => {
            let aVal: any = a[sortConfig.key as keyof typeof a];
            let bVal: any = b[sortConfig.key as keyof typeof b];

            if (sortConfig.key === 'name') {
                aVal = getCompanyById(a.companyId)?.name || '';
                bVal = getCompanyById(b.companyId)?.name || '';
            } else if (sortConfig.key === 'marketCap') {
                aVal = a.marketCap ?? getCompanyById(a.companyId)?.marketCap ?? 0;
                bVal = b.marketCap ?? getCompanyById(b.companyId)?.marketCap ?? 0;
            } else if (sortConfig.key === 'debt') {
                aVal = a.debt ?? getCompanyById(a.companyId)?.debt ?? 0;
                bVal = b.debt ?? getCompanyById(b.companyId)?.debt ?? 0;
            }

            if (aVal === null || aVal === undefined) aVal = -Infinity;
            if (bVal === null || bVal === undefined) bVal = -Infinity;

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [rawData, isCompanyVisible, sortConfig, getCompanyById, isSingleCompanyView, isComparisonMode, visibleCompanyIds, singleCompanyId, getHistoricalDataForCompany]);

    // Pagination logic
    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const paginatedData = processedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Formatters
    const formatCurrency = (val: number | null | undefined) => {
        if (val === null || val === undefined) return '-';
        if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
        if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
        return `$${val.toLocaleString()}`;
    };

    const formatPercent = (val: number | null | undefined, isChange = false) => {
        if (val === null || val === undefined) return '-';
        const sign = isChange && val > 0 ? '+' : '';
        return `${sign}${val.toFixed(1)}%`;
    };

    const getChangeColor = (val: number | null) => {
        if (val === null) return 'text-text-bright';
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
                            {!(isSingleCompanyView || isComparisonMode) && (
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-text-bright whitespace-nowrap w-16 text-center">Rank</th>
                            )}
                            {(isSingleCompanyView || isComparisonMode) && (
                                <SortableHeader label="Quarter" sortKey="quarter" currentSort={sortConfig} onSort={handleSort} />
                            )}
                            {!isSingleCompanyView && (
                                <SortableHeader label="Company" sortKey="name" currentSort={sortConfig} onSort={handleSort} />
                            )}
                            <SortableHeader label={<Tooltip text="Current Market Cap">Market Cap</Tooltip>} sortKey="marketCap" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label="Revenue" sortKey="revenue" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label={<Tooltip text="Earnings Per Share (EPS)">EPS</Tooltip>} sortKey="eps" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label="Profit Margins" sortKey="profitMargins" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label={<Tooltip text="Free Cash Flow (FCF)">FCF</Tooltip>} sortKey="fcf" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label={<Tooltip text="Quarter-Over-Quarter (QoQ)">QoQ</Tooltip>} sortKey="qoq" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label={<Tooltip text="Year-Over-Year (YoY)">YoY</Tooltip>} sortKey="yoy" currentSort={sortConfig} onSort={handleSort} align="right" />
                            <SortableHeader label={<Tooltip text="Current Debt">Debt</Tooltip>} sortKey="debt" currentSort={sortConfig} onSort={handleSort} align="right" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                        {paginatedData.map((row: any, index: number) => {
                            const company = getCompanyById(row.companyId);
                            if (!company) return null;
                            const rank = (currentPage - 1) * itemsPerPage + index + 1;

                            return (
                                <tr key={`${row.companyId}-${(row as any).quarter || 'cur'}`} className="group hover:bg-gray-50 dark:hover:bg-surface-darker/30 transition-colors">
                                    {!(isSingleCompanyView || isComparisonMode) && (
                                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-center">{rank}</td>
                                    )}
                                    {(isSingleCompanyView || isComparisonMode) && (
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{(row as any).quarter}</span>
                                        </td>
                                    )}
                                    {!isSingleCompanyView && (
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
                                    )}
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.marketCap ?? company.marketCap)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.revenue)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-900 dark:text-white text-right">
                                        {row.eps !== null ? `$${row.eps.toFixed(2)}` : '-'}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatPercent(row.profitMargins)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.fcf)}</td>
                                    <td className={`py-4 px-6 text-sm text-right ${getChangeColor(row.qoq)}`}>{formatPercent(row.qoq, true)}</td>
                                    <td className={`py-4 px-6 text-sm text-right ${getChangeColor(row.yoy)}`}>{formatPercent(row.yoy, true)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-text-bright text-right">{formatCurrency(row.debt ?? company.debt)}</td>
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
