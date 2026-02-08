import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataGrid } from './DataGrid';
import { CompanyFilterProvider } from '../../context/CompanyFilterContext';

describe('DataGrid', () => {
    it('renders column headers', () => {
        render(
            <CompanyFilterProvider>
                <DataGrid selectedQuarter="Q3 2025" />
            </CompanyFilterProvider>
        );
        expect(screen.getByText('Rank')).toBeDefined();
        expect(screen.getByText('Company')).toBeDefined();
        expect(screen.getByText('Market Cap')).toBeDefined();
    });

    it('renders company rows', async () => {
        render(
            <CompanyFilterProvider>
                <DataGrid selectedQuarter="Q3 2025" />
            </CompanyFilterProvider>
        );
        expect(await screen.findByText('Newmont Corp')).toBeDefined();
    });
});
