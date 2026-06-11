import { Address, ContractFunctionParameters } from "viem";
import { NOUNS_ADDRESS } from "./consts";
import { nounsTokenAbi } from "./abi/nounsTokenAbi";

export const getNounsProposerVotesCall = (
  account: Address,
  blockNumber: bigint,
  chainId: number
): ContractFunctionParameters<typeof nounsTokenAbi, "view", "getPriorVotes"> => {
  const tokenAddress = NOUNS_ADDRESS[chainId];
  if (!tokenAddress) throw new Error("Nouns token address not found for chain");

  return {
    address: tokenAddress,
    abi: nounsTokenAbi,
    functionName: "getPriorVotes",
    args: [account, blockNumber],
  };
};
