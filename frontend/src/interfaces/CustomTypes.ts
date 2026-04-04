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
  image?: string;
  name?: string;
  firm?: string;
  accountSize?: number;
  minDaysToPayout?: number;
  minBufferTarget?: number;
  allowablePayoutRequest?: number;
  profitSplit?: number;
  minDayProfit?: number;
  maxDrawdown?: number;
  evalTemplate: boolean;
  profitTarget?: number;
  consistency?: number;
}

export interface Trade {
  id: number;
  date: string;
  pnl: number;
  accountName: string;
  accountId: number;
}
