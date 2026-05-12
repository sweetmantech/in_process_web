import { IN_PROCESS_API } from "@/lib/consts";
import { ArtistArweaveTransactionsResponse, ArweaveUploadsSortBy } from "@/types/arweave";
import parseArtistArweaveUploadsResponse from "./parseArtistArweaveUploadsResponse";

interface GetArtistArweaveUploadsParams {
  authHeaders: HeadersInit;
  artist: string;
  page?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  sortBy?: ArweaveUploadsSortBy;
  sortOrder?: "asc" | "desc";
}

export async function getArtistArweaveUploads({
  authHeaders,
  artist,
  page = 1,
  limit = 20,
  period,
  sortBy = "usdc_cost",
  sortOrder = "desc",
}: GetArtistArweaveUploadsParams): Promise<ArtistArweaveTransactionsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort_by: sortBy,
    sort_order: sortOrder,
    artist,
  });
  if (period && period !== "all") params.set("period", period);

  const res = await fetch(`${IN_PROCESS_API}/uploads?${params.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch artist arweave uploads");
  return parseArtistArweaveUploadsResponse(await res.json());
}
