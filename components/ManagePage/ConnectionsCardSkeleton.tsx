import CardSectionHeaderSkeleton from "./CardSectionHeaderSkeleton";
import ConnectionRowSkeleton from "./ConnectionRowSkeleton";

const ConnectionsCardSkeleton = () => (
  <div className="rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)] md:hidden">
    <CardSectionHeaderSkeleton labelWidth="w-20" marginBottom="mb-1.5" />
    <div className="flex flex-col">
      <ConnectionRowSkeleton />
      <ConnectionRowSkeleton isLast />
    </div>
  </div>
);

export default ConnectionsCardSkeleton;
