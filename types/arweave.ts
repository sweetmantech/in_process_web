export type ArweaveUploadsSortBy = "usdc_cost" | "winc_cost" | "size";

export interface ArweaveUploadArtist {
  username: string | null;
  address: string;
}

/** One aggregated row per artist from GET /uploads */
export interface ArweaveUpload {
  winc_cost: string;
  usdc_cost: string;
  file_size_bytes: number;
  artist: ArweaveUploadArtist;
}

export interface ArweaveUploadsResponse {
  uploads: ArweaveUpload[];
  count: number;
  total_usdc_cost: number;
}

export interface ArtistArweaveTransaction {
  id: string;
  arweave_uri: string;
  winc_cost: string;
  usdc_cost: string;
  file_size_bytes: number;
  content_type: string;
  created_at: string;
}

export interface ArtistArweaveTransactionsResponse {
  uploads: ArtistArweaveTransaction[];
  count: number;
}
