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
import { formatter } from "@utils/utils";
import React, { useEffect } from "react";
import useSettingsState from "../../hooks/useSettingsState";
import useDeleteAccountTemplatesHandler from "../hooks/useDeleteAccountTemplatesHandler";

interface DeleteAccountTemplateModalProps {
  setDeleteTemplateModalOpen: (isOpen: boolean) => void;
  deleteTemplateModalOpen: boolean;
}

const DeleteAccountTemplateModal: React.FunctionComponent<
  DeleteAccountTemplateModalProps
> = ({ setDeleteTemplateModalOpen, deleteTemplateModalOpen }) => {
  const { selectedAccountTemplate, addAccountTemplateErrors } =
    useSettingsState();
  const { deleteAccountTemplate, loading: deleteLoading } =
    useDeleteAccountTemplatesHandler();

  useEffect(() => {
    if (addAccountTemplateErrors?.detail) {
      setDeleteTemplateModalOpen(false);
    }
  }, [addAccountTemplateErrors]);

  return (
    <ModalWrapper
      setOpen={setDeleteTemplateModalOpen}
      open={deleteTemplateModalOpen}
      onClose={() => setDeleteTemplateModalOpen(false)}
      title="Delete Account Template"
    >
      <TableItem key={selectedAccountTemplate.name}>
        <TableField
          $flexSize={0.5}
          $src={selectedAccountTemplate.displayImage}
        ></TableField>
        <TableField $flexSize={1.5}>{selectedAccountTemplate.name}</TableField>
        <TableField>
          {formatter.format(selectedAccountTemplate?.accountSize as number)}
        </TableField>
        <TableField>
          {selectedAccountTemplate.isEval
            ? "Evaluation Template"
            : "Funded Template"}
        </TableField>
      </TableItem>
      <If condition={!!addAccountTemplateErrors?.error}>
        <Gap level={2} />
        <FormError error={addAccountTemplateErrors?.error} />
      </If>
      <Gap level={2} />
      <SectionText>
        Are you sure you want to delete this account template? This action
        cannot be undone.
      </SectionText>
      <Gap level={2} />
      <Button
        text={deleteLoading ? <Loading size={15} /> : "Delete"}
        style={{ backgroundColor: color("SystemRed"), color: "white" }}
        onClick={() => {
          deleteAccountTemplate(selectedAccountTemplate?.id.toString());
        }}
      />
    </ModalWrapper>
  );
};

export default DeleteAccountTemplateModal;
