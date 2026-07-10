"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import { useFeedScroll } from "@/hooks/useFeedScroll";
import MomentFeedCard from "@/components/HomePage/MomentFeedCard";

const MobileMomentsFeed = () => {
  const { moments } = useTimelineProvider();
  const { visibleMoments, hasMore, sentinelRef } = useFeedScroll(moments);

  return (
    <div className="flex flex-col pb-2">
      {visibleMoments.map((moment) => (
        <MomentFeedCard key={moment.id} moment={moment} />
      ))}
      {hasMore && <div ref={sentinelRef} className="h-px" />}
    </div>
  );
};

export default MobileMomentsFeed;
