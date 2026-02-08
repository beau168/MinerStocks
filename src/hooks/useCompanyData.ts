import { useState, useEffect, useCallback } from 'react';
import rawData from '../data/data.json';
import type { Company, FinancialData, QuarterData } from '../types';

// Simulate a singleton cache to avoid multiple "fetches" in different components
// In a real app, this would be handled by React Query or a Context
let cachedData: FinancialData | null = null;

export const useCompanyData = () => {
    const [data, setData] = useState<FinancialData | null>(cachedData);
    const [loading, setLoading] = useState<boolean>(!cachedData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cachedData) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                // Simulate network request duration
                await new Promise(resolve => setTimeout(resolve, 800));

                // In a real app: const response = await fetch('/api/data');
                // const json = await response.json();

                cachedData = rawData as FinancialData;
                setData(cachedData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load company data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const getCompanyById = useCallback((id: string): Company | undefined => {
        return data?.companies.find(c => c.id === id);
    }, [data]);

    const getQuarterData = useCallback((quarterName: string): QuarterData[] => {
        if (!data) return [];
        const quarter = data.quarters.find(q => q.quarter === quarterName);
        return quarter ? quarter.data : [];
    }, [data]);

    const getAvailableQuarters = useCallback((): string[] => {
        return data?.quarters.map(q => q.quarter) || [];
    }, [data]);

    const getHistoricalDataForCompany = useCallback((companyId: string) => {
        if (!data) return [];
        // Create an array of data points for this company across all quarters
        return data.quarters.map(q => {
            const qData = q.data.find(d => d.companyId === companyId);
            // Safely handle missing data for a quarter
            if (!qData) {
                return { quarter: q.quarter };
            }
            return {
                quarter: q.quarter,
                ...qData
            };
        }).reverse();
    }, [data]);

    return {
        companies: data?.companies || [],
        quarters: data?.quarters || [],
        getCompanyById,
        getQuarterData,
        getAvailableQuarters,
        getHistoricalDataForCompany,
        loading,
        error
    };
};
