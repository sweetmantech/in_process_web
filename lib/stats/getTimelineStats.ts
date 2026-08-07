import { IN_PROCESS_API } from "@/lib/consts";
import type { TimelineStats } from "@/types/timelineStats";
import { Address } from "viem";

const getTimelineStats = async (artist: Address): Promise<TimelineStats> => {
  const params = new URLSearchParams({ artist });
  const res = await fetch(`${IN_PROCESS_API}/stats/timeline?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch timeline stats");
  return res.json();
};

export default getTimelineStats;
