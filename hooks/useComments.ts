import { useCallback, useMemo } from "react";
import { useInfiniteQuery, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { CommentsPage, MintComment } from "@/types/moment";
import fetchComments from "@/lib/moment/fetchComments";
import withCommentDefaults from "@/lib/moment/withCommentDefaults";
import { useMomentProvider } from "@/providers/MomentProvider";

const COMMENTS_PER_PAGE = 20;

export function useComments() {
  const { moment, protocol } = useMomentProvider();
  const queryClient = useQueryClient();
  const { collectionAddress, tokenId, chainId } = moment;

  const query = useInfiniteQuery({
    queryKey: ["comments", collectionAddress, tokenId, chainId],
    queryFn: ({ pageParam = 0 }) =>
      fetchComments({
        moment,
        offset: pageParam as number,
      }),
    enabled: Boolean(collectionAddress && tokenId && chainId && protocol === "in_process"),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage, allPages) => {
      // Pagination is by top-level comments only (API page size 20).
      // Flattened length must not drive hasNextPage — replies inflate the list.
      if (lastPage.topLevelCount < COMMENTS_PER_PAGE) {
        return undefined;
      }
      return allPages.length * COMMENTS_PER_PAGE;
    },
    initialPageParam: 0,
  });

  const comments = useMemo(
    () => query.data?.pages.flatMap((page) => page.comments) ?? [],
    [query.data?.pages]
  );

  const addComment = useCallback(
    (comment: MintComment) => {
      const next = withCommentDefaults(comment);
      queryClient.setQueryData<InfiniteData<CommentsPage, number>>(
        ["comments", collectionAddress, tokenId, chainId],
        (oldData) => {
          if (!oldData) {
            return {
              pages: [{ comments: [next], topLevelCount: 1 }],
              pageParams: [0],
            };
          }
          const [first, ...rest] = oldData.pages;
          return {
            pages: [
              {
                comments: [next, ...first.comments],
                topLevelCount: first.topLevelCount + 1,
              },
              ...rest,
            ],
            pageParams: oldData.pageParams,
          };
        }
      );
    },
    [queryClient, collectionAddress, tokenId, chainId]
  );

  const fetchMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query]);

  return {
    comments,
    addComment,
    isLoading: query.isLoading || query.isFetching,
    hasMore: query.hasNextPage ?? false,
    fetchMore,
  };
}
