import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { isNotEmptyString } from "@utils/utils";
import { useEffect } from "react";

const useCheckResetPasswordFormErrors = (): void => {
  const { resetPasswordForm, resetPasswordFormErrors } = useLoginState();
  const { updateResetPasswordErrors } = useLoginDispatch();

  useEffect(() => {
    if (
      isNotEmptyString(resetPasswordForm.email) &&
      resetPasswordFormErrors.email
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, ...errors } = resetPasswordFormErrors;
      updateResetPasswordErrors(errors);
    }
  }, [resetPasswordForm, resetPasswordFormErrors, updateResetPasswordErrors]);
};

export default useCheckResetPasswordFormErrors;
