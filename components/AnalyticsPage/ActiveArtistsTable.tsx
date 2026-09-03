"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { useActiveArtistsProvider } from "@/providers/ActiveArtistsProvider";
import ActiveArtistsDataTable from "./ActiveArtistsDataTable";
import ActiveArtistsTableLoading from "./ActiveArtistsTableLoading";
import AnalyticsTableFooter from "./AnalyticsTableFooter";

const ActiveArtistsTable = () => {
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
  } = useActiveArtistsProvider();

  if (isLoading || !data) {
    return (
      <div className="px-6 py-4">
        <ActiveArtistsTableLoading />
      </div>
    );
  }

  if (error) {
    return <p className="px-6 py-8 text-sm text-red-500">Error loading active artists</p>;
  }

  return (
    <>
      {artists.length === 0 ? (
        <p className="px-6 py-8 text-sm text-[#6B6456]">No active artists found for this filter.</p>
      ) : (
        <ActiveArtistsDataTable />
      )}
      <AnalyticsTableFooter
        rowCount={tabCounts["active-artists"] ?? 0}
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

export default ActiveArtistsTable;
