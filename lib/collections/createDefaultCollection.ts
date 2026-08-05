import { IN_PROCESS_API } from "@/lib/consts";
import type { CollectionItem } from "@/types/collections";

export async function createDefaultCollection(authHeaders: HeadersInit): Promise<CollectionItem> {
  const response = await fetch(`${IN_PROCESS_API}/collections/default`, {
    method: "GET",
    headers: {
      ...authHeaders,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create default collection");
  }
  return data;
}
