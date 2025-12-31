import useLoginDispatch from "./useLoginDispatch";
import { initialState } from "../LoginState";
import useLogoutApiCall from "./useLogoutApiCall";

const useLogoutHandler = () => {
  const { updateUser, updateLoginForm } = useLoginDispatch();
  const logout = useLogoutApiCall();

  return async (): Promise<void> => {
    const { fetch } = logout();
    const { data, error } = await fetch();

    if (data) {
      updateLoginForm(initialState.loginForm);
      updateUser(initialState.user);
    } else {
      console.log("Logout fetch error", JSON.stringify(error));
    }
  };
};

export default useLogoutHandler;
