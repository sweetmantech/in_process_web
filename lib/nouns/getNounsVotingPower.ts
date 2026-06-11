import { createPublicClient, http, Address } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import getAlchemyRpcUrl from "@/lib/alchemy/getAlchemyRpcUrl";
import { NOUNS_TOKEN_ADDRESS } from "./consts";

const NOUNS_TOKEN_ABI = [
  {
    name: "getCurrentVotes",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint96" }],
  },
] as const;

export const getNounsVotingPower = async (account: Address, chainId: number): Promise<number> => {
  const tokenAddress = NOUNS_TOKEN_ADDRESS[chainId];
  if (!tokenAddress) return 0;

  const client = createPublicClient({
    chain: getViemNetwork(chainId),
    transport: http(getAlchemyRpcUrl(chainId)),
  });

  const votes = await client.readContract({
    address: tokenAddress,
    abi: NOUNS_TOKEN_ABI,
    functionName: "getCurrentVotes",
    args: [account],
  });

  return Number(votes);
};
