import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { useCallback } from "react";
import useMapApiToAccountTemplate from "../AddAccountTemplateModal/hooks/useMapApiCallToAccountTemplate";
import useGetAccountTemplatesApiCall from "./useGetAccountTemplatesApiCall";

interface CreateAccountTemplateHandler {
  getAccountTemplates: () => Promise<void>;
  loading: boolean;
}

const useGetAccountTemplatesHandler = (): CreateAccountTemplateHandler => {
  const { fetch, loading } = useGetAccountTemplatesApiCall();
  const { updateAccountTemplatesErrors, updateAccountTemplates } =
    useSettingsDispatch();
  const mapApiToAccountTemplate = useMapApiToAccountTemplate();
  return {
    getAccountTemplates: useCallback(async () => {
      const { error, data } = await fetch();

      if (!!data) {
        const accountTemplatesMapped = data.results.map((accountTemplate) =>
          mapApiToAccountTemplate(accountTemplate),
        );
        updateAccountTemplates(accountTemplatesMapped);
      } else if (error) {
        updateAccountTemplatesErrors(error);
      }
    }, [loading]),
    loading,
  };
};

export default useGetAccountTemplatesHandler;
