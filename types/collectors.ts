export interface CollectorStats {
  collector: string;
  username: string | null;
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
