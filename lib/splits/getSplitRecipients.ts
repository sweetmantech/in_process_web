import { Address } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { retriesGeneric } from "@/lib/protocolSdk/retries";
import type { SplitRecipientInput } from "@/lib/splits/createSplit";

const getSplitRecipients = async (
  splitAddress: Address,
  chainId: number
): Promise<SplitRecipientInput[]> => {
  const publicClient = getPublicClient(chainId);
  const splitsClient = getSplitsClient({
    chainId,
    publicClient,
  });

  const splitMetadata = await retriesGeneric({
    tryFn: async () => {
      return await splitsClient.getSplitMetadataViaProvider({
        splitAddress,
      });
    },
    maxTries: 3,
    linearBackoffMS: 200,
    shouldRetryOnError: (err: { code?: number; message?: string }) =>
      err?.code === 429 ||
      Boolean(err?.message?.includes("timeout")) ||
      Boolean(err?.message?.includes("network")),
  });

  return splitMetadata.split.recipients.map((recipient) => ({
    address: recipient.recipient.address,
    percentAllocation: Number(recipient.percentAllocation),
  }));
};

export default getSplitRecipients;
