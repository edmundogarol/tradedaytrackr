import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import ModalWrapper from "@components/Modal/Modal";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import { BUTTON_WIDTH } from "@styles/constants";
import React from "react";
import useCreateTagHandler from "./hooks/useCreateTagHandler";
import useUpdateTagHandler from "./hooks/useUpdateTagHandler";

interface AddTagModalProps {}

const AddTagModal: React.FunctionComponent<AddTagModalProps> = () => {
  const { addTagModalOpen, addTagErrors, selectedTag } = useSettingsState();
  const { updateAddTagModalOpen, updateSelectedTag } = useSettingsDispatch();
  const { createTag } = useCreateTagHandler();
  const { updateTag } = useUpdateTagHandler();
  const editingTag = !!selectedTag?.id;
  return (
    <ModalWrapper
      open={addTagModalOpen}
      title={editingTag ? "Edit Tag" : "Add Tag"}
      onClose={() => updateAddTagModalOpen(false)}
      setOpen={updateAddTagModalOpen}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Input
          error={addTagErrors?.name}
          placeholder="Type tag name"
          value={selectedTag?.name || ""}
          onChange={(e) =>
            updateSelectedTag({ ...selectedTag, name: e.target.value })
          }
        />
        <If condition={!!addTagErrors?.error}>
          <FormError error={addTagErrors?.error} />
        </If>
        <Button
          text={editingTag ? "Save" : "Add"}
          style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
          onClick={() => {
            if (editingTag) {
              updateTag(selectedTag);
            } else {
              createTag(selectedTag);
            }
          }}
        />
      </div>
    </ModalWrapper>
  );
};

export default AddTagModal;
