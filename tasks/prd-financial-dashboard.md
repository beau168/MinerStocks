# PRD: Gold & Silver Mining Financial Dashboard

## 1. Introduction/Overview

This document outlines the requirements for a **Financial Dashboard Web Application** designed to display quarterly financial reports for gold and silver mining companies. The application provides investors and analysts with a streamlined interface to compare key financial metrics, track earnings dates, and visualize performance trends over time.

### Problem Statement
Investors tracking multiple mining companies need a centralized, user-friendly interface to:
- Compare quarterly financial metrics across companies
- Track upcoming earnings dates
- Visualize performance trends over time
- Access this information on both desktop and mobile devices

### Solution
A React-based single-page application with:
- A responsive data grid displaying key financial metrics
- Interactive charts for trend analysis
- An earnings calendar for upcoming report dates
- Dark/light theme support
- Mobile-first responsive design

---

## 2. Goals

| Goal | Metric |
|------|--------|
| **G1**: Provide clear, accurate financial data display | Users can view all 10 financial columns without horizontal scrolling on desktop |
| **G2**: Enable quick company comparison | Users can filter visible companies within 2 clicks |
| **G3**: Support trend analysis | Users can compare up to 5 companies on a line chart across 4-8 quarters |
| **G4**: Ensure mobile accessibility | All features are fully functional on iPad and iPhone |
| **G5**: Improve readability | Dark mode reduces eye strain; light mode works in bright environments |

---

## 3. User Stories

### 3.1 Dashboard / Home Page
| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| US-01 | User | See a ranked list of mining companies with their latest quarterly metrics | I can quickly assess which companies are performing best |
| US-02 | User | Check/uncheck companies in the sidebar | I can focus on specific companies of interest |
| US-03 | User | Select a different quarter from a dropdown | I can view historical data and compare quarters |
| US-04 | User | See companies ranked by Market Cap (highest first) | I can identify the largest players in the sector |

### 3.2 Charts
| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| US-05 | User | View a line chart showing trends over multiple quarters | I can identify performance patterns |
| US-06 | User | Select a metric (Revenue, EPS, Profit Margins, FCF) from a dropdown | I can compare companies on the metric that matters most to me |
| US-07 | User | See each company represented by a unique color | I can easily distinguish between companies on the chart |

### 3.3 Earnings Calendar
| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| US-08 | User | View a list of companies with their next earnings date | I can plan my investment decisions around earnings announcements |

### 3.4 Theme & Accessibility
| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| US-09 | User | Toggle between dark mode and light mode | I can use the app comfortably in different lighting conditions |
| US-10 | Mobile User | Use the full application on my iPad or iPhone | I can check financial data on the go |

---

## 4. Functional Requirements

### 4.1 Data Management
| ID | Requirement |
|----|-------------|
| FR-01 | The system SHALL load all company data from a local `data.json` file at application startup |
| FR-02 | The `data.json` file SHALL contain quarterly financial data for each company, including: company name, ticker symbol, market cap, revenue, EPS, profit margins, FCF, QoQ change, YoY change, and debt |
| FR-03 | The `data.json` file SHALL contain earnings dates for each company |
| FR-04 | The `data.json` file SHALL support multiple quarters of historical data (minimum 4 quarters recommended, up to 8 quarters) |

### 4.2 Dashboard (Home Page)
| ID | Requirement |
|----|-------------|
| FR-05 | The system SHALL display a sidebar with a list of all companies, each with a checkbox |
| FR-06 | The system SHALL allow users to check/uncheck companies to show/hide them in the data grid |
| FR-07 | The system SHALL persist checkbox state during the session (no page reload required) |
| FR-08 | The system SHALL display a data grid with the following columns: Rank, Company (name + ticker), Market Cap, Revenue, EPS, Profit Margins, FCF, QoQ, YoY, Debt |
| FR-09 | The system SHALL rank companies by Market Cap in descending order (highest first) |
| FR-10 | The system SHALL display a quarter selector dropdown in the top-right corner (e.g., "Q3 2025", "Q2 2025") |
| FR-11 | The system SHALL update the data grid when a different quarter is selected |
| FR-12 | The system SHALL display positive QoQ/YoY values in green and negative values in red |
| FR-13 | The system SHALL display tooltips for abbreviated column headers (EPS, FCF, QoQ, YoY) |

