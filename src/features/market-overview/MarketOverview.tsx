import React from 'react';

export const MarketOverview: React.FC = () => {
    return (
        <div className="flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen w-full">
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
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Newmont Corp</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Barrick Gold</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Agnico Eagle</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Wheaton Precious</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Franco-Nevada</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-dark text-white hover:bg-primary/20 transition-colors group" href="#">
                            <span className="material-symbols-outlined text-primary group-hover:text-white">bar_chart</span>
                            <p className="text-sm font-medium">Charts</p>
                        </a>
                        <div className="flex flex-col gap-1.5 pl-9 pb-2 pt-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Newmont Corp</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Barrick Gold</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Agnico Eagle</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Wheaton Precious</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-offset-surface-darker focus:ring-primary" type="checkbox" />
                                <span className="text-xs text-text-secondary group-hover:text-white transition-colors">Franco-Nevada</span>
                            </label>
                        </div>
                    </div>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">calendar_month</span>
                        <p className="text-sm font-medium">Earnings Calendar</p>
                    </a>
                </nav>
                <div className="p-4 border-t border-border-dark flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white transition-colors w-full text-left">
                            <span className="material-symbols-outlined">light_mode</span>
                            <p className="text-sm font-medium">Day Mode</p>
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark relative">
                <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 pb-20">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white">Market Overview: Q3 2023</h1>
                                <p className="text-text-secondary text-base">Tracking the top performers in the gold mining sector.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-48">
                                    <select className="w-full bg-surface-dark/50 border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer custom-select">
                                        <option>Market Cap</option>
                                        <option>Revenue</option>
                                        <option>EPS</option>
                                        <option>Profit Margins</option>
                                    </select>
                                </div>
                                <div className="relative w-48">
                                    <select className="w-full bg-surface-dark/50 border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer custom-select">
                                        <option defaultValue="Q3 2023">Q3 2023</option>
                                        <option>Q2 2023</option>
                                        <option>Q1 2023</option>
                                        <option>Q4 2022</option>
                                    </select>
                                </div>
                            </div>
                        </header>
                        <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-darker/50 border-b border-border-dark relative z-30">
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap w-16 text-center">Rank</th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap">Company</th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right">Market Cap</th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right">Revenue</th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right relative z-40">
                                                <span className="tooltip cursor-help underline decoration-dotted decoration-text-secondary/50 underline-offset-4">
                                                    EPS
                                                    <span className="tooltiptext">Earnings Per Share</span>
                                                </span>
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right">Profit Margins</th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right relative z-40">
                                                <span className="tooltip cursor-help underline decoration-dotted decoration-text-secondary/50 underline-offset-4">
                                                    FCF
                                                    <span className="tooltiptext">Free Cash Flow</span>
                                                </span>
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right relative z-40">
                                                <span className="tooltip cursor-help underline decoration-dotted decoration-text-secondary/50 underline-offset-4">
                                                    QoQ
                                                    <span className="tooltiptext">Quarter-Over-Quarter Comparison</span>
                                                </span>
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right relative z-40">
                                                <span className="tooltip cursor-help underline decoration-dotted decoration-text-secondary/50 underline-offset-4">
                                                    YoY
                                                    <span className="tooltiptext">Year-Over-Year Comparison</span>
                                                </span>
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-bright whitespace-nowrap text-right">Debt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-dark">
                                        <tr className="group hover:bg-surface-darker/30 transition-colors">
                                            <td className="py-4 px-6 text-sm text-text-bright text-center">1</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-700 to-yellow-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">N</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">Newmont Corp</span>
                                                        <span className="text-xs text-text-bright">NEM</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$39.8B</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$11.2B</td>
                                            <td className="py-4 px-6 text-sm text-white text-right">$1.65</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">14.7%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$450M</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+2.4%</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+12.1%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$5.4B</td>
                                        </tr>
                                        <tr className="group hover:bg-surface-darker/30 transition-colors">
                                            <td className="py-4 px-6 text-sm text-text-bright text-center">2</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">B</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">Barrick Gold</span>
                                                        <span className="text-xs text-text-bright">GOLD</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$26.5B</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$10.8B</td>
                                            <td className="py-4 px-6 text-sm text-white text-right">$0.92</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">8.5%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$310M</td>
                                            <td className="py-4 px-6 text-sm text-accent-red text-right">-1.2%</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+5.8%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$4.2B</td>
                                        </tr>
                                        <tr className="group hover:bg-surface-darker/30 transition-colors">
                                            <td className="py-4 px-6 text-sm text-text-bright text-center">3</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">A</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">Agnico Eagle</span>
                                                        <span className="text-xs text-text-bright">AEM</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$24.1B</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$6.2B</td>
                                            <td className="py-4 px-6 text-sm text-white text-right">$2.10</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">33.9%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$120M</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+4.8%</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+18.5%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$2.1B</td>
                                        </tr>
                                        <tr className="group hover:bg-surface-darker/30 transition-colors">
                                            <td className="py-4 px-6 text-sm text-text-bright text-center">4</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-purple-700 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">W</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">Wheaton Precious</span>
                                                        <span className="text-xs text-text-bright">WPM</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$20.2B</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$1.1B</td>
                                            <td className="py-4 px-6 text-sm text-white text-right">$1.15</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">45.2%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$580M</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+1.5%</td>
                                            <td className="py-4 px-6 text-sm text-accent-red text-right">-3.2%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$0.5B</td>
                                        </tr>
                                        <tr className="group hover:bg-surface-darker/30 transition-colors">
                                            <td className="py-4 px-6 text-sm text-text-bright text-center">5</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">F</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">Franco-Nevada</span>
                                                        <span className="text-xs text-text-bright">FNV</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$20.9B</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$1.3B</td>
                                            <td className="py-4 px-6 text-sm text-white text-right">$3.40</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">52.1%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$640M</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+0.9%</td>
                                            <td className="py-4 px-6 text-sm text-accent-green text-right">+4.2%</td>
                                            <td className="py-4 px-6 text-sm text-text-bright text-right">$0.2B</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 border-t border-border-dark flex justify-between items-center bg-surface-darker/30">
                                <p className="text-sm text-text-bright">Showing 1-5 of 20 results</p>
                                <div className="flex gap-2">
                                    <button className="px-4 py-1.5 rounded bg-surface-dark border border-border-dark text-text-bright text-sm hover:text-white hover:bg-surface-darker transition-colors disabled:opacity-30" disabled>Previous</button>
                                    <button className="px-4 py-1.5 rounded bg-surface-dark border border-border-dark text-text-bright text-sm hover:text-white hover:bg-surface-darker transition-colors">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
