"use client";

import { useMemo, useState } from "react";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { AnalyticsFilters } from "@/types/timeline";
import ActiveArtistsTable from "./ActiveArtistsTable";
import MomentsTimelineChart from "./MomentsTimelineChart";
import AnalyticsFiltersBar from "./AnalyticsFilters";
import ArweaveUploadsTable from "./ArweaveUploadsTable";
import ActiveArtistsProvider from "@/providers/ActiveArtistsProvider";
import ArweaveUploadsProvider from "@/providers/ArweaveUploadsProvider";
import CollectorsProvider from "@/providers/CollectorsProvider";
import CollectorsTable from "./CollectorsTable";
import ArtistsCollectorsStatsProvider from "@/providers/ArtistsCollectorsStatsProvider";
import ArtistsCollectorsStatsTable from "./ArtistsCollectorsStatsTable";
import AnalyticsKpiRow from "./AnalyticsKpiRow";
import AnalyticsTableTabs, { AnalyticsTableTabId } from "./AnalyticsTableTabs";
import { useAnalyticsStats } from "@/hooks/useAnalyticsStats";

const AnalyticsPage = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({ period: "week" });
  const [activeTab, setActiveTab] = useState<AnalyticsTableTabId>("active-artists");
  const { data: stats } = useAnalyticsStats({
    period: filters.period,
    artist: filters.artist,
  });

  const tabCounts = useMemo(
    () => ({
      "active-artists": stats?.active_artists.value,
      collectors: stats?.collectors.value,
      "artists-collectors": stats?.artists_collectors.value,
    }),
    [stats]
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Analytics</h1>
      <div className="flex flex-col gap-6">
        <AnalyticsFiltersBar filters={filters} onChange={setFilters} />
        <AnalyticsKpiRow period={filters.period} artist={filters.artist} />
        <TimelineProvider
          includeHidden={true}
          period={filters.period}
          channel={filters.channel}
          contentType={filters.contentType}
          artistAddress={filters.artist}
        >
          <MomentsTimelineChart />
        </TimelineProvider>
        <AnalyticsTableTabs activeTab={activeTab} onChange={setActiveTab} counts={tabCounts} />
        {activeTab === "active-artists" ? (
          <ActiveArtistsProvider period={filters.period} artist={filters.artist}>
            <ActiveArtistsTable />
          </ActiveArtistsProvider>
        ) : null}
        {activeTab === "collectors" ? (
          <CollectorsProvider period={filters.period} artist={filters.artist}>
            <CollectorsTable />
          </CollectorsProvider>
        ) : null}
        {activeTab === "artists-collectors" ? (
          <ArtistsCollectorsStatsProvider period={filters.period} artist={filters.artist}>
            <ArtistsCollectorsStatsTable />
          </ArtistsCollectorsStatsProvider>
        ) : null}
        {activeTab === "arweave" ? (
          <ArweaveUploadsProvider
            aggregation
            period={filters.period}
            artist={filters.artist}
          >
            <ArweaveUploadsTable />
          </ArweaveUploadsProvider>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyticsPage;
