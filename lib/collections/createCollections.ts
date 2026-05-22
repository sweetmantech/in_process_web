import { IN_PROCESS_API } from "@/lib/consts";
import type { CreateCollectionsParams, CreateCollectionsResult } from "@/types/collections";

export async function createCollections(
  params: CreateCollectionsParams
): Promise<CreateCollectionsResult> {
  const response = await fetch(`${IN_PROCESS_API}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create collections");
  }

  return response.json();
}
