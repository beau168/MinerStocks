import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MarketOverview } from './features/market-overview/MarketOverview';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketOverview />} />
        {/* Fallback for any other route */}
        <Route path="*" element={<MarketOverview />} />
      </Routes>
    </Router>
  );
};

export default App;
