import React from "react";
import Gap from "@components/Gap/Gap";
import Button from "@components/Button/Button";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import SelectWrapper from "@components/Select/SelectWrapper";
import Modal from "@components/Modal/Modal";
import Input from "@components/Input/Input";
import { LabelWrapper as Label } from "@components/Label/LabelStyledComponents";
import { AddFundedAccountContainer } from "./AddEvaluationAccountsModalStyledComponents";
import styles from "./AddEvaluationAccountsModalStyles";

interface AddEvaluationAccountsModalProps {
  accountTemplates: string[];
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setAddTradingDayOpen: (open: boolean) => void;
}

const AddEvaluationAccountsModal: React.FunctionComponent<
  AddEvaluationAccountsModalProps
> = ({ accountTemplates, modalOpen, setModalOpen, setAddTradingDayOpen }) => {
  return (
    <Modal
      title="Add Evaluation Account"
      open={modalOpen}
      setOpen={setModalOpen}
    >
      <AddFundedAccountContainer>
        <SelectWrapper
          items={accountTemplates}
          label="Select Account Template"
        />
        <Gap level={2} />
        <Input
          label="Account Name"
          value={undefined}
          placeholder="Enter Account Name"
          onChange={(e) => console.log(e.target.value)}
        />
        <Gap level={2} />
        <Input
          type="number"
          label="Account Balance"
          value={undefined}
          placeholder="Enter Account Balance"
          onChange={(e) => console.log(e.target.value)}
        />
        <Gap level={2} />
        <Label>Trading Day</Label>
        <Button
          text={"Add Trading Day"}
          iconType={IconTypeEnum.MaterialIcons}
          iconLeft={"add"}
          textStyle={styles.addTradingDayButton}
          style={styles.addTradingDayButton}
          onClick={(): void => setAddTradingDayOpen(true)}
        />
        <Gap level={2} />

        <Button
          text={"Save"}
          style={{ ...styles.addTradingDayButton, ...styles.submitButton }}
          onClick={(): void => setModalOpen(false)}
        />
      </AddFundedAccountContainer>
    </Modal>
  );
};

export default AddEvaluationAccountsModal;
