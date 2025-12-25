
import { FinancialMetric, ActivityItem, ChartData } from './types';

export const METRICS: FinancialMetric[] = [
  { label: 'TOTAL REVENUE', value: 'ETB 105,000.00', change: 100, type: 'currency', trend: 'up', color: 'emerald' },
  { label: 'TOTAL EXPENSES', value: 'ETB 231,193.79', change: 289, type: 'currency', trend: 'up', color: 'rose' },
  { label: 'NET BALANCE', value: 'ETB -126,193.79', change: -112.3, type: 'currency', trend: 'down', color: 'rose' },
  { label: 'TRANSACTIONS', value: '67', change: 272.2, type: 'number', trend: 'up', color: 'indigo' },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'income', title: 'Salary - N/A', amount: 'ETB 45,000.00', timestamp: '1d ago', status: 'Completed' },
  { id: '2', type: 'expense', title: 'Office Supplies', amount: 'ETB 1,200.00', timestamp: '2d ago', status: 'Pending' },
  { id: '3', type: 'system', title: 'Monthly Audit Completed', timestamp: '3d ago' },
  { id: '4', type: 'expense', title: 'AWS Cloud Services', amount: 'ETB 8,400.00', timestamp: '4d ago', status: 'Completed' },
];

export const CHART_DATA: ChartData[] = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
  { id: 'accounts', icon: 'Wallet', label: 'Accounts' },
  { id: 'invoices', icon: 'FileText', label: 'Invoices' },
  { id: 'reports', icon: 'BarChart3', label: 'Reports' },
  { id: 'team', icon: 'Users', label: 'Team' },
  { id: 'settings', icon: 'Settings', label: 'Settings' },
];

export const COMMANDS = [
  { id: 'new-invoice', label: 'Create New Invoice', shortcut: 'N', category: 'Actions' },
  { id: 'add-expense', label: 'Log Expense', shortcut: 'E', category: 'Actions' },
  { id: 'export-report', label: 'Export PDF Report', shortcut: 'P', category: 'Reports' },
  { id: 'go-dashboard', label: 'Go to Dashboard', category: 'Navigation' },
  { id: 'go-settings', label: 'Go to Settings', category: 'Navigation' },
];
