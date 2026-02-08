import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EarningsCalendar } from './EarningsCalendar';
import { CompanyFilterProvider } from '../../context/CompanyFilterContext';

describe('EarningsCalendar', () => {
    it('renders company earnings', async () => {
        render(
            <CompanyFilterProvider>
                <EarningsCalendar />
            </CompanyFilterProvider>
        );
        expect(await screen.findByText('Newmont Corp')).toBeDefined();
        // Check for date format (Month DD, YYYY)
        expect(screen.getByText('April 30, 2026')).toBeDefined(); // Agnico Eagle
    });
});
