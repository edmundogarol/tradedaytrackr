import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { initialState } from "@pages/Settings/SettingsState";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import useMapApiToAccountTemplate from "../AddAccountTemplateModal/hooks/useMapApiCallToAccountTemplate";
import useDeleteAccountTemplatesApiCall from "./useDeleteAccountTemplatesApiCall";
import useGetAccountTemplatesHandler from "./useGetAccountTemplatesHandler";

interface DeleteAccountTemplateHandler {
  deleteAccountTemplate: (id: string) => Promise<void>;
  loading: boolean;
}

const useDeleteAccountTemplatesHandler = (): DeleteAccountTemplateHandler => {
  const { fetch, loading } = useDeleteAccountTemplatesApiCall();
  const { updateAccountTemplatesErrors, updateSelectedAccountTemplate } =
    useSettingsDispatch();
  const mapApiToAccountTemplate = useMapApiToAccountTemplate();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  return {
    deleteAccountTemplate: useCallback(
      async (id: string) => {
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/trading-account-templates/${id}/`,
        });

        if (error) {
          updateAccountTemplatesErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getAccountTemplates();
          updateAccountTemplatesErrors({
            detail: "Account template deleted successfully",
          });
          updateSelectedAccountTemplate(initialState.selectedAccountTemplate);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteAccountTemplatesHandler;
