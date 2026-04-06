import type { AccountTemplate, Tag } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { SettingsAction } from "../SettingsState";
import {
  updateAccountTemplates,
  updateAddAccountModalOpen,
  updateAddTagModalOpen,
  updateSelectedAccountTemplate,
  updateTags,
} from "../SettingsState";

interface SettingsDispatch {
  updateAccountTemplates(accountTemplates: AccountTemplate[]): void;
  updateTags(tags: Tag[]): void;
  updateSelectedAccountTemplate(accountTemplate: AccountTemplate | null): void;
  updateAddAccountModalOpen(isOpen: boolean): void;
  updateAddTagModalOpen(isOpen: boolean): void;
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
    updateAddAccountModalOpen(isOpen: boolean): void {
      dispatch(updateAddAccountModalOpen(isOpen));
    },
    updateAddTagModalOpen(isOpen: boolean): void {
      dispatch(updateAddTagModalOpen(isOpen));
    },
  };
};

export default useSettingsDispatch;
