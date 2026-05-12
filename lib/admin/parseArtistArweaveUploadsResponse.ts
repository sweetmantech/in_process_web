import { ArtistArweaveTransaction, ArtistArweaveTransactionsResponse } from "@/types/arweave";

interface RawArtistArweaveUpload {
  id?: string;
  arweave_uri?: string | null;
  winc_cost?: string | number;
  usdc_cost?: string | number;
  file_size_bytes?: number | string | null;
  content_type?: string | null;
  created_at?: string | null;
}

interface RawArtistArweaveUploadsResponse {
  uploads?: RawArtistArweaveUpload[];
  count?: number;
}

const parseArtistArweaveTransaction = (
  upload: RawArtistArweaveUpload
): ArtistArweaveTransaction => ({
  id: String(upload.id ?? ""),
  arweave_uri: upload.arweave_uri ?? "",
  winc_cost: String(upload.winc_cost ?? ""),
  usdc_cost: String(upload.usdc_cost ?? ""),
  file_size_bytes: Number(upload.file_size_bytes ?? 0),
  content_type: upload.content_type ?? "",
  created_at: upload.created_at ?? "",
});

const parseArtistArweaveUploadsResponse = (
  response: RawArtistArweaveUploadsResponse
): ArtistArweaveTransactionsResponse => ({
  uploads: (response.uploads ?? []).map(parseArtistArweaveTransaction),
  count: response.count ?? 0,
});

export default parseArtistArweaveUploadsResponse;
