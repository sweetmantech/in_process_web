"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveArtists } from "@/hooks/useActiveArtists";
import { AnalyticsPeriod } from "@/types/timeline";
import { useState } from "react";
import ActiveArtistsTableContents from "./ActiveArtistsTableContents";
import ActiveArtistsTableLoading from "./ActiveArtistsTableLoading";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

interface ActiveArtistsTableProps {
  limit?: number;
  artist?: string;
}

const ActiveArtistsTable = ({ limit = 10, artist }: ActiveArtistsTableProps) => {
  const [period, setPeriod] = useState<AnalyticsPeriod | undefined>(undefined);

  const { data, isLoading, error, currentPage, setCurrentPage } = useActiveArtists({
    limit,
    period,
    artist,
  });

  const onPeriodChange = (next: AnalyticsPeriod | undefined) => {
    setPeriod(next);
    setCurrentPage(1);
  };

  if (isLoading || !data) return <ActiveArtistsTableLoading />;
  if (error) return <p className="text-red-500">Error loading active artists</p>;

  const artists = data.data ?? [];
  const totalPages = Math.max(1, data.total_pages ?? 1);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          <span>Active Artists</span>
          <div className="flex flex-wrap items-center gap-2">
            <AnalyticsPeriodSelect value={period} onChange={onPeriodChange} />
            <Badge variant="outline">
              Page {currentPage} / {totalPages}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {artists.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active artists found for this filter.</p>
        ) : (
          <>
            <ActiveArtistsTableContents artists={artists} />
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!hasPrevPage}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasNextPage}
              >
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
