import getTimelineStats from "@/lib/stats/getTimelineStats";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useTimelineStats(address?: Address) {
  return useQuery({
    queryKey: ["timeline_stats", address],
    queryFn: () => getTimelineStats(address as Address),
    staleTime: 0,
    enabled: Boolean(address),
    refetchOnMount: true,
  });
}
