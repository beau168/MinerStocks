# Tasks: Gold & Silver Mining Financial Dashboard

## Relevant Files

### Data & Types
- `src/data/data.json` - Contains all company financial data and earnings dates
- `src/types/index.ts` - TypeScript interfaces for Company, QuarterData, etc.

### Hooks
- `src/hooks/useCompanyData.ts` - Hook for loading and filtering company data
- `src/hooks/useCompanyData.test.ts` - Unit tests for useCompanyData
- `src/hooks/useTheme.ts` - Hook for theme state management
- `src/hooks/useTheme.test.ts` - Unit tests for useTheme
- `src/hooks/useCompanyFilter.ts` - Hook for managing company checkbox state
- `src/hooks/useCompanyFilter.test.ts` - Unit tests for useCompanyFilter

### Context Providers
- `src/context/ThemeContext.tsx` - React Context for theme state
- `src/context/CompanyFilterContext.tsx` - React Context for company filter state

### Layout Components
- `src/components/layout/Sidebar.tsx` - Sidebar with nav links, company filters, theme toggle
- `src/components/layout/Sidebar.test.tsx` - Unit tests for Sidebar
- `src/components/layout/MainLayout.tsx` - Root layout wrapper (sidebar + main content)
- `src/components/layout/PageHeader.tsx` - Page title and dropdown controls

### UI Components
- `src/components/ui/Card.tsx` - Reusable card container
- `src/components/ui/Select.tsx` - Custom styled dropdown
- `src/components/ui/Checkbox.tsx` - Company filter checkbox
- `src/components/ui/Tooltip.tsx` - Column header tooltips
- `src/components/ui/Button.tsx` - Pagination and action buttons

### Dashboard Components
- `src/components/dashboard/Dashboard.tsx` - Main dashboard page
- `src/components/dashboard/Dashboard.test.tsx` - Unit tests for Dashboard
- `src/components/dashboard/DataGrid.tsx` - Financial data table
- `src/components/dashboard/DataGrid.test.tsx` - Unit tests for DataGrid
- `src/components/dashboard/QuarterSelector.tsx` - Quarter dropdown

### Chart Components
- `src/components/charts/TrendChart.tsx` - Line chart using Recharts
- `src/components/charts/TrendChart.test.tsx` - Unit tests for TrendChart
- `src/components/charts/MetricSelector.tsx` - Metric dropdown for chart

### Earnings Components
- `src/components/earnings/EarningsCalendar.tsx` - Earnings date table
- `src/components/earnings/EarningsCalendar.test.tsx` - Unit tests for EarningsCalendar

### App Entry
- `src/App.tsx` - Main app with routing and context providers
- `index.html` - HTML template with Tailwind config and custom CSS

### Notes

- Unit tests should be placed alongside the code files they are testing
- Use `npm run test` to run all tests via Vitest
- Reference `src/features/market-overview/MarketOverview.tsx` for styling patterns
- All components must use the Tailwind classes defined in the PRD Design Considerations

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature: `git checkout -b feature/financial-dashboard`

- [x] 1.0 Set up data infrastructure
  - [x] 1.1 Create `src/data/` directory
  - [x] 1.2 Create `src/data/data.json` with sample data for 5 gold/silver mining companies:
    - Newmont Corp (NEM)
    - Barrick Gold (GOLD)
    - Agnico Eagle (AEM)
    - Wheaton Precious Metals (WPM)
    - Franco-Nevada (FNV)
  - [x] 1.3 Populate `data.json` with 4 quarters of data (Q4 2024, Q1 2025, Q2 2025, Q3 2025)
  - [x] 1.4 Include all required fields per company per quarter: marketCap, revenue, eps, profitMargins, fcf, qoq, yoy, debt
  - [x] 1.5 Add nextEarningsDate and color to each company object
  - [x] 1.6 Create `src/types/index.ts` with TypeScript interfaces:
    - `Company` (id, name, ticker, color, nextEarningsDate)
    - `QuarterData` (companyId, marketCap, revenue, eps, profitMargins, fcf, qoq, yoy, debt)
    - `Quarter` (quarter, data: QuarterData[])
    - `FinancialData` (companies, quarters)
  - [x] 1.7 Create `src/hooks/useCompanyData.ts` hook to load and provide access to data.json
  - [x] 1.8 Write unit tests for `useCompanyData` hook

- [x] 2.0 Build reusable UI components
  - [x] 2.1 Create `src/components/ui/` directory
  - [x] 2.2 Create `Card.tsx` component using classes from PRD section 6.5 (Card Container)
  - [x] 2.3 Create `Select.tsx` component using classes from PRD section 6.5 (Custom Select Dropdown)
  - [x] 2.4 Create `Checkbox.tsx` component using classes from PRD section 6.5 (Checkbox Filter)
  - [x] 2.5 Create `Tooltip.tsx` component using classes from PRD section 6.5 (Tooltip)
  - [x] 2.6 Create `Button.tsx` component using classes from PRD section 6.5 (Pagination Button)
  - [x] 2.7 Create `src/components/layout/` directory
  - [x] 2.8 Create `Sidebar.tsx` by extracting sidebar from MarketOverview.tsx
  - [x] 2.9 Create `MainLayout.tsx` as a wrapper component with sidebar + main content area
  - [x] 2.10 Create `PageHeader.tsx` for page title and dropdown controls
  - [x] 2.11 Create `src/context/CompanyFilterContext.tsx` to manage which companies are checked/visible
  - [x] 2.12 Create `src/hooks/useCompanyFilter.ts` as a convenience hook for the context
  - [x] 2.13 Write unit tests for Sidebar component

