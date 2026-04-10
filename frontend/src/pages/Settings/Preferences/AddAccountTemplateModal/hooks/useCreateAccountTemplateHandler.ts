import type { AccountTemplate } from "@interfaces/CustomTypes";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import {
  initialState,
  updateSelectedAccountTemplate,
} from "@pages/Settings/SettingsState";
import { appendIfDefined, resizeImage } from "@utils/utils";
import { useCallback } from "react";
import useGetAccountTemplatesHandler from "../../hooks/useGetAccountTemplatesHandler";
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
  const { updateAccountTemplatesErrors, updateAddAccountModalOpen } =
    useSettingsDispatch();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  return {
    createAccountTemplate: useCallback(
      async (
        accountTemplate: AccountTemplate,
        display_image: File | string | null,
      ) => {
        const formData = new FormData();

        if (display_image instanceof File) {
          const resizedImage = await resizeImage(display_image);
          formData.append("image", resizedImage);
        } else if (
          typeof display_image === "string" &&
          display_image !== "add"
        ) {
          formData.append("icon", display_image);
        }
        if (
          !!accountTemplate.rules?.length &&
          accountTemplate.rules?.length > 0
        ) {
          appendIfDefined(formData, "rule_ids", accountTemplate.rules);
        }
        appendIfDefined(formData, "name", accountTemplate.name);
        appendIfDefined(formData, "firm", accountTemplate.firm);
        if (accountTemplate.accountSize > 0) {
          appendIfDefined(
            formData,
            "account_size",
            accountTemplate.accountSize,
          );
        }
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
        appendIfDefined(formData, "min_buffer", accountTemplate.minBuffer);
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
          "min_payout_request",
          accountTemplate.minPayoutRequest,
        );
        appendIfDefined(
          formData,
          "max_payout_request",
          accountTemplate.maxPayoutRequest,
        );
        appendIfDefined(
          formData,
          "withdrawal_split",
          accountTemplate.withdrawalSplit,
        );

        const { error, data } = await fetch({
          data: formData,
        });

        if (!!data && data.id) {
          getAccountTemplates();
          updateSelectedAccountTemplate(initialState.selectedAccountTemplate);
          updateAddAccountModalOpen(false);
          updateAccountTemplatesErrors({
            detail: "Account template created successfully!",
          });
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
