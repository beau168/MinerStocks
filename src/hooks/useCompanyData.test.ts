import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCompanyData } from './useCompanyData';

describe('useCompanyData', () => {
    it('should return 10 companies', async () => {
        const { result } = renderHook(() => useCompanyData());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.companies).toHaveLength(10);
    });

    it('should return available quarters', async () => {
        const { result } = renderHook(() => useCompanyData());
        await waitFor(() => expect(result.current.loading).toBe(false));
        const quarters = result.current.getAvailableQuarters();
        expect(quarters.length).toBeGreaterThan(20);
        expect(quarters).toContain('Q3 2025');
    });

    it('should get company by id', async () => {
        const { result } = renderHook(() => useCompanyData());
        await waitFor(() => expect(result.current.loading).toBe(false));
        const company = result.current.getCompanyById('nem');
        expect(company).toBeDefined();
        expect(company?.name).toBe('Newmont Corp');
    });

    it('should get quarter data', async () => {
        const { result } = renderHook(() => useCompanyData());
        await waitFor(() => expect(result.current.loading).toBe(false));
        const data = result.current.getQuarterData('Q3 2025');
        expect(data).toHaveLength(10); // 10 companies in that quarter
        expect(data[0].companyId).toBeDefined();
    });

    it('should get historical data for a company', async () => {
        const { result } = renderHook(() => useCompanyData());
        await waitFor(() => expect(result.current.loading).toBe(false));
        const history = result.current.getHistoricalDataForCompany('nem');
        expect(history.length).toBeGreaterThan(20);
        // It's reversed in hook (Oldest -> Newest)
        expect(history[0].quarter).toBe('Q1 2020');
        expect(history[history.length - 1].quarter).toBe('Q4 2025');
    });
});
