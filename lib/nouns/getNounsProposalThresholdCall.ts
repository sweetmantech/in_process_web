import { ContractFunctionParameters } from "viem";
import { NOUNS_GOVERNOR_ADDRESS } from "./consts";
import { nounsGovernorAbi } from "./abi/nounsGovernorAbi";

export const getNounsProposalThresholdCall = (
  chainId: number
): ContractFunctionParameters<typeof nounsGovernorAbi, "view", "proposalThreshold"> => {
  const governorAddress = NOUNS_GOVERNOR_ADDRESS[chainId];
  if (!governorAddress) throw new Error("Governor address not found for chain");

  return {
    address: governorAddress,
    abi: nounsGovernorAbi,
    functionName: "proposalThreshold",
  };
};
