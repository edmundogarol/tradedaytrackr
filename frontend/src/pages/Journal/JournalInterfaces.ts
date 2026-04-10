import type { Tag } from "@interfaces/CustomTypes";

export interface JournalEntry {
  id: number;
  dateTime: string;
  risk: number;
  contracts: number;
  outcome: number;
  instrument: string;
  description: string;
  image: string;
  trades: number[];
  totalPnl: number;
  accountCount: number;
  tags: Tag[];
  accounts: number[];
}
