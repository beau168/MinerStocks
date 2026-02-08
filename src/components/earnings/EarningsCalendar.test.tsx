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
        expect(screen.getAllByText('February 12, 2026').length).toBeGreaterThan(0); // Agnico Eagle and Barrick Gold
    });
});