### 4.3 Charts
| ID | Requirement |
|----|-------------|
| FR-14 | The system SHALL display a line chart below the data grid |
| FR-15 | The system SHALL show a metric selector dropdown above the chart (options: Revenue, EPS, Profit Margins, FCF) |
| FR-16 | The chart SHALL display data for 4-8 quarters (depending on available data in `data.json`) |
| FR-17 | Each company SHALL be represented by a unique, distinguishable color on the chart |
| FR-18 | The chart SHALL include a legend identifying each company by color |
| FR-19 | The chart SHALL update when a different metric is selected |
| FR-20 | The chart SHALL only show companies that are currently checked/visible in the sidebar |

### 4.4 Earnings Calendar
| ID | Requirement |
|----|-------------|
| FR-21 | The system SHALL provide an "Earnings Calendar" section accessible from the sidebar |
| FR-22 | The earnings calendar SHALL display a simple table with columns: Company Name, Ticker, Next Earnings Date |
| FR-23 | The earnings calendar SHALL sort companies by earnings date (soonest first) |

### 4.5 Theme Switching
| ID | Requirement |
|----|-------------|
| FR-24 | The system SHALL provide a theme toggle button in the sidebar footer |
| FR-25 | The system SHALL support two themes: Dark Mode (default) and Light Mode |
| FR-26 | The system SHALL persist the user's theme preference in `localStorage` |
| FR-27 | The system SHALL apply the saved theme preference on page load |

### 4.6 Responsive Design
| ID | Requirement |
|----|-------------|
| FR-28 | The system SHALL be fully functional on desktop (1280px+ width) |
| FR-29 | The system SHALL be fully functional on iPad (768px-1024px width) |
| FR-30 | The system SHALL be fully functional on iPhone (320px-428px width) |
| FR-31 | On mobile devices, the sidebar SHALL collapse into a hamburger menu |
| FR-32 | On mobile devices, the data grid SHALL scroll horizontally if needed |

---

## 5. Non-Goals (Out of Scope)

The following features are **explicitly excluded** from this version:

| ID | Non-Goal |
|----|----------|
| NG-01 | User authentication or login |
| NG-02 | Backend server or database (all data is client-side from `data.json`) |
| NG-03 | Real-time data updates or API integration |
| NG-04 | Editing or adding companies via UI |
| NG-05 | Export functionality (PDF, CSV, Excel) |
| NG-06 | Push notifications for earnings dates |
| NG-07 | Multi-sector support (limited to gold/silver mining) |
| NG-08 | Historical chart zooming or date range selection |

---

## 6. Design Considerations

### 6.1 Design Foundation

**The existing `MarketOverview.tsx` component serves as the UI/UX foundation for the entire application.** All new components must follow the same visual patterns, class naming conventions, and layout structure established in this file.

### 6.2 Layout Structure (from MarketOverview.tsx)

```
┌─────────────────────────────────────────────────────────────────┐
│  Root Container: flex h-screen w-full overflow-hidden          │
├──────────────┬──────────────────────────────────────────────────┤
│   Sidebar    │              Main Content Area                   │
│   w-64       │              flex-1 overflow-y-auto              │
│   fixed      │                                                  │
│   z-20       │  ┌────────────────────────────────────────────┐ │
│              │  │  Header: title + dropdowns (top-right)     │ │
│  - Logo      │  ├────────────────────────────────────────────┤ │
│  - Nav links │  │  Data Grid Card                            │ │
│  - Filters   │  │  bg-surface-dark rounded-xl border         │ │
│  - Theme btn │  ├────────────────────────────────────────────┤ │
│              │  │  Chart Card                                │ │
│              │  │  bg-surface-dark rounded-xl border         │ │
│              │  └────────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────┘
```

### 6.3 Color Palette (Tailwind Custom Colors)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#135bec` | Active states, links, checkboxes |
| `background-light` | `#f6f6f8` | Light mode background |
| `background-dark` | `#101622` | Dark mode main background |
| `surface-dark` | `#192233` | Cards, dropdowns, table rows |
| `surface-darker` | `#111722` | Sidebar, table header |
| `border-dark` | `#324467` | Borders, dividers |
| `text-secondary` | `#92a4c9` | Muted text, labels |
| `text-bright` | `#c4d1f5` | Table cell text |
| `accent-gold` | `#fbbf24` | Logo gradient, Newmont color |
| `accent-green` | `#0bda5e` | Positive values (QoQ, YoY) |
| `accent-red` | `#fa6238` | Negative values (QoQ, YoY) |

