import type { AccountTemplate } from "@interfaces/CustomTypes";
import useSettingsState from "./useSettingsState";

const useGetEvalAccountTemplates = (): AccountTemplate[] => {
  const { accountTemplates } = useSettingsState();
  return accountTemplates.filter((template) => template.isEval);
};

export default useGetEvalAccountTemplates;
