import { Skeleton } from "@/components/ui/skeleton";

const ConnectionItemSkeleton = ({ isLast }: { isLast?: boolean }) => (
  <div
    className={`flex items-center justify-between gap-2.5 pt-3 md:gap-3.5 md:pt-3.5 ${isLast ? "pb-0.5 md:pb-1" : "border-b border-grey-moss-50 pb-3 md:pb-3.5"}`}
  >
    <div className="flex items-center gap-2.5 md:gap-3">
      <Skeleton className="h-8 w-8 shrink-0 rounded-[9px] md:h-9 md:w-9 md:rounded-[10px]" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-2.5 w-24" />
      </div>
    </div>
    <Skeleton className="h-[30px] w-20 shrink-0 rounded-full md:h-9 md:w-24" />
  </div>
);

export default ConnectionItemSkeleton;
