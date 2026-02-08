import React, { useState, useEffect } from 'react';
import { PageHeader } from '../layout/PageHeader';
import { QuarterSelector } from './QuarterSelector';
import { DataGrid } from './DataGrid';
import { useCompanyData } from '../../hooks/useCompanyData';
import { TrendChart } from '../charts/TrendChart';
import { MetricSelector, type MetricType } from '../charts/MetricSelector';

export const Dashboard: React.FC = () => {
    const { getAvailableQuarters, loading, error } = useCompanyData();
    const [selectedQuarter, setSelectedQuarter] = useState<string>('');
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('revenue');

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
                title={`Market Overview: ${selectedQuarter}`}
                subtitle="Tracking the top performers in the gold mining sector."
            >
                <QuarterSelector
                    selectedQuarter={selectedQuarter}
                    onChange={setSelectedQuarter}
                />
            </PageHeader>

            <DataGrid selectedQuarter={selectedQuarter} />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Historical Trends</h2>
                    <MetricSelector selectedMetric={selectedMetric} onChange={setSelectedMetric} />
                </div>
                <TrendChart selectedMetric={selectedMetric} />
            </div>
        </div>
    );
};
