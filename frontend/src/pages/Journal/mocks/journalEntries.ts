import type { JournalEntry } from "../JournalInterfaces";

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 1,
    date_time: "2011-10-10T14:48:00.000+09:00",
    totalPnL: 620, // 310 × 2
    description:
      "Price delivered cleanly from the higher timeframe bias after sweeping liquidity on the external range. Displacement was strong, confirming intent, and price retraced into the 50% of the move where an IFVG formed. Execution was taken mechanically across both participating accounts with no hesitation. Clean follow-through into target made this a high-quality, textbook model trade.",
    risk: 200,
    contracts: 2,
    outcome: 310,
    instrument: "ES",
    tags: ["sweep"],
    trades: [1, 2], // ✅ only winning trades
    image: "",
    accounts: [1, 2],
  },
  {
    id: 2,
    date_time: "2011-10-11T14:48:00.000+09:00",
    totalPnL: -300, // -150 × 2
    description:
      "Higher timeframe bias was present, but the execution lacked conviction. The retracement into the 50% zone was choppy and displacement into the IFVG was weak, indicating poor momentum. Entry was still taken based on rules, but price failed to follow through and reversed sharply, stopping out both participating accounts.",
    risk: 100,
    contracts: 1,
    outcome: -150,
    instrument: "ES",
    tags: ["messy"],
    trades: [4, 5], // ❌ only losing trades
    image: "",
    accounts: [4, 5],
  },
  {
    id: 3,
    date_time: "2011-10-12T14:48:00.000+09:00",
    totalPnL: 930, // 310 × 3
    description:
      "Clear liquidity sweep followed by strong displacement confirmed bullish intent. Price retraced efficiently into the 50% IFVG, offering a precise and mechanical entry. All three accounts executed the same setup cleanly and captured the expansion leg into target with no drawdown issues.",
    risk: 200,
    contracts: 2,
    outcome: 310,
    instrument: "ES",
    tags: ["displacement"],
    trades: [1, 2, 3], // ✅ only winning trades
    image: "",
    accounts: [1, 2, 3],
  },
  {
    id: 4,
    date_time: "2011-10-13T14:48:00.000+09:00",
    totalPnL: -150, // -150 × 1
    description:
      "Setup met baseline criteria with HTF alignment and a retracement into the IFVG, but the market failed to show any real continuation. Entry was taken mechanically, however price immediately reversed and took out the stop, resulting in a controlled single-account loss.",
    risk: 100,
    contracts: 1,
    outcome: -150,
    instrument: "ES",
    tags: ["loss"],
    trades: [4], // ❌ losing trade
    image: "",
    accounts: [4],
  },
  {
    id: 5,
    date_time: "2011-10-14T14:48:00.000+09:00",
    totalPnL: 930, // 310 × 3
    description:
      "Strong higher timeframe narrative with a clean liquidity sweep and decisive displacement. Price retraced into the 50% IFVG, providing a high-probability entry. Three accounts participated and executed uniformly, all capturing the move into target. Clean, disciplined execution with no deviation from the model.",
    risk: 200,
    contracts: 2,
    outcome: 310,
    instrument: "ES",
    tags: ["clean"],
    trades: [1, 2, 3], // ✅ only winning trades
    image: "",
    accounts: [1, 2, 3],
  },
];
