
export interface FinancialMetric {
  label: string;
  value: string;
  change: number;
  type: 'currency' | 'number';
  trend: 'up' | 'down';
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'income' | 'expense' | 'system';
  title: string;
  amount?: string;
  timestamp: string;
  status?: string;
}

export interface ChartData {
  name: string;
  revenue: number;
  expenses: number;
}
