import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { initialState } from "@pages/Settings/SettingsState";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import useDeleteTagApiCall from "./useDeleteTagApiCall";
import useGetTagsHandler from "./useGetTagsHandler";

interface DeleteTagHandler {
  deleteTag: (id: string) => Promise<void>;
  loading: boolean;
}

const useDeleteTagHandler = (): DeleteTagHandler => {
  const { fetch, loading } = useDeleteTagApiCall();
  const { updateAddTagErrors, updateSelectedTag } = useSettingsDispatch();
  const { getTags } = useGetTagsHandler();
  return {
    deleteTag: useCallback(
      async (id: string) => {
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/tags/${id}/`,
        });

        if (error) {
          updateAddTagErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getTags();
          updateAddTagErrors({
            detail: "Tag deleted successfully",
          });
          updateSelectedTag(initialState.selectedTag);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteTagHandler;
