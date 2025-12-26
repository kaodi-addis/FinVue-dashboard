
import React from 'react';
import { Landmark, Wallet, CreditCard, Plus, MoreVertical, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';

const ACCOUNTS = [
  { id: '1', name: 'Commercial Bank of Ethiopia', type: 'Bank', balance: 'ETB 85,240.00', number: '**** 4592', color: 'indigo', trend: '+12%' },
  { id: '2', name: 'Digital Wallet', type: 'Savings', balance: 'ETB 12,400.00', number: 'ID: 992011', color: 'emerald', trend: '+5.4%' },
  { id: '3', name: 'Business Platinum', type: 'Credit', balance: 'ETB -7,820.00', number: '**** 1102', color: 'rose', trend: '-2.1%' },
  { id: '4', name: 'Investment Fund', type: 'Stocks', balance: 'ETB 450,000.00', number: 'ACC: 88721', color: 'violet', trend: '+18.5%' },
];

interface AccountsPageProps {
  onConnectAsset?: () => void;
}

const AccountsPage: React.FC<AccountsPageProps> = ({ onConnectAsset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-2 font-inter uppercase">
            Accounts
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
            Managing <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-tighter">4 connected assets</span> 
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm shrink-0">
            <button className="px-3 md:px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all">All</button>
            <button className="px-3 md:px-4 py-2 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all">Banks</button>
            <button className="px-3 md:px-4 py-2 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all">Credit</button>
          </div>
          <button className="p-3 bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 rounded-2xl hover:text-indigo-600 transition-all shadow-sm shrink-0">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {ACCOUNTS.map((account) => (
          <div key={account.id} className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${
                account.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                account.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                account.color === 'rose' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
              }`}>
                {account.type === 'Bank' ? <Landmark size={22} /> : 
                 account.type === 'Credit' ? <CreditCard size={22} /> : 
                 <Wallet size={22} />}
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{account.type}</p>
              <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                {account.name}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 tracking-widest">{account.number}</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-0.5">Balance</p>
                <p className={`text-lg md:text-xl font-black font-inter tracking-tighter ${account.color === 'rose' ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                  {account.balance}
                </p>
              </div>
              <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-lg ${account.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                {account.trend.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {account.trend}
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={onConnectAsset}
          className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-4 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group min-h-[160px]"
        >
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:rotate-90 transition-all shadow-sm">
            <Plus size={20} />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Connect Asset</p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <h3 className="text-sm font-black italic tracking-tight font-inter text-slate-900 dark:text-white uppercase">ACTIVITY LOG</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Recent Transaction Feed</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Filter log..." className="w-full sm:w-48 pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] outline-none transition-all uppercase font-black" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Account</th>
                  <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { desc: 'Apple Services', acc: 'Business Plat', cat: 'Software', amt: '-ETB 1,200.00', date: '2:45 PM' },
                  { desc: 'Stripe Payout', acc: 'CBE Bank', cat: 'Revenue', amt: '+ETB 45,000.00', date: '11:20 AM' },
                  { desc: 'Amazon AWS', acc: 'Business Plat', cat: 'Cloud', amt: '-ETB 8,400.00', date: 'Yesterday' },
                ].map((t, i) => (
                  <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.desc}</span>
                        <span className="text-[9px] text-slate-500 font-medium uppercase tracking-tighter">{t.date}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">{t.acc}</span>
                    </td>
                    <td className="p-5">
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">{t.cat}</span>
                    </td>
                    <td className={`p-5 text-right text-xs font-black font-inter tracking-tighter ${t.amt.startsWith('+') ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                      {t.amt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
