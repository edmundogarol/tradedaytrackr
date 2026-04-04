import { journalReducer } from "@pages/Journal/JournalState";
import { loginReducer } from "@pages/Login/LoginState";
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});
