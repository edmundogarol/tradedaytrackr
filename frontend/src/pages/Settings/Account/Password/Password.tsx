import Button from "@components/Button/Button";
import FormSuccess from "@components/Error/FormSuccess/FormSuccess";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import Loading from "@components/Loading/Loading";
import LockIcon from "@mui/icons-material/Lock";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { initialState } from "@pages/Login/LoginState";
import { BUTTON_WIDTH } from "@styles/constants";
import { isNotEmptyString } from "@utils/utils";
import React, { useCallback, useState } from "react";
import {
  AccountDetailsSection,
  AccountSettingsContainer,
  PasswordSection,
  SubsectionHeaderWrapper,
} from "../AccountStyledComponents";
import useUpdateUserSubmitHandler from "../hooks/useUpdateUserSubmitHandler";

const Password: React.FunctionComponent = () => {
  const { passwordForm, userUpdateSuccess } = useLoginState();
  const { updatePasswordForm, updateUserUpdateSuccess } = useLoginDispatch();
  const { updateUser: updateUserCall, loading } = useUpdateUserSubmitHandler();
  const [previousPasswordDetails, setPreviousPasswordDetails] = React.useState(
    initialState.passwordForm,
  );
  const passwordFieldsAreDirty = React.useMemo(() => {
    const dirtyFields =
      (passwordForm.current_password !==
        previousPasswordDetails.current_password &&
        isNotEmptyString(passwordForm.current_password)) ||
      (passwordForm.new_password !== previousPasswordDetails.new_password &&
        isNotEmptyString(passwordForm.new_password)) ||
      (passwordForm.confirm_new_password !==
        previousPasswordDetails.confirm_new_password &&
        isNotEmptyString(passwordForm.confirm_new_password));
    return dirtyFields;
  }, [passwordForm, previousPasswordDetails]);

  const [isPristine, setIsPristine] = useState(true);
  const handleFirstFocus = useCallback((): void => {
    if (isPristine) {
      updatePasswordForm({
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
      setIsPristine(false);
    }
  }, [isPristine, updatePasswordForm]);

  return (
    <PasswordSection>
      <GlassTile
        featureTile
        minHeight={10}
        minWidth={10}
        padding={7}
        noGlow={true}
      >
        <GlassTileChildrenWrapper>
          <SubsectionHeaderWrapper>
            <LockIcon style={{ color: "white", marginRight: 5 }} />
            Password
          </SubsectionHeaderWrapper>
          <AccountSettingsContainer>
            <AccountDetailsSection>
              <Input
                onFocus={handleFirstFocus}
                value={passwordForm.current_password}
                label="Current Password"
                type="password"
                darkMode
                onChange={(e) => {
                  updateUserUpdateSuccess(false);
                  updatePasswordForm({
                    ...passwordForm,
                    current_password: e.target.value,
                  });
                }}
              />
              <Gap level={1} />
              <Input
                onFocus={handleFirstFocus}
                value={passwordForm.new_password}
                label="New Password"
                type="password"
                darkMode
                onChange={(e) => {
                  updateUserUpdateSuccess(false);
                  updatePasswordForm({
                    ...passwordForm,
                    new_password: e.target.value,
                  });
                }}
              />
              <Gap level={1} />
              <Input
                onFocus={handleFirstFocus}
                value={passwordForm.confirm_new_password}
                label="Confirm Password"
                type="password"
                darkMode
                onChange={(e) => {
                  updateUserUpdateSuccess(false);
                  updatePasswordForm({
                    ...passwordForm,
                    confirm_new_password: e.target.value,
                  });
                }}
              />
              <Gap level={2} />
              <If condition={userUpdateSuccess}>
                <FormSuccess detail={"User details updated successfully!"} />
              </If>
              <Button
                disabledBlock={!passwordFieldsAreDirty}
                text={loading ? <Loading size={20} /> : "Update Password"}
                onClick={() => {
                  if (!passwordFieldsAreDirty) {
                    return;
                  }
                  updateUserCall(passwordForm);
                  setPreviousPasswordDetails(initialState.passwordForm);
                }}
                style={{
                  marginLeft: "auto",
                  maxWidth: `${BUTTON_WIDTH}px`,
                }}
              />
            </AccountDetailsSection>
          </AccountSettingsContainer>
        </GlassTileChildrenWrapper>
      </GlassTile>
    </PasswordSection>
  );
};

export default Password;
