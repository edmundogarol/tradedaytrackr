import type { AccountTemplate } from "@interfaces/CustomTypes";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import {
  initialState,
  updateSelectedAccountTemplate,
} from "@pages/Settings/SettingsState";
import environmentConfig from "@utils/environmentConfig";
import { appendIfDefined, resizeImage } from "@utils/utils";
import { useCallback } from "react";
import useGetAccountTemplatesHandler from "../../hooks/useGetAccountTemplatesHandler";
import useUpdateAccountTemplateApiCall from "./useUpdateAccountTemplateApiCall";

interface UpdateAccountTemplateHandler {
  updateAccountTemplate: (
    accountTemplate: AccountTemplate,
    display_image: File | string | null,
  ) => Promise<void>;
  loading: boolean;
}

const useUpdateAccountTemplateHandler = (): UpdateAccountTemplateHandler => {
  const { fetch, loading } = useUpdateAccountTemplateApiCall();
  const { updateAccountTemplatesErrors, updateAddAccountModalOpen } =
    useSettingsDispatch();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  return {
    updateAccountTemplate: useCallback(
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
          "allowable_payout_request",
          accountTemplate.allowablePayoutRequest,
        );

        const { error, data } = await fetch({
          data: formData,
          url: `${environmentConfig.HOST}/api/trading-account-templates/${accountTemplate.id}/`,
        });

        if (!!data && data.id) {
          getAccountTemplates();
          updateSelectedAccountTemplate(initialState.selectedAccountTemplate);
          updateAddAccountModalOpen(false);
          updateAccountTemplatesErrors({
            detail: "Account template updated successfully!",
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

export default useUpdateAccountTemplateHandler;
