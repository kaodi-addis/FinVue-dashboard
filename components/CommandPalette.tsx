
import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight } from 'lucide-react';
import { COMMANDS } from '../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = COMMANDS.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-700">
          <Search className="text-slate-400 mr-3" size={20} />
          <input 
            autoFocus
            type="text" 
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500">
            <span className="text-xs">ESC</span>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-slate-400">No commands found for "{query}"</p>
            </div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => { onSelect(cmd.id); onClose(); }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{cmd.label}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">{cmd.category}</span>
                </div>
                {cmd.shortcut && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <kbd className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400">
                      {cmd.shortcut}
                    </kbd>
                    <ArrowRight size={12} className="text-indigo-500 ml-1" />
                  </div>
                )}
              </button>
            ))
          )}
        </div>
        
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <Command size={10} /> + K Search
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <ArrowRight size={10} /> Select
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
