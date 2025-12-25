
import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { FinancialMetric } from '../types';

interface StatsCardProps {
  metric: FinancialMetric;
}

const StatsCard: React.FC<StatsCardProps> = ({ metric }) => {
  const isNegative = metric.change < 0;
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-600 bg-emerald-50',
    rose: 'text-rose-600 bg-rose-50',
    indigo: 'text-indigo-600 bg-indigo-50',
  };

  const textSecondary = isNegative ? 'text-rose-500' : 'text-emerald-500';

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-extrabold tracking-[0.1em] text-slate-400 uppercase font-inter">
          {metric.label}
        </span>
        <div className={`p-2 rounded-xl ${colorMap[metric.color]}`}>
          <ArrowUpRight size={16} />
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className={`text-2xl font-bold font-inter ${metric.color === 'rose' ? 'text-rose-600' : 'text-slate-900'}`}>
          {metric.value}
        </h3>
        <div className="flex items-center gap-1">
          {metric.trend === 'up' ? (
            <TrendingUp size={14} className={textSecondary} />
          ) : (
            <TrendingDown size={14} className={textSecondary} />
          )}
          <span className={`text-xs font-bold ${textSecondary}`}>
            {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}% vs last week
          </span>
        </div>
      </div>

      {/* Subtle decorative background glow */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-2xl" />
    </div>
  );
};

export default StatsCard;
