
import React from 'react';
import * as Icons from 'lucide-react';
import { SIDEBAR_ITEMS } from '../constants';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col items-center py-6 gap-6 z-50">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-200 dark:shadow-none">
          <Icons.Mountain size={24} />
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          {SIDEBAR_ITEMS.map((item, idx) => {
            const Icon = (Icons as any)[item.icon];
            const isActive = activePage === item.id;
            return (
              <button
                key={idx}
                onClick={() => setActivePage(item.id)}
                className={`p-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 font-bold tracking-wider">
                  {item.label.toUpperCase()}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 border-2 border-white dark:border-slate-700 ring-2 ring-indigo-50 dark:ring-slate-800 cursor-pointer hover:ring-indigo-100 dark:hover:ring-slate-700 transition-all">
            AK
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-4 z-[100] safe-area-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {SIDEBAR_ITEMS.slice(0, 5).map((item, idx) => {
          const Icon = (Icons as any)[item.icon];
          const isActive = activePage === item.id;
          return (
            <button
              key={idx}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive 
                ? 'text-indigo-600 dark:text-indigo-400 scale-110' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-black uppercase tracking-tighter">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
