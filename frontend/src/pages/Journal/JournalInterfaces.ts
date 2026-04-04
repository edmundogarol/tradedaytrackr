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
  totalPnL: number;
  tags: string[];
  accounts: number[];
}
