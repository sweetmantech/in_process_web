import { Address } from "viem";
import { CHAIN_ID, CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
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
  const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());

  const momentQuery: Moment = {
    collectionAddress: selectedCollection as Address,
    tokenId: activeTokenId || "",
    chainId: CHAIN_ID,
  };

  return {
    activeTokenId,
    selectedCollectionItem,
    momentQuery,
    shareUrl:
      shortNetworkName && selectedCollection && activeTokenId
        ? `${SITE_ORIGINAL_URL}/collect/${shortNetworkName}:${selectedCollection}/${activeTokenId}`
        : undefined,
  };
};

export default getCreateSuccessRequestState;
