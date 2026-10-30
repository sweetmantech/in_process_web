import { QueryClient } from "@tanstack/react-query";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";
import { infiniteTimelineKey } from "@/lib/react-query/queryKeys";
import {
  HOME_TIMELINE_LIMIT,
  HOME_TIMELINE_PREFETCH_TIMEOUT_MS,
} from "@/lib/react-query/homeTimeline";

export async function prefetchHomeTimeline(queryClient: QueryClient) {
  const firstPage = await fetchTimeline({
    page: 1,
    limit: HOME_TIMELINE_LIMIT,
    signal: AbortSignal.timeout(HOME_TIMELINE_PREFETCH_TIMEOUT_MS),
  });

  queryClient.setQueryData(
    infiniteTimelineKey({ limit: HOME_TIMELINE_LIMIT }),
    { pages: [firstPage], pageParams: [1] },
    { updatedAt: 0 }
  );
}
