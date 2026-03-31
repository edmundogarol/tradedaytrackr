import Button from "@components/Button/Button";
import GlassTile from "@components/GlassTile/GlassTile";
import ModalWrapper from "@components/Modal/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { color } from "@styles/colors";
import { SectionText } from "@styles/globalStyledComponents";
import React from "react";
import {
  AccountDetailsSection,
  AccountSettingsContainer,
  DeleteAccountChildWrapper,
  DeleteAccountSection,
  SubsectionHeaderWrapper,
} from "../AccountStyledComponents";
import useDeleteAccountApiCall from "../hooks/useDeleteAccountApiCall";
import useDeleteAccountHandler from "../hooks/useDeleteAccountHandler";

const Delete: React.FunctionComponent = () => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const deleteAccountApiCall = useDeleteAccountApiCall();
  const { fetch: deleteAccount } = deleteAccountApiCall;
  useDeleteAccountHandler(deleteAccountApiCall);

  return (
    <DeleteAccountSection>
      <ModalWrapper
        style={{ maxWidth: 500 }}
        title="Confirm Account Deletion"
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
      >
        <SectionText style={{ marginBottom: 20, marginTop: 0 }}>
          Are you sure you want to permanently delete your account and all of
          its data? This action cannot be undone.
        </SectionText>
        <Button
          text={"Permanently Delete All Data"}
          style={{ backgroundColor: color("SystemRed") }}
          onClick={() => deleteAccount()}
        />
      </ModalWrapper>
      <GlassTile
        featureTile
        minHeight={10}
        minWidth={10}
        padding={7}
        noGlow={true}
      >
        <DeleteAccountChildWrapper>
          <SubsectionHeaderWrapper>
            <DeleteForeverIcon style={{ color: "white", marginRight: 5 }} />
            Delete Account
          </SubsectionHeaderWrapper>
          <AccountSettingsContainer>
            <AccountDetailsSection>
              <SectionText>Would you like to delete your account?</SectionText>
              <SectionText>
                This account contains 140 journal entries, 1500 individual
                trades and 20 account connections. Deleting your account will
                permanently remove all of this data and cannot be undone.
              </SectionText>
              <Button
                onClick={() => setShowDeleteModal(true)}
                text={"Delete Account"}
                style={{ backgroundColor: color("SystemRed") }}
              />
            </AccountDetailsSection>
          </AccountSettingsContainer>
        </DeleteAccountChildWrapper>
      </GlassTile>
    </DeleteAccountSection>
  );
};

export default Delete;
