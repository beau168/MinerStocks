import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi, beforeAll, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

expect.extend(matchers);

// Mock fetch globally to serve JSON data files from public/data/
const companiesJson = JSON.parse(
    readFileSync(resolve(__dirname, './public/data/data_companies.json'), 'utf-8')
);
const earningsJson = JSON.parse(
    readFileSync(resolve(__dirname, './public/data/data_quarterly_earnings.json'), 'utf-8')
);

beforeAll(() => {
    globalThis.fetch = vi.fn((url: string | URL | Request) => {
        const urlStr = typeof url === 'string' ? url : url.toString();
        let body: any = null;

        if (urlStr.includes('data_companies.json')) {
            body = companiesJson;
        } else if (urlStr.includes('data_quarterly_earnings.json')) {
            body = earningsJson;
        }

        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(body),
        } as Response);
    }) as any;
});

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

