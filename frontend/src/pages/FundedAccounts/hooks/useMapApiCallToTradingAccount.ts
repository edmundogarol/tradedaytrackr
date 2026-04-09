import type { TradingAccount } from "@interfaces/CustomTypes";
import { keysToCamel } from "@utils/utils";

export default function useMapApiToTradingAccount(): (
  api: any,
) => TradingAccount {
  return (api: any) => {
    const base = keysToCamel(api);

    return {
      ...base,
      name: base.accountName,
      isEval: base.isEvaluation,
    };
  };
}
