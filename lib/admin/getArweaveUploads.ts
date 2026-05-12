import { IN_PROCESS_API } from "@/lib/consts";
import type {
  ArtistArweaveTransactionsResponse,
  ArweaveUploadsResponse,
  ArweaveUploadsSortBy,
} from "@/types/arweave";

interface GetArweaveUploadsBaseParams {
  authHeaders: HeadersInit;
  page?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  sortBy?: ArweaveUploadsSortBy;
  sortOrder?: "asc" | "desc";
}

/* eslint-disable no-redeclare -- TypeScript overload signatures share one implementation */
export async function getArweaveUploads(
  params: GetArweaveUploadsBaseParams & { artist: string }
): Promise<ArtistArweaveTransactionsResponse>;

export async function getArweaveUploads(
  params: GetArweaveUploadsBaseParams & { artist?: undefined }
): Promise<ArweaveUploadsResponse>;

export async function getArweaveUploads({
  authHeaders,
  page = 1,
  limit = 10,
  period,
  artist,
  sortBy = "usdc_cost",
  sortOrder = "desc",
}: GetArweaveUploadsBaseParams & { artist?: string }): Promise<
  ArweaveUploadsResponse | ArtistArweaveTransactionsResponse
> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort_by: sortBy,
    sort_order: sortOrder,
  });
  if (period && period !== "all") searchParams.set("period", period);
  if (artist) searchParams.set("artist", artist);

  const res = await fetch(`${IN_PROCESS_API}/uploads?${searchParams.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch arweave uploads");

  const body: unknown = await res.json();
  if (artist) return body as ArtistArweaveTransactionsResponse;
  return body as ArweaveUploadsResponse;
}
/* eslint-enable no-redeclare */
