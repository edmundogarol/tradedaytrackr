import type { Tag } from "@interfaces/CustomTypes";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { initialState } from "@pages/Settings/SettingsState";
import { useCallback } from "react";
import useGetTagsHandler from "../../hooks/useGetTagsHandler";
import useCreateTagApiCall from "./useCreateTagApiCall";

interface CreateTagHandler {
  createTag: (tag: Partial<Tag>) => Promise<void>;
  loading: boolean;
}

const useCreateTagHandler = (): CreateTagHandler => {
  const { fetch, loading } = useCreateTagApiCall();
  const { updateAddTagErrors, updateAddTagModalOpen, updateSelectedTag } =
    useSettingsDispatch();
  const { getTags } = useGetTagsHandler();
  return {
    createTag: useCallback(
      async (tag: Partial<Tag>) => {
        const { error, data } = await fetch({
          data: {
            name: tag.name,
          },
        });

        if (!!data && data.id) {
          getTags();
          updateAddTagModalOpen(false);
          updateSelectedTag(initialState.selectedTag);
          updateAddTagErrors({
            detail: "Tag created successfully!",
          });
        } else if (error) {
          console.log({ error });
          updateAddTagErrors(
            !!error ? error : { error: "Something went wrong" },
          );
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useCreateTagHandler;
