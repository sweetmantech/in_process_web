import { Skeleton } from "@/components/ui/skeleton";

interface CardSectionHeaderSkeletonProps {
  labelWidth: string;
  marginBottom?: string;
}

const CardSectionHeaderSkeleton = ({
  labelWidth,
  marginBottom = "mb-3.5",
}: CardSectionHeaderSkeletonProps) => (
  <div className={`flex items-center gap-1.5 ${marginBottom}`}>
    <Skeleton className="h-1.5 w-1.5 rounded-full" />
    <Skeleton className={`h-2.5 ${labelWidth}`} />
  </div>
);

export default CardSectionHeaderSkeleton;
