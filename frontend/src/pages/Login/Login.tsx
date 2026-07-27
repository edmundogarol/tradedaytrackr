import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import Page from "@components/Page/Page";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import React, { useEffect, useState } from "react";
import useLoginDispatch from "./hooks/useLoginDispatch";
import useLoginState from "./hooks/useLoginState";
import {
  Container,
  ImageContainer,
  InputsContainer,
  LoginButton,
  MainImage,
} from "./LoginStyledComponents";

import useRenderInputIcon from "../../components/Input/hooks/useRenderInputIcon";
import useCheckLoginFormErrors from "./hooks/useCheckLoginFormErrors";
import useLoginSubmitHandler from "./hooks/useLoginSubmitHandler";

const Login: React.FunctionComponent = () => {
  const { user, loginForm, loginFormErrors, isHydrated } = useLoginState();
  const { updateLoginForm } = useLoginDispatch();
  const renderInputIcon = useRenderInputIcon();
  const { login, loading } = useLoginSubmitHandler();
  const [shineDone, setShineDone] = useState(false);
  const navigation = useReactNavigation();

  useEffect(() => {
    const timer = setTimeout(() => setShineDone(true), 1500);
    return (): void => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated && user.logged_in) {
      navigation.navigate(PageEnum.Dashboard);
    }
  }, [isHydrated, user.logged_in]);

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
            <Gap level={1} />
            <LoginButton loading={loading} text={"Log In"} onClick={login} />
          </InputsContainer>
        </If>
      </Container>
    </Page>
  );
};

export default Login;
