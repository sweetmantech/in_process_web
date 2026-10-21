import type { CollectionItem } from "@/types/collections";
import type { Protocol } from "@/types/moment";
import { useMetadata } from "@/hooks/useMetadata";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/utils/truncateAddress";
import truncated from "@/lib/utils/truncated";
import GridCard from "@/components/MomentsGrid/GridCard";
import Preview from "@/components/MomentsGrid/Preview";
import ProtocolBadge from "@/components/MomentsGrid/ProtocolBadge";
import ChainLogo from "@/components/MomentsGrid/ChainLogo";
import { Skeleton } from "@/components/ui/skeleton";

interface ManageCollectionItemProps {
  collection: CollectionItem;
}

const ManageCollectionItem = ({ collection }: ManageCollectionItemProps) => {
  const { data: metadata, isLoading } = useMetadata(collection.uri);
  const shortName = getShortNameFromChainId(collection.chain_id);
  const href = shortName ? `/manage/${shortName}:${collection.address}` : undefined;
  const name = collection.name?.trim() || truncateAddress(collection.address);

  return (
    <GridCard
      href={href}
      media={
        <>
          <div className="absolute left-2 top-2 z-20">
            <ProtocolBadge protocol={collection.protocol as Protocol} />
          </div>
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-none bg-grey-moss-50" />
          ) : metadata ? (
            <Preview data={metadata} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="font-archivo text-sm text-grey-moss-200">No Preview</p>
            </div>
          )}
        </>
      }
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="truncate font-spectral text-[14.5px] leading-[1.3] text-grey-moss-900 transition-colors group-hover:text-tan-gold">
          {truncated(name, 20)}
        </p>
        <span className="shrink-0 whitespace-nowrap font-archivo text-[10.5px] text-tan-gold">
          {new Date(collection.created_at).toLocaleDateString("en-US")}
        </span>
      </div>
      <div className="mt-[7px] flex w-full items-center justify-between gap-1.5">
        <ChainLogo chainId={collection.chain_id} />
        <span className="truncate font-archivo text-[11px] text-grey-moss-300">
          {truncateAddress(collection.address)}
        </span>
      </div>
    </GridCard>
  );
};

export default ManageCollectionItem;
