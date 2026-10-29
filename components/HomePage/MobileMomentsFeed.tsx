"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import { useFeedScroll } from "@/hooks/useFeedScroll";
import MomentFeedCard from "@/components/HomePage/MomentFeedCard";
import FetchMore from "@/components/FetchMore";

const MobileMomentsFeed = () => {
  const { moments, hasNextPage, fetchMore } = useTimelineProvider();
  const { visibleMoments, hasMore, sentinelRef } = useFeedScroll(moments);

  return (
    <div className="flex flex-col pb-2">
      {visibleMoments.map((moment, index) => (
        <MomentFeedCard key={moment.id} moment={moment} eager={index < 2} />
      ))}
      {hasMore ? (
        <div ref={sentinelRef} className="h-px" />
      ) : (
        hasNextPage && <FetchMore fetchMore={fetchMore} />
      )}
    </div>
  );
};

export default MobileMomentsFeed;
