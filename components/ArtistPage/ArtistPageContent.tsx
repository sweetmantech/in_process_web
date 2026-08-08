"use client";

import { useState } from "react";
import MomentsTimeline from "../Timeline/MomentsTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { Address } from "viem";
import ProfileWithStats from "@/components/ProfileWithStats";
import ArtistFilters from "./ArtistFilters";
import { useTimelineStats } from "@/hooks/useTimelineStats";
import { formatStatValue } from "@/lib/stats/formatStatValue";
import type {
  ChainFilter,
  ContentTypeFilter,
  PeriodFilter,
  ProtocolFilter,
} from "@/lib/timeline/timelineFilters";
import type { AnalyticsContentType, AnalyticsPeriod, TimelineProtocol } from "@/types/timeline";

const ArtistPageContent = ({ address }: { address: Address }) => {
  const [protocolFilter, setProtocolFilter] = useState<ProtocolFilter>("All");
  const [contentTypeFilter, setContentTypeFilter] = useState<ContentTypeFilter>("All");
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("All");
  const [chainFilter, setChainFilter] = useState<ChainFilter>("All");
  const { data: timelineStats, isLoading: isStatsLoading } = useTimelineStats(address);

  const showStatsLoading = isStatsLoading && !timelineStats;
  const stats = [
    {
      value: String(timelineStats?.created_count ?? 0),
      label: "moments created",
      mobileLabel: "created",
      loading: showStatsLoading,
    },
    {
      value: `${formatStatValue(timelineStats?.eth_archived ?? "0")} ETH`,
      label: "eth archived",
      loading: showStatsLoading,
    },
    {
      value: `$${formatStatValue(timelineStats?.usdc_archived ?? "0", { maximumFractionDigits: 0 })}`,
      label: "usdc archived",
      loading: showStatsLoading,
    },
  ];

  const protocol = protocolFilter === "All" ? undefined : (protocolFilter as TimelineProtocol);
  const contentType =
    contentTypeFilter === "All" ? undefined : (contentTypeFilter as AnalyticsContentType);
  const period = periodFilter === "All" ? undefined : (periodFilter as AnalyticsPeriod);
  const chainId = chainFilter === "All" ? undefined : Number(chainFilter);

  return (
    <div className="relative flex min-h-full w-full grow flex-col text-[#1c1a17]">
      <div className="relative grow px-[18px] pb-[30px] pt-[22px] md:px-10 md:pb-11 xl:px-14 2xl:px-20 3xl:px-28">
        <ProfileWithStats
          stats={stats}
          toolbar={
            <ArtistFilters
              protocol={protocolFilter}
              contentType={contentTypeFilter}
              period={periodFilter}
              chain={chainFilter}
              onProtocolChange={setProtocolFilter}
              onContentTypeChange={setContentTypeFilter}
              onPeriodChange={setPeriodFilter}
              onChainChange={setChainFilter}
            />
          }
        />
        <div className="flex grow flex-col">
          <TimelineProvider
            artistAddress={address}
            curated={false}
            protocol={protocol}
            contentType={contentType}
            period={period}
            chainId={chainId}
          >
            <MomentsTimeline />
          </TimelineProvider>
        </div>
      </div>
    </div>
  );
};

export default ArtistPageContent;
