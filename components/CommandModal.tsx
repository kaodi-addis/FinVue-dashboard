
import React, { useState } from 'react';
import { X, Check, Landmark, FileText, CreditCard, Users, Zap, Sparkles } from 'lucide-react';

export type CommandType = 'invoice' | 'expense' | 'asset' | 'team' | 'report';

interface CommandModalProps {
  isOpen: boolean;
  type: CommandType | null;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

const CommandModal: React.FC<CommandModalProps> = ({ isOpen, type, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !type) return null;

  const config = {
    invoice: { title: 'Create Invoice', icon: FileText, color: 'indigo', label: 'Client Name' },
    expense: { title: 'Log Expense', icon: CreditCard, color: 'rose', label: 'Merchant' },
    asset: { title: 'Connect Asset', icon: Landmark, color: 'emerald', label: 'Bank Name' },
    team: { title: 'Add Member', icon: Users, color: 'amber', label: 'Email' },
    report: { title: 'Generate Report', icon: Zap, color: 'violet', label: 'Report Name' },
  }[type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(`${config.title} completed successfully.`);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[32px] md:rounded-[32px] shadow-2xl border-t md:border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 safe-p-bottom">
        <div className={`h-2 bg-${config.color}-500 transition-all duration-1000 ${isSubmitting ? 'w-full' : 'w-0'}`} />
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-${config.color}-50 dark:bg-${config.color}-900/20 text-${config.color}-600 rounded-2xl`}>
                <config.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic tracking-tight text-slate-900 dark:text-white uppercase font-inter">
                  {config.title}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Terminal Execution</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-90">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{config.label}</label>
              <input 
                required
                autoFocus
                type="text" 
                placeholder={`Enter ${config.label.toLowerCase()}...`}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-base md:text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Amount / Detail</label>
                <input 
                  type="text" 
                  placeholder="Optional"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-base md:text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Category</label>
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-[11px] md:text-[10px] font-bold text-slate-500 uppercase flex items-center h-[58px] md:h-auto">
                  Default Sync
                </div>
              </div>
            </div>

            <div className="pt-2 md:pt-4">
              <button 
                disabled={isSubmitting}
                className={`w-full py-5 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <>
                    <Zap size={14} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Confirm Action
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/50 flex items-center gap-3">
            <Sparkles size={16} className="text-indigo-600 shrink-0" />
            <p className="text-[9px] text-indigo-700 dark:text-indigo-400 font-bold uppercase tracking-tight leading-relaxed">
              AI Smart Auto-Sync enabled for this transaction path.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandModal;
