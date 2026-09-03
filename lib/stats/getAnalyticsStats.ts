import { IN_PROCESS_API } from "@/lib/consts";
import type { AnalyticsStats, AnalyticsStatsPeriod } from "@/types/analyticsStats";

const getAnalyticsStats = async ({
  period,
  artist,
}: {
  period: AnalyticsStatsPeriod;
  artist?: string;
}): Promise<AnalyticsStats> => {
  const params = new URLSearchParams({ period });
  if (artist) params.set("artist", artist);
  const res = await fetch(`${IN_PROCESS_API}/stats/analytics?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch analytics stats");
  return res.json();
};

export default getAnalyticsStats;
