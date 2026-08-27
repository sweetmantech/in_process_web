import getCollectorTransfers from "@/lib/transfers/getCollectorTransfers";
import type { AnalyticsContentType } from "@/types/timeline";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { Address } from "viem";
import { collectorTransfersKey } from "@/lib/react-query/queryKeys";
import { PROFILE_COLLECTOR_TRANSFERS_LIMIT } from "@/lib/react-query/profileLimits";
import { PROFILE_READ_STALE_MS } from "@/lib/react-query/staleTimes";

export function useCollectorTransfers(address?: Address, contentType?: AnalyticsContentType) {
  const query = useInfiniteQuery({
    queryKey: collectorTransfersKey(address, PROFILE_COLLECTOR_TRANSFERS_LIMIT, contentType),
    queryFn: ({ pageParam = 1 }) =>
      getCollectorTransfers(address as Address, {
        page: pageParam,
        limit: PROFILE_COLLECTOR_TRANSFERS_LIMIT,
        contentType,
      }),
    enabled: Boolean(address),
    staleTime: PROFILE_READ_STALE_MS,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
  });

  const transfers = useMemo(
    () => query.data?.pages.flatMap((page) => page.transfers) ?? [],
    [query.data?.pages]
  );
  const collectedCount = query.data?.pages[0]?.pagination.total_count ?? transfers.length;

  const fetchMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  return {
    transfers,
    collectedCount,
    isLoading: query.isLoading,
    hasNextPage: query.hasNextPage,
    fetchMore,
  };
}
