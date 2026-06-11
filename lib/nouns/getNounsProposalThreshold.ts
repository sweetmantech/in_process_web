import { getPublicClient } from "@/lib/viem/publicClient";
import { getNounsProposalThresholdCall } from "./getNounsProposalThresholdCall";

export const getNounsProposalThreshold = async (chainId: number): Promise<number> => {
  const client = getPublicClient(chainId);
  const threshold = await client.readContract(getNounsProposalThresholdCall(chainId));
  return Number(threshold);
};
