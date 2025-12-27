import { useSelector } from "react-redux";
import type { StoreState } from "@redux/interfaces";
import type { LoginState } from "../LoginState";

const useLoginState = (): LoginState => {
  return useSelector((state: StoreState) => state.login);
};

export default useLoginState;
