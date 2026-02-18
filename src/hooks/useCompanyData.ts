import { useState, useEffect, useCallback } from 'react';
import type { Company, FinancialData, QuarterData } from '../types';

// Singleton cache to avoid multiple fetches in different components
let cachedData: FinancialData | null = null;
let fetchPromise: Promise<FinancialData> | null = null;

const parseQuarter = (qStr: string) => {
    const [q, year] = qStr.split(' ');
    if (!q || !year) return { q: 0, year: 0 };
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
            setData(cachedData);
            setLoading(false);
            return;
        }

        const loadData = async (): Promise<FinancialData> => {
            try {
                // Use relative paths to ensure it works even if the base URL is not the root
                // Vite handles these correctly relative to the deployment root
                const [companyRes, earningsRes] = await Promise.all([
                    fetch(`${window.location.origin}/data/data_companies.json`),
                    fetch(`${window.location.origin}/data/data_quarterly_earnings.json`)
                ]);

                if (!companyRes.ok || !earningsRes.ok) {
                    throw new Error(`Failed to fetch data: ${companyRes.status} ${companyRes.statusText}`);
                }

                const contentType1 = companyRes.headers.get('content-type');
                const contentType2 = earningsRes.headers.get('content-type');
                if ((contentType1 && !contentType1.includes('application/json')) ||
                    (contentType2 && !contentType2.includes('application/json'))) {
                    // This often happens if a SPA redirects missing files to index.html
                    throw new Error('Received non-JSON response from server. Check if data files exist.');
                }

                const companyMetadata = await companyRes.json();
                const quarterlyEarnings = await earningsRes.json();

                if (!companyMetadata.companies || !quarterlyEarnings.companies) {
                    throw new Error('Invalid data format received');
                }

                const mergedCompanies = companyMetadata.companies.map((meta: any) => {
                    const financials = quarterlyEarnings.companies.find((f: any) => f.id === meta.id)?.financials || [];
                    return {
                        ...meta,
                        financials
                    } as Company;
                });

                const result = { companies: mergedCompanies };
                cachedData = result;
                return result;
            } catch (err: any) {
                console.error('Error loading company data:', err);
                throw err;
            }
        };

        if (!fetchPromise) {
            fetchPromise = loadData();
        }

        fetchPromise
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Failed to load company data');
                setLoading(false);
                fetchPromise = null; // Allow retry on next mount
            });
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
