export interface CompanyFinancials {
    quarter: string;
    marketCap: number | null; // in USD
    revenue: number | null; // in USD
    eps: number | null;
    profitMargins: number | null; // percentage
    fcf: number | null; // in USD
    qoq: number | null; // percentage
    yoy: number | null; // percentage
    debt: number | null; // in USD
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
