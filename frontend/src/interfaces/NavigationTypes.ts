export enum PageEnum {
  Login = "/login",
  PageNotFound = "/pageNotFound",
  Dashboard = "/dashboard",
  Journal = "/journalList",
  JournalEntry = "/journalEntry",
  FundedAccounts = "/fundedAccounts",
  EvaluationAccounts = "/evaluationAccounts",
  FundedAccountDetail = "/fundedAccountDetail",
  EvaluationAccountDetail = "/evaluationAccountDetail",
  TradeStats = "/tradeStats",
  Reports = "/reports",
  PayoutTracking = "/payouts",
  Calendar = "/calendar",
  AccountSettings = "/accountSettings",
  Preferences = "/preferences",
}

export type AuthenticatedStackNavigatorParams = {
  [PageEnum.Dashboard]: undefined;
  [PageEnum.Journal]: undefined;
  [PageEnum.JournalEntry]: { id: number };
  [PageEnum.FundedAccounts]: undefined;
  [PageEnum.EvaluationAccounts]: undefined;
  [PageEnum.FundedAccountDetail]: { id: number };
  [PageEnum.EvaluationAccountDetail]: { id: number };
  [PageEnum.TradeStats]: undefined;
  [PageEnum.PayoutTracking]: undefined;
  [PageEnum.AccountSettings]: undefined;
  [PageEnum.Preferences]: undefined;
  [PageEnum.Reports]: undefined;
};

export type UnauthenticatedStackNavigatorParams = {
  [PageEnum.Login]: undefined;
  [PageEnum.PageNotFound]: undefined;
};

export interface Navigation {
  navigate: (page: PageEnum, params?: any) => void;
  replace: (page: PageEnum, params?: any) => void;
  goBack: () => void;
  getCurrentPageName: () => PageEnum | null;
}

export interface WebNavigation extends Navigation {
  createSearch: (params: { [key: string]: any }) => string;
  getSearchParams: () => URLSearchParams;
}
