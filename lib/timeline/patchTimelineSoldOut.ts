import { InfiniteData } from "@tanstack/react-query";
import { Moment } from "@/types/moment";
import { TimelineResponse } from "@/types/timeline";

/** Patches a moment's sold_out flag in the timeline cache right after collect resolves, instead of waiting on the feed's staleTime. */
export const patchTimelineSoldOut = (
  data: InfiniteData<TimelineResponse> | undefined,
  moment: Moment,
  soldOut: boolean
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
          ? { ...entry, sold_out: soldOut }
          : entry
      ),
    })),
  };
};
