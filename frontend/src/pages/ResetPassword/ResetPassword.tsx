import React from "react";
import Input from "@components/Input/Input";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import Button from "@components/Button/Button";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { If } from "@components/If/If";
import FormSuccess from "@components/Error/FormSuccess/FormSuccess";
import FormError from "@components/Error/FormError/FormError";
import Page from "@components/Page/Page";
import useResetPasswordHandler from "./hooks/useResetPasswordHandler";
import useCheckResetPasswordFormErrors from "./hooks/useCheckResetPasswordFormErrors";
import {
  Container,
  Header,
  InputsContainer,
} from "./ResetPasswordStyledComponents";

const ResetPassword: React.FunctionComponent = () => {
  const { resetPasswordForm, resetPasswordFormErrors, resetPasswordFormSent } =
    useLoginState();
  const { updateResetPasswordForm } = useLoginDispatch();
  const { resetPassword, loading } = useResetPasswordHandler();
  const renderInputIcon = useRenderInputIcon();

  useCheckResetPasswordFormErrors();

  return (
    <Page sideDrawer={false}>
      <Container>
        <Gap level={1} />
        <Header>{"Reset Password"}</Header>
        <Gap level={1} />
        <InputsContainer>
          <If condition={!resetPasswordFormSent}>
            <Input
              placeholder="Enter email"
              value={resetPasswordForm.email}
              error={resetPasswordFormErrors.email}
              onChange={(e) => {
                updateResetPasswordForm({ email: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "mail",
                IconTypeEnum.MaterialIcons,
                resetPasswordFormErrors.email
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
                "We've sent you an email with password reset instructions if there's an account with your email. Check your inbox and spam folder if you don't receive it soon."
              }
            />
          </If>
        </InputsContainer>
        <If condition={!resetPasswordFormSent}>
          <Button
            loading={loading}
            text={"Send Reset Link"}
            onClick={() => resetPassword()}
          />
        </If>
      </Container>
    </Page>
  );
};

export default ResetPassword;
