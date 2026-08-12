import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { Else, If } from "@components/If/If";
import Input from "@components/Input/Input";
import Modal from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import { decimalStringToInt, m } from "@utils/utils";
import React, { useEffect } from "react";
import { initialSelectedPurchase } from "../BudgetTrackingState";
import useBudgetTrackingDispatch from "../hooks/useBudgetTrackingDispatch";
import useBudgetTrackingState from "../hooks/useBudgetTrackingState";
import useCreateBudgetPurchaseHandler from "../hooks/useCreateBudgetPurchaseHandler";
import { AddBudgetPurchaseContainer } from "./AddBudgetPurchaseModalStyledComponents";
import styles from "./AddBudgetPurchaseModalStyles";

const FIRM_OPTIONS = [
  { name: "Apex", value: "apex" },
  { name: "MyFundedFutures", value: "myfundedfutures" },
  { name: "Topstep", value: "topstep" },
  { name: "FTMO", value: "ftmo" },
  { name: "Bulenox", value: "bulenox" },
  { name: "Alpha", value: "alpha" },
];

const AddBudgetPurchaseModal: React.FunctionComponent = () => {
  const { addPurchaseModalOpen, selectedPurchase, createPurchaseErrors } =
    useBudgetTrackingState();
  const {
    updateSelectedPurchase,
    updateAddPurchaseModalOpen,
    updateCreatePurchaseErrors,
  } = useBudgetTrackingDispatch();
  const { createBudgetPurchase, loading } = useCreateBudgetPurchaseHandler();

  useEffect(() => {
    if (addPurchaseModalOpen && !selectedPurchase.purchaseDate) {
      updateSelectedPurchase({
        ...selectedPurchase,
        purchaseDate: m().format("YYYY-MM-DD"),
      });
    }
  }, [addPurchaseModalOpen]);

  return (
    <Modal
      title="Add Purchase"
      open={addPurchaseModalOpen}
      setOpen={(open) => {
        updateAddPurchaseModalOpen(open);
        if (!open) {
          updateSelectedPurchase(initialSelectedPurchase);
          updateCreatePurchaseErrors({});
        }
      }}
    >
      <AddBudgetPurchaseContainer>
        <SelectWrapper
          label="Firm"
          selectedValue={selectedPurchase.firm}
          items={FIRM_OPTIONS}
          onSelect={(selected) => {
            updateSelectedPurchase({ ...selectedPurchase, firm: selected });
          }}
        />
        <Gap level={2} />
        <Input
          type="date"
          label="Purchase Date"
          error={createPurchaseErrors?.purchase_date}
          value={selectedPurchase.purchaseDate || ""}
          onChange={(e) => {
            updateSelectedPurchase({
              ...selectedPurchase,
              purchaseDate: e.target.value,
            });
            updateCreatePurchaseErrors({});
          }}
        />
        <Gap level={2} />
        <Input
          type="number"
          label="Account Size"
          positiveOnly
          error={createPurchaseErrors?.account_size}
          value={
            decimalStringToInt(selectedPurchase.accountSize) === 0
              ? ""
              : decimalStringToInt(selectedPurchase.accountSize)
          }
          placeholder="e.g. 100000"
          onChange={(e) => {
            updateSelectedPurchase({
              ...selectedPurchase,
              accountSize: decimalStringToInt(e.target.value) as number,
            });
            updateCreatePurchaseErrors({});
          }}
        />
        <Gap level={2} />
        <Input
          type="number"
          label="Cost"
          positiveOnly
          error={createPurchaseErrors?.cost}
          value={
            decimalStringToInt(selectedPurchase.cost) === 0
              ? ""
              : decimalStringToInt(selectedPurchase.cost)
          }
          placeholder="Enter amount paid"
          onChange={(e) => {
            updateSelectedPurchase({
              ...selectedPurchase,
              cost: decimalStringToInt(e.target.value) as number,
            });
            updateCreatePurchaseErrors({});
          }}
        />
        <Gap level={2} />
        <Input
          label="Notes"
          error={createPurchaseErrors?.notes}
          value={selectedPurchase.notes || ""}
          placeholder="Optional"
          onChange={(e) => {
            updateSelectedPurchase({
              ...selectedPurchase,
              notes: e.target.value,
            });
          }}
        />
        <If condition={!!createPurchaseErrors?.error}>
          <Gap level={2} />
          <FormError error={createPurchaseErrors?.error} />
          <Else>
            <Gap level={1} />
          </Else>
        </If>
        <Gap level={1} />
        <Button
          loading={loading}
          text={"Save"}
          style={styles.submitButton}
          onClick={(): void => {
            createBudgetPurchase(selectedPurchase);
          }}
        />
      </AddBudgetPurchaseContainer>
    </Modal>
  );
};

export default AddBudgetPurchaseModal;
