import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import ModalWrapper from "@components/Modal/Modal";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import { BUTTON_WIDTH } from "@styles/constants";
import React from "react";

interface AddTagModalProps {}

const AddTagModal: React.FunctionComponent<AddTagModalProps> = () => {
  const { addTagModalOpen } = useSettingsState();
  const { updateAddTagModalOpen } = useSettingsDispatch();

  return (
    <ModalWrapper
      open={addTagModalOpen}
      title="Add Tag"
      onClose={() => updateAddTagModalOpen(false)}
      setOpen={updateAddTagModalOpen}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Input placeholder="Type tag name" />
        <Button
          text="Add"
          style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
        />
      </div>
    </ModalWrapper>
  );
};

export default AddTagModal;
