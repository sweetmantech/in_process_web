import { useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import getTransfers from "@/lib/moment/getTransfers";

const COLLECTORS_PER_PAGE = 20;

export function useMomentTransfers() {
  const { moment } = useMomentProvider();
  const { collectionAddress, tokenId, chainId } = moment;

  const query = useInfiniteQuery({
    queryKey: ["moment-transfers", collectionAddress, tokenId, chainId],
    queryFn: ({ pageParam = 1 }) =>
      getTransfers({
        moment,
        page: pageParam as number,
      }),
    enabled: Boolean(collectionAddress && tokenId && chainId),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < COLLECTORS_PER_PAGE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const transfers = useMemo(
    () => query.data?.pages.flatMap((page) => page) ?? [],
    [query.data?.pages]
  );

  const fetchMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query]);

  return {
    transfers,
    isLoading: query.isLoading || query.isFetching,
    hasMore: query.hasNextPage ?? false,
    fetchMore,
  };
}
