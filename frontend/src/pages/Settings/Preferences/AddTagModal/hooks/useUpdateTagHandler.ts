import type { Tag } from "@interfaces/CustomTypes";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { initialState } from "@pages/Settings/SettingsState";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import useGetTagsHandler from "../../hooks/useGetTagsHandler";
import useUpdateTagApiCall from "./useUpdateTagApiCall";

interface UpdateTagHandler {
  updateTag: (tag: Partial<Tag>) => Promise<void>;
  loading: boolean;
}

const useUpdateTagHandler = (): UpdateTagHandler => {
  const { fetch, loading } = useUpdateTagApiCall();
  const { updateAddTagErrors, updateAddTagModalOpen, updateSelectedTag } =
    useSettingsDispatch();
  const { getTags } = useGetTagsHandler();
  return {
    updateTag: useCallback(
      async (tag: Partial<Tag>) => {
        const { error, data } = await fetch({
          data: tag,
          url: `${environmentConfig.HOST}/api/tags/${tag.id}/`,
        });

        if (!!data && data.id) {
          getTags();
          updateSelectedTag(initialState.selectedTag);
          updateAddTagModalOpen(false);
          updateAddTagErrors({
            detail: "Tag updated successfully!",
          });
        } else if (error) {
          updateAddTagErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateTagHandler;
