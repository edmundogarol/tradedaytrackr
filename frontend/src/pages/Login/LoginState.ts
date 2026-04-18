import type { User } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  LoginForm,
  ResetPasswordForm,
  SignUpForm,
} from "./LoginInterfaces";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface LoginState {
  readonly user: User;
  readonly loginForm: LoginForm;
  readonly loginFormErrors: { [key: string]: any };
  readonly signUpForm: SignUpForm;
  readonly signUpFormErrors: { [key: string]: any };
  readonly resetPasswordForm: ResetPasswordForm;
  readonly resetPasswordFormErrors: { [key: string]: any };
  readonly resetPasswordFormSent: boolean;
  readonly verificationError: string;
  readonly deleteAccountError: string;
  readonly isHydrated?: boolean;
  readonly authStatus: AuthStatus;
  readonly userUpdateSuccess: boolean;
  readonly userDetailsErrors: { [key: string]: any };
  readonly passwordForm: {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  };
  readonly passwordFormErrors: { [key: string]: any };
  readonly timezoneErrors: { [key: string]: any };
  readonly timezoneUpdateModalOpen: boolean;
  readonly seedingDemoData?: boolean;
}

export const initialState: LoginState = {
  user: {
    id: undefined,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    birth_date: "",
    logged_in: false,
    is_staff: false,
    is_verified: false,
    email_preferences: {
      payout_reports: true,
      system_notifications: true,
      promotional_offers: true,
      unsubscribe_all: false,
    },
    timezone: "UTC",
  },
  isHydrated: false,
  loginForm: {
    email: "",
    password: "",
  },
  loginFormErrors: {},
  signUpForm: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  signUpFormErrors: {},
  resetPasswordForm: {
    email: "",
  },
  resetPasswordFormErrors: {},
  resetPasswordFormSent: false,
  verificationError: "",
  deleteAccountError: "",
  authStatus: "loading",
  userUpdateSuccess: false,
  userDetailsErrors: {},
  passwordForm: {
    current_password: "••••••••••••••••",
    new_password: "••••••••••••••••",
    confirm_new_password: "••••••••••••••••",
  },
  passwordFormErrors: {},
  timezoneErrors: {},
  timezoneUpdateModalOpen: false,
  seedingDemoData: false,
};

type UpdateUserAction = PayloadAction<User>;
type UpdateLoginFormAction = PayloadAction<Partial<LoginForm>>;
type UpdateLoginFormErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateSignUpFormAction = PayloadAction<Partial<SignUpForm>>;
type UpdateSignUpFormErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateResetPasswordFormAction = PayloadAction<Partial<ResetPasswordForm>>;
type UpdateResetPasswordErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateResetPasswordFormSentAction = PayloadAction<boolean>;
type UpdateVerificationErrorAction = PayloadAction<string>;
type UpdateIsHydratedAction = PayloadAction<boolean>;
type UpdateAuthStatusAction = PayloadAction<AuthStatus>;
type UpdateUserUpdateSuccessAction = PayloadAction<boolean>;
type UpdateEmailPreferencesAction = PayloadAction<{
  payout_reports?: boolean;
  system_notifications?: boolean;
  promotional_offers?: boolean;
  unsubscribe_all?: boolean;
}>;
type UpdateUserDetailsErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateDeleteAccountErrorAction = PayloadAction<string>;
type UpdatePasswordFormAction = PayloadAction<{
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}>;
type UpdatePasswordFormErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateTimezoneAction = PayloadAction<string>;
type UpdateTimezoneErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateTimezoneUpdateModalOpenAction = PayloadAction<boolean>;
type UpdateSeedingDemoDataAction = PayloadAction<boolean>;