- [x] 3.0 Implement Dashboard with DataGrid
  - [x] 3.1 Create `src/components/dashboard/` directory
  - [x] 3.2 Create `QuarterSelector.tsx` dropdown component that lists available quarters from data.json
  - [x] 3.3 Create `DataGrid.tsx` component with the following columns:
    - Rank (based on Market Cap, highest = 1)
    - Company (avatar + name + ticker)
    - Market Cap
    - Revenue
    - EPS (with tooltip)
    - Profit Margins
    - FCF (with tooltip)
    - QoQ (with tooltip, green/red coloring)
    - YoY (with tooltip, green/red coloring)
    - Debt
  - [x] 3.4 Implement conditional styling: positive QoQ/YoY in `text-accent-green`, negative in `text-accent-red`
  - [x] 3.5 Implement filtering: only show companies that are checked in the sidebar
  - [x] 3.6 Implement quarter switching: update data when a new quarter is selected
  - [x] 3.7 Create `Dashboard.tsx` page component that assembles:
    - PageHeader with title "Market Overview: {selectedQuarter}" and QuarterSelector
    - DataGrid
    - (Placeholder for TrendChart - to be added in Task 4.0)
  - [x] 3.8 Update `App.tsx` to use MainLayout and render Dashboard as the home route
  - [x] 3.9 Add pagination to DataGrid (10 items per page) with Previous/Next buttons
  - [x] 3.10 Write unit tests for DataGrid component

- [x] 4.0 Implement Trend Chart
  - [x] 4.1 Install Recharts: `npm install recharts`
  - [x] 4.2 Create `src/components/charts/` directory
  - [x] 4.3 Create `MetricSelector.tsx` dropdown with options: Revenue, EPS, Profit Margins, FCF
  - [x] 4.4 Create `TrendChart.tsx` line chart component using Recharts:
    - X-axis: quarters (e.g., Q4 2024, Q1 2025, Q2 2025, Q3 2025)
    - Y-axis: selected metric value
    - One line per visible company (use company.color for each line)
    - Legend showing company names with their colors
  - [x] 4.5 Integrate TrendChart into Dashboard.tsx below the DataGrid
  - [x] 4.6 Ensure chart updates when:
    - MetricSelector changes
    - Company filter checkboxes change
  - [x] 4.7 Add hover tooltips to chart showing exact values
  - [x] 4.8 Write unit tests for TrendChart component

- [x] 5.0 Build Earnings Calendar
  - [x] 5.1 Create `src/components/earnings/` directory
  - [x] 5.2 Create `EarningsCalendar.tsx` table component with columns:
    - Company Name
    - Ticker
    - Next Earnings Date (formatted as "Oct 28, 2025")
  - [x] 5.3 Sort companies by nextEarningsDate (soonest first)
  - [x] 5.4 Only show future earnings dates (filter out past dates)
  - [x] 5.5 Add navigation link in Sidebar for "Earnings Calendar"
  - [x] 5.6 Create route in App.tsx for `/earnings` that renders EarningsCalendar
  - [x] 5.7 Style table using the same patterns as DataGrid (bg-surface-dark, hover states, etc.)
  - [x] 5.8 Write unit tests for EarningsCalendar component

  - [x] 7.6 Add loading state while data.json is being loaded
  - [x] 7.7 Add error boundary or error message if data.json fails to load
  - [x] 7.8 Run Lighthouse audit and address any accessibility issues (target: >90)
  - [x] 7.9 Final visual polish: ensure all hover states, transitions, and animations match MarketOverview.tsx
  - [x] 7.10 Clean up MarketOverview.tsx (can be deleted or kept as reference)

- [x] 8.0 Build environment compatibility fix (2026-02-13)
  - [x] 8.1 Identified Node.js version mismatch: environment runs **v20.11.0**, but Vite 7 requires **v20.19+** or **v22.12+**
  - [x] 8.2 Downgraded `vite` from `^7.2.4` → `^6.0.0` (installed v6.4.1) to resolve `crypto.hash is not a function` error
  - [x] 8.3 Downgraded `@vitejs/plugin-react` from `^5.1.2` → `^4.3.4` for Vite 6 compatibility
  - [x] 8.4 Verified production build succeeds (`npm run build` — 700 modules, dist generated)
  - [x] 8.5 Verified dev server starts successfully (`npm run dev` — running on http://localhost:5173/)

---

## Completion Checklist

Before marking the feature as complete, verify:

- [x] All tasks above are checked off
- [x] Application runs without errors: `npm run dev`
- [x] All tests pass: `npm run test`
- [x] Dark mode and light mode both work correctly
- [x] Theme persists across page reloads
- [x] Dashboard displays all 10 columns correctly
- [x] Company filter checkboxes work in sidebar
- [x] Quarter selector updates both grid and chart
- [x] Chart displays lines for all visible companies
- [x] Earnings Calendar shows upcoming dates, sorted correctly
- [x] Application is responsive on iPad and iPhone
- [x] Lighthouse accessibility score > 90

> **⚠️ Note:** Vite and @vitejs/plugin-react were downgraded on 2026-02-13 to maintain compatibility with Node.js v20.11.0. If Node.js is upgraded to v20.19+ or v22.12+, these packages can be restored to their latest major versions (Vite 7 / plugin-react 5).
