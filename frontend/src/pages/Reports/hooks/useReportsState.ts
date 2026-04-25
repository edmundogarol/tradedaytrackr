import type { StoreState } from "@redux/interfaces";
import { useSelector } from "react-redux";
import type { ReportsState } from "../ReportsState";

const useReportsState = (): ReportsState => {
  return useSelector((state: StoreState) => state.reports);
};

export default useReportsState;
