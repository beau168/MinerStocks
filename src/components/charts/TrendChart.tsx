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
    const { companies, getHistoricalDataForCompany } = useCompanyData();
    const { isCompanyVisible } = useCompanyFilter();

    // Transform data for Recharts
    const chartData = useMemo(() => {
        const visibleCompanies = companies.filter(c => isCompanyVisible(c.id));
        if (visibleCompanies.length === 0) return [];

        // Get quarters from the first visible company's history
        const firstCompanyHistory = getHistoricalDataForCompany(visibleCompanies[0].id);

        return firstCompanyHistory.map((h: any) => {
            const dataPoint: any = { name: h.quarter }; // Recharts often likes date/name key

            visibleCompanies.forEach((c: any) => { // explicit any to avoid TS issues for now
                const history = getHistoricalDataForCompany(c.id);
                const qData: any = history.find((d: any) => d.quarter === h.quarter);
                if (qData) {
                    // Start of workaround: Recharts needs a flat object
                    // We dynamically assign the company ID as the key for its metric value
                    dataPoint[c.id] = qData[selectedMetric];
                }
            });
            return dataPoint;
        });
    }, [companies, isCompanyVisible, selectedMetric, getHistoricalDataForCompany]);

    const formatYAxis = (val: number) => {
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

    if (chartData.length === 0) {
        return (
            <Card className="h-96 flex items-center justify-center text-text-secondary">
                No companies selected.
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
                            formatter={(value: any) => [formatYAxis(Number(value)), '']}
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
