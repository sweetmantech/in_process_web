import { IN_PROCESS_API } from "@/lib/consts";
import { CreateNounsProposalParams, CreateNounsProposalResult } from "@/types/nouns";

export async function createNounsProposalApi(
  params: CreateNounsProposalParams
): Promise<CreateNounsProposalResult> {
  const response = await fetch(`${IN_PROCESS_API}/nouns`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    let message = "Failed to build Nouns proposal";
    try {
      message = JSON.parse(text).message ?? message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}
