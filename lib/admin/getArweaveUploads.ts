import { IN_PROCESS_API } from "@/lib/consts";
import type {
  ArtistArweaveTransactionsResponse,
  ArweaveUploadsResponse,
  ArweaveUploadsSortBy,
} from "@/types/arweave";

interface GetArweaveUploadsBaseParams {
  page?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  sortBy?: ArweaveUploadsSortBy;
  sortOrder?: "asc" | "desc";
  aggregation: boolean;
}

export async function getArweaveUploads({
  artist,
  page = 1,
  limit = 10,
  period,
  sortBy = "usdc_cost",
  sortOrder = "desc",
  aggregation,
}: GetArweaveUploadsBaseParams & {
  aggregation: boolean;
  artist?: string;
}): Promise<ArweaveUploadsResponse | ArtistArweaveTransactionsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort_by: sortBy,
    sort_order: sortOrder,
    aggregation: aggregation ? "true" : "false",
  });
  if (period && period !== "all") searchParams.set("period", period);
  if (artist) searchParams.set("artist", artist);

  const res = await fetch(`${IN_PROCESS_API}/uploads?${searchParams.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch arweave uploads");

  const body: unknown = await res.json();
  if (aggregation) return body as ArweaveUploadsResponse;
  return body as ArtistArweaveTransactionsResponse;
}
/* eslint-enable no-redeclare */
