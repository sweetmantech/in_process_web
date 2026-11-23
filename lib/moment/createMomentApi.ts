import { toast } from "sonner";
import { postCreateRequest } from "./postCreateRequest";
import CreatePendingError from "./CreatePendingError";
import { getResponseErrorMessage } from "./getResponseErrorMessage";

interface CreateMomentParameters {
  [key: string]: any;
}

interface CreateMomentResult {
  contractAddress: string;
  tokenId: number;
}

export async function createMomentApi(
  parameters: CreateMomentParameters
): Promise<CreateMomentResult> {
  const maxRetries = 3;
  const retryDelay = 4000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await postCreateRequest("/moment/create", parameters);

    if (!response.ok) {
      const text = await response.text();
      const errorMessage = getResponseErrorMessage(text, "Failed to create moment");

      if (errorMessage.includes("failed to estimate gas") && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        toast.info(`Network is busy. Retrying to create moment... ${attempt + 1} of ${maxRetries}`);
        continue;
      }

      if (errorMessage.includes("failed to estimate gas")) {
        toast.info(
          "Gas estimation failed. It seems like the network is busy. Please try again in a few minutes."
        );
        throw new Error(errorMessage);
      }
      if (response.status >= 500) throw new CreatePendingError();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  }

  throw new Error("Failed to create moment after retries");
}
