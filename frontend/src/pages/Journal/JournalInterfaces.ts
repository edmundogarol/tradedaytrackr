import type { Tag } from "@interfaces/CustomTypes";

export interface JournalEntry {
  id: number;
  dateTime: string;
  risk: number;
  evalRisk?: number;
  contracts: number;
  evalContracts?: number;
  outcome: number;
  evalOutcome?: number;
  instrument: string;
  description: string;
  image: string;
  imageUrl: string;
  trades: number[];
  tradeIds: number[];
  evalTradeIds?: number[];
  totalPnl: number;
  totalEvalPnl?: number;
  accountCount: number;
  evalAccountCount?: number;
  tags: Tag[];
  tagObjects?: Tag[];
  accounts: number[];
}
