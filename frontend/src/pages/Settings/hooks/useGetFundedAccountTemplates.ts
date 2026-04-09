import type { AccountTemplate } from "@interfaces/CustomTypes";
import useSettingsState from "./useSettingsState";

const useGetFundedAccountTemplates = (): AccountTemplate[] => {
  const { accountTemplates } = useSettingsState();
  return accountTemplates.filter((template) => !template.isEval);
};

export default useGetFundedAccountTemplates;
