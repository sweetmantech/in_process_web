"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { useCollectorsProvider } from "@/providers/CollectorsProvider";
import CollectorsDataTable from "./CollectorsDataTable";
import CollectorsTableLoading from "./CollectorsTableLoading";
import AnalyticsTableFooter from "./AnalyticsTableFooter";

const CollectorsTable = () => {
  const { tabCounts } = useAnalyticsProvider();
  const {
    data,
    collectors,
    isLoading,
    error,
    currentPage,
    limit,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useCollectorsProvider();

  if (isLoading || !data) {
    return (
      <div className="px-6 py-4">
        <CollectorsTableLoading />
      </div>
    );
  }

  if (error) {
    return <p className="px-6 py-8 text-sm text-red-500">Error loading collectors</p>;
  }

  return (
    <>
      {collectors.length === 0 ? (
        <p className="px-6 py-8 text-sm text-[#6B6456]">No collectors found for this filter.</p>
      ) : (
        <CollectorsDataTable />
      )}
      <AnalyticsTableFooter
        rowCount={tabCounts.collectors ?? 0}
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

export default CollectorsTable;
