import { useCallback, useMemo } from "react";
import { useInfiniteQuery, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { CommentsPage, MintComment } from "@/types/moment";
import fetchComments from "@/lib/moment/fetchComments";
import fetchReplies from "@/lib/moment/fetchReplies";
import withCommentDefaults from "@/lib/moment/withCommentDefaults";
import updateCommentInTree from "@/lib/moment/updateCommentInTree";
import { useMomentProvider } from "@/providers/MomentProvider";

const COMMENTS_PER_PAGE = 20;

export function useComments() {
  const { moment, protocol } = useMomentProvider();
  const queryClient = useQueryClient();
  const { collectionAddress, tokenId, chainId } = moment;
  const queryKey = ["comments", collectionAddress, tokenId, chainId] as const;

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      fetchComments({
        moment,
        offset: pageParam as number,
      }),
    enabled: Boolean(collectionAddress && tokenId && chainId && protocol === "in_process"),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage, allPages) => {
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

  const setCommentsData = useCallback(
    (
      updater: (
        oldData: InfiniteData<CommentsPage, number> | undefined
      ) => InfiniteData<CommentsPage, number>
    ) => {
      queryClient.setQueryData<InfiniteData<CommentsPage, number>>(queryKey, updater);
    },
    [queryClient, queryKey]
  );

  const addComment = useCallback(
    (comment: MintComment) => {
      const next = withCommentDefaults(comment);
      setCommentsData((oldData) => {
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
      });
    },
    [setCommentsData]
  );

  const addReply = useCallback(
    (parentCommentId: string, reply: MintComment) => {
      const next = withCommentDefaults(reply);
      setCommentsData((oldData) => {
        if (!oldData) {
          return {
            pages: [{ comments: [], topLevelCount: 0 }],
            pageParams: [0],
          };
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            comments: updateCommentInTree(page.comments, parentCommentId, (parent) => ({
              ...parent,
              replyCount: parent.replyCount + 1,
              replies: [...parent.replies, next],
            })),
          })),
        };
      });
    },
    [setCommentsData]
  );

  const loadMoreReplies = useCallback(
    async (parentCommentId: string) => {
      const replies = await fetchReplies({ moment, replyToId: parentCommentId });
      setCommentsData((oldData) => {
        if (!oldData) {
          return {
            pages: [{ comments: [], topLevelCount: 0 }],
            pageParams: [0],
          };
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            comments: updateCommentInTree(page.comments, parentCommentId, (parent) => ({
              ...parent,
              replyCount: Math.max(parent.replyCount, replies.length),
              replies,
            })),
          })),
        };
      });
    },
    [moment, setCommentsData]
  );

  const fetchMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query]);

  return {
    comments,
    addComment,
    addReply,
    loadMoreReplies,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    hasMore: query.hasNextPage ?? false,
    fetchMore,
  };
}
