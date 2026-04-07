import type { AccountTemplate } from "@interfaces/CustomTypes";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { appendIfDefined } from "@utils/utils";
import { useCallback } from "react";
import useCreateAccountTemplateApiCall from "./useCreateAccountTemplateApiCall";

interface CreateAccountTemplateHandler {
  createAccountTemplate: (
    accountTemplate: AccountTemplate,
    display_image: File | string | null,
  ) => Promise<void>;
  loading: boolean;
}

const useCreateAccountTemplateHandler = (): CreateAccountTemplateHandler => {
  const { fetch, loading } = useCreateAccountTemplateApiCall();
  const { updateAccountTemplatesErrors } = useSettingsDispatch();

  return {
    createAccountTemplate: useCallback(
      async (
        accountTemplate: AccountTemplate,
        display_image: File | string | null,
      ) => {
        const formData = new FormData();

        if (display_image instanceof File) {
          formData.append("image", display_image);
        } else if (typeof display_image === "string") {
          formData.append("icon", display_image);
        }
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
        appendIfDefined(formData, "min_day_pnl", accountTemplate.minDayPnl);
        appendIfDefined(formData, "max_drawdown", accountTemplate.maxDrawdown);
        appendIfDefined(formData, "consistency", accountTemplate.consistency);
        appendIfDefined(
          formData,
          "allowable_payout_request",
          accountTemplate.allowablePayoutRequest,
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
