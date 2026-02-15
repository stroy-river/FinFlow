
import React from 'react';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER'
}

export type LedgerType = 'official' | 'internal' | 'all';
export type OrganizationType = 'IP' | 'OOO' | 'CASH' | 'CRYPTO';
export type UserRole = 'owner' | 'admin' | 'accountant';

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  action: 'create' | 'update' | 'ai_suggest' | 'ai_confirm' | 'payment_sent';
  changes: Record<string, any>;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  fxRate?: number;
  type: TransactionType;
  category: string;
  description: string;
  account: string;
  orgId?: string;
  ledger?: 'white' | 'black';
  status: 'completed' | 'pending' | 'planned' | 'processing';
  isAutoCategorized?: boolean;
  linkedTransferId?: string;
  auditLog?: AuditEntry[];
  activityType?: 'operating' | 'financial' | 'investing';
  invoiceId?: string;
}

export interface Invoice {
  id: string;
  contractorId: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'unpaid' | 'authorized' | 'paid' | 'rejected';
  fileUrl?: string;
  description: string;
  plannedTransactionId?: string;
}

export interface PaymentOrder {
  id: string;
  invoiceId: string;
  bankAccountId: string;
  executionDate: string;
  priority: 'normal' | 'urgent';
  status: 'draft' | 'sent_to_bank' | 'executed' | 'failed';
  bankRefId?: string;
}

export interface Account {
  id: string;
  orgId: string;
  name: string;
  balance: number;
  currency: string;
  type: 'bank' | 'cash' | 'card' | 'acquiring' | 'crypto';
  ledger: 'white' | 'black';
  lastSync?: string;
  integrationStatus?: 'connected' | 'disconnected' | 'error';
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  inn?: string;
  color?: string;
}

export interface Partner {
  id: string;
  name: string;
  share: number;
  capitalContributed: number;
  withdrawableDividends: number;
}

export interface Contractor {
  id: string;
  name: string;
  totalVolume: number;
  inn?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  condition: {
    textContains: string;
  };
  action: {
    category: string;
    projectId?: string;
  };
  priority: number;
  isActive: boolean;
  usageCount: number;
}

export interface MonthlyMetric {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  taxes?: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category?: 'main' | 'reports' | 'admin' | 'directory' | 'accounting';
}

export interface Loan {
  id: string;
  orgId: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  status: 'active' | 'closed';
  bankName: string;
  interestRate: number;
  endDate: string;
}

export interface Budget {
  id: string;
  orgId: string;
  category: string;
  plannedAmount: number;
  actualAmount: number;
  period: string;
}
