import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TopupCardTitleSkeleton from "./TopupCardTitleSkeleton";

const TopupBalanceCardSkeleton = () => (
  <Card className="h-fit space-y-4 p-6">
    <TopupCardTitleSkeleton />
    <div className="space-y-2">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-4 w-40" />
    </div>
  </Card>
);

export default TopupBalanceCardSkeleton;
