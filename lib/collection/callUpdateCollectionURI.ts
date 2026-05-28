import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

export interface CallUpdateCollectionURIInput {
  collection: {
    address: Address;
    chainId: number;
  };
  newCollectionName: string;
  newUri: string;
  authHeaders: HeadersInit;
}

export async function callUpdateCollectionURI({
  collection,
  newUri,
  newCollectionName,
  authHeaders,
}: CallUpdateCollectionURIInput): Promise<string> {
  try {
    const network = `eip155:${collection.chainId}`;
    const contract = `erc1155:${collection.address.toLowerCase()}`;
    const response = await fetch(`${IN_PROCESS_API}/collections/${network}/${contract}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({ newUri, newCollectionName }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update collection metadata");
    }
    return data.hash;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update collection metadata");
  }
}
