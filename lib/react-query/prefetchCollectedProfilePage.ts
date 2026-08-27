import { QueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import getCollectingStats from "@/lib/stats/getCollectingStats";
import getCollectorTransfers from "@/lib/transfers/getCollectorTransfers";
import {
  artistProfileKey,
  collectingStatsKey,
  collectorTransfersKey,
} from "@/lib/react-query/queryKeys";
import { PROFILE_COLLECTOR_TRANSFERS_LIMIT } from "@/lib/react-query/profileLimits";

export async function prefetchCollectedProfilePage(queryClient: QueryClient, address: Address) {
  const normalizedAddress = address.toLowerCase() as Address;
  const transfersKey = collectorTransfersKey(
    normalizedAddress,
    PROFILE_COLLECTOR_TRANSFERS_LIMIT,
    undefined
  );

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: artistProfileKey(normalizedAddress),
      queryFn: () => getArtistProfile(normalizedAddress),
    }),
    queryClient.prefetchQuery({
      queryKey: collectingStatsKey(normalizedAddress),
      queryFn: () => getCollectingStats(normalizedAddress),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: transfersKey,
      queryFn: ({ pageParam = 1 }) =>
        getCollectorTransfers(normalizedAddress, {
          page: pageParam,
          limit: PROFILE_COLLECTOR_TRANSFERS_LIMIT,
        }),
      initialPageParam: 1,
    }),
  ]);
}
