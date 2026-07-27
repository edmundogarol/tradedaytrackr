import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import FormSuccess from "@components/Error/FormSuccess/FormSuccess";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import ModalWrapper from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import type { User } from "@interfaces/CustomTypes";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SouthIcon from "@mui/icons-material/South";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { BUTTON_WIDTH } from "@styles/constants";
import { SectionText, SubsectionHeader } from "@styles/globalStyledComponents";
import { TIMEZONE_OPTIONS } from "@utils/constants";
import { isNotEmptyString } from "@utils/utils";
import React, { useMemo, useState } from "react";
import {
  AccountDetailsSection,
  AccountSettingsContainer,
  EmailPreferencesSection,
  SubsectionHeaderWrapper,
  TimezoneComparisonModalContainer,
  TimezoneSection,
  UserNameContainer,
} from "../AccountStyledComponents";
import useUpdateUserSubmitHandler from "../hooks/useUpdateUserSubmitHandler";
import useUpdateUserTimezoneSubmitHandler from "../hooks/useUpdateUserTimezoneSubmitHandler";

const UserDetails: React.FunctionComponent = () => {
  const {
    user,
    userUpdateSuccess,
    userDetailsErrors,
    timezoneErrors,
    timezoneUpdateModalOpen,
  } = useLoginState();
  const {
    updateUser,
    updateUserUpdateSuccess,
    updateTimezoneUpdateModalOpen,
    updateTimezone,
    updateTimezoneErrors,
  } = useLoginDispatch();
  const [previousUserDetails, updatePreviousUserDetails] = useState({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const [originalUserTimezone, setOriginalUserTimezone] = useState(
    user.timezone,
  );
  const { updateUser: updateUserCall, loading } = useUpdateUserSubmitHandler();
  const userFieldsAreDirty = useMemo(() => {
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
  const { updateUserTimezone, loading: updatingTimezone } =
    useUpdateUserTimezoneSubmitHandler();

  return (
    <GlassTile
      featureTile
      minHeight={10}
      minWidth={10}
      padding={7}
      noGlow={true}
    >
      <AlertPopout
        message={timezoneErrors?.detail}
        hideDuration={3000}
        open={!!timezoneErrors?.detail}
        setPopoutOpen={() => {
          updateTimezoneErrors({});
          setOriginalUserTimezone(user.timezone);
        }}
      />
      <ModalWrapper
        title={"Confirm Timezone Update"}
        open={timezoneUpdateModalOpen}
        setOpen={updateTimezoneUpdateModalOpen}
      >
        <TimezoneComparisonModalContainer>
          <SelectWrapper
            disabled
            selectedValue={originalUserTimezone}
            items={TIMEZONE_OPTIONS.map((option) => ({
              name: option.label,
              value: option.value,
            }))}
          />
          <SouthIcon
            style={{ color: "white", fontSize: 18, alignSelf: "center" }}
          />
          <SelectWrapper
            disabled
            selectedValue={user.timezone}
            items={TIMEZONE_OPTIONS.map((option) => ({
              name: option.label,
              value: option.value,
            }))}
          />
        </TimezoneComparisonModalContainer>
        <Gap level={1} />
        <SectionText>
          {
            "Updating the timezone will recalculate and affect the display of all time-related data. Are you sure you want to proceed?"
          }
        </SectionText>
        <Gap level={2} />
        <Button
          loading={updatingTimezone}
          text={"Save"}
          onClick={() => {
            updateUserTimezone(user.timezone?.toString() || "UTC");
          }}
        />
      </ModalWrapper>
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
              value={isNotEmptyString(user.username) ? user.username : ""}
              placeholder="Enter username"
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
                value={isNotEmptyString(user.first_name) ? user.first_name : ""}
                placeholder="Enter first name"
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
                value={isNotEmptyString(user.last_name) ? user.last_name : ""}
                placeholder="Enter last name"
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
            <If condition={!!userDetailsErrors.error}>
              <FormError error={userDetailsErrors.error} />
            </If>
            <If condition={userUpdateSuccess}>
              <FormSuccess detail={"User details updated successfully!"} />
            </If>
            <Button
              loading={loading}
              disabledBlock={!userFieldsAreDirty}
              text={"Save Changes"}
              onClick={() => {
                if (!userFieldsAreDirty) {
                  return;
                }
                updateUserCall({
                  username: user.username,
                  email: user.email,
                  first_name: user.first_name,
                  last_name: user.last_name,
                } as User);
                updatePreviousUserDetails(user);
              }}
              style={{
                marginLeft: "auto",
                maxWidth: `${BUTTON_WIDTH}px`,
              }}
            />
          </AccountDetailsSection>
          <EmailPreferencesSection>
            <TimezoneSection>
              <SubsectionHeader>Timezone</SubsectionHeader>
              <If condition={!!userDetailsErrors?.timezone}>
                <Gap level={1} />
                <FormError error={userDetailsErrors.timezone} />
              </If>
              <Gap level={1} />
              <SelectWrapper
                selectedValue={user.timezone}
                onSelect={(selected) => {
                  updateTimezone(selected);
                }}
                items={TIMEZONE_OPTIONS.map((option) => ({
                  name: option.label,
                  value: option.value,
                }))}
              />
              <Gap level={1} />
              <Button
                loading={updatingTimezone}
                disabled={user.timezone === originalUserTimezone}
                disabledBlock={user.timezone === originalUserTimezone}
                text={"Save Timezone"}
                style={{
                  marginLeft: "auto",
                  maxWidth: `${BUTTON_WIDTH}px`,
                }}
                onClick={() => {
                  updateTimezoneUpdateModalOpen(true);
                }}
              />
            </TimezoneSection>
          </EmailPreferencesSection>
        </AccountSettingsContainer>
      </GlassTileChildrenWrapper>
    </GlassTile>
  );
};

export default UserDetails;
