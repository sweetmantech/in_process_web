import getCollectorTransfers from "@/lib/transfers/getCollectorTransfers";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";

export function useCollectorTransfers(address?: Address) {
  return useQuery({
    queryKey: ["collector_transfers", address],
    queryFn: () => getCollectorTransfers(address as Address),
    staleTime: 0,
    enabled: Boolean(address),
    refetchOnMount: true,
  });
}
