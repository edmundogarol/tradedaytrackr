import { color } from "@styles/colors";
import { formatter } from "@utils/utils";
import React from "react";

export interface PayoutScalingLadderProps {
  ladder: number[];
  currentPayoutNumber: number | null | undefined;
  exhausted?: boolean;
}

const PayoutScalingLadder: React.FC<PayoutScalingLadderProps> = ({
  ladder,
  currentPayoutNumber,
  exhausted,
}) => {
  const current = currentPayoutNumber || 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 260 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>
        {exhausted
          ? `All ${ladder.length} payouts used on this PA — no more payouts allowed`
          : `On payout #${current} of ${ladder.length} — up to ${formatter.format(
              ladder[current - 1] || 0,
            )} this cycle`}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {ladder.map((amount, idx) => {
          const payoutNumber = idx + 1;
          const isCurrent = !exhausted && payoutNumber === current;
          const isPast = payoutNumber < current || exhausted;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "5px 2px",
                borderRadius: 6,
                fontSize: 11,
                lineHeight: 1.4,
                fontWeight: isCurrent ? 700 : 400,
                background: isCurrent
                  ? color("SystemGreen")
                  : isPast
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.04)",
                color: isCurrent
                  ? "#0b0f14"
                  : isPast
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.75)",
                border: isCurrent
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>{formatter.format(amount)}</div>
              <div style={{ opacity: 0.7, fontSize: 9 }}>#{payoutNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayoutScalingLadder;
