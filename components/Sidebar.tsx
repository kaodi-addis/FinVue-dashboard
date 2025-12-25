
import React from 'react';
import * as Icons from 'lucide-react';
import { SIDEBAR_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-6 z-50">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4">
        <Icons.Mountain size={24} />
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        {SIDEBAR_ITEMS.map((item, idx) => {
          const Icon = (Icons as any)[item.icon];
          return (
            <button
              key={idx}
              className={`p-3 rounded-xl transition-all duration-200 group relative ${
                item.active 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <Icon size={20} strokeWidth={item.active ? 2.5 : 2} />
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border-2 border-white ring-2 ring-indigo-50 cursor-pointer hover:ring-indigo-100 transition-all">
          AK
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
