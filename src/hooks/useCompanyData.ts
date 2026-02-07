import { useState } from 'react';
import rawData from '../data/data.json';
import type { Company, FinancialData, QuarterData } from '../types';

export const useCompanyData = () => {
    // In a real app, we might fetch this. Here it's static.
    const [data] = useState<FinancialData>(rawData as FinancialData);

    const getCompanyById = (id: string): Company | undefined => {
        return data.companies.find(c => c.id === id);
    };

    const getQuarterData = (quarterName: string): QuarterData[] => {
        const quarter = data.quarters.find(q => q.quarter === quarterName);
        return quarter ? quarter.data : [];
    };

    const getAvailableQuarters = (): string[] => {
        return data.quarters.map(q => q.quarter); // Assuming order in JSON is preferred (e.g. newest first)
    };

    const getHistoricalDataForCompany = (companyId: string) => {
        // Create an array of data points for this company across all quarters
        // We might want to reverse it if the JSON is Newest -> Oldest, so the chart goes Left (Old) -> Right (New)
        return data.quarters.map(q => {
            const qData = q.data.find(d => d.companyId === companyId);
            return {
                quarter: q.quarter,
                ...qData
            };
        }).reverse();
    };

    return {
        companies: data.companies,
        quarters: data.quarters, // full raw data if needed
        getCompanyById,
        getQuarterData,
        getAvailableQuarters,
        getHistoricalDataForCompany
    };
};
