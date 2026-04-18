import type { JournalEntry } from "@pages/Journal/JournalInterfaces";

export interface CustomWindow extends Window {
  host: string;
  navigator: any;
  baseURL: string;
}

export enum Privileges {
  SUPER = "super",
  ADMIN = "admin",
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  birth_date?: string;
  logged_in: boolean;
  is_staff: boolean;
  is_verified: boolean;
  membership_active?: boolean;
  last_ip?: string;
  verification_sent_at?: string;
  verification_token?: string;
  last_login?: string;
  email_preferences?: {
    payout_reports?: boolean;
    system_notifications?: boolean;
    promotional_offers?: boolean;
    unsubscribe_all?: boolean;
  };
  timezone?: string;
}

export interface UserPasswordUpdateData {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface AccountTemplate {
  id: number;
  name: string;
  firm?: string;
  accountSize: number;
  isEval: boolean;
  icon?: string;
  image?: string;
  displayImage?: string;
  profitTarget?: number;
  profitSplit?: number;
  minBuffer?: number;
  minTradingDays?: number;
  minDayPnl?: number;
  maxDrawdown?: number;
  consistency?: number;
  minPayoutRequest?: number;
  maxPayoutRequest?: number;
  rules?: Rule[] | string[];
  withdrawalSplit?: number;
  isArchived: boolean;
}

export interface TradingAccount extends AccountTemplate {
  accountName?: string;
  accountBalance: number;
  baseline_balance: number;
  accountType: {
    id: number;
    name: string;
    isEval: boolean;
    firm: string;
  };
  bufferPercent: number;
  minBuffer: number;
  dayValues: TradingDay[];
  currentDayCount: number;
  minPayoutRequest: number;
  maxPayoutRequest: number;
  postPayoutBuffer: number;
  withdrawableAmount: number;
  consistencyScore?: number;
}

export interface EvaluationAccount extends AccountTemplate {
  accountBalance: number;
  accountType: {
    id: number;
    name: string;
    isEval: boolean;
    firm: string;
  };
  dayValues: TradingDay[];
  currentDayCount: number;
  consistencyScore: number;
  profitTarget: number;
}

export interface Trade {
  id: number;
  date: string;
  pnl: number | null;
  account: {
    id: number;
    name: string;
    type: string;
  };
  journalEntry: JournalEntry | null;
  isPayout?: boolean;
  isEval?: boolean;
}

export interface TradingDay {
  id: number;
  date: string;
  account: number;
  pnl: number;
  dayNumber?: number;
  trades: Trade[];
  hasPayout: boolean;
}

export interface Tag {
  id: number;
  name: string;
  uses: number;
}

export interface Rule {
  name: string;
  id: number;
  rule_type: string;
  description: string;
}

export interface Payout {
  id: number;
  account: number;
  amount: number;
  payout_date: string;
  balance_before: number;
  balance_after: number;
  created_at: string;
}

export interface DashboardSummaries {
  upcomingPayout: {
    expected: number;
    projectedDate: string;
    daysCompleted: number;
    minDays: number;
    firmName?: string;
    daysRemaining: number;
  };
  currentStats: {
    withdrawablePnl: number;
    daysToPayout: number;
    activePas: number;
    nearPayout: boolean;
    winRate: number;
  };
  fundingOverview: {
    totalActiveFunding: number;
    firms: { [firmName: string]: number };
  };
  evaluations: {
    passed: number;
    total: number;
  };
  buffer: {
    groups: {
      accountCount: number;
      bufferLeft: number;
      minBuffer: number;
      firms: string[];
    }[];
  };
}
