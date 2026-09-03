"use client";

import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";
import ArweaveUploadsTableContents from "./ArweaveUploadsTableContents";
import ArweaveUploadsTableEmpty from "./ArweaveUploadsTableEmpty";
import ArweaveUploadsTableLoading from "./ArweaveUploadsTableLoading";
import AnalyticsTableFooter from "./AnalyticsTableFooter";

const ArweaveUploadsTable = () => {
  const {
    data,
    uploads,
    isPending,
    error,
    currentPage,
    limit,
    totalCount,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useArweaveUploadsProvider();

  if (error && data === undefined) {
    return <p className="px-6 py-8 text-sm text-red-500">Error loading arweave uploads</p>;
  }

  if (isPending && data === undefined) {
    return (
      <div className="px-6 py-4">
        <ArweaveUploadsTableLoading />
      </div>
    );
  }

  return (
    <>
      {uploads.length === 0 ? <ArweaveUploadsTableEmpty /> : <ArweaveUploadsTableContents />}
      <AnalyticsTableFooter
        rowCount={totalCount}
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

export default ArweaveUploadsTable;
