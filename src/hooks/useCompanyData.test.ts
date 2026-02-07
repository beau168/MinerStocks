import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCompanyData } from './useCompanyData';

describe('useCompanyData', () => {
    it('should return 5 companies', () => {
        const { result } = renderHook(() => useCompanyData());
        expect(result.current.companies).toHaveLength(5);
    });

    it('should return available quarters', () => {
        const { result } = renderHook(() => useCompanyData());
        const quarters = result.current.getAvailableQuarters();
        expect(quarters).toHaveLength(4);
        expect(quarters).toContain('Q3 2025');
    });

    it('should get company by id', () => {
        const { result } = renderHook(() => useCompanyData());
        const company = result.current.getCompanyById('nem');
        expect(company).toBeDefined();
        expect(company?.name).toBe('Newmont Corp');
    });

    it('should get quarter data', () => {
        const { result } = renderHook(() => useCompanyData());
        const data = result.current.getQuarterData('Q3 2025');
        expect(data).toHaveLength(5);
        expect(data[0].companyId).toBeDefined();
    });

    it('should get historical data for a company (4 quarters)', () => {
        const { result } = renderHook(() => useCompanyData());
        const history = result.current.getHistoricalDataForCompany('nem');
        expect(history).toHaveLength(4);
        // It's reversed in hook (Oldest -> Newest)
        expect(history[0].quarter).toBe('Q4 2024');
        expect(history[3].quarter).toBe('Q3 2025');
    });
});
