import { useState, useEffect, useCallback } from 'react';
import type { Company, FinancialData, QuarterData } from '../types';

// Singleton cache to avoid multiple fetches in different components
let cachedData: FinancialData | null = null;

const parseQuarter = (qStr: string) => {
    const [q, year] = qStr.split(' ');
    return {
        q: parseInt(q.replace('Q', '')),
        year: parseInt(year)
    };
};

const sortQuartersDesc = (a: string, b: string) => {
    const qa = parseQuarter(a);
    const qb = parseQuarter(b);
    if (qa.year !== qb.year) return qb.year - qa.year;
    return qb.q - qa.q;
};

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
                const [companyRes, earningsRes] = await Promise.all([
                    fetch('/data/data_companies.json'),
                    fetch('/data/data_quarterly_earnings.json')
                ]);

                if (!companyRes.ok || !earningsRes.ok) {
                    throw new Error('Failed to fetch data files');
                }

                const companyMetadata = await companyRes.json();
                const quarterlyEarnings = await earningsRes.json();

                const mergedCompanies = companyMetadata.companies.map((meta: any) => {
                    const financials = quarterlyEarnings.companies.find((f: any) => f.id === meta.id)?.financials || [];
                    return {
                        ...meta,
                        financials
                    } as Company;
                });

                cachedData = { companies: mergedCompanies };
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

    const getAvailableQuarters = useCallback((): string[] => {
        if (!data) return [];
        const quarters = new Set<string>();
        data.companies.forEach(c => {
            c.financials.forEach(f => quarters.add(f.quarter));
        });
        return Array.from(quarters).sort(sortQuartersDesc);
    }, [data]);

    const getQuarterData = useCallback((quarterName: string): QuarterData[] => {
        if (!data) return [];
        const result: QuarterData[] = [];

        data.companies.forEach(company => {
            const financial = company.financials.find(f => f.quarter === quarterName);
            if (financial) {
                result.push({
                    companyId: company.id,
                    ...financial
                });
            }
        });

        return result;
    }, [data]);

    const getHistoricalDataForCompany = useCallback((companyId: string) => {
        const company = getCompanyById(companyId);
        if (!company) return [];
        // Return a copy and reverse for chronological order (Oldest -> Newest) for charts
        return [...company.financials].reverse();
    }, [getCompanyById]);

    return {
        companies: data?.companies || [],
        getCompanyById,
        getQuarterData,
        getAvailableQuarters,
        getHistoricalDataForCompany,
        loading,
        error
    };
};
