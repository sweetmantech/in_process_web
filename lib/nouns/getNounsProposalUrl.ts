import { mainnet } from "viem/chains";

export const getNounsProposalUrl = (
  proposalId: string | bigint,
  chainId: number,
  txHash?: string
): string => {
  if (chainId === mainnet.id) {
    return `https://nouns.wtf/vote/${proposalId}`;
  }

  if (txHash) {
    return `https://sepolia.etherscan.io/tx/${txHash}`;
  }

  return `https://nouns.wtf/vote/${proposalId}`;
};
