import type { StoreState } from "@redux/interfaces";
import { useSelector } from "react-redux";
import type { PayoutsState } from "../PayoutsState";

const usePayoutsState = (): PayoutsState => {
  return useSelector((state: StoreState) => state.payouts);
};

export default usePayoutsState;
