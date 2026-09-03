"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistsCollectorsStatsProvider } from "@/providers/ArtistsCollectorsStatsProvider";
import ArtistsCollectorsStatsDataTable from "./ArtistsCollectorsStatsDataTable";
import ArtistsCollectorsStatsTableLoading from "./ArtistsCollectorsStatsTableLoading";

const ArtistsCollectorsStatsTable = () => {
  const {
    data,
    artists,
    isLoading,
    error,
    currentPage,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useArtistsCollectorsStatsProvider();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          <span>Artists & Collectors</span>
          <Badge variant="outline">Page {currentPage}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <ArtistsCollectorsStatsTableLoading />
        ) : error ? (
          <p className="text-red-500">Error loading artists collectors stats</p>
        ) : artists.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data found for this filter.</p>
        ) : (
          <>
            <ArtistsCollectorsStatsDataTable />
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

export default ArtistsCollectorsStatsTable;
