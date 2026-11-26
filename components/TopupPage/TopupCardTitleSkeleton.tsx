import { Skeleton } from "@/components/ui/skeleton";

const TopupCardTitleSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="h-10 w-10 rounded-full" />
    <Skeleton className="h-4 w-28" />
  </div>
);

export default TopupCardTitleSkeleton;
