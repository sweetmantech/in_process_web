import { Address } from "viem";
import { toast } from "sonner";
import { getPublicClient } from "@/lib/viem/publicClient";
import { getNounsVotingPowerCall } from "./getNounsVotingPowerCall";
import { getNounsProposalThresholdCall } from "./getNounsProposalThresholdCall";

export const getNounsProposalEligibility = async (
  account: Address,
  chainId: number
): Promise<boolean> => {
  const client = getPublicClient(chainId);
  const [votingPowerResult, proposalThresholdResult] = await client.multicall({
    contracts: [getNounsVotingPowerCall(account, chainId), getNounsProposalThresholdCall(chainId)],
  });

  if (votingPowerResult.status === "failure") {
    throw votingPowerResult.error ?? new Error("Failed to read voting power");
  }
  if (proposalThresholdResult.status === "failure") {
    throw proposalThresholdResult.error ?? new Error("Failed to read proposal threshold");
  }

  const votingPower = Number(votingPowerResult.result);
  const proposalThreshold = Number(proposalThresholdResult.result);

  if (votingPower < proposalThreshold) {
    toast.error(
      `You need at least ${proposalThreshold} Noun${proposalThreshold !== 1 ? "s" : ""} to submit this proposal. You currently have ${votingPower}.`
    );
    return false;
  }

  return true;
};
