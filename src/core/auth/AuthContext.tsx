import React, { createContext, useContext, useState, useEffect } from 'react';
import { config } from '../../config';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: any) => Promise<void>;
    signup: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = `${config.apiBaseUrl}/auth`;

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${API_URL}/me`, {
                headers: { 'Accept': 'application/json' },
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error('Check auth failed', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: any) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Login failed');
        }
    };

    const signup = async (credentials: any) => {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Signup failed');
        }
    };

    const logout = async () => {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
