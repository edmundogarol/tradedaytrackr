import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import Page from "@components/Page/Page";
import { PageEnum } from "@interfaces/NavigationTypes";
import { linkToUrl } from "@navigation/hooks/link";
import React, { useEffect, useState } from "react";
import useLoginDispatch from "./hooks/useLoginDispatch";
import useLoginState from "./hooks/useLoginState";
import {
  Container,
  ForgotPasswordLink,
  ImageContainer,
  InputsContainer,
  LoginButton,
  MainImage,
  SignUpLink,
  SignUpText,
  SignUpTextContainer,
} from "./LoginStyledComponents";

import useRenderInputIcon from "../../components/Input/hooks/useRenderInputIcon";
import useCheckLoginFormErrors from "./hooks/useCheckLoginFormErrors";
import useLoginSubmitHandler from "./hooks/useLoginSubmitHandler";
import { updateResetPasswordForm } from "./LoginState";

const Login: React.FunctionComponent = () => {
  const { user, loginForm, loginFormErrors } = useLoginState();
  const {
    updateLoginForm,
    updateResetPasswordFormSent,
    updateResetPasswordErrors,
  } = useLoginDispatch();
  const renderInputIcon = useRenderInputIcon();
  const { login, loading } = useLoginSubmitHandler();
  const [shineDone, setShineDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShineDone(true), 1500);
    return (): void => clearTimeout(timer);
  }, []);

  useCheckLoginFormErrors();

  return (
    <Page topBar={false} sideDrawer={false}>
      <Container>
        <ImageContainer>
          <MainImage $shineDone={shineDone} />
        </ImageContainer>
        <Gap level={1} />
        <If condition={!user?.logged_in}>
          <InputsContainer>
            <Input
              value={loginForm.email}
              error={loginFormErrors.email}
              placeholder="Enter email or username"
              onChange={(e) => {
                updateLoginForm({ email: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "person",
                IconTypeEnum.MaterialIcons,
                loginFormErrors.email,
              )}
            />
            <Gap level={1} />
            <Input
              value={loginForm.password}
              error={loginFormErrors.password}
              placeholder="Enter password"
              onChange={(e) => {
                updateLoginForm({
                  ...loginForm,
                  password: e.currentTarget.value,
                });
              }}
              icon={renderInputIcon(
                "lock",
                IconTypeEnum.MaterialIcons,
                loginFormErrors.password,
              )}
              type="password"
            />
            <Gap level={1} />
            <FormError
              error={loginFormErrors["error"] || loginFormErrors["detail"]}
            />
            <ForgotPasswordLink
              to={linkToUrl(PageEnum.ResetPassword)}
              onClick={() => {
                updateResetPasswordFormSent(false);
                updateResetPasswordForm({ email: "" });
                updateResetPasswordErrors({});
              }}
            >
              {"Forgot Password?"}
            </ForgotPasswordLink>
            <Gap level={1} />
            <LoginButton loading={loading} text={"Login"} onClick={login} />
          </InputsContainer>
          <SignUpTextContainer>
            <SignUpText>{"Don't have an account?"}</SignUpText>
            <SignUpLink to={linkToUrl(PageEnum.SignUp)}>{"Sign Up"}</SignUpLink>
          </SignUpTextContainer>
        </If>
      </Container>
    </Page>
  );
};

export default Login;
