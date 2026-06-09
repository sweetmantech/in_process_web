import { IN_PROCESS_API } from "@/lib/consts";
import {
  ArtistsCollectorsStatsResponse,
  ArtistsCollectorsStatsSortBy,
  ArtistsCollectorsStatsSortOrder,
} from "@/types/artistsCollectorsStats";
import { AnalyticsPeriod } from "@/types/timeline";

interface GetArtistsCollectorsStatsParams {
  page?: number;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
  sortBy?: ArtistsCollectorsStatsSortBy;
  sortOrder?: ArtistsCollectorsStatsSortOrder;
}

export async function getArtistsCollectorsStats({
  page = 1,
  limit = 10,
  period,
  artist,
  sortBy,
  sortOrder,
}: GetArtistsCollectorsStatsParams): Promise<ArtistsCollectorsStatsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (period) params.set("period", period);
  if (artist) params.set("artist", artist);
  if (sortBy) params.set("sort_by", sortBy);
  if (sortOrder) params.set("sort_order", sortOrder);

  const res = await fetch(`${IN_PROCESS_API}/artists/collectors?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch artists collectors stats");
  return res.json();
}
