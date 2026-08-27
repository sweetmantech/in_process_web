import getTimelineStats from "@/lib/stats/getTimelineStats";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { timelineStatsKey } from "@/lib/react-query/queryKeys";
import { PROFILE_READ_STALE_MS } from "@/lib/react-query/staleTimes";

export function useTimelineStats(address?: Address) {
  return useQuery({
    queryKey: timelineStatsKey(address),
    queryFn: () => getTimelineStats(address as Address),
    staleTime: PROFILE_READ_STALE_MS,
    enabled: Boolean(address),
  });
}
