import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { useCallback } from "react";
import useGetTagsApiCall from "./useGetTagsApiCall";

interface GetTagsHandler {
  getTags: () => Promise<void>;
  loading: boolean;
}

const useGetTagsHandler = (): GetTagsHandler => {
  const { fetch, loading } = useGetTagsApiCall();
  const { updateAddTagErrors, updateTags } = useSettingsDispatch();
  useSettingsDispatch();
  return {
    getTags: useCallback(async () => {
      const { error, data } = await fetch();

      if (!!data) {
        updateTags(data.results);
      } else if (error) {
        updateAddTagErrors(error);
      }
    }, [loading]),
    loading,
  };
};

export default useGetTagsHandler;
