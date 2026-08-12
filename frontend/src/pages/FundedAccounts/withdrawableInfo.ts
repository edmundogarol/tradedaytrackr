import type { WithdrawableBreakdown } from "@interfaces/CustomTypes";
import { formatter } from "@utils/utils";

export const getWithdrawableInfoDescription = (
  breakdown: WithdrawableBreakdown | undefined,
): string => {
  if (!breakdown) {
    return "Amount currently withdrawable based on your account's profit and firm rules.";
  }

  const {
    rule,
    floor,
    profitAboveFloor,
    safetyNet,
    profitAboveSafetyNet,
    withdrawalSplit,
    payoutCap,
    payoutCapSource,
    minPayoutRequest,
    isMinDaysMet,
    currentDayCount,
    minTradingDays,
    isConsistencyMet,
    consistencyScore,
    consistencyThreshold,
  } = breakdown;

  const whatParts: string[] = [];

  if (rule === "static_floor") {
    whatParts.push(
      `What's withdrawable: ${formatter.format(profitAboveFloor || 0)} profit above the ${formatter.format(floor || 0)} minimum balance this firm requires you to keep`,
    );
  } else {
    whatParts.push(
      `What's withdrawable: ${formatter.format(profitAboveSafetyNet || 0)} profit above your ${formatter.format(safetyNet || 0)} safety net`,
    );
  }

  if (withdrawalSplit !== null && withdrawalSplit !== undefined) {
    whatParts.push(`at a ${withdrawalSplit}% split`);
  }

  // Apex's ladder cap is shown as a visual (PayoutScalingLadder) alongside
  // this text when it applies, so it's left out here to avoid repeating it.
  let capNote = "";
  if (payoutCapSource === "account_max") {
    capNote = `Capped at ${formatter.format(payoutCap || 0)} max per payout`;
  }

  const sentences = [
    `${whatParts.join(" ")}.`,
    capNote ? `${capNote}.` : "",
    `Minimum payout request is ${formatter.format(minPayoutRequest)}.`,
    `When it's withdrawable: ${isMinDaysMet ? "✓" : "✗"} min trading days ${currentDayCount}/${minTradingDays}, ${isConsistencyMet ? "✓" : "✗"} consistency ${consistencyScore}%${consistencyThreshold ? ` (must stay under ${consistencyThreshold}%)` : ""}.`,
  ];

  return sentences.filter(Boolean).join(" ");
};

export const getEligibilityDescription = (
  breakdown: WithdrawableBreakdown,
): string => {
  const {
    isMinDaysMet,
    currentDayCount,
    minTradingDays,
    isConsistencyMet,
    consistencyScore,
    consistencyThreshold,
  } = breakdown;

  return `${isMinDaysMet ? "✓" : "✗"} Min trading days ${currentDayCount}/${minTradingDays} · ${isConsistencyMet ? "✓" : "✗"} Consistency ${consistencyScore}%${consistencyThreshold ? ` (< ${consistencyThreshold}%)` : ""}`;
};
