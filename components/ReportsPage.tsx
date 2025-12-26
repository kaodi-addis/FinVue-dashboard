
import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  PieChart, 
  ArrowRight, 
  Sparkles, 
  ChevronDown,
  FileText,
  Clock,
  Zap,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell 
} from 'recharts';
import ReactMarkdown from 'react-markdown';
import { getFinancialAdvice } from '../services/geminiService';
import { METRICS } from '../constants';

const DISTRIBUTION_DATA = [
  { name: 'Marketing', value: 4500, color: '#6366f1' },
  { name: 'Operations', value: 3200, color: '#10b981' },
  { name: 'Development', value: 6800, color: '#f59e0b' },
  { name: 'Cloud/SaaS', value: 2100, color: '#ec4899' },
  { name: 'Misc', value: 1100, color: '#94a3b8' },
];

const ReportsPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const generateReportInsight = async () => {
    setIsGenerating(true);
    try {
      const context = {
        revenue: METRICS[0].value,
        expenses: METRICS[1].value,
        balance: METRICS[2].value,
        transactions: METRICS[3].value
      };
      const response = await getFinancialAdvice(
        "Generate a high-level executive report summary based on current spending distribution (Marketing: 25%, Ops: 18%, Dev: 38%, Cloud: 12%). Focus on ROI optimization and burn rate.", 
        context
      );
      setAiInsight(response);
    } catch (error) {
      setAiInsight("Unable to generate automated insight at this time.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-2 font-inter uppercase">
            Financial Reports
          </h1>
          <p className="text-[11px] md:text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
            Analytical Deep-Dive <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Q4 FISCAL DATA</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:shadow-lg transition-all">
            <Calendar size={14} />
            OCT - DEC 2023
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all">
            <Download size={14} />
            Export PDF
          </button>
        </div>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white uppercase">Category Distribution</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Expense Breakdown by Dept</p>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <PieChart size={18} className="text-indigo-600" />
            </div>
          </div>
          
          <div className="h-[300px] flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', color: '#fff', fontSize: '10px' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {DISTRIBUTION_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-900 dark:text-white">ETB {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden h-full flex flex-col">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={20} className="text-indigo-400" />
                <h3 className="text-sm font-black italic tracking-widest uppercase">AI Insight Generator</h3>
              </div>
              
              <div className="flex-1">
                {isGenerating ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-white/10 rounded-full w-3/4" />
                    <div className="h-4 bg-white/10 rounded-full w-full" />
                    <div className="h-4 bg-white/10 rounded-full w-1/2" />
                  </div>
                ) : aiInsight ? (
                  <div className="text-[11px] font-medium leading-relaxed text-indigo-100 prose-markdown max-h-[200px] overflow-y-auto scrollbar-hide">
                    <ReactMarkdown>{aiInsight}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-[11px] font-medium leading-relaxed text-slate-400 italic">
                    Click below to let FinVue AI analyze your quarterly metrics and provide optimization strategies.
                  </p>
                )}
              </div>

              <button 
                onClick={generateReportInsight}
                disabled={isGenerating}
                className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isGenerating ? 'Analyzing...' : 'Generate AI Insights'}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
           <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white uppercase">Historical Trends</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Revenue vs Operational Expense</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors border border-transparent hover:border-slate-100">
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={METRICS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="change" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-[11px] font-black italic tracking-tight text-slate-900 dark:text-white uppercase mb-6 tracking-widest">Recent Reports</h3>
          <div className="space-y-4">
            {[
              { name: 'Monthly Tax - Oct', type: 'PDF', date: '2 days ago' },
              { name: 'Q3 Growth Analysis', type: 'XLS', date: '1 week ago' },
              { name: 'Employee Payroll Hub', type: 'PDF', date: 'Oct 15' },
              { name: 'Infrastructure Audit', type: 'DOC', date: 'Oct 12' },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-slate-100 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{report.name}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{report.date}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">{report.type}</span>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
            View Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
