import type { JournalState } from "@pages/Journal/JournalState";
import type { LoginState } from "@pages/Login/LoginState";

export interface StoreState {
  login: LoginState;
  journal: JournalState;
}
