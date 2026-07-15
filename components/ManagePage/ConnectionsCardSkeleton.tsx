import CardSectionHeaderSkeleton from "./CardSectionHeaderSkeleton";
import ConnectionItemSkeleton from "./ConnectionItemSkeleton";

const ConnectionsCardSkeleton = () => (
  <div className="rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)] md:rounded-lg md:px-6 md:py-[22px]">
    <CardSectionHeaderSkeleton labelWidth="w-20" marginBottom="mb-1.5 md:mb-2" />
    <div className="flex flex-col">
      <ConnectionItemSkeleton />
      <ConnectionItemSkeleton isLast />
    </div>
  </div>
);

export default ConnectionsCardSkeleton;
