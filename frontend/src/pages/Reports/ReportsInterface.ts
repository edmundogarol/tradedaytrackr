export interface ReportData {
  equityCurve: { date: string; equity: number }[];
  keyStats: {
    bestTrade: number;
    worstTrade: number;
    maxConsecutiveWins: number;
    maxConsecutiveLosses: number;
    avgTradeDurationSeconds: number | null;
  };
  overview: {
    totalPnl: number;
    winRate: number;
    totalTrades: number;
    profitFactor: number;
    expectancy: number;
    avgWin: number;
    avgLoss: number;
  };
  pnlDistribution: {
    bigWins: number;
    smallWins: number;
    smallLosses: number;
    bigLosses: number;
  };
  performanceByDay: { day: string; pnl: number }[];
  riskManagement: {
    maxDrawdown: number;
    recoveryFactor: number;
  };
  tags: { name: string; count: number }[];
  recentTrades: {
    id: number;
    account: { id: number; name: string; type: string };
    date: string;
    pnl: string;
    journalEntry: {
      id: number;
      dateTime: string;
      instrument: string;
      risk: string;
      evalRisk: string | null;
      contracts: number;
      evalContracts: number | null;
      outcome: string;
      evalOutcome: string | null;
      description: string;
      image: string;
      imageUrl: string;
      tagObjects: { id: number; name: string }[];
      tradeIds: number[];
      evalTradeIds: number[];
      totalPnl: number;
      totalEvalPnl: number;
      accountCount: number;
      evalAccountCount: number;
    } | null;
    isPayout: boolean;
    isEval: boolean;
  }[];
}
