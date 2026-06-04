"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollectorsProvider } from "@/providers/CollectorsProvider";
import CollectorsDataTable from "./CollectorsDataTable";
import CollectorsTableFilters from "./CollectorsTableFilters";
import CollectorsTableLoading from "./CollectorsTableLoading";

const CollectorsTable = () => {
  const {
    data,
    collectors,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useCollectorsProvider();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5">
            {isLoading || !data ? <Skeleton className="h-6 w-10" /> : <span>{totalCount}</span>}
            <span>Collectors</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <CollectorsTableFilters />
            <Badge variant="outline">
              Page {currentPage} / {totalPages}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <CollectorsTableLoading />
        ) : error ? (
          <p className="text-red-500">Error loading collectors</p>
        ) : collectors.length === 0 ? (
          <p className="text-sm text-muted-foreground">No collectors found for this filter.</p>
        ) : (
          <>
            <CollectorsDataTable />
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

export default CollectorsTable;
