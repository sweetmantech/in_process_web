import { createPublicClient, http, Address } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import getAlchemyRpcUrl from "@/lib/alchemy/getAlchemyRpcUrl";
import { NOUNS_ADDRESS } from "./consts";
import { nounsTokenAbi } from "./abi/nounsTokenAbi";

export const getNounsVotingPower = async (account: Address, chainId: number): Promise<number> => {
  const tokenAddress = NOUNS_ADDRESS[chainId];
  if (!tokenAddress) return 0;

  const client = createPublicClient({
    chain: getViemNetwork(chainId),
    transport: http(getAlchemyRpcUrl(chainId)),
  });

  const votes = await client.readContract({
    address: tokenAddress,
    abi: nounsTokenAbi,
    functionName: "getCurrentVotes",
    args: [account],
  });

  return Number(votes);
};
