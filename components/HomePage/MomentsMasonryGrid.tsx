import { useTimelineProvider } from "@/providers/TimelineProvider";
import MomentFeedCard from "@/components/HomePage/MomentFeedCard";
import MasonryGridSkeleton from "./MasonryGridSkeleton";
import NoMomentsFound from "@/components/MomentsGrid/NoMomentsFound";
import FetchMore from "@/components/FetchMore";
import { useFeedScroll } from "@/hooks/useFeedScroll";
import { useMasonryColumns } from "@/hooks/useMasonryColumns";
import {
  FEED_PRE_MOUNT_COLUMN_CLASSES,
  FEED_PRE_MOUNT_EAGER_COLUMNS,
  FEED_PRE_MOUNT_ROW_CLASS,
} from "@/lib/masonry/preMountColumns";
import { cn } from "@/lib/utils";

const DESKTOP_PAGE_SIZE = 30;

const MomentsMasonryGrid = () => {
  const { moments, isLoading, hasNextPage, fetchMore } = useTimelineProvider();
  const { visibleMoments, hasMore, sentinelRef } = useFeedScroll(moments, DESKTOP_PAGE_SIZE);
  const { columns, isPreMount } = useMasonryColumns(visibleMoments);

  return (
    <div className="relative z-30 w-full pb-6">
      {isLoading ? (
        <MasonryGridSkeleton />
      ) : moments.length === 0 ? (
        <NoMomentsFound />
      ) : (
        <>
          <div className={cn("flex gap-5", isPreMount && FEED_PRE_MOUNT_ROW_CLASS)}>
            {columns.map((columnMoments, columnIndex) => (
              <div
                key={columnIndex}
                className={cn(
                  "flex min-w-0 flex-1 flex-col",
                  isPreMount && FEED_PRE_MOUNT_COLUMN_CLASSES[columnIndex]
                )}
              >
                {columnMoments.map((moment, rowIndex) => (
                  <MomentFeedCard
                    key={moment.id}
                    moment={moment}
                    eager={
                      rowIndex === 0 && (!isPreMount || columnIndex < FEED_PRE_MOUNT_EAGER_COLUMNS)
                    }
                  />
                ))}
              </div>
            ))}
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
