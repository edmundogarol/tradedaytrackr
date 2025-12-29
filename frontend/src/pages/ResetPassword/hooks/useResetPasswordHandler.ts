import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { useCallback } from "react";
import { initialState } from "@pages/Login/LoginState";
import useResetPasswordApiCall from "./useResetPasswordApiCall";

interface ResetPasswordHandler {
  resetPassword: () => void;
  loading: boolean;
}

const useResetPasswordHandler = (): ResetPasswordHandler => {
  const { resetPasswordForm } = useLoginState();
  const {
    updateResetPasswordErrors,
    updateResetPasswordFormSent,
    updateResetPasswordForm,
  } = useLoginDispatch();
  const { fetch, loading } = useResetPasswordApiCall();

  return {
    resetPassword: useCallback(async () => {
      if (!isNotEmptyString(resetPasswordForm.email)) {
        const resetPasswordFormErrorsLocal = {};
        if (!isNotEmptyString(resetPasswordForm.email)) {
          set(resetPasswordFormErrorsLocal, "email", "Please enter email");
        }

        updateResetPasswordErrors(resetPasswordFormErrorsLocal);
      } else {
        const { data, error } = await fetch();

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
              JSON.stringify(error)
            );
          }
          updateResetPasswordFormSent(false);
        }
      }
    }, [loading, resetPasswordForm]),

    loading,
  };
};

export default useResetPasswordHandler;
