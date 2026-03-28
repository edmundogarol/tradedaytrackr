import type { User } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type {
  LoginForm,
  ResetPasswordForm,
  SignUpForm,
} from "../LoginInterfaces";
import type { AuthStatus, LoginAction } from "../LoginState";
import {
  updateAuthStatus,
  updateDeleteAccountError,
  updateEmailPreferences,
  updateIsHydrated,
  updateLoginForm,
  updateLoginFormErrors,
  updatePasswordForm,
  updatePasswordFormErrors,
  updateResetPasswordErrors,
  updateResetPasswordForm,
  updateResetPasswordFormSent,
  updateSignUpForm,
  updateSignUpFormErrors,
  updateUser,
  updateUserDetailsErrors,
  updateUserUpdateSuccess,
  updateVerificationError,
} from "../LoginState";

interface LoginDispatch {
  updateUser(user: User): void;
  updateLoginForm(loginForm: Partial<LoginForm>): void;
  updateLoginFormErrors(loginFormError: { [key: string]: any }): void;
  updateSignUpForm(signUpForm: Partial<SignUpForm>): void;
  updateSignUpFormErrors(signUpFormError: { [key: string]: any }): void;
  updateResetPasswordForm(resetPasswordForm: Partial<ResetPasswordForm>): void;
  updateResetPasswordErrors(resetPasswordFormErrors: {
    [key: string]: any;
  }): void;
  updateResetPasswordFormSent(formSent: boolean): void;
  updateVerificationError(error: string | null): void;
  updateIsHydrated(isHydrated: boolean): void;
  updateAuthStatus(authStatus: AuthStatus): void;
  updateUserUpdateSuccess(userUpdateSuccess: boolean): void;
  updateEmailPreferences(preferences: {
    payout_reports?: boolean;
    system_notifications?: boolean;
    promotional_offers?: boolean;
    unsubscribe_all?: boolean;
  }): void;
  updateUserDetailsErrors(errors: { [key: string]: any }): void;
  updateDeleteAccountError(error: string): void;
  updatePasswordForm(passwordForm: {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  }): void;
  updatePasswordFormErrors(errors: { [key: string]: any }): void;
}

export const useLoginDispatch = (): LoginDispatch => {
  const dispatch: Dispatch<LoginAction> = useDispatch();
  return {
    updateUser(user: User): void {
      dispatch(updateUser(user));
    },
    updateLoginForm(loginForm: Partial<LoginForm>): void {
      dispatch(updateLoginForm(loginForm));
    },
    updateLoginFormErrors(loginFormError: { [key: string]: any }): void {
      dispatch(updateLoginFormErrors(loginFormError));
    },
    updateSignUpForm(signUpForm: Partial<SignUpForm>): void {
      dispatch(updateSignUpForm(signUpForm));
    },
    updateSignUpFormErrors(signUpFormError: { [key: string]: any }): void {
      dispatch(updateSignUpFormErrors(signUpFormError));
    },
    updateResetPasswordForm(
      resetPasswordForm: Partial<ResetPasswordForm>,
    ): void {
      dispatch(updateResetPasswordForm(resetPasswordForm));
    },
    updateResetPasswordErrors(resetPasswordFormErrors: {
      [key: string]: any;
    }): void {
      dispatch(updateResetPasswordErrors(resetPasswordFormErrors));
    },
    updateResetPasswordFormSent(formSent): void {
      dispatch(updateResetPasswordFormSent(formSent));
    },
    updateVerificationError(error: string): void {
      dispatch(updateVerificationError(error));
    },
    updateIsHydrated(isHydrated: boolean): void {
      dispatch(updateIsHydrated(isHydrated));
    },
    updateAuthStatus(authStatus: AuthStatus): void {
      dispatch(updateAuthStatus(authStatus));
    },
    updateUserUpdateSuccess(userUpdateSuccess: boolean): void {
      dispatch(updateUserUpdateSuccess(userUpdateSuccess));
    },
    updateEmailPreferences(preferences: {
      payout_reports?: boolean;
      system_notifications?: boolean;
      promotional_offers?: boolean;
      unsubscribe_all?: boolean;
    }): void {
      dispatch(updateEmailPreferences(preferences));
    },
    updateUserDetailsErrors(errors: { [key: string]: any }): void {
      dispatch(updateUserDetailsErrors(errors));
    },
    updateDeleteAccountError(error: string): void {
      dispatch(updateDeleteAccountError(error));
    },
    updatePasswordForm(passwordForm: {
      current_password: string;
      new_password: string;
      confirm_new_password: string;
    }): void {
      dispatch(updatePasswordForm(passwordForm));
    },
    updatePasswordFormErrors(errors: { [key: string]: any }): void {
      dispatch(updatePasswordFormErrors(errors));
    },
  };
};

export default useLoginDispatch;