export type LoginAction =
  | UpdateUserAction
  | UpdateLoginFormAction
  | UpdateLoginFormErrorsAction
  | UpdateSignUpFormAction
  | UpdateSignUpFormErrorsAction
  | UpdateResetPasswordFormAction
  | UpdateResetPasswordErrorsAction
  | UpdateResetPasswordFormSentAction
  | UpdateVerificationErrorAction
  | UpdateIsHydratedAction
  | UpdateAuthStatusAction
  | UpdateUserUpdateSuccessAction
  | UpdateEmailPreferencesAction
  | UpdateUserDetailsErrorsAction
  | UpdateDeleteAccountErrorAction
  | UpdatePasswordFormAction
  | UpdatePasswordFormErrorsAction
  | UpdateTimezoneAction
  | UpdateTimezoneErrorsAction
  | UpdateTimezoneUpdateModalOpenAction
  | UpdateSeedingDemoDataAction;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUser: (state, action: UpdateUserAction) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateLoginForm: (state, action: UpdateLoginFormAction) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
    updateLoginFormErrors: (state, action: UpdateLoginFormErrorsAction) => {
      state.loginFormErrors = action.payload;
    },
    updateSignUpForm: (state, action: UpdateSignUpFormAction) => {
      state.signUpForm = { ...state.signUpForm, ...action.payload };
    },
    updateSignUpFormErrors: (state, action: UpdateSignUpFormErrorsAction) => {
      state.signUpFormErrors = action.payload;
    },
    updateResetPasswordForm: (state, action: UpdateResetPasswordFormAction) => {
      state.resetPasswordForm = {
        ...state.resetPasswordForm,
        ...action.payload,
      };
    },
    updateResetPasswordErrors: (
      state,
      action: UpdateResetPasswordErrorsAction,
    ) => {
      state.resetPasswordFormErrors = action.payload;
    },
    updateResetPasswordFormSent: (
      state,
      action: UpdateResetPasswordFormSentAction,
    ) => {
      state.resetPasswordFormSent = action.payload;
    },
    updateVerificationError: (state, action: UpdateVerificationErrorAction) => {
      state.verificationError = action.payload;
    },
    updateIsHydrated: (state, action: UpdateIsHydratedAction) => {
      state.isHydrated = action.payload;
    },
    updateAuthStatus: (state, action: UpdateAuthStatusAction) => {
      state.authStatus = action.payload;
    },
    updateUserUpdateSuccess: (state, action: UpdateUserUpdateSuccessAction) => {
      state.userUpdateSuccess = action.payload;
    },
    updateEmailPreferences: (state, action: UpdateEmailPreferencesAction) => {
      state.user.email_preferences = {
        ...state.user.email_preferences,
        ...action.payload,
      };
    },
    updateUserDetailsErrors: (state, action: UpdateUserDetailsErrorsAction) => {
      state.userDetailsErrors = action.payload;
    },
    updateDeleteAccountError: (
      state,
      action: UpdateDeleteAccountErrorAction,
    ) => {
      state.deleteAccountError = action.payload;
    },
    updatePasswordForm: (state, action: UpdatePasswordFormAction) => {
      state.passwordForm = { ...state.passwordForm, ...action.payload };
    },
    updatePasswordFormErrors: (
      state,
      action: UpdatePasswordFormErrorsAction,
    ) => {
      state.passwordFormErrors = action.payload;
    },
    updateTimezone: (state, action: UpdateTimezoneAction) => {
      state.user = { ...state.user, timezone: action.payload };
    },
    updateTimezoneErrors: (state, action: UpdateTimezoneErrorsAction) => {
      state.timezoneErrors = action.payload;
    },
    updateTimezoneUpdateModalOpen: (
      state,
      action: UpdateTimezoneUpdateModalOpenAction,
    ) => {
      state.timezoneUpdateModalOpen = action.payload;
    },
    updateSeedingDemoData: (state, action: UpdateSeedingDemoDataAction) => {
      state.seedingDemoData = action.payload;
    },
  },
});

export const {
  updateUser,
  updateLoginForm,
  updateLoginFormErrors,
  updateSignUpForm,
  updateSignUpFormErrors,
  updateResetPasswordForm,
  updateResetPasswordErrors,
  updateResetPasswordFormSent,
  updateVerificationError,
  updateIsHydrated,
  updateAuthStatus,
  updateUserUpdateSuccess,
  updateEmailPreferences,
  updateUserDetailsErrors,
  updateDeleteAccountError,
  updatePasswordForm,
  updatePasswordFormErrors,
  updateTimezone,
  updateTimezoneErrors,
  updateTimezoneUpdateModalOpen,
  updateSeedingDemoData,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;
