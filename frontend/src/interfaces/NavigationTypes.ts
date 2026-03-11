export enum PageEnum {
  RootNavigator = "/root",
  Login = "/login",
  SignUp = "/signUp",
  ResetPassword = "/resetPassword",
  PageNotFound = "/pageNotFound",
  Dashboard = "/dashboard",
  Journal = "/journal",
  JournalEntry = "/journalEntry",
  FundedAccounts = "/fundedAccounts",
  EvaluationAccounts = "/evaluationAccounts",
  FundedAccountDetail = "/fundedAccountDetail",
  EvaluationAccountDetail = "/evaluationAccountDetail",
}

export type AuthenticatedStackNavigatorParams = {
  [PageEnum.RootNavigator]: undefined;
  [PageEnum.Dashboard]: undefined;
  [PageEnum.Journal]: undefined;
  [PageEnum.JournalEntry]: { id: number };
  [PageEnum.FundedAccounts]: undefined;
  [PageEnum.EvaluationAccounts]: undefined;
  [PageEnum.FundedAccountDetail]: { id: number };
  [PageEnum.EvaluationAccountDetail]: { id: number };
};

export type UnauthenticatedStackNavigatorParams = {
  [PageEnum.Login]: undefined;
  [PageEnum.SignUp]: undefined;
  [PageEnum.ResetPassword]: undefined;
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
