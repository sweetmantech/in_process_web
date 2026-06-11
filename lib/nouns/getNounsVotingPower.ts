import { Address } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { getNounsVotingPowerCall } from "./getNounsVotingPowerCall";

export const getNounsVotingPower = async (account: Address, chainId: number): Promise<number> => {
  const client = getPublicClient(chainId);
  const votes = await client.readContract(getNounsVotingPowerCall(account, chainId));
  return Number(votes);
};
