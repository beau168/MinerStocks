import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { CompanyFilterProvider } from '../../context/CompanyFilterContext';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Sidebar', () => {
    it('renders navigation links', () => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <CompanyFilterProvider>
                        <Sidebar />
                    </CompanyFilterProvider>
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Dashboard')).toBeDefined();
        expect(screen.getByText('Earnings Calendar')).toBeDefined();
    });

    it('renders company checkboxes', () => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <CompanyFilterProvider>
                        <Sidebar />
                    </CompanyFilterProvider>
                </ThemeProvider>
            </BrowserRouter>
        );
        // data.json has 5 companies
        expect(screen.getByText('Newmont Corp')).toBeDefined();
        expect(screen.getByText('Barrick Gold')).toBeDefined();
    });
});
