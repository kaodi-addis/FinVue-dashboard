
import React from 'react';
/* Added ChevronRight to imports */
import { ArrowDownLeft, ArrowUpRight, ShieldCheck, MoreHorizontal, History, ChevronRight } from 'lucide-react';
import { RECENT_ACTIVITY } from '../constants';

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
            <History size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white">SYSTEM LOG</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">Real-time Feed</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="space-y-3">
          {RECENT_ACTIVITY.map((item, idx) => (
            <div 
              key={item.id} 
              className="group p-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 rounded-2xl transition-all cursor-pointer flex items-center gap-4 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 active:scale-[0.98] animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`p-3 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110 ${
                item.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                item.type === 'expense' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-500'
              }`}>
                {item.type === 'income' ? <ArrowDownLeft size={16} strokeWidth={2.5} /> : 
                 item.type === 'expense' ? <ArrowUpRight size={16} strokeWidth={2.5} /> : 
                 <ShieldCheck size={16} strokeWidth={2.5} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-slate-900 dark:text-slate-200 truncate font-inter uppercase tracking-tight">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest">{item.timestamp}</span>
                  {item.status && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {item.status}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {item.amount && (
                <div className="text-right">
                  <span className={`text-[11px] font-black font-inter tracking-tighter ${item.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    {item.amount}
                  </span>
                  <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Gross Value</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-700 text-center">
        <button className="group w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-all flex items-center justify-center gap-2">
          EXPLORE ALL TRANSACTIONS
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
