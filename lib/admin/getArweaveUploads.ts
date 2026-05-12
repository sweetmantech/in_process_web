import { IN_PROCESS_API } from "@/lib/consts";
import { parseArweaveUploadsResponse } from "@/lib/admin/parseArweaveUploadsResponse";
import { ArweaveUploadsParsedResponse, ArweaveUploadsSortBy } from "@/types/arweave";

interface GetArweaveUploadsParams {
  authHeaders: HeadersInit;
  page?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  artist?: string;
  sortBy?: ArweaveUploadsSortBy;
  sortOrder?: "asc" | "desc";
}

export async function getArweaveUploads({
  authHeaders,
  page = 1,
  limit = 10,
  period,
  artist,
  sortBy = "usdc_cost",
  sortOrder = "desc",
}: GetArweaveUploadsParams): Promise<ArweaveUploadsParsedResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort_by: sortBy,
    sort_order: sortOrder,
  });
  if (period && period !== "all") params.set("period", period);
  if (artist) params.set("artist", artist);

  const res = await fetch(`${IN_PROCESS_API}/uploads?${params.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch arweave uploads");
  return parseArweaveUploadsResponse(await res.json());
}
