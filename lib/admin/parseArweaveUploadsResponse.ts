import { ArweaveUpload, ArweaveUploadsResponse } from "@/types/arweave";

interface RawArweaveUpload {
  winc_cost: string;
  usdc_cost: string | number;
  file_size_bytes?: number | string | null;
  artist_username?: string | null;
  artist_address?: string | null;
}

interface RawArweaveUploadsResponse {
  uploads?: RawArweaveUpload[];
  count?: number;
  total_usdc_cost?: number;
}

const parseArweaveUpload = (upload: RawArweaveUpload): ArweaveUpload => ({
  winc_cost: upload.winc_cost,
  usdc_cost: String(upload.usdc_cost),
  file_size_bytes: Number(upload.file_size_bytes ?? 0),
  artist: {
    username: upload.artist_username ?? null,
    address: upload.artist_address ?? "",
  },
});

const parseArweaveUploadsResponse = (
  response: RawArweaveUploadsResponse
): ArweaveUploadsResponse => ({
  uploads: (response.uploads ?? []).map(parseArweaveUpload),
  count: response.count ?? 0,
  total_usdc_cost: response.total_usdc_cost ?? 0,
});

export default parseArweaveUploadsResponse;
