import getCollectingStats from "@/lib/stats/getCollectingStats";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useCollectingStats(address?: Address) {
  return useQuery({
    queryKey: ["collecting_stats", address],
    queryFn: () => getCollectingStats(address as Address),
    staleTime: 0,
    enabled: Boolean(address),
    refetchOnMount: true,
  });
}
