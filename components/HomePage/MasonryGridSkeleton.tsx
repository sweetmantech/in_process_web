import { Skeleton } from "@/components/ui/skeleton";
import { useMasonryColumnCount } from "@/hooks/useMasonryColumnCount";
import useViewport from "@/hooks/useViewport";
import {
  FEED_PRE_MOUNT_COLUMN_CLASSES,
  FEED_PRE_MOUNT_ROW_CLASS,
  PRE_MOUNT_COLUMN_LIMIT,
} from "@/lib/masonry/preMountColumns";
import { cn } from "@/lib/utils";

const heights = [280, 340, 220, 300, 260, 360, 240, 320, 300, 260, 320, 280];

const MasonryGridSkeleton = () => {
  const isPreMount = useViewport() === undefined;
  const hookColumnCount = useMasonryColumnCount();
  const columnCount = isPreMount ? PRE_MOUNT_COLUMN_LIMIT : hookColumnCount;
  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    heights.filter((_, i) => i % columnCount === columnIndex)
  );

  return (
    <div className={cn("flex gap-5", isPreMount && FEED_PRE_MOUNT_ROW_CLASS)}>
      {columns.map((columnHeights, columnIndex) => (
        <div
          key={columnIndex}
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            isPreMount && FEED_PRE_MOUNT_COLUMN_CLASSES[columnIndex]
          )}
        >
          {columnHeights.map((height, i) => (
            <div
              key={i}
              className="mb-5 overflow-hidden rounded-lg border border-grey-moss-100 bg-white"
            >
              <Skeleton className="w-full rounded-none" style={{ height }} />
              <div className="space-y-2 px-[15px] pb-[15px] pt-[13px]">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGridSkeleton;
