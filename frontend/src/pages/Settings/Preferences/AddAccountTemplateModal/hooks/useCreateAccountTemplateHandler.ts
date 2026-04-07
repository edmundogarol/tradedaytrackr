import type { AccountTemplate, User } from "@interfaces/CustomTypes";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { initialState } from "@pages/Login/LoginState";
import { appendIfDefined } from "@utils/utils";
import { useCallback } from "react";
import useCreateAccountTemplateApiCall from "./useCreateAccountTemplateApiCall";

interface CreateAccountTemplateHandler {
  createAccountTemplate: (
    accountTemplate: AccountTemplate,
    image: File | null,
  ) => Promise<void>;
  loading: boolean;
}

const useCreateAccountTemplateHandler = (): CreateAccountTemplateHandler => {
  const {
    updateUser,
    updateUserUpdateSuccess,
    updateUserDetailsErrors,
    updatePasswordFormErrors,
  } = useLoginDispatch();
  const { user: userState } = useLoginState();
  const { fetch, loading } = useCreateAccountTemplateApiCall();
  const { updatePasswordForm } = useLoginDispatch();

  return {
    createAccountTemplate: useCallback(
      async (accountTemplate: AccountTemplate, image: File | null) => {
        const formData = new FormData();
        appendIfDefined(formData, "image", image);
        appendIfDefined(formData, "name", accountTemplate.name);
        appendIfDefined(formData, "firm", accountTemplate.firm);
        appendIfDefined(formData, "account_size", accountTemplate.accountSize);
        appendIfDefined(
          formData,
          "is_evaluation",
          accountTemplate.isEval ? "true" : "false",
        );
        appendIfDefined(
          formData,
          "profit_target",
          accountTemplate.profitTarget,
        );
        appendIfDefined(formData, "profit_split", accountTemplate.profitSplit);
        appendIfDefined(
          formData,
          "min_buffer",
          accountTemplate.minBufferTarget,
        );
        appendIfDefined(
          formData,
          "min_trading_days",
          accountTemplate.minTradingDays,
        );

        const { error, data } = await fetch({
          data,
        });

        if (!!data) {
          updateUser({
            ...userState,
            ...data,
          });
          if (
            (user as User).email ||
            (user as User).first_name ||
            (user as User).last_name ||
            (user as User).username
          ) {
            updateUserUpdateSuccess(true);
            updateUserDetailsErrors({});
          } else {
            updatePasswordFormErrors(data);
            updateUserDetailsErrors({});
            updatePasswordForm(initialState.passwordForm);
          }
        } else if (error) {
          console.log("Update User Post fetch error", error);
          updateUserUpdateSuccess(false);
          updateUserDetailsErrors(error);
          updatePasswordFormErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useCreateAccountTemplateHandler;
