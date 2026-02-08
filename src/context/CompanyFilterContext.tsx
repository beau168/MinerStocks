import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCompanyData } from '../hooks/useCompanyData';

interface CompanyFilterContextType {
    visibleCompanyIds: string[];
    toggleCompany: (id: string) => void;
    isCompanyVisible: (id: string) => boolean;
}

const CompanyFilterContext = createContext<CompanyFilterContextType | undefined>(undefined);

export const CompanyFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { companies } = useCompanyData();
    const [visibleCompanyIds, setVisibleCompanyIds] = useState<string[]>([]);

    // Initialize data - default all visible
    useEffect(() => {
        if (companies.length > 0 && visibleCompanyIds.length === 0) {
            setVisibleCompanyIds(companies.map(c => c.id));
        }
    }, [companies]);

    const toggleCompany = useCallback((id: string) => {
        setVisibleCompanyIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(cId => cId !== id);
            } else {
                return [...prev, id];
            }
        });
    }, []);

    const isCompanyVisible = useCallback((id: string) => visibleCompanyIds.includes(id), [visibleCompanyIds]);

    return (
        <CompanyFilterContext.Provider value={{ visibleCompanyIds, toggleCompany, isCompanyVisible }}>
            {children}
        </CompanyFilterContext.Provider>
    );
};

export const useCompanyFilterContext = () => {
    const context = useContext(CompanyFilterContext);
    if (!context) {
        throw new Error('useCompanyFilterContext must be used within a CompanyFilterProvider');
    }
    return context;
};
