import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import FormSuccess from "@components/Error/FormSuccess/FormSuccess";
import Gap from "@components/Gap/Gap";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import Input from "@components/Input/Input";
import Page from "@components/Page/Page";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useConfirmResetPasswordHandler from "../hooks/useConfirmResetPasswordHandler";
import {
  Container,
  Header,
  InputsContainer,
} from "../ResetPasswordStyledComponents";

const ConfirmPassword: React.FunctionComponent = () => {
  const { resetPasswordForm, resetPasswordFormErrors, resetPasswordFormSent } =
    useLoginState();
  const { updateResetPasswordForm } = useLoginDispatch();
  const renderInputIcon = useRenderInputIcon();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { confirmResetPassword, loading } = useConfirmResetPasswordHandler();
  const navigation = useReactNavigation();

  useEffect(() => {
    if (token) {
      updateResetPasswordForm({ token });
    }
  }, [token]);

  return (
    <Page sideDrawer={false}>
      <Container>
        <Gap level={1} />
        <Header>{"Reset Password"}</Header>
        <Gap level={1} />
        <InputsContainer>
          <If condition={!resetPasswordFormSent}>
            <Input
              type="password"
              label="New Password"
              placeholder="Enter new password"
              value={resetPasswordForm.password}
              error={resetPasswordFormErrors.password}
              onChange={(e) => {
                updateResetPasswordForm({ password: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "lock",
                IconTypeEnum.MaterialIcons,
                resetPasswordFormErrors.password,
              )}
            />
            <Gap level={1} />
            <Input
              type="password"
              label="Confirm New Password"
              placeholder="Confirm password"
              value={resetPasswordForm.confirm_password}
              error={resetPasswordFormErrors.confirm_password}
              onChange={(e) => {
                updateResetPasswordForm({
                  confirm_password: e.currentTarget.value,
                });
              }}
              icon={renderInputIcon(
                "lock",
                IconTypeEnum.MaterialIcons,
                resetPasswordFormErrors.password,
              )}
            />
          </If>
          <FormError
            error={
              resetPasswordFormErrors["error"] ||
              resetPasswordFormErrors["detail"]
            }
          />
          <If condition={resetPasswordFormSent}>
            <FormSuccess
              detail={
                "Your password has been reset successfully. You can now log in with your new password."
              }
            />
            <Button
              loading={loading}
              text={"Go to Login"}
              onClick={() => navigation.navigate(PageEnum.Login)}
            />
          </If>
        </InputsContainer>
        <Gap level={1} />

        <If condition={!resetPasswordFormSent}>
          <Button
            loading={loading}
            text={"Reset Password"}
            onClick={() => confirmResetPassword()}
          />
        </If>
      </Container>
    </Page>
  );
};

export default ConfirmPassword;
