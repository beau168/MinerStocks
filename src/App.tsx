import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { CompanyFilterProvider } from './context/CompanyFilterContext';
import { EarningsCalendar } from './components/earnings/EarningsCalendar';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <CompanyFilterProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/earnings" element={<EarningsCalendar />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </MainLayout>
        </CompanyFilterProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
