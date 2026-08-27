import getCollectingStats from "@/lib/stats/getCollectingStats";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { collectingStatsKey } from "@/lib/react-query/queryKeys";
import { PROFILE_READ_STALE_MS } from "@/lib/react-query/staleTimes";

export function useCollectingStats(address?: Address) {
  return useQuery({
    queryKey: collectingStatsKey(address),
    queryFn: () => getCollectingStats(address as Address),
    staleTime: PROFILE_READ_STALE_MS,
    enabled: Boolean(address),
  });
}
