import type { AccountTemplate } from "@interfaces/CustomTypes";
import { keysToCamel } from "@utils/utils";

export default function useMapApiToAccountTemplate(): (
  api: any,
) => AccountTemplate {
  return (api: any) => {
    const base = keysToCamel(api);

    return {
      ...base,
      isEval: base.isEvaluation,
      image: base.displayImage,
    };
  };
}
