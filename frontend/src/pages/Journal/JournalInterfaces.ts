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
  imageUrl: string;
  tradeIds: number[];
  totalPnl: number;
  accountCount: number;
  tags: Tag[];
  tagObjects?: Tag[];
  accounts: number[];
}
