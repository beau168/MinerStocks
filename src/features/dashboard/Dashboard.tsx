import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext';

export const DashboardComponent: React.FC = () => {
    const { user, logout } = useAuth();
    const [selectedMetric, setSelectedMetric] = useState('Market Cap');
    const [selectedYear, setSelectedYear] = useState('2023');

    return (
        <div className="flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen w-full">
            {/* Sidebar */}
            <aside className="w-64 h-full bg-surface-darker flex flex-col border-r border-border-dark flex-shrink-0 z-20">
                <div className="flex items-center gap-3 px-6 py-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-lg flex items-center justify-center text-surface-darker font-bold">
                        SA
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold leading-normal tracking-wide">StockAnalytics</h1>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 px-4 py-2 flex-1 overflow-y-auto">
                    <div>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white transition-colors group mb-1" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
                            <p className="text-sm font-medium">Dashboard</p>
                        </a>
                        <div className="flex flex-col gap-1.5 pl-9 pb-2 pt-1">
                            {['Newmont Corp', 'Barrick Gold', 'Agnico Eagle', 'Wheaton Precious', 'Franco-Nevada'].map((stock, i) => (
                                <label key={stock} className="flex items-center gap-3 cursor-pointer group">
                                    <input defaultChecked={i < 4} className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                    <span className="text-xs text-text-secondary group-hover:text-white transition-colors">{stock}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-dark text-white hover:bg-primary/20 transition-colors group" href="#">
                            <span className="material-symbols-outlined text-primary group-hover:text-white">bar_chart</span>
                            <p className="text-sm font-medium">Charts</p>
                        </a>
                        <div className="flex flex-col gap-1.5 pl-9 pb-2 pt-1">
                            {['Newmont Corp', 'Barrick Gold', 'Agnico Eagle', 'Wheaton Precious', 'Franco-Nevada'].map((stock) => (
                                <label key={stock} className="flex items-center gap-3 cursor-pointer group">
                                    <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                    <span className="text-xs text-text-secondary group-hover:text-white transition-colors">{stock}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">calendar_month</span>
                        <p className="text-sm font-medium">Earnings Calendar</p>
                    </a>
                </nav>

                <div className="p-4 border-t border-border-dark flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 px-3 py-2 text-text-secondary mb-2 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                                {user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-xs font-bold text-white truncate">{user?.email}</p>
                                <button onClick={logout} className="text-[10px] text-primary hover:text-white text-left">Sign out</button>
                            </div>
                        </div>
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white transition-colors w-full text-left">
                            <span className="material-symbols-outlined">light_mode</span>
                            <p className="text-sm font-medium">Day Mode</p>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark relative">
                <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 pb-20">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white">Market Overview & Leaderboard</h1>
                                <p className="text-text-secondary text-base">Tracking the performance of gold mining sector leaders over time.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-48">
                                    <select
                                        value={selectedMetric}
                                        onChange={(e) => setSelectedMetric(e.target.value)}
                                        className="w-full bg-surface-dark/50 border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer custom-select"
                                    >
                                        <option>Market Cap</option>
                                        <option>Revenue</option>
                                        <option>EPS</option>
                                        <option>AISC</option>
                                    </select>
                                </div>
                                <div className="relative w-48">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full bg-surface-dark/50 border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer custom-select"
                                    >
                                        <option>2023</option>
                                        <option>2022</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                    </select>
                                </div>
                            </div>
                        </header>

                        <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm p-6 lg:p-10">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-white">{selectedMetric} Trends</h3>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                                        <span className="text-xs text-text-secondary">NEM</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        <span className="text-xs text-text-secondary">GOLD</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                                        <span className="text-xs text-text-secondary">AEM</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                        <span className="text-xs text-text-secondary">WPM</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent-red"></span>
                                        <span className="text-xs text-text-secondary">FNV</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-[400px] w-full flex">
                                <div className="flex flex-col justify-between text-right pr-4 text-[10px] text-text-secondary font-medium w-12 pb-8">
                                    <span>50B</span>
                                    <span>40B</span>
                                    <span>30B</span>
                                    <span>20B</span>
                                    <span>10B</span>
                                    <span>0</span>
                                </div>
                                <div className="flex-1 relative border-l border-b border-border-dark/50">
                                    <div className="absolute inset-0 flex flex-col justify-between pb-0">
                                        <div className="w-full border-t border-border-dark/30"></div>
                                        <div className="w-full border-t border-border-dark/30"></div>
                                        <div className="w-full border-t border-border-dark/30"></div>
                                        <div className="w-full border-t border-border-dark/30"></div>
                                        <div className="w-full border-t border-border-dark/30"></div>
                                        <div className="w-full h-px"></div>
                                    </div>
                                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 400">
                                        <path d="M 50 100 L 150 120 L 250 80 L 350 140 L 450 110 L 550 90 L 650 70" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        <path d="M 50 180 L 150 160 L 250 190 L 350 150 L 450 170 L 550 200 L 650 180" fill="none" stroke="#135bec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        <path d="M 50 220 L 150 210 L 250 230 L 350 200 L 450 220 L 550 210 L 650 230" fill="none" stroke="#0bda5e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        <path d="M 50 260 L 150 280 L 250 250 L 350 270 L 450 260 L 550 290 L 650 270" fill="none" stroke="#a855f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        <path d="M 50 310 L 150 300 L 250 320 L 350 310 L 450 330 L 550 320 L 650 340" fill="none" stroke="#fa6238" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </svg>
                                    <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-[5%] text-[10px] text-text-secondary font-medium">
                                        {['2017', '2018', '2019', '2020', '2021', '2022', '2023'].map((year) => (
                                            <div key={year} className="flex flex-col items-center w-[14%] text-center">
                                                <span className="text-white font-bold">{year}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
