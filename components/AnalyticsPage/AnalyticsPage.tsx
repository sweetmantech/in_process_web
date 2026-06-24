"use client";

import { useState } from "react";
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

const AnalyticsPage = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({ period: "week" });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Analytics</h1>
      <div className="flex flex-col gap-6">
        <AnalyticsFiltersBar filters={filters} onChange={setFilters} />
        <TimelineProvider
          includeHidden={true}
          period={filters.period}
          channel={filters.channel}
          contentType={filters.contentType}
          artistAddress={filters.artist}
        >
          <MomentsTimelineChart />
        </TimelineProvider>
        <ActiveArtistsProvider>
          <ActiveArtistsTable />
        </ActiveArtistsProvider>
        <CollectorsProvider>
          <CollectorsTable />
        </CollectorsProvider>
        <ArtistsCollectorsStatsProvider>
          <ArtistsCollectorsStatsTable />
        </ArtistsCollectorsStatsProvider>
        <ArweaveUploadsProvider aggregation>
          <ArweaveUploadsTable />
        </ArweaveUploadsProvider>
      </div>
    </div>
  );
};

export default AnalyticsPage;
