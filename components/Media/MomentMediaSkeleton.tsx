import { Skeleton } from "../ui/skeleton";

const MomentMediaSkeleton = () => (
  <div className="rounded-lg border border-grey-moss-100 bg-white p-6 shadow-sm">
    <Skeleton className="mb-[18px] h-3 w-14" />
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-center">
      <Skeleton className="size-[132px] shrink-0 rounded-lg" />
      <div className="flex min-w-0 w-full flex-1 flex-col gap-3.5">
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
          <Skeleton className="h-[68px] w-full rounded-md" />
        </div>
      </div>
    </div>
    <div className="mt-[18px] flex gap-6 border-t border-grey-moss-50 pt-4">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

export default MomentMediaSkeleton;
