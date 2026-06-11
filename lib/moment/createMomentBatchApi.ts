import { IN_PROCESS_API } from "@/lib/consts";
import { toast } from "sonner";

interface BatchToken {
  tokenMetadataURI: string;
  createReferral: string;
  salesConfig: Record<string, unknown>;
  mintToCreatorCount: number;
  payoutRecipient?: string;
  maxSupply?: number;
}

interface CreateMomentBatchParameters {
  contract: { address?: string; name?: string; uri?: string };
  tokens: BatchToken[];
  account: string;
  splits?: Array<{ address: string; percentAllocation: number }>;
  chainId: number;
}

export interface CreateMomentBatchResult {
  contractAddress: string;
  hash: string;
  chainId: number;
  tokenIds: string[];
}

export async function createMomentBatchApi(
  parameters: CreateMomentBatchParameters
): Promise<CreateMomentBatchResult> {
  const maxRetries = 3;
  const retryDelay = 4000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(`${IN_PROCESS_API}/moment/create-batch`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parameters),
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = "Failed to create moments";
      try {
        const error = JSON.parse(text);
        errorMessage = error.message || errorMessage;
      } catch {
        // non-JSON response
      }

      if (errorMessage.includes("failed to estimate gas") && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        toast.info(`Network is busy. Retrying... ${attempt + 1} of ${maxRetries}`);
        continue;
      }

      if (errorMessage.includes("failed to estimate gas")) {
        toast.info("Gas estimation failed. Please try again in a few minutes.");
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  throw new Error("Failed to create moments after retries");
}
