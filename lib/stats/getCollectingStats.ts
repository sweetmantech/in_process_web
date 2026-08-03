import { IN_PROCESS_API } from "@/lib/consts";
import type { CollectingStats } from "@/types/collectingStats";
import { Address } from "viem";

const getCollectingStats = async (artist: Address): Promise<CollectingStats> => {
  const params = new URLSearchParams({ artist });
  const res = await fetch(`${IN_PROCESS_API}/stats/collecting?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch collecting stats");
  return res.json();
};

export default getCollectingStats;
