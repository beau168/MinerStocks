import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useThemeContext } from './ThemeContext';

// Helper component to test hook
const TestComponent = () => {
    const { theme, toggleTheme } = useThemeContext();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');
        // Mock Date to be evening (e.g., 20:00) so it defaults to 'dark'
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2024, 0, 1, 20, 0, 0));
    });

    afterEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');
        vi.useRealTimers();
    });

    it('defaults to dark theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value').textContent).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('toggles theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByText('Toggle');
        fireEvent.click(button);

        expect(screen.getByTestId('theme-value').textContent).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        fireEvent.click(button);
        expect(screen.getByTestId('theme-value').textContent).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('persists theme to localStorage', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByText('Toggle'));
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('initializes from localStorage', () => {
        localStorage.setItem('theme', 'light');
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value').textContent).toBe('light');
    });
});
