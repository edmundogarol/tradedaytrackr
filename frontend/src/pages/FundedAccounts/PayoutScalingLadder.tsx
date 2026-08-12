import { formatter } from "@utils/utils";
import React from "react";

export interface PayoutScalingLadderProps {
  ladder: number[];
  currentPayoutNumber: number | null | undefined;
  exhausted?: boolean;
}

const compactCurrency = (amount: number): string => {
  if (amount >= 1000) {
    const thousands = amount / 1000;
    const rounded = Number.isInteger(thousands)
      ? thousands.toString()
      : thousands.toFixed(1);
    return `$${rounded}K`;
  }
  return formatter.format(amount);
};

const PayoutScalingLadder: React.FC<PayoutScalingLadderProps> = ({
  ladder,
  currentPayoutNumber,
  exhausted,
}) => {
  const current = currentPayoutNumber || 0;

  return (
    <div style={{ width: 260, boxSizing: "border-box" }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
        {exhausted
          ? `All ${ladder.length} payouts used — no more allowed`
          : `Payout #${current} of ${ladder.length}: up to ${formatter.format(
              ladder[current - 1] || 0,
            )}`}
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {ladder.map((amount, idx) => {
          const payoutNumber = idx + 1;
          const isCurrent = !exhausted && payoutNumber === current;
          const isPast = payoutNumber < current || exhausted;

          return (
            <div
              key={idx}
              style={{
                width: 40,
                boxSizing: "border-box",
                textAlign: "center",
                padding: "4px 0",
                borderRadius: 5,
                fontSize: 10,
                lineHeight: 1.3,
                fontWeight: isCurrent ? 700 : 500,
                background: isCurrent ? "#7bb75d" : "#eef0f2",
                color: isCurrent ? "#ffffff" : isPast ? "#a8adb3" : "#5b6167",
                border: isCurrent ? "none" : "1px solid #dde1e5",
              }}
            >
              <div>{compactCurrency(amount)}</div>
              <div style={{ opacity: 0.75, fontSize: 8 }}>#{payoutNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayoutScalingLadder;
