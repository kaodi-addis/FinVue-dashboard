
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

// Global interface extensions
declare global {
  // Added AIStudio interface to the global scope to resolve "same type" conflicts with platform definitions
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Fixed: Added optionality (?) to ensure modifiers match existing global declarations
    // and ensured the type refers to the global AIStudio interface.
    aistudio?: AIStudio;
  }
}
