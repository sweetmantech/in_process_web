import { useTimelineProvider } from "@/providers/TimelineProvider";
import MomentFeedCard from "@/components/HomePage/MomentFeedCard";
import MasonryGridSkeleton from "./MasonryGridSkeleton";
import NoMomentsFound from "@/components/MomentsGrid/NoMomentsFound";
import FetchMore from "@/components/FetchMore";
import { useMasonryColumnCount } from "@/hooks/useMasonryColumnCount";
import { useFeedScroll } from "@/hooks/useFeedScroll";
import { distributeIntoColumns } from "@/lib/moment/distributeIntoColumns";

const DESKTOP_PAGE_SIZE = 30;

const MomentsMasonryGrid = () => {
  const { moments, isLoading, hasNextPage, fetchMore } = useTimelineProvider();
  const columnCount = useMasonryColumnCount();
  const { visibleMoments, hasMore, sentinelRef } = useFeedScroll(moments, DESKTOP_PAGE_SIZE);

  return (
    <div className="relative z-30 w-full pb-6">
      {isLoading ? (
        <MasonryGridSkeleton />
      ) : moments.length === 0 ? (
        <NoMomentsFound />
      ) : (
        <>
          <div className="flex gap-5">
            {distributeIntoColumns(visibleMoments, columnCount).map(
              (columnMoments, columnIndex) => (
                <div key={columnIndex} className="flex min-w-0 flex-1 flex-col">
                  {columnMoments.map((moment) => (
                    <MomentFeedCard key={moment.id} moment={moment} />
                  ))}
                </div>
              )
            )}
          </div>
          {hasMore ? (
            <div ref={sentinelRef} className="h-px" />
          ) : (
            hasNextPage && <FetchMore fetchMore={fetchMore} />
          )}
        </>
      )}
    </div>
  );
};

export default MomentsMasonryGrid;
