import { IN_PROCESS_API } from "@/lib/consts";
import { CollectorsResponse, CollectorsSortBy, CollectorsSortOrder } from "@/types/collectors";
import { AnalyticsPeriod } from "@/types/timeline";

interface GetCollectorsParams {
  page?: number;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
  sortBy?: CollectorsSortBy;
  sortOrder?: CollectorsSortOrder;
}

export async function getCollectors({
  page = 1,
  limit = 10,
  period,
  artist,
  sortBy,
  sortOrder,
}: GetCollectorsParams): Promise<CollectorsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (period) params.set("period", period);
  if (artist) params.set("artist", artist);
  if (sortBy) params.set("sort_by", sortBy);
  if (sortOrder) params.set("sort_order", sortOrder);

  const res = await fetch(`${IN_PROCESS_API}/collectors?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch collectors");
  return res.json();
}
