import { getChainIdFromAddress } from "./getChainIdFromAddress";
import { Address } from "viem";

/**
 * Parses a collection segment from URL params (handles URL-encoded format like %3A)
 * @param collection - Collection from URL params (may be URL-encoded as %3A or plain :)
 * @returns Object with chainId and address
 */
export const parseCollectionAddress = (
  collection: string | undefined
): {
  chainId: number | undefined;
  address: Address | undefined;
} => {
  if (!collection) {
    return { chainId: undefined, address: undefined };
  }

  // Decode URL-encoded address (e.g., %3A -> :)
  // getChainIdFromAddress expects the address to contain :, so decode first
  const decodedAddress = decodeURIComponent(collection);
  const { chainId, addressOnly } = getChainIdFromAddress(decodedAddress);

  return {
    chainId: chainId || undefined,
    address: (addressOnly as Address) || undefined,
  };
};
