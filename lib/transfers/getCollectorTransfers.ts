import { CHAIN_ID, IN_PROCESS_API } from "@/lib/consts";
import type { CollectorTransfersResponse } from "@/types/collectorTransfer";
import type { Address } from "viem";

const DEFAULT_LIMIT = 100;

const getCollectorTransfers = async (
  collector: Address,
  page = 1,
  limit = DEFAULT_LIMIT
): Promise<CollectorTransfersResponse> => {
  const params = new URLSearchParams({
    collector,
    chainId: CHAIN_ID.toString(),
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`${IN_PROCESS_API}/transfers?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch collector transfers");

  const data = await res.json();
  return {
    transfers: data.transfers ?? [],
    pagination: data.pagination ?? {
      total_count: 0,
      page,
      limit,
      total_pages: 0,
    },
  };
};

export default getCollectorTransfers;
