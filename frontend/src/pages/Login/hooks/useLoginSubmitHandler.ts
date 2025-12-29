import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useLoginState from "./useLoginState";
import useLoginDispatch from "./useLoginDispatch";
import useLoginSubmitApiCall from "./useLoginSubmitApiCall";
import { initialState, updateLoginForm } from "../LoginState";

interface LoginSubmitHandler {
  login: () => void;
  loading: boolean;
}

const useLoginSubmitHandler = (): LoginSubmitHandler => {
  const { loginForm } = useLoginState();
  const { updateUser, updateLoginFormErrors } = useLoginDispatch();
  const { fetch, loading } = useLoginSubmitApiCall();

  return {
    login: useCallback(async () => {
      if (
        !isNotEmptyString(loginForm.email) ||
        !isNotEmptyString(loginForm.password)
      ) {
        const loginFormErrorsLocal = {};
        if (!isNotEmptyString(loginForm.email)) {
          set(loginFormErrorsLocal, "email", "Please enter email");
        }
        if (!isNotEmptyString(loginForm.password)) {
          set(loginFormErrorsLocal, "password", "Please enter password");
        }
        updateLoginFormErrors(loginFormErrorsLocal);
      } else {
        const { error, data } = await fetch();

        if (data && data?.user) {
          updateUser({
            ...data?.user,
            logged_in: data?.logged_in,
          });
          updateLoginForm(initialState.loginForm);
          updateLoginFormErrors({});
        } else {
          if (error) {
            updateLoginFormErrors({ ...error });
          } else {
            console.log("Login Post fetch error", error);
          }
        }
      }
    }, [loading, loginForm]),
    loading,
  };
};

export default useLoginSubmitHandler;
