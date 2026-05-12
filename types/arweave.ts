export type ArweaveUploadsSortBy = "usdc_cost" | "winc_cost";

export interface ArweaveUploadArtist {
  username: string | null;
  address: string;
}

/** One aggregated row per artist from GET /uploads */
export interface ArweaveUpload {
  winc_cost: string;
  usdc_cost: string;
  artist: ArweaveUploadArtist;
}

export interface ArweaveUploadsResponse {
  uploads: ArweaveUpload[];
  count: number;
  total_usdc_cost: number;
}
