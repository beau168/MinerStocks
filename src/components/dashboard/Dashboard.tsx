import React, { useState, useEffect } from 'react';
import { PageHeader } from '../layout/PageHeader';
import { QuarterSelector } from './QuarterSelector';
import { DataGrid } from './DataGrid';
import { useCompanyData } from '../../hooks/useCompanyData';
import { useSEO } from '../../hooks/useSEO';

export const Dashboard: React.FC = () => {
    useSEO({
        title: 'Market Overview - Stock Analytics',
        description: 'Real-time financial dashboard tracking top gold and silver mining stocks.'
    });
    const { getAvailableQuarters, loading, error } = useCompanyData();
    const [selectedQuarter, setSelectedQuarter] = useState<string>('');
    const isComparisonMode = false;

    const quarters = getAvailableQuarters();

    // Set default selected quarter when data loads
    useEffect(() => {
        if (quarters.length > 0 && !selectedQuarter) {
            setSelectedQuarter(quarters[0]);
        }
    }, [quarters, selectedQuarter]);

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
                title={isComparisonMode ? 'Historical Comparison' : `Market Overview: ${selectedQuarter}`}
                subtitle="Tracking the top performers in the gold mining sector."
            >
                {/* <button
                    onClick={() => setIsComparisonMode(!isComparisonMode)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${isComparisonMode
                            ? 'bg-primary text-white border-primary shadow-sm hover:bg-blue-600'
                            : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-border-dark text-slate-700 dark:text-text-bright shadow-sm hover:bg-gray-50 dark:hover:bg-surface-darker/60'
                        }`}
                >
                    Compare All Quarters
                </button> */}
                {!isComparisonMode && (
                    <QuarterSelector
                        selectedQuarter={selectedQuarter}
                        onChange={setSelectedQuarter}
                    />
                )}
            </PageHeader>

            <DataGrid selectedQuarter={selectedQuarter} isComparisonMode={isComparisonMode} />
        </div>
    );
};