### 6.4 Typography

| Element | Classes |
|---------|---------|
| **Page Title** | `text-3xl md:text-4xl font-black leading-tight tracking-tight text-white` |
| **Page Subtitle** | `text-text-secondary text-base` |
| **Sidebar Title** | `text-white text-base font-bold leading-normal tracking-wide` |
| **Nav Link** | `text-sm font-medium` |
| **Table Header** | `text-xs font-semibold uppercase tracking-wider text-text-bright` |
| **Table Cell** | `text-sm text-text-bright` |
| **Checkbox Label** | `text-xs text-text-secondary group-hover:text-white` |

### 6.5 Component Patterns (from MarketOverview.tsx)

#### Sidebar
```tsx
<aside className="w-64 h-full bg-surface-darker flex flex-col border-r border-border-dark flex-shrink-0 z-20">
```

#### Card Container
```tsx
<div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm">
```

#### Custom Select Dropdown
```tsx
<select className="w-full bg-surface-dark/50 border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer custom-select">
```

#### Checkbox Filter
```tsx
<label className="flex items-center gap-3 cursor-pointer group">
  <input 
    type="checkbox" 
    className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" 
  />
  <span className="text-xs text-text-secondary group-hover:text-white transition-colors">
    Company Name
  </span>
</label>
```

#### Nav Link (Inactive)
```tsx
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white transition-colors group" href="#">
  <span className="material-symbols-outlined group-hover:text-primary">icon_name</span>
  <p className="text-sm font-medium">Link Text</p>
</a>
```

#### Nav Link (Active)
```tsx
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-dark text-white hover:bg-primary/20 transition-colors group" href="#">
  <span className="material-symbols-outlined text-primary group-hover:text-white">icon_name</span>
  <p className="text-sm font-medium">Link Text</p>
</a>
```

#### Table Row
```tsx
<tr className="group hover:bg-surface-darker/30 transition-colors">
```

#### Company Avatar
```tsx
<div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-700 to-yellow-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
  N
</div>
```

#### Pagination Button
```tsx
<button className="px-4 py-1.5 rounded bg-surface-dark border border-border-dark text-text-bright text-sm hover:text-white hover:bg-surface-darker transition-colors disabled:opacity-30">
```

#### Tooltip
```tsx
<span className="tooltip cursor-help underline decoration-dotted decoration-text-secondary/50 underline-offset-4">
  EPS
  <span className="tooltiptext">Earnings Per Share</span>
</span>
```

### 6.6 Icons

Use **Material Symbols Outlined** for all icons:
- `dashboard` - Dashboard nav
- `bar_chart` - Charts nav
- `calendar_month` - Earnings Calendar nav
- `light_mode` / `dark_mode` - Theme toggle

### 6.7 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Default (mobile) | < 768px | Sidebar collapses to hamburger menu |
| `md` | ≥ 768px | Sidebar visible, header becomes row layout |
| `lg` | ≥ 1024px | Increased padding (`p-10`) |

