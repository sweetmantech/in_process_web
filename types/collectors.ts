export interface CollectorStats {
  artist_id: string;
  username: string | null;
  wallets: { address: string; type: string }[];
  collected_count: number;
  eth_spent: string;
  usdc_spent: string;
}

export interface CollectorsResponse {
  collectors: CollectorStats[];
  total_count: number;
  page: number;
  total_pages: number;
}

export type CollectorsSortBy = "collected_count" | "eth_spent" | "usdc_spent";
export type CollectorsSortOrder = "asc" | "desc";
