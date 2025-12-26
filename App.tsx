
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun,
  Plus, 
  ArrowUp, 
  Layers, 
  BarChart, 
  CheckCircle2,
  Command,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Target,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import ReactMarkdown from 'react-markdown';

import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import ActivityFeed from './components/ActivityFeed';
import AIAssistant from './components/AIAssistant';
import CommandPalette from './components/CommandPalette';
import AccountsPage from './components/AccountsPage';
import InvoicesPage from './components/InvoicesPage';
import SettingsPage from './components/SettingsPage';
import ReportsPage from './components/ReportsPage';
import { METRICS, CHART_DATA } from './constants';
import { getFinancialAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastData, setForecastData] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSelect = (id: string) => {
    if (id === 'go-dashboard') setActivePage('dashboard');
    if (id === 'go-settings') setActivePage('settings');
  };

  const handleSmartForecast = async () => {
    setIsForecastModalOpen(true);
    setForecastLoading(true);
    const context = {
      revenue: METRICS[0].value,
      expenses: METRICS[1].value,
      balance: METRICS[2].value,
      transactions: METRICS[3].value
    };
    const result = await getFinancialAdvice("Run a detailed 6-month financial forecast based on my current metrics and identify potential risks. Be specific about numbers.", context);
    setForecastData(result);
    setForecastLoading(false);
  };

  const renderDashboard = () => (
    <>
      <section className="mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-2 font-inter uppercase">
          CONTROL PANEL
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[11px] md:text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
            Financial Intelligence 
            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Active Stream</span>
          </p>
          <button 
            onClick={handleSmartForecast}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none font-black text-[10px] tracking-[0.1em] transform hover:-translate-y-0.5"
          >
            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
            AI SMART FORECAST
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        {METRICS.map((metric, i) => (
          <StatsCard key={i} metric={metric} />
        ))}
      </section>

      <div className="grid grid-cols-12 gap-6 items-stretch mb-10">
        {/* Left Column - Core Insights & Trend */}
        <div className="col-span-12 lg:col-span-8 space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm h-full hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white uppercase">FINANCIAL PERFORMANCE</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Weekly Liquidity Flow</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                  <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                  <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Expenses</span>
                </div>
              </div>
            </div>

            <div className="h-[250px] md:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 9, fontWeight: 800}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 9, fontWeight: 800}}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
                    contentStyle={{borderRadius: '16px', border: 'none', backgroundColor: darkMode ? '#0f172a' : 'white', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                    labelStyle={{fontSize: '11px', fontWeight: 800, color: darkMode ? 'white' : 'black', marginBottom: '4px'}}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" animationDuration={1500} />
                  <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorExp)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Top Activity */}
        <div className="col-span-12 lg:col-span-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
          <ActivityFeed />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-6 pb-24 md:pb-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
        {/* Quick Actions */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white uppercase">QUICK COMMANDS</h3>
            <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
              <Zap size={14} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Invoice', icon: Plus, color: 'indigo' },
              { label: 'Expense', icon: ArrowUp, color: 'rose' },
              { label: 'Reports', icon: BarChart, color: 'emerald' },
              { label: 'Teams', icon: Layers, color: 'amber' }
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:scale-[1.02] active:scale-95 rounded-2xl transition-all group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                <action.icon size={22} className="mb-2 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Budget Monitoring */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white uppercase">BUDGET PACING</h3>
              <p className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                <CheckCircle2 size={10} />
                Optimal
              </p>
            </div>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600">
              <Target size={18} />
            </div>
          </div>
          <div className="mt-auto space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">MARKETING</span>
                <span className="text-[11px] font-black text-slate-900 dark:text-white">72%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 w-[72%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-1000" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">OPERATIONS</span>
                <span className="text-[11px] font-black text-slate-900 dark:text-white">45%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[45%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.3)] transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* Liabilities */}
        <div className="col-span-12 md:col-span-12 lg:col-span-4 group">
          <div className="h-full bg-slate-900 dark:bg-indigo-950 p-6 md:p-8 rounded-[32px] border border-slate-800 shadow-2xl text-white relative overflow-hidden transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-black italic tracking-widest font-inter mb-1 uppercase text-indigo-300">OUTSTANDING</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aggregate Debt</p>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                  <CreditCard size={20} className="text-indigo-400" />
                </div>
              </div>
              
              <div className="mt-6 mb-8">
                <span className="text-3xl md:text-4xl font-black font-inter text-amber-400 tracking-tighter">ETB 257.7K</span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-full text-[10px] font-black border border-rose-500/20">
                    <TrendingUp size={12} />
                    +4.2%
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">velocity growth</span>
                </div>
              </div>

              <div className="mt-auto">
                <button className="w-full group/btn relative overflow-hidden py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-900/50 border border-indigo-400/30">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    RECONCILE
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Modal */}
      {isForecastModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsForecastModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[80vh] animate-in zoom-in-95 duration-300">
            <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black italic tracking-tight font-inter dark:text-white">AI SMART FORECAST</h3>
                  <p className="text-[9px] md:text-[11px] text-slate-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Predictive Engine</p>
                </div>
              </div>
              <button 
                onClick={() => setIsForecastModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar prose-markdown">
              {forecastLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-100 dark:border-slate-800 rounded-full animate-spin border-t-indigo-600" />
                    <Sparkles size={24} className="absolute inset-0 m-auto text-indigo-600 animate-pulse" />
                  </div>
                  <p className="mt-6 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Analyzing Dynamics...</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-tight">Computing probabilistic outcomes</p>
                </div>
              ) : (
                <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-inter">
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/50 mb-6 flex items-start gap-3">
                    <Info size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-bold uppercase">MARKET VOLATILITY DETECTED. FORECAST NORMALIZED FOR ETHIOPIAN LIKLIQUIDITY VELOCITY.</p>
                  </div>
                  <ReactMarkdown>{forecastData || ''}</ReactMarkdown>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setIsForecastModalOpen(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Dismiss
              </button>
              <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-500 transition-all">
                Export Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#fbfcfd] dark:bg-slate-900 transition-colors duration-500 relative">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      {/* Main Content Area: Padding adjusted for mobile navigation and header */}
      <main className="flex-1 w-full p-4 md:p-10 md:ml-20 pt-8 pb-24 md:pb-10 overflow-x-hidden">
        {/* Fixed Header: Unified horizontal bar for Search, Theme, and Notifications */}
        <header className="flex items-center justify-between mb-8 md:mb-12 gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Logo placeholder for mobile */}
            <div className="md:hidden flex-shrink-0 w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
              <Layers size={20} />
            </div>
            
            <button 
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-3 md:gap-4 bg-white dark:bg-slate-800 px-3 md:px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200 transition-all group flex-1 max-w-sm"
            >
              <Search size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-black font-inter tracking-tight uppercase truncate">Terminal Search</span>
              <div className="hidden sm:flex items-center gap-1.5 ml-auto bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg text-[10px] font-black text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Command size={10} />
                <span>K</span>
              </div>
            </button>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-white dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-2xl transition-all border border-slate-100 dark:border-slate-700 shadow-sm active:scale-90"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-3 bg-white dark:bg-slate-800 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-2xl transition-all border border-slate-100 dark:border-slate-700 shadow-sm relative active:scale-90">
              <Bell size={18} />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-800 animate-pulse" />
            </button>
            <button className="hidden sm:flex items-center gap-3 pl-2 pr-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-xl shadow-indigo-100 dark:shadow-none group active:scale-95">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <Plus size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quick Add</span>
            </button>
          </div>
        </header>

        {activePage === 'dashboard' && renderDashboard()}
        {activePage === 'accounts' && <AccountsPage />}
        {activePage === 'invoices' && <InvoicesPage />}
        {activePage === 'settings' && <SettingsPage />}
        {activePage === 'reports' && <ReportsPage />}
        
        {/* Simplified Placeholder for other pages */}
        {activePage !== 'dashboard' && activePage !== 'accounts' && activePage !== 'invoices' && activePage !== 'settings' && activePage !== 'reports' && (
           <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-slate-800 rounded-[24px] flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 shadow-xl">
                <Layers size={40} />
              </div>
              <h2 className="text-2xl font-black italic text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">{activePage}</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Development In Progress</p>
           </div>
        )}
      </main>

      <AIAssistant />
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)}
        onSelect={handleCommandSelect}
      />
    </div>
  );
};

export default App;
