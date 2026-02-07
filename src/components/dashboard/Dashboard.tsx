import React, { useState } from 'react';
import { PageHeader } from '../layout/PageHeader';
import { QuarterSelector } from './QuarterSelector';
import { DataGrid } from './DataGrid';
import { useCompanyData } from '../../hooks/useCompanyData';
import { TrendChart } from '../charts/TrendChart';
import { MetricSelector, type MetricType } from '../charts/MetricSelector';

export const Dashboard: React.FC = () => {
    const { getAvailableQuarters } = useCompanyData();
    const quarters = getAvailableQuarters();
    const [selectedQuarter, setSelectedQuarter] = useState(quarters[0] || 'Q3 2025');
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('revenue');

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
