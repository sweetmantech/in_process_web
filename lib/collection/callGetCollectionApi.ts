import { CollectionResponse, FetchCollectionParams } from "@/types/collections";
import { IN_PROCESS_API } from "@/lib/consts";

export async function callGetCollectionApi({
  collectionAddress,
  chainId,
}: FetchCollectionParams): Promise<CollectionResponse> {
  const network = `eip155:${chainId}`;
  const contract = `erc1155:${collectionAddress.toLowerCase()}`;

  const res = await fetch(`${IN_PROCESS_API}/collections/${network}/${contract}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch collection");
  }
  return res.json();
}
