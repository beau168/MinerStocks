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

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this feature: `git checkout -b feature/financial-dashboard`

- [ ] 1.0 Set up data infrastructure
  - [ ] 1.1 Create `src/data/` directory
  - [ ] 1.2 Create `src/data/data.json` with sample data for 5 gold/silver mining companies:
    - Newmont Corp (NEM)
    - Barrick Gold (GOLD)
    - Agnico Eagle (AEM)
    - Wheaton Precious Metals (WPM)
    - Franco-Nevada (FNV)
  - [ ] 1.3 Populate `data.json` with 4 quarters of data (Q4 2024, Q1 2025, Q2 2025, Q3 2025)
  - [ ] 1.4 Include all required fields per company per quarter: marketCap, revenue, eps, profitMargins, fcf, qoq, yoy, debt
  - [ ] 1.5 Add nextEarningsDate and color to each company object
  - [ ] 1.6 Create `src/types/index.ts` with TypeScript interfaces:
    - `Company` (id, name, ticker, color, nextEarningsDate)
    - `QuarterData` (companyId, marketCap, revenue, eps, profitMargins, fcf, qoq, yoy, debt)
    - `Quarter` (quarter, data: QuarterData[])
    - `FinancialData` (companies, quarters)
  - [ ] 1.7 Create `src/hooks/useCompanyData.ts` hook to load and provide access to data.json
  - [ ] 1.8 Write unit tests for `useCompanyData` hook

- [ ] 2.0 Build reusable UI components
  - [ ] 2.1 Create `src/components/ui/` directory
  - [ ] 2.2 Create `Card.tsx` component using classes from PRD section 6.5 (Card Container)
  - [ ] 2.3 Create `Select.tsx` component using classes from PRD section 6.5 (Custom Select Dropdown)
  - [ ] 2.4 Create `Checkbox.tsx` component using classes from PRD section 6.5 (Checkbox Filter)
  - [ ] 2.5 Create `Tooltip.tsx` component using classes from PRD section 6.5 (Tooltip)
  - [ ] 2.6 Create `Button.tsx` component using classes from PRD section 6.5 (Pagination Button)
  - [ ] 2.7 Create `src/components/layout/` directory
  - [ ] 2.8 Create `Sidebar.tsx` by extracting sidebar from MarketOverview.tsx
  - [ ] 2.9 Create `MainLayout.tsx` as a wrapper component with sidebar + main content area
  - [ ] 2.10 Create `PageHeader.tsx` for page title and dropdown controls
  - [ ] 2.11 Create `src/context/CompanyFilterContext.tsx` to manage which companies are checked/visible
  - [ ] 2.12 Create `src/hooks/useCompanyFilter.ts` as a convenience hook for the context
  - [ ] 2.13 Write unit tests for Sidebar component

- [ ] 3.0 Implement Dashboard with DataGrid
  - [ ] 3.1 Create `src/components/dashboard/` directory
  - [ ] 3.2 Create `QuarterSelector.tsx` dropdown component that lists available quarters from data.json
  - [ ] 3.3 Create `DataGrid.tsx` component with the following columns:
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
  - [ ] 3.4 Implement conditional styling: positive QoQ/YoY in `text-accent-green`, negative in `text-accent-red`
  - [ ] 3.5 Implement filtering: only show companies that are checked in the sidebar
  - [ ] 3.6 Implement quarter switching: update data when a new quarter is selected
  - [ ] 3.7 Create `Dashboard.tsx` page component that assembles:
    - PageHeader with title "Market Overview: {selectedQuarter}" and QuarterSelector
    - DataGrid
    - (Placeholder for TrendChart - to be added in Task 4.0)
  - [ ] 3.8 Update `App.tsx` to use MainLayout and render Dashboard as the home route
  - [ ] 3.9 Add pagination to DataGrid (10 items per page) with Previous/Next buttons
  - [ ] 3.10 Write unit tests for DataGrid component

