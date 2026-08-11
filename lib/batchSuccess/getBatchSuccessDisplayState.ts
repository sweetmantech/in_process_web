import { CHAIN_ID, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getCollectionTimelineUrl } from "@/lib/collection/getCollectionTimelineUrl";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { BulkResultItem } from "@/types/bulk";
import { MomentMetadata } from "@/types/moment";

interface CollectionLike {
  name?: string | null;
  uri?: string | null;
  metadata?: { image?: string | null } | null;
}

interface GetBatchSuccessDisplayStateParams {
  contractAddress: string;
  collectionItem?: CollectionLike | null;
  fetchedCollection?: CollectionLike | null;
  collectionMetadata?: MomentMetadata | null;
  items: BulkResultItem[];
  price: string;
  priceUnit: string;
  needsRemoteHydration: boolean;
  isRemotePending: boolean;
}

const getBatchSuccessDisplayState = ({
  contractAddress,
  collectionItem,
  fetchedCollection,
  collectionMetadata,
  items,
  price,
  priceUnit,
  needsRemoteHydration,
  isRemotePending,
}: GetBatchSuccessDisplayStateParams) => {
  const collectionName = collectionItem?.name ?? fetchedCollection?.name ?? "Collection";
  const rawImage = collectionMetadata?.image ?? fetchedCollection?.metadata?.image ?? "";
  const collectionImageUrl = rawImage
    ? getFetchableUrl(rawImage) || rawImage
    : items[0]?.previewUrl || "";

  const timelineHref = getCollectionTimelineUrl(CHAIN_ID, contractAddress, SITE_ORIGINAL_URL);

  return {
    collectionName,
    collectionImageUrl,
    timelineHref,
    shareUrl: timelineHref,
    displayedPrice: `${price} ${priceUnit.toUpperCase()}`,
    isLoading: needsRemoteHydration && items.length === 0 && isRemotePending,
  };
};

export default getBatchSuccessDisplayState;
