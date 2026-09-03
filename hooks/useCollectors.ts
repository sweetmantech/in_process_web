import { getCollectors } from "@/lib/admin/getCollectors";
import hasNextPageFromRowCount from "@/lib/pagination/hasNextPageFromRowCount";
import { CollectorsSortBy, CollectorsSortOrder } from "@/types/collectors";
import { AnalyticsPeriod } from "@/types/timeline";
import { useQuery } from "@tanstack/react-query";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_SORT: SortingState = [{ id: "collected_count", desc: true }];

interface UseCollectorsOptions {
  initialPage?: number;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
}

export function useCollectors({
  initialPage = 1,
  limit = 10,
  period,
  artist = "",
}: UseCollectorsOptions = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORT);

  useEffect(() => {
    setCurrentPage(1);
  }, [period, artist]);

  const activeSort = sorting[0] ?? DEFAULT_SORT[0];
  const sortBy = activeSort.id as CollectorsSortBy;
  const sortOrder = activeSort.desc ? "desc" : ("asc" as CollectorsSortOrder);

  const query = useQuery({
    queryKey: ["analytics-collectors", currentPage, limit, period, artist, sortBy, sortOrder],
    queryFn: () =>
      getCollectors({
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

  const collectors = useMemo(() => query.data?.collectors ?? [], [query.data?.collectors]);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = hasNextPageFromRowCount(collectors.length, limit);

  return {
    ...query,
    collectors,
    currentPage,
    limit,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    sorting,
    onSortingChange,
  };
}
