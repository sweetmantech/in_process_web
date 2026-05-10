"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveArtists } from "@/hooks/useActiveArtists";
import { useState } from "react";
import ActiveArtistsDataTable from "./ActiveArtistsDataTable";
import ActiveArtistsTableFilters, {
  type ActiveArtistsTableFiltersValue,
} from "./ActiveArtistsTableFilters";
import ActiveArtistsTableLoading from "./ActiveArtistsTableLoading";

interface ActiveArtistsTableProps {
  limit?: number;
}

const initialFilters: ActiveArtistsTableFiltersValue = {
  period: undefined,
  artist: undefined,
};

const ActiveArtistsTable = ({ limit = 10 }: ActiveArtistsTableProps) => {
  const [appliedFilters, setAppliedFilters] =
    useState<ActiveArtistsTableFiltersValue>(initialFilters);

  const { data, isLoading, error, currentPage, setCurrentPage } = useActiveArtists({
    limit,
    period: appliedFilters.period,
    artist: appliedFilters.artist,
  });

  const applyFilters = (next: ActiveArtistsTableFiltersValue) => {
    setAppliedFilters(next);
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
            <ActiveArtistsTableFilters onApply={applyFilters} />
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
            <ActiveArtistsDataTable artists={artists} />
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
