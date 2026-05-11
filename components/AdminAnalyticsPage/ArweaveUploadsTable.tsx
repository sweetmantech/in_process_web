"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";
import ArweaveUploadsTableContents from "./ArweaveUploadsTableContents";
import ArweaveUploadsTableEmpty from "./ArweaveUploadsTableEmpty";
import ArweaveUploadsTableFilters from "./ArweaveUploadsTableFilters";
import ArweaveUploadsTableLoading from "./ArweaveUploadsTableLoading";

const ArweaveUploadsTable = () => {
  const {
    data,
    uploads,
    isPending,
    error,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useArweaveUploadsProvider();

  if (error && data === undefined)
    return <p className="text-red-500">Error loading arweave uploads</p>;
  if (isPending && data === undefined) return <ArweaveUploadsTableLoading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          <span>Arweave Expenses</span>
          <div className="flex flex-wrap items-center gap-2">
            <ArweaveUploadsTableFilters />
            <Badge variant="outline">
              Page {currentPage} / {totalPages}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uploads.length === 0 ? (
          <ArweaveUploadsTableEmpty />
        ) : (
          <>
            <ArweaveUploadsTableContents uploads={uploads} />
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" size="sm" onClick={goPrevPage} disabled={!hasPrevPage}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage} of {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={goNextPage} disabled={!hasNextPage}>
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArweaveUploadsTable;
