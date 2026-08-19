import { mainnet, optimism, base, baseSepolia, zora } from "viem/chains";

const EXPLORER_BY_CHAIN_ID: Record<number, string> = {
  [mainnet.id]: "https://etherscan.io",
  [optimism.id]: "https://optimistic.etherscan.io",
  [base.id]: "https://basescan.org",
  [baseSepolia.id]: "https://sepolia.basescan.org",
  [zora.id]: "https://explorer.zora.energy",
};

const getExplorerBaseUrl = (chainId: number): string =>
  EXPLORER_BY_CHAIN_ID[chainId] ?? "https://basescan.org";

export default getExplorerBaseUrl;
