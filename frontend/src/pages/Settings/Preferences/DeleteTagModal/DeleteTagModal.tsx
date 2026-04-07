import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import Loading from "@components/Loading/Loading";
import ModalWrapper from "@components/Modal/Modal";
import { color } from "@styles/colors";
import {
  SectionText,
  TableField,
  TableItem,
} from "@styles/globalStyledComponents";
import React, { useEffect } from "react";
import useSettingsState from "../../hooks/useSettingsState";
import useDeleteTagHandler from "../hooks/useDeleteTagHandler";

interface DeleteTagModalProps {
  setDeleteTagModalOpen: (isOpen: boolean) => void;
  deleteTagModalOpen: boolean;
}

const DeleteTagModal: React.FunctionComponent<DeleteTagModalProps> = ({
  setDeleteTagModalOpen,
  deleteTagModalOpen,
}) => {
  const { selectedTag, addTagErrors } = useSettingsState();
  const { deleteTag, loading: deleteLoading } = useDeleteTagHandler();

  useEffect(() => {
    if (addTagErrors?.detail) {
      setDeleteTagModalOpen(false);
    }
  }, [addTagErrors]);

  return (
    <ModalWrapper
      setOpen={setDeleteTagModalOpen}
      open={deleteTagModalOpen}
      onClose={() => setDeleteTagModalOpen(false)}
      title="Delete Tag"
    >
      <TableItem key={selectedTag.name}>
        <TableField $flexSize={1.5}>{selectedTag.name}</TableField>
        <TableField>
          {selectedTag.uses} {"uses"}
        </TableField>
      </TableItem>
      <Gap level={1} />
      <SectionText>
        Are you sure you want to delete this tag? It will be removed from all
        associated journal entries. This action cannot be undone.
      </SectionText>
      <If condition={!!addTagErrors?.error}>
        <FormError error={addTagErrors?.error} />
      </If>
      <Gap level={2} />
      <Button
        text={deleteLoading ? <Loading size={15} /> : "Delete"}
        style={{ backgroundColor: color("SystemRed"), color: "white" }}
        onClick={() => {
          deleteTag(selectedTag?.id.toString());
        }}
      />
    </ModalWrapper>
  );
};

export default DeleteTagModal;
