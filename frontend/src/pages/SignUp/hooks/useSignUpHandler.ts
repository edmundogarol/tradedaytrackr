import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { initialState } from "@pages/Login/LoginState";
import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useSignUpApiCall from "./useSignUpApiCall";

interface SignUpSubmitHandler {
  signUp: () => void;
  loading: boolean;
}

const useSignUpHandler = (): SignUpSubmitHandler => {
  const { signUpForm } = useLoginState();
  const {
    updateUser,
    updateSignUpFormErrors,
    updateLoginFormErrors,
    updateSignUpForm,
  } = useLoginDispatch();
  const signUpApiCall = useSignUpApiCall();
  const { loading, fetch } = signUpApiCall();
  const navigation = useReactNavigation();

  return {
    signUp: useCallback(async () => {
      if (
        !isNotEmptyString(signUpForm.email) ||
        !isNotEmptyString(signUpForm.password) ||
        !isNotEmptyString(signUpForm.first_name) ||
        !isNotEmptyString(signUpForm.last_name) ||
        !isNotEmptyString(signUpForm.confirm_password) ||
        (isNotEmptyString(signUpForm.confirm_password) &&
          signUpForm.confirm_password !== signUpForm.password)
      ) {
        const signUpFormErrorsLocal = {};
        if (!isNotEmptyString(signUpForm.email)) {
          set(signUpFormErrorsLocal, "email", "Please enter email");
        }
        if (!isNotEmptyString(signUpForm.password)) {
          set(signUpFormErrorsLocal, "password", "Please enter password");
        }
        if (!isNotEmptyString(signUpForm.first_name)) {
          set(signUpFormErrorsLocal, "first_name", "Please enter a first name");
        }
        if (!isNotEmptyString(signUpForm.last_name)) {
          set(signUpFormErrorsLocal, "last_name", "Please enter a last name");
        }
        if (!isNotEmptyString(signUpForm.confirm_password)) {
          set(
            signUpFormErrorsLocal,
            "confirm_password",
            "Please confirm password",
          );
        }
        if (
          isNotEmptyString(signUpForm.confirm_password) &&
          signUpForm.confirm_password !== signUpForm.password
        ) {
          set(
            signUpFormErrorsLocal,
            "confirm_password",
            "Passwords do not match",
          );
        }

        updateSignUpFormErrors(signUpFormErrorsLocal);
      } else {
        const { error, data } = await fetch();

        if (data?.user) {
          updateUser({
            ...data?.user,
            logged_in: data?.logged_in,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
          updateLoginFormErrors({});
          updateSignUpFormErrors({});
          updateSignUpForm({ ...initialState.signUpForm });
          navigation.navigate(PageEnum.Dashboard);
        } else {
          if (error) {
            updateSignUpFormErrors({ ...error });
          } else {
            console.log("Sign Up Post fetch error", JSON.stringify(error));
          }
        }
      }
    }, [
      fetch,
      navigation,
      signUpForm.confirm_password,
      signUpForm.email,
      signUpForm.first_name,
      signUpForm.last_name,
      signUpForm.password,
      updateLoginFormErrors,
      updateSignUpForm,
      updateSignUpFormErrors,
      updateUser,
    ]),
    loading,
  };
};

export default useSignUpHandler;
