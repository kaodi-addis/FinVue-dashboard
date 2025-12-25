
import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { FinancialMetric } from '../types';

interface StatsCardProps {
  metric: FinancialMetric;
}

const StatsCard: React.FC<StatsCardProps> = ({ metric }) => {
  const isNegative = metric.change < 0;
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
    rose: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400',
    indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400',
  };

  const trendColor = isNegative ? 'text-rose-600' : 'text-emerald-600';

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden cursor-default">
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase font-inter">
          {metric.label}
        </span>
        <div className={`p-2.5 rounded-xl transition-transform group-hover:rotate-12 ${colorMap[metric.color]}`}>
          <ArrowUpRight size={18} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className={`text-2xl font-black font-inter tracking-tight ${metric.color === 'rose' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
          {metric.value}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className={`p-1 rounded-full ${isNegative ? 'bg-rose-50 dark:bg-rose-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'}`}>
            {metric.trend === 'up' ? (
              <TrendingUp size={12} className={trendColor} />
            ) : (
              <TrendingDown size={12} className={trendColor} />
            )}
          </div>
          <span className={`text-[11px] font-black ${trendColor} uppercase tracking-tight`}>
            {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}% <span className="text-slate-400 font-bold ml-1">THIS WEEK</span>
          </span>
        </div>
      </div>

      <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-gradient-to-br from-transparent to-slate-50 dark:to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default StatsCard;
