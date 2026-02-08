# Gold & Silver Mining Financial Dashboard

A comprehensive financial dashboard designed to track and compare quarterly financial reports for gold and silver mining companies. This application allows investors and analysts to visualize key metrics, track earnings dates, and analyze performance trends over time.

## 🚀 Features

-   **Financial Data Grid**: View and compare key metrics like Market Cap, Revenue, EPS, Profit Margins, FCF, and Debt.
-   **Interactive Charts**: Visualize trends over multiple quarters with dynamic line charts.
-   **Earnings Calendar**: Track upcoming earnings release dates for major mining companies.
-   **Company Filtering**: Customize the dashboard by selecting specific companies to view and compare.
-   **Dark/Light Mode**: Fully responsive design with theme support for comfortable viewing in any environment.
-   **Responsive Design**: Optimized for Desktop, iPad, and iPhone.

## 🛠️ Tech Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Routing**: [React Router 6](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd MinerStocks
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/
│   ├── charts/       # Recharts visualizations
│   ├── dashboard/    # Main dashboard components
│   ├── earnings/     # Earnings calendar components
│   ├── layout/       # Sidebar, Header, and Main Layout
│   └── ui/           # Reusable UI components (Buttons, Cards, etc.)
├── context/          # React Context for Theme and Filters
├── data/             # Static data (companies, financials)
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── App.tsx           # Main application entry
```

## 📝 Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Type-check and build the project for production.
-   `npm run preview`: Preview the production build locally.
-   `npm run lint`: Run ESLint to check code quality.
-   `npm test`: Run tests using Vitest.
