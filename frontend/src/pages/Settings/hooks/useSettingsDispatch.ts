import type { AccountTemplate, Tag } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { SettingsAction } from "../SettingsState";
import {
  updateAccountTemplates,
  updateAccountTemplatesErrors,
  updateAddAccountModalOpen,
  updateAddTagErrors,
  updateAddTagModalOpen,
  updateDrawerOpen,
  updateSelectedAccountTemplate,
  updateSelectedTag,
  updateSystemAlert,
  updateTags,
  updateTemplateRules,
} from "../SettingsState";

interface SettingsDispatch {
  updateAccountTemplates(accountTemplates: AccountTemplate[]): void;
  updateTags(tags: Tag[]): void;
  updateSelectedAccountTemplate(accountTemplate: AccountTemplate | null): void;
  updateSelectedTag(tag: Tag | null): void;
  updateAddAccountModalOpen(isOpen: boolean): void;
  updateAddTagModalOpen(isOpen: boolean): void;
  updateAccountTemplatesErrors(errors: { [key: string]: any }): void;
  updateAddTagErrors(errors: { [key: string]: any }): void;
  updateTemplateRules(templateRules: any[]): void;
  updateSystemAlert(systemAlert: { [key: string]: any }): void;
  updateDrawerOpen(isOpen: boolean): void;
}

export const useSettingsDispatch = (): SettingsDispatch => {
  const dispatch: Dispatch<SettingsAction> = useDispatch();
  return {
    updateAccountTemplates(accountTemplates: AccountTemplate[]): void {
      dispatch(updateAccountTemplates(accountTemplates));
    },
    updateTags(tags: Tag[]): void {
      dispatch(updateTags(tags));
    },
    updateSelectedAccountTemplate(accountTemplate: AccountTemplate): void {
      dispatch(updateSelectedAccountTemplate(accountTemplate));
    },
    updateSelectedTag(tag: Tag): void {
      dispatch(updateSelectedTag(tag));
    },
    updateAddAccountModalOpen(isOpen: boolean): void {
      dispatch(updateAddAccountModalOpen(isOpen));
    },
    updateAddTagModalOpen(isOpen: boolean): void {
      dispatch(updateAddTagModalOpen(isOpen));
    },
    updateAccountTemplatesErrors(errors: { [key: string]: any }): void {
      dispatch(updateAccountTemplatesErrors(errors));
    },
    updateAddTagErrors(errors: { [key: string]: any }): void {
      dispatch(updateAddTagErrors(errors));
    },
    updateTemplateRules(templateRules: any[]): void {
      dispatch(updateTemplateRules(templateRules));
    },
    updateSystemAlert(systemAlert: { [key: string]: any }): void {
      dispatch(updateSystemAlert(systemAlert));
    },
    updateDrawerOpen(isOpen: boolean): void {
      dispatch(updateDrawerOpen(isOpen));
    },
  };
};

export default useSettingsDispatch;
