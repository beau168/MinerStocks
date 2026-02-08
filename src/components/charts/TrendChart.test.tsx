import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrendChart } from './TrendChart';
import { CompanyFilterProvider } from '../../context/CompanyFilterContext';

describe('TrendChart', () => {
    it('renders without crashing', async () => {
        render(
            <CompanyFilterProvider>
                <TrendChart selectedMetric="revenue" />
            </CompanyFilterProvider>
        );
        // Should show legend or text
        expect(await screen.findByText('Revenue Trend')).toBeDefined();
    });
});
