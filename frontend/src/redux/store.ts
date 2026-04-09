import { fundedAccountsReducer } from "@pages/FundedAccounts/FundedAccountsState";
import { journalReducer } from "@pages/Journal/JournalState";
import { loginReducer } from "@pages/Login/LoginState";
import { settingsReducer } from "@pages/Settings/SettingsState";
import { configureStore } from "@reduxjs/toolkit";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [],
    ignoredPaths: [],
  },
};

export default configureStore({
  reducer: {
    login: loginReducer,
    journal: journalReducer,
    settings: settingsReducer,
    fundedAccounts: fundedAccountsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});
