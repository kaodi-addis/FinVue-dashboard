
import React from 'react';
import { ArrowDownLeft, ArrowUpRight, ShieldCheck, MoreHorizontal } from 'lucide-react';
import { RECENT_ACTIVITY } from '../constants';

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black italic tracking-tight font-inter">RECENT ACTIVITY</h3>
          <p className="text-[11px] text-slate-400">Latest system events</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.id} className="group p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer flex items-center gap-4">
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                item.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 
                item.type === 'expense' ? 'bg-rose-50 text-rose-600' : 
                'bg-slate-50 text-slate-400'
              }`}>
                {item.type === 'income' ? <ArrowDownLeft size={16} /> : 
                 item.type === 'expense' ? <ArrowUpRight size={16} /> : 
                 <ShieldCheck size={16} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700 truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">{item.timestamp}</span>
                  {item.status && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{item.status}</span>
                    </>
                  )}
                </div>
              </div>

              {item.amount && (
                <span className={`text-xs font-black font-inter ${item.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {item.amount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
        <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
