import type { AccountTemplate } from "@interfaces/CustomTypes";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
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
  const { fetch, loading } = useCreateAccountTemplateApiCall();
  const { updateAccountTemplatesErrors } = useSettingsDispatch();

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
          data: formData,
        });

        if (!!data) {
          console.log({ data });
        } else if (error) {
          updateAccountTemplatesErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useCreateAccountTemplateHandler;
