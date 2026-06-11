import { Address, ContractFunctionParameters } from "viem";
import { NOUNS_ADDRESS } from "./consts";
import { nounsTokenAbi } from "./abi/nounsTokenAbi";

export const getNounsVotingPowerCall = (
  account: Address,
  chainId: number
): ContractFunctionParameters<typeof nounsTokenAbi, "view", "getCurrentVotes"> => {
  const tokenAddress = NOUNS_ADDRESS[chainId];
  if (!tokenAddress) throw new Error("Nouns token address not found for chain");

  return {
    address: tokenAddress,
    abi: nounsTokenAbi,
    functionName: "getCurrentVotes",
    args: [account],
  };
};
