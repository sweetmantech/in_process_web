import { type Address } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";

const EIP1967_IMPL_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" as const;

const COINBASE_IMPLEMENTATION_SET = new Set([
  "0x000100abaad02f1cfc8bbe32bd5a564817339e72",
  "0x00000110dcdedc9581cb5ecb8467282f2926534d",
]);

const isCoinbaseSmartWallet = async (address: Address, chainId: number): Promise<boolean> => {
  const publicClient = getPublicClient(chainId);
  const bytecode = await publicClient.getCode({ address });
  if (!bytecode || bytecode === "0x") return false;

  const implSlot = await publicClient.getStorageAt({
    address,
    slot: EIP1967_IMPL_SLOT,
  });
  const zeroSlot = `0x${"0".repeat(64)}`;
  if (!implSlot || implSlot === zeroSlot) return false;

  const implAddress = `0x${implSlot.slice(-40)}`.toLowerCase();
  return COINBASE_IMPLEMENTATION_SET.has(implAddress);
};

export default isCoinbaseSmartWallet;
