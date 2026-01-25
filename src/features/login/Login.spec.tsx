import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginComponent } from './Login';
import { BrowserRouter } from 'react-router-dom';

// Mock the AuthContext login function
const mockLogin = vi.fn();

vi.mock('../../core/auth/AuthContext', async () => {
    const actual = await vi.importActual('../../core/auth/AuthContext');
    return {
        ...actual,
        useAuth: () => ({
            login: mockLogin,
            user: null,
            loading: false
        }),
        AuthProvider: ({ children }: any) => <div>{children}</div>
    };
});

describe('LoginComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form', () => {
        render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('calls login on submit', async () => {
        mockLogin.mockResolvedValueOnce(undefined);

        render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
        });
    });

    it('shows error message on failure', async () => {
        mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

        render(
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
