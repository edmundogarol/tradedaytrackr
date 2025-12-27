import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { User } from "@interfaces/CustomTypes";
import type { LoginAction } from "../LoginState";
import {
  updateLoginForm,
  updateLoginFormErrors,
  updateResetPasswordErrors,
  updateResetPasswordForm,
  updateResetPasswordFormSent,
  updateSignUpForm,
  updateSignUpFormErrors,
  updateUser,
} from "../LoginState";
import type {
  LoginForm,
  ResetPasswordForm,
  SignUpForm,
} from "../LoginInterfaces";

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
      resetPasswordForm: Partial<ResetPasswordForm>
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
  };
};

export default useLoginDispatch;
