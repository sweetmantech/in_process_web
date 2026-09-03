import { getArtistsCollectorsStats } from "@/lib/admin/getArtistsCollectorsStats";
import hasNextPageFromRowCount from "@/lib/pagination/hasNextPageFromRowCount";
import {
  ArtistsCollectorsStatsSortBy,
  ArtistsCollectorsStatsSortOrder,
} from "@/types/artistsCollectorsStats";
import { AnalyticsPeriod } from "@/types/timeline";
import { useQuery } from "@tanstack/react-query";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_SORT: SortingState = [{ id: "total_created_count", desc: true }];

interface UseArtistsCollectorsStatsOptions {
  initialPage?: number;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
}

export function useArtistsCollectorsStats({
  initialPage = 1,
  limit = 10,
  period,
  artist = "",
}: UseArtistsCollectorsStatsOptions = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORT);

  useEffect(() => {
    setCurrentPage(1);
  }, [period, artist]);

  const activeSort = sorting[0] ?? DEFAULT_SORT[0];
  const sortBy = activeSort.id as ArtistsCollectorsStatsSortBy;
  const sortOrder = activeSort.desc ? "desc" : ("asc" as ArtistsCollectorsStatsSortOrder);

  const query = useQuery({
    queryKey: [
      "analytics-artists-collectors-stats",
      currentPage,
      limit,
      period,
      artist,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getArtistsCollectorsStats({
        page: currentPage,
        limit,
        period,
        artist,
        sortBy,
        sortOrder,
      }),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  const onSortingChange: OnChangeFn<SortingState> = useCallback((updater) => {
    setSorting((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next.length === 0 ? DEFAULT_SORT : next;
    });
    setCurrentPage(1);
  }, []);

  const goPrevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const goNextPage = useCallback(() => {
    setCurrentPage((p) => p + 1);
  }, []);

  const artists = useMemo(() => query.data?.artists ?? [], [query.data?.artists]);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = hasNextPageFromRowCount(artists.length, limit);

  return {
    ...query,
    artists,
    currentPage,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    sorting,
    onSortingChange,
  };
}
