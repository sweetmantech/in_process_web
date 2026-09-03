"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { useArtistsCollectorsStatsProvider } from "@/providers/ArtistsCollectorsStatsProvider";
import ArtistsCollectorsStatsDataTable from "./ArtistsCollectorsStatsDataTable";
import ArtistsCollectorsStatsTableLoading from "./ArtistsCollectorsStatsTableLoading";
import AnalyticsTableFooter from "./AnalyticsTableFooter";

const ArtistsCollectorsStatsTable = () => {
  const { tabCounts } = useAnalyticsProvider();
  const {
    data,
    artists,
    isLoading,
    error,
    currentPage,
    limit,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useArtistsCollectorsStatsProvider();

  if (isLoading || !data) {
    return (
      <div className="px-6 py-4">
        <ArtistsCollectorsStatsTableLoading />
      </div>
    );
  }

  if (error) {
    return <p className="px-6 py-8 text-sm text-red-500">Error loading artists collectors stats</p>;
  }

  return (
    <>
      {artists.length === 0 ? (
        <p className="px-6 py-8 text-sm text-[#6B6456]">No data found for this filter.</p>
      ) : (
        <ArtistsCollectorsStatsDataTable />
      )}
      <AnalyticsTableFooter
        rowCount={tabCounts["artists-collectors"] ?? 0}
        currentPage={currentPage}
        limit={limit}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        onPrevPage={goPrevPage}
        onNextPage={goNextPage}
      />
    </>
  );
};

export default ArtistsCollectorsStatsTable;
