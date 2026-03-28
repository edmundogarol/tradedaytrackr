import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import FormInfo from "@components/Error/FormInfo/FormInfo";
import { FormInfoLink } from "@components/Error/FormInfo/FormInfoStyledComponents";
import FormSuccess from "@components/Error/FormSuccess/FormSuccess";
import FormWarning from "@components/Error/FormWarning/FormWarning";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import Loading from "@components/Loading/Loading";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DoneOutlineIcon from "@mui/icons-material/Done";
import Switch from "@mui/material/Switch";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { BUTTON_WIDTH } from "@styles/constants";
import { SubsectionHeader } from "@styles/globalStyledComponents";
import { isNotEmptyString } from "@utils/utils";
import React from "react";
import {
  AccountDetailsSection,
  AccountSettingsContainer,
  CheckDescriptionContainer,
  EmailPreferencesSection,
  SubsectionHeaderWrapper,
  SwitchItemRow,
  UserNameContainer,
} from "../AccountStyledComponents";
import useRequestVerificationApiCall from "../hooks/useRequestVerificationApiCall";
import useUpdateEmailPreferencesSubmitHandler from "../hooks/useUpdateEmailPreferencesSubmitHandler";
import useUpdateUserSubmitHandler from "../hooks/useUpdateUserSubmitHandler";

