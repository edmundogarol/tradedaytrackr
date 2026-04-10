import type { AccountTemplate, Rule, Tag } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  readonly selectedAccountTemplate: AccountTemplate;
  readonly selectedTag: Tag;
  readonly accountTemplates: AccountTemplate[];
  readonly tags: Tag[];
  readonly addAccountTemplateModalOpen?: boolean;
  readonly addAccountTemplateErrors?: { [key: string]: any };
  readonly addTagModalOpen?: boolean;
  readonly addTagErrors?: { [key: string]: any };
  readonly templateRules: Rule[];
}

export const initialState: SettingsState = {
  selectedAccountTemplate: {
    id: 0,
    name: "",
    firm: undefined,
    image: undefined,
    accountSize: 0,
    minTradingDays: undefined,
    minBuffer: undefined,
    minPayoutRequest: undefined,
    maxPayoutRequest: undefined,
    profitSplit: undefined,
    minDayPnl: undefined,
    maxDrawdown: undefined,
    isEval: false,
    profitTarget: undefined,
    consistency: undefined,
    rules: [],
  },
  selectedTag: {
    id: 0,
    name: "",
    uses: 0,
  },
  accountTemplates: [],
  tags: [],
  addAccountTemplateModalOpen: false,
  addAccountTemplateErrors: {},
  addTagModalOpen: false,
  addTagErrors: {},
  templateRules: [],
};

type UpdateAccountTemplatesAction = PayloadAction<AccountTemplate[]>;
type UpdateSelectedTagAction = PayloadAction<Tag>;
type UpdateTagsAction = PayloadAction<Tag[]>;
type UpdateSelectedAccountTemplateAction = PayloadAction<AccountTemplate>;
type UpdateAddAccountModalOpenAction = PayloadAction<boolean>;
type UpdateAddTagModalOpenAction = PayloadAction<boolean>;
type UpdateAddAccountTemplateErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateAddTagErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateTemplateRulesAction = PayloadAction<Rule[]>;

export type SettingsAction =
  | UpdateAccountTemplatesAction
  | UpdateTagsAction
  | UpdateSelectedAccountTemplateAction
  | UpdateSelectedTagAction
  | UpdateAddAccountModalOpenAction
  | UpdateAddTagModalOpenAction
  | UpdateAddAccountTemplateErrorsAction
  | UpdateAddTagErrorsAction
  | UpdateTemplateRulesAction;

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
    updateSelectedTag: (state, action: UpdateSelectedTagAction) => {
      state.selectedTag = action.payload;
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
    updateAddTagErrors: (state, action: UpdateAddTagErrorsAction) => {
      state.addTagErrors = action.payload;
    },
    updateTemplateRules: (state, action: UpdateTemplateRulesAction) => {
      state.templateRules = action.payload;
    },
  },
});

export const {
  updateAccountTemplates,
  updateTags,
  updateSelectedAccountTemplate,
  updateSelectedTag,
  updateAddAccountModalOpen,
  updateAddTagModalOpen,
  updateAccountTemplatesErrors,
  updateAddTagErrors,
  updateTemplateRules,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsSlice.reducer;
