export interface CompanyFinancials {
    quarter: string;
    marketCap: number; // in USD
    revenue: number; // in USD
    eps: number;
    profitMargins: number; // percentage
    fcf: number; // in USD
    qoq: number; // percentage
    yoy: number; // percentage
    debt: number; // in USD
}

export interface Company {
    id: string;
    name: string;
    ticker: string;
    color: string;
    nextEarningsDate: string; // ISO date string YYYY-MM-DD
    financials: CompanyFinancials[];
}

// Used for the DataGrid - synthesizes data with companyId
export interface QuarterData extends CompanyFinancials {
    companyId: string;
}

export interface FinancialData {
    companies: Company[];
}
