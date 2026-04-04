import type { StoreState } from "@redux/interfaces";
import { useSelector } from "react-redux";
import type { JournalState } from "../JournalState";

const useJournalState = (): JournalState => {
  return useSelector((state: StoreState) => state.journal);
};

export default useJournalState;
