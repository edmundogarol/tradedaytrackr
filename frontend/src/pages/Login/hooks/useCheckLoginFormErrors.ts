import { isNotEmptyString } from "@utils/utils";
import { useEffect } from "react";
import useLoginState from "./useLoginState";
import useLoginDispatch from "./useLoginDispatch";

const useCheckLoginFormErrors = (): void => {
  const { loginForm, loginFormErrors } = useLoginState();
  const { updateLoginFormErrors } = useLoginDispatch();

  useEffect(() => {
    if (isNotEmptyString(loginForm.email) && loginFormErrors.email) {
      const { ...errors } = loginFormErrors;
      updateLoginFormErrors(errors);
    }
    if (isNotEmptyString(loginForm.password) && loginFormErrors.password) {
      const { ...errors } = loginFormErrors;
      updateLoginFormErrors(errors);
    }
  }, [loginForm, loginFormErrors, updateLoginFormErrors]);
};

export default useCheckLoginFormErrors;