const UserDetails: React.FunctionComponent = () => {
  const {
    user,
    user: { email_preferences },
    userUpdateSuccess,
    userDetailsErrors,
  } = useLoginState();
  const { updateUser, updateUserUpdateSuccess, updateEmailPreferences } =
    useLoginDispatch();
  const [previousUserDetails, updatePreviousUserDetails] = React.useState({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const { updateUser: updateUserCall, loading } = useUpdateUserSubmitHandler();
  const [showAlert, setShowAlert] = React.useState(false);
  const { fetch: requestVerification } = useRequestVerificationApiCall();
  const userFieldsAreDirty = React.useMemo(() => {
    const dirtyFields =
      (user.username !== previousUserDetails.username &&
        isNotEmptyString(user.username)) ||
      (user.email !== previousUserDetails.email &&
        isNotEmptyString(user.email)) ||
      (user.first_name !== previousUserDetails.first_name &&
        isNotEmptyString(user.first_name)) ||
      (user.last_name !== previousUserDetails.last_name &&
        isNotEmptyString(user.last_name));

    return dirtyFields;
  }, [user, previousUserDetails]);
  const { update: updateEmailPreferencesCall } =
    useUpdateEmailPreferencesSubmitHandler();

  return (
    <GlassTile
      featureTile
      minHeight={10}
      minWidth={10}
      padding={7}
      noGlow={true}
    >
      <AlertPopout
        open={showAlert}
        setPopoutOpen={() => setShowAlert(false)}
        message={"Verification Email Sent"}
        hideDuration={3000}
      />
      <GlassTileChildrenWrapper>
        <SubsectionHeaderWrapper>
          <AccountBoxIcon style={{ color: "white", marginRight: 5 }} />
          Account Details
        </SubsectionHeaderWrapper>
        <AccountSettingsContainer>
          <AccountDetailsSection>
            <Input
              error={userDetailsErrors.username}
              label="Username"
              value={user.username}
              darkMode
              onChange={(e) => {
                updateUserUpdateSuccess(false);
                updateUser({
                  ...user,
                  username: e.target.value,
                });
              }}
            />
            <Gap level={2} />
            <If condition={!user.is_verified}>
              <FormWarning
                detail={"Please check your inbox for a verification email."}
              />
              <FormInfo
                detail={
                  <>
                    Didn't get it?{" "}
                    <FormInfoLink
                      onClick={() => {
                        requestVerification();
                        setShowAlert(true);
                      }}
                    >
                      Resend email
                    </FormInfoLink>
                  </>
                }
              />
            </If>
            <Input
              label="Email"
              error={userDetailsErrors.email}
              value={user.email}
              darkMode
              onChange={(e) => {
                updateUserUpdateSuccess(false);
                updateUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
            <Gap level={1} />
            <UserNameContainer>
              <Input
                label="First Name"
                error={userDetailsErrors.first_name}
                value={user.first_name}
                darkMode
                onChange={(e) => {
                  updateUserUpdateSuccess(false);
                  updateUser({
                    ...user,
                    first_name: e.target.value,
                  });
                }}
              />
              <Gap level={2} />
              <Input
                label="Last Name"
                error={userDetailsErrors.last_name}
                value={user.last_name}
                darkMode
                onChange={(e) => {
                  updateUserUpdateSuccess(false);
                  updateUser({
                    ...user,
                    last_name: e.target.value,
                  });
                }}
              />
            </UserNameContainer>
            <Gap level={2} />
            <If condition={userUpdateSuccess}>
              <FormSuccess detail={"User details updated successfully!"} />
            </If>
            <Button
              disabledBlock={!userFieldsAreDirty}
              text={loading ? <Loading size={20} /> : "Save Changes"}
              onClick={() => {
                if (!userFieldsAreDirty) {
                  return;
                }
                updateUserCall(user);
                updatePreviousUserDetails(user);
              }}
              style={{
                marginLeft: "auto",
                maxWidth: `${BUTTON_WIDTH}px`,
              }}
            />
          </AccountDetailsSection>
          <EmailPreferencesSection>
            <SubsectionHeader>Email Preferences</SubsectionHeader>
            <SwitchItemRow>
              <CheckDescriptionContainer>
                <DoneOutlineIcon style={{ color: "#4caf50", fontSize: 18 }} />
                <span>Payout Reports</span>
              </CheckDescriptionContainer>
              <Switch
                checked={email_preferences?.payout_reports}
                defaultChecked={email_preferences?.payout_reports}
                onChange={(checked) => {
                  updateEmailPreferences({
                    ...email_preferences,
                    payout_reports: checked.target.checked,
                  });
                  updateEmailPreferencesCall({
                    payout_reports: checked.target.checked,
                  });
                }}
              />
            </SwitchItemRow>
            <SwitchItemRow>
              <CheckDescriptionContainer>
                <DoneOutlineIcon style={{ color: "#4caf50", fontSize: 18 }} />
                <span>System Notifications</span>
              </CheckDescriptionContainer>
              <Switch
                checked={email_preferences?.system_notifications}
                defaultChecked={email_preferences?.system_notifications}
                onChange={(checked) => {
                  updateEmailPreferences({
                    ...email_preferences,
                    system_notifications: checked.target.checked,
                  });
                  updateEmailPreferencesCall({
                    system_notifications: checked.target.checked,
                  });
                }}
              />
            </SwitchItemRow>
            <SwitchItemRow>
              <CheckDescriptionContainer>
                <DoneOutlineIcon style={{ color: "#4caf50", fontSize: 18 }} />
                <span>Exclusive Offers and Promotions</span>
              </CheckDescriptionContainer>
              <Switch
                checked={email_preferences?.promotional_offers}
                defaultChecked={email_preferences?.promotional_offers}
                onChange={(checked) => {
                  updateEmailPreferences({
                    ...email_preferences,
                    promotional_offers: checked.target.checked,
                  });
                  updateEmailPreferencesCall({
                    promotional_offers: checked.target.checked,
                  });
                }}
              />
            </SwitchItemRow>
            <SwitchItemRow>
              <CheckDescriptionContainer>
                <DoneOutlineIcon style={{ color: "#4caf50", fontSize: 18 }} />
                <span>Unsubscribe from all emails</span>
              </CheckDescriptionContainer>
              <Switch
                checked={email_preferences?.unsubscribe_all}
                defaultChecked={email_preferences?.unsubscribe_all}
                onChange={(checked) => {
                  updateEmailPreferences({
                    ...email_preferences,
                    unsubscribe_all: checked.target.checked,
                  });
                  updateEmailPreferencesCall({
                    unsubscribe_all: checked.target.checked,
                  });
                }}
              />
            </SwitchItemRow>
          </EmailPreferencesSection>
        </AccountSettingsContainer>
      </GlassTileChildrenWrapper>
    </GlassTile>
  );
};

export default UserDetails;
