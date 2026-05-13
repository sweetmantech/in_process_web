export type ArweaveUploadsSortBy = "usdc_cost" | "winc_cost" | "size" | "created_at";

/** One aggregated row per artist from GET /uploads (aggregate mode) */
export interface ArweaveUpload {
  winc_cost: string;
  usdc_cost: number;
  file_size_bytes: number;
  artist_username: string | null;
  artist_address: string;
}

export interface ArweaveUploadsResponse {
  uploads: ArweaveUpload[];
  count: number;
  total_usdc_cost: number;
}

/** Single upload row from GET /uploads?artist=… (detail) */
export interface ArtistArweaveTransaction {
  id: string;
  arweave_uri: string;
  winc_cost: string;
  usdc_cost: number;
  file_size_bytes: number;
  content_type: string;
  created_at: string;
}

export interface ArtistArweaveTransactionsResponse {
  uploads: ArtistArweaveTransaction[];
  count: number;
}
