"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { TimelineProvider } from "@/providers/TimelineProvider";
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
import AnalyticsTableTabs from "./AnalyticsTableTabs";
import AnalyticsProvider from "@/providers/AnalyticsProvider";

const AnalyticsPageContent = () => {
  const { filters, activeTab } = useAnalyticsProvider();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Analytics</h1>
      <div className="flex flex-col gap-6">
        <AnalyticsFiltersBar />
        <AnalyticsKpiRow />
        <TimelineProvider
          includeHidden={true}
          period={filters.period}
          channel={filters.channel}
          contentType={filters.contentType}
          artistAddress={filters.artist}
        >
          <MomentsTimelineChart />
        </TimelineProvider>
        <div className="overflow-hidden rounded-[10px] border border-[#E4E0D7] bg-white">
          <AnalyticsTableTabs />
          {activeTab === "active-artists" ? (
            <ActiveArtistsProvider>
              <ActiveArtistsTable />
            </ActiveArtistsProvider>
          ) : null}
          {activeTab === "collectors" ? (
            <CollectorsProvider>
              <CollectorsTable />
            </CollectorsProvider>
          ) : null}
          {activeTab === "artists-collectors" ? (
            <ArtistsCollectorsStatsProvider>
              <ArtistsCollectorsStatsTable />
            </ArtistsCollectorsStatsProvider>
          ) : null}
          {activeTab === "arweave" ? (
            <ArweaveUploadsProvider aggregation>
              <ArweaveUploadsTable />
            </ArweaveUploadsProvider>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => (
  <AnalyticsProvider>
    <AnalyticsPageContent />
  </AnalyticsProvider>
);

export default AnalyticsPage;
