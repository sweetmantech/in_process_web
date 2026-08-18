import { Address } from "viem";
import { CHAIN_ID } from "@/lib/consts";
import isCoinbaseSmartWallet from "@/lib/smartwallets/isCoinbaseSmartWallet";

const resolveSigningAddress = async (
  provider: { request: (args: { method: string }) => Promise<unknown> },
  connectedAddress: Address
): Promise<Address> => {
  const accounts = (await provider
    .request({ method: "eth_accounts" })
    .catch(() => [])) as Address[];
  const candidates = [connectedAddress, ...accounts];
  for (const address of candidates) {
    if (!(await isCoinbaseSmartWallet(address, CHAIN_ID))) return address;
  }
  throw new Error("Connect your main Base wallet, not Coinbase Smart Wallet.");
};

export default resolveSigningAddress;
