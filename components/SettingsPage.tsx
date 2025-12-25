
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  CreditCard, 
  Key, 
  Smartphone, 
  CheckCircle2, 
  Camera,
  LogOut,
  Zap,
  Lock,
  Eye
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const SETTINGS_TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Alerts', icon: Bell },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-2 font-inter uppercase">
          Settings
        </h1>
        <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
          Identity Management <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">ALEX K.</span> 
        </p>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Navigation: Horizontal on mobile, Vertical on desktop */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-[24px] md:rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm p-2 md:p-4 lg:sticky lg:top-8 overflow-x-auto lg:overflow-x-visible">
            <nav className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
              {SETTINGS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 lg:w-full ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="hidden lg:block mt-8 pt-8 border-t border-slate-50 dark:border-slate-700">
              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-9 space-y-6 md:space-y-8">
          {activeTab === 'profile' && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="h-24 md:h-32 bg-gradient-to-r from-indigo-500 to-violet-600 relative">
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                </div>
                <div className="px-6 md:px-8 pb-8">
                  <div className="relative -mt-10 md:-mt-12 mb-6 md:mb-8 inline-block">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[28px] md:rounded-[32px] bg-slate-200 border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl shadow-indigo-100/50 dark:shadow-none relative group">
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-2xl md:text-3xl font-black text-slate-400">AK</div>
                      <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
                      <input type="text" defaultValue="Alex Kassa" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-[11px] font-black text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all uppercase" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <input type="email" defaultValue="alex.k@finvue.ai" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-[11px] font-black text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-10 uppercase" />
                        <CheckCircle2 size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Timezone</label>
                      <div className="relative">
                        <Globe size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-[11px] font-black text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none uppercase">
                          <option>GMT+03:00 Addis Ababa</option>
                          <option>GMT+00:00 London</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 md:p-8 rounded-[32px] border border-indigo-100 dark:border-indigo-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-[11px] font-black italic text-indigo-900 dark:text-indigo-400 uppercase mb-1">AI Personalization</h4>
                  <p className="text-[10px] text-indigo-700/70 dark:text-indigo-300/60 font-medium">Spending pattern analysis optimization.</p>
                </div>
                <button className="w-12 h-6 bg-indigo-600 rounded-full relative shadow-inner shrink-0">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8 md:pb-0">
                <button className="w-full sm:w-auto px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all">Cancel</button>
                <button className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 dark:shadow-none hover:scale-105 transition-all">Update Account</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black italic text-slate-900 dark:text-white uppercase tracking-tight">Security Protocol</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enhanced Identity Protection</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Smartphone, label: '2-Factor Auth', sub: 'Google Auth Connected', status: 'ENABLED' },
                    { icon: Key, label: 'Password', sub: 'Rotated 14 days ago', status: 'ROTATE' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.label}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.sub}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white dark:bg-slate-800 rounded-lg ${item.status === 'ENABLED' ? 'text-emerald-500' : 'text-indigo-500'}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 dark:bg-indigo-950 p-6 md:p-8 rounded-[32px] border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Zap size={18} className="text-amber-400" />
                      <h3 className="text-[11px] font-black italic text-white uppercase tracking-tight">AI SECURITY SCAN</h3>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">Analyzing...</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                    <div className="flex items-start gap-4">
                      <Eye size={20} className="text-indigo-400 mt-0.5" />
                      <p className="text-[11px] text-slate-200 font-medium leading-relaxed uppercase tracking-tighter">"Login hygiene is optimal. No anomalous packet spikes detected for current node."</p>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Access System Log
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
