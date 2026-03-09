import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@interfaces/CustomTypes";
import type {
  LoginForm,
  ResetPasswordForm,
  SignUpForm,
} from "./LoginInterfaces";

export interface LoginState {
  readonly user: User;
  readonly loginForm: LoginForm;
  readonly loginFormErrors: { [key: string]: any };
  readonly signUpForm: SignUpForm;
  readonly signUpFormErrors: { [key: string]: any };
  readonly resetPasswordForm: ResetPasswordForm;
  readonly resetPasswordFormErrors: { [key: string]: any };
  readonly resetPasswordFormSent: boolean;
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
    verified: false,
  },
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
};

type UpdateUserAction = PayloadAction<User>;
type UpdateLoginFormAction = PayloadAction<Partial<LoginForm>>;
type UpdateLoginFormErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateSignUpFormAction = PayloadAction<Partial<SignUpForm>>;
type UpdateSignUpFormErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateResetPasswordFormAction = PayloadAction<Partial<ResetPasswordForm>>;
type UpdateResetPasswordErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateResetPasswordFormSentAction = PayloadAction<boolean>;

export type LoginAction =
  | UpdateUserAction
  | UpdateLoginFormAction
  | UpdateLoginFormErrorsAction
  | UpdateSignUpFormAction
  | UpdateSignUpFormErrorsAction
  | UpdateResetPasswordFormAction
  | UpdateResetPasswordErrorsAction
  | UpdateResetPasswordFormSentAction;

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
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;
