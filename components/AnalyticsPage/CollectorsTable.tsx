"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollectorsProvider } from "@/providers/CollectorsProvider";
import CollectorsDataTable from "./CollectorsDataTable";
import CollectorsTableLoading from "./CollectorsTableLoading";

const CollectorsTable = () => {
  const {
    data,
    collectors,
    isLoading,
    error,
    currentPage,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useCollectorsProvider();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          <span>Collectors</span>
          <Badge variant="outline">Page {currentPage}</Badge>
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
              <span className="text-sm text-muted-foreground">Page {currentPage}</span>
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
