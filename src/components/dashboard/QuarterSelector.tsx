import React from 'react';
import { Select } from '../ui/Select';
import { useCompanyData } from '../../hooks/useCompanyData';

interface QuarterSelectorProps {
    selectedQuarter: string;
    onChange: (quarter: string) => void;
}

export const QuarterSelector: React.FC<QuarterSelectorProps> = ({ selectedQuarter, onChange }) => {
    const { getAvailableQuarters } = useCompanyData();
    const quarters = getAvailableQuarters();

    return (
        <div className="relative w-48">
            <Select value={selectedQuarter} onChange={(e) => onChange(e.target.value)}>
                {quarters.map(q => (
                    <option key={q} value={q}>{q}</option>
                ))}
            </Select>
        </div>
    );
};
