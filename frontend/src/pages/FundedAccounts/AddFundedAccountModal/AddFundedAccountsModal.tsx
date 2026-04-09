import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { Else, If } from "@components/If/If";
import Input from "@components/Input/Input";
import Modal from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import { decimalStringToInt } from "@utils/utils";
import React, { useEffect, useState } from "react";
import useCreateTradingAccountHandler from "../hooks/useCreateTradingAccountHandler";
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";
import { AddFundedAccountContainer } from "./AddFundedAccountsModalStyledComponents";
import styles from "./AddFundedAccountsModalStyles";

interface AddFundedAccountsModalProps {
  accountTemplates: string[];
  setAddTradingDayOpen: (open: boolean) => void;
}

const AddFundedAccountsModal: React.FunctionComponent<
  AddFundedAccountsModalProps
> = ({ setAddTradingDayOpen }) => {
  const { accountTemplates } = useSettingsState();
  const {
    selectedTradingAccount,
    createTradingAccountErrors,
    createTradingAccountModalOpen,
  } = useFundedAccountsState();
  const {
    updateSelectedTradingAccount,
    updateCreateTradingAccountErrors,
    updateCreateTradingAccountModalOpen,
  } = useFundedAccountsDispatch();
  const { createTradingAccount, loading: createTradingAccountLoading } =
    useCreateTradingAccountHandler();
  const [selectedTemplateId, setSelectedTemplateId] = useState(0);

  useEffect(() => {
    setSelectedTemplateId(accountTemplates[0]?.id || 0);
  }, [accountTemplates]);

  useEffect(() => {
    updateCreateTradingAccountErrors({});
  }, [createTradingAccountModalOpen]);

  return (
    <Modal
      title="Add Funded Account"
      open={createTradingAccountModalOpen}
      setOpen={updateCreateTradingAccountModalOpen}
    >
      <AddFundedAccountContainer>
        <SelectWrapper
          selectedValue={selectedTemplateId}
          items={accountTemplates.map((template) => {
            return { name: template.name, value: template.id };
          })}
          label="Select Account Template"
          onSelect={(selected) => {
            setSelectedTemplateId(Number(selected));
          }}
        />
        <Gap level={2} />
        <Input
          label="Account Name"
          error={createTradingAccountErrors?.account_name}
          value={selectedTradingAccount?.name}
          placeholder="Enter Account Name"
          onChange={(e) => {
            updateSelectedTradingAccount({
              ...selectedTradingAccount,
              name: e.target.value,
            });
            updateCreateTradingAccountErrors({});
          }}
        />
        <Gap level={2} />
        <Input
          error={createTradingAccountErrors?.account_balance}
          type="number"
          label="Account Balance"
          positiveOnly={true}
          value={
            decimalStringToInt(selectedTradingAccount?.accountBalance) === 0
              ? ""
              : decimalStringToInt(selectedTradingAccount?.accountBalance)
          }
          placeholder="Enter Account Balance"
          onChange={(e) => {
            updateSelectedTradingAccount({
              ...selectedTradingAccount,
              accountBalance: decimalStringToInt(e.target.value) as number,
            });
            updateCreateTradingAccountErrors({});
          }}
        />
        <If condition={!!createTradingAccountErrors?.error}>
          <Gap level={2} />
          <FormError error={createTradingAccountErrors?.error} />
          <Else>
            <Gap level={1} />
          </Else>
        </If>
        <Gap level={1} />
        <Button
          loading={createTradingAccountLoading}
          text={"Save"}
          style={{ ...styles.addTradingDayButton, ...styles.submitButton }}
          onClick={(): void => {
            createTradingAccount(selectedTradingAccount, selectedTemplateId);
            setSelectedTemplateId(accountTemplates[0]?.id || 0);
          }}
        />
      </AddFundedAccountContainer>
    </Modal>
  );
};

export default AddFundedAccountsModal;
