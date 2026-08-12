import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import ModalWrapper from "@components/Modal/Modal";
import { color } from "@styles/colors";
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import moment from "moment";
import React from "react";
import useBudgetTrackingDispatch from "../hooks/useBudgetTrackingDispatch";
import useBudgetTrackingState from "../hooks/useBudgetTrackingState";
import useDeleteBudgetPurchaseHandler from "../hooks/useDeleteBudgetPurchaseHandler";

const DeleteBudgetPurchaseModal: React.FunctionComponent = () => {
  const { deletingPurchaseModalOpen, deletingPurchase, deletePurchaseErrors } =
    useBudgetTrackingState();
  const {
    updateDeletingPurchaseModalOpen,
    updateDeletingPurchase,
    updateDeletePurchaseErrors,
  } = useBudgetTrackingDispatch();
  const { deleteBudgetPurchase, loading } = useDeleteBudgetPurchaseHandler();

  return (
    <ModalWrapper
      title="Delete Purchase"
      open={deletingPurchaseModalOpen}
      setOpen={updateDeletingPurchaseModalOpen}
      onClose={() => {
        updateDeletingPurchase({});
        updateDeletePurchaseErrors({});
      }}
    >
      <SectionText>
        Are you sure you want to delete this purchase? This cannot be undone.
      </SectionText>
      <Gap level={2} />
      <SectionText style={{ textTransform: "capitalize" }}>
        {deletingPurchase.firm || "Purchase"}
        {" — "}
        {deletingPurchase.cost !== undefined
          ? formatter.format(deletingPurchase.cost)
          : ""}
        {deletingPurchase.purchaseDate
          ? ` — ${moment.utc(deletingPurchase.purchaseDate).format("MMM D, YYYY")}`
          : ""}
      </SectionText>
      <Gap level={2} />
      <If condition={!!deletePurchaseErrors?.error}>
        <FormError error={deletePurchaseErrors?.error} />
        <Gap level={2} />
      </If>
      <HorizontalSection>
        <Button
          loading={loading}
          text={"Permanently Delete"}
          style={{ backgroundColor: color("SystemRed") }}
          onClick={() => {
            if (deletingPurchase.id) {
              deleteBudgetPurchase(deletingPurchase.id);
            }
          }}
        />
        <Button
          text={"Cancel"}
          onClick={() => {
            updateDeletingPurchaseModalOpen(false);
            updateDeletingPurchase({});
            updateDeletePurchaseErrors({});
          }}
        />
      </HorizontalSection>
    </ModalWrapper>
  );
};

export default DeleteBudgetPurchaseModal;
