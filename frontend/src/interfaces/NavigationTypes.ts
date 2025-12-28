export enum PageEnum {
  RootNavigator = "root",
  Login = "login",
  SignUp = "signUp",
  ResetPassword = "resetPassword",
  Dashboard = "dashboard",
}

export type AuthenticatedStackNavigatorParams = {
  [PageEnum.RootNavigator]: undefined;
  [PageEnum.Dashboard]: undefined;
};

export type UnauthenticatedStackNavigatorParams = {
  [PageEnum.Login]: undefined;
  [PageEnum.SignUp]: undefined;
  [PageEnum.ResetPassword]: undefined;
};

export interface Navigation {
  navigate: (page: PageEnum, params?: any) => void;
  replace: (page: PageEnum) => void;
  goBack: () => void;
  getCurrentPageName: () => PageEnum | null;
}

export interface WebNavigation extends Navigation {
  createSearch: (params: { [key: string]: any }) => string;
  getSearchParams: () => URLSearchParams;
}
