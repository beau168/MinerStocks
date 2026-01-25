import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

// Mock Lucide icons as they might cause issues in JSDOM
vi.mock('lucide-react', () => ({
    LogIn: () => 'LogIn',
    LogOut: () => 'LogOut',
    User: () => 'User',
    LayoutDashboard: () => 'LayoutDashboard',
    Settings: () => 'Settings',
    Bell: () => 'Bell',
    Search: () => 'Search',
    Github: () => 'Github',
    Mail: () => 'Mail'
}));
