import MomentItemSkeleton from "./MomentItemSkeleton";

interface MomentsSkeletonProps {
  count?: number;
}

const MomentsSkeleton = ({ count = 20 }: MomentsSkeletonProps) => (
  <div className="grid w-full grow grid-cols-1 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {[...Array(count)].map((_, i) => (
      <MomentItemSkeleton key={i} />
    ))}
  </div>
);

export default MomentsSkeleton;
