import { Skeleton } from "@/components/ui/skeleton";

const ConnectionRowSkeleton = ({ isLast }: { isLast?: boolean }) => (
  <div
    className={`flex items-center justify-between gap-2.5 pt-3 ${isLast ? "pb-0.5" : "border-b border-grey-moss-50 pb-3"}`}
  >
    <div className="flex items-center gap-2.5">
      <Skeleton className="h-8 w-8 shrink-0 rounded-[9px]" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-2.5 w-24" />
      </div>
    </div>
    <Skeleton className="h-[30px] w-20 shrink-0 rounded-full" />
  </div>
);

export default ConnectionRowSkeleton;
