import React, { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { useCompanyData } from '../../hooks/useCompanyData';
import { useCompanyFilter } from '../../hooks/useCompanyFilter';
import { Card } from '../ui/Card';
import type { MetricType } from './MetricSelector';

interface TrendChartProps {
    selectedMetric: MetricType;
}

export const TrendChart: React.FC<TrendChartProps> = ({ selectedMetric }) => {
    const { companies, getHistoricalDataForCompany, loading } = useCompanyData();
    const { isCompanyVisible } = useCompanyFilter();

    // Transform data for Recharts
    const chartData = useMemo(() => {
        const visibleCompanies = companies.filter(c => isCompanyVisible(c.id));
        if (visibleCompanies.length === 0) return [];

        // 1. Collect all unique quarters from the available quarters list
        // We use the Hook's helper to get all quarters, instead of relying on just the first company
        // However, the hook isn't directly exposing quarters list in getHistoricalData, so we can use the 'quarters' prop from useCompanyData or just map it differently.
        // Let's rely on the fact that useCompanyData exposes 'quarters' which is the raw data
        // But better yet, let's just use the helper we already have:
        // We need a list of all quarters to form the X-axis.
        // Let's assume all companies share the same quarters for this chart, or we take the union.

        // Let's simply iterate through the 'quarters' from the hook (which we can get from useCompanyData)
        // Check useCompanyData signature... it returns `quarters` (the raw list).

        // Wait, I need to get `quarters` from `useCompanyData` in the component first.
        // I'll add `quarters` to the destructuring in the component on line 22

        // Actually, let's just stick to the pattern of getHistoricalDataForCompany but lets serve the quarters from the schema.
        // The issue might be that `getHistoricalDataForCompany` returns reversed data, and if companies have different lengths, it might mismatch.
        // But our data.json has consistent quarters for now. 

        // Let's try to map from the global quarters list to ensure order.
        // We need to access the raw quarters list. 
        // Let's modify the TrendChart component to destructure `quarters` from `useCompanyData`.

        // For now, let's improve the existing logic to be safer:
        // Collect all data first
        const allHistories = visibleCompanies.map(c => ({
            id: c.id,
            history: getHistoricalDataForCompany(c.id)
        }));

        // Flatten all quarters to find unique ones, order them (assuming they are strings like "Q3 2025", we might need better sorting if they are mixed, but let's trust the data order for now)
        // Actually the history is already returned in order (Old -> New) from `getHistoricalDataForCompany`

        if (allHistories.length === 0 || allHistories[0].history.length === 0) return [];

        // Use the first company's quarters as the "master" list of X-axis points
        const masterQuarters = allHistories[0].history.map((h: any) => h.quarter);

        return masterQuarters.map((quarter: string) => {
            const dataPoint: any = { quarter }; // Fix: match XAxis dataKey="quarter"

            allHistories.forEach(({ id, history }) => {
                const qData: any = history.find((h: any) => h.quarter === quarter);
                if (qData) {
                    dataPoint[id] = qData[selectedMetric];
                }
            });

            return dataPoint;
        });

    }, [companies, isCompanyVisible, selectedMetric, getHistoricalDataForCompany]);

    const formatYAxis = (val: number | null | undefined) => {
        if (val === null || val === undefined) return '-';
        if (selectedMetric === 'profitMargins') return `${val}%`;
        if (selectedMetric === 'eps') return `$${val}`;

        // Large numbers for Revenue/FCF
        if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
        if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
        return `${val}`;
    };

    const getMetricLabel = () => {
        switch (selectedMetric) {
            case 'revenue': return 'Revenue';
            case 'eps': return 'Earnings Per Share';
            case 'profitMargins': return 'Profit Margins';
            case 'fcf': return 'Free Cash Flow';
            default: return '';
        }
    };

    if (loading) {
        return (
            <Card className="h-96 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </Card>
        );
    }

    if (chartData.length === 0) {
        return (
            <Card className="h-96 flex items-center justify-center text-text-secondary">
                {companies.length > 0 ? "Select companies to view trends." : "No data available."}
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-6">{getMetricLabel()} Trend</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#324467" opacity={0.3} />
                        <XAxis
                            dataKey="quarter"
                            stroke="#92a4c9"
                            tick={{ fill: '#92a4c9', fontSize: 12 }}
                            tickLine={{ stroke: '#324467' }}
                        />
                        <YAxis
                            stroke="#92a4c9"
                            tick={{ fill: '#92a4c9', fontSize: 12 }}
                            tickFormatter={formatYAxis}
                            tickLine={{ stroke: '#324467' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#192233',
                                borderColor: '#324467',
                                color: '#c4d1f5'
                            }}
                            itemStyle={{ color: '#c4d1f5' }}
                            formatter={(value: any, name: any) => [formatYAxis(value), name]}
                            labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        {companies.map(company => (
                            isCompanyVisible(company.id) && (
                                <Line
                                    key={company.id}
                                    type="monotone"
                                    dataKey={company.id}
                                    name={company.name}
                                    stroke={company.color}
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            )
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
