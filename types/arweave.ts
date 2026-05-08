export interface ArweaveUploadArtist {
  username: string | null;
  address: string;
}

export interface ArweaveUpload {
  id: string;
  arweave_uri: string;
  winc_cost: string;
  usdc_cost: string | null;
  file_size_bytes: number;
  content_type: string | null;
  created_at: string;
  artist: ArweaveUploadArtist;
}

export interface ArweaveUploadsResponse {
  uploads: ArweaveUpload[];
  count: number;
}
