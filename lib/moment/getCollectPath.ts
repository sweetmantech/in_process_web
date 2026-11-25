import { CHAIN } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

export const getCollectPath = (collectionAddress?: string, tokenId?: string) => {
  const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
  if (!shortNetworkName || !collectionAddress || !tokenId) return undefined;
  return `/collect/${shortNetworkName}:${collectionAddress}/${tokenId}`;
};
