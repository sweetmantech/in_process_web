import getCollectorTransfers from "@/lib/transfers/getCollectorTransfers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { Address } from "viem";

const PAGE_LIMIT = 100;

export function useCollectorTransfers(address?: Address) {
  const query = useInfiniteQuery({
    queryKey: ["collector_transfers", address, PAGE_LIMIT],
    queryFn: ({ pageParam = 1 }) =>
      getCollectorTransfers(address as Address, pageParam, PAGE_LIMIT),
    enabled: Boolean(address),
    staleTime: 0,
    refetchOnMount: true,
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