### 6.8 Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Extract from MarketOverview
│   │   ├── MainLayout.tsx        # Wrapper with sidebar + main
│   │   └── PageHeader.tsx        # Title + dropdowns
│   ├── ui/
│   │   ├── Card.tsx              # Reusable card container
│   │   ├── Select.tsx            # Custom dropdown
│   │   ├── Checkbox.tsx          # Company filter checkbox
│   │   ├── Tooltip.tsx           # Column header tooltips
│   │   └── Button.tsx            # Pagination, actions
│   ├── dashboard/
│   │   ├── Dashboard.tsx         # Main dashboard page
│   │   ├── DataGrid.tsx          # Financial data table
│   │   └── QuarterSelector.tsx   # Quarter dropdown
│   ├── charts/
│   │   ├── TrendChart.tsx        # Line chart component
│   │   └── MetricSelector.tsx    # Metric dropdown
│   └── earnings/
│       └── EarningsCalendar.tsx  # Earnings date table
├── data/
│   └── data.json
├── hooks/
│   ├── useCompanyData.ts
│   ├── useTheme.ts
│   └── useCompanyFilter.ts
├── types/
│   └── index.ts
├── context/
│   ├── ThemeContext.tsx
│   └── CompanyFilterContext.tsx
└── App.tsx
```

### 6.9 CSS Dependencies (from index.html)

The following external resources must be maintained:
- **Tailwind CSS CDN** with `forms` and `container-queries` plugins
- **Google Fonts**: Manrope (weights 200-800)
- **Material Symbols Outlined** (weights 100-700)

Custom CSS classes in `<style>` block:
- `.material-symbols-outlined` - Icon styling
- `.custom-select` - Dropdown arrow image
- `.tooltip` / `.tooltiptext` - Hover tooltips
- Scrollbar styling for dark theme

---

## 7. Technical Considerations

### 7.1 Technology Stack
| Layer | Technology |
|-------|------------|
| Framework | React 19.x |
| Styling | Tailwind CSS 4.x (latest) |
| Build Tool | Vite 7.x |
| Language | TypeScript 5.x |
| Charts | Recharts (or Chart.js) |
| State Management | React Context + useState (no Redux needed for this scope) |

### 7.2 Data Schema (`data.json`)
```json
{
  "companies": [
    {
      "id": "nem",
      "name": "Newmont Corp",
      "ticker": "NEM",
      "color": "#fbbf24",
      "nextEarningsDate": "2025-10-28"
    }
  ],
  "quarters": [
    {
      "quarter": "Q3 2025",
      "data": [
        {
          "companyId": "nem",
          "marketCap": 39800000000,
          "revenue": 11200000000,
          "eps": 1.65,
          "profitMargins": 14.7,
          "fcf": 450000000,
          "qoq": 2.4,
          "yoy": 12.1,
          "debt": 5400000000
        }
      ]
    }
  ]
}
```

### 7.3 Dependencies to Install
```bash
npm install recharts
```

### 7.4 Performance Considerations
- Lazy-load chart component to reduce initial bundle size
- Memoize filtered company data with `useMemo`
- Use `React.memo` for grid row components

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Page Load Time | < 2 seconds | Lighthouse performance audit |
| Mobile Usability | 100% features accessible | Manual testing on iPhone/iPad |
| Accessibility Score | > 90 | Lighthouse accessibility audit |
| Theme Persistence | 100% | Theme should persist across page reloads |
| Data Accuracy | 100% | All displayed values match `data.json` exactly |

---

## 9. Open Questions

| ID | Question | Status |
|----|----------|--------|
| OQ-01 | Should the chart support tooltips on hover showing exact values? | **Recommended: Yes** |
| OQ-02 | Should the earnings calendar show past earnings dates or only future? | **Assumption: Future only** |
| OQ-03 | What is the maximum number of companies to support in `data.json`? | **Assumption: Up to 20** |
| OQ-04 | Should pagination be added to the data grid if there are many companies? | **Assumption: Yes, 10 per page** |

---

## 10. Implementation Phases

### Phase 1: Core Infrastructure (Priority: High)
- [ ] Set up `data.json` with sample data for 5 companies across 4 quarters
- [ ] Create TypeScript types for all data structures
- [ ] Implement `useCompanyData` hook for data loading and filtering

### Phase 2: Dashboard (Priority: High)
- [ ] Build responsive sidebar with company checkboxes
- [ ] Implement quarter selector dropdown
- [ ] Build data grid with all 10 columns
- [ ] Add conditional styling for QoQ/YoY values

### Phase 3: Charts (Priority: Medium)
- [ ] Integrate Recharts library
- [ ] Build line chart component
- [ ] Implement metric selector dropdown
- [ ] Add company color coding and legend

### Phase 4: Earnings Calendar (Priority: Medium)
- [ ] Build earnings calendar table component
- [ ] Implement sorting by date

### Phase 5: Theme & Polish (Priority: Medium)
- [ ] Implement dark/light theme toggle
- [ ] Persist theme in localStorage
- [ ] Ensure full mobile responsiveness
- [ ] Add loading states and error handling

---

*Document Version: 1.0*  
*Created: 2026-02-07*  
*Author: AI Software Architect*
