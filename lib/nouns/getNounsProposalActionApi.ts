import { IN_PROCESS_API } from "@/lib/consts";
import { GetNounsProposalActionParams, GetNounsProposalActionResult } from "@/types/nouns";

export async function getNounsProposalActionApi(
  params: GetNounsProposalActionParams
): Promise<GetNounsProposalActionResult> {
  const response = await fetch(`${IN_PROCESS_API}/nouns`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    let message = "Failed to get Nouns proposal action";
    try {
      message = JSON.parse(text).message ?? message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}
