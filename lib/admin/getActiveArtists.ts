import { IN_PROCESS_API } from "@/lib/consts";
import {
  ActiveArtistsResponse,
  ActiveArtistsSortBy,
  ActiveArtistsSortOrder,
} from "@/types/activeArtists";
import { AnalyticsPeriod } from "@/types/timeline";

interface GetActiveArtistsParams {
  authHeaders: HeadersInit;
  page?: number;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
  sortBy?: ActiveArtistsSortBy;
  sortOrder?: ActiveArtistsSortOrder;
}

export async function getActiveArtists({
  authHeaders,
  page = 1,
  limit = 10,
  period,
  artist,
  sortBy,
  sortOrder,
}: GetActiveArtistsParams): Promise<ActiveArtistsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (period) params.set("period", period);
  if (artist) params.set("artist", artist);
  if (sortBy) params.set("sort_by", sortBy);
  if (sortOrder) params.set("sort_order", sortOrder);

  const res = await fetch(`${IN_PROCESS_API}/artists/active?${params.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch active artists");
  return res.json();
}
