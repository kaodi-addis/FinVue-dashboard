
import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Plus, 
  ArrowUp, 
  LayoutGrid, 
  Layers, 
  BarChart, 
  Calendar, 
  MoreVertical,
  CheckCircle2,
  AlertCircle
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

import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import ActivityFeed from './components/ActivityFeed';
import AIAssistant from './components/AIAssistant';
import { METRICS, CHART_DATA } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 pt-6">
        {/* Header Bar */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 tracking-widest uppercase font-inter">
            <span>DASHBOARD</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">OVERVIEW</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-xl transition-all border border-transparent hover:border-slate-100">
              <Moon size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-xl transition-all border border-transparent hover:border-slate-100 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-xl transition-all border border-transparent hover:border-slate-100">
              <Search size={20} />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 mb-2 font-inter">
            CONTROL PANEL
          </h1>
          <p className="text-sm text-slate-500 font-medium">Financial overview and recent activity</p>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {METRICS.map((metric, i) => (
            <StatsCard key={i} metric={metric} />
          ))}
        </section>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Upcoming Payments */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="mb-8">
                <h3 className="text-sm font-black italic tracking-tight font-inter">UPCOMING PAYMENTS</h3>
                <p className="text-[11px] text-slate-400">Next 7 days</p>
              </div>
              <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                <CheckCircle2 size={32} strokeWidth={1.5} className="mb-4 text-emerald-400" />
                <p className="text-sm font-bold text-slate-900">All Clear</p>
                <p className="text-[11px] font-medium text-slate-400">No payments due in the next 7 days</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="mb-6">
                <h3 className="text-sm font-black italic tracking-tight font-inter">QUICK ACTIONS</h3>
                <p className="text-[11px] text-slate-400">Command center</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Add Expense', icon: Plus },
                  { label: 'Add Income', icon: ArrowUp },
                  { label: 'Batch Entry', icon: Layers },
                  { label: 'View Reports', icon: BarChart }
                ].map((action, i) => (
                  <button key={i} className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group">
                    <action.icon size={20} className="mb-2 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    <span className="text-[11px] font-bold text-slate-600">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

             {/* Outstanding */}
             <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="mb-6">
                <h3 className="text-sm font-black italic tracking-tight font-inter">OUTSTANDING</h3>
                <p className="text-[11px] text-slate-400">Liabilities & Payables</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Payables</span>
                  <span className="text-xs font-black text-slate-900 font-inter">ETB 67,700.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Liabilities</span>
                  <span className="text-xs font-black text-slate-900 font-inter">ETB 190,000.00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl mt-4">
                  <span className="text-xs font-bold text-slate-700">Total Outstanding</span>
                  <span className="text-sm font-black text-amber-500 font-inter">ETB 257,700.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Financial Trend Chart */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-sm font-black italic tracking-tight font-inter">FINANCIAL TREND</h3>
                  <p className="text-[11px] text-slate-400">Last 7 days overview</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Expenses</span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                      labelStyle={{fontSize: '12px', fontWeight: 800, marginBottom: '4px'}}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Full */}
            <div className="h-[400px]">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Floating Button & Modal */}
      <AIAssistant />
    </div>
  );
};

export default App;
