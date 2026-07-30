import { InfiniteData } from "@tanstack/react-query";
import { Moment } from "@/types/moment";
import { TimelineResponse } from "@/types/timeline";

/** Optimistic +1 for feed comment counts — indexer lag means invalidate alone is too early. */
export const bumpTimelineCommentCount = (
  data: InfiniteData<TimelineResponse> | undefined,
  moment: Moment
): InfiniteData<TimelineResponse> | undefined => {
  if (!data) return data;

  const address = moment.collectionAddress.toLowerCase();

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      moments: page.moments.map((entry) =>
        entry.address.toLowerCase() === address &&
        entry.token_id === moment.tokenId &&
        entry.chain_id === moment.chainId
          ? { ...entry, comments: (entry.comments ?? 0) + 1 }
          : entry
      ),
    })),
  };
};
