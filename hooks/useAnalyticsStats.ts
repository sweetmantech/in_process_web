import getAnalyticsStats from "@/lib/stats/getAnalyticsStats";
import resolveAnalyticsStatsPeriod from "@/lib/stats/resolveAnalyticsStatsPeriod";
import { analyticsStatsKey } from "@/lib/react-query/queryKeys";
import type { AnalyticsPeriod } from "@/types/timeline";
import { useQuery } from "@tanstack/react-query";

const ANALYTICS_STATS_STALE_MS = 1000 * 60 * 5;

export function useAnalyticsStats({
  period,
  artist,
}: {
  period?: AnalyticsPeriod;
  artist?: string;
}) {
  const statsPeriod = resolveAnalyticsStatsPeriod(period);

  return useQuery({
    queryKey: analyticsStatsKey(statsPeriod, artist),
    queryFn: () => getAnalyticsStats({ period: statsPeriod, artist }),
    staleTime: ANALYTICS_STATS_STALE_MS,
    retry: (failureCount) => failureCount < 3,
  });
}
