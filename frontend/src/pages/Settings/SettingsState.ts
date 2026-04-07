import type { AccountTemplate, Tag } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { accountTemplatesMock } from "./mocks/accountTemplates";
import { tagsMock } from "./mocks/tags";

export interface SettingsState {
  readonly selectedAccountTemplate: AccountTemplate;
  readonly accountTemplates: AccountTemplate[];
  readonly tags: Tag[];
  readonly addAccountTemplateModalOpen?: boolean;
  readonly addAccountTemplateErrors?: { [key: string]: any };
  readonly addTagModalOpen?: boolean;
}

export const initialState: SettingsState = {
  selectedAccountTemplate: {
    id: 0,
    name: undefined,
    firm: undefined,
    image: undefined,
    accountSize: undefined,
    minTradingDays: undefined,
    minBufferTarget: undefined,
    allowablePayoutRequest: undefined,
    profitSplit: undefined,
    minDayPnl: undefined,
    maxDrawdown: undefined,
    isEval: false,
    profitTarget: undefined,
    consistency: undefined,
  },
  accountTemplates: accountTemplatesMock,
  tags: tagsMock,
  addAccountTemplateModalOpen: false,
  addAccountTemplateErrors: {},
  addTagModalOpen: false,
};

type UpdateAccountTemplatesAction = PayloadAction<AccountTemplate[]>;
type UpdateTagsAction = PayloadAction<Tag[]>;
type UpdateSelectedAccountTemplateAction = PayloadAction<AccountTemplate>;
type UpdateAddAccountModalOpenAction = PayloadAction<boolean>;
type UpdateAddTagModalOpenAction = PayloadAction<boolean>;
type UpdateAddAccountTemplateErrorsAction = PayloadAction<{
  [key: string]: any;
}>;

export type SettingsAction =
  | UpdateAccountTemplatesAction
  | UpdateTagsAction
  | UpdateSelectedAccountTemplateAction
  | UpdateAddAccountModalOpenAction
  | UpdateAddTagModalOpenAction
  | UpdateAddAccountTemplateErrorsAction;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateAccountTemplates: (state, action: UpdateAccountTemplatesAction) => {
      state.accountTemplates = action.payload;
    },
    updateTags: (state, action: UpdateTagsAction) => {
      state.tags = action.payload;
    },
    updateSelectedAccountTemplate: (
      state,
      action: UpdateSelectedAccountTemplateAction,
    ) => {
      state.selectedAccountTemplate = action.payload;
    },
    updateAddAccountModalOpen: (
      state,
      action: UpdateAddAccountModalOpenAction,
    ) => {
      state.addAccountTemplateModalOpen = action.payload;
    },
    updateAddTagModalOpen: (state, action: UpdateAddTagModalOpenAction) => {
      state.addTagModalOpen = action.payload;
    },
    updateAccountTemplatesErrors: (
      state,
      action: UpdateAddAccountTemplateErrorsAction,
    ) => {
      state.addAccountTemplateErrors = action.payload;
    },
  },
});

export const {
  updateAccountTemplates,
  updateTags,
  updateSelectedAccountTemplate,
  updateAddAccountModalOpen,
  updateAddTagModalOpen,
  updateAccountTemplatesErrors,
} = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

export default settingsSlice.reducer;
