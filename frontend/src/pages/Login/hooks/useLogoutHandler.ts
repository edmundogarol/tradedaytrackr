import { initialState } from "../LoginState";
import useLoginDispatch from "./useLoginDispatch";
import useLogoutApiCall from "./useLogoutApiCall";

const useLogoutHandler = () => {
  const { updateUser, updateLoginForm, updateIsHydrated } = useLoginDispatch();
  const logout = useLogoutApiCall();

  return async (): Promise<void> => {
    const { fetch } = logout();
    const { data, error } = await fetch();

    if (data) {
      updateLoginForm(initialState.loginForm);
      updateUser(initialState.user);
      updateIsHydrated(true);
    } else {
      console.log("Logout fetch error", JSON.stringify(error));
    }
  };
};

export default useLogoutHandler;
