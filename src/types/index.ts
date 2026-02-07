export interface Company {
    id: string;
    name: string;
    ticker: string;
    color: string;
    nextEarningsDate: string; // ISO date string YYYY-MM-DD
}

export interface QuarterData {
    companyId: string;
    marketCap: number; // in USD
    revenue: number; // in USD
    eps: number;
    profitMargins: number; // percentage
    fcf: number; // in USD
    qoq: number; // percentage
    yoy: number; // percentage
    debt: number; // in USD
}

export interface Quarter {
    quarter: string; // e.g., "Q3 2025"
    data: QuarterData[];
}

export interface FinancialData {
    companies: Company[];
    quarters: Quarter[];
}
