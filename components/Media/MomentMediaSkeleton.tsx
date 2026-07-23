import { Skeleton } from "../ui/skeleton";

const MomentMediaSkeleton = () => (
  <div className="rounded-lg border border-grey-moss-100 bg-white p-6 shadow-sm">
    <Skeleton className="mb-[18px] h-3 w-14" />
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-[160px] w-full rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="min-h-[280px] w-full rounded-lg" />
      </div>
    </div>
  </div>
);

export default MomentMediaSkeleton;
