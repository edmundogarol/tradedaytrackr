import React from "react";
import Input from "@components/Input/Input";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import useCheckSignUpFormErrors from "@pages/SignUp/hooks/useCheckSignUpFormErrors";
import useSignUpHandler from "@pages/SignUp/hooks/useSignUpHandler";
import FormError from "@components/Error/FormError/FormError";
import Page from "@components/Page/Page";
import {
  SignUpButton,
  SignUpContainer,
  SignUpHeader,
  SignUpHeaderContainer,
  SignUpInputsContainer,
  SignUpScrollView,
} from "./SignUpStyledComponents";

const SignUp: React.FunctionComponent = () => {
  const { updateSignUpForm } = useLoginDispatch();
  const { signUpForm, signUpFormErrors } = useLoginState();
  const { signUp, loading } = useSignUpHandler();
  const renderInputIcon = useRenderInputIcon();

  useCheckSignUpFormErrors();

  return (
    <Page sideDrawer={false}>
      <SignUpContainer>
        <SignUpScrollView>
          <Gap level={3} />
          <SignUpHeaderContainer>
            <Gap level={1} />
            <SignUpHeader>{"Sign Up"}</SignUpHeader>
          </SignUpHeaderContainer>
          <Gap level={1} />
          <SignUpInputsContainer>
            <Input
              label="First Name"
              placeholder="Enter first name"
              value={signUpForm.first_name}
              error={signUpFormErrors.first_name}
              onChange={(e) => {
                updateSignUpForm({ first_name: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "person",
                IconTypeEnum.FontAwesome,
                signUpFormErrors.first_name
              )}
            />
            <Input
              label="Last Name"
              placeholder="Enter last name"
              value={signUpForm.last_name}
              error={signUpFormErrors.last_name}
              onChange={(e) => {
                updateSignUpForm({ last_name: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "person",
                IconTypeEnum.FontAwesome,
                signUpFormErrors.last_name
              )}
            />
            <Input
              label="Email"
              placeholder="Enter email"
              value={signUpForm.email}
              error={signUpFormErrors.email}
              onChange={(e) => {
                updateSignUpForm({ email: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "mail",
                IconTypeEnum.MaterialIcons,
                signUpFormErrors.email
              )}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              value={signUpForm.password}
              error={signUpFormErrors.password}
              onChange={(e) => {
                updateSignUpForm({ password: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "lock",
                IconTypeEnum.MaterialCommunityIcons,
                signUpFormErrors.password
              )}
              type="password"
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm password"
              value={signUpForm.confirm_password}
              error={signUpFormErrors.confirm_password}
              onChange={(e) => {
                updateSignUpForm({ confirm_password: e.currentTarget.value });
              }}
              icon={renderInputIcon(
                "lock",
                IconTypeEnum.MaterialCommunityIcons,
                signUpFormErrors.confirm_password
              )}
              type="password"
            />
            <FormError
              error={signUpFormErrors["error"] || signUpFormErrors["detail"]}
            />
          </SignUpInputsContainer>
          <SignUpButton
            loading={loading}
            text={"Submit"}
            onClick={() => signUp()}
          />
        </SignUpScrollView>
      </SignUpContainer>
    </Page>
  );
};

export default SignUp;
