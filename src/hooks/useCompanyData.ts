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
        // Function to load and compare data
        const loadAndCompare = async () => {
            const loadDataInner = async (): Promise<FinancialData> => {
                try {
                    const [companyRes, earningsRes, marketCapRes] = await Promise.all([
                        fetch(`${window.location.origin}/data/data_companies.json`, { cache: 'no-store' }),
                        fetch(`${window.location.origin}/data/data_quarterly_earnings.json`, { cache: 'no-store' }),
                        fetch('https://docs.google.com/spreadsheets/d/1AC8Q0u63q49rjPc-HNA3mvQN-SFPjjK1aFuVR1lYUOg/export?format=csv&gid=0', { cache: 'no-store' }).catch(err => {
                            console.warn('Failed to fetch market caps:', err);
                            return null;
                        })
                    ]);

                    if (!companyRes.ok || !earningsRes.ok) {
                        throw new Error(`Failed to fetch data: ${companyRes.status} ${companyRes.statusText}`);
                    }

                    const contentType1 = companyRes.headers.get('content-type');
                    const contentType2 = earningsRes.headers.get('content-type');
                    if ((contentType1 && !contentType1.includes('application/json')) ||
                        (contentType2 && !contentType2.includes('application/json'))) {
                        throw new Error('Received non-JSON response from server. Check if data files exist.');
                    }

                    const companyMetadata = await companyRes.json();
                    const quarterlyEarnings = await earningsRes.json();

                    if (!companyMetadata.companies || !quarterlyEarnings.companies) {
                        throw new Error('Invalid data format received');
                    }

                    const marketCaps: Record<string, number> = {};
                    if (marketCapRes && marketCapRes.ok) {
                        try {
                            const csvText = await marketCapRes.text();
                            const lines = csvText.split('\n');
                            for (let i = 1; i < lines.length; i++) {
                                const line = lines[i].trim();
                                if (line) {
                                    const parts = line.split(',');
                                    if (parts.length >= 2) {
                                        const ticker = parts[0].trim().toUpperCase();
                                        const mc = parseFloat(parts[1].trim());
                                        if (!isNaN(mc)) {
                                            marketCaps[ticker] = mc;
                                            if (ticker === 'B') marketCaps['GOLD'] = mc;
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.error('Error parsing market caps CSV:', e);
                        }
                    }

                    const mergedCompanies = companyMetadata.companies.map((meta: any) => {
                        const financials = quarterlyEarnings.companies.find((f: any) => f.id === meta.id)?.financials || [];
                        const mc = marketCaps[meta.ticker?.toUpperCase()] !== undefined
                            ? marketCaps[meta.ticker.toUpperCase()]
                            : meta.marketCap;

                        return {
                            ...meta,
                            marketCap: mc,
                            financials
                        } as Company;
                    });

                    return { companies: mergedCompanies };
                } catch (err: any) {
                    console.error('Error loading company data:', err);
                    throw err;
                }
            };

            setLoading(true);
            try {
                // If there's already a fetch in progress, wait for it
                if (fetchPromise) {
                    const result = await fetchPromise;
                    setData(result);
                    setLoading(false);
                    return;
                }

                // Start new fetch
                fetchPromise = loadDataInner();
                const freshData = await fetchPromise;

                // Compare with current cache
                const isDifferent = JSON.stringify(freshData) !== JSON.stringify(cachedData);
                if (isDifferent) {
                    cachedData = freshData;
                    setData(freshData);
                } else if (!data) {
                    // Case where data isn't set yet but it matches the global cache (initial load)
                    setData(cachedData);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load company data');
                fetchPromise = null;
            } finally {
                setLoading(false);
                fetchPromise = null; // Always clear to allow fresh checks on next mount
            }
        };

        loadAndCompare();
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