- [ ] 4.0 Implement Trend Chart
  - [ ] 4.1 Install Recharts: `npm install recharts`
  - [ ] 4.2 Create `src/components/charts/` directory
  - [ ] 4.3 Create `MetricSelector.tsx` dropdown with options: Revenue, EPS, Profit Margins, FCF
  - [ ] 4.4 Create `TrendChart.tsx` line chart component using Recharts:
    - X-axis: quarters (e.g., Q4 2024, Q1 2025, Q2 2025, Q3 2025)
    - Y-axis: selected metric value
    - One line per visible company (use company.color for each line)
    - Legend showing company names with their colors
  - [ ] 4.5 Integrate TrendChart into Dashboard.tsx below the DataGrid
  - [ ] 4.6 Ensure chart updates when:
    - MetricSelector changes
    - Company filter checkboxes change
  - [ ] 4.7 Add hover tooltips to chart showing exact values
  - [ ] 4.8 Write unit tests for TrendChart component

- [ ] 5.0 Build Earnings Calendar
  - [ ] 5.1 Create `src/components/earnings/` directory
  - [ ] 5.2 Create `EarningsCalendar.tsx` table component with columns:
    - Company Name
    - Ticker
    - Next Earnings Date (formatted as "Oct 28, 2025")
  - [ ] 5.3 Sort companies by nextEarningsDate (soonest first)
  - [ ] 5.4 Only show future earnings dates (filter out past dates)
  - [ ] 5.5 Add navigation link in Sidebar for "Earnings Calendar"
  - [ ] 5.6 Create route in App.tsx for `/earnings` that renders EarningsCalendar
  - [ ] 5.7 Style table using the same patterns as DataGrid (bg-surface-dark, hover states, etc.)
  - [ ] 5.8 Write unit tests for EarningsCalendar component

- [ ] 6.0 Add Theme Switching
  - [ ] 6.1 Create `src/context/ThemeContext.tsx` with:
    - State: 'dark' | 'light' (default: 'dark')
    - Toggle function
    - Load initial value from localStorage
  - [ ] 6.2 Create `src/hooks/useTheme.ts` as a convenience hook for the context
  - [ ] 6.3 Update Sidebar to include theme toggle button in footer:
    - Dark mode: show "Day Mode" with `light_mode` icon
    - Light mode: show "Night Mode" with `dark_mode` icon
  - [ ] 6.4 Update index.html to read theme from localStorage and apply `dark` class on <html> element
  - [ ] 6.5 Persist theme preference to localStorage when toggled
  - [ ] 6.6 Define light mode color overrides in Tailwind config or custom CSS:
    - background-light: `#f6f6f8`
    - Adjust surface and text colors for light mode
  - [ ] 6.7 Test theme toggle maintains state across page reloads
  - [ ] 6.8 Write unit tests for useTheme hook

- [ ] 7.0 Mobile Responsiveness & Polish
  - [ ] 7.1 Implement collapsible sidebar for mobile (< 768px):
    - Add hamburger menu button in top-left
    - Sidebar slides in as overlay when hamburger is clicked
    - Close button or click-outside to dismiss
  - [ ] 7.2 Ensure DataGrid scrolls horizontally on mobile while columns remain readable
  - [ ] 7.3 Stack header elements vertically on mobile (title above, dropdowns below)
  - [ ] 7.4 Test on iPad viewport (768px-1024px) - sidebar should be visible
  - [ ] 7.5 Test on iPhone viewport (320px-428px) - sidebar should collapse
  - [ ] 7.6 Add loading state while data.json is being loaded
  - [ ] 7.7 Add error boundary or error message if data.json fails to load
  - [ ] 7.8 Run Lighthouse audit and address any accessibility issues (target: >90)
  - [ ] 7.9 Final visual polish: ensure all hover states, transitions, and animations match MarketOverview.tsx
  - [ ] 7.10 Clean up MarketOverview.tsx (can be deleted or kept as reference)

---

## Completion Checklist

Before marking the feature as complete, verify:

- [ ] All tasks above are checked off
- [ ] Application runs without errors: `npm run dev`
- [ ] All tests pass: `npm run test`
- [ ] Dark mode and light mode both work correctly
- [ ] Theme persists across page reloads
- [ ] Dashboard displays all 10 columns correctly
- [ ] Company filter checkboxes work in sidebar
- [ ] Quarter selector updates both grid and chart
- [ ] Chart displays lines for all visible companies
- [ ] Earnings Calendar shows upcoming dates, sorted correctly
- [ ] Application is responsive on iPad and iPhone
- [ ] Lighthouse accessibility score > 90
