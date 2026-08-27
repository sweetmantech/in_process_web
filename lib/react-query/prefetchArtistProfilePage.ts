import { QueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";
import getTimelineStats from "@/lib/stats/getTimelineStats";
import {
  artistProfileKey,
  infiniteTimelineKey,
  timelineStatsKey,
} from "@/lib/react-query/queryKeys";
import { PROFILE_TIMELINE_LIMIT } from "@/lib/react-query/profileLimits";

export async function prefetchArtistProfilePage(queryClient: QueryClient, address: Address) {
  const normalizedAddress = address.toLowerCase() as Address;
  const timelineKey = infiniteTimelineKey({
    limit: PROFILE_TIMELINE_LIMIT,
    artistAddress: normalizedAddress,
    curated: false,
  });

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: artistProfileKey(normalizedAddress),
      queryFn: () => getArtistProfile(normalizedAddress),
    }),
    queryClient.prefetchQuery({
      queryKey: timelineStatsKey(normalizedAddress),
      queryFn: () => getTimelineStats(normalizedAddress),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: timelineKey,
      queryFn: ({ pageParam = 1 }) =>
        fetchTimeline({
          page: pageParam,
          limit: PROFILE_TIMELINE_LIMIT,
          artistAddress: normalizedAddress,
          curated: false,
        }),
      initialPageParam: 1,
    }),
  ]);
}
