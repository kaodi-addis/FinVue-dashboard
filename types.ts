
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

// Added AIStudio interface to ensure global compatibility with platform typings
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

// Global interface extensions
declare global {
  interface Window {
    // Fixed: Updated aistudio property to use the expected AIStudio type name
    aistudio: AIStudio;
  }
}
