import React, { type ChangeEvent } from 'react';
import { Select } from '../ui/Select';

export type MetricType = 'revenue' | 'eps' | 'profitMargins' | 'fcf';

interface MetricSelectorProps {
    selectedMetric: MetricType;
    onChange: (metric: MetricType) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetric, onChange }) => {
    return (
        <div className="relative w-48">
            <Select
                value={selectedMetric}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as MetricType)}
            >
                <option value="revenue">Revenue</option>
                <option value="eps">EPS</option>
                <option value="profitMargins">Profit Margins</option>
                <option value="fcf">Free Cash Flow</option>
            </Select>
        </div>
    );
};
