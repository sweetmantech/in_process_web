import { Address } from "viem";
import { CHAIN_ID, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getCollectPath } from "@/lib/moment/getCollectPath";
import { Moment } from "@/types/moment";

interface CollectionItem {
  address: string;
  name?: string;
}

interface GetCreateSuccessRequestStateParams {
  createdTokenId?: string;
  tokenIdFromUrl?: string;
  selectedCollection?: string;
  collections: CollectionItem[];
}

const getCreateSuccessRequestState = ({
  createdTokenId,
  tokenIdFromUrl,
  selectedCollection,
  collections,
}: GetCreateSuccessRequestStateParams) => {
  const activeTokenId = createdTokenId || tokenIdFromUrl;
  const selectedCollectionItem = collections.find(
    (collection) => collection.address.toLowerCase() === selectedCollection?.toLowerCase()
  );
  const momentHref = getCollectPath(selectedCollection, activeTokenId);

  const momentQuery: Moment = {
    collectionAddress: selectedCollection as Address,
    tokenId: activeTokenId || "",
    chainId: CHAIN_ID,
  };

  return {
    activeTokenId,
    selectedCollectionItem,
    momentQuery,
    momentHref,
    shareUrl: momentHref ? `${SITE_ORIGINAL_URL}${momentHref}` : undefined,
  };
};

export default getCreateSuccessRequestState;
