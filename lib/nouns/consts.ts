import { mainnet, sepolia } from "viem/chains";
import { IS_TESTNET } from "@/lib/consts";

export const NOUNS_CHAIN_ID = IS_TESTNET ? sepolia.id : mainnet.id;

export const NOUNS_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [mainnet.id]: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
  [sepolia.id]: "0x54BC3fC3977785922336084315318FA3387EEC17",
};

export const NOUNS_GOVERNOR_ADDRESS: Record<number, `0x${string}`> = {
  [mainnet.id]: "0x6f3e6272a167e8accb32072d08e0957f9c79223d",
  [sepolia.id]: "0x75D84FC49Dc8A423604BFCd46E0AB7D340D5ea38",
};
