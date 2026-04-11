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
}

export interface TradingAccount extends AccountTemplate {
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

export interface Trade {
  id: number;
  date: string;
  pnl: number;
  account: {
    id: number;
    name: string;
    type: string;
  };
  journalEntry: JournalEntry;
}

export interface TradingDay {
  id: number;
  date: string;
  account: number;
  pnl: number;
  dayNumber?: number;
  trades: Trade[];
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
