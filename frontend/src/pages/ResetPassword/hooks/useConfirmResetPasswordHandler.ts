import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { initialState } from "@pages/Login/LoginState";
import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useConfirmResetPasswordApiCall from "./useConfirmResetPasswordApiCall";

interface ConfirmResetPasswordHandler {
  confirmResetPassword: () => void;
  loading: boolean;
}

const useConfirmResetPasswordHandler = (): ConfirmResetPasswordHandler => {
  const { resetPasswordForm } = useLoginState();
  const {
    updateResetPasswordErrors,
    updateResetPasswordFormSent,
    updateResetPasswordForm,
  } = useLoginDispatch();
  const { fetch, loading } = useConfirmResetPasswordApiCall();

  return {
    confirmResetPassword: useCallback(async () => {
      if (
        resetPasswordForm.password === undefined ||
        !isNotEmptyString(resetPasswordForm?.password)
      ) {
        const resetPasswordFormErrorsLocal = {};
        set(
          resetPasswordFormErrorsLocal,
          "password",
          "Please enter new password",
        );

        updateResetPasswordErrors(resetPasswordFormErrorsLocal);
      } else if (
        resetPasswordForm.confirm_password === undefined ||
        !isNotEmptyString(resetPasswordForm.confirm_password)
      ) {
        const resetPasswordFormErrorsLocal = {};
        set(
          resetPasswordFormErrorsLocal,
          "confirm_password",
          "Please confirm password",
        );

        updateResetPasswordErrors(resetPasswordFormErrorsLocal);
      } else if (
        !!resetPasswordForm.password &&
        !!resetPasswordForm.confirm_password &&
        resetPasswordForm.password !== resetPasswordForm.confirm_password
      ) {
        const resetPasswordFormErrorsLocal = {};

        set(
          resetPasswordFormErrorsLocal,
          "confirm_password",
          "Passwords do not match",
        );

        updateResetPasswordErrors(resetPasswordFormErrorsLocal);
      } else {
        const { data, error } = await fetch();

        console.log({ data, error });
        if (data) {
          updateResetPasswordFormSent(true);
          updateResetPasswordErrors({});
          updateResetPasswordForm({ ...initialState.resetPasswordForm });
        } else {
          if (error) {
            updateResetPasswordErrors({ ...error });
          } else {
            console.log(
              "Reset Password Post fetch error",
              JSON.stringify(error),
            );
          }
          updateResetPasswordFormSent(false);
        }
      }
    }, [loading, resetPasswordForm]),

    loading,
  };
};

export default useConfirmResetPasswordHandler;
