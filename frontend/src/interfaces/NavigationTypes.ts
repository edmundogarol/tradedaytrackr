export enum PageEnum {
  Login = "/login",
  SignUp = "/signUp",
  ResetPassword = "/resetPassword",
  ResetPasswordConfirmation = "/confirmResetPassword",
  PageNotFound = "/pageNotFound",
  Dashboard = "/dashboard",
  Journal = "/journal",
  JournalEntry = "/journalEntry",
  FundedAccounts = "/fundedAccounts",
  EvaluationAccounts = "/evaluationAccounts",
  FundedAccountDetail = "/fundedAccountDetail",
  EvaluationAccountDetail = "/evaluationAccountDetail",
  TradeStats = "/tradeStats",
  PayoutTracking = "/payouts",
  AccountSettings = "/accountSettings",
  Preferences = "/preferences",
  Billing = "/billing",
  PrivacyPolicy = "/privacy",
  TermsOfService = "/terms",
  FrequentlyAskedQuestions = "/faq",
  ContactUs = "/contactUs",
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
  [PageEnum.Billing]: undefined;
};

export type UnauthenticatedStackNavigatorParams = {
  [PageEnum.Login]: undefined;
  [PageEnum.SignUp]: undefined;
  [PageEnum.ResetPassword]: undefined;
  [PageEnum.ResetPasswordConfirmation]: { token: string };
  [PageEnum.PageNotFound]: undefined;
  [PageEnum.PrivacyPolicy]: undefined;
  [PageEnum.TermsOfService]: undefined;
  [PageEnum.FrequentlyAskedQuestions]: undefined;
  [PageEnum.ContactUs]: undefined;
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
