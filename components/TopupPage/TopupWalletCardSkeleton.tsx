import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TopupCardTitleSkeleton from "./TopupCardTitleSkeleton";

const TopupWalletCardSkeleton = () => (
  <Card className="space-y-4 p-6">
    <TopupCardTitleSkeleton />
    <Skeleton className="h-20 w-full rounded-lg" />
    <Skeleton className="h-11 w-full" />
    <div className="space-y-3 border-t border-grey-moss-100 pt-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  </Card>
);

export default TopupWalletCardSkeleton;
