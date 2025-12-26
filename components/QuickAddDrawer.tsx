
import React, { useEffect } from 'react';
import { 
  X, 
  Plus, 
  FileText, 
  CreditCard, 
  Users, 
  BarChart, 
  Briefcase, 
  TrendingUp,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface QuickAddDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickAddDrawer: React.FC<QuickAddDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const OPTIONS = [
    { id: 'invoice', label: 'Create Invoice', icon: FileText, color: 'indigo', desc: 'Generate & send billings' },
    { id: 'expense', label: 'Log Expense', icon: CreditCard, color: 'rose', desc: 'Track spending flow' },
    { id: 'customer', label: 'Add Client', icon: Users, color: 'emerald', desc: 'New business entity' },
    { id: 'report', label: 'Gen Report', icon: BarChart, color: 'amber', desc: 'Insight generation' },
    { id: 'project', label: 'Start Project', icon: Briefcase, color: 'violet', desc: 'Milestone tracking' },
    { id: 'budget', label: 'Set Budget', icon: TrendingUp, color: 'blue', desc: 'Spending limiters' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-stretch md:justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div 
        className={`
          relative w-full md:w-[400px] bg-white dark:bg-slate-900 md:h-full 
          rounded-t-[40px] md:rounded-t-none md:rounded-l-[40px] 
          shadow-2xl border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800
          animate-in slide-in-from-bottom md:slide-in-from-right duration-500
          flex flex-col overflow-hidden max-h-[85vh] md:max-h-full
        `}
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/30">
          <div>
            <h3 className="text-xl font-black italic tracking-tight text-slate-900 dark:text-white uppercase font-inter">QUICK ADD</h3>
            <p className="text-[10px] font-black text-slate-400 dark:text-indigo-400 uppercase tracking-widest mt-1">Accelerated Workflows</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="space-y-4">
            {OPTIONS.map((opt, idx) => (
              <button 
                key={opt.id}
                className="w-full group flex items-center gap-5 p-5 rounded-[28px] bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6
                  ${opt.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' : 
                    opt.color === 'rose' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400' :
                    opt.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' :
                    opt.color === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' :
                    opt.color === 'violet' ? 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400' :
                    'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'}
                `}>
                  <opt.icon size={24} />
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{opt.label}</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{opt.desc}</p>
                </div>

                <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                  <ChevronRight size={14} className="text-slate-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-950/30">
          <div className="bg-indigo-600 rounded-[28px] p-6 text-white relative overflow-hidden group shadow-xl shadow-indigo-100 dark:shadow-none">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200">AI Enhancement</p>
                <h4 className="text-xs font-black uppercase mt-1">Smart Auto-Detect</h4>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20">
                <Sparkles size={18} className="animate-pulse" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
          <p className="text-center text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mt-6">FinVue Global Engine</p>
        </div>
      </div>
    </div>
  );
};

export default QuickAddDrawer;
