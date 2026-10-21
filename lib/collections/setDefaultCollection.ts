import { IN_PROCESS_API } from "@/lib/consts";
import type { CollectionItem } from "@/types/collections";

export async function setDefaultCollection(
  collectionAddress: string | null,
  authHeaders: HeadersInit
): Promise<CollectionItem> {
  const response = await fetch(`${IN_PROCESS_API}/collections/default`, {
    method: "PUT",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ collectionAddress }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to set default collection");
  }
  return data;
}
