import { IN_PROCESS_API } from "@/lib/consts";
import type { CreateCollectionResult } from "@/types/collections";

export type CreateDefaultCollectionResult = CreateCollectionResult | { message: string };

export async function createDefaultCollection(
  authHeaders: HeadersInit
): Promise<CreateDefaultCollectionResult> {
  const response = await fetch(`${IN_PROCESS_API}/collections/default`, {
    method: "POST",
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
