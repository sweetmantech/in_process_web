"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveArtistsProvider } from "@/providers/ActiveArtistsProvider";
import ActiveArtistsDataTable from "./ActiveArtistsDataTable";
import ActiveArtistsTableFilters from "./ActiveArtistsTableFilters";
import ActiveArtistsTableLoading from "./ActiveArtistsTableLoading";

const ActiveArtistsTable = () => {
  const {
    data,
    artists,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useActiveArtistsProvider();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          <span>Active Artists</span>
          <div className="flex flex-wrap items-center gap-2">
            <ActiveArtistsTableFilters />
            <Badge variant="outline">
              Page {currentPage} / {totalPages}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <ActiveArtistsTableLoading />
        ) : error ? (
          <p className="text-red-500">Error loading active artists</p>
        ) : artists.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active artists found for this filter.</p>
        ) : (
          <>
            <ActiveArtistsDataTable />
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

export default ActiveArtistsTable;
