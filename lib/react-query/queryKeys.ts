import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import type {
  AnalyticsChannel,
  AnalyticsContentType,
  AnalyticsPeriod,
  TimelineProtocol,
  TimelineSortOrder,
} from "@/types/timeline";
import type { Address } from "viem";

export function artistProfileKey(address?: Address) {
  return ["artist_profile", address] as const;
}

export function timelineStatsKey(address?: Address) {
  return ["timeline_stats", address] as const;
}

export function collectingStatsKey(address?: Address) {
  return ["collecting_stats", address] as const;
}

export function collectorTransfersKey(
  address?: Address,
  limit?: number,
  contentType?: AnalyticsContentType
) {
  return ["collector_transfers", address, limit, contentType] as const;
}

export function infiniteTimelineKey({
  limit,
  artistAddress,
  collection,
  includeHidden = false,
  type,
  chainId: chainIdParam,
  period,
  channel,
  contentType,
  protocol,
  curated = true,
  sortOrder = "created_at_desc",
}: {
  limit: number;
  artistAddress?: string;
  collection?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
  chainId?: number;
  period?: AnalyticsPeriod;
  channel?: AnalyticsChannel;
  contentType?: AnalyticsContentType;
  protocol?: TimelineProtocol;
  curated?: boolean;
  sortOrder?: TimelineSortOrder;
}) {
  const { chainId: collectionChainId, address: normalizedCollection } =
    parseCollectionAddress(collection);
  const chainId = chainIdParam ?? collectionChainId;

  return [
    "timeline",
    limit,
    artistAddress,
    normalizedCollection,
    includeHidden,
    type,
    chainId,
    period,
    channel,
    contentType,
    protocol,
    curated,
    sortOrder,
  ] as const;
}
