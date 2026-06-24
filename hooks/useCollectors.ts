import { getCollectors } from "@/lib/admin/getCollectors";
import { CollectorsSortBy, CollectorsSortOrder } from "@/types/collectors";
import { AnalyticsPeriod } from "@/types/timeline";
import { useQuery } from "@tanstack/react-query";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

const DEFAULT_SORT: SortingState = [{ id: "collected_count", desc: true }];

interface UseCollectorsOptions {
  initialPage?: number;
  limit?: number;
}

export function useCollectors({ initialPage = 1, limit = 10 }: UseCollectorsOptions = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [period, setPeriod] = useState<AnalyticsPeriod | undefined>("week");
  const [artist, setArtist] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORT);

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

  const applyPeriod = useCallback((next: AnalyticsPeriod | undefined) => {
    setPeriod(next);
    setCurrentPage(1);
  }, []);

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

  const totalPages = Math.max(1, query.data?.total_pages ?? 1);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const totalCount = query.data?.total_count ?? 0;

  return {
    ...query,
    collectors,
    currentPage,
    totalPages,
    totalCount,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    period,
    applyPeriod,
    artist,
    setArtist,
    sorting,
    onSortingChange,
  };
}
