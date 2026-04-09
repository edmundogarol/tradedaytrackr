import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { useCallback } from "react";
import useGetTemplateRulesApiCall from "./useGetTemplateRulesApiCall";

interface GetTemplateRulesHandler {
  getTemplateRules: () => Promise<void>;
  loading: boolean;
}

const useGetTemplateRulesHandler = (): GetTemplateRulesHandler => {
  const { fetch, loading } = useGetTemplateRulesApiCall();
  const { updateTemplateRules } = useSettingsDispatch();
  return {
    getTemplateRules: useCallback(async () => {
      const { error, data } = await fetch();

      if (!!data) {
        updateTemplateRules(data.results);
      } else if (error) {
        console.warn(error);
      }
    }, [loading]),
    loading,
  };
};

export default useGetTemplateRulesHandler;
