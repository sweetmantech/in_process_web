export type ArweaveUploadsSortBy = "usdc_cost" | "winc_cost" | "size";

export interface ArweaveUploadArtist {
  username: string | null;
  address: string;
}

/** One aggregated row per artist from GET /uploads (aggregate list mode) */
export interface ArweaveUpload {
  winc_cost: string;
  usdc_cost: string;
  file_size_bytes?: number | string;
  artist: ArweaveUploadArtist;
}

/** Single upload log row from GET /uploads?artist=… (detail list mode) */
export interface ArweaveUploadTransaction {
  id: string;
  arweave_uri: string;
  winc_cost: string;
  usdc_cost: number | string;
  file_size_bytes?: number | string;
  content_type: string | null;
  created_at: string;
}

export type ArweaveUploadsParsedResponse =
  | {
      variant: "aggregate";
      uploads: ArweaveUpload[];
      count: number;
      total_usdc_cost?: number;
    }
  | {
      variant: "detail";
      uploads: ArweaveUploadTransaction[];
      count: number;
    };
