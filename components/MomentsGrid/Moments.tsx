import { useTimelineProvider } from "@/providers/TimelineProvider";
import { type TimelineMoment } from "@/types/moment";
import MomentsSkeleton from "./MomentsSkeleton";
import NoMomentsFound from "./NoMomentsFound";
import MomentItem from "./MomentItem";
import FetchMore from "@/components/FetchMore";
import { useFeedScroll } from "@/hooks/useFeedScroll";

const Moments = () => {
  const { moments, isLoading, hasNextPage, fetchMore } = useTimelineProvider();
  const { visibleMoments, hasMore, sentinelRef } = useFeedScroll(moments);

  if (isLoading) return <MomentsSkeleton />;
  if (moments.length === 0) return <NoMomentsFound />;

  return (
    <div className="grid w-full grow grid-cols-1 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {visibleMoments.map((m: TimelineMoment) => (
        <MomentItem m={m} key={m.id} />
      ))}
      {hasMore ? (
        <div ref={sentinelRef} className="col-span-full h-px" />
      ) : (
        hasNextPage && <FetchMore fetchMore={fetchMore} />
      )}
    </div>
  );
};

export default Moments;
