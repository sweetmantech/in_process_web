import { mainnet, sepolia } from "viem/chains";
import { IS_TESTNET } from "@/lib/consts";

export const NOUNS_CHAIN_ID = IS_TESTNET ? sepolia.id : mainnet.id;

export const NOUNS_ADDRESS: Record<number, `0x${string}`> = {
  [mainnet.id]: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
  [sepolia.id]: "0x4c4674bb72a096855496a7204962297bd7e12b85",
};

export const NOUNS_GOVERNOR_ADDRESS: Record<number, `0x${string}`> = {
  [mainnet.id]: "0x6f3e6272a167e8accb32072d08e0957f9c79223d",
  [sepolia.id]: "0x35d2670d7c8931aacdd37c89ddcb0638c3c44a57",
};
