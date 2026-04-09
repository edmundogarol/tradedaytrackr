import { useSelector } from "react-redux";
import type { FundedAccountsState } from "../FundedAccountsState";

const useFundedAccountsState = (): FundedAccountsState => {
  return useSelector((state: any) => state.fundedAccounts);
};

export default useFundedAccountsState;
