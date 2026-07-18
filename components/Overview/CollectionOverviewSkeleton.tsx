import { Skeleton } from "../ui/skeleton";

const CollectionOverviewSkeleton = () => (
  <div className="w-full pt-0">
    <Skeleton className="h-4 w-28" />
    <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
      <Skeleton className="aspect-square w-24 shrink-0 rounded-lg" />
      <div className="w-full space-y-2.5 md:w-auto">
        <Skeleton className="h-8 w-40 md:h-10" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-32 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export default CollectionOverviewSkeleton;
