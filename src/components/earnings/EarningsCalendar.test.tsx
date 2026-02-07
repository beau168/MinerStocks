import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EarningsCalendar } from './EarningsCalendar';
import { CompanyFilterProvider } from '../../context/CompanyFilterContext';

describe('EarningsCalendar', () => {
    it('renders company earnings', () => {
        render(
            <CompanyFilterProvider>
                <EarningsCalendar />
            </CompanyFilterProvider>
        );
        expect(screen.getByText('Newmont Corp')).toBeDefined();
        // Check for date format (Month DD, YYYY)
        expect(screen.getByText('October 31, 2025')).toBeDefined(); // Agnico Eagle
    });
});
