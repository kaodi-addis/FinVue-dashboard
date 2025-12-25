
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileDown,
  ChevronRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';

const INVOICE_STATS = [
  { label: 'TOTAL INVOICED', value: 'ETB 1.2M', trend: '+12%', color: 'indigo' },
  { label: 'PENDING', value: 'ETB 45.2K', trend: '-2%', color: 'amber' },
  { label: 'OVERDUE', value: 'ETB 12.8K', trend: '+5%', color: 'rose' },
  { label: 'PAID', value: 'ETB 182K', trend: '+28%', color: 'emerald' },
];

const INVOICES = [
  { id: 'INV-2023-001', client: 'Starlight Tech', date: 'Oct 24', dueDate: 'Nov 24', amount: 'ETB 15K', status: 'Paid' },
  { id: 'INV-2023-002', client: 'Nebula Systems', date: 'Oct 26', dueDate: 'Nov 26', amount: 'ETB 8.4K', status: 'Pending' },
  { id: 'INV-2023-003', client: 'Oceanic Corp', date: 'Oct 20', dueDate: 'Nov 20', amount: 'ETB 12.8K', status: 'Overdue' },
];

const InvoicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-100 dark:border-amber-800';
      case 'Overdue': return 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-100 dark:border-rose-800';
      default: return 'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle2 size={10} />;
      case 'Pending': return <Clock size={10} />;
      case 'Overdue': return <AlertCircle size={10} />;
      default: return <FileText size={10} />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-2 font-inter uppercase">
            Invoices
          </h1>
          <p className="text-[11px] md:text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
            Managing <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">128 active entries</span> 
          </p>
        </div>
        
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-xl shadow-indigo-100 dark:shadow-none group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Invoice</span>
        </button>
      </header>

      {/* Stats Section: 2 columns on mobile, 4 on large */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
        {INVOICE_STATS.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-[24px] border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <span className="text-[8px] md:text-[10px] font-black tracking-widest text-slate-500 uppercase">{stat.label}</span>
            </div>
            <h3 className="text-base md:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{stat.value}</h3>
            <span className={`text-[8px] md:text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} uppercase mt-1 inline-block`}>
              {stat.trend}
            </span>
            <div className={`absolute -right-4 -bottom-4 w-12 md:w-20 h-12 md:h-20 bg-${stat.color}-500/5 rounded-full blur-xl md:blur-2xl`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-700 flex flex-col gap-6 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Horizontal tab scroll on mobile */}
            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner overflow-x-auto scrollbar-hide">
              {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shrink-0 ${
                    activeTab === tab 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search by client..." className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
              </div>
              <button className="w-full sm:w-auto p-3.5 bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-700 rounded-2xl hover:text-indigo-600 transition-all flex items-center justify-center">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Client & ID</th>
                  <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Issue Date</th>
                  <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {INVOICES.filter(inv => activeTab === 'All' || inv.status === activeTab).map((inv, i) => (
                  <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{inv.client}</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{inv.id}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">{inv.date}</span>
                    </td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${getStatusStyle(inv.status)}`}>
                        {getStatusIcon(inv.status)}
                        {inv.status}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-xs font-black font-inter tracking-tighter text-slate-900 dark:text-white">{inv.amount}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <Download size={14} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <Mail size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
            <h3 className="text-[10px] font-black italic tracking-widest mb-6 uppercase text-indigo-300">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-3 border border-white/10 transition-all text-[9px] font-black uppercase tracking-widest">
                <FileDown size={18} className="text-indigo-400" />
                Export Tax Rpt
              </button>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-3 border border-white/10 transition-all text-[9px] font-black uppercase tracking-widest">
                <FileDown size={18} className="text-emerald-400" />
                Paid History
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-[10px] font-black italic tracking-tight text-slate-900 dark:text-white uppercase mb-4 tracking-widest">Settlement</h3>
            <div className="space-y-3">
              {[
                { label: 'TeleBirr', color: 'emerald' },
                { label: 'CBE Direct', color: 'indigo' },
              ].map((link, i) => (
                <button key={i} className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group">
                  <span className="text-[9px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{link.label}</span>
                  <ChevronRight size={12} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
